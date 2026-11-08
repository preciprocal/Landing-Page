/**
 * app/interview-questions/page.tsx
 *
 * Hub page for all role-based interview question guides.
 * ALL_ROLES, ROLE_DISPLAY, and ALL_ROLE_CATEGORIES come from lib/constants.ts.
 *
 * Layout: hero with a jump list of industries, then one band per industry
 * (sticky label on the left, role cards on the right), the two cross-links,
 * and the practice CTA panel. Built on components/page.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ALL_ROLES, ROLE_DISPLAY, ALL_ROLE_CATEGORIES, APP_URL } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, CARD, BTN_PRIMARY, Eyebrow, PageHero, CtaPanel, pad2, HoverRule } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem, SpotlightCard } from "@/components/page/Reveal";
import InterviewQuestionsVisual from "@/components/page/visuals/InterviewQuestionsVisual";

export const metadata: Metadata = {
  title: "Interview Questions by Role: 40+ Careers",
  description: "Free interview question guides for 40+ roles: software engineer, product manager, data scientist, financial analyst, marketing manager, and more. Real Q&As with detailed answers, salary benchmarks, and prep tips for 2026.",
  alternates: { canonical: "https://preciprocal.com/interview-questions" },
  openGraph: {
    title: "Interview Questions by Role 2026: Preciprocal",
    description: "Free Q&A guides for 40+ roles. Real questions, detailed answers, salary ranges, and preparation tips updated for 2026.",
    url: "https://preciprocal.com/interview-questions",
    type: "website",
  },
};

/** In-page anchor for an industry band, e.g. "Data & Analytics" to "data-analytics". */
const anchor = (cat: string) => cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050810]";

export default function InterviewQuestionsIndexPage() {
  const grouped = ALL_ROLE_CATEGORIES.map((cat) => ({
    category: cat,
    roles: ALL_ROLES.filter((r) => ROLE_DISPLAY[r]?.category === cat),
  })).filter((g) => g.roles.length > 0);

  return (
    <div data-accent="sky" className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Interview Questions", url: "https://preciprocal.com/interview-questions" },
        ]}
      />
      <Navbar />

      <main>
        <PageHero
          visual={<InterviewQuestionsVisual />}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Interview Questions" }]}
          title={<>Interview questions{" "}</>}
          accent="by role"
          subhead={
            <>
              <p>
                Real interview questions, detailed answers, salary benchmarks, and preparation tips
                for every major career path, updated for 2026.
              </p>
              <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.14em] text-slate-500">
                {ALL_ROLES.length} roles across {ALL_ROLE_CATEGORIES.length} industries
              </p>
            </>
          }
        >
          {/* Jump list of industries */}
          <nav aria-label="Industries" className="flex flex-wrap gap-2">
            {grouped.map(({ category, roles }) => (
              <a
                key={category}
                href={`#${anchor(category)}`}
                className={`group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-slate-300 transition-colors hover:border-accent/40 hover:text-white ${FOCUS}`}
              >
                {category}
                <span className="font-mono text-[11px] text-slate-500 group-hover:text-accent-soft">{pad2(roles.length)}</span>
              </a>
            ))}
          </nav>
        </PageHero>

        {/* Role grid by category */}
        <div className={PAD}>
          <div className={`${INNER} border-t border-white/[0.05]`}>
            {grouped.map(({ category, roles }) => (
              <section
                key={category}
                id={anchor(category)}
                aria-labelledby={`${anchor(category)}-title`}
                className="grid scroll-mt-24 gap-6 border-b border-white/[0.05] py-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12"
              >
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <h2
                    id={`${anchor(category)}-title`}
                    className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400"
                  >
                    {category} · {roles.length} guide{roles.length !== 1 ? "s" : ""}
                  </h2>
                  <span aria-hidden="true" className="mt-3 block h-px w-12 bg-gradient-to-r from-accent to-accent-2" />
                </div>

                <RevealGroup as="ul" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {roles.map((role) => {
                    const display = ROLE_DISPLAY[role];
                    if (!display) return null;
                    return (
                      <RevealItem as="li" key={role}>
                        <Link
                          href={`/interview-questions/${role}`}
                          className={`group relative flex h-full items-center gap-4 overflow-hidden ${CARD} p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/[0.045] ${FOCUS}`}
                        >
                          <span
                            aria-hidden="true"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-[#070b16] text-lg"
                          >
                            {display.icon}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-slate-100 transition-colors group-hover:text-white">
                              {display.name}
                            </p>
                            <p className="mt-0.5 text-[12px] text-slate-500 transition-colors group-hover:text-accent-soft">
                              Interview questions <Chevron />
                            </p>
                          </div>
                          <HoverRule className="inset-x-4" />
                        </Link>
                      </RevealItem>
                    );
                  })}
                </RevealGroup>
              </section>
            ))}
          </div>
        </div>

        {/* Cross-links: job-description predictor and company prep */}
        <section className={`${PAD} py-20`}>
          <div className={`${INNER} grid gap-5 lg:grid-cols-2`}>
            <Reveal className="h-full">
              <SpotlightCard className="h-full rounded-2xl border border-accent/25 bg-gradient-to-br from-accent-deep/[0.09] to-accent-deep-2/[0.04] p-7 sm:p-8">
                <Eyebrow>Free tool</Eyebrow>
                <h2 className="text-xl font-semibold text-white">Have a specific job posting?</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
                  Paste it into the free predictor to get the 5 questions that posting is most likely to lead to, and practice your answers out loud. No sign-up.
                </p>
                <Link
                  href="/interview-question-predictor"
                  className={`group mt-6 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-accent-soft transition-colors hover:text-white ${FOCUS}`}
                >
                  Predict questions from a job description <Chevron />
                </Link>
              </SpotlightCard>
            </Reveal>

            <Reveal className="h-full" delay={0.08}>
              <SpotlightCard className={`h-full ${CARD} p-7 sm:p-8`}>
                <Eyebrow>Company guides</Eyebrow>
                <h2 className="text-xl font-semibold text-white">Preparing for a specific company?</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
                  We also have company-specific prep guides covering the interview process, culture, difficulty, and what each company actually looks for.
                </p>
                <Link
                  href="/interview-prep"
                  className={`group mt-6 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-accent-soft transition-colors hover:text-white ${FOCUS}`}
                >
                  Browse company interview guides <Chevron />
                </Link>
              </SpotlightCard>
            </Reveal>
          </div>
        </section>

        {/* Practice CTA */}
        <section className={`${PAD} pb-24`}>
          <Reveal>
            <CtaPanel
              title="Reading questions is step one. Answering them under pressure is where real prep happens."
              action={
                <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full sm:w-auto ${FOCUS}`}>
                  Practice with AI mock interviews, free <Chevron />
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
