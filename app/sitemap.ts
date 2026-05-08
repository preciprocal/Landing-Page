import type { MetadataRoute } from "next";
import { ALL_ROLES, ALL_COMPANIES, ALL_BLOG_SLUGS, SITE_URL } from "@/lib/constants";

/**
 * sitemap.ts
 *
 * Changes from previous version:
 *  • Added /ai-mock-interview (new anchor feature page, priority 0.9)
 *  • Added /alternatives/final-round-ai-alternative (high-intent comparison page)
 *  • Added /alternatives/jobscan-alternative
 *  • Added /alternatives/resume-worded-alternative
 *  • Removed hash-fragment URLs (/#features, /#pricing etc.) - these were
 *    likely the source of the 19 "Alternate page with proper canonical tag"
 *    warnings in GSC. Hash fragments are not indexable pages and should
 *    never appear in a sitemap.
 *  • Added lastModified as proper ISO date strings instead of `new Date()`
 *    for static pages - this gives Google a real signal, not "now" on every build.
 *  • Kept dynamic role/company/blog pages on `new Date()` since they
 *    regenerate when constants.ts changes.
 *
 * DEPLOY NOTE: After deploying, go to Search Console → Sitemaps and
 * re-submit https://preciprocal.com/sitemap.xml to trigger re-crawl.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages with real lastModified dates (update when you edit the page)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date("2026-05-01"),
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
      url: `${SITE_URL}/interview-questions`,
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/interview-prep`,
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // ── Alternatives / Comparison pages ────────────────────────────────────
    // High commercial intent - searchers are in buying mode.
    {
      url: `${SITE_URL}/alternatives/final-round-ai-alternative`,
      lastModified: new Date("2026-05-08"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/alternatives/jobscan-alternative`,
      lastModified: new Date("2026-05-08"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/alternatives/resume-worded-alternative`,
      lastModified: new Date("2026-05-08"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    // ── Legal ───────────────────────────────────────────────────────────────
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Dynamic programmatic pages - priority by keyword value
  const rolePages: MetadataRoute.Sitemap = ALL_ROLES.map((role) => ({
    url: `${SITE_URL}/interview-questions/${role}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const companyPages: MetadataRoute.Sitemap = ALL_COMPANIES.map((company) => ({
    url: `${SITE_URL}/interview-prep/${company}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogPages: MetadataRoute.Sitemap = ALL_BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...rolePages, ...companyPages, ...blogPages];
}