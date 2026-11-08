"use client";

/**
 * Hero illustration for /cover-letter-examples: a finished example letter
 * broken into its parts. Each paragraph lights up in turn with a label in the
 * margin (hook, proof, close). About structure, not writing: the text is
 * already there.
 * Steps: 0 hook, 1 proof, 2 close, 3 all three marked. Reduced motion holds step 3.
 * The sender, companies and numbers are fictional examples.
 */

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

const PARTS: { label: string; note: string; text: ReactNode }[] = [
  {
    label: "Hook",
    note: "Why this team",
    text: <>Northwind&apos;s checkout is the one I recommend to friends, and I would love to help make it even faster.</>,
  },
  {
    label: "Proof",
    note: "One result, with numbers",
    text: (
      <>
        At Lumen I rebuilt our signup flow in React and ran weekly A/B tests. Drop-off fell by 18% in one quarter, and the
        pattern now ships in three products.
      </>
    ),
  },
  {
    label: "Close",
    note: "A clear next step",
    text: <>Could we find 20 minutes next week? I would be glad to walk you through the redesign.</>,
  },
];

export default function CoverLetterExamplesVisual() {
  const { ref, step } = useLoop(4, 1700);

  return (
    <div ref={ref}>
      <Stage>
        <Window title="cover-letter-example.docx" bodyClassName="p-5 pr-[7.5rem]">
          <p className="text-[12px] text-slate-300">Dear Northwind hiring team,</p>

          <div className="mt-3 space-y-2">
            {PARTS.map((part, i) => {
              const active = step === i;
              const marked = step === 3 || i <= step;
              return (
                <div key={part.label} className="relative">
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: active || step === 3 ? "rgb(var(--accent) / 0.07)" : "rgba(255,255,255,0)",
                      borderColor: active ? "rgb(var(--accent) / 0.4)" : step === 3 ? "rgb(var(--accent) / 0.18)" : "rgba(255,255,255,0.05)",
                    }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="-mx-3 rounded-xl border px-3 py-2.5"
                  >
                    <p className={`text-[11.5px] leading-relaxed transition-colors duration-500 ${active ? "text-white" : "text-slate-300"}`}>
                      {part.text}
                    </p>
                  </motion.div>

                  {/* Margin label, joined to its block by a short rule */}
                  <motion.div
                    initial={false}
                    animate={{ y: "-50%", opacity: marked ? 1 : 0.55, x: marked ? 0 : -4 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute -right-[7rem] top-1/2 flex w-[6.25rem] items-center gap-2"
                  >
                    <span className={`h-px w-3 shrink-0 ${active ? "bg-accent" : "bg-white/20"}`} />
                    <div className="min-w-0">
                      <p className={`flex items-center gap-1 text-[12px] font-semibold ${active ? "text-accent-soft" : "text-slate-200"}`}>
                        {marked && !active && <Check className="h-3 w-3 text-accent" />}
                        {part.label}
                      </p>
                      <p className="text-[10.5px] leading-tight text-slate-400">{part.note}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 text-[12px] leading-relaxed">
            <p className="text-slate-300">Best regards,</p>
            <p className="font-semibold text-white">Jordan Lee</p>
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
