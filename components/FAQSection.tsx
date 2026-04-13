"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { LANDING_FAQS } from "@/lib/constants";
import {
  SpotlightCard,
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
  GlowDivider,
  FloatingDots,
} from "@/components/LandingAnimations";

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: { id: string; q: string; a: string }; index: number; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <SpotlightCard
      className={`rounded-xl border transition-colors duration-300 ${
        isOpen ? "border-indigo-500/20 bg-[#0a0f1e]" : "border-white/[0.06] bg-[#0a0f1e]/80 hover:border-white/[0.1]"
      }`}
      spotlightColor={isOpen ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.03)"}
    >
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 text-left cursor-pointer group" aria-expanded={isOpen}>
        <div className="flex items-center gap-3 pr-4">
          <span className={`flex-shrink-0 w-6 h-6 rounded-lg text-[10px] font-bold flex items-center justify-center transition-colors duration-300 ${
            isOpen ? "bg-indigo-500/20 text-indigo-400" : "bg-white/[0.04] text-slate-600 group-hover:text-slate-400"
          }`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`text-[14px] font-semibold transition-colors duration-200 ${isOpen ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
            {faq.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors duration-300 ${
            isOpen ? "bg-indigo-500/15 text-indigo-400" : "bg-white/[0.04] text-slate-600"
          }`}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.25, delay: 0.05 } }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-14">
              <div className="w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-3" />
              <p className="text-[13px] text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SpotlightCard>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="relative py-24 overflow-hidden">
      <FloatingDots count={12} />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <GlowDivider />
        <RevealOnScroll className="text-center mt-14 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-slate-400 font-medium mb-4">
            <MessageCircle className="w-3 h-3 text-indigo-400" />
            Got questions? We&apos;ve got answers.
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently asked questions
          </h2>
        </RevealOnScroll>

        <StaggerChildren className="space-y-3">
          {LANDING_FAQS.map((faq, i) => (
            <StaggerItem key={faq.id}>
              <FAQItem
                faq={faq}
                index={i}
                isOpen={open === faq.id}
                onToggle={() => setOpen(open === faq.id ? null : faq.id)}
              />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <RevealOnScroll delay={0.3} className="text-center mt-8">
          <p className="text-[12px] text-slate-600">
            Have more questions?{" "}
            <a href="/faq" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
              See all FAQs
            </a>
            {" "}or{" "}
            <a href="mailto:support@preciprocal.com" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
              contact support
            </a>
            {" "}— we respond within 24 hours.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}