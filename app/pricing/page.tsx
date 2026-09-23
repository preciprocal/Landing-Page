"use client";

/**
 * app/pricing/page.tsx
 *
 * Standalone /pricing page, targets high-intent searches like
 * "preciprocal pricing", "AI interview prep cost", "mock interview app price".
 *
 * SEO additions over the homepage Pricing section:
 *   • PricingPageJsonLd, OfferCatalog + individual Offer schemas with full detail
 *   • BreadcrumbList JSON-LD
 *   • WebPage JSON-LD linking back to site entity graph
 *   • Canonical URL /pricing
 *   • Visible breadcrumb nav (crawlable)
 *   • aria-labels on all sections
 *   • FAQ block targeting "pricing" intent queries
 *   • Metadata in app/pricing/metadata.ts
 */

import Link from "next/link";
import { CheckIcon } from "@/components/Icons";
import { APP_URL } from "@/lib/constants";
import { GlowingEffect } from "@/components/ui/GlowingEffect";
import {
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
  MagneticHover,
  GlowDivider,
  SpotlightCard,
} from "@/components/LandingAnimations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Packs from "@/components/Packs";
import SuccessStories from "@/components/SuccessStories";
import RefundPolicy from "@/components/RefundPolicy";
import {
  TIERS,
  getPacks,
  tierFeatureLines,
  tierPeriodLabel,
  tierPriceLabel,
  tierPriceWithPeriod,
  tierSchemaPrice,
} from "@/lib/pricing";

// ─── Structured data ──────────────────────────────────────────────────────────
function PricingJsonLd() {
  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": "https://preciprocal.com/pricing#offercatalog",
    name: "Preciprocal Pricing Plans",
    url: "https://preciprocal.com/pricing",
    description: `AI-powered job search platform plans, Free, Pro (${tierPriceWithPeriod("pro")}), and Premium (${tierPriceWithPeriod("premium")}).`,
    provider: { "@id": "https://preciprocal.com/#organization" },
    // Derived from lib/pricing.ts so the structured-data price and quota claims
    // cannot drift from what the cards below actually render.
    itemListElement: TIERS.map((tier) => ({
      "@type": "Offer",
      "@id": `https://preciprocal.com/pricing#${tier.id}`,
      name: tier.name,
      price: tierSchemaPrice(tier.id),
      priceCurrency: "USD",
      description: `${tierFeatureLines(tier).join(", ")}.`,
      availability: "https://schema.org/InStock",
      url: tier.id === "free" ? `${APP_URL}/sign-up` : `${APP_URL}/sign-up?plan=${tier.id}`,
      ...(tier.priceUsd > 0 ? { billingIncrement: "P1M" } : {}),
      seller: { "@id": "https://preciprocal.com/#organization" },
    })),
  };

  const packsSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": "https://preciprocal.com/pricing#packs",
    name: "Preciprocal Add-On Packs",
    url: "https://preciprocal.com/pricing",
    description: "One-time top-up packs that stack on any Preciprocal plan.",
    provider: { "@id": "https://preciprocal.com/#organization" },
    itemListElement: getPacks().map((pack) => ({
      "@type": "Offer",
      "@id": `https://preciprocal.com/pricing#${pack.id}`,
      name: pack.name,
      price: pack.priceUsd.toFixed(2),
      priceCurrency: "USD",
      description: pack.items.join(", "),
      availability: "https://schema.org/InStock",
      url: `${APP_URL}/sign-up`,
      seller: { "@id": "https://preciprocal.com/#organization" },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://preciprocal.com" },
      { "@type": "ListItem", position: 2, name: "Pricing", item: "https://preciprocal.com/pricing" },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://preciprocal.com/pricing#webpage",
    url: "https://preciprocal.com/pricing",
    name: "Preciprocal Pricing, Start Free, Land Faster",
    description: "Free plan available. Pro at $9.99/mo. Land a job while subscribed and we refund that month.",
    isPartOf: { "@id": "https://preciprocal.com/#website" },
    about: { "@id": "https://preciprocal.com/#software" },
    inLanguage: "en-US",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(packsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────


const PRICING_FAQS = [
  {
    q: "Is there a free plan?",
    a: "Yes, Preciprocal's free plan includes 3 resume analyses, 5 cover letters, 1 mock interview and 1 AI interview analysis per month, with no credit card required. You can use it indefinitely.",
  },
  {
    q: "What's included in the Pro plan?",
    a: "Pro ($9.99/mo) includes 20 resume analyses, 30 cover letters, 2 mock interviews of 10 minutes each, 10 study plans, 5 LinkedIn optimisations, 20 outreach messages, 15 contact searches, 4 AI analyses of real interviews, 60 logged interviews, an unlimited job tracker and priority AI response speed.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel your subscription at any time from your account settings. You'll keep access until the end of your billing period.",
  },
  {
    q: "Can I get a refund?",
    a: "Three rules, depending on what you bought. On a subscription, if you have used more than half of your monthly allowance for the current billing period, you can request a refund for the value of what you have not used, minus payment processing fees. This is based on usage, not on satisfaction. Separately, if you land a job while subscribed, send us your offer letter, a public LinkedIn post about your experience and a short testimonial, all three, and we will refund that month's subscription in full; this covers your most recent billing period only, not your whole subscription history. One-time packs are different: refundable in full within 7 days of purchase if you have not used any of the pack, and non-refundable once you have used part of it.",
  },
  {
    q: "Is there a student discount?",
    a: "Yes. Verify your .edu email address and get 1 month of Pro free with no credit card required.",
  },
  {
    q: "What's the difference between Pro and Premium?",
    a: "Both plans include the same tools; Premium raises the monthly limits. Pro gives you 20 resume analyses, 30 cover letters and 2 mock interviews of 10 minutes each. Premium ($24.99/mo) gives you 50, 80 and 5 of 12 minutes each, plus 25 study plans, 15 LinkedIn optimisations, 60 outreach messages, 50 contact searches, 12 AI interview analyses and 150 logged interviews, and it adds priority support on a 24-hour SLA plus early access to new features.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#050810]">
      <PricingJsonLd />
      <Navbar />

      <main className="relative overflow-hidden">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="w-full pt-28 pb-0 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-slate-400">Pricing</li>
          </ol>
        </nav>

        {/* ── Hero ── */}
        <section aria-label="Pricing plans" className="relative">
          <div className="w-full py-16 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48">
            <GlowDivider />

            <RevealOnScroll className="text-center mb-16 mt-10">
              <p className="text-[13px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">
                Pricing
              </p>
              <h1 className="text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-4">
                Invest in yourself.
                <br />
                <span className="text-gradient">It pays back fast.</span>
              </h1>
              <p className="text-base text-slate-400 max-w-lg mx-auto">
                The average job search costs months of lost salary. Preciprocal helps you land
                offers weeks faster, for less than a single coffee a day.
              </p>
            </RevealOnScroll>

            {/* ── Plan cards ── */}
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
                      <h2 className="text-xl font-bold text-white mb-1">{plan.name}</h2>
                      <p className="text-[13px] text-slate-500 mb-4">{plan.tagline}</p>

                      <div className="mb-6">
                        <span className="text-5xl font-extrabold text-white tracking-tight">
                          {tierPriceLabel(plan)}
                        </span>
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
                          <a
                            href={`${APP_URL}/sign-up?plan=${plan.id}`}
                            className="block w-full text-center py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-300
                                       bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)]"
                          >
                            {plan.cta}
                          </a>
                        </MagneticHover>
                      ) : (
                        <a
                          href={plan.id === "free" ? `${APP_URL}/sign-up` : `${APP_URL}/sign-up?plan=${plan.id}`}
                          className="block w-full text-center py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-300
                                     bg-white/[0.05] border border-white/[0.12] text-slate-200 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5"
                        >
                          {plan.cta}
                        </a>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            {/* ── Refund policy ── */}
            <RefundPolicy />

            <p className="text-center text-[13px] text-slate-600 mt-5">
              University student? Verify your .edu email for{" "}
              <span className="text-slate-400 font-medium">1 month of Pro free</span>, no
              card needed.
            </p>
          </div>
        </section>

        {/* ── One-time packs ── */}
        <Packs />

        {/* ── Success stories (hides itself when none are approved yet) ── */}
        <SuccessStories />

        {/* ── Pricing FAQ ── */}
        <section aria-label="Pricing frequently asked questions" className="relative py-16 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48">
          <div className="max-w-2xl mx-auto">
            <RevealOnScroll className="mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                Common questions
              </h2>
              <p className="text-slate-500 text-sm">
                Everything you need to know before subscribing.
              </p>
            </RevealOnScroll>

            <StaggerChildren className="space-y-3">
              {PRICING_FAQS.map(({ q, a }) => (
                <StaggerItem key={q}>
                  <SpotlightCard
                    className="rounded-xl border border-white/[0.06] bg-[#0a0f1e]/80 p-6"
                    spotlightColor="rgba(99,102,241,0.04)"
                  >
                    <h3 className="text-[14px] font-semibold text-white mb-2">{q}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{a}</p>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <RevealOnScroll className="mt-8 text-center">
              <p className="text-[13px] text-slate-600">
                More questions?{" "}
                <Link href="/faq" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                  Read the full FAQ →
                </Link>
                {" "}or{" "}
                <a href="mailto:support@preciprocal.com" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                  email us
                </a>
              </p>
            </RevealOnScroll>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}