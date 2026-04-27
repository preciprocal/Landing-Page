"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  containerClassName?: string;
  side?: "top" | "bottom";
}

export function Tooltip({
  children,
  content,
  containerClassName = "",
  side = "top",
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateCoords = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    if (side === "top") {
      setCoords({
        top: rect.top + scrollY - 8,
        left: rect.left + scrollX + rect.width / 2,
      });
    } else {
      setCoords({
        top: rect.bottom + scrollY + 8,
        left: rect.left + scrollX + rect.width / 2,
      });
    }
  }, [side]);

  const show = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);
    updateCoords();
    setOpen(true);
  }, [updateCoords]);

  const hide = useCallback(() => {
    timeout.current = setTimeout(() => setOpen(false), 120);
  }, []);

  const isTop = side === "top";

  const tooltipPanel = (
    <AnimatePresence>
      {open && (
        <motion.div
          onMouseEnter={() => {
            if (timeout.current) clearTimeout(timeout.current);
          }}
          onMouseLeave={hide}
          initial={{ opacity: 0, y: isTop ? 6 : -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: isTop ? 4 : -4, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            top: coords.top,
            left: coords.left,
            transform: isTop ? "translate(-50%, -100%)" : "translate(-50%, 0%)",
            zIndex: 99999,
            width: 256,
            pointerEvents: "auto",
          }}
        >
          {/* Caret */}
          <div
            className={`
              absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5
              bg-[#0d1224] rotate-45
              ${isTop
                ? "bottom-[-5px] border-b border-r border-white/[0.08]"
                : "top-[-5px] border-t border-l border-white/[0.08]"
              }
            `}
          />

          {/* Card */}
          <div className="relative bg-[#0d1224] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/60 p-3.5 text-left">
            {typeof content === "string" ? (
              <p className="text-[12px] text-slate-300 leading-relaxed">{content}</p>
            ) : (
              content
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <span
      ref={triggerRef}
      className={`relative inline-block ${containerClassName}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {mounted && createPortal(tooltipPanel, document.body)}
    </span>
  );
}