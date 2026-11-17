/**
 * components/page/ExploreLinks.tsx
 *
 * A compact row of links to the site's main pages, for pages that otherwise
 * link nowhere but the navbar and footer (about, roadmap, pricing, FAQ,
 * contact). It gives readers a next step and search engines a path into the
 * product and guide pages. The current page is left out.
 */

import Link from "next/link";
import Chevron from "@/components/Chevron";
import { CARD, CARD_HOVER, INNER, LABEL, PAD } from "@/components/page/Layout";

const LINKS = [
  { href: "/features", label: "Features", note: "Every tool, by stage of the search" },
  { href: "/how-it-works", label: "How it works", note: "From resume to offer, step by step" },
  { href: "/pricing", label: "Pricing", note: "Free plan, Pro and Premium" },
  { href: "/free-ats-checker", label: "Free ATS checker", note: "Score your resume against a posting" },
  { href: "/opt", label: "OPT guides", note: "Dates, rules and calculators" },
  { href: "/blog", label: "Blog", note: "Interview and job search guides" },
] as const;

export default function ExploreLinks({ current, className = "" }: { current: string; className?: string }) {
  const links = LINKS.filter((l) => l.href !== current).slice(0, 4);
  return (
    <nav aria-label="Explore Preciprocal" className={`${PAD} ${className}`}>
      <div className={INNER}>
        <p className={`mb-4 ${LABEL} text-slate-500`}>Explore</p>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <li key={l.href} className="min-w-0">
              <Link href={l.href} className={`group flex h-full items-center justify-between gap-3 ${CARD} ${CARD_HOVER} p-5`}>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold text-white">{l.label}</span>
                  <span className="mt-0.5 block text-[13px] text-slate-500">{l.note}</span>
                </span>
                <Chevron />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
