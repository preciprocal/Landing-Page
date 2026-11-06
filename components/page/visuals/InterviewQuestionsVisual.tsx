"use client";

/**
 * Hero illustration for /interview-questions: a question card that flips
 * over to reveal a structured answer outline (situation, task, action,
 * result), the outline filling in row by row.
 * Steps: 0 question, 1 flipped with S and T, 2 adds A, 3 adds R. Reduced
 * motion holds step 3, the full outline.
 */

import { motion } from "framer-motion";
import { Check, MessageSquare } from "lucide-react";
import { Chip, EASE, Line, Stage, useLoop } from "./Frame";

const OUTLINE = [
  { key: "S", label: "Situation", w: "w-4/5", at: 1 },
  { key: "T", label: "Task", w: "w-3/5", at: 1 },
  { key: "A", label: "Action", w: "w-full", at: 2 },
  { key: "R", label: "Result", w: "w-2/3", at: 3 },
];

const FACE = "absolute inset-0 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0f1c] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] [backface-visibility:hidden]";

export default function InterviewQuestionsVisual() {
  const { ref, step } = useLoop(4, 1900);
  const flipped = step >= 1;

  return (
    <div ref={ref}>
      <Stage>
        <div className="relative h-[360px] [perspective:1400px]">
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {/* Front: the question */}
            <div className={`${FACE} flex flex-col`}>
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-soft">
                  Behavioral
                </span>
                <span className="font-mono text-[11px] text-slate-500">Q 04 / 12</span>
              </div>
              <div className="my-auto">
                <MessageSquare className="h-6 w-6 text-accent" />
                <p className="mt-4 text-xl font-semibold leading-snug tracking-tight text-white">
                  Tell me about a time you disagreed with a teammate. How did you handle it?
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 text-[11px] text-slate-500">
                <span>Product Manager</span>
                <span className="font-mono">Tap to outline</span>
              </div>
            </div>

            {/* Back: the answer outline */}
            <div className={`${FACE} [transform:rotateY(180deg)]`}>
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Answer outline</p>
                <span className="font-mono text-[11px] text-slate-500">~2 min</span>
              </div>
              <ul className="mt-5 space-y-3">
                {OUTLINE.map((row) => {
                  const on = step >= row.at;
                  return (
                    <motion.li
                      key={row.key}
                      initial={false}
                      animate={{ opacity: on ? 1 : 0.25, x: on ? 0 : 6 }}
                      transition={{ duration: 0.45, ease: EASE, delay: on && row.at === 1 && row.key === "T" ? 0.15 : 0 }}
                      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-500 ${
                        on && row.at === step ? "border-accent/30 bg-accent/[0.07]" : "border-white/[0.06] bg-white/[0.02]"
                      }`}
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/15 font-mono text-[12px] font-bold text-accent-soft">{row.key}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-medium text-white">{row.label}</p>
                        <Line w={row.w} className="mt-1.5" />
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>

        <Chip show={step === 3} className="-bottom-5 -left-4">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Check className="h-3 w-3" />
          </span>
          Outline ready
        </Chip>
      </Stage>
    </div>
  );
}
