"use client";

/**
 * Hero illustration for /for/new-grads: a path from first resume to first
 * offer. Four milestone nodes light up in turn along a track, the panel below
 * describes the current milestone, and an offer card lands at the end.
 * Steps: 0 resume, 1 applied, 2 interview, 3 offer (finished state).
 */

import { AnimatePresence, motion } from "framer-motion";
import { Check, FileText, MessageSquare, Send, Sparkles } from "lucide-react";
import { Chip, EASE, Line, Stage, useLoop } from "./Frame";

const MILESTONES = [
  { label: "Resume", Icon: FileText, detail: "First resume, one page", note: "Projects and coursework up top" },
  { label: "Applied", Icon: Send, detail: "Applications out", note: "Tailored to each posting" },
  { label: "Interview", Icon: MessageSquare, detail: "First interview booked", note: "Practised out loud" },
  { label: "Offer", Icon: Sparkles, detail: "First offer", note: "Associate Analyst at Northwind" },
];

export default function NewGradsVisual() {
  const { ref, step } = useLoop(MILESTONES.length, 1700);
  const current = MILESTONES[step];

  return (
    <div ref={ref}>
      <Stage>
        <div className="relative rounded-2xl border border-white/[0.09] bg-[#0a0f1c]/90 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Your first job search</p>
            <p className="font-mono text-[11px] text-accent-soft">
              {step + 1}/{MILESTONES.length}
            </p>
          </div>

          {/* Track */}
          <div className="relative mt-7 px-4">
            <div className="absolute left-[34px] right-[34px] top-[17px] h-[2px] rounded-full bg-white/[0.07]" />
            <motion.div
              className="absolute left-[34px] right-[34px] top-[17px] h-[2px] origin-left rounded-full bg-gradient-to-r from-accent-deep to-accent"
              initial={false}
              animate={{ scaleX: step / (MILESTONES.length - 1) }}
              transition={{ duration: 0.8, ease: EASE }}
            />
            <div className="relative flex justify-between">
              {MILESTONES.map(({ label, Icon }, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <div key={label} className="flex w-9 flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{ scale: active ? 1.12 : 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className={`grid h-9 w-9 place-items-center rounded-full border transition-colors duration-500 ${
                        active
                          ? "border-accent bg-accent/20 text-accent-soft shadow-[0_0_24px_-4px_rgb(var(--accent)/0.7)]"
                          : done
                            ? "border-accent/50 bg-accent/10 text-accent"
                            : "border-white/10 bg-[#0d1322] text-slate-600"
                      }`}
                    >
                      {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </motion.div>
                    <span className={`mt-2 text-[11px] font-medium transition-colors duration-500 ${i <= step ? "text-slate-200" : "text-slate-600"}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current milestone */}
          <div className="mt-7 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <p className="text-sm font-semibold text-white">{current.detail}</p>
                <p className="mt-1 text-[11px] text-slate-400">{current.note}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-4 space-y-2">
              <Line w="w-11/12" />
              <Line w="w-3/4" />
            </div>
          </div>
        </div>

        {/* The offer, at the end of the path */}
        <AnimatePresence>
          {step === MILESTONES.length - 1 && (
            <motion.div
              key="offer"
              initial={{ opacity: 0, y: 14, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="absolute -bottom-10 -right-6 w-52 rounded-xl border border-accent/30 bg-[#0d1322]/95 p-3.5 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] backdrop-blur"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-soft">Offer letter</p>
              <p className="mt-1.5 text-[12px] font-semibold text-white">Associate Analyst</p>
              <p className="text-[10px] text-slate-400">Northwind · Full-time</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-md bg-accent/15 px-2 py-1 text-[10px] font-semibold text-accent-soft">Accept</span>
                <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-slate-400">Review</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Chip show={step === 1} className="-top-4 left-8">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Send className="h-3 w-3" />
          </span>
          Application sent
        </Chip>
      </Stage>
    </div>
  );
}
