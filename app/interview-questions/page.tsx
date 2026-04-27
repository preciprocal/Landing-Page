/**
 * app/interview-questions/page.tsx
 *
 * Hub page for all role-based interview question guides.
 * ALL_ROLES, ROLE_DISPLAY, and ALL_ROLE_CATEGORIES come from lib/constants.ts.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ALL_ROLES, ROLE_DISPLAY, ALL_ROLE_CATEGORIES, APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Interview Questions by Role — Prep Guides for Every Career",
  description:
    "Free interview question guides for 40+ roles across tech, finance, consulting, marketing, HR, healthcare, legal, and more. Real Q&As, salary data, and preparation tips.",
  alternates: { canonical: "https://preciprocal.com/interview-questions" },
  openGraph: {
    title: "Interview Questions by Role — Preciprocal",
    description: "Free Q&A guides for every major role. Real questions, detailed answers, salary ranges.",
    url: "https://preciprocal.com/interview-questions",
    type: "website",
  },
};

export default function InterviewQuestionsIndexPage() {
  const grouped = ALL_ROLE_CATEGORIES.map((cat) => ({
    category: cat,
    roles: ALL_ROLES.filter((r) => ROLE_DISPLAY[r]?.category === cat),
  })).filter((g) => g.roles.length > 0);

  return (
    <div className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Interview Questions", url: "https://preciprocal.com/interview-questions" },
        ]}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ color: "#64748b" }} className="text-sm mb-8 flex gap-2 items-center">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>Interview Questions</span>
        </nav>

        {/* H1 */}
        <h1 style={{ color: "#ffffff" }} className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          Interview questions by role
        </h1>
        <p style={{ color: "#94a3b8" }} className="text-lg mb-3 max-w-2xl leading-relaxed">
          Real interview questions, detailed answers, salary benchmarks, and preparation tips
          for every major career path — updated for 2026.
        </p>
        <p style={{ color: "#64748b" }} className="text-sm mb-12">
          {ALL_ROLES.length} roles across {ALL_ROLE_CATEGORIES.length} industries
        </p>

        {/* Role grid by category */}
        <div className="space-y-12">
          {grouped.map(({ category, roles }) => (
            <section key={category}>
              <h2
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.75rem" }}
              >
                {category} · {roles.length} guide{roles.length !== 1 ? "s" : ""}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {roles.map((role) => {
                  const display = ROLE_DISPLAY[role];
                  if (!display) return null;
                  return (
                    <Link
                      key={role}
                      href={`/interview-questions/${role}`}
                      className="group flex items-center gap-3 p-4 rounded-xl border transition-all"
                      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      <span className="text-xl flex-shrink-0">{display.icon}</span>
                      <div className="min-w-0">
                        <p style={{ color: "#e2e8f0" }} className="font-medium text-sm truncate group-hover:text-indigo-300 transition-colors">
                          {display.name}
                        </p>
                        <p style={{ color: "#475569" }} className="text-[11px] mt-0.5">
                          Interview questions →
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Company prep cross-link */}
        <div className="mt-16 p-6 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
          <h2 style={{ color: "#ffffff" }} className="font-semibold mb-2">Preparing for a specific company?</h2>
          <p style={{ color: "#94a3b8" }} className="text-sm mb-4">
            We also have company-specific prep guides covering the interview process, culture, difficulty, and what each company actually looks for.
          </p>
          <Link href="/interview-prep" style={{ color: "#818cf8" }} className="text-sm font-medium hover:text-indigo-300 transition-colors">
            Browse company interview guides →
          </Link>
        </div>

        {/* Practice CTA */}
        <div className="mt-8 text-center">
          <p style={{ color: "#475569" }} className="text-sm mb-4">
            Reading questions is step one. Answering them under pressure is where real prep happens.
          </p>
          <a
            href={`${APP_URL}/sign-up`}
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#ffffff" }}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Practice with AI mock interviews — free
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}