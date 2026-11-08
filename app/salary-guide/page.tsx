/**
 * app/salary-guide/page.tsx
 *
 * Hub page for all role-specific salary guides.
 * Targets: "software engineer salary 2026", "product manager salary guide", etc.
 *
 * Layout: hero, then one row per category (sticky label on the left, a ruled
 * grid of role links on the right), cross-links, and a CTA panel.
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
import { PAD, INNER, SECTION, GRID_BG, BTN_PRIMARY, Eyebrow, PageHero, pad2, HoverRule } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem, SpotlightCard } from "@/components/page/Reveal";
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

        {/* Role directory, one row per category */}
        <section className={`${PAD} pb-20`}>
          <div className={`${INNER} divide-y divide-white/[0.06] border-y border-white/[0.06]`}>
            {grouped.map(({ category, roles }) => (
              <section key={category} className="grid gap-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-16">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {category} · {roles.length} guide{roles.length !== 1 ? "s" : ""}
                  </h2>
                </div>
                <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 xl:grid-cols-3 fill-sm-2 fill-xl-3">
                  {roles.map((role) => {
                    const display = ROLE_DISPLAY[role];
                    if (!display) return null;
                    return (
                      <RevealItem key={role} className="bg-[#070b16]">
                        <Link
                          href={`/salary-guide/${role}`}
                          className="group relative flex h-full items-center gap-4 p-5 transition-colors duration-300 hover:bg-[#0a1020] focus-visible:bg-[#0a1020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/60"
                        >
                          <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-xl">
                            {display.icon}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-200 transition-colors group-hover:text-accent-soft">
                              {display.name}
                            </p>
                            <p className="mt-0.5 text-[11px] text-slate-500">
                              2026 salary data <Chevron />
                            </p>
                          </div>
                          <HoverRule className="inset-x-5" />
                        </Link>
                      </RevealItem>
                    );
                  })}
                </RevealGroup>
              </section>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <section className={`${PAD} ${SECTION}`}>
          <div className={INNER}>
            <Eyebrow>Before the offer</Eyebrow>
            <RevealGroup className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 fill-md-2">
              {[
                {
                  title: "Prepare for the interview first",
                  body: "You need to get the offer before you can negotiate it. Role-specific interview prep guides.",
                  href: "/interview-questions",
                  link: "Browse interview guides",
                },
                {
                  title: "Get your resume past ATS first",
                  body: "Role-specific resume guides with ATS keywords, bullet formulas, and format tips.",
                  href: "/resume-tips",
                  link: "Browse resume tips",
                },
              ].map((c, i) => (
                <RevealItem key={c.href} className="bg-[#070b16]">
                  <SpotlightCard className="h-full p-8">
                    <span className="font-mono text-[11px] text-accent-soft/70">{pad2(i + 1)}</span>
                    <h2 className="mt-4 text-lg font-semibold text-white">{c.title}</h2>
                    <p className="mb-5 mt-2 max-w-md text-sm leading-relaxed text-slate-400">{c.body}</p>
                    <Link href={c.href} className="group inline-flex items-center gap-1 rounded text-sm font-medium text-accent-soft transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
                      {c.link} <Chevron />
                    </Link>
                  </SpotlightCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* CTA */}
        <section className={`${PAD} pb-24 pt-4`}>
          <Reveal>
            <div className={`${INNER} relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070b16] px-8 py-14 sm:px-14`}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_100%_50%,black,transparent)]"
                style={GRID_BG}
              />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <p className="max-w-2xl text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
                  Once you know your number, let us help you get the interview that leads to it.
                </p>
                <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full shrink-0 sm:w-auto`}>
                  Start preparing free <Chevron />
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
