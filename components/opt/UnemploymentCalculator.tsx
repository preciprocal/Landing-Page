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
import { addDays, daysBetween, formatDay, parseDay, toInputValue, todayUtc } from "@/lib/optDates";

type Mode = "opt" | "stem";
type Job = { id: number; start: string; end: string };

const input =
  "w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-400/60 [color-scheme:dark]";

export default function UnemploymentCalculator() {
  const [mode, setMode] = useState<Mode>("opt");
  const [start, setStart] = useState("");
  const [through, setThrough] = useState("");
  const [prior, setPrior] = useState("0");
  const [jobs, setJobs] = useState<Job[]>([{ id: 1, start: "", end: "" }]);

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

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
      <p className="text-white font-semibold mb-1">OPT unemployment day calculator</p>
      <p className="text-[12px] text-slate-500 mb-5">Runs in your browser. Nothing you enter is sent anywhere.</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {(
          [
            ["opt", "Post-completion OPT (90 days)"],
            ["stem", "STEM OPT extension (150 total)"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`px-3 py-1.5 rounded-lg text-[12px] border transition-colors ${
              mode === id ? "bg-indigo-500/20 border-indigo-400/50 text-white" : "border-white/[0.08] text-slate-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <label className="block">
          <span className="block text-[12px] text-slate-400 mb-1.5">
            {mode === "stem" ? "STEM OPT EAD start date" : "EAD start date (on the card)"}
          </span>
          <input type="date" className={input} value={start} onChange={(e) => setStart(e.target.value)} />
        </label>
        <label className="block">
          <span className="block text-[12px] text-slate-400 mb-1.5">Count through</span>
          <input type="date" className={input} value={through} onChange={(e) => setThrough(e.target.value)} />
        </label>
        {mode === "stem" && (
          <label className="block">
            <span className="block text-[12px] text-slate-400 mb-1.5">Days used on initial OPT</span>
            <input type="number" min={0} max={90} className={input} value={prior} onChange={(e) => setPrior(e.target.value)} />
          </label>
        )}
      </div>

      <p className="text-[12px] text-slate-400 mb-2">Qualifying jobs (leave the end date empty if you still work there)</p>
      <div className="space-y-2 mb-3">
        {jobs.map((j, i) => (
          <div key={j.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
            <input type="date" aria-label={`Job ${i + 1} start date`} className={input} value={j.start} onChange={(e) => setJob(j.id, "start", e.target.value)} />
            <input type="date" aria-label={`Job ${i + 1} end date`} className={input} value={j.end} onChange={(e) => setJob(j.id, "end", e.target.value)} />
            <button
              type="button"
              onClick={() => setJobs((js) => (js.length > 1 ? js.filter((x) => x.id !== j.id) : [{ id: j.id, start: "", end: "" }]))}
              className="text-slate-500 hover:text-white text-sm px-2"
              aria-label={`Remove job ${i + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setJobs((js) => [...js, { id: Math.max(...js.map((x) => x.id)) + 1, start: "", end: "" }])}
        className="text-[12px] text-indigo-300 hover:text-indigo-200 mb-6"
      >
        + Add another job
      </button>

      {result ? (
        <div className="rounded-xl border border-white/[0.08] p-5">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className={`text-3xl font-extrabold ${result.remaining <= 0 ? "text-rose-400" : result.remaining <= 30 ? "text-amber-300" : "text-white"}`}>
                {result.used}
              </p>
              <p className="text-[12px] text-slate-500">of {result.limit} unemployment days used</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white">{Math.max(0, result.remaining)}</p>
              <p className="text-[12px] text-slate-500">days remaining</p>
            </div>
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
        </div>
      ) : (
        <p className="text-sm text-slate-500">Enter your EAD start date to see your count.</p>
      )}

      <p className="text-[11px] text-slate-600 mt-4 leading-relaxed">
        Assumes every job you enter is qualifying: at least 20 hours a week and directly related to your degree. Days outside
        the US count as unemployment unless you were employed at the time. This is an estimate; the count your DSO sees in
        SEVIS is the one that matters.
      </p>
    </div>
  );
}
