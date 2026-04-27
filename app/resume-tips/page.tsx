/**
 * app/resume-tips/page.tsx
 *
 * Hub page for all role-specific resume tip guides.
 * Targets: "resume tips for [role]", "how to write a [role] resume", "[role] resume guide"
 *
 * File path: app/resume-tips/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ALL_ROLES, ROLE_DISPLAY, ALL_ROLE_CATEGORIES, APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resume Tips by Role — Write a Resume That Gets Interviews",
  description:
    "Role-specific resume guides for 40+ careers. ATS keywords, bullet point formulas, format tips, and real examples for software engineers, PMs, data scientists, and more.",
  alternates: { canonical: "https://preciprocal.com/resume-tips" },
  openGraph: {
    title: "Resume Tips by Role — Preciprocal",
    description:
      "Role-specific resume writing guides. ATS keywords, bullet formulas, and format tips for every career path.",
    url: "https://preciprocal.com/resume-tips",
    type: "website",
  },
};

export default function ResumeTipsIndexPage() {
  const grouped = ALL_ROLE_CATEGORIES.map((cat) => ({
    category: cat,
    roles: ALL_ROLES.filter((r) => ROLE_DISPLAY[r]?.category === cat),
  })).filter((g) => g.roles.length > 0);

  return (
    <div className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Resume Tips", url: "https://preciprocal.com/resume-tips" },
        ]}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 page-main">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ color: "#64748b" }} className="text-sm mb-8 flex gap-2 items-center">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>Resume Tips</span>
        </nav>

        {/* H1 */}
        <h1 style={{ color: "#ffffff" }} className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          Resume tips by role
        </h1>
        <p style={{ color: "#94a3b8" }} className="text-lg mb-3 max-w-2xl leading-relaxed">
          Role-specific resume guides with ATS keywords, bullet point formulas, format advice,
          and real before/after examples — updated for 2026.
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
                {category} · {roles.length} guide{roles.length !== 1 ? "s" : ""}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {roles.map((role) => {
                  const display = ROLE_DISPLAY[role];
                  if (!display) return null;
                  return (
                    <Link
                      key={role}
                      href={`/resume-tips/${role}`}
                      className="group flex items-center gap-3 p-4 rounded-xl border transition-all"
                      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      <span className="text-xl flex-shrink-0">{display.icon}</span>
                      <div className="min-w-0">
                        <p style={{ color: "#e2e8f0" }} className="font-medium text-sm truncate group-hover:text-indigo-300 transition-colors">
                          {display.name}
                        </p>
                        <p style={{ color: "#475569" }} className="text-[11px] mt-0.5">
                          Resume tips →
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
            <h2 style={{ color: "#ffffff" }} className="font-semibold mb-2">Need a cover letter too?</h2>
            <p style={{ color: "#94a3b8" }} className="text-sm mb-4">
              Role-specific cover letter examples and templates for every career path.
            </p>
            <Link href="/cover-letter-examples" style={{ color: "#818cf8" }} className="text-sm font-medium hover:text-indigo-300 transition-colors">
              Browse cover letter examples →
            </Link>
          </div>
          <div className="p-6 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
            <h2 style={{ color: "#ffffff" }} className="font-semibold mb-2">Check your salary range</h2>
            <p style={{ color: "#94a3b8" }} className="text-sm mb-4">
              Up-to-date salary data, equity benchmarks, and negotiation tips by role.
            </p>
            <Link href="/salary-guide" style={{ color: "#818cf8" }} className="text-sm font-medium hover:text-indigo-300 transition-colors">
              Browse salary guides →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p style={{ color: "#475569" }} className="text-sm mb-4">
            Want your resume scored against real ATS systems right now?
          </p>
          <a
            href={`${APP_URL}/sign-up`}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Get your free ATS score — no credit card required
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}