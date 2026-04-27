import type { MetadataRoute } from "next";
import { ALL_ROLES, ALL_COMPANIES, ALL_BLOG_SLUGS, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                                lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/free-ats-checker`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/faq`,                       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`,                      lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE_URL}/interview-questions`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/interview-prep`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // ── New programmatic SEO hub pages ──────────────────────────────────────
    { url: `${SITE_URL}/resume-tips`,               lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/cover-letter-examples`,     lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/salary-guide`,              lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    // ────────────────────────────────────────────────────────────────────────
    { url: `${SITE_URL}/privacy`,                   lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${SITE_URL}/terms`,                     lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];

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

  // ── New role-specific programmatic pages ──────────────────────────────────
  const resumeTipsPages: MetadataRoute.Sitemap = ALL_ROLES.map((role) => ({
    url: `${SITE_URL}/resume-tips/${role}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.80,
  }));

  const coverLetterPages: MetadataRoute.Sitemap = ALL_ROLES.map((role) => ({
    url: `${SITE_URL}/cover-letter-examples/${role}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.80,
  }));

  const salaryGuidePages: MetadataRoute.Sitemap = ALL_ROLES.map((role) => ({
    url: `${SITE_URL}/salary-guide/${role}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.80,
  }));
  // ──────────────────────────────────────────────────────────────────────────

  return [
    ...staticPages,
    ...rolePages,
    ...companyPages,
    ...blogPages,
    ...resumeTipsPages,
    ...coverLetterPages,
    ...salaryGuidePages,
  ];
}