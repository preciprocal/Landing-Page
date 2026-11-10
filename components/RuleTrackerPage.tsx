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
 * Layout: one flow. Hero, then the status list: every rule with its status
 * and summary, each row opening to that rule's full detail (split out of the
 * body at its h2 anchor). Then the FAQ, the key dates folded into a panel,
 * the sources (visible, with the checked date), related links, and the CTA.
 */

import { Children, Fragment, isValidElement } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PreferredSourceCallout } from "@/components/PreferredSourceBadge";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL, SITE_URL } from "@/lib/constants";
import { CONTENT_SNAPSHOTS, reportStaleContent } from "@/lib/contentFreshness";
import Chevron from "@/components/Chevron";
import { BTN_PRIMARY, CtaPanel, Eyebrow, FaqList, Fold, INNER, PAD, PageHero, SECTION, SectionHead, pad2 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

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

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/**
 * Reads the sortable start of a free-text timeline date ("March 4 to 19, 2026",
 * "August 2026", "March 2027 (expected)") as YYYY-MM-DD, or null when it names
 * no year ("Final rule + 60 days"). Only used to place the Today marker.
 */
function dateKey(text: string): string | null {
  const year = text.match(/\b(20\d{2})\b/)?.[1];
  if (!year) return null;
  const lower = text.toLowerCase();
  const m = MONTHS.findIndex((name) => lower.includes(name));
  const day = m >= 0 ? lower.slice(lower.indexOf(MONTHS[m]) + MONTHS[m].length).match(/^\s+(\d{1,2})\b/)?.[1] : undefined;
  return `${year}-${String(m >= 0 ? m + 1 : 1).padStart(2, "0")}-${String(day ?? 1).padStart(2, "0")}`;
}

/**
 * Key dates, grouped by year under a heading, with a Today marker at the
 * date the page was last checked. Events up to that date have a filled dot;
 * later or undated ones have a hollow dot and an Upcoming tag. The year
 * heading carries the year, so each row shows the date without it.
 */
function KeyDates({ items, checkedAt, checkedLabel }: { items: { date: string; event: string }[]; checkedAt: string; checkedLabel: string }) {
  type Row = { date: string; event: string; upcoming: boolean };
  const groups: { label: string; rows: Row[] }[] = [];
  for (const it of items) {
    const key = dateKey(it.date);
    const label = key ? key.slice(0, 4) : "When finalised";
    const shown = key ? it.date.replace(`, ${label}`, "").replace(` ${label}`, "").trim() : it.date;
    let g = groups[groups.length - 1];
    if (!g || g.label !== label) groups.push((g = { label, rows: [] }));
    g.rows.push({ date: shown, event: it.event, upcoming: !key || key > checkedAt });
  }
  const firstUpcoming = groups.flatMap((g) => g.rows).find((r) => r.upcoming);

  return (
    <div className="min-w-0 space-y-10">
      {groups.map((g) => (
        <section key={g.label} aria-label={g.label}>
          <div className="mb-4 flex items-center gap-4">
            <h3 className="font-mono text-sm font-semibold tracking-wider text-white">{g.label}</h3>
            <span aria-hidden="true" className="h-px flex-1 bg-white/[0.07]" />
            <span className="text-[11px] text-slate-500">
              {g.rows.length} {g.rows.length === 1 ? "date" : "dates"}
            </span>
          </div>
          <RevealGroup as="ol" className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070b16]">
            {g.rows.map((r) => (
              <RevealItem as="li" key={r.date + r.event} className="border-t border-white/[0.05] first:border-t-0">
                {r === firstUpcoming && (
                  <div className="flex items-center gap-3 border-b border-accent/20 bg-accent/[0.06] px-5 py-2.5 sm:px-6">
                    <span aria-hidden="true" className="relative flex h-2 w-2">
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-soft">Today</span>
                    <span className="text-[12px] text-slate-400">as of {checkedLabel}</span>
                  </div>
                )}
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-1 px-5 py-4 sm:grid-cols-[auto_200px_minmax(0,1fr)_auto] sm:gap-x-6 sm:px-6">
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 h-2.5 w-2.5 rounded-full ${r.upcoming ? "border-2 border-accent/70" : "bg-accent"}`}
                  />
                  <p className={`text-[14px] font-semibold ${r.upcoming ? "text-slate-300" : "text-white"}`}>{r.date}</p>
                  <p className="col-start-2 text-[14px] leading-relaxed text-slate-400 sm:col-start-auto">{r.event}</p>
                  {r.upcoming ? (
                    <span className="col-start-2 justify-self-start rounded-md border border-accent/25 bg-accent/[0.08] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-soft sm:col-start-auto sm:mt-0.5">
                      Upcoming
                    </span>
                  ) : (
                    <span className="sr-only">Happened</span>
                  )}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      ))}
    </div>
  );
}

/** Prose styles for the per-page body, which arrives as plain h2, p, ul and table markup. */
const PROSE =
  "space-y-6 text-[15px] leading-[1.75] text-slate-400 [&>h2:first-child]:pt-0 [&_h2]:scroll-mt-28 [&_h2]:pt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-white [&_h3]:font-semibold [&_h3]:text-white [&_strong]:text-slate-200 [&_a]:text-accent-soft [&_a]:underline [&_a]:decoration-accent-soft/30 [&_a]:underline-offset-4 [&_a:hover]:text-white [&_li]:marker:text-accent/60 [&_th]:font-semibold [&_th]:text-slate-200";

/**
 * Splits the per-page body into one chunk per rule: each chunk starts at the
 * h2 whose id matches a row anchor and runs to the next one. Returns null
 * when the body does not follow that shape, and the page then shows the body
 * as one block under the status list instead.
 */
function splitByRule(body: React.ReactNode, rows: RuleRow[]): Record<string, React.ReactNode[]> | null {
  if (!isValidElement<{ children?: React.ReactNode }>(body) || body.type !== Fragment) return null;
  const anchors = new Set(rows.map((r) => r.anchor));
  const out: Record<string, React.ReactNode[]> = {};
  let current: string | null = null;
  for (const child of Children.toArray(body.props.children)) {
    if (isValidElement<{ id?: string; children?: React.ReactNode }>(child) && child.type === "h2" && child.props.id && anchors.has(child.props.id)) {
      current = child.props.id;
      // The anchor id moves to the row; the heading keeps its words, one level down.
      out[current] = [
        <h3 key={`${current}-heading`} className="!text-xl !font-bold !tracking-tight sm:!text-2xl">
          {child.props.children}
        </h3>,
      ];
      continue;
    }
    if (!current) return null;
    out[current].push(child);
  }
  return rows.every((r) => out[r.anchor]) ? out : null;
}

const H2 = "text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight";

export default function RuleTrackerPage(props: RuleTrackerProps) {
  reportStaleContent();

  const pageUrl = `${SITE_URL}${props.canonicalPath}`;
  const checkedAt = rulesCheckedAt();
  const signUpUrl = `${APP_URL}/sign-up?tool=${props.ctaTool}`;
  const details = splitByRule(props.body, props.rows);

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
            breadcrumb={[{ label: "Home", href: "/" }, { label: props.breadcrumbName }]}
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
              </>
            }
            aside={
              <PreferredSourceCallout
                className="lg:max-w-xs lg:flex-col lg:items-end"
                text="These rules keep changing. See our updates more often in Google's Top Stories:"
              />
            }
          />

          {/* ── Status: every rule, its status and the short answer. Each row
              opens to the full detail for that rule, so the page reads as one
              scannable list. The detail stays in the HTML (native <details>),
              and the row carries the anchor id, so #links still land on it. ── */}
          <section data-section="status" data-section-name="Status at a glance" className={`${SECTION} ${PAD}`}>
            <div className={INNER}>
              <SectionHead align="center" eyebrow="Status at a glance" title="What is in force today" className="mb-6" />

              <ul aria-label="Status summary" className="mb-10 flex flex-wrap justify-center gap-2">
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

              {details ? (
                <div data-section="content" data-section-name="Rule details" className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070b16]">
                  {props.rows.map((row, i) => {
                    const style = STATUS_STYLE[row.status];
                    return (
                      <details key={row.anchor} id={row.anchor} className="group scroll-mt-28 border-t border-white/[0.06] first:border-t-0">
                        <summary className="grid cursor-pointer list-none grid-cols-1 gap-3 p-5 transition-colors hover:bg-white/[0.02] sm:p-7 lg:grid-cols-[3rem_200px_minmax(0,1fr)_auto] lg:items-start lg:gap-8 [&::-webkit-details-marker]:hidden">
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
                          <span className="inline-flex items-center gap-2 text-[12px] font-medium text-slate-400 lg:mt-0.5">
                            <span className="group-open:hidden">Full detail</span>
                            <span className="hidden group-open:inline">Close</span>
                            <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full border border-white/[0.12] transition-transform duration-300 group-open:rotate-180">
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </span>
                          </span>
                        </summary>
                        <div className="border-t border-white/[0.05] px-5 pb-10 pt-8 sm:px-7 lg:pl-[calc(8.75rem+200px)]">
                          <div className={`max-w-[820px] ${PROSE}`}>{details[row.anchor]}</div>
                        </div>
                      </details>
                    );
                  })}
                </div>
              ) : (
                <>
                  <ul className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070b16]">
                    {props.rows.map((row) => (
                      <li key={row.anchor} className="flex flex-col gap-3 border-t border-white/[0.06] p-5 first:border-t-0 sm:flex-row sm:items-start sm:gap-8 sm:p-7">
                        <span className={`inline-flex shrink-0 items-center gap-2 self-start rounded-md border px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[row.status].className}`}>
                          <StatusDot status={row.status} />
                          {STATUS_STYLE[row.status].label}
                        </span>
                        <a href={`#${row.anchor}`} className="min-w-0">
                          <span className="block font-semibold text-white">{row.rule}</span>
                          <span className="mt-1.5 block text-sm leading-relaxed text-slate-400">{row.summary}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div data-section="content" data-section-name="Rule details" className={`mx-auto mt-16 max-w-[860px] ${PROSE}`}>
                    {props.body}
                  </div>
                </>
              )}
            </div>
          </section>

          {/* ── FAQ ─────────────────────────────────────────────────────── */}
          <section data-section="faq" data-section-name="FAQ" className={`${SECTION} ${PAD}`}>
            <div className={`${INNER} grid grid-cols-1 gap-10 lg:grid-cols-[360px_minmax(0,1fr)] xl:gap-24`}>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow>FAQ</Eyebrow>
                <h2 className={H2}>Frequently asked questions</h2>
              </div>
              <Reveal className="min-w-0">
                <FaqList items={props.faqs} />
              </Reveal>
            </div>
          </section>

          {/* ── Key dates, folded: the sequence, for readers who want it ── */}
          <section data-section="timeline" data-section-name="Key dates" className={`border-t border-white/[0.05] pt-16 ${PAD}`}>
            <div className={INNER}>
              <Fold eyebrow="Timeline" title="Key dates" meta={`${props.timeline.length} dates, as of ${rulesCheckedLabel()}`}>
                <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-slate-400">
                  <li className="flex items-center gap-3">
                    <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent" />
                    Happened
                  </li>
                  <li className="flex items-center gap-3">
                    <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border-2 border-accent/70" />
                    Upcoming or expected
                  </li>
                </ul>
                <KeyDates items={props.timeline} checkedAt={checkedAt} checkedLabel={rulesCheckedLabel()} />
              </Fold>
            </div>
          </section>

          {/* ── Sources (always visible, with the checked date) and related links ── */}
          <section data-section="sources" data-section-name="Sources" className={`py-16 ${PAD}`}>
            <div className={`${INNER} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
              <div>
                <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Sources, checked on <time dateTime={checkedAt}>{rulesCheckedLabel()}</time>
                </h2>
                <ol>
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
              </div>
              <nav data-section="related-links" data-section-name="Related guides" aria-label="Related guides">
                <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Also useful</h2>
                <ul className="grid gap-x-10 sm:grid-cols-2">
                  {props.relatedLinks.map((link) => (
                    <li key={link.href} className="border-b border-white/[0.05]">
                      <Link href={link.href} className="group flex items-center justify-between gap-3 py-3 text-sm text-slate-400 transition-colors hover:text-white">
                        {link.label}
                        <Chevron className="text-slate-600 group-hover:text-slate-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
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
              />
            </Reveal>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
