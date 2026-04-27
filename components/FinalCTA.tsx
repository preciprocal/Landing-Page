"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRightIcon } from "@/components/Icons";
import { APP_URL } from "@/lib/constants";
import { MagneticHover } from "@/components/LandingAnimations";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background treatment — grid + contained glow */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />

      {/* Top border line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      {/* Bottom border line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 max-w-[720px] mx-auto px-6 text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold text-indigo-400/70 uppercase tracking-[0.15em] mb-8"
        >
          You&apos;ve scrolled this far. That tells me something.
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2rem,5vw,3.4rem)] font-extrabold text-white tracking-tight leading-[1.1] mb-5"
        >
          The only thing between you{" "}
          <br className="hidden sm:block" />
          and that offer is{" "}
          <span className="text-gradient">preparation.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="text-[15px] text-slate-500 mb-3 leading-relaxed max-w-md mx-auto"
        >
          Every week you wait, someone less qualified but better prepared takes the role you wanted.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.32 }}
          className="text-[13px] text-emerald-400/80 font-medium mb-10"
        >
          30-day money-back guarantee. If it doesn&apos;t work, you pay nothing.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <MagneticHover>
            <a
              href={`${APP_URL}/sign-up`}
              className="inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold rounded-xl text-[16px] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(99,102,241,0.35)] group"
            >
              Start Preparing — It&apos;s Free
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1 w-4 h-4" />
            </a>
          </MagneticHover>

          <p className="text-[11px] text-slate-700">
            Free plan available · No credit card · Cancel anytime ·{" "}
            <a href="/faq" className="text-indigo-400/50 hover:text-indigo-400 transition-colors">FAQ</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}