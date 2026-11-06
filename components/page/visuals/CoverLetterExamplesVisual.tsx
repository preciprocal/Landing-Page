"use client";

/**
 * Hero illustration for /cover-letter-examples: a finished letter broken into
 * its parts, each paragraph block lighting up in turn with a label in the
 * margin (hook, proof, close). About structure, not writing: the text is
 * already there. Fictional sender (Jordan Lee).
 * Steps: 0 hook, 1 proof, 2 close, 3 all three marked. Reduced motion holds step 3.
 */

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Chip, EASE, Line, Stage, Window, useLoop } from "./Frame";

const PARTS = [
  { label: "Hook", note: "Why this team", lines: ["w-full", "w-10/12"] },
  { label: "Proof", note: "One result, with numbers", lines: ["w-full", "w-11/12", "w-full", "w-3/5"] },
  { label: "Close", note: "Clear next step", lines: ["w-11/12", "w-1/2"] },
];

export default function CoverLetterExamplesVisual() {
  const { ref, step } = useLoop(4, 1700);

  return (
    <div ref={ref}>
      <Stage>
        <Window title="cover-letter.docx" bodyClassName="p-6 pr-28">
          <p className="text-[12px] text-slate-400">Dear hiring team,</p>

          <div className="mt-4 space-y-3">
            {PARTS.map((part, i) => {
              const active = step === i;
              const marked = step === 3 || i <= step;
              return (
                <div key={part.label} className="relative">
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: active || step === 3 ? "rgb(var(--accent) / 0.07)" : "rgba(255,255,255,0)",
                      borderColor: active ? "rgb(var(--accent) / 0.4)" : step === 3 ? "rgb(var(--accent) / 0.18)" : "rgba(255,255,255,0.04)",
                    }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="-mx-3 space-y-2 rounded-xl border px-3 py-3"
                  >
                    {part.lines.map((w, j) => (
                      <motion.div
                        key={j}
                        className={`h-2 rounded-full ${w}`}
                        initial={false}
                        animate={{ backgroundColor: active ? "rgb(var(--accent) / 0.3)" : "rgba(255,255,255,0.07)" }}
                        transition={{ duration: 0.4, delay: active ? j * 0.06 : 0 }}
                      />
                    ))}
                  </motion.div>

                  {/* Margin label, joined to its block by a short rule */}
                  <motion.div
                    initial={false}
                    animate={{ y: "-50%", opacity: marked ? 1 : 0.3, x: marked ? 0 : -4 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute -right-[6.5rem] top-1/2 flex w-[6rem] items-center gap-2"
                  >
                    <span className={`h-px w-3 shrink-0 ${active ? "bg-accent" : "bg-white/20"}`} />
                    <div className="min-w-0">
                      <p className={`flex items-center gap-1 text-[11px] font-semibold ${active ? "text-accent-soft" : "text-slate-300"}`}>
                        {marked && !active && <Check className="h-3 w-3 text-accent" />}
                        {part.label}
                      </p>
                      <p className="text-[9.5px] leading-tight text-slate-500">{part.note}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 space-y-1.5">
            <p className="text-[12px] text-slate-400">Best regards,</p>
            <p className="text-[12px] font-semibold text-white">Jordan Lee</p>
            <Line w="w-24" />
          </div>
        </Window>

        <Chip show={step === 3} className="-bottom-5 -left-4">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Check className="h-3 w-3" />
          </span>
          Three-part structure
        </Chip>
      </Stage>
    </div>
  );
}
