"use client";

/**
 * app/features/page.tsx
 *
 * Hub for every tool on the platform.
 *
 * Copy rules for this page:
 *   • Lead with the reader's problem, then the tool. Nobody wakes up wanting a
 *     "keyword gap analyser"; they wake up having sent forty applications and
 *     heard nothing. The pain line is the hook and the promise line is relief.
 *   • Never name a model, vendor or third-party provider. The reader does not
 *     care which engine runs underneath and naming one dates the page.
 *   • Say what they get, not how it works.
 *
 * Structure follows the arc of a real search rather than our internal product
 * groupings, so a reader can find themselves in it: get past the filter, reach
 * a human, win the interview, stay in control. Each stage links out to the tool
 * page that owns that head term.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";
import {
  RevealOnScroll,
  StaggerChildren,
  StaggerItem,
  MagneticHover,
  GlowDivider,
} from "@/components/LandingAnimations";

type Feature = {
  name: string;
  href: string;
  /** The reader's problem, in their words. */
  pain: string;
  /** What changes for them. */
  promise: string;
};

type Stage = {
  eyebrow: string;
  title: string;
  intro: string;
  features: Feature[];
};

const STAGES: Stage[] = [
  {
    eyebrow: "Stage one",
    title: "Get past the filter",
    intro:
      "Most applications are rejected before a person reads them. Not because you are unqualified, but because the document did not match the posting closely enough to survive the first pass.",
    features: [
      {
        name: "Resume scoring",
        href: "/free-ats-checker",
        pain: "You never find out why you were screened out.",
        promise:
          "Score your resume against a specific posting and see the exact terms it is missing, before you send it rather than after.",
      },
      {
        name: "Resume tailoring",
        href: "/resume-tailoring",
        pain: "One resume sent to forty jobs, rewritten for none of them.",
        promise:
          "Paste a job description and get bullet-level rewrites for that role, so one strong resume becomes forty targeted ones without forty evenings of work.",
      },
      {
        name: "LinkedIn optimisation",
        href: "/linkedin-profile-optimizer",
        pain: "Recruiters are searching for people like you and not finding you.",
        promise:
          "Fix the headline, About section and skills that decide whether you appear in their results at all.",
      },
    ],
  },
  {
    eyebrow: "Stage two",
    title: "Reach an actual human",
    intro:
      "An application in a portal joins several hundred others. A message that lands in a real inbox has your name on it. This is the step most people skip, and it is the one that changes the odds most.",
    features: [
      {
        name: "Cover letters",
        href: "/cover-letter-generator",
        pain: "The blank page at 11pm, for the fifth application today.",
        promise:
          "A letter grounded in that specific company and role, in minutes, that still sounds like you wrote it.",
      },
      {
        name: "Contact finding",
        href: "/recruiter-contact-finder",
        pain: "You would reach out directly if you knew who to reach.",
        promise:
          "Find the person who owns the role and get a verified way to contact them.",
      },
      {
        name: "Outreach writing",
        href: "/cold-email-generator",
        pain: "You know cold email works, and you have no idea what to say.",
        promise:
          "A short, specific message that asks for something small enough to get a reply.",
      },
    ],
  },
  {
    eyebrow: "Stage three",
    title: "Win the interview",
    intro:
      "This is where qualified people lose. Not on knowledge, but on saying it out loud, under time pressure, to a stranger who is deciding about you in real time.",
    features: [
      {
        name: "Mock interviews",
        href: "/ai-mock-interview",
        pain: "Your first time saying it out loud should not be the real thing.",
        promise:
          "Practise out loud with a panel that asks follow-ups and pushes back, then scores you and tells you precisely where it went wrong.",
      },
      {
        name: "Study planning",
        href: "/interview-study-planner",
        pain: "Two weeks to prepare and no idea what to do first.",
        promise:
          "A day-by-day plan built backward from your interview date and sized to the hours you actually have.",
      },
      {
        name: "Interview debriefs",
        href: "/interview-debrief",
        pain: "Almost nobody tells you why you were rejected.",
        promise:
          "Capture what you were asked while it is fresh, so the pattern across interviews becomes visible and fixable.",
      },
    ],
  },
  {
    eyebrow: "Stage four",
    title: "Stay in control of it",
    intro:
      "A search runs for months. The thing that quietly breaks people is not rejection, it is losing track: who has gone quiet, what needs a follow-up, what you even applied for.",
    features: [
      {
        name: "Application tracking",
        href: "/job-application-tracker",
        pain: "Thirty applications in, the spreadsheet stopped being updated.",
        promise:
          "One pipeline with stages and follow-up reminders, so nothing goes quiet without you noticing.",
      },
      {
        name: "One-click saving",
        href: "/chrome-extension",
        pain: "The reason tracking dies is the data entry.",
        promise:
          "Save any job you find in one click, full description included, already in your pipeline.",
      },
    ],
  },
];

const ALL_FEATURES = STAGES.flatMap((stage) => stage.features);

function FeaturesJsonLd() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://preciprocal.com/features#itemlist",
    name: "Preciprocal features",
    description: "Every tool Preciprocal provides for a job search.",
    itemListElement: ALL_FEATURES.map((feature, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: feature.name,
      description: feature.promise,
      url: `https://preciprocal.com${feature.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
    />
  );
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Features", url: "https://preciprocal.com/features" },
        ]}
      />
      <FeaturesJsonLd />
      <Navbar />

      <main className="relative overflow-hidden">
        {/* ── Breadcrumb ── */}
        <nav
          aria-label="Breadcrumb"
          className="w-full pt-28 pb-0 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48"
        >
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-300 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-slate-400">Features</li>
          </ol>
        </nav>

        {/* ── Hero ── */}
        <section aria-label="Overview" className="relative">
          <div className="w-full pt-14 pb-4 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48">
            <GlowDivider />

            <RevealOnScroll className="text-center max-w-2xl mx-auto mt-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-400 mb-4">
                Everything included
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-white tracking-tight leading-[1.1] mb-5">
                The job search asks for eleven different things.{" "}
                {/* Break only once there is room for two lines; the space above
                    keeps the sentences apart when this <br> is hidden. */}
                <br className="hidden sm:block" />
                <span className="text-gradient">You get all of them here.</span>
              </h1>
              <p className="text-[15px] text-slate-400 leading-relaxed">
                Applying is only one part of it. You also have to get past a filter, find
                the right person, say the right thing, perform under pressure, and keep
                track of all of it for months. Here is what handles each part.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* ── Stages ── */}
        {STAGES.map((stage, stageIndex) => (
          <section
            key={stage.title}
            aria-label={stage.title}
            className="relative px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48 py-14 sm:py-16"
          >
            <div className="w-full">
              <RevealOnScroll className="max-w-2xl mb-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-400 mb-3">
                  {stage.eyebrow}
                </p>
                <h2 className="text-2xl sm:text-[28px] font-extrabold text-white tracking-tight mb-3">
                  {stage.title}
                </h2>
                <p className="text-[14px] text-slate-400 leading-relaxed">{stage.intro}</p>
              </RevealOnScroll>

              <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                {stage.features.map((feature) => (
                  <StaggerItem key={feature.href} className="flex flex-col">
                    <Link
                      href={feature.href}
                      className="group flex flex-col flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6
                                 hover:border-indigo-500/30 hover:bg-white/[0.035] transition-all duration-300"
                    >
                      <p className="text-[13px] text-slate-500 leading-snug italic">
                        {feature.pain}
                      </p>

                      <div className="h-px bg-white/[0.06] my-4" />

                      <h3 className="text-[15px] font-semibold text-white leading-tight mb-2">
                        {feature.name}
                      </h3>
                      <p className="text-[13px] text-slate-400 leading-relaxed flex-1">
                        {feature.promise}
                      </p>

                      <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                        See how it works
                        <ArrowRight
                          className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerChildren>

              {stageIndex < STAGES.length - 1 && (
                <div className="h-px bg-white/[0.04] mt-14 sm:mt-16" />
              )}
            </div>
          </section>
        ))}

        {/* ── Closing CTA ── */}
        <section aria-label="Get started" className="relative px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48 pb-24 pt-4">
          <RevealOnScroll className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-[28px] font-extrabold text-white tracking-tight mb-4">
              Start with whichever part is hurting most
            </h2>
            <p className="text-[14px] text-slate-400 leading-relaxed mb-8">
              The free plan needs no card. Run your resume through it, do one mock
              interview, and decide from there.
            </p>

            <MagneticHover>
              <a
                href={`${APP_URL}/sign-up`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-[15px]
                           bg-gradient-to-r from-indigo-500 to-purple-500
                           hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)] transition-all duration-300"
              >
                Get started free
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </MagneticHover>

            <p className="mt-6 text-[12px] text-slate-600">
              Want the numbers instead?{" "}
              <Link
                href="/pricing"
                className="text-slate-400 hover:text-slate-300 transition-colors underline underline-offset-2"
              >
                See plans and limits
              </Link>
            </p>
          </RevealOnScroll>
        </section>
      </main>

      <Footer />
    </div>
  );
}
