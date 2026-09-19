"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@/components/Icons";
import RefundPolicy from "@/components/RefundPolicy";
import { APP_URL } from "@/lib/constants";
import {
  TIERS,
  tierFeatureLines,
  tierPeriodLabel,
  tierPriceLabel,
} from "@/lib/pricing";
import { GlowingEffect } from "@/components/ui/GlowingEffect";
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
          <p className="text-[13px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-4">
            Invest in yourself.
            <br />
            <span className="text-gradient">It pays back fast.</span>
          </h2>
          <p className="text-base text-slate-400 max-w-lg mx-auto">
            The average job search costs months of lost salary. Preciprocal helps you land offers weeks faster, for less than a single coffee a day.
          </p>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {TIERS.map((plan) => (
            <StaggerItem key={plan.name} className="flex flex-col">
              <div
                className={`relative rounded-2xl p-9 flex-1 flex flex-col ${
                  plan.mostPopular
                    ? "bg-gradient-to-br from-indigo-500/[0.10] to-purple-500/[0.05] border border-indigo-500/30 md:scale-[1.03]"
                    : "bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12]"
                } transition-all duration-300`}
              >
                {plan.mostPopular && <GlowingEffect spread={50} glow proximity={80} />}

                {plan.mostPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-xs font-bold text-white whitespace-nowrap z-20">
                    Most Popular
                  </div>
                )}

                <div className="relative z-10 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-[13px] text-slate-500 mb-4">{plan.tagline}</p>

                  <div className="mb-6">
                    <span className="text-5xl font-extrabold text-white tracking-tight">{tierPriceLabel(plan)}</span>
                    {tierPeriodLabel(plan) && (
                      <span className="text-[15px] text-slate-500 ml-1">{tierPeriodLabel(plan)}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-3.5 mb-8 flex-1">
                    {tierFeatureLines(plan).map((feature) => (
                      <div key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <CheckIcon className="flex-shrink-0 text-indigo-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.mostPopular ? (
                    <MagneticHover>
                      <a href={`${APP_URL}/sign-up`}
                        className="block w-full text-center py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-300
                                   bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)]">
                        {plan.cta}
                      </a>
                    </MagneticHover>
                  ) : (
                    <a href={`${APP_URL}/sign-up`}
                      className="block w-full text-center py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-300
                                 bg-white/[0.05] border border-white/[0.12] text-slate-200 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5">
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
          <span className="text-slate-400 font-medium">1 month of Pro free</span>, no card
          needed.
        </p>

        {/* FAQ link, catches hesitant buyers */}
        <p className="text-center text-[12px] text-slate-700 mt-3">
          Have questions before subscribing?{" "}
          <a href="/faq" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            Read our FAQ →
          </a>
        </p>
      </div>
    </section>
  );
}