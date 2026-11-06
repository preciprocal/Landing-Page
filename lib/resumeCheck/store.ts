/**
 * lib/resumeCheck/store.ts
 *
 * Remembers each free ATS check so a returning visitor sees their result again
 * instead of a fresh upload form, and cannot run unlimited free checks by
 * clearing cookies. Table: public.free_ats_checks (supabase/free_ats_checks.sql).
 *
 * TWO WAYS A VISITOR IS RECOGNISED
 *   token    A random id in an httpOnly cookie, set when the check runs. A
 *            match is certainly the same browser, so the full result comes
 *            back: score, strengths, the free fixes and the locked headlines.
 *   network  No cookie, but the same IP address and browser within the
 *            retention window. This survives cleared cookies, but an IP is
 *            shared on campus and office networks, so a match may be someone
 *            else. It returns the scores only and nothing quoted from the
 *            resume, and the page offers sign-up to check another resume.
 *
 * The IP and user agent are stored only as salted sha256 hashes, never raw.
 * Unlike the analytics hash (app/api/collect), the salt here does not rotate,
 * because recognising a repeat visit is the point. The resume file itself is
 * never stored, only the result that was shown.
 *
 * If Supabase is not configured or the table does not exist yet, every call
 * here is a no-op and the checker works exactly as before.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createHash, randomUUID } from "node:crypto";
import type { ResumeCheckResult } from "./analysis";

const TABLE = "free_ats_checks";
export const COOKIE = "pp_ats_check";
/** How long a check is remembered. The privacy policy states this figure. */
export const RETENTION_DAYS = 30;
const RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1000;

export type Restored = "device" | "network";

export interface StoredCheck {
  result: ResumeCheckResult;
  restored: Restored;
  checkedAt: string;
}

let cached: SupabaseClient | null | undefined;

function db(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  cached = url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
  return cached;
}

function hash(kind: string, value: string): string {
  return createHash("sha256")
    .update(`ats-check|${kind}|${value}|${process.env.ANALYTICS_SALT ?? "unsalted-dev"}`)
    .digest("hex");
}

/** The visitor as this store sees them: hashes only, never the raw values. */
export function identify(req: Request, token: string | undefined) {
  const h = req.headers;
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  return {
    token: token && /^[0-9a-f-]{36}$/i.test(token) ? token : undefined,
    ipHash: hash("ip", ip),
    uaHash: hash("ua", h.get("user-agent") ?? ""),
  };
}

type Visitor = ReturnType<typeof identify>;

/** A network match may be another person, so nothing from the resume goes back. */
function scoresOnly(r: ResumeCheckResult): ResumeCheckResult {
  return { ...r, strengths: [], fixes: [], locked: [] };
}

export async function findCheck(v: Visitor): Promise<StoredCheck | null> {
  const client = db();
  if (!client) return null;
  const since = new Date(Date.now() - RETENTION_MS).toISOString();
  try {
    if (v.token) {
      const { data } = await client
        .from(TABLE)
        .select("result, created_at")
        .eq("token", v.token)
        .gte("created_at", since)
        .maybeSingle();
      if (data) return { result: data.result as ResumeCheckResult, restored: "device", checkedAt: data.created_at };
    }
    const { data } = await client
      .from(TABLE)
      .select("result, created_at")
      .eq("ip_hash", v.ipHash)
      .eq("ua_hash", v.uaHash)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) return { result: scoresOnly(data.result as ResumeCheckResult), restored: "network", checkedAt: data.created_at };
  } catch (e) {
    console.error("[resume-check] lookup failed", (e as Error).message);
  }
  return null;
}

/** Saves the check and returns the cookie token, or null if nothing was saved. */
export async function saveCheck(v: Visitor, result: ResumeCheckResult): Promise<string | null> {
  const client = db();
  if (!client) return null;
  const token = randomUUID();
  const { error } = await client.from(TABLE).insert({
    token,
    ip_hash: v.ipHash,
    ua_hash: v.uaHash,
    overall_score: result.overallScore,
    has_job_context: result.hasJobContext,
    result,
  });
  if (error) {
    console.error("[resume-check] save failed", error.message);
    return null;
  }
  // Retention: clear anything past the window. Cheap, and keeps the promise
  // in the privacy policy without a scheduled job.
  await client
    .from(TABLE)
    .delete()
    .lt("created_at", new Date(Date.now() - RETENTION_MS).toISOString())
    .then(({ error: e }) => e && console.error("[resume-check] cleanup failed", e.message));
  return token;
}
