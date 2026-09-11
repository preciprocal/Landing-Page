/**
 * app/sitemap.xml/route.ts
 *
 * Sitemap index.
 *
 * app/sitemap.ts uses generateSitemaps() to emit four tiered sitemaps at
 * /sitemap/0.xml through /sitemap/3.xml. Next does NOT generate an index for
 * them, so without this route /sitemap.xml would 404, breaking both the
 * Sitemap directive in robots.txt and the URL already submitted to Search
 * Console. Verified against the build output rather than assumed.
 *
 * Keeping the index at the original URL means Search Console picks up all four
 * children from one submission and reports indexed counts per child, which is
 * the diagnostic we actually want while 141 URLs sit undiscovered.
 */

import { SITE_URL } from "@/lib/constants";

/** Must match the ids returned by generateSitemaps() in app/sitemap.ts. */
const SITEMAP_IDS = [0, 1, 2, 3];

/**
 * Stable per-tier dates. As with CONTENT_UPDATED in app/sitemap.ts, these are
 * deliberately not the build time: a lastmod that changes on every deploy is
 * the case Google distrusts, and it discards the signal for the whole file.
 */
const TIER_UPDATED: Record<number, string> = {
  0: "2026-08-30", // tool and comparison pages
  1: "2026-09-03", // blog
  2: "2026-09-03", // company and role interview pages
  3: "2026-09-10", // programmatic long tail, salary pages changed most recently
};

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_IDS.map(
  (id) => `  <sitemap>
    <loc>${SITE_URL}/sitemap/${id}.xml</loc>
    <lastmod>${TIER_UPDATED[id]}</lastmod>
  </sitemap>`
).join("\n")}
</sitemapindex>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
