/**
 * lib/interviewTools/schemas.ts
 *
 * The response shapes for the two free AI tools on /interview-question-predictor:
 * predicting questions from a job description, and scoring a typed answer.
 *
 * These schemas do double duty. On the server they are handed to the Claude API
 * as structured output formats, so the model can only return JSON in exactly
 * this shape. In the browser only the inferred types are imported, so zod never
 * ends up in the client bundle.
 *
 * Counts and score ranges are deliberately not expressed as zod constraints:
 * structured outputs reject most numeric and length keywords, so the server
 * clamps them after parsing instead (see server.ts). Input caps live in
 * limits.ts, which the browser does import, so it must stay free of zod.
 */

import { z } from "zod";

export const QUESTION_TYPES = ["behavioral", "technical", "role-specific", "situational", "motivation"] as const;

export const PredictionSchema = z.object({
  /** False when the pasted text is not a job posting. questions is then empty. */
  is_job_description: z.boolean(),
  role_title: z.string(),
  /** Empty string when the posting does not name the company. */
  company: z.string(),
  questions: z.array(
    z.object({
      question: z.string(),
      type: z.enum(QUESTION_TYPES),
      /** The shortest phrase, quoted verbatim from the posting, that prompts this question. */
      jd_signal: z.string(),
      why_they_ask: z.string(),
      what_good_looks_like: z.array(z.string()),
    })
  ),
});

export const RatingSchema = z.object({
  /** False when the text is not an attempt at answering the question. */
  is_answer: z.boolean(),
  /** 1 to 10, where 5 is a typical candidate answer and 8 would advance. */
  score: z.number(),
  verdict: z.string(),
  strengths: z.array(z.string()),
  fixes: z.array(z.object({ issue: z.string(), suggestion: z.string() })),
  /** The candidate's first sentence or two, tightened, using only facts they gave. */
  stronger_opening: z.string(),
  /** What a sharp interviewer would ask next. The hook into a live mock interview. */
  follow_up_question: z.string(),
});

export type Prediction = z.infer<typeof PredictionSchema>;
export type PredictedQuestion = Prediction["questions"][number];
export type Rating = z.infer<typeof RatingSchema>;

/** What both routes return when they cannot produce a result. */
export interface ToolError {
  error: string;
}
