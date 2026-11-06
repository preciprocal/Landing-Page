"use client";

/**
 * Hero illustration for the /alternatives/[competitor] pages: a side-by-side
 * comparison sheet. Feature rows are placeholder lines (no real features or
 * brands), and the checks in the Preciprocal column draw in one row at a time.
 * The other column is labelled generically "Alternative" and stays neutral.
 * Steps: 0 empty, 1..5 one more check drawn each step (5 is the finished state).
 */

import { motion } from "framer-motion";
import { EASE, Line, Stage, Window, useLoop } from "./Frame";

const ROWS = ["w-24", "w-32", "w-20", "w-28", "w-24"];
/** Which rows show a neutral mark on the Alternative side (purely decorative). */
const OTHER = [true, false, true, false, false];

function DrawnCheck({ on }: { on: boolean }) {
  return (
    <motion.span
      initial={false}
      animate={{ backgroundColor: on ? "rgb(var(--accent) / 0.16)" : "rgba(255,255,255,0.03)" }}
      transition={{ duration: 0.4, ease: EASE }}
      className="grid h-6 w-6 place-items-center rounded-full border border-white/[0.06]"
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
  const { ref, step } = useLoop(6, 900);

  return (
    <div ref={ref}>
      <Stage>
        <Window title="side-by-side comparison" bodyClassName="p-0">
          {/* Column heads */}
          <div className="grid grid-cols-[minmax(0,1fr)_88px_88px] border-b border-white/[0.06] text-[10px] font-semibold uppercase tracking-[0.16em]">
            <span className="px-5 py-3 text-slate-500">Feature</span>
            <span className="relative bg-accent/[0.07] px-2 py-3 text-center text-accent-soft">
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent to-accent-2" />
              Preciprocal
            </span>
            <span className="px-2 py-3 text-center text-slate-500">Alternative</span>
          </div>

          {ROWS.map((w, i) => {
            const on = step > i;
            return (
              <div
                key={i}
                className="grid grid-cols-[minmax(0,1fr)_88px_88px] items-center border-b border-white/[0.04] last:border-b-0"
              >
                <div className="px-5 py-3.5">
                  <Line w={w} />
                </div>
                <div className="grid h-full place-items-center bg-accent/[0.04] py-3">
                  <DrawnCheck on={on} />
                </div>
                <div className="grid place-items-center py-3">
                  {OTHER[i] ? (
                    <span className="grid h-6 w-6 place-items-center rounded-full border border-white/[0.06] bg-white/[0.03]">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                        <path d="M3.5 8.5l3 3 6-7" stroke="rgb(148 163 184)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  ) : (
                    <span className="h-px w-3 rounded-full bg-slate-600" />
                  )}
                </div>
              </div>
            );
          })}
        </Window>
      </Stage>
    </div>
  );
}
