/**
 * app/salary-guide/page.tsx
 *
 * Hub page for all role-specific salary guides.
 * Targets: "software engineer salary 2026", "product manager salary guide", etc.
 *
 * Layout: hero, then the role directory as one open list per category, a
 * compact "Also useful" links list, and a CTA panel.
 *
 * File path: app/salary-guide/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ALL_ROLES, ROLE_DISPLAY, ALL_ROLE_CATEGORIES, APP_URL } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, BTN_PRIMARY, PageHero, CtaPanel } from "@/components/page/Layout";
import { Reveal } from "@/components/page/Reveal";
import SalaryGuideVisual from "@/components/page/visuals/SalaryGuideVisual";

export const metadata: Metadata = {
  title: "Salary Guide by Role: 2026 Data & Negotiation",
  description:
    "Up-to-date 2026 salary data for 40+ roles. Base salary ranges, equity benchmarks, total compensation breakdowns, and negotiation scripts for software engineers, PMs, data scientists, and more.",
  alternates: { canonical: "https://preciprocal.com/salary-guide" },
  openGraph: {
    title: "Salary Guide by Role, Preciprocal 2026",
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
    <div data-accent="amber" className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Salary Guide", url: "https://preciprocal.com/salary-guide" },
        ]}
      />
      <Navbar />

      <main>
        <PageHero
          visual={<SalaryGuideVisual />}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Salary Guide" }]}
          title="2026 salary guide by role"
          subhead={
            <p>
              Real salary data, equity benchmarks, total compensation breakdowns, and proven negotiation scripts
              for every major career path, updated for 2026.
            </p>
          }
          aside={
            <p className="font-mono text-[13px] tabular-nums text-slate-500">
              {ALL_ROLES.length} roles across {ALL_ROLE_CATEGORIES.length} industries
            </p>
          }
        />

        {/* Role directory: one open list per category */}
        <section className={`${PAD} pb-20`}>
          <div className={`${INNER} space-y-14 border-t border-white/[0.05] pt-16`}>
            {grouped.map(({ category, roles }) => (
              <section key={category}>
                <h2 className="mb-3 flex items-baseline gap-3 text-lg font-semibold tracking-tight text-white">
                  {category}
                  <span className="text-sm font-normal text-slate-500">
                    {roles.length} guide{roles.length !== 1 ? "s" : ""}
                  </span>
                </h2>
                <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {roles.map((role) => {
                    const display = ROLE_DISPLAY[role];
                    if (!display) return null;
                    return (
                      <li key={role} className="border-b border-white/[0.05]">
                        <Link
                          href={`/salary-guide/${role}`}
                          className="group flex items-center gap-3 py-3 text-[15px] text-slate-300 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                        >
                          <span aria-hidden="true" className="text-base">{display.icon}</span>
                          <span className="min-w-0 flex-1 truncate">{display.name}</span>
                          <Chevron className="text-slate-600 group-hover:text-slate-300" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}

            <nav aria-label="Related guides" className="pt-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Also useful</p>
              <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[
                  { href: "/interview-questions", label: "Browse interview guides" },
                  { href: "/resume-tips", label: "Browse resume tips" },
                ].map((link) => (
                  <li key={link.href} className="border-b border-white/[0.05]">
                    <Link href={link.href} className="group flex items-center justify-between gap-3 py-3 text-sm text-slate-400 transition-colors hover:text-white">
                      {link.label}
                      <Chevron className="text-slate-600 group-hover:text-slate-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* CTA */}
        <section className={`${PAD} pb-24 pt-4`}>
          <Reveal>
            <CtaPanel
              title="Once you know your number, let us help you get the interview that leads to it."
              action={
                <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                  Start preparing free <Chevron />
                </a>
              }
            />
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
