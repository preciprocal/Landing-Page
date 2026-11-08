"use client";

/**
 * Hero illustration for /ai-mock-interview: a voice interview in the app.
 * A call header with the round and timer, the interviewer and candidate
 * tiles, and a live transcript of the answer filling in sentence by
 * sentence. Once the answer lands, a feedback chip with a score pops in.
 * Steps: 0 question asked, 1 candidate speaking, 2 still speaking with more
 * transcript, 3 answer complete and feedback shown (finished state).
 * Names, companies and scores are fictional examples.
 */

import { motion } from "framer-motion";
import { Mic, Sparkles } from "lucide-react";
import { Chip, EASE, PulseDot, Stage, Window, useLoop } from "./Frame";

const BARS = [0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.65, 0.4, 0.8, 0.55, 0.95, 0.45, 0.7, 0.85, 0.5, 0.3, 0.6, 0.9, 0.4, 0.7, 0.55, 0.35];

// The answer, revealed one sentence per step.
const ANSWER = [
  { text: "At Lumen, our designer and I disagreed on how long onboarding should be.", at: 1 },
  { text: "I suggested we test both versions with five users before deciding.", at: 2 },
  { text: "Her shorter flow won, and completion went up 18% after launch.", at: 3 },
];

const TIMER = ["03:48", "04:05", "04:26", "04:52"];

export default function MockInterviewVisual() {
  const { ref, step, reduce } = useLoop(4, 1900);
  const asking = step === 0;
  const speaking = step === 1 || step === 2;
  const done = step === 3;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/mock-interview" bodyClassName="p-4">
          {/* Call header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-white">Behavioural round</p>
              <p className="text-[11px] text-slate-400">Product Analyst, Northwind</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium tabular-nums text-slate-300">{TIMER[step]}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10.5px] font-semibold text-accent-soft">
                <PulseDot className="scale-75" /> Live
              </span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {/* Interviewer tile */}
            <div
              className={`relative flex aspect-[16/9] flex-col items-center justify-center rounded-xl border bg-gradient-to-b from-white/[0.05] to-white/[0.01] transition-colors duration-500 ${
                asking ? "border-accent/40" : "border-white/[0.07]"
              }`}
            >
              <div className="relative">
                {asking && !reduce && (
                  <motion.span
                    className="absolute -inset-2 rounded-full border border-accent/40"
                    animate={{ scale: [1, 1.18], opacity: [0.7, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-accent-deep to-accent-deep-2 text-[13px] font-bold text-white">
                  MR
                </div>
              </div>
              <p className="mt-2 text-[11.5px] font-semibold text-white">Maya Reyes</p>
              <p className="text-[10.5px] text-slate-400">{asking ? "Asking" : "Hiring manager"}</p>
            </div>

            {/* Candidate tile with waveform */}
            <div
              className={`relative flex aspect-[16/9] flex-col items-center justify-center rounded-xl border bg-gradient-to-b from-white/[0.05] to-white/[0.01] transition-colors duration-500 ${
                speaking ? "border-accent/40" : "border-white/[0.07]"
              }`}
            >
              <div className="flex h-11 items-center gap-[3px]">
                {BARS.map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-accent-deep to-accent-soft"
                    initial={false}
                    animate={
                      speaking && !reduce
                        ? { height: [`${h * 30}%`, `${(1.15 - h) * 100}%`, `${h * 100}%`] }
                        : { height: done ? `${h * 55}%` : "14%" }
                    }
                    transition={
                      speaking && !reduce
                        ? { duration: 0.9 + (i % 4) * 0.15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                        : { duration: 0.4, ease: EASE }
                    }
                  />
                ))}
              </div>
              <p className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-semibold text-white">
                <Mic className="h-3 w-3 text-accent" /> Jordan Lee
              </p>
              <p className="text-[10.5px] text-slate-400">{speaking ? "Speaking" : done ? "Answer saved" : "Listening"}</p>
            </div>
          </div>

          {/* Question and live transcript */}
          <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Question 2 of 6</p>
              <p className="text-[10.5px] font-medium text-slate-400">Conflict</p>
            </div>
            <p className="mt-1.5 text-[13px] font-medium leading-snug text-white">
              Tell me about a time you disagreed with a teammate.
            </p>
            <div className="mt-2.5 min-h-[66px] border-t border-white/[0.06] pt-2.5">
              {asking ? (
                <p className="inline-flex items-center gap-2 text-[11px] text-slate-400">
                  <PulseDot className="scale-75" /> Transcript starts when you answer
                </p>
              ) : (
                <p className="text-[11.5px] leading-relaxed text-slate-300">
                  {ANSWER.map((s) => (
                    <motion.span
                      key={s.text}
                      initial={false}
                      animate={{ opacity: step >= s.at ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      {s.text}{" "}
                    </motion.span>
                  ))}
                </p>
              )}
            </div>
          </div>
        </Window>

        <Chip show={done} className="-bottom-5 right-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Sparkles className="h-3 w-3" />
          </span>
          Clear structure, measured result
          <span className="rounded-md bg-emerald-400/10 px-1.5 py-0.5 text-[11px] font-bold text-emerald-300">8.4</span>
        </Chip>

        <Chip show={speaking} className="-bottom-5 left-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Mic className="h-3 w-3" />
          </span>
          Answering out loud
        </Chip>
      </Stage>
    </div>
  );
}
