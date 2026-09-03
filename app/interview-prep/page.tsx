/**
 * app/interview-prep/page.tsx
 *
 * Hub/index page for all company-specific interview prep guides.
 * Targets: "interview prep by company", "how to prepare for [company] interview"
 *
 * File path: app/interview-prep/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ALL_COMPANIES, COMPANY_META, APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Company Interview Prep: 56 Top Employers (2026)",
  description: "Free interview prep guides for 56 top employers across tech, investment banking, consulting, healthcare and retail. Google, Goldman Sachs, McKinsey, Mayo Clinic and more, with process breakdowns and culture tips.",
  alternates: { canonical: "https://preciprocal.com/interview-prep" },
  openGraph: {
    title: "Company Interview Prep Guides 2026: Preciprocal",
    description: "How to prepare for Google, Amazon, Meta, Microsoft, OpenAI, Stripe, and 15 more top companies. Process breakdown, culture tips, and real Q&As.",
    url: "https://preciprocal.com/interview-prep",
    type: "website",
  },
};

/**
 * Company display data is derived from COMPANY_META rather than duplicated here.
 * This page previously kept its own hardcoded list of 20 companies, which meant
 * adding a company required editing two files and silently dropped it from this
 * hub if you forgot the second one.
 */
const COMPANY_DISPLAY: Record<string, { name: string; difficulty: string; tier: string }> =
  Object.fromEntries(
    ALL_COMPANIES.map((slug) => {
      const meta = COMPANY_META[slug];
      return [slug, { name: meta.displayName, difficulty: meta.difficulty, tier: meta.tier }];
    })
  );

// Display order for the tier groupings. Any tier present in COMPANY_META but
// missing here would not render, so the list is derived and then sorted rather
// than hardcoded.
const TIER_ORDER = [
  "FAANG",
  "AI Labs",
  "Top Tier",
  "Unicorn",
  "Enterprise",
  "Investment Banking",
  "Quant & Trading",
  "Consulting",
  "Professional Services",
  "Financial Services",
  "Healthcare",
  "Consumer & Retail",
];

const TIERS = [...new Set(ALL_COMPANIES.map((c) => COMPANY_META[c].tier))].sort(
  (a, b) => TIER_ORDER.indexOf(a) - TIER_ORDER.indexOf(b)
);

const DIFFICULTY_COLOR: Record<string, string> = {
  "Medium":           "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Hard":             "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Very Hard":        "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "Extremely Hard":   "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

export default function InterviewPrepIndexPage() {
  const grouped = TIERS.map((tier) => ({
    tier,
    companies: ALL_COMPANIES.filter((c) => COMPANY_DISPLAY[c]?.tier === tier),
  })).filter((g) => g.companies.length > 0);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Interview Prep", url: "https://preciprocal.com/interview-prep" },
        ]}
      />

      <div className="min-h-screen bg-[#050810]">
        <Navbar />

        <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-8 flex gap-2 items-center">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-slate-300">Interview Prep</span>
          </nav>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Company interview prep guides
          </h1>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl leading-relaxed">
            In-depth prep guides for 56 top employers across tech, banking, consulting, healthcare
            and retail, covering interview process, culture, difficulty, and what gets you the offer.
          </p>

          {/* Company grid by tier */}
          <div className="space-y-12">
            {grouped.map(({ tier, companies }) => (
              <section key={tier}>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4 border-b border-white/[0.06] pb-3">
                  {tier}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {companies.map((company) => {
                    const display = COMPANY_DISPLAY[company];
                    if (!display) return null;
                    const diffClass = DIFFICULTY_COLOR[display.difficulty] ?? DIFFICULTY_COLOR["Hard"];
                    return (
                      <Link
                        key={company}
                        href={`/interview-prep/${company}`}
                        className="group flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.05] hover:border-white/[0.12] transition-all"
                      >
                        <div>
                          <p className="text-white font-medium text-sm group-hover:text-indigo-300 transition-colors">
                            {display.name}
                          </p>
                          <p className="text-slate-600 text-[11px] mt-0.5">Prep guide →</p>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${diffClass}`}>
                          {display.difficulty}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Difficulty legend */}
          <div className="mt-10 flex flex-wrap gap-3 text-[11px]">
            <span className="text-slate-600 mr-2">Difficulty:</span>
            {Object.entries(DIFFICULTY_COLOR).map(([label, cls]) => (
              <span key={label} className={`px-2 py-1 rounded-full border ${cls}`}>{label}</span>
            ))}
          </div>

          {/* Role questions cross-link */}
          <div className="mt-16 p-6 bg-white/[0.03] border border-white/[0.07] rounded-2xl">
            <h2 className="text-white font-semibold mb-2">Looking for role-specific questions?</h2>
            <p className="text-slate-400 text-sm mb-4">
              We also have detailed Q&A guides for 20+ roles, including software engineer, PM, data scientist, and more.
            </p>
            <Link
              href="/interview-questions"
              className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium"
            >
              Browse role interview guides →
            </Link>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm mb-4">
              Practice with an AI that mimics each company&apos;s actual interview style.
            </p>
            <a
              href={`${APP_URL}/sign-up`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Start practicing free, no credit card required
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}