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
function getCoverLetterSections(roleName: string, topCompanies: string[]) {
  const company = topCompanies[0] ?? "the company";
  return [
    {
      label: "Opening paragraph",
      badge: "Hook",
      badgeColor: "#6366f1",
      guidance:
        "Lead with something specific, not 'I am writing to express my interest.' Reference the company or role directly. Your first sentence determines whether the hiring manager reads the second.",
      example: `I have spent the past two years building [specific skill/project relevant to the role], and when I saw the ${roleName} opening at ${company}, it was exactly the kind of problem I have been preparing to work on. [One sentence on why this company specifically, not generic enthusiasm.]`,
    },
    {
      label: "Paragraph 2",
      badge: "Relevance",
      badgeColor: "#8b5cf6",
      guidance:
        "Connect your most relevant experience to their most important requirement. Use their language from the job description. One concrete example with a result is worth three paragraphs of general claims.",
      example: `In my role at [Company/Project], I [specific action using language from the job description] that resulted in [quantified outcome]. This is directly relevant to what you described as [specific requirement from the posting] because [connection].`,
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

function getCoverLetterTips(roleName: string) {
  return [
    {
      title: "Mirror the job description language",
      body: `ATS systems score cover letters the same way they score resumes. If the posting says 'cross-functional collaboration,' your letter should use that phrase, not 'working with different teams.' Use their exact language for the 3-4 most important requirements.`,
    },
    {
      title: "Lead with your strongest match, not your timeline",
      body: `Most cover letters waste the first paragraph on 'I am a recent graduate from X University.' Start with what you can do for them. Your education and timeline can appear later. Hiring managers read the first three lines and decide whether to continue.`,
    },
    {
      title: "One specific example beats five vague claims",
      body: `'I am a strong communicator with excellent analytical skills' tells a hiring manager nothing. 'I reduced our reporting cycle from two weeks to three days by rebuilding the data pipeline' tells them exactly what you can do. One real example with a number is worth more than a paragraph of adjectives.`,
    },
    {
      title: "Keep it to one page and under 350 words",
      body: `Hiring managers spend less than 30 seconds on a cover letter before deciding whether to read the resume. A concise, well-structured letter that gets to the point signals strong communication skills. A long letter signals the opposite.`,
    },
    {
      title: "Address the gap proactively if you are a new grad",
      body: `Do not apologise for limited experience. Reframe it: 'While I am early in my career, I have spent the past year building [specific relevant work] that directly maps to what you described.' Own your trajectory instead of hedging.`,
    },
    {
      title: "Do not repeat your resume",
      body: `Your cover letter should add context and narrative, not list the same bullet points. Use it to explain why, not what. The resume covers what you did. The cover letter covers why this role, why this company, and what you bring that the resume cannot show.`,
    },
  ];
}

function getCoverLetterFAQs(roleName: string) {
  return [
    {
      q: `What should a ${roleName} cover letter include?`,
      a: `A strong ${roleName} cover letter has four components: (1) an opening that names the specific role and leads with your strongest relevant qualification, not generic enthusiasm; (2) a paragraph connecting your most relevant experience to the job description using their exact language; (3) a paragraph showing genuine knowledge of the company and why you are interested specifically in them; and (4) a short, direct close. Total length: 250 to 350 words on one page.`,
    },
    {
      q: `How long should a ${roleName} cover letter be?`,
      a: `One page, 250 to 350 words. Hiring managers in most industries spend under 30 seconds on a cover letter initially. A concise letter that makes its case quickly is more effective than a thorough one that requires effort to read. If you cannot fit your argument in 350 words, the argument is not focused enough yet.`,
    },
    {
      q: `How do I write a ${roleName} cover letter with no experience?`,
      a: `Focus on projects, coursework, internships, and transferable skills. Be specific: a project that solved a real problem with a measurable result is more compelling than a GPA. Lead with what you have built or accomplished, not an apology for what you lack. Use the job description language to frame your experience, even if that experience comes from non-traditional sources. Explicitly state your enthusiasm for learning the parts you have not done professionally yet.`,
    },
    {
      q: `Should I include a cover letter if it is listed as optional?`,
      a: `Yes. Optional means the hiring manager will read it if you send one. Candidates who send a strong optional cover letter differentiate themselves from those who do not. The only reason not to send one is if you cannot write a good one. In that case, use Preciprocal's AI cover letter generator to produce a tailored first draft in under 60 seconds.`,
    },
    {
      q: `How do I make my ${roleName} cover letter stand out?`,
      a: `Three things that almost no candidates do: (1) Name a specific detail about the company that is not on their homepage, something from a recent blog post, product launch, or news story. (2) Open with your strongest relevant accomplishment, not your name and the role title. (3) Use the exact phrases from the job description in your second paragraph. These three things alone put you in the top 10% of applicants.`,
    },
    {
      q: `What is the biggest mistake in ${roleName} cover letters?`,
      a: `Starting with 'I am writing to express my interest in the ${roleName} position at [Company].' Every cover letter the hiring manager reads says this. It signals that you did not spend time on differentiation. Start with a specific hook: a relevant accomplishment, a specific reason you are interested in this company, or a direct statement of your strongest qualification for this role.`,
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

  const sections = getCoverLetterSections(roleName, meta.topCompanies);
  const tips = getCoverLetterTips(roleName);
  const faqs = getCoverLetterFAQs(roleName);

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