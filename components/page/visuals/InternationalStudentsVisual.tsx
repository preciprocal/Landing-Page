"use client";

/**
 * Hero illustration for /for/international-students: a work-authorization
 * timeline (F-1, OPT, STEM OPT, H-1B) with a marker moving along it and a
 * small reminder card. Labels only; no dates or rules stated as facts.
 * Steps: 0 F-1, 1 OPT, 2 STEM OPT, 3 H-1B (finished state).
 */

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { Chip, EASE, Line, Stage, Window, useLoop } from "./Frame";

const STAGES = [
  { label: "F-1", sub: "Student status" },
  { label: "OPT", sub: "Practical training" },
  { label: "STEM OPT", sub: "Extension" },
  { label: "H-1B", sub: "Work visa" },
];

export default function InternationalStudentsVisual() {
  const { ref, step } = useLoop(STAGES.length, 1800);
  const pct = ((step + 0.5) / STAGES.length) * 100;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="Work authorization timeline" bodyClassName="px-5 pb-6 pt-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Where you are</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mt-1 text-lg font-semibold text-white"
            >
              {STAGES[step].label} <span className="text-sm font-normal text-slate-400">· {STAGES[step].sub}</span>
            </motion.p>
          </AnimatePresence>

          {/* Timeline: four segments, a marker above */}
          <div className="relative mt-10">
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
                  <div className="relative h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-deep to-accent"
                      initial={false}
                      animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
                      transition={{ duration: 0.8, ease: EASE }}
                    />
                  </div>
                  <p className={`mt-2.5 text-center font-mono text-[11px] transition-colors duration-500 ${i <= step ? "text-accent-soft" : "text-slate-600"}`}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist placeholder */}
          <div className="mt-6 space-y-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            {["w-3/4", "w-2/3", "w-1/2"].map((w, i) => (
              <div key={w} className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-[4px] border transition-colors duration-500 ${i < step ? "border-accent/60 bg-accent/30" : "border-white/15"}`} />
                <Line w={w} />
              </div>
            ))}
          </div>
        </Window>

        {/* Reminder card */}
        <Chip show={step >= 1} className="-right-6 top-16 !flex-col !items-start !gap-1 !px-3.5 !py-3">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-soft">
            <CalendarDays className="h-3.5 w-3.5" /> Reminder
          </span>
          <span className="text-[12px] text-white">Check your next step</span>
          <span className="text-[10px] font-normal text-slate-400">Review your timeline</span>
        </Chip>
      </Stage>
    </div>
  );
}
