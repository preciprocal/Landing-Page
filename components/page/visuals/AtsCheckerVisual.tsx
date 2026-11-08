"use client";

/**
 * Hero illustration for /free-ats-checker: the checker as it appears in the
 * app. A real resume on the left is swept by a scanning line while the report
 * panel on the right checks off five dimensions, each with its own score, and
 * a ring fills to the overall score. A chip then offers the top fixes.
 * Steps: 0 scanning, 1..3 dimensions checking off, 4 scored (finished state).
 * Names, scores and counts are fictional examples.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Check, ScanSearch, Sparkles } from "lucide-react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

const DIMENSIONS = [
  { k: "ATS compatibility", v: 91 },
  { k: "Content and impact", v: 76 },
  { k: "Skills match", v: 84 },
  { k: "Structure", v: 88 },
  { k: "Tone and style", v: 72 },
];
const SCORE = 82; // fictional example
const R = 30;
const C = 2 * Math.PI * R;

const SECTIONS = [
  {
    heading: "Experience",
    sub: "Data Analyst Intern, Lumen · 2025",
    bullets: [
      "Built a Tableau dashboard tracking churn for 40k accounts",
      "Automated weekly reporting in Python, saving 6 hours a week",
    ],
  },
  {
    heading: "Skills",
    sub: null,
    bullets: ["SQL, Python (pandas), Tableau, Excel, A/B testing"],
  },
  {
    heading: "Education",
    sub: "B.S. Statistics, Halcyon University · 2026",
    bullets: [],
  },
];

export default function AtsCheckerVisual() {
  const { ref, step, reduce } = useLoop(5, 1300);
  const scored = step === 4;
  // dimensions checked so far: two more per step, all five once scored
  const checked = scored ? DIMENSIONS.length : Math.min(step * 2, DIMENSIONS.length);

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/ats-checker" bodyClassName="grid grid-cols-[minmax(0,1fr)_178px]">
          {/* Resume being scanned */}
          <div className="relative overflow-hidden border-r border-white/[0.06] p-5">
            <p className="text-[15px] font-bold tracking-tight text-white">Jordan Lee</p>
            <p className="mt-0.5 text-[10.5px] text-slate-400">
              Data Analyst · <span className="font-mono">jordan.lee@example.com</span>
            </p>

            {SECTIONS.map((s, i) => (
              <div key={s.heading} className="mt-3.5">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-soft/90">{s.heading}</p>
                  <span className="h-px flex-1 bg-white/[0.07]" />
                  <span
                    className={`grid h-4 w-4 place-items-center rounded-full transition-colors duration-500 ${
                      i < step || scored ? "bg-accent/20 text-accent" : "bg-white/[0.05] text-transparent"
                    }`}
                  >
                    <Check className="h-2.5 w-2.5" />
                  </span>
                </div>
                {s.sub && <p className="mt-1.5 text-[11px] font-semibold text-slate-200">{s.sub}</p>}
                <ul className="mt-1 space-y-1">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-[10.5px] leading-snug text-slate-300">
                      <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Scanning line */}
            {!reduce && !scored && (
              <motion.div
                className="pointer-events-none absolute inset-x-0 h-12"
                initial={{ top: "-15%" }}
                animate={{ top: "105%" }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              >
                <div className="h-full bg-gradient-to-b from-transparent to-accent/[0.12]" />
                <div className="h-px bg-accent shadow-[0_0_12px_rgb(var(--accent))]" />
              </motion.div>
            )}
          </div>

          {/* Report panel */}
          <div className="bg-black/[0.15] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">ATS report</p>
            <div className="mt-2.5 flex items-center gap-3">
              <div className="relative h-[68px] w-[68px] shrink-0">
                <svg viewBox="0 0 68 68" className="h-full w-full -rotate-90">
                  <circle cx="34" cy="34" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                  <motion.circle
                    cx="34"
                    cy="34"
                    r={R}
                    fill="none"
                    stroke="rgb(var(--accent))"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={C}
                    initial={false}
                    animate={{ strokeDashoffset: scored ? C * (1 - SCORE / 100) : C * (1 - (checked / DIMENSIONS.length) * 0.4) }}
                    transition={{ duration: 0.9, ease: EASE }}
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={scored ? "score" : "wait"}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className={scored ? "text-xl font-bold text-white" : "text-accent"}
                    >
                      {scored ? SCORE : <ScanSearch className="h-5 w-5" />}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-white">{scored ? "Strong" : "Scanning"}</p>
                <p className="text-[10.5px] leading-snug text-slate-400">{scored ? "3 quick fixes" : "Reading sections"}</p>
              </div>
            </div>

            <ul className="mt-3.5 space-y-2">
              {DIMENSIONS.map((d, i) => {
                const on = i < checked;
                return (
                  <li key={d.k}>
                    <div className="flex items-center gap-1.5 text-[10.5px]">
                      <span
                        className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full transition-colors duration-500 ${
                          on ? "bg-accent/25 text-accent" : "border border-white/15 text-transparent"
                        }`}
                      >
                        <Check className="h-2 w-2" />
                      </span>
                      <span className={`flex-1 truncate transition-colors duration-500 ${on ? "text-slate-200" : "text-slate-400"}`}>{d.k}</span>
                      <span className={`font-semibold transition-colors duration-500 ${on ? "text-white" : "text-slate-500"}`}>{on ? d.v : "..."}</span>
                    </div>
                    <div className="ml-5 mt-1 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
                        initial={false}
                        animate={{ width: on ? `${d.v}%` : "0%" }}
                        transition={{ duration: 0.7, ease: EASE }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Window>

        <Chip show={scored} className="-bottom-5 left-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Sparkles className="h-3 w-3" />
          </span>
          3 top fixes ready
        </Chip>
      </Stage>
    </div>
  );
}
