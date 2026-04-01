"use client";

import { motion } from "framer-motion";
import { STEPS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative">
      <div className="max-w-[900px] mx-auto px-6 pb-28">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[13px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            How It Works
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-4">
            Three steps. <span className="text-gradient">Zero guesswork.</span>
          </motion.h2>
          <p className="text-base text-slate-400 max-w-lg mx-auto">
            Most people fail interviews because they practised the wrong things. We make sure you don&apos;t.
          </p>
        </div>

        <div className="flex flex-col">
          {STEPS.map((step, i) => (
            <motion.div key={step.number}
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className={`flex gap-6 sm:gap-8 items-start py-10 ${i < STEPS.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-indigo-500/[0.12] border border-indigo-500/20 flex items-center justify-center text-[22px] font-extrabold text-indigo-400">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl sm:text-[22px] font-bold text-white mb-2">{step.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}