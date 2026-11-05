/**
 * components/PreferredSourceBadge.tsx
 *
 * "Add as a preferred source on Google" badge. Readers who pick a site as a
 * preferred source see more of it in Google's Top Stories (and, where the site
 * is eligible, AI Mode and AI Overviews), marked with a "preferred" label.
 *
 * The deeplink is documented at
 * https://developers.google.com/search/docs/appearance/preferred-sources
 * (checked 2026-10-22, page last updated 2026-09-18). The same page allows a
 * custom-designed badge as long as it links to that URL. This one is drawn to
 * Google's own dark button spec, so it reads as a control Google provides
 * rather than a Preciprocal one, which is what makes readers trust the click.
 * The site's gradient stays reserved for the sign-up CTAs.
 *
 * Deliberately a plain link, not Google's JavaScript button. The button loads
 * news.google.com/swg/js/v1/publisher.js on every page view, and this site
 * loads no Google script before cookie consent. A link sends nothing to Google
 * until the reader clicks it.
 */

const PREFERRED_SOURCE_URL = "https://www.google.com/preferences/source?q=preciprocal.com";

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function PreferredSourceBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={PREFERRED_SOURCE_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-track="google-preferred-source"
      aria-label="Add Preciprocal as a preferred source on Google (opens Google)"
      // Google's own dark button spec (the "Sign in with Google" dark theme):
      // #131314 surface, 1px #8E918F outline, #E3E3E3 label, pill shape, 40px
      // high, G mark on the surface itself. Hover lays an 8% white tint over
      // the surface, as Google's buttons do.
      style={{ fontFamily: '"Google Sans", Roboto, Arial, sans-serif' }}
      className={`relative inline-flex h-10 w-fit shrink-0 items-center gap-2.5 overflow-hidden rounded-full border border-[#8E918F] bg-[#131314] pl-3 pr-4 text-sm font-medium tracking-[0.25px] text-[#E3E3E3] transition-colors before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity hover:before:opacity-[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8AB4F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050810] ${className}`}
    >
      <GoogleG className="relative h-5 w-5 shrink-0" />
      <span className="relative whitespace-nowrap">Add as a preferred source on Google</span>
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
      <PreferredSourceBadge />
    </div>
  );
}
