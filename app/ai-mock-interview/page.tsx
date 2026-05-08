/**
 * app/ai-mock-interview/page.tsx
 *
 * ANCHOR FEATURE PAGE - highest SEO priority after the homepage.
 *
 * Target keywords:
 *   Primary:   "AI mock interview" (~8,100/mo)
 *   Secondary: "mock interview practice online" (~4,400/mo)
 *              "AI interview practice" (~2,900/mo)
 *              "mock interview for new grads" (low comp, high intent)
 *              "technical mock interview free"
 *              "behavioral mock interview practice"
 *
 * Page structure:
 *   H1  → primary keyword + audience signal
 *   H2s → how it works / what you practice / who it's for / FAQ
 *   FAQ section with JSON-LD for rich results
 *   Internal links → role pages, company pages, /free-ats-checker
 *   CTAs → app.preciprocal.com sign-up (free tier first)
 *
 * File path: app/ai-mock-interview/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Mock Interview Practice: Realistic, Instant, Free to Start",
  description:
    "Practice AI mock interviews for any role or company. Get scored on technical depth, communication, and structure. Built for students and new grads. Free to start.",
  keywords: [
    "AI mock interview",
    "mock interview practice online",
    "AI interview practice",
    "mock interview for new grads",
    "mock interview practice for students",
    "technical mock interview free",
    "behavioral mock interview practice",
    "interview simulator",
    "AI interview simulator",
    "free mock interview",
    "interview practice tool",
  ],
  alternates: {
    canonical: "https://preciprocal.com/ai-mock-interview",
  },
  openGraph: {
    title: "AI Mock Interview Practice: Realistic, Instant, Free to Start",
    description:
      "Practice AI mock interviews for any role or company. Scored on technical depth, communication, and structure. Free to start.",
    url: "https://preciprocal.com/ai-mock-interview",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Mock Interview Practice | Preciprocal",
    description:
      "Practice AI mock interviews for any role. Realistic, instant feedback. Free to start.",
  },
};

const FAQS = [
  {
    q: "Is AI mock interview practice actually effective?",
    a: "Yes. Research backs it up. The core mechanism is deliberate practice under realistic conditions. Candidates who practice out loud, under time pressure, with feedback consistently outperform those who only read answers. AI mock interviews give you unlimited reps with immediate scoring, so you build muscle memory before the real thing. The nerves shrink when you've done it 20 times.",
  },
  {
    q: "How is this different from practicing with a friend or ChatGPT?",
    a: "Three key differences. First, Preciprocal uses a multi-agent panel, including an HR screener, a technical lead, and a hiring manager, each asking questions from their perspective. Second, scoring is structured across 5 dimensions (communication, technical depth, structure, relevance, and confidence signals) so you know exactly what to improve. Third, it's infinitely available: no scheduling, no asking a favour, no friend who stops giving honest feedback after round two.",
  },
  {
    q: "What types of interviews can I practice?",
    a: "Technical (coding concepts + system design), behavioural (STAR method), case interviews (consulting), finance interviews (DCF, LBO, accounting), marketing strategy, and general screening rounds. You can target a specific company and role. The AI adjusts its questions to match that company's known interview style, values, and difficulty level.",
  },
  {
    q: "Does it work for behavioural interviews, not just technical?",
    a: "Absolutely. Behavioural interviews are where most candidates lose offers, not technical ones. Preciprocal's mock interviews include a dedicated behavioural agent that probes your STAR stories, asks follow-up questions when answers are vague, and scores you on specificity, ownership language, and quantified results.",
  },
  {
    q: "Can I practice for a specific company like Google or Amazon?",
    a: "Yes. Enter the company and role, and the AI tailors questions to that company's known interview format and values. Google interviews will probe Googleyness and technical depth. Amazon interviews will work through Leadership Principles. Meta interviews will focus on impact and product sense. You can also browse our company-specific prep guides for Google, Amazon, Meta, and 17 more.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The free tier includes 3 mock interviews per month, no credit card required. Students with a .edu email get 1 month of Pro free (30 interviews/month). Pro is $9.99/month with a 30-day money-back guarantee.",
  },
  {
    q: "Do I need a webcam?",
    a: "No. Mock interviews are voice-only. Just a microphone (your laptop mic works fine). This mirrors how most real interviews are conducted today: phone screens and virtual onsites with video optional.",
  },
];

const INTERVIEW_TYPES = [
  {
    type: "Technical Interviews",
    description: "Data structures, algorithms, system design, API design, and coding concepts, asked the way real interviewers ask them, not as a LeetCode grind.",
    roles: ["Software Engineer", "Data Scientist", "ML Engineer", "Frontend Developer"],
    href: "/interview-questions/software-engineer",
  },
  {
    type: "Behavioural Interviews",
    description: "STAR-method questions on leadership, conflict, failure, and impact. The AI follows up when your answer is vague and scores your ownership language.",
    roles: ["All roles", "Product Manager", "Consulting", "Finance"],
    href: "/interview-questions/product-manager",
  },
  {
    type: "Case Interviews",
    description: "Structured case frameworks for consulting and business roles. Market sizing, profit decline, go-to-market, and operational cases.",
    roles: ["Management Consultant", "Product Manager", "Business Analyst"],
    href: "/interview-questions/management-consultant",
  },
  {
    type: "Finance Interviews",
    description: "DCF, LBO, accounting concepts, and market knowledge questions for investment banking, PE, and financial analyst roles.",
    roles: ["Investment Banker", "Financial Analyst", "VC / PE"],
    href: "/interview-questions/investment-banker",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Pick your role and company",
    description: "Choose from 40+ roles and 20+ target companies. The AI tailors its questions to match that company's actual interview style, including Google's Googleyness rounds, Amazon's Leadership Principles, Stripe's systems thinking.",
  },
  {
    number: "02",
    title: "Interview with a 3-agent panel",
    description: "An HR screener, technical lead, and hiring manager take turns asking questions. They follow up when you're vague, push back when you're wrong, and calibrate difficulty in real time. Speaking out loud is the skill you are building.",
  },
  {
    number: "03",
    title: "Get a detailed debrief",
    description: "After each session you receive scores across 5 dimensions: communication clarity, technical depth, answer structure, relevance to the question, and confidence signals. Every weak spot is explained with a specific suggested improvement.",
  },
];

export default function AIMockInterviewPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div className="min-h-screen bg-[#050810]">
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "AI Mock Interview", url: "https://preciprocal.com/ai-mock-interview" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm mb-8 flex gap-2 items-center" style={{ color: "#64748b" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>AI Mock Interview</span>
        </nav>

        {/* ── H1 + Intro ──────────────────────────────────────────────────── */}
        <h1
          className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight tracking-tight"
          style={{ color: "#ffffff" }}
        >
          AI Mock Interview Practice:<br />
          <span style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Realistic. Instant. Free to Start.
          </span>
        </h1>

        <p className="text-lg mb-4 leading-relaxed max-w-3xl" style={{ color: "#94a3b8" }}>
          Most candidates lose offers in the interview room, not on paper. Preciprocal's AI mock
          interview platform puts you in front of a realistic 3-agent panel for any role or company,
          scores your answers across 5 dimensions, and tells you exactly what to fix before the
          real thing.
        </p>
        <p className="text-lg mb-10 leading-relaxed max-w-3xl" style={{ color: "#94a3b8" }}>
          Built specifically for <strong style={{ color: "#e2e8f0" }}>students and new grads</strong>{" "}
          entering the job market, not generic career coaching for people who've done it before.
        </p>

        {/* ── Primary CTA ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href={`${APP_URL}/sign-up`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            Start your free mock interview →
          </Link>
          <Link
            href={`${APP_URL}/sign-up?plan=pro`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border transition-colors"
            style={{ color: "#94a3b8", borderColor: "#1e293b" }}
          >
            View all plans
          </Link>
        </div>

        {/* ── Social proof strip ──────────────────────────────────────────── */}
        <div
          className="flex flex-wrap gap-6 mb-16 py-5 px-6 rounded-xl border"
          style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
        >
          {[
            { stat: "30+", label: "interviews / month on Pro" },
            { stat: "5", label: "scoring dimensions per session" },
            { stat: "40+", label: "roles supported" },
            { stat: "20+", label: "company-specific prep packs" },
          ].map(({ stat, label }) => (
            <div key={stat} className="flex flex-col">
              <span className="text-2xl font-extrabold" style={{ color: "#6366f1" }}>{stat}</span>
              <span className="text-sm" style={{ color: "#64748b" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* ── How It Works ────────────────────────────────────────────────── */}
        <section aria-label="How AI mock interviews work" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: "#ffffff" }}>
            How AI mock interview practice works
          </h2>
          <div className="space-y-8">
            {STEPS.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-sm"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
                >
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>
                    {step.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: "#94a3b8" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Interview Types ─────────────────────────────────────────────── */}
        <section aria-label="Interview types you can practice" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: "#ffffff" }}>
            Practice every type of interview
          </h2>
          <p className="mb-8" style={{ color: "#94a3b8" }}>
            Not just technical interviews. The AI adapts to whichever format your target company uses.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {INTERVIEW_TYPES.map((item) => (
              <Link
                key={item.type}
                href={item.href}
                className="block p-5 rounded-xl border transition-colors hover:border-indigo-500/50"
                style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
              >
                <h3 className="font-semibold mb-2" style={{ color: "#e2e8f0" }}>
                  {item.type}
                </h3>
                <p className="text-sm mb-3 leading-relaxed" style={{ color: "#64748b" }}>
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.roles.map((role) => (
                    <span
                      key={role}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "#1e293b", color: "#94a3b8" }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Who It's For ────────────────────────────────────────────────── */}
        <section aria-label="Who AI mock interviews are for" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "#ffffff" }}>
            Built specifically for students and new grads
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: "#94a3b8" }}>
            Most interview prep tools are built for mid-career professionals switching companies. They
            assume you have 5 years of STAR stories and prior offer negotiation experience. Preciprocal
            is built for the version of you that's entering the market for the first time.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "Computer Science students",
                body: "Technical interviews, system design, and LeetCode-adjacent questions, without pretending you have 3 years of production experience.",
              },
              {
                title: "Business & finance students",
                body: "Case interviews, behavioural rounds, and finance technicals for consulting, IB, and corporate roles.",
              },
              {
                title: "Career switchers breaking into tech",
                body: "Transferable skills framing, gap-bridging stories, and how to answer 'why tech, why now?' without sounding desperate.",
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="p-5 rounded-xl border"
                style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
              >
                <h3 className="font-semibold mb-2" style={{ color: "#e2e8f0" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Company-specific prep cross-link ────────────────────────────── */}
        <section
          aria-label="Company-specific interview practice"
          className="mb-16 p-6 rounded-xl border"
          style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
        >
          <h2 className="text-xl font-bold mb-2" style={{ color: "#ffffff" }}>
            Practice for a specific company
          </h2>
          <p className="text-sm mb-5" style={{ color: "#94a3b8" }}>
            Select a target company and the AI tailors its questions to their known format, values, and difficulty.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Google","Amazon","Meta","Microsoft","Apple","Stripe","Airbnb","Netflix","Uber","Spotify"].map((company) => (
              <Link
                key={company}
                href={`/interview-prep/${company.toLowerCase()}`}
                className="text-sm px-3 py-1.5 rounded-lg border transition-colors hover:border-indigo-500/50 hover:text-white"
                style={{ borderColor: "#1e293b", color: "#94a3b8" }}
              >
                {company}
              </Link>
            ))}
            <Link
              href="/interview-prep"
              className="text-sm px-3 py-1.5 rounded-lg border transition-colors hover:border-indigo-500/50"
              style={{ borderColor: "#1e293b", color: "#6366f1" }}
            >
              All 20+ companies →
            </Link>
          </div>
        </section>

        {/* ── Complement with ATS Checker ─────────────────────────────────── */}
        <section
          aria-label="Pair with ATS resume checker"
          className="mb-16 p-6 rounded-xl border"
          style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
        >
          <h2 className="text-xl font-bold mb-2" style={{ color: "#ffffff" }}>
            Don't forget your resume
          </h2>
          <p className="text-sm mb-4" style={{ color: "#94a3b8" }}>
            A great interview performance means nothing if your resume never makes it past the ATS filter.
            Check your score before you apply.
          </p>
          <Link
            href="/free-ats-checker"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-white"
            style={{ color: "#6366f1" }}
          >
            Run your free ATS resume check →
          </Link>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section aria-label="AI mock interview FAQ" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: "#ffffff" }}>
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {FAQS.map(({ q, a }) => (
              <div
                key={q}
                className="p-5 rounded-xl border"
                style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
              >
                <h3 className="font-semibold mb-2" style={{ color: "#e2e8f0" }}>{q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────────────────────────────── */}
        <section
          aria-label="Get started with AI mock interviews"
          className="text-center py-12 px-6 rounded-2xl border"
          style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#ffffff" }}>
            Start practicing today. It is free.
          </h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: "#94a3b8" }}>
            3 mock interviews per month on the free plan. Students with a .edu email get 1 month of Pro
            free. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`${APP_URL}/sign-up`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              Start free →
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border transition-colors hover:border-indigo-500/50"
              style={{ color: "#94a3b8", borderColor: "#1e293b" }}
            >
              See all plans
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}