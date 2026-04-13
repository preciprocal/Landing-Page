"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tab {
  title: string;
  value: string;
  content: React.ReactNode;
}

export function Tabs({ tabs, containerClassName = "", activeTabClassName = "", tabClassName = "", contentClassName = "", onTabChange }: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  onTabChange?: (value: string) => void;
}) {
  const [active, setActive] = useState<Tab>(tabs[0]);
  const [hovering, setHovering] = useState(false);
  const [tabBounds, setTabBounds] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-cycle tabs when not hovering
  useEffect(() => {
    if (hovering) return;
    const iv = setInterval(() => {
      setActive(prev => {
        const idx = tabs.findIndex(t => t.value === prev.value);
        const next = tabs[(idx + 1) % tabs.length];
        onTabChange?.(next.value);
        return next;
      });
    }, 5000);
    return () => clearInterval(iv);
  }, [hovering, tabs, onTabChange]);

  // Update indicator position
  useEffect(() => {
    const idx = tabs.findIndex(t => t.value === active.value);
    const el = tabsRef.current[idx];
    if (el) {
      const parent = el.parentElement?.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      if (parent) {
        setTabBounds({ left: rect.left - parent.left, width: rect.width });
      }
    }
  }, [active, tabs]);

  const handleTabClick = (tab: Tab) => {
    setActive(tab);
    onTabChange?.(tab.value);
  };

  return (
    <div className={`flex flex-col w-full ${containerClassName}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Tab bar */}
      <div className="relative flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {/* Active indicator */}
        <motion.div
          className="absolute top-1 bottom-1 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/20"
          animate={{ left: tabBounds.left, width: tabBounds.width }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        {tabs.map((tab, i) => (
          <button
            key={tab.value}
            ref={el => { tabsRef.current[i] = el; }}
            onClick={() => handleTabClick(tab)}
            className={`relative z-10 flex-1 px-2.5 py-2 text-[10px] sm:text-[11px] font-semibold rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap ${
              active.value === tab.value
                ? `text-white ${activeTabClassName}`
                : `text-slate-500 hover:text-slate-300 ${tabClassName}`
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Content area with 3D perspective */}
      <div className={`relative flex-1 w-full ${contentClassName}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.value}
            initial={{ opacity: 0, y: 10, rotateX: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, rotateX: 5, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {active.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}