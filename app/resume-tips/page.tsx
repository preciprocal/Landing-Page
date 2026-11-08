/**
 * app/resume-tips/page.tsx
 *
 * Hub page for all role-specific resume tip guides.
 * Targets: "resume tips for [role]", "how to write a [role] resume", "[role] resume guide"
 *
 * Layout: hero with a category jump row, then the role directory as one open
 * list per category, a compact "Also useful" links list, and a CTA panel.
 * Built on components/page/Layout.tsx.
 *
 * File path: app/resume-tips/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ALL_ROLES, ROLE_DISPLAY, ALL_ROLE_CATEGORIES } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, BTN_PRIMARY, PageHero, CtaPanel, pad2 } from "@/components/page/Layout";
import { Reveal } from "@/components/page/Reveal";
import ResumeTipsVisual from "@/components/page/visuals/ResumeTipsVisual";

export const metadata: Metadata = {
  title: "Resume Tips by Role: 41 Career Guides",
  description:
    "Role-specific resume guides for 40+ careers. ATS keywords, bullet point formulas, format tips, and real examples for software engineers, PMs, data scientists, and more.",
  alternates: { canonical: "https://preciprocal.com/resume-tips" },
  openGraph: {
    title: "Resume Tips by Role, Preciprocal",
    description:
      "Role-specific resume writing guides. ATS keywords, bullet formulas, and format tips for every career path.",
    url: "https://preciprocal.com/resume-tips",
    type: "website",
  },
};

/** Anchor id for a category band. */
const catId = (cat: string) => `cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

export default function ResumeTipsIndexPage() {
  const grouped = ALL_ROLE_CATEGORIES.map((cat) => ({
    category: cat,
    roles: ALL_ROLES.filter((r) => ROLE_DISPLAY[r]?.category === cat),
  })).filter((g) => g.roles.length > 0);

  return (
    <div data-accent="emerald" className="min-h-screen overflow-x-hidden bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Resume Tips", url: "https://preciprocal.com/resume-tips" },
        ]}
      />
      <Navbar />

      <main>
        {/* Hero: breadcrumb, H1, subhead, counts, category jump row */}
        <PageHero
          visual={<ResumeTipsVisual />}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Resume Tips" }]}
          title="Resume tips "
          accent="by role"
          subhead={
            <p>
              Role-specific resume guides with ATS keywords, bullet point formulas, format advice,
              and real before/after examples, updated for 2026.
            </p>
          }
          aside={
            <p className="text-sm text-slate-500">
              <span className="text-3xl font-bold tracking-tight text-white">{ALL_ROLES.length}</span> roles across{" "}
              <span className="text-3xl font-bold tracking-tight text-white">{ALL_ROLE_CATEGORIES.length}</span> industries
            </p>
          }
        >
          <nav aria-label="Jump to a category">
            <ul className="flex flex-wrap gap-2">
              {grouped.map(({ category, roles }) => (
                <li key={category}>
                  <a
                    href={`#${catId(category)}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[12px] text-slate-300 transition-colors hover:border-accent/40 hover:text-white focus-visible:border-accent focus-visible:outline-none"
                  >
                    {category}
                    <span className="font-mono text-[10px] text-slate-500">{pad2(roles.length)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PageHero>

        {/* Role directory: one open list per category */}
        <section className={`${PAD} pb-20`}>
          <div className={`${INNER} space-y-14 border-t border-white/[0.05] pt-16`}>
            {grouped.map(({ category, roles }) => (
              <section key={category} id={catId(category)} className="scroll-mt-24">
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
                          href={`/resume-tips/${role}`}
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
                  { href: "/cover-letter-examples", label: "Browse cover letter examples" },
                  { href: "/salary-guide", label: "Browse salary guides" },
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
        <section className={`pb-24 pt-4 ${PAD}`}>
          <Reveal>
            <CtaPanel
              title="Stop guessing why you're not hearing back."
              body={<p>Run your resume through our free ATS check and see what a screener sees, with the fixes that matter most first.</p>}
              action={
                <a href="/free-ats-checker" className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                  Check my resume free <Chevron />
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
