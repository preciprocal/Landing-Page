/**
 * app/interview-prep/[company]/page.tsx
 *
 * All data (COMPANY_META, getCompanyMeta, getCompanyQuestions, ALL_COMPANIES)
 * lives in lib/constants.ts. This file is pure rendering logic only.
 *
 * Next.js 15 fix: params must be typed as Promise<{company: string}> in both
 * generateMetadata and the default export.
 *
 * Layout, one centred flow: hero with quick stats, the rounds as connected
 * stages (overview as the lead-in), how to stand out, FAQ, top roles and
 * related companies as a compact list, CTA panel.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CompanyPageJsonLd } from "@/components/JsonLd";
import { ALL_COMPANIES, getCompanyMeta, getCompanyQuestions, COMPANY_META, APP_URL } from "@/lib/constants";
import { fitTitle, stripBrand } from "@/lib/seoTitle";
import Chevron from "@/components/Chevron";
import { PAD, INNER, BTN_PRIMARY, BTN_SECONDARY, ACCENT_TEXT, Breadcrumbs, HeroBackdrop, SectionHead, FaqList, CtaPanel, TrustRow } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

export async function generateStaticParams() {
  return ALL_COMPANIES.map((company) => ({ company }));
}

export async function generateMetadata({ params }: { params: Promise<{ company: string }> }): Promise<Metadata> {
  const { company } = await params;
  const meta = getCompanyMeta(company);
  if (!meta) return {};
  const canonical = `https://preciprocal.com/interview-prep/${company}`;
  // COMPANY_META.title already ends with "| Preciprocal" and the layout
  // template appends it again, so a short title is built here instead. The
  // long stored title is still used for the OG and Twitter cards, which have
  // a much larger display budget.
  const title = fitTitle(`${meta.displayName} Interview Prep`, " (2026)");
  return {
    title,
    description: meta.description,
    alternates: { canonical },
    openGraph: { title: stripBrand(meta.title), description: meta.description, url: canonical, type: "article", images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: stripBrand(meta.title), description: meta.description },
  };
}

/** Stage columns on wide screens, one per stage (the data has 4 to 6). */
const STAGE_COLS: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-7",
};

const DIFFICULTY_COLOR: Record<string, { color: string; bg: string; border: string }> = {
  "Medium":          { color: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.2)" },
  "Hard":            { color: "#fbbf24", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.2)" },
  "Very Hard":       { color: "#fb923c", bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.2)" },
  "Extremely Hard":  { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.2)" },
};

export default async function CompanyPrepPage({ params }: { params: Promise<{ company: string }> }) {
  const { company } = await params;
  const meta = getCompanyMeta(company);
  if (!meta) notFound();

  const questions = getCompanyQuestions(company);

  // Curated relations first, then fill from a rotation over every company so no
  // page is left with only its hub link. See the Related companies section.
  const relatedCompanySlugs: string[] = (() => {
    const picked = [...meta.relatedCompanies];
    const i = ALL_COMPANIES.findIndex((c) => c === company);
    const start = i === -1 ? 0 : i + 1;
    const rotated = [...ALL_COMPANIES.slice(start), ...ALL_COMPANIES.slice(0, start)];
    for (const slug of rotated) {
      if (picked.length >= 6) break;
      if (slug !== company && !picked.includes(slug)) picked.push(slug);
    }
    return picked;
  })();
  const diffStyle = DIFFICULTY_COLOR[meta.difficulty] ?? DIFFICULTY_COLOR["Hard"];

  // Group the process into stages: a "->" line is a part of the stage above it.
  const stages: { text: string; parts: string[] }[] = [];
  for (const step of meta.interviewProcess) {
    const text = step.replace(/^\s*->\s*/, "");
    if (/^\s*->/.test(step) && stages.length > 0) stages[stages.length - 1].parts.push(text);
    else stages.push({ text, parts: [] });
  }
  const mockUrl = `${APP_URL}/sign-up?tool=mock-interview`;

  return (
    <div data-accent="rose" className="min-h-screen bg-[#050810]">
      <CompanyPageJsonLd
        company={meta.displayName}
        slug={company}
        description={meta.description}
        questions={questions.map((q) => ({ question: q.question, answer: q.answer }))}
      />
      <Navbar />

      <main>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Interview Prep", href: "/interview-prep" }, { label: meta.displayName }]}
        />

        {/* Hero: tier and difficulty, H1, quick stats */}
        <section className={`relative overflow-hidden pb-14 pt-14 sm:pt-16 ${PAD}`}>
          <HeroBackdrop />
          <div className={`relative ${INNER}`}>
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-20">
              <div className="max-w-4xl animate-fade-up opacity-0">
                <div className="mb-7 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-deep/[0.08] px-3.5 py-1.5 text-[12px] font-medium text-accent-soft">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                    {meta.tier}
                  </span>
                  <span
                    className="rounded-full border px-3.5 py-1.5 text-[12px] font-medium"
                    style={{ color: diffStyle.color, background: diffStyle.bg, borderColor: diffStyle.border }}
                  >
                    {meta.difficulty}
                  </span>
                </div>

                <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[4rem]">
                  {"How to Get a Job at "}
                  <span className="block text-slate-400">
                    {meta.displayName} (2026)
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
                  {meta.description}
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a href={mockUrl} className={`${BTN_PRIMARY} py-4`}>
                    Practice a {meta.displayName} mock interview <Chevron />
                  </a>
                  <a href="#process" className={BTN_SECONDARY}>
                    See the rounds
                  </a>
                </div>
                <TrustRow className="mt-5" />
              </div>

              {/* Quick stats */}
              <dl
                className="grid animate-fade-up gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] opacity-0 sm:grid-cols-3 lg:grid-cols-1 fill-sm-3 fill-lg-1"
                style={{ animationDelay: "120ms" }}
              >
                {[
                  { label: "Interview Rounds", value: `${meta.avgRounds} rounds` },
                  { label: "Timeline", value: meta.avgDuration },
                  { label: "Difficulty", value: meta.difficulty },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-baseline justify-between gap-4 bg-[#070b16] px-5 py-4 sm:block lg:flex">
                    <dt className="text-[13px] text-slate-500">{stat.label}</dt>
                    <dd className="text-[15px] font-semibold text-slate-100 sm:mt-1 lg:mt-0">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* The rounds: what the interview looks like, as a flow of stages.
            The overview sits under the heading as the lead-in. */}
        <section id="process" className={`scroll-mt-24 border-t border-white/[0.05] py-20 sm:py-24 ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead
                align="center"
                className="mb-14"
                eyebrow="The process"
                title={<>Inside the {meta.displayName} interview,</>}
                accent="round by round"
                subtitle={meta.overview}
              />
            </Reveal>

            {/* The data marks the parts of a round with a leading "->" ("  -> 2
                coding rounds" under the onsite). Those attach to the stage
                above them, and only the stages are numbered. */}
            <RevealGroup as="ol" className={`relative grid gap-8 ${STAGE_COLS[stages.length] ?? "lg:grid-cols-4"} lg:gap-8`}>
              {/* The connecting line: down the numbers on phones, across them on wide screens. */}
              <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-gradient-to-b from-accent/50 via-white/[0.12] to-accent/50 lg:hidden" />
              <span
                aria-hidden="true"
                className="absolute top-6 hidden h-px bg-gradient-to-r from-accent/50 via-white/[0.12] to-accent/50 lg:block"
                style={{ left: `${50 / stages.length}%`, right: `${50 / stages.length}%` }}
              />
              {stages.map((stage, i) => (
                <RevealItem as="li" key={i} className="relative flex gap-5 lg:block lg:text-center">
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-accent/40 bg-[#050810] text-[15px] font-bold text-accent-soft lg:mx-auto">
                    {i + 1}
                  </span>
                  <div className="min-w-0 pt-2.5 lg:pt-0">
                    <p className="text-[16px] font-semibold leading-snug text-white lg:mt-6">{stage.text}</p>
                    {stage.parts.length > 0 && (
                      <ul className="mt-3 space-y-2 lg:mx-auto lg:max-w-[16rem]">
                        {stage.parts.map((part) => (
                          <li key={part} className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 text-[13px] leading-snug text-slate-400">
                            {part}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* The bridge from reading about the rounds to rehearsing them. */}
            <Reveal>
              <div className="mt-16 flex flex-col gap-5 border-y border-white/[0.06] py-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <p className="text-[17px] font-semibold text-white">Rehearse every round before the real one.</p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-400">
                    A voice mock interview with an AI panel that asks follow-ups, scored on communication,
                    technical depth and structure. The nerves fade once you&apos;ve done it out loud.
                  </p>
                </div>
                <a href={mockUrl} className={`${BTN_PRIMARY} shrink-0`}>
                  Start a mock interview <Chevron />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* How to stand out: an open list, one line each */}
        <section className={`border-t border-white/[0.05] py-20 sm:py-24 ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead align="center" className="mb-14" eyebrow="Tips" title="How to stand out" accent={`at ${meta.displayName}`} />
            </Reveal>
            <RevealGroup as="ul" className="grid gap-x-12 gap-y-8 md:grid-cols-2">
              {meta.tips.map((tip, i) => (
                <RevealItem as="li" key={i} className="flex gap-4">
                  <span aria-hidden="true" className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/[0.12] text-accent-soft">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="text-[15.5px] leading-relaxed text-slate-300">{tip}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* FAQ as closed dropdowns. Answers stay in the HTML, so the FAQ structured data still matches the page. */}
        <section className={`border-t border-white/[0.05] py-20 sm:py-24 ${PAD}`}>
          <div className={INNER}>
            <SectionHead
              align="center"
              className="mb-12"
              eyebrow="FAQ"
              title={`${meta.displayName} interview questions, answered`}
              subtitle={
                <>
                  Something else? Email{" "}
                  <a href="mailto:support@preciprocal.com" className="text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white">
                    support@preciprocal.com
                  </a>
                  .
                </>
              }
            />
            <div className="mx-auto max-w-4xl">
              <FaqList items={questions.map((qa) => ({ q: qa.question, a: qa.answer }))} />
            </div>
          </div>
        </section>

        {/* Top roles and related companies, as a compact list.

            The curated relatedCompanies list is used first, then topped up by
            rotating through ALL_COMPANIES from this company's own position.
            Purely curated, four companies (DoorDash, Figma, Palantir, Tesla)
            appeared in nobody else's list and so had a single inbound link from
            the hub. The rotation guarantees every company page is reachable from
            several others, and being index-based it stays deterministic for SSR. */}
        <section className={`border-t border-white/[0.05] py-16 ${PAD}`}>
          <div className={`${INNER} grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16`}>
            <div>
              <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Top roles at {meta.displayName}</h2>
              <ul className="flex flex-wrap gap-2">
                {meta.topRoles.map((role) => (
                  <li key={role} className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-slate-300">
                    {role}
                  </li>
                ))}
              </ul>
            </div>

            {relatedCompanySlugs.length > 0 && (
              <nav aria-labelledby="related-companies">
                <h2 id="related-companies" className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Also preparing for</h2>
                <ul className="grid gap-x-10 sm:grid-cols-2">
                  {relatedCompanySlugs.map((slug) => {
                    const relMeta = COMPANY_META[slug];
                    const name = relMeta?.displayName ?? slug.charAt(0).toUpperCase() + slug.slice(1);
                    return (
                      <li key={slug} className="border-b border-white/[0.05]">
                        <Link
                          href={`/interview-prep/${slug}`}
                          className="group flex items-center justify-between gap-3 py-3 text-sm text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                        >
                          {name} Interview Prep
                          <Chevron className="text-slate-600 group-hover:text-slate-300" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className={`pb-24 ${PAD}`}>
          <Reveal>
            <CtaPanel
              title={<>Walk into your {meta.displayName} interview <span className={ACCENT_TEXT}>already having done it.</span></>}
              body={
                <p>
                  Tailor your resume to the role, rehearse each round out loud, and track every application in one
                  place, for less than a coffee a week.
                </p>
              }
              action={
                <a href={mockUrl} className={`${BTN_PRIMARY} w-full px-8 py-4 text-base sm:w-auto`}>
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
