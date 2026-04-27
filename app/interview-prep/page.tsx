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
import { ALL_COMPANIES } from "@/lib/constants";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Company Interview Prep Guides — Google, Amazon, Meta & More",
  description:
    "Free interview prep guides for 20+ top tech companies. Learn each company's interview process, culture, difficulty, and get role-specific tips from hired candidates.",
  alternates: {
    canonical: "https://preciprocal.com/interview-prep",
  },
  openGraph: {
    title: "Company Interview Prep Guides — Preciprocal",
    description:
      "How to prepare for Google, Amazon, Meta, Microsoft, Stripe, and 15 more top companies. Process breakdown, culture tips, and Q&As.",
    url: "https://preciprocal.com/interview-prep",
    type: "website",
  },
};

const COMPANY_DISPLAY: Record<string, { name: string; difficulty: string; tier: string }> = {
  google:      { name: "Google",      difficulty: "Very Hard",      tier: "FAANG" },
  amazon:      { name: "Amazon",      difficulty: "Hard",           tier: "FAANG" },
  meta:        { name: "Meta",        difficulty: "Very Hard",      tier: "FAANG" },
  microsoft:   { name: "Microsoft",   difficulty: "Hard",           tier: "FAANG" },
  apple:       { name: "Apple",       difficulty: "Very Hard",      tier: "FAANG" },
  stripe:      { name: "Stripe",      difficulty: "Very Hard",      tier: "Top Tier" },
  airbnb:      { name: "Airbnb",      difficulty: "Hard",           tier: "Top Tier" },
  uber:        { name: "Uber",        difficulty: "Hard",           tier: "Top Tier" },
  netflix:     { name: "Netflix",     difficulty: "Very Hard",      tier: "Top Tier" },
  spotify:     { name: "Spotify",     difficulty: "Hard",           tier: "Top Tier" },
  linkedin:    { name: "LinkedIn",    difficulty: "Hard",           tier: "Top Tier" },
  salesforce:  { name: "Salesforce",  difficulty: "Medium",         tier: "Enterprise" },
  oracle:      { name: "Oracle",      difficulty: "Medium",         tier: "Enterprise" },
  adobe:       { name: "Adobe",       difficulty: "Medium",         tier: "Enterprise" },
  nvidia:      { name: "NVIDIA",      difficulty: "Hard",           tier: "Top Tier" },
  openai:      { name: "OpenAI",      difficulty: "Extremely Hard", tier: "AI Labs" },
  anthropic:   { name: "Anthropic",   difficulty: "Extremely Hard", tier: "AI Labs" },
  databricks:  { name: "Databricks",  difficulty: "Hard",           tier: "Unicorn" },
  snowflake:   { name: "Snowflake",   difficulty: "Hard",           tier: "Unicorn" },
  palantir:    { name: "Palantir",    difficulty: "Extremely Hard", tier: "Unicorn" },
};

const TIERS = ["FAANG", "AI Labs", "Top Tier", "Unicorn", "Enterprise"];

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

        <main className="max-w-5xl mx-auto px-4 sm:px-6 page-main">
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
            In-depth prep guides for 20 top companies — covering interview process, culture,
            difficulty, common questions, and what actually gets you the offer.
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
              We also have detailed Q&A guides for 20+ roles — software engineer, PM, data scientist, and more.
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
              Start practicing free — no credit card required
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}