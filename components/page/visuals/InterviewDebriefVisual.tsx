"use client";

/**
 * Hero illustration for /interview-debrief: the debrief screen right after
 * an onsite. A guided prompt is answered while recall is fresh, the notes
 * are tagged by round, and they sort into what went well and what to work
 * on, ending with a suggested next step.
 * Steps: 0 writing the answer, 1 tagging by round, 2 a new "went well" item,
 * 3 a new "work on" item and the next step (finished state).
 * The company, rounds and notes are fictional examples.
 */

import { motion } from "framer-motion";
import { ArrowUpRight, Check, PenLine, Plus } from "lucide-react";
import { Chip, EASE, PulseDot, Stage, Window, useLoop } from "./Frame";

const WELL = [
  { text: "Clear STAR story on the launch", tag: "Behavioral", at: 0 },
  { text: "Talked through brute force before optimising", tag: "Coding", at: 2 },
];
const WORK = [
  { text: "Rambled on the conflict question", tag: "Behavioral", at: 0 },
  { text: "Ran short on time for the follow-up", tag: "Coding", at: 3 },
];

const NOTE = [
  "Merge overlapping intervals, then do it in place.",
  "Explained brute force first, ran low on time for the follow-up.",
];

function Item({ text, tag, show, fresh, good }: { text: string; tag: string; show: boolean; fresh: boolean; good: boolean }) {
  if (!show)
    return (
      <li className="flex min-h-[62px] items-center gap-2 rounded-lg border border-dashed border-white/[0.1] px-2.5 text-[11px] text-slate-400">
        <PulseDot className="scale-75" /> Sorting notes from today
      </li>
    );
  return (
    <motion.li
      initial={fresh ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`min-h-[62px] rounded-lg border p-2.5 transition-colors duration-500 ${fresh ? "border-accent/35 bg-accent/[0.07]" : "border-white/[0.07] bg-white/[0.025]"}`}
    >
      <div className="flex items-start gap-2">
        <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${good ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"}`}>
          {good ? <Check className="h-2.5 w-2.5" /> : <Plus className="h-2.5 w-2.5" />}
        </span>
        <div className="min-w-0">
          <p className="text-[11.5px] leading-snug text-slate-100">{text}</p>
          <span className="mt-1.5 inline-block rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-slate-300">{tag}</span>
        </div>
      </div>
    </motion.li>
  );
}

export default function InterviewDebriefVisual() {
  const { ref, step } = useLoop(4, 1900);
  const writing = step === 0;
  const tagging = step === 1;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/debrief/northwind-onsite" bodyClassName="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-white">Onsite debrief</p>
              <p className="text-[11px] text-slate-400">Software Engineer, Northwind · 4 rounds today</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10.5px] font-semibold text-accent-soft">
              {writing ? <PulseDot className="scale-75" /> : <Check className="h-3 w-3" />}
              {writing ? "Writing" : tagging ? "Tagging by round" : step === 2 ? "Sorting" : "Sorted"}
            </span>
          </div>

          {/* Guided prompt, answered while recall is fresh */}
          <div className={`mt-3 rounded-xl border p-3 transition-colors duration-500 ${writing ? "border-accent/35 bg-accent/[0.06]" : "border-white/[0.07] bg-white/[0.025]"}`}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
                <PenLine className="h-3.5 w-3.5" />
              </span>
              <p className="min-w-0 flex-1 text-[12px] font-semibold text-white">What did they ask in the coding round?</p>
              <span className="text-[10.5px] text-slate-400">2 of 5</span>
            </div>
            <p className="mt-2 pl-[38px] text-[11.5px] leading-relaxed text-slate-300">
              {NOTE.map((s, i) => (
                <motion.span
                  key={`${s}-${writing ? "w" : "d"}`}
                  initial={writing ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE, delay: writing ? 0.2 + i * 0.6 : 0 }}
                >
                  {s}{" "}
                </motion.span>
              ))}
              {tagging && (
                <span className="ml-1 rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent-soft">Coding</span>
              )}
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300/90">Went well</p>
              <ul className="space-y-2">
                {WELL.map((it) => (
                  <Item key={it.text} text={it.text} tag={it.tag} good show={step >= it.at} fresh={it.at > 0 && step === it.at} />
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300/90">Work on</p>
              <ul className="space-y-2">
                {WORK.map((it) => (
                  <Item key={it.text} text={it.text} tag={it.tag} good={false} show={step >= it.at} fresh={it.at > 0 && step === it.at} />
                ))}
              </ul>
            </div>
          </div>

        </Window>

        <Chip show={step === 3} className="-bottom-5 left-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <ArrowUpRight className="h-3 w-3" />
          </span>
          Next: a timed coding mock before Friday
        </Chip>
      </Stage>
    </div>
  );
}
