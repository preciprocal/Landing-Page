"use client";

/**
 * Hero illustration for /salary-guide: an offer check inside the product. A
 * pay range bar draws its percentile ticks, the typical band fills, and a
 * marker lands where the user's offer sits; below, the offer's pay mix and a
 * negotiation note. Purely illustrative: no salary figures and no market
 * data, and the card says "Example only".
 * Steps: 0 axis, 1 ticks, 2 band and mix, 3 marker (finished state).
 * Names, companies and percentages are fictional examples.
 */

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

const TICKS = [
  { at: 8, label: "P10" },
  { at: 28, label: "P25" },
  { at: 50, label: "Median" },
  { at: 72, label: "P75" },
  { at: 92, label: "P90" },
];

const MIX = [
  { label: "Base", w: 62, cls: "bg-accent" },
  { label: "Bonus", w: 14, cls: "bg-accent-2/70" },
  { label: "Equity", w: 24, cls: "bg-accent-deep/60" },
];

export default function SalaryGuideVisual() {
  const { ref, step } = useLoop(4, 1800);

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/salary" bodyClassName="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[13px] font-semibold text-white">Data Analyst · Level II</p>
              <p className="mt-0.5 text-[11px] text-slate-400">Offer from Northwind, compared by percentile</p>
            </div>
            <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10.5px] font-medium text-slate-300">Example only</span>
          </div>

          {/* The range */}
          <div className="relative mt-11 px-1">
            <motion.div
              className="absolute -top-9 z-10 -translate-x-1/2"
              initial={false}
              animate={{ left: step >= 3 ? "64%" : "50%", opacity: step >= 3 ? 1 : 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="whitespace-nowrap rounded-md bg-accent px-2 py-0.5 text-[10.5px] font-bold text-[#0a0f1c] shadow-[0_6px_20px_-4px_rgb(var(--accent)/0.6)]">Your offer</div>
              <div className="mx-auto h-0 w-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-accent" />
            </motion.div>

            <div className="relative h-3 rounded-full bg-white/[0.07]">
              <motion.div
                className="absolute inset-y-0 origin-left rounded-full bg-gradient-to-r from-accent-deep/70 via-accent to-accent-2/80"
                style={{ left: "28%", width: "44%" }}
                initial={false}
                animate={{ scaleX: step >= 2 ? 1 : 0, opacity: step >= 2 ? 1 : 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </div>

            <div className="relative h-9">
              {TICKS.map((t, i) => (
                <motion.div
                  key={t.label}
                  className="absolute top-0 flex flex-col items-center"
                  style={{ left: `${t.at}%` }}
                  initial={false}
                  animate={{ x: "-50%", opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : -4 }}
                  transition={{ duration: 0.4, ease: EASE, delay: step === 1 ? i * 0.08 : 0 }}
                >
                  <span className={`h-2.5 w-px ${t.label === "Median" ? "bg-accent" : "bg-white/30"}`} />
                  <span className={`mt-1 text-[10.5px] font-medium ${t.label === "Median" ? "text-accent-soft" : "text-slate-400"}`}>{t.label}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-[10.5px] text-slate-400">Typical band: P25 to P75</p>
          </div>

          <div className="mt-4 grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-3">
            {/* Pay mix */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Pay mix</p>
              <div className="mt-2.5 flex h-2 overflow-hidden rounded-full bg-white/[0.06]">
                {MIX.map((m, i) => (
                  <motion.span
                    key={m.label}
                    className={`h-full ${m.cls}`}
                    initial={false}
                    animate={{ width: step >= 2 ? `${m.w}%` : "0%" }}
                    transition={{ duration: 0.6, ease: EASE, delay: step === 2 ? i * 0.1 : 0 }}
                  />
                ))}
              </div>
              <div className="mt-2.5 flex justify-between gap-2 text-[10.5px] text-slate-300">
                {MIX.map((m) => (
                  <span key={m.label} className="inline-flex items-center gap-1.5">
                    <span className={`h-1.5 w-2.5 rounded-full ${m.cls}`} />
                    {m.label} <span className="text-slate-400">{m.w}%</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Negotiation note */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Next move</p>
              <p className="mt-2 flex items-start gap-1.5 text-[11.5px] leading-snug text-slate-200">
                <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                Ask Northwind about a sign-on bonus
              </p>
            </div>
          </div>
        </Window>

        <Chip show={step === 3} className="-bottom-4 left-6">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Above the median
        </Chip>
      </Stage>
    </div>
  );
}
