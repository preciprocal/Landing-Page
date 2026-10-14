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
 */

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL, SITE_URL } from "@/lib/constants";
import { CONTENT_SNAPSHOTS, reportStaleContent } from "@/lib/contentFreshness";
import { OPT_GUIDES } from "@/lib/optGuides";

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
}

const LONG_DATE = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const section = "py-14 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48 border-t border-white/[0.04]";

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
    image: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 },
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

      <div className="min-h-screen bg-[#050810]">
        <Navbar />

        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="relative pt-32 pb-12 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative w-full max-w-4xl">
              {!isHub && (
                <nav className="text-[12px] text-slate-500 mb-6">
                  <Link href="/opt" className="hover:text-slate-300">OPT guides</Link>
                  <span className="mx-2">/</span>
                  <span className="text-slate-400">{props.breadcrumbName}</span>
                </nav>
              )}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[12px] text-emerald-300 font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Checked against USCIS and DHS sources on <time dateTime={checkedAt}>{checkedLabel}</time>
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
                General information from official sources, not legal advice. Your DSO and the record in SEVIS have the final
                word on your own case.
              </p>
            </div>
          </section>

          {/* ── Key facts ──────────────────────────────────────────────── */}
          <section className="pb-12 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48">
            <div className="w-full max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-3">
              {props.keyFacts.map((f) => (
                <div key={f.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                  <p className="text-xl font-extrabold text-white">{f.value}</p>
                  <p className="text-[12px] text-slate-500 mt-1 leading-snug">{f.label}</p>
                </div>
              ))}
            </div>
          </section>

          {props.tool && (
            <section className="pb-14 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48">
              <div className="w-full max-w-4xl">{props.tool}</div>
            </section>
          )}

          {/* ── Body ───────────────────────────────────────────────────── */}
          <section className={section}>
            <div className="w-full max-w-4xl space-y-6 text-slate-400 leading-relaxed [&_h2]:text-white [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:pt-6 [&_h2]:scroll-mt-28 [&_h3]:text-white [&_h3]:font-semibold [&_strong]:text-slate-200 [&_a]:text-indigo-300 [&_a]:underline [&_a]:underline-offset-2">
              {props.body}
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

          {/* ── Guide nav ──────────────────────────────────────────────── */}
          <section className={section}>
            <div className="w-full">
              <h2 className="text-lg font-semibold text-white mb-6">More OPT guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {OPT_GUIDES.filter((g) => g.href !== props.canonicalPath).map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className="block bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.15] transition-colors"
                  >
                    <p className="text-white text-sm font-semibold">{g.label}</p>
                    <p className="text-slate-500 text-[12px] mt-1 leading-snug">{g.blurb}</p>
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
