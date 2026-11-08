"use client";

/**
 * Hero illustration for /cold-email-generator: a compose window with a full,
 * short cold email. The subject types in and the body writes in, the
 * personalised line is highlighted and tagged, the email sends, and a reply
 * notification arrives.
 * Steps: 0 subject and body, 1 personalised line highlighted, 2 tagged,
 * 3 sent and replied.
 * Names, companies and details are fictional examples.
 */

import { motion } from "framer-motion";
import { CornerUpLeft, Paperclip, Send, Sparkles } from "lucide-react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

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
  const fresh = step === 0;
  const highlight = step >= 1;
  const tagged = step >= 2;
  const sent = step >= 3;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="New message" bodyClassName="p-0">
          <div className="divide-y divide-white/[0.06] text-[12px]">
            <div className="flex items-center gap-3 px-5 py-2.5">
              <span className="w-12 text-slate-400">To</span>
              <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-slate-200">
                Priya Shah <span className="font-mono text-[10.5px] text-slate-400">priya@northwind.example</span>
              </span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5">
              <span className="w-12 text-slate-400">Subject</span>
              <Typed text="Your design systems talk, and a question" typing={step === 0} className="min-w-0 truncate font-medium text-white" />
            </div>
          </div>

          {/* The body writes in once the subject is typed, then stays for the rest of the loop */}
          <motion.div
            key={fresh ? "fresh" : "stay"}
            initial={fresh ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: fresh ? 1.05 : 0 }}
            className="space-y-2.5 px-5 py-4 text-[12px] leading-relaxed text-slate-300"
          >
            <p>Hi Priya,</p>
            <div
              className={`relative -mx-3 rounded-lg border px-3 py-2 transition-colors duration-500 ${
                highlight ? "border-accent/40 bg-accent/[0.08] text-slate-100" : "border-transparent"
              }`}
            >
              I watched your talk on rebuilding the{" "}
              <span className={`rounded px-1 transition-colors duration-500 ${highlight ? "bg-accent/25 text-accent-soft" : ""}`}>
                Northwind component library
              </span>{" "}
              and the part on token naming stuck with me.
              <motion.span
                initial={false}
                animate={tagged ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full border border-accent/40 bg-[#0d1322] px-2 py-0.5 text-[10px] font-semibold text-accent-soft"
              >
                <Sparkles className="h-2.5 w-2.5" />
                Personalised
              </motion.span>
            </div>
            <p>
              I am a frontend engineer at Lumen and about to start a similar migration. Would you be open to a 15-minute
              call next week? I would value your advice on what you would do differently.
            </p>
            <p>
              Thanks,
              <br />
              <span className="font-semibold text-white">Jordan Lee</span>
            </p>
          </motion.div>

          <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <Paperclip className="h-3.5 w-3.5" />
              <span className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-medium text-slate-300">
                <Sparkles className="h-3 w-3 text-accent" /> Rewrite
              </span>
              <span>86 words</span>
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

        <Chip show={sent} className="-right-3 -top-4">
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
