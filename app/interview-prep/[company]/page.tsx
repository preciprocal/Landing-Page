/**
 * app/interview-prep/[company]/page.tsx
 *
 * All data (COMPANY_META, getCompanyMeta, getCompanyQuestions, ALL_COMPANIES)
 * lives in lib/constants.ts. This file is pure rendering logic only.
 *
 * Next.js 15 fix: params must be typed as Promise<{company: string}> in both
 * generateMetadata and the default export.
 *
 * Layout: hero with quick stats, guide body beside a sticky aside (top roles,
 * related companies), FAQ beside a sticky heading, CTA panel.
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
import { PAD, INNER, GRID_BG, CARD, BTN_PRIMARY, Eyebrow, HeroBackdrop, FaqList, pad2 } from "@/components/page/Layout";
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
        {/* Hero: breadcrumb, tier and difficulty, H1, quick stats */}
        <section className={`relative overflow-hidden pb-14 pt-24 sm:pt-28 ${PAD}`}>
          <HeroBackdrop />
          <div className={`relative ${INNER}`}>
            <nav aria-label="Breadcrumb" className="mb-6 flex animate-fade-up flex-wrap items-center gap-2 text-[12px] text-slate-500 opacity-0">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/interview-prep" className="transition-colors hover:text-white">Interview Prep</Link>
              <span aria-hidden="true">›</span>
              <span className="text-slate-300">{meta.displayName}</span>
            </nav>

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
                  <span className="block bg-gradient-to-r from-accent-soft via-accent to-accent-2 bg-clip-text text-transparent">
                    {meta.displayName} (2026)
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
                  {meta.description}
                </p>
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
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-baseline justify-between gap-4 bg-[#070b16] px-5 py-4 sm:block lg:flex">
                    <dt className="text-xs text-slate-500">
                      <span className="mr-2 font-mono text-[11px] text-accent-soft/60">{pad2(i + 1)}</span>
                      {stat.label}
                    </dt>
                    <dd className="text-sm font-semibold text-slate-100 sm:mt-1 lg:mt-0">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Guide body with a sticky aside on wide screens */}
        <section className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
          <div className={`${INNER} grid gap-14 lg:grid-cols-[minmax(0,1fr)_340px] xl:gap-24`}>
            <div className="min-w-0 max-w-3xl space-y-16">
              {/* Overview */}
              <Reveal>
                <section>
                  <Eyebrow>Overview</Eyebrow>
                  <h2 className="mb-5 text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">Company overview</h2>
                  <p className="leading-relaxed text-slate-400">{meta.overview}</p>
                </section>
              </Reveal>

              {/* Interview process */}
              <section>
                <Reveal>
                  <Eyebrow>Process</Eyebrow>
                  <h2 className="mb-8 text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">The interview process</h2>
                </Reveal>
                <RevealGroup as="ol" className="relative space-y-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07]">
                  {/* The data marks the parts of a round with a leading "->"
                      ("  -> 2 coding rounds" under the onsite). Those render as
                      indented sub-steps, and only main steps are numbered. */}
                  {(() => {
                    let n = 0;
                    return meta.interviewProcess.map((step, i) => {
                      const sub = /^\s*->\s*/.test(step);
                      const text = step.replace(/^\s*->\s*/, "");
                      if (!sub) n += 1;
                      return sub ? (
                        <RevealItem as="li" key={i} className="flex items-start gap-3 bg-[#070b16] py-3.5 pl-[4.25rem] pr-5 sm:pr-6">
                          <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent-soft/60" />
                          <p className="text-[13px] leading-relaxed text-slate-400">{text}</p>
                        </RevealItem>
                      ) : (
                        <RevealItem as="li" key={i} className="flex items-start gap-5 bg-[#070b16] p-5 sm:p-6">
                          <span className="mt-0.5 font-mono text-[12px] text-accent-soft/80">{pad2(n)}</span>
                          <p className="text-sm leading-relaxed text-slate-300">{text}</p>
                        </RevealItem>
                      );
                    });
                  })()}
                </RevealGroup>
              </section>

              {/* Top tips */}
              <section>
                <Reveal>
                  <Eyebrow>Tips</Eyebrow>
                  <h2 className="mb-8 text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">Top tips for getting hired</h2>
                </Reveal>
                <RevealGroup as="ul" className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {meta.tips.map((tip, i) => (
                    <RevealItem as="li" key={i} className="flex items-start gap-4 py-4">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-deep/15 text-accent">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                          <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <p className="text-sm leading-relaxed text-slate-400">{tip}</p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </section>
            </div>

            <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
              {/* Top roles */}
              <Reveal>
                <section className={`${CARD} p-6`}>
                  <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft/90">Top roles at {meta.displayName}</h2>
                  <div className="flex flex-wrap gap-2">
                    {meta.topRoles.map((role) => (
                      <span
                        key={role}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </section>
              </Reveal>

              {/* Related companies.

                  The curated relatedCompanies list is used first, then topped up by
                  rotating through ALL_COMPANIES from this company's own position.
                  Purely curated, four companies (DoorDash, Figma, Palantir, Tesla)
                  appeared in nobody else's list and so had a single inbound link from
                  the hub. The rotation guarantees every company page is reachable from
                  several others, and being index-based it stays deterministic for SSR. */}
              {relatedCompanySlugs.length > 0 && (
                <Reveal delay={0.08}>
                  <section>
                    <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Also preparing for</h2>
                    <ul className="divide-y divide-white/[0.05] border-y border-white/[0.05]">
                      {relatedCompanySlugs.map((slug) => {
                        const relMeta = COMPANY_META[slug];
                        const name = relMeta?.displayName ?? slug.charAt(0).toUpperCase() + slug.slice(1);
                        return (
                          <li key={slug}>
                            <Link
                              href={`/interview-prep/${slug}`}
                              className="group flex items-center justify-between gap-3 py-3 text-sm text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                            >
                              {name} Interview Prep
                              <Chevron className="text-slate-600 group-hover:text-accent-soft" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                </Reveal>
              )}
            </aside>
          </div>
        </section>

        {/* FAQ as closed dropdowns. Answers stay in the HTML (native <details>), so the FAQ structured data still matches the page. */}
        <section className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
          <div className={`${INNER} grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)] xl:gap-24`}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">{meta.displayName} Interview FAQ</h2>
            </div>
            <FaqList items={questions.map((qa) => ({ q: qa.question, a: qa.answer }))} />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className={`pb-24 ${PAD}`}>
          <Reveal className={`${INNER} relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070b16] px-8 py-12 sm:px-14`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_100%_50%,black,transparent)]"
              style={GRID_BG}
            />
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-1/2 h-[320px] w-[520px] -translate-y-1/2 rounded-full bg-accent-deep/15 blur-[110px]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-lg text-slate-300">Ready to land the {meta.displayName} offer?</p>
              <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                Start practicing free, no credit card required <Chevron />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
