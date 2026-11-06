"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { BLOG_POSTS } from "@/lib/constants";
import { BlogPostJsonLd } from "@/components/JsonLd";
import { PreferredSourceCallout } from "@/components/PreferredSourceBadge";
import Chevron from "@/components/Chevron";
import { PAD, INNER, GRID_BG, BTN_PRIMARY, HeroBackdrop } from "@/components/page/Layout";
import { Reveal } from "@/components/page/Reveal";
import ReadingProgress from "@/components/page/ReadingProgress";

/**
 * app/blog/[slug]/page.tsx
 *
 * Blog post template. The article stays at reading width (max-w-3xl),
 * centred in a full-width layout, with a sticky aside (CTA, more posts) on
 * wide screens; on phones the aside follows the article.
 */

/** Shared by the header and the body so the title lines up with the text. */
const COLUMNS =
  "grid gap-12 lg:grid-cols-[minmax(0,48rem)_280px] lg:justify-center lg:gap-14 xl:gap-16 2xl:grid-cols-[minmax(0,1fr)_48rem_minmax(260px,1fr)]";

// ─── Sidebar CTA ──────────────────────────────────────────────────────────────

function SidebarCTA() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-b from-accent-deep/[0.08] to-transparent p-6">
      <h3 className="text-base font-semibold text-white mb-2 leading-snug">
        Practice what you read
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-5">
        AI mock interviews, resume scoring, cover letters, and job tracking,
        all in one place. $9.99/mo.
      </p>
      <a
        href="https://app.preciprocal.com/sign-up"
        className="group flex items-center justify-center gap-1.5 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(99,102,241,0.28)]"
      >
        Start free <Chevron />
      </a>
    </div>
  );
}

// ─── Put this into practice ───────────────────────────────────────────────────
// The tools and guides that let a reader act on a post, by category. Blog
// posts otherwise linked only to other posts, so the tool pages got no
// contextual links from the blog at all.

const PRACTICE_LINKS: Record<string, { href: string; label: string }[]> = {
  Resume: [
    { href: "/free-ats-checker", label: "Free ATS resume checker" },
    { href: "/resume-tailoring", label: "Tailor your resume to a job" },
    { href: "/resume-tips", label: "Resume tips by role" },
  ],
  "Interview Prep": [
    { href: "/interview-question-predictor", label: "Predict your interview questions" },
    { href: "/ai-mock-interview", label: "AI mock interview" },
    { href: "/interview-questions", label: "Interview questions by role" },
  ],
  Behavioral: [
    { href: "/interview-question-predictor", label: "Practice answers out loud, free" },
    { href: "/ai-mock-interview", label: "AI mock interview" },
    { href: "/interview-debrief", label: "Interview debrief journal" },
  ],
  Technical: [
    { href: "/interview-question-predictor", label: "Predict your interview questions" },
    { href: "/interview-study-planner", label: "Interview study planner" },
    { href: "/interview-questions", label: "Interview questions by role" },
  ],
  "Company Guides": [
    { href: "/interview-prep", label: "Company interview guides" },
    { href: "/interview-question-predictor", label: "Predict questions from the job posting" },
    { href: "/ai-mock-interview", label: "AI mock interview" },
  ],
  "Career Strategy": [
    { href: "/job-application-tracker", label: "Job application tracker" },
    { href: "/cold-email-generator", label: "Cold email writer" },
    { href: "/salary-guide", label: "Salary guides by role" },
  ],
  "Visa & Immigration": [
    { href: "/opt", label: "OPT guides and calculators" },
    { href: "/new-h1b-rules", label: "H-1B rule tracker" },
    { href: "/for/international-students", label: "Preciprocal for international students" },
  ],
};

function PracticeLinks({ category }: { category: string }) {
  const links = PRACTICE_LINKS[category];
  if (!links) return null;
  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070b16]">
      <p className="border-b border-white/[0.06] px-6 py-4 text-sm font-semibold text-white">Put this into practice</p>
      <div className="grid gap-px bg-white/[0.06] sm:grid-cols-3 fill-sm-3">
        {links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            className="group flex items-end justify-between gap-3 bg-[#070b16] px-6 py-5 text-sm text-slate-300 transition-colors hover:bg-[#0a1020] hover:text-white focus-visible:bg-[#0a1020] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent/60"
          >
            <span>
              <span className="mb-2 block font-mono text-[11px] text-accent-soft/60">{String(i + 1).padStart(2, "0")}</span>
              {l.label}
            </span>
            <Chevron className="mb-0.5 text-slate-600 group-hover:text-accent-soft" />
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Related posts ────────────────────────────────────────────────────────────

/** Rotates an array so it starts `by` places in, wrapping around. */
function rotate<T>(arr: T[], by: number): T[] {
  if (arr.length === 0) return arr;
  const n = ((by % arr.length) + arr.length) % arr.length;
  return [...arr.slice(n), ...arr.slice(0, n)];
}

function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  /**
   * This used to be `BLOG_POSTS.filter(...).slice(0, 4)`, which handed every
   * post the SAME first four links. The result was four posts collecting all
   * the internal equity while 21 others had exactly one inbound link, from the
   * /blog index, which is what an audit flagged as thin internal linking.
   *
   * Rotating by the post's own index gives every post a different set, so
   * inbound links spread evenly across the corpus. Same-category posts are
   * preferred for the first two so the block still reads as "related" rather
   * than arbitrary, and the rotation is deterministic, which matters because
   * this renders during SSR.
   */
  const index = BLOG_POSTS.findIndex((p) => p.slug === currentSlug);
  const current = BLOG_POSTS[index];
  const others = BLOG_POSTS.filter((p) => p.slug !== currentSlug);

  const sameCategory = rotate(
    others.filter((p) => p.category === current?.category),
    index
  ).slice(0, 2);

  const related: typeof BLOG_POSTS = [...sameCategory];
  for (const post of rotate(others, index + 1)) {
    if (related.length >= 4) break;
    if (!related.some((p) => p.slug === post.slug)) related.push(post);
  }
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-500 mb-3">
        More Posts
      </p>
      <ul className="divide-y divide-white/[0.05] border-y border-white/[0.05]">
        {related.map((post) => (
          <li key={post.slug} className="py-4">
            <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-accent-soft/90 mb-1.5">
              {post.category.toUpperCase()}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm font-medium text-slate-300 hover:text-white leading-snug transition-colors block"
            >
              {post.title}
            </Link>
            <p className="font-mono text-[11px] text-slate-600 mt-1.5">{post.readTime}</p>
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
        return <code key={idx}>{part.slice(1, -1)}</code>;
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

    // Table, header row, separator row (|---|---|), then body rows
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
    ? new Date(post.updatedAt).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })
    : new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

  return (
    <>
      <style>{`
        .prose-article {
          color: #cbd5e1;
          font-size: 1.0625rem;
          line-height: 1.8;
          font-weight: 400;
          text-wrap: pretty;
        }
        .prose-article > :is(p, ul, ol, blockquote, h2, h3) { max-width: 70ch; }
        .prose-article p { margin: 0 0 1.4rem; }
        .prose-article h2 {
          position: relative;
          font-size: 1.625rem;
          font-weight: 700;
          color: #f8fafc;
          margin: 3.25rem 0 1rem;
          padding-top: 2.25rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          letter-spacing: -0.02em;
          line-height: 1.3;
          text-wrap: balance;
          scroll-margin-top: 7rem;
        }
        .prose-article h2::before {
          content: "";
          position: absolute;
          top: -1px;
          left: 0;
          width: 2.5rem;
          height: 1px;
          background: linear-gradient(90deg, rgb(var(--accent)), rgb(var(--accent-2) / 0));
        }
        .prose-article > h2:first-child { margin-top: 0; padding-top: 0; border-top: 0; }
        .prose-article > h2:first-child::before { display: none; }
        .prose-article h3 {
          font-size: 1.1875rem;
          font-weight: 600;
          color: #e2e8f0;
          margin: 2.25rem 0 0.625rem;
          letter-spacing: -0.01em;
          line-height: 1.4;
          text-wrap: balance;
          scroll-margin-top: 7rem;
        }
        .prose-article h2 + h3 { margin-top: 1.25rem; }
        .prose-article ul,
        .prose-article ol {
          padding-left: 1.5rem;
          margin: 0 0 1.4rem;
        }
        .prose-article ul { list-style: disc; }
        .prose-article ol { list-style: decimal; }
        .prose-article li { margin-bottom: 0.55rem; padding-left: 0.35rem; }
        .prose-article li::marker { color: rgb(var(--accent)); }
        .prose-article ol > li::marker { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.875em; }
        .prose-article li strong { color: #e2e8f0; }
        .prose-article strong { color: #f1f5f9; font-weight: 600; }
        .prose-article em { font-style: italic; }
        .prose-article code {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.85em;
          color: rgb(var(--accent-soft));
          background: rgb(var(--accent-deep) / 0.1);
          border: 1px solid rgb(var(--accent) / 0.18);
          border-radius: 0.375rem;
          padding: 0.1em 0.4em;
          overflow-wrap: anywhere;
        }
        .prose-article blockquote {
          position: relative;
          border-left: 2px solid rgb(var(--accent));
          background: linear-gradient(90deg, rgb(var(--accent-deep) / 0.1), rgb(var(--accent-deep) / 0.02));
          padding: 1.1rem 1.4rem;
          margin: 2rem 0;
          border-radius: 0 0.875rem 0.875rem 0;
          font-style: italic;
          color: #e2e8f0;
          font-size: 1rem;
          line-height: 1.75;
        }
        .prose-article blockquote strong { color: rgb(var(--accent-soft)); }
        .prose-article hr { max-width: 70ch; }
        .prose-article table { font-variant-numeric: tabular-nums; }
        .prose-article thead th { color: rgb(var(--accent-soft)); border-bottom-color: rgb(var(--accent) / 0.3); }
      `}</style>

      <BlogPostJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
      />
      <Navbar />

      <div data-accent="violet" className="min-h-screen bg-[#050810]">
        <ReadingProgress />
        {/* Header: breadcrumb, meta, H1 and author, aligned to the article column */}
        <header className={`relative overflow-hidden pb-12 pt-24 sm:pt-28 ${PAD}`}>
          <HeroBackdrop />
          <div className={`relative ${INNER} ${COLUMNS}`}>
            <div className="max-w-3xl animate-fade-up opacity-0 2xl:col-start-2">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-8 flex min-w-0 items-center gap-1.5 text-xs text-slate-500">
                <Link href="/" className="shrink-0 hover:text-slate-300 transition-colors">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/blog" className="shrink-0 hover:text-slate-300 transition-colors">Blog</Link>
                <span aria-hidden="true">/</span>
                <span className="min-w-0 truncate text-slate-400 sm:max-w-[360px]">{post.title}</span>
              </nav>

              {/* Meta row */}
              <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="rounded-full border border-accent/25 bg-accent-deep/[0.08] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-soft">
                  {post.category}
                </span>
                <span className="text-xs text-slate-500">{post.readTime}</span>
                <span className="text-slate-700" aria-hidden="true">·</span>
                <span className="text-xs text-slate-500">Updated {updatedDate}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-[2.75rem]">
                {post.title}
              </h1>

              {/* Author row */}
              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-accent-deep/20 text-xs font-bold text-accent-soft">
                  P
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Preciprocal Team</p>
                  <p className="text-xs text-slate-600">preciprocal.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className={`border-t border-white/[0.05] pb-24 pt-12 sm:pt-14 ${PAD}`}>
          <div className={`${INNER} ${COLUMNS}`}>

            {/* Main column, kept at reading width */}
            <article className="min-w-0 max-w-3xl 2xl:col-start-2">

              {/* Article body rendered from markdown */}
              <div className="prose-article">
                {renderMarkdown(post.content)}
              </div>

              <Reveal>
                <PracticeLinks category={post.category} />
              </Reveal>

              {/* Google preferred source: readers who liked the post see more of ours in Top Stories */}
              <PreferredSourceCallout className="mt-10" text="Want more guides like this in your Google results?" />

              {/* Footer CTA */}
              <Reveal>
                <div className="relative mt-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070b16] p-8 text-center sm:p-10">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_90%_at_50%_100%,black,transparent)]"
                    style={GRID_BG}
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 left-1/2 h-[220px] w-[420px] -translate-x-1/2 rounded-full bg-accent-deep/15 blur-[100px]" />
                  <div className="relative">
                    <p className="text-xl font-semibold text-white mb-2">
                      Ready to land the role?
                    </p>
                    <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
                      Resume analysis, mock interviews, cover letters, and job tracking, all in one place. Free to start.
                    </p>
                    <a
                      href="https://app.preciprocal.com/sign-up"
                      className={`${BTN_PRIMARY} w-full sm:w-auto`}
                    >
                      Start free <Chevron />
                    </a>
                    {post.category === "Visa & Immigration" && (
                      <p className="text-[12px] text-slate-500 mt-5">
                        On F-1 or OPT?{" "}
                        <Link href="/for/international-students" className="text-accent-soft hover:text-white underline underline-offset-2">
                          See how Preciprocal works for international students
                        </Link>
                        <br />
                        <Link href="/opt" className="text-accent-soft hover:text-white underline underline-offset-2">
                          OPT guides and calculators
                        </Link>
                        {" · "}Latest rule status:{" "}
                        <Link href="/new-opt-rules" className="text-accent-soft hover:text-white underline underline-offset-2">
                          OPT
                        </Link>
                        {" · "}
                        <Link href="/new-h1b-rules" className="text-accent-soft hover:text-white underline underline-offset-2">
                          H-1B
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            </article>

            {/* Sidebar: sticky beside the article on wide screens, below it on phones */}
            <aside className="flex w-full flex-col gap-10 lg:sticky lg:top-28 lg:self-start 2xl:col-start-3 2xl:max-w-[300px]">
              <Reveal className="hidden lg:block">
                <SidebarCTA />
              </Reveal>
              <Reveal delay={0.08}>
                <RelatedPosts currentSlug={post.slug} />
              </Reveal>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
