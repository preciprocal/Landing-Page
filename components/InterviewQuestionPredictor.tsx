"use client";

/**
 * components/InterviewQuestionPredictor.tsx
 *
 * The free, no-signup AI tool on /interview-question-predictor. Two modes:
 *
 *   1. Paste a job description, get the five questions most likely to come up,
 *      each tied to the line in the posting that prompts it. Every question can
 *      then be practised: type an answer, get it scored.
 *   2. Score a "tell me about yourself" answer directly, the single most
 *      searched-for interview answer.
 *
 * The scoring result ends on the follow-up question a real interviewer would
 * ask next, which is the point of the funnel: a typed answer gets one round of
 * feedback here, and the follow-up is what the full mock interview in the app
 * does live, out loud. Every CTA carries ?tool=question-predictor so app-side
 * onboarding can tell where the sign-up came from.
 *
 * Unlike ThankYouEmailBuilder this one does call a backend (app/api/tools/*),
 * because prediction needs a model. Nothing is stored there.
 */

import { useEffect, useState } from "react";
import { APP_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics/client";
import VoiceAnswerRecorder, { speechSupported } from "@/components/VoiceAnswerRecorder";
import { INPUT_LIMITS } from "@/lib/interviewTools/limits";
import type { PredictedQuestion, Prediction, Rating, ToolError } from "@/lib/interviewTools/schemas";

type Mode = "predict" | "tmay";

const TMAY_QUESTION = "Tell me about yourself.";

const TYPE_LABELS: Record<PredictedQuestion["type"], string> = {
  behavioral: "Behavioral",
  technical: "Technical",
  "role-specific": "Role skill",
  situational: "Situational",
  motivation: "Motivation",
};

/** Fictional posting for the "try a sample" button, so a visitor can see a result in one click. */
const SAMPLE_JD = `Data Analyst, Growth

About the role
We're looking for a Data Analyst to join our Growth team. You'll partner with product managers and marketing to understand how users find, adopt and stick with our product, and turn that into recommendations the team acts on.

What you'll do
- Own the weekly growth metrics review and explain what moved and why
- Design and analyze A/B tests on onboarding and pricing pages
- Build and maintain dashboards in Looker for non-technical stakeholders
- Write SQL against our Snowflake warehouse to answer ad hoc questions quickly
- Identify drop-off points in the activation funnel and size the opportunity

What we're looking for
- 2+ years in a data or analytics role, ideally at a consumer or SaaS company
- Strong SQL; comfortable with Python or R for analysis
- Hands-on experience with experiment design and statistical significance
- Able to explain findings clearly to people without a data background
- Comfortable with ambiguity and juggling requests from several teams`;

const inputClass =
  "w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-400/60";

function signUpUrl(role?: string) {
  const params = new URLSearchParams({ tool: "question-predictor" });
  if (role) params.set("role", role);
  return `${APP_URL}/sign-up?${params.toString()}`;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Could not reach the server. Check your connection and try again.");
  }
  const data = (await res.json().catch(() => null)) as T | ToolError | null;
  if (!res.ok || !data) {
    throw new Error((data as ToolError | null)?.error || "Something went wrong. Please try again.");
  }
  return data as T;
}

export default function InterviewQuestionPredictor() {
  const [mode, setMode] = useState<Mode>("predict");

  return (
    <div className="text-left">
      <div role="tablist" className="flex flex-wrap gap-2 justify-center mb-6">
        {(
          [
            { id: "predict", label: "Predict questions from a job description" },
            { id: "tmay", label: "Score my “Tell me about yourself”" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={mode === t.id}
            data-track={`question-predictor-tab-${t.id}`}
            onClick={() => setMode(t.id)}
            className={`px-4 py-2 rounded-xl text-sm border transition-colors ${
              mode === t.id
                ? "bg-indigo-500/20 border-indigo-400/50 text-white"
                : "border-white/[0.08] text-slate-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Both panels stay mounted so switching tabs does not throw away work. */}
      <div hidden={mode !== "predict"}>
        <PredictPanel />
      </div>
      <div hidden={mode !== "tmay"}>
        <TmayPanel />
      </div>
    </div>
  );
}

// ── Mode 1: predict from a job description ─────────────────────────────────

function PredictPanel() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Prediction | null>(null);
  const [copied, setCopied] = useState(false);

  const tooShort = jd.trim().length < INPUT_LIMITS.jobDescriptionMin;

  async function predict() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await post<Prediction>("/api/tools/predict-questions", { jobDescription: jd });
      setResult(data);
      trackEvent("question-predictor-predicted", { role: data.role_title, company: data.company }, "tool");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function copyAll() {
    if (!result) return;
    const text = result.questions.map((q, i) => `${i + 1}. ${q.question}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the questions are still selectable on the page.
    }
  }

  const role = result?.role_title || "";

  return (
    <div className="space-y-6">
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <label htmlFor="jd" className="text-white font-semibold">
            Paste the job description
          </label>
          <button
            type="button"
            data-track="question-predictor-sample"
            onClick={() => setJd(SAMPLE_JD)}
            className="text-[12px] text-indigo-300 hover:text-indigo-200"
          >
            Try a sample
          </button>
        </div>
        <textarea
          id="jd"
          className={`${inputClass} min-h-[220px] resize-y leading-relaxed`}
          value={jd}
          maxLength={INPUT_LIMITS.jobDescriptionMax}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the full posting: the role, what you'll do, and what they're looking for."
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
          <p className="text-[11px] text-slate-600">
            Sent to an AI model to generate your questions. Not stored, no account needed.
          </p>
          <button
            type="button"
            data-track="question-predictor-submit"
            onClick={predict}
            disabled={loading || tooShort}
            className="px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Reading the posting..." : "Predict my 5 questions"}
          </button>
        </div>
        {error && <p className="text-sm text-rose-300 mt-4">{error}</p>}
      </div>

      {loading && <LoadingCard lines={["Reading the requirements", "Thinking like the hiring manager", "Ranking the likely questions"]} />}

      {result && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <p className="text-[12px] uppercase tracking-wider text-emerald-300 font-semibold mb-1">Your likely questions</p>
              <h3 className="text-xl font-bold text-white">
                {role || "This role"}
                {result.company && <span className="text-slate-400 font-normal"> at {result.company}</span>}
              </h3>
            </div>
            <button
              type="button"
              data-track="question-predictor-copy"
              onClick={copyAll}
              className="self-start sm:self-auto px-3 py-1.5 rounded-lg text-[12px] border border-white/[0.1] text-slate-300 hover:text-white"
            >
              {copied ? "Copied" : "Copy all 5"}
            </button>
          </div>

          {result.questions.map((q, i) => (
            <QuestionCard key={i} index={i} q={q} role={role} />
          ))}

          <ConversionBanner role={role} />
        </div>
      )}
    </div>
  );
}

function QuestionCard({ q, index, role }: { q: PredictedQuestion; index: number; role: string }) {
  const [practising, setPractising] = useState(false);

  return (
    <article className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <span className="inline-block px-2 py-0.5 rounded-md bg-white/[0.05] text-[11px] text-slate-400 mb-2">
            {TYPE_LABELS[q.type]}
          </span>
          <h4 className="text-white font-semibold leading-snug mb-3">{q.question}</h4>

          {q.jd_signal && (
            <p className="text-[12px] text-slate-500 mb-3">
              From the posting: <span className="text-slate-300 italic">&ldquo;{q.jd_signal}&rdquo;</span>
            </p>
          )}

          <p className="text-sm text-slate-400 leading-relaxed mb-3">
            <strong className="text-slate-200">Why they ask: </strong>
            {q.why_they_ask}
          </p>

          {q.what_good_looks_like.length > 0 && (
            <div className="text-sm text-slate-400">
              <p className="text-slate-200 font-semibold mb-1.5">A strong answer covers</p>
              <ul className="space-y-1.5">
                {q.what_good_looks_like.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-emerald-400 shrink-0">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {practising ? (
            <div className="mt-5 pt-5 border-t border-white/[0.06]">
              <AnswerPractice question={q.question} role={role} />
            </div>
          ) : (
            <button
              type="button"
              data-track="question-predictor-practise"
              onClick={() => setPractising(true)}
              className="mt-5 px-4 py-2 rounded-lg text-[13px] font-semibold border border-indigo-400/40 text-indigo-200 hover:bg-indigo-500/10"
            >
              Practice this answer and get a score
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Mode 2: tell me about yourself ─────────────────────────────────────────

function TmayPanel() {
  const [role, setRole] = useState("");

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
      <p className="text-white font-semibold mb-1">&ldquo;{TMAY_QUESTION.replace(".", "")}&rdquo;</p>
      <p className="text-sm text-slate-400 mb-5">
        The first question in almost every interview. Say your answer out loud (or type it) and see your pace, filler
        words and length instantly, then get the content scored out of 10 with the exact fixes.
      </p>
      <div className="mb-4">
        <label htmlFor="tmay-role" className="block text-[12px] text-slate-400 mb-1.5">
          Role you are interviewing for (optional, makes the feedback sharper)
        </label>
        <input
          id="tmay-role"
          className={inputClass}
          value={role}
          maxLength={INPUT_LIMITS.roleMax}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Product Manager"
        />
      </div>
      <AnswerPractice question={TMAY_QUESTION} role={role.trim()} />
    </div>
  );
}

// ── Shared: say or type an answer, get it scored ───────────────────────────

function AnswerPractice({ question, role }: { question: string; role: string }) {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState<Rating | null>(null);
  // Voice is the default wherever the browser supports it, since saying it out
  // loud is the part no text tool covers. Decided after mount so the server
  // render and the first client render match.
  const [canSpeak, setCanSpeak] = useState(false);
  const [inputMode, setInputMode] = useState<"voice" | "type">("type");

  useEffect(() => {
    if (speechSupported()) {
      setCanSpeak(true);
      setInputMode("voice");
    }
  }, []);

  const words = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const tooShort = answer.trim().length < INPUT_LIMITS.answerMin;

  async function score() {
    setLoading(true);
    setError("");
    setRating(null);
    try {
      const data = await post<Rating>("/api/tools/rate-answer", { question, answer, role });
      setRating(data);
      trackEvent("question-predictor-scored", { score: data.score, tmay: question === TMAY_QUESTION }, "tool");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const voice = inputMode === "voice";

  return (
    <div className="space-y-5">
      {canSpeak && (
        <div className="flex gap-2">
          {(
            [
              { id: "voice", label: "Say it out loud" },
              { id: "type", label: "Type it" },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              type="button"
              data-track={`question-predictor-input-${m.id}`}
              onClick={() => setInputMode(m.id)}
              className={`px-3 py-1.5 rounded-lg text-[12px] border transition-colors ${
                inputMode === m.id
                  ? "bg-indigo-500/20 border-indigo-400/50 text-white"
                  : "border-white/[0.08] text-slate-400 hover:text-white"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {voice && (
        <VoiceAnswerRecorder
          onTranscript={(t) => {
            setAnswer(t.slice(0, INPUT_LIMITS.answerMax));
            setRating(null);
          }}
        />
      )}

      {(!voice || answer) && (
        <div>
          {voice && <p className="text-[12px] text-slate-400 mb-1.5">Transcript (fix any misheard words before scoring)</p>}
          <textarea
            aria-label="Your answer"
            className={`${inputClass} min-h-[160px] resize-y leading-relaxed`}
            value={answer}
            maxLength={INPUT_LIMITS.answerMax}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer as you would say it out loud..."
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
            <p className="text-[11px] text-slate-600">
              {words} words{words > 0 && `, about ${Math.max(1, Math.round(words / 2.5))} seconds spoken`}. Aim for 150 to 300.
            </p>
            <button
              type="button"
              data-track="question-predictor-score"
              onClick={score}
              disabled={loading || tooShort}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Scoring..." : rating ? "Score it again" : voice ? "Score my content" : "Score my answer"}
            </button>
          </div>
          {error && <p className="text-sm text-rose-300 mt-3">{error}</p>}
        </div>
      )}

      {loading && <LoadingCard lines={["Listening like an interviewer", "Checking structure and specifics", "Writing your fixes"]} />}
      {rating && <RatingView rating={rating} role={role} />}
    </div>
  );
}

function RatingView({ rating, role }: { rating: Rating; role: string }) {
  const tone =
    rating.score >= 8 ? "text-emerald-300 border-emerald-400/40" : rating.score >= 6 ? "text-amber-300 border-amber-400/40" : "text-rose-300 border-rose-400/40";

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0a0f1c] p-5 space-y-5">
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 shrink-0 rounded-full border-2 flex flex-col items-center justify-center ${tone}`}>
          <span className="text-2xl font-extrabold leading-none">{rating.score}</span>
          <span className="text-[10px] text-slate-500">/ 10</span>
        </div>
        <p className="text-white font-semibold leading-snug">{rating.verdict}</p>
      </div>

      {rating.strengths.length > 0 && (
        <div>
          <p className="text-sm text-slate-200 font-semibold mb-2">What works</p>
          <ul className="space-y-1.5 text-sm text-slate-400">
            {rating.strengths.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-400 shrink-0">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {rating.fixes.length > 0 && (
        <div>
          <p className="text-sm text-slate-200 font-semibold mb-2">Fix these first</p>
          <ol className="space-y-3 text-sm">
            {rating.fixes.map((f, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-amber-300 font-bold shrink-0">{i + 1}.</span>
                <span>
                  <span className="text-slate-200">{f.issue}</span>{" "}
                  <span className="text-slate-400">{f.suggestion}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {rating.stronger_opening && (
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
          <p className="text-[12px] text-slate-500 mb-1.5">A stronger way to open</p>
          <p className="text-sm text-slate-200 leading-relaxed">&ldquo;{rating.stronger_opening}&rdquo;</p>
        </div>
      )}

      {rating.follow_up_question && (
        <div className="rounded-xl bg-gradient-to-br from-indigo-500/15 to-purple-500/10 border border-indigo-400/30 p-5">
          <p className="text-[12px] uppercase tracking-wider text-indigo-300 font-semibold mb-2">
            What the interviewer asks next
          </p>
          <p className="text-white font-semibold leading-snug mb-3">&ldquo;{rating.follow_up_question}&rdquo;</p>
          <p className="text-sm text-slate-400 mb-4">
            This is where real interviews are won or lost, and you cannot practice it by typing. Preciprocal&apos;s AI
            interviewer asks follow-ups like this one out loud, the way a real interviewer would, and scores how you handle them.
          </p>
          <a
            href={signUpUrl(role)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
          >
            Answer it in a free mock interview →
          </a>
          <p className="text-[11px] text-slate-500 mt-2">Free plan includes an AI mock interview · No credit card</p>
        </div>
      )}
    </div>
  );
}

// ── Shared bits ────────────────────────────────────────────────────────────

function ConversionBanner({ role }: { role: string }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-500/15 to-purple-500/10 border border-indigo-400/30 p-6 text-center">
      <h3 className="text-xl font-bold text-white mb-2">Now practice all 5 out loud</h3>
      <p className="text-sm text-slate-400 max-w-xl mx-auto mb-5">
        Knowing the question is half of it. Preciprocal&apos;s AI interviewer asks these{role ? ` for the ${role} role` : ""} by
        voice, asks follow-up questions like a real interviewer, and scores you on structure and clarity.
      </p>
      <a
        href={signUpUrl(role)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
      >
        Start a free mock interview →
      </a>
      <p className="text-[11px] text-slate-500 mt-2">Free plan includes an AI mock interview · No credit card</p>
    </div>
  );
}

function LoadingCard({ lines }: { lines: string[] }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6" aria-live="polite">
      <ul className="space-y-3">
        {lines.map((line, i) => (
          <li
            key={line}
            className="flex items-center gap-3 text-sm text-slate-400 animate-pulse"
            style={{ animationDelay: `${i * 300}ms` }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            {line}
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-slate-600 mt-4">This usually takes 10 to 20 seconds.</p>
    </div>
  );
}
