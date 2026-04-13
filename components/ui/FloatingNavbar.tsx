"use client";

import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingNavbar({ children, className, style }: { children: React.ReactNode; className?: string; style?: CSSProperties }) {
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

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={style}
        className={cn(
          "fixed inset-x-0 z-[5000] transition-colors",
          scrolled ? "bg-[#050810]/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent border-b border-transparent",
          className
        )}
      >
        {children}
      </motion.nav>
    </AnimatePresence>
  );
}