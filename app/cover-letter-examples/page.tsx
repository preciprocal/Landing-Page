/**
 * app/cover-letter-examples/page.tsx
 *
 * Hub page for all role-specific cover letter example guides.
 * Targets: "cover letter example [role]", "cover letter template [role]", "how to write a cover letter for [role]"
 *
 * File path: app/cover-letter-examples/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ALL_ROLES, ROLE_DISPLAY, ALL_ROLE_CATEGORIES, APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cover Letter Examples by Role — Templates That Actually Work",
  description:
    "Free cover letter examples and templates for 40+ roles. Real examples for software engineers, product managers, data scientists, marketing managers, and more — updated for 2026.",
  alternates: { canonical: "https://preciprocal.com/cover-letter-examples" },
  openGraph: {
    title: "Cover Letter Examples by Role — Preciprocal",
    description:
      "Free cover letter templates for every major career path. Real examples with breakdowns for 2026.",
    url: "https://preciprocal.com/cover-letter-examples",
    type: "website",
  },
};

export default function CoverLetterExamplesIndexPage() {
  const grouped = ALL_ROLE_CATEGORIES.map((cat) => ({
    category: cat,
    roles: ALL_ROLES.filter((r) => ROLE_DISPLAY[r]?.category === cat),
  })).filter((g) => g.roles.length > 0);

  return (
    <div className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Cover Letter Examples", url: "https://preciprocal.com/cover-letter-examples" },
        ]}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 page-main">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ color: "#64748b" }} className="text-sm mb-8 flex gap-2 items-center">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>Cover Letter Examples</span>
        </nav>

        {/* H1 */}
        <h1 style={{ color: "#ffffff" }} className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          Cover letter examples by role
        </h1>
        <p style={{ color: "#94a3b8" }} className="text-lg mb-3 max-w-2xl leading-relaxed">
          Real cover letter examples, annotated templates, and writing guides for every major role.
          Written to get past ATS and make hiring managers keep reading — updated for 2026.
        </p>
        <p style={{ color: "#475569" }} className="text-sm mb-12">
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
                {category} · {roles.length} example{roles.length !== 1 ? "s" : ""}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {roles.map((role) => {
                  const display = ROLE_DISPLAY[role];
                  if (!display) return null;
                  return (
                    <Link
                      key={role}
                      href={`/cover-letter-examples/${role}`}
                      className="group flex items-center gap-3 p-4 rounded-xl border transition-all"
                      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      <span className="text-xl flex-shrink-0">{display.icon}</span>
                      <div className="min-w-0">
                        <p style={{ color: "#e2e8f0" }} className="font-medium text-sm truncate group-hover:text-purple-300 transition-colors">
                          {display.name}
                        </p>
                        <p style={{ color: "#475569" }} className="text-[11px] mt-0.5">
                          Cover letter example →
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Cross-links */}
        <div className="mt-16 grid sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
            <h2 style={{ color: "#ffffff" }} className="font-semibold mb-2">Need resume tips too?</h2>
            <p style={{ color: "#94a3b8" }} className="text-sm mb-4">
              Role-specific resume guides with ATS keywords and bullet formulas.
            </p>
            <Link href="/resume-tips" style={{ color: "#818cf8" }} className="text-sm font-medium hover:text-indigo-300 transition-colors">
              Browse resume tips →
            </Link>
          </div>
          <div className="p-6 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
            <h2 style={{ color: "#ffffff" }} className="font-semibold mb-2">Practice your interview next</h2>
            <p style={{ color: "#94a3b8" }} className="text-sm mb-4">
              Role-specific Q&As, real interview questions, and AI mock interview practice.
            </p>
            <Link href="/interview-questions" style={{ color: "#818cf8" }} className="text-sm font-medium hover:text-indigo-300 transition-colors">
              Browse interview guides →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p style={{ color: "#475569" }} className="text-sm mb-4">
            Want a cover letter written for your specific job in 30 seconds?
          </p>
          <a
            href={`${APP_URL}/sign-up`}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Generate my cover letter free →
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}