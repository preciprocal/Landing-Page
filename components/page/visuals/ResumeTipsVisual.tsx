"use client";

/**
 * Hero illustration for /resume-tips: a resume page with real bullets, where
 * one weak bullet is struck through and rewritten as a strong one, the added
 * words highlighted like a diff, then a chip names the formula.
 * Steps: 0 the weak bullet, 1 flagged and struck, 2 the rewrite appears,
 * 3 the formula callout. Reduced motion holds step 3.
 * Names, companies and numbers are fictional examples.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Check, TriangleAlert } from "lucide-react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

/** The rewritten bullet, split so the added words can be marked. */
const STRONG: { t: string; add?: boolean }[] = [
  { t: "Rebuilt", add: true },
  { t: " the checkout flow " },
  { t: "in React", add: true },
  { t: ", cutting drop-off " },
  { t: "by 18% in one quarter", add: true },
  { t: "." },
];

function Bullet({ children }: { children: string }) {
  return (
    <li className="flex gap-2.5 text-slate-300">
      <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-slate-500" />
      <span>{children}</span>
    </li>
  );
}

export default function ResumeTipsVisual() {
  const { ref, step } = useLoop(4, 1900);
  const struck = step >= 1;
  const rewritten = step >= 2;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="jordan-lee-resume.pdf" bodyClassName="p-6">
          <div className="flex items-end justify-between gap-3 border-b border-white/[0.06] pb-4">
            <div>
              <p className="text-base font-bold tracking-tight text-white">Jordan Lee</p>
              <p className="mt-1 text-[11px] text-slate-400">
                Frontend Engineer · <span className="font-mono">jordan@example.com</span>
              </p>
            </div>
            <p className="text-[11px] text-slate-400">Seattle, WA</p>
          </div>

          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-soft/90">Experience</p>
          <div className="mt-2 flex items-baseline justify-between gap-3">
            <p className="text-[13px] font-semibold text-white">
              Frontend Engineer, <span className="text-slate-300">Northwind Commerce</span>
            </p>
            <p className="text-[11px] text-slate-400">2023 - Present</p>
          </div>

          <ul className="mt-3 space-y-2.5 text-[12px] leading-relaxed">
            <Bullet>Shipped a shared design system used by 4 product teams.</Bullet>

            {/* The bullet being rewritten */}
            <li className="relative -mx-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
              <div className="flex gap-2.5">
                <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-slate-500" />
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
                    className="mt-1 inline-flex items-center gap-1 text-[10.5px] font-medium text-rose-300"
                  >
                    <TriangleAlert className="h-3 w-3" /> Weak: describes a duty, not a result
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
                        <span className="mt-2 block text-slate-100">
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

            <Bullet>Cut page load time by 1.2s by lazy-loading product images.</Bullet>
            <Bullet>Mentored 2 junior engineers through their first launches.</Bullet>
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
