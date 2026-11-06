/**
 * components/AlternativePage.tsx
 *
 * Shared shell for the /alternatives/[competitor] comparison pages.
 *
 * The markup is taken from app/alternatives/jobscan-alternative/page.tsx, which
 * set the pattern for this section: breadcrumb, verdict box, price callout,
 * feature table, reasons, FAQ with schema, CTA. Each page supplies its own
 * copy, comparison rows and FAQs.
 *
 * NOTE: the three original pages (jobscan, resumeworded, final-round-ai) still
 * carry their own inline markup and have not been migrated onto this component.
 * They are live and indexed, so they were left alone rather than churned. If you
 * touch them, migrating is straightforward and removes ~1,000 duplicated lines.
 *
 * FAIRNESS: these pages name real competitors and quote real prices, so every
 * page states what the competitor is genuinely good at and carries a dated
 * disclaimer. Pricing moves; verify before relying on any figure here.
 *
 * Layout: hero with the price callout beside it, verdict as a two-cell ruled
 * panel, the feature table with the Preciprocal column highlighted, reasons
 * grid, FAQ beside a sticky heading, sibling comparisons, CTA panel.
 */

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL, ALTERNATIVE_PAGES } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, BTN_PRIMARY, Eyebrow, SectionHead, HeroBackdrop, CtaPanel, FaqList, pad2 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";
import CompareVisual from "@/components/page/visuals/CompareVisual";
import { Check, X } from "lucide-react";

/**
 * Comparison cells are free text. Where a cell plainly says yes or no, show a
 * mark beside it (with the same meaning in sr-only text); anything nuanced
 * ("Not a focus", a price, a limit) stays text only, so no cell claims more
 * than its words do.
 */
type Verdict = "yes" | "no" | null;
function verdictOf(text: string): Verdict {
  const t = text.trim().toLowerCase();
  if (/^(not included|not offered|none published|none\b|no\b)/.test(t)) return "no";
  if (/^(included|yes\b)/.test(t)) return "yes";
  return null;
}

function Cell({ text, ours }: { text: string; ours?: boolean }) {
  const v = verdictOf(text);
  return (
    <span className="flex items-start gap-2.5">
      {v === "yes" ? (
        <>
          <span
            aria-hidden="true"
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${ours ? "bg-accent/15 text-accent-soft" : "bg-white/[0.06] text-slate-300"}`}
          >
            <Check className="h-3 w-3" strokeWidth={2.75} />
          </span>
          <span className="sr-only">Yes: </span>
        </>
      ) : v === "no" ? (
        <>
          <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/[0.04] text-slate-500">
            <X className="h-3 w-3" strokeWidth={2.75} />
          </span>
          <span className="sr-only">No: </span>
        </>
      ) : (
        <span aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
      )}
      <span className="min-w-0">{text}</span>
    </span>
  );
}

export interface ComparisonRow {
  feature: string;
  /** What Preciprocal offers */
  ours: string;
  /** What the competitor offers */
  theirs: string;
}

export interface AlternativeFaq {
  q: string;
  a: string;
}

export interface AlternativeReason {
  title: string;
  body: string;
}

export interface AlternativePageProps {
  /** Display name, e.g. "Teal" */
  competitor: string;
  /** URL segment, e.g. "teal-alternative" */
  slug: string;
  /** Price string for the competitor, e.g. "$29/mo" */
  theirPrice: string;
  /** One-line note under their price, e.g. "Resume builder + tracker" */
  theirPriceNote: string;
  /** Label for their plan, e.g. "Teal+" */
  theirPlanLabel: string;
  /** Opening paragraph: what they do and where the gap is */
  intro: string;
  /** Second paragraph: the Preciprocal position */
  positioning: string;
  /** When to pick them, stated fairly */
  verdictTheirs: string;
  /** When to pick us */
  verdictOurs: string;
  rows: ComparisonRow[];
  reasons: AlternativeReason[];
  faqs: AlternativeFaq[];
  /** Month and year the pricing was last checked, e.g. "September 2026" */
  pricingChecked: string;
}

export default function AlternativePage({
  competitor,
  slug,
  theirPrice,
  theirPriceNote,
  theirPlanLabel,
  intro,
  positioning,
  verdictTheirs,
  verdictOurs,
  rows,
  reasons,
  faqs,
  pricingChecked,
}: AlternativePageProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const url = `https://preciprocal.com/alternatives/${slug}`;

  return (
    <div data-accent="violet" className="min-h-screen overflow-x-clip bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Alternatives", url: "https://preciprocal.com/alternatives" },
          { name: `${competitor} Alternative`, url },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />

      <main>
        {/* Hero: breadcrumb, badge, H1, intro, with the price callout beside it */}
        <section className={`relative overflow-hidden pb-14 pt-24 sm:pt-28 ${PAD}`}>
          <HeroBackdrop />
          <div className={`relative ${INNER}`}>
            <nav aria-label="Breadcrumb" className="mb-6 flex animate-fade-up flex-wrap items-center gap-2 text-[12px] text-slate-400 opacity-0">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/alternatives" className="transition-colors hover:text-white">Alternatives</Link>
              <span aria-hidden="true">›</span>
              <span className="text-slate-300">{competitor} Alternative</span>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px] xl:gap-20">
              <div className="max-w-4xl animate-fade-up opacity-0">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.08] px-3.5 py-1.5 text-[12px] font-medium text-accent-soft">
                  <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Comparison · Updated {pricingChecked}
                </div>
                <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[4rem]">
                  {`The Best ${competitor} Alternative `}
                  <span className="block bg-gradient-to-r from-accent-soft via-accent to-accent-2 bg-clip-text text-transparent">in 2026</span>
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">{intro}</p>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-400">{positioning}</p>
              </div>

              <div className="flex flex-col gap-10">
              {/* Decorative comparison sheet, wide screens only */}
              <div aria-hidden="true" className="hidden animate-fade-up px-6 opacity-0 lg:block" style={{ animationDelay: "180ms" }}>
                <CompareVisual />
              </div>

              {/* Price callout */}
              <div
                className="relative z-10 grid animate-fade-up gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] opacity-0"
                style={{ animationDelay: "120ms" }}
              >
                {[
                  { label: theirPlanLabel, price: theirPrice, note: theirPriceNote, highlight: false },
                  { label: "Preciprocal Pro", price: "$9.99/mo", note: "Full career prep platform", highlight: true },
                ].map(({ label, price, note, highlight }) => (
                  <div
                    key={label}
                    className={`relative flex items-center justify-between gap-5 p-6 ${highlight ? "bg-[#0b1024]" : "bg-[#070b16]"}`}
                  >
                    {highlight && (
                      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-accent to-accent-2" />
                    )}
                    <div className="min-w-0">
                      <p className={`text-sm font-medium ${highlight ? "text-accent-soft" : "text-slate-400"}`}>{label}</p>
                      <p className="mt-1 text-[13px] text-slate-400">{note}</p>
                    </div>
                    <p className={`shrink-0 whitespace-nowrap text-xl font-extrabold sm:text-2xl tracking-tight ${highlight ? "text-accent-soft" : "text-slate-200"}`}>
                      {price}
                    </p>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick verdict */}
        <section className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
          <div className={INNER}>
            <Eyebrow>Quick verdict</Eyebrow>
            <RevealGroup className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 fill-md-2">
              <RevealItem className="bg-[#070b16] p-7 sm:p-8">
                <p className="font-mono text-[11px] text-slate-400">{competitor}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
                  Choose <strong className="text-white">{competitor}</strong> if {verdictTheirs}
                </p>
              </RevealItem>
              <RevealItem className="relative bg-[#0b1024] p-7 sm:p-8">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent via-accent-2 to-transparent" />
                <p className="font-mono text-[11px] text-accent-soft/80">Preciprocal</p>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-200">
                  Choose <strong className="text-white">Preciprocal</strong> if {verdictOurs}
                </p>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>

        {/* Comparison table */}
        <section aria-label="Feature comparison table" className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
          <div className={INNER}>
            <SectionHead eyebrow="Side by side" title={`Preciprocal vs ${competitor}: feature comparison`} />
            <Reveal>
              {/* Scrolls sideways on small screens; from lg the wrapper stops clipping so the header row can stick under the navbar. */}
              <div className="overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#070b16] lg:overflow-visible">
                <table className="w-full min-w-[600px] border-separate border-spacing-0 text-left text-sm lg:min-w-0">
                  <caption className="sr-only">
                    Feature comparison of Preciprocal and {competitor}
                  </caption>
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="w-[28%] border-b border-white/[0.08] bg-[#070b16]/95 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 backdrop-blur lg:sticky lg:top-[calc(72px+var(--banner-h,0px))] lg:z-10 lg:rounded-tl-2xl"
                      >
                        Feature
                      </th>
                      <th
                        scope="col"
                        className="relative w-[36%] border-b border-accent/25 bg-[#0d0b1f]/95 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-soft backdrop-blur lg:sticky lg:top-[calc(72px+var(--banner-h,0px))] lg:z-10"
                      >
                        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent to-accent-2" />
                        Preciprocal
                      </th>
                      <th
                        scope="col"
                        className="w-[36%] border-b border-white/[0.08] bg-[#070b16]/95 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 backdrop-blur lg:sticky lg:top-[calc(72px+var(--banner-h,0px))] lg:z-10 lg:rounded-tr-2xl"
                      >
                        {competitor}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => {
                      const last = i === rows.length - 1;
                      const rule = last ? "" : "border-b border-white/[0.05]";
                      return (
                        <tr key={row.feature} className="group">
                          <th
                            scope="row"
                            className={`px-5 py-4 align-top font-medium text-slate-100 transition-colors group-hover:bg-white/[0.025] ${rule}`}
                          >
                            {row.feature}
                          </th>
                          <td
                            className={`relative bg-accent/[0.05] px-5 py-4 align-top text-slate-200 transition-colors group-hover:bg-accent/[0.09] ${rule}`}
                          >
                            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-accent/20" />
                            <span aria-hidden="true" className="absolute inset-y-0 right-0 w-px bg-accent/20" />
                            <Cell text={row.ours} ours />
                          </td>
                          <td className={`px-5 py-4 align-top text-slate-400 transition-colors group-hover:bg-white/[0.025] ${rule}`}>
                            <Cell text={row.theirs} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slate-400">
              Based on publicly available feature lists and pricing as of {pricingChecked}. Plans and
              prices change, so verify on {competitor}&apos;s own pricing page before deciding.
            </p>
          </div>
        </section>

        {/* Reasons */}
        <section aria-label={`Why choose Preciprocal over ${competitor}`} className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
          <div className={INNER}>
            <SectionHead eyebrow="Why switch" title={`Why students and new grads choose Preciprocal over ${competitor}`} />
            <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3 fill-sm-2 fill-lg-3">
              {reasons.map(({ title, body }, i) => (
                <RevealItem key={title} className="group relative bg-[#070b16] p-7 transition-colors duration-300 hover:bg-[#0a1020]">
                  <span className="font-mono text-[11px] text-accent-soft/70">{pad2(i + 1)}</span>
                  <h3 className="mt-4 font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:scale-x-100"
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* FAQ as closed dropdowns. Answers stay in the HTML (native <details>), so the FAQ structured data still matches the page. */}
        <section aria-label={`${competitor} alternative FAQ`} className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
          <div className={`${INNER} grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)] xl:gap-24`}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">
                {competitor} alternative FAQ
              </h2>
            </div>
            <FaqList items={faqs} />
          </div>
        </section>

        {/* Other comparisons.

            This block used to link only to the /alternatives hub, which left
            every comparison page with exactly one inbound internal link. Linking
            to siblings spreads equity between them and matches how people
            shortlist: someone reading "vs Teal" is usually weighing Huntr and
            Simplify too. Rotating by this page's own position means each page
            surfaces a different set rather than all of them pointing at the
            same few. */}
        <section className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
          <div className={INNER}>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-white">Compare other tools</h2>
              <Link href="/alternatives" className="group inline-flex items-center gap-1 text-sm font-medium text-accent-soft transition-colors hover:text-white">
                See all Preciprocal comparisons <Chevron />
              </Link>
            </div>
            <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3 fill-sm-2 fill-lg-3">
              {(() => {
                const i = ALTERNATIVE_PAGES.findIndex((a) => a.slug === slug);
                const start = i === -1 ? 0 : i + 1;
                const ordered = [
                  ...ALTERNATIVE_PAGES.slice(start),
                  ...ALTERNATIVE_PAGES.slice(0, start),
                ].filter((a) => a.slug !== slug);
                return ordered.slice(0, 6).map((a) => (
                  <RevealItem key={a.slug} className="bg-[#070b16]">
                    <Link
                      href={`/alternatives/${a.slug}`}
                      className="group flex h-full items-center justify-between gap-3 px-5 py-4 text-sm text-slate-300 transition-colors hover:bg-[#0a1020] hover:text-white focus-visible:bg-[#0a1020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/70"
                    >
                      Preciprocal vs {a.name}
                      <Chevron className="text-slate-500 group-hover:text-accent-soft" />
                    </Link>
                  </RevealItem>
                ));
              })()}
            </RevealGroup>
          </div>
        </section>

        {/* CTA */}
        <section className={`pb-24 ${PAD}`}>
          <Reveal>
            <CtaPanel
              title="Try it free before you decide"
              body={
                <p className="max-w-lg text-sm leading-relaxed">
                  The free plan needs no credit card, so you can compare against {competitor} with your own
                  resume rather than taking anyone&apos;s word for it.
                </p>
              }
              action={
                <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                  Start free, no credit card required <Chevron />
                </a>
              }
            />
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
