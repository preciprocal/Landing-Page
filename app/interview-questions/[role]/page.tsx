/**
 * app/interview-questions/[role]/page.tsx
 *
 * All data (ROLE_META, ROLE_QUESTIONS, ALL_ROLES) lives in lib/constants.ts.
 * This file is pure rendering logic only.
 *
 * Layout, one flow: hero with the role stats, then the questions as an
 * accordion in two columns (native <details>, so every answer stays in the
 * HTML), a practice bridge, the cross-links as a compact list, and the bottom
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
import { PAD, INNER, SECTION, BTN_PRIMARY, BTN_SECONDARY, SectionHead, PageHero, CtaPanel } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

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
  // Split into two columns for wide screens, first half then second half, so
  // each column reads top to bottom in order.
  const numbered = questions.map((qa, i) => ({ qa, n: i + 1 }));
  const half = Math.ceil(numbered.length / 2);
  const columns = [numbered.slice(0, half), numbered.slice(half)].filter((c) => c.length > 0);

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
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Interview Questions", href: "/interview-questions" }, { label: role.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) }]}
          title={meta.h1}
          subhead={<p>{meta.description}</p>}
          aside={
            <div className="flex flex-col gap-3 lg:items-end">
              <a href={`${APP_URL}/sign-up?tool=mock-interview`} className={`${BTN_PRIMARY} w-full py-4 sm:w-auto ${FOCUS}`}>
                Practice these out loud, free <Chevron />
              </a>
              <p className="text-[12px] text-slate-500">Voice mock interview · AI follow-ups · No credit card</p>
            </div>
          }
        >
          {/* Stats */}
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3 fill-sm-3">
            {[
              { label: "Avg. salary",       value: meta.salaryRange },
              { label: "Top companies",     value: meta.topCompanies.slice(0, 3).join(", ") },
              { label: "Questions covered", value: `${questions.length}+ Q&As` },
            ].map((s) => (
              <div key={s.label} className="bg-[#070b16] px-6 py-5">
                <dt className="text-[12px] text-slate-500">{s.label}</dt>
                <dd className="mt-2 font-semibold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        </PageHero>

        {/* The questions, first. Two columns on wide screens, each its own
            stack, so opening an answer only moves the questions under it.
            Answers are native <details>, so every one stays in the HTML and
            the FAQ structured data matches the page. */}
        <section className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead
                align="center"
                className="mb-12"
                eyebrow="Questions and answers"
                title={`Top ${questions.length} ${roleLabel} Interview Questions`}
                subtitle="Open a question to read the answer."
              />
            </Reveal>

            <div className="grid gap-x-12 lg:grid-cols-2 lg:items-start">
              {columns.map((col, c) => (
                <RevealGroup key={c} className={`divide-y divide-white/[0.06] border-b border-white/[0.06] ${c === 0 ? "border-t" : "lg:border-t"}`}>
                  {col.map(({ qa, n }) => (
                    <RevealItem key={n}>
                      <article id={`q-${n}`} className="scroll-mt-28">
                        <details className="group">
                          <summary
                            className={`flex cursor-pointer list-none items-start justify-between gap-6 rounded-lg py-5 text-left [&::-webkit-details-marker]:hidden ${FOCUS}`}
                          >
                            <h3 className="flex gap-2 text-base font-semibold leading-snug text-white transition-colors group-hover:text-accent-soft sm:text-[17px]">
                              <span className="w-9 shrink-0 pt-[3px] font-mono text-[13px] font-normal leading-snug text-accent-soft/80">Q{n}.</span>
                              <span>{qa.question}</span>
                            </h3>
                            <span
                              aria-hidden="true"
                              className="relative mt-1.5 h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-45"
                            >
                              <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                              <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                            </span>
                          </summary>
                          <div className="relative mb-6 border-l border-accent/30 pl-5 sm:pr-10">
                            <p className="text-sm leading-relaxed text-slate-300 sm:text-[15px]">{qa.answer}</p>
                          </div>
                        </details>
                      </article>
                    </RevealItem>
                  ))}
                </RevealGroup>
              ))}
            </div>

            {/* The bridge from reading the answers to saying them out loud. */}
            <Reveal>
              <div className="mt-14 flex flex-col gap-5 rounded-2xl border border-accent/20 bg-accent-deep/[0.05] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="max-w-2xl">
                  <h2 className="text-[17px] font-semibold leading-snug text-white">Practice these questions with AI mock interviews</h2>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-400">Reading answers is good. Being grilled by an AI interviewer that follows up, pushes back, and scores your response is 10× better.</p>
                </div>
                <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} shrink-0 ${FOCUS}`}>
                  Start practicing free <Chevron />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Where to go next: the predictor, the sibling guides, related roles */}
        <section className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            {/* Job-description predictor cross-link */}
            <div className="flex flex-col gap-5 border-b border-white/[0.06] pb-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold text-white">Interviewing for a specific {roleLabel} job?</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  These are the common questions. Paste the actual job posting into the free predictor to get the 5 questions that role is most likely to ask, then practice your answers out loud.
                </p>
              </div>
              <Link href="/interview-question-predictor" className={`${BTN_SECONDARY} w-full shrink-0 sm:w-auto ${FOCUS}`}>
                Predict questions from your job description <Chevron />
              </Link>
            </div>

            {/* Sibling guides for this role (resume, salary, cover letters) */}
            <RoleGuideLinks role={role} roleName={ROLE_DISPLAY[role]?.name ?? roleLabel} current="interview-questions" className="mt-10" />

            {/* Related roles */}
            {meta.relatedRoles.length > 0 && (
              <nav aria-labelledby="related-title" className="mt-12">
                <h2 id="related-title" className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Related interview guides</h2>
                <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                  {meta.relatedRoles.map((r) => (
                    <li key={r} className="border-b border-white/[0.05]">
                      <Link
                        href={`/interview-questions/${r}`}
                        className={`group flex items-center justify-between gap-3 py-3 text-sm text-slate-400 transition-colors hover:text-white ${FOCUS}`}
                      >
                        {r.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Interview Questions
                        <Chevron className="text-slate-600 group-hover:text-slate-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className={`${PAD} pb-24 pt-4`}>
          <Reveal>
            <CtaPanel
              title="Knowing the questions is half of it. Saying the answers out loud is the other half."
              body={<p>Run a voice mock interview with an AI panel that asks follow-ups, then see exactly where your answers lost the room.</p>}
              action={
                <a href={`${APP_URL}/sign-up?tool=mock-interview`} className={`${BTN_PRIMARY} w-full sm:w-auto ${FOCUS}`}>
                  Practice out loud, free <Chevron />
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
