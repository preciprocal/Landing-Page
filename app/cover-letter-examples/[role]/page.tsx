/**
 * app/interview-questions/[role]/page.tsx
 *
 * All data (ROLE_META, ROLE_QUESTIONS, ALL_ROLES) lives in lib/constants.ts.
 * This file is pure rendering logic only.
 *
 * Next.js 15 fix: params must be typed as Promise<{role: string}> in both
 * generateMetadata and the default export.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { InterviewPageJsonLd } from "@/components/JsonLd";
import { ALL_ROLES, getRoleMeta, getRoleQuestions, APP_URL } from "@/lib/constants";

export async function generateStaticParams() {
  return ALL_ROLES.map((role) => ({ role }));
}

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role } = await params;
  if (!ALL_ROLES.includes(role as any)) return {};
  const meta = getRoleMeta(role);
  const canonical = `https://preciprocal.com/interview-questions/${role}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: { title: meta.title, description: meta.description, url: canonical, type: "article", images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function RoleInterviewPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (!ALL_ROLES.includes(role as any)) notFound();

  const meta      = getRoleMeta(role);
  const questions = getRoleQuestions(role);
  const roleLabel = role.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="min-h-screen bg-[#050810]">
      <InterviewPageJsonLd
        role={roleLabel}
        slug={role}
        description={meta.description}
        questions={questions}
      />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ color: "#64748b" }} className="text-sm mb-8 flex gap-2 items-center flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link href="/interview-questions" className="hover:text-white transition-colors">Interview Questions</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }} className="capitalize">{role.replace(/-/g, " ")}</span>
        </nav>

        {/* H1 */}
        <h1 style={{ color: "#ffffff" }} className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight tracking-tight">
          {meta.h1}
        </h1>
        <p style={{ color: "#94a3b8" }} className="text-lg mb-8 leading-relaxed">{meta.description}</p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 mb-10">
          {[
            { label: "Avg. Salary", value: meta.salaryRange },
            { label: "Questions", value: `${questions.length} Q&As` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="px-4 py-2 rounded-xl"
              style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <span style={{ color: "#64748b" }} className="text-xs mr-2">{stat.label}</span>
              <span style={{ color: "#c7d2fe" }} className="text-sm font-semibold">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Top companies */}
        {meta.topCompanies.length > 0 && (
          <div className="mb-10">
            <p style={{ color: "#64748b" }} className="text-xs mb-3 uppercase tracking-widest font-semibold">Top hiring companies</p>
            <div className="flex flex-wrap gap-2">
              {meta.topCompanies.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 rounded-lg text-sm"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="mb-10 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Questions */}
        <section className="mb-12">
          <h2 style={{ color: "#ffffff" }} className="text-2xl font-bold mb-8">
            {roleLabel} interview questions & answers
          </h2>
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
                  {i + 1}. {qa.question}
                </h3>
                <div className="px-6 py-5">
                  <p style={{ color: "#cbd5e1" }} className="leading-relaxed text-sm sm:text-base">{qa.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Practice CTA */}
        <div
          className="rounded-2xl p-6 mb-12"
          style={{
            background: "linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.08))",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <h2 style={{ color: "#ffffff" }} className="font-bold text-lg mb-2">Practice these questions out loud</h2>
          <p style={{ color: "#94a3b8" }} className="text-sm mb-4 leading-relaxed">
            Reading answers is the first step. Delivering them under pressure — with follow-up questions, time constraints,
            and a panel evaluating you — is where real prep happens. Preciprocal&apos;s AI mock interviews simulate that experience.
          </p>
          <a
            href={`${APP_URL}/sign-up`}
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#ffffff" }}
            className="inline-flex items-center gap-2 px-6 py-2.5 font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
          >
            Start practicing free →
          </a>
        </div>

        {/* Related roles */}
        {meta.relatedRoles.length > 0 && (
          <section className="mt-12 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 style={{ color: "#ffffff" }} className="text-xl font-bold mb-6">Related interview guides</h2>
            <div className="flex flex-wrap gap-3">
              {meta.relatedRoles.map((r) => (
                <Link
                  key={r}
                  href={`/interview-questions/${r}`}
                  style={{ color: "#cbd5e1", borderColor: "rgba(255,255,255,0.1)" }}
                  className="px-4 py-2 rounded-xl border text-sm hover:text-white transition-all"
                >
                  {r.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Interview Questions
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p style={{ color: "#475569" }} className="text-sm mb-4">Ready to turn preparation into offers?</p>
          <a
            href={`${APP_URL}/sign-up`}
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#ffffff" }}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Try Preciprocal free — no credit card required
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}