/**
 * app/cover-letter-examples/[role]/page.tsx
 *
 * Dynamic route for role-specific cover letter example pages.
 * Targets: "cover letter example for [role]", "cover letter template [role]",
 *          "how to write a cover letter for [role]", "[role] cover letter 2026"
 *
 * Data source: lib/constants.ts (ROLE_META, ROLE_DISPLAY, ALL_ROLES)
 * Pattern: mirrors app/interview-questions/[role]/page.tsx
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
import { getRoleContent } from "@/lib/roleContent";

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
  if (!ALL_ROLES.includes(role as any)) return {};

  const meta = getRoleMeta(role);
  const display = ROLE_DISPLAY[role];
  const roleName = display?.name ?? role.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const canonical = `https://preciprocal.com/cover-letter-examples/${role}`;

  const title = `${roleName} Cover Letter Example (2026) | Preciprocal`;
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
      images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
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
      badgeColor: "#6366f1",
      guidance: `Lead with something specific, not 'I am writing to express my interest.' For ${roleName} roles the strongest opening establishes ${proves} immediately. Your first sentence determines whether the hiring manager reads the second.`,
      example: `I have spent the past two years working on ${k1} and ${k2}, and when I saw the ${roleName} opening at ${company}, it was exactly the kind of problem I have been preparing to work on. [One sentence on why this company specifically, not generic enthusiasm.]`,
    },
    {
      label: "Paragraph 2",
      badge: "Relevance",
      badgeColor: "#8b5cf6",
      guidance: `Connect your most relevant experience to their most important requirement, using their exact language. ${roleName} postings tend to lean on terms like ${k1}, ${k2} and ${k3} — mirror the phrasing rather than paraphrasing it. One concrete example with a result beats three paragraphs of general claims.`,
      example: `In my role at [Company/Project], I [specific action involving ${k1}] that resulted in [quantified outcome]. This is directly relevant to what you described as [specific requirement from the posting] because [connection].`,
    },
    {
      label: "Paragraph 3",
      badge: "Fit",
      badgeColor: "#a855f7",
      guidance:
        "Show you understand what makes this company different from its competitors. One specific detail about their product, culture, or recent work that genuinely interests you. Hiring managers can tell the difference between research and flattery.",
      example: `What draws me specifically to ${company} is [specific detail about their product, approach, or culture that you actually find interesting and why it connects to your work]. I have followed [relevant work/product/initiative] and believe my experience with [your relevant area] would directly contribute to that direction.`,
    },
    {
      label: "Closing paragraph",
      badge: "Close",
      badgeColor: "#ec4899",
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
      body: `A ${roleName} cover letter earns its second paragraph in the first two sentences. The strongest opening for this field is ${angle} — stated plainly, with the outcome attached. Hiring managers reading ${roleName} applications are screening for ${screens}, so leading with that is what buys you the rest of the page.`,
    },
    {
      title: "Mirror the posting's exact language",
      body: `Cover letters are parsed by the same systems that score your resume. ${roleName} postings tend to cluster around terms like ${kwSample}. If the posting uses a specific phrase, use that phrase rather than a synonym — the match is frequently literal, and the three or four most important requirements are the ones worth mirroring precisely.`,
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
      body: `The resume covers what you did. The letter covers why this role, why this company, and what the resume cannot show — a decision you made, a constraint you worked under, or the reason this particular team interests you. Duplicating bullets wastes the one document where you control the narrative.`,
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
      a: `Four components. An opening built around ${angle}. A second paragraph connecting your experience to the posting's top requirement in its own language — for ${roleName} roles that usually means terms like ${kwLead}. A third showing you understand what makes this company different. Then a short, direct close. Total length 250 to 350 words. ${positioning} Because reviewers are specifically looking for ${roleScreened}, the letter's job is to establish that in the first two sentences rather than build to it.`,
    },
    {
      q: `How long should a ${roleName} cover letter be?`,
      a: `One page, 250 to 350 words. Hiring managers reviewing ${roleName} applications spend well under a minute on the letter before deciding whether to open the resume. In this field the letter also serves as a writing sample, so brevity is read as a signal about how you would communicate on the job. If your argument does not fit in 350 words it is not focused enough yet.`,
    },
    {
      q: `How do I write a ${roleName} cover letter with no experience?`,
      a: `Lead with what you have built rather than what you lack. For ${roleName} work, projects and coursework count when they carry a real result — pick the one closest to ${proves} and describe it the way you would describe professional work. Use the vocabulary the field actually uses (${kwMore || kwLead}) so the letter reads as someone inside the discipline. Name the gap once, in a single confident sentence, then move on.`,
    },
    {
      q: `Should I include a cover letter if it is listed as optional?`,
      a: `Yes. Optional means it gets read if you send one, and most applicants do not. For ${roleName} roles at competitive employers such as ${employers}, the applicant pool is large enough that any real differentiator matters. The only reason to skip it is if you cannot write a good one — in which case Preciprocal's cover letter generator will produce a tailored first draft you can edit.`,
    },
    {
      q: `How do I make my ${roleName} cover letter stand out?`,
      a: `Three things almost nobody does. Name a specific detail about the company that is not on their homepage. Open with ${angle} rather than your name and the role title. And mirror the posting's exact phrasing for its top requirements instead of paraphrasing — ${roleName} postings repeat a recognisable vocabulary (${kwLead}), and matching it precisely is both an ATS signal and a credibility one.`,
    },
    {
      q: `What is the biggest mistake in ${roleName} cover letters?`,
      a: `Opening with "I am writing to express my interest in the ${roleName} position." Every letter says it, so it conveys nothing. The field-specific version of the same error is ${mistake} — it is the pattern that most often gets a ${roleName} application set aside, and it is entirely avoidable by leading with a result instead of a description of duties.`,
    },
    {
      q: `Should I mention salary expectations in a ${roleName} cover letter?`,
      a: `No, unless the posting explicitly asks. Raising compensation before the employer has decided they want you weakens your position. For context, ${roleName} roles currently span roughly ${salary} depending on location, company stage and scope — useful for deciding whether to apply, but not something to put in the letter. If a form requires a number, give a range anchored to your research and note it is negotiable.`,
    },
  ];
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function CoverLetterExampleRolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  if (!ALL_ROLES.includes(role as any)) notFound();

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
    image: "https://preciprocal.com/og-image.png",
    datePublished: "2026-05-01",
    dateModified: "2026-05-14",
    author: {
      "@type": "Organization",
      name: "Preciprocal",
      url: "https://preciprocal.com",
    },
    publisher: { "@id": "https://preciprocal.com/#organization" },
  };

  return (
    <div className="min-h-screen bg-[#050810]">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="text-sm mb-8 flex gap-2 items-center flex-wrap"
          style={{ color: "#64748b" }}
        >
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link href="/cover-letter-examples" className="hover:text-white transition-colors">
            Cover Letter Examples
          </Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }} className="capitalize">
            {roleName}
          </span>
        </nav>

        {/* H1 */}
        <h1
          className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight tracking-tight"
          style={{ color: "#ffffff" }}
        >
          {roleName} Cover Letter Example (2026)
        </h1>
        <p className="text-lg mb-4 leading-relaxed max-w-3xl" style={{ color: "#94a3b8" }}>
          A free {roleName} cover letter example, annotated template, and writing guide for 2026.
          What to include, what to avoid, and exactly how to structure a letter that gets past ATS
          and makes hiring managers keep reading.
        </p>

        {/* Meta strip */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { label: "Avg. Salary", value: meta.salaryRange },
            { label: "Top Employers", value: meta.topCompanies.slice(0, 3).join(", ") },
            { label: "Ideal Length", value: "250-350 words" },
          ].map((item) => (
            <div
              key={item.label}
              className="px-4 py-2 rounded-xl"
              style={{
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
            >
              <span style={{ color: "#64748b" }} className="text-xs mr-2">
                {item.label}
              </span>
              <span style={{ color: "#c4b5fd" }} className="text-sm font-semibold">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-10 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Cover letter structure */}
        <section aria-label={`${roleName} cover letter structure and example`} className="mb-14">
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#ffffff" }}>
            {roleName} cover letter structure
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: "#94a3b8" }}>
            Every strong {roleName} cover letter follows the same four-part structure. Below is
            the guidance for each section plus an example of what it looks like in practice.
          </p>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <article
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Section header */}
                <div
                  className="px-6 py-4 flex items-center gap-3"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: section.badgeColor + "20", color: section.badgeColor }}
                  >
                    {section.badge}
                  </span>
                  <h3 className="font-semibold text-base" style={{ color: "#ffffff" }}>
                    {section.label}
                  </h3>
                </div>

                <div className="px-6 py-5 space-y-4">
                  {/* Guidance */}
                  <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                    {section.guidance}
                  </p>

                  {/* Example */}
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(139,92,246,0.06)",
                      border: "1px solid rgba(139,92,246,0.15)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: "#8b5cf6" }}
                    >
                      Example
                    </p>
                    <p className="text-sm leading-relaxed italic" style={{ color: "#cbd5e1" }}>
                      {section.example}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Generate CTA */}
        <div
          className="rounded-2xl p-6 mb-14"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(236,72,153,0.1))",
            border: "1px solid rgba(139,92,246,0.25)",
          }}
        >
          <h2 className="font-bold text-lg mb-2" style={{ color: "#ffffff" }}>
            Generate a tailored {roleName} cover letter in 60 seconds
          </h2>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: "#94a3b8" }}>
            Paste your job description and Preciprocal's AI researches the company, matches your
            resume to the role, and writes a personalised letter. Free to start, no credit card
            required.
          </p>
          <a
            href={`${APP_URL}/sign-up`}
            className="inline-flex items-center gap-2 px-6 py-2.5 font-semibold rounded-xl text-sm transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              color: "#ffffff",
            }}
          >
            Generate my cover letter free →
          </a>
        </div>

        {/* Writing tips */}
        <section aria-label={`${roleName} cover letter writing tips`} className="mb-14">
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#ffffff" }}>
            {roleName} cover letter tips
          </h2>
          <p className="mb-8" style={{ color: "#94a3b8" }}>
            Six things that separate {roleName} cover letters that get callbacks from ones that
            get ignored.
          </p>
          <div className="space-y-4">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{
                    background: "rgba(139,92,246,0.15)",
                    color: "#a78bfa",
                    border: "1px solid rgba(139,92,246,0.25)",
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold mb-1.5 text-sm" style={{ color: "#e2e8f0" }}>
                    {tip.title}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                    {tip.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-links: interview questions + resume tips */}
        <section
          aria-label="Related guides"
          className="mb-14 grid sm:grid-cols-2 gap-4"
        >
          <div
            className="p-5 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h2 className="font-semibold mb-2 text-sm" style={{ color: "#ffffff" }}>
              Prepare for the interview next
            </h2>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "#64748b" }}>
              Once your cover letter gets you a callback, you need to be ready for the interview.
              Real questions, detailed answers, and AI mock interview practice.
            </p>
            <Link
              href={`/interview-questions/${role}`}
              className="text-sm font-semibold transition-colors hover:text-indigo-300"
              style={{ color: "#6366f1" }}
            >
              {roleName} interview questions →
            </Link>
          </div>

          <div
            className="p-5 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h2 className="font-semibold mb-2 text-sm" style={{ color: "#ffffff" }}>
              Fix your resume before you apply
            </h2>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "#64748b" }}>
              A strong cover letter won't save a resume that fails ATS. Check your score against
              the job description before submitting.
            </p>
            <Link
              href="/free-ats-checker"
              className="text-sm font-semibold transition-colors hover:text-indigo-300"
              style={{ color: "#6366f1" }}
            >
              Free ATS resume checker →
            </Link>
          </div>
        </section>

        {/* Top companies */}
        {meta.topCompanies.length > 0 && (
          <section
            aria-label={`Top companies hiring ${roleName}s`}
            className="mb-14"
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: "#ffffff" }}>
              Top companies hiring {roleName}s
            </h2>
            <p className="text-sm mb-5" style={{ color: "#94a3b8" }}>
              Tailor your cover letter for each company. Reference something specific about their
              product, culture, or recent work.
            </p>
            <div className="flex flex-wrap gap-2">
              {meta.topCompanies.map((company) => {
                const companySlug = company.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                return (
                  <span
                    key={company}
                    className="px-3 py-1.5 rounded-lg text-sm"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#94a3b8",
                    }}
                  >
                    {company}
                  </span>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section aria-label={`${roleName} cover letter FAQ`} className="mb-14">
          <h2 className="text-2xl font-bold mb-8" style={{ color: "#ffffff" }}>
            Frequently asked questions
          </h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <h3 className="font-semibold mb-2 text-sm" style={{ color: "#e2e8f0" }}>
                  {q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related roles */}
        {meta.relatedRoles.length > 0 && (
          <section
            aria-label="Related cover letter examples"
            className="mb-14 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <h2 className="text-xl font-bold mb-5" style={{ color: "#ffffff" }}>
              Related cover letter examples
            </h2>
            <div className="flex flex-wrap gap-3">
              {meta.relatedRoles.map((r) => (
                <Link
                  key={r}
                  href={`/cover-letter-examples/${r}`}
                  className="px-4 py-2 rounded-xl border text-sm transition-colors hover:text-white hover:border-purple-500/50"
                  style={{ color: "#94a3b8", borderColor: "rgba(255,255,255,0.1)" }}
                >
                  {r
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}{" "}
                  Cover Letter
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section
          aria-label="Generate cover letter free"
          className="text-center py-12 px-6 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#ffffff" }}>
            Generate your {roleName} cover letter free
          </h2>
          <p className="mb-8 max-w-lg mx-auto text-sm" style={{ color: "#94a3b8" }}>
            Paste the job description and our AI researches the company, matches your resume to the
            role, and writes a personalised letter in under 60 seconds. 5 cover letters per month
            free, no credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`${APP_URL}/sign-up`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
            >
              Generate free →
            </a>
            <Link
              href="/cover-letter-examples"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border transition-colors hover:border-purple-500/50"
              style={{ color: "#94a3b8", borderColor: "rgba(255,255,255,0.1)" }}
            >
              Browse all examples
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}