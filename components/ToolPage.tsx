/**
 * components/ToolPage.tsx
 *
 * Shared shell for the product/tool landing pages.
 *
 * Every tool page renders the same sections in the same order, hero, the tool
 * itself, feature grid, how-it-works, SEO prose body with a sticky CTA aside,
 * FAQ with JSON-LD, bottom CTA, and differs only in its copy. Keeping the
 * shell here means a layout fix lands on all of them at once, while each
 * page.tsx still owns its own metadata, keywords, and body content.
 *
 * Layout: full width, with one shared gutter (PAD) and a 1600px cap so lines
 * stay readable on very wide screens. Section headings are left-aligned with
 * a small eyebrow label, which reads as a product page rather than a stack of
 * centred blocks.
 *
 * Each page supplies its own <Metadata> export and BreadcrumbJsonLd name; the
 * unique prose is what these pages rank on, so it deliberately lives per-page.
 */

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";
import Chevron from "@/components/Chevron";

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
  /**
   * Optional interactive tool rendered directly under the hero. Free tools that
   * work without signing up are what earn links; the page still converts on
   * the CTAs around it.
   */
  tool?: React.ReactNode;
  /**
   * "full" gives the tool the whole content width, for tools laid out in
   * columns (the ATS checker). The default keeps a wide but bounded column
   * for tools designed as a single column.
   */
  toolWidth?: "full" | "contained";
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

/** The one horizontal gutter every section shares. */
const PAD = "px-5 sm:px-8 lg:px-12 xl:px-16";
const INNER = "mx-auto w-full max-w-[1600px]";

const GRID_BG = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300/90">
      <span className="h-px w-5 bg-gradient-to-r from-indigo-400 to-transparent" />
      {children}
    </p>
  );
}

function SectionHead({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{subtitle}</p>}
    </div>
  );
}

const pad2 = (n: number) => String(n).padStart(2, "0");

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
  tool,
  toolWidth = "contained",
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
          <section data-section="hero" data-section-name="Hero" className={`relative overflow-hidden pb-14 pt-24 sm:pt-28 ${PAD}`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
              style={GRID_BG}
            />
            <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/4 h-[420px] w-[620px] rounded-full bg-indigo-600/10 blur-[120px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -top-20 right-0 h-[360px] w-[480px] rounded-full bg-purple-600/[0.07] blur-[120px]" />

            <div className={`relative ${INNER}`}>
              <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
                <div className="max-w-4xl animate-fade-up opacity-0">
                  <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3.5 py-1.5 text-[12px] font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    {badge}
                  </div>
                  <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[4.25rem]">
                    {h1}
                    <span className="block bg-gradient-to-r from-indigo-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      {h1Accent}
                    </span>
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">{subhead}</p>
                </div>

                <div className="animate-fade-up opacity-0 lg:pb-2 lg:text-right" style={{ animationDelay: "120ms" }}>
                  {/* With a tool on the page, the tool is the primary action and
                      this is the quieter way in; without one, it is the CTA. */}
                  <a
                    href={signUpUrl}
                    className={
                      tool
                        ? "group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/25 hover:bg-white/[0.07] sm:w-auto"
                        : "group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-7 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)] sm:w-auto"
                    }
                  >
                    {ctaLabel} <Chevron />
                  </a>
                  <p className="mt-3 text-[12px] text-slate-500">{ctaMicrocopy}</p>
                </div>
              </div>
            </div>
          </section>

          {tool && (
            <section data-section="tool" data-section-name="Interactive tool" className={`pb-20 ${PAD}`}>
              <div className={`${INNER} animate-fade-up opacity-0`} style={{ animationDelay: "200ms" }}>
                <div className={toolWidth === "full" ? "" : "max-w-5xl"}>{tool}</div>
              </div>
            </section>
          )}

          {/* ── Feature grid ───────────────────────────────────────────── */}
          <section data-section="features" data-section-name="Features" className={`border-t border-white/[0.05] py-20 ${PAD}`}>
            <div className={INNER}>
              <SectionHead eyebrow="What you get" title={featuresTitle} subtitle={featuresSubtitle} />
              <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
                {features.map((item, i) => (
                  <div key={item.label} className="group relative bg-[#070b16] p-7 transition-colors duration-300 hover:bg-[#0a1020]">
                    <span className="font-mono text-[11px] text-indigo-300/70">{pad2(i + 1)}</span>
                    <p className="mt-4 font-semibold text-white">{item.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-indigo-400 to-purple-400 transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── How it works ───────────────────────────────────────────── */}
          <section data-section="how-it-works" data-section-name="How it works" className={`border-t border-white/[0.05] py-20 ${PAD}`}>
            <div className={INNER}>
              <SectionHead eyebrow="How it works" title={`${steps.length} steps, start to finish`} />
              <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8">
                {steps.map((step, i) => (
                  <li key={step.step} className="relative border-t border-white/[0.08] pt-6">
                    <span
                      aria-hidden="true"
                      className="absolute -top-px left-0 h-px w-16 bg-gradient-to-r from-indigo-400 to-purple-400"
                    />
                    <p className="font-mono text-[12px] text-slate-500">Step {pad2(i + 1)}</p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── SEO content body, with a sticky CTA and related links ───── */}
          <section data-section="content" data-section-name="Guide content" className={`border-t border-white/[0.05] py-20 ${PAD}`}>
            <div className={`${INNER} grid gap-14 lg:grid-cols-[minmax(0,1fr)_340px] xl:gap-24`}>
              <div className="max-w-3xl">
                <Eyebrow>Guide</Eyebrow>
                <h2 className="mb-8 text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">{bodyTitle}</h2>
                <div className="space-y-6 leading-relaxed text-slate-400">{body}</div>
              </div>

              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="relative overflow-hidden rounded-2xl border border-indigo-400/20 bg-gradient-to-b from-indigo-500/[0.08] to-transparent p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300/90">Free account</p>
                  <p className="mt-3 text-lg font-semibold leading-snug text-white">{bottomTitle}</p>
                  <a
                    href={signUpUrl}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(99,102,241,0.28)]"
                  >
                    {ctaLabel} <Chevron />
                  </a>
                  <p className="mt-3 text-center text-[11px] text-slate-500">{ctaMicrocopy}</p>
                </div>

                <nav data-section="related-links" data-section-name="Related links" aria-label="Related guides" className="mt-8">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Also useful</p>
                  <ul className="divide-y divide-white/[0.05] border-y border-white/[0.05]">
                    {relatedLinks.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group flex items-center justify-between py-3 text-sm text-slate-400 transition-colors hover:text-white"
                        >
                          {link.label}
                          <Chevron className="text-slate-600 group-hover:text-indigo-300" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            </div>
          </section>

          {/* ── FAQ ─────────────────────────────────────────────────────── */}
          <section data-section="faq" data-section-name="FAQ" className={`border-t border-white/[0.05] py-20 ${PAD}`}>
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
            <div className={`${INNER} grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)] xl:gap-24`}>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow>FAQ</Eyebrow>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">{faqTitle}</h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">
                  Something else? Email{" "}
                  <a href="mailto:support@preciprocal.com" className="text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white">
                    support@preciprocal.com
                  </a>
                  .
                </p>
              </div>

              <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                {faqs.map((faq, i) => (
                  <details key={i} className="group" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                      <h3 className="font-medium text-white transition-colors group-hover:text-indigo-100">{faq.q}</h3>
                      <span
                        aria-hidden="true"
                        className="relative mt-1 h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-45"
                      >
                        <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                        <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                      </span>
                    </summary>
                    <p className="max-w-3xl pb-6 pr-10 text-sm leading-relaxed text-slate-400">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ── Bottom CTA ───────────────────────────────────────────── */}
          <section data-section="final-cta" data-section-name="Final CTA" className={`pb-24 pt-4 ${PAD}`}>
            <div className={`${INNER} relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070b16] px-8 py-14 sm:px-14`}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_100%_50%,black,transparent)]"
                style={GRID_BG}
              />
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-1/2 h-[320px] w-[520px] -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[110px]" />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">{bottomTitle}</h2>
                  <p className="mt-3 text-slate-400">{bottomBody}</p>
                </div>
                <div className="shrink-0 lg:text-right">
                  <a
                    href={signUpUrl}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)] sm:w-auto"
                  >
                    {ctaLabel} <Chevron />
                  </a>
                  <p className="mt-3 text-[12px] text-slate-500">{bottomMicrocopy}</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
