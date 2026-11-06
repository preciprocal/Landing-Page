/**
 * lib/resumeCheck/store.ts
 *
 * Remembers each free ATS check so a returning visitor sees their result again
 * instead of a fresh upload form, and enforces the free allowance so the
 * checker cannot be used as an unlimited free resume service.
 * Table: public.free_ats_checks (supabase/free_ats_checks.sql).
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
 * THE ALLOWANCE (claimCheck), all counted in the database, so it holds across
 * server instances and restarts, unlike the in-memory rate limit:
 *   - one check per visitor (the lookup above),
 *   - at most IP_CAP checks per IP address per retention window, whatever the
 *     browser, so switching browsers or clearing cookies does not reset it,
 *     while a few people on one campus network can still each check once,
 *   - one check in flight per IP: a row is claimed before the model runs, so
 *     parallel uploads cannot all slip through during the ~15s a check takes,
 *   - DAILY_CAP checks a day across the whole site, which bounds the spend
 *     even against someone rotating IP addresses.
 *
 * The IP and user agent are stored only as salted sha256 hashes, never raw.
 * Unlike the analytics hash (app/api/collect), the salt here does not rotate,
 * because recognising a repeat visit is the point. The resume file itself is
 * never stored, only the result that was shown.
 *
 * If Supabase is not configured or the table does not exist yet, every call
 * here allows the check and stores nothing, leaving only the in-memory rate
 * limit in the route. Run the SQL file so the allowance is enforced.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createHash, randomUUID } from "node:crypto";
import type { ResumeCheckResult } from "./analysis";

const TABLE = "free_ats_checks";
export const COOKIE = "pp_ats_check";
/** How long a check is remembered. The privacy policy states this figure. */
export const RETENTION_DAYS = 30;
const RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1000;
/** Checks per IP address per retention window, across all browsers. */
const IP_CAP = Number(process.env.ATS_CHECK_IP_CAP) || 3;
/** Checks per day across the whole site. About $0.07 each. */
const DAILY_CAP = Number(process.env.ATS_CHECK_DAILY_CAP) || 200;
/** A claimed check older than this without a result was abandoned. */
const IN_FLIGHT_MS = 2 * 60 * 1000;

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

const ago = (ms: number) => new Date(Date.now() - ms).toISOString();

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

export type Visitor = ReturnType<typeof identify>;

/** A network match may be another person, so nothing from the resume goes back. */
function scoresOnly(r: ResumeCheckResult): ResumeCheckResult {
  return { ...r, strengths: [], fixes: [], locked: [] };
}

/** The visitor's finished check, if they have one. */
export async function findCheck(v: Visitor): Promise<StoredCheck | null> {
  const client = db();
  if (!client) return null;
  const since = ago(RETENTION_MS);
  try {
    if (v.token) {
      const { data } = await client
        .from(TABLE)
        .select("result, created_at")
        .eq("token", v.token)
        .not("result", "is", null)
        .gte("created_at", since)
        .maybeSingle();
      if (data) return { result: data.result as ResumeCheckResult, restored: "device", checkedAt: data.created_at };
    }
    const { data } = await client
      .from(TABLE)
      .select("result, created_at")
      .eq("ip_hash", v.ipHash)
      .eq("ua_hash", v.uaHash)
      .not("result", "is", null)
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

export type Claim =
  | { ok: true; token: string | null }
  | { ok: false; reason: "in-flight" | "ip-cap" | "daily-cap" };

/**
 * Reserves a check before the model runs. Call finishCheck or releaseCheck
 * with the token afterwards. token null means nothing could be stored (no
 * database), and the check goes ahead unrecorded.
 */
export async function claimCheck(v: Visitor): Promise<Claim> {
  const client = db();
  if (!client) return { ok: true, token: null };

  const rows = () => client.from(TABLE).select("id", { count: "exact", head: true });
  const count = async (query: PromiseLike<{ count: number | null; error: { message: string } | null }>) => {
    const { count: n, error } = await query;
    if (error) throw new Error(error.message);
    return n ?? 0;
  };

  try {
    const [inFlight, perIp, today] = await Promise.all([
      count(rows().eq("ip_hash", v.ipHash).is("result", null).gte("created_at", ago(IN_FLIGHT_MS))),
      count(rows().eq("ip_hash", v.ipHash).gte("created_at", ago(RETENTION_MS))),
      count(rows().gte("created_at", ago(24 * 60 * 60 * 1000))),
    ]);
    if (inFlight > 0) return { ok: false, reason: "in-flight" };
    if (perIp >= IP_CAP) return { ok: false, reason: "ip-cap" };
    if (today >= DAILY_CAP) return { ok: false, reason: "daily-cap" };

    const token = randomUUID();
    const { error } = await client.from(TABLE).insert({ token, ip_hash: v.ipHash, ua_hash: v.uaHash });
    if (error) throw new Error(error.message);

    // Two requests can pass the counts above at the same moment. Both rows
    // now exist, so the earliest in-flight claim for this IP wins and any
    // other backs out.
    const { data: racing } = await client
      .from(TABLE)
      .select("token")
      .eq("ip_hash", v.ipHash)
      .is("result", null)
      .gte("created_at", ago(IN_FLIGHT_MS))
      .order("created_at", { ascending: true })
      .order("token", { ascending: true })
      .limit(1);
    if (racing?.[0] && racing[0].token !== token) {
      await releaseCheck(token);
      return { ok: false, reason: "in-flight" };
    }
    return { ok: true, token };
  } catch (e) {
    // Table missing or database down: allow the check rather than break the
    // tool. The route's in-memory rate limit still applies.
    console.error("[resume-check] allowance check failed", (e as Error).message);
    return { ok: true, token: null };
  }
}

/** Stores the result on the claimed row. */
export async function finishCheck(token: string, result: ResumeCheckResult): Promise<boolean> {
  const client = db();
  if (!client) return false;
  const { error } = await client
    .from(TABLE)
    .update({ result, overall_score: result.overallScore, has_job_context: result.hasJobContext })
    .eq("token", token);
  if (error) {
    console.error("[resume-check] save failed", error.message);
    return false;
  }
  // Retention: clear anything past the window, and claims that never
  // finished. Cheap, and keeps the promise in the privacy policy without a
  // scheduled job.
  await client
    .from(TABLE)
    .delete()
    .or(`created_at.lt.${ago(RETENTION_MS)},and(result.is.null,created_at.lt.${ago(IN_FLIGHT_MS)})`)
    .then(({ error: e }) => e && console.error("[resume-check] cleanup failed", e.message));
  return true;
}

/** Gives back a claim whose check failed, so the visitor can try again. */
export async function releaseCheck(token: string): Promise<void> {
  const client = db();
  if (!client) return;
  await client.from(TABLE).delete().eq("token", token).is("result", null);
}
