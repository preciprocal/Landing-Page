"use client";

/**
 * app/roadmap/page.tsx
 * Fully self-contained. No separate component needed.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Clock, Rocket, ArrowRight } from "lucide-react";
import {
  RevealOnScroll,
  FloatingDots,
  SpotlightCard,
  GlowDivider,
} from "@/components/LandingAnimations";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "shipped" | "in-progress" | "planned";

interface RoadmapItem {
  title: string;
  description: string;
  status: Status;
  date?: string;
  tag?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ITEMS: RoadmapItem[] = [
  // ── Shipped ──
  {
    title: "Resume ATS Scorer",
    description:
      "Upload your resume + job description and get an ATS compatibility score with keyword gaps and fix suggestions.",
    status: "shipped",
    date: "Oct 2024",
    tag: "Resume",
  },
  {
    title: "AI Mock Interviews (voice)",
    description:
      "Multi-agent voice interview panel — HR screener, technical lead, hiring manager — with real-time follow-ups and a full debrief.",
    status: "shipped",
    date: "Nov 2024",
    tag: "Interviews",
  },
  {
    title: "Cover Letter Generator",
    description:
      "Role-specific, tone-matched cover letters generated from your resume and the job description. Unlimited on Pro.",
    status: "shipped",
    date: "Nov 2024",
    tag: "Cover Letters",
  },
  {
    title: "Recruiter Eye Simulation",
    description:
      "Heatmap showing where an HR screener, technical lead, and hiring manager look on your resume — based on published eye-tracking research.",
    status: "shipped",
    date: "Dec 2024",
    tag: "Resume",
  },
  {
    title: "Job Tracker",
    description:
      "Kanban-style tracker for all your applications with status, notes, contacts, and follow-up reminders.",
    status: "shipped",
    date: "Dec 2024",
    tag: "Productivity",
  },
  {
    title: "Chrome Extension",
    description:
      "Save jobs from LinkedIn and any job board with one click, auto-import job descriptions, and track applications without leaving the page.",
    status: "shipped",
    date: "Jan 2025",
    tag: "Extensions",
  },
  {
    title: "Study Planner",
    description:
      "AI-generated study plan tailored to your target role, company, and timeline. Adapts as you complete tasks.",
    status: "shipped",
    date: "Jan 2025",
    tag: "Planning",
  },
  {
    title: "Interview Debrief Journal",
    description:
      "Log real interviews, rate your performance across dimensions, and get AI-generated notes on what to improve for next time.",
    status: "shipped",
    date: "Feb 2025",
    tag: "Interviews",
  },
  {
    title: "LinkedIn Optimiser",
    description:
      "Score and rewrite your LinkedIn headline, summary, and experience sections for recruiter search visibility.",
    status: "shipped",
    date: "Feb 2025",
    tag: "LinkedIn",
  },
  {
    title: "Resume Benchmarking",
    description:
      "See how your resume compares against anonymised candidates applying for the same role category.",
    status: "shipped",
    date: "Mar 2025",
    tag: "Resume",
  },
  // ── In progress ──
  {
    title: "Cold Outreach Generator",
    description:
      "Generate personalised cold emails and LinkedIn messages to recruiters and hiring managers, tailored to their company and role.",
    status: "in-progress",
    tag: "Outreach",
  },
  {
    title: "Contact Finder",
    description:
      "Find the name and email of the hiring manager or recruiter at a target company. Built for respectful, targeted outreach.",
    status: "in-progress",
    tag: "Outreach",
  },
  // ── Planned ──
  {
    title: "Mobile app (iOS & Android)",
    description:
      "Native mobile app for on-the-go mock interview practice, job tracking, and study sessions.",
    status: "planned",
    tag: "Platform",
  },
  {
    title: "Company-specific interview prep packs",
    description:
      "Curated question banks, values frameworks, and interview formats for specific target companies — expanded beyond the current 40+.",
    status: "planned",
    tag: "Interviews",
  },
  {
    title: "Salary negotiation coach",
    description:
      "AI role-play to practice negotiating an offer. Includes real comp data by role and market.",
    status: "planned",
    tag: "New Tool",
  },
  {
    title: "Referral program",
    description:
      "Invite a friend who signs up for Pro, you both get a free month. Built for students sharing with classmates.",
    status: "planned",
    tag: "Product",
  },
];

const STATUS_CONFIG: Record<
  Status,
  { label: string; icon: typeof CheckCircle2; color: string; bg: string; border: string }
> = {
  shipped: {
    label: "Shipped",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  "in-progress": {
    label: "In progress",
    icon: Clock,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  planned: {
    label: "Planned",
    icon: Circle,
    color: "text-slate-400",
    bg: "bg-white/[0.04]",
    border: "border-white/[0.08]",
  },
};

const ALL_STATUSES: Status[] = ["shipped", "in-progress", "planned"];

// ─── Sub-component ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.bg} ${cfg.color} border ${cfg.border}`}
    >
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
  const [activeFilter, setActiveFilter] = useState<Status | "all">("all");

  const filtered =
    activeFilter === "all" ? ITEMS : ITEMS.filter((i) => i.status === activeFilter);

  const shippedCount    = ITEMS.filter((i) => i.status === "shipped").length;
  const inProgressCount = ITEMS.filter((i) => i.status === "in-progress").length;
  const plannedCount    = ITEMS.filter((i) => i.status === "planned").length;

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
                <Rocket className="w-3 h-3 text-indigo-400" />
                Updated as we ship
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Roadmap &{" "}
                <span className="text-gradient">Changelog</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                Everything we've shipped, what's being built right now, and what's
                coming next. No vaporware — if it's here, it's real.
              </p>
            </RevealOnScroll>

            {/* Live counts */}
            <RevealOnScroll delay={0.1} className="mt-10">
              <div className="inline-flex items-center gap-6 flex-wrap justify-center">
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-white">{shippedCount}</div>
                  <div className="text-xs text-emerald-400 font-medium">Shipped</div>
                </div>
                <div className="w-px h-8 bg-white/[0.06]" />
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-white">{inProgressCount}</div>
                  <div className="text-xs text-yellow-400 font-medium">In progress</div>
                </div>
                <div className="w-px h-8 bg-white/[0.06]" />
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-white">{plannedCount}</div>
                  <div className="text-xs text-slate-400 font-medium">Planned</div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ── Filter tabs ── */}
        <section className="relative px-6 pb-8">
          <div className="max-w-3xl mx-auto">
            <GlowDivider />
            <div className="mt-8 flex flex-wrap gap-2">
              {(["all", ...ALL_STATUSES] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-[12px] font-semibold border transition-all ${
                    activeFilter === f
                      ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
                      : "bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-white hover:border-white/[0.12]"
                  }`}
                >
                  {f === "all" ? "All" : STATUS_CONFIG[f].label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Items list ── */}
        <section className="relative pb-24 px-6">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="popLayout">
              <motion.div layout className="space-y-3">
                {filtered.map((item) => (
                  <motion.div
                    key={item.title}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <SpotlightCard className="rounded-xl border border-white/[0.06] bg-[#0a0f1e]/80 p-5">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-[15px] font-bold text-white">{item.title}</h3>
                            {item.tag && (
                              <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <StatusBadge status={item.status} />
                          {item.date && (
                            <span className="text-[11px] text-slate-600">{item.date}</span>
                          )}
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── Suggest a feature ── */}
        <section className="relative pb-24 px-6">
          <div className="max-w-2xl mx-auto">
            <RevealOnScroll>
              <SpotlightCard
                className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-8 text-center"
                spotlightColor="rgba(99,102,241,0.08)"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  Have a feature idea?
                </h2>
                <p className="text-slate-400 text-sm mb-6">
                  Every item on this roadmap started as a user request. If you want
                  something built, tell us — we actually listen.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="mailto:support@preciprocal.com?subject=Feature Idea: "
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/[0.06] border border-white/[0.08] text-white font-semibold rounded-lg text-sm hover:bg-white/[0.1] transition-all"
                  >
                    Suggest a feature
                  </a>
                  <Link
                    href={`${APP_URL}/sign-up`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg text-sm hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)] transition-all"
                  >
                    Try what's live now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </SpotlightCard>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}