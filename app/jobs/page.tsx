/**
 * app/jobs/page.tsx
 *
 * Targets: "jobs for F-1 students", "OPT jobs", "STEM OPT jobs", "H-1B
 * sponsor jobs", "jobs that sponsor H-1B", "E-Verify employers hiring".
 *
 * Live postings from employers' own job boards (official Greenhouse, Lever
 * and Ashby APIs), at employers in the USCIS H-1B data, with each employer's
 * E-Verify and H-1B record attached. lib/jobsFeed.ts explains the checks.
 * Copy says what the checks are; it never promises "no ghost jobs" or that
 * an employer will sponsor.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chevron from "@/components/Chevron";
import JobsBoard from "@/components/JobsBoard";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { APP_URL } from "@/lib/constants";
import { PAD, INNER, SECTION, BTN_PRIMARY, CtaPanel, PageHero, SectionHead, FaqSection } from "@/components/page/Layout";
import { Reveal } from "@/components/page/Reveal";

const TITLE = "Jobs for F-1 Students: OPT, STEM OPT and H-1B Sponsor Jobs";
const DESCRIPTION =
  "Live jobs from employers' own career sites, refreshed every 6 hours, with each employer's E-Verify status for STEM OPT and its H-1B approvals. Filter by field, level and sponsorship.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Preciprocal` },
  description: DESCRIPTION,
  keywords: [
    "jobs for F-1 students",
    "OPT jobs",
    "STEM OPT jobs",
    "H-1B sponsor jobs",
    "jobs that sponsor H-1B",
    "E-Verify employers hiring",
    "visa sponsorship jobs for international students",
    "entry level jobs H-1B sponsor",
  ],
  alternates: { canonical: "https://preciprocal.com/jobs" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://preciprocal.com/jobs",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v3.png", width: 1200, height: 630 }],
  },
};

const CHECKS = [
  {
    title: "Live on the employer's own site",
    body: "Every listing comes from the company's own job board, through the public feed its hiring system provides. When the company closes a role, it disappears at our next refresh, within 6 hours.",
  },
  {
    title: "Posted in the last 60 days",
    body: "Older postings are left out. A role that has been open for months is the most likely kind to be stale.",
  },
  {
    title: "Employers with a USCIS record",
    body: "Every employer here has H-1B decisions in USCIS data, and each job shows its E-Verify status, which STEM OPT requires.",
  },
];

const FAQS = [
  {
    q: "Where do these jobs come from?",
    a: "From employers' own job boards, through the public job feeds that Greenhouse, Lever and Ashby provide for this purpose. We do not copy listings from LinkedIn, Indeed or other job boards. Large employers that run their own career sites, such as Amazon or Google, are not listed here; use the employer lookup to check them and apply on their site.",
  },
  {
    q: "Does every company here sponsor H-1B?",
    a: "Every employer here has had H-1B decisions from USCIS in the last three fiscal years. The badge shows how many workers were approved in the latest year. That is past petitions, not a promise to sponsor a particular role, so ask the recruiter early.",
  },
  {
    q: "Can I apply to these on OPT?",
    a: "OPT is authorised by your own EAD, so any employer can hire you on OPT if the role is directly related to your major. For STEM OPT, the employer must be enrolled in E-Verify; use the STEM OPT filter to see only those employers.",
  },
  {
    q: "How do you avoid ghost jobs?",
    a: "Every listing is live on the employer's own board at our last refresh, was posted in the last 60 days, and appears once even if it is reposted. That removes closed and stale postings. It cannot prove a company intends to fill a role, so treat a long silence after applying as a signal to move on.",
  },
];

export default function JobsPage() {
  return (
    <div data-accent="emerald" className="min-h-screen bg-[#050810]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://preciprocal.com" },
          { name: "Jobs", url: "https://preciprocal.com/jobs" },
        ]}
      />
      <Navbar />
      <main>
        <PageHero
          sectionProps={{ "aria-label": "Jobs" }}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Jobs" }]}
          badge="Live, refreshed every 6 hours"
          title="Jobs that can hire you "
          accent="on OPT, STEM OPT and H-1B"
          subhead={
            <p>
              Real openings from employers&apos; own career sites, each with the employer&apos;s E-Verify status and H-1B record.
              Filter to the ones that fit your visa stage, then apply on the company&apos;s site.
            </p>
          }
        />

        <section className={`${PAD} pb-20`}>
          <div className={INNER}>
            <JobsBoard />
          </div>
        </section>

        <section className={`${SECTION} ${PAD}`}>
          <div className={INNER}>
            <SectionHead eyebrow="How we keep it real" title="Only live, recent roles " accent="from real employers" />
            <div className="grid gap-4 md:grid-cols-3">
              {CHECKS.map((c) => (
                <Reveal key={c.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
                  <h3 className="text-base font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.body}</p>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Checking a company that is not listed? Use the{" "}
              <Link href="/opt/employer-lookup" className="text-accent-soft underline underline-offset-4 hover:text-white">
                employer lookup
              </Link>{" "}
              for its E-Verify status and H-1B history.
            </p>
          </div>
        </section>

        <FaqSection items={FAQS} />

        <section className={`${PAD} pb-24`}>
          <Reveal>
            <CtaPanel
              title="Found one? Apply with a tailored resume."
              body={<p>Preciprocal tailors your resume and cover letter to the posting, tracks the application, and lets you practise the interview out loud.</p>}
              action={
                <a href={`${APP_URL}/sign-up`} className={BTN_PRIMARY}>
                  Start free <Chevron />
                </a>
              }
            />
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
