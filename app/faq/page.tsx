"use client";

/**
 * app/faq/page.tsx
 *
 * Full FAQ page — all categories, search, structured data.
 * The landing page only shows 6 FAQs; this page shows all of them.
 *
 * SEO value:
 *   • FAQPage JSON-LD → answers expand directly in Google SERPs
 *   • Unique canonical URL (/faq)
 *   • Internal links back to the homepage and feature sections
 *   • Full question text is crawlable (no JS-gating of answers)
 */

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, ArrowLeft, Sparkles } from "lucide-react";
import { FAQS, FAQ_CATEGORIES, type FAQCategory, type FAQItem } from "@/lib/constants";
import {
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
  FloatingDots,
  SpotlightCard,
} from "@/components/LandingAnimations";
import { FAQJsonLd } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Metadata is exported from a separate server component file ───────────────
// Because this file is "use client", metadata lives in app/faq/metadata.ts
// (Next.js 15 pattern). If you're on an older pattern, remove "use client"
// and make the component async with a separate client child for interactions.

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <SpotlightCard
      className={`rounded-xl border transition-colors duration-300 ${
        isOpen
          ? "border-indigo-500/20 bg-[#0a0f1e]"
          : "border-white/[0.06] bg-[#0a0f1e]/80 hover:border-white/[0.1]"
      }`}
      spotlightColor={isOpen ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.03)"}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-[14px] font-semibold transition-colors duration-200 pr-4 leading-snug ${
            isOpen ? "text-white" : "text-slate-300 group-hover:text-white"
          }`}
        >
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors duration-300 ${
            isOpen
              ? "bg-indigo-500/15 text-indigo-400"
              : "bg-white/[0.04] text-slate-600 group-hover:text-slate-400"
          }`}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.25, delay: 0.05 },
            }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-3" />
              <p className="text-[13px] text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SpotlightCard>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...FAQS];
    if (activeCategory !== "all") {
      result = result.filter((f) => f.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  const handleCategoryChange = useCallback((cat: FAQCategory | "all") => {
    setActiveCategory(cat);
    setOpenId(null);
  }, []);

  const handleSearchChange = useCallback((v: string) => {
    setSearch(v);
    setOpenId(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#050810]">
      {/* JSON-LD — crawlable even in client component via dangerouslySetInnerHTML */}
      <FAQJsonLd />

      <FloatingDots count={20} />
      <Navbar />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 page-main">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Header */}
        <RevealOnScroll className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-slate-400 font-medium mb-4">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            {FAQS.length} answers to everything you need
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Frequently asked questions
          </h1>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            Can&apos;t find what you&apos;re looking for?{" "}
            <a
              href="mailto:support@preciprocal.com"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Email support
            </a>{" "}
            — we respond within 24 hours.
          </p>
        </RevealOnScroll>

        {/* Search */}
        <RevealOnScroll delay={0.1} className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="search"
              placeholder="Search questions…"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.06] transition-all"
            />
          </div>
        </RevealOnScroll>

        {/* Category pills */}
        <RevealOnScroll delay={0.15} className="mb-10">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
                activeCategory === "all"
                  ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-300"
                  : "bg-white/[0.03] border-white/[0.07] text-slate-500 hover:text-slate-300 hover:border-white/[0.12]"
              }`}
            >
              All ({FAQS.length})
            </button>
            {FAQ_CATEGORIES.map((cat) => {
              const count = FAQS.filter((f) => f.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
                    activeCategory === cat.id
                      ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-300"
                      : "bg-white/[0.03] border-white/[0.07] text-slate-500 hover:text-slate-300 hover:border-white/[0.12]"
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Results count when searching */}
        {(search || activeCategory !== "all") && (
          <p className="text-[12px] text-slate-600 mb-4">
            {filtered.length === 0
              ? "No results found."
              : `${filtered.length} result${filtered.length === 1 ? "" : "s"}`}
          </p>
        )}

        {/* FAQ items */}
        {filtered.length > 0 ? (
          <StaggerChildren className="space-y-3">
            {filtered.map((faq, i) => (
              <StaggerItem key={faq.id}>
                <FAQItem
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                />
              </StaggerItem>
            ))}
          </StaggerChildren>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500 text-sm mb-2">No questions match your search.</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 pt-10 border-t border-white/[0.06] text-center">
          <p className="text-slate-500 text-sm mb-6">
            Still have questions?{" "}
            <a
              href="mailto:support@preciprocal.com"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Contact support
            </a>{" "}
            or{" "}
            <Link
              href="/#pricing"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              see pricing
            </Link>
            .
          </p>
          <a
            href="https://app.preciprocal.com/sign-up"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Start preparing free — no credit card required
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}