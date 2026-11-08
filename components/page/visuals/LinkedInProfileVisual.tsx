"use client";

/**
 * Hero illustration for /linkedin-profile-optimizer: a profile card with a
 * real headline and location, whose sections tick to done one by one while
 * the profile score fills, and a floating card showing more recruiter
 * searches matched as it rises.
 * Steps: 0..3, one more section done each step.
 * The person, scores and counts are fictional examples.
 */

import { motion } from "framer-motion";
import { Check, MapPin, Search, TrendingUp } from "lucide-react";
import { Chip, EASE, SURFACE, Stage, useLoop } from "./Frame";

const SECTIONS = [
  { k: "Headline", done: "Role and 3 keywords" },
  { k: "About", done: "Rewritten, 3 short paragraphs" },
  { k: "Experience", done: "Results added to 4 roles" },
  { k: "Skills", done: "Top 5 match target roles" },
];
const SCORE = [42, 61, 80, 94];
const MATCHED = [3, 6, 9, 11];

export default function LinkedInProfileVisual() {
  const { ref, step } = useLoop(4, 1600);

  return (
    <div ref={ref}>
      <Stage>
        <div className={`relative overflow-hidden ${SURFACE}`}>
          {/* Banner and avatar */}
          <div className="h-20 bg-gradient-to-r from-accent-deep/45 via-accent/15 to-transparent" />
          <div className="px-5 pb-5">
            <div className="-mt-8 grid h-16 w-16 place-items-center rounded-full border-4 border-[#101727] bg-gradient-to-br from-accent-deep to-accent text-lg font-bold text-white">
              JL
            </div>
            <div className="mt-2.5 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-white">Jordan Lee</p>
                <p className="mt-0.5 text-[12px] text-slate-200">Frontend Engineer | React, TypeScript, design systems</p>
                <p className="mt-1 inline-flex items-center gap-1 text-[10.5px] text-slate-400">
                  <MapPin className="h-3 w-3" /> Seattle, WA · Open to work
                </p>
              </div>
            </div>

            {/* Strength meter */}
            <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
              <div className="flex items-center justify-between text-[11.5px]">
                <span className="font-semibold text-slate-200">Profile score</span>
                <span className="font-bold text-accent-soft">{SCORE[step]} / 100</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
                  initial={false}
                  animate={{ width: `${SCORE[step]}%` }}
                  transition={{ duration: 0.7, ease: EASE }}
                />
              </div>
            </div>

            {/* Section checklist */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              {SECTIONS.map((s, i) => {
                const done = i <= step;
                return (
                  <div
                    key={s.k}
                    className={`flex items-start gap-2 rounded-lg border px-2.5 py-2 transition-colors duration-300 ${
                      done ? "border-accent/30 bg-accent/[0.07]" : "border-white/[0.07] bg-white/[0.015]"
                    }`}
                  >
                    <motion.span
                      initial={false}
                      animate={done ? { scale: [0.6, 1.1, 1] } : { scale: 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className={`mt-px grid h-4 w-4 shrink-0 place-items-center rounded-full ${done ? "bg-accent/25 text-accent" : "border border-white/15 text-transparent"}`}
                    >
                      <Check className="h-2.5 w-2.5" />
                    </motion.span>
                    <div className="min-w-0">
                      <p className="text-[11.5px] font-semibold text-slate-100">{s.k}</p>
                      <p className={`truncate text-[10.5px] ${done ? "text-slate-300" : "text-slate-400"}`}>{done ? s.done : "Suggestions ready"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating search appearances card, over the banner */}
        <motion.div
          initial={false}
          animate={{ y: -step * 4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="absolute -right-3 top-5 z-10 w-48 rounded-xl border border-white/[0.14] bg-gradient-to-b from-[#161d30]/95 to-[#0e1424]/95 p-3 shadow-[0_24px_50px_-14px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            <Search className="h-3 w-3" />
            Recruiter searches
          </div>
          <div className="mt-1.5 flex items-end gap-2">
            <motion.span
              key={MATCHED[step]}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-2xl font-bold text-white"
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
                className="flex-1 rounded-sm bg-gradient-to-t from-accent-deep/70 to-accent/70"
                initial={false}
                animate={{ height: `${Math.max(12, h * (0.4 + step * 0.2))}%` }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.03 }}
              />
            ))}
          </div>
        </motion.div>

        <Chip show={step === 3} className="-bottom-5 left-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Check className="h-3 w-3" />
          </span>
          All sections complete
        </Chip>
      </Stage>
    </div>
  );
}
