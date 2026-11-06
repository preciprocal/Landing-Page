"use client";

/**
 * Hero illustration for /for/laid-off: a calm weekly momentum chart. Paired
 * bars for applications and interviews grow week over week, and a "next step"
 * card sits underneath. Encouraging, not flashy.
 * Steps: 0..4 reveal one more week each (4 is the finished state).
 */

import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { EASE, Stage, useLoop } from "./Frame";

// Fictional numbers for one person's search.
const WEEKS = [
  { apps: 4, interviews: 0 },
  { apps: 6, interviews: 1 },
  { apps: 8, interviews: 1 },
  { apps: 9, interviews: 2 },
  { apps: 10, interviews: 3 },
];
const MAX = 10;
const CHART_H = 132;

export default function LaidOffVisual() {
  const { ref, step } = useLoop(WEEKS.length, 1500);
  const shown = WEEKS[step];

  return (
    <div ref={ref}>
      <Stage>
        <div className="relative rounded-2xl border border-white/[0.09] bg-[#0a0f1c]/90 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Weekly momentum</p>
              <p className="mt-1 text-sm font-semibold text-white">Week {step + 1}</p>
            </div>
            <div className="flex gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-white/25" /> Applications <span className="font-mono text-slate-200">{shown.apps}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-accent" /> Interviews <span className="font-mono text-slate-200">{shown.interviews}</span>
              </span>
            </div>
          </div>

          {/* Chart */}
          <div className="relative mt-6" style={{ height: CHART_H + 22 }}>
            {[0.5, 1].map((f) => (
              <div key={f} className="absolute inset-x-0 border-t border-dashed border-white/[0.05]" style={{ top: CHART_H * (1 - f) }} />
            ))}
            <div className="absolute inset-x-0 border-t border-white/[0.08]" style={{ top: CHART_H }} />
            <div className="relative flex h-full justify-around">
              {WEEKS.map((w, i) => {
                const on = i <= step;
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="flex items-end gap-1" style={{ height: CHART_H }}>
                      <motion.div
                        className="w-4 origin-bottom rounded-t-[4px] bg-white/20"
                        style={{ height: (w.apps / MAX) * CHART_H }}
                        initial={false}
                        animate={{ scaleY: on ? 1 : 0, opacity: on ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                      />
                      <motion.div
                        className="w-4 origin-bottom rounded-t-[4px] bg-gradient-to-t from-accent-deep to-accent"
                        style={{ height: Math.max(w.interviews, 0.15) * (CHART_H / MAX) }}
                        initial={false}
                        animate={{ scaleY: on ? 1 : 0, opacity: on && w.interviews > 0 ? 1 : 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                      />
                    </div>
                    <span className={`mt-2 font-mono text-[10px] transition-colors duration-500 ${i === step ? "text-accent-soft" : "text-slate-600"}`}>
                      W{i + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next step */}
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
            <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
              <CalendarCheck className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Next step</p>
              <p className="truncate text-[12px] font-medium text-slate-200">Follow up with the Northwind recruiter · Thu</p>
            </div>
          </div>
        </div>
      </Stage>
    </div>
  );
}
