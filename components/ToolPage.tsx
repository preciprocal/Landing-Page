/**
 * components/ToolPage.tsx
 *
 * Shared shell for the product/tool landing pages.
 *
 * The markup here is lifted directly from app/free-ats-checker/page.tsx, which
 * was the first of these pages and set the pattern. Every tool page renders the
 * same sections in the same order, hero, feature grid, how-it-works, SEO prose
 * body, FAQ with JSON-LD, internal links, bottom CTA, and differs only in its
 * copy. Keeping the shell here means a layout fix lands on all of them at once,
 * while each page.tsx still owns its own metadata, keywords, and body content.
 *
 * Each page supplies its own <Metadata> export and BreadcrumbJsonLd name; the
 * unique prose is what these pages rank on, so it deliberately lives per-page.
 */

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";

export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolFeature {
  label: string;
  description: string;
}

export interface ToolStep {
  step: string;
  title: string;
  body: string;
}

export interface ToolRelatedLink {
  label: string;
  href: string;
}

export interface ToolPageProps {
  /** Breadcrumb label and canonical path, e.g. "LinkedIn Optimizer" + "/linkedin-profile-optimizer" */
  breadcrumbName: string;
  canonicalPath: string;
  /** Pill above the H1 */
  badge: string;
  /** H1 renders as two lines: plain text, then a gradient accent line */
  h1: string;
  h1Accent: string;
  subhead: string;
  /** Appended to the sign-up URL as ?tool=, so app-side onboarding can branch */
  ctaTool: string;
  ctaLabel: string;
  ctaMicrocopy: string;
  featuresTitle: string;
  featuresSubtitle: string;
  features: ToolFeature[];
  steps: ToolStep[];
  bodyTitle: string;
  /** The long-form SEO prose. Per-page, because this is what actually ranks. */
  body: React.ReactNode;
  faqTitle: string;
  faqs: ToolFaq[];
  relatedLinks: ToolRelatedLink[];
  bottomTitle: string;
  bottomBody: string;
  bottomMicrocopy: string;
}

export default function ToolPage({
  breadcrumbName,
  canonicalPath,
  badge,
  h1,
  h1Accent,
  subhead,
  ctaTool,
  ctaLabel,
  ctaMicrocopy,
  featuresTitle,
  featuresSubtitle,
  features,
  steps,
  bodyTitle,
  body,
  faqTitle,
  faqs,
  relatedLinks,
  bottomTitle,
  bottomBody,
  bottomMicrocopy,
}: ToolPageProps) {
  const signUpUrl = `${APP_URL}/sign-up?tool=${ctaTool}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: breadcrumbName, url: `https://preciprocal.com${canonicalPath}` },
        ]}
      />

      <div className="min-h-screen bg-[#050810]">
        <Navbar />

        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[12px] text-emerald-300 font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {badge}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                {h1}
                <br />
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {h1Accent}
                </span>
              </h1>

              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                {subhead}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href={signUpUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl text-base transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)]"
                >
                  {ctaLabel} →
                </a>
                <p className="text-[12px] text-slate-500">{ctaMicrocopy}</p>
              </div>
            </div>
          </section>

          {/* ── Feature grid ───────────────────────────────────────────── */}
          <section className="py-16 px-4 sm:px-6 border-t border-white/[0.04]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-4">
                {featuresTitle}
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
                {featuresSubtitle}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center mb-3">
                      <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                    <p className="text-slate-500 text-[12px] leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── How it works ───────────────────────────────────────────── */}
          <section className="py-16 px-4 sm:px-6 border-t border-white/[0.04]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-12">
                How it works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {steps.map((step) => (
                  <div key={step.step} className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SEO content body ───────────────────────────────────────── */}
          <section className="py-16 px-4 sm:px-6 border-t border-white/[0.04]">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
                {bodyTitle}
              </h2>
              <div className="space-y-6 text-slate-400 leading-relaxed">{body}</div>
            </div>
          </section>

          {/* ── FAQ ─────────────────────────────────────────────────────── */}
          <section className="py-16 px-4 sm:px-6 border-t border-white/[0.04]">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-10 text-center">
                {faqTitle}
              </h2>

              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: faqs.map(({ q, a }) => ({
                      "@type": "Question",
                      name: q,
                      acceptedAnswer: { "@type": "Answer", text: a },
                    })),
                  }),
                }}
              />

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <article key={i} className="border border-white/[0.07] rounded-xl overflow-hidden">
                    <h3 className="text-white font-semibold text-sm px-5 py-4 bg-white/[0.03] border-b border-white/[0.05]">
                      {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm px-5 py-4 leading-relaxed">{faq.a}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────────────────── */}
          <section className="py-12 px-4 sm:px-6 border-t border-white/[0.04]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-lg font-semibold text-white mb-6">Also useful for your job search</h2>
              <div className="flex flex-wrap gap-3">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.label}
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
          <section className="py-20 px-4 sm:px-6 text-center border-t border-white/[0.04]">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{bottomTitle}</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8">{bottomBody}</p>
            <a
              href={signUpUrl}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl text-base hover:opacity-90 transition-opacity"
            >
              {ctaLabel} →
            </a>
            <p className="text-[12px] text-slate-600 mt-4">{bottomMicrocopy}</p>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
