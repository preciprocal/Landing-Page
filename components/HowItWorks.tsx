"use client";

import { motion } from "framer-motion";
import { STEPS } from "@/lib/constants";
import { RevealOnScroll, StaggerChildren, StaggerItem, SpotlightCard } from "@/components/LandingAnimations";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative">
      <div className="max-w-[900px] mx-auto px-6 pb-28">
        <RevealOnScroll className="text-center mb-16">
          <p className="text-[13px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-4">
            Three steps. <span className="text-gradient">Zero guesswork.</span>
          </h2>
          <p className="text-base text-slate-400 max-w-lg mx-auto">
            Most people fail interviews because they practised the wrong things. We make sure you don&apos;t.
          </p>
        </RevealOnScroll>

        <StaggerChildren className="flex flex-col">
          {STEPS.map((step, i) => (
            <StaggerItem key={step.number}>
              <div className={`flex gap-6 sm:gap-8 items-start py-10 ${i < STEPS.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                <SpotlightCard
                  className="flex-shrink-0 w-16 h-16 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.12] flex items-center justify-center"
                  spotlightColor="rgba(99,102,241,0.08)"
                >
                  <span className="text-[22px] font-extrabold text-indigo-400">{step.number}</span>
                </SpotlightCard>
                <div>
                  <h3 className="text-xl sm:text-[22px] font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-base text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}