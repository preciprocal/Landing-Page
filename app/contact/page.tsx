/**
 * app/contact/page.tsx
 *
 * Talking to the team: product ideas, feedback, universities and career
 * centres, press and partnerships. Account, billing and "something is broken"
 * live on /support, which leads with self-serve fixes and the in-app ticket
 * system; this page sends those visitors there first, so the two pages do
 * different jobs.
 *
 * Every card opens a pre-filled email. There is one inbox
 * (support@preciprocal.com); the subject line routes it.
 *
 * Layout (accent sky): PageHero with the email thread illustration, the
 * "need help with your account?" hand-off, then the reasons to write as an
 * open row.
 */

import Link from "next/link";
import { GraduationCap, Lightbulb, LifeBuoy, Mail, MessageSquare, Newspaper } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chevron from "@/components/Chevron";
import { PAD, INNER, SECTION, BTN_PRIMARY, BTN_SECONDARY, PageHero, SectionHead } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

const EMAIL = "support@preciprocal.com";

const REASONS = [
  {
    icon: Lightbulb,
    title: "An idea for the product",
    description: "A tool you wish existed, or a change that would make your search easier. Most of the roadmap starts as an email like this.",
    subject: "Feature idea: ",
  },
  {
    icon: MessageSquare,
    title: "Feedback",
    description: "What is working, what is not, or how your search is going. We read every one, and it shapes what we build next.",
    subject: "Feedback: ",
  },
  {
    icon: GraduationCap,
    title: "Universities and career centres",
    description: "Bringing Preciprocal to your international students, or running a workshop on the OPT job search together.",
    subject: "University partnership: ",
  },
  {
    icon: Newspaper,
    title: "Press and partnerships",
    description: "Writing about international students and the US job market, or exploring working together.",
    subject: "Press / partnership: ",
  },
];

export default function ContactPage() {
  return (
    <div data-accent="sky" className="min-h-screen bg-[#050810]">
      <Navbar />

      <main className="relative overflow-hidden">
        <PageHero
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          badge={
            <>
              <Mail aria-hidden="true" className="h-3 w-3" />
              Talk to the team
            </>
          }
          title={"We're a small team. "}
          accent="Talk to us."
          subhead={
            <p>
              Ideas, feedback, partnerships or press: email goes straight to the people who build Preciprocal, and we read every one.
            </p>
          }
        />

        {/* Hand-off to Support for account problems */}
        <section aria-label="Account help" className={`${PAD} pb-4`}>
          <Reveal className={`${INNER}`}>
            <div className="flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-[#070b16] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent/10">
                  <LifeBuoy aria-hidden="true" className="h-4 w-4 text-accent-soft" />
                </span>
                <div>
                  <p className="font-semibold text-white">Need help with your account, billing or a bug?</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">Support has the quick fixes and a ticket system that keeps the whole conversation in one place. It is the faster route.</p>
                </div>
              </div>
              <Link href="/support" className={`${BTN_SECONDARY} w-full shrink-0 sm:w-auto`}>
                Go to Support <Chevron />
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Reasons to write */}
        <section aria-label="Reasons to get in touch" className={`${SECTION} ${PAD} mt-16`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead
                align="center"
                className="mb-12"
                eyebrow="Get in touch"
                title="What would you like to talk about?"
                subtitle="Pick one and an email opens with the subject filled in, so it reaches the right person."
              />
            </Reveal>

            <RevealGroup className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {REASONS.map((c) => {
                const Icon = c.icon;
                return (
                  <RevealItem key={c.title}>
                    <a
                      href={`mailto:${EMAIL}?subject=${encodeURIComponent(c.subject)}`}
                      className="group flex h-full flex-col border-t border-white/[0.08] pt-6 transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    >
                      <span className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-accent/10">
                        <Icon aria-hidden="true" className="h-4 w-4 text-accent" />
                      </span>
                      <h3 className="mb-1.5 text-[15px] font-bold text-white transition-colors group-hover:text-accent-soft">{c.title}</h3>
                      <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-400">{c.description}</p>
                      <span className="inline-flex items-center gap-1 text-[13px] font-medium text-accent-soft">
                        Write to us <Chevron />
                      </span>
                    </a>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            <Reveal className="mt-16 text-center">
              <p className="text-sm text-slate-500">Or write to us directly</p>
              <a href={`mailto:${EMAIL}`} className="mt-2 inline-block break-words text-[1.5rem] font-bold tracking-tight text-white transition-colors hover:text-accent-soft sm:text-[2rem]">
                {EMAIL}
              </a>
              <p className="mt-2 text-sm text-slate-500">We reply within a working day.</p>
              <div className="mt-6">
                <a href={`mailto:${EMAIL}`} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                  Send us an email <Chevron />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
