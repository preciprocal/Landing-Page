/**
 * components/page/CompareTable.tsx
 *
 * The feature comparison table for the hand-built comparison pages
 * (Jobscan, Resume Worded, Final Round AI). Server component.
 *
 * Rows keep their copy as written, including the status mark at the start of
 * each cell ("✅ ...", "❌ ...", "⚠️ ..."). The mark is drawn as an icon with
 * a screen reader label ("Yes", "No", "Partly") and the rest of the text is
 * shown beside it, so the status never relies on colour or an emoji alone.
 *
 * The header row sticks below the floating navbar while the table scrolls.
 * The wrapper clips with overflow-clip, not overflow-hidden, so it does not
 * become a scroll container and break the sticky header. The Preciprocal
 * column carries a faint wash in the page accent.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { Check, Minus, X } from "lucide-react";
import Chevron from "@/components/Chevron";
import { CARD, Eyebrow, HoverRule } from "@/components/page/Layout";
import { RevealGroup, RevealItem } from "@/components/page/Reveal";

type Status = "yes" | "no" | "partial" | "none";

export type CompareRow = { feature: string; preciprocal: string; other: string };

function parse(cell: string): { status: Status; text: string } {
  const t = cell.trim();
  if (t.startsWith("✅")) return { status: "yes", text: t.slice(1).trim() };
  if (t.startsWith("❌")) return { status: "no", text: t.slice(1).trim() };
  if (t.startsWith("⚠️")) return { status: "partial", text: t.slice(2).trim() };
  if (t.startsWith("⚠")) return { status: "partial", text: t.slice(1).trim() };
  return { status: "none", text: t };
}

const MARK: Record<Exclude<Status, "none">, { label: string; Icon: typeof Check; cls: string }> = {
  yes: { label: "Yes", Icon: Check, cls: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" },
  no: { label: "No", Icon: X, cls: "border-rose-400/25 bg-rose-400/[0.08] text-rose-300" },
  partial: { label: "Partly", Icon: Minus, cls: "border-amber-400/30 bg-amber-400/10 text-amber-300" },
};

function Cell({ value, strong = false }: { value: string; strong?: boolean }) {
  const { status, text } = parse(value);
  const mark = status === "none" ? null : MARK[status];
  return (
    <span className="flex items-start gap-2.5">
      {mark && (
        <span
          aria-hidden="true"
          className={`mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full border ${mark.cls}`}
        >
          <mark.Icon className="h-3 w-3" strokeWidth={2.75} />
        </span>
      )}
      <span className={strong ? "text-slate-200" : "text-slate-400"}>
        {mark && <span className="sr-only">{mark.label}: </span>}
        {text}
      </span>
    </span>
  );
}

export default function CompareTable({
  competitor,
  rows,
  caption,
}: {
  competitor: string;
  rows: CompareRow[];
  caption: string;
}) {
  const head = "sticky top-[calc(var(--banner-h,0px)+72px)] z-10 border-b border-white/[0.08] bg-[#0a0f1c]/95 px-3 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur sm:px-5";
  return (
    <div className="overflow-clip rounded-2xl border border-white/[0.08] bg-[#070b16]">
      <table className="w-full table-fixed border-separate border-spacing-0 text-[13px] leading-snug sm:text-sm">
        <caption className="sr-only">{caption}</caption>
        <colgroup>
          <col className="w-[32%] sm:w-[28%]" />
          <col className="w-[34%] sm:w-[38%]" />
          <col className="w-[34%]" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className={`${head} text-slate-500`}>Feature</th>
            <th scope="col" className={`${head} border-x border-x-accent/20 text-accent-soft`}>
              <span className="relative">
                Preciprocal
                <span aria-hidden="true" className="absolute -bottom-1.5 left-0 h-px w-full bg-gradient-to-r from-accent to-transparent" />
              </span>
            </th>
            <th scope="col" className={`${head} text-slate-400`}>{competitor}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const last = i === rows.length - 1;
            const rule = last ? "" : "border-b border-white/[0.05]";
            return (
              <tr key={row.feature} className="transition-colors hover:bg-white/[0.02]">
                <th scope="row" className={`px-3 py-3.5 text-left align-top font-medium text-white sm:px-5 ${rule}`}>
                  {row.feature}
                </th>
                <td className={`border-x border-x-accent/20 bg-accent/[0.05] px-3 py-3.5 align-top sm:px-5 ${rule}`}>
                  <Cell value={row.preciprocal} strong />
                </td>
                <td className={`px-3 py-3.5 align-top sm:px-5 ${rule}`}>
                  <Cell value={row.other} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Companion blocks for the same pages ───────────────────────────────── */

/**
 * The quick verdict: "Choose <competitor> if..." beside "Choose Preciprocal
 * if...", the Preciprocal side washed in the page accent.
 */
export function Verdict({ competitor, preciprocal }: { competitor: ReactNode; preciprocal: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070b16]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <p className="flex items-center gap-2 border-b border-white/[0.06] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft sm:px-8">
        Quick verdict
      </p>
      <div className="grid md:grid-cols-2">
        <p className="px-6 py-6 leading-relaxed text-slate-300 sm:px-8 sm:py-7">{competitor}</p>
        <p className="border-t border-accent/20 bg-accent/[0.05] px-6 py-6 leading-relaxed text-slate-200 sm:px-8 sm:py-7 md:border-l md:border-t-0">
          {preciprocal}
        </p>
      </div>
    </div>
  );
}

/** Two headline prices side by side; `highlight` marks Preciprocal's. */
export function PriceCompare({ items }: { items: { label: string; price: string; note: string; highlight: boolean }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map(({ label, price, note, highlight }) => (
        <div
          key={label}
          className={`relative overflow-hidden rounded-2xl border p-6 sm:p-7 ${
            highlight ? "border-accent/35 bg-accent/[0.07]" : "border-white/[0.07] bg-white/[0.025]"
          }`}
        >
          {highlight && <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />}
          <p className="text-sm text-slate-400">{label}</p>
          {/* "$49.95/mo": the figure large, the period small, as on the homepage pricing cards. */}
          <p className={`mt-2 whitespace-nowrap text-3xl font-extrabold tracking-tight sm:text-4xl ${highlight ? "text-accent-soft" : "text-slate-200"}`}>
            {price.split("/")[0]}
            {price.includes("/") && <span className="ml-0.5 text-base font-medium text-slate-500">/{price.split("/").slice(1).join("/")}</span>}
          </p>
          <p className="mt-1 text-sm text-slate-400">{note}</p>
        </div>
      ))}
    </div>
  );
}

/** The reasons to choose Preciprocal, as a two-column grid of ticked cards. */
export function ReasonGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <RevealGroup className="grid gap-4 md:grid-cols-2">
      {items.map(({ title, body }) => (
        <RevealItem key={title} className={`${CARD} flex gap-4 p-6 sm:p-7`}>
          <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent-soft">
            <Check className="h-3.5 w-3.5" strokeWidth={2.75} />
          </span>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{body}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** "Related resources" as a ruled grid of links. */
export function RelatedLinks({ links, title = "Related resources" }: { links: { label: string; href: string }[]; title?: string }) {
  return (
    <>
      <Eyebrow>Keep reading</Eyebrow>
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h2>
      <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3 fill-sm-2 fill-lg-3">
        {links.map(({ label, href }) => (
          <RevealItem key={href} className="bg-[#070b16]">
            <Link
              href={href}
              className="group relative flex h-full min-h-[56px] items-center justify-between gap-3 px-5 py-4 text-sm text-slate-300 transition-colors hover:bg-[#0a1020] hover:text-white"
            >
              {label}
              <Chevron className="text-accent" />
              <HoverRule className="inset-x-5" />
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </>
  );
}
