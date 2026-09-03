"use client";

import { motion } from "framer-motion";
import Counter from "@/components/Counter";
import { RevealOnScroll, GlowDivider } from "@/components/LandingAnimations";

/**
 * Only claims that are verifiable from the product itself.
 *
 * This strip previously published usage and outcome figures: 25,000+ mock
 * interviews completed, 12,000+ resumes optimised, 3,200+ offers landed, and an
 * 89% interview callback rate. None of those were measured, and the callback
 * rate was a performance claim about results users could expect.
 *
 * Fabricated usage numbers and efficacy claims are prohibited under the FTC Act
 * and the FTC's rule on consumer reviews and testimonials, and the equivalent
 * consumer protection rules in the UK and EU. They also cannot be substantiated
 * if anyone asks, which is the practical problem.
 *
 * Every number below can be counted in this repository. If you later have real,
 * measured usage data, it can go back here, but it must be data you can show.
 */
const PROOF = [
  { value: 11, suffix: "", label: "AI tools in one subscription", icon: "🧰" },
  { value: 56, suffix: "", label: "Company interview prep guides", icon: "🏢" },
  { value: 41, suffix: "", label: "Roles with tailored questions", icon: "🎯" },
  { value: 32, suffix: "", label: "In-depth career and visa guides", icon: "📚" },
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