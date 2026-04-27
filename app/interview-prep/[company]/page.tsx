/**
 * app/interview-prep/[company]/page.tsx
 *
 * All data (COMPANY_META, getCompanyMeta, getCompanyQuestions, ALL_COMPANIES)
 * lives in lib/constants.ts. This file is pure rendering logic only.
 *
 * Next.js 15 fix: params must be typed as Promise<{company: string}> in both
 * generateMetadata and the default export.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CompanyPageJsonLd } from "@/components/JsonLd";
import { ALL_COMPANIES, getCompanyMeta, getCompanyQuestions, COMPANY_META, APP_URL } from "@/lib/constants";

export async function generateStaticParams() {
  return ALL_COMPANIES.map((company) => ({ company }));
}

export async function generateMetadata({ params }: { params: Promise<{ company: string }> }): Promise<Metadata> {
  const { company } = await params;
  const meta = getCompanyMeta(company);
  if (!meta) return {};
  const canonical = `https://preciprocal.com/interview-prep/${company}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: { title: meta.title, description: meta.description, url: canonical, type: "article", images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

const DIFFICULTY_COLOR: Record<string, { color: string; bg: string; border: string }> = {
  "Medium":          { color: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.2)" },
  "Hard":            { color: "#fbbf24", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.2)" },
  "Very Hard":       { color: "#fb923c", bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.2)" },
  "Extremely Hard":  { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.2)" },
};

export default async function CompanyPrepPage({ params }: { params: Promise<{ company: string }> }) {
  const { company } = await params;
  const meta = getCompanyMeta(company);
  if (!meta) notFound();

  const questions = getCompanyQuestions(company);
  const diffStyle = DIFFICULTY_COLOR[meta.difficulty] ?? DIFFICULTY_COLOR["Hard"];

  return (
    <div className="min-h-screen bg-[#050810]">
      <CompanyPageJsonLd
        company={meta.displayName}
        slug={company}
        description={meta.description}
        questions={questions.map((q) => ({ question: q.question, answer: q.answer }))}
      />
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ color: "#64748b" }} className="text-sm mb-8 flex gap-2 items-center flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link href="/interview-prep" className="hover:text-white transition-colors">Interview Prep</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>{meta.displayName}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full border"
              style={{ color: "#818cf8", background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.2)" }}
            >
              {meta.tier}
            </span>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full border"
              style={{ color: diffStyle.color, background: diffStyle.bg, borderColor: diffStyle.border }}
            >
              {meta.difficulty}
            </span>
          </div>

          <h1 style={{ color: "#ffffff" }} className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4 tracking-tight">
            How to Get a Job at {meta.displayName} (2026)
          </h1>

          <p style={{ color: "#94a3b8" }} className="text-lg leading-relaxed mb-6">
            {meta.description}
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Interview Rounds", value: `${meta.avgRounds} rounds` },
              { label: "Timeline", value: meta.avgDuration },
              { label: "Difficulty", value: meta.difficulty },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p style={{ color: "#475569" }} className="text-xs mb-1">{stat.label}</p>
                <p style={{ color: "#e2e8f0" }} className="font-semibold text-sm">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mb-10 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Overview */}
        <section className="mb-12">
          <h2 style={{ color: "#ffffff" }} className="text-2xl font-bold mb-4">Company overview</h2>
          <p style={{ color: "#94a3b8" }} className="leading-relaxed">{meta.overview}</p>
        </section>

        {/* Interview process */}
        <section className="mb-12">
          <h2 style={{ color: "#ffffff" }} className="text-2xl font-bold mb-6">The interview process</h2>
          <div className="space-y-3">
            {meta.interviewProcess.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}
                >
                  {i + 1}
                </div>
                <p style={{ color: "#cbd5e1" }} className="text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top tips */}
        <section className="mb-12">
          <h2 style={{ color: "#ffffff" }} className="text-2xl font-bold mb-6">Top tips for getting hired</h2>
          <div className="space-y-3">
            {meta.tips.map((tip, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(99,102,241,0.15)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ color: "#94a3b8" }} className="text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top roles */}
        <section className="mb-12">
          <h2 style={{ color: "#ffffff" }} className="text-2xl font-bold mb-4">Top roles at {meta.displayName}</h2>
          <div className="flex flex-wrap gap-2">
            {meta.topRoles.map((role) => (
              <span
                key={role}
                className="px-3 py-1.5 rounded-lg text-sm"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#cbd5e1" }}
              >
                {role}
              </span>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mb-10 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* FAQ */}
        <section className="mb-12">
          <h2 style={{ color: "#ffffff" }} className="text-2xl font-bold mb-8">{meta.displayName} Interview FAQ</h2>
          <div className="space-y-5">
            {questions.map((qa, i) => (
              <article
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3
                  style={{ color: "#ffffff", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  className="font-semibold text-base px-6 py-4"
                >
                  {qa.question}
                </h3>
                <div className="px-6 py-5">
                  <p style={{ color: "#cbd5e1" }} className="leading-relaxed text-sm sm:text-base">{qa.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Related companies */}
        {meta.relatedCompanies.length > 0 && (
          <section className="mt-12 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 style={{ color: "#ffffff" }} className="text-xl font-bold mb-6">Also preparing for</h2>
            <div className="flex flex-wrap gap-3">
              {meta.relatedCompanies.map((slug) => {
                const relMeta = COMPANY_META[slug];
                const name = relMeta?.displayName ?? slug.charAt(0).toUpperCase() + slug.slice(1);
                return (
                  <Link
                    key={slug}
                    href={`/interview-prep/${slug}`}
                    style={{ color: "#cbd5e1", borderColor: "rgba(255,255,255,0.1)" }}
                    className="px-4 py-2 rounded-xl border text-sm hover:text-white transition-all"
                  >
                    {name} Interview Prep
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p style={{ color: "#475569" }} className="text-sm mb-4">Ready to land the {meta.displayName} offer?</p>
          <a
            href={`${APP_URL}/sign-up`}
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#ffffff" }}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Start practicing free — no credit card required
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}