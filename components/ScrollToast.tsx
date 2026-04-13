"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";

const STORAGE_KEY = "preciprocal-toast-dismissed";

export default function ScrollToast() {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let timer: NodeJS.Timeout;
    let shown = false;

    const checkScroll = () => {
      if (shown) return;
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.3) {
        shown = true;
        setVisible(true);
        window.removeEventListener("scroll", checkScroll);
      }
    };

    timer = setTimeout(() => {
      window.addEventListener("scroll", checkScroll, { passive: true });
      checkScroll();
    }, 20000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  // Auto-dismiss after 15 seconds
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(dismiss, 15000);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-[60] max-w-[300px]"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl p-[1px] overflow-hidden">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "conic-gradient(from 0deg, rgba(99,102,241,0.4), rgba(168,85,247,0.4), rgba(99,102,241,0.1), rgba(168,85,247,0.4), rgba(99,102,241,0.4))",
                  animation: "spin-slow 4s linear infinite",
                }}
              />
            </div>

            {/* Cursor-follow spotlight */}
            <div
              className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.12), transparent 60%)`,
              }}
            />

            {/* Card body */}
            <div className="relative bg-[#0a0f1e]/95 backdrop-blur-xl rounded-2xl m-[1px] p-4 z-[2]">
              {/* Dismiss */}
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 p-1 rounded-md hover:bg-white/[0.06] text-slate-600 hover:text-slate-300 transition-colors cursor-pointer z-20"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-start gap-3">
                {/* Icon with pulse ring */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  {/* Subtle pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-indigo-500/40"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                <div className="pr-4 flex-1">
                  <p className="text-[13px] font-bold text-white mb-0.5">Student? 1 month free.</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                    Verify your .edu email — unlock Pro instantly. No card needed.
                  </p>
                  <a
                    href={`${APP_URL}/sign-up`}
                    className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg
                               bg-gradient-to-r from-indigo-500 to-purple-500
                               text-white text-[11px] font-semibold
                               hover:shadow-[0_8px_24px_rgba(99,102,241,0.35)]
                               transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Claim free month
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* Auto-dismiss progress bar */}
              <div className="mt-3 h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 15, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Spinning border animation */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}