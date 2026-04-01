"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface HoverItem { title: string; description: string; icon: React.ReactNode; gradient: string }

export function HoverEffect({ items, className }: { items: HoverItem[]; className?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className || ""}`}>
      {items.map((item, idx) => (
        <div key={idx} className="relative group block p-2 h-full w-full" onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-indigo-500/[0.08] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-10 rounded-2xl p-6 bg-white/[0.03] border border-white/[0.06] h-full transition-colors group-hover:border-indigo-500/30">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 text-white transition-transform group-hover:scale-110`}>
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}