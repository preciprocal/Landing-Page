"use client";

/**
 * Hero illustration for /thank-you-email-after-interview: a preview of the
 * result. An email draft where the interviewer's name and one specific detail
 * from the conversation get highlighted, and a "send within 24 hours" clock
 * chip ticks down beside it.
 * Steps: 0 draft, 1 name highlighted, 2 detail highlighted, 3 ready to send
 * (finished state).
 */

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Clock, Send } from "lucide-react";
import { EASE, Line, Stage, useLoop } from "./Frame";

function Mark({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden="true"
        className="absolute -inset-x-1 inset-y-0 origin-left rounded bg-accent/20"
        initial={false}
        animate={{ scaleX: on ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      <span className={`relative transition-colors duration-500 ${on ? "text-accent-soft" : "text-slate-300"}`}>{children}</span>
    </span>
  );
}

export default function ThankYouEmailVisual() {
  const { ref, step } = useLoop(4, 1600);
  const ready = step === 3;
  // Clock hand: a quarter turn further each step
  const hand = step * 70;

  return (
    <div ref={ref}>
      <Stage>
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0f1c]/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
            <p className="text-[12px] font-semibold text-white">New message</p>
            <p className="text-[10px] text-slate-500">Draft saved</p>
          </div>

          <div className="divide-y divide-white/[0.05] px-5 text-[11.5px]">
            <div className="flex gap-3 py-2.5">
              <span className="w-12 text-slate-500">To</span>
              <span className="text-slate-300">Priya Shah</span>
            </div>
            <div className="flex gap-3 py-2.5">
              <span className="w-12 text-slate-500">Subject</span>
              <span className="text-slate-200">Thank you for today, Priya</span>
            </div>
          </div>

          <div className="px-5 pb-5 pt-4 text-[12px] leading-relaxed text-slate-300">
            <p>
              Hi <Mark on={step >= 1}>Priya</Mark>,
            </p>
            <p className="mt-3">
              Thank you for the conversation this afternoon. I kept thinking about{" "}
              <Mark on={step >= 2}>the onboarding redesign you described</Mark>, and how the second-week drop-off
              shaped it.
            </p>
            <div className="mt-4 space-y-2">
              <Line w="w-full" />
              <Line w="w-10/12" />
              <Line w="w-1/3" />
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="font-mono text-[10px] text-slate-500">112 words</span>
              <motion.span
                initial={false}
                animate={{ scale: ready ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors duration-500 ${
                  ready ? "bg-accent/20 text-accent-soft" : "bg-white/[0.05] text-slate-500"
                }`}
              >
                <Send className="h-3 w-3" /> Send
              </motion.span>
            </div>
          </div>
        </div>

        {/* Send within 24 hours: a clock chip */}
        <div className="absolute -right-6 -top-5 z-10 flex items-center gap-2.5 rounded-xl border border-white/[0.1] bg-[#0d1322]/95 px-3 py-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur">
          <div className="relative h-7 w-7 rounded-full border border-accent/40">
            <motion.span
              className="absolute bottom-1/2 left-1/2 h-2.5 w-px origin-bottom -translate-x-1/2 rounded-full bg-accent"
              initial={false}
              animate={{ rotate: hand }}
              transition={{ duration: 0.6, ease: EASE }}
            />
            <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
          </div>
          <div>
            <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-soft">
              <Clock className="h-3 w-3" /> Send within
            </p>
            <p className="text-[12px] font-medium text-slate-200">24 hours</p>
          </div>
        </div>
      </Stage>
    </div>
  );
}
