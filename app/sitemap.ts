import type { MetadataRoute } from "next";
import { ALL_ROLES, ALL_COMPANIES, BLOG_POSTS, SITE_URL } from "@/lib/constants";

/**
 * sitemap.ts
 *
 * Changes in this version:
 *  - Added /about, /roadmap, /faq, /privacy, /terms static pages
 *  - Added /contact page
 *  - Sharpened lastModified dates for all static pages
 *  - Updated blog priority to 0.7 (from 0.65) — new high-quality posts added
 *  - Visa/immigration posts boosted to 0.82 (high commercial intent)
 *  - RESTORED /salary-guide, /cover-letter-examples, /resume-tips programmatic
 *    sections. These were dropped when the pages did not exist, but all three
 *    have since been rebuilt and prerender 41 role pages each. Leaving them out
 *    left 126 real pages with no sitemap entry and no inbound internal link,
 *    which is what GSC reported as "Crawled - currently not indexed".
 *  - Fixed /alternatives/resume-worded-alternative -> resumeworded-alternative.
 *    The hyphenated URL has never existed; it was a sitemap-only 404.
 *  - Kept /alternatives comparison pages at high priority (buying-intent traffic)
 *  - Switched blog section from ALL_BLOG_SLUGS to BLOG_POSTS so each post
 *    uses its own updatedAt date rather than "now"
 *
 * DEPLOY NOTE: After deploying, go to Search Console -> Sitemaps and
 * re-submit https://preciprocal.com/sitemap.xml to trigger re-crawl.
 */

const VISA_SLUGS = new Set([
  "ead-card-f1-visa-opt-complete-guide-2026",
  "how-to-stop-the-clock-f1-students-opt-2026",
  "h1b-visa-complete-guide-2026",
  "l1-visa-complete-guide-2026",
  "o1-visa-extraordinary-ability-guide-2026",
  "tn-visa-canada-mexico-professionals-2026",
  "green-card-employment-based-pathways-2026",
  "how-to-get-job-with-visa-sponsorship-2026",
  "us-visa-policy-updates-2026",
  "ead-renewal-2026-automatic-extension-ended",
  "how-to-check-your-visa-status-2026",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    // ── Core ────────────────────────────────────────────────────────────────
    {
      url: SITE_URL,
      lastModified: new Date("2026-06-06"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/ai-mock-interview`,
      lastModified: new Date("2026-05-08"),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/cover-letter-generator`,
      lastModified: new Date("2026-05-08"),
      changeFrequency: "monthly",
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/free-ats-checker`,
      lastModified: new Date("2026-04-15"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      // Self-canonical page that was missing from the sitemap entirely.
      url: `${SITE_URL}/pricing`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // ── Tool landing pages ───────────────────────────────────────────────────
    // One page per product surface. Previously 8 of the 11 tools had no page at
    // all, so there was nothing for Google to rank against those keywords.
    ...[
      "linkedin-profile-optimizer",
      "resume-tailoring",
      "job-application-tracker",
      "interview-study-planner",
      "cold-email-generator",
      "recruiter-contact-finder",
      "interview-debrief",
      "chrome-extension",
    ].map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: new Date("2026-08-30"),
      changeFrequency: "monthly" as const,
      priority: 0.88,
    })),
    // ── Interview prep hubs ──────────────────────────────────────────────────
    {
      url: `${SITE_URL}/interview-questions`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${SITE_URL}/interview-prep`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    // ── Content ──────────────────────────────────────────────────────────────
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    // ── Programmatic hubs ────────────────────────────────────────────────────
    {
      url: `${SITE_URL}/resume-tips`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/salary-guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cover-letter-examples`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.72,
    },
    // ── Company pages ────────────────────────────────────────────────────────
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/roadmap`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    // ── Alternatives / Comparison pages ─────────────────────────────────────
    // High commercial intent — searchers are in buying mode.
    {
      url: `${SITE_URL}/alternatives/final-round-ai-alternative`,
      lastModified: new Date("2026-05-08"),
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/alternatives/jobscan-alternative`,
      lastModified: new Date("2026-05-08"),
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/alternatives/resumeworded-alternative`,
      lastModified: new Date("2026-05-08"),
      changeFrequency: "monthly",
      priority: 0.78,
    },
    // ── Legal ────────────────────────────────────────────────────────────────
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Dynamic role pages — 40+ roles, high keyword value
  const rolePages: MetadataRoute.Sitemap = ALL_ROLES.map((role) => ({
    url: `${SITE_URL}/interview-questions/${role}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Dynamic company prep pages — 20 companies
  const companyPages: MetadataRoute.Sitemap = ALL_COMPANIES.map((company) => ({
    url: `${SITE_URL}/interview-prep/${company}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }));

  // Programmatic role pages for the three rebuilt sections — 41 roles each.
  // Each hub links to all of its children, so these are crawlable once the
  // hub itself is reachable from the sitemap and the footer.
  const programmaticPages: MetadataRoute.Sitemap = (
    ["resume-tips", "salary-guide", "cover-letter-examples"] as const
  ).flatMap((section) =>
    ALL_ROLES.map((role) => ({
      url: `${SITE_URL}/${section}/${role}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  // Blog posts — each post uses its own updatedAt for accurate lastModified.
  // Visa / immigration posts boosted to 0.82 (high-intent audience).
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: VISA_SLUGS.has(post.slug) ? 0.82 : 0.7,
  }));

  return [
    ...staticPages,
    ...rolePages,
    ...companyPages,
    ...programmaticPages,
    ...blogPages,
  ];
}