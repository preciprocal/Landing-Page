/**
 * components/OptGuidePage.tsx
 *
 * Shared shell for the /opt guide cluster.
 *
 * These are YMYL pages: a wrong date or rule can cost a reader their status.
 * So every page carries a visible "checked against" date read from
 * lib/contentFreshness.ts, a key facts strip, a sources list of official pages
 * (USCIS, DHS Study in the States, SEVP guidance, the Federal Register, and
 * university international offices), and a "not legal advice" line. The guide
 * nav links every page in the cluster to every other one.
 *
 * Layout: reads as one flow. Hero (with the not-legal-advice line), the key
 * facts strip, the tool, then the guide in one centred reading column with its
 * sources and checked date directly under it, the FAQ, a compact list of the
 * other guides, and the CTA panel. No sidebars.
 */

import { Children, Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PreferredSourceCallout } from "@/components/PreferredSourceBadge";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL, SITE_URL } from "@/lib/constants";
import { CONTENT_SNAPSHOTS, reportStaleContent } from "@/lib/contentFreshness";
import { OPT_GUIDES } from "@/lib/optGuides";
import Chevron from "@/components/Chevron";
import { BTN_PRIMARY, CtaPanel, INNER, PAD, PageHero, SECTION, pad2, FaqSection } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

export interface OptKeyFact {
  label: string;
  value: string;
}

export interface OptGuideProps {
  breadcrumbName: string;
  canonicalPath: string;
  headline: string;
  description: string;
  h1: string;
  h1Accent: string;
  intro: string;
  keyFacts: OptKeyFact[];
  /** Optional interactive tool under the key facts. */
  tool?: React.ReactNode;
  body: React.ReactNode;
  faqs: { q: string; a: string }[];
  sources: { label: string; href: string }[];
  ctaTool: string;
  bottomTitle: string;
  bottomBody: string;
  /** Optional decorative hero illustration (hidden below lg and from assistive tech by PageHero). */
  visual?: React.ReactNode;
  /**
   * Data tools (rather than guides) replace the "checked against" badge, the
   * disclaimer and the sources heading with their own, and hide the checked
   * date: the data refreshes on its own schedule.
   */
  badge?: React.ReactNode;
  disclaimer?: React.ReactNode;
  sourcesTitle?: string;
  hideCheckedDate?: boolean;
}

const LONG_DATE = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** Prose styles for the per-page body, which arrives as plain h2, p, ul and table markup. */
const PROSE =
  "space-y-6 text-[16px] leading-[1.75] text-slate-400 [&>h2:first-child]:pt-0 [&_h2]:scroll-mt-28 [&_h2]:pt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-white [&_h3]:font-semibold [&_h3]:text-white [&_strong]:text-slate-200 [&_a]:text-accent-soft [&_a]:underline [&_a]:decoration-accent-soft/30 [&_a]:underline-offset-4 [&_a:hover]:text-white [&_li]:marker:text-accent/60 [&_th]:font-semibold [&_th]:text-slate-200";

type GuideSection = { heading: ReactElement<{ className?: string }> | null; content: ReactNode[] };

/**
 * Splits the per-page body (a fragment of h2, p, ul, div...) into sections at
 * each h2, so each one can render as a row: its heading on the left, its
 * content on the right. Anything before the first h2 becomes a section with
 * no heading. Returns null when the body is not a fragment, and the page then
 * renders it as one block.
 */
function splitSections(body: ReactNode): GuideSection[] | null {
  if (!isValidElement<{ children?: ReactNode }>(body) || body.type !== Fragment) return null;
  const sections: GuideSection[] = [];
  for (const child of Children.toArray(body.props.children)) {
    if (isValidElement<{ className?: string }>(child) && child.type === "h2") {
      sections.push({ heading: child, content: [] });
    } else {
      if (!sections.length) sections.push({ heading: null, content: [] });
      sections[sections.length - 1].content.push(child);
    }
  }
  return sections;
}

/** One row of the guide: heading left, content right on wide screens, stacked below lg. */
const ROW = "grid grid-cols-1 gap-5 border-t border-white/[0.06] py-10 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-16";
const ROW_HEAD = "scroll-mt-28 text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl";

export default function OptGuidePage(props: OptGuideProps) {
  reportStaleContent();

  const checkedAt = CONTENT_SNAPSHOTS["opt-guides"].checkedAt;
  const checkedLabel = LONG_DATE.format(new Date(`${checkedAt}T00:00:00Z`));
  const pageUrl = `${SITE_URL}${props.canonicalPath}`;
  const signUpUrl = `${APP_URL}/sign-up?tool=${props.ctaTool}`;
  const sections = splitSections(props.body);
  const isHub = props.canonicalPath === "/opt";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: props.headline,
    description: props.description,
    url: pageUrl,
    image: { "@type": "ImageObject", url: `${SITE_URL}/og-image-v3.png`, width: 1200, height: 630 },
    datePublished: "2026-10-13",
    dateModified: checkedAt,
    author: { "@type": "Organization", name: "Preciprocal Team", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: pageUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: props.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          ...(isHub ? [] : [{ name: "OPT guides", url: `${SITE_URL}/opt` }]),
          { name: props.breadcrumbName, url: pageUrl },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div data-accent="sky" className="min-h-screen overflow-x-clip bg-[#050810]">
        <Navbar />

        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <PageHero
            sectionProps={{ "data-section": "hero", "data-section-name": "Hero" }}
            breadcrumb={
              isHub
                ? [{ label: "Home", href: "/" }, { label: props.breadcrumbName }]
                : [{ label: "Home", href: "/" }, { label: "OPT guides", href: "/opt" }, { label: props.breadcrumbName }]
            }
            badge={
              props.badge ?? (
                <span>
                  Checked against USCIS and DHS sources on <time dateTime={checkedAt}>{checkedLabel}</time>
                </span>
              )
            }
            title={props.h1}
            accent={props.h1Accent}
            visual={props.visual}
            subhead={
              <>
                <p>{props.intro}</p>
                <p className="mt-6 text-[12px] leading-relaxed text-slate-500">
                  {props.disclaimer ?? (
                    <>
                      General information from official sources, not legal advice. Your DSO and the record in SEVIS have the
                      final word on your own case.
                    </>
                  )}
                </p>
              </>
            }
            aside={
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={signUpUrl} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                  Make your OPT days count <Chevron />
                </a>
                <p className="text-[12px] leading-snug text-slate-500 sm:max-w-[220px]">
                  Free plan for the job search itself: tailored resumes, tracking and mock interviews.
                </p>
              </div>
            }
          />

          {/* ── Key facts: the numbers the reader came for ─────────────── */}
          <section data-section="key-facts" data-section-name="Key facts" className={`pb-16 ${PAD}`}>
            <div className={INNER}>
              <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] lg:grid-cols-4 fill-2 fill-lg-4">
                {props.keyFacts.map((f) => (
                  <RevealItem key={f.label} className="bg-[#070b16] p-5 sm:p-7">
                    <p className="text-xl font-extrabold tracking-tight text-white sm:text-3xl">{f.value}</p>
                    <p className="mt-2 text-[12px] leading-snug text-slate-400 sm:text-[13px]">{f.label}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>

          {props.tool && (
            <section data-section="tool" data-section-name="Interactive tool" className={`pb-20 ${PAD}`}>
              <Reveal className={INNER}>
                {props.tool}
              </Reveal>
            </section>
          )}

          {/* ── The guide: each section a row (heading left, content right),
              then the sources and checked date, always visible ── */}
          <div className={`${SECTION} ${PAD}`}>
            <div className={INNER}>
              <section data-section="content" data-section-name="Guide content" className="min-w-0">
                {sections ? (
                  sections.map((sec, i) => (
                    <div key={i} className={ROW}>
                      <div>{sec.heading && cloneElement(sec.heading, { className: ROW_HEAD })}</div>
                      <div className={`min-w-0 max-w-[860px] ${PROSE}`}>{sec.content}</div>
                    </div>
                  ))
                ) : (
                  <div className={`mx-auto max-w-[860px] ${PROSE}`}>{props.body}</div>
                )}
              </section>

              <section data-section="sources" data-section-name="Sources" className={ROW}>
                <div>
                  <h2 className={ROW_HEAD}>{props.sourcesTitle ?? "Sources"}</h2>
                  {!props.hideCheckedDate && (
                    <p className="mt-2 text-sm text-slate-500">
                      Checked on <time dateTime={checkedAt}>{checkedLabel}</time>
                    </p>
                  )}
                </div>
                <div className="min-w-0 max-w-[860px]">
                  <ol className="border-t border-white/[0.05]">
                    {props.sources.map((s, i) => (
                      <li key={s.href} className="border-b border-white/[0.05]">
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex gap-3 py-3 text-sm leading-snug text-accent-soft transition-colors hover:text-white"
                        >
                          <span className="mt-0.5 font-mono text-[11px] text-slate-600">{pad2(i + 1)}</span>
                          <span className="min-w-0 flex-1 break-words underline-offset-4 group-hover:underline">{s.label}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                  <PreferredSourceCallout
                    className="mt-6"
                    text="OPT rules and USCIS processing change. Follow our updates in Google:"
                  />
                </div>
              </section>
            </div>
          </div>

          {/* ── FAQ ─────────────────────────────────────────────────────── */}
          <FaqSection items={props.faqs} sectionProps={{ "data-section": "faq", "data-section-name": "FAQ" }} />

          {/* ── More guides: a compact list (the hub lists them all in its body) ── */}
          {!isHub && (
            <nav data-section="guide-nav" data-section-name="More OPT guides" aria-label="More OPT guides" className={`pb-16 ${PAD}`}>
              <div className={INNER}>
                <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">More OPT guides</h2>
                <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                  {OPT_GUIDES.filter((g) => g.href !== props.canonicalPath).map((g) => (
                    <li key={g.href} className="border-b border-white/[0.05]">
                      <Link href={g.href} className="group flex items-center justify-between gap-3 py-3 text-sm text-slate-400 transition-colors hover:text-white">
                        {g.label}
                        <Chevron className="text-slate-600 group-hover:text-slate-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}

          {/* ── Bottom CTA ───────────────────────────────────────────── */}
          <section data-section="final-cta" data-section-name="Final CTA" className={`pb-24 pt-4 ${PAD}`}>
            <Reveal>
              <CtaPanel
                title={props.bottomTitle}
                body={<p>{props.bottomBody}</p>}
                action={
                  <a href={signUpUrl} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                    Start free <Chevron />
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
