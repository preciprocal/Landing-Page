"use client";

/**
 * Hero illustration for /ai-mock-interview: a voice interview in a call
 * window. The interviewer asks, the candidate answers with a live waveform,
 * and a feedback note appears once the answer lands.
 * Steps: 0 question asked, 1 candidate speaking, 2 still speaking with the
 * transcript filling, 3 feedback chip.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Mic, Sparkles } from "lucide-react";
import { Chip, EASE, PulseDot, Stage, Window, useLoop } from "./Frame";

const BARS = [0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.65, 0.4, 0.8, 0.55, 0.95, 0.45, 0.7, 0.85, 0.5, 0.3, 0.6, 0.9, 0.4, 0.7, 0.55, 0.35];

export default function MockInterviewVisual() {
  const { ref, step, reduce } = useLoop(4, 1700);
  const asking = step === 0;
  const speaking = step === 1 || step === 2;
  const done = step === 3;

  return (
    <div ref={ref}>
      <Stage>
        <Window
          title={
            <span className="flex items-center gap-2">
              Mock interview · Behavioural round
              <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-accent-soft">
                <PulseDot className="scale-75" /> Live
              </span>
            </span>
          }
          bodyClassName="p-4"
        >
          <div className="grid grid-cols-2 gap-3">
            {/* Interviewer tile */}
            <div
              className={`relative flex aspect-[4/3] flex-col items-center justify-center rounded-xl border bg-gradient-to-b from-white/[0.04] to-transparent transition-colors duration-500 ${
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
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-accent-deep/50 to-accent-deep-2/40 text-sm font-bold text-white">
                  MR
                </div>
              </div>
              <p className="mt-2.5 text-[11px] font-semibold text-white">Maya Reyes</p>
              <p className="text-[10px] text-slate-500">Hiring manager</p>
            </div>

            {/* Candidate tile with waveform */}
            <div
              className={`relative flex aspect-[4/3] flex-col items-center justify-center rounded-xl border bg-gradient-to-b from-white/[0.04] to-transparent transition-colors duration-500 ${
                speaking ? "border-accent/40" : "border-white/[0.07]"
              }`}
            >
              <div className="flex h-12 items-center gap-[3px]">
                {BARS.map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-accent-deep to-accent-soft"
                    initial={false}
                    animate={
                      speaking && !reduce
                        ? { height: [`${h * 30}%`, `${(1.15 - h) * 100}%`, `${h * 100}%`] }
                        : { height: done || reduce ? `${h * 55}%` : "12%" }
                    }
                    transition={
                      speaking && !reduce
                        ? { duration: 0.9 + (i % 4) * 0.15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                        : { duration: 0.4, ease: EASE }
                    }
                  />
                ))}
              </div>
              <p className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-white">
                <Mic className="h-3 w-3 text-accent" /> You
              </p>
              <p className="text-[10px] text-slate-500">{speaking ? "Speaking" : "Mic on"}</p>
            </div>
          </div>

          {/* Question caption */}
          <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Question 2 of 6</p>
            <p className="mt-1.5 text-[13px] leading-snug text-slate-200">
              Tell me about a time you disagreed with a teammate. What did you do?
            </p>
            {/* Transcript filling in as the candidate answers */}
            <div className="mt-3 space-y-2">
              {["w-11/12", "w-4/5", "w-2/3"].map((w, i) => (
                <motion.div
                  key={w}
                  className={`h-1.5 origin-left rounded-full bg-accent/25 ${w}`}
                  initial={false}
                  animate={{ scaleX: step === 0 ? 0 : step === 1 ? (i === 0 ? 1 : 0) : 1, opacity: step === 0 ? 0 : 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: step >= 2 ? i * 0.15 : 0 }}
                />
              ))}
            </div>
          </div>
        </Window>

        <AnimatePresence>
          {done && (
            <motion.div
              key="feedback"
              initial={reduce ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute -right-6 bottom-16 w-52 rounded-xl border border-white/10 bg-[#0d1322]/95 p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur"
            >
              <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-soft">
                <Sparkles className="h-3 w-3" /> Feedback
              </p>
              <p className="mt-1.5 text-[11px] leading-snug text-slate-300">Clear situation and action. Add the result you measured.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <Chip show={speaking || done} className="-bottom-5 left-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Mic className="h-3 w-3" />
          </span>
          Answering out loud
        </Chip>
      </Stage>
    </div>
  );
}
