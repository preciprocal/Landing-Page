/**
 * app/interview-prep/page.tsx
 *
 * Hub/index page for all company-specific interview prep guides.
 * Targets: "interview prep by company", "how to prepare for [company] interview"
 *
 * Layout: PageHero, then the companies grouped by tier as ruled grids beside
 * a sticky tier index and difficulty legend on wide screens.
 *
 * File path: app/interview-prep/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ALL_COMPANIES, COMPANY_META, APP_URL } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, GRID_BG, BTN_PRIMARY, Eyebrow, PageHero, pad2, HoverRule } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";
import InterviewPrepVisual from "@/components/page/visuals/InterviewPrepVisual";

export const metadata: Metadata = {
  title: "Company Interview Prep: 56 Employers",
  description: "Free interview prep guides for 56 top employers across tech, investment banking, consulting, healthcare and retail. Google, Amazon, Goldman Sachs, McKinsey, Citadel, Mayo Clinic and more, with process breakdowns, difficulty ratings and culture tips.",
  alternates: { canonical: "https://preciprocal.com/interview-prep" },
  openGraph: {
    title: "Company Interview Prep Guides 2026: Preciprocal",
    description: "How to prepare for Google, Amazon, Goldman Sachs, McKinsey, Stripe, Mayo Clinic and 50 more top employers. Process breakdown, culture tips, and real Q&As.",
    url: "https://preciprocal.com/interview-prep",
    type: "website",
  },
};

/**
 * Company display data is derived from COMPANY_META rather than duplicated here.
 * This page previously kept its own hardcoded list of 20 companies, which meant
 * adding a company required editing two files and silently dropped it from this
 * hub if you forgot the second one.
 */
const COMPANY_DISPLAY: Record<string, { name: string; difficulty: string; tier: string }> =
  Object.fromEntries(
    ALL_COMPANIES.map((slug) => {
      const meta = COMPANY_META[slug];
      return [slug, { name: meta.displayName, difficulty: meta.difficulty, tier: meta.tier }];
    })
  );

// Display order for the tier groupings. Any tier present in COMPANY_META but
// missing here would not render, so the list is derived and then sorted rather
// than hardcoded.
const TIER_ORDER = [
  "FAANG",
  "AI Labs",
  "Top Tier",
  "Unicorn",
  "Enterprise",
  "Investment Banking",
  "Quant & Trading",
  "Consulting",
  "Professional Services",
  "Financial Services",
  "Healthcare",
  "Consumer & Retail",
];

const TIERS = [...new Set(ALL_COMPANIES.map((c) => COMPANY_META[c].tier))].sort(
  (a, b) => TIER_ORDER.indexOf(a) - TIER_ORDER.indexOf(b)
);

const DIFFICULTY_COLOR: Record<string, string> = {
  "Medium":           "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Hard":             "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Very Hard":        "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "Extremely Hard":   "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

/** Anchor id for a tier section, e.g. "Quant & Trading" to "tier-quant-trading". */
const tierId = (tier: string) => `tier-${tier.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export default function InterviewPrepIndexPage() {
  const grouped = TIERS.map((tier) => ({
    tier,
    companies: ALL_COMPANIES.filter((c) => COMPANY_DISPLAY[c]?.tier === tier),
  })).filter((g) => g.companies.length > 0);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Interview Prep", url: "https://preciprocal.com/interview-prep" },
        ]}
      />

      <div data-accent="rose" className="min-h-screen bg-[#050810]">
        <Navbar />

        <main>
          <PageHero
            visual={<InterviewPrepVisual />}
            breadcrumb={
              <nav aria-label="Breadcrumb" className="flex items-center gap-2">
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
                <span aria-hidden="true">›</span>
                <span className="text-slate-300">Interview Prep</span>
              </nav>
            }
            title={"Company interview "}
            accent="prep guides"
            subhead={
              <p>
                In-depth prep guides for 56 top employers across tech, banking, consulting, healthcare
                and retail, covering interview process, culture, difficulty, and what gets you the offer.
              </p>
            }
          />

          {/* Company grid by tier, with a sticky tier index on wide screens */}
          <section className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
            <div className={`${INNER} grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] xl:gap-20`}>
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <nav aria-label="Jump to a sector" className="hidden lg:block">
                  <ul className="space-y-0.5 border-l border-white/[0.07]">
                    {grouped.map(({ tier, companies }) => (
                      <li key={tier}>
                        <a
                          href={`#${tierId(tier)}`}
                          className="-ml-px flex items-center justify-between gap-3 border-l border-transparent py-1.5 pl-4 text-[13px] text-slate-400 transition-colors hover:border-accent hover:text-white focus-visible:border-accent focus-visible:text-white focus-visible:outline-none"
                        >
                          {tier}
                          <span className="font-mono text-[11px] text-slate-600">{pad2(companies.length)}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Difficulty legend */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] lg:mt-10 lg:flex-col lg:items-start">
                  <span className="mr-2 text-slate-600 lg:mb-1">Difficulty:</span>
                  {Object.entries(DIFFICULTY_COLOR).map(([label, cls]) => (
                    <span key={label} className={`rounded-full border px-2 py-1 ${cls}`}>{label}</span>
                  ))}
                </div>
              </aside>

              <div className="min-w-0 space-y-16">
                {grouped.map(({ tier, companies }) => (
                  <section key={tier} id={tierId(tier)} className="scroll-mt-28">
                    <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3">
                      <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">{tier}</h2>
                      <span className="font-mono text-[11px] text-slate-600">{pad2(companies.length)}</span>
                    </div>
                    <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 xl:grid-cols-3">
                      {companies.map((company, i) => {
                        const display = COMPANY_DISPLAY[company];
                        if (!display) return null;
                        const diffClass = DIFFICULTY_COLOR[display.difficulty] ?? DIFFICULTY_COLOR["Hard"];
                        return (
                          <RevealItem key={company} className="bg-[#070b16]">
                            <Link
                              href={`/interview-prep/${company}`}
                              className="group relative flex h-full items-center justify-between gap-4 p-5 transition-colors duration-300 hover:bg-[#0a1020] focus-visible:bg-[#0a1020] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent/60"
                            >
                              <div className="flex min-w-0 items-start gap-4">
                                <span className="mt-0.5 font-mono text-[11px] text-accent-soft/60">{pad2(i + 1)}</span>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-white transition-colors group-hover:text-accent-soft">
                                    {display.name}
                                  </p>
                                  <p className="mt-0.5 text-[11px] text-slate-600 transition-colors group-hover:text-slate-400">Prep guide <Chevron /></p>
                                </div>
                              </div>
                              <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-semibold ${diffClass}`}>
                                {display.difficulty}
                              </span>
                              <HoverRule className="inset-x-5" />
                            </Link>
                          </RevealItem>
                        );
                      })}
                    </RevealGroup>
                  </section>
                ))}
              </div>
            </div>
          </section>

          {/* Role questions cross-link */}
          <section className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
            <Reveal className={INNER}>
              <div className="grid gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="max-w-2xl">
                  <Eyebrow>By role</Eyebrow>
                  <h2 className="mb-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">Looking for role-specific questions?</h2>
                  <p className="text-sm leading-relaxed text-slate-400">
                    We also have detailed Q&A guides for 20+ roles, including software engineer, PM, data scientist, and more.
                  </p>
                </div>
                <Link
                  href="/interview-questions"
                  className="group inline-flex items-center gap-1 text-sm font-medium text-accent-soft transition-colors hover:text-white"
                >
                  Browse role interview guides <Chevron />
                </Link>
              </div>
            </Reveal>
          </section>

          {/* CTA */}
          <section className={`pb-24 ${PAD}`}>
            <Reveal className={`${INNER} relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070b16] px-8 py-12 sm:px-14`}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_100%_50%,black,transparent)]"
                style={GRID_BG}
              />
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-1/2 h-[320px] w-[520px] -translate-y-1/2 rounded-full bg-accent-deep/15 blur-[110px]" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <p className="max-w-xl text-lg leading-relaxed text-slate-300">
                  Practice with an AI that mimics each company&apos;s actual interview style.
                </p>
                <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                  Start practicing free, no credit card required <Chevron />
                </a>
              </div>
            </Reveal>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
