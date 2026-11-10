"use client";

/**
 * components/ui/SmoothGlow.tsx
 *
 * A soft radial glow with no banding.
 *
 * A faint glow over near-black spreads a tiny brightness range across a lot
 * of pixels, so an 8-bit CSS gradient (or a blurred disc) steps from one
 * level to the next in visible rings. This draws the glow on a canvas
 * instead: the falloff is computed per pixel in floating point and the alpha
 * is rounded with less than one level of random offset (ordered noise is not
 * needed at this size). That spreads the rounding so the eye sees a smooth
 * ramp, with no rings and no visible grain. It is drawn once, at the size
 * it is shown.
 */

import { useEffect, useRef } from "react";

export default function SmoothGlow({
  rgb = [99, 102, 241],
  peak = 0.2,
  falloff = 2.2,
  className = "",
}: {
  /** Glow colour. */
  rgb?: [number, number, number];
  /** Opacity at the centre, 0 to 1. */
  peak?: number;
  /** Higher keeps the light tighter to the centre. */
  falloff?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    // Drawn at the size it is shown (up to 1.5x for sharp screens). Stretching
    // a small canvas would let the browser's 8-bit smoothing bring rings back.
    const scale = Math.min(window.devicePixelRatio || 1, 1.5);
    const W = Math.max(1, Math.round(canvas.clientWidth * scale));
    const H = Math.max(1, Math.round(canvas.clientHeight * scale));
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(W, H);
    const d = img.data;
    const [r, g, b] = rgb;
    for (let y = 0; y < H; y++) {
      const ny = (y + 0.5) / H * 2 - 1;
      for (let x = 0; x < W; x++) {
        const nx = (x + 0.5) / W * 2 - 1;
        const dist = Math.min(1, Math.sqrt(nx * nx + ny * ny));
        // Smooth, eased falloff that reaches exactly zero at the edge.
        const t = 1 - dist;
        const a = peak * Math.pow(t * t * (3 - 2 * t), falloff);
        const i = (y * W + x) * 4;
        d[i] = r;
        d[i + 1] = g;
        d[i + 2] = b;
        d[i + 3] = Math.max(0, Math.min(255, Math.floor(a * 255 + Math.random())));
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [rgb, peak, falloff]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
