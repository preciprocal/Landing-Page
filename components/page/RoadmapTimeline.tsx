"use client";

/**
 * components/page/RoadmapTimeline.tsx
 *
 * The /roadmap timeline: one vertical rail with three lanes (shipped, in
 * progress, planned). An accent line draws down the rail as the visitor
 * scrolls, each status dot pops in as its entry arrives, and on wide screens
 * entries alternate either side of a centred rail with the date opposite.
 * A filter narrows the rail to one status. Status is always written out in
 * text, never shown by colour alone. With reduced motion the line is drawn
 * in full and nothing moves.
 */

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { pad2 } from "./Layout";

export type RoadmapStatus = "shipped" | "in-progress" | "planned";

export interface RoadmapItem {
  title: string;
  description: string;
  status: RoadmapStatus;
  date?: string;
  tag?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const STATUS_CONFIG: Record<
  RoadmapStatus,
  { label: string; icon: typeof CheckCircle2; badge: string; dot: string }
> = {
  shipped: {
    label: "Shipped",
    icon: CheckCircle2,
    badge: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
    dot: "border-emerald-400 bg-emerald-400 ring-4 ring-emerald-400/15",
  },
  "in-progress": {
    label: "In progress",
    icon: Clock,
    badge: "border-accent/30 bg-accent/10 text-accent-soft",
    dot: "border-accent bg-accent ring-4 ring-accent/20",
  },
  planned: {
    label: "Planned",
    icon: Circle,
    badge: "border-white/[0.1] bg-white/[0.04] text-slate-300",
    dot: "border-slate-500 bg-[#050810]",
  },
};

const ALL_STATUSES: RoadmapStatus[] = ["shipped", "in-progress", "planned"];

function StatusBadge({ status }: { status: RoadmapStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${cfg.badge}`}>
      <Icon aria-hidden="true" className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

/** The rail position: left on small screens, centred on wide ones. */
const RAIL_X = "left-[15px] lg:left-1/2";

function Dot({ status, reduce, large = false }: { status: RoadmapStatus; reduce: boolean; large?: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      style={{ x: "-50%" }}
      className={`absolute ${RAIL_X} z-10 rounded-full border-2 ${STATUS_CONFIG[status].dot} ${
        large ? "top-1.5 h-4 w-4" : "top-6 h-3 w-3"
      }`}
      initial={reduce ? false : { scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {status === "in-progress" && !large && (
        <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-50" />
      )}
    </motion.span>
  );
}

export default function RoadmapTimeline({ items }: { items: RoadmapItem[] }) {
  const [activeFilter, setActiveFilter] = useState<RoadmapStatus | "all">("all");
  const reduce = !!useReducedMotion();

  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const lanes = ALL_STATUSES.filter((s) => activeFilter === "all" || activeFilter === s)
    .map((status) => ({ status, entries: items.filter((i) => i.status === status) }))
    .filter((l) => l.entries.length > 0);

  return (
    <div>
      {/* Filter */}
      <div role="group" aria-label="Filter by status" className="mb-12 flex flex-wrap gap-2">
        {(["all", ...ALL_STATUSES] as const).map((f) => {
          const active = activeFilter === f;
          const count = f === "all" ? items.length : items.filter((i) => i.status === f).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveFilter(f)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[13px] font-semibold transition-colors ${
                active
                  ? "border-accent/40 bg-accent/10 text-white"
                  : "border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {f === "all" ? "All" : STATUS_CONFIG[f].label}
              <span className={`font-mono text-[11px] ${active ? "text-accent-soft" : "text-slate-500"}`}>{pad2(count)}</span>
            </button>
          );
        })}
      </div>

      {/* Rail */}
      <div ref={railRef} className="relative">
        <div aria-hidden="true" className={`absolute ${RAIL_X} bottom-0 top-0 w-px -translate-x-1/2 bg-white/[0.08]`} />
        <motion.div
          aria-hidden="true"
          className={`absolute ${RAIL_X} bottom-0 top-0 w-[2px] origin-top bg-gradient-to-b from-accent via-accent to-accent-2 shadow-[0_0_12px_rgb(var(--accent)/0.5)]`}
          style={reduce ? { x: "-50%" } : { x: "-50%", scaleY: progress }}
        />

        <div key={activeFilter} className="space-y-16">
          {lanes.map(({ status, entries }) => (
            <section key={status} aria-labelledby={`lane-${status}`}>
              {/* Lane header */}
              <div className="relative mb-8 pl-11 lg:pl-0">
                <Dot status={status} reduce={reduce} large />
                <div className="lg:flex lg:justify-center">
                  <h2
                    id={`lane-${status}`}
                    className="inline-flex items-center gap-3 text-lg font-bold tracking-tight text-white lg:mt-9 lg:rounded-full lg:border lg:border-white/[0.08] lg:bg-[#070b16] lg:px-5 lg:py-2 lg:text-base"
                  >
                    {STATUS_CONFIG[status].label}
                    <span className="font-mono text-[11px] font-normal text-slate-500">{pad2(entries.length)}</span>
                  </h2>
                </div>
              </div>

              <ol className="space-y-6 lg:space-y-10">
                {entries.map((item, i) => {
                  const right = i % 2 === 1;
                  return (
                    <li key={item.title} className="relative pl-11 lg:grid lg:grid-cols-2 lg:gap-24 lg:pl-0">
                      <Dot status={status} reduce={reduce} />

                      {/* Date, opposite the card on wide screens */}
                      <div className={`hidden pt-5 lg:block ${right ? "lg:col-start-1 lg:row-start-1 lg:text-right" : "lg:col-start-2 lg:row-start-1"}`}>
                        <p className="font-mono text-[12px] text-slate-400">{item.date ?? STATUS_CONFIG[status].label}</p>
                      </div>

                      <motion.article
                        initial={reduce ? false : { opacity: 0, x: right ? 16 : -16, y: 8 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className={`group relative rounded-2xl border border-white/[0.07] bg-[#070b16] p-5 transition-colors duration-300 hover:border-accent/25 sm:p-6 lg:row-start-1 ${
                          right ? "lg:col-start-2" : "lg:col-start-1"
                        }`}
                      >
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <StatusBadge status={item.status} />
                          {item.tag && (
                            <span className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                              {item.tag}
                            </span>
                          )}
                          {item.date && <span className="ml-auto font-mono text-[11px] text-slate-400 lg:hidden">{item.date}</span>}
                        </div>
                        <h3 className="mb-1.5 text-[15px] font-bold text-white">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 inset-x-6 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:scale-x-100"
                        />
                      </motion.article>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
