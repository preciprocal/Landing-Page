/**
 * app/api/tools/rate-answer/route.ts
 *
 * POST { question, answer, role? } -> a score out of 10 with strengths, fixes,
 * a stronger opening and the follow-up an interviewer would ask. Backs the
 * "practice this answer" step and the "tell me about yourself" grader on
 * /interview-question-predictor. No account, nothing stored.
 */

import { NextResponse } from "next/server";
import { INPUT_LIMITS } from "@/lib/interviewTools/limits";
import { RatingSchema, type Rating } from "@/lib/interviewTools/schemas";
import { RATE_SYSTEM, allowedOrigin, rateLimit, runStructured } from "@/lib/interviewTools/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  if (!allowedOrigin(req)) return json({ error: "Forbidden" }, 403);
  if (!rateLimit(req, "rate", 20, 60 * 60 * 1000)) {
    return json({ error: "You have scored a lot of answers in the last hour. Please try again a little later." }, 429);
  }

  const body = await req.json().catch(() => null);
  const question = str(body?.question, INPUT_LIMITS.questionMax);
  const role = str(body?.role, INPUT_LIMITS.roleMax);
  const answer = typeof body?.answer === "string" ? body.answer.trim() : "";

  if (!question) return json({ error: "Missing the question." }, 400);
  if (answer.length < INPUT_LIMITS.answerMin) {
    return json({ error: "Write out your full answer, the way you would say it. That is too short to score." }, 400);
  }
  if (answer.length > INPUT_LIMITS.answerMax) {
    return json({ error: "That answer is too long to score. Most good answers are under 300 words." }, 400);
  }

  const prompt = [
    role ? `<role>${role}</role>` : "",
    `<question>${question}</question>`,
    `<answer>\n${answer}\n</answer>`,
  ]
    .filter(Boolean)
    .join("\n");

  const result = await runStructured(RatingSchema, RATE_SYSTEM, prompt);
  if (!result.ok) return json({ error: result.error }, result.status);

  const data: Rating = result.data;
  if (!data.is_answer) {
    return json({ error: "That does not look like an answer to the question. Write it out the way you would say it." }, 422);
  }

  return json({
    ...data,
    score: Math.min(10, Math.max(1, Math.round(data.score))),
    strengths: data.strengths.slice(0, 3),
    fixes: data.fixes.slice(0, 3),
  } satisfies Rating);
}
