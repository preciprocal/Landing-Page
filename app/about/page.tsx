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
 * the longer origin story folded beneath it, and a CTA panel.
 */

import Link from "next/link";
import { Heart, Zap, Shield, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chevron from "@/components/Chevron";
import { APP_URL } from "@/lib/constants";
import { PAD, INNER, SECTION, ACCENT_TEXT, BTN_PRIMARY, BTN_SECONDARY, Eyebrow, SectionHead, PageHero, CtaPanel, Fold, pad2 } from "@/components/page/Layout";
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
      "We don't fake testimonials, pad user counts, or make promises we can't keep. When we say something works, we mean it.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    description:
      "Job searching is already exhausting. Every tool we build is designed to save you hours, not add to your to-do list.",
  },
  {
    icon: Shield,
    title: "Your data is yours",
    description:
      "Your resume, interview recordings, and job history are never sold, never used to train models without consent, and always deletable.",
  },
  {
    icon: Users,
    title: "Affordable on purpose",
    description:
      "We deliberately priced Preciprocal below a Netflix subscription. Career tools shouldn't be a luxury for people who already have jobs.",
  },
];

const MILESTONES = [
  {
    date: "Early 2024",
    title: "The reality check",
    description:
      "A group of international students, freshly arrived in the US, started applying for jobs with strong academic records and real skills. The results were humbling. Most applications disappeared. The unspoken rules of the American job market were nowhere in the textbooks.",
  },
  {
    date: "Mid 2024",
    title: "Reverse-engineering the system",
    description:
      "Instead of guessing, we studied. How do ATS systems actually score resumes? What do US recruiters look for in the first 6 seconds? What do FAANG, consulting, and finance interviewers actually evaluate? We turned the answers into tools and shared them with classmates.",
  },
  {
    date: "Late 2024",
    title: "Preciprocal is born",
    description:
      "The tools worked well enough that we turned them into a real product. Named it Preciprocal, a nod to the reciprocal relationship between preparation and results. Built in public from day one.",
  },
  {
    date: "2025 onwards",
    title: "Growing with real users",
    description:
      "Real students using it, real feedback shaping it. Every feature on the roadmap comes from a conversation with someone who had a problem we hadn't solved yet.",
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
              Built by international students who experienced the US job market
              firsthand and decided to reverse-engineer it instead of accepting it.
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
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft">{m.date}</span>
                  </div>
                  <h3 className="mb-2 mt-2 text-lg font-bold text-white">{m.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{m.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Mission: a centred pull quote */}
        <section aria-label="Our mission" className={`${SECTION} ${PAD}`}>
          <Reveal className={`${INNER} text-center`}>
            <Eyebrow>Our mission</Eyebrow>
            <p className="mx-auto max-w-5xl text-3xl font-extrabold leading-[1.15] tracking-tight text-white [text-wrap:balance] sm:text-4xl lg:text-5xl">
              &ldquo;Make expert-level career preparation accessible to every student,
              regardless of where they went to school or{" "}
              <span className={ACCENT_TEXT}>who they know.</span>
              &rdquo;
            </p>
            <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              The students who land the best jobs often aren&apos;t the most qualified.
              They&apos;re the best prepared. We&apos;re here to fix that.
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
                    <span className="mb-5 grid h-10 w-10 place-items-center rounded-xl border border-accent/20 bg-accent/10">
                      <Icon aria-hidden="true" className="h-4 w-4 text-accent" />
                    </span>
                    <h3 className="mb-2 text-lg font-bold text-white">{v.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{v.description}</p>
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
              <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-[2.25rem]">
                Who&apos;s behind it
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-slate-400">
                A team of international students and recent graduates who went through
                the US job search, figured out what actually works, and built the tools
                they wish they&apos;d had on day one.
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
                    <span className="text-xs font-medium text-slate-200">{b.label}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 rounded-full border border-dashed border-white/[0.15] px-3 py-1.5">
                  <span className="text-xs font-medium text-slate-300">+ more</span>
                </div>
              </div>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-500">
                Collectively spread across US universities, applying to jobs in tech,
                finance, consulting, and beyond. Every feature in Preciprocal traces
                back to a real gap one of us hit during our own job search.
              </p>
            </Reveal>

            <Fold className="mt-14" eyebrow="Our origin story" title="Why we built it, in our own words">
              <div className="mx-auto max-w-[68ch] space-y-6 text-[17px] leading-[1.8] text-slate-400">
                <p>
                  We came from different countries: India, Nigeria, Brazil, China,
                  and more, with strong degrees, real skills, and zero understanding
                  of why our applications kept disappearing. The cultural context around
                  networking, resume formatting, ATS systems, and interview expectations
                  was invisible. Nobody told us the rules because everyone else already knew them.
                </p>
                <p>
                  Between us, we sent hundreds of applications. We watched classmates
                  with less experience land roles faster, often because they knew someone
                  or had grown up speaking the language of American hiring. We didn&apos;t
                  resent it. We studied it.
                </p>
                <p>
                  What do ATS systems actually score? What do US recruiters look at in
                  the first 6 seconds? What do Google, McKinsey, and Goldman actually
                  ask in interviews, and how do they evaluate answers? We mapped all of
                  it, built tools to address each gap, and tested them on ourselves first.
                </p>
                <p className="border-l-2 border-accent/50 pl-5 text-slate-300">
                  Preciprocal is what came out of that. Not a generic chatbot. A
                  purpose-built system designed by people who had to learn the hard way,
                  so you don&apos;t have to.
                </p>
              </div>
            </Fold>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Contact and get started" className={`pb-24 pt-4 ${PAD}`}>
          <Reveal>
            <CtaPanel
              title="Have a question or want to talk?"
              trust={false}
              body={
                <p>
                  We&apos;re a small team and we actually read every email. Whether it&apos;s
                  feedback, a bug report, or just to say hi, reach out.
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
      </main>

      <Footer />
    </div>
  );
}
