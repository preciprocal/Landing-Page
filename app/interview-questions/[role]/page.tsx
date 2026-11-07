/**
 * app/interview-questions/[role]/page.tsx
 *
 * All data (ROLE_META, ROLE_QUESTIONS, ALL_ROLES) lives in lib/constants.ts.
 * This file is pure rendering logic only.
 *
 * Layout: hero with the role stats, then the questions as an accordion
 * (native <details>, so every answer stays in the HTML) beside a sticky aside
 * with the practice CTA and a jump list, then the cross-links and the bottom
 * CTA panel. Built on components/page.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoleGuideLinks from "@/components/RoleGuideLinks";
import { InterviewPageJsonLd } from "@/components/JsonLd";
import { ALL_ROLES, ROLE_DISPLAY, getRoleMeta, APP_URL } from "@/lib/constants";
import { fitTitle, stripBrand, titleField } from "@/lib/seoTitle";
import { getRoleInterviewQuestions } from "@/lib/roleContent";
import Chevron from "@/components/Chevron";
import { PAD, INNER, SECTION, CARD, BTN_PRIMARY, BTN_SECONDARY, Eyebrow, PageHero, CtaPanel, pad2 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem, SpotlightCard } from "@/components/page/Reveal";

export async function generateStaticParams() {
  return ALL_ROLES.map((role) => ({ role }));
}

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role } = await params;
  if (!(ALL_ROLES as readonly string[]).includes(role)) return {};
  const meta = getRoleMeta(role);
  const canonical = `https://preciprocal.com/interview-questions/${role}`;
  // ROLE_META.title already ends with "| Preciprocal", which the layout
  // template would duplicate. Build a short title and keep the longer stored
  // one for the social cards.
  const name = ROLE_DISPLAY[role]?.name ?? role;
  const title = titleField(fitTitle(`${name} Interview Questions`, " (2026)"));
  return {
    title,
    description: meta.description,
    alternates: { canonical },
    openGraph: { title: stripBrand(meta.title), description: meta.description, url: canonical, type: "article", images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: stripBrand(meta.title), description: meta.description },
  };
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050810]";

export default async function RoleInterviewPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (!(ALL_ROLES as readonly string[]).includes(role)) notFound();

  const meta      = getRoleMeta(role);
  const questions = getRoleInterviewQuestions(role);
  const roleLabel = role.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div data-accent="sky" className="min-h-screen bg-[#050810]">
      <InterviewPageJsonLd
        role={roleLabel}
        slug={role}
        description={meta.description}
        questions={questions}
      />
      <Navbar />

      <main>
        <PageHero
          breadcrumb={
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link href="/" className={`rounded transition-colors hover:text-white ${FOCUS}`}>Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/interview-questions" className={`rounded transition-colors hover:text-white ${FOCUS}`}>Interview Questions</Link>
              <span aria-hidden="true">›</span>
              <span className="capitalize text-slate-300">{role.replace(/-/g, " ")}</span>
            </nav>
          }
          title={meta.h1}
          subhead={<p>{meta.description}</p>}
        >
          {/* Stats */}
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3 fill-sm-3">
            {[
              { label: "Avg. salary",       value: meta.salaryRange },
              { label: "Top companies",     value: meta.topCompanies.slice(0, 3).join(", ") },
              { label: "Questions covered", value: `${questions.length}+ Q&As` },
            ].map((s, i) => (
              <div key={s.label} className="bg-[#070b16] px-6 py-5">
                <dt className="flex items-center gap-2 text-[12px] text-slate-500">
                  <span className="font-mono text-[11px] text-accent-soft/70">{pad2(i + 1)}</span>
                  {s.label}
                </dt>
                <dd className="mt-2 font-semibold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        </PageHero>

        {/* Q&A beside a sticky aside */}
        <section className={`${SECTION} ${PAD}`}>
          <div className={`${INNER} grid gap-12 lg:grid-cols-[300px_minmax(0,1fr)] xl:gap-16`}>
            {/* The aside comes first in the DOM so the CTA sits above the questions on phones. */}
            <aside className="lg:sticky lg:top-28 lg:order-first lg:self-start">
              <Reveal>
                <SpotlightCard className="rounded-2xl border border-accent/20 bg-gradient-to-b from-accent-deep/[0.09] to-accent-deep-2/[0.03] p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft/90">Practice</p>
                  <h2 className="mt-3 text-lg font-semibold leading-snug text-white">Practice these questions with AI mock interviews</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">Reading answers is good. Being grilled by an AI interviewer that follows up, pushes back, and scores your response is 10× better.</p>
                  <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} mt-5 w-full ${FOCUS}`}>
                    Start practicing free <Chevron />
                  </a>
                </SpotlightCard>
              </Reveal>

              {questions.length > 0 && (
                <nav aria-label="Jump to a question" className="mt-8 hidden lg:block">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">In this guide</p>
                  <ol className="max-h-[calc(100vh-26rem)] space-y-px overflow-y-auto border-l border-white/[0.07]">
                    {questions.map((qa, i) => (
                      <li key={i}>
                        <a
                          href={`#q-${i + 1}`}
                          className={`-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 pr-2 text-[13px] leading-snug text-slate-400 transition-colors hover:border-accent hover:text-white ${FOCUS}`}
                        >
                          <span className="font-mono text-[11px] leading-5 text-slate-600">{pad2(i + 1)}</span>
                          <span className="line-clamp-2">{qa.question}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </aside>

            <div className="min-w-0">
              <Reveal>
                <Eyebrow>Questions and answers</Eyebrow>
                <h2 className="mb-8 text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">
                  Top {questions.length} {roleLabel} Interview Questions
                </h2>
              </Reveal>

              <RevealGroup className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                {questions.map((qa, i) => (
                  <RevealItem key={i}>
                    <article id={`q-${i + 1}`} className="scroll-mt-28">
                      <details className="group">
                        <summary
                          className={`flex cursor-pointer list-none items-start justify-between gap-6 rounded-lg py-6 text-left [&::-webkit-details-marker]:hidden ${FOCUS}`}
                        >
                          <h3 className="text-base font-semibold leading-snug text-white transition-colors group-hover:text-accent-soft sm:text-lg">
                            <span className="mr-2 font-mono text-[13px] font-normal text-accent-soft/80">Q{i + 1}.</span>
                            {qa.question}
                          </h3>
                          <span
                            aria-hidden="true"
                            className="relative mt-1.5 h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-45"
                          >
                            <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                            <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                          </span>
                        </summary>
                        <div className="relative mb-7 max-w-3xl border-l border-accent/30 pl-5 sm:pr-10">
                          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{qa.answer}</p>
                        </div>
                      </details>
                    </article>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            {/* Job-description predictor cross-link */}
            <Reveal>
              <SpotlightCard className={`${CARD} p-7 sm:p-8`}>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl">
                    <Eyebrow>Free tool</Eyebrow>
                    <h2 className="text-xl font-semibold text-white">Interviewing for a specific {roleLabel} job?</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      These are the common questions. Paste the actual job posting into the free predictor to get the 5 questions that role is most likely to ask, then practice your answers out loud.
                    </p>
                  </div>
                  <Link href="/interview-question-predictor" className={`${BTN_SECONDARY} w-full shrink-0 sm:w-auto ${FOCUS}`}>
                    Predict questions from your job description <Chevron />
                  </Link>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Sibling guides for this role (resume, salary, cover letters) */}
            <Reveal>
              <RoleGuideLinks role={role} roleName={ROLE_DISPLAY[role]?.name ?? roleLabel} current="interview-questions" />
            </Reveal>

            {/* Related roles */}
            {meta.relatedRoles.length > 0 && (
              <section aria-labelledby="related-title" className="mt-16 border-t border-white/[0.06] pt-10">
                <h2 id="related-title" className="mb-6 text-xl font-bold text-white">Related interview guides</h2>
                <RevealGroup as="ul" className="flex flex-wrap gap-3">
                  {meta.relatedRoles.map((r) => (
                    <RevealItem as="li" key={r}>
                      <Link
                        href={`/interview-questions/${r}`}
                        className={`group inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.02] px-4 py-2 text-sm text-slate-300 transition-all hover:border-accent/35 hover:text-white ${FOCUS}`}
                      >
                        {r.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Interview Questions
                        <Chevron className="text-slate-600 group-hover:text-accent-soft" />
                      </Link>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </section>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className={`${PAD} pb-24 pt-4`}>
          <Reveal>
            <CtaPanel
              title="Ready to turn preparation into offers?"
              action={
                <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full sm:w-auto ${FOCUS}`}>
                  Try Preciprocal free, no credit card required <Chevron />
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
