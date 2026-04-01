"use client";

import { useMemo } from "react";

export default function Particles({ count = 25 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 2 + Math.random() * 3,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: 0.12 + Math.random() * 0.18,
        duration: 8 + Math.random() * 14,
        delay: Math.random() * 5,
        hue: 220 + Math.random() * 60, // blue → purple range
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `hsla(${p.hue}, 80%, 70%, ${p.opacity})`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}