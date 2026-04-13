"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap } from "lucide-react";
import { APP_URL } from "@/lib/constants";

// ═══════════════════════════════════════════════════════════════════════════════
// STICKY BANNER — Dismissible announcement bar
// Fixed to very top (z-70, above navbar z-50).
// Sets CSS var --banner-h so FloatingNavbar can offset its top position.
// ═══════════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = "preciprocal-banner-dismissed";

export default function StickyBanner() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  // Set CSS variable for banner height so navbar can offset
  useEffect(() => {
    if (visible && bannerRef.current) {
      const h = bannerRef.current.offsetHeight;
      document.documentElement.style.setProperty("--banner-h", `${h}px`);
    } else {
      document.documentElement.style.setProperty("--banner-h", "0px");
    }
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
    document.documentElement.style.setProperty("--banner-h", "0px");
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={bannerRef}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[70]"
          >
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] animate-gradient-x">
              <div className="max-w-[1200px] mx-auto px-6 py-2 flex items-center justify-center gap-3">
                <GraduationCap className="w-4 h-4 text-white/80 flex-shrink-0 hidden sm:block" />
                <p className="text-[13px] text-white font-medium text-center">
                  <span className="hidden sm:inline">🎓 </span>
                  Students get <span className="font-bold">1 month free</span> with .edu email.{" "}
                  <a
                    href={`${APP_URL}/sign-up`}
                    className="underline underline-offset-2 font-semibold hover:text-white/90 transition-colors"
                  >
                    Claim now →
                  </a>
                </p>
                <button
                  onClick={dismiss}
                  className="flex-shrink-0 ml-2 p-1 rounded-md hover:bg-white/10 transition-colors text-white/60 hover:text-white cursor-pointer"
                  aria-label="Dismiss banner"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer — pushes page content below the fixed banner */}
      {visible && <div style={{ height: "var(--banner-h, 0px)" }} />}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
        }
      `}} />
    </>
  );
}