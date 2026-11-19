"use client";

import { CheckIcon } from "@/components/Icons";
import RefundPolicy from "@/components/RefundPolicy";
import { APP_URL } from "@/lib/site";
import {
  TIERS,
  tierFeatureLines,
  tierPeriodLabel,
  tierPriceLabel,
} from "@/lib/pricing";
import { GlowingEffect } from "@/components/ui/GlowingEffect";
import { BODY, BTN_PRIMARY, BTN_SECONDARY, H2, LABEL, SMALL } from "@/components/page/Layout";
import {
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
  MagneticHover,
  GlowDivider,
} from "@/components/LandingAnimations";


export default function Pricing() {
  return (
    <section id="pricing" className="relative">
      <div className="max-w-[1100px] mx-auto px-6 py-20">
        <GlowDivider />

        <RevealOnScroll className="text-center mb-16 mt-10">
          <p className={`${LABEL} text-indigo-400 mb-3`}>
            Pricing
          </p>
          <h2 className={`${H2} mb-4`}>
            Invest in yourself.
            <br />
            <span className="text-gradient">Start free.</span>
          </h2>
          <p className={`${BODY} max-w-lg mx-auto`}>
            Everything you need to make each application count, for less than a coffee a week.
          </p>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {TIERS.map((plan) => (
            <StaggerItem key={plan.name} className="flex flex-col">
              <div
                className={`relative rounded-2xl p-8 flex-1 flex flex-col ${
                  plan.mostPopular
                    ? "bg-gradient-to-br from-indigo-500/[0.10] to-purple-500/[0.05] border border-indigo-500/30 md:scale-[1.03]"
                    : "bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12]"
                } transition-all duration-300`}
              >
                {plan.mostPopular && <GlowingEffect spread={50} glow proximity={80} />}

                {plan.mostPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-[12px] font-semibold text-white whitespace-nowrap z-20">
                    Most Popular
                  </div>
                )}

                <div className="relative z-10 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-white mb-1">{plan.name}</h3>
                  <p className={`${SMALL} mb-4`}>{plan.tagline}</p>

                  <div className="mb-6">
                    <span className="text-5xl font-semibold text-white tracking-[-0.035em]">{tierPriceLabel(plan)}</span>
                    {tierPeriodLabel(plan) && (
                      <span className="text-[15px] text-slate-500 ml-1">{tierPeriodLabel(plan)}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-3.5 mb-8 flex-1">
                    {tierFeatureLines(plan).map((feature) => (
                      <div key={feature} className="flex items-center gap-2.5 text-[15px] leading-snug text-slate-300">
                        <CheckIcon className="flex-shrink-0 text-indigo-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.mostPopular ? (
                    <MagneticHover>
                      <a href={`${APP_URL}/sign-up`}
                        className={`${BTN_PRIMARY} w-full`}>
                        {plan.cta}
                      </a>
                    </MagneticHover>
                  ) : (
                    <a href={`${APP_URL}/sign-up`}
                      className={`${BTN_SECONDARY} w-full`}>
                      {plan.cta}
                    </a>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Refund policy */}
        <RefundPolicy />

        <p className="text-center text-[13px] text-slate-600 mt-5">
          University student? Verify your .edu email for{" "}
          <span className="text-slate-400 font-medium">1 month of Pro free</span>. No card needed;
          after 30 days you move to the Free plan.
        </p>

      </div>
    </section>
  );
}