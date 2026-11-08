"use client";

/**
 * Hero illustration for /resume-tailoring: the tailoring screen. The job post
 * on the left, the resume on the right, a keyword match bar across the top.
 * Each step one keyword lights up in the posting, the matching resume bullet
 * picks it up (highlighted in place), and the match score climbs.
 * Steps: 0..3, one more keyword matched each step.
 * Names, companies and numbers are fictional examples.
 */

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { EASE, Stage, Window, useLoop } from "./Frame";

const KEYWORDS = ["TypeScript", "Design systems", "A/B testing", "Accessibility"];
const SCORES = [58, 71, 83, 92];

/** Resume bullets, each with the keyword it picks up. */
const BULLETS: { before: string; kw: string; after: string }[] = [
  { before: "Migrated the storefront to ", kw: "TypeScript", after: ", cutting runtime errors 30%." },
  { before: "Built shared ", kw: "design systems", after: " components for 4 teams." },
  { before: "Ran ", kw: "A/B testing", after: " on checkout, lifting conversion 9%." },
  { before: "Led ", kw: "accessibility", after: " fixes to reach WCAG AA on all pages." },
];

export default function ResumeTailoringVisual() {
  const { ref, step } = useLoop(4, 1500);
  const score = SCORES[step];

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/tailor" bodyClassName="p-4">
          {/* Match score bar */}
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2.5">
            <div className="shrink-0">
              <p className="text-[11.5px] font-semibold text-white">Keyword match</p>
              <p className="text-[10.5px] text-slate-400">{step + 1} of 4 keywords added</p>
            </div>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
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
              className="w-10 text-right text-[15px] font-bold text-accent-soft"
            >
              {score}%
            </motion.span>
          </div>

          <div className="mt-3 grid grid-cols-[0.85fr_1.15fr] gap-3">
            {/* Job description */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Job post</p>
              <p className="mt-1.5 text-[12.5px] font-semibold text-white">Frontend Engineer</p>
              <p className="text-[10.5px] text-slate-400">Northwind · Remote</p>
              <p className="mt-2.5 text-[10.5px] leading-snug text-slate-300">
                You will build fast, inclusive interfaces for millions of shoppers.
              </p>
              <p className="mt-2.5 text-[10.5px] font-medium text-slate-400">What we look for</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {KEYWORDS.map((k, i) => {
                  const on = i <= step;
                  return (
                    <motion.span
                      key={k}
                      initial={false}
                      animate={{
                        backgroundColor: on ? "rgb(var(--accent) / 0.16)" : "rgba(255,255,255,0.04)",
                        borderColor: on ? "rgb(var(--accent) / 0.45)" : "rgba(255,255,255,0.1)",
                      }}
                      transition={{ duration: 0.4 }}
                      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10.5px] font-medium transition-colors duration-300 ${on ? "text-accent-soft" : "text-slate-300"}`}
                    >
                      {on && <Check className="h-2.5 w-2.5" />}
                      {k}
                    </motion.span>
                  );
                })}
              </div>
            </div>

            {/* Resume */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[12.5px] font-semibold text-white">Jordan Lee</p>
                <p className="font-mono text-[10px] text-slate-500">resume.pdf</p>
              </div>
              <p className="text-[10.5px] text-slate-400">Frontend Engineer, Lumen · 2023 - Present</p>
              <ul className="mt-2.5 space-y-2">
                {BULLETS.map((b, i) => {
                  const on = i <= step;
                  return (
                    <li key={b.kw} className="flex items-start gap-2 text-[10.5px] leading-snug text-slate-300">
                      <span className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${on ? "bg-accent" : "bg-slate-500"}`} />
                      <span>
                        {b.before}
                        <motion.span
                          initial={false}
                          animate={{
                            backgroundColor: on ? "rgb(var(--accent) / 0.2)" : "rgb(var(--accent) / 0)",
                            color: on ? "rgb(var(--accent-soft))" : "rgb(203 213 225)",
                          }}
                          transition={{ duration: 0.45, delay: on ? 0.25 : 0 }}
                          className="rounded px-0.5 font-medium"
                        >
                          {b.kw}
                        </motion.span>
                        {b.after}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2.5 border-t border-white/[0.06] pt-2 text-[10.5px] text-slate-400">
                <span className="font-medium text-slate-300">Skills:</span> React, Jest, Figma, GraphQL
              </p>
            </div>
          </div>
        </Window>
      </Stage>
    </div>
  );
}
