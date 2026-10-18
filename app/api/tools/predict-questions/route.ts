/**
 * app/api/tools/predict-questions/route.ts
 *
 * POST { jobDescription } -> the five questions most likely to be asked for
 * that role. Backs the free tool on /interview-question-predictor. No account,
 * nothing stored; see lib/interviewTools/server.ts for the guards.
 */

import { NextResponse } from "next/server";
import { INPUT_LIMITS } from "@/lib/interviewTools/limits";
import { PredictionSchema, type Prediction } from "@/lib/interviewTools/schemas";
import { PREDICT_SYSTEM, allowedOrigin, rateLimit, runStructured } from "@/lib/interviewTools/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

export async function POST(req: Request) {
  if (!allowedOrigin(req)) return json({ error: "Forbidden" }, 403);
  if (!rateLimit(req, "predict", 8, 60 * 60 * 1000)) {
    return json({ error: "You have run this a lot in the last hour. Please try again a little later." }, 429);
  }

  const body = await req.json().catch(() => null);
  const jd = typeof body?.jobDescription === "string" ? body.jobDescription.trim() : "";

  if (jd.length < INPUT_LIMITS.jobDescriptionMin) {
    return json({ error: "Paste the full job description. That looks too short to predict from." }, 400);
  }
  if (jd.length > INPUT_LIMITS.jobDescriptionMax) {
    return json({ error: "That job description is very long. Paste just the role, responsibilities and requirements." }, 400);
  }

  const result = await runStructured(PredictionSchema, PREDICT_SYSTEM, `<job_posting>\n${jd}\n</job_posting>`);
  if (!result.ok) return json({ error: result.error }, result.status);

  const data: Prediction = result.data;
  if (!data.is_job_description || data.questions.length === 0) {
    return json({ error: "That does not look like a job description. Paste the posting itself and try again." }, 422);
  }

  return json({
    ...data,
    questions: data.questions.slice(0, 5).map((q) => ({
      ...q,
      what_good_looks_like: q.what_good_looks_like.slice(0, 3),
    })),
  } satisfies Prediction);
}
