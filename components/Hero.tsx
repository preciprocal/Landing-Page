"use client";

import { motion } from "framer-motion";
import { APP_URL, STATS } from "@/lib/constants";
import { ArrowRightIcon } from "@/components/Icons";
import { Spotlight } from "@/components/ui/SpotLight";
import { FlipWords } from "@/components/ui/FlipWords";
import { MovingBorder } from "@/components/ui/MovingBorder";

const FLIP_WORDS = ["dream job", "FAANG offer", "career break", "next chapter", "big promotion"];

export default function Hero() {
  return (
    <div className="relative overflow-x-hidden overflow-y-visible bg-[#050810] pt-28 pb-16 antialiased bg-grid">

      {/* Spotlights — above everything, no mask killing them */}
      <Spotlight fill="#6366f1" className="w-[900px] h-[900px] -top-40 -left-60 z-[2]" />
      <Spotlight fill="#818cf8" className="w-[900px] h-[900px] -top-40 -right-60 z-[2]" />

      {/* Subtle edge darkening — only kills the very corners, not the centre */}
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 60%, #050810 100%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[12px] font-medium text-slate-400 tracking-wide">11 AI-powered tools · Free to start</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-8 px-2 sm:px-0"
          >
            Stop applying into the void.
            <span className="block mt-2 text-slate-400 font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
              Start landing your{" "}
              <FlipWords
                words={FLIP_WORDS}
                duration={2500}
                className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-extrabold"
              />
            </span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed px-2 sm:px-0"
          >
            You&apos;re not unqualified — you&apos;re unprepared. Preciprocal gives you AI mock interviews,
            resume analysis, cover letters, study plans, and job tracking so you walk into every interview
            knowing you belong there.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center px-2 sm:px-0"
          >
            <MovingBorder
              as="a"
              href={`${APP_URL}/sign-up`}
              duration={2800}
              borderRadius="0.75rem"
              containerClassName="w-full sm:w-auto"
              borderClassName="bg-[radial-gradient(#818cf8_40%,#c084fc_60%,transparent_70%)]"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-[15px] flex items-center justify-center gap-2 group transition-shadow hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)]"
            >
              Start Preparing Free
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
            </MovingBorder>

            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent text-slate-200 border border-white/[0.12] rounded-xl font-medium transition-all hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-0.5"
            >
              See All Features
            </a>
          </motion.div>

          {/* Trust micro-copy */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-5 text-[12px] text-slate-500 px-2 sm:px-0"
          >
            {["No credit card required", "30-day money-back guarantee", "Cancel anytime"].map((txt) => (
              <span key={txt} className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {txt}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-14 max-w-[700px] mx-auto px-2 sm:px-0"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-[12px] text-slate-500 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}