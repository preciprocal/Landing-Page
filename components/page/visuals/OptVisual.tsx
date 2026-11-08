"use client";

/**
 * Hero illustration for /opt: the OPT workspace inside the product. A status
 * stepper (Preparing, Filed, In review, Approved) advances, the user's own
 * task list checks off beside it, their documents fill in, and the finished
 * state shows the EAD card uploaded and an interview prepped.
 * Only status labels and the user's own tasks appear here: no dates, fees,
 * day counts or rules are stated (those live in the page text).
 * Steps: 0 preparing, 1 filed, 2 in review, 3 approved (finished state).
 * Names, files and companies are fictional examples.
 */

import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Check, FileText, IdCard } from "lucide-react";
import { Chip, EASE, PulseDot, Stage, Window, useLoop } from "./Frame";

const STATUS = ["Preparing", "Filed", "In review", "Approved"];

/** The user's own to-do list; task i is done once the status reaches step i. */
const TASKS = ["Gather documents", "Submit application", "Prep for Northwind screen", "Upload EAD card"];

/** Files in the user's document folder; each appears once the status reaches `at`. */
const DOCS = [
  { name: "passport_scan.pdf", at: 0 },
  { name: "form_i20.pdf", at: 0 },
  { name: "receipt_notice.pdf", at: 1 },
  { name: "ead_card.jpg", at: 3 },
];

export default function OptVisual() {
  const { ref, step } = useLoop(4, 2100);
  const done = step === 3;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/opt" bodyClassName="p-5">
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-deep text-[11px] font-bold text-white">JL</span>
              <div>
                <p className="text-[13px] font-semibold text-white">OPT application</p>
                <p className="text-[11px] text-slate-400">Jordan Lee · Data Analyst search</p>
              </div>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={step}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                  done ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-accent/30 bg-accent/10 text-accent-soft"
                }`}
              >
                {done ? <BadgeCheck className="h-3.5 w-3.5" /> : <PulseDot className="scale-75" />}
                {STATUS[step]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Status stepper */}
          <div className="mt-4 grid grid-cols-4 gap-1.5">
            {STATUS.map((s, i) => (
              <div key={s}>
                <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
                    initial={false}
                    animate={{ width: i <= step ? "100%" : "0%" }}
                    transition={{ duration: 0.7, ease: EASE }}
                  />
                </div>
                <p className={`mt-1.5 text-[10.5px] font-medium transition-colors duration-500 ${i <= step ? "text-slate-200" : "text-slate-500"}`}>{s}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {/* Tasks */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Your tasks</p>
                <span className="text-[10.5px] font-medium text-slate-400">{step + 1} of {TASKS.length}</span>
              </div>
              <ul className="mt-2.5 space-y-2">
                {TASKS.map((t, i) => {
                  const ok = i <= step;
                  return (
                    <li key={t} className="flex items-center gap-2">
                      <motion.span
                        initial={false}
                        animate={{ scale: i === step ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-[5px] border transition-colors duration-500 ${
                          ok ? "border-accent/60 bg-accent/25 text-accent-soft" : "border-white/20 bg-white/[0.02]"
                        }`}
                      >
                        {ok && <Check className="h-2.5 w-2.5" />}
                      </motion.span>
                      <span className={`truncate text-[11.5px] transition-colors duration-500 ${ok ? "text-slate-200" : "text-slate-400"}`}>{t}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Documents */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Documents</p>
              <ul className="mt-2.5 space-y-2">
                {DOCS.map((d) => {
                  const has = step >= d.at;
                  return (
                    <li key={d.name} className="flex items-center gap-2">
                      <FileText className={`h-3.5 w-3.5 shrink-0 transition-colors duration-500 ${has ? "text-accent" : "text-slate-500"}`} />
                      <span className={`min-w-0 flex-1 truncate font-mono text-[10.5px] transition-colors duration-500 ${has ? "text-slate-200" : "text-slate-500"}`}>
                        {d.name}
                      </span>
                      <span className={`shrink-0 text-[10px] font-medium ${has ? "text-emerald-300" : "text-slate-500"}`}>{has ? "Saved" : "To add"}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Window>

        <Chip show={step >= 1 && step < 3} className="-left-3 top-[118px]">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <FileText className="h-3 w-3" />
          </span>
          Receipt notice saved
        </Chip>

        <Chip show={done} className="-bottom-4 -right-3">
          <span className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-400/15 text-emerald-300">
            <IdCard className="h-3.5 w-3.5" />
          </span>
          <span className="flex flex-col leading-tight">
            EAD card uploaded
            <span className="text-[10.5px] font-normal text-slate-400">Added to your documents</span>
          </span>
        </Chip>
      </Stage>
    </div>
  );
}
