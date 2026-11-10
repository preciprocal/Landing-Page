"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import Chevron from "@/components/Chevron";

// ═══════════════════════════════════════════════════════════════════════════════
// STICKY BANNER, Dismissible announcement bar
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

  // Set CSS variable for banner height so navbar can offset.
  //
  // The cleanup matters: this writes to <html>, which outlives the component.
  // While the banner was mounted per page rather than in the root layout,
  // navigating to a route without it left --banner-h at its old value, so the
  // navbar reserved space for a banner that was no longer rendered. Resetting
  // on unmount keeps that from happening again if it is ever moved back.
  useEffect(() => {
    const root = document.documentElement;

    if (visible && bannerRef.current) {
      root.style.setProperty("--banner-h", `${bannerRef.current.offsetHeight}px`);
    } else {
      root.style.setProperty("--banner-h", "0px");
    }

    return () => root.style.setProperty("--banner-h", "0px");
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
            <div className="border-b border-white/[0.06] bg-[#0b0e18]">
              <div className="max-w-[1200px] mx-auto px-6 py-2 flex items-center justify-center gap-3">
                <GraduationCap className="w-4 h-4 text-indigo-300 flex-shrink-0 hidden sm:block" />
                <p className="text-[13px] text-slate-300 text-center">
                  Students get <span className="font-semibold text-white">1 month of Pro free</span> with a .edu email.{" "}
                  <a
                    href={`${APP_URL}/sign-up`}
                    className="font-semibold text-indigo-300 hover:text-white transition-colors"
                  >
                    Claim now <Chevron />
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

      {/* Spacer, pushes page content below the fixed banner */}
      {visible && <div style={{ height: "var(--banner-h, 0px)" }} />}

    </>
  );
}