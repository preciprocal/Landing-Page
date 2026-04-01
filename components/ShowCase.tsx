"use client";

import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/Meteors";

const interviewers = [
  { role: "Technical Lead", initial: "T", gradient: "from-indigo-500 to-purple-500" },
  { role: "HR Manager", initial: "H", gradient: "from-blue-500 to-cyan-500" },
  { role: "Hiring Manager", initial: "M", gradient: "from-purple-500 to-pink-500" },
];

export default function Showcase() {
  return (
    <section className="relative">
      <div className="max-w-[1200px] mx-auto px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl p-8 sm:p-12 overflow-hidden
                     bg-gradient-to-br from-brand/[0.08] to-brand-purple/[0.04]
                     border border-brand/[0.15]"
        >
          {/* Meteors background */}
          <Meteors number={15} />

          {/* Tag */}
          <div className="relative z-10 inline-block px-3 py-1.5 rounded-lg bg-brand/[0.15] text-xs font-semibold text-brand-lighter mb-4">
            Most Popular Feature
          </div>

          <h3 className="relative z-10 text-2xl sm:text-[28px] font-extrabold text-white tracking-tight mb-3">
            Multi-Interviewer AI Simulation
          </h3>
          <p className="relative z-10 text-base text-slate-400 leading-relaxed max-w-[600px] mb-10">
            Unlike single-bot tools, Preciprocal simulates a real interview panel.
            Technical leads, HR managers, and hiring managers — each with different
            priorities, asking follow-ups based on your actual answers.
          </p>

          {/* Simulated panel */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {interviewers.map((iv, i) => (
              <motion.div
                key={iv.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="bg-black/30 border border-white/[0.06] rounded-xl p-6 text-center
                           transition-all hover:border-white/[0.12] hover:bg-black/40"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${iv.gradient}
                              mx-auto mb-3 flex items-center justify-center
                              text-lg font-bold text-white`}
                >
                  {iv.initial}
                </div>
                <p className="text-sm font-semibold text-slate-200">{iv.role}</p>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-slate-500">Active</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}