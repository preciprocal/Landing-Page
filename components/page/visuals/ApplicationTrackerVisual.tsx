"use client";

/**
 * Hero illustration for /job-application-tracker: the tracker board in the
 * product. Four columns (Saved, Applied, Interview, Offer), each with real
 * cards; one application, UX Designer at Northwind, glides a column to
 * the right each step, its status line updating, and lands in Offer.
 * Steps: 0..3, the card sits in column `step` (3, in Offer, is the finished state).
 * Roles, companies and dates are fictional examples.
 */

import { LayoutGroup, motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

const COLUMNS = ["Saved", "Applied", "Interview", "Offer"];

type Card = { title: string; company: string; meta: string };

/** Other cards already on the board, per column. */
const STATIC: Card[][] = [
  [
    { title: "Data Analyst", company: "Lumen", meta: "Saved Mon" },
    { title: "PM, Growth", company: "Fernway", meta: "Saved Tue" },
  ],
  [
    { title: "Researcher", company: "Halcyon", meta: "Applied Mon" },
    { title: "Designer II", company: "Lumen", meta: "Applied Tue" },
  ],
  [
    { title: "Design Lead", company: "Kestrel", meta: "Panel Fri" },
    { title: "Analyst II", company: "Halcyon", meta: "Onsite Mon" },
  ],
  [{ title: "UX Writer", company: "Ostra", meta: "Signed" }],
];

/** The moving card's status line in each column. */
const MOVING_META = ["Saved today", "Applied today", "Screen Thu", "Offer received"];

const COLUMN_TONE = ["text-slate-300", "text-slate-300", "text-accent-soft", "text-emerald-300"];

function Logo({ name, on = false }: { name: string; on?: boolean }) {
  return (
    <span
      className={`grid h-4 w-4 shrink-0 place-items-center rounded text-[9.5px] font-bold ${
        on ? "bg-accent text-[#050810]" : "bg-white/[0.08] text-slate-300"
      }`}
    >
      {name[0]}
    </span>
  );
}

export default function ApplicationTrackerVisual() {
  const { ref, step } = useLoop(4, 1900);
  const active = STATIC.reduce((s, c) => s + c.length, 0) + 1;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="app.preciprocal.com/tracker" bodyClassName="p-3">
          <div className="mb-3 flex items-center justify-between px-0.5">
            <div>
              <p className="text-[13px] font-semibold text-white">Applications</p>
              <p className="text-[11px] text-slate-400">
                {active} active · {step === 3 ? "2 offers" : "1 offer"}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-200">
              <Plus className="h-3 w-3" /> Add job
            </span>
          </div>

          <LayoutGroup>
            <div className="grid grid-cols-4 gap-1.5">
              {COLUMNS.map((col, c) => {
                const count = STATIC[c].length + (step === c ? 1 : 0);
                return (
                  <div key={col} className="min-h-[214px] rounded-xl border border-white/[0.06] bg-white/[0.02] p-1.5">
                    <div className="mb-2 flex items-center justify-between px-0.5">
                      <span className={`text-[11px] font-semibold ${COLUMN_TONE[c]}`}>{col}</span>
                      <motion.span
                        key={count}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="grid h-4 min-w-4 place-items-center rounded bg-white/[0.07] px-1 text-[10px] font-medium text-slate-300"
                      >
                        {count}
                      </motion.span>
                    </div>
                    <div className="space-y-1.5">
                      {step === c && (
                        <motion.div
                          layoutId="moving-card"
                          transition={{ duration: 0.7, ease: EASE }}
                          className="rounded-lg border border-accent/45 bg-accent/[0.13] p-2 shadow-[0_10px_30px_-10px_rgb(var(--accent-deep)/0.7)]"
                        >
                          <p className="truncate text-[11px] font-semibold text-white">UX Designer</p>
                          <div className="mt-1 flex items-center gap-1.5">
                            <Logo name="Northwind" on />
                            <p className="truncate text-[10.5px] text-accent-soft">Northwind</p>
                          </div>
                          <p className={`mt-1 truncate text-[10.5px] font-medium ${c === 3 ? "text-emerald-300" : "text-slate-300"}`}>{MOVING_META[c]}</p>
                        </motion.div>
                      )}
                      {STATIC[c].map((card) => (
                        <motion.div
                          layout
                          key={card.title}
                          transition={{ duration: 0.7, ease: EASE }}
                          className="rounded-lg border border-white/[0.07] bg-[#0d1322] p-2"
                        >
                          <p className="truncate text-[11px] font-medium text-slate-200">{card.title}</p>
                          <div className="mt-1 flex items-center gap-1.5">
                            <Logo name={card.company} />
                            <p className="truncate text-[10.5px] text-slate-400">{card.company}</p>
                          </div>
                          <p className="mt-1 truncate text-[10.5px] text-slate-400">{card.meta}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </LayoutGroup>
        </Window>

        <Chip show={step === 3} className="-bottom-4 right-5">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
            <Sparkles className="h-3 w-3" />
          </span>
          Offer from Northwind
        </Chip>
      </Stage>
    </div>
  );
}
