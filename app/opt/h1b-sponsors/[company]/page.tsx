/**
 * app/opt/h1b-sponsors/[company]/page.tsx
 *
 * "Does <company> sponsor H-1B?": one page per employer in lib/h1bSponsors.ts,
 * with its H-1B approvals by fiscal year (USCIS H-1B Employer Data Hub) and its
 * E-Verify enrolment (needed for STEM OPT). Every sentence about the employer
 * is built from those figures; nothing is written by hand per company.
 *
 * Static at build, refreshed daily. If the datasets cannot be read the page
 * throws: a failed build or a kept stale page is better than a page that says
 * an employer has no record when it does.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import OptGuidePage from "@/components/OptGuidePage";
import { EVERIFY_LABEL, EmployerYearTable, everifyState, fmt, fy, longDate, yearTotals } from "@/components/opt/H1bSponsorData";
import { getEmployerProfile } from "@/lib/everify";
import { H1B_SPONSORS, getH1bSponsor } from "@/lib/h1bSponsors";
import { ALL_COMPANIES } from "@/lib/constants";
import { SRC } from "@/lib/optSources";

export const revalidate = 86400;
export const dynamicParams = false;

interface Props {
  params: Promise<{ company: string }>;
}

export function generateStaticParams() {
  return H1B_SPONSORS.map((s) => ({ company: s.slug }));
}

async function load(slug: string) {
  const sponsor = getH1bSponsor(slug);
  if (!sponsor) return null;
  const profile = await getEmployerProfile(sponsor.h1b, sponsor.everify);
  if (!profile || !profile.years.length) throw new Error(`H-1B and E-Verify data unavailable for ${slug}`);
  return { sponsor, profile, totals: yearTotals(profile), ev: everifyState(profile) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company } = await params;
  const data = await load(company);
  if (!data) return {};
  const { sponsor, totals } = data;
  const [t0] = totals;
  const title = `Does ${sponsor.name} Sponsor H-1B? ${fy(t0.year)} Approvals and E-Verify`;
  const description = `${sponsor.name} had ${fmt(t0.approvals)} H-1B workers approved in ${fy(t0.year)}, ${fmt(t0.newEmployment)} for new employment, per USCIS. See every year, its E-Verify status for STEM OPT, and what it means for F-1 students.`;
  const url = `https://preciprocal.com/opt/h1b-sponsors/${sponsor.slug}`;
  return {
    title,
    description,
    keywords: [
      `does ${sponsor.name} sponsor h1b`,
      `${sponsor.name} h1b`,
      `${sponsor.name} h1b sponsorship`,
      `${sponsor.name} visa sponsorship`,
      `${sponsor.name} e-verify`,
      `${sponsor.name} stem opt`,
    ],
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", images: [{ url: "https://preciprocal.com/og-image-v3.png", width: 1200, height: 630 }] },
  };
}

export default async function SponsorPage({ params }: Props) {
  const { company } = await params;
  const data = await load(company);
  if (!data) notFound();
  const { sponsor, profile, totals, ev } = data;
  const name = sponsor.name;
  const [t0, t1] = totals;
  const span = totals.length > 1 ? `${fy(totals[totals.length - 1].year)} to ${fy(t0.year)}` : fy(t0.year);
  const spanTotal = totals.reduce((s, t) => s + t.approvals, 0);
  const sponsors = t0.approvals > 0 || (t1?.approvals ?? 0) > 0;
  const hasGuide = (ALL_COMPANIES as readonly string[]).includes(sponsor.slug);
  const evDate = longDate(profile.everifySourceUpdated);
  const h1bDate = longDate(profile.h1bDataThrough);

  const answer = sponsors
    ? `Yes. USCIS records show ${fmt(t0.approvals)} H-1B workers approved for ${name} in ${fy(t0.year)}${t1 ? ` and ${fmt(t1.approvals)} in ${fy(t1.year)}` : ""}. Whether it sponsors a particular role is the employer's decision, so ask the recruiter early.`
    : `USCIS records show no H-1B approvals for ${name} under the filing names on this page in ${fy(t0.year)}${t1 ? ` or ${fy(t1.year)}` : ""}. It may file under another legal name, so check with the employer lookup and ask the recruiter.`;

  const stemAnswer =
    ev.state === "enrolled" || ev.state === "ending"
      ? `${name} is enrolled in E-Verify (as ${ev.name}), which STEM OPT requires. The employer must also stay in good standing and sign your Form I-983. Confirm that the entity hiring you is the one enrolled.`
      : ev.state === "ended"
        ? `The E-Verify account found for ${name} (${ev.name}) has ended. STEM OPT needs an employer enrolled in E-Verify, so confirm the hiring entity's enrolment with the recruiter.`
        : `No E-Verify account was found under the names checked for ${name}. Large employers often enrol under a different legal name, so search the employer lookup and confirm with the recruiter before relying on STEM OPT.`;

  const faqs = [
    { q: `Does ${name} sponsor H-1B visas?`, a: answer },
    {
      q: `How many new H-1B workers did ${name} sponsor in ${fy(t0.year)}?`,
      a: `${fmt(t0.newEmployment)} of its ${fmt(t0.approvals)} approvals were for new employment, the closest measure of new hires sponsored. The rest cover continuations, changes of employer, concurrent and amended petitions.`,
    },
    { q: `Can ${name} hire me on STEM OPT?`, a: stemAnswer },
    {
      q: `Does ${name} need to sponsor me for OPT?`,
      a: `No. OPT is authorised through your own Employment Authorization Document, not an employer petition, so ${name} can hire you on OPT as long as the role is directly related to your major.`,
    },
    {
      q: "How current is this data?",
      a: `H-1B figures run through ${h1bDate ?? "the latest USCIS release"}${evDate ? `, and E-Verify records are current to ${evDate}` : ""}. This page refreshes daily. Preciprocal is not affiliated with USCIS.`,
    },
  ];

  return (
    <OptGuidePage
      breadcrumbName={name}
      breadcrumbParent={{ name: "H-1B sponsors", path: "/opt/h1b-sponsors" }}
      canonicalPath={`/opt/h1b-sponsors/${sponsor.slug}`}
      headline={`Does ${name} sponsor H-1B?`}
      description={faqs[0].a}
      h1={`Does ${name}`}
      h1Accent="sponsor H-⁠1B?"
      intro={`${answer.replace(/^Yes\. /, "")} Below: every year on record and whether ${name} can hire you on STEM OPT.`}
      badge={<span>Public USCIS records{h1bDate ? `, through ${h1bDate}` : ""}</span>}
      disclaimer="Independent reference, not affiliated with USCIS or the Department of Homeland Security. For general information, not legal advice."
      sourcesTitle="Data and references"
      hideCheckedDate
      keyFacts={[
        { value: fmt(t0.approvals), label: `H-1B approvals, ${fy(t0.year)}` },
        { value: fmt(t0.newEmployment), label: `For new employment, ${fy(t0.year)}` },
        { value: fmt(spanTotal), label: `Approvals, ${span}` },
        { value: EVERIFY_LABEL[ev.state], label: "E-Verify, needed for STEM OPT" },
      ]}
      tool={<EmployerYearTable profile={profile} name={name} note={sponsor.note} />}
      ctaTool="job-tracker"
      bottomTitle={`Applying to ${name}?`}
      bottomBody="Preciprocal tailors your resume to each posting, preps you for the interview, and shows E-Verify and H-1B history on every application in your tracker. Free to start."
      faqs={faqs}
      sources={[SRC.h1bHub, SRC.h1bHubGuide, SRC.everifySearch, SRC.uscisOpt, SRC.stemOverview]}
      body={
        <>
          <h2>What {name} can hire you on</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>OPT:</strong> no sponsorship needed. Your EAD authorises the work, and the role must relate to your major.
            </li>
            <li>
              <strong>STEM OPT:</strong> {stemAnswer} See the <Link href="/opt/stem-opt-extension">STEM OPT guide</Link>.
            </li>
            <li>
              <strong>H-1B:</strong> {sponsors ? `${name} files H-1B petitions every year on record above.` : "no approvals on record under these names."}{" "}
              If you are on OPT when the petition is filed, the <Link href="/opt/cap-gap">cap-gap extension</Link> can bridge you to the
              October 1 start.
            </li>
          </ul>

          <h2>Reading the numbers</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Approved</strong> counts workers across every petition type: new employment, continuation, change of employer,
              concurrent and amended.
            </li>
            <li>
              <strong>New employment</strong> is the closest measure of new hires sponsored.
            </li>
            <li>Figures are USCIS&apos;s first decision on each petition, under the legal names {name} files with.</li>
            <li>Fiscal years run October to September.</li>
          </ul>

          <h2>Next steps</h2>
          <ul className="list-disc pl-5 space-y-2">
            {hasGuide && (
              <li>
                <Link href={`/interview-prep/${sponsor.slug}`}>{name} interview guide</Link>: the process, rounds and how to prepare.
              </li>
            )}
            <li>
              <Link href={`/opt/employer-lookup?q=${encodeURIComponent(name)}`}>Check another {name} entity</Link> or any other employer
              in the free lookup.
            </li>
            <li>
              <Link href="/opt/h1b-sponsors">Compare H-1B sponsors</Link> across {H1B_SPONSORS.length} large employers.
            </li>
            <li>
              <Link href="/opt/unemployment-calculator">Count your OPT unemployment days</Link> while you apply.
            </li>
          </ul>
        </>
      }
    />
  );
}
