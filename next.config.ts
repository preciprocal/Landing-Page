import type { NextConfig } from "next";

/**
 * next.config.ts
 *
 * SEO redirects — all permanent (308/301) so link equity passes through.
 * Add new redirects here whenever a route is renamed or removed.
 *
 * WWW: the previous note here said www -> non-www was handled at the Vercel
 * domain level and deliberately not configured in this file. Search Console
 * showed otherwise — www.preciprocal.com/terms, /cover-letter and
 * /forgot-password were all reported as 404s while their non-www equivalents
 * resolved fine. The host-based rule below is a safety net that works whether
 * or not the Vercel domain redirect is in place. It cannot loop, because the
 * destination host is non-www and the rule only matches the www host.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ------------------------------------------------------------------
      // www -> non-www (host-based, covers every path)
      // ------------------------------------------------------------------
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.preciprocal.com" }],
        destination: "https://preciprocal.com/:path*",
        permanent: true,
      },
      // ------------------------------------------------------------------
      // Cover letter routes
      // ------------------------------------------------------------------
      // Old /cover-letter slug (Google found a 404 here).
      // This route genuinely does not exist, so the redirect stays.
      {
        source: "/cover-letter",
        destination: "/cover-letter-generator",
        permanent: true,
      },

      // ------------------------------------------------------------------
      // Dead blog slugs Google still crawls
      // ------------------------------------------------------------------
      // These three were reported as 404s in Search Console. They were never
      // published under these slugs, so they are most likely from old internal
      // links or external references. Each points at the closest live post.
      {
        source: "/blog/how-to-prepare-for-behavioral-interview",
        destination: "/blog/star-method-behavioral-interviews",
        permanent: true,
      },
      {
        source: "/blog/how-to-write-a-resume-with-no-experience",
        destination: "/blog/ats-resume-tips-new-grads",
        permanent: true,
      },
      {
        source: "/blog/resume-summary-examples-2026",
        destination: "/blog/resume-keywords-that-get-past-ats",
        permanent: true,
      },

      // ------------------------------------------------------------------
      // App routes crawled on the marketing domain
      // ------------------------------------------------------------------
      // /forgot-password lives on the app subdomain, not here. Google found it
      // on preciprocal.com and got a 404, so send it to the real page.
      {
        source: "/forgot-password",
        destination: "https://app.preciprocal.com/forgot-password",
        permanent: true,
      },

      // NOTE: /cover-letter-examples and /cover-letter-examples/:slug used to
      // be redirected here, from a period when that section had been removed.
      // The section was later rebuilt — app/cover-letter-examples/page.tsx and
      // app/cover-letter-examples/[role]/page.tsx now prerender 42 real pages
      // with their own canonicals and metadata. The redirects survived the
      // rebuild and were intercepting every one of them, which is what GSC
      // reported as "Page with redirect" (validation: Failed).
      //
      // Do not re-add a redirect for a path that has a page.tsx behind it.
    ];
  },
};

export default nextConfig;