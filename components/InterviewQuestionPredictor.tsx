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
import { AnimatePresence, MotionConfig, animate, motion, useReducedMotion, type Variants } from "framer-motion";
import { APP_URL } from "@/lib/constants";
import { SpotlightCard } from "@/components/page/Reveal";
import { trackEvent } from "@/lib/analytics/client";
import VoiceAnswerRecorder, { speechSupported } from "@/components/VoiceAnswerRecorder";
import { INPUT_LIMITS } from "@/lib/interviewTools/limits";
import type { PredictedQuestion, Prediction, Rating, ToolError } from "@/lib/interviewTools/schemas";
import Chevron from "@/components/Chevron";

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
  "w-full rounded-xl bg-[#070b16] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-colors focus:outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/15";

// ── Look and motion ────────────────────────────────────────────────────────
// Motion explains state (results arriving, a score filling in), it is not
// decoration. MotionConfig reducedMotion="user" turns it off on request.

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050810]";
const BTN =
  "group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5b6cff] font-bold text-white transition-all hover:brightness-110 disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed";
const LABEL = "text-[11px] font-semibold uppercase tracking-[0.18em]";

/** Counts from 0 to `to` once, when it mounts. */
function CountUp({ to }: { to: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce) {
      setN(to);
      return;
    }
    const c = animate(0, to, { duration: 1, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [to, reduce]);
  return <>{n}</>;
}

function Spinner() {
  return <span aria-hidden="true" className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />;
}

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
    <MotionConfig reducedMotion="user">
    <div className="text-left">
      <div
        role="tablist"
        aria-label="Tool mode"
        className="mb-6 inline-flex w-full flex-col gap-1 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-1 sm:w-auto sm:flex-row"
      >
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
            className={`relative rounded-xl px-4 py-2.5 text-sm transition-colors ${FOCUS} ${
              mode === t.id ? "text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {mode === t.id && (
              <motion.span
                layoutId="question-predictor-tab"
                aria-hidden="true"
                className="absolute inset-0 rounded-xl border border-indigo-400/40 bg-indigo-500/[0.16]"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <span className="relative">{t.label}</span>
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
    </MotionConfig>
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
      {/* Input on the left, what comes back on the right. */}
      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <SpotlightCard className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3 mb-3">
          <label htmlFor="jd" className="text-white font-semibold">
            Paste the job description
          </label>
          <button
            type="button"
            data-track="question-predictor-sample"
            onClick={() => setJd(SAMPLE_JD)}
            className={`rounded-lg border border-indigo-400/25 px-2.5 py-1 text-[12px] text-indigo-300 transition-colors hover:border-indigo-400/50 hover:text-indigo-200 ${FOCUS}`}
          >
            Try a sample
          </button>
        </div>
        <textarea
          id="jd"
          className={`${inputClass} min-h-[220px] resize-y leading-relaxed lg:min-h-[300px]`}
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
            className={`${BTN} px-6 py-3 text-sm ${FOCUS}`}
          >
            {loading && <Spinner />}
            {loading ? "Reading the posting..." : "Predict my 5 questions"}
            {!loading && <Chevron />}
          </button>
        </div>
        {error && <p role="alert" className="text-sm text-rose-300 mt-4">{error}</p>}
      </SpotlightCard>
      <WhatYouGet
        title="What comes back"
        intro="The five questions this posting is most likely to lead to, ranked."
        items={[
          "The line in the posting that prompts each question",
          "Why the interviewer asks it",
          "What a strong answer covers",
          "Say or type your answer and get it scored",
        ]}
        notes={["Free, no account needed", "Results in 10 to 20 seconds", "Your posting is not stored"]}
      />
      </div>

      <AnimatePresence>
        {loading && <LoadingCard key="loading" lines={["Reading the requirements", "Thinking like the hiring manager", "Ranking the likely questions"]} />}
      </AnimatePresence>

      {result && (
        <motion.div
          className="grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)]"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Left: the role and the next step stay in view while the questions scroll past. */}
          <div className="space-y-6 lg:sticky lg:top-28">
          <motion.div variants={rise} className="flex flex-col sm:flex-row sm:items-end lg:flex-col lg:items-start justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
            <div>
              <p className={`${LABEL} mb-2 inline-flex items-center gap-2 text-emerald-300`}>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Your likely questions
              </p>
              <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {role || "This role"}
                {result.company && <span className="text-slate-400 font-normal"> at {result.company}</span>}
              </h3>
            </div>
            <button
              type="button"
              data-track="question-predictor-copy"
              onClick={copyAll}
              className={`self-start sm:self-auto px-3 py-1.5 rounded-lg text-[12px] border transition-colors ${FOCUS} ${
                copied ? "border-emerald-400/40 text-emerald-300" : "border-white/[0.1] text-slate-300 hover:border-white/25 hover:text-white"
              }`}
            >
              {copied ? "Copied" : "Copy all 5"}
            </button>
          </motion.div>
          <motion.div variants={rise} className="hidden lg:block">
            <ConversionBanner role={role} />
          </motion.div>
          </div>

          <div className="min-w-0 space-y-4">
            {result.questions.map((q, i) => (
              <motion.div key={i} variants={rise}>
                <QuestionCard index={i} q={q} role={role} />
              </motion.div>
            ))}

            {/* On phones the banner follows the questions; on wide screens it sits in the left column. */}
            <motion.div variants={rise} className="lg:hidden">
              <ConversionBanner role={role} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function QuestionCard({ q, index, role }: { q: PredictedQuestion; index: number; role: string }) {
  const [practising, setPractising] = useState(false);

  return (
    <article className="group/card relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070b16] p-6 transition-colors duration-300 hover:border-white/[0.12] sm:p-7">
      <div className="flex items-start gap-4 sm:gap-5">
        <span className="mt-0.5 w-7 shrink-0 font-mono text-[13px] text-indigo-300/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <span className="inline-block px-2 py-0.5 rounded-md border border-white/[0.07] bg-white/[0.04] text-[11px] text-slate-400 mb-3">
            {TYPE_LABELS[q.type]}
          </span>
          <h4 className="text-white text-[17px] font-semibold leading-snug mb-4">{q.question}</h4>

          {q.jd_signal && (
            <p className="text-[12px] text-slate-500 mb-4 border-l border-indigo-400/40 pl-3">
              From the posting: <span className="text-slate-300 italic">&ldquo;{q.jd_signal}&rdquo;</span>
            </p>
          )}

          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            <strong className="text-slate-200">Why they ask: </strong>
            {q.why_they_ask}
          </p>

          {q.what_good_looks_like.length > 0 && (
            <div className="text-sm text-slate-400">
              <p className="text-slate-200 font-semibold mb-2">A strong answer covers</p>
              <ul className="space-y-2">
                {q.what_good_looks_like.map((point, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-emerald-400 shrink-0">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {practising ? (
            <motion.div
              className="mt-6 pt-6 border-t border-white/[0.06]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <AnswerPractice question={q.question} role={role} />
            </motion.div>
          ) : (
            <button
              type="button"
              data-track="question-predictor-practise"
              onClick={() => setPractising(true)}
              className={`group mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold border border-indigo-400/40 text-indigo-200 transition-colors hover:border-indigo-400/60 hover:bg-indigo-500/10 ${FOCUS}`}
            >
              Practice this answer and get a score <Chevron />
            </button>
          )}
        </div>
      </div>
      <span
        aria-hidden="true"
        className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-indigo-400 to-purple-400 transition-transform duration-500 group-hover/card:scale-x-100"
      />
    </article>
  );
}

// ── Mode 2: tell me about yourself ─────────────────────────────────────────

function TmayPanel() {
  const [role, setRole] = useState("");

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
    <SpotlightCard className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 sm:p-7">
      <p className="text-white text-xl font-semibold tracking-tight mb-2">&ldquo;{TMAY_QUESTION.replace(".", "")}&rdquo;</p>
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
    </SpotlightCard>
    <div className="lg:sticky lg:top-28">
      <WhatYouGet
        title="What is checked"
        intro="Delivery the moment you stop recording, then the content once you ask for a score."
        items={[
          "Pace, 120 to 170 words a minute",
          "Length, 0:45 to 2:00",
          "Filler words and long pauses",
          "Content scored out of 10, with the exact fixes",
          "The follow-up an interviewer would ask next",
        ]}
        notes={["Free, no account needed", "Your audio never reaches Preciprocal"]}
      />
    </div>
    </div>
  );
}

/** Beside the input: what the tool returns, so the empty state is not a blank column. */
function WhatYouGet({ title, intro, items, notes }: { title: string; intro: string; items: string[]; notes: string[] }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-[#070b16] p-6 sm:p-7">
      <p className={`${LABEL} text-indigo-300/90`}>{title}</p>
      <p className="mt-2 text-sm text-slate-400">{intro}</p>
      <ol className="mb-auto mt-6 space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={item}
            className="flex gap-3 text-[13px] text-slate-200"
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.07 }}
          >
            <span className="font-mono text-[11px] leading-5 text-indigo-300/70">{String(i + 1).padStart(2, "0")}</span>
            {item}
          </motion.li>
        ))}
      </ol>
      <ul className="mt-6 space-y-2.5 border-t border-white/[0.06] pt-6 text-[13px] text-slate-400 [&>li]:flex [&>li]:gap-2.5">
        {notes.map((n) => (
          <li key={n}>
            <span className="text-emerald-400">✓</span>
            {n}
          </li>
        ))}
      </ul>
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
        <div role="group" aria-label="Answer input" className="inline-flex gap-1 rounded-xl border border-white/[0.07] bg-white/[0.02] p-1">
          {(
            [
              { id: "voice", label: "Say it out loud" },
              { id: "type", label: "Type it" },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={inputMode === m.id}
              data-track={`question-predictor-input-${m.id}`}
              onClick={() => setInputMode(m.id)}
              className={`px-3 py-1.5 rounded-lg text-[12px] border transition-colors ${FOCUS} ${
                inputMode === m.id
                  ? "bg-indigo-500/[0.16] border-indigo-400/40 text-white"
                  : "border-transparent text-slate-400 hover:text-white"
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
          {voice && <p className="text-[12px] text-slate-400 mb-2">Transcript (fix any misheard words before scoring)</p>}
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
              className={`${BTN} px-5 py-2.5 text-sm ${FOCUS}`}
            >
              {loading && <Spinner />}
              {loading ? "Scoring..." : rating ? "Score it again" : voice ? "Score my content" : "Score my answer"}
            </button>
          </div>
          {error && <p role="alert" className="text-sm text-rose-300 mt-3">{error}</p>}
        </div>
      )}

      <AnimatePresence>
        {loading && <LoadingCard key="loading" lines={["Listening like an interviewer", "Checking structure and specifics", "Writing your fixes"]} />}
      </AnimatePresence>
      {rating && <RatingView rating={rating} role={role} />}
    </div>
  );
}

function RatingView({ rating, role }: { rating: Rating; role: string }) {
  const tone =
    rating.score >= 8 ? "text-emerald-300" : rating.score >= 6 ? "text-amber-300" : "text-rose-300";
  const ring = rating.score >= 8 ? "#34d399" : rating.score >= 6 ? "#fbbf24" : "#fb7185";
  const r = 30;
  const c = 2 * Math.PI * r;

  return (
    <motion.div
      className="rounded-2xl border border-white/[0.08] bg-[#070b16] p-5 sm:p-6 space-y-6"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={rise} className="flex items-center gap-5">
        <div className={`relative w-[72px] h-[72px] shrink-0 flex flex-col items-center justify-center ${tone}`}>
          <svg aria-hidden="true" viewBox="0 0 72 72" className="absolute inset-0 -rotate-90">
            <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
            <motion.circle
              cx="36"
              cy="36"
              r={r}
              fill="none"
              stroke={ring}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: c * (1 - rating.score / 10) }}
              transition={{ duration: 1, ease: EASE }}
            />
          </svg>
          <span className="relative text-2xl font-extrabold leading-none tabular-nums">
            <CountUp to={rating.score} />
          </span>
          <span className="relative text-[10px] text-slate-500">/ 10</span>
        </div>
        <p className="text-white font-semibold leading-snug">{rating.verdict}</p>
      </motion.div>

      {rating.strengths.length > 0 && (
        <motion.div variants={rise}>
          <p className="text-sm text-slate-200 font-semibold mb-2.5">What works</p>
          <ul className="space-y-2 text-sm text-slate-400">
            {rating.strengths.map((s, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="text-emerald-400 shrink-0">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {rating.fixes.length > 0 && (
        <motion.div variants={rise}>
          <p className="text-sm text-slate-200 font-semibold mb-2.5">Fix these first</p>
          <ol className="divide-y divide-white/[0.05] border-y border-white/[0.05] text-sm">
            {rating.fixes.map((f, i) => (
              <li key={i} className="flex gap-3 py-3">
                <span className="font-mono text-[12px] leading-5 text-amber-300 shrink-0">{i + 1}.</span>
                <span>
                  <span className="text-slate-200">{f.issue}</span>{" "}
                  <span className="text-slate-400">{f.suggestion}</span>
                </span>
              </li>
            ))}
          </ol>
        </motion.div>
      )}

      {rating.stronger_opening && (
        <motion.div variants={rise} className="rounded-xl bg-white/[0.025] border border-white/[0.06] border-l-indigo-400/50 p-4">
          <p className="text-[12px] text-slate-500 mb-1.5">A stronger way to open</p>
          <p className="text-sm text-slate-200 leading-relaxed">&ldquo;{rating.stronger_opening}&rdquo;</p>
        </motion.div>
      )}

      {rating.follow_up_question && (
        <motion.div
          variants={rise}
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/[0.14] to-purple-500/[0.06] border border-indigo-400/30 p-5 sm:p-6"
        >
          <div className="relative">
            <p className={`${LABEL} text-indigo-300 mb-2`}>
              What the interviewer asks next
            </p>
            <p className="text-white text-lg font-semibold leading-snug mb-3">&ldquo;{rating.follow_up_question}&rdquo;</p>
            <p className="text-sm text-slate-400 mb-5">
              This is where real interviews are won or lost, and you cannot practice it by typing. Preciprocal&apos;s AI
              interviewer asks follow-ups like this one out loud, the way a real interviewer would, and scores how you handle them.
            </p>
            <a href={signUpUrl(role)} className={`${BTN} w-full px-5 py-3 text-sm sm:w-auto ${FOCUS}`}>
              Answer it in a free mock interview <Chevron />
            </a>
            <p className="text-[11px] text-slate-500 mt-2.5">Free plan includes an AI mock interview · No credit card</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Shared bits ────────────────────────────────────────────────────────────

function ConversionBanner({ role }: { role: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-400/25 bg-[#070b16] p-6 sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_100%_0%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white mb-2">Now practice all 5 out loud</h3>
          <p className="text-sm text-slate-400">
            Knowing the question is half of it. Preciprocal&apos;s AI interviewer asks these{role ? ` for the ${role} role` : ""} by
            voice, asks follow-up questions like a real interviewer, and scores you on structure and clarity.
          </p>
        </div>
        <div>
          <a href={signUpUrl(role)} className={`${BTN} w-full px-6 py-3 text-sm ${FOCUS}`}>
            Start a free mock interview <Chevron />
          </a>
          <p className="text-[11px] text-slate-500 mt-2.5">Free plan includes an AI mock interview · No credit card</p>
        </div>
      </div>
    </div>
  );
}

function LoadingCard({ lines }: { lines: string[] }) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSecs((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.div
      className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6"
      aria-live="polite"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <div aria-hidden="true" className="mb-4 flex justify-end font-mono text-[12px] tabular-nums text-slate-500">
        {secs}s
      </div>
      <ul className="space-y-3.5">
        {lines.map((line, i) => (
          <li key={line}>
            <p className="mb-1.5 text-[13px] text-slate-400">{line}</p>
            <div aria-hidden="true" className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
              <motion.div
                className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent"
                initial={{ left: "-35%" }}
                animate={{ left: ["-35%", "105%"] }}
                transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, delay: i * 0.25 }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-slate-600 mt-4">This usually takes 10 to 20 seconds.</p>
    </motion.div>
  );
}
