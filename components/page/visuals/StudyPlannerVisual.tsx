"use client";

/**
 * Hero illustration for /interview-study-planner: a three week calendar that
 * fills day by day with topic blocks, while a chip counts down to the onsite.
 * Steps: 0..4, a few more days planned each step.
 */

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { EASE, Stage, useLoop } from "./Frame";

type Topic = { label: string; tone: string };

const T: Record<string, Topic> = {
  arr: { label: "Arrays", tone: "border-accent/40 bg-accent/[0.16] text-accent-soft" },
  gr: { label: "Graphs", tone: "border-accent/40 bg-accent/[0.16] text-accent-soft" },
  dp: { label: "DP", tone: "border-accent/40 bg-accent/[0.16] text-accent-soft" },
  sd: { label: "Design", tone: "border-accent-2/40 bg-accent-2/[0.14] text-white" },
  beh: { label: "Stories", tone: "border-white/15 bg-white/[0.06] text-slate-300" },
  mock: { label: "Mock", tone: "border-accent/60 bg-accent-deep/40 text-white" },
  rest: { label: "Rest", tone: "border-white/[0.06] bg-transparent text-slate-500" },
};

const PLAN = [
  "arr", "arr", "sd", "gr", "beh", "mock", "rest",
  "gr", "dp", "sd", "dp", "beh", "mock", "rest",
  "dp", "sd", "beh", "arr", "sd", "mock", "rest",
];
const FILLED = [5, 9, 13, 17, 21];
const DAYS_LEFT = [18, 14, 10, 6, 3];
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function StudyPlannerVisual() {
  const { ref, step } = useLoop(5, 1300);
  const filled = FILLED[step];

  return (
    <div ref={ref}>
      <Stage>
        <div className="relative rounded-2xl border border-white/[0.09] bg-[#0a0f1c]/90 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/15 text-accent">
                <CalendarDays className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-white">Study plan</p>
                <p className="text-[10px] text-slate-500">Software Engineer · Northwind</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 text-[11px] font-medium text-slate-200">
              Onsite in
              <motion.span
                key={DAYS_LEFT[step]}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="font-mono font-semibold text-accent-soft"
              >
                {DAYS_LEFT[step]}
              </motion.span>
              days
            </div>
          </div>

          <div className="mt-5 grid grid-cols-7 gap-1.5">
            {WEEKDAYS.map((d, i) => (
              <span key={i} className="text-center text-[10px] font-medium text-slate-600">
                {d}
              </span>
            ))}
            {PLAN.map((key, i) => {
              const on = i < filled;
              const topic = T[key];
              return (
                <div key={i} className="relative h-12 rounded-lg border border-white/[0.05] bg-white/[0.015] p-1">
                  <span className="text-[9px] font-mono text-slate-600">{i + 1}</span>
                  <motion.div
                    initial={false}
                    animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.35, ease: EASE, delay: on ? (i % 4) * 0.06 : 0 }}
                    className={`absolute inset-x-1 bottom-1 truncate rounded-md border px-1 py-0.5 text-[9px] font-medium leading-tight ${topic.tone}`}
                  >
                    {topic.label}
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500">
            <span>Week 1 to 3</span>
            <span className="font-mono text-slate-400">
              {filled}/21 days planned
            </span>
          </div>
        </div>
      </Stage>
    </div>
  );
}
