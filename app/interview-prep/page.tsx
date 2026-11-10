/**
 * app/interview-prep/page.tsx
 *
 * Hub/index page for all company-specific interview prep guides.
 * Targets: "interview prep by company", "how to prepare for [company] interview"
 *
 * Layout: PageHero with a jump list of sectors, then the companies grouped by
 * tier as full-width ruled grids (difficulty legend above), the role guides
 * cross-link, and the CTA panel.
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
import { PAD, INNER, CARD_SOLID, BTN_PRIMARY, PageHero, CtaPanel, pad2 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

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
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Interview Prep" }]}
            title={"Company interview "}
            accent="prep guides"
            subhead={
              <p>
                In-depth prep guides for 56 top employers across tech, banking, consulting, healthcare
                and retail, covering interview process, culture, difficulty, and what gets you the offer.
              </p>
            }
          >
            {/* Jump list of sectors */}
            <nav aria-label="Jump to a sector" className="flex flex-wrap gap-2">
              {grouped.map(({ tier, companies }) => (
                <a
                  key={tier}
                  href={`#${tierId(tier)}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-slate-300 transition-colors hover:border-accent/40 hover:text-white focus-visible:border-accent focus-visible:text-white focus-visible:outline-none"
                >
                  {tier}
                  <span className="font-mono text-[11px] text-slate-500 group-hover:text-accent-soft">{pad2(companies.length)}</span>
                </a>
              ))}
            </nav>
          </PageHero>

          {/* Companies by sector, one full-width grid each */}
          <section className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
            <div className={`${INNER} space-y-14`}>
              {/* Difficulty legend */}
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="mr-2 text-slate-500">Difficulty:</span>
                {Object.entries(DIFFICULTY_COLOR).map(([label, cls]) => (
                  <span key={label} className={`rounded-full border px-2 py-1 ${cls}`}>{label}</span>
                ))}
              </div>

              {grouped.map(({ tier, companies }) => (
                <section key={tier} id={tierId(tier)} className="scroll-mt-28">
                  <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3">
                    <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">{tier}</h2>
                    <span className="font-mono text-[11px] text-slate-600">{pad2(companies.length)}</span>
                  </div>
                  <RevealGroup className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
                    {companies.map((company, i) => {
                      const display = COMPANY_DISPLAY[company];
                      if (!display) return null;
                      const diffClass = DIFFICULTY_COLOR[display.difficulty] ?? DIFFICULTY_COLOR["Hard"];
                      return (
                        <RevealItem key={company}>
                          <Link
                            href={`/interview-prep/${company}`}
                            className={`group relative flex h-full flex-col items-start justify-between gap-3 ${CARD_SOLID} p-3.5 transition-colors duration-300 hover:border-white/[0.14] hover:bg-[#0a1020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:flex-row sm:items-center sm:gap-4 sm:p-4`}
                          >
                            <div className="flex min-w-0 items-start gap-4">
                              <span className="mt-0.5 hidden font-mono text-[11px] text-accent-soft/60 sm:inline">{pad2(i + 1)}</span>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-white transition-colors group-hover:text-accent-soft">
                                  {display.name}
                                </p>
                                <p className="mt-0.5 text-[11px] text-slate-500 transition-colors group-hover:text-slate-300">Prep guide <Chevron /></p>
                              </div>
                            </div>
                            <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-semibold ${diffClass}`}>
                              {display.difficulty}
                            </span>
                          </Link>
                        </RevealItem>
                      );
                    })}
                  </RevealGroup>
                </section>
              ))}

              {/* Role questions cross-link */}
              <nav aria-label="Role interview guides" className="flex flex-col gap-4 border-y border-white/[0.06] py-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-[17px] font-semibold tracking-tight text-white">Looking for role-specific questions?</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    We also have detailed Q&A guides for 20+ roles, including software engineer, PM, data scientist, and more.
                  </p>
                </div>
                <Link
                  href="/interview-questions"
                  className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-accent-soft transition-colors hover:text-white"
                >
                  Browse role interview guides <Chevron />
                </Link>
              </nav>
            </div>
          </section>

          {/* CTA */}
          <section className={`pb-24 ${PAD}`}>
            <Reveal>
              <CtaPanel
                title="Practice with an AI that mimics each company's actual interview style."
                action={
                  <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                    Start practicing free, no credit card required <Chevron />
                  </a>
                }
              />
            </Reveal>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
