"use client";

/**
 * Hero illustration for /interview-questions: a question card that flips
 * over to reveal a structured answer (situation, task, action, result),
 * written out as a real example answer that fills in row by row.
 * Steps: 0 question, 1 flipped with S and T, 2 adds A, 3 adds R. Reduced
 * motion holds step 3, the full answer.
 * The example answer, company and numbers are fictional.
 */

import { motion } from "framer-motion";
import { ArrowUpRight, Check, MessageSquare } from "lucide-react";
import { Chip, EASE, SURFACE, Stage, useLoop } from "./Frame";

const OUTLINE = [
  { key: "S", label: "Situation", text: "Two weeks before launch, our designer and I disagreed on the onboarding scope.", at: 1 },
  { key: "T", label: "Task", text: "I owned the launch date and needed a call we could both stand behind.", at: 1 },
  { key: "A", label: "Action", text: "I proposed testing both flows with five users and shared the notes that day.", at: 2 },
  { key: "R", label: "Result", text: "We shipped on time, and activation rose 12% in the first month.", at: 3 },
];

const SIGNALS = ["Ownership", "Empathy", "A clear outcome"];

const FACE = `absolute inset-0 overflow-hidden p-5 ${SURFACE}`;

export default function InterviewQuestionsVisual() {
  const { ref, step } = useLoop(4, 2000);
  const flipped = step >= 1;

  return (
    <div ref={ref}>
      <Stage>
        <div className="relative h-[384px]">
          {/* The question, then the example answer, as a soft crossfade (no 3D
              flip: mid-rotation the text skews and stops reading as product UI). */}
          <div className="relative h-full w-full">
            {/* Front: the question */}
            <motion.div
              className={`${FACE} flex flex-col`}
              initial={false}
              animate={{ opacity: flipped ? 0 : 1, y: flipped ? -10 : 0, scale: flipped ? 0.98 : 1 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[10.5px] font-semibold text-accent-soft">
                  Behavioral
                </span>
                <span className="text-[11px] font-medium text-slate-400">Question 4 of 12</span>
              </div>
              <div className="my-auto">
                <MessageSquare className="h-6 w-6 text-accent" />
                <p className="mt-3 text-[21px] font-semibold leading-snug tracking-tight text-white">
                  Tell me about a time you disagreed with a teammate. How did you handle it?
                </p>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">What they are listening for</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {SIGNALS.map((s) => (
                    <span key={s} className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[11px] font-medium text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-3.5 text-[11px]">
                <span className="text-slate-400">Product Manager · Onsite round</span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-accent/15 px-2.5 py-1.5 font-semibold text-accent-soft">
                  See an example answer <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </motion.div>

            {/* Back: the answer outline */}
            <motion.div
              className={FACE}
              initial={false}
              animate={{ opacity: flipped ? 1 : 0, y: flipped ? 0 : 10, scale: flipped ? 1 : 0.98 }}
              transition={{ duration: 0.55, ease: EASE, delay: flipped ? 0.15 : 0 }}
            >
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-semibold text-white">Example answer</p>
                  <p className="text-[11px] text-slate-400">STAR structure, about 2 minutes spoken</p>
                </div>
                <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[10.5px] font-semibold text-accent-soft">
                  Behavioral
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {OUTLINE.map((row) => {
                  const on = step >= row.at;
                  return (
                    <motion.li
                      key={row.key}
                      initial={false}
                      animate={{ opacity: on ? 1 : 0.55, x: on ? 0 : 6 }}
                      transition={{ duration: 0.45, ease: EASE, delay: on && row.key === "T" ? 0.15 : 0 }}
                      className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-500 ${
                        on && row.at === step ? "border-accent/30 bg-accent/[0.07]" : "border-white/[0.06] bg-white/[0.02]"
                      }`}
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/15 text-[12px] font-bold text-accent-soft">{row.key}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">{row.label}</p>
                        <p className="mt-0.5 text-[11.5px] leading-snug text-slate-100">{row.text}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </div>

        <Chip show={step === 3} className="-bottom-5 -left-4">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Check className="h-3 w-3" />
          </span>
          Answer structured
        </Chip>
      </Stage>
    </div>
  );
}
