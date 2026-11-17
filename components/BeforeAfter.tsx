"use client";

import { motion } from "framer-motion";
import { H2, LABEL } from "@/components/page/Layout";
import {
  SpotlightCard,
  StaggerChildren,
  StaggerItem,
  RevealOnScroll,
  GlowDivider,
} from "@/components/LandingAnimations";

const WITHOUT = [
  { text: "Spray-and-pray 200+ applications", icon: "😩" },
  { text: "Resume gets auto-rejected by ATS", icon: "🚫" },
  { text: "Wing interviews with zero practice", icon: "😰" },
  { text: "Copy-paste the same cover letter", icon: "📋" },
  { text: "Track applications in a messy spreadsheet", icon: "📊" },
  { text: "Wait weeks. Hear nothing. Repeat.", icon: "⏳" },
];

const WITH = [
  { text: "Apply to 20 targeted roles with tailored materials", icon: "🎯" },
  { text: "Resume scores 85+ on ATS every time", icon: "✅" },
  { text: "Walk in calm after 20+ mock interviews", icon: "😌" },
  { text: "AI writes unique letters matching each role", icon: "✨" },
  { text: "Kanban board + contact finder + AI outreach", icon: "🚀" },
  { text: "Land interviews in weeks, not months", icon: "🎉" },
];

export default function BeforeAfter() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <GlowDivider />

        <RevealOnScroll className="text-center mb-14 mt-14">
          <p className={`${LABEL} text-indigo-400 mb-3`}>The difference</p>
          <h2 className={H2}>
            Same you. <span className="text-gradient">Different strategy.</span>
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* WITHOUT */}
          <RevealOnScroll>
            <SpotlightCard
              className="rounded-xl border border-red-500/10 bg-red-500/[0.02] p-6 h-full"
              spotlightColor="rgba(239,68,68,0.04)"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.01em] text-red-400">Without Preciprocal</h3>
              </div>
              <StaggerChildren className="space-y-3">
                {WITHOUT.map((item, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/[0.03] border border-red-500/[0.06]
                                    hover:bg-red-500/[0.06] transition-colors duration-200">
                      <span className="text-base flex-shrink-0">{item.icon}</span>
                      <p className="text-[15px] text-slate-400 leading-snug">{item.text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </SpotlightCard>
          </RevealOnScroll>

          {/* WITH */}
          <RevealOnScroll delay={0.1}>
            <SpotlightCard
              className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] p-6 h-full"
              spotlightColor="rgba(16,185,129,0.04)"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.01em] text-emerald-400">With Preciprocal</h3>
              </div>
              <StaggerChildren className="space-y-3">
                {WITH.map((item, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/[0.03] border border-emerald-500/[0.06]
                                    hover:bg-emerald-500/[0.06] transition-colors duration-200">
                      <span className="text-base flex-shrink-0">{item.icon}</span>
                      <p className="text-[15px] text-slate-300 leading-snug">{item.text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </SpotlightCard>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}