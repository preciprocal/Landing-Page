/**
 * app/alternatives/final-round-ai-alternative/page.tsx
 *
 * HIGH COMMERCIAL INTENT - searchers already know what they want and are
 * evaluating options. This type of page converts at 3-5x the rate of
 * informational content.
 *
 * Target keywords:
 *   "Final Round AI alternative" (~low vol, very high intent)
 *   "Final Round AI vs [competitor]"
 *   "best AI mock interview tool"
 *   "cheaper Final Round AI"
 *
 * Tone: honest, not a hit piece. Show the comparison factually.
 * Your angle: built for students/new grads, $9.99 vs Final Round's pricing,
 * all-in-one vs single-tool.
 *
 * Layout: PageHero, the quick verdict, then the feature table and the
 * remaining sections on the shared page kit (components/page), accent indigo.
 *
 * File path: app/alternatives/final-round-ai-alternative/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, SECTION, BTN_PRIMARY, SectionHead, PageHero, CtaPanel, FaqSection } from "@/components/page/Layout";
import { Reveal } from "@/components/page/Reveal";
import CompareTable, { Verdict } from "@/components/page/CompareTable";
import { ReasonList, LinkList } from "@/components/AlternativePage";

export const metadata: Metadata = {
  title: { absolute: "Final Round AI Alternative: Preciprocal Compared" },
  description:
    "Looking for a Final Round AI alternative? Compare features, pricing, and fit. Preciprocal offers AI mock interviews + ATS resume scoring + cover letter generator + job tracker, built for students at $9.99/mo.",
  keywords: [
    "Final Round AI alternative",
    "Final Round AI vs Preciprocal",
    "best AI mock interview tool",
    "cheaper Final Round AI",
    "AI interview practice alternative",
    "interview prep tool for students",
  ],
  alternates: {
    canonical: "https://preciprocal.com/alternatives/final-round-ai-alternative",
  },
  openGraph: {
    title: "Final Round AI Alternative: Preciprocal vs Final Round AI (2026)",
    description:
      "Honest comparison: Preciprocal vs Final Round AI. Features, pricing, and which is better for students and new grads.",
    url: "https://preciprocal.com/alternatives/final-round-ai-alternative",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }],
  },
};

const COMPARISON_ROWS = [
  { feature: "AI Mock Interviews",        preciprocal: "✅ Multi-agent panel (HR + Tech + HM)",    finalRound: "✅ Yes" },
  { feature: "Interview scoring",          preciprocal: "✅ 5 dimensions with debrief",              finalRound: "✅ Yes" },
  { feature: "Company-specific prep",     preciprocal: "✅ 20+ companies",                           finalRound: "✅ Yes" },
  { feature: "ATS Resume Checker",        preciprocal: "✅ Full ATS scoring + fixes",                finalRound: "❌ Not included" },
  { feature: "Resume editor",             preciprocal: "✅ PDF + Word export",                       finalRound: "❌ Not included" },
  { feature: "Cover Letter Generator",    preciprocal: "✅ AI-written, company-researched",          finalRound: "❌ Not included" },
  { feature: "Job Tracker",               preciprocal: "✅ Kanban + contact finder",                 finalRound: "❌ Not included" },
  { feature: "Chrome Extension",          preciprocal: "✅ 1-click import from LinkedIn",            finalRound: "✅ Real-time interview assist" },
  { feature: "Application Autofill",       preciprocal: "✅ Fills the form, you review",        finalRound: "❌ Not included" },
  { feature: "Study Planner",             preciprocal: "✅ Day-by-day AI schedule",                  finalRound: "❌ Not included" },
  { feature: "Free plan",                 preciprocal: "✅ 1 mock interview/mo, no card",           finalRound: "✅ Limited free tier" },
  { feature: "Starting price",            preciprocal: "✅ $9.99/mo (Pro)",                          finalRound: "⚠️ Higher pricing tiers" },
  { feature: "Student discount",          preciprocal: "✅ 1 month Pro free with .edu email",        finalRound: "❌ No student-specific plan" },
  { feature: "Primary audience",          preciprocal: "✅ Students & new grads",                    finalRound: "⚠️ General / enterprise-focused" },
];

const FAQS = [
  {
    q: "What is Final Round AI?",
    a: "Final Round AI is an AI interview preparation tool that provides mock interview practice and real-time interview assistance via a browser extension. It's primarily known for its Chrome extension that offers live interview support. It focuses on the interview stage of the job search.",
  },
  {
    q: "Why do people look for a Final Round AI alternative?",
    a: "Common reasons include: pricing (Final Round AI's higher tiers can be expensive for students), wanting an all-in-one platform that also covers resume scoring and job tracking, or needing stronger support for entry-level and new grad roles rather than senior-level interviews.",
  },
  {
    q: "How is Preciprocal different from Final Round AI?",
    a: "Preciprocal covers the entire job search pipeline, not just interviews. Where Final Round AI focuses on interview assistance, Preciprocal adds ATS resume scoring, cover letter generation, a job tracker with contact finder, and a study planner, all in one platform at $9.99/mo. It's also built specifically for students and new grads, not enterprise professionals.",
  },
  {
    q: "Is Preciprocal's mock interview as good as Final Round AI's?",
    a: "Preciprocal uses a multi-agent panel, an HR screener, technical lead, and hiring manager, each asking role-appropriate questions and following up on vague answers. You get a structured debrief scoring communication, technical depth, structure, relevance, and confidence. Whether that's 'better' depends on what you need: Preciprocal is deeper on feedback; Final Round AI emphasises real-time assistance.",
  },
  {
    q: "Can I try Preciprocal before paying?",
    a: "Yes. The free plan includes 1 mock interview per month, 3 resume analyses, and 5 cover letters, no credit card required. Students with a .edu email get 1 full month of Pro free (3 mock interviews and 30 cover letters a month).",
  },
];

export default function FinalRoundAIAlternativePage() {
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
    <div data-accent="indigo" className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Alternatives", url: "https://preciprocal.com/alternatives" },
          { name: "Final Round AI Alternative", url: "https://preciprocal.com/alternatives/final-round-ai-alternative" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main>
        {/* ── H1 ──────────────────────────────────────────────────────────── */}
        <PageHero
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Alternatives", href: "/alternatives" }, { label: "Final Round AI Alternative" }]}
          badge="Comparison · Updated May 2026"
          title="The Best Final Round AI Alternative "
          accent="in 2026"
          subhead={
            <p>
              Final Round AI is a solid interview prep tool. But if you&apos;re a student or new grad who also
              needs to fix your resume, generate cover letters, and track applications. You will need more
              than one tool, or a platform that does all of it.{" "}
              <strong className="font-semibold text-slate-200">Preciprocal</strong> covers the full job search pipeline
              at $9.99/mo.
            </p>
          }
        />

        {/* ── Quick verdict ───────────────────────────────────────────────── */}
        <div className={`${PAD} pb-4 pt-14`}>
          <Reveal className={INNER}>
            <Verdict
              competitor={
                <>
                  Choose <strong className="font-semibold text-white">Final Round AI</strong> if you only need interview practice with a real-time
                  browser extension for live interview support.
                </>
              }
              preciprocal={
                <>
                  Choose <strong className="font-semibold text-white">Preciprocal</strong> if you want AI mock interviews <em>plus</em> ATS
                  resume scoring, cover letter generation, job tracking, and a study planner, all in one
                  platform built for students and new grads, at $9.99/mo.
                </>
              }
            />
          </Reveal>
        </div>

        {/* ── Comparison table ────────────────────────────────────────────── */}
        <section aria-label="Feature comparison table" className={`${PAD} py-16`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead align="center" eyebrow="Feature by feature" title="Preciprocal vs Final Round AI: feature comparison" className="mb-8" />
            </Reveal>
            <CompareTable
              competitor="Final Round AI"
              caption="Preciprocal vs Final Round AI: feature comparison"
              rows={COMPARISON_ROWS.map((r) => ({ feature: r.feature, preciprocal: r.preciprocal, other: r.finalRound }))}
            />
            <p className="mt-4 text-center text-xs text-slate-400">
              Information based on publicly available feature lists as of September 2026. Features may change. Always verify on each tool&apos;s pricing page.
            </p>
          </div>
        </section>

        {/* ── Why students choose Preciprocal ─────────────────────────────── */}
        <section aria-label="Why students choose Preciprocal" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead align="center" eyebrow="Why switch" title="Why students and new grads choose Preciprocal" className="mb-12" />
            </Reveal>
            <ReasonList
              items={[
                {
                  title: "One platform for the entire job search",
                  body: "Resume, applications, interviews, offers. Most tools pick one stage. Preciprocal covers all four, so you're not juggling 4 subscriptions.",
                },
                {
                  title: "Built for entry-level, not just senior engineers",
                  body: "The AI understands you might not have 5 years of STAR stories. It calibrates question difficulty and story-building expectations for new grads and early-career candidates.",
                },
                {
                  title: "Honest pricing for students",
                  body: "Pro is $9.99/mo against $90/mo billed monthly. Students with a .edu email get 1 month of Pro free. Land a job while subscribed and we refund that month.",
                },
                {
                  title: "ATS resume scoring included",
                  body: "Your resume has to get past ATS before you can interview. Most interview-only tools ignore this entirely. Preciprocal's ATS checker scores your resume against the job description and gives you a fix list.",
                },
              ]}
            />
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <FaqSection items={FAQS} sectionProps={{ "aria-label": "Frequently asked questions" }} />

        {/* ── Internal links ──────────────────────────────────────────────── */}
        <section aria-label="Related resources" className={`pb-16 ${PAD}`}>
          <div className={INNER}>
            <LinkList
              title="Also useful"
              links={[
                { label: "AI Mock Interview Practice", href: "/ai-mock-interview" },
                { label: "Free ATS Resume Checker", href: "/free-ats-checker" },
                { label: "Software Engineer Interview Questions", href: "/interview-questions/software-engineer" },
                { label: "Google Interview Prep Guide", href: "/interview-prep/google" },
                { label: "STAR Method Behavioral Interviews", href: "/blog/star-method-behavioral-interviews" },
                { label: "System Design Interview Tips", href: "/blog/system-design-interview-tips" },
              ]}
            />
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section aria-label="Try Preciprocal free" className={`${PAD} pb-24`}>
          <Reveal>
            <CtaPanel
              title="Try Preciprocal free. No card required."
              body={
                <p>
                  1 mock interview, 3 resume analyses, and 5 cover letters per month on the free plan.
                  Students with a .edu email get 1 month of Pro free.
                </p>
              }
              action={
                <Link href={`${APP_URL}/sign-up`} className={BTN_PRIMARY}>
                  Start free <Chevron />
                </Link>
              }
            />
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
