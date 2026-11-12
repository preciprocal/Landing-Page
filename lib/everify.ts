/**
 * lib/everify.ts
 *
 * Server side of the free E-Verify employer search on
 * /opt/e-verify-employer-search.
 *
 * The data is the public E-Verify Employer Search
 * (https://www.e-verify.gov/e-verify-employer-search), which USCIS updates
 * daily. The Dashboard repo copies it every day (scripts/everify/sync.mjs
 * there) into the shared Supabase project's private Storage bucket `everify`:
 *
 *   everify/current.json                { version, syncedAt, rows, sourceUpdated }
 *   everify/v/<version>/<shard>.json.gz { "<normalised name>": EverifyRecord[] }
 *
 * A shard holds every name whose normalised form starts with the same two
 * characters, so one download answers both an exact lookup and a
 * search-as-you-type prefix search.
 *
 * normalizeCompany and shardOf MUST stay identical to the Dashboard's
 * lib/jobs/everify-store.ts, or names will be looked for in the wrong shard.
 */

import { gunzipSync } from "node:zlib";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "everify";
const POINTER = "current.json";
const POINTER_TTL_MS = 10 * 60 * 1000;
const MAX_CACHED_SHARDS = 120;
const MAX_RESULTS = 8;

export interface EverifyPointer {
  version: string;
  syncedAt: string;
  rows: number;
  sourceUpdated: string | null;
}

/** One E-Verify account as the sync stores it. */
interface EverifyRecord {
  /** Employer name as enrolled. */
  e: string;
  /** Doing-business-as name. */
  d?: string;
  /** 'o' open, 't' terminated. */
  s: "o" | "t";
  /** Enrolment date, YYYY-MM-DD. */
  en?: string;
  /** Termination date, YYYY-MM-DD. */
  te?: string;
  /** Workforce size band. */
  w?: string;
}

export type EverifyState = "enrolled" | "ending" | "ended";

export interface EverifyAccount {
  employer: string;
  dba: string | null;
  open: boolean;
  enrolledOn: string | null;
  terminatesOn: string | null;
  workforce: string | null;
}

export interface EverifyMatch {
  /** The name that matched the search: the enrolled name, or the DBA name. */
  name: string;
  /** Set when the match came through the DBA name: the name actually enrolled. */
  enrolledAs: string | null;
  state: EverifyState;
  exact: boolean;
  accounts: EverifyAccount[];
}

export interface EverifySearchResult {
  query: string;
  matches: EverifyMatch[];
  syncedAt: string;
  sourceUpdated: string | null;
  totalEmployers: number;
}

const SUFFIXES = /\b(inc|llc|ltd|limited|corp|corporation|co|company|gmbh|plc|pvt|private|sa|ag|bv|lp|llp)\b/g;

/** "Stripe, Inc." and "stripe inc" -> "stripe". Same rule as the Dashboard. */
export function normalizeCompany(raw: string | null | undefined): string | null {
  const s = (raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(SUFFIXES, " ")
    .replace(/\s+/g, " ")
    .trim();
  return s || null;
}

function shardOf(key: string): string {
  const k = key.replace(/ /g, "_");
  return (k.length >= 2 ? k.slice(0, 2) : `${k}_`).replace(/[^a-z0-9_]/g, "_");
}

let client: SupabaseClient | null | undefined;
function supabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  client = url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
  return client;
}

// Per server instance. Shards only change with a new version, so they are
// cached by version and shard.
let pointerCache: { at: number; value: EverifyPointer | null } | null = null;
const shardCache = new Map<string, Record<string, EverifyRecord[]>>();

async function readPointer(sb: SupabaseClient): Promise<EverifyPointer | null> {
  if (pointerCache && Date.now() - pointerCache.at < POINTER_TTL_MS) return pointerCache.value;
  const { data, error } = await sb.storage.from(BUCKET).download(POINTER);
  const value = error || !data ? null : (JSON.parse(await data.text()) as EverifyPointer);
  pointerCache = { at: Date.now(), value };
  return value;
}

async function readShard(sb: SupabaseClient, version: string, shard: string): Promise<Record<string, EverifyRecord[]>> {
  const cacheKey = `${version}/${shard}`;
  const hit = shardCache.get(cacheKey);
  if (hit) {
    // Move to the back so the least recently used shard is evicted first.
    shardCache.delete(cacheKey);
    shardCache.set(cacheKey, hit);
    return hit;
  }
  const { data, error } = await sb.storage.from(BUCKET).download(`v/${version}/${shard}.json.gz`);
  // A missing shard means no employer name starts with those characters.
  const value =
    error || !data
      ? {}
      : (JSON.parse(gunzipSync(Buffer.from(await data.arrayBuffer())).toString("utf8")) as Record<string, EverifyRecord[]>);
  if (shardCache.size >= MAX_CACHED_SHARDS) shardCache.delete(shardCache.keys().next().value as string);
  shardCache.set(cacheKey, value);
  return value;
}

/** Open first, then most recently enrolled. */
function sortAccounts(records: EverifyRecord[]): EverifyRecord[] {
  return [...records].sort((a, b) => (a.s === b.s ? (b.en ?? "").localeCompare(a.en ?? "") : a.s === "o" ? -1 : 1));
}

/**
 * An open account is enrolled; an open account with a termination date ahead
 * is enrolled until then; a terminated account, or a passed termination
 * date, has ended.
 */
function stateOf(rec: EverifyRecord, today: string): EverifyState {
  if (rec.te && rec.te <= today) return "ended";
  if (rec.s === "o" && rec.te) return "ending";
  if (rec.s === "o") return "enrolled";
  return "ended";
}

export type EverifySearchError = "unavailable" | "too-short";

/** "10,000 and over" -> 10000, "5 to 9" -> 5, missing -> 0. */
function workforceRank(records: EverifyRecord[]): number {
  return Math.max(0, ...records.map((r) => Number((r.w ?? "").split(" ")[0].replace(/,/g, "")) || 0));
}

/**
 * The name a result is listed under. Shards index both the enrolled name and
 * the doing-business-as name, so a match found through its DBA ("Stripe") is
 * shown by that name, with the enrolled name underneath, not as an unrelated
 * looking legal name.
 */
function displayName(records: EverifyRecord[], key: string): { name: string; enrolledAs: string | null } {
  const viaName = records.find((r) => normalizeCompany(r.e)?.startsWith(key));
  if (viaName) return { name: viaName.e, enrolledAs: null };
  const viaDba = records.find((r) => r.d && normalizeCompany(r.d)?.startsWith(key));
  return viaDba ? { name: viaDba.d as string, enrolledAs: viaDba.e } : { name: records[0].e, enrolledAs: null };
}

/**
 * Exact match first, then names that start with the query: live accounts
 * before ended ones, then bigger employers first (a student typing "goo" is
 * far more likely to mean Google than a five-person company), then shorter
 * names.
 */
export async function searchEverify(raw: string): Promise<EverifySearchResult | EverifySearchError> {
  const key = normalizeCompany(raw);
  if (!key || key.length < 2) return "too-short";
  const sb = supabase();
  if (!sb) return "unavailable";

  const pointer = await readPointer(sb);
  if (!pointer) return "unavailable";
  const shard = await readShard(sb, pointer.version, shardOf(key));

  const today = new Date().toISOString().slice(0, 10);
  const keys = Object.keys(shard).filter((k) => k === key || k.startsWith(key));
  const ranked = keys
    .map((k) => {
      const accounts = sortAccounts(shard[k]);
      return { k, accounts, state: stateOf(accounts[0], today), size: workforceRank(accounts), ...displayName(accounts, key) };
    })
    .sort((a, b) => {
      if ((a.k === key) !== (b.k === key)) return a.k === key ? -1 : 1;
      const live = (m: typeof a) => (m.state === "ended" ? 1 : 0);
      if (live(a) !== live(b)) return live(a) - live(b);
      return b.size - a.size || a.k.length - b.k.length || a.k.localeCompare(b.k);
    })
    .slice(0, MAX_RESULTS);

  return {
    query: raw.trim(),
    syncedAt: pointer.syncedAt,
    sourceUpdated: pointer.sourceUpdated,
    totalEmployers: pointer.rows,
    matches: ranked.map(({ k, accounts, state, name, enrolledAs }) => ({
      name,
      enrolledAs,
      state,
      exact: k === key,
      accounts: accounts.map((r) => ({
        employer: r.e,
        dba: r.d ?? null,
        open: r.s === "o" && !(r.te && r.te <= today),
        enrolledOn: r.en ?? null,
        terminatesOn: r.te ?? null,
        workforce: r.w ?? null,
      })),
    })),
  };
}
