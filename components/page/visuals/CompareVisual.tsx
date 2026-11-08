"use client";

/**
 * Hero illustration for the /alternatives/[competitor] pages: an "everything
 * in one plan" sheet. Five Preciprocal features check off one row at a time,
 * ending in a summary row with the Pro price.
 *
 * Deliberately no competitor column: this visual is reused on every
 * competitor page, so any marks against "the alternative" would read as a
 * claim about each product, and would be wrong for some of them. The page
 * text carries the verified, competitor-specific comparison.
 * Steps: 0 empty, 1..5 one more check drawn each step (5 is the finished state).
 */

import { motion } from "framer-motion";
import { CalendarDays, FileText, Inbox, Mic, Send } from "lucide-react";
import { EASE, Stage, Window, useLoop } from "./Frame";

const ROWS = [
  { label: "ATS resume scoring", note: "Score and fixes for each posting", Icon: FileText },
  { label: "AI mock interviews", note: "Voice practice with follow-ups", Icon: Mic },
  { label: "Cover letters", note: "Written for the specific role", Icon: Send },
  { label: "Job tracker", note: "Every application, one board", Icon: Inbox },
  { label: "Study planner", note: "A plan built to your interview date", Icon: CalendarDays },
];

function DrawnCheck({ on }: { on: boolean }) {
  return (
    <motion.span
      initial={false}
      animate={{ backgroundColor: on ? "rgb(var(--accent) / 0.18)" : "rgba(255,255,255,0.03)" }}
      transition={{ duration: 0.4, ease: EASE }}
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/[0.08]"
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
        <motion.path
          d="M3.5 8.5l3 3 6-7"
          stroke="rgb(var(--accent-soft))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </svg>
    </motion.span>
  );
}

export default function CompareVisual() {
  const { ref, step } = useLoop(6, 1000);
  const done = Math.min(step, ROWS.length);

  return (
    <div ref={ref}>
      <Stage>
        <Window title="preciprocal.com/pricing" bodyClassName="p-0">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
            <div>
              <p className="text-[13px] font-semibold text-white">Preciprocal Pro</p>
              <p className="text-[11px] text-slate-400">Everything in one plan</p>
            </div>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10.5px] font-semibold text-accent-soft">
              {done} of {ROWS.length} included
            </span>
          </div>

          {ROWS.map(({ label, note, Icon }, i) => {
            const on = step > i;
            return (
              <div key={label} className="flex items-center gap-3 border-b border-white/[0.05] px-5 py-2.5">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors duration-500 ${on ? "bg-accent/15 text-accent" : "bg-white/[0.05] text-slate-400"}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-semibold text-slate-100">{label}</p>
                  <p className="truncate text-[11px] text-slate-400">{note}</p>
                </div>
                <DrawnCheck on={on} />
              </div>
            );
          })}

          <div className="flex items-center justify-between bg-accent/[0.06] px-5 py-3.5">
            <span className="text-[12px] font-medium text-slate-300">All five, one subscription</span>
            <span className="text-[15px] font-bold text-white">
              $9.99<span className="ml-0.5 text-[11px] font-medium text-slate-400">/mo</span>
            </span>
          </div>
        </Window>
      </Stage>
    </div>
  );
}
