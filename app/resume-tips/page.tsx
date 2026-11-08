/**
 * app/resume-tips/page.tsx
 *
 * Hub page for all role-specific resume tip guides.
 * Targets: "resume tips for [role]", "how to write a [role] resume", "[role] resume guide"
 *
 * Layout: hero with a category jump row, then one full-width band per
 * category (heading left, role cards right), cross-links, and a CTA panel.
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
import { PAD, INNER, SECTION, BTN_PRIMARY, Eyebrow, PageHero, CtaPanel, pad2, HoverRule } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem, SpotlightCard } from "@/components/page/Reveal";
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

        {/* Role grid by category */}
        {grouped.map(({ category, roles }, gi) => (
          <section key={category} id={catId(category)} className={`${SECTION} scroll-mt-20 ${PAD}`}>
            <div className={`${INNER} grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-16`}>
              <Reveal className="lg:sticky lg:top-28 lg:self-start">
                <span aria-hidden="true" className="font-mono text-[11px] text-accent-soft/70">{pad2(gi + 1)}</span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
                  {category}
                  <span className="mt-1 block text-sm font-normal tracking-normal text-slate-500">
                    {" "}· {roles.length} guide{roles.length !== 1 ? "s" : ""}
                  </span>
                </h2>
              </Reveal>
              <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {roles.map((role) => {
                  const display = ROLE_DISPLAY[role];
                  if (!display) return null;
                  return (
                    <RevealItem key={role}>
                      <Link
                        href={`/resume-tips/${role}`}
                        className="group relative flex h-full items-center gap-4 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/[0.045] focus-visible:border-accent focus-visible:outline-none"
                      >
                        <span
                          aria-hidden="true"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-[#070b16] text-lg"
                        >
                          {display.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-slate-200 transition-colors group-hover:text-white">
                            {display.name}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-500 transition-colors group-hover:text-accent-soft">
                            Resume tips <Chevron />
                          </p>
                        </div>
                        <HoverRule className="inset-x-4" />
                      </Link>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </section>
        ))}

        {/* Cross-links */}
        <section className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Eyebrow>Keep going</Eyebrow>
            <RevealGroup className="mt-4 grid gap-4 md:grid-cols-2">
              <RevealItem>
                <SpotlightCard className="h-full rounded-2xl border border-white/[0.07] bg-[#070b16] p-7">
                  <h2 className="mb-2 text-lg font-semibold text-white">Need a cover letter too?</h2>
                  <p className="mb-5 text-sm leading-relaxed text-slate-400">
                    Role-specific cover letter examples and templates for every career path.
                  </p>
                  <Link href="/cover-letter-examples" className="group inline-flex items-center gap-1 text-sm font-medium text-accent-soft transition-colors hover:text-white">
                    Browse cover letter examples <Chevron />
                  </Link>
                </SpotlightCard>
              </RevealItem>
              <RevealItem>
                <SpotlightCard className="h-full rounded-2xl border border-white/[0.07] bg-[#070b16] p-7">
                  <h2 className="mb-2 text-lg font-semibold text-white">Check your salary range</h2>
                  <p className="mb-5 text-sm leading-relaxed text-slate-400">
                    Up-to-date salary data, equity benchmarks, and negotiation tips by role.
                  </p>
                  <Link href="/salary-guide" className="group inline-flex items-center gap-1 text-sm font-medium text-accent-soft transition-colors hover:text-white">
                    Browse salary guides <Chevron />
                  </Link>
                </SpotlightCard>
              </RevealItem>
            </RevealGroup>
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
