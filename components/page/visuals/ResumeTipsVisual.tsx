"use client";

/**
 * Hero illustration for /resume-tips: a resume page where one weak bullet is
 * struck through and rewritten as a strong one, the added words highlighted
 * like a diff. Fictional resume (Jordan Lee).
 * Steps: 0 the weak bullet, 1 flagged and struck, 2 the rewrite appears,
 * 3 the formula callout. Reduced motion holds step 3.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Chip, EASE, Line, Stage, Window, useLoop } from "./Frame";

/** The rewritten bullet, split so the added words can be marked. */
const STRONG: { t: string; add?: boolean }[] = [
  { t: "Rebuilt", add: true },
  { t: " the checkout flow " },
  { t: "in React", add: true },
  { t: ", cutting drop-off " },
  { t: "by 18% in one quarter", add: true },
  { t: "." },
];

export default function ResumeTipsVisual() {
  const { ref, step } = useLoop(4, 1900);
  const struck = step >= 1;
  const rewritten = step >= 2;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="jordan-lee-resume.pdf" bodyClassName="p-6">
          <div className="border-b border-white/[0.06] pb-4">
            <p className="text-base font-bold tracking-tight text-white">Jordan Lee</p>
            <p className="mt-1 text-[11px] text-slate-500">Frontend Engineer · jordan@example.com</p>
          </div>

          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-soft/90">Experience</p>
          <div className="mt-2 flex items-baseline justify-between gap-3">
            <p className="text-[13px] font-semibold text-white">Northwind Commerce</p>
            <p className="font-mono text-[10px] text-slate-500">2023 to now</p>
          </div>

          <ul className="mt-3 space-y-3 text-[12.5px] leading-relaxed">
            <li className="flex gap-2.5">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-500" />
              <Line w="w-11/12" className="mt-[5px]" />
            </li>

            {/* The bullet being rewritten */}
            <li className="relative -mx-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3">
              <div className="flex gap-2.5">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                <div className="min-w-0 flex-1">
                  <p className="relative inline text-slate-400">
                    Responsible for updating the checkout page.
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-1/2 h-px origin-left bg-rose-400/80"
                      initial={false}
                      animate={{ scaleX: struck ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </p>
                  <motion.p
                    initial={false}
                    animate={{ opacity: struck ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                    className="mt-1 font-mono text-[10px] text-rose-300/90"
                  >
                    Weak: a duty, no result
                  </motion.p>

                  <AnimatePresence initial={false}>
                    {rewritten && (
                      <motion.p
                        key="strong"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <span className="mt-2.5 block text-slate-100">
                          {STRONG.map((part, i) =>
                            part.add ? (
                              <motion.span
                                key={i}
                                initial={{ backgroundColor: "rgb(var(--accent) / 0)" }}
                                animate={{ backgroundColor: "rgb(var(--accent) / 0.18)" }}
                                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                                className="rounded px-0.5 font-medium text-accent-soft underline decoration-accent/50 decoration-dotted underline-offset-[3px]"
                              >
                                {part.t}
                              </motion.span>
                            ) : (
                              <span key={i}>{part.t}</span>
                            )
                          )}
                        </span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </li>

            <li className="flex gap-2.5">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-500" />
              <Line w="w-4/5" className="mt-[5px]" />
            </li>
            <li className="flex gap-2.5">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-500" />
              <Line w="w-2/3" className="mt-[5px]" />
            </li>
          </ul>
        </Window>

        <Chip show={step === 3} className="-bottom-5 -right-4">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Check className="h-3 w-3" />
          </span>
          Verb + scope + result
        </Chip>
      </Stage>
    </div>
  );
}
