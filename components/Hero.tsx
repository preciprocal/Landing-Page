"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Counter from "@/components/Counter";
import { APP_URL, STATS } from "@/lib/constants";
import { ArrowRightIcon, SparkIcon } from "@/components/Icons";
import { Spotlight } from "./ui/SpotLight";

const words = ["dream job", "FAANG offer", "career break", "next chapter", "big promotion"];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIndex((p) => (p + 1) % words.length); setShow(true); }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="inline-block transition-all duration-400" style={{
      opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)",
      filter: show ? "blur(0px)" : "blur(4px)", paddingBottom: "0.15em",
      backgroundImage: "linear-gradient(135deg, #818cf8, #c084fc, #818cf8)",
      backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    }}>
      {words[index]}
    </span>
  );
}

export default function Hero() {
  return (
    <div className="relative overflow-x-hidden overflow-y-visible bg-[#050810] pt-28 pb-16 antialiased bg-grid">
      {/* Spotlights — hidden on mobile to prevent overflow issues */}
      <div className="hidden md:block">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#818cf8" />
        <Spotlight className="-top-40 right-0 md:right-60 md:-top-20" fill="#6366f1" />
      </div>
      <div className="absolute inset-0 w-full h-full bg-[#050810]" style={{
        maskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
        WebkitMaskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
            <SparkIcon className="text-indigo-300" />
            <span className="text-[13px] font-medium text-indigo-300">Trusted by 25,000+ job seekers</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-5 px-2 sm:px-0">
            Stop applying into the void.
            <br />
            <span className="text-slate-400 font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
              Start landing your <RotatingWord />
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed px-2 sm:px-0">
            You&apos;re not unqualified — you&apos;re unprepared. Preciprocal gives you AI mock interviews,
            resume analysis, cover letters, study plans, and job tracking so you walk into every interview
            knowing you belong there.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center px-2 sm:px-0">
            <a href={`${APP_URL}/sign-up`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)] group">
              Start Preparing Free <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent text-slate-200 border border-white/[0.12] rounded-xl font-medium transition-all hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-0.5">
              See All Features
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-5 text-[12px] text-slate-500 px-2 sm:px-0">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              30-day money-back guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              Cancel anytime
            </span>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-14 max-w-[700px] mx-auto px-2 sm:px-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                <Counter end={stat.value} suffix={stat.suffix} isDecimal={"isDecimal" in stat && !!stat.isDecimal} />
              </div>
              <div className="text-[11px] sm:text-[12px] text-slate-500 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}