"use client";

/**
 * Hero illustration for /for/career-changers: skill translation. Chips from a
 * previous role on the left connect, one drawn line at a time, to the matching
 * chips for the new role on the right (in a different order, so the lines
 * cross like a real mapping).
 * Steps: 0 nothing linked, 1..3 one more link each (3 is the finished state).
 */

import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { Chip, EASE, Stage, useLoop } from "./Frame";

const FROM = ["Lesson planning", "Parent conferences", "Running a classroom"];
const TO = ["Stakeholder updates", "Onboarding plans", "Managing a project"];
// FROM[i] links to TO[MAP[i]]
const MAP = [1, 0, 2];

const ROW = 40; // h-10
const GAP = 14;
const H = FROM.length * ROW + (FROM.length - 1) * GAP;
const W = 64;
const cy = (i: number) => i * (ROW + GAP) + ROW / 2;

export default function CareerChangersVisual() {
  const { ref, step } = useLoop(FROM.length + 1, 1500);

  return (
    <div ref={ref}>
      <Stage>
        <div className="relative rounded-2xl border border-white/[0.09] bg-[#0a0f1c]/90 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          <div className="grid grid-cols-[1fr_64px_1fr] items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Before</p>
              <p className="mt-1 text-sm font-semibold text-white">Teacher</p>
            </div>
            <div className="grid place-items-center pb-0.5 text-slate-600">
              <ArrowLeftRight className="h-4 w-4" />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-soft">Next</p>
              <p className="mt-1 text-sm font-semibold text-white">Customer success</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-[1fr_64px_1fr]">
            <div className="flex flex-col" style={{ gap: GAP }}>
              {FROM.map((label, i) => {
                const on = i < step;
                return (
                  <div
                    key={label}
                    className={`flex h-10 items-center rounded-lg border px-3 text-[11px] font-medium transition-colors duration-500 ${
                      on ? "border-white/15 bg-white/[0.05] text-slate-200" : "border-white/[0.07] bg-white/[0.02] text-slate-500"
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
                    <path d={`M0 ${y1} C ${W / 2} ${y1}, ${W / 2} ${y2}, ${W} ${y2}`} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
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
                    <circle cx="0" cy={y1} r="2.5" fill={i < step ? "rgb(var(--accent))" : "rgba(255,255,255,0.15)"} />
                    <circle cx={W} cy={y2} r="2.5" fill={i < step ? "rgb(var(--accent))" : "rgba(255,255,255,0.15)"} />
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
                    className={`flex h-10 items-center justify-end rounded-lg border px-3 text-[11px] font-medium transition-colors duration-500 ${
                      on ? "border-accent/40 bg-accent/[0.1] text-accent-soft" : "border-dashed border-white/[0.09] text-slate-600"
                    }`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-accent-deep to-accent"
                initial={false}
                animate={{ scaleX: step / FROM.length }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              {step}/{FROM.length} translated
            </span>
          </div>
        </div>

        <Chip show={step === FROM.length} className="-bottom-5 right-8">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Same skill, new wording
        </Chip>
      </Stage>
    </div>
  );
}
