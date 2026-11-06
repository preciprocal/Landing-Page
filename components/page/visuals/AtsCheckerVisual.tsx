"use client";

/**
 * Hero illustration for /free-ats-checker: a preview of the result. A resume
 * sheet is swept by a scanning line, the five dimensions check off one by one,
 * and a score ring fills to its value.
 * Steps: 0 scanning, 1..3 dimensions checking off, 4 scored (finished state).
 */

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Chip, EASE, Line, Stage, useLoop } from "./Frame";

const DIMENSIONS = ["ATS compatibility", "Content and impact", "Skills", "Structure", "Tone and style"];
const SCORE = 82; // fictional example
const R = 34;
const C = 2 * Math.PI * R;

export default function AtsCheckerVisual() {
  const { ref, step, reduce } = useLoop(5, 1300);
  const scored = step === 4;
  // dimensions checked so far: two more per step, all five once scored
  const checked = scored ? DIMENSIONS.length : Math.min(step * 2, DIMENSIONS.length);

  return (
    <div ref={ref}>
      <Stage>
        <div className="relative pr-20">
          {/* Resume sheet */}
          <div className="relative overflow-hidden rounded-xl border border-white/[0.1] bg-gradient-to-b from-[#111829] to-[#0b1120] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <p className="text-sm font-semibold text-white">Jordan Lee</p>
            <p className="text-[10px] text-slate-500">Data Analyst · jordan.lee@example.com</p>

            {["Experience", "Skills", "Education"].map((heading, s) => (
              <div key={heading} className="mt-5">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{heading}</p>
                  <span className="h-px flex-1 bg-white/[0.06]" />
                  <span
                    className={`grid h-4 w-4 place-items-center rounded-full transition-colors duration-500 ${
                      s < step || scored ? "bg-accent/20 text-accent" : "bg-white/[0.04] text-transparent"
                    }`}
                  >
                    <Check className="h-2.5 w-2.5" />
                  </span>
                </div>
                <div className="mt-2.5 space-y-2">
                  <Line w="w-full" />
                  <Line w={s === 1 ? "w-2/3" : "w-10/12"} />
                  {s === 0 && <Line w="w-9/12" />}
                </div>
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

          {/* Result card: score ring and dimensions */}
          <div className="absolute -right-2 top-10 w-48 rounded-xl border border-white/10 bg-[#0d1322]/95 p-4 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] backdrop-blur">
            <div className="relative mx-auto h-[84px] w-[84px]">
              <svg viewBox="0 0 84 84" className="h-full w-full -rotate-90">
                <circle cx="42" cy="42" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
                <motion.circle
                  cx="42"
                  cy="42"
                  r={R}
                  fill="none"
                  stroke="rgb(var(--accent))"
                  strokeWidth="6"
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
                    className={scored ? "text-xl font-bold text-white" : "font-mono text-[11px] text-slate-500"}
                  >
                    {scored ? SCORE : "scanning"}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5">
              {DIMENSIONS.map((d, i) => {
                const on = i < checked;
                return (
                  <li key={d} className="flex items-center gap-2 text-[10.5px]">
                    <span
                      className={`grid h-3.5 w-3.5 flex-shrink-0 place-items-center rounded-full transition-colors duration-500 ${
                        on ? "bg-accent/25 text-accent" : "border border-white/10 text-transparent"
                      }`}
                    >
                      <Check className="h-2 w-2" />
                    </span>
                    <span className={`transition-colors duration-500 ${on ? "text-slate-200" : "text-slate-600"}`}>{d}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <Chip show={scored} className="-bottom-5 left-6">
          <span className="font-mono text-[11px] text-accent-soft">3</span>
          top fixes ready
        </Chip>
      </Stage>
    </div>
  );
}
