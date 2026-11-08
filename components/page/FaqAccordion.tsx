"use client";

/**
 * components/page/FaqAccordion.tsx
 *
 * The FAQ on every content page (rendered through FaqList in ./Layout.tsx).
 * Each question is its own card: the question and a chevron in a
 * circle that turns when the answer opens. All start closed. The answer
 * slides open with a height transition (grid rows 0fr to 1fr) and stays in
 * the HTML while closed, so search engines and the FAQ structured data still
 * see it. Questions are h3 buttons with aria-expanded and aria-controls.
 */

import { useId, useState, type ReactNode } from "react";

export default function FaqAccordion({ items }: { items: { q: string; a: ReactNode }[] }) {
  const base = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = open.has(i);
        const panel = `${base}-a${i}`;
        const button = `${base}-q${i}`;
        return (
          <div
            key={i}
            className={`rounded-xl border transition-colors duration-300 ${
              isOpen ? "border-accent/30 bg-white/[0.04]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14]"
            }`}
          >
            <h3>
              <button
                id={button}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => toggle(i)}
                className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:px-6"
              >
                <span className="flex-1 text-[15.5px] font-medium leading-snug text-white">{faq.q}</span>
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen ? "rotate-180 border-accent/40 bg-accent-deep/15 text-accent" : "border-white/[0.1] text-slate-400"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={button}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`max-w-[72ch] pb-5 pl-5 pr-6 text-[15px] leading-relaxed text-slate-400 transition-opacity duration-300 sm:pl-6 sm:pr-14 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
