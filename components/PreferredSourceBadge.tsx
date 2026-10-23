/**
 * components/PreferredSourceBadge.tsx
 *
 * "Add as a preferred source on Google" badge. Readers who pick a site as a
 * preferred source see more of it in Google's Top Stories (and, where the site
 * is eligible, AI Mode and AI Overviews), marked with a "preferred" label.
 *
 * Link format and assets are Google's own: the deeplink is documented at
 * https://developers.google.com/search/docs/appearance/preferred-sources
 * (checked 2026-10-22, page last updated 2026-09-18), and the images are the
 * official English badges from Google's asset pack, in public/badges/.
 *
 * Deliberately the plain image link, not Google's JavaScript button. The button
 * loads news.google.com/swg/js/v1/publisher.js on every page view, and this
 * site loads no Google script before cookie consent. A link sends nothing to
 * Google until the reader clicks it.
 */

const PREFERRED_SOURCE_URL = "https://www.google.com/preferences/source?q=preciprocal.com";

export default function PreferredSourceBadge({
  theme = "dark",
  width = 169,
  className = "",
}: {
  theme?: "dark" | "light";
  /** Display width in px. The 1x asset is 338x107, so height follows that ratio. */
  width?: number;
  className?: string;
}) {
  const base = `/badges/google-preferred-source-${theme}`;
  return (
    <a
      href={PREFERRED_SOURCE_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-track="google-preferred-source"
      className={`inline-block transition-opacity hover:opacity-90 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- a fixed-size badge; next/image adds nothing here */}
      <img
        src={`${base}.png`}
        srcSet={`${base}.png 1x, ${base}@2x.png 2x`}
        alt="Add Preciprocal as a preferred source on Google"
        width={width}
        height={Math.round((width * 107) / 338)}
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}

/**
 * One line of context plus the badge, for pages whose content changes often
 * enough to be worth following in Google: the visa rule trackers, the OPT
 * guides, the blog. Commercial pages keep only the footer badge, so it never
 * competes with their sign-up CTA.
 */
export function PreferredSourceCallout({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 ${className}`}>
      <p className="text-sm text-slate-400">{text}</p>
      <PreferredSourceBadge width={190} />
    </div>
  );
}
