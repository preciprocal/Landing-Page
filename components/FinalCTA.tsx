"use client";

import { motion } from "framer-motion";
import { ChevronRightIcon } from "@/components/Icons";
import { APP_URL } from "@/lib/constants";
import { MagneticHover } from "@/components/LandingAnimations";

export default function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />

      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[13px] text-slate-400 font-medium mb-6">
          You read this far. The clock did not stop while you did.
        </motion.p>

        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
          Make the days you have left
          <br />
          <span className="text-gradient">count.</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-slate-400 mb-4 leading-relaxed max-w-xl mx-auto">
          Start with the thing worrying you most: the resume nobody answers, the interview you cannot predict, or the days you keep counting. It is free to start, and it takes a minute.
        </motion.p>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm text-emerald-400 font-medium mb-10">
          Land a job while you&apos;re subscribed and we&apos;ll refund that month.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center">
          <MagneticHover>
            <a href={`${APP_URL}/sign-up`}
              className="inline-flex items-center justify-center gap-2 px-12 py-4 bg-[#5b6cff] text-white font-semibold rounded-xl text-lg transition-all hover:brightness-110 group">
              Start free
              <ChevronRightIcon className="transition-transform group-hover:translate-x-1" />
            </a>
          </MagneticHover>
          <p className="text-[12px] text-slate-600 mt-3">
            Free plan available · No credit card · Cancel anytime ·{" "}
            <a href="/faq" className="text-indigo-400/60 hover:text-indigo-400 transition-colors">FAQ</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}