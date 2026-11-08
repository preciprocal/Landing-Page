"use client";

/**
 * Hero illustration for /for/career-changers: the resume translator in the
 * product. Skills from a previous role (Teacher) connect, one drawn line at a
 * time, to the matching skills for the new role (Customer success), in a
 * different order so the lines cross like a real mapping. Below, the resume
 * line for the latest link is rewritten in the new role's language.
 * Steps: 0 nothing linked, 1..3 one more link each (3 is the finished state).
 * Names and numbers are fictional examples.
 */

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Chip, EASE, PulseDot, Stage, Window, useLoop } from "./Frame";

const FROM = ["Lesson planning", "Parent conferences", "Running a classroom"];
const TO = ["Stakeholder updates", "Onboarding plans", "Managing a project"];
// FROM[i] links to TO[MAP[i]]
const MAP = [1, 0, 2];

/** The resume line behind each FROM skill, before and after translation. */
const LINES = [
  { before: "Planned lessons for 4 classes each term", after: "Built onboarding plans for 4 customer groups a quarter" },
  { before: "Held conferences with 60 families a term", after: "Ran progress updates with 60 stakeholders a quarter" },
  { before: "Ran a classroom of 28 students", after: "Managed a 28-person program from kickoff to review" },
];

const ROW = 36; // h-9
const GAP = 10;
const H = FROM.length * ROW + (FROM.length - 1) * GAP;
const W = 64;
const cy = (i: number) => i * (ROW + GAP) + ROW / 2;

export default function CareerChangersVisual() {
  const { ref, step } = useLoop(FROM.length + 1, 1900);
  const line = LINES[Math.max(step - 1, 0)];
  const translated = step > 0;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/resume/translate" bodyClassName="p-5">
          <div className="grid grid-cols-[1fr_64px_1fr] items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Before</p>
              <p className="mt-0.5 text-[13px] font-semibold text-white">Teacher</p>
            </div>
            <div className="grid place-items-center pb-1 text-slate-400">
              <ArrowRight className="h-4 w-4" />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-soft">Next role</p>
              <p className="mt-0.5 text-[13px] font-semibold text-white">Customer success</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[1fr_64px_1fr]">
            <div className="flex flex-col" style={{ gap: GAP }}>
              {FROM.map((label, i) => {
                const on = i < step;
                return (
                  <div
                    key={label}
                    className={`flex h-9 items-center rounded-lg border px-3 text-[11.5px] font-medium transition-colors duration-500 ${
                      on ? "border-white/15 bg-white/[0.06] text-slate-100" : "border-white/[0.08] bg-white/[0.025] text-slate-300"
                    }`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="overflow-visible">
              {FROM.map((label, i) => {
                const y1 = cy(i);
                const y2 = cy(MAP[i]);
                return (
                  <g key={label}>
                    <path d={`M0 ${y1} C ${W / 2} ${y1}, ${W / 2} ${y2}, ${W} ${y2}`} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                    <motion.path
                      d={`M0 ${y1} C ${W / 2} ${y1}, ${W / 2} ${y2}, ${W} ${y2}`}
                      fill="none"
                      stroke="rgb(var(--accent))"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={false}
                      animate={{ pathLength: i < step ? 1 : 0, opacity: i < step ? 1 : 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                    />
                    <circle cx="0" cy={y1} r="2.5" fill={i < step ? "rgb(var(--accent))" : "rgba(255,255,255,0.2)"} />
                    <circle cx={W} cy={y2} r="2.5" fill={i < step ? "rgb(var(--accent))" : "rgba(255,255,255,0.2)"} />
                  </g>
                );
              })}
            </svg>

            <div className="flex flex-col" style={{ gap: GAP }}>
              {TO.map((label, j) => {
                const on = MAP.indexOf(j) < step;
                return (
                  <div
                    key={label}
                    className={`flex h-9 items-center justify-end rounded-lg border px-3 text-[11.5px] font-medium transition-colors duration-500 ${
                      on ? "border-accent/40 bg-accent/[0.1] text-accent-soft" : "border-dashed border-white/[0.14] text-slate-400"
                    }`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* The resume line, rewritten */}
          <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Resume line</p>
              <span className={`inline-flex items-center gap-1.5 text-[10.5px] font-medium ${translated ? "text-accent-soft" : "text-slate-400"}`}>
                {translated ? <Sparkles className="h-3 w-3" /> : <PulseDot className="scale-75" />}
                {translated ? `${step} of ${FROM.length} translated` : "Translating"}
              </span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-2 space-y-1"
              >
                <p className={`truncate text-[11.5px] text-slate-400 ${translated ? "line-through decoration-slate-500/70" : ""}`}>{line.before}</p>
                <p className={`truncate text-[12px] font-medium ${translated ? "text-white" : "text-slate-400"}`}>
                  {translated ? line.after : "Rewriting for customer success roles..."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Window>

        <Chip show={step === FROM.length} className="-bottom-4 right-8">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Same skill, new wording
        </Chip>
      </Stage>
    </div>
  );
}
