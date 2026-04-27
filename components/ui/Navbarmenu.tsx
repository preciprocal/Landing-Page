"use client";

import React, { useState, createContext, useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) {
  const { active, setActive } = useContext(MenuContext);
  const isOpen = active === item;

  return (
    <div
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

      {/* Dropdown panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 6 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
        >
          {/* Caret */}
          <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0d1224] border-l border-t border-white/[0.08] rotate-45 z-10" />

          <div className="relative bg-[#0d1224] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
            {children}
          </div>
        </motion.div>
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