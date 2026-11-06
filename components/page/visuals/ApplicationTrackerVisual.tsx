"use client";

/**
 * Hero illustration for /job-application-tracker: a four column board, Saved,
 * Applied, Interview, Offer. One application glides a column to the right each
 * step and the column counts update.
 * Steps: 0..3, the card sits in column `step`.
 */

import { LayoutGroup, motion } from "framer-motion";
import { EASE, Stage, Window, useLoop } from "./Frame";

const COLUMNS = ["Saved", "Applied", "Interview", "Offer"];
/** Other cards already on the board, per column. */
const STATIC: { title: string; company: string }[][] = [
  [
    { title: "Data Analyst", company: "Lumen" },
    { title: "PM, Growth", company: "Fernway" },
  ],
  [
    { title: "UX Researcher", company: "Halcyon" },
    { title: "Designer II", company: "Ostra" },
  ],
  [{ title: "Design Lead", company: "Kestrel" }],
  [],
];

export default function ApplicationTrackerVisual() {
  const { ref, step } = useLoop(4, 1700);

  return (
    <div ref={ref}>
      <Stage>
        <Window title="Applications" bodyClassName="p-3">
          <LayoutGroup>
            <div className="grid grid-cols-4 gap-2">
              {COLUMNS.map((col, c) => {
                const count = STATIC[c].length + (step === c ? 1 : 0);
                return (
                  <div key={col} className="min-h-[220px] rounded-xl border border-white/[0.05] bg-white/[0.015] p-2">
                    <div className="mb-2 flex items-center justify-between px-0.5">
                      <span className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${c === 3 ? "text-accent-soft" : "text-slate-500"}`}>{col}</span>
                      <motion.span
                        key={count}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="grid h-4 min-w-4 place-items-center rounded bg-white/[0.06] px-1 font-mono text-[9px] text-slate-400"
                      >
                        {count}
                      </motion.span>
                    </div>
                    <div className="space-y-1.5">
                      {step === c && (
                        <motion.div
                          layoutId="moving-card"
                          transition={{ duration: 0.7, ease: EASE }}
                          className="rounded-lg border border-accent/40 bg-accent/[0.12] p-2 shadow-[0_10px_30px_-10px_rgb(var(--accent-deep)/0.6)]"
                        >
                          <p className="truncate text-[10px] font-semibold text-white">Product Designer</p>
                          <p className="truncate text-[9px] text-accent-soft/80">Northwind</p>
                        </motion.div>
                      )}
                      {STATIC[c].map((card) => (
                        <motion.div
                          layout
                          key={card.title}
                          transition={{ duration: 0.7, ease: EASE }}
                          className="rounded-lg border border-white/[0.06] bg-[#0d1322] p-2"
                        >
                          <p className="truncate text-[10px] font-medium text-slate-300">{card.title}</p>
                          <p className="truncate text-[9px] text-slate-500">{card.company}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </LayoutGroup>
        </Window>
      </Stage>
    </div>
  );
}
