"use client";

/**
 * app/pricing/page.tsx
 *
 * Standalone /pricing page — targets high-intent searches like
 * "preciprocal pricing", "AI interview prep cost", "mock interview app price".
 *
 * SEO additions over the homepage Pricing section:
 *   • PricingPageJsonLd — OfferCatalog + individual Offer schemas with full detail
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

// ─── Structured data ──────────────────────────────────────────────────────────
function PricingJsonLd() {
  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": "https://preciprocal.com/pricing#offercatalog",
    name: "Preciprocal Pricing Plans",
    url: "https://preciprocal.com/pricing",
    description: "AI-powered job search platform plans — Free, Pro ($9.99/mo), and Premium ($24.99/mo).",
    provider: { "@id": "https://preciprocal.com/#organization" },
    itemListElement: [
      {
        "@type": "Offer",
        "@id": "https://preciprocal.com/pricing#free",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        description: "5 resume analyses, 3 mock interviews, 5 cover letters per month. Job tracker for up to 10 jobs.",
        availability: "https://schema.org/InStock",
        url: `${APP_URL}/sign-up`,
        seller: { "@id": "https://preciprocal.com/#organization" },
      },
      {
        "@type": "Offer",
        "@id": "https://preciprocal.com/pricing#pro",
        name: "Pro",
        price: "9.99",
        priceCurrency: "USD",
        description: "20 resume analyses, 30 mock interviews, unlimited cover letters, recruiter eye simulation, full analytics dashboard. 30-day money-back guarantee.",
        availability: "https://schema.org/InStock",
        url: `${APP_URL}/sign-up?plan=pro`,
        billingIncrement: "P1M",
        seller: { "@id": "https://preciprocal.com/#organization" },
      },
      {
        "@type": "Offer",
        "@id": "https://preciprocal.com/pricing#premium",
        name: "Premium",
        price: "24.99",
        priceCurrency: "USD",
        description: "Unlimited everything, company-specific interview prep, AI interview coach, post-interview improvement roadmap, priority support.",
        availability: "https://schema.org/InStock",
        url: `${APP_URL}/sign-up?plan=premium`,
        billingIncrement: "P1M",
        seller: { "@id": "https://preciprocal.com/#organization" },
      },
    ],
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
    name: "Preciprocal Pricing — Start Free, Land Faster",
    description: "Free plan available. Pro at $9.99/mo with 30-day money-back guarantee.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: "Free",
    price: "Free",
    period: "",
    tagline: "Get started and feel the value.",
    features: [
      "5 resume analyses / month",
      "5 cover letters / month",
      "2 LinkedIn optimisations / month",
      "1 interview debrief / month",
      "2 find contacts / month",
      "3 mock interviews / month",
      "Job tracker (10 jobs)",
      "Chrome extension (limited)",
      "Basic analytics",
    ],
    cta: "Get started free",
    ctaHref: `${APP_URL}/sign-up`,
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/mo",
    tagline: "Everything an active job seeker needs.",
    features: [
      "20 resume analyses / month",
      "30 mock interviews / month",
      "Unlimited cover letters",
      "5 LinkedIn optimisations / month",
      "5 interview debriefs / month",
      "10 find contacts / month",
      "5 active study plans",
      "Unlimited job tracker",
      "Chrome extension (full)",
      "Resume editor + PDF & Word export",
      "Recruiter eye simulation",
      "Full analytics dashboard",
      "Priority AI responses",
    ],
    cta: "Start Pro",
    ctaHref: `${APP_URL}/sign-up?plan=pro`,
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$24.99",
    period: "/mo",
    tagline: "Unlimited access for serious candidates.",
    features: [
      "Unlimited everything",
      "Company-specific interview prep",
      "AI interview coach + deep analysis",
      "Post-interview improvement roadmap",
      "All Pro features included",
      "Priority support (24hr SLA)",
      "Early access to new features",
    ],
    cta: "Go Premium",
    ctaHref: `${APP_URL}/sign-up?plan=premium`,
    highlighted: false,
  },
];

const PRICING_FAQS = [
  {
    q: "Is there a free plan?",
    a: "Yes — Preciprocal's free plan includes 5 resume analyses, 3 mock interviews, and 5 cover letters per month with no credit card required. You can use it indefinitely.",
  },
  {
    q: "What's included in the Pro plan?",
    a: "Pro ($9.99/mo) includes 20 resume analyses, 30 mock interviews, unlimited cover letters, recruiter eye simulation, full analytics dashboard, resume editor with PDF and Word export, and the full Chrome extension.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel your subscription at any time from your account settings. You'll keep access until the end of your billing period.",
  },
  {
    q: "What is the 30-day money-back guarantee?",
    a: "If you don't land an interview within 30 days of using Preciprocal Pro, we'll give you a full refund — no questions asked. Email support@preciprocal.com.",
  },
  {
    q: "Is there a student discount?",
    a: "Yes. Verify your .edu email address and get 1 month of Pro free with no credit card required.",
  },
  {
    q: "What's the difference between Pro and Premium?",
    a: "Pro covers everything most job seekers need — resume analysis, mock interviews, cover letters, and job tracking with generous limits. Premium adds unlimited usage across all features, company-specific interview prep, an AI interview coach, and priority support.",
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
        <nav aria-label="Breadcrumb" className="max-w-[1100px] mx-auto px-6 pt-28 pb-0">
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
          <div className="max-w-[1100px] mx-auto px-6 py-16">
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
                offers weeks faster — for less than a single coffee a day.
              </p>
            </RevealOnScroll>

            {/* ── Plan cards ── */}
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              {PLANS.map((plan) => (
                <StaggerItem key={plan.name}>
                  <div
                    className={`relative rounded-2xl p-9 ${
                      plan.highlighted
                        ? "bg-gradient-to-br from-indigo-500/[0.10] to-purple-500/[0.05] border border-indigo-500/30 md:scale-[1.03]"
                        : "bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12]"
                    } transition-all duration-300`}
                  >
                    {plan.highlighted && <GlowingEffect spread={50} glow proximity={80} />}

                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-xs font-bold text-white whitespace-nowrap z-20">
                        Most Popular
                      </div>
                    )}

                    <div className="relative z-10">
                      <h2 className="text-xl font-bold text-white mb-1">{plan.name}</h2>
                      <p className="text-[13px] text-slate-500 mb-4">{plan.tagline}</p>

                      <div className="mb-6">
                        <span className="text-5xl font-extrabold text-white tracking-tight">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-[15px] text-slate-500 ml-1">{plan.period}</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-3.5 mb-8">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
                            <CheckIcon className="flex-shrink-0 text-indigo-400" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {plan.highlighted ? (
                        <MagneticHover>
                          <a
                            href={plan.ctaHref}
                            className="block w-full text-center py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-300
                                       bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)]"
                          >
                            {plan.cta}
                          </a>
                        </MagneticHover>
                      ) : (
                        <a
                          href={plan.ctaHref}
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

            {/* ── Guarantee ── */}
            <RevealOnScroll delay={0.2} className="mt-10 max-w-2xl mx-auto">
              <div className="p-5 bg-emerald-500/[0.06] border border-emerald-500/20 rounded-2xl text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-[15px] font-bold text-emerald-400">30-Day Money-Back Guarantee</span>
                </div>
                <p className="text-[13px] text-slate-400 leading-relaxed">
                  Land an interview within 30 days or get a full refund. No hoops, no fine print,
                  no awkward emails. We&apos;re that confident this works.
                </p>
              </div>
            </RevealOnScroll>

            <p className="text-center text-[13px] text-slate-600 mt-5">
              University student? Verify your .edu email for{" "}
              <span className="text-slate-400 font-medium">1 month of Pro free</span>{" "}
              — no card needed.
            </p>
          </div>
        </section>

        {/* ── Pricing FAQ ── */}
        <section aria-label="Pricing frequently asked questions" className="relative py-16 px-6">
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