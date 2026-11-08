"use client";

/**
 * Hero illustration for /chrome-extension: a job posting open in the
 * browser with the extension's save button. The cursor presses it, the
 * description is captured (its key lines light up), and the job lands in
 * the tracker as a new card.
 * Steps: 0 posting, 1 button pressed, 2 description captured, 3 in the
 * tracker (finished state).
 * The company, role and posting text are fictional examples.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Check, MapPin } from "lucide-react";
import { Chip, EASE, Stage, Window, useLoop } from "./Frame";

const REQUIREMENTS = [
  "5+ years designing web or mobile products",
  "A portfolio with shipped, end to end work",
  "Experience growing a design system",
];

export default function ChromeExtensionVisual() {
  const { ref, step } = useLoop(4, 1600);
  const pressed = step >= 1;
  const saved = step >= 2;

  const mark = (text: string, i: number) => (
    <motion.span
      className="rounded px-0.5"
      initial={false}
      animate={{ backgroundColor: saved ? "rgb(var(--accent) / 0.18)" : "rgb(var(--accent) / 0)" }}
      transition={{ duration: 0.4, delay: saved ? i * 0.12 : 0 }}
    >
      {text}
    </motion.span>
  );

  return (
    <div ref={ref}>
      <Stage>
        <Window title="linkedin.com/jobs/view/senior-product-designer" bodyClassName="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-accent-deep to-accent-deep-2 text-[15px] font-bold text-white">
                N
              </div>
              <div>
                <p className="text-[14px] font-semibold text-white">Senior Product Designer</p>
                <p className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                  Northwind <span className="text-slate-500">·</span> <MapPin className="h-3 w-3" /> Remote, US <span className="text-slate-500">·</span> Full-time
                </p>
              </div>
            </div>
            <motion.div
              animate={pressed ? { scale: [1, 0.9, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors duration-300 ${
                saved ? "border-accent/40 bg-accent/15 text-accent-soft" : "border-accent/30 bg-accent text-[#0a0f1c]"
              }`}
            >
              {saved ? <Check className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
              {saved ? "Saved" : "Save job"}
            </motion.div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {["$140k to $165k", "Design systems", "Posted 2 days ago"].map((t) => (
              <span key={t} className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[10.5px] font-medium text-slate-300">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 border-t border-white/[0.06] pt-4">
            <p className="text-[12px] font-semibold text-white">About the role</p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-300">
              You will lead design for {mark("onboarding and billing", 0)}, working closely with product and engineering to {mark("ship and measure", 1)} every change.
            </p>
            <p className="mt-3 text-[12px] font-semibold text-white">What you bring</p>
            {/* Right padding keeps the bullets clear of the floating tracker card. */}
            <ul className="mt-1.5 space-y-1 pr-44">
              {REQUIREMENTS.map((r, i) => (
                <li key={r} className="flex items-start gap-2 text-[11.5px] leading-snug text-slate-300">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                  {mark(r, i + 2)}
                </li>
              ))}
            </ul>
          </div>
        </Window>

        {/* Cursor travelling to the save button */}
        <motion.svg
          viewBox="0 0 24 24"
          className="absolute h-5 w-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          initial={false}
          animate={step === 0 ? { left: "52%", top: "62%" } : { left: "88%", top: "24%" }}
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
              className="absolute -bottom-3 -right-3 z-10 w-52 rounded-xl border border-white/[0.14] bg-gradient-to-b from-[#161d30]/95 to-[#0e1424]/95 p-3 shadow-[0_24px_50px_-14px_rgba(0,0,0,0.9)] backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">Tracker</p>
                <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent-soft">Saved</span>
              </div>
              <div className="mt-2 rounded-lg border border-accent/30 bg-accent/[0.08] p-2.5">
                <p className="text-[11.5px] font-semibold text-white">Senior Product Designer</p>
                <p className="text-[10.5px] text-slate-400">Northwind · Remote</p>
                <p className="mt-1 text-[10.5px] text-accent-soft">Follow up Thu</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Stage>
    </div>
  );
}
