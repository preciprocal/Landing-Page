"use client";

/**
 * Hero illustration for /resume-tailoring: a job description on the left, the
 * resume on the right. Each step one keyword lights up in the posting, the
 * matching resume bullet picks it up, and the match score climbs.
 * Steps: 0..3, one more keyword matched each step.
 */

import { motion } from "framer-motion";
import { EASE, Line, Stage, useLoop } from "./Frame";

const KEYWORDS = ["TypeScript", "Design systems", "A/B testing", "Accessibility"];
const SCORES = [58, 71, 83, 92];
const BULLETS = ["w-11/12", "w-10/12", "w-full", "w-9/12"];

export default function ResumeTailoringVisual() {
  const { ref, step } = useLoop(4, 1500);
  const score = SCORES[step];

  return (
    <div ref={ref}>
      <Stage>
        {/* Match score bar across the top */}
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#0a0f1c]/90 px-4 py-3 backdrop-blur">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Keyword match</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
              initial={false}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.7, ease: EASE }}
            />
          </div>
          <motion.span
            key={score}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="w-9 text-right font-mono text-sm font-semibold text-accent-soft"
          >
            {score}%
          </motion.span>
        </div>

        <div className="grid grid-cols-[0.9fr_1.1fr] gap-3">
          {/* Job description */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0f1c]/90 p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Job description</p>
            <p className="mt-2 text-[12px] font-semibold text-white">Frontend Engineer</p>
            <p className="text-[10px] text-slate-500">Northwind</p>
            <div className="mt-4 space-y-2">
              <Line w="w-full" />
              <Line w="w-4/5" />
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {KEYWORDS.map((k, i) => {
                const on = i <= step;
                return (
                  <motion.span
                    key={k}
                    initial={false}
                    animate={{
                      backgroundColor: on ? "rgb(var(--accent) / 0.16)" : "rgba(255,255,255,0.03)",
                      borderColor: on ? "rgb(var(--accent) / 0.45)" : "rgba(255,255,255,0.08)",
                    }}
                    transition={{ duration: 0.4 }}
                    className={`rounded-md border px-1.5 py-1 text-[10px] font-medium transition-colors duration-300 ${on ? "text-accent-soft" : "text-slate-500"}`}
                  >
                    {k}
                  </motion.span>
                );
              })}
            </div>
            <div className="mt-4 space-y-2">
              <Line w="w-11/12" />
              <Line w="w-2/3" />
            </div>
          </div>

          {/* Resume */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0f1c]/90 p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Your resume</p>
            <p className="mt-2 text-[12px] font-semibold text-white">Jordan Lee</p>
            <Line w="w-1/2" className="mt-2" />
            <div className="mt-4 space-y-3">
              {BULLETS.map((w, i) => {
                const on = i <= step;
                return (
                  <div key={i} className="flex items-start gap-2">
                    <span className={`mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${on ? "bg-accent" : "bg-white/15"}`} />
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <motion.div
                        className={`h-2 rounded-full ${w}`}
                        initial={false}
                        animate={{ backgroundColor: on ? "rgb(var(--accent) / 0.26)" : "rgba(255,255,255,0.07)" }}
                        transition={{ duration: 0.45, delay: on ? 0.25 : 0 }}
                      />
                      <motion.span
                        initial={false}
                        animate={on ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                        transition={{ duration: 0.4, delay: on ? 0.35 : 0, ease: EASE }}
                        className="inline-block rounded bg-accent/10 px-1.5 py-0.5 text-[9px] font-medium text-accent-soft"
                      >
                        + {KEYWORDS[i]}
                      </motion.span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Stage>
    </div>
  );
}
