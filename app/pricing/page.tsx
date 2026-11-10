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
import { RevealOnScroll, StaggerChildren, StaggerItem } from "@/components/LandingAnimations";
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
import Chevron from "@/components/Chevron";
import { PAD, INNER, Breadcrumbs, FaqList, SectionHead } from "@/components/page/Layout";

// ─── Structured data ──────────────────────────────────────────────────────────
function PricingJsonLd() {
  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": "https://preciprocal.com/pricing#offercatalog",
    name: "Preciprocal Pricing Plans",
    url: "https://preciprocal.com/pricing",
    description: `AI career prep platform plans, Free, Pro (${tierPriceWithPeriod("pro")}), and Premium (${tierPriceWithPeriod("premium")}).`,
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
    a: "Yes, Preciprocal's free plan includes 3 resume analyses, 5 cover letters, 1 mock interview of 8 minutes and 2 interview debriefs per month, with no credit card required. You can use it indefinitely.",
  },
  {
    q: "What's included in the Pro plan?",
    a: "Pro ($9.99/mo) includes 20 resume analyses, 30 cover letters, 3 mock interviews of 10 minutes each, 10 study plans, 5 interview debriefs, 5 LinkedIn optimisations, 20 outreach messages, 15 recruiter contact searches and an unlimited job tracker, plus priority AI response speed.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel your subscription at any time from your account settings. You'll keep access until the end of your billing period.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes, whenever you ask, from Settings > Plan & Billing > Refunds in the app. At any point in your billing month you can get back the part of that month you have not used, less card processing fees (our payment provider keeps those, about $0.66 on a $9.99 payment). Each feature counts by what it costs to run, so a mock interview counts for more than a cover letter. In your first 7 days, if you have barely used your plan, you get your first payment back instead, less the same fees. Once a new billing month starts the previous one can no longer be refunded, and an unused-credits refund is available once every 6 months. Separately, if you land a job while subscribed, send us your offer letter, a public LinkedIn post about your experience and a short testimonial, all three, and we will refund that month's subscription in full; this covers your most recent billing period only. One-time packs can be returned within 7 days of purchase if none of the pack has been used, less the card processing fee.",
  },
  {
    q: "Is there a student discount?",
    a: "Yes. Verify your .edu email address and get 1 month of Pro free. A card is required to start the trial, nothing is charged for 30 days, and you can cancel any time before it ends.",
  },
  {
    q: "What's the difference between Pro and Premium?",
    a: "Both plans include the same tools; Premium raises the monthly limits. Pro gives you 20 resume analyses, 30 cover letters and 3 mock interviews of 10 minutes each. Premium ($24.99/mo) gives you 50, 80 and 5 of 12 minutes each, plus 25 study plans, 10 interview debriefs, 15 LinkedIn optimisations, 60 outreach messages and 50 recruiter contact searches, and it adds priority support on a 24-hour SLA plus early access to new features.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <div data-accent="indigo" className="min-h-screen bg-[#050810]">
      <PricingJsonLd />
      <Navbar />

      <main className="relative overflow-hidden">

        {/* ── Breadcrumb ── */}
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />

        {/* ── Plans first: a short head, then the three cards ── */}
        <section data-section="pricing-plans" data-section-name="Pricing plans" aria-label="Pricing plans" className={`relative pb-6 pt-12 sm:pt-16 ${PAD}`}>
          <div className={INNER}>
            <RevealOnScroll className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-indigo-400">
                Pricing
              </p>
              <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-[42px]">
                Invest in yourself.
                <br />
                <span className="text-gradient">It pays back fast.</span>
              </h1>
              <p className="mx-auto max-w-lg text-base text-slate-400">
                On OPT, a slow search costs you more than time. Everything you need to make each
                application count, for less than a coffee a week.
              </p>
            </RevealOnScroll>

            {/* ── Plan cards ── */}
            <StaggerChildren className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-5 md:grid-cols-3">
              {TIERS.map((plan) => (
                <StaggerItem key={plan.name} className="flex flex-col">
                  <div
                    className={`relative flex flex-1 flex-col rounded-2xl p-8 transition-colors duration-300 lg:p-9 ${
                      plan.mostPopular
                        ? "border border-indigo-500/30 bg-gradient-to-br from-indigo-500/[0.10] to-purple-500/[0.05]"
                        : "border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
                    }`}
                  >
                    {plan.mostPopular && (
                      <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1.5 text-xs font-bold text-white">
                        Most Popular
                      </div>
                    )}

                    <div className="relative z-10 flex flex-1 flex-col">
                      <h2 className="mb-1 text-xl font-bold text-white">{plan.name}</h2>
                      <p className="mb-4 text-[13px] text-slate-500">{plan.tagline}</p>

                      <div className="mb-6">
                        <span className="text-5xl font-extrabold tracking-tight text-white">
                          {tierPriceLabel(plan)}
                        </span>
                        {tierPeriodLabel(plan) && (
                          <span className="ml-1 text-[15px] text-slate-500">{tierPeriodLabel(plan)}</span>
                        )}
                      </div>

                      <div className="mb-8 flex flex-1 flex-col gap-3.5">
                        {tierFeatureLines(plan).map((feature) => (
                          <div key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
                            <CheckIcon className="flex-shrink-0 text-indigo-400" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <a
                        href={plan.id === "free" ? `${APP_URL}/sign-up` : `${APP_URL}/sign-up?plan=${plan.id}`}
                        className={`block w-full rounded-xl py-3.5 text-center text-[15px] font-semibold transition-all duration-300 ${
                          plan.mostPopular
                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:brightness-110"
                            : "border border-white/[0.12] bg-white/[0.05] text-slate-200 hover:border-white/20 hover:bg-white/[0.08]"
                        }`}
                      >
                        {plan.cta}
                      </a>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            {/* ── Refund policy ── */}
            <div data-section="refund-policy" data-section-name="Refund policy">
              <RefundPolicy />
            </div>

            <p className="mt-5 text-center text-[13px] text-slate-500">
              University student? Verify your .edu email for{" "}
              <span className="font-medium text-slate-300">1 month of Pro free</span>. A card is
              required; nothing is charged for 30 days and you can cancel any time.
            </p>
          </div>
        </section>

        {/* ── One-time packs ── */}
        <div data-section="packs" data-section-name="Packs">
          <Packs />
        </div>

        {/* ── Success stories (hides itself when none are approved yet) ── */}
        <div data-section="success-stories" data-section-name="Success stories">
          <SuccessStories />
        </div>

        {/* ── Pricing FAQ: questions closed, answers one click away ── */}
        <section data-section="pricing-faq" data-section-name="Pricing FAQ" aria-label="Pricing frequently asked questions" className={`relative border-t border-white/[0.05] py-20 ${PAD}`}>
          <div className={INNER}>
            <SectionHead align="center" eyebrow="FAQ" title="Common questions" />
            <div className="mx-auto max-w-3xl">
              <FaqList items={PRICING_FAQS} />
              <p className="mt-8 text-center text-[13px] text-slate-500">
                More questions?{" "}
                <Link href="/faq" className="font-medium text-indigo-400 transition-colors hover:text-indigo-300">
                  Read the full FAQ <Chevron />
                </Link>
                {" "}or{" "}
                <a href="mailto:support@preciprocal.com" className="font-medium text-indigo-400 transition-colors hover:text-indigo-300">
                  email us
                </a>
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}