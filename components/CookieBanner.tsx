"use client";

/**
 * CookieBanner.tsx
 * GDPR/CCPA compliant cookie consent banner.
 * Shows on first visit, persists decision in localStorage.
 * Add <CookieBanner /> to your root layout.tsx just before </body>.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "preciprocal_cookie_consent";

type ConsentState = "accepted" | "declined" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>("accepted"); // default hidden until hydrated
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState | null;
    setConsent(stored); // null = not yet decided → show banner
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
    // Here you would enable analytics scripts if you're loading them conditionally
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setConsent("declined");
    // Here you would disable/skip analytics initialisation
  };

  // Don't render until client hydration is done (avoids SSR mismatch)
  if (!mounted) return null;

  const show = consent === null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[9999]"
        >
          <div className="rounded-2xl border border-white/[0.1] bg-[#0d1221]/95 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.6)] p-5">
            {/* Close / dismiss */}
            <button
              onClick={handleDecline}
              aria-label="Dismiss"
              className="absolute top-3 right-3 p-1 rounded-lg text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">
                  We use cookies
                </p>
                <p className="text-[12px] text-slate-400 leading-relaxed">
                  Essential cookies keep you logged in. Analytics cookies (optional)
                  help us improve the product.{" "}
                  <Link
                    href="/privacy"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
                  >
                    Privacy policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleDecline}
                className="flex-1 py-2 px-3 rounded-lg text-[12px] font-semibold text-slate-300 bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.09] transition-all"
              >
                Essential only
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 py-2 px-3 rounded-lg text-[12px] font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-all"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}