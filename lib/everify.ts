/**
 * lib/everify.ts
 *
 * Server side of the free employer check on /opt/employer-lookup:
 * E-Verify enrolment (which STEM OPT requires) and H-1B petition history, for
 * any US employer.
 *
 * Two public USCIS datasets, copied by the Dashboard repo into the shared
 * Supabase project's private Storage (scripts/everify/ there):
 *
 *   everify/  the E-Verify Employer Search, daily (sync.mjs)
 *     current.json                { version, syncedAt, rows, sourceUpdated }
 *     v/<version>/<shard>.json.gz { "<normalised name>": EverifyRecord[] }
 *   h1b/      the H-1B Employer Data Hub, monthly (h1b-sync.mjs)
 *     current.json                { version, syncedAt, employers, years, dataThrough }
 *     v/<version>/<shard>.json.gz { "<normalised name>": H1bRecord }
 *
 * Both are sharded by the first two characters of the normalised name, so a
 * name and every name it is a prefix of sit in the same shard: one download
 * per dataset answers a search-as-you-type query.
 *
 * normalizeCompany and shardOf MUST stay identical to the Dashboard's
 * lib/jobs/everify-store.ts, or names will be looked for in the wrong shard.
 */

import { gunzipSync } from "node:zlib";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const POINTER = "current.json";
const POINTER_TTL_MS = 10 * 60 * 1000;
const MAX_CACHED_SHARDS = 160;
const MAX_RESULTS = 8;

interface EverifyPointer {
  version: string;
  syncedAt: string;
  rows: number;
  sourceUpdated: string | null;
}

interface H1bPointer {
  version: string;
  syncedAt: string;
  employers: number;
  /** Fiscal years held, newest first. */
  years: string[];
  dataThrough: string | null;
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

/** One employer's H-1B decisions: per fiscal year [new employment approvals, all approvals, all denials], in workers. */
interface H1bRecord {
  n: string;
  st?: string;
  y: Record<string, [number, number, number]>;
}

export type EverifyState = "enrolled" | "ending" | "ended" | "not-found";

export interface EverifyAccount {
  employer: string;
  dba: string | null;
  open: boolean;
  enrolledOn: string | null;
  terminatesOn: string | null;
  workforce: string | null;
}

export interface H1bYear {
  year: string;
  newEmployment: number;
  approvals: number;
  denials: number;
}

export interface EmployerMatch {
  /** The name that matched the search. */
  name: string;
  /** Set when the E-Verify match came through the DBA name: the name actually enrolled. */
  enrolledAs: string | null;
  exact: boolean;
  everify: { state: EverifyState; accounts: EverifyAccount[] };
  /** Null when the employer has no H-1B decisions on record in the years held. */
  h1b: { employer: string; years: H1bYear[] } | null;
}

export interface EmployerSearchResult {
  query: string;
  matches: EmployerMatch[];
  everify: { records: number; sourceUpdated: string | null };
  /** Null until the first H-1B sync has run. */
  h1b: { employers: number; years: string[]; dataThrough: string | null } | null;
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
// cached by bucket, version and shard.
const pointerCache = new Map<string, { at: number; value: unknown }>();
const shardCache = new Map<string, unknown>();

async function readPointer<T>(sb: SupabaseClient, bucket: string): Promise<T | null> {
  const hit = pointerCache.get(bucket);
  if (hit && Date.now() - hit.at < POINTER_TTL_MS) return hit.value as T | null;
  const { data, error } = await sb.storage.from(bucket).download(POINTER);
  const value = error || !data ? null : (JSON.parse(await data.text()) as T);
  pointerCache.set(bucket, { at: Date.now(), value });
  return value;
}

async function readShard<T>(sb: SupabaseClient, bucket: string, version: string, shard: string): Promise<Record<string, T>> {
  const cacheKey = `${bucket}/${version}/${shard}`;
  if (shardCache.has(cacheKey)) {
    const hit = shardCache.get(cacheKey) as Record<string, T>;
    // Move to the back so the least recently used shard is evicted first.
    shardCache.delete(cacheKey);
    shardCache.set(cacheKey, hit);
    return hit;
  }
  const { data, error } = await sb.storage.from(bucket).download(`v/${version}/${shard}.json.gz`);
  // A missing shard means no employer name starts with those characters.
  const value =
    error || !data ? {} : (JSON.parse(gunzipSync(Buffer.from(await data.arrayBuffer())).toString("utf8")) as Record<string, T>);
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

/** "10,000 and over" -> 10000, "5 to 9" -> 5, missing -> 0. */
function workforceRank(records: EverifyRecord[]): number {
  return Math.max(0, ...records.map((r) => Number((r.w ?? "").split(" ")[0].replace(/,/g, "")) || 0));
}

const h1bTotal = (r: H1bRecord | undefined) => (r ? Object.values(r.y).reduce((s, v) => s + v[1], 0) : 0);

/**
 * The name a result is listed under. E-Verify shards index both the enrolled
 * name and the doing-business-as name, so a match found through its DBA
 * ("Stripe") is shown by that name, with the enrolled name underneath.
 */
function displayName(records: EverifyRecord[], key: string): { name: string; enrolledAs: string | null } {
  const viaName = records.find((r) => normalizeCompany(r.e)?.startsWith(key));
  if (viaName) return { name: viaName.e, enrolledAs: null };
  const viaDba = records.find((r) => r.d && normalizeCompany(r.d)?.startsWith(key));
  return viaDba ? { name: viaDba.d as string, enrolledAs: viaDba.e } : { name: records[0].e, enrolledAs: null };
}

export type EmployerSearchError = "unavailable" | "too-short";

/**
 * Names that equal or start with the query, in either dataset. Exact match
 * first, then bigger employers (by E-Verify workforce band or H-1B approvals,
 * whichever is larger: a student typing "goo" means Google), then employers
 * with a live E-Verify account, then shorter names.
 *
 * For the exact match only, when the employer has no H-1B record under that
 * exact name, the largest H-1B employer whose name starts with it as a whole
 * word is used ("amazon" -> AMAZON COM SERVICES LLC), since petitions are
 * filed under the legal entity; its name is shown with the figures.
 */
export async function searchEmployers(raw: string): Promise<EmployerSearchResult | EmployerSearchError> {
  const key = normalizeCompany(raw);
  if (!key || key.length < 2) return "too-short";
  const sb = supabase();
  if (!sb) return "unavailable";

  const [ePointer, hPointer] = await Promise.all([
    readPointer<EverifyPointer>(sb, "everify"),
    readPointer<H1bPointer>(sb, "h1b").catch(() => null),
  ]);
  if (!ePointer) return "unavailable";
  const shard = shardOf(key);
  const noH1b: Record<string, H1bRecord> = {};
  const [eShard, hShard] = await Promise.all([
    readShard<EverifyRecord[]>(sb, "everify", ePointer.version, shard),
    hPointer ? readShard<H1bRecord>(sb, "h1b", hPointer.version, shard).catch(() => noH1b) : Promise.resolve(noH1b),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const years = hPointer?.years ?? [];
  const matches = (k: string) => k === key || k.startsWith(key);
  const keys = new Set([...Object.keys(eShard).filter(matches), ...Object.keys(hShard).filter(matches)]);

  const rows = [...keys].map((k) => {
    const accounts = eShard[k] ? sortAccounts(eShard[k]) : [];
    let h = hShard[k];
    if (!h && k === key) {
      for (const [hk, r] of Object.entries(hShard)) if (hk.startsWith(`${key} `) && h1bTotal(r) > h1bTotal(h)) h = r;
    }
    const state: EverifyState = accounts.length ? stateOf(accounts[0], today) : "not-found";
    const named = accounts.length ? displayName(accounts, key) : { name: h?.n ?? k, enrolledAs: null };
    return { k, accounts, h, state, size: Math.max(workforceRank(accounts), h1bTotal(h)), ...named };
  });

  rows.sort((a, b) => {
    if ((a.k === key) !== (b.k === key)) return a.k === key ? -1 : 1;
    if (a.size !== b.size) return b.size - a.size;
    const live = (m: typeof a) => (m.state === "enrolled" || m.state === "ending" ? 0 : 1);
    return live(a) - live(b) || a.k.length - b.k.length || a.k.localeCompare(b.k);
  });

  return {
    query: raw.trim(),
    everify: { records: ePointer.rows, sourceUpdated: ePointer.sourceUpdated },
    h1b: hPointer ? { employers: hPointer.employers, years, dataThrough: hPointer.dataThrough } : null,
    matches: rows.slice(0, MAX_RESULTS).map(({ k, accounts, h, state, name, enrolledAs }) => ({
      name,
      enrolledAs,
      exact: k === key,
      everify: {
        state,
        accounts: accounts.map((r) => ({
          employer: r.e,
          dba: r.d ?? null,
          open: r.s === "o" && !(r.te && r.te <= today),
          enrolledOn: r.en ?? null,
          terminatesOn: r.te ?? null,
          workforce: r.w ?? null,
        })),
      },
      h1b:
        h && h1bTotal(h) + Object.values(h.y).reduce((s, v) => s + v[2], 0) > 0
          ? {
              employer: h.n,
              years: years.map((year) => {
                const [newEmployment, approvals, denials] = h.y[year] ?? [0, 0, 0];
                return { year, newEmployment, approvals, denials };
              }),
            }
          : null,
    })),
  };
}
