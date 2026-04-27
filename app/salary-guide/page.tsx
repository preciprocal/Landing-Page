/**
 * app/salary-guide/page.tsx
 *
 * Hub page for all role-specific salary guides.
 * Targets: "software engineer salary 2026", "product manager salary guide", etc.
 *
 * File path: app/salary-guide/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ALL_ROLES, ROLE_DISPLAY, ALL_ROLE_CATEGORIES, APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Salary Guide by Role — 2026 Salary Data & Negotiation Tips",
  description:
    "Up-to-date 2026 salary data for 40+ roles. Base salary ranges, equity benchmarks, total compensation breakdowns, and negotiation scripts for software engineers, PMs, data scientists, and more.",
  alternates: { canonical: "https://preciprocal.com/salary-guide" },
  openGraph: {
    title: "Salary Guide by Role — Preciprocal 2026",
    description:
      "2026 salary ranges, equity benchmarks, and negotiation tips for every major role.",
    url: "https://preciprocal.com/salary-guide",
    type: "website",
  },
};

export default function SalaryGuideIndexPage() {
  const grouped = ALL_ROLE_CATEGORIES.map((cat) => ({
    category: cat,
    roles: ALL_ROLES.filter((r) => ROLE_DISPLAY[r]?.category === cat),
  })).filter((g) => g.roles.length > 0);

  return (
    <div className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Salary Guide", url: "https://preciprocal.com/salary-guide" },
        ]}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 page-main">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ color: "#64748b" }} className="text-sm mb-8 flex gap-2 items-center">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>Salary Guide</span>
        </nav>

        {/* H1 */}
        <h1 style={{ color: "#ffffff" }} className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          2026 salary guide by role
        </h1>
        <p style={{ color: "#94a3b8" }} className="text-lg mb-3 max-w-2xl leading-relaxed">
          Real salary data, equity benchmarks, total compensation breakdowns, and proven negotiation scripts
          for every major career path — updated for 2026.
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
                      href={`/salary-guide/${role}`}
                      className="group flex items-center gap-3 p-4 rounded-xl border transition-all"
                      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      <span className="text-xl flex-shrink-0">{display.icon}</span>
                      <div className="min-w-0">
                        <p style={{ color: "#e2e8f0" }} className="font-medium text-sm truncate group-hover:text-emerald-300 transition-colors">
                          {display.name}
                        </p>
                        <p style={{ color: "#475569" }} className="text-[11px] mt-0.5">
                          2026 salary data →
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
            <h2 style={{ color: "#ffffff" }} className="font-semibold mb-2">Prepare for the interview first</h2>
            <p style={{ color: "#94a3b8" }} className="text-sm mb-4">
              You need to get the offer before you can negotiate it. Role-specific interview prep guides.
            </p>
            <Link href="/interview-questions" style={{ color: "#818cf8" }} className="text-sm font-medium hover:text-indigo-300 transition-colors">
              Browse interview guides →
            </Link>
          </div>
          <div className="p-6 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
            <h2 style={{ color: "#ffffff" }} className="font-semibold mb-2">Get your resume past ATS first</h2>
            <p style={{ color: "#94a3b8" }} className="text-sm mb-4">
              Role-specific resume guides with ATS keywords, bullet formulas, and format tips.
            </p>
            <Link href="/resume-tips" style={{ color: "#818cf8" }} className="text-sm font-medium hover:text-indigo-300 transition-colors">
              Browse resume tips →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p style={{ color: "#475569" }} className="text-sm mb-4">
            Once you know your number — let us help you get the interview that leads to it.
          </p>
          <a
            href={`${APP_URL}/sign-up`}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Start preparing free →
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}