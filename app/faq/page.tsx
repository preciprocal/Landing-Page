"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Search, HelpCircle, CreditCard,
  Mic, FileText, Shield, ArrowLeft, Sparkles, X,
  Pen, Calendar,
} from "lucide-react";
import Link from "next/link";
import { FAQS, FAQ_CATEGORIES, type FAQCategory, type FAQItem as FAQData } from "@/lib/constants";
import { GlowingEffect } from "@/components/ui/GlowingEffect";
import {
  SpotlightCard,
  RevealOnScroll,
  FloatingDots,
  GlowDivider,
} from "@/components/LandingAnimations";

// ── Icon map for categories ──
const CATEGORY_ICONS: Record<FAQCategory, React.ElementType> = {
  general: HelpCircle,
  pricing: CreditCard,
  interviews: Mic,
  resume: FileText,
  "cover-letter": Pen,
  planner: Calendar,
  technical: Shield,
};

// ═══════════════════════════════════════════════════════════════════════════════
// VANISH SEARCH
// ═══════════════════════════════════════════════════════════════════════════════

const PLACEHOLDERS = [
  "How do mock interviews work?",
  "Can I cancel anytime?",
  "What's the .edu discount?",
  "Is my data safe?",
  "How does the study planner work?",
  "Can I tailor my resume to a job?",
];

function VanishSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animating, setAnimating] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (value || animating) return;
    const full = PLACEHOLDERS[placeholderIdx];
    let timeout: NodeJS.Timeout;
    if (isTyping) {
      if (displayedPlaceholder.length < full.length) {
        timeout = setTimeout(() => setDisplayedPlaceholder(full.slice(0, displayedPlaceholder.length + 1)), 40);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayedPlaceholder.length > 0) {
        timeout = setTimeout(() => setDisplayedPlaceholder(displayedPlaceholder.slice(0, -1)), 25);
      } else {
        setPlaceholderIdx((p) => (p + 1) % PLACEHOLDERS.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedPlaceholder, isTyping, placeholderIdx, value, animating]);

  const vanish = useCallback(() => {
    if (animating || !value.trim()) return;
    setAnimating(true);
    const canvas = canvasRef.current;
    const input = inputRef.current;
    if (!canvas || !input) { setAnimating(false); onChange(""); return; }
    const ctx = canvas.getContext("2d");
    if (!ctx) { setAnimating(false); onChange(""); return; }
    const rect = input.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);
    const styles = getComputedStyle(input);
    ctx.font = `${styles.fontSize} ${styles.fontFamily}`;
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "middle";
    ctx.fillText(value, 44, rect.height / 2);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    interface Particle { x: number; y: number; r: number; g: number; b: number; a: number; vx: number; vy: number; life: number }
    const particles: Particle[] = [];
    for (let y = 0; y < canvas.height; y += 2) {
      for (let x = 0; x < canvas.width; x += 2) {
        const i = (y * canvas.width + x) * 4;
        if (pixels[i + 3] > 30) {
          particles.push({ x: x / dpr, y: y / dpr, r: pixels[i], g: pixels[i + 1], b: pixels[i + 2], a: pixels[i + 3] / 255, vx: (Math.random() - 0.5) * 3 + 1.5, vy: (Math.random() - 0.5) * 2, life: 1 });
        }
      }
    }
    onChange("");
    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      let alive = false;
      for (const p of particles) {
        if (p.life <= 0) continue;
        alive = true; p.x += p.vx; p.y += p.vy; p.vy += 0.02; p.life -= 0.025;
        ctx.globalAlpha = Math.max(0, p.life) * p.a;
        ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
        ctx.fillRect(p.x, p.y, 1.5 / dpr, 1.5 / dpr);
      }
      ctx.globalAlpha = 1;
      if (alive) frame = requestAnimationFrame(animate);
      else { ctx.clearRect(0, 0, rect.width, rect.height); setAnimating(false); }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [animating, value, onChange]);

  return (
    <div className="relative max-w-xl mx-auto mb-10">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 z-10" />
      <input ref={inputRef} type="text" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={value || animating ? "" : displayedPlaceholder}
        className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-[14px] text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/30 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200 relative z-10" />
      {value && !animating && (
        <button onClick={vanish} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-slate-500 hover:text-white transition-all z-20 cursor-pointer" aria-label="Clear search">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAQ ACCORDION ITEM
// ═══════════════════════════════════════════════════════════════════════════════

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQData; isOpen: boolean; onToggle: () => void }) {
  return (
    <SpotlightCard
      className={`rounded-xl border transition-colors duration-300 ${isOpen ? "border-indigo-500/20 bg-[#0a0f1e]" : "border-white/[0.06] bg-[#0a0f1e]/80 hover:border-white/[0.1]"}`}
      spotlightColor={isOpen ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.03)"}
    >
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 text-left cursor-pointer group" aria-expanded={isOpen}>
        <span className={`text-[14px] font-semibold pr-4 transition-colors duration-200 ${isOpen ? "text-white" : "text-slate-300 group-hover:text-white"}`}>{faq.q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors duration-300 ${isOpen ? "bg-indigo-500/15 text-indigo-400" : "bg-white/[0.04] text-slate-600"}`}>
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.25, delay: 0.05 } }} className="overflow-hidden">
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

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...FAQS];
    if (activeCategory !== "all") result = result.filter((f) => f.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
    }
    return result;
  }, [search, activeCategory]);

  const handleCategoryChange = useCallback((cat: FAQCategory | "all") => { setActiveCategory(cat); setOpenId(null); }, []);
  const handleSearchChange = useCallback((v: string) => { setSearch(v); setOpenId(null); }, []);

  return (
    <div className="min-h-screen bg-[#050810]">
      <FloatingDots count={20} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <RevealOnScroll className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-slate-400 font-medium mb-4">
            <Sparkles className="w-3 h-3 text-indigo-400" /> {FAQS.length} answers to everything you need
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">Frequently asked questions</h1>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            Can&apos;t find what you&apos;re looking for?{" "}
            <a href="mailto:support@preciprocal.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">Email us</a>
            {" "}and we&apos;ll respond within 24 hours.
          </p>
        </RevealOnScroll>

        <VanishSearch value={search} onChange={handleSearchChange} />

        {/* Category cards */}
        <RevealOnScroll className="mb-10">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            <button onClick={() => handleCategoryChange("all")}
              className={`relative rounded-xl p-2.5 border text-center transition-all duration-200 cursor-pointer ${activeCategory === "all" ? "border-indigo-500/30 bg-indigo-500/[0.08]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"}`}>
              {activeCategory === "all" && <GlowingEffect spread={30} proximity={50} />}
              <div className="relative z-10">
                <HelpCircle className={`w-4 h-4 mx-auto mb-1 ${activeCategory === "all" ? "text-indigo-400" : "text-slate-600"}`} />
                <p className={`text-[9px] font-semibold ${activeCategory === "all" ? "text-indigo-300" : "text-slate-500"}`}>All</p>
              </div>
            </button>
            {FAQ_CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              const Icon = CATEGORY_ICONS[cat.id];
              return (
                <button key={cat.id} onClick={() => handleCategoryChange(cat.id)}
                  className={`relative rounded-xl p-2.5 border text-center transition-all duration-200 cursor-pointer ${active ? "border-indigo-500/30 bg-indigo-500/[0.08]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"}`}>
                  {active && <GlowingEffect spread={30} proximity={50} />}
                  <div className="relative z-10">
                    <Icon className={`w-4 h-4 mx-auto mb-1 ${active ? "text-indigo-400" : "text-slate-600"}`} />
                    <p className={`text-[9px] font-semibold ${active ? "text-indigo-300" : "text-slate-500"}`}>{cat.label}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {activeCategory !== "all" && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-white font-semibold">
              {FAQ_CATEGORIES.find((c) => c.id === activeCategory)?.label}
              <span className="text-slate-600 font-normal ml-2">({filtered.length})</span>
            </p>
            <button onClick={() => handleCategoryChange("all")} className="text-[12px] text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">Show all →</button>
          </div>
        )}

        {search && <p className="text-[12px] text-slate-600 mb-4">{filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;</p>}

        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((faq) => (
              <FAQItem key={faq.id} faq={faq} isOpen={openId === faq.id} onToggle={() => setOpenId(openId === faq.id ? null : faq.id)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-8 h-8 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No questions match your search.</p>
            <button onClick={() => { setSearch(""); setActiveCategory("all"); }} className="text-indigo-400 text-sm mt-2 hover:text-indigo-300 transition-colors cursor-pointer">Clear filters</button>
          </div>
        )}

        <div className="mt-16 mb-8"><GlowDivider /></div>

        <RevealOnScroll>
          <div className="text-center p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <h3 className="text-lg font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-[13px] text-slate-500 mb-4">Our team responds within 24 hours.</p>
            <a href="mailto:support@preciprocal.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/20 transition-all duration-200">
              Contact Support
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}