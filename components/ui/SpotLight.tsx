"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Spotlight({
  className = "",
  fill = "#818cf8",
  followMouse = true,
}: {
  className?: string;
  fill?: string;
  followMouse?: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 40, damping: 20 });
  const y = useSpring(rawY, { stiffness: 40, damping: 20 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!followMouse || !svgRef.current) return;
      const rect = svgRef.current.closest("section, div")?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 60);
      rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 40);
    },
    [followMouse, rawX, rawY]
  );

  useEffect(() => {
    if (!followMouse) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followMouse, handleMouseMove]);

  // Unique gradient ID per instance to avoid SVG defs conflicts when multiple spotlights are on the same page
  const gradientId = `spotlight-${fill.replace("#", "")}`;

  return (
    <motion.svg
      ref={svgRef}
      style={{ x, y }}
      className={`pointer-events-none absolute z-[1] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600"
      fill="none"
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="0%" r="70%" fx="50%" fy="0%">
          <stop offset="0%"   stopColor={fill} stopOpacity="0.28" />
          <stop offset="40%"  stopColor={fill} stopOpacity="0.08" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="300" cy="0" rx="300" ry="420" fill={`url(#${gradientId})`} />
    </motion.svg>
  );
}