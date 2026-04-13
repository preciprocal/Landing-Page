"use client";

import { motion } from "framer-motion";
import {
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
  SpotlightCard,
  GlowDivider,
} from "@/components/LandingAnimations";

const PAIN_POINTS = [
  { stat: "73%", pain: "of applications get auto-rejected by ATS before a human sees them", color: "text-red-400", barColor: "bg-red-500", barWidth: "73%" },
  { stat: "6 sec", pain: "is all a recruiter spends scanning your resume", color: "text-amber-400", barColor: "bg-amber-500", barWidth: "6%" },
  { stat: "45%", pain: "of candidates bomb interviews from nerves, not lack of skill", color: "text-orange-400", barColor: "bg-orange-500", barWidth: "45%" },
  { stat: "200+", pain: "applications is the average before landing one offer", color: "text-red-400", barColor: "bg-red-500", barWidth: "85%" },
];

export default function ProblemSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <GlowDivider />

        <RevealOnScroll className="text-center mb-16 mt-10">
          <p className="text-[13px] font-semibold text-red-400/80 uppercase tracking-widest mb-3">
            The uncomfortable truth
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-5">
            The job market isn&apos;t broken.
            <br />
            <span className="text-slate-500">Your preparation is.</span>
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            You&apos;re not getting rejected because you&apos;re not good enough.
            You&apos;re getting rejected because you don&apos;t know the rules of a game
            that&apos;s been rigged against you.
          </p>
        </RevealOnScroll>

        <StaggerChildren className="space-y-4">
          {PAIN_POINTS.map((point, i) => (
            <StaggerItem key={i}>
              <SpotlightCard
                className="rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-red-500/10 transition-all duration-300"
                spotlightColor="rgba(239,68,68,0.04)"
              >
                <div className="flex items-center gap-5 p-5">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className={`text-2xl sm:text-3xl font-black tracking-tight ${point.color}`}>
                      {point.stat}
                    </span>
                  </div>
                  <div className="w-[1px] h-10 bg-white/[0.06] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] text-slate-300 leading-snug mb-2">{point.pain}</p>
                    <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: point.barWidth }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full ${point.barColor} opacity-40`}
                      />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <RevealOnScroll delay={0.4} className="text-center mt-12">
          <p className="text-lg text-white font-semibold">
            What if you could flip every one of those numbers?
          </p>
          <p className="text-sm text-slate-500 mt-1">
            That&apos;s exactly what Preciprocal does. ↓
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}