"use client";

/**
 * Hero illustration for /salary-guide: a pay range bar whose percentile ticks
 * draw in, the typical band fills, and a marker lands on it, with a pay mix
 * below. Purely illustrative: no figures, no data.
 * Steps: 0 axis, 1 ticks, 2 band, 3 marker. Reduced motion holds step 3.
 */

import { motion } from "framer-motion";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

const TICKS = [
  { at: 8, label: "P10" },
  { at: 28, label: "P25" },
  { at: 50, label: "Median" },
  { at: 72, label: "P75" },
  { at: 92, label: "P90" },
];

const MIX = [
  { label: "Base", w: 62 },
  { label: "Bonus", w: 14 },
  { label: "Equity", w: 24 },
];

export default function SalaryGuideVisual() {
  const { ref, step } = useLoop(4, 1700);

  return (
    <div ref={ref}>
      <Stage>
        <Window title="Pay range · Level II · illustrative" bodyClassName="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">Data Analyst</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Total compensation, by percentile</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-slate-400">Example only</span>
          </div>

          {/* The range */}
          <div className="relative mt-12 px-1">
            {/* Marker */}
            <motion.div
              className="absolute -top-9 z-10 -translate-x-1/2"
              initial={false}
              animate={{ left: step >= 3 ? "64%" : "50%", opacity: step >= 3 ? 1 : 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-bold text-[#0a0f1c] shadow-[0_6px_20px_-4px_rgb(var(--accent)/0.6)]">Your offer</div>
              <div className="mx-auto h-0 w-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-accent" />
            </motion.div>

            <div className="relative h-3 rounded-full bg-white/[0.06]">
              <motion.div
                className="absolute inset-y-0 origin-left rounded-full bg-gradient-to-r from-accent-deep/70 via-accent to-accent-2/80"
                style={{ left: "28%", width: "44%" }}
                initial={false}
                animate={{ scaleX: step >= 2 ? 1 : 0, opacity: step >= 2 ? 1 : 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </div>

            {/* Percentile ticks */}
            <div className="relative h-10">
              {TICKS.map((t, i) => (
                <motion.div
                  key={t.label}
                  className="absolute top-0 flex flex-col items-center"
                  style={{ left: `${t.at}%` }}
                  initial={false}
                  animate={{ x: "-50%", opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : -4 }}
                  transition={{ duration: 0.4, ease: EASE, delay: step === 1 ? i * 0.08 : 0 }}
                >
                  <span className={`h-2.5 w-px ${t.label === "Median" ? "bg-accent" : "bg-white/25"}`} />
                  <span className={`mt-1.5 font-mono text-[10px] ${t.label === "Median" ? "text-accent-soft" : "text-slate-500"}`}>{t.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pay mix */}
          <div className="mt-5 border-t border-white/[0.06] pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Pay mix</p>
            <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-white/[0.05]">
              {MIX.map((m, i) => (
                <motion.span
                  key={m.label}
                  className={`h-full ${["bg-accent", "bg-accent-2/70", "bg-accent-deep/50"][i]}`}
                  initial={false}
                  animate={{ width: step >= 2 ? `${m.w}%` : "0%" }}
                  transition={{ duration: 0.6, ease: EASE, delay: step === 2 ? i * 0.1 : 0 }}
                />
              ))}
            </div>
            <div className="mt-3 flex gap-5 text-[11px] text-slate-400">
              {MIX.map((m, i) => (
                <span key={m.label} className="inline-flex items-center gap-1.5">
                  <span className={`h-1.5 w-3 rounded-full ${["bg-accent", "bg-accent-2/70", "bg-accent-deep/50"][i]}`} />
                  {m.label}
                </span>
              ))}
            </div>
          </div>
        </Window>

        <Chip show={step === 3} className="-bottom-5 -left-4">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Above the median
        </Chip>
      </Stage>
    </div>
  );
}
