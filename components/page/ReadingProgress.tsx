"use client";

/**
 * components/page/ReadingProgress.tsx
 *
 * A slim bar fixed to the top of the viewport that fills in the page accent
 * as the reader scrolls. Decorative (the scrollbar carries the same
 * information), so it is hidden from assistive tech. With reduced motion it
 * still tracks the scroll position, but without the spring smoothing.
 */

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[5001] h-[3px] origin-left bg-accent shadow-[0_0_12px_rgb(var(--accent)/0.5)]"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}
