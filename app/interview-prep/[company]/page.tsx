/**
 * app/interview-prep/[company]/page.tsx
 *
 * All data (COMPANY_META, getCompanyMeta, getCompanyQuestions, ALL_COMPANIES)
 * lives in lib/constants.ts. This file is pure rendering logic only.
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

export async function generateMetadata({ params }: { params: { company: string } }): Promise<Metadata> {
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

export default async function CompanyPrepPage({ params }: { params: { company: string } }) {
  const { company } = await params;
  const meta = getCompanyMeta(company);
  if (!meta) notFound();

  const questions = getCompanyQuestions(company);
  const diffStyle = DIFFICULTY_COLOR[meta.difficulty] ?? DIFFICULTY_COLOR["Hard"];

  return (
    <div className="min-h-screen bg-[#050810]">
      <CompanyPageJsonLd company={meta.displayName} slug={company} description={meta.description} questions={questions} />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 page-main">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ color: "#64748b" }} className="text-sm mb-8 flex gap-2 items-center flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link href="/interview-prep" className="hover:text-white transition-colors">Interview Prep</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>{meta.displayName}</span>
        </nav>

        {/* H1 */}
        <h1 style={{ color: "#ffffff" }} className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight tracking-tight">
          {meta.displayName} Interview Prep Guide (2026)
        </h1>
        <p style={{ color: "#94a3b8" }} className="text-lg mb-8 leading-relaxed">{meta.description}</p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 mb-10">
          {[
            { label: "Difficulty",        value: meta.difficulty,       style: diffStyle },
            { label: "Typical rounds",    value: `${meta.avgRounds} rounds` },
            { label: "Process duration",  value: meta.avgDuration },
          ].map((s, i) => (
            <div key={i} className="rounded-xl px-4 py-3 border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div style={{ color: "#475569" }} className="text-xs mb-0.5">{s.label}</div>
              <div style={{ color: (s as any).style?.color ?? "#ffffff" }} className="font-semibold text-sm">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Practice CTA */}
        <div className="rounded-2xl p-6 mb-12" style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.08))", border: "1px solid rgba(99,102,241,0.2)" }}>
          <h2 style={{ color: "#ffffff" }} className="font-bold text-lg mb-2">Practice {meta.displayName} interviews with AI</h2>
          <p style={{ color: "#94a3b8" }} className="text-sm mb-4">Preciprocal&apos;s AI interviewer is trained on {meta.displayName}&apos;s known interview style — it asks company-specific follow-ups, scores your answers, and tells you exactly what to improve.</p>
          <a href={`${APP_URL}/sign-up`} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#ffffff" }} className="inline-flex items-center gap-2 px-6 py-2.5 font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity">
            Practice {meta.displayName} interviews free →
          </a>
        </div>

        {/* Overview */}
        <section className="mb-10">
          <h2 style={{ color: "#ffffff" }} className="text-2xl font-bold mb-4">Overview</h2>
          <p style={{ color: "#94a3b8" }} className="leading-relaxed">{meta.overview}</p>
        </section>

        {/* Process */}
        <section className="mb-10">
          <h2 style={{ color: "#ffffff" }} className="text-2xl font-bold mb-4">The {meta.displayName} Interview Process</h2>
          <ul className="space-y-2">
            {meta.interviewProcess.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                <span style={{ color: "#6366f1" }} className="flex-shrink-0 mt-0.5">→</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Culture */}
        <section className="mb-10">
          <h2 style={{ color: "#ffffff" }} className="text-2xl font-bold mb-4">Culture &amp; What They Value</h2>
          <p style={{ color: "#94a3b8" }} className="leading-relaxed">{meta.culture}</p>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 style={{ color: "#ffffff" }} className="text-2xl font-bold mb-6">Top Tips for Getting a {meta.displayName} Offer</h2>
          <div className="space-y-4">
            {meta.tips.map((tip, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}>
                  <span style={{ color: "#818cf8" }} className="text-xs font-bold">{i + 1}</span>
                </div>
                <p style={{ color: "#94a3b8" }} className="text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 style={{ color: "#ffffff" }} className="text-2xl font-bold mb-8">{meta.displayName} Interview FAQ</h2>
          <div className="space-y-5">
            {questions.map((qa, i) => (
              <article key={i} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 style={{ color: "#ffffff", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }} className="font-semibold text-base px-6 py-4">
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
                  <Link key={slug} href={`/interview-prep/${slug}`} style={{ color: "#cbd5e1", borderColor: "rgba(255,255,255,0.1)" }} className="px-4 py-2 rounded-xl border text-sm hover:text-white transition-all">
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
          <a href={`${APP_URL}/sign-up`} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#ffffff" }} className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Start practicing free — no credit card required
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}