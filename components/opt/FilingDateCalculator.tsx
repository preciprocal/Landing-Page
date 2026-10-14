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
import { addDays, addMonths, formatDay, minDate, parseDay } from "@/lib/optDates";

type Mode = "initial" | "stem";

const input =
  "w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-400/60 [color-scheme:dark]";

function Row({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="py-3 border-t border-white/[0.06] first:border-t-0">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
      {note && <p className="text-[11px] text-slate-600 mt-1">{note}</p>}
    </div>
  );
}

export default function FilingDateCalculator() {
  const [mode, setMode] = useState<Mode>("initial");
  const [anchor, setAnchor] = useState("");
  const [rec, setRec] = useState("");

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
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
      <p className="text-white font-semibold mb-1">OPT filing deadline calculator</p>
      <p className="text-[12px] text-slate-500 mb-5">Runs in your browser. Nothing you enter is sent anywhere.</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {(
          [
            ["initial", "Post-completion OPT"],
            ["stem", "STEM OPT extension"],
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <label className="block">
          <span className="block text-[12px] text-slate-400 mb-1.5">
            {mode === "initial" ? "Program end date (on your I-20)" : "Current OPT EAD end date"}
          </span>
          <input type="date" className={input} value={anchor} onChange={(e) => setAnchor(e.target.value)} />
        </label>
        <label className="block">
          <span className="block text-[12px] text-slate-400 mb-1.5">DSO recommendation date (optional)</span>
          <input type="date" className={input} value={rec} onChange={(e) => setRec(e.target.value)} />
        </label>
      </div>

      {rows.length ? (
        <div className="rounded-xl border border-white/[0.08] px-5 py-2">
          {rows.map((row) => (
            <Row key={row.label} {...row} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">Enter a date to see your filing window.</p>
      )}

      <p className="text-[11px] text-slate-600 mt-4 leading-relaxed">
        Based on the filing rules on USCIS&apos;s OPT and Form I-765 pages. USCIS goes by the date it receives your
        application, not the date you send it, so do not leave it to the last day. Confirm your dates with your DSO.
      </p>
    </div>
  );
}
