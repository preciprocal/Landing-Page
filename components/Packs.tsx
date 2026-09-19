"use client";

/**
 * components/Packs.tsx
 *
 * One-time top-up purchases, shown below the three subscription tiers on
 * /pricing. Deliberately lighter than the tier cards so it cannot be mistaken
 * for a fourth tier.
 *
 * Layout notes: name and price sit in a fixed-height header above a divider, so
 * the divider and the grant list start on the same baseline in all four cards
 * regardless of how many grants each pack has.
 *
 * All prices and grants come from `getPacks()` in lib/pricing.ts. Never put a
 * price string in this file.
 */

import { Plus } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import { PACK_REFUND_LINE, formatUsd, getPacks } from "@/lib/pricing";
import { RevealOnScroll, StaggerChildren, StaggerItem } from "@/components/LandingAnimations";

export default function Packs() {
  const packs = getPacks();

  if (packs.length === 0) return null;

  return (
    <section aria-label="One-time add-on packs" className="relative px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48 py-20">
      <div className="w-full">
        <RevealOnScroll className="text-center mb-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-400 mb-3">
            Top-ups
          </p>
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-white tracking-tight mb-3">
            Need more for one big week?
          </h2>
          <p className="text-[13px] text-slate-500 leading-relaxed max-w-md mx-auto">
            One-time purchases, not a subscription. Buy a pack when a final round lands, and
            it stacks on whatever plan you are already on.
          </p>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {packs.map((pack) => (
            <StaggerItem key={pack.id} className="flex flex-col">
              <div
                className="flex flex-col flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6
                           hover:border-white/[0.14] transition-colors duration-300"
              >
                {/* Fixed-height header keeps every divider on one baseline */}
                <div className="h-[58px]">
                  <h3 className="text-[13px] font-semibold text-white leading-tight">
                    {pack.name}
                  </h3>
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="text-[26px] font-extrabold text-white tracking-tight leading-none">
                      {formatUsd(pack.priceUsd)}
                    </span>
                    <span className="text-[11px] text-slate-500">one-time</span>
                  </div>
                </div>

                <div className="h-px bg-white/[0.06] my-5" />

                <ul className="space-y-2.5">
                  {pack.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Plus
                        className="w-3 h-3 mt-[3px] flex-shrink-0 text-indigo-400"
                        aria-hidden="true"
                      />
                      <span className="text-[12.5px] text-slate-300 leading-snug">
                        {item.replace(/^\+\s*/, "")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Pack refunds work differently from subscription refunds, so the rule
            sits with the packs instead of only in the FAQ. */}
        <p className="text-center text-[12px] text-slate-500 leading-relaxed mt-8 max-w-xl mx-auto">
          {PACK_REFUND_LINE}
        </p>

        <p className="text-center text-[11px] text-slate-600 mt-3">
          Packs are available from your dashboard once you have an account.{" "}
          <a
            href={`${APP_URL}/sign-up`}
            className="text-slate-400 hover:text-slate-300 transition-colors underline underline-offset-2"
          >
            Start free
          </a>
        </p>
      </div>
    </section>
  );
}
