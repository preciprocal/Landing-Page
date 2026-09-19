"use client";

import { useMemo } from "react";

// Deterministic pseudo-random so the style attributes below survive
// hydration. See the same helper in HeroProductDemo and ui/Meteors.
function seeded(i: number, salt: number): number {
  let h = Math.imul(i + 1, 374761393) ^ Math.imul(salt + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export default function Particles({ count = 25 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 2 + seeded(i, 1) * 3,
        x: seeded(i, 2) * 100,
        y: seeded(i, 3) * 100,
        opacity: 0.12 + seeded(i, 4) * 0.18,
        duration: 8 + seeded(i, 5) * 14,
        delay: seeded(i, 6) * 5,
        hue: 220 + seeded(i, 7) * 60, // blue to purple range
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