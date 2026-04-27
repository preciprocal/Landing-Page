/**
 * app/blog/page.tsx
 *
 * All post data comes from lib/constants.ts (BLOG_POSTS).
 * This file is pure rendering logic only.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { BLOG_POSTS, APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Career Advice Blog — Interview Prep, Resume Tips & Job Search Strategy",
  description: "Practical guides on acing interviews, writing resumes that pass ATS, negotiating offers, and landing jobs at top tech companies.",
  alternates: { canonical: "https://preciprocal.com/blog" },
  openGraph: { title: "Preciprocal Blog — Interview Prep & Career Advice", description: "Practical guides on interviews, resumes, job search strategy, and landing tech jobs.", url: "https://preciprocal.com/blog", type: "website" },
};

const CATEGORIES = [...new Set(BLOG_POSTS.map((p) => p.category))];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogIndexPage() {
  const featured = BLOG_POSTS.filter((p) => p.featured);
  const rest      = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://preciprocal.com" }, { name: "Blog", url: "https://preciprocal.com/blog" }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Blog", "@id": "https://preciprocal.com/blog",
        name: "Preciprocal Blog", url: "https://preciprocal.com/blog",
        publisher: { "@id": "https://preciprocal.com/#organization" },
        blogPost: BLOG_POSTS.map((p) => ({ "@type": "BlogPosting", headline: p.title, description: p.description, url: `https://preciprocal.com/blog/${p.slug}`, datePublished: p.publishedAt, author: { "@type": "Organization", name: "Preciprocal" } })),
      })}} />

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 page-main">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ color: "#64748b" }} className="text-sm mb-8 flex gap-2 items-center">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <span style={{ color: "#cbd5e1" }}>Blog</span>
        </nav>

        <h1 style={{ color: "#ffffff" }} className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">Career advice &amp; interview prep</h1>
        <p style={{ color: "#94a3b8" }} className="text-lg mb-12 max-w-2xl">Practical guides on landing interviews, acing them, and negotiating the offer.</p>

        {/* Featured */}
        {featured.length > 0 && (
          <section className="mb-16">
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.75rem", marginBottom: "1.5rem" }}>
              <span style={{ color: "#64748b" }} className="text-xs font-semibold uppercase tracking-widest">Featured</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {featured.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block p-6 rounded-2xl border transition-all" style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.05),rgba(168,85,247,0.05))", borderColor: "rgba(99,102,241,0.15)" }}>
                  <span style={{ color: "#818cf8" }} className="text-xs font-semibold uppercase tracking-wider">{post.category}</span>
                  <h3 style={{ color: "#ffffff" }} className="font-bold text-base mt-2 mb-3 leading-snug group-hover:text-indigo-300 transition-colors">{post.title}</h3>
                  <p style={{ color: "#64748b" }} className="text-sm leading-relaxed line-clamp-2 mb-4">{post.description}</p>
                  <div style={{ color: "#475569" }} className="flex items-center gap-3 text-xs">
                    <span>{formatDate(post.publishedAt)}</span><span>·</span><span>{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* By category */}
        {CATEGORIES.map((cat) => {
          const posts = rest.filter((p) => p.category === cat);
          if (!posts.length) return null;
          return (
            <section key={cat} className="mb-12">
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.75rem", marginBottom: "1.25rem" }}>
                <span style={{ color: "#64748b" }} className="text-xs font-semibold uppercase tracking-widest">{cat}</span>
              </div>
              <div className="space-y-4">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col sm:flex-row sm:items-start gap-4 p-5 rounded-xl border transition-all" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <div className="flex-1 min-w-0">
                      <h3 style={{ color: "#e2e8f0" }} className="font-semibold text-sm leading-snug mb-2 group-hover:text-indigo-300 transition-colors">{post.title}</h3>
                      <p style={{ color: "#475569" }} className="text-xs leading-relaxed line-clamp-2">{post.description}</p>
                    </div>
                    <div style={{ color: "#475569" }} className="flex sm:flex-col gap-3 sm:gap-1 text-xs flex-shrink-0 sm:text-right">
                      <span>{formatDate(post.publishedAt)}</span><span>{post.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Cross-links */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/interview-questions" className="p-5 rounded-xl border transition-all hover:border-white/20" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p style={{ color: "#ffffff" }} className="font-semibold text-sm mb-1">Interview questions by role →</p>
            <p style={{ color: "#475569" }} className="text-xs">Q&amp;As for 20+ roles with detailed answers</p>
          </Link>
          <Link href="/interview-prep" className="p-5 rounded-xl border transition-all hover:border-white/20" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p style={{ color: "#ffffff" }} className="font-semibold text-sm mb-1">Company prep guides →</p>
            <p style={{ color: "#475569" }} className="text-xs">Google, Amazon, Meta, Stripe, and 16 more</p>
          </Link>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a href={`${APP_URL}/sign-up`} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#ffffff" }} className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Practice everything you&apos;ve read — free
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}