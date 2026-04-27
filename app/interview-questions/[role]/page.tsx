/**
 * app/interview-questions/[role]/page.tsx
 *
 * All data (ROLE_META, ROLE_QUESTIONS, ALL_ROLES) lives in lib/constants.ts.
 * This file is pure rendering logic only.
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
            { label: "Avg. salary",       value: meta.salaryRange },
            { label: "Top companies",     value: meta.topCompanies.slice(0, 3).join(", ") },
            { label: "Questions covered", value: `${questions.length}+ Q&As` },
          ].map((s) => (
            <div key={s.label} className="rounded-xl px-4 py-3 border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div style={{ color: "#475569" }} className="text-xs mb-0.5">{s.label}</div>
              <div style={{ color: "#ffffff" }} className="font-semibold text-sm">{s.value}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-6 mb-12" style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.08))", border: "1px solid rgba(99,102,241,0.2)" }}>
          <h2 style={{ color: "#ffffff" }} className="font-bold text-lg mb-2">Practice these questions with AI mock interviews</h2>
          <p style={{ color: "#94a3b8" }} className="text-sm mb-4">Reading answers is good. Being grilled by an AI interviewer that follows up, pushes back, and scores your response is 10× better.</p>
          <a href={`${APP_URL}/sign-up`} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#ffffff" }} className="inline-flex items-center gap-2 px-6 py-2.5 font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity">
            Start practicing free →
          </a>
        </div>

        {/* Q&A */}
        <h2 style={{ color: "#ffffff" }} className="text-2xl font-bold mb-8">
          Top {questions.length} {roleLabel} Interview Questions
        </h2>
        <div className="space-y-6">
          {questions.map((qa, i) => (
            <article key={i} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 style={{ color: "#ffffff" }} className="font-semibold text-base px-6 py-4 border-b" style2={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.04)" }}>
                Q{i + 1}. {qa.question}
              </h3>
              <div className="px-6 py-5">
                <p style={{ color: "#cbd5e1" }} className="leading-relaxed text-sm sm:text-base">{qa.answer}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Related roles */}
        {meta.relatedRoles.length > 0 && (
          <section className="mt-16 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 style={{ color: "#ffffff" }} className="text-xl font-bold mb-6">Related interview guides</h2>
            <div className="flex flex-wrap gap-3">
              {meta.relatedRoles.map((r) => (
                <Link key={r} href={`/interview-questions/${r}`} style={{ color: "#cbd5e1", borderColor: "rgba(255,255,255,0.1)" }} className="px-4 py-2 rounded-xl border text-sm hover:text-white transition-all">
                  {r.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Interview Questions
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p style={{ color: "#475569" }} className="text-sm mb-4">Ready to turn preparation into offers?</p>
          <a href={`${APP_URL}/sign-up`} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#ffffff" }} className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Try Preciprocal free — no credit card required
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
