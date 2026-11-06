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
 * Layout: the shared page language in components/page. Hero, a ruled key facts
 * strip, the tool, then the guide with its sources in a sticky aside on wide
 * screens, the FAQ accordion, the guide nav, and the CTA panel.
 */

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PreferredSourceCallout } from "@/components/PreferredSourceBadge";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL, SITE_URL } from "@/lib/constants";
import { CONTENT_SNAPSHOTS, reportStaleContent } from "@/lib/contentFreshness";
import { OPT_GUIDES } from "@/lib/optGuides";
import Chevron from "@/components/Chevron";
import { BTN_PRIMARY, CtaPanel, Eyebrow, FaqList, INNER, PAD, PageHero, SECTION, pad2 } from "@/components/page/Layout";
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
}

const LONG_DATE = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** Prose styles for the per-page body, which arrives as plain h2, p, ul and table markup. */
const PROSE =
  "space-y-6 text-[15px] leading-[1.75] text-slate-400 [&>h2:first-child]:pt-0 [&_h2]:scroll-mt-28 [&_h2]:pt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-white [&_h3]:font-semibold [&_h3]:text-white [&_strong]:text-slate-200 [&_a]:text-accent-soft [&_a]:underline [&_a]:decoration-accent-soft/30 [&_a]:underline-offset-4 [&_a:hover]:text-white [&_li]:marker:text-accent/60 [&_th]:font-semibold [&_th]:text-slate-200";

export default function OptGuidePage(props: OptGuideProps) {
  reportStaleContent();

  const checkedAt = CONTENT_SNAPSHOTS["opt-guides"].checkedAt;
  const checkedLabel = LONG_DATE.format(new Date(`${checkedAt}T00:00:00Z`));
  const pageUrl = `${SITE_URL}${props.canonicalPath}`;
  const signUpUrl = `${APP_URL}/sign-up?tool=${props.ctaTool}`;
  const isHub = props.canonicalPath === "/opt";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: props.headline,
    description: props.description,
    url: pageUrl,
    image: { "@type": "ImageObject", url: `${SITE_URL}/og-image-v2.png`, width: 1200, height: 630 },
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
              isHub ? undefined : (
                <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <Link href="/opt" className="transition-colors hover:text-slate-300">
                    OPT guides
                  </Link>
                  <span aria-hidden="true" className="text-slate-700">/</span>
                  <span className="text-slate-400">{props.breadcrumbName}</span>
                </nav>
              )
            }
            badge={
              <span>
                Checked against USCIS and DHS sources on <time dateTime={checkedAt}>{checkedLabel}</time>
              </span>
            }
            title={props.h1}
            accent={props.h1Accent}
            visual={props.visual}
            subhead={
              <>
                <p>{props.intro}</p>
                <p className="mt-6 border-l border-white/[0.1] pl-4 text-[12px] leading-relaxed text-slate-400">
                  General information from official sources, not legal advice. Your DSO and the record in SEVIS have the final
                  word on your own case.
                </p>
              </>
            }
          />

          {/* ── Key facts ──────────────────────────────────────────────── */}
          <section data-section="key-facts" data-section-name="Key facts" className={`pb-16 ${PAD}`}>
            <div className={INNER}>
              <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] lg:grid-cols-4 fill-2 fill-lg-4">
                {props.keyFacts.map((f, i) => (
                  <RevealItem
                    key={f.label}
                    className="group relative bg-[#070b16] p-5 transition-colors duration-300 hover:bg-[#0a1020] sm:p-7"
                  >
                    <span className="font-mono text-[11px] text-accent-soft/70">{pad2(i + 1)}</span>
                    <p className="mt-4 text-xl font-extrabold tracking-tight text-white sm:text-3xl">{f.value}</p>
                    <p className="mt-2 text-[12px] leading-snug text-slate-400 sm:text-[13px]">{f.label}</p>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:scale-x-100 sm:inset-x-7"
                    />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>

          {props.tool && (
            <section data-section="tool" data-section-name="Interactive tool" className={`pb-20 ${PAD}`}>
              <Reveal className={INNER}>
                <div className="max-w-5xl">{props.tool}</div>
              </Reveal>
            </section>
          )}

          {/* ── Body, with sources in a sticky aside ───────────────────── */}
          <div className={`${SECTION} ${PAD}`}>
            <div className={`${INNER} grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_340px] xl:gap-24`}>
              <section data-section="content" data-section-name="Guide content" className="min-w-0 max-w-3xl">
                <Reveal className={PROSE}>{props.body}</Reveal>
              </section>

              <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <section
                    data-section="sources"
                    data-section-name="Sources"
                    className="rounded-2xl border border-white/[0.07] bg-[#070b16] p-6"
                  >
                    <Eyebrow>Checked against</Eyebrow>
                    <h2 className="text-lg font-semibold text-white">Sources</h2>
                    <ol className="mt-4 divide-y divide-white/[0.05] border-t border-white/[0.05]">
                      {props.sources.map((s, i) => (
                        <li key={s.href}>
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
                  </section>

                  {/* ── Follow in Google ───────────────────────────────── */}
                  <section data-section="preferred-source" data-section-name="Preferred source" className="mt-6 px-1">
                    <PreferredSourceCallout
                      className="lg:flex-col lg:items-start"
                      text="OPT rules and USCIS processing change. Follow our updates in Google:"
                    />
                  </section>
                </Reveal>
              </aside>
            </div>
          </div>

          {/* ── FAQ ─────────────────────────────────────────────────────── */}
          <section data-section="faq" data-section-name="FAQ" className={`${SECTION} ${PAD}`}>
            <div className={`${INNER} grid grid-cols-1 gap-10 lg:grid-cols-[340px_minmax(0,1fr)] xl:gap-24`}>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow>FAQ</Eyebrow>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">
                  Frequently asked questions
                </h2>
              </div>
              <Reveal className="min-w-0">
                <FaqList items={props.faqs} />
              </Reveal>
            </div>
          </section>

          {/* ── Guide nav ──────────────────────────────────────────────── */}
          <section data-section="guide-nav" data-section-name="More OPT guides" className={`${SECTION} ${PAD}`}>
            <div className={INNER}>
              <Eyebrow>OPT guides</Eyebrow>
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">More OPT guides</h2>
              <RevealGroup className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3 fill-sm-2 fill-lg-3">
                {OPT_GUIDES.filter((g) => g.href !== props.canonicalPath).map((g, i) => (
                  <RevealItem key={g.href} className="bg-[#070b16]">
                    <Link
                      href={g.href}
                      className="group flex h-full items-start gap-4 p-6 transition-colors duration-300 hover:bg-[#0a1020] focus-visible:bg-[#0a1020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/70"
                    >
                      <span className="mt-0.5 font-mono text-[11px] text-accent-soft/70">{pad2(i + 1)}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-white">{g.label}</span>
                        <span className="mt-1.5 block text-[13px] leading-snug text-slate-400">{g.blurb}</span>
                      </span>
                      <Chevron className="mt-0.5 text-slate-600 group-hover:text-accent-soft" />
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>

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
                note="Free plan · .edu email gets 1 month of Pro free"
              />
            </Reveal>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
