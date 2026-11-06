"use client";

/**
 * A vertical timeline rail whose accent line draws down as the reader scrolls
 * through it. Wrap the timeline list; the list's markers sit on the left edge
 * (left: 0). With reduced motion the line is drawn in full from the start.
 */

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

export default function TimelineRail({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-white/[0.08]" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-accent via-accent to-accent-2"
        style={{ scaleY: reduce ? 1 : scaleY }}
      />
      {children}
    </div>
  );
}
