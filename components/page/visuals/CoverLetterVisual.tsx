"use client";

/**
 * Hero illustration for /cover-letter-generator: a letter being written line
 * by line in a document window while specifics from the job post card beside
 * it are highlighted and pulled into the text, ending with a signed draft.
 * Steps: 0 greeting, 1 the first specific pulled in, 2 the second, 3 the
 * closing line, the third specific and a done chip.
 * Names, companies and the role are fictional examples.
 */

import { motion } from "framer-motion";
import { Check, FileText } from "lucide-react";
import type { ReactNode } from "react";
import { Chip, EASE, SURFACE, Stage, Window, useLoop } from "./Frame";

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
          <div className={`mt-10 w-[164px] shrink-0 p-3.5 ${SURFACE}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Job post</p>
            <p className="mt-1.5 text-[12.5px] font-semibold leading-snug text-white">Product Designer, Atlas</p>
            <p className="text-[10.5px] text-slate-400">Northwind · Hybrid</p>
            <p className="mt-3 text-[10.5px] font-medium text-slate-400">You will</p>
            <ul className="mt-1.5 space-y-2 text-[11px] leading-snug text-slate-300">
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
                <FileText className="h-3 w-3" /> northwind-letter.docx
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
            <motion.div
              initial={false}
              animate={{ opacity: step >= 3 ? 1 : 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: step >= 3 ? 0.5 : 0 }}
              className="mt-4 text-[13px] leading-relaxed text-slate-300"
            >
              <p>Best regards,</p>
              <p className="font-semibold text-white">Jordan Lee</p>
            </motion.div>
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
