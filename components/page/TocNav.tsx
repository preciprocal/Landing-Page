"use client";

/**
 * components/page/TocNav.tsx
 *
 * Table of contents for long documents (the legal pages). On lg+ it is a
 * sticky list beside the text that highlights the section being read; below
 * lg it collapses into a <details> above the text. Sections are found by id,
 * so each item's `id` must match an element on the page.
 *
 *   <TocNav items={[{ id: "eligibility", title: "Eligibility" }, ...]} />
 */

import { useEffect, useRef, useState } from "react";
import { pad2 } from "./Layout";

export type TocItem = { id: string; title: string };

export default function TocNav({ items, label = "On this page" }: { items: TocItem[]; label?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const els = items.map((it) => document.getElementById(it.id)).filter((el): el is HTMLElement => !!el);
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        // The first section, in document order, inside the reading band.
        const first = items.find((it) => visible.has(it.id));
        if (first) setActive(first.id);
      },
      // A band across the upper part of the viewport, below the floating navbar.
      { rootMargin: "-112px 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const list = (onPick?: () => void) => (
    <ol className="space-y-0.5 border-l border-white/[0.07]">
      {items.map((it, i) => {
        const on = it.id === active;
        return (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              onClick={onPick}
              aria-current={on ? "location" : undefined}
              className={`-ml-px flex min-h-[40px] items-baseline gap-3 border-l py-2 pl-4 pr-2 text-[13px] leading-snug transition-colors lg:min-h-0 lg:py-1.5 ${
                on
                  ? "border-accent text-white"
                  : "border-transparent text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              <span className={`font-mono text-[11px] ${on ? "text-accent-soft" : "text-slate-500"}`}>{pad2(i + 1)}</span>
              <span>{it.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* Mobile and tablet: collapsible, closes once a section is picked */}
      <details ref={detailsRef} className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] lg:hidden">
        <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
          {label}
          <span
            aria-hidden="true"
            className="relative h-3.5 w-3.5 shrink-0 text-slate-400 transition-[transform,color] duration-300 group-open:rotate-45 group-open:text-accent"
          >
            <span className="absolute left-1/2 top-0 h-3.5 w-px -translate-x-1/2 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-3.5 -translate-y-1/2 bg-current" />
          </span>
        </summary>
        <nav aria-label={label} className="border-t border-white/[0.06] px-3 pb-4 pt-3">
          {list(() => {
            if (detailsRef.current) detailsRef.current.open = false;
          })}
        </nav>
      </details>

      {/* Desktop: sticky beside the text */}
      <nav aria-label={label} className="hidden lg:block">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
        <div className="max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 [scrollbar-width:thin]">{list()}</div>
      </nav>
    </>
  );
}
