import type { MetadataRoute } from "next";

/**
 * robots.ts
 *
 * Fixes from previous version:
 *  • Removed "/*.json$" - regex patterns are NOT valid robots.txt syntax.
 *    Google ignores malformed rules; they can also confuse other crawlers.
 *  • Restored Google-Extended (Gemini AI overviews). Blocking it previously
 *    was preventing Preciprocal from appearing in Google AI Overviews,
 *    a significant visibility channel for "how to" and educational queries,
 *    which is exactly your content.
 *  • Kept GPTBot blocked (OpenAI training crawler).
 *  • Added ClaudeBot block (Anthropic training crawler) for consistency.
 *  • Added explicit /api/ and /_next/ blocks which are correct.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default: allow all public pages
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",     // Next.js API routes - not meant for indexing
          "/_next/",   // Next.js build artifacts
          "/admin/",   // Any admin routes
        ],
      },
      {
        // Block OpenAI's training crawler
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        // Block Anthropic's training crawler
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      // ✅ Google-Extended (Gemini AI Overviews) is intentionally ALLOWED.
      //    Blocking it removes you from AI Overview summaries in Google Search,
      //    which drives significant zero-click brand awareness for your keywords.
      //    If you want to block it in future, add:
      //      { userAgent: "Google-Extended", disallow: "/" }
    ],
    sitemap: "https://preciprocal.com/sitemap.xml",
    host: "https://preciprocal.com",
  };
}