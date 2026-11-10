/**
 * app/cover-letter-examples/page.tsx
 *
 * Hub page for all role-specific cover letter example guides.
 * Targets: "cover letter example [role]", "cover letter template [role]", "how to write a cover letter for [role]"
 *
 * Layout: hero, then the role directory as one open list per category, a
 * compact "Also useful" links list, and a CTA panel.
 *
 * File path: app/cover-letter-examples/page.tsx
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

export const metadata: Metadata = {
  title: "Cover Letter Examples by Role: 41 Templates",
  description:
    "Free cover letter examples and templates for 40+ roles. Real examples for software engineers, product managers, data scientists, marketing managers, and more, updated for 2026.",
  alternates: { canonical: "https://preciprocal.com/cover-letter-examples" },
  openGraph: {
    title: "Cover Letter Examples by Role, Preciprocal",
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
    <div data-accent="blue" className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Cover Letter Examples", url: "https://preciprocal.com/cover-letter-examples" },
        ]}
      />
      <Navbar />

      <main>
        <PageHero
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Cover Letter Examples" }]}
          title="Cover letter examples by role"
          subhead={
            <p>
              Real cover letter examples, annotated templates, and writing guides for every major role.
              Written to get past ATS and make hiring managers keep reading, updated for 2026.
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
                    {roles.length} example{roles.length !== 1 ? "s" : ""}
                  </span>
                </h2>
                <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {roles.map((role) => {
                    const display = ROLE_DISPLAY[role];
                    if (!display) return null;
                    return (
                      <li key={role} className="border-b border-white/[0.05]">
                        <Link
                          href={`/cover-letter-examples/${role}`}
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
                  { href: "/resume-tips", label: "Browse resume tips" },
                  { href: "/interview-questions", label: "Browse interview guides" },
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
              title="Want a cover letter written for your specific job in 30 seconds?"
              action={
                <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                  Generate my cover letter free <Chevron />
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
