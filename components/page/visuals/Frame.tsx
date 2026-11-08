"use client";

/**
 * components/page/visuals/Frame.tsx
 *
 * Building blocks for the hero illustrations: small animated pictures of what
 * each page is about, drawn in the page accent (data-accent, globals.css).
 * Every illustration is decorative; PageHero hides it from assistive tech and
 * below lg.
 *
 *   <Stage>                       glow behind, a gentle float
 *     <Window title="linkedin.com/jobs">...</Window>
 *   </Stage>
 *
 *   const step = useLoop(4, 1600);  0..3, advancing every 1.6s while on screen
 *
 * Motion rules, so every page feels like the same product: ease EASE, loops
 * that pause offscreen, and for visitors who ask for less motion, a still
 * frame showing the finished state (useLoop returns the last step).
 */

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A step counter for looping illustrations: 0, 1, ... steps-1, then back to 0.
 * Runs only while `ref` is on screen. With reduced motion it holds the last
 * step, which each illustration draws as its finished state.
 */
export function useLoop(steps: number, ms = 1600) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % steps), ms);
    return () => clearInterval(id);
  }, [reduce, inView, steps, ms]);

  return { ref, step: reduce ? steps - 1 : step, reduce: !!reduce };
}

/**
 * The stage an illustration sits on: a soft accent glow behind it, the way a
 * product shot sits on a lit backdrop in an ad, and a slow float.
 */
export function Stage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative mx-auto w-full max-w-[520px] ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-10 -inset-y-12 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.16),transparent)] blur-2xl"
      />
      <motion.div
        className="relative"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** The surface every product card shares: a lit top edge, an inner highlight and a deep, layered shadow. */
export const SURFACE =
  "rounded-2xl border border-white/[0.1] bg-gradient-to-b from-[#111829] to-[#0a0f1c] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9),0_12px_30px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]";

/**
 * A product window: real window chrome (traffic lights and a centred address
 * pill), then the content. Reads as a screenshot of the product, not a diagram.
 */
export function Window({
  title,
  children,
  className = "",
  bodyClassName = "p-5",
}: {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${SURFACE} ${className}`}>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.015] px-4 py-2.5">
        <div className="flex w-12 shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/75" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/75" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/75" />
        </div>
        <div className="min-w-0 flex-1">
          {title && (
            <div className="mx-auto w-fit max-w-full truncate rounded-md border border-white/[0.06] bg-white/[0.035] px-3 py-1 text-center text-[11px] font-medium text-slate-400">
              {title}
            </div>
          )}
        </div>
        <div className="w-12 shrink-0" />
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/**
 * A grey placeholder line. Avoid in new work: product shots read as real only
 * with real copy, so write the text instead. Kept for anything still using it.
 */
export function Line({ w = "w-full", className = "" }: { w?: string; className?: string }) {
  return <div className={`h-2 rounded-full bg-white/[0.07] ${w} ${className}`} />;
}

/** A small floating chip that pops in, for callouts beside a window. */
export function Chip({ children, show = true, className = "" }: { children: ReactNode; show?: boolean; className?: string }) {
  return (
    <motion.div
      initial={false}
      animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`absolute z-10 inline-flex items-center gap-2 rounded-xl border border-white/[0.14] bg-gradient-to-b from-[#161d30]/95 to-[#0e1424]/95 px-3.5 py-2.5 text-[12px] font-semibold text-white shadow-[0_24px_50px_-14px_rgba(0,0,0,0.9),0_0_0_1px_rgb(var(--accent)/0.08),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** An accent dot with a soft pulse ring. */
export function PulseDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex h-2 w-2 ${className}`}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}
