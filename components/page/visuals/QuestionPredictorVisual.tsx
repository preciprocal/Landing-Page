"use client";

/**
 * Hero illustration for /interview-question-predictor: a preview of the
 * result. A stack of question cards fans out, each with a category tag and a
 * likelihood bar, and the top card shows the posting phrase behind it.
 * Steps: 0 stacked, 1 fanned, 2 likelihood bars filled, 3 source phrase shown
 * (finished state).
 */

import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { EASE, Stage, useLoop } from "./Frame";

// Fictional questions; rendered back to front, the last is the top card.
const CARDS = [
  { q: "How do you prioritise when two teams need you at once?", tag: "Situational", level: "Medium", pct: 0.55 },
  { q: "Walk me through how you would size a new market.", tag: "Role-specific", level: "High", pct: 0.72 },
  { q: "Tell me about a time you led a cross-functional launch.", tag: "Behavioral", level: "Very high", pct: 0.9 },
];

// Resting fan positions for each card (back to front)
const FAN = [
  { x: -46, y: 30, rotate: -7 },
  { x: 40, y: 16, rotate: 5 },
  { x: 0, y: -18, rotate: -1 },
];

export default function QuestionPredictorVisual() {
  const { ref, step } = useLoop(4, 1600);
  const fanned = step >= 1;
  const filled = step >= 2;
  const sourced = step >= 3;

  return (
    <div ref={ref}>
      <Stage>
        <div className="relative h-[340px]">
          {CARDS.map((c, i) => {
            const top = i === CARDS.length - 1;
            const pos = fanned ? FAN[i] : { x: 0, y: (CARDS.length - 1 - i) * 8, rotate: 0 };
            return (
              <motion.div
                key={c.q}
                initial={false}
                animate={pos}
                transition={{ duration: 0.75, ease: EASE, delay: fanned ? (CARDS.length - 1 - i) * 0.06 : 0 }}
                className={`absolute left-1/2 top-[70px] -ml-[170px] w-[340px] rounded-2xl border p-5 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.85)] ${
                  top ? "border-accent/30 bg-[#0d1322]" : "border-white/[0.08] bg-[#0b111e]"
                }`}
              >
                {top && <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />}
                <div className="flex items-center justify-between">
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${top ? "bg-accent/15 text-accent-soft" : "bg-white/[0.05] text-slate-400"}`}>
                    {c.tag}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">#{CARDS.length - i}</span>
                </div>
                <p className={`mt-3 text-[13px] font-medium leading-snug ${top ? "text-white" : "text-slate-400"}`}>{c.q}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className={`h-full origin-left rounded-full ${top ? "bg-gradient-to-r from-accent-deep to-accent" : "bg-white/25"}`}
                      initial={false}
                      animate={{ scaleX: filled ? c.pct : 0 }}
                      transition={{ duration: 0.8, ease: EASE, delay: filled ? (CARDS.length - 1 - i) * 0.1 : 0 }}
                    />
                  </div>
                  <span className={`w-16 text-right text-[10px] font-medium ${top ? "text-accent-soft" : "text-slate-500"}`}>{c.level}</span>
                </div>

                {top && (
                  <AnimatePresence initial={false}>
                    {sourced && (
                      <motion.div
                        key="src"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 flex gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 text-[10.5px] text-slate-400">
                          <Quote className="h-3 w-3 flex-shrink-0 text-accent" />
                          <span>
                            From the posting: <span className="rounded bg-accent/15 px-1 text-accent-soft">partner with engineering and design</span>
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}

          <p className="absolute left-0 top-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Ranked by likelihood
          </p>
        </div>
      </Stage>
    </div>
  );
}
