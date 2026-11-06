"use client";

/**
 * Hero illustration for /chrome-extension: a job posting in a browser, the
 * save button pressed, and the job landing in the tracker.
 * Steps: 0 posting, 1 button pressed, 2 saved toast, 3 in the tracker.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Check } from "lucide-react";
import { Chip, EASE, Line, Stage, Window, useLoop } from "./Frame";

export default function ChromeExtensionVisual() {
  const { ref, step } = useLoop(4, 1500);
  const pressed = step >= 1;
  const saved = step >= 2;

  return (
    <div ref={ref}>
      <Stage>
        <Window title="linkedin.com/jobs/view/senior-product-designer">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-accent-deep/40 to-accent-deep-2/30 text-sm font-bold text-white">
                N
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Senior Product Designer</p>
                <p className="text-[11px] text-slate-500">Northwind · Remote · Full-time</p>
              </div>
            </div>
            <motion.div
              animate={pressed ? { scale: [1, 0.9, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors duration-300 ${
                saved ? "border-accent/40 bg-accent/15 text-accent-soft" : "border-white/10 bg-white/[0.04] text-slate-300"
              }`}
            >
              {saved ? <Check className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
              {saved ? "Saved" : "Save"}
            </motion.div>
          </div>

          <div className="mt-6 space-y-2.5">
            <Line w="w-11/12" />
            <Line w="w-full" />
            <Line w="w-4/5" />
            <Line w="w-2/3" />
          </div>
          {/* The captured description: lines light up in the accent as they are read */}
          <div className="mt-5 space-y-2.5">
            {["w-full", "w-10/12", "w-9/12"].map((w, i) => (
              <motion.div
                key={w}
                className={`h-2 rounded-full ${w}`}
                animate={{ backgroundColor: saved ? "rgb(var(--accent) / 0.28)" : "rgba(255,255,255,0.07)" }}
                transition={{ duration: 0.4, delay: saved ? i * 0.12 : 0 }}
              />
            ))}
          </div>
        </Window>

        {/* Cursor travelling to the save button */}
        <motion.svg
          viewBox="0 0 24 24"
          className="absolute h-5 w-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          initial={false}
          animate={step === 0 ? { left: "55%", top: "70%" } : { left: "86%", top: "22%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <path d="M4 2l16 9-7 2-3 7z" fill="white" stroke="#0a0f1c" strokeWidth="1.2" />
        </motion.svg>

        <Chip show={saved} className="-bottom-5 left-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Check className="h-3 w-3" />
          </span>
          Description captured
        </Chip>

        <AnimatePresence>
          {step === 3 && (
            <motion.div
              key="tracker"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute -right-6 bottom-10 w-48 rounded-xl border border-white/10 bg-[#0d1322]/95 p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Tracker · Saved</p>
              <div className="mt-2 rounded-lg border border-accent/30 bg-accent/[0.08] p-2">
                <p className="text-[11px] font-semibold text-white">Senior Product Designer</p>
                <p className="text-[10px] text-slate-400">Northwind</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Stage>
    </div>
  );
}
