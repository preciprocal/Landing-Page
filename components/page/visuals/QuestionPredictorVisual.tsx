"use client";

/**
 * Hero illustration for /interview-question-predictor: the result screen.
 * A ranked list of predicted questions for one job posting, each with a
 * category tag and a likelihood meter, and the top question opening up to
 * show the phrase in the posting that it came from.
 * Steps: 0 reading the posting, 1 likelihood meters fill, 2 the top question
 * is highlighted, 3 its source phrase is shown (finished state).
 * The role, company and questions are fictional examples.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Check, Quote, Sparkles } from "lucide-react";
import { Chip, EASE, PulseDot, Stage, Window, useLoop } from "./Frame";

const QUESTIONS = [
  { q: "Tell me about a time you led a cross-functional launch.", tag: "Behavioral", level: "Very likely", pct: 0.92 },
  { q: "Walk me through how you would size a new market.", tag: "Role-specific", level: "Likely", pct: 0.74 },
  { q: "Which metric would you watch after shipping a pricing change?", tag: "Analytics", level: "Likely", pct: 0.66 },
  { q: "How do you prioritise when two teams need you at once?", tag: "Situational", level: "Possible", pct: 0.48 },
];

export default function QuestionPredictorVisual() {
  const { ref, step } = useLoop(4, 1800);
  const reading = step === 0;
  const filled = step >= 1;
  const focused = step >= 2;
  const sourced = step >= 3;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/question-predictor" bodyClassName="p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white">Predicted questions</p>
              <p className="truncate text-[11px] text-slate-400">Product Manager, Lumen · from the job posting</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10.5px] font-semibold text-accent-soft">
              {reading ? (
                <>
                  <PulseDot className="scale-75" /> Reading posting
                </>
              ) : (
                <>
                  <Sparkles className="h-3 w-3" /> Ranked by likelihood
                </>
              )}
            </span>
          </div>

          <ol className="mt-3.5 space-y-2">
            {QUESTIONS.map((c, i) => {
              const top = i === 0;
              const lit = top && focused;
              return (
                <li
                  key={c.q}
                  className={`rounded-xl border px-3 py-2.5 transition-colors duration-500 ${
                    lit ? "border-accent/35 bg-accent/[0.07]" : "border-white/[0.07] bg-white/[0.025]"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`mt-px grid h-5 w-5 shrink-0 place-items-center rounded-md text-[10.5px] font-bold ${
                        top ? "bg-accent/20 text-accent-soft" : "bg-white/[0.06] text-slate-300"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-medium leading-snug text-white">{c.q}</p>
                      <div className="mt-1.5 flex items-center gap-2.5">
                        <span className="w-[78px] shrink-0 text-[10.5px] text-slate-400">{c.tag}</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                          <motion.div
                            className={`h-full origin-left rounded-full ${top ? "bg-gradient-to-r from-accent-deep to-accent" : "bg-gradient-to-r from-accent-deep/70 to-accent/60"}`}
                            initial={false}
                            animate={{ scaleX: filled ? c.pct : 0.04 }}
                            transition={{ duration: 0.8, ease: EASE, delay: filled ? i * 0.1 : 0 }}
                          />
                        </div>
                        <span className={`w-[62px] shrink-0 text-right text-[10.5px] font-semibold ${top ? "text-accent-soft" : "text-slate-300"}`}>
                          {filled ? c.level : "Scoring"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {top && (
                    <AnimatePresence initial={false}>
                      {sourced && (
                        <motion.div
                          key="src"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="ml-[30px] mt-2.5 flex gap-2 rounded-lg border border-white/[0.07] bg-black/20 p-2.5 text-[11px] leading-snug text-slate-300">
                            <Quote className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                            <span>
                              From the posting: &ldquo;You will <span className="rounded bg-accent/15 px-1 text-accent-soft">partner with engineering and design</span> to ship new features.&rdquo;
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ol>
        </Window>

        <Chip show={sourced} className="-bottom-5 right-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Check className="h-3 w-3" />
          </span>
          Every question linked to the posting
        </Chip>
      </Stage>
    </div>
  );
}
