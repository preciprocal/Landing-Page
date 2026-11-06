"use client";

/**
 * components/page/Reveal.tsx
 *
 * Scroll-in motion for content pages, kept quiet: content rises a few pixels
 * and fades in once as it enters the viewport, and lists of cards come in one
 * after another. Off for visitors who ask their system for less motion.
 *
 *   <Reveal>...</Reveal>                     one block
 *   <RevealGroup className="grid ...">       a list; each child is a RevealItem
 *     <RevealItem>...</RevealItem>
 *   </RevealGroup>
 *   <SpotlightCard className="...">          a card with a cursor-following glow
 */

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const group: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function RevealGroup({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" | "ol" }) {
  const reduce = useReducedMotion();
  const Tag = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;
  return (
    <Tag className={className} variants={group} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}

/** A card with a soft light that follows the cursor (Aceternity's card spotlight). */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgb(var(--accent) / 0.09), transparent 70%)`;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
    >
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
