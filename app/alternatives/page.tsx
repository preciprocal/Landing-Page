/**
 * app/alternatives/page.tsx
 *
 * Hub for the comparison pages.
 *
 * This route did not exist previously, even though every comparison page's
 * BreadcrumbJsonLd already pointed at https://preciprocal.com/alternatives.
 * That meant the breadcrumb schema referenced a 404 and the comparison pages
 * had no parent to link them together.
 *
 * Targets: "Preciprocal alternatives", "best job search tool comparison",
 * "AI resume tool comparison".
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Job Search Tool Comparisons: 12 Tools Compared",
  description:
    "Honest comparisons of Preciprocal against Jobscan, Teal, Rezi, Huntr, Enhancv, Kickresume, Careerflow, Big Interview, interviewing.io, Simplify, Resume Worded and Final Round AI. Pricing checked September 2026.",
  keywords: [
    "job search tool comparison",
    "best resume tool 2026",
    "AI resume builder comparison",
    "mock interview tool comparison",
    "Jobscan vs Teal",
    "job search tool alternatives",
    "cheapest resume ATS checker",
  ],
  alternates: { canonical: "https://preciprocal.com/alternatives" },
  openGraph: {
    title: "Job Search Tool Comparisons: 12 Tools Compared (2026)",
    description:
      "Honest comparisons against the 12 tools people evaluate alongside Preciprocal, with current pricing.",
    url: "https://preciprocal.com/alternatives",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
};

/**
 * Grouped by what each tool is primarily for, since that is how people actually
 * shortlist. Prices are the competitor's headline monthly rate as checked in
 * September 2026, shown so the hub is useful on its own rather than just a
 * list of links.
 */
const GROUPS = [
  {
    group: "Resume and ATS tools",
    items: [
      { name: "Jobscan", slug: "jobscan-alternative", price: "$49.95/mo", note: "ATS scanning specialist" },
      { name: "Rezi", slug: "rezi-alternative", price: "$29/mo", note: "ATS-first resume builder" },
      { name: "Enhancv", slug: "enhancv-alternative", price: "$14.99/mo", note: "Design-led resume builder" },
      { name: "Kickresume", slug: "kickresume-alternative", price: "$24/mo", note: "Template library" },
      { name: "Resume Worded", slug: "resumeworded-alternative", price: "See page", note: "Resume and LinkedIn scoring" },
    ],
  },
  {
    group: "Trackers and application tools",
    items: [
      { name: "Teal", slug: "teal-alternative", price: "$29/mo", note: "Resume builder and tracker" },
      { name: "Huntr", slug: "huntr-alternative", price: "$40/mo", note: "Tracker with a generous free tier" },
      { name: "Simplify", slug: "simplify-alternative", price: "$39.99/mo", note: "Free application autofill" },
      { name: "Careerflow", slug: "careerflow-alternative", price: "$23.99/mo", note: "LinkedIn optimisation" },
    ],
  },
  {
    group: "Interview preparation",
    items: [
      { name: "Big Interview", slug: "big-interview-alternative", price: "$39/mo", note: "Structured video curriculum" },
      { name: "interviewing.io", slug: "interviewing-io-alternative", price: "~$179+/session", note: "Human FAANG engineers" },
      { name: "Final Round AI", slug: "final-round-ai-alternative", price: "See page", note: "AI interview assistant" },
    ],
  },
];

export default function AlternativesIndexPage() {
  const total = GROUPS.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Alternatives", url: "https://preciprocal.com/alternatives" },
        ]}
      />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <nav aria-label="Breadcrumb" className="text-sm mb-8 flex gap-2 items-center" style={{ color: "#64748b" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>Alternatives</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold mb-5 leading-tight tracking-tight" style={{ color: "#ffffff" }}>
          Job search tool comparisons
        </h1>
        <p className="text-lg mb-4 leading-relaxed max-w-3xl" style={{ color: "#94a3b8" }}>
          Honest comparisons against the {total} tools people most often evaluate alongside
          Preciprocal. Each page states what the other tool is genuinely better at, because a
          comparison that never concedes anything is not worth reading.
        </p>
        <p className="text-sm mb-12" style={{ color: "#475569" }}>
          Pricing checked September 2026. Plans change often, so verify on each tool&apos;s own page.
        </p>

        <div className="space-y-12">
          {GROUPS.map(({ group, items }) => (
            <section key={group}>
              <h2
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.75rem" }}
              >
                {group} · {items.length}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map(({ name, slug, price, note }) => (
                  <Link
                    key={slug}
                    href={`/alternatives/${slug}`}
                    className="group flex items-start justify-between gap-3 p-4 rounded-xl border transition-all"
                    style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sm group-hover:text-indigo-300 transition-colors" style={{ color: "#e2e8f0" }}>
                        Preciprocal vs {name}
                      </p>
                      <p className="text-[11px] mt-0.5" style={{ color: "#475569" }}>{note}</p>
                    </div>
                    <span className="text-[11px] flex-shrink-0 whitespace-nowrap" style={{ color: "#64748b" }}>{price}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-2xl border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
          <h2 className="font-semibold mb-2" style={{ color: "#ffffff" }}>How we write these</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "#94a3b8" }}>
            Every comparison names what the other tool does better and says plainly when you should
            use it instead, including when the answer is their free tier rather than our paid one.
            Prices come from public pricing pages where they exist, and from third-party reporting
            where they do not, which is noted on the page.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            Preciprocal Pro is $9.99/mo, or $7.49/mo billed annually. The free plan needs no card,
            so the fastest way to judge any of this is to run your own resume through both.
          </p>
        </div>

        <div className="mt-10 text-center">
          <a
            href={`${APP_URL}/sign-up`}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#ffffff" }}
          >
            Compare it yourself, free
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
