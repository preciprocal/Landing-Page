import type { MetadataRoute } from "next";
import { ALL_ROLES, ALL_COMPANIES, ALL_BLOG_SLUGS, SITE_URL } from "@/lib/constants";

/**
 * sitemap.ts
 *
 * Changes in this version:
 *  - Added /about, /roadmap, /faq, /privacy, /terms static pages
 *  - Added /contact page
 *  - Sharpened lastModified dates for all static pages
 *  - Updated blog priority to 0.7 (from 0.65) — new high-quality posts added
 *  - Removed /salary-guide, /cover-letter-examples, /resume-tips programmatic
 *    sections — these routes were in the previous sitemap but the pages do not
 *    exist, causing GSC 404 errors. Re-add once the pages are built.
 *  - Kept /alternatives comparison pages at high priority (buying-intent traffic)
 *
 * DEPLOY NOTE: After deploying, go to Search Console -> Sitemaps and
 * re-submit https://preciprocal.com/sitemap.xml to trigger re-crawl.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    // ── Core ────────────────────────────────────────────────────────────────
    {
      url: SITE_URL,
      lastModified: new Date("2026-06-01"),
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
      url: `${SITE_URL}/alternatives/resume-worded-alternative`,
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

  // Blog posts — updated priority now that content is stronger
  const blogPages: MetadataRoute.Sitemap = ALL_BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...rolePages,
    ...companyPages,
    ...blogPages,
  ];
}