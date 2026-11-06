"use client";

/**
 * Hero illustration for /cold-email-generator: a compose window. The subject
 * types in, the body fills with a personalised line highlighted, the email
 * sends, and a reply notification arrives.
 * Steps: 0 subject, 1 body, 2 personalised line highlighted, 3 sent and replied.
 */

import { motion } from "framer-motion";
import { CornerUpLeft, Send, Sparkles } from "lucide-react";
import { Chip, EASE, Line, Stage, Window, useLoop } from "./Frame";

/** Text that reveals left to right, like it is being typed, while `typing`. */
function Typed({ text, typing, className = "" }: { text: string; typing: boolean; className?: string }) {
  return (
    <motion.span
      key={typing ? "typing" : "typed"}
      className={`inline-block whitespace-nowrap ${className}`}
      initial={typing ? { clipPath: "inset(0 100% 0 0)" } : false}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 1, ease: "linear", delay: 0.15 }}
    >
      {text}
    </motion.span>
  );
}

export default function ColdEmailVisual() {
  const { ref, step } = useLoop(4, 1700);
  const body = step >= 1;
  const highlight = step >= 2;
  const sent = step >= 3;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="New message" bodyClassName="p-0">
          <div className="divide-y divide-white/[0.06] text-[12px]">
            <div className="flex items-center gap-3 px-5 py-2.5">
              <span className="w-12 text-slate-500">To</span>
              <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-slate-300">Priya Shah · Northwind</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5">
              <span className="w-12 text-slate-500">Subject</span>
              <Typed text="Your design systems talk, and a question" typing={step === 0} className="min-w-0 truncate font-medium text-white" />
            </div>
          </div>

          <div className="space-y-3 px-5 py-5">
            <motion.p
              initial={false}
              animate={{ opacity: body ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="text-[12px] text-slate-300"
            >
              Hi Priya,
            </motion.p>
            <motion.div
              initial={false}
              animate={body ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.45, ease: EASE, delay: body ? 0.1 : 0 }}
              className={`relative rounded-lg border px-3 py-2 text-[12px] leading-relaxed transition-colors duration-500 ${
                highlight ? "border-accent/40 bg-accent/[0.08] text-slate-100" : "border-transparent text-slate-400"
              }`}
            >
              I watched your talk on rebuilding the{" "}
              <span className={`rounded px-1 transition-colors duration-500 ${highlight ? "bg-accent/25 text-accent-soft" : ""}`}>
                Northwind component library
              </span>{" "}
              and the part on token naming stuck with me.
              <motion.span
                initial={false}
                animate={highlight ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full border border-accent/40 bg-[#0d1322] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-accent-soft"
              >
                <Sparkles className="h-2.5 w-2.5" />
                Personalised
              </motion.span>
            </motion.div>
            <motion.div
              initial={false}
              animate={{ opacity: body ? 1 : 0 }}
              transition={{ duration: 0.4, delay: body ? 0.25 : 0 }}
              className="space-y-2.5 pt-1"
            >
              <Line w="w-full" />
              <Line w="w-10/12" />
              <Line w="w-7/12" />
            </motion.div>
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
            <div className="flex gap-2">
              <span className="h-2 w-6 rounded-full bg-white/[0.06]" />
              <span className="h-2 w-4 rounded-full bg-white/[0.06]" />
            </div>
            <motion.div
              initial={false}
              animate={sent ? { scale: [1, 0.92, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors duration-300 ${
                sent ? "bg-accent/20 text-accent-soft" : "bg-white/[0.06] text-slate-300"
              }`}
            >
              <Send className="h-3.5 w-3.5" />
              {sent ? "Sent" : "Send"}
            </motion.div>
          </div>
        </Window>

        <Chip show={sent} className="-right-4 -top-5">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/20 text-accent">
            <CornerUpLeft className="h-3 w-3" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] text-white">Priya replied</span>
            <span className="text-[10px] font-normal text-slate-400">Happy to chat next week</span>
          </span>
        </Chip>
      </Stage>
    </div>
  );
}
