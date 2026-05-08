/**
 * app/alternatives/resume-worded-alternative/page.tsx
 *
 * Target keywords:
 *   "Resume Worded alternative" (~1,900/mo, high intent)
 *   "Resume Worded vs Preciprocal"
 *   "free resume feedback tool"
 *   "Resume Worded for students"
 *
 * File path: app/alternatives/resume-worded-alternative/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Best Resume Worded Alternative in 2026: Preciprocal vs Resume Worded",
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
    canonical: "https://preciprocal.com/alternatives/resume-worded-alternative",
  },
  openGraph: {
    title: "Resume Worded Alternative: Preciprocal vs Resume Worded (2026)",
    description:
      "Honest comparison: Preciprocal vs Resume Worded. Features, pricing, and which is better for students and new grads.",
    url: "https://preciprocal.com/alternatives/resume-worded-alternative",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
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
  { feature: "AI Mock Interviews",          preciprocal: "✅ Multi-agent panel, 30/mo on Pro",        resumeWorded: "❌ Not included" },
  { feature: "Cover Letter Generator",      preciprocal: "✅ AI-written, company-researched",         resumeWorded: "❌ Not included" },
  { feature: "Job Tracker",                 preciprocal: "✅ Kanban + contact finder",                resumeWorded: "❌ Not included" },
  { feature: "Chrome Extension",            preciprocal: "✅ 1-click import from LinkedIn",           resumeWorded: "❌ Not included" },
  { feature: "Study Planner",               preciprocal: "✅ Day-by-day AI prep schedule",            resumeWorded: "❌ Not included" },
  { feature: "LinkedIn Optimiser",          preciprocal: "✅ Full profile rewrite (Premium)",         resumeWorded: "✅ LinkedIn grader" },
  { feature: "Free plan",                   preciprocal: "✅ 5 analyses/mo, no credit card",          resumeWorded: "⚠️ Very limited free tier" },
  { feature: "Starting price",              preciprocal: "✅ $9.99/mo (Pro)",                         resumeWorded: "⚠️ $29/mo+" },
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
    a: "The most common reasons: pricing ($29/mo+ adds up quickly for students on a budget), limited scope (Resume Worded covers resume feedback but you still need separate tools for interviews and cover letters), and the free tier being too restricted to get real value. Students often want a single, affordable platform for the whole job search.",
  },
  {
    q: "Is Preciprocal's resume scoring as detailed as Resume Worded's?",
    a: "Preciprocal covers the same core functionality: ATS score, keyword analysis, bullet-by-bullet suggestions, and formatting feedback. Where Preciprocal adds value is recruiter eye simulation (a visual heatmap of what recruiters actually read in 6 seconds), candidate benchmarking (how your resume ranks vs other applicants), and interview intelligence (which resume bullets lead to interview questions). Resume Worded has more years of feedback data; Preciprocal wraps more around it.",
  },
  {
    q: "What does Preciprocal have that Resume Worded doesn't?",
    a: "AI mock interviews (30/mo on Pro with a 3-agent panel and 5-dimension scoring), cover letter generation with real-time company research, a job tracker with contact finder, a day-by-day study planner, and a Chrome extension for 1-click job saving. Resume Worded is a resume review tool. Preciprocal is a full job search operating system.",
  },
  {
    q: "How much does Resume Worded cost vs Preciprocal?",
    a: "Resume Worded's paid plans start around $29/mo. Preciprocal Pro is $9.99/mo with significantly more features. For students with a .edu email, Preciprocal offers 1 month of Pro completely free.",
  },
  {
    q: "Can I get free resume feedback without paying?",
    a: "Yes. Preciprocal's free plan includes 5 full resume analyses per month with no credit card required. You get ATS score, keyword gap analysis, formatting recommendations, and recruiter simulation on every scan.",
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
    <div className="min-h-screen bg-[#050810]">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm mb-8 flex gap-2 items-center flex-wrap" style={{ color: "#64748b" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>Alternatives</span>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>Resume Worded Alternative</span>
        </nav>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-5"
          style={{ background: "#1e293b", color: "#6366f1" }}
        >
          Comparison · Updated May 2026
        </div>

        {/* H1 */}
        <h1
          className="text-3xl sm:text-4xl font-extrabold mb-5 leading-tight tracking-tight"
          style={{ color: "#ffffff" }}
        >
          The Best Resume Worded Alternative in 2026
        </h1>
        <p className="text-lg mb-6 leading-relaxed max-w-3xl" style={{ color: "#94a3b8" }}>
          Resume Worded gives solid line-by-line resume feedback. But once your resume is polished,
          you still need to prepare for interviews, write cover letters, and manage your applications.
          That means paying for more tools.
        </p>
        <p className="text-lg mb-10 leading-relaxed max-w-3xl" style={{ color: "#94a3b8" }}>
          <strong style={{ color: "#e2e8f0" }}>Preciprocal</strong> covers resume scoring plus the
          rest of the job search at $9.99/mo, built specifically for students and new grads.
        </p>

        {/* Quick verdict */}
        <div
          className="p-6 rounded-xl border mb-12"
          style={{ borderColor: "#6366f1", background: "#0a0f1e" }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: "#6366f1" }}>Quick verdict</p>
          <p className="leading-relaxed mb-2" style={{ color: "#e2e8f0" }}>
            Choose <strong>Resume Worded</strong> if you specifically want detailed line-by-line
            resume coaching with years of feedback data, and you already have separate tools for
            everything else.
          </p>
          <p className="leading-relaxed" style={{ color: "#e2e8f0" }}>
            Choose <strong>Preciprocal</strong> if you want resume scoring plus AI mock interviews,
            cover letter generation, job tracking, and a study planner in one platform at $9.99/mo.
            Especially if you're a student or breaking into the job market for the first time.
          </p>
        </div>

        {/* Price callout */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            { label: "Resume Worded", price: "$29+/mo", note: "Resume review only", highlight: false },
            { label: "Preciprocal Pro", price: "$9.99/mo", note: "Full job search platform", highlight: true },
          ].map(({ label, price, note, highlight }) => (
            <div
              key={label}
              className="p-6 rounded-xl border text-center"
              style={{
                borderColor: highlight ? "#6366f1" : "#1e293b",
                background: highlight ? "rgba(99,102,241,0.08)" : "#0a0f1e",
              }}
            >
              <p className="text-sm mb-2" style={{ color: "#64748b" }}>{label}</p>
              <p className="text-3xl font-extrabold mb-1" style={{ color: highlight ? "#6366f1" : "#e2e8f0" }}>{price}</p>
              <p className="text-sm" style={{ color: "#64748b" }}>{note}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <section aria-label="Feature comparison table" className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#ffffff" }}>
            Preciprocal vs Resume Worded: feature comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#1e293b" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#0a0f1e", borderBottom: "1px solid #1e293b" }}>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "#64748b" }}>Feature</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "#6366f1" }}>Preciprocal</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "#64748b" }}>Resume Worded</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    style={{
                      background: i % 2 === 0 ? "#050810" : "#0a0f1e",
                      borderBottom: "1px solid #1e293b",
                    }}
                  >
                    <td className="px-4 py-3 font-medium" style={{ color: "#e2e8f0" }}>{row.feature}</td>
                    <td className="px-4 py-3" style={{ color: "#94a3b8" }}>{row.preciprocal}</td>
                    <td className="px-4 py-3" style={{ color: "#94a3b8" }}>{row.resumeWorded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-3" style={{ color: "#475569" }}>
            Based on publicly available feature lists as of May 2026. Always verify on each tool's pricing page.
          </p>
        </section>

        {/* Why students choose Preciprocal */}
        <section aria-label="Why students choose Preciprocal over Resume Worded" className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#ffffff" }}>
            Why students and new grads choose Preciprocal over Resume Worded
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Resume feedback is step one, not the whole job",
                body: "Resume Worded helps you get a callback. After that, you still need to interview, write cover letters, and stay organised across 20+ applications. Preciprocal handles all of it so you're not paying for 4 tools separately.",
              },
              {
                title: "More affordable for students",
                body: "Resume Worded starts at $29/mo. Preciprocal Pro is $9.99/mo for significantly more features. Students with a .edu email get 1 month of Pro free, no credit card required.",
              },
              {
                title: "Built for people without extensive work history",
                body: "Most resume tools assume you have 5+ years of jobs to score against. Preciprocal understands new grad resumes: projects, internships, coursework, and how to frame limited experience in a way that ATS and recruiters actually respond to.",
              },
              {
                title: "Interview intelligence closes the loop",
                body: "Preciprocal's resume analysis includes Interview Intel, which flags which bullet points on your resume are likely to generate interview questions. So you prepare for the exact topics your resume raises, not random questions.",
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="flex gap-4 p-5 rounded-xl border"
                style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
              >
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
                >
                  ✓
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: "#e2e8f0" }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Resume Worded alternative FAQ" className="mb-16">
          <h2 className="text-2xl font-bold mb-8" style={{ color: "#ffffff" }}>
            Frequently asked questions
          </h2>
          <div className="space-y-5">
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

        {/* Internal links */}
        <section aria-label="Related resources" className="mb-16">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#ffffff" }}>Related resources</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Free ATS Resume Checker", href: "/free-ats-checker" },
              { label: "AI Mock Interview Practice", href: "/ai-mock-interview" },
              { label: "How to Pass ATS Resume Screening", href: "/blog/how-to-pass-ats-resume-screening" },
              { label: "Resume Keywords That Get Past ATS", href: "/blog/resume-keywords-that-get-past-ats" },
              { label: "Jobscan Alternative", href: "/alternatives/jobscan-alternative" },
              { label: "Final Round AI Alternative", href: "/alternatives/final-round-ai-alternative" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 p-3 rounded-lg border text-sm transition-colors hover:border-indigo-500/50 hover:text-white"
                style={{ borderColor: "#1e293b", color: "#94a3b8" }}
              >
                <span style={{ color: "#6366f1" }}>→</span>
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          aria-label="Try Preciprocal free"
          className="text-center py-12 px-6 rounded-2xl border"
          style={{ borderColor: "#1e293b", background: "#0a0f1e" }}
        >
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#ffffff" }}>
            Try Preciprocal free. No credit card needed.
          </h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: "#94a3b8" }}>
            5 resume analyses, 3 mock interviews, and 5 cover letters per month on the free plan.
            Students with a .edu email get 1 month of Pro free.
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
              href="/free-ats-checker"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border transition-colors hover:border-indigo-500/50"
              style={{ color: "#94a3b8", borderColor: "#1e293b" }}
            >
              Try free resume checker
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}