/**
 * app/alternatives/jobscan-alternative/page.tsx
 *
 * Target keywords:
 *   "Jobscan alternative" (~2,400/mo, high intent)
 *   "Jobscan vs Preciprocal"
 *   "free ATS checker alternative to Jobscan"
 *   "cheaper than Jobscan"
 *   "Jobscan for students"
 *
 * Layout: PageHero, the quick verdict, then the feature table and the
 * remaining sections on the shared page kit (components/page), accent indigo.
 *
 * File path: app/alternatives/jobscan-alternative/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, SECTION, BTN_PRIMARY, BTN_SECONDARY, SectionHead, Eyebrow, PageHero, CtaPanel, FaqList, HeroSignup } from "@/components/page/Layout";
import { Reveal } from "@/components/page/Reveal";
import CompareTable, { Verdict, PriceCompare } from "@/components/page/CompareTable";
import { ReasonList, LinkList } from "@/components/AlternativePage";

export const metadata: Metadata = {
  title: { absolute: "Jobscan Alternative: Preciprocal vs Jobscan" },
  description:
    "Looking for a Jobscan alternative? Preciprocal offers ATS resume scoring, AI mock interviews, cover letter generation, and job tracking, all in one platform built for students at $9.99/mo vs Jobscan's $49.95/mo.",
  keywords: [
    "Jobscan alternative",
    "Jobscan vs Preciprocal",
    "free ATS checker alternative",
    "cheaper than Jobscan",
    "Jobscan for students",
    "ATS resume checker",
    "resume keyword checker alternative",
    "best ATS resume tool",
  ],
  alternates: {
    canonical: "https://preciprocal.com/alternatives/jobscan-alternative",
  },
  openGraph: {
    title: "Jobscan Alternative: Preciprocal vs Jobscan (2026)",
    description:
      "Honest comparison: Preciprocal vs Jobscan. ATS scoring, pricing, and which is better for students and new grads.",
    url: "https://preciprocal.com/alternatives/jobscan-alternative",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobscan Alternative | Preciprocal",
    description:
      "ATS resume scoring + AI mock interviews + cover letters + job tracker at $9.99/mo. Jobscan costs $49.95/mo and does only one thing.",
  },
};

const COMPARISON_ROWS = [
  { feature: "ATS Resume Scoring",          preciprocal: "✅ Full scoring + keyword fixes",            jobscan: "✅ Core feature" },
  { feature: "Resume keyword analysis",     preciprocal: "✅ Gap analysis vs job description",         jobscan: "✅ Core feature" },
  { feature: "Resume editor",               preciprocal: "✅ Full editor, PDF + Word export",          jobscan: "✅ Basic editor" },
  { feature: "Recruiter eye simulation",    preciprocal: "✅ 6-second scan + heatmap",                 jobscan: "❌ Not included" },
  { feature: "Candidate benchmarking",      preciprocal: "✅ See how you rank vs applicant pool",      jobscan: "❌ Not included" },
  { feature: "AI Mock Interviews",          preciprocal: "✅ Multi-agent panel, 3/mo on Pro",         jobscan: "❌ Not included" },
  { feature: "Cover Letter Generator",      preciprocal: "✅ AI-written, company-researched",          jobscan: "❌ Not included" },
  { feature: "Job Tracker",                 preciprocal: "✅ Kanban + contact finder",                 jobscan: "✅ Basic tracker" },
  { feature: "Chrome Extension",            preciprocal: "✅ 1-click import from LinkedIn",            jobscan: "✅ Yes" },
  { feature: "Application Autofill",       preciprocal: "✅ Fills the form, you review",        jobscan: "❌ Not included" },
  { feature: "Study Planner",               preciprocal: "✅ Day-by-day AI prep schedule",             jobscan: "❌ Not included" },
  { feature: "LinkedIn Optimiser",          preciprocal: "✅ Full profile rewrite (Premium)",          jobscan: "✅ LinkedIn scanning" },
  { feature: "Free plan",                   preciprocal: "✅ 3 analyses/mo, no credit card",           jobscan: "⚠️ Limited free scans" },
  { feature: "Starting price",              preciprocal: "✅ $9.99/mo (Pro)",                          jobscan: "⚠️ $49.95/mo" },
  { feature: "Student discount",            preciprocal: "✅ 1 month Pro free with .edu email",        jobscan: "❌ No student plan" },
  { feature: "Primary audience",            preciprocal: "✅ Students & new grads",                    jobscan: "⚠️ General job seekers" },
];

const FAQS = [
  {
    q: "What is Jobscan?",
    a: "Jobscan is an ATS optimization tool that compares your resume against a job description and gives you a match score with keyword recommendations. It's been around since 2014 and is primarily focused on resume scanning and LinkedIn profile optimization. It does the ATS analysis well but doesn't cover mock interviews, cover letters, or the broader job search workflow.",
  },
  {
    q: "Why do people look for a Jobscan alternative?",
    a: "The most common reasons are price ($49.95/mo monthly, or $89.95 per quarter, is steep for students and new grads), scope (Jobscan only does ATS scanning, so you still need separate tools for interview prep and cover letters), and the need for a more affordable all-in-one solution. Students in particular often find they need 3-4 tools to cover what Preciprocal does in one platform.",
  },
  {
    q: "Is Preciprocal's ATS checker as good as Jobscan's?",
    a: "Preciprocal's ATS scorer covers the same core analysis: keyword match percentage, missing keywords, formatting issues, and section structure. Where Preciprocal goes further is the recruiter eye simulation (a heatmap of what recruiters actually read) and candidate benchmarking (how your resume compares to other applicants for the same role). Jobscan has more years of calibration data; Preciprocal packages more around it.",
  },
  {
    q: "What does Preciprocal have that Jobscan doesn't?",
    a: "AI mock interviews (3/mo on Pro), a multi-agent interview panel with 5-dimension scoring, cover letter generation with real-time company research, a study planner, cold outreach generator, and interview debrief journal. Jobscan is a resume tool. Preciprocal is a full career prep platform.",
  },
  {
    q: "How much does Jobscan cost vs Preciprocal?",
    a: "Jobscan's paid plan starts at $49.95/mo. Preciprocal Pro is $9.99/mo. That's an 80% cost reduction for more features. Students with a .edu email get 1 month of Preciprocal Pro free.",
  },
  {
    q: "Can I use Preciprocal's ATS checker for free?",
    a: "Yes. Preciprocal's free plan includes 3 resume analyses per month, no credit card required. You get a full ATS score, keyword gap analysis, and formatting recommendations on every scan.",
  },
];

export default function JobscanAlternativePage() {
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
          { name: "Jobscan Alternative", url: "https://preciprocal.com/alternatives/jobscan-alternative" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main>
        {/* H1 */}
        <PageHero
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Alternatives", href: "/alternatives" }, { label: "Jobscan Alternative" }]}
          badge="Comparison · Updated May 2026"
          title="The Best Jobscan Alternative "
          accent="in 2026"
          aside={<HeroSignup href={`${APP_URL}/sign-up`} label="Try Preciprocal free" />}
          subhead={
            <>
              <p>
                Jobscan does one thing well: ATS resume scanning. But at $49.95/mo, you&apos;re paying enterprise
                pricing for a single tool. If you&apos;re a student or new grad who also needs to prepare for
                interviews, write cover letters, and track applications, you need more for less.
              </p>
              <p className="mt-4">
                <strong className="font-semibold text-slate-200">Preciprocal</strong> covers ATS scoring plus the
                entire job search pipeline at $9.99/mo. Here&apos;s an honest comparison.
              </p>
            </>
          }
        />

        {/* Quick verdict + price callout */}
        <div className={`${PAD} pb-4 pt-14`}>
          <div className={`${INNER} grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]`}>
            <Reveal>
              <Verdict
                competitor={
                  <>
                    Choose <strong className="font-semibold text-white">Jobscan</strong> if you only need ATS resume scanning and already have
                    separate tools for everything else, and price isn&apos;t a concern.
                  </>
                }
                preciprocal={
                  <>
                    Choose <strong className="font-semibold text-white">Preciprocal</strong> if you want ATS scoring plus AI mock interviews,
                    cover letter generation, job tracking, and a study planner in one platform at $9.99/mo.
                    Especially if you&apos;re a student or new grad.
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.08}>
              <PriceCompare
                items={[
                  { label: "Jobscan Pro", price: "$49.95/mo", note: "ATS scanning only", highlight: false },
                  { label: "Preciprocal Pro", price: "$9.99/mo", note: "Full career prep platform", highlight: true },
                ]}
              />
            </Reveal>
          </div>
        </div>

        {/* Comparison table */}
        <section aria-label="Feature comparison table" className={`${PAD} py-16`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead align="center" eyebrow="Feature by feature" title="Preciprocal vs Jobscan: feature comparison" className="mb-8" />
            </Reveal>
            <CompareTable
              competitor="Jobscan"
              caption="Preciprocal vs Jobscan: feature comparison"
              rows={COMPARISON_ROWS.map((r) => ({ feature: r.feature, preciprocal: r.preciprocal, other: r.jobscan }))}
            />
            <p className="mt-4 text-center text-xs text-slate-400">
              Based on publicly available feature lists as of September 2026. Always verify on each tool&apos;s pricing page.
            </p>
          </div>
        </section>

        {/* Why students choose Preciprocal */}
        <section aria-label="Why students choose Preciprocal over Jobscan" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead align="center" eyebrow="Why switch" title="Why students and new grads choose Preciprocal over Jobscan" className="mb-12" />
            </Reveal>
            <ReasonList
              items={[
                {
                  title: "80% cheaper for more coverage",
                  body: "Jobscan Pro is $49.95/mo for ATS scanning. Preciprocal Pro is $9.99/mo for ATS scanning, mock interviews, cover letters, job tracking, and a study planner. The math is straightforward.",
                },
                {
                  title: "ATS is just the first problem",
                  body: "Getting your resume past ATS gets you a callback. Then you need to interview well, write a compelling cover letter, and manage 20 applications at once. Jobscan stops at the resume. Preciprocal carries you through the whole process.",
                },
                {
                  title: "Built for entry-level, not just senior candidates",
                  body: "Jobscan's keyword analysis is calibrated for people with years of work experience. Preciprocal understands new grad resumes: how to present internships, projects, coursework, and transferable skills in a way that scores well against entry-level job descriptions.",
                },
                {
                  title: "Free ATS checker with no credit card",
                  body: "Preciprocal's free plan includes 3 resume analyses per month. No credit card. No 7-day trial that converts to a $50/mo subscription. Just a real free tier for students who are job searching on a budget.",
                },
              ]}
            />
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Jobscan alternative FAQ" className={`${SECTION} ${PAD}`}>
          <div className={`${INNER} grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] xl:gap-24`}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">Frequently asked questions</h2>
            </div>
            <FaqList items={FAQS} />
          </div>
        </section>

        {/* Internal links */}
        <section aria-label="Related resources" className={`pb-16 ${PAD}`}>
          <div className={INNER}>
            <LinkList
              title="Also useful"
              links={[
                { label: "Free ATS Resume Checker", href: "/free-ats-checker" },
                { label: "AI Mock Interview Practice", href: "/ai-mock-interview" },
                { label: "How to Pass ATS Resume Screening", href: "/blog/how-to-pass-ats-resume-screening" },
                { label: "Resume Keywords That Get Past ATS", href: "/blog/resume-keywords-that-get-past-ats" },
                { label: "Software Engineer Interview Questions", href: "/interview-questions/software-engineer" },
                { label: "Final Round AI Alternative", href: "/alternatives/final-round-ai-alternative" },
              ]}
            />
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Try Preciprocal free" className={`${PAD} pb-24`}>
          <Reveal>
            <CtaPanel
              title="Try Preciprocal free. No credit card needed."
              body={
                <p>
                  3 resume analyses, 5 cover letters, and 1 mock interview per month on the free plan.
                  Students with a .edu email get 1 month of Pro free.
                </p>
              }
              action={
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href={`${APP_URL}/sign-up`} className={BTN_PRIMARY}>
                    Start free <Chevron />
                  </Link>
                  <Link href="/free-ats-checker" className={BTN_SECONDARY}>
                    Try free ATS checker
                  </Link>
                </div>
              }
            />
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
