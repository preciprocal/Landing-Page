"use client";

import { motion } from "framer-motion";
import { UNIVERSITY_LOGOS } from "@/lib/constants";

export default function LogoBar() {
  const doubled = [...UNIVERSITY_LOGOS, ...UNIVERSITY_LOGOS];
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="border-y border-white/[0.04] py-8 overflow-hidden">
      <p className="text-center text-xs font-semibold text-slate-600 uppercase tracking-[0.1em] mb-5">Trusted by students at top universities</p>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050810] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050810] to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-scroll-logos-slow">
          {doubled.map((name, i) => (
            <span key={i} className="text-base font-semibold text-slate-600 whitespace-nowrap px-8">{name}</span>
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