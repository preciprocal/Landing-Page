"use client";

/**
 * Hero illustration for /thank-you-email-after-interview: a preview of the
 * result. A complete thank-you email in a mail window where the interviewer's
 * name and one specific detail from the conversation get highlighted, and a
 * "send within 24 hours" clock chip ticks down beside it.
 * Steps: 0 draft, 1 name highlighted, 2 detail highlighted, 3 ready to send
 * (finished state).
 * Names, companies and details are fictional examples.
 */

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Clock, Send } from "lucide-react";
import { EASE, Stage, Window, useLoop } from "./Frame";

function Mark({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <motion.span
      initial={false}
      animate={{
        backgroundColor: on ? "rgb(var(--accent) / 0.2)" : "rgb(var(--accent) / 0)",
        color: on ? "rgb(var(--accent-soft))" : "rgb(203 213 225)",
      }}
      transition={{ duration: 0.5, ease: EASE }}
      className="rounded px-0.5 [box-decoration-break:clone]"
    >
      {children}
    </motion.span>
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
        <Window title="New message" bodyClassName="p-0">
          <div className="divide-y divide-white/[0.06] px-5 text-[11.5px]">
            <div className="flex items-center gap-3 py-2.5">
              <span className="w-12 text-slate-400">To</span>
              <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-slate-200">
                Priya Shah <span className="font-mono text-[10.5px] text-slate-400">priya@northwind.example</span>
              </span>
            </div>
            <div className="flex items-center gap-3 py-2.5">
              <span className="w-12 text-slate-400">Subject</span>
              <span className="font-medium text-white">Thank you for today, Priya</span>
            </div>
          </div>

          <div className="border-t border-white/[0.06] px-5 pb-4 pt-4 text-[12px] leading-relaxed text-slate-300">
            <p>
              Hi <Mark on={step >= 1}>Priya</Mark>,
            </p>
            <p className="mt-2.5">
              Thank you for the conversation this afternoon. I kept thinking about{" "}
              <Mark on={step >= 2}>the onboarding redesign you described</Mark>, and how the second-week drop-off shaped it.
            </p>
            <p className="mt-2.5">
              It made me even more excited about the Product Analyst role. At Lumen I traced a similar drop-off to one
              confusing step, and I would love to bring that to your team.
            </p>
            <p className="mt-2.5">
              Best,
              <br />
              <span className="font-semibold text-white">Jordan Lee</span>
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
            <span className="text-[11px] text-slate-400">112 words · Draft saved</span>
            <motion.span
              initial={false}
              animate={{ scale: ready ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11.5px] font-semibold transition-colors duration-500 ${
                ready ? "bg-accent/20 text-accent-soft" : "bg-white/[0.06] text-slate-300"
              }`}
            >
              <Send className="h-3.5 w-3.5" /> Send
            </motion.span>
          </div>
        </Window>

        {/* Send within 24 hours: a clock chip */}
        <div className="absolute -right-3 -top-4 z-10 flex items-center gap-2.5 rounded-xl border border-white/[0.14] bg-gradient-to-b from-[#161d30]/95 to-[#0e1424]/95 px-3 py-2 shadow-[0_24px_50px_-14px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
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
