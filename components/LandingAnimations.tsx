"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, type Variants } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════════
// LANDING PAGE ANIMATION PRIMITIVES
// Aceternity-inspired, hand-built. No external dependency.
// Import what you need into any landing page component.
// ═══════════════════════════════════════════════════════════════════════════════


// ─── 1. SPOTLIGHT CARD ───────────────────────────────────────────────────────
// Radial gradient follows the cursor inside the card border.
// Usage: wrap any card content.
// <SpotlightCard> ... </SpotlightCard>

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(99,102,241,0.08)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [inside, setInside] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setInside(true)}
      onMouseLeave={() => setInside(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Spotlight gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: inside ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 60%)`,
        }}
      />
      {/* Glowing border effect on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: inside ? 1 : 0,
          background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.12), transparent 50%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      {children}
    </div>
  );
}


// ─── 2. MAGNETIC HOVER ───────────────────────────────────────────────────────
// Element subtly pulls toward cursor on hover (like Apple buttons).
// Usage: <MagneticHover><button>CTA</button></MagneticHover>

export function MagneticHover({
  children,
  className = "",
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }, [x, y, strength]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


// ─── 3. TEXT SHIMMER ─────────────────────────────────────────────────────────
// A metallic shimmer sweeps across text on scroll-in.
// Usage: <TextShimmer>Your headline here</TextShimmer>

export function TextShimmer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mixBlendMode: "overlay",
        }}
        initial={{ backgroundPosition: "200% 0" }}
        whileInView={{ backgroundPosition: "-200% 0" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
      />
    </span>
  );
}


// ─── 4. STAGGER CHILDREN ─────────────────────────────────────────────────────
// Automatically staggers children on scroll-in.
// Usage: <StaggerChildren> <div/> <div/> <div/> </StaggerChildren>

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function StaggerChildren({
  children,
  className = "",
  onAnimationComplete,
}: {
  children: React.ReactNode;
  className?: string;
  onAnimationComplete?: () => void;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      onAnimationComplete={onAnimationComplete}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}


// ─── 5. GLOW LINE DIVIDER ───────────────────────────────────────────────────
// Animated horizontal beam between sections — a subtle travelling pulse.
// Usage: <GlowDivider /> between sections

export function GlowDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <motion.div
        className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
      />
    </div>
  );
}


// ─── 6. REVEAL ON SCROLL ─────────────────────────────────────────────────────
// Smooth clip-path reveal from bottom — more interesting than a basic fade.
// Usage: <RevealOnScroll> ... </RevealOnScroll>

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


// ─── 7. FLOATING PARTICLES (lightweight CSS-only) ────────────────────────────
// Tiny dots that drift slowly — ambient depth without canvas overhead.
// Usage: <FloatingDots /> as a section background

export function FloatingDots({ count = 20 }: { count?: number }) {
  // Generate deterministic positions with a seed
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${((i * 37 + 13) % 100)}%`,
    top: `${((i * 53 + 7) % 100)}%`,
    size: 1 + (i % 3),
    delay: (i * 0.4) % 8,
    duration: 6 + (i % 5) * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {dots.map(dot => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-indigo-400/20"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}