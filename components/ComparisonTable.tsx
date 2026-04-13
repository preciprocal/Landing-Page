"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Crown, ArrowRight } from "lucide-react";
import {
  SpotlightCard,
  StaggerChildren,
  StaggerItem,
  RevealOnScroll,
  MagneticHover,
  FloatingDots,
} from "@/components/LandingAnimations";

const features = [
  "ATS Resume Scoring",
  "Candidate Benchmarking",
  "Recruiter Eye Simulation",
  "Interview Intelligence",
  "AI Mock Interviews (Voice)",
  "AI Study Planner",
  "Cover Letter Generator",
  "LinkedIn Optimiser",
  "Cold Outreach Generator",
  "Job Tracker + Contact Finder",
  "Chrome Extension",
  "Price (monthly)",
];

const competitors = [
  { name: "Preciprocal", highlight: true, values: [true, true, true, true, true, true, true, true, true, true, true, "$9.99"] },
  { name: "Resumeworded", highlight: false, values: [true, false, false, false, false, false, false, true, false, false, false, "$49+"] },
  { name: "Jobright", highlight: false, values: [false, false, false, false, false, false, true, false, false, true, true, "$29+"] },
  { name: "Final Round AI", highlight: false, values: [true, false, false, false, true, false, true, false, false, false, true, "$99+"] },
  { name: "Jobscan", highlight: false, values: [true, false, false, false, false, false, false, true, false, false, true, "$49.95"] },
  { name: "Interviewing.io", highlight: false, values: [false, false, false, false, true, false, false, false, false, false, false, "$100+"] },
] as const;

function CellCheck({ active, highlight }: { active: boolean; highlight: boolean }) {
  if (!active) {
    return (
      <div className="w-5 h-5 rounded-full bg-white/[0.04] flex items-center justify-center">
        <X className="w-3 h-3 text-slate-700" />
      </div>
    );
  }
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`w-5 h-5 rounded-full flex items-center justify-center ${
        highlight ? "bg-emerald-500/20 text-emerald-400" : "bg-white/[0.06] text-slate-500"
      }`}
    >
      <Check className="w-3 h-3" />
    </motion.div>
  );
}

export default function ComparisonTable() {
  // Track when stagger animation is done so we can enable horizontal scroll
  const [animDone, setAnimDone] = useState(false);

  return (
    <section className="relative py-24 overflow-hidden">
      <FloatingDots count={15} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <RevealOnScroll className="text-center mb-14">
          <p className="text-[13px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Why Preciprocal
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Everything they charge extra for.{" "}
            <span className="text-gradient">We include.</span>
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Other tools give you one feature for $50–100/mo. Preciprocal gives you the full stack at $9.99.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <SpotlightCard
            className="rounded-2xl border border-white/[0.06] bg-[#0a0f1e]/80 overflow-hidden"
            spotlightColor="rgba(99,102,241,0.06)"
          >
            {/* overflow-hidden during animation, overflow-x-auto after */}
            <div className={animDone ? "overflow-x-auto" : "overflow-hidden"}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              <style dangerouslySetInnerHTML={{ __html: `
                .comparison-inner::-webkit-scrollbar { display: none; }
              `}} />

              <div className="comparison-inner">
                {/* Header row */}
                <div
                  className="grid min-w-[860px] border-b border-white/[0.06]"
                  style={{ gridTemplateColumns: `minmax(160px, 1.4fr) repeat(${competitors.length}, 1fr)` }}
                >
                  <div className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Feature</div>
                  {competitors.map(c => (
                    <div key={c.name} className={`p-4 text-center ${c.highlight ? "bg-indigo-500/[0.06]" : ""}`}>
                      {c.highlight && (
                        <motion.span
                          initial={{ opacity: 0, y: -8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[8px] text-indigo-400 font-bold mb-1"
                        >
                          <Crown className="w-2.5 h-2.5" /> BEST VALUE
                        </motion.span>
                      )}
                      <p className={`text-[12px] font-bold mt-1 ${c.highlight ? "text-indigo-300" : "text-slate-400"}`}>{c.name}</p>
                    </div>
                  ))}
                </div>

                {/* Feature rows — stagger in, then enable scroll */}
                <StaggerChildren onAnimationComplete={() => setAnimDone(true)}>
                  {features.map((feat, fi) => (
                    <StaggerItem key={feat}>
                      <div
                        className={`grid min-w-[860px] border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors duration-200 ${fi % 2 === 0 ? "" : "bg-white/[0.01]"}`}
                        style={{ gridTemplateColumns: `minmax(160px, 1.4fr) repeat(${competitors.length}, 1fr)` }}
                      >
                        <div className="p-3 px-4 text-[12px] text-slate-300 font-medium flex items-center">{feat}</div>
                        {competitors.map(c => {
                          const val = c.values[fi];
                          return (
                            <div key={`${c.name}-${feat}`} className={`p-3 flex items-center justify-center ${c.highlight ? "bg-indigo-500/[0.03]" : ""}`}>
                              {typeof val === "string" ? (
                                <span className={`text-[13px] font-bold ${c.highlight ? "text-emerald-400" : "text-slate-400"}`}>{val}</span>
                              ) : (
                                <CellCheck active={val} highlight={c.highlight} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>
            </div>
          </SpotlightCard>
        </RevealOnScroll>

        <p className="text-[10px] text-slate-600 text-center mt-4">
          Feature comparison based on publicly available information as of April 2026. Pricing reflects published plans.
        </p>

        <RevealOnScroll delay={0.3} className="flex justify-center mt-8">
          <MagneticHover>
            <a
              href="https://app.preciprocal.com/sign-up"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-[14px]
                         bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
                         shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300"
            >
              Get all 11 features for $9.99
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticHover>
        </RevealOnScroll>
      </div>
    </section>
  );
}