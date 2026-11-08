"use client";

/**
 * Hero illustration for /for/international-students: the user's journey view
 * in the product. A marker moves along four stage names (F-1, OPT, STEM OPT,
 * H-1B), and the task list below swaps to the user's own to-dos for that
 * stage, with a reminder for an upcoming interview beside it.
 * Stage names are plain labels: no dates, fees, day counts or rules are
 * stated here (those live in the page text).
 * Steps: 0 F-1, 1 OPT, 2 STEM OPT, 3 H-1B (finished state, all tasks done).
 * Names and companies are fictional examples.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, MapPin } from "lucide-react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

const STAGES = [
  {
    label: "F-1",
    sub: "Student",
    tasks: ["Polish resume for US roles", "Save 12 target roles", "Book a mock interview"],
  },
  {
    label: "OPT",
    sub: "First role",
    tasks: ["Upload EAD card", "Add employer to tracker", "Prep for Northwind screen"],
  },
  {
    label: "STEM OPT",
    sub: "Growing in the role",
    tasks: ["Save offer letter to documents", "Update profile with new title", "Log your first project wins"],
  },
  {
    label: "H-1B",
    sub: "Long-term plan",
    tasks: ["Keep documents in one folder", "Talk career plans with your manager", "Share your story with juniors"],
  },
];

export default function InternationalStudentsVisual() {
  const { ref, step } = useLoop(STAGES.length, 2200);
  const pct = ((step + 0.5) / STAGES.length) * 100;
  const last = step === STAGES.length - 1;
  const current = STAGES[step];

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/journey" bodyClassName="px-5 pb-5 pt-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-deep text-[11px] font-bold text-white">PS</span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Priya Shah · Where you are</p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="text-[15px] font-semibold text-white"
                >
                  {current.label} <span className="text-[12px] font-normal text-slate-400">· {current.sub}</span>
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Journey: four stages, a marker above */}
          <div className="relative mt-9">
            <motion.div
              className="absolute -top-8 -translate-x-1/2"
              initial={false}
              animate={{ left: `${pct}%` }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[#050810] shadow-[0_0_20px_-2px_rgb(var(--accent)/0.8)]">
                <MapPin className="h-3.5 w-3.5" />
              </div>
              <div className="mx-auto h-2 w-px bg-accent" />
            </motion.div>

            <div className="grid grid-cols-4 gap-1.5">
              {STAGES.map((s, i) => (
                <div key={s.label}>
                  <div className="relative h-2 overflow-hidden rounded-full bg-white/[0.07]">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-deep to-accent"
                      initial={false}
                      animate={{ width: i < step || (last && i === step) ? "100%" : i === step ? "50%" : "0%" }}
                      transition={{ duration: 0.8, ease: EASE }}
                    />
                  </div>
                  <p className={`mt-2 text-center text-[11.5px] font-semibold transition-colors duration-500 ${i <= step ? "text-accent-soft" : "text-slate-400"}`}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* The user's tasks for this stage */}
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Your {current.label} tasks</p>
              <span className={`text-[10.5px] font-medium ${last ? "text-emerald-300" : "text-slate-400"}`}>
                {last ? "All done" : "2 of 3 done"}
              </span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-2.5 space-y-2"
              >
                {current.tasks.map((t, i) => {
                  const ok = last || i < 2;
                  return (
                    <li key={t} className="flex items-center gap-2.5">
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-[5px] border ${
                          ok ? "border-accent/60 bg-accent/25 text-accent-soft" : "border-white/20 bg-white/[0.02]"
                        }`}
                      >
                        {ok && <Check className="h-2.5 w-2.5" />}
                      </span>
                      <span className={`flex-1 truncate text-[12px] ${ok ? "text-slate-200" : "text-white"}`}>{t}</span>
                      {!ok && <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent-soft">Next</span>}
                    </li>
                  );
                })}
              </motion.ul>
            </AnimatePresence>
          </div>
        </Window>

        {/* Reminder card */}
        <Chip show={step >= 1} className="-right-3 top-[56px] !py-2">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-accent/15 text-accent">
            <Bell className="h-3 w-3" />
          </span>
          Northwind screen
          <span className="text-[11px] font-normal text-slate-400">Thu, 2 PM</span>
        </Chip>
      </Stage>
    </div>
  );
}
