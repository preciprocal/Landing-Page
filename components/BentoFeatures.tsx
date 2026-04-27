"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Shield, Target, Users, TrendingUp, Clock,
  CheckCircle2, ArrowRight, Lock, Star,
  BarChart3, Brain, Mic, FileText, Sparkles, Award,
  Globe, Briefcase, GraduationCap, MonitorSmartphone,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED — Card with cursor-follow glow
// ═══════════════════════════════════════════════════════════════════════════════

function Card({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl border border-white/[0.06] bg-[#0a0f1e]/80 overflow-hidden group transition-colors duration-500 ${className}`}
      style={{ borderColor: isHovered ? "rgba(99,102,241,0.3)" : undefined }}
    >
      <div className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0, background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.07), transparent 40%)` }} />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px z-[1] transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0, background: `radial-gradient(300px circle at ${mousePos.x}px 0px, rgba(99,102,241,0.5), transparent 60%)` }} />
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROW 1 — WHAT IT DOES (3 large cards)
// ═══════════════════════════════════════════════════════════════════════════════

// SpeedCard — shows actual product speed facts (not user outcome claims)
function SpeedCard() {
  const [active, setActive] = useState(0);
  const items = [
    { label: "Resume scanned & scored", time: "~60s", icon: FileText },
    { label: "Cover letter generated", time: "~30s", icon: Sparkles },
    { label: "Contact found", time: "~5s",  icon: Users },
  ];

  useEffect(() => {
    const iv = setInterval(() => setActive(p => (p + 1) % 3), 2500);
    return () => clearInterval(iv);
  }, []);

  return (
    <Card delay={0}>
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-white">Seconds, not hours</h3>
            <p className="text-[10px] text-slate-500">What used to take a full day now takes a coffee break</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }} className="text-center py-4">
              {(() => { const Icon = items[active].icon; return <Icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />; })()}
              <p className="text-[36px] font-extrabold text-white leading-none">{items[active].time}</p>
              <p className="text-[12px] text-slate-400 mt-1">{items[active].label}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-1.5 justify-center mt-auto">
          {items.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-amber-500" : "w-1.5 bg-white/[0.1]"}`} />
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── AccuracyCard replaced with DepthCard ─────────────────────────────────────
// The original AccuracyCard showed "ATS pass rate 89%", "Interview callback 3.2x",
// "Offer rate lift 47%" — all fabricated, labelled "Real results, not promises".
// Replaced with product capability facts: what the resume analysis actually checks.

function DepthCard() {
  const dimensions = [
    { label: "ATS keyword match",       color: "bg-emerald-500", pct: "w-[78%]" },
    { label: "Formatting compatibility",color: "bg-blue-500",    pct: "w-[92%]" },
    { label: "Section structure",        color: "bg-purple-500",  pct: "w-[85%]" },
    { label: "Impact quantification",    color: "bg-amber-500",   pct: "w-[60%]" },
  ];

  return (
    <Card delay={0.1}>
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-white">Four-dimensional resume score</h3>
            <p className="text-[10px] text-slate-500">Every resume scored across 4 criteria, out of 100</p>
          </div>
        </div>

        <div className="space-y-3 flex-1 flex flex-col justify-center">
          {dimensions.map((d, i) => (
            <div key={d.label}>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-[11px] text-slate-300 font-medium">{d.label}</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: d.pct.replace("w-[", "").replace("]", "") }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
                  className={`h-full rounded-full ${d.color}`}
                  style={{ width: undefined }}
                >
                  {/* Use framer-motion width animation via style instead of class */}
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.04]">
          <BarChart3 className="w-3 h-3 text-indigo-400" />
          <span className="text-[9px] text-slate-500">Score updates instantly as you edit your resume</span>
        </div>
      </div>
    </Card>
  );
}

function CoverageCard() {
  const features = [
    { icon: FileText,    label: "Resume analysis", sub: "5 analysis types" },
    { icon: Mic,         label: "Mock interviews",  sub: "4-person AI panel" },
    { icon: Sparkles,    label: "Cover letters",    sub: "Company-researched" },
    { icon: Brain,       label: "Study planner",    sub: "AI-generated schedule" },
    { icon: Briefcase,   label: "Job tracker",      sub: "Kanban + contacts" },
    { icon: TrendingUp,  label: "Career tools",     sub: "LinkedIn + outreach" },
  ];

  return (
    <Card delay={0.2}>
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-white">One platform, zero gaps</h3>
            <p className="text-[10px] text-slate-500">Everything you need — nothing you have to piece together</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 flex-1">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="p-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center gap-2 hover:border-indigo-500/20 hover:bg-white/[0.03] transition-all"
              >
                <Icon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="text-[9px] font-semibold text-white">{f.label}</p>
                  <p className="text-[7px] text-slate-500">{f.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.04]">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span className="text-[9px] text-slate-500">Competitors charge $50–100/mo for one of these tools</span>
        </div>
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROW 2 — DIFFERENTIATORS (4 cards)
// ═══════════════════════════════════════════════════════════════════════════════

function NotChatbotCard() {
  const panelMembers = [
    { name: "HR",   color: "bg-pink-500" },
    { name: "Lead", color: "bg-blue-500" },
    { name: "Dev",  color: "bg-green-500" },
    { name: "You",  color: "bg-indigo-500" },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActive(p => (p + 1) % 4), 2000);
    return () => clearInterval(iv);
  }, []);

  return (
    <Card delay={0}>
      <div className="p-5 h-full flex flex-col">
        <h3 className="text-[13px] font-bold text-white mb-1">Not a chatbot.</h3>
        <p className="text-[10px] text-slate-500 mb-3">A full 4-person interview panel — HR screener, technical lead, hiring manager, and you — just like real interviews at top companies.</p>

        <div className="flex items-center gap-2 flex-1 justify-center">
          {panelMembers.map((m, i) => (
            <div key={m.name} className="text-center">
              <div className={`w-10 h-10 ${m.color} rounded-full flex items-center justify-center text-[8px] font-bold text-white mx-auto transition-all duration-500 ${
                active === i ? "ring-2 ring-blue-400 scale-110" : "opacity-60"
              }`}>{m.name[0]}</div>
              <p className={`text-[7px] mt-1 transition-colors ${active === i ? "text-white font-semibold" : "text-slate-600"}`}>{m.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-[8px] px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold">Voice-based</span>
          <span className="text-[8px] px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold">Multi-round</span>
          <span className="text-[8px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">Scored</span>
        </div>
      </div>
    </Card>
  );
}

function BrutallyHonestCard() {
  const scores = [
    { label: "What you think",  value: "Great resume!",  color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "What we tell you", value: "65/100 — missing summary, weak verbs, no metrics on 3 bullets", color: "text-amber-400", bg: "bg-amber-500/10" },
  ];

  return (
    <Card delay={0.1}>
      <div className="p-5 h-full flex flex-col">
        <h3 className="text-[13px] font-bold text-white mb-1">Brutally honest.</h3>
        <p className="text-[10px] text-slate-500 mb-3">Other tools inflate scores to keep you happy. We tell you exactly what&apos;s costing you interviews — then fix it.</p>

        <div className="space-y-2 flex-1">
          {scores.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className={`p-3 rounded-xl ${s.bg} border border-white/[0.05]`}
            >
              <p className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold mb-1">{s.label}</p>
              <p className={`text-[11px] font-semibold leading-snug ${s.color}`}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mt-3">
          <BarChart3 className="w-3 h-3 text-indigo-400" />
          <span className="text-[8px] text-slate-500">Benchmarked against hired candidates at your level</span>
        </div>
      </div>
    </Card>
  );
}

// ─── StudentPriceCard ─────────────────────────────────────────────────────────
// Removed fake ~~$49~~ strikethrough — there is no $49 list price being
// discounted to $9.99. $9.99 IS the price. Showing a fabricated "original
// price" crossed out is a deceptive pricing pattern and illegal in several
// jurisdictions (UK CPR 2008, EU Consumer Rights Directive, US FTC Act).

function StudentPriceCard() {
  return (
    <Card delay={0.2}>
      <div className="p-5 h-full flex flex-col">
        <h3 className="text-[13px] font-bold text-white mb-1">Built for students.</h3>
        <p className="text-[10px] text-slate-500 mb-3">Premium career tools usually cost $50–200/month. We built this for people who are still eating ramen.</p>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex items-baseline gap-1">
            <span className="text-[36px] font-extrabold text-white leading-none">$9.99</span>
            <span className="text-[12px] text-slate-500">/mo</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-1">All 11 tools included</p>

          <div className="flex items-center gap-2 mt-4 px-3 py-1.5 bg-indigo-500/[0.06] border border-indigo-500/15 rounded-lg">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[9px] text-indigo-300 font-medium">.edu email? First month free</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.04]">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span className="text-[8px] text-slate-500">30-day money-back guarantee — no questions asked</span>
        </div>
      </div>
    </Card>
  );
}

function AINotGenericCard() {
  const [step, setStep] = useState(0);
  const examples = [
    { label: "Generic AI output",      text: "I am a hardworking professional with experience in software development…",                                                            color: "text-red-400",     tag: "❌ Ignored" },
    { label: "Preciprocal output",     text: "Built reconciliation pipeline processing $2.4B daily across 14 currencies, reducing failed transaction alerts by 38%…",             color: "text-emerald-400", tag: "✓ Specific & strong" },
  ];

  useEffect(() => {
    const iv = setInterval(() => setStep(p => (p + 1) % 2), 3500);
    return () => clearInterval(iv);
  }, []);

  return (
    <Card delay={0.3}>
      <div className="p-5 h-full flex flex-col">
        <h3 className="text-[13px] font-bold text-white mb-1">Your story, not filler.</h3>
        <p className="text-[10px] text-slate-500 mb-3">We read your actual resume and job description. Every word is calibrated to your experience — not templated garbage.</p>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">{examples[step].label}</span>
                <span className={`text-[8px] font-semibold ${examples[step].color}`}>{examples[step].tag}</span>
              </div>
              <p className={`text-[11px] leading-relaxed flex-1 ${examples[step].color}`}>
                &ldquo;{examples[step].text}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROW 3 — TRUST BAR (full width)
// ═══════════════════════════════════════════════════════════════════════════════

function TrustBar() {
  const items = [
    { icon: Lock,              label: "End-to-end encrypted",   sub: "Your resume data never shared or sold" },
    { icon: MonitorSmartphone, label: "Chrome extension",        sub: "One-click import from any job board" },
    { icon: Globe,             label: "Works everywhere",        sub: "Web app — no downloads, any device" },
    // ⚠️  Guarantee wording: "30-day money-back" is the accurate claim.
    // Original read "Land an interview in 30 days or refund" — that implies
    // a guaranteed outcome we cannot promise and creates legal liability.
    { icon: Award,             label: "30-day money-back",       sub: "Not working for you? Full refund, no questions" },
  ];

  return (
    <Card className="md:col-span-full" delay={0.1}>
      <div className="p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-white">{item.label}</p>
                  <p className="text-[8px] text-slate-500">{item.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function BentoFeatures() {
  return (
    <section id="features" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[13px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Why Preciprocal
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-4">
            You&apos;ve seen what it does.
            <br />
            <span className="text-gradient">Here&apos;s why it works.</span>
          </motion.h2>
          <p className="text-base text-slate-400 max-w-lg mx-auto">
            Every feature is designed around one question: will this get someone hired faster?
          </p>
        </div>

        {/* Row 1: What it does — 3 equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <SpeedCard />
          <DepthCard />
          <CoverageCard />
        </div>

        {/* Row 2: Differentiators — 4 equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <NotChatbotCard />
          <BrutallyHonestCard />
          <StudentPriceCard />
          <AINotGenericCard />
        </div>

        {/* Row 3: Trust bar */}
        <TrustBar />
      </div>
    </section>
  );
}