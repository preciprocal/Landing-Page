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
import FaqAccordion from "./FaqAccordion";
import Chevron from "@/components/Chevron";

/** The gutter the navbar and footer use, so every edge lines up. */
export const PAD = "px-6 sm:px-10 lg:px-16";
/**
 * The content column: centred and capped at 1200px, the same measure the
 * homepage sections sit in. Within it, sidebars and grids still fill the
 * width; only on wide screens does the page gain margins instead of
 * stretching text across the whole monitor.
 */
export const INNER = "mx-auto w-full max-w-[1200px]";
/** A comfortable reading measure for running prose (about 70 characters). */
export const PROSE = "max-w-[68ch]";
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
  "group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)]";
export const BTN_SECONDARY =
  "group inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/25 hover:bg-white/[0.07]";

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** The hues a page can pick with data-accent. */
export type Accent = "indigo" | "emerald" | "sky" | "amber" | "rose" | "violet" | "blue";

/** Gradient text in the page accent. */
export const ACCENT_TEXT = "bg-gradient-to-r from-accent-soft via-accent to-accent-2 bg-clip-text text-transparent";

/** A hairline that draws in under a hovered card; put it inside a `group relative` element. */
export function HoverRule({ className = "inset-x-6" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:scale-x-100 ${className}`}
    />
  );
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
}: {
  eyebrow: string;
  title: ReactNode;
  accent?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
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
  "Land a job while subscribed, we refund that month",
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
}: {
  badge?: ReactNode;
  badgeTone?: "accent" | "emerald" | "indigo" | "amber";
  breadcrumb?: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  subhead?: ReactNode;
  aside?: ReactNode;
  visual?: ReactNode;
  children?: ReactNode;
  sectionProps?: Record<string, string>;
}) {
  const tone = {
    accent: "border-accent/25 bg-accent/[0.08] text-accent-soft [--dot:rgb(var(--accent))]",
    emerald: "border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-300 [--dot:theme(colors.emerald.400)]",
    indigo: "border-indigo-500/25 bg-indigo-500/[0.08] text-indigo-200 [--dot:theme(colors.indigo.400)]",
    amber: "border-amber-500/25 bg-amber-500/[0.08] text-amber-200 [--dot:theme(colors.amber.400)]",
  }[badgeTone];

  const text = (
    <div className="max-w-4xl animate-fade-up opacity-0">
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
          <span className="block animate-[gradient-shift_8s_ease_infinite] bg-gradient-to-r from-accent-soft via-accent to-accent-2 bg-[length:200%_auto] bg-clip-text pb-1 text-transparent">
            {accent}
          </span>
        )}
      </h1>
      {subhead && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">{subhead}</div>}
    </div>
  );

  return (
    <section {...sectionProps} className={`relative overflow-hidden pb-14 pt-24 sm:pt-28 ${PAD}`}>
      <HeroBackdrop />
      <div className={`relative ${INNER}`}>
        {breadcrumb && <div className="mb-6 animate-fade-up text-[12px] text-slate-500 opacity-0">{breadcrumb}</div>}
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
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
            {text}
            {aside && (
              <div className="animate-fade-up opacity-0 lg:pb-2 lg:text-right" style={{ animationDelay: "120ms" }}>
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
  );
}

/** A hero sign-up: the primary button with the trust row beneath it. For PageHero's `aside`. */
export function HeroSignup({ href, label, align = "end" }: { href: string; label: ReactNode; align?: "start" | "end" }) {
  return (
    <div className={`flex flex-col gap-4 ${align === "end" ? "lg:items-end" : ""}`}>
      <a href={href} className={`${BTN_PRIMARY} w-full py-4 sm:w-auto`}>
        {label} <Chevron />
      </a>
      <TrustRow align={align} className="max-w-md" />
    </div>
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

/** FAQ as question cards whose answers open on click (see ./FaqAccordion.tsx). Answers stay in the HTML for search. */
export function FaqList({ items }: { items: { q: string; a: ReactNode }[] }) {
  return <FaqAccordion items={items} />;
}
