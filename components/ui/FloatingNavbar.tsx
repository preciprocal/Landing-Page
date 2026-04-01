"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingNavbar({ children, className }: { children: React.ReactNode; className?: string }) {
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
        className={cn(
          "fixed top-0 inset-x-0 z-[5000] transition-colors",
          scrolled ? "bg-[#050810]/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent border-b border-transparent",
          className
        )}
      >
        {children}
      </motion.nav>
    </AnimatePresence>
  );
}