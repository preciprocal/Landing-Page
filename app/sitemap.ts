import type { MetadataRoute } from "next";
import { ALL_ROLES, ALL_COMPANIES, BLOG_POSTS, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {

  // ─── Static pages ─────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                                  lastModified: new Date("2026-04-27"), changeFrequency: "weekly",  priority: 1.0  },
    { url: `${SITE_URL}/free-ats-checker`,            lastModified: new Date("2026-04-27"), changeFrequency: "monthly", priority: 0.9  },
    { url: `${SITE_URL}/faq`,                         lastModified: new Date("2026-04-27"), changeFrequency: "monthly", priority: 0.8  },
    { url: `${SITE_URL}/blog`,                        lastModified: new Date("2026-04-27"), changeFrequency: "weekly",  priority: 0.7  },
    { url: `${SITE_URL}/interview-questions`,         lastModified: new Date("2026-04-27"), changeFrequency: "monthly", priority: 0.8  },
    { url: `${SITE_URL}/interview-prep`,              lastModified: new Date("2026-04-27"), changeFrequency: "monthly", priority: 0.8  },
    // ── Programmatic SEO hub pages ──────────────────────────────────────────
    { url: `${SITE_URL}/resume-tips`,                 lastModified: new Date("2026-04-27"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/cover-letter-examples`,       lastModified: new Date("2026-04-27"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/salary-guide`,                lastModified: new Date("2026-04-27"), changeFrequency: "monthly", priority: 0.85 },
    // ────────────────────────────────────────────────────────────────────────
    { url: `${SITE_URL}/privacy`,                     lastModified: new Date("2026-01-20"), changeFrequency: "yearly",  priority: 0.2  },
    { url: `${SITE_URL}/terms`,                       lastModified: new Date("2026-01-20"), changeFrequency: "yearly",  priority: 0.2  },
  ];

  // ─── Role interview pages — stable content, use launch date ──────────────
  const rolePages: MetadataRoute.Sitemap = ALL_ROLES.map((role) => ({
    url: `${SITE_URL}/interview-questions/${role}`,
    lastModified: new Date("2026-01-20"),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // ─── Company prep pages — stable content, use launch date ────────────────
  const companyPages: MetadataRoute.Sitemap = ALL_COMPANIES.map((company) => ({
    url: `${SITE_URL}/interview-prep/${company}`,
    lastModified: new Date("2026-01-20"),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // ─── Blog pages — use real publishedAt / updatedAt per post ──────────────
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  // ─── Programmatic SEO role-specific pages ────────────────────────────────
  const resumeTipsPages: MetadataRoute.Sitemap = ALL_ROLES.map((role) => ({
    url: `${SITE_URL}/resume-tips/${role}`,
    lastModified: new Date("2026-04-27"),
    changeFrequency: "monthly" as const,
    priority: 0.80,
  }));

  const coverLetterPages: MetadataRoute.Sitemap = ALL_ROLES.map((role) => ({
    url: `${SITE_URL}/cover-letter-examples/${role}`,
    lastModified: new Date("2026-04-27"),
    changeFrequency: "monthly" as const,
    priority: 0.80,
  }));

  const salaryGuidePages: MetadataRoute.Sitemap = ALL_ROLES.map((role) => ({
    url: `${SITE_URL}/salary-guide/${role}`,
    lastModified: new Date("2026-04-27"),
    changeFrequency: "monthly" as const,
    priority: 0.80,
  }));

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