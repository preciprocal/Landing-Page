/**
 * app/api/tools/resume-check/route.ts
 *
 * POST multipart { file, jobTitle?, jobDescription? } -> the free ATS resume
 * check on /free-ats-checker: every score, a few complete fixes, and the
 * headlines of the rest. The analysis itself mirrors the app's; see
 * lib/resumeCheck/analysis.ts. No account, nothing stored.
 */

import { NextResponse } from "next/server";
import { MAX_JOB_DESC_CHARS, checkResume } from "@/lib/resumeCheck/analysis";
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

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

export async function POST(req: Request) {
  if (!allowedOrigin(req)) return json({ error: "Forbidden" }, 403);
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

  const outcome = await checkResume({
    buffer: Buffer.from(await file.arrayBuffer()),
    fileName: file.name,
    jobTitle: str(form?.get("jobTitle"), 120),
    jobDescription: str(form?.get("jobDescription"), MAX_JOB_DESC_CHARS),
  });

  return outcome.ok ? json(outcome.result) : json({ error: outcome.error }, outcome.status);
}
