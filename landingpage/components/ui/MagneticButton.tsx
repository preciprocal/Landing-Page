"use client";

import React, { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils"; // Adjust path if needed

export const MagneticButton = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      ref.current?.getBoundingClientRect() ?? {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };
    const center = { x: left + width / 2, y: top + height / 2 };
    x.set((clientX - center.x) * 0.15);
    y.set((clientY - center.y) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("relative overflow-hidden group", className)}
    >
      {children}
    </motion.button>
  );
};
