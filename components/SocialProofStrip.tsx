"use client";

import { motion } from "framer-motion";
import Counter from "@/components/Counter";
import { RevealOnScroll, GlowDivider } from "@/components/LandingAnimations";

const PROOF = [
  { value: 25000, suffix: "+", label: "Mock interviews completed", icon: "🎤" },
  { value: 12000, suffix: "+", label: "Resumes optimised", icon: "📄" },
  { value: 3200, suffix: "+", label: "Offers landed", icon: "🎉" },
  { value: 89, suffix: "%", label: "Interview callback rate after optimisation", icon: "📈" },
];

export default function SocialProofStrip() {
  return (
    <section className="py-12 border-y border-white/[0.04] relative">
      {/* Animated glow line at top */}
      <div className="absolute top-0 left-0 right-0">
        <GlowDivider />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {PROOF.map((item) => (
              <div key={item.label} className="text-center">
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  <Counter end={item.value} suffix={item.suffix} />
                </div>
                <p className="text-[12px] text-slate-500 mt-1 leading-snug max-w-[160px] mx-auto">{item.label}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      {/* Animated glow line at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <GlowDivider />
      </div>
    </section>
  );
}