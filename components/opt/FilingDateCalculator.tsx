"use client";

/**
 * components/opt/FilingDateCalculator.tsx
 *
 * The Form I-765 filing windows, as USCIS states them on its OPT page and the
 * I-765 page (both last reviewed October 2026):
 *   Post-completion (c)(3)(B): up to 90 days before the program end date, no
 *   later than 60 days after it, and within 30 days of the DSO recommendation.
 *   STEM extension (c)(3)(C): up to 90 days before the current OPT expires,
 *   within 60 days of the DSO recommendation, and not in the grace period.
 * Plus the 14-month rule for completing post-completion OPT (USCIS Policy
 * Manual, Vol. 2, Part F, Ch. 5).
 */

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { addDays, addMonths, formatDay, minDate, parseDay } from "@/lib/optDates";

type Mode = "initial" | "stem";

const input =
  "min-h-[44px] w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-3.5 py-2.5 text-sm text-white transition-colors hover:border-white/[0.14] focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/25 [color-scheme:dark]";

const pad2 = (n: number) => String(n).padStart(2, "0");

function Row({ index, label, value, note }: { index: number; label: string; value: string; note?: string }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 border-t border-white/[0.06] py-4 first:border-t-0">
      <span className="pt-0.5 font-mono text-[11px] text-accent-soft/70">{pad2(index)}</span>
      <div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <p className="text-sm text-slate-400">{label}</p>
          <p className="text-sm font-semibold text-white sm:text-right">{value}</p>
        </div>
        {note && <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">{note}</p>}
      </div>
    </div>
  );
}

export default function FilingDateCalculator() {
  const [mode, setMode] = useState<Mode>("initial");
  const [anchor, setAnchor] = useState("");
  const [rec, setRec] = useState("");
  const reduce = useReducedMotion();

  const a = parseDay(anchor);
  const r = parseDay(rec);

  let rows: { label: string; value: string; note?: string }[] = [];
  if (a && mode === "initial") {
    const latest = addDays(a, 60);
    rows = [
      { label: "Earliest day USCIS can receive your I-765", value: formatDay(addDays(a, -90)) },
      {
        label: "Last day to file",
        value: formatDay(r ? minDate(addDays(r, 30), latest) : latest),
        note: r
          ? "The earlier of 30 days after your DSO's recommendation and 60 days after your program end date."
          : "Add your DSO recommendation date: you must also file within 30 days of it, which is often the real deadline.",
      },
      { label: "Latest OPT start date you can request", value: formatDay(latest), note: "Within the 60-day grace period after your program end date." },
      { label: "All post-completion OPT must be finished by", value: formatDay(addMonths(a, 14)), note: "The 14-month rule. It does not apply to the STEM extension." },
    ];
  } else if (a && mode === "stem") {
    rows = [
      { label: "Earliest day to file for STEM OPT", value: formatDay(addDays(a, -90)) },
      {
        label: "Last day to file",
        value: formatDay(r ? minDate(addDays(r, 60), a) : a),
        note: r
          ? "The earlier of 60 days after your DSO's recommendation and your current OPT end date."
          : "It must be filed before your current OPT expires. You cannot apply in the 60-day grace period.",
      },
      {
        label: "If filed on time, you can keep working until",
        value: `${formatDay(addDays(a, 180))} at most`,
        note: "The 180-day automatic extension while a timely STEM application is pending. It ends when USCIS decides.",
      },
    ];
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070b16]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-deep/10 blur-[90px]" />
      <div className="relative flex flex-col gap-5 border-b border-white/[0.06] p-6 sm:p-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">OPT filing deadline calculator</p>
          <p className="mt-1.5 text-[12px] text-slate-400">Runs in your browser. Nothing you enter is sent anywhere.</p>
        </div>

        <div role="group" aria-label="OPT type" className="inline-flex w-full rounded-xl border border-white/[0.08] bg-white/[0.02] p-1 md:w-auto">
          {(
            [
              ["initial", "Post-completion OPT"],
              ["stem", "STEM OPT extension"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              onClick={() => setMode(id)}
              className={`min-h-[40px] flex-1 rounded-lg sm:whitespace-nowrap px-3.5 py-2 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 md:flex-none ${
                mode === id ? "bg-accent/15 text-white shadow-[inset_0_0_0_1px_rgb(var(--accent)/0.45)]" : "text-slate-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative p-6 sm:p-8">
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[12px] font-medium text-slate-300">
              {mode === "initial" ? "Program end date (on your I-20)" : "Current OPT EAD end date"}
            </span>
            <input type="date" className={input} value={anchor} onChange={(e) => setAnchor(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-2 block text-[12px] font-medium text-slate-300">DSO recommendation date (optional)</span>
            <input type="date" className={input} value={rec} onChange={(e) => setRec(e.target.value)} />
          </label>
        </div>

        <div aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {rows.length ? (
              <motion.div
                key={`rows-${mode}`}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-1"
              >
                {rows.map((row, i) => (
                  <Row key={row.label} index={i + 1} {...row} />
                ))}
              </motion.div>
            ) : (
              <motion.p
                key="empty"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                className="rounded-xl border border-dashed border-white/[0.08] px-5 py-6 text-sm text-slate-400"
              >
                Enter a date to see your filing window.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-5 text-[11px] leading-relaxed text-slate-400">
          Based on the filing rules on USCIS&apos;s OPT and Form I-765 pages. USCIS goes by the date it receives your
          application, not the date you send it, so do not leave it to the last day. Confirm your dates with your DSO.
        </p>
      </div>
    </div>
  );
}
