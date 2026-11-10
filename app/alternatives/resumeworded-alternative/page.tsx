/**
 * app/alternatives/resume-worded-alternative/page.tsx
 *
 * Target keywords:
 *   "Resume Worded alternative" (~1,900/mo, high intent)
 *   "Resume Worded vs Preciprocal"
 *   "free resume feedback tool"
 *   "Resume Worded for students"
 *
 * Layout: PageHero, the quick verdict, then the feature table and the
 * remaining sections on the shared page kit (components/page), accent indigo.
 *
 * File path: app/alternatives/resume-worded-alternative/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, SECTION, BTN_PRIMARY, BTN_SECONDARY, SectionHead, PageHero, CtaPanel, FaqSection } from "@/components/page/Layout";
import { Reveal } from "@/components/page/Reveal";
import CompareTable, { Verdict, PriceCompare } from "@/components/page/CompareTable";
import { ReasonList, LinkList } from "@/components/AlternativePage";

export const metadata: Metadata = {
  title: { absolute: "Resume Worded Alternative: Preciprocal Compared" },
  description:
    "Looking for a Resume Worded alternative? Preciprocal offers resume scoring, AI mock interviews, cover letter generation, and job tracking in one platform. Built for students at $9.99/mo.",
  keywords: [
    "Resume Worded alternative",
    "Resume Worded vs Preciprocal",
    "free resume feedback tool",
    "resume scoring tool for students",
    "resume review AI",
    "best resume checker 2026",
    "AI resume feedback",
  ],
  alternates: {
    // Self-canonical. This previously pointed at .../resume-worded-alternative
    // (hyphenated), which 404s, so Google was told the real version of this page
    // lived at a URL that does not exist. The route is resumeworded-alternative,
    // which is also what the sitemap lists.
    canonical: "https://preciprocal.com/alternatives/resumeworded-alternative",
  },
  openGraph: {
    title: "Resume Worded Alternative: Preciprocal vs Resume Worded (2026)",
    description:
      "Honest comparison: Preciprocal vs Resume Worded. Features, pricing, and which is better for students and new grads.",
    url: "https://preciprocal.com/alternatives/resume-worded-alternative",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v3.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Worded Alternative | Preciprocal",
    description:
      "Resume scoring + AI mock interviews + cover letters + job tracker at $9.99/mo. Resume Worded does resume review only.",
  },
};

const COMPARISON_ROWS = [
  { feature: "Resume scoring",              preciprocal: "✅ ATS score + recruiter simulation",       resumeWorded: "✅ Core feature" },
  { feature: "Line-by-line feedback",       preciprocal: "✅ Detailed bullet rewrites",               resumeWorded: "✅ Core feature" },
  { feature: "ATS keyword analysis",        preciprocal: "✅ Gap analysis vs job description",        resumeWorded: "✅ Yes" },
  { feature: "Candidate benchmarking",      preciprocal: "✅ See how you rank vs applicant pool",     resumeWorded: "⚠️ Limited comparison data" },
  { feature: "Recruiter eye simulation",    preciprocal: "✅ 6-second scan + attention heatmap",      resumeWorded: "❌ Not included" },
  { feature: "Resume editor",               preciprocal: "✅ Full editor, PDF + Word export",         resumeWorded: "⚠️ Basic suggestions only" },
  { feature: "AI Mock Interviews",          preciprocal: "✅ Multi-agent panel, 3/mo on Pro",        resumeWorded: "❌ Not included" },
  { feature: "Cover Letter Generator",      preciprocal: "✅ AI-written, company-researched",         resumeWorded: "❌ Not included" },
  { feature: "Job Tracker",                 preciprocal: "✅ Kanban + contact finder",                resumeWorded: "❌ Not included" },
  { feature: "Chrome Extension",            preciprocal: "✅ 1-click import from LinkedIn",           resumeWorded: "❌ Not included" },
  { feature: "Application Autofill",       preciprocal: "✅ Fills the form, you review",        resumeWorded: "❌ Not included" },
  { feature: "Study Planner",               preciprocal: "✅ Day-by-day AI prep schedule",            resumeWorded: "❌ Not included" },
  { feature: "LinkedIn Optimiser",          preciprocal: "✅ Full profile rewrite (Premium)",         resumeWorded: "✅ LinkedIn grader" },
  { feature: "Free plan",                   preciprocal: "✅ 3 analyses/mo, no credit card",          resumeWorded: "⚠️ Very limited free tier" },
  { feature: "Starting price",              preciprocal: "✅ $9.99/mo (Pro)",                         resumeWorded: "⚠️ $49/mo" },
  { feature: "Student discount",            preciprocal: "✅ 1 month Pro free with .edu email",       resumeWorded: "❌ No student plan" },
  { feature: "Primary audience",            preciprocal: "✅ Students & new grads",                   resumeWorded: "⚠️ General professionals" },
];

const FAQS = [
  {
    q: "What is Resume Worded?",
    a: "Resume Worded is an AI-powered resume review tool that provides line-by-line feedback on your resume and LinkedIn profile. It's been popular among job seekers for its detailed suggestions on how to improve resume bullets. Like Jobscan, it focuses on the resume stage and doesn't cover interviews, cover letters, or the broader job search workflow.",
  },
  {
    q: "Why do people look for a Resume Worded alternative?",
    a: "The most common reasons: pricing ($49/mo adds up quickly for students on a budget), limited scope (Resume Worded covers resume feedback but you still need separate tools for interviews and cover letters), and the free tier being too restricted to get real value. Students often want a single, affordable platform for the whole job search.",
  },
  {
    q: "Is Preciprocal's resume scoring as detailed as Resume Worded's?",
    a: "Preciprocal covers the same core functionality: ATS score, keyword analysis, bullet-by-bullet suggestions, and formatting feedback. Where Preciprocal adds value is recruiter eye simulation (a visual heatmap of what recruiters actually read in 6 seconds), candidate benchmarking (how your resume ranks vs other applicants), and interview intelligence (which resume bullets lead to interview questions). Resume Worded has more years of feedback data; Preciprocal wraps more around it.",
  },
  {
    q: "What does Preciprocal have that Resume Worded doesn't?",
    a: "AI mock interviews (3/mo on Pro with a 3-agent panel and 5-dimension scoring), cover letter generation with real-time company research, a job tracker with contact finder, a day-by-day study planner, and a Chrome extension for 1-click job saving. Resume Worded is a resume review tool. Preciprocal is a full career prep platform.",
  },
  {
    q: "How much does Resume Worded cost vs Preciprocal?",
    a: "Resume Worded's paid plans start at $49/mo, or about $19/mo prepaid annually. Preciprocal Pro is $9.99/mo with significantly more features. For students with a .edu email, Preciprocal offers 1 month of Pro completely free.",
  },
  {
    q: "Can I get free resume feedback without paying?",
    a: "Yes. Preciprocal's free plan includes 3 full resume analyses per month with no credit card required. You get ATS score, keyword gap analysis, formatting recommendations, and recruiter simulation on every scan.",
  },
];

export default function ResumeWordedAlternativePage() {
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
          { name: "Resume Worded Alternative", url: "https://preciprocal.com/alternatives/resume-worded-alternative" },
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
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Alternatives", href: "/alternatives" }, { label: "Resume Worded Alternative" }]}
          badge="Comparison · Updated May 2026"
          title="The Best Resume Worded Alternative "
          accent="in 2026"
          subhead={
            <>
              <p>
                Resume Worded gives solid line-by-line resume feedback. But once your resume is polished,
                you still need to prepare for interviews, write cover letters, and manage your applications.
                That means paying for more tools.
              </p>
              <p className="mt-4">
                <strong className="font-semibold text-slate-200">Preciprocal</strong> covers resume scoring plus the
                rest of the job search at $9.99/mo, built specifically for students and new grads.
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
                    Choose <strong className="font-semibold text-white">Resume Worded</strong> if you specifically want detailed line-by-line
                    resume coaching with years of feedback data, and you already have separate tools for
                    everything else.
                  </>
                }
                preciprocal={
                  <>
                    Choose <strong className="font-semibold text-white">Preciprocal</strong> if you want resume scoring plus AI mock interviews,
                    cover letter generation, job tracking, and a study planner in one platform at $9.99/mo.
                    Especially if you&apos;re a student or breaking into the job market for the first time.
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.08}>
              <PriceCompare
                items={[
                  { label: "Resume Worded", price: "$49/mo", note: "Resume review only", highlight: false },
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
              <SectionHead align="center" eyebrow="Feature by feature" title="Preciprocal vs Resume Worded: feature comparison" className="mb-8" />
            </Reveal>
            <CompareTable
              competitor="Resume Worded"
              caption="Preciprocal vs Resume Worded: feature comparison"
              rows={COMPARISON_ROWS.map((r) => ({ feature: r.feature, preciprocal: r.preciprocal, other: r.resumeWorded }))}
            />
            <p className="mt-4 text-center text-xs text-slate-400">
              Based on publicly available feature lists as of September 2026. Always verify on each tool&apos;s pricing page.
            </p>
          </div>
        </section>

        {/* Why students choose Preciprocal */}
        <section aria-label="Why students choose Preciprocal over Resume Worded" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead align="center" eyebrow="Why switch" title="Why students and new grads choose Preciprocal over Resume Worded" className="mb-12" />
            </Reveal>
            <ReasonList
              items={[
                {
                  title: "Resume feedback is step one, not the whole job",
                  body: "Resume Worded helps you get a callback. After that, you still need to interview, write cover letters, and stay organised across 20+ applications. Preciprocal handles all of it so you're not paying for 4 tools separately.",
                },
                {
                  title: "More affordable for students",
                  body: "Resume Worded starts at $49/mo. Preciprocal Pro is $9.99/mo for significantly more features. Students with a .edu email get 1 month of Pro free, with nothing charged for 30 days.",
                },
                {
                  title: "Built for people without extensive work history",
                  body: "Most resume tools assume you have 5+ years of jobs to score against. Preciprocal understands new grad resumes: projects, internships, coursework, and how to frame limited experience in a way that ATS and recruiters actually respond to.",
                },
                {
                  title: "Interview intelligence closes the loop",
                  body: "Preciprocal's resume analysis includes Interview Intel, which flags which bullet points on your resume are likely to generate interview questions. So you prepare for the exact topics your resume raises, not random questions.",
                },
              ]}
            />
          </div>
        </section>

        {/* FAQ */}
        <FaqSection items={FAQS} sectionProps={{ "aria-label": "Resume Worded alternative FAQ" }} />

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
                { label: "Jobscan Alternative", href: "/alternatives/jobscan-alternative" },
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
                    Try free resume checker
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
