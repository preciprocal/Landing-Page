"use client";

/**
 * app/blog/[slug]/page.tsx  — Blog article layout
 *
 * Drop this into your Next.js app at app/blog/[slug]/page.tsx
 * Replace the static `article` object with your actual CMS/MDX data source.
 *
 * Fixes from screenshot:
 *  - Proper h1/h2/h3 hierarchy (no raw ## showing)
 *  - Normal font-weight body text (not all-bold)
 *  - Prose typography with comfortable line-height & measure
 *  - Clean sidebar with sticky positioning
 *  - Consistent spacing between sections
 *  - Highlighted inline links (indigo) not plain text
 */

import Link from "next/link";
import Navbar from "@/components/Navbar";
import StickyBanner from "@/components/StickyBanner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RelatedPost {
  category: string;
  title: string;
  href: string;
  readTime: string;
}

// ─── Static demo data (replace with your CMS/MDX fetch) ──────────────────────

const relatedPosts: RelatedPost[] = [
  {
    category: "RESUME",
    title: "Resume Summary Examples That Actually Work in 2026 (By Role)",
    href: "/blog/resume-summary-examples",
    readTime: "7 min read",
  },
  {
    category: "RESUME",
    title: "How to Write a Resume With No Experience in 2026 (Complete Guide)",
    href: "/blog/resume-no-experience",
    readTime: "9 min read",
  },
  {
    category: "RESUME",
    title: "Resume Keywords That Get Past ATS in 2026 (By Role)",
    href: "/blog/resume-keywords-ats",
    readTime: "9 min read",
  },
  {
    category: "INTERVIEW PREP",
    title: "The Complete Software Engineer Interview Prep Guide (2026)",
    href: "/blog/software-engineer-interview-prep",
    readTime: "14 min read",
  },
];

// ─── Sidebar CTA ──────────────────────────────────────────────────────────────

function SidebarCTA() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 p-6">
      <h3 className="text-base font-semibold text-white mb-2 leading-snug">
        Practice what you read
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-5">
        AI mock interviews, resume scoring, cover letters, and job tracking —
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

// ─── Related posts sidebar ────────────────────────────────────────────────────

function RelatedPosts() {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-4">
        More Posts
      </p>
      <ul className="space-y-5">
        {relatedPosts.map((post) => (
          <li key={post.href}>
            <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-indigo-400 mb-1">
              {post.category}
            </p>
            <Link
              href={post.href}
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

// ─── Article prose content ────────────────────────────────────────────────────
// In a real app this would come from MDX / your CMS.
// Rendered here as structured JSX to show the correct hierarchy.

function ArticleBody() {
  return (
    <div className="prose-article">
      {/* ── Lead paragraph ── */}
      <p className="lead">
        An <strong>Applicant Tracking System (ATS)</strong> is software that
        companies use to receive, sort, and filter job applications before a
        recruiter ever sees them. Over{" "}
        <strong>98% of Fortune 500 companies</strong> use ATS software, and
        studies suggest that{" "}
        <strong>75% of resumes are rejected before a human reviews them</strong>
        . If your resume doesn&apos;t pass the automated screen, it doesn&apos;t
        matter how qualified you are — your application simply disappears.
      </p>

      <p>
        The most widely used ATS platforms in 2026 are{" "}
        <strong>
          Workday, Greenhouse, Lever, iCIMS, Taleo, and BambooHR
        </strong>
        . Each has slightly different parsing behaviour, but the same core rules
        apply across all of them.
      </p>

      {/* ── Section 1 ── */}
      <h2>Why well-written resumes still fail ATS</h2>

      <p>
        The most counterintuitive truth about ATS: a beautifully designed resume
        often scores <em>lower</em> than a plain, boring one. Multi-column
        layouts, tables, text boxes, graphics, headers and footers, and custom
        fonts all confuse ATS parsers. The system reads your resume as raw text
        — if that text is scrambled by formatting, your qualifications never
        register.
      </p>

      <h3>The five most common reasons qualified candidates get auto-rejected</h3>

      <ol>
        <li>
          <strong>Missing keywords</strong> — ATS systems match your resume
          against the job description. If you say &quot;team lead&quot; and the
          job description says &quot;team leadership,&quot; you may not match.
          Mirror the exact language from the posting.
        </li>
        <li>
          <strong>Non-standard section headers</strong> — &quot;Professional
          History&quot; or &quot;Where I&apos;ve Worked&quot; confuse parsers.
          Use <em>Work Experience</em>, <em>Education</em>, <em>Skills</em>, and{" "}
          <em>Certifications</em>.
        </li>
        <li>
          <strong>Text in headers/footers</strong> — Most ATS systems cannot
          parse content outside the main document body. Your name and contact
          info in a header may be completely invisible.
        </li>
        <li>
          <strong>Tables and text boxes</strong> — These render as blank space
          or get skipped entirely. Anything inside them — skills, achievements,
          contact details — vanishes.
        </li>
        <li>
          <strong>Fancy fonts and graphics</strong> — Logos, profile photos,
          icons, and decorative elements are either ignored or cause parsing
          errors that corrupt surrounding text.
        </li>
      </ol>

      {/* ── Section 2 ── */}
      <h2>How ATS scoring works</h2>

      <p>
        Most ATS platforms assign a match score by comparing your resume text to
        the job description. The algorithm looks for keyword frequency,
        contextual placement (keywords in job titles or bullet points rank higher
        than keywords buried in a summary), and section completeness.
      </p>

      <p>
        A score above roughly 70–80% typically moves a candidate to the &quot;to
        review&quot; pile. Below that threshold, the application is archived
        automatically — no human ever opens it.
      </p>

      <h3>What signals boost your score</h3>

      <ul>
        <li>Exact-match job title in your most recent role</li>
        <li>Skills section with verbatim keywords from the posting</li>
        <li>Quantified achievements (&quot;reduced load time by 40%&quot;)</li>
        <li>Standard date formats (Jan 2023 – Present)</li>
        <li>Clean, single-column layout saved as a .docx or plain PDF</li>
      </ul>

      {/* ── Section 3 ── */}
      <h2>How to format your resume for ATS in 2026</h2>

      <p>
        Follow these formatting rules and you will eliminate the most common
        causes of ATS rejection:
      </p>

      <h3>File format</h3>
      <p>
        Submit a <strong>.docx</strong> whenever the application allows it.
        .docx files parse more reliably than PDFs across all major ATS platforms.
        If you must use PDF, export from Word or Google Docs — never from Canva,
        Figma, or a design tool.
      </p>

      <h3>Layout</h3>
      <p>
        Use a <strong>single-column layout</strong> with standard margins
        (0.5–1 in). Avoid columns, tables, and text boxes entirely. Your contact
        information should sit in the document body, not in a header or footer.
      </p>

      <h3>Section headers</h3>
      <p>
        Stick to the canonical set:{" "}
        <strong>
          Work Experience · Education · Skills · Certifications · Projects
        </strong>
        . Avoid creative alternatives — no matter how clever, they confuse
        parsers.
      </p>

      {/* ── Callout ── */}
      <div className="callout">
        <p className="callout-title">💡 Pro tip</p>
        <p>
          Run your resume through{" "}
          <Link href="/free-ats-checker" className="link">
            Preciprocal&apos;s free ATS checker
          </Link>{" "}
          before you apply. It scores your resume against the job description in
          under 60 seconds and tells you exactly which keywords are missing.
        </p>
      </div>

      {/* ── Section 4 ── */}
      <h2>ATS keyword strategy: doing it right</h2>

      <p>
        Keyword stuffing — pasting the job description in white text at the
        bottom of your resume — used to work. It doesn&apos;t anymore. Modern ATS
        platforms use NLP to detect it, and recruiters who do see your resume
        will immediately disqualify you.
      </p>

      <p>
        Instead, weave keywords naturally into your bullet points by describing
        work you actually did. If the job description mentions{" "}
        <em>cross-functional collaboration</em>, write a bullet point like:
      </p>

      <blockquote>
        Led cross-functional collaboration between engineering, design, and
        product to ship a redesigned checkout flow — reducing cart abandonment
        by 18%.
      </blockquote>

      <p>
        That single bullet satisfies the keyword requirement, demonstrates
        impact, and reads naturally to a human recruiter.
      </p>

      {/* ── Summary table ── */}
      <h2>Quick-reference checklist</h2>

      <div className="checklist">
        {[
          "Single-column layout, no tables or text boxes",
          "Contact info in the document body (not header/footer)",
          "Standard section headers: Work Experience, Education, Skills",
          "Keywords mirrored from the job description",
          "Saved as .docx or a text-based PDF",
          "No graphics, logos, or custom fonts",
          "Dates in a consistent format (Mon YYYY)",
          "Quantified achievements in every bullet where possible",
        ].map((item) => (
          <div key={item} className="checklist-item">
            <span className="checklist-icon">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogArticlePage() {
  return (
    <>
      {/* ── Inline styles ── */}
      <style>{`
        /* ── Prose article typography ───────────────────────────────────── */
        .prose-article {
          color: #cbd5e1;          /* slate-300 */
          font-size: 1rem;
          line-height: 1.8;
          font-weight: 400;
        }

        /* Paragraphs */
        .prose-article p {
          margin: 0 0 1.25rem;
        }

        /* Lead paragraph */
        .prose-article .lead {
          font-size: 1.125rem;
          line-height: 1.75;
          color: #e2e8f0;
          margin-bottom: 1.75rem;
        }

        /* Headings */
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

        /* Lists */
        .prose-article ul,
        .prose-article ol {
          padding-left: 1.5rem;
          margin: 0 0 1.25rem;
        }
        .prose-article li {
          margin-bottom: 0.5rem;
        }
        .prose-article li strong {
          color: #e2e8f0;
        }

        /* Inline elements */
        .prose-article strong { color: #e2e8f0; }
        .prose-article em { font-style: italic; }
        .prose-article .link {
          color: #818cf8;
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-color: rgba(129,140,248,0.35);
          transition: color 150ms;
        }
        .prose-article .link:hover { color: #a5b4fc; }

        /* Blockquote */
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

        /* Callout */
        .prose-article .callout {
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 0.875rem;
          padding: 1rem 1.25rem;
          margin: 1.75rem 0;
        }
        .prose-article .callout-title {
          font-weight: 600;
          color: #a5b4fc;
          margin-bottom: 0.375rem !important;
          font-size: 0.875rem;
        }
        .prose-article .callout p:last-child { margin-bottom: 0; }

        /* Checklist */
        .prose-article .checklist {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1rem;
          padding: 1.25rem;
          margin: 1.25rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .prose-article .checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          font-size: 0.9rem;
          color: #cbd5e1;
        }
        .prose-article .checklist-icon {
          color: #6366f1;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* Responsive sidebar */
        @media (max-width: 1024px) {
          .article-sidebar { display: none; }
        }
      `}</style>

      <StickyBanner />
      <Navbar />

      <div
        style={{ background: "#050810", minHeight: "100vh" }}
        className="pt-[72px]" /* clears the floating navbar */
      >
        <div className="max-w-[1200px] mx-auto px-6 pt-8 pb-16">

          {/* ── Breadcrumb (full width, above the two-column split) ── */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-slate-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-400">What is ATS?</span>
          </nav>

          <div className="flex gap-14 items-start">

            {/* ── Main column ──────────────────────────────────────────── */}
            <article className="flex-1 min-w-0">

              {/* Category + read time */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">
                  Resume
                </span>
                <span className="text-xs text-slate-500">12 min read</span>
                <span className="text-slate-700">·</span>
                <span className="text-xs text-slate-500">Updated May 2026</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight mb-5">
                What is ATS and Why Does It Matter in 2026?
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

              {/* Article body */}
              <ArticleBody />

              {/* Footer CTA */}
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-indigo-600/15 to-purple-600/15 border border-indigo-500/20 text-center">
                <p className="text-lg font-semibold text-white mb-2">
                  Ready to beat the ATS?
                </p>
                <p className="text-sm text-slate-400 mb-5 max-w-sm mx-auto">
                  Score your resume against any job description in 60 seconds —
                  free, no account needed.
                </p>
                <a
                  href="/free-ats-checker"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(99,102,241,0.35)]"
                >
                  Check my resume free →
                </a>
              </div>
            </article>

            {/* ── Sidebar ──────────────────────────────────────────────── */}
            <aside
              className="article-sidebar w-[280px] flex-shrink-0 flex flex-col gap-8"
              style={{ position: "sticky", top: "104px" }}
            >
              <SidebarCTA />
              <RelatedPosts />
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}