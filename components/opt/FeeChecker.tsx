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
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Which = "first" | "later" | null;
type Timing = "before" | "after" | "unsure" | null;

function Choice<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly (readonly [T, string])[];
  value: T | null;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
      {options.map(([id, text]) => (
        <button
          key={id}
          type="button"
          aria-pressed={value === id}
          onClick={() => onChange(id)}
          className={`flex min-h-[44px] items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-[13px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 ${
            value === id
              ? "border-accent/50 bg-accent/[0.12] text-white"
              : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/[0.16] hover:text-white"
          }`}
        >
          <span
            aria-hidden="true"
            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-colors ${
              value === id ? "border-accent-soft" : "border-slate-600"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full bg-accent-soft transition-transform ${value === id ? "scale-100" : "scale-0"}`} />
          </span>
          {text}
        </button>
      ))}
    </div>
  );
}

export default function FeeChecker() {
  const [which, setWhich] = useState<Which>(null);
  const [timing, setTiming] = useState<Timing>(null);
  const reduce = useReducedMotion();

  const amount = which === "first" ? "$70,000" : "$30,000";
  let verdict: { tone: string; bar: string; text: string } | null = null;
  if (which && timing === "before") {
    verdict = {
      tone: "text-emerald-300",
      bar: "bg-emerald-400",
      text: "Under the proposal, no new fee for this OPT period. Periods already recommended or approved before the rule takes effect are not charged.",
    };
  } else if (which && timing === "after") {
    verdict = {
      tone: "text-amber-300",
      bar: "bg-amber-400",
      text: `Under the proposal, your school would have to pay ${amount} before your DSO could recommend this OPT, and USCIS could not approve your EAD until it was paid. Your school could pass some or all of that on to you or your employer.`,
    };
  } else if (which && timing === "unsure") {
    verdict = {
      tone: "text-slate-300",
      bar: "bg-slate-400",
      text: `It depends on timing. If your recommendation comes before the effective date (60 days after a final rule, which has not been published), no new fee. If it comes after, your school would owe ${amount}.`,
    };
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070b16]">
      <div className="relative border-b border-white/[0.06] p-6 sm:p-8">
        <p className="text-lg font-semibold text-white">Would the proposed OPT fee apply to me?</p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-slate-400">
          Based on the rule as proposed on October 8, 2026. Nothing is in effect today, and the final rule could change.
        </p>
      </div>

      <div className="relative space-y-6 p-6 sm:p-8">
        <div>
          <p className="mb-3 text-[12px] font-medium text-slate-300">1. Which OPT are you asking about?</p>
          <Choice
            label="Which OPT are you asking about?"
            options={[
              ["first", "My first OPT (pre- or post-completion)"],
              ["later", "A later one, such as the STEM OPT extension"],
            ] as const}
            value={which}
            onChange={setWhich}
          />
        </div>

        <div>
          <p className="mb-3 text-[12px] font-medium text-slate-300">2. When will your DSO recommend it in SEVIS?</p>
          <Choice
            label="When will your DSO recommend it in SEVIS?"
            options={[
              ["before", "Already recommended, or approved"],
              ["after", "After a final rule takes effect"],
              ["unsure", "Not sure yet"],
            ] as const}
            value={timing}
            onChange={setTiming}
          />
        </div>

        <div aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {verdict && (
              <motion.div
                key={`${which}-${timing}`}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 pl-6"
              >
                <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-0.5 ${verdict.bar}`} />
                <p className={`text-sm leading-relaxed ${verdict.tone}`}>{verdict.text}</p>
                <p className="mt-3 text-[12px] text-slate-400">
                  Either way, the normal USCIS fees still apply: $470 to file Form I-765 online or $520 on paper, plus $1,780 if
                  you choose premium processing.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
