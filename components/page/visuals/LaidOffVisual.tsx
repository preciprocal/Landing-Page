"use client";

/**
 * Hero illustration for /for/laid-off: the weekly progress view in the
 * product. Paired bars for applications and interviews grow week over week,
 * a running summary updates above the chart, and the user's next two steps
 * sit underneath. Encouraging, not flashy.
 * Steps: 0..4 reveal one more week each (4 is the finished state).
 * Names, companies and numbers are fictional examples.
 */

import { motion } from "framer-motion";
import { CalendarCheck, Mic, TrendingUp } from "lucide-react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

const WEEKS = [
  { apps: 4, interviews: 0 },
  { apps: 6, interviews: 1 },
  { apps: 8, interviews: 1 },
  { apps: 9, interviews: 2 },
  { apps: 10, interviews: 3 },
];
const MAX = 10;
const CHART_H = 104;

const NEXT = [
  { Icon: CalendarCheck, text: "Follow up with Priya Shah", when: "Thu" },
  { Icon: Mic, text: "Mock interview for Lumen", when: "Fri" },
];

export default function LaidOffVisual() {
  const { ref, step } = useLoop(WEEKS.length, 1700);
  const shown = WEEKS[step];
  const totalApps = WEEKS.slice(0, step + 1).reduce((s, w) => s + w.apps, 0);
  const totalInterviews = WEEKS.slice(0, step + 1).reduce((s, w) => s + w.interviews, 0);

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/progress" bodyClassName="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[13px] font-semibold text-white">Weekly momentum</p>
              <p className="text-[11px] text-slate-400">Week {step + 1} of your search</p>
            </div>
            <div className="flex gap-2">
              {[
                { k: "Applications", v: totalApps },
                { k: "Interviews", v: totalInterviews },
              ].map((s) => (
                <div key={s.k} className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-right">
                  <p className="text-[14px] font-bold leading-none tabular-nums text-white">{s.v}</p>
                  <p className="mt-1 text-[10px] text-slate-400">{s.k}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 pb-2.5 pt-3">
            <div className="flex items-center gap-4 text-[10.5px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-white/30" /> Applications {shown.apps}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-accent" /> Interviews {shown.interviews}
              </span>
            </div>
            <div className="relative mt-3" style={{ height: CHART_H + 20 }}>
              {[0.5, 1].map((f) => (
                <div key={f} className="absolute inset-x-0 border-t border-dashed border-white/[0.06]" style={{ top: CHART_H * (1 - f) }} />
              ))}
              <div className="absolute inset-x-0 border-t border-white/[0.1]" style={{ top: CHART_H }} />
              <div className="relative flex h-full justify-around">
                {WEEKS.map((w, i) => {
                  const on = i <= step;
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div className="flex items-end gap-1" style={{ height: CHART_H }}>
                        <motion.div
                          className="w-4 origin-bottom rounded-t-[4px] bg-white/25"
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
                      <span className={`mt-1.5 text-[10.5px] font-medium transition-colors duration-500 ${i === step ? "text-accent-soft" : "text-slate-400"}`}>
                        Week {i + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Next steps */}
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {NEXT.map(({ Icon, text, when }) => (
              <div key={text} className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.025] p-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Next · {when}</p>
                  <p className="truncate text-[11.5px] font-medium text-slate-200">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Window>

        <Chip show={step === WEEKS.length - 1} className="-bottom-4 right-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
            <TrendingUp className="h-3 w-3" />
          </span>
          Best week yet
        </Chip>
      </Stage>
    </div>
  );
}
