import type { MetadataRoute } from "next";

/**
 * robots.ts
 *
 * Changes from original:
 *  • Disallows API routes and private app paths from crawling
 *    (app.preciprocal.com is a different subdomain, but guarding /api/* here
 *    prevents Next.js API routes from being indexed)
 *  • Points to sitemap
 *  • Allows all public marketing/SEO pages
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default: allow all public pages
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",       // Next.js API routes — not meant for indexing
          "/_next/",     // Next.js build artifacts
          "/admin/",     // Any admin routes
          "/*.json$",    // Raw JSON files
        ],
      },
      {
        // Prevent GPTBot (OpenAI's crawler) from training on your content
        // Remove this rule if you want AI training crawlers to index you
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        // Prevent Google's extended scraping crawler
        userAgent: "Google-Extended",
        disallow: "/",
      },
    ],
    sitemap: "https://preciprocal.com/sitemap.xml",
    host: "https://preciprocal.com",
  };
}