"use client";

/**
 * app/contact/page.tsx
 * Self-contained Contact page. No separate component needed.
 */

import { Mail, MessageSquare, Bug, CreditCard, Lightbulb, Clock } from "lucide-react";
import {
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
  FloatingDots,
  SpotlightCard,
} from "@/components/LandingAnimations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CONTACT_TYPES = [
  {
    icon: Bug,
    title: "Bug report",
    description: "Something broken? Tell us exactly what happened and we'll fix it fast.",
    email: "support@preciprocal.com",
    subject: "Bug Report: ",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    icon: CreditCard,
    title: "Billing question",
    description: "Charge you didn't recognize, cancellation help, or refund request.",
    email: "support@preciprocal.com",
    subject: "Billing: ",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Lightbulb,
    title: "Feature request",
    description: "Have an idea that would make Preciprocal better? We genuinely want to hear it.",
    email: "support@preciprocal.com",
    subject: "Feature Idea: ",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: MessageSquare,
    title: "General feedback",
    description: "Something you love, something you hate, or just want to share your experience.",
    email: "support@preciprocal.com",
    subject: "Feedback: ",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050810]">
      <Navbar />

      <main className="relative overflow-hidden">
        <FloatingDots count={20} />

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-slate-400 font-medium mb-6">
                <Clock className="w-3 h-3 text-emerald-400" />
                We reply within 24 hours
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                We're a real team.{" "}
                <span className="text-gradient">Talk to us.</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                No support ticket queue, no chatbot runaround. Email goes straight to
                the people who built this. We read every single one.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* ── Main email card ── */}
        <section className="relative py-8 px-6">
          <div className="max-w-2xl mx-auto">
            <RevealOnScroll>
              <SpotlightCard
                className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-8 text-center"
                spotlightColor="rgba(99,102,241,0.08)"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  support@preciprocal.com
                </h2>
                <p className="text-slate-400 text-sm mb-6">
                  One inbox. Real humans. Average response time under 24 hours on weekdays.
                </p>
                <a
                  href="mailto:support@preciprocal.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg text-sm hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)] transition-all"
                >
                  Send us an email
                </a>
              </SpotlightCard>
            </RevealOnScroll>
          </div>
        </section>

        {/* ── Contact type cards ── */}
        <section className="relative py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll className="text-center mb-10">
              <h2 className="text-2xl font-extrabold text-white mb-2">
                What do you need help with?
              </h2>
              <p className="text-slate-500 text-sm">
                Click any card to open a pre-filled email — saves you a few seconds.
              </p>
            </RevealOnScroll>

            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTACT_TYPES.map((c) => {
                const Icon = c.icon;
                const href = `mailto:${c.email}?subject=${encodeURIComponent(c.subject)}`;
                return (
                  <StaggerItem key={c.title}>
                    <a href={href}>
                      <SpotlightCard className="rounded-xl border border-white/[0.06] bg-[#0a0f1e]/80 p-6 h-full hover:border-white/[0.12] transition-colors cursor-pointer group">
                        <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center mb-4`}>
                          <Icon className={`w-4 h-4 ${c.color}`} />
                        </div>
                        <h3 className="text-[15px] font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                          {c.title}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {c.description}
                        </p>
                      </SpotlightCard>
                    </a>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </section>

        {/* ── Response time breakdown ── */}
        <section className="relative py-12 px-6">
          <div className="max-w-2xl mx-auto">
            <RevealOnScroll>
              <div className="rounded-xl border border-white/[0.06] bg-[#0a0f1e]/60 p-6">
                <h3 className="text-sm font-semibold text-white mb-4">
                  What to expect
                </h3>
                <div className="space-y-3 text-sm text-slate-400">
                  <div className="flex justify-between items-center">
                    <span>Weekday emails</span>
                    <span className="text-emerald-400 font-medium">Within 24 hours</span>
                  </div>
                  <div className="h-px bg-white/[0.04]" />
                  <div className="flex justify-between items-center">
                    <span>Weekend / holiday emails</span>
                    <span className="text-yellow-400 font-medium">First weekday reply</span>
                  </div>
                  <div className="h-px bg-white/[0.04]" />
                  <div className="flex justify-between items-center">
                    <span>Billing / refund requests</span>
                    <span className="text-emerald-400 font-medium">Same day when possible</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}