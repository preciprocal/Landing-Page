/**
 * app/free-ats-checker/page.tsx
 *
 * HIGH-PRIORITY SEO PAGE — "free ATS checker" gets ~6,600 searches/month.
 *
 * This page:
 *   • Targets: "free ATS checker", "ATS resume scanner", "ATS score checker",
 *     "resume ATS score", "check resume ATS compatibility"
 *   • Has a live interactive demo CTA above the fold
 *   • Explains what ATS is (content depth = ranking signal)
 *   • FAQ section with JSON-LD structured data
 *   • Internal links to /interview-questions and the app
 *
 * File path: app/free-ats-checker/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker — Score Your Resume in 60 Seconds",
  description:
    "Check your resume's ATS compatibility score for free. See which keywords you're missing, fix formatting issues, and get a line-by-line improvement plan before you apply.",
  keywords: [
    "free ATS checker",
    "ATS resume checker",
    "ATS score checker",
    "ATS resume scanner",
    "resume ATS compatibility",
    "check resume ATS score",
    "applicant tracking system checker",
    "resume keyword checker",
    "free resume scanner",
  ],
  alternates: {
    canonical: "https://preciprocal.com/free-ats-checker",
  },
  openGraph: {
    title: "Free ATS Resume Checker — Score Your Resume in 60 Seconds",
    description:
      "Check your resume's ATS score free. Fix keywords, formatting, and structure before your application gets auto-rejected.",
    url: "https://preciprocal.com/free-ats-checker",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ATS Resume Checker",
    description: "Score your resume in 60 seconds. Fix what's blocking you from getting interviews.",
  },
};

const ATS_FAQS = [
  {
    q: "What is an ATS (Applicant Tracking System)?",
    a: "An ATS is software used by 73% of companies to automatically screen and filter resumes before a human ever sees them. The system parses your resume, scores it against job requirements, and ranks candidates. Resumes that score below the threshold are automatically rejected — even if the candidate is qualified. Common ATS platforms include Workday, Greenhouse, Lever, iCIMS, and Taleo.",
  },
  {
    q: "Why does my resume get rejected by ATS?",
    a: "The most common reasons: (1) Missing keywords — your resume doesn't include the exact terms from the job description. (2) Bad formatting — tables, columns, text boxes, and headers/footers confuse ATS parsers. (3) Wrong file type — some ATS systems struggle with PDF; .docx is more reliably parsed. (4) Non-standard section headers — using 'Professional History' instead of 'Work Experience' can break parsing. (5) Missing contact information in a recognizable format.",
  },
  {
    q: "How is the ATS score calculated?",
    a: "Our ATS scorer analyses your resume against four dimensions: keyword match rate (against a job description or role-specific keyword database), formatting compatibility (does it parse cleanly?), section structure (are standard sections present and correctly labeled?), and header/contact parsing (can the system extract your name, email, and phone?). Each dimension is weighted and combined into a score out of 100.",
  },
  {
    q: "What ATS score should I aim for?",
    a: "Aim for 75+ to get past initial automated screening. 85+ is competitive. 90+ means your resume is optimally formatted and keyword-matched. Below 60, you're likely getting auto-rejected at most companies. A score doesn't guarantee interviews — it just means a human will actually read your resume.",
  },
  {
    q: "How do I improve my ATS score?",
    a: "The five highest-impact fixes: (1) Tailor your resume to each job description — mirror the exact language used. (2) Use a clean single-column layout — no tables, no text boxes, no headers/footers. (3) Rename non-standard sections ('Relevant Experience' → 'Work Experience'). (4) Add a Skills section with the exact tools and technologies from the job posting. (5) Include metrics — ATS systems score for quantifiable achievements.",
  },
  {
    q: "Is the ATS checker really free?",
    a: "Yes. Preciprocal's free plan includes 5 ATS resume analyses per month — no credit card required. Each analysis includes your overall score, keyword gap analysis, formatting issues, and section structure feedback. Paid plans include the Recruiter Eye Simulation, Candidate Benchmarking, and Interview Intelligence features.",
  },
  {
    q: "What file formats does the ATS checker support?",
    a: "PDF and Word (.docx). We recommend submitting in .docx for ATS parsing, and converting to PDF only when the job posting specifically requests it or when you're emailing a recruiter directly.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Upload your resume",
    body: "Paste a job description (optional but recommended for tailored scoring) and upload your resume in PDF or .docx format.",
  },
  {
    step: "2",
    title: "Get your ATS score",
    body: "In under 60 seconds, see your score out of 100 across keyword match, formatting, section structure, and contact parsing.",
  },
  {
    step: "3",
    title: "Fix what's failing you",
    body: "Get a line-by-line breakdown of exactly what to fix — not vague advice, but specific rewrites and missing keywords.",
  },
];

const WHAT_WE_CHECK = [
  { label: "Keyword match rate", description: "Are you using the exact terms from the job description?" },
  { label: "ATS parse compatibility", description: "Can the system extract your text without mangling it?" },
  { label: "Section structure", description: "Do your section headers match what ATS systems expect?" },
  { label: "Contact info detection", description: "Can it find your name, email, phone, and LinkedIn?" },
  { label: "Formatting red flags", description: "Tables, columns, text boxes, and headers that break parsing." },
  { label: "Quantification score", description: "How many of your bullets include measurable achievements?" },
];

export default function FreeATSCheckerPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Free ATS Checker", url: "https://preciprocal.com/free-ats-checker" },
        ]}
      />

      <div className="min-h-screen bg-[#050810]">
        <Navbar />

        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[12px] text-emerald-300 font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Free — no credit card required
              </div>

              {/* H1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                Free ATS resume checker
                <br />
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  score in 60 seconds
                </span>
              </h1>

              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                73% of resumes are rejected before a human sees them — by software, not people.
                Find out if yours passes ATS screening, and get exact fixes to make it through.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href={`${APP_URL}/sign-up?tool=ats-checker`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl text-base transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)]"
                >
                  Check my resume free →
                </a>
                <p className="text-[12px] text-slate-500">
                  5 free checks/month · No signup friction · Results in &lt;60s
                </p>
              </div>
            </div>
          </section>

          {/* ── What we check ──────────────────────────────────────────── */}
          <section className="py-16 px-4 sm:px-6 border-t border-white/[0.04]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-4">
                What the ATS checker analyses
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
                Six dimensions. Specific scores. Exact fixes — not generic resume advice.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {WHAT_WE_CHECK.map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center mb-3">
                      <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                    <p className="text-slate-500 text-[12px] leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── How it works ───────────────────────────────────────────── */}
          <section className="py-16 px-4 sm:px-6 border-t border-white/[0.04]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-12">
                How it works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {HOW_IT_WORKS.map((step) => (
                  <div key={step.step} className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ATS explainer — the SEO content body ──────────────────── */}
          <section className="py-16 px-4 sm:px-6 border-t border-white/[0.04]">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
                What is an ATS and why does it matter?
              </h2>

              <div className="space-y-6 text-slate-400 leading-relaxed">
                <p>
                  An <strong className="text-white">Applicant Tracking System (ATS)</strong> is
                  software used by over 98% of Fortune 500 companies and 73% of companies overall
                  to automatically filter job applications. When you apply online, your resume goes
                  through an ATS before any human reviews it.
                </p>
                <p>
                  The ATS parses your resume into structured data — name, contact info, work
                  history, education, skills — and scores it against the job requirements. Resumes
                  below the company&apos;s threshold are auto-rejected. Most candidates never know why.
                </p>
                <p>
                  The problem isn&apos;t that you&apos;re unqualified. It&apos;s that your resume isn&apos;t formatted
                  for machines. A resume with a beautiful multi-column design, embedded tables, and
                  a creative layout will often score lower than a plain single-column document with
                  the right keywords.
                </p>

                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">The 5 most common ATS rejection reasons</h3>
                  <ul className="space-y-3">
                    {[
                      "Missing keywords — your resume doesn't use the exact language from the job description",
                      "Multi-column layouts — ATS parsers read left-to-right and mangle column-based resumes",
                      "Text in headers/footers — most ATS systems can't parse text outside the main body",
                      "Non-standard section names — 'Career History' instead of 'Work Experience'",
                      "Tables and text boxes — these render as blank space or gibberish in most parsers",
                    ].map((reason, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-rose-400 flex-shrink-0 mt-0.5">✕</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p>
                  Preciprocal&apos;s free ATS checker identifies all of these issues and tells you
                  exactly how to fix them — not with vague advice, but with specific rewrites and
                  missing keywords pulled from your target role.
                </p>
              </div>
            </div>
          </section>

          {/* ── FAQ ─────────────────────────────────────────────────────── */}
          <section className="py-16 px-4 sm:px-6 border-t border-white/[0.04]">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-10 text-center">
                ATS checker FAQ
              </h2>

              {/* JSON-LD for this FAQ section */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: ATS_FAQS.map(({ q, a }) => ({
                      "@type": "Question",
                      name: q,
                      acceptedAnswer: { "@type": "Answer", text: a },
                    })),
                  }),
                }}
              />

              <div className="space-y-4">
                {ATS_FAQS.map((faq, i) => (
                  <article
                    key={i}
                    className="border border-white/[0.07] rounded-xl overflow-hidden"
                  >
                    <h3 className="text-white font-semibold text-sm px-5 py-4 bg-white/[0.03] border-b border-white/[0.05]">
                      {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm px-5 py-4 leading-relaxed">{faq.a}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── Internal links / related content ──────────────────────── */}
          <section className="py-12 px-4 sm:px-6 border-t border-white/[0.04]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-lg font-semibold text-white mb-6">Also useful for your job search</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Software engineer interview questions", href: "/interview-questions/software-engineer" },
                  { label: "Product manager interview questions", href: "/interview-questions/product-manager" },
                  { label: "Google interview prep guide", href: "/interview-prep/google" },
                  { label: "Amazon interview prep guide", href: "/interview-prep/amazon" },
                  { label: "AI mock interview practice", href: `${APP_URL}/sign-up` },
                  { label: "Cover letter generator", href: `${APP_URL}/sign-up?tool=cover-letter` },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 rounded-xl border border-white/[0.08] text-slate-400 text-sm hover:text-white hover:border-white/[0.15] transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ── Bottom CTA ───────────────────────────────────────────── */}
          <section className="py-20 px-4 sm:px-6 text-center border-t border-white/[0.04]">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Stop getting auto-rejected.
            </h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
              Check your resume for free, fix what&apos;s failing you, and start getting responses.
            </p>
            <a
              href={`${APP_URL}/sign-up?tool=ats-checker`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl text-base hover:opacity-90 transition-opacity"
            >
              Check my resume free →
            </a>
            <p className="text-[12px] text-slate-600 mt-4">
              5 free ATS checks per month · No credit card · Results in under 60 seconds
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}