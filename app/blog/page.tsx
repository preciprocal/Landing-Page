/**
 * app/blog/page.tsx
 *
 * All post data comes from lib/constants.ts (BLOG_POSTS).
 * This file is pure rendering logic only.
 *
 * Layout: PageHero with the preferred source callout and a category index,
 * featured posts under a centred head, then each category as an open list of
 * posts, then related guides and the CTA.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PreferredSourceCallout } from "@/components/PreferredSourceBadge";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { BLOG_POSTS, APP_URL } from "@/lib/constants";
import Chevron from "@/components/Chevron";
import { PAD, INNER, GRID_BG, BTN_PRIMARY, PageHero, SectionHead, pad2 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

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

type Post = (typeof BLOG_POSTS)[number];

/** A post as an open list item: a ruled top edge, the title, two lines of description, date and read time. */
function PostLink({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col border-t border-white/[0.08] pt-5 transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      {featured && <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-soft">{post.category}</span>}
      <h3
        className={`font-semibold leading-snug transition-colors group-hover:text-accent-soft ${
          featured ? "text-lg text-white sm:text-xl" : "text-slate-100"
        }`}
      >
        {post.title}
      </h3>
      <p className="mb-4 mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{post.description}</p>
      <div className="mt-auto flex items-center justify-between gap-3 text-xs text-slate-500">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{formatDate(post.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </span>
        <Chevron className="text-slate-600 group-hover:text-accent-soft" />
      </div>
    </Link>
  );
}

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
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
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
              <SectionHead align="center" className="mb-12" eyebrow="Featured" title="Featured guides" />
              <RevealGroup className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                {featured.map((post) => (
                  <RevealItem key={post.slug} className="h-full">
                    <PostLink post={post} featured />
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
                <div className="mb-8 flex items-baseline justify-between gap-4">
                  <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{cat}</h2>
                  <span className="font-mono text-[11px] text-slate-500">{pad2(posts.length)}</span>
                </div>
                <RevealGroup className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <RevealItem key={post.slug} className="h-full">
                      <PostLink post={post} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </section>
          );
        })}

        {/* Cross-links */}
        <section className={`border-t border-white/[0.05] py-14 ${PAD}`}>
          <nav aria-label="More guides" className={INNER}>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Also useful</p>
            <ul className="grid gap-x-10 sm:grid-cols-2">
              <li className="border-b border-white/[0.05]">
                <Link href="/interview-questions" className="group flex items-center justify-between gap-3 py-4 transition-colors">
                  <span>
                    <span className="block font-semibold text-white">Interview questions by role</span>
                    <span className="block text-sm text-slate-500">Q&amp;As for 20+ roles with detailed answers</span>
                  </span>
                  <Chevron className="text-slate-600 group-hover:text-slate-300" />
                </Link>
              </li>
              <li className="border-b border-white/[0.05]">
                <Link href="/interview-prep" className="group flex items-center justify-between gap-3 py-4 transition-colors">
                  <span>
                    <span className="block font-semibold text-white">Company prep guides</span>
                    <span className="block text-sm text-slate-500">Google, Amazon, Meta, Stripe, and 16 more</span>
                  </span>
                  <Chevron className="text-slate-600 group-hover:text-slate-300" />
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        {/* CTA */}
        <section className={`pb-24 ${PAD}`}>
          <Reveal className={`${INNER} relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070b16] px-8 py-12 sm:px-14`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]"
              style={GRID_BG}
            />
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
