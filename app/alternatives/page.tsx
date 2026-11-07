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
 *
 * Layout: PageHero with category jump links, then each group as a grid of
 * comparison cards on the shared page kit (components/page), accent indigo.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, GRID_BG, CARD, BTN_PRIMARY, PageHero, HoverRule, pad2 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

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
    images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }],
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
      { name: "Enhancv", slug: "enhancv-alternative", price: "$39/mo", note: "Design-led resume builder" },
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
      { name: "Jobright", slug: "jobright-alternative", price: "$39.99/mo", note: "AI matching and autofill" },
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

/** Anchor id for a group, e.g. "Resume and ATS tools" to "group-resume-and-ats-tools". */
const groupId = (g: string) => `group-${g.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export default function AlternativesIndexPage() {
  const total = GROUPS.reduce((n, g) => n + g.items.length, 0);

  return (
    <div data-accent="indigo" className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Alternatives", url: "https://preciprocal.com/alternatives" },
        ]}
      />
      <Navbar />

      <main>
        <PageHero
          breadcrumb={
            <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span aria-hidden="true">›</span>
              <span className="text-slate-300">Alternatives</span>
            </nav>
          }
          title="Job search tool "
          accent="comparisons"
          subhead={
            <>
              <p>
                Honest comparisons against the {total} tools people most often evaluate alongside
                Preciprocal. Each page states what the other tool is genuinely better at, because a
                comparison that never concedes anything is not worth reading.
              </p>
              <p className="mt-4 text-sm text-slate-400">
                Pricing checked September 2026. Plans change often, so verify on each tool&apos;s own page.
              </p>
            </>
          }
          aside={
            <nav aria-label="Jump to a category" className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
              {GROUPS.map(({ group, items }) => (
                <a
                  key={group}
                  href={`#${groupId(group)}`}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-4 text-[13px] text-slate-300 transition-colors hover:border-accent/40 hover:text-white"
                >
                  {group}
                  <span className="font-mono text-[11px] text-accent-soft/80">{pad2(items.length)}</span>
                </a>
              ))}
            </nav>
          }
        />

        <div className={`${PAD} space-y-16 border-t border-white/[0.05] py-16 sm:py-20`}>
          {GROUPS.map(({ group, items }) => (
            <section key={group} id={groupId(group)} className={`${INNER} scroll-mt-28`}>
              <Reveal>
                <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {group} <span className="font-mono text-[12px] font-normal text-slate-500">· {items.length}</span>
                  </h2>
                </div>
              </Reveal>
              <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 fill-sm-2 fill-xl-3">
                {items.map(({ name, slug, price, note }) => (
                  <RevealItem as="li" key={slug}>
                    <Link
                      href={`/alternatives/${slug}`}
                      className={`${CARD} group relative flex h-full flex-col overflow-hidden p-6 transition-colors duration-300 hover:border-accent/30 hover:bg-white/[0.04]`}
                    >
                      <p className="font-semibold text-white transition-colors group-hover:text-accent-soft">
                        Preciprocal vs {name}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">{note}</p>
                      <div className="mt-6 flex flex-1 items-end justify-between gap-3">
                        <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[12px] text-slate-300">
                          {price}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent-soft transition-colors group-hover:text-white">
                          Compare <Chevron />
                        </span>
                      </div>
                      <HoverRule />
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            </section>
          ))}
        </div>

        <section className={`${PAD} pb-24`}>
          <Reveal className={`${INNER} relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070b16] px-7 py-10 sm:px-12 sm:py-12`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_100%_50%,black,transparent)]"
              style={GRID_BG}
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
              <div className="max-w-3xl">
                <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">How we write these</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Every comparison names what the other tool does better and says plainly when you should
                  use it instead, including when the answer is their free tier rather than our paid one.
                  Prices come from public pricing pages where they exist, and from third-party reporting
                  where they do not, which is noted on the page.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Preciprocal Pro is $9.99/mo, billed monthly. The free plan needs no card,
                  so the fastest way to judge any of this is to run your own resume through both.
                </p>
              </div>
              <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                Compare it yourself, free
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
