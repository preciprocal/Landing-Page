"use client";

/**
 * Hero illustration for /cover-letter-generator: a letter being written line
 * by line while specifics from the job post beside it are highlighted and
 * pulled into the text.
 * Steps: 0 greeting, 1 the first specific pulled in, 2 the second, 3 the
 * closing line, the third specific and a done chip.
 */

import { motion } from "framer-motion";
import { Check, FileText } from "lucide-react";
import type { ReactNode } from "react";
import { Chip, EASE, Line, Stage, Window, useLoop } from "./Frame";

/** A phrase that lights up in the accent once it has been pulled in. */
function Term({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <motion.span
      initial={false}
      animate={{
        backgroundColor: on ? "rgb(var(--accent) / 0.16)" : "rgba(255,255,255,0)",
        color: on ? "rgb(var(--accent-soft))" : "rgb(203 213 225)",
      }}
      transition={{ duration: 0.45, ease: EASE }}
      className="rounded px-1 py-px"
    >
      {children}
    </motion.span>
  );
}

export default function CoverLetterVisual() {
  const { ref, step } = useLoop(4, 1700);
  const pulled = (n: number) => step >= n;

  const lines: { at: number; node: ReactNode }[] = [
    { at: 0, node: <>Dear Northwind hiring team,</> },
    {
      at: 1,
      node: (
        <>
          Your post asks for someone who can grow a <Term on={pulled(1)}>design system</Term> across products.
        </>
      ),
    },
    {
      at: 2,
      node: (
        <>
          In my capstone I built a component library and ran <Term on={pulled(2)}>accessibility audits</Term> on every screen.
        </>
      ),
    },
    {
      at: 3,
      node: (
        <>
          I would love to bring that care to the <Term on={pulled(3)}>Atlas</Term> team.
        </>
      ),
    },
  ];

  return (
    <div ref={ref}>
      <Stage>
        <div className="flex items-start gap-3">
          {/* The job post the specifics come from */}
          <div className="mt-12 w-40 shrink-0 rounded-xl border border-white/10 bg-[#0d1322]/95 p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Job post</p>
            <p className="mt-1 text-[12px] font-semibold leading-snug text-white">Product Designer, Atlas</p>
            <p className="text-[10px] text-slate-500">Northwind · Hybrid</p>
            <ul className="mt-2.5 space-y-2 text-[11px] leading-snug text-slate-400">
              <li>
                Own and grow our <Term on={pulled(1)}>design system</Term>
              </li>
              <li>
                Lead <Term on={pulled(2)}>accessibility audits</Term>
              </li>
              <li>
                Partner with the <Term on={pulled(3)}>Atlas</Term> squad
              </li>
            </ul>
          </div>

          <Window
            className="min-w-0 flex-1"
            title={
              <span className="inline-flex items-center gap-1.5">
                <FileText className="h-3 w-3" /> cover-letter-northwind.docx
              </span>
            }
          >
            <div className="space-y-3 text-[13px] leading-relaxed text-slate-300">
              {lines.map((l, i) => (
                <motion.p
                  key={i}
                  initial={false}
                  animate={step >= l.at ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  {l.node}
                </motion.p>
              ))}
            </div>
            <div className="mt-5 space-y-2">
              <Line w="w-1/3" />
            </div>
          </Window>
        </div>

        <Chip show={step === 3} className="-top-4 right-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Check className="h-3 w-3" />
          </span>
          Draft ready to edit
        </Chip>
      </Stage>
    </div>
  );
}
