"use client";

/**
 * Hero illustration for /about: the story so far as a milestone timeline
 * card. Four milestones from the page (Early 2024 the reality check, Mid
 * 2024 reverse-engineering, Late 2024 Preciprocal is born, 2025 onwards
 * growing with users), each with a short line of what happened, lighting up
 * one after another along an accent rail.
 * Steps: 0 first milestone, 1 second, 2 third, 3 all four and the closing
 * chip (finished state). No figures or results are shown.
 */

import { motion } from "framer-motion";
import { Compass, Rocket, Search, Sparkles, Users } from "lucide-react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

// Wording follows the MILESTONES on app/about/page.tsx.
const MILESTONES = [
  { date: "Early 2024", title: "The reality check", text: "Strong records, real skills, and most applications disappeared.", icon: Compass },
  { date: "Mid 2024", title: "Reverse-engineering", text: "Studied how resumes get scored and turned the answers into tools.", icon: Search },
  { date: "Late 2024", title: "Preciprocal is born", text: "The tools became a real product, built in public from day one.", icon: Rocket },
  { date: "2025 onwards", title: "Growing with users", text: "Every feature on the roadmap starts with a conversation.", icon: Users },
];

export default function AboutVisual() {
  const { ref, step } = useLoop(4, 1800);

  return (
    <div ref={ref}>
      <Stage>
        <Window title="preciprocal.com/about" bodyClassName="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold text-white">How we got here</p>
              <p className="text-[11px] text-slate-400">From a few job hunts to a product</p>
            </div>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10.5px] font-semibold text-accent-soft">
              {MILESTONES[step].date}
            </span>
          </div>

          <ol className="relative mt-4">
            {/* Rail and its accent fill */}
            <span aria-hidden="true" className="absolute bottom-[34px] left-[17px] top-[34px] w-px bg-white/[0.08]" />
            <motion.span
              aria-hidden="true"
              className="absolute left-[17px] top-[34px] w-px origin-top bg-gradient-to-b from-accent to-accent-2"
              style={{ height: "calc(100% - 68px)" }}
              initial={false}
              animate={{ scaleY: step / (MILESTONES.length - 1) }}
              transition={{ duration: 0.7, ease: EASE }}
            />
            {MILESTONES.map((m, i) => {
              const lit = i <= step;
              const current = i === step;
              const Icon = m.icon;
              return (
                <li key={m.date} className="relative flex items-center gap-3 py-1">
                  <motion.span
                    initial={false}
                    animate={{ scale: current ? 1.08 : 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                      current
                        ? "border-accent bg-accent text-[#0a0f1c] shadow-[0_0_0_5px_rgb(var(--accent)/0.15)]"
                        : lit
                          ? "border-accent/50 bg-[#101727] text-accent-soft"
                          : "border-white/15 bg-[#101727] text-slate-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.span>
                  <div
                    className={`min-w-0 flex-1 rounded-xl border px-3.5 py-2.5 transition-colors duration-500 ${
                      current ? "border-accent/35 bg-accent/[0.08]" : "border-white/[0.06] bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <p className={`text-[12.5px] font-semibold transition-colors duration-500 ${lit ? "text-white" : "text-slate-300"}`}>{m.title}</p>
                      <p className={`shrink-0 text-[10.5px] font-medium ${lit ? "text-accent-soft" : "text-slate-400"}`}>{m.date}</p>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-snug text-slate-400">{m.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Window>

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
