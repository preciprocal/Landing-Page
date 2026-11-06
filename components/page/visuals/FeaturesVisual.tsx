"use client";

/**
 * Hero illustration for /features: the tools as nodes orbiting one search,
 * lit up a stage at a time as the search moves forward.
 * Steps: 0 filter, 1 reach a human, 2 interview, 3 stay in control (all lit).
 */

import { AnimatePresence, motion } from "framer-motion";
import { EASE, PulseDot, Stage, useLoop } from "./Frame";

const STAGES = ["Get past the filter", "Reach an actual human", "Win the interview", "Stay in control of it"];

const r2 = (n: number) => Math.round(n * 100) / 100;

const NODES = [
  { label: "Resume score", stage: 0, a: -67.5 },
  { label: "Tailoring", stage: 0, a: -22.5 },
  { label: "Cover letter", stage: 1, a: 22.5 },
  { label: "Contacts", stage: 1, a: 67.5 },
  { label: "Mock interview", stage: 2, a: 112.5 },
  { label: "Predictor", stage: 2, a: 157.5 },
  { label: "Tracker", stage: 3, a: 202.5 },
  { label: "Extension", stage: 3, a: 247.5 },
].map((n) => ({
  ...n,
  x: r2(50 + 35 * Math.cos((n.a * Math.PI) / 180)),
  y: r2(46 + 34 * Math.sin((n.a * Math.PI) / 180)),
}));

const HUB = { x: 50, y: 46 };

export default function FeaturesVisual() {
  const { ref, step, reduce } = useLoop(4, 1900);

  return (
    <div ref={ref}>
      <Stage>
        <div className="relative aspect-[1/0.95] w-full overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0a0f1c]/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
          <div
            className="absolute inset-0 [mask-image:radial-gradient(circle_at_50%_46%,black,transparent_75%)]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          {/* Orbit rings */}
          <div
            className="absolute aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 animate-[spin_70s_linear_infinite] rounded-full border border-dashed border-white/[0.08]"
            style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
          />
          <div
            className="absolute aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15"
            style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
          />

          {/* Spokes from the hub to every tool */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {NODES.map((n) => {
              const on = n.stage === step;
              const done = n.stage < step;
              return (
                <motion.line
                  key={n.label}
                  x1={HUB.x}
                  y1={HUB.y}
                  x2={n.x}
                  y2={n.y}
                  vectorEffect="non-scaling-stroke"
                  strokeWidth={on ? 1.5 : 1}
                  initial={false}
                  animate={{
                    stroke: on ? "rgb(var(--accent) / 0.75)" : done ? "rgb(var(--accent) / 0.3)" : "rgba(255,255,255,0.08)",
                  }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              );
            })}
          </svg>

          {/* A pulse travelling out to the tools of the current stage */}
          {!reduce &&
            NODES.filter((n) => n.stage === step).map((n) => (
              <motion.span
                key={`${step}-${n.label}`}
                className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgb(var(--accent))]"
                initial={{ left: `${HUB.x}%`, top: `${HUB.y}%`, opacity: 0 }}
                animate={{ left: `${n.x}%`, top: `${n.y}%`, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.1, ease: EASE }}
              />
            ))}

          {/* Hub */}
          <div
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-2xl border border-accent/30 bg-[#0d1322] px-4 py-3 shadow-[0_0_40px_-8px_rgb(var(--accent-deep)/0.6)]"
            style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
          >
            <span className="flex items-center gap-2 text-[12px] font-semibold text-white">
              <PulseDot />
              Your search
            </span>
            <span className="font-mono text-[10px] text-slate-500">Stage 0{step + 1} of 04</span>
          </div>

          {/* Tool nodes */}
          {NODES.map((n) => {
            const on = n.stage === step;
            const done = n.stage < step;
            return (
              <div
                key={n.label}
                className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-[color,background-color,border-color,box-shadow] duration-500 ${
                  on
                    ? "border-accent/50 bg-accent/15 text-white shadow-[0_8px_24px_-8px_rgb(var(--accent-deep)/0.7)]"
                    : done
                      ? "border-accent/25 bg-[#0d1322] text-slate-200"
                      : "border-white/[0.09] bg-[#0d1322] text-slate-500"
                }`}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                {n.label}
              </div>
            );
          })}

          {/* Current stage caption */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#0d1322]/95 px-3 py-1.5 text-[11px] text-slate-300"
              >
                <span className="font-mono text-accent-soft">0{step + 1}</span>
                {STAGES[step]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Stage>
    </div>
  );
}
