"use client";

/**
 * Hero illustration for /contact: an email thread with the support inbox.
 * A feature idea is drafted and sent, the team starts typing, and a reply
 * lands in the thread. A chip carries the page's reply-time promise.
 * Steps: 0 draft, 1 sent, 2 team typing, 3 reply in the thread (finished
 * state). The sender, message and reply are fictional examples.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Send } from "lucide-react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

const SUBJECT = "Feature idea: interview reminders";
const BODY = "Could the tracker remind me the day before an interview? I keep finding out the night before that I have not prepped.";
const REPLY = "Thanks Jordan, this is a great idea. I have shared it with the team, and we will follow up in this thread if we have questions.";

export default function ContactVisual() {
  const { ref, step } = useLoop(4, 1800);
  const sent = step >= 1;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="Mail · support@preciprocal.com" bodyClassName="p-0">
          {/* Message header */}
          <div className="border-b border-white/[0.06] px-5 py-3.5">
            <p className="text-[13.5px] font-semibold text-white">{SUBJECT}</p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Jordan Lee to <span className="font-mono text-slate-300">support@preciprocal.com</span>
            </p>
          </div>

          {/* Thread */}
          <div className="flex min-h-[204px] flex-col gap-3 px-5 py-4">
            <motion.div
              layout
              className={`ml-auto w-[80%] rounded-2xl rounded-br-md border p-3.5 transition-colors duration-500 ${
                sent ? "border-accent/30 bg-accent/[0.1]" : "border-dashed border-white/15 bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-accent-soft">Jordan Lee</p>
                <p className="inline-flex items-center gap-1 text-[10.5px] text-slate-400">
                  {sent ? (
                    <>
                      <Check className="h-3 w-3 text-accent" /> Sent 9:41 AM
                    </>
                  ) : (
                    "Draft"
                  )}
                </p>
              </div>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-200">{BODY}</p>
            </motion.div>

            <AnimatePresence mode="wait" initial={false}>
              {step === 2 && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="inline-flex w-fit items-center gap-2 rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5"
                >
                  <span className="text-[11px] text-slate-400">Preciprocal team is typing</span>
                  <span className="inline-flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-slate-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </span>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="reply"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="w-[82%] rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.04] p-3.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-accent-deep to-accent-deep-2 text-[9.5px] font-bold text-white">
                        P
                      </span>
                      <p className="text-[11px] font-semibold text-white">Preciprocal team</p>
                    </div>
                    <p className="text-[10.5px] text-slate-400">2:15 PM</p>
                  </div>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-200">{REPLY}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Composer */}
          <div className="flex items-center gap-3 border-t border-white/[0.06] px-5 py-3">
            <p className="min-w-0 flex-1 truncate text-[11.5px] text-slate-400">
              {sent ? "Reply to Preciprocal team..." : "Ready to send"}
            </p>
            <motion.div
              animate={step === 1 ? { scale: [1, 0.9, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors duration-300 ${
                step === 0 ? "bg-accent text-[#0a0f1c]" : "bg-white/[0.06] text-slate-300"
              }`}
            >
              <Send className="h-3.5 w-3.5" />
              {step === 0 ? "Send" : "Reply"}
            </motion.div>
          </div>
        </Window>

        <Chip show={step >= 2} className="-bottom-5 left-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Clock className="h-3 w-3" />
          </span>
          We reply within 24 hours
        </Chip>
      </Stage>
    </div>
  );
}
