/**
 * app/contact/page.tsx
 * Self-contained Contact page. No separate component needed.
 *
 * Layout (accent sky): PageHero with an email thread illustration, then one
 * centred flow: the inbox and what to expect, then the pre-filled emails as an
 * open row, each one a large tap target that opens a mailto link.
 */

import { Mail, MessageSquare, Bug, CreditCard, Lightbulb, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chevron from "@/components/Chevron";
import { PAD, INNER, SECTION, BTN_PRIMARY, PageHero, SectionHead } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";
import ContactVisual from "@/components/page/visuals/ContactVisual";

const CONTACT_TYPES = [
  {
    icon: Bug,
    title: "Bug report",
    description: "Something broken? Tell us exactly what happened and we'll fix it fast.",
    email: "support@preciprocal.com",
    subject: "Bug Report: ",
  },
  {
    icon: CreditCard,
    title: "Billing question",
    description: "Charge you didn't recognize, cancellation help, or refund request.",
    email: "support@preciprocal.com",
    subject: "Billing: ",
  },
  {
    icon: Lightbulb,
    title: "Feature request",
    description: "Have an idea that would make Preciprocal better? We genuinely want to hear it.",
    email: "support@preciprocal.com",
    subject: "Feature Idea: ",
  },
  {
    icon: MessageSquare,
    title: "General feedback",
    description: "Something you love, something you hate, or just want to share your experience.",
    email: "support@preciprocal.com",
    subject: "Feedback: ",
  },
];

const EXPECTATIONS = [
  { label: "Weekday emails", value: "Within 24 hours" },
  { label: "Weekend / holiday emails", value: "First weekday reply" },
  { label: "Billing / refund requests", value: "Same day when possible" },
];

export default function ContactPage() {
  return (
    <div data-accent="sky" className="min-h-screen bg-[#050810]">
      <Navbar />

      <main className="relative overflow-hidden">
        {/* ── Hero ── */}
        <PageHero
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          badge={
            <>
              <Clock aria-hidden="true" className="h-3 w-3" />
              We reply within 24 hours
            </>
          }
          title={"We're a real team. "}
          accent="Talk to us."
          subhead={
            <p>
              No support ticket queue, no chatbot runaround. Email goes straight to
              the people who built this. We read every single one.
            </p>
          }
          visual={<ContactVisual />}
        />

        {/* ── The inbox, then what to expect ── */}
        <section aria-label="Email support" className={`${SECTION} ${PAD}`}>
          <Reveal className={`${INNER} text-center`}>
            <span className="mx-auto mb-5 grid h-11 w-11 place-items-center rounded-xl border border-accent/25 bg-accent/10">
              <Mail aria-hidden="true" className="h-5 w-5 text-accent" />
            </span>
            <h2 className="break-words text-[1.75rem] font-bold tracking-tight text-white sm:text-[2.5rem]">
              support@preciprocal.com
            </h2>
            <p className="mx-auto mb-8 mt-3 max-w-xl text-[16px] leading-relaxed text-slate-400">
              One inbox. Real humans. Average response time under 24 hours on weekdays.
            </p>
            <a href="mailto:support@preciprocal.com" className={`${BTN_PRIMARY} w-full sm:w-auto`}>
              Send us an email <Chevron />
            </a>

            {/* ── Response time breakdown ── */}
            <div className="mx-auto mt-14 max-w-4xl">
              <h3 className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                <Clock aria-hidden="true" className="h-4 w-4 text-accent" />
                What to expect
              </h3>
              <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-3">
                {EXPECTATIONS.map((e) => (
                  <div key={e.label} className="flex flex-col-reverse gap-1 border-t border-white/[0.08] pt-4">
                    <dt className="text-sm text-slate-400">{e.label}</dt>
                    <dd className="text-[15px] font-semibold text-accent-soft">{e.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </section>

        {/* ── Pre-filled emails ── */}
        <section aria-label="Pre-filled emails" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead
                align="center"
                className="mb-12"
                eyebrow="Pre-filled emails"
                title="What do you need help with?"
                subtitle="Click any card to open a pre-filled email, saves you a few seconds."
              />
            </Reveal>

            <RevealGroup className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {CONTACT_TYPES.map((c) => {
                const Icon = c.icon;
                const href = `mailto:${c.email}?subject=${encodeURIComponent(c.subject)}`;
                return (
                  <RevealItem key={c.title}>
                    <a
                      href={href}
                      className="group flex h-full flex-col border-t border-white/[0.08] pt-6 transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    >
                      <span className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-accent/10">
                        <Icon aria-hidden="true" className="h-4 w-4 text-accent" />
                      </span>
                      <h3 className="mb-1.5 text-[15px] font-bold text-white transition-colors group-hover:text-accent-soft">
                        {c.title}
                      </h3>
                      <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-400">{c.description}</p>
                      <p className="flex items-center justify-between gap-3 text-[12px] text-slate-400">
                        <span className="truncate font-mono">Subject: {c.subject.trim()}</span>
                        <span className="inline-flex shrink-0 items-center gap-1 font-medium text-accent-soft">
                          Email <Chevron />
                        </span>
                      </p>
                    </a>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
