/**
 * app/cover-letter-examples/page.tsx
 *
 * Hub page for all role-specific cover letter example guides.
 * Targets: "cover letter example [role]", "cover letter template [role]", "how to write a cover letter for [role]"
 *
 * Layout: hero, then one row per category (sticky label on the left, a ruled
 * grid of role links on the right), cross-links, and a CTA panel.
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
import { PAD, INNER, SECTION, GRID_BG, BTN_PRIMARY, Eyebrow, PageHero, pad2, HoverRule } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem, SpotlightCard } from "@/components/page/Reveal";
import CoverLetterExamplesVisual from "@/components/page/visuals/CoverLetterExamplesVisual";

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
          visual={<CoverLetterExamplesVisual />}
          breadcrumb={
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-slate-500">
              <Link href="/" className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">Home</Link>
              <span aria-hidden="true">›</span>
              <span className="text-slate-300">Cover Letter Examples</span>
            </nav>
          }
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

        {/* Role directory, one row per category */}
        <section className={`${PAD} pb-20`}>
          <div className={`${INNER} divide-y divide-white/[0.06] border-y border-white/[0.06]`}>
            {grouped.map(({ category, roles }) => (
              <section key={category} className="grid gap-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-16">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {category} · {roles.length} example{roles.length !== 1 ? "s" : ""}
                  </h2>
                </div>
                <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 xl:grid-cols-3">
                  {roles.map((role) => {
                    const display = ROLE_DISPLAY[role];
                    if (!display) return null;
                    return (
                      <RevealItem key={role} className="bg-[#070b16]">
                        <Link
                          href={`/cover-letter-examples/${role}`}
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
                              Cover letter example <Chevron />
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
            <Eyebrow>Next steps</Eyebrow>
            <RevealGroup className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2">
              {[
                {
                  title: "Need resume tips too?",
                  body: "Role-specific resume guides with ATS keywords and bullet formulas.",
                  href: "/resume-tips",
                  link: "Browse resume tips",
                },
                {
                  title: "Practice your interview next",
                  body: "Role-specific Q&As, real interview questions, and AI mock interview practice.",
                  href: "/interview-questions",
                  link: "Browse interview guides",
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
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-1/2 h-[320px] w-[520px] -translate-y-1/2 rounded-full bg-accent-deep/15 blur-[110px]" />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <p className="max-w-2xl text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
                  Want a cover letter written for your specific job in 30 seconds?
                </p>
                <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full shrink-0 sm:w-auto`}>
                  Generate my cover letter free <Chevron />
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
