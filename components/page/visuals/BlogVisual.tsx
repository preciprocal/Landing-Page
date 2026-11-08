"use client";

/**
 * Hero illustration for /blog: a small stack of article cards, each with a
 * category, a reading-time chip, a real title and excerpt, and a byline row.
 * The front card moves to the back so the next guide comes forward.
 * Steps: 0, 1, 2 (which card is in front). Reduced motion holds step 2.
 * Titles, excerpts and dates are fictional examples.
 */

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { Chip, EASE, PulseDot, SURFACE, Stage, useLoop } from "./Frame";

const CARDS = [
  {
    cat: "Interview Prep",
    title: "How to structure a behavioural answer",
    excerpt: "Set the scene in one line, spend most of your time on what you did, and end with a result you can measure.",
    mins: "7 min read",
    date: "Oct 28",
  },
  {
    cat: "Resume",
    title: "Writing bullets that show impact",
    excerpt: "Start with a strong verb, name the scope, then close on the number that changed because of your work.",
    mins: "5 min read",
    date: "Nov 3",
  },
  {
    cat: "Career Strategy",
    title: "Following up after the final round",
    excerpt: "A short note within a day keeps you top of mind. Here is what to say, and when to send a second one.",
    mins: "6 min read",
    date: "Nov 5",
  },
];

/** Where a card sits for a given depth: 0 is the front. */
const DEPTH = [
  { y: 0, scale: 1, opacity: 1 },
  { y: -24, scale: 0.95, opacity: 0.75 },
  { y: -46, scale: 0.9, opacity: 0.5 },
];

export default function BlogVisual() {
  const { ref, step } = useLoop(3, 2400);

  return (
    <div ref={ref}>
      <Stage className="pt-12">
        <div className="relative h-[276px]">
          {CARDS.map((card, i) => {
            const depth = (i - step + CARDS.length) % CARDS.length;
            const d = DEPTH[depth];
            return (
              <motion.div
                key={card.title}
                initial={false}
                animate={{ y: d.y, scale: d.scale, opacity: d.opacity, zIndex: CARDS.length - depth }}
                transition={{ duration: 0.7, ease: EASE, zIndex: { duration: 0 } }}
                className={`absolute inset-x-0 bottom-0 flex h-[230px] origin-top flex-col overflow-hidden p-6 ${SURFACE}`}
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-soft">
                    {card.cat}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-300">
                    <Clock className="h-3 w-3 text-accent" />
                    {card.mins}
                  </span>
                </div>
                <p className="mt-4 text-lg font-semibold leading-snug tracking-tight text-white">{card.title}</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-slate-400">{card.excerpt}</p>
                <div className="mt-auto flex items-center gap-3 border-t border-white/[0.06] pt-4">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-accent/20 text-[11px] font-bold text-accent-soft">P</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11.5px] font-semibold text-slate-200">Preciprocal Guides</p>
                    <p className="text-[10.5px] text-slate-400">Updated {card.date}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-accent-soft">
                    Read guide <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
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
