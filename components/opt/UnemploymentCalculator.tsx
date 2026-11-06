"use client";

/**
 * components/opt/UnemploymentCalculator.tsx
 *
 * Counts OPT unemployment days the way SEVP policy guidance describes: every
 * day, weekends included, from the EAD start date that is not covered by
 * qualifying employment counts (SEVP Policy Guidance 1004-03, 7.1.6). Limits
 * are 90 days on post-completion OPT and 150 in total with STEM OPT
 * (8 CFR 214.2(f)(10)(ii)(E), as quoted in the USCIS Policy Manual).
 *
 * It cannot know whether a job qualifies (20+ hours a week, related to the
 * degree) or about days abroad while unemployed, so the result says so.
 */

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { addDays, daysBetween, formatDay, parseDay, toInputValue, todayUtc } from "@/lib/optDates";

type Mode = "opt" | "stem";
type Job = { id: number; start: string; end: string };

const input =
  "min-h-[44px] w-full min-w-0 rounded-xl bg-white/[0.04] border border-white/[0.08] px-3.5 py-2.5 text-sm text-white transition-colors hover:border-white/[0.14] focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/25 [color-scheme:dark]";

const fieldLabel = "mb-2 block text-[12px] font-medium text-slate-300";

export default function UnemploymentCalculator() {
  const [mode, setMode] = useState<Mode>("opt");
  const [start, setStart] = useState("");
  const [through, setThrough] = useState("");
  const [prior, setPrior] = useState("0");
  const [jobs, setJobs] = useState<Job[]>([{ id: 1, start: "", end: "" }]);
  const reduce = useReducedMotion();

  // Set "today" after mount so the server render and the client agree.
  useEffect(() => setThrough(toInputValue(todayUtc())), []);

  const result = useMemo(() => {
    const s = parseDay(start);
    const t = parseDay(through);
    if (!s || !t || t < s) return null;

    const ranges = jobs
      .map((j) => ({ a: parseDay(j.start), b: parseDay(j.end) ?? t }))
      .filter((r): r is { a: Date; b: Date } => r.a !== null && r.b >= r.a);

    let unemployed = 0;
    const total = daysBetween(s, t) + 1;
    for (let i = 0; i < total; i++) {
      const day = addDays(s, i);
      if (!ranges.some((r) => day >= r.a && day <= r.b)) unemployed++;
    }

    const priorDays = mode === "stem" ? Math.max(0, Math.min(90, Number(prior) || 0)) : 0;
    const limit = mode === "stem" ? 150 : 90;
    const used = unemployed + priorDays;
    const remaining = limit - used;
    const employedToday = ranges.some((r) => t >= r.a && t <= r.b);
    const limitDate = !employedToday && remaining > 0 ? addDays(t, remaining) : null;

    return { used, limit, remaining, employedToday, limitDate, t };
  }, [mode, start, through, prior, jobs]);

  const setJob = (id: number, key: "start" | "end", value: string) =>
    setJobs((js) => js.map((j) => (j.id === id ? { ...j, [key]: value } : j)));

  const tone = !result
    ? { text: "text-white", bar: "from-accent to-accent-2" }
    : result.remaining <= 0
      ? { text: "text-rose-400", bar: "from-rose-500 to-rose-400" }
      : result.remaining <= 30
        ? { text: "text-amber-300", bar: "from-amber-500 to-amber-300" }
        : { text: "text-white", bar: "from-accent to-accent-2" };
  const share = result ? Math.min(100, Math.max(0, (result.used / result.limit) * 100)) : 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070b16]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-deep/10 blur-[90px]" />
      <div className="relative flex flex-col gap-5 border-b border-white/[0.06] p-6 sm:p-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">OPT unemployment day calculator</p>
          <p className="mt-1.5 text-[12px] text-slate-400">Runs in your browser. Nothing you enter is sent anywhere.</p>
        </div>

        <div role="group" aria-label="OPT type" className="inline-flex w-full rounded-xl border border-white/[0.08] bg-white/[0.02] p-1 md:w-auto">
          {(
            [
              ["opt", "Post-completion OPT (90 days)"],
              ["stem", "STEM OPT extension (150 total)"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              onClick={() => setMode(id)}
              className={`min-h-[40px] flex-1 rounded-lg px-3.5 py-2 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 md:flex-none md:whitespace-nowrap ${
                mode === id ? "bg-accent/15 text-white shadow-[inset_0_0_0_1px_rgb(var(--accent)/0.45)]" : "text-slate-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        {/* Inputs */}
        <div className="p-6 sm:p-8">
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={fieldLabel}>{mode === "stem" ? "STEM OPT EAD start date" : "EAD start date (on the card)"}</span>
              <input type="date" className={input} value={start} onChange={(e) => setStart(e.target.value)} />
            </label>
            <label className="block">
              <span className={fieldLabel}>Count through</span>
              <input type="date" className={input} value={through} onChange={(e) => setThrough(e.target.value)} />
            </label>
            {mode === "stem" && (
              <label className="block">
                <span className={fieldLabel}>Days used on initial OPT</span>
                <input type="number" min={0} max={90} className={input} value={prior} onChange={(e) => setPrior(e.target.value)} />
              </label>
            )}
          </div>

          <p id="opt-jobs-label" className="mb-3 text-[12px] font-medium text-slate-300">Qualifying jobs (leave the end date empty if you still work there)</p>
          <div aria-hidden="true" className="mb-1.5 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_2.75rem] gap-2 text-[11px] text-slate-400">
            <span className="pl-1">Start date</span>
            <span className="pl-1">End date</span>
            <span />
          </div>
          <div role="group" aria-labelledby="opt-jobs-label" className="mb-3 space-y-2">
            {jobs.map((j, i) => (
              <div key={j.id} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-2">
                <input type="date" aria-label={`Job ${i + 1} start date`} className={input} value={j.start} onChange={(e) => setJob(j.id, "start", e.target.value)} />
                <input type="date" aria-label={`Job ${i + 1} end date`} className={input} value={j.end} onChange={(e) => setJob(j.id, "end", e.target.value)} />
                <button
                  type="button"
                  onClick={() => setJobs((js) => (js.length > 1 ? js.filter((x) => x.id !== j.id) : [{ id: j.id, start: "", end: "" }]))}
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                  aria-label={`Remove job ${i + 1}`}
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setJobs((js) => [...js, { id: Math.max(...js.map((x) => x.id)) + 1, start: "", end: "" }])}
            className="inline-flex min-h-[40px] items-center rounded-md px-1 text-[12px] font-medium text-accent-soft transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          >
            + Add another job
          </button>
        </div>

        {/* Result */}
        <div className="border-t border-white/[0.06] bg-white/[0.015] p-6 sm:p-8 lg:border-l lg:border-t-0">
          <div aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              {result ? (
                <motion.div
                  key="result"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-5 grid grid-cols-2 gap-4">
                    <div>
                      <p className={`text-4xl font-extrabold tabular-nums tracking-tight ${tone.text}`}>{result.used}</p>
                      <p className="mt-1 text-[12px] text-slate-400">of {result.limit} unemployment days used</p>
                    </div>
                    <div>
                      <p className="text-4xl font-extrabold tabular-nums tracking-tight text-white">{Math.max(0, result.remaining)}</p>
                      <p className="mt-1 text-[12px] text-slate-400">days remaining</p>
                    </div>
                  </div>
                  <div aria-hidden="true" className="mb-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${tone.bar}`}
                      initial={reduce ? false : { width: 0 }}
                      animate={{ width: `${share}%` }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  {result.remaining <= 0 ? (
                    <p className="text-sm text-rose-300">
                      This is at or over the limit. Contact your DSO now, before doing anything else.
                    </p>
                  ) : result.limitDate ? (
                    <p className="text-sm text-slate-300">
                      If you stay unemployed, your last allowed unemployment day is{" "}
                      <strong className="text-white">{formatDay(result.limitDate)}</strong>.
                    </p>
                  ) : (
                    <p className="text-sm text-slate-300">You are counted as employed on {formatDay(result.t)}, so the clock is stopped.</p>
                  )}
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  className="rounded-xl border border-dashed border-white/[0.08] px-5 py-6 text-sm text-slate-400"
                >
                  Enter your EAD start date to see your count.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-5 text-[11px] leading-relaxed text-slate-400">
            Assumes every job you enter is qualifying: at least 20 hours a week and directly related to your degree. Days outside
            the US count as unemployment unless you were employed at the time. This is an estimate; the count your DSO sees in
            SEVIS is the one that matters.
          </p>
        </div>
      </div>
    </div>
  );
}
