"use client";

import { motion } from "framer-motion";
import { ChevronRightIcon } from "@/components/Icons";
import { APP_URL } from "@/lib/constants";
import { MagneticHover } from "@/components/LandingAnimations";
import SmoothGlow from "@/components/ui/SmoothGlow";

export default function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Drawn on a canvas with dithered alpha (components/ui/SmoothGlow), so
            the falloff is smooth: a CSS gradient this faint bands into rings. */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-[640px] w-[1140px] max-w-none">
          <SmoothGlow peak={0.22} falloff={1.8} className="h-full w-full" />
        </motion.div>
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
          className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto">
          Start with whatever is worrying you most. It is free, and it takes a minute.
        </motion.p>


        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center">
          <MagneticHover>
            <a href={`${APP_URL}/sign-up`}
              className="inline-flex items-center justify-center gap-2 px-12 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl text-lg transition-all hover:brightness-110 group">
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