"use client";

/**
 * Hero illustration for /about: the story so far as a small constellation.
 * Four stars, one per milestone on the page, joined one after another by a
 * line that draws in as each chapter lights up.
 * Steps: 0 first star, 1 second, 2 third, 3 all four and the closing chip.
 */

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Chip, EASE, Stage, useLoop } from "./Frame";

// Positions in the 480 x 320 viewBox, labels from the page's milestones.
const STARS = [
  { x: 64, y: 248, date: "Early 2024", title: "The reality check", align: "left" },
  { x: 178, y: 150, date: "Mid 2024", title: "Reverse-engineering", align: "left" },
  { x: 302, y: 204, date: "Late 2024", title: "Preciprocal is born", align: "left" },
  { x: 410, y: 84, date: "2025 onwards", title: "Growing with users", align: "right" },
] as const;

// Faint background stars, fixed so server and client agree.
const DUST = [
  [32, 40], [96, 92], [140, 36], [226, 66], [254, 280], [346, 118], [380, 262], [446, 190], [120, 300], [452, 30], [210, 226], [30, 160],
] as const;

export default function AboutVisual() {
  const { ref, step } = useLoop(4, 1700);

  return (
    <div ref={ref}>
      <Stage>
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0f1c]/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">How we got here</p>
            <p className="font-mono text-[10px] text-slate-500">
              {String(step + 1).padStart(2, "0")} / 04
            </p>
          </div>

          <div className="relative aspect-[3/2]">
            <svg viewBox="0 0 480 320" className="absolute inset-0 h-full w-full" fill="none">
              {DUST.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" fill="rgba(255,255,255,0.18)" />
              ))}
              {/* Faint full path, then the lit path on top */}
              <polyline
                points={STARS.map((s) => `${s.x},${s.y}`).join(" ")}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1.5"
                strokeDasharray="3 5"
              />
              {STARS.slice(1).map((s, i) => {
                const from = STARS[i];
                return (
                  <motion.line
                    key={s.date}
                    x1={from.x}
                    y1={from.y}
                    x2={s.x}
                    y2={s.y}
                    stroke="rgb(var(--accent))"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    initial={false}
                    animate={{ pathLength: step > i ? 1 : 0, opacity: step > i ? 0.9 : 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />
                );
              })}
              {STARS.map((s, i) => {
                const lit = step >= i;
                return (
                  <g key={s.date}>
                    <motion.circle
                      cx={s.x}
                      cy={s.y}
                      initial={false}
                      animate={{ r: lit ? 14 : 6, opacity: lit ? 0.22 : 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      fill="rgb(var(--accent))"
                    />
                    <motion.circle
                      cx={s.x}
                      cy={s.y}
                      r="5"
                      initial={false}
                      animate={{ fill: lit ? "rgb(var(--accent-soft))" : "rgba(255,255,255,0.14)" }}
                      transition={{ duration: 0.4 }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Labels as HTML so the type stays crisp */}
            {STARS.map((s, i) => (
              <motion.div
                key={s.date}
                className={`absolute w-36 ${s.align === "right" ? "-translate-x-full text-right" : ""}`}
                style={{
                  left: `${((s.x + (s.align === "right" ? -14 : 14)) / 480) * 100}%`,
                  top: `${((s.y + 12) / 320) * 100}%`,
                }}
                initial={false}
                animate={{ opacity: step >= i ? 1 : 0.35 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-mono text-[10px] text-accent-soft/80">{s.date}</p>
                <p className="text-[11px] font-semibold leading-tight text-white">{s.title}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Chip show={step === 3} className="-bottom-5 right-8">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Sparkles className="h-3 w-3" />
          </span>
          Built in public
        </Chip>
      </Stage>
    </div>
  );
}
