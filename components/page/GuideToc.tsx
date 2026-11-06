"use client";

/**
 * components/page/GuideToc.tsx
 *
 * "In this guide" for the guide article on tool pages. The article is
 * per-page JSX, so the list is read from the rendered article: its title plus
 * every h3 inside it, each given an id if it has none. The heading in view is
 * highlighted as the reader scrolls. Renders nothing until mounted, and
 * nothing when the article has no subheadings.
 */

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

export default function GuideToc({ articleId, title }: { articleId: string; title: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const article = document.getElementById(articleId);
    if (!article) return;
    const heads = [...article.querySelectorAll<HTMLElement>("h2, h3")];
    const found = heads.map((h, i) => {
      if (!h.id) h.id = `guide-${slug(h.textContent || "") || i}`;
      h.style.scrollMarginTop = "7rem";
      return { id: h.id, label: i === 0 ? title : (h.textContent || "").trim() };
    });
    setItems(found);
    setActive(found[0]?.id ?? "");

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [articleId, title]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="In this guide">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">In this guide</p>
      <ol className="relative space-y-1 border-l border-white/[0.07]">
        {items.map((it, i) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`-ml-px flex gap-3 border-l py-1.5 pl-4 text-[13px] leading-snug transition-colors ${
                  on ? "border-accent text-white" : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                <span className={`font-mono text-[11px] ${on ? "text-accent-soft" : "text-slate-600"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span>{it.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
