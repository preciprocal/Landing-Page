"use client";

/**
 * Hero illustration for /interview-debrief: a guided prompt answered right
 * after the interview, turning into two short lists, what went well and what
 * to work on, each item tagged by round.
 * Steps: 0 writing notes, 1 organising, 2 went well, 3 work on.
 */

import { motion } from "framer-motion";
import { PenLine, Plus, Check } from "lucide-react";
import { EASE, Stage, useLoop } from "./Frame";

const WELL = [
  { text: "Clear STAR story on the launch", tag: "Behavioral" },
  { text: "Asked about scale before designing", tag: "System design" },
];
const WORK = [
  { text: "Ran short on time in the coding round", tag: "Coding" },
  { text: "Rambled on the conflict question", tag: "Behavioral" },
];

function Item({ text, tag, show, i, good }: { text: string; tag: string; show: boolean; i: number; good: boolean }) {
  return (
    <motion.li
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.45, ease: EASE, delay: show ? i * 0.15 : 0 }}
      className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5"
    >
      <div className="flex items-start gap-2">
        <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${good ? "bg-accent/20 text-accent" : "bg-white/[0.08] text-slate-300"}`}>
          {good ? <Check className="h-2.5 w-2.5" /> : <Plus className="h-2.5 w-2.5" />}
        </span>
        <p className="text-[11px] leading-snug text-slate-200">{text}</p>
      </div>
      <span className="ml-6 mt-1.5 inline-block rounded bg-white/[0.05] px-1.5 py-0.5 text-[9px] font-medium text-slate-400">{tag}</span>
    </motion.li>
  );
}

export default function InterviewDebriefVisual() {
  const { ref, step } = useLoop(4, 1700);
  const writing = step === 0;

  return (
    <div ref={ref}>
      <Stage>
        {/* Guided prompt, answered while recall is fresh */}
        <div className="relative z-10 mx-6 rounded-2xl border border-white/[0.09] bg-[#0d1322]/95 px-4 py-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur">
          <div className="flex items-center gap-3">
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${writing ? "bg-accent/25 text-accent" : "bg-white/[0.06] text-slate-400"}`}>
              <PenLine className="h-4 w-4" />
            </span>
            <p className="min-w-0 flex-1 truncate text-[12px] font-medium text-white">What did they ask in the coding round?</p>
            <span className="font-mono text-[10px] text-slate-500">Prompt 2 of 5</span>
          </div>
          <div className="mt-3 space-y-2 pl-11">
            {["w-full", "w-10/12", "w-7/12"].map((w, i) => (
              <motion.div
                key={`${w}-${writing ? "w" : "d"}`}
                className={`h-2 origin-left rounded-full bg-accent/25 ${w}`}
                initial={writing ? { scaleX: 0 } : false}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: writing ? 0.2 + i * 0.4 : 0 }}
              />
            ))}
          </div>
        </div>

        {/* Recap */}
        <div className="relative -mt-5 rounded-2xl border border-white/[0.08] bg-[#0a0f1c]/90 px-5 pb-5 pt-9 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold text-white">Onsite debrief · Northwind</p>
            <motion.span
              initial={false}
              animate={{ opacity: step === 1 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] text-accent-soft"
            >
              Tagging by round
            </motion.span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-soft">Went well</p>
              <ul className="space-y-2">
                {WELL.map((it, i) => (
                  <Item key={it.text} {...it} i={i} show={step >= 2} good />
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Work on</p>
              <ul className="space-y-2">
                {WORK.map((it, i) => (
                  <Item key={it.text} {...it} i={i} show={step >= 3} good={false} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Stage>
    </div>
  );
}
