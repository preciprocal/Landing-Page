"use client";

import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The springy open. Low damping relative to stiffness is what produces the
 * slight overshoot and settle, rather than a linear ease that just fades in.
 * These are the upstream Aceternity navbar-menu values.
 */
const SPRING = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// ─── Context ──────────────────────────────────────────────────────────────────

const MenuContext = createContext<{
  active: string | null;
  setActive: (item: string | null) => void;
}>({ active: null, setActive: () => {} });

// ─── Menu (wrapper) ───────────────────────────────────────────────────────────

export function Menu({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) {
  const [active, setActiveState] = useState<string | null>(null);

  const handleSet = (item: string | null) => {
    setActiveState(item);
    setActive(item);
  };

  return (
    <MenuContext.Provider value={{ active, setActive: handleSet }}>
      <nav
        onMouseLeave={() => handleSet(null)}
        className="relative flex items-center gap-7"
      >
        {children}
      </nav>
    </MenuContext.Provider>
  );
}

// ─── MenuItem ─────────────────────────────────────────────────────────────────

export function MenuItem({
  item,
  children,
  panelClassName,
}: {
  /** Accepted for API parity with the upstream component; state comes from context. */
  setActive?: (item: string | null) => void;
  /** Accepted for API parity with the upstream component; state comes from context. */
  active?: string | null;
  item: string;
  children?: React.ReactNode;
  /** Sizing for the dropdown panel, e.g. a mega-menu that needs a fixed width. */
  panelClassName?: string;
}) {
  const { active, setActive } = useContext(MenuContext);
  const isOpen = active === item;

  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /**
   * Horizontal nudge, in px, away from "perfectly centred under the trigger".
   *
   * A wide mega-menu centred on a trigger near the edge of a full-width navbar
   * runs off screen. Right-aligning it instead fixes the overflow but parks the
   * panel well to the left of its own button, which reads as broken. So the
   * panel stays centred under the trigger and is shifted by the smallest amount
   * that keeps it on screen. The caret is positioned separately, against the
   * trigger rather than the panel, so it always points at the button no matter
   * how far the panel has been nudged.
   */
  const [shift, setShift] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const reposition = () => {
      const trigger = triggerRef.current;
      const panel = panelRef.current;
      if (!trigger || !panel) return;

      const GUTTER = 16;
      const rect = trigger.getBoundingClientRect();
      const width = panel.offsetWidth;

      const centredLeft = rect.left + rect.width / 2 - width / 2;
      const clamped = Math.max(
        GUTTER,
        Math.min(centredLeft, window.innerWidth - GUTTER - width)
      );

      setShift(clamped - centredLeft);
    };

    reposition();
    window.addEventListener("resize", reposition);
    return () => window.removeEventListener("resize", reposition);
  }, [isOpen]);

  return (
    <div
      ref={triggerRef}
      onMouseEnter={() => setActive(item)}
      className="relative"
    >
      {/* Trigger */}
      <button className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors group cursor-pointer">
        {item}
        <svg
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 rounded-full transition-all group-hover:w-full" />
      </button>

      {/* Dropdown panel.

          The positioning wrapper is a plain div on purpose. framer-motion owns
          the `transform` property on a motion component, so an inline
          translateX here was being overwritten by the open animation's scale/y,
          which left the panel uncentred and hanging to the right of its
          trigger. Position on a static parent, animate on the child. */}
      {isOpen && (
        <div
          className="absolute top-full left-1/2 pt-4 z-50"
          // Centred under the trigger, then nudged by the smallest amount that
          // keeps it on screen. Inline because the shift is measured.
          style={{ transform: `translateX(calc(-50% + ${shift}px))` }}
        >
          {/* Caret. Anchored against the trigger's own centre rather than the
              panel, so it keeps pointing at the button however far the panel
              has been nudged sideways. */}
          <div
            className="absolute top-[14px] w-3 h-3 bg-[#0d1224] border-l border-t border-white/[0.08] rotate-45 z-10"
            style={{ left: `calc(50% - ${shift}px)`, marginLeft: "-6px" }}
          />

          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={SPRING}
            className={cn(
              // max-h keeps a tall panel inside the viewport on short screens
              // instead of running off the bottom with no way to reach it.
              "relative bg-[#0d1224] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60",
              "overflow-y-auto overflow-x-hidden max-h-[calc(100vh-7rem)]",
              panelClassName
            )}
          >
            {/* `layout` lets the panel spring between sizes when you move from
                one trigger to another, rather than snapping. */}
            <motion.div layout transition={SPRING}>
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ─── HoveredLink ──────────────────────────────────────────────────────────────

export function HoveredLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "block text-[13px] text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg px-2 py-1.5 transition-all",
        className
      )}
    >
      {children}
    </Link>
  );
}

// ─── ProductItem ──────────────────────────────────────────────────────────────

export function ProductItem({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) {
  return (
    <Link href={href} className="flex items-start gap-3 group p-2 rounded-xl hover:bg-white/[0.04] transition-all">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={title}
        className="w-14 h-10 object-cover rounded-lg flex-shrink-0 border border-white/[0.06]"
      />
      <div>
        <p className="text-[13px] font-semibold text-white group-hover:text-indigo-300 transition-colors">
          {title}
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}