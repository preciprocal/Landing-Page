"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/Icons";
import { APP_URL } from "@/lib/constants";
import { MagneticHover } from "@/components/LandingAnimations";

export default function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-[600px] h-[300px] rounded-full blur-[120px] bg-indigo-500/20" />
      </div>

      {/* Top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <motion.div initial={{ width: 0, opacity: 0 }} whileInView={{ width: 400, opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[13px] text-indigo-400 font-medium mb-6">
          You&apos;ve scrolled this far. That tells me something.
        </motion.p>

        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
          The only thing between you
          <br />
          and that offer is <span className="text-gradient">preparation.</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-slate-400 mb-4 leading-relaxed max-w-xl mx-auto">
          Every week you wait is another week someone less qualified but better prepared gets the role you wanted. Don&apos;t let that be your story.
        </motion.p>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm text-emerald-400 font-medium mb-10">
          30-day money-back guarantee. If it doesn&apos;t work, you pay nothing.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center">
          <MagneticHover>
            <a href={`${APP_URL}/sign-up`}
              className="inline-flex items-center justify-center gap-2 px-12 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl text-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)] group">
              Start Preparing — It&apos;s Free
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
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