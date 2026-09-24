"use client";

import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingNavbar({
  children,
  className,
  style,
  forceBackground = false,
  overlayContent = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  forceBackground?: boolean;
  /**
   * Let the page render underneath the bar instead of below it.
   *
   * The nav is `fixed`, so a spacer normally reserves its height. On a page
   * whose first section is a full-viewport hero with its own background, that
   * spacer pushes the hero down and leaves a flat band of page background
   * between the bar and the gradient. Those pages pass `overlayContent` so the
   * hero starts at the very top and the transparent bar floats over it.
   *
   * The sticky banner is unaffected: it is opaque and keeps its own spacer.
   */
  overlayContent?: boolean;
}) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - (scrollYProgress.getPrevious() ?? 0);
      if (current < 0.05) { setVisible(true); setScrolled(false); }
      else { setScrolled(true); setVisible(direction < 0); }
    }
  });

  const hasBg = forceBackground || scrolled;

  /**
   * Background for the bar.
   *
   * Scrolled, or on a page that is not overlaying anything: near-opaque, since
   * arbitrary page content will be passing underneath.
   *
   * Sitting over a hero and not yet scrolled: a lighter wash plus blur. Fully
   * transparent leaves the links floating with nothing behind them, which is
   * unreadable the moment the hero has anything bright in it, but the opaque
   * treatment hides the gradient the bar is meant to sit over. The blur is what
   * makes the middle ground work.
   */
  const backgroundClass = hasBg
    ? "bg-[#050810]/90 backdrop-blur-xl border-b border-white/[0.06]"
    : overlayContent
      ? "bg-[#050810]/60 backdrop-blur-lg border-b border-white/[0.04]"
      : "bg-transparent border-b border-transparent";

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.nav
          initial={{ opacity: 1, y: 0 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={style}
          className={cn(
            "fixed inset-x-0 z-[5000] transition-colors",
            backgroundClass,
            className
          )}
        >
          {children}
        </motion.nav>
      </AnimatePresence>
      {/* Spacer: navbar height (72px) + banner height (--banner-h, defaults to
          0px). Skipped when the page draws its own full-height first section. */}
      {!overlayContent && (
        <div style={{ height: "calc(72px + var(--banner-h, 0px))" }} />
      )}
    </>
  );
}