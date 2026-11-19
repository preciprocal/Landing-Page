/**
 * app/opt/h1b-sponsors/page.tsx
 *
 * Targets: "companies that sponsor H-1B visas", "H-1B sponsorship companies
 * list", "H-1B sponsors 2026", "H-1B sponsor checker". Ranks the employers in
 * lib/h1bSponsors.ts by H-1B approvals in the latest fiscal year (USCIS H-1B
 * Employer Data Hub), each linking to its own page. It says plainly that the
 * list covers selected large employers, not every sponsor.
 *
 * Static at build, refreshed daily; throws if the data cannot be read (see the
 * note in [company]/page.tsx).
 */

import type { Metadata } from "next";
import Link from "next/link";
import OptGuidePage from "@/components/OptGuidePage";
import { SponsorListTable, everifyState, fmt, fy, longDate, yearTotals, type SponsorRow } from "@/components/opt/H1bSponsorData";
import { getEmployerProfile } from "@/lib/everify";
import { H1B_SPONSORS } from "@/lib/h1bSponsors";
import { SRC } from "@/lib/optSources";

export const revalidate = 86400;

const TITLE = "Companies That Sponsor H-1B Visas: USCIS Approvals by Employer";
const DESCRIPTION =
  "Which large US employers sponsor H-1B visas, ranked by USCIS approvals in the latest fiscal year, with new-hire counts and E-Verify status for STEM OPT. Free, from USCIS data.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "companies that sponsor h1b visas",
    "h1b sponsorship companies",
    "h1b sponsorship companies list",
    "h1b sponsors 2026",
    "top h1b sponsors",
    "h1b sponsor checker",
    "companies that sponsor h1b for international students",
    "e-verify companies stem opt",
  ],
  alternates: { canonical: "https://preciprocal.com/opt/h1b-sponsors" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://preciprocal.com/opt/h1b-sponsors",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v3.png", width: 1200, height: 630 }],
  },
};

export default async function H1bSponsorsPage() {
  const profiles = await Promise.all(H1B_SPONSORS.map((s) => getEmployerProfile(s.h1b, s.everify)));
  if (profiles.some((p) => !p || !p.years.length)) throw new Error("H-1B and E-Verify data unavailable");

  const year = profiles[0]!.years[0];
  const rows: SponsorRow[] = H1B_SPONSORS.map((s, i) => {
    const [t0] = yearTotals(profiles[i]!);
    return { slug: s.slug, name: s.name, approvals: t0.approvals, newEmployment: t0.newEmployment, everify: everifyState(profiles[i]!).state };
  }).sort((a, b) => b.approvals - a.approvals || a.name.localeCompare(b.name));

  const total = rows.reduce((s, r) => s + r.approvals, 0);
  const totalNew = rows.reduce((s, r) => s + r.newEmployment, 0);
  const enrolled = rows.filter((r) => r.everify === "enrolled" || r.everify === "ending").length;
  const [a, b, c] = rows;
  const h1bDate = longDate(profiles[0]!.h1bDataThrough);

  const faqs = [
    {
      q: `Which companies sponsor the most H-1B visas?`,
      a: `Of the ${rows.length} employers on this page, ${a.name} (${fmt(a.approvals)}), ${b.name} (${fmt(b.approvals)}) and ${c.name} (${fmt(c.approvals)}) had the most H-1B workers approved in ${fy(year)}. The table ranks every one.`,
    },
    {
      q: "Is this every company that sponsors H-1B?",
      a: `No. It covers ${rows.length} large employers whose filing names we checked by hand. For any other employer, use the free employer lookup, which searches every employer in the USCIS data.`,
    },
    {
      q: "What is the difference between approved and new employment?",
      a: "Approved counts workers across every petition type: new employment, continuation, change of employer, concurrent and amended. New employment is the closest measure of new hires sponsored.",
    },
    {
      q: "Does an employer need to sponsor me for OPT?",
      a: "No. OPT is authorised through your own EAD, so any employer can hire you on OPT in a role related to your major. STEM OPT needs an employer enrolled in E-Verify; H-1B needs the employer to file a petition.",
    },
    {
      q: "How current is this data?",
      a: `H-1B figures run through ${h1bDate ?? "the latest USCIS release"}, and the page refreshes daily. Preciprocal is not affiliated with USCIS.`,
    },
  ];

  return (
    <OptGuidePage
      breadcrumbName="H-1B sponsors"
      canonicalPath="/opt/h1b-sponsors"
      headline={TITLE}
      description={DESCRIPTION}
      h1="Companies that sponsor"
      h1Accent="H-⁠1B visas"
      intro={`${rows.length} large US employers ranked by H-1B workers approved in ${fy(year)}, with how many were new hires and whether each can hire you on STEM OPT. Open any employer for every year on record.`}
      badge={<span>USCIS records{h1bDate ? `, through ${h1bDate}` : ""}</span>}
      disclaimer="Independent reference, not affiliated with USCIS or the Department of Homeland Security. For general information, not legal advice."
      sourcesTitle="Data and references"
      hideCheckedDate
      keyFacts={[
        { value: String(rows.length), label: "Employers ranked" },
        { value: fmt(total), label: `H-1B approvals between them, ${fy(year)}` },
        { value: fmt(totalNew), label: `For new employment, ${fy(year)}` },
        { value: `${enrolled} of ${rows.length}`, label: "Enrolled in E-Verify (STEM OPT)" },
      ]}
      tool={<SponsorListTable rows={rows} year={year} />}
      ctaTool="job-tracker"
      bottomTitle="Apply where you can be hired."
      bottomBody="The Preciprocal job tracker shows E-Verify status and H-1B history on every application, and tailors your resume to each posting. Free to start."
      faqs={faqs}
      sources={[SRC.h1bHub, SRC.h1bHubGuide, SRC.everifySearch, SRC.uscisOpt, SRC.stemOverview]}
      body={
        <>
          <h2>Not on the list?</h2>
          <p>
            Use the <Link href="/opt/employer-lookup">free H-1B sponsor checker</Link> to search any US employer&apos;s H-1B
            approvals and E-Verify enrolment. Try the legal name on the job posting or offer letter: large employers often file
            through separate entities.
          </p>

          <h2>What each visa stage needs</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>OPT:</strong> no employer sponsorship; your EAD authorises the work.
            </li>
            <li>
              <strong>STEM OPT:</strong> an employer enrolled in E-Verify that signs your Form I-983. See the{" "}
              <Link href="/opt/stem-opt-extension">STEM OPT guide</Link>.
            </li>
            <li>
              <strong>H-1B:</strong> the employer files the petition. The <Link href="/opt/cap-gap">cap-gap extension</Link> can keep
              you working from OPT to the October 1 start, and the <Link href="/new-h1b-rules">H-1B rule tracker</Link> covers the
              fee and lottery changes.
            </li>
          </ul>
        </>
      }
    />
  );
}
