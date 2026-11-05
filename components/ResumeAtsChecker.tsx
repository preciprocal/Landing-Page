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
 */

import { useRef, useState } from "react";
import { APP_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics/client";
import type { ResumeCheckResult } from "@/lib/resumeCheck/analysis";

const SIGN_UP_URL = `${APP_URL}/sign-up?tool=ats-checker`;
const MAX_BYTES = 4 * 1024 * 1024;
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
  const [result, setResult] = useState<ResumeCheckResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

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
      const data = (await res.json().catch(() => null)) as (ResumeCheckResult & { error?: string }) | null;
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

  return (
    <div className="text-left space-y-6">
      {/* ── Upload ───────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
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
          className={`w-full rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            dragging ? "border-indigo-400/70 bg-indigo-500/[0.08]" : file ? "border-emerald-400/40 bg-emerald-500/[0.04]" : "border-white/[0.12] hover:border-indigo-400/40 hover:bg-white/[0.02]"
          }`}
        >
          <svg className="mx-auto mb-3 h-9 w-9 text-indigo-300" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5M12 17v-6M9.5 13.5 12 11l2.5 2.5" />
          </svg>
          {file ? (
            <>
              <p className="font-semibold text-white">{file.name}</p>
              <p className="mt-1 text-[12px] text-slate-500">{(file.size / 1024).toFixed(0)} KB · Click to choose a different file</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-white">Drop your resume here, or click to upload</p>
              <p className="mt-1 text-[12px] text-slate-500">PDF or Word (.docx), up to 4 MB</p>
            </>
          )}
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
        {showJd && (
          <div className="mt-4">
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
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-slate-600">Sent to our AI model provider to score it. Not stored, no account needed.</p>
          <button
            type="button"
            data-track="ats-check-submit"
            onClick={run}
            disabled={!file || loading}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Analysing your resume..." : "Check my resume free"}
          </button>
        </div>
        {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}
      </div>

      {loading && <Progress />}

      {result && (
        <div ref={resultsRef} className="scroll-mt-28 space-y-6">
          <ScoreCard result={result} />
          {result.strengths.length > 0 && <Strengths items={result.strengths} />}
          <Fixes result={result} />
          <Locked result={result} />
        </div>
      )}
    </div>
  );
}

// ─── Pieces ─────────────────────────────────────────────────────────────────

function Progress() {
  const steps = ["Reading your resume", "Checking ATS compatibility", "Scoring content and impact", "Reviewing skills and structure", "Writing your fixes"];
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6" aria-live="polite">
      <p className="mb-4 text-sm font-semibold text-white">Five reviews running at once</p>
      <ul className="space-y-3">
        {steps.map((s, i) => (
          <li key={s} className="flex animate-pulse items-center gap-3 text-sm text-slate-400" style={{ animationDelay: `${i * 250}ms` }}>
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            {s}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] text-slate-600">This usually takes 15 to 30 seconds.</p>
    </div>
  );
}

function ScoreCard({ result }: { result: ResumeCheckResult }) {
  const b = band(result.overallScore);
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0a0f1c] p-6 sm:p-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <div className="flex shrink-0 flex-col items-center text-center md:w-56">
          <svg viewBox="0 0 120 120" className="h-36 w-36" role="img" aria-label={`ATS resume score ${result.overallScore} out of 100`}>
            <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke={b.ring}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - result.overallScore / 100)}
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="58" textAnchor="middle" className="fill-white" style={{ fontSize: 32, fontWeight: 800 }}>
              {result.overallScore}
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

        <div className="flex-1 space-y-4">
          <p className="text-sm text-slate-400">
            Scored the way recruiters do: honestly. An honest 55 is worth more than a padded 80, because it tells you what to fix.
          </p>
          {result.sections.map((s) => (
            <div key={s.key}>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="text-slate-200">
                  {s.label} <span className="text-[11px] text-slate-600">· {Math.round(s.weight * 100)}% of score</span>
                </span>
                <span className="font-semibold text-white">{s.score}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div className={`h-full rounded-full ${barTone(s.score)}`} style={{ width: `${s.score}%` }} />
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
      <div className="space-y-4">
        {result.fixes.map((f, i) => (
          <FixCard key={i} fix={f} index={i} />
        ))}
      </div>
    </div>
  );
}

function FixCard({ fix, index }: { fix: ResumeCheckResult["fixes"][number]; index: number }) {
  const [copied, setCopied] = useState(false);
  return (
    <article className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
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

function Locked({ result }: { result: ResumeCheckResult }) {
  const n = result.locked.length;
  const shown = result.locked.slice(0, 3);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-400/25 bg-white/[0.02]">
      {/* The fixes behind the lock: headlines only from the server, blurred
          here. The rewrites are never sent to the page. */}
      <div aria-hidden="true" className="pointer-events-none select-none space-y-4 p-6 blur-[5px] opacity-90">
        {(shown.length ? shown : [{ section: "Content and impact", tip: "Your experience bullets describe duties instead of results." }]).map((f, i) => (
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
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-indigo-400/30 bg-indigo-500/15">
            <svg className="h-5 w-5 text-indigo-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">
            {n > 0 ? `${n} more ${n === 1 ? "fix" : "fixes"} found in your resume` : "Your full analysis is ready"}
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
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)] sm:w-auto"
          >
            Unlock my full analysis, free →
          </a>
          <p className="mt-3 text-[11px] text-slate-500">
            Free account · No credit card · Opens straight to resume analysis, upload the same file to see every fix
          </p>
        </div>
      </div>
    </div>
  );
}
