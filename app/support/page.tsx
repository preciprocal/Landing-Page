/**
 * app/support/page.tsx
 *
 * Help for people who already use Preciprocal: something is not working, a
 * question about their account, billing or limits. It is deliberately not the
 * Contact page, which is for talking to the team (ideas, feedback, schools,
 * press). Support leads with self-serve fixes, then the in-app Support page
 * (app.preciprocal.com/help, which keeps ticket threads and works without
 * signing in), then email for anyone who cannot get in at all.
 *
 * Paths and menu names come from the Dashboard app: /forgot-password, /help,
 * Settings > Plan & Billing > Refunds (Dashboard FOLLOWUPS #2).
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, Gauge, KeyRound, LifeBuoy, MessageCircleQuestion, Puzzle, Bug, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chevron from "@/components/Chevron";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";
import { PAD, INNER, SECTION, BTN_PRIMARY, BTN_SECONDARY, PageHero, SectionHead } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Preciprocal Support: Account, Billing and Technical Help" },
  description:
    "Help with your Preciprocal account: sign-in, billing and refunds, usage limits and the Chrome extension. Open a support ticket in the app or email support@preciprocal.com.",
  alternates: { canonical: "https://preciprocal.com/support" },
  openGraph: {
    title: "Preciprocal Support",
    description: "Account, billing and technical help. Fix it yourself in a minute, or open a ticket and a person replies.",
    url: "https://preciprocal.com/support",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v3.png", width: 1200, height: 630 }],
  },
};

const SUPPORT_EMAIL = "support@preciprocal.com";

const SELF_SERVE = [
  {
    Icon: KeyRound,
    title: "Can't sign in",
    body: "Reset your password from the sign-in page. The link arrives by email; check spam if it has not shown up in a few minutes.",
    cta: "Reset my password",
    href: `${APP_URL}/forgot-password`,
  },
  {
    Icon: CreditCard,
    title: "Billing, cancelling or a refund",
    body: "Change or cancel your plan in the app under Settings, Plan & Billing. Refund requests are made from the Refunds tab there, which shows what you are eligible for.",
    cta: "Open Settings",
    href: `${APP_URL}/settings`,
  },
  {
    Icon: Gauge,
    title: "Hit a usage limit",
    body: "Each plan includes a set number of resume analyses, mock interviews and other tools a month. See what your plan includes and what the others add.",
    cta: "Compare plans",
    href: "/pricing",
  },
  {
    Icon: Puzzle,
    title: "Chrome extension not connecting",
    body: "Sign in to the app in the same browser, then open the extension and connect again. The extension page explains setup.",
    cta: "Extension guide",
    href: "/chrome-extension",
  },
  {
    Icon: MessageCircleQuestion,
    title: "How something works",
    body: "Answers on plans, the student trial, mock interviews, resume scores and your data, in one place.",
    cta: "Read the FAQ",
    href: "/faq",
  },
];

const GOOD_REPORT = [
  "What you were trying to do",
  "What happened instead, with any error message",
  "Your browser and device",
  "A screenshot, if you can",
];

const RESPONSE = [
  { label: "Weekdays", value: "Within 24 hours" },
  { label: "Weekends and holidays", value: "The next working day" },
  { label: "Billing and refunds", value: "Same day when possible" },
];

export default function SupportPage() {
  return (
    <div data-accent="indigo" className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Support", url: "https://preciprocal.com/support" },
        ]}
      />
      <Navbar />

      <main className="relative overflow-hidden">
        <PageHero
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Support" }]}
          badge={
            <>
              <LifeBuoy aria-hidden="true" className="h-3 w-3" />
              Account, billing and technical help
            </>
          }
          title="Stuck? "
          accent="Let's get you moving."
          subhead={
            <p>
              Most fixes take a minute and are below. For anything else, open a ticket in the app and a person on the team replies.
            </p>
          }
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`${APP_URL}/help`} className={`${BTN_PRIMARY} w-full px-8 py-4 sm:w-auto`}>
              Open a support ticket <Chevron />
            </a>
            <a href={`mailto:${SUPPORT_EMAIL}`} className={`${BTN_SECONDARY} w-full py-4 sm:w-auto`}>
              Email support
            </a>
          </div>
          <p className="mt-4 text-center text-[13px] text-slate-500">
            Looking to talk to the team about something else?{" "}
            <Link href="/contact" className="font-medium text-accent-soft transition-colors hover:text-white">
              Contact us
            </Link>
            .
          </p>
        </PageHero>

        {/* Self-serve */}
        <section aria-label="Common fixes" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead align="center" className="mb-12" eyebrow="Fix it yourself" title="Common problems," accent="solved in a minute." />
            </Reveal>
            <RevealGroup as="ul" className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SELF_SERVE.map((s) => {
                const external = s.href.startsWith("http");
                const cls =
                  "group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-[#070b16] p-6 transition-colors hover:border-white/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";
                const inner = (
                  <>
                    <span className="mb-5 grid h-10 w-10 place-items-center rounded-xl border border-accent/20 bg-accent/10">
                      <s.Icon aria-hidden="true" className="h-4 w-4 text-accent-soft" strokeWidth={1.8} />
                    </span>
                    <h3 className="mb-2 text-[16px] font-semibold text-white">{s.title}</h3>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-400">{s.body}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-soft transition-colors group-hover:text-white">
                      {s.cta} <Chevron />
                    </span>
                  </>
                );
                return (
                  <RevealItem as="li" key={s.title}>
                    {external ? (
                      <a href={s.href} className={cls}>
                        {inner}
                      </a>
                    ) : (
                      <Link href={s.href} className={cls}>
                        {inner}
                      </Link>
                    )}
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        {/* Still stuck */}
        <section aria-label="Contact support" className={`${SECTION} ${PAD}`}>
          <div className={`${INNER} grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16`}>
            <Reveal>
              <SectionHead
                className="mb-8"
                eyebrow="Still stuck"
                title="Open a ticket."
                accent="A person replies."
                subtitle="Support in the app keeps the whole conversation in one thread, so you never have to explain twice. If you cannot get into your account at all, email us instead."
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={`${APP_URL}/help`} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                  Open Support in the app <Chevron />
                </a>
                <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Bug report: ")}`} className={`${BTN_SECONDARY} w-full sm:w-auto`}>
                  <Bug aria-hidden="true" className="h-4 w-4" /> Report a bug by email
                </a>
              </div>
              <p className="mt-4 font-mono text-[13px] text-slate-500">{SUPPORT_EMAIL}</p>
            </Reveal>

            <Reveal className="space-y-6">
              <div className="rounded-2xl border border-white/[0.07] bg-[#070b16] p-6">
                <p className="mb-4 text-[13px] font-semibold text-white">A good report gets a faster fix</p>
                <ul className="space-y-2.5">
                  {GOOD_REPORT.map((g, i) => (
                    <li key={g} className="flex items-start gap-3 text-sm text-slate-400">
                      <span className="mt-px font-mono text-[11px] text-slate-600">0{i + 1}</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/[0.07] bg-[#070b16] p-6">
                <p className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold text-white">
                  <Clock aria-hidden="true" className="h-4 w-4 text-accent" /> When to expect a reply
                </p>
                <dl className="space-y-3">
                  {RESPONSE.map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-4 border-t border-white/[0.06] pt-3 first:border-t-0 first:pt-0">
                      <dt className="text-sm text-slate-400">{r.label}</dt>
                      <dd className="text-sm font-semibold text-accent-soft">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
