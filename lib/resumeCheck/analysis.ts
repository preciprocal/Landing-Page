/**
 * lib/resumeCheck/analysis.ts
 *
 * Server-only. The free ATS resume check on /free-ats-checker.
 *
 * MIRRORS THE APP. The analysis is a port of the Dashboard repo's resume
 * analysis (app/api/analyze-resume/route.ts and lib/ai/claude.ts, as of
 * Dashboard main 9210ab0), so a visitor's free preview and the analysis they
 * get after signing up score the same resume the same way:
 *
 *   - the same system prompt, section briefs and language/punctuation rules,
 *     copied verbatim
 *   - one call per dimension, all five at once, on Sonnet 5.5 with thinking
 *     off ("between_tools") at low effort, max_tokens 2500, falling back to
 *     Sonnet 4.6 when Sonnet 5.5 declines
 *   - the same tip schema, validated the same way and retried once
 *   - the same weighted overall score
 *   - the same truncated-JSON repair and em/en dash cleanup
 *
 * If the app's prompt, model or weights change, change them here too, or the
 * two results drift apart.
 *
 * WHAT IS RETURNED. The full analysis never leaves the server. The page gets
 * every score, a few complete fixes, and only the one-line headline of the
 * rest, so the locked rewrites cannot be read out of the page source. The
 * full analysis is what the free account in the app shows.
 *
 * Nothing is stored. The file is read, sent to the model, and dropped.
 */

import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { claude } from "@/lib/interviewTools/server";

// ─── Model settings (Dashboard: ANALYSIS_MODEL, CLAUDE_MODEL, fastParams) ──

const ANALYSIS_MODEL = "claude-sonnet-5-5";
const FALLBACK_MODEL = "claude-sonnet-4-6";
const MAX_RESUME_CHARS = 12_000;
export const MAX_JOB_DESC_CHARS = 3_000;

// ─── Prompt (Dashboard: LANGUAGE_MATCH_INSTRUCTION, ANALYSIS_SYSTEM) ────────

const LANGUAGE_MATCH_INSTRUCTION = `

LANGUAGE: Detect the language the candidate's resume, job description, and/or job title are written in. If it is not English, respond ENTIRELY in that language - every piece of narrative text: feedback, explanations, quotes, tips, verdicts, AND any rewritten/tailored/"improved" text you generate. The candidate must be able to use your output directly, so a rewritten bullet point must be written in their language, not translated-then-English. Keep JSON field names exactly as specified in the schema (always English) - only the string VALUES change language. If the resume and job description are in different languages, prefer the resume's language for anything the candidate will reuse (rewrites, edits), since that is the language of the document they will submit. If everything is in English, respond in English as normal.

PUNCTUATION: Never use em dashes (—) or en dashes (–) in text you write. Use a comma, colon, period, or a plain hyphen (-) instead, and write ranges as "2019-2021". The only exception is text you quote verbatim from the resume (such as originalText or targetLine), which must stay exactly as written.`;

const ANALYSIS_SYSTEM = `You are a brutally honest senior recruiter who has reviewed 50,000+ resumes at Google, Amazon, and top VC-backed startups. Your job is NOT to make the candidate feel good - it is to tell them exactly what is wrong so they can actually get hired.

RULES:
1. Do NOT sugarcoat. If something is bad, say it's bad and say exactly WHY.
2. Reference SPECIFIC content from the resume in every tip. Never give generic advice.
3. "Improve" tips must include a concrete "solution" - a copy-pasteable rewrite.
4. Scores calibrated against real hired candidates: 90-100 top 5%, 70-89 above average, 50-69 mediocre (most resumes), 30-49 weak, 0-29 reject.
5. Do NOT pad scores. An honest 55 is more valuable than a dishonest 80.
6. Be specific about WHICH line, bullet, or section you are referencing.
7. The professional summary is OUT OF SCOPE. Never write a tip about a summary,
   objective, profile, personal statement, or "about me" section. Do not suggest
   adding one, rewriting one, shortening one or removing one, and never remark on
   its absence. If the resume has one, skip past it: do not quote it, do not
   reference it, and do not let its quality or absence affect any score. Spend
   that tip on experience, skills, or measurable impact instead.
8. You will be asked to score ONE dimension of the resume. Stay strictly inside
   it. The other dimensions are reviewed separately, so do not repeat their points.
9. NEVER invent facts in a "solution". A rewrite may only use what the resume
   actually says: do not add numbers, percentages, dollar amounts, time savings,
   team sizes, user counts, tools, employers or outcomes that are not already
   in it. Where a stronger bullet needs a figure the resume does not give, put
   a clearly marked placeholder in square brackets for the candidate to fill
   with their real number, such as "[X]%", "[number of] users" or "from [before]
   to [after]", and never a made-up value. A recruiter can ask about every
   number on a resume, so a fabricated one hurts the candidate.

IMPORTANT: Read the ENTIRE resume thoroughly before scoring.

CRITICAL: Return ONLY a valid JSON object. No markdown fences, no preamble. Start with { and end with }.

{ "score": <0-100>, "tips": [{ "type": "good"|"improve", "tip": "<specific>", "explanation": "<why>", "solution": "<for improve only>" }] }

Exactly 5 tips, mix of good/improve. At least 2 improve tips must have a "solution".

LENGTH: Be dense, not long. Each "tip" is one sentence. Each "explanation" is at most two sentences. A "solution" is only the rewritten text, with no preamble like "Change it to".${LANGUAGE_MATCH_INSTRUCTION}`;

// ─── Dimensions and weights (Dashboard: SCORE_WEIGHTS, SECTION_BRIEFS) ──────

const SCORE_WEIGHTS = {
  content: 0.3,
  ATS: 0.25,
  skills: 0.2,
  structure: 0.15,
  toneAndStyle: 0.1,
} as const;

export type SectionKey = keyof typeof SCORE_WEIGHTS;

const SECTION_BRIEFS: Record<SectionKey, string> = {
  ATS: "ATS compatibility: whether an applicant tracking system can parse this resume (layout, headings, dates, contact details) and whether it carries the keywords the target role needs.",
  toneAndStyle: "Tone and style: voice, action verbs, consistency of tense and formatting, concision, and buzzwords or filler.",
  content: "Content: the substance of the experience and projects, measurable impact, specificity, and relevance to the target role.",
  structure: "Structure: section order, layout, length, visual hierarchy, and how quickly a recruiter can scan it.",
  skills: "Skills: which skills are shown, how credibly the experience backs them, gaps against the target role, and how the skills section is organised.",
};

export const SECTION_LABELS: Record<SectionKey, string> = {
  content: "Content and impact",
  ATS: "ATS compatibility",
  skills: "Skills",
  structure: "Structure",
  toneAndStyle: "Tone and style",
};

// ─── Schema (Dashboard: tipSchema, sectionSchema) ───────────────────────────

const tipSchema = z.object({
  type: z.enum(["good", "improve"]),
  tip: z.string(),
  explanation: z.string().optional(),
  solution: z.string().optional(),
});

const sectionSchema = z.object({
  score: z.number().min(0).max(100),
  // The prompt asks for exactly 5, but on a short resume a dimension can
  // honestly have only two things to say (structure, most often). Accept any
  // number rather than fail the whole check; extras are sliced off before
  // parsing.
  tips: z.array(tipSchema).min(1).max(6),
});

/**
 * The same shape as sectionSchema, as JSON Schema for structured output.
 * Structured output does not support number or array-length constraints, so
 * those stay in sectionSchema, which still validates every reply.
 */
const SECTION_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["score", "tips"],
  properties: {
    score: { type: "integer" },
    tips: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["type", "tip", "explanation", "solution"],
        properties: {
          type: { type: "string", enum: ["good", "improve"] },
          tip: { type: "string" },
          explanation: { type: "string" },
          solution: { type: "string" },
        },
      },
    },
  },
} as const;

type Section = z.infer<typeof sectionSchema>;

// ─── File handling (Dashboard: detectFileKind, extractTextFromWord) ─────────

export type FileKind = "pdf" | "word" | "unknown";

export function detectFileKind(buffer: Buffer, fileName: string): FileKind {
  const name = fileName.toLowerCase();
  const hex4 = buffer.subarray(0, 4).toString("hex");
  const asc4 = buffer.subarray(0, 4).toString("ascii");
  if (asc4.startsWith("%PDF")) return "pdf";
  if (hex4 === "504b0304" || hex4.startsWith("d0cf11e0")) return "word";
  if (name.endsWith(".pdf")) return "pdf";
  if (name.endsWith(".docx") || name.endsWith(".doc")) return "word";
  return "unknown";
}

async function extractTextFromWord(buffer: Buffer): Promise<string> {
  const mammoth = await import("mammoth");
  return (await mammoth.extractRawText({ buffer })).value ?? "";
}

/** Dashboard: cleanResumeText. Strips PDF and Word extraction noise. */
function cleanResumeText(text: string): string {
  return text
    .replace(/\f/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}

// ─── JSON repair (Dashboard: extractJsonString and its private helpers) ─────

function scanDepth(s: string) {
  let inString = false;
  let escaped = false;
  let braces = 0;
  let brackets = 0;
  for (const ch of s) {
    if (escaped) { escaped = false; continue; }
    if (ch === "\\" && inString) { escaped = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{") braces++;
    else if (ch === "}") braces--;
    else if (ch === "[") brackets++;
    else if (ch === "]") brackets--;
  }
  return { inString, braces, brackets };
}

function repairTruncatedJson(raw: string): string {
  let s = raw;
  if (scanDepth(s).inString) {
    if (s.endsWith("\\")) s += "\\";
    s += '"';
  }
  let prev = "";
  while (prev !== s) {
    prev = s;
    s = s.replace(/,\s*$/, "");
    s = s.replace(/,\s*"[^"]*"\s*:\s*"[^"]*$/, "");
    s = s.replace(/,\s*"[^"]*"\s*:\s*$/, "");
    s = s.replace(/,\s*"[^"]*"\s*$/, "");
    s = s.replace(/:\s*$/, ": null");
  }
  let { braces, brackets } = scanDepth(s);
  s = s.replace(/,\s*$/, "");
  while (brackets > 0) { s += "]"; brackets--; }
  while (braces > 0) { s += "}"; braces--; }
  return s;
}

function truncateToLastValid(raw: string): string {
  let inString = false;
  let escaped = false;
  let lastGoodEnd = -1;
  let depth = 0;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (escaped) { escaped = false; continue; }
    if (ch === "\\" && inString) { escaped = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{" || ch === "[") depth++;
    if (ch === "}" || ch === "]") {
      depth--;
      if (depth === 0) lastGoodEnd = i;
    }
  }
  return lastGoodEnd > 0 ? raw.slice(0, lastGoodEnd + 1) : repairTruncatedJson(raw);
}

function extractJsonString(raw: string): string {
  let s = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  const startBrace = s.indexOf("{");
  const startBracket = s.indexOf("[");
  if (startBrace === -1 && startBracket === -1) return s;
  const start = startBrace === -1 ? startBracket : startBracket === -1 ? startBrace : Math.min(startBrace, startBracket);
  s = s.slice(start);
  try {
    JSON.parse(s);
    return s;
  } catch {
    // fall through to repair
  }
  const repaired = repairTruncatedJson(s);
  try {
    JSON.parse(repaired);
    return repaired;
  } catch {
    const lastResort = truncateToLastValid(s);
    try {
      JSON.parse(lastResort);
      return lastResort;
    } catch {
      return repaired;
    }
  }
}

// ─── Dash cleanup (Dashboard: stripDashes, stripDashesDeep) ─────────────────

function stripDashes(text: string): string {
  return text
    .replace(/(\d)[ \t]*[–—‒][ \t]*(\d)/g, "$1-$2")
    .replace(/[ \t]*[—―][ \t]*/g, " - ")
    .replace(/[ \t]+[–‒][ \t]+/g, " - ")
    .replace(/[–‒]/g, "-")
    .replace(/^ - /gm, "- ")
    .replace(/ - $/gm, "");
}

function stripDashesDeep<T>(value: T): T {
  if (typeof value === "string") return stripDashes(value) as T;
  if (Array.isArray(value)) return value.map((v) => stripDashesDeep(v)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, stripDashesDeep(v)])) as T;
  }
  return value;
}

// ─── Calls (Dashboard: createFast, analyseSection) ──────────────────────────

function textOf(response: Anthropic.Message): string {
  return response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

async function createFast(
  client: Anthropic,
  params: Omit<Anthropic.MessageCreateParamsNonStreaming, "model">
): Promise<Anthropic.Message> {
  const response = await client.messages.create({
    ...params,
    model: ANALYSIS_MODEL,
    thinking: { type: "between_tools" },
    // Structured output: the API holds the reply to SECTION_JSON_SCHEMA, so
    // it always parses. Without it, roughly one section in ten came back as
    // malformed JSON (a tip with no type, three tips, or a "corrected"
    // second object appended), and two in a row failed the whole check.
    output_config: { effort: "low", format: { type: "json_schema", schema: SECTION_JSON_SCHEMA } },
  });
  if (response.stop_reason !== "refusal") return response;
  // Sonnet 5.5 declined. Retry on the fallback model with the request as the
  // app sends it: without between_tools, which only Sonnet 5.5 accepts, and
  // without the output format, which Sonnet 4.6 does not support. That reply
  // is parsed from text as before.
  return client.messages.create({ ...params, model: FALLBACK_MODEL });
}

async function analyseSection(
  client: Anthropic,
  key: SectionKey,
  resumeBlock: Anthropic.ContentBlockParam,
  jobContext: string
): Promise<Section | null> {
  const instruction = `${jobContext ? jobContext + "\n\n" : ""}DIMENSION TO SCORE: ${SECTION_BRIEFS[key]}\n\nAnalyse only this dimension of the resume now.`;
  for (let attempt = 1; attempt <= 2; attempt++) {
    const response = await createFast(client, {
      max_tokens: 2500,
      system: [{ type: "text", text: ANALYSIS_SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: [resumeBlock, { type: "text", text: instruction }] }],
    });
    console.info(
      `[resume-check:${key}] ${response.model} in=${response.usage.input_tokens} out=${response.usage.output_tokens} stop=${response.stop_reason}`
    );
    try {
      const raw = JSON.parse(extractJsonString(textOf(response))) as { tips?: unknown };
      if (Array.isArray(raw.tips)) raw.tips = raw.tips.slice(0, 6);
      return sectionSchema.parse(raw);
    } catch {
      console.error(`[resume-check:${key}] invalid section output (attempt ${attempt})`);
    }
  }
  return null;
}

// ─── Public result: the full analysis, gated ────────────────────────────────

export interface CheckSection {
  key: SectionKey;
  label: string;
  score: number;
  weight: number;
}

export interface UnlockedFix {
  section: string;
  tip: string;
  explanation: string;
  solution: string;
}

export interface LockedFix {
  section: string;
  tip: string;
}

export interface ResumeCheckResult {
  overallScore: number;
  sections: CheckSection[];
  strengths: { section: string; tip: string }[];
  fixes: UnlockedFix[];
  locked: LockedFix[];
  totals: { findings: number; improvements: number; strengths: number };
  hasJobContext: boolean;
}

/** How many complete fixes the free preview shows. The rest are locked. */
const FREE_FIXES = 3;

export type CheckOutcome =
  | { ok: true; result: ResumeCheckResult }
  | { ok: false; status: number; error: string };

export async function checkResume(input: {
  buffer: Buffer;
  fileName: string;
  jobTitle: string;
  jobDescription: string;
}): Promise<CheckOutcome> {
  const client = claude();
  if (!client) return { ok: false, status: 503, error: "The resume checker is not available right now. Please try again later." };

  const kind = detectFileKind(input.buffer, input.fileName);
  if (kind === "unknown") return { ok: false, status: 400, error: "Upload your resume as a PDF or Word (.docx) file." };

  let resumeBlock: Anthropic.ContentBlockParam;
  if (kind === "pdf") {
    resumeBlock = {
      type: "document",
      source: { type: "base64", media_type: "application/pdf", data: input.buffer.toString("base64") },
    };
  } else {
    let text = "";
    try {
      text = await extractTextFromWord(input.buffer);
    } catch {
      return { ok: false, status: 422, error: "We could not read that Word document. Try saving it as a PDF." };
    }
    if (!text.trim()) return { ok: false, status: 422, error: "That Word document looks empty." };
    resumeBlock = { type: "text", text: `RESUME TEXT:\n<resume>\n${cleanResumeText(text).slice(0, MAX_RESUME_CHARS)}\n</resume>` };
  }

  const jobContext = [
    input.jobTitle ? `TARGET ROLE: ${input.jobTitle}` : "",
    input.jobDescription ? `JOB DESCRIPTION:\n${input.jobDescription.slice(0, MAX_JOB_DESC_CHARS)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const keys = Object.keys(SCORE_WEIGHTS) as SectionKey[];
  let sections: (Section | null)[];
  try {
    sections = await Promise.all(keys.map((k) => analyseSection(client, k, resumeBlock, jobContext)));
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError || (error instanceof Anthropic.APIError && error.status === 529)) {
      return { ok: false, status: 429, error: "The checker is busy right now. Please try again in a minute." };
    }
    if (error instanceof Anthropic.BadRequestError) {
      return { ok: false, status: 422, error: "We could not read that file. Make sure it is a text-based PDF or a Word document." };
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`[resume-check] Claude API error ${error.status}`);
      return { ok: false, status: 502, error: "Something went wrong checking your resume. Please try again." };
    }
    throw error;
  }
  if (sections.some((s) => s === null)) {
    return { ok: false, status: 502, error: "Something went wrong checking your resume. Please try again." };
  }

  const by = stripDashesDeep(Object.fromEntries(keys.map((k, i) => [k, sections[i]!]))) as Record<SectionKey, Section>;

  const overallScore = Math.round(keys.reduce((sum, k) => sum + by[k].score * SCORE_WEIGHTS[k], 0));

  // Highest-weight dimensions first, so the free fixes are the ones that move
  // the score most. One per dimension before a second from any, so the
  // preview shows range.
  const ordered = [...keys].sort((a, b) => SCORE_WEIGHTS[b] - SCORE_WEIGHTS[a]);
  const improve = ordered.map((k) =>
    by[k].tips.filter((t) => t.type === "improve").map((t) => ({ key: k, t }))
  );
  const roundRobin: { key: SectionKey; t: z.infer<typeof tipSchema> }[] = [];
  for (let i = 0; improve.some((list) => list[i]); i++) {
    for (const list of improve) if (list[i]) roundRobin.push(list[i]);
  }
  const withSolution = roundRobin.filter((x) => x.t.solution?.trim());
  const free = withSolution.slice(0, FREE_FIXES);
  const freeSet = new Set(free);

  const strengths = ordered.flatMap((k) =>
    by[k].tips.filter((t) => t.type === "good").map((t) => ({ section: SECTION_LABELS[k], tip: t.tip }))
  );
  const allTips = keys.flatMap((k) => by[k].tips);

  return {
    ok: true,
    result: {
      overallScore,
      sections: ordered.map((k) => ({ key: k, label: SECTION_LABELS[k], score: Math.round(by[k].score), weight: SCORE_WEIGHTS[k] })),
      strengths: strengths.slice(0, 2),
      fixes: free.map(({ key, t }) => ({
        section: SECTION_LABELS[key],
        tip: t.tip,
        explanation: t.explanation ?? "",
        solution: t.solution ?? "",
      })),
      locked: roundRobin.filter((x) => !freeSet.has(x)).map(({ key, t }) => ({ section: SECTION_LABELS[key], tip: t.tip })),
      totals: {
        findings: allTips.length,
        improvements: allTips.filter((t) => t.type === "improve").length,
        strengths: allTips.filter((t) => t.type === "good").length,
      },
      hasJobContext: Boolean(jobContext),
    },
  };
}
