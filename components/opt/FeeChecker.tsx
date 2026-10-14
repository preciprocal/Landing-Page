"use client";

/**
 * components/opt/FeeChecker.tsx
 *
 * "Would the proposed OPT fee apply to me?" Encodes the October 8, 2026
 * proposed rule (docket ICEB-2026-0100) as DHS and law firm summaries describe
 * it: $70,000 for a student's first OPT recommendation, $30,000 for each later
 * one including STEM OPT, paid by the school, effective 60 days after a final
 * rule, and not charged for any OPT period already recommended or approved
 * before that date. Revisit if the final rule changes any of this.
 */

import { useState } from "react";

type Which = "first" | "later" | null;
type Timing = "before" | "after" | "unsure" | null;

function Choice<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly (readonly [T, string])[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([id, label]) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`px-3 py-1.5 rounded-lg text-[12px] border transition-colors text-left ${
            value === id ? "bg-indigo-500/20 border-indigo-400/50 text-white" : "border-white/[0.08] text-slate-400 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function FeeChecker() {
  const [which, setWhich] = useState<Which>(null);
  const [timing, setTiming] = useState<Timing>(null);

  const amount = which === "first" ? "$70,000" : "$30,000";
  let verdict: { tone: string; text: string } | null = null;
  if (which && timing === "before") {
    verdict = {
      tone: "text-emerald-300",
      text: "Under the proposal, no new fee for this OPT period. Periods already recommended or approved before the rule takes effect are not charged.",
    };
  } else if (which && timing === "after") {
    verdict = {
      tone: "text-amber-300",
      text: `Under the proposal, your school would have to pay ${amount} before your DSO could recommend this OPT, and USCIS could not approve your EAD until it was paid. Your school could pass some or all of that on to you or your employer.`,
    };
  } else if (which && timing === "unsure") {
    verdict = {
      tone: "text-slate-300",
      text: `It depends on timing. If your recommendation comes before the effective date (60 days after a final rule, which has not been published), no new fee. If it comes after, your school would owe ${amount}.`,
    };
  }

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
      <p className="text-white font-semibold mb-1">Would the proposed OPT fee apply to me?</p>
      <p className="text-[12px] text-slate-500 mb-5">
        Based on the rule as proposed on October 8, 2026. Nothing is in effect today, and the final rule could change.
      </p>

      <p className="text-[12px] text-slate-400 mb-2">1. Which OPT are you asking about?</p>
      <Choice
        options={[
          ["first", "My first OPT (pre- or post-completion)"],
          ["later", "A later one, such as the STEM OPT extension"],
        ] as const}
        value={which}
        onChange={setWhich}
      />

      <p className="text-[12px] text-slate-400 mt-5 mb-2">2. When will your DSO recommend it in SEVIS?</p>
      <Choice
        options={[
          ["before", "Already recommended, or approved"],
          ["after", "After a final rule takes effect"],
          ["unsure", "Not sure yet"],
        ] as const}
        value={timing}
        onChange={setTiming}
      />

      {verdict && (
        <div className="mt-6 rounded-xl border border-white/[0.08] p-5">
          <p className={`text-sm leading-relaxed ${verdict.tone}`}>{verdict.text}</p>
          <p className="text-[12px] text-slate-500 mt-3">
            Either way, the normal USCIS fees still apply: $470 to file Form I-765 online or $520 on paper, plus $1,780 if
            you choose premium processing.
          </p>
        </div>
      )}
    </div>
  );
}
