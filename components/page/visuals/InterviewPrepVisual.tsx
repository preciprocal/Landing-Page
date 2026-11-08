"use client";

/**
 * Hero illustration for /interview-prep: a prep board for one interview
 * loop. The stages (recruiter screen, technical, onsite, offer) run down the
 * left with a marker advancing stage by stage, and the right panel shows the
 * prep checklist for the stage in progress.
 * Steps: 0..3, the stage in progress. Reduced motion holds the offer stage.
 * The company, role and checklist items are fictional examples.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Check, Flag, Target } from "lucide-react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

const STAGES = [
  {
    name: "Recruiter screen",
    meta: "30 min, phone",
    focus: "Story and motivation",
    tasks: ["Practise a 60 second intro", "Say why Northwind, in one line", "Know your start date and range"],
  },
  {
    name: "Technical",
    meta: "60 min, video",
    focus: "Problem solving out loud",
    tasks: ["Rehearse SQL joins and window functions", "Talk through your approach first", "Check edge cases before you finish"],
  },
  {
    name: "Onsite loop",
    meta: "4 rounds",
    focus: "Depth and team fit",
    tasks: ["Prepare four STAR stories", "Read up on Northwind's product", "Two questions for each interviewer"],
  },
  {
    name: "Offer",
    meta: "Final step",
    focus: "Decide with confidence",
    tasks: ["Ask about team, growth and timeline", "Compare against your must-haves", "Reply with a clear next step"],
  },
];

export default function InterviewPrepVisual() {
  const { ref, step } = useLoop(4, 2000);
  const stage = STAGES[step];

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/interview-prep" bodyClassName="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent-deep to-accent-deep-2 text-[13px] font-bold text-white">N</div>
              <div>
                <p className="text-[13px] font-semibold text-white">Product Analyst</p>
                <p className="text-[11px] text-slate-400">Northwind · Hybrid, Austin</p>
              </div>
            </div>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10.5px] font-semibold text-accent-soft">
              Stage {step + 1} of 4
            </span>
          </div>

          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-3">
            {/* Stages */}
            <ol className="relative">
              <span aria-hidden="true" className="absolute bottom-[26px] left-[11px] top-[26px] w-px bg-white/[0.08]" />
              <motion.span
                aria-hidden="true"
                className="absolute left-[11px] top-[26px] w-px origin-top bg-gradient-to-b from-accent to-accent-2"
                style={{ height: "calc(100% - 52px)" }}
                initial={false}
                animate={{ scaleY: step / (STAGES.length - 1) }}
                transition={{ duration: 0.7, ease: EASE }}
              />
              {STAGES.map((s, i) => {
                const done = i < step;
                const current = i === step;
                return (
                  <li key={s.name} className="relative flex items-center gap-2.5 py-1">
                    <motion.span
                      initial={false}
                      animate={{ scale: current ? 1.12 : 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10.5px] font-bold transition-colors duration-500 ${
                        done
                          ? "border-accent/50 bg-[#0f1626] text-accent-soft"
                          : current
                            ? "border-accent bg-accent text-[#0a0f1c] shadow-[0_0_0_4px_rgb(var(--accent)/0.15)]"
                            : "border-white/15 bg-[#0f1626] text-slate-300"
                      }`}
                    >
                      {done ? <Check className="h-3 w-3" /> : i === STAGES.length - 1 ? <Flag className="h-3 w-3" /> : i + 1}
                    </motion.span>
                    <div
                      className={`min-w-0 flex-1 rounded-xl border px-3 py-2 transition-colors duration-500 ${
                        current ? "border-accent/35 bg-accent/[0.08]" : "border-white/[0.06] bg-white/[0.02]"
                      }`}
                    >
                      <p className="text-[12px] font-semibold text-white">{s.name}</p>
                      <p className="text-[10.5px] text-slate-400">{done ? "Done" : s.meta}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Prep checklist for the current stage */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
              <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                <Target className="h-3 w-3 text-accent" /> Prep focus
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <p className="mt-1.5 text-[14px] font-semibold leading-snug text-accent-soft">{stage.focus}</p>
                  <ul className="mt-3 space-y-2.5">
                    {stage.tasks.map((t, i) => (
                      <li key={t} className="flex items-start gap-2">
                        <span
                          className={`mt-px grid h-4 w-4 shrink-0 place-items-center rounded border ${
                            i === 0 ? "border-accent/60 bg-accent/20 text-accent-soft" : "border-white/20 text-transparent"
                          }`}
                        >
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        <span className="text-[11.5px] leading-snug text-slate-200">{t}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
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
