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
 * Layout: one flow, leading with what the reader came for. Hero with the
 * price callout beside it, the quick verdict, the feature table, the reasons
 * as an open list, the FAQ, a compact list of sibling comparisons, the CTA.
 */

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL, ALTERNATIVE_PAGES } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, BTN_PRIMARY, Breadcrumbs, SectionHead, HeroBackdrop, CtaPanel, TrustRow, FaqSection } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";
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

/**
 * The reasons to choose Preciprocal as an open two-column list (a tick, a
 * title, one paragraph), shared with the hand-built comparison pages.
 */
export function ReasonList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <RevealGroup className="grid gap-x-14 gap-y-10 md:grid-cols-2">
      {items.map(({ title, body }) => (
        <RevealItem key={title} className="flex gap-4">
          <span aria-hidden="true" className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/[0.12] text-accent-soft">
            <Check className="h-3.5 w-3.5" strokeWidth={2.75} />
          </span>
          <div>
            <h3 className="text-[16px] font-semibold text-white">{title}</h3>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-400">{body}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** A compact, ruled list of links near the end of a page ("Also useful"). */
export function LinkList({
  title,
  links,
  more,
}: {
  title: string;
  links: { label: string; href: string }[];
  more?: { label: string; href: string };
}) {
  return (
    <>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</h2>
        {more && (
          <Link href={more.href} className="text-[13px] text-slate-400 transition-colors hover:text-white">
            {more.label}
          </Link>
        )}
      </div>
      <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href} className="border-b border-white/[0.05]">
            <Link href={link.href} className="group flex items-center justify-between gap-3 py-3 text-sm text-slate-400 transition-colors hover:text-white">
              {link.label}
              <Chevron className="text-slate-600 group-hover:text-slate-300" />
            </Link>
          </li>
        ))}
      </ul>
    </>
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
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Alternatives", href: "/alternatives" }, { label: `${competitor} Alternative` }]}
        />

        {/* Hero: badge, H1, intro, with the price callout beside it */}
        <section className={`relative overflow-hidden pb-14 pt-14 sm:pt-16 ${PAD}`}>
          <HeroBackdrop />
          <div className={`relative ${INNER}`}>
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
                <div className="mt-9">
                  <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full py-4 sm:w-auto`}>
                    Try Preciprocal free <Chevron />
                  </a>
                  <TrustRow className="mt-5" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
              {/* Price callout: the price difference is half of what the reader came for */}
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Monthly price</p>
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

        {/* Quick verdict: two short answers side by side */}
        <section className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
          <div className={INNER}>
            <SectionHead align="center" eyebrow="Quick verdict" title={`Preciprocal or ${competitor}?`} />
            <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 fill-md-2">
              <RevealItem className="bg-[#070b16] p-7 sm:p-9">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{competitor}</p>
                <p className="mt-4 text-[16px] leading-relaxed text-slate-300">
                  Choose <strong className="text-white">{competitor}</strong> if {verdictTheirs}
                </p>
              </RevealItem>
              <RevealItem className="relative bg-[#0b1024] p-7 sm:p-9">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent via-accent-2 to-transparent" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft">Preciprocal</p>
                <p className="mt-4 text-[16px] leading-relaxed text-slate-200">
                  Choose <strong className="text-white">Preciprocal</strong> if {verdictOurs}
                </p>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>

        {/* Comparison table */}
        <section aria-label="Feature comparison table" className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
          <div className={INNER}>
            <SectionHead align="center" eyebrow="Side by side" title={`Preciprocal vs ${competitor}: feature comparison`} />
            <Reveal>
              {/* Scrolls sideways on small screens; from lg the wrapper stops clipping so the header row can stick under the navbar. */}
              <div className="relative overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#070b16] lg:overflow-visible">
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
            <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-relaxed text-slate-400">
              Based on publicly available feature lists and pricing as of {pricingChecked}. Plans and
              prices change, so verify on {competitor}&apos;s own pricing page before deciding.
            </p>
          </div>
        </section>

        {/* Reasons: an open list, one short paragraph each */}
        <section aria-label={`Why choose Preciprocal over ${competitor}`} className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
          <div className={INNER}>
            <SectionHead align="center" eyebrow="Why switch" title={`Why job seekers on OPT choose Preciprocal over ${competitor}`} className="mb-12" />
            <ReasonList items={reasons} />
          </div>
        </section>

        {/* FAQ as closed dropdowns. Answers stay in the HTML (native <details>), so the FAQ structured data still matches the page. */}
        <FaqSection title={`${competitor} alternative FAQ`} items={faqs} sectionProps={{ "aria-label": `${competitor} alternative FAQ` }} />

        {/* Other comparisons, as a compact list.

            Linking to siblings spreads equity between them and matches how
            people shortlist: someone reading "vs Teal" is usually weighing
            Huntr and Simplify too. Rotating by this page's own position means
            each page surfaces a different set rather than all of them pointing
            at the same few. */}
        <nav aria-label="Compare other tools" className={`pb-16 ${PAD}`}>
          <div className={INNER}>
            <LinkList
              title="Compare other tools"
              more={{ label: "See all comparisons", href: "/alternatives" }}
              links={(() => {
                const i = ALTERNATIVE_PAGES.findIndex((a) => a.slug === slug);
                const start = i === -1 ? 0 : i + 1;
                return [...ALTERNATIVE_PAGES.slice(start), ...ALTERNATIVE_PAGES.slice(0, start)]
                  .filter((a) => a.slug !== slug)
                  .slice(0, 6)
                  .map((a) => ({ label: `Preciprocal vs ${a.name}`, href: `/alternatives/${a.slug}` }));
              })()}
            />
          </div>
        </nav>

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
                  Start free <Chevron />
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
