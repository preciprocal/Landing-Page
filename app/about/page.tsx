"use client";

/**
 * app/about/page.tsx
 *
 * SEO:
 *   • BreadcrumbJsonLd — helps Google understand site hierarchy
 *   • AboutPage schema with accurate description
 *   • aria-labels on every section for accessibility + crawlability
 *   • Metadata lives in app/about/metadata.ts (separate file, "use client" constraint)
 */

import Link from "next/link";
import { ArrowRight, Heart, Zap, Shield, Users } from "lucide-react";
import {
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
  FloatingDots,
  GlowDivider,
  SpotlightCard,
} from "@/components/LandingAnimations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { APP_URL } from "@/lib/constants";

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
    <div className="min-h-screen bg-[#050810]">
      <AboutJsonLd />
      <Navbar />

      <main className="relative overflow-hidden">
        <FloatingDots count={25} />

        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="max-w-3xl mx-auto px-6 pt-28 pb-0">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-300 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-slate-400">About</li>
          </ol>
        </nav>

        {/* Hero */}
        <section aria-label="About Preciprocal" className="relative pt-10 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-slate-400 font-medium mb-6">
                Our story
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                We built the tool we{" "}
                <span className="text-gradient">wish existed</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Built by international students who experienced the US job market
                firsthand and decided to reverse-engineer it instead of accepting it.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Origin story */}
        <section aria-label="Our origin story" className="relative py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <GlowDivider />
            <div className="mt-16 space-y-6 text-slate-400 text-base leading-relaxed">
              <RevealOnScroll>
                <p className="text-xl text-white font-medium leading-relaxed">
                  Nobody teaches you how the US job market actually works.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p>
                  We came from different countries: India, Nigeria, Brazil, China,
                  and more, with strong degrees, real skills, and zero understanding
                  of why our applications kept disappearing. The cultural context around
                  networking, resume formatting, ATS systems, and interview expectations
                  was invisible. Nobody told us the rules because everyone else already knew them.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.15}>
                <p>
                  Between us, we sent hundreds of applications. We watched classmates
                  with less experience land roles faster, often because they knew someone
                  or had grown up speaking the language of American hiring. We didn&apos;t
                  resent it. We studied it.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <p>
                  What do ATS systems actually score? What do US recruiters look at in
                  the first 6 seconds? What do Google, McKinsey, and Goldman actually
                  ask in interviews, and how do they evaluate answers? We mapped all of
                  it, built tools to address each gap, and tested them on ourselves first.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.25}>
                <p>
                  Preciprocal is what came out of that. Not a generic chatbot. A
                  purpose-built system designed by people who had to learn the hard way,
                  so you don&apos;t have to.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Who built it */}
        <section aria-label="Who built Preciprocal" className="relative py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <RevealOnScroll className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Who&apos;s behind it
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-2xl">
                A team of international students and recent graduates who went through
                the US job search, figured out what actually works, and built the tools
                they wish they&apos;d had on day one.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <SpotlightCard
                className="rounded-xl border border-white/[0.12] bg-[#0d1428]/90 p-7"
                spotlightColor="rgba(99,102,241,0.08)"
              >
                <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-widest mb-5">
                  Where we come from
                </p>
                <div className="flex flex-wrap gap-3">
                  {TEAM_BACKGROUNDS.map((b) => (
                    <div
                      key={b.label}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.15]"
                    >
                      <img
                        src={`https://flagcdn.com/24x18/${b.code}.png`}
                        srcSet={`https://flagcdn.com/48x36/${b.code}.png 2x`}
                        width={20}
                        height={15}
                        alt={b.label}
                        className="rounded-[2px] object-cover flex-shrink-0"
                      />
                      <span className="text-xs text-slate-200 font-medium">{b.label}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.15]">
                    <span className="text-xs text-slate-300 font-medium">+ more</span>
                  </div>
                </div>
                <p className="text-slate-400 text-xs mt-5 leading-relaxed">
                  Collectively spread across US universities, applying to jobs in tech,
                  finance, consulting, and beyond. Every feature in Preciprocal traces
                  back to a real gap one of us hit during our own job search.
                </p>
              </SpotlightCard>
            </RevealOnScroll>
          </div>
        </section>

        {/* Timeline */}
        <section aria-label="Company timeline" className="relative py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <RevealOnScroll className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                How we got here
              </h2>
            </RevealOnScroll>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/[0.06]" />
              <StaggerChildren className="space-y-10">
                {MILESTONES.map((m) => (
                  <StaggerItem key={m.title}>
                    <div className="flex gap-6 pl-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-widest">
                          {m.date}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1 mb-2">
                          {m.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </section>

        {/* Values */}
        <section aria-label="Our values" className="relative py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll className="mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                What we believe
              </h2>
              <p className="text-slate-500 text-sm max-w-lg mx-auto">
                These aren&apos;t wall-poster values. They&apos;re decisions that show up in
                how we price, build, and talk to users.
              </p>
            </RevealOnScroll>

            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <StaggerItem key={v.title}>
                    <SpotlightCard className="rounded-xl border border-white/[0.06] bg-[#0a0f1e]/80 p-6 h-full">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                        <Icon className="w-4 h-4 text-indigo-400" />
                      </div>
                      <h3 className="text-[15px] font-bold text-white mb-2">{v.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {v.description}
                      </p>
                    </SpotlightCard>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </section>

        {/* Mission statement */}
        <section aria-label="Our mission" className="relative py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <RevealOnScroll>
              <SpotlightCard
                className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-10 text-center"
                spotlightColor="rgba(99,102,241,0.08)"
              >
                <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-widest mb-4">
                  Our mission
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-6">
                  &ldquo;Make expert-level career preparation accessible to every student,
                  regardless of where they went to school or who they know.&rdquo;
                </p>
                <p className="text-slate-400 text-sm">
                  The students who land the best jobs often aren&apos;t the most qualified.
                  They&apos;re the best prepared. We&apos;re here to fix that.
                </p>
              </SpotlightCard>
            </RevealOnScroll>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Contact and get started" className="relative py-20 px-6">
          <div className="max-w-xl mx-auto text-center">
            <RevealOnScroll>
              <h2 className="text-2xl font-extrabold text-white mb-4">
                Have a question or want to talk?
              </h2>
              <p className="text-slate-400 text-sm mb-8">
                We&apos;re a small team and we actually read every email. Whether it&apos;s
                feedback, a bug report, or just to say hi, reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:support@preciprocal.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/[0.06] border border-white/[0.08] text-white font-semibold rounded-lg text-sm hover:bg-white/[0.1] transition-all"
                >
                  Email us
                </a>
                <Link
                  href={`${APP_URL}/sign-up`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg text-sm hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)] transition-all"
                >
                  Try Preciprocal free <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}