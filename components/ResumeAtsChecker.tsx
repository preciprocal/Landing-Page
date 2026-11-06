"use client";

/**
 * components/ResumeAtsChecker.tsx
 *
 * The free ATS resume check on /free-ats-checker. Upload a resume, get the
 * same scores the app gives, a few complete fixes, and the rest of the fixes
 * locked behind a free account.
 *
 * The hook is deliberate: the score and the first fixes are real and useful
 * on their own, and the locked cards show how many more were found and what
 * they are about, without the rewrites (the server never sends those). The
 * unlock CTA goes to sign-up with ?tool=ats-checker, which the app routes to
 * its resume upload page (Dashboard lib/auth/destination.ts).
 *
 * One free check per visitor. On load the page asks the server for an
 * earlier check (lib/resumeCheck/store.ts) and, if there is one, shows it in
 * place of the upload form. Recognised by cookie it is the full result;
 * recognised by network only (cookie cleared) it is the scores alone, since a
 * shared IP may be someone else.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { APP_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics/client";
import type { ResumeCheckResult } from "@/lib/resumeCheck/analysis";
import Chevron from "@/components/Chevron";

const SIGN_UP_URL = `${APP_URL}/sign-up?tool=ats-checker`;
const MAX_BYTES = 4 * 1024 * 1024;

type Shown = ResumeCheckResult & { restored?: "device" | "network"; checkedAt?: string };
const ACCEPT = ".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword";

/** The app's own calibration (Dashboard ANALYSIS_SYSTEM, rule 4). */
function band(score: number) {
  if (score >= 90) return { label: "Top 5% of resumes", tone: "text-emerald-300", ring: "#34d399" };
  if (score >= 70) return { label: "Above average", tone: "text-emerald-300", ring: "#34d399" };
  if (score >= 50) return { label: "Average. Most resumes land here", tone: "text-amber-300", ring: "#fbbf24" };
  if (score >= 30) return { label: "Weak. Likely filtered out", tone: "text-rose-300", ring: "#fb7185" };
  return { label: "At risk of instant rejection", tone: "text-rose-300", ring: "#fb7185" };
}

function barTone(score: number) {
  return score >= 70 ? "bg-emerald-400" : score >= 50 ? "bg-amber-400" : "bg-rose-400";
}

// ─── Motion ─────────────────────────────────────────────────────────────────
// Restrained on purpose: motion here explains state (a file landed, the check
// is running, the score filled in), it is not decoration. MotionConfig with
// reducedMotion="user" turns it off for visitors who ask their system for
// less motion.

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** A card with a soft light that follows the cursor (Aceternity's card spotlight). */
function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const glow = useMotionTemplate`radial-gradient(460px circle at ${x}px ${y}px, rgba(129,140,248,0.10), transparent 70%)`;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
    >
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Counts from 0 to `to` once, when it mounts. */
function CountUp({ to, duration = 1.2 }: { to: number; duration?: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce) {
      setN(to);
      return;
    }
    const c = animate(0, to, { duration, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [to, duration, reduce]);
  return <>{n}</>;
}

const inputClass =
  "w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-400/60";

export default function ResumeAtsChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [showJd, setShowJd] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Shown | null>(null);
  const [lookedUp, setLookedUp] = useState(false);
  const [limitHit, setLimitHit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // A returning visitor sees the check they already ran.
  useEffect(() => {
    let live = true;
    fetch("/api/tools/resume-check", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Shown | null) => {
        if (!live || !data || typeof data.overallScore !== "number") return;
        setResult(data);
        trackEvent("ats-check-returned", { score: data.overallScore, restored: data.restored ?? "" }, "tool");
      })
      .catch(() => {})
      .finally(() => live && setLookedUp(true));
    return () => {
      live = false;
    };
  }, []);

  function pick(f: File | undefined | null) {
    setError("");
    if (!f) return;
    const name = f.name.toLowerCase();
    if (!/\.(pdf|docx?)$/.test(name)) {
      setError("Upload your resume as a PDF or Word (.docx) file.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setError("That file is over 4 MB. Export your resume as a smaller PDF and try again.");
      return;
    }
    setFile(f);
  }

  async function run() {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);
    const body = new FormData();
    body.append("file", file);
    if (jobTitle.trim()) body.append("jobTitle", jobTitle.trim());
    if (jobDescription.trim()) body.append("jobDescription", jobDescription.trim());
    try {
      const res = await fetch("/api/tools/resume-check", { method: "POST", body });
      const data = (await res.json().catch(() => null)) as (Shown & { error?: string; limit?: string }) | null;
      setLimitHit(data?.limit === "ip-cap" || data?.limit === "daily-cap");
      if (!res.ok || !data || data.error) throw new Error(data?.error || "Something went wrong. Please try again.");
      setResult(data);
      trackEvent("ats-check-scored", { score: data.overallScore, locked: data.locked.length, jd: data.hasJobContext }, "tool");
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch (e) {
      setError(e instanceof TypeError ? "Could not reach the server. Check your connection and try again." : (e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (!lookedUp) {
    return <div className="h-[420px] animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]" aria-busy="true" />;
  }

  const returning = Boolean(result?.restored);

  return (
    <MotionConfig reducedMotion="user">
    <div className="text-left space-y-6">
      {returning && result && <WelcomeBack result={result} />}

      {/* ── Upload ───────────────────────────────────────────────────── */}
      {!returning && (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
      <SpotlightCard className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 sm:p-7">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pick(e.dataTransfer.files?.[0]);
          }}
          className={`relative w-full overflow-hidden rounded-xl border border-dashed px-6 py-11 text-center transition-colors duration-300 ${
            dragging ? "border-indigo-400/70 bg-indigo-500/[0.07]" : file ? "border-emerald-400/40 bg-emerald-500/[0.035]" : "border-white/[0.14] hover:border-indigo-400/40"
          }`}
        >
          {/* Faint grid, fading out from the centre. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <motion.span
            aria-hidden="true"
            className={`relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${
              file ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300" : "border-indigo-400/25 bg-indigo-500/10 text-indigo-300"
            }`}
            animate={dragging ? { y: -6, scale: 1.06 } : { y: 0, scale: 1 }}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
          >
            {file ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5M12 17v-6M9.5 13.5 12 11l2.5 2.5" />
              </svg>
            )}
          </motion.span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={file ? file.name : dragging ? "drop" : "empty"}
              className="relative block"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              {file ? (
                <>
                  <span className="block font-semibold text-white">{file.name}</span>
                  <span className="mt-1 block text-[12px] text-slate-500">{(file.size / 1024).toFixed(0)} KB · Click to choose a different file</span>
                </>
              ) : dragging ? (
                <span className="block font-semibold text-indigo-200">Drop it to upload</span>
              ) : (
                <>
                  <span className="block font-semibold text-white">Drop your resume here, or click to upload</span>
                  <span className="mt-1 block text-[12px] text-slate-500">PDF or Word (.docx), up to 4 MB</span>
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </button>
        <input ref={inputRef} type="file" accept={ACCEPT} className="hidden" onChange={(e) => pick(e.target.files?.[0])} />

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ats-role" className="mb-1.5 block text-[12px] text-slate-400">
              Target role (optional)
            </label>
            <input id="ats-role" className={inputClass} value={jobTitle} maxLength={120} onChange={(e) => setJobTitle(e.target.value)} placeholder="Data Analyst" />
          </div>
          <div className="flex items-end">
            {!showJd && (
              <button type="button" onClick={() => setShowJd(true)} className="text-sm text-indigo-300 hover:text-indigo-200">
                + Add the job description for a sharper score
              </button>
            )}
          </div>
        </div>
        <AnimatePresence initial={false}>
        {showJd && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
          <div className="pt-4">
            <label htmlFor="ats-jd" className="mb-1.5 block text-[12px] text-slate-400">
              Job description (optional, recommended)
            </label>
            <textarea
              id="ats-jd"
              className={`${inputClass} min-h-[120px] resize-y`}
              value={jobDescription}
              maxLength={3000}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the posting. The ATS and skills scores are then measured against it."
            />
          </div>
          </motion.div>
        )}
        </AnimatePresence>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-[11px] leading-relaxed text-slate-600">No account needed. Your file is not stored; the result is kept for 30 days so you can come back to it.</p>
          <button
            type="button"
            data-track="ats-check-submit"
            onClick={run}
            disabled={!file || loading}
            className="shrink-0 whitespace-nowrap rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Analysing your resume..." : "Check my resume free"}
          </button>
        </div>
        {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}
        {limitHit && (
          <a
            href={SIGN_UP_URL}
            data-track="ats-check-limit-signup"
            className="mt-3 inline-flex rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Create free account <Chevron />
          </a>
        )}
      </SpotlightCard>
      <WhatYouGet />
      </div>
      )}

      <AnimatePresence>{loading && <Progress key="progress" />}</AnimatePresence>

      {result && (
        <motion.div
          ref={resultsRef}
          className="grid scroll-mt-28 items-start gap-6 lg:grid-cols-[400px_minmax(0,1fr)]"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Left: the score stays in view while the fixes scroll past. */}
          <div className="space-y-6 lg:sticky lg:top-28">
            <motion.div variants={rise}>
              <ScoreCard result={result} />
            </motion.div>
            {result.strengths.length > 0 && (
              <motion.div variants={rise}>
                <Strengths items={result.strengths} />
              </motion.div>
            )}
          </div>
          <div className="min-w-0 space-y-6">
            <motion.div variants={rise}>
              <Fixes result={result} />
            </motion.div>
            <motion.div variants={rise}>
              <Locked result={result} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
    </MotionConfig>
  );
}

// ─── Pieces ─────────────────────────────────────────────────────────────────

/** The five dimensions and their weights, as the app scores them. */
const DIMENSIONS = [
  { label: "Content and impact", weight: 30 },
  { label: "ATS compatibility", weight: 25 },
  { label: "Skills", weight: 20 },
  { label: "Structure", weight: 15 },
  { label: "Tone and style", weight: 10 },
];

/** Beside the upload: what the check measures and what comes back. */
function WhatYouGet() {
  return (
    <div className="flex flex-col rounded-2xl border border-white/[0.07] bg-[#070b16] p-6 sm:p-7">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300/90">What is scored</p>
      <p className="mt-2 text-sm text-slate-400">Five dimensions, each reviewed separately and weighted into one score out of 100.</p>
      <ul className="mt-6 space-y-3.5">
        {DIMENSIONS.map((d, i) => (
          <li key={d.label}>
            <div className="mb-1.5 flex items-baseline justify-between text-[13px]">
              <span className="text-slate-200">{d.label}</span>
              <span className="font-mono text-[11px] text-slate-500">{d.weight}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/[0.05]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                initial={{ width: 0 }}
                whileInView={{ width: `${(d.weight / 30) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.08 }}
              />
            </div>
          </li>
        ))}
      </ul>
      <ul className="mt-auto space-y-2.5 border-t border-white/[0.06] pt-6 text-[13px] text-slate-400 [&>li]:flex [&>li]:gap-2.5">
        <li>
          <span className="text-emerald-400">✓</span>Your score and top 3 fixes, with rewrites, free
        </li>
        <li>
          <span className="text-emerald-400">✓</span>Results in about 30 seconds
        </li>
        <li>
          <span className="text-emerald-400">✓</span>Your file is never stored
        </li>
      </ul>
    </div>
  );
}

function WelcomeBack({ result }: { result: Shown }) {
  const when = result.checkedAt
    ? new Date(result.checkedAt).toLocaleDateString(undefined, { month: "long", day: "numeric" })
    : "";
  const device = result.restored === "device";
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-indigo-400/25 bg-indigo-500/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-white">
          {device
            ? `Welcome back. Here is your resume check${when ? ` from ${when}` : ""}.`
            : `Welcome back. A free check was already run from this device${when ? ` on ${when}` : ""}.`}
        </p>
        <p className="mt-1 text-sm text-slate-400">
          {device
            ? "Your free check is used. Create a free account to see every fix and check new versions of your resume, with 3 analyses every month."
            : "For privacy, the detailed feedback only shows in the browser that ran the check. Create a free account to see every fix, or to check a different resume."}
        </p>
      </div>
      <a
        href={SIGN_UP_URL}
        data-track="ats-check-returning-signup"
        className="shrink-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        Create free account <Chevron />
      </a>
    </div>
  );
}

function Progress() {
  const dims = ["ATS compatibility", "Content and impact", "Skills", "Structure", "Tone and style"];
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
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {/* A page being read: skeleton lines with a light passing over them. */}
        <div aria-hidden="true" className="relative mx-auto h-40 w-32 shrink-0 overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0f1c] p-3 sm:mx-0">
          <div className="mb-2 h-2 w-16 rounded bg-white/20" />
          <div className="mb-3 h-1.5 w-20 rounded bg-white/10" />
          {[88, 72, 80, 64, 76, 58, 70, 82].map((w, i) => (
            <div key={i} className={`h-1.5 rounded bg-white/[0.08] ${i === 3 ? "mb-3" : "mb-1.5"}`} style={{ width: `${w}%` }} />
          ))}
          <motion.div
            className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-indigo-400/25 to-transparent"
            initial={{ top: "-25%" }}
            animate={{ top: ["-25%", "100%"] }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.2 }}
          />
        </div>

        <div className="flex-1">
          <div className="mb-4 flex items-baseline justify-between">
            <p className="text-sm font-semibold text-white">Five reviews running at once</p>
            <p className="font-mono text-[12px] tabular-nums text-slate-500">{secs}s</p>
          </div>
          <ul className="space-y-3">
            {dims.map((d, i) => (
              <li key={d}>
                <p className="mb-1.5 text-[12px] text-slate-400">{d}</p>
                <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                  <motion.div
                    className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent"
                    initial={{ left: "-35%" }}
                    animate={{ left: ["-35%", "105%"] }}
                    transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, delay: i * 0.18 }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] text-slate-600">This usually takes 15 to 30 seconds.</p>
        </div>
      </div>
    </motion.div>
  );
}

function ScoreCard({ result }: { result: ResumeCheckResult }) {
  const b = band(result.overallScore);
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0a0f1c] p-6 sm:p-8">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col items-center text-center">
          <svg viewBox="0 0 120 120" className="h-36 w-36" role="img" aria-label={`ATS resume score ${result.overallScore} out of 100`}>
            <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
            <motion.circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke={b.ring}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: c * (1 - result.overallScore / 100) }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="58" textAnchor="middle" className="fill-white" style={{ fontSize: 32, fontWeight: 800 }}>
              <CountUp to={result.overallScore} />
            </text>
            <text x="60" y="78" textAnchor="middle" className="fill-slate-500" style={{ fontSize: 11 }}>
              out of 100
            </text>
          </svg>
          <p className={`mt-2 text-sm font-semibold ${b.tone}`}>{b.label}</p>
          <p className="mt-1 text-[11px] text-slate-600">
            {result.hasJobContext ? "Scored against your target role" : "Add a job description for a role-specific score"}
          </p>
        </div>

        <div className="space-y-4 border-t border-white/[0.06] pt-6">
          <p className="text-sm text-slate-400">
            Scored the way recruiters do: honestly. An honest 55 is worth more than a padded 80, because it tells you what to fix.
          </p>
          {result.sections.map((s, i) => (
            <div key={s.key}>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="text-slate-200">
                  {s.label} <span className="text-[11px] text-slate-600">· {Math.round(s.weight * 100)}% of score</span>
                </span>
                <span className="font-semibold text-white">{s.score}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className={`h-full rounded-full ${barTone(s.score)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.score}%` }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.35 + i * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Strengths({ items }: { items: { section: string; tip: string }[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
      <p className="mb-3 text-sm font-semibold text-white">What is working</p>
      <ul className="space-y-2.5">
        {items.map((s, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-300">
            <span className="mt-0.5 shrink-0 text-emerald-400">✓</span>
            <span>
              {s.tip} <span className="text-[11px] text-slate-600">· {s.section}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Fixes({ result }: { result: ResumeCheckResult }) {
  if (result.fixes.length === 0) return null;
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-lg font-bold text-white">Your top fixes</h3>
        <p className="text-[12px] text-slate-500">
          {result.fixes.length} of {result.fixes.length + result.locked.length}
        </p>
      </div>
      <motion.div className="space-y-4" variants={stagger}>
        {result.fixes.map((f, i) => (
          <motion.div key={i} variants={rise}>
            <FixCard fix={f} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function FixCard({ fix, index }: { fix: ResumeCheckResult["fixes"][number]; index: number }) {
  const [copied, setCopied] = useState(false);
  return (
    <article className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/[0.12]">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-[11px] font-bold text-white">{index + 1}</span>
        <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[11px] text-slate-400">{fix.section}</span>
      </div>
      <p className="mb-2 font-semibold leading-snug text-white">{fix.tip}</p>
      {fix.explanation && <p className="mb-4 text-sm leading-relaxed text-slate-400">{fix.explanation}</p>}
      {fix.solution && (
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.05] p-4">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">Suggested rewrite</p>
            <button
              type="button"
              data-track="ats-check-copy-fix"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(fix.solution);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1600);
                } catch {
                  // Clipboard blocked; the text is still selectable.
                }
              }}
              className="text-[12px] text-emerald-200 hover:text-white"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-200">{fix.solution}</p>
        </div>
      )}
    </article>
  );
}

/** Shown blurred when there are no real headlines to blur. */
const PLACEHOLDER_FIXES = [
  { section: "Content and impact", tip: "Your experience bullets describe duties instead of results." },
  { section: "ATS compatibility", tip: "Key terms from the role are missing from your experience section." },
  { section: "Skills", tip: "Several listed skills are not backed by any bullet." },
];

function Locked({ result }: { result: ResumeCheckResult }) {
  // A scores-only result (network match) has no headlines; count from totals.
  const scoresOnly = result.fixes.length === 0 && result.locked.length === 0;
  const n = scoresOnly ? result.totals.improvements : result.locked.length;
  const shown = result.locked.slice(0, 3);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-400/25 bg-white/[0.02]">
      {/* The fixes behind the lock: headlines only from the server, blurred
          here. The rewrites are never sent to the page. */}
      <div aria-hidden="true" className="pointer-events-none select-none space-y-4 p-6 blur-[5px] opacity-90">
        {(shown.length ? shown : PLACEHOLDER_FIXES).map((f, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
            <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[11px] text-slate-400">{f.section}</span>
            <p className="mt-3 font-semibold text-white">{f.tip}</p>
            <div className="mt-3 space-y-2">
              <div className="h-2.5 w-11/12 rounded bg-white/10" />
              <div className="h-2.5 w-4/5 rounded bg-white/10" />
            </div>
            <div className="mt-4 h-16 rounded-xl bg-emerald-500/10" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#050810]/5 via-[#050810]/75 to-[#050810]/95 p-6">
        <div className="max-w-md rounded-2xl border border-white/[0.08] bg-[#0a0f1c]/90 p-6 text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-indigo-400/30 bg-indigo-500/15">
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-indigo-400/40"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2.2, ease: "easeOut", repeat: Infinity }}
            />
            <svg className="h-5 w-5 text-indigo-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">
            {n > 0 ? `${n} ${scoresOnly ? "" : "more "}${n === 1 ? "fix" : "fixes"} found in your resume` : "Your full analysis is ready"}
          </h3>
          <p className="mb-5 text-sm text-slate-400">
            Explore every fix and the deeper analysis in your free account.
          </p>
          <ul className="mb-6 space-y-2 text-left text-sm text-slate-300">
            {[
              `All ${result.totals.findings} findings across the 5 dimensions, each with a rewrite`,
              "Your full report saved to your account, so you can track the score as you improve",
              "Re-check as you edit, with 3 free analyses every month",
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-0.5 shrink-0 text-indigo-300">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href={SIGN_UP_URL}
            data-track="ats-check-unlock"
            onClick={() => trackEvent("ats-check-unlock-click", { locked: n, score: result.overallScore }, "tool")}
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)] sm:w-auto"
          >
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ left: "-40%" }}
              animate={{ left: ["-40%", "130%"] }}
              transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.6 }}
            />
            <span className="relative inline-flex items-center gap-2">
              Unlock my full analysis, free <Chevron />
            </span>
          </a>
          <p className="mt-3 text-[11px] text-slate-500">
            Free account · No credit card · Opens straight to resume analysis, upload the same file to see every fix
          </p>
        </div>
      </div>
    </div>
  );
}
