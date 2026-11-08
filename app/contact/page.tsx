/**
 * app/contact/page.tsx
 * Self-contained Contact page. No separate component needed.
 *
 * Layout (accent sky): PageHero with an email thread illustration, then the
 * inbox card and what to expect on the left, and the pre-filled email cards
 * on the right, each one a large tap target that opens a mailto link.
 */

import { Mail, MessageSquare, Bug, CreditCard, Lightbulb, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chevron from "@/components/Chevron";
import { PAD, INNER, SECTION, BTN_PRIMARY, Eyebrow, PageHero, HoverRule } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem, SpotlightCard } from "@/components/page/Reveal";
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

        <section className={`${SECTION} ${PAD}`}>
          <div className={`${INNER} grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:gap-20`}>
            {/* ── Main email card and what to expect ── */}
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <SpotlightCard className="rounded-2xl border border-accent/20 bg-[#070b16] p-7 sm:p-8">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                  <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-accent/25 bg-accent/10">
                    <Mail aria-hidden="true" className="h-5 w-5 text-accent" />
                  </span>
                  <h2 className="break-words text-xl font-bold text-white sm:text-2xl">
                    support@preciprocal.com
                  </h2>
                  <p className="mb-7 mt-2 text-sm leading-relaxed text-slate-400">
                    One inbox. Real humans. Average response time under 24 hours on weekdays.
                  </p>
                  <a href="mailto:support@preciprocal.com" className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                    Send us an email <Chevron />
                  </a>
                </SpotlightCard>
              </Reveal>

              {/* ── Response time breakdown ── */}
              <Reveal delay={0.06}>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 sm:p-7">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                    <Clock aria-hidden="true" className="h-4 w-4 text-accent" />
                    What to expect
                  </h3>
                  <dl className="divide-y divide-white/[0.06] text-sm">
                    {EXPECTATIONS.map((e) => (
                      <div key={e.label} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0">
                        <dt className="text-slate-400">{e.label}</dt>
                        <dd className="font-medium text-accent-soft">{e.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>

            {/* ── Contact type cards ── */}
            <div>
              <Reveal className="mb-8">
                <Eyebrow>Pre-filled emails</Eyebrow>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">
                  What do you need help with?
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-400">
                  Click any card to open a pre-filled email, saves you a few seconds.
                </p>
              </Reveal>

              <RevealGroup className="grid gap-4 sm:grid-cols-2">
                {CONTACT_TYPES.map((c) => {
                  const Icon = c.icon;
                  const href = `mailto:${c.email}?subject=${encodeURIComponent(c.subject)}`;
                  return (
                    <RevealItem key={c.title}>
                      <a
                        href={href}
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070b16] p-6 transition-colors duration-300 hover:border-accent/30 hover:bg-[#0a1020] focus-visible:border-accent/40"
                      >
                        <div className="mb-5 flex items-center justify-between">
                          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10">
                            <Icon aria-hidden="true" className="h-4 w-4 text-accent" />
                          </span>
                          <Mail aria-hidden="true" className="h-4 w-4 text-slate-500 transition-colors group-hover:text-accent" />
                        </div>
                        <h3 className="mb-1.5 text-[15px] font-bold text-white transition-colors group-hover:text-accent-soft">
                          {c.title}
                        </h3>
                        <p className="mb-5 text-sm leading-relaxed text-slate-400">{c.description}</p>
                        <p className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4 text-[12px] text-slate-400">
                          <span className="truncate font-mono">Subject: {c.subject.trim()}</span>
                          <span className="inline-flex shrink-0 items-center gap-1 font-medium text-accent-soft">
                            Email <Chevron />
                          </span>
                        </p>
                        <HoverRule />
                      </a>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
