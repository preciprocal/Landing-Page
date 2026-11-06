"use client";

/**
 * Hero illustration for /linkedin-profile-optimizer: a profile card whose
 * sections tick to done one by one while the profile score fills, with a
 * floating card showing more recruiter searches matched as it rises.
 * Steps: 0..3, one more section done each step.
 */

import { motion } from "framer-motion";
import { Check, Search, TrendingUp } from "lucide-react";
import { Chip, EASE, Line, Stage, useLoop } from "./Frame";

const SECTIONS = ["Headline", "About", "Experience", "Skills"];
const SCORE = [42, 61, 80, 94];
const MATCHED = [3, 6, 9, 11];

export default function LinkedInProfileVisual() {
  const { ref, step } = useLoop(4, 1600);

  return (
    <div ref={ref}>
      <Stage className="pr-10">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0f1c]/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
          {/* Banner and avatar */}
          <div className="h-20 bg-gradient-to-r from-accent-deep/35 via-accent-deep-2/20 to-transparent" />
          <div className="px-5 pb-5">
            <div className="-mt-8 grid h-16 w-16 place-items-center rounded-full border-4 border-[#0a0f1c] bg-gradient-to-br from-accent-deep/60 to-accent-deep-2/50 text-lg font-bold text-white">
              JL
            </div>
            <p className="mt-3 text-sm font-semibold text-white">Jordan Lee</p>
            <div className="mt-2 h-2 w-3/4 rounded-full bg-accent/30" />
            <Line w="w-1/2" className="mt-2" />

            {/* Strength meter */}
            <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-300">Profile score</span>
                <span className="font-mono text-accent-soft">{SCORE[step]}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
                  initial={false}
                  animate={{ width: `${SCORE[step]}%` }}
                  transition={{ duration: 0.7, ease: EASE }}
                />
              </div>
            </div>

            {/* Section checklist */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {SECTIONS.map((s, i) => {
                const done = i <= step;
                return (
                  <div
                    key={s}
                    className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[11px] transition-colors duration-300 ${
                      done ? "border-accent/30 bg-accent/[0.07] text-slate-200" : "border-white/[0.06] text-slate-500"
                    }`}
                  >
                    <motion.span
                      initial={false}
                      animate={done ? { scale: [0.6, 1.1, 1] } : { scale: 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className={`grid h-4 w-4 place-items-center rounded-full ${done ? "bg-accent/25 text-accent" : "bg-white/[0.06] text-transparent"}`}
                    >
                      <Check className="h-2.5 w-2.5" />
                    </motion.span>
                    {s}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating search appearances card */}
        <motion.div
          initial={false}
          animate={{ y: -step * 10 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="absolute -right-2 top-24 w-44rounded-xl border border-white/10 bg-[#0d1322]/95 p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            <Search className="h-3 w-3" />
            Recruiter searches
          </div>
          <div className="mt-2 flex items-end gap-2">
            <motion.span
              key={MATCHED[step]}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-mono text-2xl font-semibold text-white"
            >
              {MATCHED[step]}
            </motion.span>
            <span className="mb-1 text-[11px] text-slate-400">of 12 matched</span>
            <TrendingUp className="mb-1.5 ml-auto h-4 w-4 text-accent" />
          </div>
          <div className="mt-2 flex h-8 items-end gap-1">
            {[30, 38, 34, 50, 62, 78, 100].map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-sm bg-accent/40"
                initial={false}
                animate={{ height: `${Math.max(12, h * (0.4 + step * 0.2))}%` }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.03 }}
              />
            ))}
          </div>
        </motion.div>

        <Chip show={step === 3} className="-bottom-4 left-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Check className="h-3 w-3" />
          </span>
          All sections complete
        </Chip>
      </Stage>
    </div>
  );
}
