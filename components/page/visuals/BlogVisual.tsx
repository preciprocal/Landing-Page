"use client";

/**
 * Hero illustration for /blog: a small stack of article cards, each with a
 * category and a reading-time chip, the front card moving to the back so the
 * next guide comes forward. Fictional titles only.
 * Steps: 0, 1, 2 (which card is in front). Reduced motion holds step 2.
 */

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Chip, EASE, Line, PulseDot, Stage, useLoop } from "./Frame";

const CARDS = [
  { cat: "Interview Prep", title: "How to structure a behavioural answer", mins: "7 min read", lines: ["w-full", "w-11/12", "w-3/4"] },
  { cat: "Resume", title: "Writing bullets that show impact", mins: "5 min read", lines: ["w-full", "w-4/5", "w-2/3"] },
  { cat: "Career Strategy", title: "Following up after the final round", mins: "6 min read", lines: ["w-11/12", "w-full", "w-3/5"] },
];

/** Where a card sits for a given depth: 0 is the front. */
const DEPTH = [
  { y: 0, scale: 1, opacity: 1 },
  { y: -26, scale: 0.95, opacity: 0.7 },
  { y: -50, scale: 0.9, opacity: 0.4 },
];

export default function BlogVisual() {
  const { ref, step } = useLoop(3, 2400);

  return (
    <div ref={ref}>
      <Stage className="pt-14">
        <div className="relative h-[300px]">
          {CARDS.map((card, i) => {
            const depth = (i - step + CARDS.length) % CARDS.length;
            const d = DEPTH[depth];
            return (
              <motion.div
                key={card.title}
                initial={false}
                animate={{ y: d.y, scale: d.scale, opacity: d.opacity }}
                transition={{ duration: 0.7, ease: EASE }}
                style={{ zIndex: CARDS.length - depth }}
                className="absolute inset-x-0 bottom-0 origin-top overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0f1c] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-soft">
                    {card.cat}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-slate-300">
                    <Clock className="h-3 w-3 text-accent" />
                    {card.mins}
                  </span>
                </div>
                <p className="mt-5 text-lg font-semibold leading-snug tracking-tight text-white">{card.title}</p>
                <div className="mt-5 space-y-2.5">
                  {card.lines.map((w, j) => (
                    <Line key={j} w={w} />
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/20 text-[10px] font-bold text-accent-soft">P</span>
                  <Line w="w-24" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <Chip className="-bottom-4 -right-4">
          <PulseDot />
          New guide
        </Chip>
      </Stage>
    </div>
  );
}
