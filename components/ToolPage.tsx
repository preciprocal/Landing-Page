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
 * Layout: full width, with the gutter the navbar and footer use (PAD), so
 * every edge lines up with them. Section headings are left-aligned with
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
import GuideToc from "@/components/page/GuideToc";
import { PAD, INNER, BTN_PRIMARY, BTN_SECONDARY, Eyebrow, SectionHead, PageHero, FaqList, HoverRule, CtaPanel, pad2, type Accent } from "@/components/page/Layout";

import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";
import ProductHero from "@/components/ProductHero";
import type { ChapterId } from "@/lib/demoChapters";

const COUNT_WORD = ["Zero", "One", "Two", "Three", "Four", "Five", "Six"];

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
  /** The page's hue (see components/page/Layout.tsx); each tool page picks its own. */
  accent?: Accent;
  /**
   * Animated illustration of the tool, shown beside the hero text on wide
   * screens (components/page/visuals). Decorative.
   */
  visual?: React.ReactNode;
  /**
   * A chapter of the product walkthrough (lib/demoChapters.ts). When set, the
   * page opens on ProductHero instead: a full-height hero with the real
   * product preview playing that chapter. Takes precedence over `visual`.
   * Not for pages with a `tool`, where the tool itself should lead.
   */
  demo?: ChapterId;
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
   * "full" (the default) gives the tool the whole content width, for tools
   * laid out in columns. "contained" centres a bounded column, for a tool
   * that only works as a single narrow column.
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
  /**
   * No longer rendered: the closing panel now carries the shared trust row
   * (Layout TrustRow), and each tool's allowance is in the hero microcopy.
   * Kept optional so existing pages still type-check.
   */
  bottomMicrocopy?: string;
}

export default function ToolPage({
  breadcrumbName,
  canonicalPath,
  accent = "indigo",
  visual,
  demo,
  badge,
  h1,
  h1Accent,
  subhead,
  ctaTool,
  ctaLabel,
  ctaMicrocopy,
  tool,
  toolWidth = "full",
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

      <div data-accent={accent} className="min-h-screen bg-[#050810]">
        <Navbar />

        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          {demo ? (
            <ProductHero
              chapter={demo}
              sectionProps={{ "data-section": "hero", "data-section-name": "Hero" }}
              breadcrumb={[{ label: "Home", href: "/" }, { label: breadcrumbName }]}
              badge={badge}
              title={h1}
              accent={h1Accent}
              subhead={<p>{subhead}</p>}
              ctaHref={signUpUrl}
              ctaLabel={ctaLabel}
              secondary={{ href: "#how-it-works", label: "See how it works" }}
            />
          ) : (
          <PageHero
            sectionProps={{ "data-section": "hero", "data-section-name": "Hero" }}
            breadcrumb={[{ label: "Home", href: "/" }, { label: breadcrumbName }]}
            badge={badge}
            title={h1}
            accent={h1Accent}
            subhead={<p>{subhead}</p>}
            visual={visual}
            aside={
              <>
                {/* With a tool on the page, the tool is the primary action and
                    this is the quieter way in; without one, it is the CTA. */}
                <a href={signUpUrl} className={`${tool ? BTN_SECONDARY : `${BTN_PRIMARY} py-4`} w-full sm:w-auto`}>
                  {ctaLabel} <Chevron />
                </a>
                <p className="mt-3 text-[12px] text-slate-500">{ctaMicrocopy}</p>
              </>
            }
          />
          )}

          {tool && (
            <section data-section="tool" data-section-name="Interactive tool" className={`pb-20 ${PAD}`}>
              <div className={`${INNER} animate-fade-up opacity-0`} style={{ animationDelay: "200ms" }}>
                <div className={toolWidth === "full" ? "" : "mx-auto max-w-5xl"}>{tool}</div>
              </div>
            </section>
          )}

          {/* ── Feature grid ───────────────────────────────────────────── */}
          <section data-section="features" data-section-name="Features" className={`border-t border-white/[0.05] py-20 ${PAD}`}>
            <div className={INNER}>
              <SectionHead eyebrow="What you get" title={featuresTitle} subtitle={featuresSubtitle} />
              <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3 fill-sm-2 fill-lg-3">
                {features.map((item) => (
                  <RevealItem key={item.label} className="group relative bg-[#070b16] p-7 transition-colors duration-300 hover:bg-[#0a1020]">
                    <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/25 bg-accent/[0.08] text-accent-soft transition-colors group-hover:border-white/25 group-hover:text-accent">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="mt-5 text-[16px] font-semibold text-white">{item.label}</p>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-slate-400">{item.description}</p>
                    <HoverRule className="inset-x-7" />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>

          {/* ── How it works ───────────────────────────────────────────── */}
          <section id="how-it-works" data-section="how-it-works" data-section-name="How it works" className={`scroll-mt-24 border-t border-white/[0.05] py-20 ${PAD}`}>
            <div className={INNER}>
              <SectionHead eyebrow="How it works" title={`${COUNT_WORD[steps.length] ?? steps.length} steps.`} accent="Zero guesswork." />
              <RevealGroup as="ol" className="grid gap-10 sm:grid-cols-3 sm:gap-8">
                {steps.map((step, i) => (
                  <RevealItem as="li" key={step.step} className="group relative border-t border-white/[0.08] pt-6">
                    <span
                      aria-hidden="true"
                      className="absolute -top-px left-0 h-px w-16 bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-700 group-hover:w-full"
                    />
                    <p className="font-mono text-[12px] text-slate-500">Step {pad2(i + 1)}</p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.body}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>

          {/* ── SEO content body: contents and CTA on the left, the guide on the right ── */}
          <section data-section="content" data-section-name="Guide content" className={`border-t border-white/[0.05] py-20 ${PAD}`}>
            {/* Contents and the sign-up card in a sticky column on the left; the
                article fills the right. On phones the card follows the article. */}
            <div className={`${INNER} grid gap-12 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-16`}>
              <article id="guide-article" className="min-w-0 w-full">
                <Eyebrow>Guide</Eyebrow>
                <h2 className="mb-8 text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-[2.25rem]">{bodyTitle}</h2>
                {/* Each page writes its guide as paragraphs plus boxed blocks (a div
                    holding an h3 and a list, or an h3 and paragraphs). These rules
                    style that pattern in one place: a lead paragraph, and each box
                    as a key points panel with a header strip and the points in a
                    ruled grid. */}
                <div
                  className={[
                    "space-y-6 text-[17px] leading-[1.8] text-slate-400",
                    "[&>p:first-of-type]:text-[20px] [&>p:first-of-type]:leading-[1.65] [&>p:first-of-type]:text-slate-200",
                    "[&_strong]:font-semibold [&_strong]:text-white",
                    "[&>div]:!my-12 [&>div]:overflow-hidden [&>div]:!rounded-2xl [&>div]:border [&>div]:!border-white/[0.08] [&>div]:!bg-[#070b16] [&>div]:!p-0",
                    "[&>div>h3]:!mb-0 [&>div>h3]:flex [&>div>h3]:items-center [&>div>h3]:gap-3 [&>div>h3]:border-b [&>div>h3]:border-white/[0.06] [&>div>h3]:bg-white/[0.025] [&>div>h3]:px-6 [&>div>h3]:py-4 [&>div>h3]:text-[15px] [&>div>h3]:font-semibold [&>div>h3]:tracking-tight [&>div>h3]:text-white",
                    "[&>div>h3]:before:h-2 [&>div>h3]:before:w-2 [&>div>h3]:before:shrink-0 [&>div>h3]:before:rounded-full [&>div>h3]:before:bg-accent [&>div>h3]:before:content-['']",
                    "[&>div>ul]:grid [&>div>ol]:grid [&>div>ul]:!space-y-0 [&>div>ol]:!space-y-0 [&>div>ul]:gap-px [&>div>ol]:gap-px [&>div>ul]:bg-white/[0.06] [&>div>ol]:bg-white/[0.06] md:[&>div>ul]:grid-cols-2 md:[&>div>ol]:grid-cols-2",
                    "md:[&>div>ul>li:last-child:nth-child(odd)]:col-span-2 md:[&>div>ol>li:last-child:nth-child(odd)]:col-span-2",
                    "[&>div_li]:bg-[#070b16] [&>div_li]:p-5 [&>div_li]:text-[14px] [&>div_li]:leading-relaxed [&>div_li]:text-slate-300",
                    "[&>div>p]:px-6 [&>div>h3+p]:pt-5 [&>div>p:last-child]:pb-6",
                  ].join(" ")}
                >
                  {body}
                </div>
                <nav data-section="related-links" data-section-name="Related links" aria-label="Related guides" className="mt-16 border-t border-white/[0.06] pt-8">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Also useful</p>
                  <ul className="grid gap-x-8 sm:grid-cols-2">
                    {relatedLinks.map((link) => (
                      <li key={link.label} className="border-b border-white/[0.05]">
                        <Link
                          href={link.href}
                          className="group flex items-center justify-between py-3 text-sm text-slate-400 transition-colors hover:text-white"
                        >
                          {link.label}
                          <Chevron className="text-slate-600 group-hover:text-accent" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </article>

              <aside className="lg:sticky lg:top-28 lg:order-first lg:self-start">
                <div className="hidden lg:block">
                  <GuideToc articleId="guide-article" title="Overview" />
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-accent/20 lg:mt-10 bg-gradient-to-b from-accent-deep/[0.09] to-transparent p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft/90">Free account</p>
                  <p className="mt-3 text-lg font-semibold leading-snug text-white">{bottomTitle}</p>
                  <a
                    href={signUpUrl}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-bold text-white transition-all hover:brightness-110"
                  >
                    {ctaLabel} <Chevron />
                  </a>
                  <p className="mt-3 text-center text-[11px] text-slate-500">{ctaMicrocopy}</p>
                </div>
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

              <FaqList items={faqs} />
            </div>
          </section>

          {/* ── Bottom CTA ───────────────────────────────────────────── */}
          <section data-section="final-cta" data-section-name="Final CTA" className={`pb-24 pt-4 ${PAD}`}>
            <Reveal>
              <CtaPanel
                title={bottomTitle}
                body={<p>{bottomBody}</p>}
                action={
                  <a href={signUpUrl} className={`${BTN_PRIMARY} w-full px-8 py-4 text-base sm:w-auto`}>
                    {ctaLabel} <Chevron />
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
