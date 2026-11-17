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
 * regardless of how many grants each pack has. The Just me / Group of 4
 * switch swaps in each pack's group name and price.
 *
 * All prices and grants come from `getPacks()` in lib/pricing.ts. Never put a
 * price string in this file.
 */

import { useState } from "react";
import { Plus } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import { GROUP_PACK_REFUND_LINE, PACK_REFUND_LINE, formatUsd, getPacks } from "@/lib/pricing";
import { RevealOnScroll, StaggerChildren, StaggerItem } from "@/components/LandingAnimations";

import { BODY, H2, H3, LABEL, SMALL } from "@/components/page/Layout";
export default function Packs() {
  const packs = getPacks();
  const [group, setGroup] = useState(false);

  if (packs.length === 0) return null;

  return (
    <section aria-label="One-time add-on packs" className="relative px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48 py-20">
      <div className="w-full">
        <RevealOnScroll className="text-center mb-12">
          <p className={`${LABEL} text-indigo-400 mb-3`}>
            Top-ups
          </p>
          <h2 className={`${H2} mb-3`}>
            Need more for one big week?
          </h2>
          <p className={`${BODY} max-w-md mx-auto`}>
            One-time purchases, not a subscription. Buy a pack when a final round lands, and
            it stacks on whatever plan you are already on.
          </p>

          {/* Same switch as the app's pricing page. */}
          <div role="group" aria-label="Who the pack is for" className="mt-6 inline-flex rounded-lg border border-white/[0.08] bg-white/[0.02] p-1">
            {[
              { value: false, label: "Just me" },
              { value: true, label: "Group of 4" },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                aria-pressed={group === opt.value}
                onClick={() => setGroup(opt.value)}
                className={`h-9 rounded-md px-3.5 text-[13px] font-semibold transition-colors ${
                  group === opt.value ? "bg-white/[0.08] text-white" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {group && (
            <p className={`mt-3 ${SMALL} max-w-md mx-auto`}>
              You get the full pack and an invite link. Up to 3 friends open it, sign in, and each
              gets their own full set.
            </p>
          )}
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {packs.map((pack) => (
            <StaggerItem key={pack.id} className="flex flex-col">
              <div
                className="flex flex-col flex-1 rounded-xl border border-white/[0.07] bg-white/[0.02] p-6
                           hover:border-white/[0.14] transition-colors duration-300"
              >
                {/* Fixed-height header keeps every divider on one baseline */}
                <div className="h-[64px]">
                  <h3 className={H3}>
                    {group ? `Group ${pack.name.replace(/ Pack$/, "")}` : pack.name}
                  </h3>
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="text-3xl font-semibold text-white tracking-[-0.035em] leading-none">
                      {formatUsd(group ? pack.groupPriceUsd : pack.priceUsd)}
                    </span>
                    <span className="text-[13px] text-slate-500">one-time</span>
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
                      <span className="text-[15px] text-slate-300 leading-snug">
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
        <p className={`text-center ${SMALL} mt-8 max-w-xl mx-auto`}>
          {PACK_REFUND_LINE}
          {group && <> {GROUP_PACK_REFUND_LINE}</>}
        </p>

        <p className="text-center text-[13px] text-slate-600 mt-3">
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
