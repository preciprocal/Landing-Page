/**
 * app/about/page.tsx
 *
 * SEO:
 *   • BreadcrumbJsonLd, helps Google understand site hierarchy
 *   • AboutPage schema with accurate description
 *   • aria-labels on every section for accessibility + crawlability
 *   • Metadata lives in app/about/metadata.ts, attached by ./layout.tsx
 *
 * Layout (accent violet): PageHero with the story as a constellation, then an
 * editorial run: a sticky pull statement beside the origin story, the team
 * card beside its heading, the milestones as a ruled horizontal timeline, the
 * values as a ruled grid, the mission as a large pull quote, and a CTA panel.
 */

import Link from "next/link";
import { Heart, Zap, Shield, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chevron from "@/components/Chevron";
import { APP_URL } from "@/lib/constants";
import { PAD, INNER, SECTION, BTN_PRIMARY, BTN_SECONDARY, Eyebrow, PageHero, CtaPanel, HoverRule, pad2 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem, SpotlightCard } from "@/components/page/Reveal";
import AboutVisual from "@/components/page/visuals/AboutVisual";

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
          visual={<AboutVisual />}
        />

        {/* Origin story: a sticky pull statement beside the story */}
        <section aria-label="Our origin story" className={`${SECTION} ${PAD}`}>
          <div className={`${INNER} grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-24`}>
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>Where it started</Eyebrow>
              <p className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl xl:text-[2.75rem]">
                Nobody teaches you how the US job market actually works.
              </p>
              <span aria-hidden="true" className="mt-8 block h-px w-24 bg-gradient-to-r from-accent to-transparent" />
            </Reveal>

            <div className="max-w-2xl space-y-6 text-[17px] leading-[1.8] text-slate-400">
              <Reveal>
                <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-accent-soft">
                  We came from different countries: India, Nigeria, Brazil, China,
                  and more, with strong degrees, real skills, and zero understanding
                  of why our applications kept disappearing. The cultural context around
                  networking, resume formatting, ATS systems, and interview expectations
                  was invisible. Nobody told us the rules because everyone else already knew them.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  Between us, we sent hundreds of applications. We watched classmates
                  with less experience land roles faster, often because they knew someone
                  or had grown up speaking the language of American hiring. We didn&apos;t
                  resent it. We studied it.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  What do ATS systems actually score? What do US recruiters look at in
                  the first 6 seconds? What do Google, McKinsey, and Goldman actually
                  ask in interviews, and how do they evaluate answers? We mapped all of
                  it, built tools to address each gap, and tested them on ourselves first.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="border-l-2 border-accent/50 pl-5 text-slate-300">
                  Preciprocal is what came out of that. Not a generic chatbot. A
                  purpose-built system designed by people who had to learn the hard way,
                  so you don&apos;t have to.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Who built it */}
        <section aria-label="Who built Preciprocal" className={`${SECTION} ${PAD}`}>
          <div className={`${INNER} grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start xl:gap-24`}>
            <Reveal>
              <Eyebrow>The team</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">
                Who&apos;s behind it
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-400">
                A team of international students and recent graduates who went through
                the US job search, figured out what actually works, and built the tools
                they wish they&apos;d had on day one.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <SpotlightCard className="rounded-2xl border border-white/[0.08] bg-[#070b16] p-7 sm:p-8">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft">
                  Where we come from
                </p>
                <div className="flex flex-wrap gap-2.5">
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
                <p className="mt-6 border-t border-white/[0.06] pt-5 text-sm leading-relaxed text-slate-400">
                  Collectively spread across US universities, applying to jobs in tech,
                  finance, consulting, and beyond. Every feature in Preciprocal traces
                  back to a real gap one of us hit during our own job search.
                </p>
              </SpotlightCard>
            </Reveal>
          </div>
        </section>

        {/* Timeline: a ruled horizontal track on wide screens, vertical on small */}
        <section aria-label="Company timeline" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal className="mb-12">
              <Eyebrow>Timeline</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">
                How we got here
              </h2>
            </Reveal>

            <RevealGroup as="ol" className="relative grid gap-10 border-l border-white/[0.08] pl-8 lg:grid-cols-4 lg:gap-8 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-10">
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

        {/* Values: ruled grid */}
        <section aria-label="Our values" className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <Reveal className="mb-12 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end xl:gap-24">
              <div>
                <Eyebrow>Values</Eyebrow>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">
                  What we believe
                </h2>
              </div>
              <p className="max-w-xl text-[15px] leading-relaxed text-slate-400">
                These aren&apos;t wall-poster values. They&apos;re decisions that show up in
                how we price, build, and talk to users.
              </p>
            </Reveal>

            <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 fill-sm-2">
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                return (
                  <RevealItem key={v.title} className="group relative bg-[#070b16] p-7 transition-colors duration-300 hover:bg-[#0a1020] sm:p-9">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/20 bg-accent/10">
                        <Icon aria-hidden="true" className="h-4 w-4 text-accent" />
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">{pad2(i + 1)}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white">{v.title}</h3>
                    <p className="max-w-md text-sm leading-relaxed text-slate-400">{v.description}</p>
                    <HoverRule className="inset-x-7 sm:inset-x-9" />
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        {/* Mission: a large pull quote */}
        <section aria-label="Our mission" className={`${SECTION} ${PAD}`}>
          <Reveal className={`${INNER} relative`}>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 left-0 select-none font-serif text-[9rem] leading-none text-accent/15 sm:-top-14 sm:text-[12rem]"
            >
              &ldquo;
            </span>
            <div className="relative max-w-5xl">
              <Eyebrow>Our mission</Eyebrow>
              <p className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
                &ldquo;Make expert-level career preparation accessible to every student,
                regardless of where they went to school or{" "}
                <span className="bg-gradient-to-r from-accent-soft via-accent to-accent-2 bg-clip-text text-transparent">
                  who they know.
                </span>
                &rdquo;
              </p>
              <p className="mt-8 max-w-2xl border-t border-white/[0.08] pt-6 text-[15px] leading-relaxed text-slate-400">
                The students who land the best jobs often aren&apos;t the most qualified.
                They&apos;re the best prepared. We&apos;re here to fix that.
              </p>
            </div>
          </Reveal>
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
