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
 * File path: app/alternatives/jobscan-alternative/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Best Jobscan Alternative in 2026: Preciprocal vs Jobscan",
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
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
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
  { feature: "AI Mock Interviews",          preciprocal: "✅ Multi-agent panel, 30/mo on Pro",         jobscan: "❌ Not included" },
  { feature: "Cover Letter Generator",      preciprocal: "✅ AI-written, company-researched",          jobscan: "❌ Not included" },
  { feature: "Job Tracker",                 preciprocal: "✅ Kanban + contact finder",                 jobscan: "✅ Basic tracker" },
  { feature: "Chrome Extension",            preciprocal: "✅ 1-click import from LinkedIn",            jobscan: "✅ Yes" },
  { feature: "Study Planner",               preciprocal: "✅ Day-by-day AI prep schedule",             jobscan: "❌ Not included" },
  { feature: "LinkedIn Optimiser",          preciprocal: "✅ Full profile rewrite (Premium)",          jobscan: "✅ LinkedIn scanning" },
  { feature: "Free plan",                   preciprocal: "✅ 5 analyses/mo, no credit card",           jobscan: "⚠️ Limited free scans" },
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
    a: "The most common reasons are price ($49.95/mo is steep for students and new grads), scope (Jobscan only does ATS scanning, so you still need separate tools for interview prep and cover letters), and the need for a more affordable all-in-one solution. Students in particular often find they need 3-4 tools to cover what Preciprocal does in one platform.",
  },
  {
    q: "Is Preciprocal's ATS checker as good as Jobscan's?",
    a: "Preciprocal's ATS scorer covers the same core analysis: keyword match percentage, missing keywords, formatting issues, and section structure. Where Preciprocal goes further is the recruiter eye simulation (a heatmap of what recruiters actually read) and candidate benchmarking (how your resume compares to other applicants for the same role). Jobscan has more years of calibration data; Preciprocal packages more around it.",
  },
  {
    q: "What does Preciprocal have that Jobscan doesn't?",
    a: "AI mock interviews (30/mo on Pro), a multi-agent interview panel with 5-dimension scoring, cover letter generation with real-time company research, a study planner, cold outreach generator, and interview debrief journal. Jobscan is a resume tool. Preciprocal is a full job search platform.",
  },
  {
    q: "How much does Jobscan cost vs Preciprocal?",
    a: "Jobscan's paid plan starts at $49.95/mo. Preciprocal Pro is $9.99/mo (or $7.49/mo billed annually). That's an 80% cost reduction for more features. Students with a .edu email get 1 month of Preciprocal Pro free.",
  },
  {
    q: "Can I use Preciprocal's ATS checker for free?",
    a: "Yes. Preciprocal's free plan includes 5 resume analyses per month, no credit card required. You get a full ATS score, keyword gap analysis, and formatting recommendations on every scan.",
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
    <div className="min-h-screen bg-[#050810]">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm mb-8 flex gap-2 items-center flex-wrap" style={{ color: "#64748b" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>Alternatives</span>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>Jobscan Alternative</span>
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
          The Best Jobscan Alternative in 2026
        </h1>
        <p className="text-lg mb-6 leading-relaxed max-w-3xl" style={{ color: "#94a3b8" }}>
          Jobscan does one thing well: ATS resume scanning. But at $49.95/mo, you're paying enterprise
          pricing for a single tool. If you're a student or new grad who also needs to prepare for
          interviews, write cover letters, and track applications, you need more for less.
        </p>
        <p className="text-lg mb-10 leading-relaxed max-w-3xl" style={{ color: "#94a3b8" }}>
          <strong style={{ color: "#e2e8f0" }}>Preciprocal</strong> covers ATS scoring plus the
          entire job search pipeline at $9.99/mo. Here's an honest comparison.
        </p>

        {/* Quick verdict */}
        <div
          className="p-6 rounded-xl border mb-12"
          style={{ borderColor: "#6366f1", background: "#0a0f1e" }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: "#6366f1" }}>Quick verdict</p>
          <p className="leading-relaxed mb-2" style={{ color: "#e2e8f0" }}>
            Choose <strong>Jobscan</strong> if you only need ATS resume scanning and already have
            separate tools for everything else, and price isn't a concern.
          </p>
          <p className="leading-relaxed" style={{ color: "#e2e8f0" }}>
            Choose <strong>Preciprocal</strong> if you want ATS scoring plus AI mock interviews,
            cover letter generation, job tracking, and a study planner in one platform at $9.99/mo.
            Especially if you're a student or new grad.
          </p>
        </div>

        {/* Price callout */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            { label: "Jobscan Pro", price: "$49.95/mo", note: "ATS scanning only", highlight: false },
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
            Preciprocal vs Jobscan: feature comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#1e293b" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#0a0f1e", borderBottom: "1px solid #1e293b" }}>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "#64748b" }}>Feature</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "#6366f1" }}>Preciprocal</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "#64748b" }}>Jobscan</th>
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
                    <td className="px-4 py-3" style={{ color: "#94a3b8" }}>{row.jobscan}</td>
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
        <section aria-label="Why students choose Preciprocal over Jobscan" className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#ffffff" }}>
            Why students and new grads choose Preciprocal over Jobscan
          </h2>
          <div className="space-y-4">
            {[
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
                body: "Preciprocal's free plan includes 5 resume analyses per month. No credit card. No 7-day trial that converts to a $50/mo subscription. Just a real free tier for students who are job searching on a budget.",
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
        <section aria-label="Jobscan alternative FAQ" className="mb-16">
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
              { label: "Software Engineer Interview Questions", href: "/interview-questions/software-engineer" },
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
              Try free ATS checker
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}