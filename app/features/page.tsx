/**
 * app/features/page.tsx
 *
 * Hub for every tool on the platform. Metadata lives in ./layout.tsx.
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
 *
 * Layout: PageHero with a sign-up aside and a four-stage index, then each
 * stage as one flow section: a centred head and its tools as an open row.
 */

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chevron from "@/components/Chevron";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";
import { PAD, INNER, ACCENT_TEXT, BTN_PRIMARY, CtaPanel, Eyebrow, HeroSignup, PageHero, pad2 } from "@/components/page/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/page/Reveal";

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
        name: "Question prediction",
        href: "/interview-question-predictor",
        pain: "Generic question lists are the same for every job.",
        promise:
          "Paste the posting and get the five questions it is most likely to lead to, then answer out loud and get scored. Free, no account needed.",
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

/** Running tool number at the start of each stage, so tools count 01..n across the page. */
const STAGE_START = STAGES.map((_, i) => STAGES.slice(0, i).reduce((sum, s) => sum + s.features.length, 0));

const stageSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** Columns for a stage's tools: as many as it has, up to four, so each stage sits in one row on wide screens. */
const COLS: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * One tool as an open list item: a number and a ruled top edge, the tool
 * name, the problem it answers in a quieter line, then what it does.
 */
function ToolItem({ feature, index }: { feature: Feature; index: number }) {
  return (
    <Link
      href={feature.href}
      className="group flex h-full flex-col border-t border-white/[0.08] pt-6 transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      <span className="font-mono text-[11px] text-accent-soft/80">{pad2(index)}</span>
      <h3 className="mt-3 text-lg font-semibold leading-tight text-white">{feature.name}</h3>
      <p className="mt-2 text-[14.5px] italic leading-snug text-slate-300">{feature.pain}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{feature.promise}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-soft transition-colors group-hover:text-white">
        See how it works
        <Chevron />
      </span>
    </Link>
  );
}

export default function FeaturesPage() {

  return (
    <div data-accent="violet" className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Features", url: "https://preciprocal.com/features" },
        ]}
      />
      <FeaturesJsonLd />
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <PageHero
          sectionProps={{ "data-section": "features-overview", "data-section-name": "Features overview", "aria-label": "Overview" }}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Features" }]}
          badge="Everything included"
          title={
            <span className="block lg:text-[3.35rem] lg:leading-[1.06]">
              The job search asks for twelve different things.{" "}
              <span className={`block pb-1 ${ACCENT_TEXT}`}>You get all of them here.</span>
            </span>
          }
          subhead={
            <p>
              Applying is only one part of it. You also have to get past a filter, find
              the right person, say the right thing, perform under pressure, and keep
              track of all of it for months. Here is what handles each part.
            </p>
          }
          aside={<HeroSignup href={`${APP_URL}/sign-up`} label="Start free" />}
        >
          <nav aria-label="Search stages">
            <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4 fill-sm-2 fill-lg-4">
              {STAGES.map((stage, i) => (
                <li key={stage.title} className="bg-[#070b16]">
                  <a
                    href={`#stage-${stageSlug(stage.title)}`}
                    className="group relative flex h-full min-h-[64px] items-center gap-4 px-5 py-4 transition-colors duration-300 hover:bg-[#0a1020] focus-visible:bg-[#0a1020] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent/60"
                  >
                    <span className="font-mono text-[12px] text-accent-soft">{pad2(i + 1)}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-white transition-colors group-hover:text-accent-soft">{stage.title}</span>
                      <span className="block text-[12px] text-slate-400">{stage.features.length} tools</span>
                    </span>
                    <Chevron className="text-slate-500 group-hover:text-accent-soft" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </PageHero>

        {/* ── Stages: one centred head and an open row of tools each ── */}
        {STAGES.map((stage, stageIndex) => {
          const start = STAGE_START[stageIndex];
          return (
            <section
              key={stage.title}
              id={`stage-${stageSlug(stage.title)}`}
              data-section={`feature-stage-${stageSlug(stage.title)}`}
              data-section-name={stage.title}
              aria-label={stage.title}
              className={`scroll-mt-24 border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}
            >
              <div className={INNER}>
                <Reveal className="mx-auto mb-12 max-w-2xl text-center">
                  <Eyebrow>
                    {pad2(stageIndex + 1)} · {stage.eyebrow}
                  </Eyebrow>
                  <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-[2.25rem]">{stage.title}</h2>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-slate-400">{stage.intro}</p>
                </Reveal>

                <RevealGroup className={`grid grid-cols-1 gap-x-10 gap-y-10 ${COLS[stage.features.length] ?? COLS[4]}`}>
                  {stage.features.map((feature, i) => (
                    <RevealItem key={feature.href}>
                      <ToolItem feature={feature} index={start + i + 1} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </section>
          );
        })}

        {/* ── Closing CTA ── */}
        <section
          data-section="features-cta"
          data-section-name="Features CTA"
          aria-label="Get started"
          className={`border-t border-white/[0.05] py-16 sm:py-20 ${PAD}`}
        >
          <Reveal>
            <CtaPanel
              title="Start with whichever part is hurting most"
              body={
                <p className="text-[15px] leading-relaxed">
                  The free plan needs no card. Run your resume through it, do one mock
                  interview, and decide from there.
                </p>
              }
              action={
                <a href={`${APP_URL}/sign-up`} className={BTN_PRIMARY}>
                  Get started free
                  <Chevron />
                </a>
              }
              note={
                <span className="text-slate-400">
                  Want the numbers instead?{" "}
                  <Link
                    href="/pricing"
                    className="text-slate-300 underline underline-offset-2 transition-colors hover:text-white"
                  >
                    See plans and limits
                  </Link>
                </span>
              }
            />
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
