"use client";

import { useRef, useState, useCallback, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// GLOWING EFFECT — Aceternity-inspired
// Animated border glow that responds to cursor proximity.
// Place inside any `relative` container.
// ═══════════════════════════════════════════════════════════════════════════════

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  borderWidth?: number;
  className?: string;
}

export function GlowingEffect({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 80,
  inactiveZone = 0.01,
  borderWidth = 1,
  className = "",
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (disabled || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const maxDist = Math.max(rect.width, rect.height) / 2 + proximity;

      if (dist < maxDist) {
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        const normalised = 1 - Math.max(0, Math.min(1, (dist - rect.width / 2 * inactiveZone) / maxDist));
        setOpacity(normalised);
      } else {
        setOpacity(0);
      }
    },
    [disabled, proximity, inactiveZone]
  );

  const handleMouseLeave = useCallback(() => setOpacity(0), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  if (disabled) return null;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-[5] rounded-[inherit] ${className}`}
      aria-hidden="true"
    >
      {/* Border glow — the main visible effect */}
      <div
        className="absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${spread * 2.5}px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.55), rgba(139,92,246,0.2) 40%, transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: `${borderWidth}px`,
        }}
      />
      {/* Inner glow bloom — soft fill behind content */}
      {glow && (
        <div
          className="absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: opacity * 0.6,
            background: `radial-gradient(${spread * 2}px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.1), transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}