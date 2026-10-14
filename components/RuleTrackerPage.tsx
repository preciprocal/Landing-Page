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
 */

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL, SITE_URL } from "@/lib/constants";
import { CONTENT_SNAPSHOTS, reportStaleContent } from "@/lib/contentFreshness";

export type RuleStatus = "in-effect" | "blocked" | "proposed" | "unchanged";

const STATUS_STYLE: Record<RuleStatus, { label: string; className: string }> = {
  "in-effect": { label: "In effect", className: "bg-amber-500/10 border-amber-500/30 text-amber-300" },
  blocked: { label: "Blocked by court", className: "bg-sky-500/10 border-sky-500/30 text-sky-300" },
  proposed: { label: "Proposed only", className: "bg-purple-500/10 border-purple-500/30 text-purple-300" },
  unchanged: { label: "Unchanged", className: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" },
};

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

const section = "py-14 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48 border-t border-white/[0.04]";

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
    image: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 },
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

      <div className="min-h-screen bg-[#050810]">
        <Navbar />

        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="relative pt-32 pb-12 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative w-full max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[12px] text-emerald-300 font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Last checked <time dateTime={checkedAt}>{rulesCheckedLabel()}</time>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                {props.h1}
                <br />
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {props.h1Accent}
                </span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">{props.intro}</p>
              <p className="text-[12px] text-slate-600 mt-6">
                A summary of public rules and court rulings, not legal advice. Confirm anything about your own case with
                your DSO or an immigration attorney.
              </p>
            </div>
          </section>

          {/* ── Status at a glance ─────────────────────────────────────── */}
          <section className={section}>
            <div className="w-full max-w-4xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">What is in force today</h2>
              <div className="space-y-3">
                {props.rows.map((row) => {
                  const style = STATUS_STYLE[row.status];
                  return (
                    <a
                      key={row.anchor}
                      href={`#${row.anchor}`}
                      className="block bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <span
                          className={`self-start shrink-0 px-2.5 py-1 rounded-md border text-[11px] font-semibold ${style.className}`}
                        >
                          {style.label}
                        </span>
                        <p className="text-white font-semibold">{row.rule}</p>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{row.summary}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── Detail ─────────────────────────────────────────────────── */}
          <section className={section}>
            <div className="w-full max-w-4xl space-y-6 text-slate-400 leading-relaxed [&_h2]:text-white [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:pt-6 [&_h2]:scroll-mt-28 [&_h3]:text-white [&_h3]:font-semibold [&_strong]:text-slate-200">
              {props.body}
            </div>
          </section>

          {/* ── Timeline ───────────────────────────────────────────────── */}
          <section className={section}>
            <div className="w-full max-w-4xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">Key dates</h2>
              <ol className="border-l border-white/[0.08] ml-2 space-y-6">
                {props.timeline.map((t) => (
                  <li key={t.date + t.event} className="pl-6 relative">
                    <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-400" />
                    <p className="text-[12px] font-semibold text-indigo-300 mb-1">{t.date}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{t.event}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── FAQ ─────────────────────────────────────────────────────── */}
          <section className={section}>
            <div className="w-full max-w-4xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">Frequently asked questions</h2>
              <div className="space-y-4">
                {props.faqs.map((faq) => (
                  <article key={faq.q} className="border border-white/[0.07] rounded-xl overflow-hidden">
                    <h3 className="text-white font-semibold text-sm px-5 py-4 bg-white/[0.03] border-b border-white/[0.05]">
                      {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm px-5 py-4 leading-relaxed">{faq.a}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── Sources ────────────────────────────────────────────────── */}
          <section className={section}>
            <div className="w-full max-w-4xl">
              <h2 className="text-lg font-semibold text-white mb-4">Sources</h2>
              <ul className="space-y-2">
                {props.sources.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-300 hover:text-indigo-200 underline-offset-2 hover:underline"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────────────────── */}
          <section className="py-12 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48 border-t border-white/[0.04]">
            <div className="w-full">
              <h2 className="text-lg font-semibold text-white mb-6">Related guides</h2>
              <div className="flex flex-wrap gap-3">
                {props.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 rounded-xl border border-white/[0.08] text-slate-400 text-sm hover:text-white hover:border-white/[0.15] transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ── Bottom CTA ───────────────────────────────────────────── */}
          <section className="py-20 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48 text-center border-t border-white/[0.04]">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{props.bottomTitle}</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8">{props.bottomBody}</p>
            <a
              href={signUpUrl}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl text-base hover:opacity-90 transition-opacity"
            >
              Start free →
            </a>
            <p className="text-[12px] text-slate-600 mt-4">Free plan · .edu email gets 1 month of Pro free</p>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
