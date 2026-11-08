"use client";

/**
 * app/faq/page.tsx
 *
 * Full FAQ page, all categories, search, structured data.
 * The landing page only shows 6 FAQs; this page shows all of them.
 *
 * Layout (accent emerald): PageHero with the search on its right, then two
 * columns on wide screens: a sticky category index on the left and the
 * questions, grouped by category, on the right. Answers use native
 * <details>, so every answer is in the server-rendered HTML.
 */

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { FAQS, FAQ_CATEGORIES, type FAQCategory } from "@/lib/constants";
import { FAQJsonLd } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chevron from "@/components/Chevron";
import { PlaceholdersAndVanishInput } from "@/components/ui/PlaceholdersAndVanishInput";
import { PAD, INNER, SECTION, GRID_BG, BTN_PRIMARY, PageHero, pad2 } from "@/components/page/Layout";
import { Reveal } from "@/components/page/Reveal";

const searchPlaceholders = [
  "How does resume analysis work?",
  "Is Preciprocal free to use?",
  "Can I track multiple job applications?",
  "How does AI interview prep work?",
  "What file formats are supported?",
];

const COUNTS: Record<string, number> = Object.fromEntries(
  FAQ_CATEGORIES.map((c) => [c.id, FAQS.filter((f) => f.category === c.id).length])
);

function CategoryButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-h-10 items-center justify-between gap-3 rounded-full border px-4 text-[13px] font-medium transition-colors lg:-ml-px lg:w-full lg:rounded-none lg:border-0 lg:border-l-2 lg:py-1.5 lg:pl-4 lg:pr-0 lg:text-left ${
        active
          ? "border-accent/40 bg-accent/10 text-white lg:border-accent lg:bg-transparent"
          : "border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white lg:border-transparent lg:bg-transparent"
      }`}
    >
      {label}
      <span className={`font-mono text-[11px] ${active ? "text-accent-soft" : "text-slate-500"}`}>{pad2(count)}</span>
    </button>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">("all");
  // Bumped to remount the search input, which keeps its own text, on "Clear filters".
  const [inputKey, setInputKey] = useState(0);

  const filtered = useMemo(() => {
    let result = [...FAQS];
    if (activeCategory !== "all") {
      result = result.filter((f) => f.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  const grouped = useMemo(
    () =>
      FAQ_CATEGORIES.map((cat) => ({
        cat,
        items: filtered.filter((f) => f.category === cat.id),
      })).filter((g) => g.items.length > 0),
    [filtered]
  );

  const handleCategoryChange = useCallback((cat: FAQCategory | "all") => {
    setActiveCategory(cat);
  }, []);

  const handleSearchChange = useCallback((v: string) => {
    setSearch(v);
  }, []);

  return (
    <div data-accent="emerald" className="min-h-screen bg-[#050810]">
      <FAQJsonLd />
      <Navbar />

      <main>
        <PageHero
          breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
          badge={<>{FAQS.length} answers to everything you need</>}
          title={"Frequently asked "}
          accent="questions"
          subhead={
            <p>
              Can&apos;t find what you&apos;re looking for?{" "}
              <a
                href="mailto:support@preciprocal.com"
                className="text-accent-soft underline decoration-accent/40 underline-offset-4 transition-colors hover:text-white"
              >
                Email support
              </a>{" "}
              and we respond within 24 hours.
            </p>
          }
          aside={
            /* Search, on the right of the title on wide screens */
            <div role="search" aria-label="Search FAQs" className="w-full max-w-2xl text-left lg:w-[460px]">
              <PlaceholdersAndVanishInput
                key={inputKey}
                placeholders={searchPlaceholders}
                onChange={(e) => handleSearchChange(e.target.value)}
                onSubmit={(e) => e.preventDefault()}
              />
            </div>
          }
        />

        <section className={`${SECTION} ${PAD} !pt-12 sm:!pt-16`}>
          <div className={`${INNER} grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] xl:gap-20`}>
            {/* Category index */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav aria-label="FAQ categories">
                <p className="mb-3 hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 lg:block">
                  Categories
                </p>
                <ul className="flex flex-wrap gap-2 lg:block lg:space-y-0.5 lg:border-l lg:border-white/[0.07]">
                  <li>
                    <CategoryButton
                      active={activeCategory === "all"}
                      onClick={() => handleCategoryChange("all")}
                      label="All"
                      count={FAQS.length}
                    />
                  </li>
                  {FAQ_CATEGORIES.map((cat) => (
                    <li key={cat.id}>
                      <CategoryButton
                        active={activeCategory === cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        label={cat.label}
                        count={COUNTS[cat.id] ?? 0}
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Questions */}
            <div className="min-w-0">
              {/* Results count when searching */}
              <p aria-live="polite" className="mb-6 min-h-[1.25rem] text-[12px] text-slate-400">
                {(search || activeCategory !== "all") &&
                  (filtered.length === 0
                    ? "No results found."
                    : `${filtered.length} result${filtered.length === 1 ? "" : "s"}`)}
              </p>

              {filtered.length > 0 ? (
                <div className="space-y-14">
                  {grouped.map(({ cat, items }) => (
                    <Reveal key={cat.id}>
                      <section aria-labelledby={`faq-${cat.id}`}>
                        <div className="mb-2 flex items-baseline justify-between gap-4">
                          <h2 id={`faq-${cat.id}`} className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                            {cat.label}
                          </h2>
                          <span className="font-mono text-[11px] text-slate-500">{pad2(items.length)}</span>
                        </div>
                        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                          {items.map((faq) => (
                            <details key={faq.id} className="group">
                              <summary className="flex min-h-10 cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                                <h3 className="font-medium text-white transition-colors group-hover:text-accent-soft">{faq.q}</h3>
                                <span
                                  aria-hidden="true"
                                  className="relative mt-1 h-4 w-4 shrink-0 text-slate-500 transition-[transform,color] duration-300 group-open:rotate-45 group-open:text-accent"
                                >
                                  <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                                </span>
                              </summary>
                              <div className="max-w-3xl pb-6 pr-10">
                                <span aria-hidden="true" className="mb-3 block h-0.5 w-8 rounded-full bg-gradient-to-r from-accent to-accent-2" />
                                <p className="text-sm leading-relaxed text-slate-400">{faq.a}</p>
                              </div>
                            </details>
                          ))}
                        </div>
                      </section>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/[0.1] py-16 text-center">
                  <p className="mb-3 text-sm text-slate-400">No questions match your search.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("all");
                      setInputKey((k) => k + 1);
                    }}
                    className="inline-flex min-h-10 items-center px-3 text-sm font-medium text-accent-soft transition-colors hover:text-white"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className={`pb-24 ${PAD}`}>
          <Reveal className={`${INNER} relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070b16] px-8 py-12 sm:px-14`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_100%_50%,black,transparent)]"
              style={GRID_BG}
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-xl text-lg leading-relaxed text-slate-300">
                Still have questions?{" "}
                <a
                  href="mailto:support@preciprocal.com"
                  className="text-accent-soft underline decoration-accent/40 underline-offset-4 transition-colors hover:text-white"
                >
                  Contact support
                </a>{" "}
                or{" "}
                <Link
                  href="/#pricing"
                  className="text-accent-soft underline decoration-accent/40 underline-offset-4 transition-colors hover:text-white"
                >
                  see pricing
                </Link>
                .
              </p>
              <a href="https://app.preciprocal.com/sign-up" className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                Start preparing free, no credit card required <Chevron />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
