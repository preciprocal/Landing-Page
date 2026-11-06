/**
 * app/api/tools/resume-check/route.ts
 *
 * The free ATS resume check on /free-ats-checker.
 *
 *   GET   The visitor's earlier check, if there is one (see
 *         lib/resumeCheck/store.ts), so the page can show it again.
 *   POST  multipart { file, jobTitle?, jobDescription? }: every score, a few
 *         complete fixes, and the headlines of the rest. The analysis mirrors
 *         the app's; see lib/resumeCheck/analysis.ts. A visitor who already has
 *         a check gets that one back instead of a new one.
 *
 * Both answer with the result plus { restored?, checkedAt? }.
 */

import { NextResponse, type NextRequest } from "next/server";
import { MAX_JOB_DESC_CHARS, checkResume } from "@/lib/resumeCheck/analysis";
import {
  COOKIE,
  RETENTION_DAYS,
  claimCheck,
  finishCheck,
  findCheck,
  identify,
  releaseCheck,
  type StoredCheck,
} from "@/lib/resumeCheck/store";
import { allowedOrigin, rateLimit } from "@/lib/interviewTools/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Vercel rejects request bodies over 4.5 MB before this code runs, so the
 * limit here sits just under it and gets a clear message. A one or two page
 * resume is a few hundred KB.
 */
const MAX_FILE_BYTES = 4 * 1024 * 1024;

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store" } });

const REFUSALS = {
  "in-flight": "Your resume is already being checked. Give it a few seconds and it will appear here.",
  "ip-cap": "The free check has already been used from your network. Create a free account to check your resume, with 3 analyses every month.",
  "daily-cap": "Free checks are used up for today. Create a free account to check your resume now, with 3 analyses every month.",
} as const;

const stored = (s: StoredCheck) => json({ ...s.result, restored: s.restored, checkedAt: s.checkedAt });

export async function GET(req: NextRequest) {
  const found = await findCheck(identify(req, req.cookies.get(COOKIE)?.value));
  return found ? stored(found) : json({ result: null });
}

export async function POST(req: NextRequest) {
  if (!allowedOrigin(req)) return json({ error: "Forbidden" }, 403);

  // One free check per visitor: a returning visitor sees the check they
  // already ran, and spends no model calls doing so.
  const visitor = identify(req, req.cookies.get(COOKIE)?.value);
  const found = await findCheck(visitor);
  if (found) return stored(found);

  // Five model calls per check, so a tighter limit than the question tools.
  if (!rateLimit(req, "resume-check", 3, 60 * 60 * 1000)) {
    return json(
      { error: "You have run a few checks in the last hour. Create a free account to keep going, or try again later." },
      429
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return json({ error: "Choose your resume file first." }, 400);
  if (file.size === 0) return json({ error: "That file is empty." }, 400);
  if (file.size > MAX_FILE_BYTES) return json({ error: "That file is over 4 MB. Export your resume as a smaller PDF and try again." }, 400);

  const str = (v: FormDataEntryValue | null | undefined, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

  // The free allowance, counted in the database (see claimCheck).
  const claim = await claimCheck(visitor);
  if (!claim.ok) return json({ error: REFUSALS[claim.reason], limit: claim.reason }, 429);

  const outcome = await checkResume({
    buffer: Buffer.from(await file.arrayBuffer()),
    fileName: file.name,
    jobTitle: str(form?.get("jobTitle"), 120),
    jobDescription: str(form?.get("jobDescription"), MAX_JOB_DESC_CHARS),
  }).catch((e) => {
    if (claim.token) void releaseCheck(claim.token);
    throw e;
  });
  if (!outcome.ok) {
    // A failed check does not use up the free one.
    if (claim.token) await releaseCheck(claim.token);
    return json({ error: outcome.error }, outcome.status);
  }

  const res = json(outcome.result);
  const token = claim.token && (await finishCheck(claim.token, outcome.result)) ? claim.token : null;
  if (token) {
    res.cookies.set(COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: RETENTION_DAYS * 24 * 60 * 60,
    });
  }
  return res;
}
