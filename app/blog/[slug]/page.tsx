"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import StickyBanner from "@/components/StickyBanner";
import { BLOG_POSTS } from "@/lib/constants";
import { BlogPostJsonLd } from "@/components/JsonLd";

// ─── Sidebar CTA ──────────────────────────────────────────────────────────────

function SidebarCTA() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 p-6">
      <h3 className="text-base font-semibold text-white mb-2 leading-snug">
        Practice what you read
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-5">
        AI mock interviews, resume scoring, cover letters, and job tracking,
        all in one place. $9.99/mo.
      </p>
      <a
        href="https://app.preciprocal.com/sign-up"
        className="flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(99,102,241,0.35)]"
      >
        Start free →
      </a>
    </div>
  );
}

// ─── Related posts ────────────────────────────────────────────────────────────

function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const related = BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, 4);
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-4">
        More Posts
      </p>
      <ul className="space-y-5">
        {related.map((post) => (
          <li key={post.slug}>
            <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-indigo-400 mb-1">
              {post.category.toUpperCase()}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm font-medium text-slate-300 hover:text-white leading-snug transition-colors block"
            >
              {post.title}
            </Link>
            <p className="text-xs text-slate-600 mt-1">{post.readTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Markdown renderer ────────────────────────────────────────────────────────
// Parses the plain markdown string from constants and converts it to JSX.

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const parseInline = (text: string): React.ReactNode => {
    // Handle bold+italic, bold, italic, inline code
    const parts = text.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("***") && part.endsWith("***")) {
        return <strong key={idx}><em>{part.slice(3, -3)}</em></strong>;
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return <em key={idx}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={idx} className="bg-white/[0.06] text-indigo-300 px-1.5 py-0.5 rounded text-[0.85em] font-mono">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  while (i < lines.length) {
    const line = lines[i];

    // H2
    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++}>{parseInline(line.slice(3))}</h2>);
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(<h3 key={key++}>{parseInline(line.slice(4))}</h3>);
      i++;
      continue;
    }

    // H1 (fallback)
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={key++} className="text-2xl font-bold text-white mb-4">
          {parseInline(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={key++}>{parseInline(line.slice(2))}</blockquote>
      );
      i++;
      continue;
    }

    // Unordered list
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(<li key={i}>{parseInline(lines[i].slice(2))}</li>);
        i++;
      }
      elements.push(<ul key={key++}>{items}</ul>);
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(<li key={i}>{parseInline(lines[i].replace(/^\d+\. /, ""))}</li>);
        i++;
      }
      elements.push(<ol key={key++}>{items}</ol>);
      continue;
    }

    // Table — header row, separator row (|---|---|), then body rows
    if (line.startsWith("|") && i + 1 < lines.length && /^\|[\s:|-]+\|$/.test(lines[i + 1].trim())) {
      const cells = (row: string) => row.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const headers = cells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        rows.push(cells(lines[i]));
        i++;
      }
      elements.push(
        <div key={key++} className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {headers.map((h, idx) => (
                  <th key={idx} className="text-left font-semibold text-slate-200 px-3 py-2 border-b border-white/15">{parseInline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((c, cIdx) => (
                    <td key={cIdx} className="align-top px-3 py-2 border-b border-white/[0.06] text-slate-400">{parseInline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      elements.push(<hr key={key++} className="border-white/10 my-6" />);
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(<p key={key++}>{parseInline(line)}</p>);
    i++;
  }

  return elements;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogArticlePage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return notFound();

  const updatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <>
      <style>{`
        .prose-article {
          color: #cbd5e1;
          font-size: 1rem;
          line-height: 1.8;
          font-weight: 400;
        }
        .prose-article p { margin: 0 0 1.25rem; }
        .prose-article h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 2.5rem 0 0.875rem;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        .prose-article h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #e2e8f0;
          margin: 1.875rem 0 0.625rem;
          letter-spacing: -0.01em;
          line-height: 1.4;
        }
        .prose-article ul,
        .prose-article ol {
          padding-left: 1.5rem;
          margin: 0 0 1.25rem;
        }
        .prose-article li { margin-bottom: 0.5rem; }
        .prose-article li strong { color: #e2e8f0; }
        .prose-article strong { color: #e2e8f0; }
        .prose-article em { font-style: italic; }
        .prose-article blockquote {
          border-left: 3px solid #6366f1;
          background: rgba(99,102,241,0.07);
          padding: 1rem 1.25rem;
          margin: 1.5rem 0;
          border-radius: 0 0.75rem 0.75rem 0;
          font-style: italic;
          color: #c7d2fe;
          font-size: 0.95rem;
          line-height: 1.7;
        }
        @media (max-width: 1024px) {
          .article-sidebar { display: none; }
        }
      `}</style>

      <BlogPostJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
      />
      <StickyBanner />
      <Navbar />

      <div style={{ background: "#050810", minHeight: "100vh" }} className="pt-[72px]">
        <div className="max-w-[1200px] mx-auto px-6 pt-8 pb-16">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-slate-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="flex gap-14 items-start">

            {/* Main column */}
            <article className="flex-1 min-w-0">

              {/* Meta row */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-slate-500">{post.readTime}</span>
                <span className="text-slate-700">·</span>
                <span className="text-xs text-slate-500">Updated {updatedDate}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight mb-5">
                {post.title}
              </h1>

              {/* Author row */}
              <div className="flex items-center gap-3 pb-8 border-b border-white/[0.06] mb-8">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-300">
                  P
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Preciprocal Team</p>
                  <p className="text-xs text-slate-600">preciprocal.com</p>
                </div>
              </div>

              {/* Article body rendered from markdown */}
              <div className="prose-article">
                {renderMarkdown(post.content)}
              </div>

              {/* Footer CTA */}
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-indigo-600/15 to-purple-600/15 border border-indigo-500/20 text-center">
                <p className="text-lg font-semibold text-white mb-2">
                  Ready to land the role?
                </p>
                <p className="text-sm text-slate-400 mb-5 max-w-sm mx-auto">
                  Resume analysis, mock interviews, cover letters, and job tracking, all in one place. Free to start.
                </p>
                <a
                  href="https://app.preciprocal.com/sign-up"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(99,102,241,0.35)]"
                >
                  Start free →
                </a>
              </div>
            </article>

            {/* Sidebar */}
            <aside
              className="article-sidebar w-[280px] flex-shrink-0 flex flex-col gap-8"
              style={{ position: "sticky", top: "104px" }}
            >
              <SidebarCTA />
              <RelatedPosts currentSlug={post.slug} />
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}