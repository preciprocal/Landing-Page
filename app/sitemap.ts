import type { MetadataRoute } from "next";

const BASE = "https://preciprocal.com";

const ROLES = [
  "software-engineer", "product-manager", "data-scientist",
  "frontend-developer", "backend-developer", "data-analyst",
  "machine-learning-engineer", "devops-engineer", "ux-designer", "project-manager",
];

const COMPANIES = [
  "google", "amazon", "meta", "microsoft", "apple",
  "stripe", "spotify", "netflix", "uber", "airbnb",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/free-ats-checker`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const interviewPages: MetadataRoute.Sitemap = ROLES.map((role) => ({
    url: `${BASE}/interview-questions/${role}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const companyPages: MetadataRoute.Sitemap = COMPANIES.map((company) => ({
    url: `${BASE}/interview-prep/${company}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...interviewPages, ...companyPages];
}