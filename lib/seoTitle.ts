/**
 * lib/seoTitle.ts
 *
 * Builds page titles that survive Google's display limit.
 *
 * WHY THIS EXISTS
 * The root layout sets a title template of "%s | Preciprocal", which appends 14
 * characters to every non-absolute title. Several data sources in this repo
 * (COMPANY_META.title, ROLE_META.title, BLOG_SEO.title) already ended with
 * "| Preciprocal", so the brand was being added twice. A live check of the
 * built output found 252 programmatic pages over 60 characters, 170 of them
 * with the brand duplicated, e.g.
 *
 *   "How to Prepare for a Goldman Sachs Interview (2026) | Preciprocal | Preciprocal"
 *
 * Google truncates around 60 characters, so the duplicate pushed real keywords
 * out of the visible title and wasted the budget.
 */

/** Characters the layout template appends: " | Preciprocal". */
const BRAND_SUFFIX_LENGTH = 14;

/** Target total length including the appended brand. */
const MAX_TOTAL = 60;

/** Budget available to the page's own title text. */
export const TITLE_BUDGET = MAX_TOTAL - BRAND_SUFFIX_LENGTH;

/** Strips a trailing "| Preciprocal" so the template does not double it. */
export function stripBrand(title: string): string {
  return title.replace(/\s*[|,-]\s*Preciprocal\s*$/i, "").trim();
}

/**
 * Fits a title into the budget by dropping optional trailing parts.
 *
 * Pass the essential text first and the nice-to-have suffixes after, longest
 * last. The first combination that fits wins, so a short role name keeps the
 * year while a long one drops it rather than being truncated mid-word by Google.
 *
 *   fitTitle("Technical Program Manager Interview Questions", " (2026)")
 *   -> "Technical Program Manager Interview Questions"
 *
 *   fitTitle("Data Analyst Interview Questions", " (2026)")
 *   -> "Data Analyst Interview Questions (2026)"
 */
export function fitTitle(essential: string, ...optional: string[]): string {
  const base = stripBrand(essential);
  for (let keep = optional.length; keep > 0; keep--) {
    const candidate = base + optional.slice(0, keep).join("");
    if (candidate.length <= TITLE_BUDGET) return candidate;
  }
  return base;
}
