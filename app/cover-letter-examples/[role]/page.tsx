/**
 * app/cover-letter-examples/[role]/page.tsx
 *
 * Dynamic route for role-specific cover letter example pages.
 * Targets: "cover letter example for [role]", "cover letter template [role]",
 *          "how to write a cover letter for [role]", "[role] cover letter 2026"
 *
 * Data source: lib/constants.ts (ROLE_META, ROLE_DISPLAY, ALL_ROLES)
 * Pattern: mirrors app/interview-questions/[role]/page.tsx
 * Layout: one centred column that reads as a flow. Hero with a meta stat
 * strip, then the example letter itself on one paper card with how each
 * paragraph works beneath it, the FAQ (collapsed answers), the writing tips in
 * a Fold (still in the HTML for search), the related guides and examples as
 * compact links lists, and a CTA panel.
 *
 * File path: app/cover-letter-examples/[role]/page.tsx
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ALL_ROLES, ROLE_DISPLAY, getRoleMeta, APP_URL } from "@/lib/constants";
import { fitTitle, titleField } from "@/lib/seoTitle";
import { getRoleContent } from "@/lib/roleContent";
import Chevron from "@/components/Chevron";
import { PAD, INNER, SECTION, BTN_PRIMARY, BTN_SECONDARY, SectionHead, PageHero, CtaPanel, Fold, pad2, FaqSection } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

// ── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return ALL_ROLES.map((role) => ({ role }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;
  if (!(ALL_ROLES as readonly string[]).includes(role)) return {};

  const meta = getRoleMeta(role);
  const display = ROLE_DISPLAY[role];
  const roleName = display?.name ?? role.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const canonical = `https://preciprocal.com/cover-letter-examples/${role}`;

  const title = titleField(fitTitle(`${roleName} Cover Letter Example`, " (2026)"));
  const description = `Free ${roleName} cover letter example and writing guide for 2026. What to include, what to avoid, and a full annotated template that gets past ATS and makes hiring managers keep reading.`;

  return {
    title,
    description,
    keywords: [
      `${roleName.toLowerCase()} cover letter`,
      `${roleName.toLowerCase()} cover letter example`,
      `${roleName.toLowerCase()} cover letter template`,
      `how to write a cover letter for ${roleName.toLowerCase()}`,
      `${roleName.toLowerCase()} cover letter 2026`,
      `cover letter example ${roleName.toLowerCase()}`,
      `${roleName.toLowerCase()} cover letter no experience`,
      `${roleName.toLowerCase()} cover letter new grad`,
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: "https://preciprocal.com/og-image-v3.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ── Cover letter structure data ───────────────────────────────────────────────
function getCoverLetterSections(
  roleName: string,
  topCompanies: string[],
  content: ReturnType<typeof getRoleContent>
) {
  const company = topCompanies[0] ?? "the company";
  const kws = content?.keywords ?? [];
  const k1 = kws[0] ?? "the core skill for this role";
  const k2 = kws[1] ?? "a closely related area";
  const k3 = kws[2] ?? "the requirement they emphasised";
  const proves = content?.profile.provesValue ?? "measurable outcomes";
  return [
    {
      label: "Opening paragraph",
      badge: "Hook",
      badgeColor: "#38bdf8",
      guidance: `Lead with something specific, not 'I am writing to express my interest.' For ${roleName} roles the strongest opening establishes ${proves} immediately. Your first sentence determines whether the hiring manager reads the second.`,
      example: `I have spent the past two years working on ${k1} and ${k2}, and when I saw the ${roleName} opening at ${company}, it was exactly the kind of problem I have been preparing to work on. [One sentence on why this company specifically, not generic enthusiasm.]`,
    },
    {
      label: "Paragraph 2",
      badge: "Relevance",
      badgeColor: "#60a5fa",
      guidance: `Connect your most relevant experience to their most important requirement, using their exact language. ${roleName} postings tend to lean on terms like ${k1}, ${k2} and ${k3}, mirror the phrasing rather than paraphrasing it. One concrete example with a result beats three paragraphs of general claims.`,
      example: `In my role at [Company/Project], I [specific action involving ${k1}] that resulted in [quantified outcome]. This is directly relevant to what you described as [specific requirement from the posting] because [connection].`,
    },
    {
      label: "Paragraph 3",
      badge: "Fit",
      badgeColor: "#818cf8",
      guidance:
        "Show you understand what makes this company different from its competitors. One specific detail about their product, culture, or recent work that genuinely interests you. Hiring managers can tell the difference between research and flattery.",
      example: `What draws me specifically to ${company} is [specific detail about their product, approach, or culture that you actually find interesting and why it connects to your work]. I have followed [relevant work/product/initiative] and believe my experience with [your relevant area] would directly contribute to that direction.`,
    },
    {
      label: "Closing paragraph",
      badge: "Close",
      badgeColor: "#a78bfa",
      guidance:
        "Short, direct, and confident. State that you would welcome a conversation. Do not beg for an interview or over-explain. One to two sentences.",
      example: `I would welcome the opportunity to discuss how my background in [key skill] aligns with what you are building. Thank you for your time.`,
    },
  ];
}

/**
 * Role-aware writing tips.
 *
 * These were previously identical for all 41 roles, which made every page in
 * this section 95% word-identical and kept them out of Google's index. They now
 * compose from the role's own keyword set and its category profile, so a
 * Paralegal page and an SRE page give genuinely different advice.
 */
function getCoverLetterTips(roleName: string, content: ReturnType<typeof getRoleContent>) {
  const keywords = content?.keywords ?? [];
  const angle = content?.profile.coverLetterAngle ?? "a concrete result you delivered";
  const proves = content?.profile.provesValue ?? "measurable outcomes";
  const screens = content?.profile.screeningFocus ?? "relevant experience";
  const positioning = content?.note.positioning ?? "";
  const roleScreened = content?.note.screened ?? screens;
  const kwSample = keywords.slice(0, 4).join(", ");

  return [
    {
      title: `What a ${roleName} letter has to establish`,
      body: `${positioning} Reviewers reading ${roleName} applications are specifically looking for ${roleScreened}, which is narrower than the general advice about enthusiasm and fit. A letter that establishes it in the opening is doing the one job that matters for this role.`,
    },
    {
      title: `Open with ${angle}`,
      body: `A ${roleName} cover letter earns its second paragraph in the first two sentences. The strongest opening for this field is ${angle}, stated plainly, with the outcome attached. Hiring managers reading ${roleName} applications are screening for ${screens}, so leading with that is what buys you the rest of the page.`,
    },
    {
      title: "Mirror the posting's exact language",
      body: `Cover letters are parsed by the same systems that score your resume. ${roleName} postings tend to cluster around terms like ${kwSample}. If the posting uses a specific phrase, use that phrase rather than a synonym, the match is frequently literal, and the three or four most important requirements are the ones worth mirroring precisely.`,
    },
    {
      title: `Show ${proves}`,
      body: `This is the specific currency of ${roleName} hiring. The letter should demonstrate ${proves}, not general enthusiasm or a restatement of your resume bullets. One example carried through to its result does more work than a paragraph of adjectives, because it gives the reader something concrete to ask you about in the screen.`,
    },
    {
      title: "Keep it under 350 words on one page",
      body: `Hiring managers spend well under a minute on a cover letter before deciding whether to open the resume. A tight, well-structured letter signals communication skill directly, and in ${roleName} roles that judgement carries over into how they imagine you writing docs, updates and client communication.`,
    },
    {
      title: "Address a gap directly rather than hedging",
      body: `If you are early in your career or switching into ${roleName} work, name it and reframe it in one sentence: what you have built that maps onto the requirement, even if the title does not match. Apologising for a gap draws more attention to it than addressing it confidently does, and hedged language reads as uncertainty about your own fit.`,
    },
    {
      title: "Do not restate the resume",
      body: `The resume covers what you did. The letter covers why this role, why this company, and what the resume cannot show, a decision you made, a constraint you worked under, or the reason this particular team interests you. Duplicating bullets wastes the one document where you control the narrative.`,
    },
  ];
}

function getCoverLetterFAQs(roleName: string, content: ReturnType<typeof getRoleContent>) {
  const kws = content?.keywords ?? [];
  const angle = content?.profile.coverLetterAngle ?? "a concrete result you delivered";
  const proves = content?.profile.provesValue ?? "measurable outcomes";
  const screens = content?.profile.screeningFocus ?? "relevant experience";
  const mistake = content?.profile.commonMistakes[0] ?? "writing responsibilities instead of achievements";
  const positioning = content?.note.positioning ?? "";
  const roleScreened = content?.note.screened ?? screens;
  const employers = content?.topCompanies.slice(0, 3).join(", ") ?? "target companies";
  const salary = content?.salaryRange ?? "";
  const kwLead = kws.slice(0, 3).join(", ");
  const kwMore = kws.slice(3, 7).join(", ");

  return [
    {
      q: `What should a ${roleName} cover letter include?`,
      a: `Four components. An opening built around ${angle}. A second paragraph connecting your experience to the posting's top requirement in its own language, for ${roleName} roles that usually means terms like ${kwLead}. A third showing you understand what makes this company different. Then a short, direct close. Total length 250 to 350 words. ${positioning} Because reviewers are specifically looking for ${roleScreened}, the letter's job is to establish that in the first two sentences rather than build to it.`,
    },
    {
      q: `How long should a ${roleName} cover letter be?`,
      a: `One page, 250 to 350 words. Hiring managers reviewing ${roleName} applications spend well under a minute on the letter before deciding whether to open the resume. In this field the letter also serves as a writing sample, so brevity is read as a signal about how you would communicate on the job. If your argument does not fit in 350 words it is not focused enough yet.`,
    },
    {
      q: `How do I write a ${roleName} cover letter with no experience?`,
      a: `Lead with what you have built rather than what you lack. For ${roleName} work, projects and coursework count when they carry a real result, pick the one closest to ${proves} and describe it the way you would describe professional work. Use the vocabulary the field actually uses (${kwMore || kwLead}) so the letter reads as someone inside the discipline. Name the gap once, in a single confident sentence, then move on.`,
    },
    {
      q: `Should I include a cover letter if it is listed as optional?`,
      a: `Yes. Optional means it gets read if you send one, and most applicants do not. For ${roleName} roles at competitive employers such as ${employers}, the applicant pool is large enough that any real differentiator matters. The only reason to skip it is if you cannot write a good one, in which case Preciprocal's cover letter generator will produce a tailored first draft you can edit.`,
    },
    {
      q: `How do I make my ${roleName} cover letter stand out?`,
      a: `Three things almost nobody does. Name a specific detail about the company that is not on their homepage. Open with ${angle} rather than your name and the role title. And mirror the posting's exact phrasing for its top requirements instead of paraphrasing, ${roleName} postings repeat a recognisable vocabulary (${kwLead}), and matching it precisely is both an ATS signal and a credibility one.`,
    },
    {
      q: `What is the biggest mistake in ${roleName} cover letters?`,
      a: `Opening with "I am writing to express my interest in the ${roleName} position." Every letter says it, so it conveys nothing. The field-specific version of the same error is ${mistake}, it is the pattern that most often gets a ${roleName} application set aside, and it is entirely avoidable by leading with a result instead of a description of duties.`,
    },
    {
      q: `Should I mention salary expectations in a ${roleName} cover letter?`,
      a: `No, unless the posting explicitly asks. Raising compensation before the employer has decided they want you weakens your position. For context, ${roleName} roles currently span roughly ${salary} depending on location, company stage and scope, useful for deciding whether to apply, but not something to put in the letter. If a form requires a number, give a range anchored to your research and note it is negotiable.`,
    },
  ];
}

// ── Layout helpers ────────────────────────────────────────────────────────────
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";
const LIST_LABEL = "mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500";

function LinkList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
      {links.map((link) => (
        <li key={link.href} className="border-b border-white/[0.05]">
          <Link href={link.href} className={`group flex items-center justify-between gap-3 py-3 text-sm text-slate-400 transition-colors hover:text-white ${FOCUS}`}>
            {link.label}
            <Chevron className="text-slate-600 group-hover:text-slate-300" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function CoverLetterExampleRolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  if (!(ALL_ROLES as readonly string[]).includes(role)) notFound();

  const meta = getRoleMeta(role);
  const display = ROLE_DISPLAY[role];
  const roleName = display?.name ?? role.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const content = getRoleContent(role);
  const sections = getCoverLetterSections(roleName, meta.topCompanies, content);
  const tips = getCoverLetterTips(roleName, content);
  const faqs = getCoverLetterFAQs(roleName, content);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${roleName} Cover Letter Example (2026)`,
    description: `Free ${roleName} cover letter example and writing guide for 2026.`,
    url: `https://preciprocal.com/cover-letter-examples/${role}`,
    image: "https://preciprocal.com/og-image-v3.png",
    datePublished: "2026-05-01",
    dateModified: "2026-05-14",
    author: {
      "@type": "Organization",
      name: "Preciprocal",
      url: "https://preciprocal.com",
    },
    publisher: { "@id": "https://preciprocal.com/#organization" },
  };

  // The role's sibling guides and the free tools, as a compact links list.
  const moreLinks = [
    { href: `/interview-questions/${role}`, label: `${roleName} interview questions` },
    { href: `/resume-tips/${role}`, label: `${roleName} resume tips` },
    { href: `/salary-guide/${role}`, label: `${roleName} salary guide` },
    { href: "/interview-question-predictor", label: "Predict your interview questions" },
    { href: "/free-ats-checker", label: "Free ATS resume checker" },
  ];
  const relatedLinks = meta.relatedRoles.map((r) => ({
    href: `/cover-letter-examples/${r}`,
    label: `${r
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")} Cover Letter`,
  }));

  return (
    <div data-accent="blue" className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Cover Letter Examples", url: "https://preciprocal.com/cover-letter-examples" },
          {
            name: `${roleName} Cover Letter`,
            url: `https://preciprocal.com/cover-letter-examples/${role}`,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Navbar />

      <main>
        <PageHero
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Cover Letter Examples", href: "/cover-letter-examples" }, { label: roleName }]}
          title={<>{roleName} Cover Letter Example (2026)</>}
          subhead={
            <p>
              A free {roleName} cover letter example, annotated template, and writing guide for 2026.
              What to include, what to avoid, and exactly how to structure a letter that gets past ATS
              and makes hiring managers keep reading.
            </p>
          }
          aside={
            <div className="flex flex-col gap-3 lg:items-end">
              <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full py-4 sm:w-auto ${FOCUS}`}>
                Write mine in 60 seconds <Chevron />
              </a>
              <p className="text-[12px] text-slate-500">5 free cover letters a month · No credit card</p>
            </div>
          }
        >
          {/* Meta strip */}
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3 fill-sm-3">
            {[
              { label: "Avg. Salary", value: meta.salaryRange, mono: true },
              { label: "Top Employers", value: meta.topCompanies.slice(0, 3).join(", "), mono: false },
              { label: "Ideal Length", value: "250-350 words", mono: true },
            ].map((item) => (
              <div key={item.label} className="relative bg-[#070b16] p-6">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent-2/50 to-transparent" />
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</dt>
                <dd className={`mt-2 text-base font-semibold text-accent-soft ${item.mono ? "font-mono tabular-nums" : ""}`}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </PageHero>

        {/* 1. The letter itself, as one document, then how each paragraph works */}
        <section id="structure" aria-label={`${roleName} cover letter structure and example`} className={`${SECTION} scroll-mt-24 ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead
                align="center"
                eyebrow="Annotated example"
                title={`${roleName} cover letter structure`}
                subtitle={`Every strong ${roleName} cover letter follows the same four-part structure.`}
              />
            </Reveal>

            <Reveal>
              <div className="mx-auto max-w-[860px] rounded-2xl bg-[#f6f4ef] px-6 py-8 sm:px-14 sm:py-14">
                {sections.map((section, i) => (
                  <div key={i} className="relative mt-7 first:mt-0">
                    <span
                      className="mb-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
                      style={{ background: section.badgeColor + "26", color: "#334155" }}
                    >
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: section.badgeColor }} />
                      {section.badge}
                    </span>
                    <p className="font-serif text-[16px] leading-[1.8] text-slate-800 sm:text-[17px]">{section.example}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <RevealGroup className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
              {sections.map((section, i) => (
                <RevealItem key={i}>
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold"
                      style={{ background: section.badgeColor + "14", borderColor: section.badgeColor + "40", color: section.badgeColor }}
                    >
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: section.badgeColor }} />
                      {section.badge}
                    </span>
                    <h3 className="text-base font-semibold text-white">{section.label}</h3>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{section.guidance}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Generate CTA */}
            <Reveal className="mt-16">
              <div className="flex flex-col gap-6 rounded-2xl border border-accent/20 bg-accent-deep/[0.05] p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-lg font-bold text-white">
                    Generate a tailored {roleName} cover letter in 60 seconds
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Paste your job description and Preciprocal&apos;s AI researches the company, matches your
                    resume to the role, and writes a personalised letter. Free to start, no credit card
                    required.
                  </p>
                </div>
                <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full shrink-0 px-6 py-3 md:w-auto`}>
                  Generate my cover letter free <Chevron />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. FAQ, collapsed */}
        <FaqSection className="scroll-mt-24" items={faqs} sectionProps={{ "id": "faq", "aria-label": `${roleName} cover letter FAQ` }} />

        {/* 3. Writing tips folded, then the related links */}
        <section className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <div id="tips" className="scroll-mt-24">
              <Fold eyebrow="Writing tips" title={`${roleName} cover letter tips`} meta={`${tips.length} tips`}>
                <ol className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="mt-0.5 shrink-0 font-mono text-[12px] text-accent-soft/80">{pad2(i + 1)}</span>
                      <div>
                        <h3 className="text-[15px] font-semibold text-slate-100">{tip.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">{tip.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Fold>
            </div>

            <div className="mt-12 space-y-10">
              <nav id="more-guides" aria-label={`More ${roleName} guides`} className="scroll-mt-24">
                <h2 className={LIST_LABEL}>More {roleName} guides</h2>
                <LinkList links={moreLinks} />
              </nav>

              {relatedLinks.length > 0 && (
                <nav id="related" aria-label="Related cover letter examples" className="scroll-mt-24">
                  <h2 className={LIST_LABEL}>Related cover letter examples</h2>
                  <LinkList links={relatedLinks} />
                </nav>
              )}

              {meta.topCompanies.length > 0 && (
                <section id="companies" aria-label={`Top companies hiring ${roleName}s`} className="scroll-mt-24">
                  <h2 className={LIST_LABEL}>Top companies hiring {roleName}s</h2>
                  <p className="mb-4 text-sm text-slate-500">
                    Tailor your cover letter for each company. Reference something specific about their product, culture, or recent work.
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {meta.topCompanies.map((company) => (
                      <li key={company} className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-sm text-slate-300">
                        {company}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section aria-label="Generate cover letter free" className={`${PAD} pb-24 pt-4`}>
          <Reveal>
            <CtaPanel
              title={<>Generate your {roleName} cover letter free</>}
              body={
                <p className="max-w-lg text-sm">
                  Paste the job description and our AI researches the company, matches your resume to the
                  role, and writes a personalised letter in under 60 seconds. 5 cover letters per month
                  free, no credit card required.
                </p>
              }
              action={
                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <a href={`${APP_URL}/sign-up`} className={BTN_PRIMARY}>
                    Generate free <Chevron />
                  </a>
                  <Link href="/cover-letter-examples" className={`${BTN_SECONDARY} ${FOCUS}`}>
                    Browse all examples
                  </Link>
                </div>
              }
            />
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
