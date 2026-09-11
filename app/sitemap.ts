import type { MetadataRoute } from "next";
import { ALL_ROLES, ALL_COMPANIES, BLOG_POSTS, SITE_URL } from "@/lib/constants";

/**
 * sitemap.ts
 *
 * Changes in this version:
 *  - Added /about, /roadmap, /faq, /privacy, /terms static pages
 *  - Added /contact page
 *  - Sharpened lastModified dates for all static pages
 *  - Updated blog priority to 0.7 (from 0.65), new high-quality posts added
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

/**
 * Emits four sitemaps behind an index rather than one flat file.
 * See the tier comments at the bottom of this file for the rationale.
 */
export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  /**
   * Stable content dates.
   *
   * These used to be `now`, which meant every deploy stamped 224 of the 290
   * URLs (77%) with the build timestamp, telling Google that three quarters of
   * the site changed every time we pushed. Google only uses lastmod to
   * prioritise crawling when it judges the values reliable, and a sitemap that
   * always claims "just changed" is the textbook unreliable case, so the signal
   * gets discounted for the whole file. With 141 URLs sitting in "Discovered,
   * currently not indexed", that signal is exactly what we want working.
   *
   * BUMP THESE BY HAND when the underlying content actually changes, not on
   * every deploy. The date should answer "when did the text on these pages
   * last genuinely change?"
   */
  const CONTENT_UPDATED = {
    /** getRoleInterviewQuestions in lib/roleContent.ts */
    interviewQuestions: new Date("2026-09-03"),
    /** COMPANY_META expansion to 56 employers */
    companies: new Date("2026-09-03"),
    /** ROLE_KEYWORDS, ROLE_NOTES and CATEGORY_PROFILES rewrite */
    resumeTips: new Date("2026-09-03"),
    coverLetterExamples: new Date("2026-09-03"),
    /** CATEGORY_NEGOTIATION and the added prose sections */
    salaryGuide: new Date("2026-09-10"),
    /** Hub pages change whenever their section does */
    hubs: new Date("2026-09-10"),
  } as const;

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
      lastModified: new Date(BLOG_POSTS.reduce((a, b) => (a > (b.updatedAt ?? b.publishedAt) ? a : (b.updatedAt ?? b.publishedAt)), "2026-01-01")),
      changeFrequency: "weekly",
      priority: 0.82,
    },
    // ── Programmatic hubs ────────────────────────────────────────────────────
    {
      url: `${SITE_URL}/resume-tips`,
      lastModified: CONTENT_UPDATED.resumeTips,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/salary-guide`,
      lastModified: CONTENT_UPDATED.salaryGuide,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cover-letter-examples`,
      lastModified: CONTENT_UPDATED.coverLetterExamples,
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
    // High commercial intent, searchers are in buying mode.
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
    {
      // Hub for the comparison pages. Every comparison page's breadcrumb schema
      // already pointed here before this route existed.
      url: `${SITE_URL}/alternatives`,
      lastModified: new Date("2026-09-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Comparison pages added September 2026. Pricing in these pages was checked
    // against public sources at that date and needs periodic re-verification.
    ...[
      "teal-alternative",
      "careerflow-alternative",
      "kickresume-alternative",
      "enhancv-alternative",
      "rezi-alternative",
      "huntr-alternative",
      "big-interview-alternative",
      "interviewing-io-alternative",
      "simplify-alternative",
    ].map((slug) => ({
      url: `${SITE_URL}/alternatives/${slug}`,
      lastModified: new Date("2026-09-03"),
      changeFrequency: "monthly" as const,
      priority: 0.78,
    })),
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

  // Dynamic role pages, 40+ roles, high keyword value
  const rolePages: MetadataRoute.Sitemap = ALL_ROLES.map((role) => ({
    url: `${SITE_URL}/interview-questions/${role}`,
    lastModified: CONTENT_UPDATED.interviewQuestions,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Dynamic company prep pages, 20 companies
  const companyPages: MetadataRoute.Sitemap = ALL_COMPANIES.map((company) => ({
    url: `${SITE_URL}/interview-prep/${company}`,
    lastModified: CONTENT_UPDATED.companies,
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }));

  // Programmatic role pages for the three rebuilt sections, 41 roles each.
  // Each hub links to all of its children, so these are crawlable once the
  // hub itself is reachable from the sitemap and the footer.
  const programmaticPages: MetadataRoute.Sitemap = (
    ["resume-tips", "salary-guide", "cover-letter-examples"] as const
  ).flatMap((section) =>
    ALL_ROLES.map((role) => ({
      url: `${SITE_URL}/${section}/${role}`,
      lastModified:
        section === "salary-guide"
          ? CONTENT_UPDATED.salaryGuide
          : section === "resume-tips"
          ? CONTENT_UPDATED.resumeTips
          : CONTENT_UPDATED.coverLetterExamples,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  // Blog posts, each post uses its own updatedAt for accurate lastModified.
  // Visa / immigration posts boosted to 0.82 (high-intent audience).
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: VISA_SLUGS.has(post.slug) ? 0.82 : 0.7,
  }));

  // ── Split into crawl tiers ────────────────────────────────────────────────
  //
  // 141 URLs were sitting in "Discovered, currently not indexed", meaning
  // Google had queued them and not yet fetched them. That is crawl budget
  // rationing on a domain it does not rate highly yet, and a single flat list
  // of 290 URLs gives it no way to tell which ones matter.
  //
  // Splitting by value does two things. Google gets an ordering signal, and
  // Search Console reports indexed counts per sitemap, so you can actually see
  // which tier is being picked up rather than watching one aggregate number.
  //
  // Submit them in order in Search Console: tier 0 first, then 1, and leave 3
  // until the earlier tiers are landing.
  const commercial = new Set([
    "/", "/pricing",
    "/ai-mock-interview", "/cover-letter-generator", "/free-ats-checker",
    "/linkedin-profile-optimizer", "/resume-tailoring", "/job-application-tracker",
    "/interview-study-planner", "/cold-email-generator", "/recruiter-contact-finder",
    "/interview-debrief", "/chrome-extension",
  ].map((p) => (p === "/" ? SITE_URL : `${SITE_URL}${p}`)));

  const isAlternative = (u: string) => u.startsWith(`${SITE_URL}/alternatives`);
  const isLegalOrCorp = (u: string) =>
    ["/privacy", "/terms", "/about", "/contact", "/roadmap", "/faq"].some(
      (p) => u === `${SITE_URL}${p}`
    );

  // Tier 0: pages that convert, plus the comparison pages, which carry the
  // highest commercial intent of anything on the site.
  const tier0 = [
    ...staticPages.filter((p) => commercial.has(String(p.url)) || isAlternative(String(p.url))),
  ];

  // Tier 1: blog. The visa guides are the most linkable thing here, and links
  // are what eventually lifts crawl priority for everything else.
  const tier1 = [...blogPages, ...staticPages.filter((p) => String(p.url) === `${SITE_URL}/blog`)];

  // Tier 2: company and role interview pages. Real hand-written depth.
  const tier2 = [
    ...companyPages,
    ...rolePages,
    ...staticPages.filter((p) =>
      [`${SITE_URL}/interview-prep`, `${SITE_URL}/interview-questions`].includes(String(p.url))
    ),
  ];

  // Tier 3: the programmatic long tail, plus low-value legal and corporate
  // pages. These are the weakest pages on the site and the ones whose
  // same-category near-duplication is still unresolved, so they should be the
  // last thing competing for crawl budget.
  const claimed = new Set(
    [...tier0, ...tier1, ...tier2].map((p) => String(p.url))
  );
  const tier3 = [
    ...programmaticPages,
    ...staticPages.filter((p) => !claimed.has(String(p.url)) && (isLegalOrCorp(String(p.url)) || true)),
  ];

  const tiers = [tier0, tier1, tier2, tier3];
  return tiers[Number(id)] ?? [];
}