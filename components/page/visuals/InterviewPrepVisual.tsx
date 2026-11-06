"use client";

/**
 * Hero illustration for /interview-prep: a fictional company's interview
 * loop as a pipeline (recruiter screen, technical, onsite, offer) with a
 * marker advancing stage by stage and the prep focus for the current stage.
 * Steps: 0..3, the stage in progress. Reduced motion holds the offer stage.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Check, Flag } from "lucide-react";
import { Chip, EASE, Line, Stage, Window, useLoop } from "./Frame";

const STAGES = [
  { name: "Recruiter screen", meta: "30 min · phone", focus: "Story, motivation, logistics" },
  { name: "Technical", meta: "60 min · video", focus: "Problem solving, think aloud" },
  { name: "Onsite loop", meta: "4 rounds", focus: "Depth, behavioural, team fit" },
  { name: "Offer", meta: "Final step", focus: "Questions, timeline, next steps" },
];

export default function InterviewPrepVisual() {
  const { ref, step } = useLoop(4, 1800);

  return (
    <div ref={ref}>
      <Stage>
        <Window title="Northwind · Interview loop">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-accent-deep/40 to-accent-deep-2/30 text-sm font-bold text-white">N</div>
            <div>
              <p className="text-sm font-semibold text-white">Product Analyst</p>
              <p className="text-[11px] text-slate-500">Northwind · Hybrid</p>
            </div>
          </div>

          <ol className="relative mt-6">
            {/* Rail and its accent fill, drawn behind the stage dots */}
            <span aria-hidden="true" className="absolute bottom-[30px] left-[11px] top-[30px] w-px bg-white/[0.08]" />
            <motion.span
              aria-hidden="true"
              className="absolute left-[11px] top-[30px] w-px origin-top bg-gradient-to-b from-accent to-accent-2"
              style={{ height: "calc(100% - 60px)" }}
              initial={false}
              animate={{ scaleY: step / (STAGES.length - 1) }}
              transition={{ duration: 0.7, ease: EASE }}
            />
            {STAGES.map((s, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={s.name} className="relative flex items-center gap-4 py-2.5">
                  <motion.span
                    initial={false}
                    animate={{ scale: current ? 1.12 : 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] font-bold transition-colors duration-500 ${
                      done
                        ? "border-accent/50 bg-accent/20 text-accent-soft"
                        : current
                          ? "border-accent bg-accent text-[#0a0f1c] shadow-[0_0_0_4px_rgb(var(--accent)/0.15)]"
                          : "border-white/10 bg-[#0a0f1c] text-slate-500"
                    }`}
                  >
                    {done ? <Check className="h-3 w-3" /> : i === STAGES.length - 1 ? <Flag className="h-3 w-3" /> : i + 1}
                  </motion.span>
                  <div
                    className={`flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 transition-colors duration-500 ${
                      current ? "border-accent/30 bg-accent/[0.07]" : "border-transparent"
                    }`}
                  >
                    <span className={`text-[13px] font-medium transition-colors duration-500 ${i <= step ? "text-white" : "text-slate-500"}`}>{s.name}</span>
                    <span className="shrink-0 font-mono text-[10px] text-slate-500">{s.meta}</span>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Prep focus</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-2 text-[13px] font-medium text-accent-soft"
              >
                {STAGES[step].focus}
              </motion.p>
            </AnimatePresence>
            <div className="mt-3 space-y-2">
              <Line w="w-11/12" />
              <Line w="w-2/3" />
            </div>
          </div>
        </Window>

        <Chip show={step === STAGES.length - 1} className="-bottom-5 -right-4">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Check className="h-3 w-3" />
          </span>
          Loop complete
        </Chip>
      </Stage>
    </div>
  );
}
