"use client";

// The home page FAQ. Two columns on desktop: the heading and a way to reach
// a person on the left (it stays in view while the questions scroll), and the
// questions grouped by topic on the right. It used to be a single centred
// column of numbered cards, which read as a list of loose items rather than
// answers someone had organised.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Mail, ArrowRight } from "lucide-react";
import { LANDING_FAQS } from "@/lib/constants";
import { RevealOnScroll, GlowDivider } from "@/components/LandingAnimations";

type Faq = (typeof LANDING_FAQS)[number];

// Topic headings, in the order a visitor tends to wonder about them: what it
// is, what it costs, and whether their data is safe.
const GROUPS: { title: string; categories: string[] }[] = [
  { title: "The product", categories: ["general", "interviews", "resume", "cover-letter", "planner"] },
  { title: "Pricing and billing", categories: ["pricing"] },
  { title: "Privacy and data", categories: ["technical"] },
];

const grouped = GROUPS
  .map(g => ({ title: g.title, items: LANDING_FAQS.filter(f => g.categories.includes(f.category)) }))
  .filter(g => g.items.length > 0);

function FAQRow({ faq, isOpen, onToggle }: { faq: Faq; isOpen: boolean; onToggle: () => void }) {
  const panelId = `faq-panel-${faq.id}`;
  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <h4>
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-start justify-between gap-6 py-5 text-left cursor-pointer group"
        >
          <span className={`text-[15px] font-medium leading-snug transition-colors duration-200 ${
            isOpen ? "text-white" : "text-slate-300 group-hover:text-white"
          }`}>
            {faq.q}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-200 ${
              isOpen ? "border-indigo-400/40 text-indigo-300" : "border-white/[0.1] text-slate-500 group-hover:text-slate-300"
            }`}
            aria-hidden="true"
          >
            <Plus className="w-3.5 h-3.5" />
          </motion.span>
        </button>
      </h4>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 text-[14px] text-slate-400 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  // The first answer starts open, so the section shows what an answer looks
  // like instead of a wall of closed rows.
  const [open, setOpen] = useState<string | null>(grouped[0]?.items[0]?.id ?? null);

  return (
    <section className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <GlowDivider />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Left: heading and a way to reach a person */}
          <RevealOnScroll className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-indigo-400 mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-[15px] text-slate-400 leading-relaxed max-w-md">
              What Preciprocal does, what it costs, and how we handle your data.
            </p>

            <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-indigo-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-white">Still have a question?</p>
                  <p className="text-[13px] text-slate-500">We reply within 24 hours.</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="mailto:support@preciprocal.com"
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-[13px] font-semibold text-white bg-indigo-500 hover:bg-indigo-400 transition-colors"
                >
                  Contact support
                </a>
                <a
                  href="/faq"
                  className="group inline-flex items-center gap-1.5 h-9 px-4 rounded-lg text-[13px] font-medium text-slate-300 border border-white/[0.1] hover:text-white hover:border-white/[0.2] transition-colors"
                >
                  See all FAQs
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right: questions grouped by topic */}
          <RevealOnScroll delay={0.1} className="space-y-10">
            {grouped.map(group => (
              <div key={group.title}>
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500 pb-3 border-b border-white/[0.1]">
                  {group.title}
                </h3>
                <div>
                  {group.items.map(faq => (
                    <FAQRow
                      key={faq.id}
                      faq={faq}
                      isOpen={open === faq.id}
                      onToggle={() => setOpen(open === faq.id ? null : faq.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
