/**
 * lib/successStories.ts
 *
 * Approved user success stories that back the Success Refund claim on /pricing.
 *
 * ⚠️  NO BACKEND YET. The dashboard side owns the `success_stories` data and has
 * not exposed it. `getApprovedSuccessStories` therefore returns an empty array,
 * which makes <SuccessStories /> hide itself. The types below are this repo's
 * assumption about the eventual payload. Confirm them against the real schema
 * before wiring the fetch, and treat any mismatch as a change to this file only
 * so no component has to be touched.
 *
 * To go live: replace the body of `getApprovedSuccessStories` with a fetch. The
 * function is already async and is the only way the component reads stories.
 */

/**
 * Per-story reuse consent. Every flag is independent: a user may agree to have
 * their words quoted but not their name, or their LinkedIn post linked but not
 * embedded. Assume nothing is permitted unless the flag says so.
 */
export type SuccessStoryPermissions = {
  /** Attribute the quote to their real name. */
  showName: boolean;
  /** Show the role and employer they landed. */
  showRoleCompany: boolean;
  /** Link out to their public LinkedIn post. */
  showLinkedInLink: boolean;
  /** Render the LinkedIn post inline as an embed. */
  allowLinkedInEmbed: boolean;
};

export type SuccessStory = {
  id: string;
  name: string | null;
  role: string | null;
  company: string | null;
  /** Approved excerpt. Always present, otherwise the story would not be approved. */
  testimonial: string;
  linkedInUrl: string | null;
  /**
   * LinkedIn's iframe embed URL, which is a different URL from the public post
   * permalink (…/embed/feed/update/urn:li:share:ID). The backend must supply it;
   * we cannot derive it from `linkedInUrl`.
   */
  linkedInEmbedUrl: string | null;
  /** ISO timestamp, used to show the most recent approvals first. */
  approvedAt: string;
  permissions: SuccessStoryPermissions;
};

/** What the component actually renders, with all consent logic already applied. */
export type SuccessStoryView = {
  id: string;
  /** Real name when permitted, otherwise a neutral stand-in. */
  attribution: string;
  /** "Data Analyst at Deloitte", or null when role/company are not permitted. */
  roleLine: string | null;
  testimonial: string;
  /** Non-null only when an inline embed is permitted and available. */
  embedUrl: string | null;
  /** Non-null only when an outbound link is permitted and no embed is shown. */
  linkUrl: string | null;
};

const ANONYMOUS_ATTRIBUTION = "Verified Preciprocal user";

/**
 * Collapses a story plus its permissions into something safe to render.
 *
 * One non-obvious rule: if a user withheld their name we also drop the LinkedIn
 * link and embed, because a public post identifies them by name and would
 * silently undo the anonymity they asked for. Withholding the name is treated
 * as the stronger signal.
 */
export function toStoryView(story: SuccessStory): SuccessStoryView {
  const { permissions: p } = story;

  const named = p.showName && Boolean(story.name);
  const attribution = named ? story.name! : ANONYMOUS_ATTRIBUTION;

  const roleParts = p.showRoleCompany
    ? [story.role, story.company].filter((part): part is string => Boolean(part))
    : [];
  const roleLine = roleParts.length > 0 ? roleParts.join(" at ") : null;

  // Anonymous stories never link out, regardless of the LinkedIn flags.
  const mayReference = named;
  const embedUrl =
    mayReference && p.allowLinkedInEmbed && story.linkedInEmbedUrl
      ? story.linkedInEmbedUrl
      : null;
  const linkUrl =
    mayReference && !embedUrl && p.showLinkedInLink && story.linkedInUrl
      ? story.linkedInUrl
      : null;

  return { id: story.id, attribution, roleLine, testimonial: story.testimonial, embedUrl, linkUrl };
}

/**
 * Approved stories, newest first.
 *
 * Returns [] until the dashboard exposes the data. Callers must handle the empty
 * case by hiding their section rather than rendering an empty shell.
 */
export async function getApprovedSuccessStories(): Promise<SuccessStory[]> {
  // TODO: replace with a fetch once the dashboard exposes approved stories, e.g.
  //   const res = await fetch(`${API_URL}/success-stories?status=approved`, {
  //     next: { revalidate: 3600 },
  //   });
  //   if (!res.ok) return [];
  //   return (await res.json()).stories;
  //
  // Failures must degrade to [] so a marketing page never breaks on this.
  return [];
}

/** Convenience wrapper: fetch and project in one step. */
export async function getSuccessStoryViews(): Promise<SuccessStoryView[]> {
  const stories = await getApprovedSuccessStories();
  return [...stories]
    .sort((a, b) => b.approvedAt.localeCompare(a.approvedAt))
    .map(toStoryView);
}
