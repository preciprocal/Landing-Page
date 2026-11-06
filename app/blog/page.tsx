/**
 * app/blog/page.tsx
 *
 * All post data comes from lib/constants.ts (BLOG_POSTS).
 * This file is pure rendering logic only.
 *
 * Layout: PageHero with the preferred source callout and a category index,
 * featured posts as large cards, then each category as a ruled grid of cards.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PreferredSourceCallout } from "@/components/PreferredSourceBadge";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { BLOG_POSTS, APP_URL } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, GRID_BG, BTN_PRIMARY, Eyebrow, PageHero, pad2, HoverRule } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem, SpotlightCard } from "@/components/page/Reveal";
import BlogVisual from "@/components/page/visuals/BlogVisual";

export const metadata: Metadata = {
  title: "Career Advice: Interviews, Resumes, Jobs",
  description: "Practical guides on acing interviews, writing resumes that pass ATS, negotiating offers, networking, visa sponsorship, and landing jobs at top companies. Updated for 2026.",
  alternates: { canonical: "https://preciprocal.com/blog" },
  openGraph: {
    title: "Preciprocal Blog: Interview Prep & Career Advice",
    description: "Practical guides on interviews, resumes, job search strategy, visa sponsorship, and landing tech and finance jobs in 2026.",
    url: "https://preciprocal.com/blog",
    type: "website",
  },
};

const CATEGORIES = [...new Set(BLOG_POSTS.map((p) => p.category))];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

/** Anchor id for a category section, e.g. "Visa & Immigration" to "cat-visa-immigration". */
const catId = (cat: string) => `cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export default function BlogIndexPage() {
  const featured = BLOG_POSTS.filter((p) => p.featured);
  const rest      = BLOG_POSTS.filter((p) => !p.featured);
  const categories = CATEGORIES.filter((cat) => rest.some((p) => p.category === cat));

  return (
    <div data-accent="violet" className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://preciprocal.com" }, { name: "Blog", url: "https://preciprocal.com/blog" }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Blog", "@id": "https://preciprocal.com/blog",
        name: "Preciprocal Blog", url: "https://preciprocal.com/blog",
        publisher: { "@id": "https://preciprocal.com/#organization" },
        blogPost: BLOG_POSTS.map((p) => ({ "@type": "BlogPosting", headline: p.title, description: p.description, url: `https://preciprocal.com/blog/${p.slug}`, datePublished: p.publishedAt, author: { "@type": "Organization", name: "Preciprocal" } })),
      })}} />

      <Navbar />

      <main>
        <PageHero
          visual={<BlogVisual />}
          breadcrumb={
            <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span aria-hidden="true">›</span>
              <span className="text-slate-300">Blog</span>
            </nav>
          }
          title={"Career advice & "}
          accent="interview prep"
          subhead={
            <>
              <p>Practical guides on landing interviews, acing them, and negotiating the offer.</p>
              <PreferredSourceCallout className="mt-6" text="Get our new guides in your Google results:" />
            </>
          }
        >
          {categories.length > 1 && (
            <nav aria-label="Blog categories" className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`#${catId(cat)}`}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[12px] text-slate-400 transition-colors hover:border-accent/40 hover:text-white focus-visible:border-accent/60 focus-visible:text-white focus-visible:outline-none"
                >
                  {cat}
                </a>
              ))}
            </nav>
          )}
        </PageHero>

        {/* Featured */}
        {featured.length > 0 && (
          <section className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
            <div className={INNER}>
              <Eyebrow>Featured</Eyebrow>
              <RevealGroup className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
                {featured.map((post) => (
                  <RevealItem key={post.slug} className="h-full">
                    <SpotlightCard className="h-full rounded-2xl border border-accent/15 bg-gradient-to-br from-accent-deep/[0.06] via-[#070b16] to-accent-deep-2/[0.05] transition-colors hover:border-accent/30">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex h-full flex-col p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/60 sm:p-9"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider text-accent-soft">{post.category}</span>
                        <h3 className="mb-3 mt-3 text-xl font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-accent-soft sm:text-2xl">{post.title}</h3>
                        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-400">{post.description}</p>
                        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/[0.06] pt-5 text-xs text-slate-500">
                          <span className="flex items-center gap-3">
                            <span>{formatDate(post.publishedAt)}</span><span aria-hidden="true">·</span><span>{post.readTime}</span>
                          </span>
                          <Chevron className="text-slate-600 group-hover:text-accent-soft" />
                        </div>
                      </Link>
                    </SpotlightCard>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        )}

        {/* By category */}
        {categories.map((cat) => {
          const posts = rest.filter((p) => p.category === cat);
          return (
            <section key={cat} id={catId(cat)} className={`scroll-mt-24 border-t border-white/[0.05] py-14 sm:py-16 ${PAD}`}>
              <div className={INNER}>
                <div className="mb-3 flex items-baseline justify-between gap-4">
                  <Eyebrow>{cat}</Eyebrow>
                  <span className="font-mono text-[11px] text-slate-600">{pad2(posts.length)}</span>
                </div>
                <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3 fill-sm-2 fill-lg-3">
                  {posts.map((post) => (
                    <RevealItem key={post.slug} className="bg-[#070b16]">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group relative flex h-full flex-col p-6 transition-colors duration-300 hover:bg-[#0a1020] focus-visible:bg-[#0a1020] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent/60 sm:p-7"
                      >
                        <h3 className="mb-2 font-semibold leading-snug text-slate-100 transition-colors group-hover:text-white">{post.title}</h3>
                        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-500">{post.description}</p>
                        <div className="mt-auto flex items-center justify-between gap-3 text-xs text-slate-500">
                          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span>{formatDate(post.publishedAt)}</span><span>{post.readTime}</span>
                          </span>
                          <Chevron className="text-slate-600 group-hover:text-accent-soft" />
                        </div>
                        <HoverRule className="inset-x-6 sm:inset-x-7" />
                      </Link>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </section>
          );
        })}

        {/* Cross-links */}
        <section className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}>
          <RevealGroup className={`${INNER} grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 fill-sm-2`}>
            <RevealItem className="bg-[#070b16]">
              <Link href="/interview-questions" className="group block h-full p-7 transition-colors hover:bg-[#0a1020] focus-visible:bg-[#0a1020] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent/60">
                <p className="mb-1 font-semibold text-white">Interview questions by role <Chevron /></p>
                <p className="text-sm text-slate-500">Q&amp;As for 20+ roles with detailed answers</p>
              </Link>
            </RevealItem>
            <RevealItem className="bg-[#070b16]">
              <Link href="/interview-prep" className="group block h-full p-7 transition-colors hover:bg-[#0a1020] focus-visible:bg-[#0a1020] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent/60">
                <p className="mb-1 font-semibold text-white">Company prep guides <Chevron /></p>
                <p className="text-sm text-slate-500">Google, Amazon, Meta, Stripe, and 16 more</p>
              </Link>
            </RevealItem>
          </RevealGroup>
        </section>

        {/* CTA */}
        <section className={`pb-24 ${PAD}`}>
          <Reveal className={`${INNER} relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070b16] px-8 py-12 sm:px-14`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]"
              style={GRID_BG}
            />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-deep/15 blur-[110px]" />
            <div className="relative flex justify-center">
              <a href={`${APP_URL}/sign-up`} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                Practice everything you&apos;ve read, free <Chevron />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
