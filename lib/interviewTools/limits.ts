/**
 * lib/interviewTools/limits.ts
 *
 * Input caps for the free interview tools, shared by the textareas and the
 * route handlers so the two cannot drift. Kept apart from schemas.ts because
 * the browser imports this as a value, and that file pulls in zod.
 */

export const INPUT_LIMITS = {
  jobDescriptionMin: 200,
  jobDescriptionMax: 15_000,
  answerMin: 40,
  answerMax: 5_000,
  questionMax: 400,
  roleMax: 120,
} as const;
