"use client";

import { motion } from "framer-motion";
import { UNIVERSITY_LOGOS } from "@/lib/constants";

export default function LogoBar() {
  const doubled = [...UNIVERSITY_LOGOS, ...UNIVERSITY_LOGOS];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative py-10 overflow-hidden border-y border-white/[0.04]"
    >
      <p className="text-center text-[10px] font-semibold text-slate-700 uppercase tracking-[0.14em] mb-6">
        Trusted by students at
      </p>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#050810] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#050810] to-transparent z-10 pointer-events-none" />

      <div className="relative overflow-hidden">
        <div className="flex w-max animate-scroll-logos-slow gap-3">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.025] text-[12px] font-semibold text-slate-500 whitespace-nowrap hover:border-white/[0.1] hover:text-slate-400 transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-logos-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-logos-slow {
          animation: scroll-logos-slow 60s linear infinite;
        }
        .animate-scroll-logos-slow:hover {
          animation-play-state: paused;
        }
      `}} />
    </motion.div>
  );
}