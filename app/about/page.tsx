/**
 * app/about/page.tsx
 *
 * SEO:
 *   • BreadcrumbJsonLd, helps Google understand site hierarchy
 *   • AboutPage schema with accurate description
 *   • aria-labels on every section for accessibility + crawlability
 *   • Metadata lives in app/about/metadata.ts, attached by ./layout.tsx
 *
 * Layout (accent violet): PageHero, then one centred flow: the story in four
 * beats (the timeline), the mission, the values as an open row, the team with
 * and a CTA panel. The old origin-story fold repeated the timeline and was cut.
 */

import Link from "next/link";
import { Heart, Zap, Shield, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExploreLinks from "@/components/page/ExploreLinks";
import Chevron from "@/components/Chevron";
import { APP_URL } from "@/lib/constants";
import { ACCENT_TEXT, BODY, BTN_PRIMARY, BTN_SECONDARY, CtaPanel, Eyebrow, H2, H3, INNER, LABEL, PAD, PageHero, SECTION, SectionHead, pad2 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

// ─── Structured data ──────────────────────────────────────────────────────────
function AboutJsonLd() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://preciprocal.com" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://preciprocal.com/about" },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://preciprocal.com/about#webpage",
    url: "https://preciprocal.com/about",
    name: "About Preciprocal: Our Story, Mission & Values",
    description:
      "Preciprocal was built by international students who experienced the US job market firsthand and reverse-engineered what actually works. Here's why we built it, what we believe, and where we're going.",
    isPartOf: { "@id": "https://preciprocal.com/#website" },
    about: { "@id": "https://preciprocal.com/#organization" },
    inLanguage: "en-US",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
    </>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    icon: Heart,
    title: "Honesty over hype",
    description:
      "No fake testimonials, padded user counts or promises we can't keep.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    description:
      "Every tool is built to save you hours, not add to your to-do list.",
  },
  {
    icon: Shield,
    title: "Your data is yours",
    description:
      "Never sold, never used to train models without consent, always deletable.",
  },
  {
    icon: Users,
    title: "Affordable on purpose",
    description:
      "Priced for a student budget. Career tools shouldn't be a luxury for people who already have jobs.",
  },
];

const MILESTONES = [
  {
    date: "Early 2024",
    title: "The reality check",
    description:
      "International students with strong records started applying in the US, and most applications disappeared. The unspoken rules were nowhere in the textbooks.",
  },
  {
    date: "Mid 2024",
    title: "Reverse-engineering the system",
    description:
      "We studied how resumes are screened and how interviewers evaluate answers, then turned what we learned into tools for classmates.",
  },
  {
    date: "Late 2024",
    title: "Preciprocal is born",
    description:
      "The tools worked, so we made them a product: Preciprocal, a nod to the reciprocal link between preparation and results.",
  },
  {
    date: "2025 onwards",
    title: "Growing with real users",
    description:
      "Every feature on the roadmap comes from a student with a problem we hadn't solved yet.",
  },
];

const TEAM_BACKGROUNDS = [
  { code: "in", label: "India" },
  { code: "ng", label: "Nigeria" },
  { code: "br", label: "Brazil" },
  { code: "cn", label: "China" },
  { code: "mx", label: "Mexico" },
  { code: "kr", label: "South Korea" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div data-accent="violet" className="min-h-screen bg-[#050810]">
      <AboutJsonLd />
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Hero */}
        <PageHero
          sectionProps={{ "aria-label": "About Preciprocal" }}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
          badge="Our story"
          title={"We built the tool we "}
          accent="wish existed"
          subhead={
            <p>
              Built by international students who learned the US job market the hard way.
            </p>
          }
        />

        {/* The story in four beats */}
        <section aria-label="Company timeline" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead
                align="center"
                className="mb-14"
                eyebrow="Where it started"
                title="Nobody teaches you how the US job market actually works."
              />
            </Reveal>

            <RevealGroup as="ol" className="relative grid gap-10 border-l border-white/[0.08] pl-8 lg:grid-cols-4 lg:gap-10 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-10">
              {MILESTONES.map((m, i) => (
                <RevealItem as="li" key={m.title} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[38px] top-1 h-3 w-3 rounded-full bg-accent ring-4 ring-accent/20 lg:-top-[46px] lg:left-0"
                  />
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-slate-500">{pad2(i + 1)}</span>
                    <span className={`${LABEL} text-accent-soft`}>{m.date}</span>
                  </div>
                  <h3 className={`mb-2 mt-2 ${H3}`}>{m.title}</h3>
                  <p className={BODY}>{m.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Mission: a centred pull quote */}
        <section aria-label="Our mission" className={`${SECTION} ${PAD}`}>
          <Reveal className={`${INNER} text-center`}>
            <Eyebrow>Our mission</Eyebrow>
            <p className="mx-auto max-w-5xl text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-white [text-wrap:balance] sm:text-4xl lg:text-5xl">
              &ldquo;Make expert-level career preparation accessible to every student,
              regardless of where they went to school or{" "}
              <span className={ACCENT_TEXT}>who they know.</span>
              &rdquo;
            </p>
            <p className={`mx-auto mt-8 max-w-2xl ${BODY}`}>
              The best jobs often go to the best prepared, not the most qualified.
            </p>
          </Reveal>
        </section>

        {/* Values: an open row */}
        <section aria-label="Our values" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal>
              <SectionHead align="center" className="mb-14" eyebrow="Values" title="What we believe" />
            </Reveal>

            <RevealGroup className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <RevealItem key={v.title} className="border-t border-white/[0.08] pt-6">
                    <span className="mb-5 grid h-10 w-10 place-items-center rounded-lg border border-accent/20 bg-accent/10">
                      <Icon aria-hidden="true" className="h-4 w-4 text-accent" />
                    </span>
                    <h3 className={`mb-2 ${H3}`}>{v.title}</h3>
                    <p className={BODY}>{v.description}</p>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        {/* Who built it, and the longer story folded beneath */}
        <section aria-label="Who built Preciprocal" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow>The team</Eyebrow>
              <h2 className={H2}>
                Who&apos;s behind it
              </h2>
              <p className={`mt-4 ${BODY}`}>
                International students and recent graduates who went through the US job
                search and built the tools they wish they&apos;d had.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                {TEAM_BACKGROUNDS.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1.5"
                  >
                    <img
                      src={`https://flagcdn.com/24x18/${b.code}.png`}
                      srcSet={`https://flagcdn.com/48x36/${b.code}.png 2x`}
                      width={20}
                      height={15}
                      alt={b.label}
                      className="flex-shrink-0 rounded-[2px] object-cover"
                    />
                    <span className="text-[12px] font-medium text-slate-200">{b.label}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 rounded-full border border-dashed border-white/[0.15] px-3 py-1.5">
                  <span className="text-[12px] font-medium text-slate-300">+ more</span>
                </div>
              </div>
            </Reveal>

          </div>
        </section>

        {/* CTA */}
        <section aria-label="Contact and get started" className={`pb-20 pt-4 ${PAD}`}>
          <Reveal>
            <CtaPanel
              title="Have a question or want to talk?"
              trust={false}
              body={
                <p>
                  We&apos;re a small team and we read every email: feedback, bugs or just hello.
                </p>
              }
              action={
                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <a href="mailto:support@preciprocal.com" className={BTN_SECONDARY}>
                    Email us
                  </a>
                  <Link href={`${APP_URL}/sign-up`} className={BTN_PRIMARY}>
                    Try Preciprocal free <Chevron />
                  </Link>
                </div>
              }
            />
          </Reveal>
        </section>
        <ExploreLinks current="/about" className="pb-20" />
      </main>

      <Footer />
    </div>
  );
}
