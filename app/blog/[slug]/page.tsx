/**
 * app/blog/[slug]/page.tsx
 *
 * All post data (BLOG_POSTS, getBlogPost, ALL_BLOG_SLUGS) lives in lib/constants.ts.
 * This file is pure rendering logic only.
 *
 * Next.js 15 fix: params must be typed as Promise<{slug: string}> in both
 * generateMetadata and the default export.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogPostJsonLd } from "@/components/JsonLd";
import { BLOG_POSTS, getBlogPost, ALL_BLOG_SLUGS, APP_URL } from "@/lib/constants";

export async function generateStaticParams() {
  return ALL_BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const canonical = `https://preciprocal.com/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/** Parses ## headings, **bold**, and paragraphs from plain content string */
function renderContent(content: string) {
  const blocks = content.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} style={{ color: "#ffffff" }} className="text-xl sm:text-2xl font-bold mt-10 mb-4 leading-snug">
          {block.replace("## ", "")}
        </h2>
      );
    }
    const renderInline = (text: string) =>
      text.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
        part.startsWith("**") && part.endsWith("**")
          ? <strong key={j} style={{ color: "#e2e8f0" }} className="font-semibold">{part.slice(2, -2)}</strong>
          : part
      );
    return (
      <p key={i} style={{ color: "#94a3b8" }} className="leading-relaxed my-4 text-base">
        {renderInline(block.split("\n").join(" "))}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#050810]">
      <BlogPostJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
      />
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 page-main">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ color: "#64748b" }} className="text-sm mb-8 flex gap-2 items-center flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>{post.category}</span>
        </nav>

        {/* Two-column grid: article + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">

          {/* ── Article column ── */}
          <div>
            {/* Category pill */}
            <div className="mb-4">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full border"
                style={{ color: "#818cf8", background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.2)" }}
              >
                {post.category}
              </span>
            </div>

            {/* H1 */}
            <h1 style={{ color: "#ffffff" }} className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4 tracking-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-10" style={{ color: "#64748b" }}>
              <span className="text-sm">Preciprocal Team</span>
              <span>·</span>
              <time dateTime={post.publishedAt} className="text-sm">{formatDate(post.publishedAt)}</time>
              <span>·</span>
              <span className="text-sm">{post.readTime}</span>
            </div>

            {/* Description lede */}
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: "#94a3b8", borderLeft: "2px solid rgba(99,102,241,0.4)", paddingLeft: "1.25rem" }}
            >
              {post.description}
            </p>

            {/* Divider */}
            <div className="mb-10 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Article content */}
            <article>{renderContent(post.content)}</article>

            {/* Divider */}
            <div className="my-14 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Practice CTA */}
            <div
              className="rounded-2xl p-6 mb-14"
              style={{
                background: "linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.08))",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <h2 style={{ color: "#ffffff" }} className="font-bold text-lg mb-2">Put this into practice</h2>
              <p style={{ color: "#94a3b8" }} className="text-sm mb-4 leading-relaxed">
                Reading about interviews is the first step. The second step is doing them. Preciprocal&apos;s AI mock
                interviews simulate the real thing — voice-based, multi-round, scored across 5 dimensions.
              </p>
              <a
                href={`${APP_URL}/sign-up`}
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#ffffff" }}
                className="inline-flex items-center gap-2 px-6 py-2.5 font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
              >
                Start practicing free →
              </a>
            </div>

            <div className="mt-4">
              <Link href="/blog" style={{ color: "#818cf8" }} className="text-sm hover:text-indigo-300 transition-colors">
                ← Back to all posts
              </Link>
            </div>
          </div>

          {/* ── Sticky sidebar ── */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-24">

            {/* CTA card */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.08))",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <h3 style={{ color: "#ffffff" }} className="font-bold text-sm mb-2">Practice what you read</h3>
              <p style={{ color: "#94a3b8" }} className="text-xs leading-relaxed mb-4">
                AI mock interviews, resume scoring, cover letters, and job tracking — all in one place. $9.99/mo.
              </p>
              <a
                href={`${APP_URL}/sign-up`}
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#ffffff" }}
                className="block text-center px-4 py-2.5 font-semibold rounded-xl text-xs hover:opacity-90 transition-opacity"
              >
                Start free →
              </a>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div>
                <p style={{ color: "#64748b" }} className="text-xs font-semibold uppercase tracking-widest mb-4">
                  More posts
                </p>
                <div className="space-y-4">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group block"
                    >
                      <span
                        style={{ color: "#475569" }}
                        className="text-[10px] font-semibold uppercase tracking-wider"
                      >
                        {p.category}
                      </span>
                      <p
                        style={{ color: "#e2e8f0" }}
                        className="text-xs font-medium leading-snug mt-0.5 group-hover:text-indigo-300 transition-colors"
                      >
                        {p.title}
                      </p>
                      <p style={{ color: "#475569" }} className="text-[11px] mt-1">{p.readTime}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}