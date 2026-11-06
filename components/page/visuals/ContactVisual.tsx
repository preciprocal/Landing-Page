"use client";

/**
 * Hero illustration for /contact: an email thread with the support inbox.
 * A pre-filled feature idea is sent, a reply-time chip appears, and a reply
 * from the team lands in the thread.
 * Steps: 0 draft, 1 sent, 2 team typing, 3 reply in the thread.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Clock, Send } from "lucide-react";
import { Chip, EASE, Line, Stage, Window, useLoop } from "./Frame";

export default function ContactVisual() {
  const { ref, step } = useLoop(4, 1600);
  const sent = step >= 1;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="support@preciprocal.com" bodyClassName="p-0">
          {/* Thread */}
          <div className="flex min-h-[236px] flex-col justify-end gap-3 px-5 pb-4 pt-5">
            <AnimatePresence initial={false}>
              {sent && (
                <motion.div
                  key="out"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="ml-auto w-[72%] rounded-2xl rounded-br-md border border-accent/30 bg-accent/[0.1] p-3.5"
                >
                  <p className="text-[11px] font-semibold text-accent-soft">Feature Idea:</p>
                  <div className="mt-2 space-y-2">
                    <div className="h-2 w-full rounded-full bg-accent/25" />
                    <div className="h-2 w-4/5 rounded-full bg-accent/25" />
                  </div>
                  <p className="mt-2 text-right font-mono text-[9px] text-slate-500">You · now</p>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="inline-flex w-fit items-center gap-1 rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.04] px-3.5 py-3"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-slate-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="reply"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="w-[78%] rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.04] p-3.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-accent-deep/60 to-accent-deep-2/50 text-[9px] font-bold text-white">
                      P
                    </span>
                    <p className="text-[11px] font-semibold text-white">Preciprocal team</p>
                  </div>
                  <div className="mt-2.5 space-y-2">
                    <Line w="w-full" />
                    <Line w="w-11/12" />
                    <Line w="w-2/3" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Composer */}
          <div className="flex items-center gap-3 border-t border-white/[0.06] px-5 py-3.5">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] text-slate-500">Subject</p>
              <p className="truncate text-[12px] text-slate-300">{sent ? "" : "Feature Idea: "}&nbsp;</p>
            </div>
            <motion.div
              animate={step === 1 ? { scale: [1, 0.9, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors duration-300 ${
                step === 0 ? "bg-accent/20 text-accent-soft" : "bg-white/[0.05] text-slate-500"
              }`}
            >
              <Send className="h-3.5 w-3.5" />
              Send
            </motion.div>
          </div>
        </Window>

        <Chip show={step >= 2} className="-right-4 top-16">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Clock className="h-3 w-3" />
          </span>
          We reply within 24 hours
        </Chip>
      </Stage>
    </div>
  );
}
