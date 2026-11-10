/**
 * components/page/Layout.tsx
 *
 * The shared page language for content pages (tool pages, guides, role
 * guides): the navbar and footer gutter at full width, left-aligned section heads
 * with an eyebrow label, and the masked grid background used behind heroes
 * and CTA panels. Server components only; motion lives in ./Reveal.tsx.
 *
 * Each page picks an accent hue by setting data-accent on its root element
 * (see globals.css). Everything coloured here reads it through the Tailwind
 * `accent` colours, so a page's eyebrows, hero glow, highlights and
 * illustration all share one hue. Primary buttons stay brand indigo.
 *
 * Use:
 *   <div data-accent="sky" className="min-h-screen bg-[#050810]">...</div>
 *   <section className={`${PAD} py-20`}><div className={INNER}>...</div></section>
 *   <PageHero title=... accent=... subhead=... aside={<cta/>} visual={<Illustration/>} />
 *   <SectionHead eyebrow="FAQ" title="..." subtitle="..." />
 */

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import FaqAccordion from "./FaqAccordion";

/** The gutter the navbar and footer use, so every edge lines up. */
export const PAD = "px-6 sm:px-10 lg:px-16";
/**
 * The content column: centred and capped at 1400px, wide enough to use a
 * large screen while keeping lines and grids in proportion. Within it, sidebars and grids still fill the
 * width; only on wide screens does the page gain margins instead of
 * stretching text across the whole monitor.
 */
export const INNER = "mx-auto w-full max-w-[1400px]";
/** A comfortable reading measure for running prose (about 70 characters). */
export const PROSE = "max-w-[68ch]";

export type Crumb = { label: string; href?: string };

/**
 * The breadcrumb bar: a slim strip directly under the navbar, aligned to the
 * content column, with a hairline beneath, so it reads as page navigation
 * rather than text floating in the hero. The last item is the current page.
 * Every content page uses this one component, so they all look the same.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className={`relative z-10 border-b border-white/[0.06] bg-white/[0.012] ${PAD}`}>
      <ol className={`${INNER} flex min-w-0 items-center gap-0.5 overflow-x-auto py-2.5 text-[13px] [scrollbar-width:none]`}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${i}-${c.label}`} className={`flex items-center gap-0.5 ${last ? "min-w-0" : "shrink-0"}`}>
              {i > 0 && (
                <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-slate-600" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  {i === 0 && c.href === "/" && (
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                      <path d="M2.5 7.2L8 2.8l5.5 4.4V13a.5.5 0 01-.5.5H9.5V10h-3v3.5H3a.5.5 0 01-.5-.5V7.2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                  )}
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="truncate px-1.5 py-1 font-medium text-slate-200">
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
/** Section rhythm: top rule and vertical padding. */
export const SECTION = "border-t border-white/[0.05] py-20";

export const GRID_BG: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
};

/** Card surfaces. */
export const CARD = "rounded-2xl border border-white/[0.07] bg-white/[0.025]";
export const CARD_SOLID = "rounded-2xl border border-white/[0.07] bg-[#070b16]";

/** Buttons. The primary stays brand indigo on every page, whatever the accent. */
export const BTN_PRIMARY =
  "group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-7 py-3.5 text-sm font-bold text-white transition-all hover:brightness-110";
export const BTN_SECONDARY =
  "group inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/25 hover:bg-white/[0.07]";

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** The hues a page can pick with data-accent. */
export type Accent = "indigo" | "emerald" | "sky" | "amber" | "rose" | "violet" | "blue";

/** Gradient text in the page accent. */
export const ACCENT_TEXT = "bg-gradient-to-r from-accent-soft via-accent to-accent-2 bg-clip-text text-transparent";

/**
 * Formerly a gradient hairline that swept in under a hovered card. Retired:
 * hover states stay quiet (a slightly lighter surface, a brighter border),
 * with no glows or sweeps. Renders nothing; kept so existing callers compile.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HoverRule(_props: { className?: string }) {
  return null;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft/90 ${className}`}>
      <span className="h-px w-5 bg-gradient-to-r from-accent to-transparent" />
      {children}
    </p>
  );
}

/**
 * Section heading. `accent` is an optional second phrase drawn in the page
 * accent gradient, the two-tone pattern the homepage uses ("Three steps.
 * Zero guesswork."): the plain part names the topic, the accent part says
 * what it means for the reader.
 */
export function SectionHead({
  eyebrow,
  title,
  accent,
  subtitle,
  className = "mb-10",
  as: Tag = "h2",
  align = "start",
}: {
  eyebrow: string;
  title: ReactNode;
  accent?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  as?: "h2" | "h3";
  /** "center" for full-width flow sections (how it works, what you get). */
  align?: "start" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Tag className="text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-[2.25rem]">
        {title}
        {accent && <> <span className={ACCENT_TEXT}>{accent}</span></>}
      </Tag>
      {subtitle && <p className="mt-4 text-[16px] leading-relaxed text-slate-400">{subtitle}</p>}
    </div>
  );
}

/**
 * The reassurance line that sits under a sign-up button: the same three
 * promises the homepage makes (Hero, Pricing, the .edu banner), so a visitor
 * who lands on any page hears them before deciding.
 */
export const TRUST_POINTS = [
  "Free plan, no credit card",
  ".edu email gets a month of Pro free",
  "Land the job while subscribed, share your story, and that month is on us",
] as const;

export function TrustRow({ className = "", align = "start" }: { className?: string; align?: "start" | "center" | "end" }) {
  const justify = { start: "justify-start", center: "justify-center", end: "lg:justify-end" }[align];
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-slate-400 ${justify} ${className}`}>
      {TRUST_POINTS.map((t) => (
        <li key={t} className="inline-flex items-center gap-1.5">
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-emerald-400">
            <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * A faint masked grid and a hairline at the bottom, for the top of a hero.
 * Deliberately quiet: no glows. Place inside a `relative overflow-hidden` section.
 */
export function HeroBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        style={GRID_BG}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.05]" />
    </>
  );
}

/**
 * The page hero: badge, two-line title (plain, then gradient accent),
 * subhead, an optional aside (usually the CTA), and an optional `visual`,
 * an animated illustration of what the page is about.
 *
 * Without a visual the aside sits bottom right on wide screens. With one, the
 * text column takes the left and carries the aside under the subhead, and the
 * visual takes the right. The visual is decorative, so it is hidden from
 * assistive tech and below the lg breakpoint. `children` render below, inside the hero.
 */
export function PageHero({
  badge,
  badgeTone = "accent",
  breadcrumb,
  title,
  accent,
  subhead,
  aside,
  visual,
  children,
  sectionProps,
  inlineAccent = false,
}: {
  badge?: ReactNode;
  badgeTone?: "accent" | "emerald" | "indigo" | "amber";
  /** The trail to this page; rendered as the breadcrumb bar above the hero. */
  breadcrumb?: Crumb[];
  title: ReactNode;
  accent?: ReactNode;
  subhead?: ReactNode;
  aside?: ReactNode;
  visual?: ReactNode;
  children?: ReactNode;
  sectionProps?: Record<string, string>;
  /** Keep the accent on the same line as the title, for short titles like "Privacy Policy". */
  inlineAccent?: boolean;
}) {
  const tone = {
    accent: "border-accent/25 bg-accent/[0.08] text-accent-soft [--dot:rgb(var(--accent))]",
    emerald: "border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-300 [--dot:theme(colors.emerald.400)]",
    indigo: "border-indigo-500/25 bg-indigo-500/[0.08] text-indigo-200 [--dot:theme(colors.indigo.400)]",
    amber: "border-amber-500/25 bg-amber-500/[0.08] text-amber-200 [--dot:theme(colors.amber.400)]",
  }[badgeTone];

  // Without a visual the hero is centred, like the product heroes.
  const centred = !visual;
  const text = (
    <div className={`max-w-4xl animate-fade-up opacity-0 ${centred ? "mx-auto text-center" : ""}`}>
      {badge && (
        <div className={`mb-7 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-medium ${tone}`}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--dot)] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--dot)]" />
          </span>
          {badge}
        </div>
      )}
      {/* Beside a visual the text column is narrower, so the title steps down
          a size there rather than wrapping to four lines. */}
      <h1
        className={`text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl ${
          visual ? "lg:text-[3.25rem] xl:text-[3.6rem]" : "lg:text-[4.25rem]"
        }`}
      >
        {title}
        {accent && (
          <span className={`${inlineAccent ? "inline" : "block"} animate-[gradient-shift_8s_ease_infinite] bg-gradient-to-r from-accent-soft via-accent to-accent-2 bg-[length:200%_auto] bg-clip-text pb-1 text-transparent`}>
            {accent}
          </span>
        )}
      </h1>
      {subhead && <div className={`mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 ${centred ? "mx-auto" : ""}`}>{subhead}</div>}
    </div>
  );

  return (
    <>
    {breadcrumb && <Breadcrumbs items={breadcrumb} />}
    <section {...sectionProps} className={`relative overflow-hidden pb-14 ${breadcrumb ? "pt-14 sm:pt-16" : "pt-24 sm:pt-28"} ${PAD}`}>
      <HeroBackdrop />
      <div className={`relative ${INNER}`}>
        {visual ? (
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:gap-20">
            <div>
              {text}
              {aside && (
                <div className="mt-9 animate-fade-up opacity-0" style={{ animationDelay: "120ms" }}>
                  {aside}
                </div>
              )}
            </div>
            <div aria-hidden="true" className="relative hidden animate-fade-up opacity-0 lg:block" style={{ animationDelay: "180ms" }}>
              {visual}
            </div>
          </div>
        ) : (
          <div>
            {text}
            {aside && (
              <div className="mt-9 flex animate-fade-up justify-center text-center opacity-0" style={{ animationDelay: "120ms" }}>
                {aside}
              </div>
            )}
          </div>
        )}
        {children && (
          <div className="mt-12 animate-fade-up opacity-0" style={{ animationDelay: "200ms" }}>
            {children}
          </div>
        )}
      </div>
    </section>
    </>
  );
}

/**
 * The closing CTA panel every content page ends on: a headline that speaks to
 * where the reader is, the action, and the trust row. Pass `trust={false}`
 * when the action is not a Preciprocal sign-up.
 */
export function CtaPanel({
  title,
  body,
  action,
  note,
  trust = true,
}: {
  title: ReactNode;
  body?: ReactNode;
  action: ReactNode;
  note?: ReactNode;
  trust?: boolean;
}) {
  return (
    <div className={`${INNER} relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070b16] px-7 py-12 sm:px-14 sm:py-16`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_100%_50%,black,transparent)]"
        style={GRID_BG}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-[2.5rem]">{title}</h2>
          {body && <div className="mt-4 text-[16px] leading-relaxed text-slate-400">{body}</div>}
          {trust && <TrustRow className="mt-6" />}
        </div>
        <div className="shrink-0 lg:text-right">
          {action}
          {note && <p className="mt-3 text-[12px] text-slate-500">{note}</p>}
        </div>
      </div>
    </div>
  );
}

/**
 * A folded panel for supporting detail: a title row that opens to reveal the
 * content. Pages lead with what the reader came for and fold the rest in
 * here, so they read as a short flow. The content stays in the HTML (a native
 * <details>), so search engines still index it. The title is a real heading.
 *
 *   <Fold eyebrow="The full guide" title="Why job searches fall apart">...</Fold>
 */
export function Fold({
  eyebrow,
  title,
  meta,
  children,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  /** A short line under the title, e.g. "8 sections" or "5 min read". */
  meta?: ReactNode;
  children: ReactNode;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <details className={`group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070b16] open:border-white/[0.12] ${className}`}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 transition-colors hover:bg-white/[0.02] sm:p-8 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          {eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft/90">{eyebrow}</p>}
          <Tag className={`${eyebrow ? "mt-2 " : ""}text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl`}>{title}</Tag>
          {meta && <p className="mt-1.5 text-sm text-slate-500">{meta}</p>}
        </div>
        <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/[0.12] text-slate-300 transition-transform duration-300 group-open:rotate-180">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </summary>
      <div className="border-t border-white/[0.06] px-6 pb-10 pt-8 sm:px-8">{children}</div>
    </details>
  );
}

/** FAQ as question cards whose answers open on click (see ./FaqAccordion.tsx). Answers stay in the HTML for search. */
export function FaqList({ items }: { items: { q: string; a: ReactNode }[] }) {
  return <FaqAccordion items={items} />;
}

/**
 * The FAQ section every page uses, so it looks the same everywhere: on wide
 * screens the label, title and a way to reach a person sit on the left (and
 * stay in view), the question cards on the right. `more` adds a link under
 * the title, e.g. to the full FAQ page. Structured data stays with the page.
 */
export function FaqSection({
  items,
  title = "Frequently asked questions",
  more,
  sectionProps,
  className = "",
}: {
  items: { q: string; a: ReactNode }[];
  title?: ReactNode;
  more?: { href: string; label: string };
  sectionProps?: Record<string, string>;
  className?: string;
}) {
  return (
    <section {...sectionProps} className={`${SECTION} ${PAD} ${className}`}>
      <div className={`${INNER} grid grid-cols-1 gap-10 lg:grid-cols-[360px_minmax(0,1fr)] xl:gap-24`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">{title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            Something else? Email{" "}
            <a href="mailto:support@preciprocal.com" className="text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white">
              support@preciprocal.com
            </a>
            .
          </p>
          {more && (
            <Link href={more.href} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-soft transition-colors hover:text-white">
              {more.label}
              <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6" /></svg>
            </Link>
          )}
        </div>
        <div className="min-w-0">
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
