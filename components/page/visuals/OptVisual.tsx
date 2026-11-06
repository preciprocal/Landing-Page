"use client";

/**
 * Hero illustration for /opt: a calm application timeline. A marker moves
 * along four generic stages (filing window, receipt, review, approval), the
 * status line underneath follows it, and an approval card slides in at the end.
 * Labels are generic on purpose: no dates, fees or rules are stated here.
 * Steps: 0 filing window, 1 receipt, 2 review, 3 approved.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Check, FileText, Inbox, Search, ShieldCheck } from "lucide-react";
import { Chip, EASE, Line, PulseDot, Stage, Window, useLoop } from "./Frame";

const STAGES = [
  { label: "Filing window", icon: FileText, status: "Preparing the application" },
  { label: "Receipt", icon: Inbox, status: "Receipt notice received" },
  { label: "Review", icon: Search, status: "Case under review" },
  { label: "Approval", icon: ShieldCheck, status: "Case approved" },
] as const;

/** The calendar strip: 21 day cells with an open window band across the middle. */
const CELLS = Array.from({ length: 21 }, (_, i) => i);
const WINDOW_START = 5;
const WINDOW_END = 15;

export default function OptVisual() {
  const { ref, step } = useLoop(4, 1900);
  const current = STAGES[step];
  const Icon = current.icon;
  const done = step === 3;
  // Marker position across the filing window during step 0, then parked at its end.
  const markerCell = step === 0 ? WINDOW_START + 3 : WINDOW_END - 2;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="OPT application · status">
          {/* Stage track */}
          <div className="relative">
            <div className="absolute left-[12.5%] right-[12.5%] top-4 h-px bg-white/[0.08]" />
            <motion.div
              className="absolute left-[12.5%] right-[12.5%] top-4 h-px origin-left bg-gradient-to-r from-accent to-accent-2"
              initial={false}
              animate={{ scaleX: step / 3 }}
              transition={{ duration: 0.8, ease: EASE }}
            />
            <ol className="relative grid grid-cols-4">
              {STAGES.map((s, i) => {
                const reached = i <= step;
                const active = i === step;
                const StageIcon = s.icon;
                return (
                  <li key={s.label} className="flex flex-col items-center gap-2 text-center">
                    <motion.span
                      initial={false}
                      animate={{ scale: active ? 1.08 : 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className={`grid h-8 w-8 place-items-center rounded-full border transition-colors duration-500 ${
                        reached ? "border-accent/50 bg-[#0d1830] text-accent-soft" : "border-white/10 bg-[#0a0f1c] text-slate-600"
                      } ${active ? "shadow-[0_0_0_4px_rgb(var(--accent)/0.12)]" : ""}`}
                    >
                      {i < step ? <Check className="h-3.5 w-3.5" /> : <StageIcon className="h-3.5 w-3.5" />}
                    </motion.span>
                    <span className={`text-[10px] font-medium transition-colors duration-500 ${reached ? "text-slate-300" : "text-slate-600"}`}>
                      {s.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Calendar strip with the open filing window */}
          <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Filing window</p>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-400">
                {step === 0 ? <PulseDot className="scale-75" /> : <Check className="h-3 w-3 text-accent" />}
                {step === 0 ? "Open" : "Filed"}
              </span>
            </div>
            <div className="relative">
              <div className="grid grid-cols-[repeat(21,minmax(0,1fr))] gap-[3px]">
                {CELLS.map((c) => {
                  const inWindow = c >= WINDOW_START && c <= WINDOW_END;
                  return (
                    <span
                      key={c}
                      className={`h-5 rounded-[3px] ${inWindow ? "bg-accent/[0.16]" : "bg-white/[0.04]"}`}
                    />
                  );
                })}
              </div>
              {/* Marker */}
              <motion.span
                className="absolute -top-1.5 h-8 w-[2px] rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent)/0.7)]"
                initial={false}
                animate={{ left: `${((markerCell + 0.5) / CELLS.length) * 100}%` }}
                transition={{ duration: 1.1, ease: EASE }}
              />
            </div>
          </div>

          {/* Status line */}
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0b1222] px-4 py-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={current.status}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="text-[12px] font-semibold text-white"
                >
                  {current.status}
                </motion.p>
              </AnimatePresence>
              <Line w="w-2/3" className="mt-2" />
            </div>
          </div>
        </Window>

        <Chip show={step >= 1} className="-left-6 top-24">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Inbox className="h-3 w-3" />
          </span>
          Receipt notice
        </Chip>

        {/* Approval card */}
        <AnimatePresence>
          {done && (
            <motion.div
              key="card"
              initial={{ opacity: 0, x: 16, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: -2 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="absolute -bottom-8 -right-6 w-52 rounded-xl border border-accent/30 bg-gradient-to-br from-[#0f1d33] to-[#0a1222] p-3.5 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.85)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-accent-soft">Employment card</p>
                <span className="grid h-4 w-4 place-items-center rounded-full bg-accent/20 text-accent">
                  <Check className="h-2.5 w-2.5" />
                </span>
              </div>
              <div className="mt-3 flex gap-3">
                <div className="h-11 w-9 shrink-0 rounded-md bg-gradient-to-br from-accent-deep/40 to-accent-deep-2/30" />
                <div className="min-w-0 flex-1 space-y-1.5 pt-0.5">
                  <p className="text-[11px] font-semibold text-white">Jordan Lee</p>
                  <Line w="w-full" />
                  <Line w="w-3/4" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Stage>
    </div>
  );
}
