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
 */

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";

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
    <div className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Alternatives", url: "https://preciprocal.com/alternatives" },
          { name: `${competitor} Alternative`, url },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm mb-8 flex gap-2 items-center flex-wrap" style={{ color: "#64748b" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link href="/alternatives" className="hover:text-white transition-colors">Alternatives</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>{competitor} Alternative</span>
        </nav>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-5"
          style={{ background: "#1e293b", color: "#6366f1" }}
        >
          Comparison · Updated {pricingChecked}
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-5 leading-tight tracking-tight" style={{ color: "#ffffff" }}>
          The Best {competitor} Alternative in 2026
        </h1>
        <p className="text-lg mb-6 leading-relaxed max-w-3xl" style={{ color: "#94a3b8" }}>
          {intro}
        </p>
        <p className="text-lg mb-10 leading-relaxed max-w-3xl" style={{ color: "#94a3b8" }}>
          {positioning}
        </p>

        {/* Quick verdict */}
        <div className="p-6 rounded-xl border mb-12" style={{ borderColor: "#6366f1", background: "#0a0f1e" }}>
          <p className="text-sm font-semibold mb-1" style={{ color: "#6366f1" }}>Quick verdict</p>
          <p className="leading-relaxed mb-2" style={{ color: "#e2e8f0" }}>
            Choose <strong>{competitor}</strong> if {verdictTheirs}
          </p>
          <p className="leading-relaxed" style={{ color: "#e2e8f0" }}>
            Choose <strong>Preciprocal</strong> if {verdictOurs}
          </p>
        </div>

        {/* Price callout */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            { label: theirPlanLabel, price: theirPrice, note: theirPriceNote, highlight: false },
            { label: "Preciprocal Pro", price: "$9.99/mo", note: "Full job search platform", highlight: true },
          ].map(({ label, price, note, highlight }) => (
            <div
              key={label}
              className="p-6 rounded-xl border text-center"
              style={{
                borderColor: highlight ? "#6366f1" : "#1e293b",
                background: highlight ? "rgba(99,102,241,0.08)" : "#0a0f1e",
              }}
            >
              <p className="text-sm mb-2" style={{ color: "#64748b" }}>{label}</p>
              <p className="text-3xl font-extrabold mb-1" style={{ color: highlight ? "#6366f1" : "#e2e8f0" }}>{price}</p>
              <p className="text-sm" style={{ color: "#64748b" }}>{note}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <section aria-label="Feature comparison table" className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#ffffff" }}>
            Preciprocal vs {competitor}: feature comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#1e293b" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#0a0f1e", borderBottom: "1px solid #1e293b" }}>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "#64748b" }}>Feature</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "#6366f1" }}>Preciprocal</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "#64748b" }}>{competitor}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    style={{
                      background: i % 2 === 0 ? "#050810" : "#0a0f1e",
                      borderBottom: "1px solid #1e293b",
                    }}
                  >
                    <td className="px-4 py-3 font-medium" style={{ color: "#e2e8f0" }}>{row.feature}</td>
                    <td className="px-4 py-3" style={{ color: "#94a3b8" }}>{row.ours}</td>
                    <td className="px-4 py-3" style={{ color: "#94a3b8" }}>{row.theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-3" style={{ color: "#475569" }}>
            Based on publicly available feature lists and pricing as of {pricingChecked}. Plans and
            prices change, so verify on {competitor}&apos;s own pricing page before deciding.
          </p>
        </section>

        {/* Reasons */}
        <section aria-label={`Why choose Preciprocal over ${competitor}`} className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#ffffff" }}>
            Why students and new grads choose Preciprocal over {competitor}
          </h2>
          <div className="space-y-4">
            {reasons.map(({ title, body }) => (
              <div key={title} className="p-5 rounded-xl border" style={{ borderColor: "#1e293b", background: "#0a0f1e" }}>
                <h3 className="font-semibold mb-2" style={{ color: "#ffffff" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section aria-label={`${competitor} alternative FAQ`} className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#ffffff" }}>
            {competitor} alternative FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <article key={q} className="rounded-xl border overflow-hidden" style={{ borderColor: "#1e293b" }}>
                <h3
                  className="font-semibold text-sm px-5 py-4"
                  style={{ color: "#ffffff", background: "#0a0f1e", borderBottom: "1px solid #1e293b" }}
                >
                  {q}
                </h3>
                <p className="text-sm px-5 py-4 leading-relaxed" style={{ color: "#94a3b8" }}>{a}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Other comparisons */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold mb-4" style={{ color: "#ffffff" }}>Compare other tools</h2>
          <Link href="/alternatives" className="text-sm font-medium hover:text-indigo-300 transition-colors" style={{ color: "#818cf8" }}>
            See all Preciprocal comparisons →
          </Link>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#ffffff" }}>Try it free before you decide</h2>
          <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: "#94a3b8" }}>
            The free plan needs no credit card, so you can compare against {competitor} with your own
            resume rather than taking anyone&apos;s word for it.
          </p>
          <a
            href={`${APP_URL}/sign-up`}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#ffffff" }}
          >
            Start free, no credit card required
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
