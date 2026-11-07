/**
 * components/RuleTrackerPage.tsx
 *
 * Shared shell for the dated immigration rule trackers (/new-h1b-rules,
 * /new-opt-rules).
 *
 * These pages target news-shaped queries ("new H-1B rules", "OPT rule change")
 * where searchers want one thing first: what is actually in force today. So the
 * page leads with a status table (in effect / blocked / proposed / unchanged),
 * then the detail, a timeline, sources, and FAQ. Every row carries its status
 * explicitly because the most common error in this space is reporting a
 * proposed or enjoined rule as if it were live.
 *
 * The "last checked" date comes from lib/contentFreshness.ts, which flags the
 * page in development once it is older than its 30 day window.
 *
 * Layout: the shared page language in components/page. The status table is a
 * ruled list; the detail sits beside a sticky contents list built from the
 * same rows on wide screens; the timeline and FAQ keep their heading in a
 * sticky left column.
 */

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PreferredSourceCallout } from "@/components/PreferredSourceBadge";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL, SITE_URL } from "@/lib/constants";
import { CONTENT_SNAPSHOTS, reportStaleContent } from "@/lib/contentFreshness";
import Chevron from "@/components/Chevron";
import { BTN_PRIMARY, CtaPanel, Eyebrow, FaqList, INNER, PAD, PageHero, SECTION, pad2 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";
import TimelineRail from "@/components/page/visuals/TimelineRail";

export type RuleStatus = "in-effect" | "blocked" | "proposed" | "unchanged";

/**
 * Status colours are semantic and stay fixed whatever the page accent. Every
 * status is also written out as text, so colour is never the only signal.
 * `pending` statuses (still moving) get a soft pulse on their dot.
 */
const STATUS_STYLE: Record<RuleStatus, { label: string; className: string; dot: string; pending: boolean }> = {
  "in-effect": { label: "In effect", className: "bg-amber-500/10 border-amber-500/30 text-amber-300", dot: "bg-amber-400", pending: false },
  blocked: { label: "Blocked by court", className: "bg-sky-500/10 border-sky-500/30 text-sky-300", dot: "bg-sky-400", pending: false },
  proposed: { label: "Proposed only", className: "bg-purple-500/10 border-purple-500/30 text-purple-300", dot: "bg-purple-400", pending: true },
  unchanged: { label: "Unchanged", className: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300", dot: "bg-emerald-400", pending: false },
};

/** A status dot; pending statuses carry a slow pulse ring (neutralised under reduced motion). */
function StatusDot({ status, className = "" }: { status: RuleStatus; className?: string }) {
  const s = STATUS_STYLE[status];
  return (
    <span aria-hidden="true" className={`relative inline-flex h-1.5 w-1.5 shrink-0 ${className}`}>
      {s.pending && (
        <span className={`absolute inset-0 rounded-full opacity-60 animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite] ${s.dot}`} />
      )}
      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${s.dot}`} />
    </span>
  );
}

export interface RuleRow {
  rule: string;
  status: RuleStatus;
  summary: string;
  /** Anchor id of the detail section below, so the table works as a contents list. */
  anchor: string;
}

export interface RuleTrackerProps {
  breadcrumbName: string;
  canonicalPath: string;
  headline: string;
  description: string;
  datePublished: string;
  h1: string;
  h1Accent: string;
  intro: string;
  rows: RuleRow[];
  /** The per-rule detail sections. Each should carry an id matching a row anchor. */
  body: React.ReactNode;
  timeline: { date: string; event: string }[];
  faqs: { q: string; a: string }[];
  sources: { label: string; href: string }[];
  relatedLinks: { label: string; href: string }[];
  ctaTool: string;
  bottomTitle: string;
  bottomBody: string;
}

const LONG_DATE = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function rulesCheckedAt(): string {
  return CONTENT_SNAPSHOTS["visa-rule-trackers"].checkedAt;
}

export function rulesCheckedLabel(): string {
  return LONG_DATE.format(new Date(`${rulesCheckedAt()}T00:00:00Z`));
}

/** Prose styles for the per-page body, which arrives as plain h2, p, ul and table markup. */
const PROSE =
  "space-y-6 text-[15px] leading-[1.75] text-slate-400 [&>h2:first-child]:pt-0 [&_h2]:scroll-mt-28 [&_h2]:pt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-white [&_h3]:font-semibold [&_h3]:text-white [&_strong]:text-slate-200 [&_a]:text-accent-soft [&_a]:underline [&_a]:decoration-accent-soft/30 [&_a]:underline-offset-4 [&_a:hover]:text-white [&_li]:marker:text-accent/60 [&_th]:font-semibold [&_th]:text-slate-200";

const H2 = "text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight";

export default function RuleTrackerPage(props: RuleTrackerProps) {
  reportStaleContent();

  const pageUrl = `${SITE_URL}${props.canonicalPath}`;
  const checkedAt = rulesCheckedAt();
  const signUpUrl = `${APP_URL}/sign-up?tool=${props.ctaTool}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: props.headline,
    description: props.description,
    url: pageUrl,
    image: { "@type": "ImageObject", url: `${SITE_URL}/og-image-v2.png`, width: 1200, height: 630 },
    datePublished: props.datePublished,
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
          { name: props.breadcrumbName, url: pageUrl },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div data-accent="amber" className="min-h-screen overflow-x-clip bg-[#050810]">
        <Navbar />

        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <PageHero
            sectionProps={{ "data-section": "hero", "data-section-name": "Hero" }}
            badge={
              <span>
                Last checked <time dateTime={checkedAt}>{rulesCheckedLabel()}</time>
              </span>
            }
            title={props.h1}
            accent={props.h1Accent}
            subhead={
              <>
                <p>{props.intro}</p>
                <p className="mt-6 border-l border-white/[0.1] pl-4 text-[12px] leading-relaxed text-slate-400">
                  A summary of public rules and court rulings, not legal advice. Confirm anything about your own case with
                  your DSO or an immigration attorney.
                </p>
                <PreferredSourceCallout
                  className="mt-6"
                  text="These rules keep changing. See our updates more often in Google's Top Stories:"
                />
              </>
            }
          >
            {/* Live status summary, counted from the rows below */}
            <ul aria-label="Status summary" className="flex flex-wrap gap-2">
              {(Object.keys(STATUS_STYLE) as RuleStatus[]).map((s) => {
                const count = props.rows.filter((r) => r.status === s).length;
                if (!count) return null;
                return (
                  <li
                    key={s}
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[12px] text-slate-300"
                  >
                    <StatusDot status={s} />
                    {STATUS_STYLE[s].label}
                    <span className="font-mono text-[11px] font-semibold text-white">{count}</span>
                  </li>
                );
              })}
            </ul>
          </PageHero>

          {/* ── Status at a glance ─────────────────────────────────────── */}
          <section data-section="status" data-section-name="Status at a glance" className={`${SECTION} ${PAD}`}>
            <div className={INNER}>
              <Eyebrow>Status at a glance</Eyebrow>
              <h2 className={`mb-10 ${H2}`}>What is in force today</h2>
              <RevealGroup className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07]">
                {props.rows.map((row, i) => {
                  const style = STATUS_STYLE[row.status];
                  return (
                    <RevealItem key={row.anchor} className="bg-[#070b16]">
                      <a
                        href={`#${row.anchor}`}
                        className="group relative grid grid-cols-1 gap-3 p-5 transition-colors duration-300 hover:bg-[#0a1020] focus-visible:bg-[#0a1020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/70 sm:p-7 lg:grid-cols-[3rem_200px_minmax(0,1fr)_auto] lg:items-start lg:gap-8"
                      >
                        <span className="hidden font-mono text-[11px] text-accent-soft/70 lg:block lg:pt-1.5">{pad2(i + 1)}</span>
                        <span
                          className={`inline-flex items-center gap-2 self-start justify-self-start shrink-0 rounded-md border px-2.5 py-1 text-[11px] font-semibold ${style.className}`}
                        >
                          <StatusDot status={row.status} />
                          {style.label}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-semibold text-white">{row.rule}</span>
                          <span className="mt-1.5 block text-sm leading-relaxed text-slate-400">{row.summary}</span>
                        </span>
                        <Chevron className="hidden text-slate-600 group-hover:text-accent-soft lg:mt-1 lg:block" />
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:scale-x-100 sm:inset-x-7"
                        />
                      </a>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </section>

          {/* ── Detail, with a sticky contents list ────────────────────── */}
          <section data-section="content" data-section-name="Rule details" className={`${SECTION} ${PAD}`}>
            <div className={`${INNER} grid grid-cols-1 gap-12 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-16`}>
              <Reveal className={`min-w-0 max-w-[920px] ${PROSE}`}>{props.body}</Reveal>

              <aside className="hidden lg:sticky lg:top-28 lg:order-first lg:block lg:self-start">
                <nav aria-label="Rules on this page" className="rounded-2xl border border-white/[0.07] bg-[#070b16] p-6">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">On this page</p>
                  <ol className="space-y-1">
                    {props.rows.map((row) => (
                      <li key={row.anchor}>
                        <a
                          href={`#${row.anchor}`}
                          className="group flex items-start gap-3 rounded-lg px-2 py-2 text-[13px] leading-snug text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                        >
                          <StatusDot status={row.status} className="mt-1.5" />
                          <span className="min-w-0 flex-1">{row.rule}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                  <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-white/[0.05] pt-4 text-[11px] text-slate-400">
                    {(Object.keys(STATUS_STYLE) as RuleStatus[]).map((s) => (
                      <li key={s} className="flex items-center gap-2">
                        <StatusDot status={s} />
                        {STATUS_STYLE[s].label}
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            </div>
          </section>

          {/* ── Timeline ───────────────────────────────────────────────── */}
          <section data-section="timeline" data-section-name="Key dates" className={`${SECTION} ${PAD}`}>
            <div className={`${INNER} grid grid-cols-1 gap-10 lg:grid-cols-[340px_minmax(0,1fr)] xl:gap-24`}>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow>Timeline</Eyebrow>
                <h2 className={H2}>Key dates</h2>
              </div>
              <TimelineRail className="min-w-0 sm:ml-2">
              <RevealGroup as="ol" className="relative min-w-0">
                {props.timeline.map((t) => (
                  <RevealItem
                    as="li"
                    key={t.date + t.event}
                    className="relative grid grid-cols-1 gap-1 pb-8 pl-6 last:pb-0 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8 sm:pl-8"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-[#050810]"
                    />
                    <p className="font-mono text-[12px] font-semibold text-accent-soft sm:pt-px">{t.date}</p>
                    <p className="text-sm leading-relaxed text-slate-400">{t.event}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
              </TimelineRail>
            </div>
          </section>

          {/* ── FAQ ─────────────────────────────────────────────────────── */}
          <section data-section="faq" data-section-name="FAQ" className={`${SECTION} ${PAD}`}>
            <div className={`${INNER} grid grid-cols-1 gap-10 lg:grid-cols-[340px_minmax(0,1fr)] xl:gap-24`}>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow>FAQ</Eyebrow>
                <h2 className={H2}>Frequently asked questions</h2>
              </div>
              <Reveal className="min-w-0">
                <FaqList items={props.faqs} />
              </Reveal>
            </div>
          </section>

          {/* ── Sources ────────────────────────────────────────────────── */}
          <section data-section="sources" data-section-name="Sources" className={`${SECTION} ${PAD}`}>
            <div className={INNER}>
              <Eyebrow>Checked against</Eyebrow>
              <h2 className="mb-8 text-lg font-semibold text-white">Sources</h2>
              <RevealGroup
                as="ol"
                className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 fill-md-2"
              >
                {props.sources.map((s, i) => (
                  <RevealItem as="li" key={s.href} className="bg-[#070b16]">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full gap-4 p-5 text-sm leading-snug text-accent-soft transition-colors hover:bg-[#0a1020] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/70"
                    >
                      <span className="mt-0.5 font-mono text-[11px] text-slate-600">{pad2(i + 1)}</span>
                      <span className="min-w-0 flex-1 break-words underline-offset-4 group-hover:underline">{s.label}</span>
                    </a>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────────────────── */}
          <section data-section="related-links" data-section-name="Related guides" className={`${SECTION} ${PAD}`}>
            <div className={INNER}>
              <Eyebrow>Keep reading</Eyebrow>
              <h2 className="mb-8 text-lg font-semibold text-white">Related guides</h2>
              <RevealGroup className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4 fill-sm-2 fill-lg-4">
                {props.relatedLinks.map((link) => (
                  <RevealItem key={link.href} className="bg-[#070b16]">
                    <Link
                      href={link.href}
                      className="group flex h-full items-center justify-between gap-4 px-5 py-4 text-sm text-slate-400 transition-colors hover:bg-[#0a1020] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/70"
                    >
                      <span className="min-w-0">{link.label}</span>
                      <Chevron className="text-slate-600 group-hover:text-accent-soft" />
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
