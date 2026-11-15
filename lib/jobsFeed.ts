/**
 * lib/jobsFeed.ts
 *
 * Server side of the /jobs page: live job postings from employers' own job
 * boards (official Greenhouse, Lever and Ashby APIs), refreshed every 6 hours
 * by the Dashboard repo's scripts/everify/jobs-sync.mjs into the shared
 * Supabase project's private Storage bucket `jobs`:
 *
 *   jobs/current.json               { version, syncedAt, jobs, boards, maxAgeDays }
 *   jobs/v/<version>/jobs.json.gz   { generatedAt, maxAgeDays, h1bYear, jobs: StoredJob[] }
 *
 * Every stored job is live on the employer's board at the last refresh, first
 * published within maxAgeDays, in the US, deduplicated, and carries the
 * employer's E-Verify state and H-1B approvals from the USCIS copies.
 */

import { gunzipSync } from "node:zlib";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const POINTER_TTL_MS = 10 * 60 * 1000;
export const PAGE_SIZE = 25;

interface StoredJob {
  t: string; // title
  c: string; // company
  k: string; // employer key
  l: string; // location
  u: string; // apply URL on the employer's board
  p: string; // first published, YYYY-MM-DD
  f: "software" | "data" | "hardware" | "product" | "business" | "other";
  v: "intern" | "early" | "mid" | "senior";
  e: "enrolled" | "ending" | "ended" | "not-found";
  h: [number, number] | null; // [H-1B approvals, new-employment approvals] in h1bYear
}

export interface Job {
  title: string;
  company: string;
  location: string;
  url: string;
  posted: string;
  family: StoredJob["f"];
  level: StoredJob["v"];
  everify: StoredJob["e"];
  h1b: { approvals: number; newEmployment: number } | null;
}

export interface JobsQuery {
  q?: string;
  family?: string;
  level?: "intern" | "early" | "all";
  stem?: boolean;
  h1b?: boolean;
  days?: number;
  page?: number;
}

export interface JobsResult {
  jobs: Job[];
  total: number;
  page: number;
  pages: number;
  syncedAt: string;
  h1bYear: string | null;
  maxAgeDays: number;
  totalLive: number;
  employers: number;
}

let client: SupabaseClient | null | undefined;
function supabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  client = url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
  return client;
}

let cache: { at: number; version: string; data: { syncedAt: string; h1bYear: string | null; maxAgeDays: number; jobs: StoredJob[]; employers: number } } | null = null;

async function load() {
  if (cache && Date.now() - cache.at < POINTER_TTL_MS) return cache.data;
  const sb = supabase();
  if (!sb) return null;
  const { data: p, error: pe } = await sb.storage.from("jobs").download("current.json");
  if (pe || !p) return cache?.data ?? null;
  const pointer = JSON.parse(await p.text()) as { version: string; syncedAt: string };
  if (cache && cache.version === pointer.version) {
    cache.at = Date.now();
    return cache.data;
  }
  const { data: f, error: fe } = await sb.storage.from("jobs").download(`v/${pointer.version}/jobs.json.gz`);
  if (fe || !f) return cache?.data ?? null;
  const doc = JSON.parse(gunzipSync(Buffer.from(await f.arrayBuffer())).toString("utf8")) as { maxAgeDays: number; h1bYear: string | null; jobs: StoredJob[] };
  const data = { syncedAt: pointer.syncedAt, h1bYear: doc.h1bYear, maxAgeDays: doc.maxAgeDays, jobs: doc.jobs, employers: new Set(doc.jobs.map((j) => j.k)).size };
  cache = { at: Date.now(), version: pointer.version, data };
  return data;
}

const FAMILIES = new Set(["software", "data", "hardware", "product", "business", "other"]);

export async function searchJobs(query: JobsQuery): Promise<JobsResult | null> {
  const data = await load();
  if (!data) return null;
  const terms = (query.q ?? "").toLowerCase().split(/\s+/).filter(Boolean).slice(0, 6);
  const family = query.family && FAMILIES.has(query.family) ? query.family : null;
  const cutoff = query.days ? new Date(Date.now() - query.days * 86_400_000).toISOString().slice(0, 10) : null;

  const matched = data.jobs.filter((j) => {
    if (family && j.f !== family) return false;
    if (query.level === "intern" && j.v !== "intern") return false;
    if (query.level === "early" && j.v !== "early" && j.v !== "intern") return false;
    if (query.stem && j.e !== "enrolled" && j.e !== "ending") return false;
    if (query.h1b && !(j.h && j.h[0] > 0)) return false;
    if (cutoff && j.p < cutoff) return false;
    if (terms.length) {
      const hay = `${j.t} ${j.c} ${j.l}`.toLowerCase();
      if (!terms.every((t) => hay.includes(t))) return false;
    }
    return true;
  });

  const pages = Math.max(1, Math.ceil(matched.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, query.page ?? 1), pages);
  return {
    jobs: matched.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((j) => ({
      title: j.t,
      company: j.c,
      location: j.l,
      url: j.u,
      posted: j.p,
      family: j.f,
      level: j.v,
      everify: j.e,
      h1b: j.h ? { approvals: j.h[0], newEmployment: j.h[1] } : null,
    })),
    total: matched.length,
    page,
    pages,
    syncedAt: data.syncedAt,
    h1bYear: data.h1bYear,
    maxAgeDays: data.maxAgeDays,
    totalLive: data.jobs.length,
    employers: data.employers,
  };
}
