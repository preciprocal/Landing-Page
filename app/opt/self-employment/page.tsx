/**
 * app/opt/self-employment/page.tsx
 *
 * Targets: "self employment on OPT", "start a business on OPT", "STEM OPT
 * self employment", "can I work for my own company on STEM OPT", "H-1B for
 * startup founders", "self sponsor H-1B".
 *
 * Three different answers to one question, so the page leads with a side by
 * side comparison. Sources: SEVP Policy Guidance 1004-03 (OPT), DHS STEM OPT
 * Hub and the USCIS Policy Manual (STEM OPT), and the regulatory text of the
 * H-1B modernization rule, 89 FR 103054 (H-1B beneficiary-owners).
 */

import type { Metadata } from "next";
import Link from "next/link";
import OptGuidePage from "@/components/OptGuidePage";
import { SRC } from "@/lib/optSources";

const DESCRIPTION =
  "Can you work for your own company? On post-completion OPT, yes. On STEM OPT, generally not. On H-1B, your company can sponsor you, with 18-month approvals. The rules for each, from official sources.";

export const metadata: Metadata = {
  title: "Self-Employment on OPT, STEM OPT and H-1B",
  description: DESCRIPTION,
  keywords: [
    "self employment on OPT",
    "start a business on OPT",
    "STEM OPT self employment",
    "work for my own company STEM OPT",
    "H-1B for startup founders",
    "self sponsor H-1B",
    "H-1B beneficiary owner",
    "1099 on OPT",
  ],
  alternates: { canonical: "https://preciprocal.com/opt/self-employment" },
  openGraph: {
    title: "Self-Employment on OPT, STEM OPT and H-1B: What Is Allowed",
    description: DESCRIPTION,
    url: "https://preciprocal.com/opt/self-employment",
    type: "article",
    images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }],
  },
};

const FAQS = [
  {
    q: "Can I be self-employed on OPT?",
    a: "On regular OPT, yes. SEVP guidance says a student on OPT may start a business and be self-employed, as long as you have the proper business licences and are actively engaged in a business related to your degree. On post-completion OPT you also need to work at least 20 hours a week for it to count as employment.",
  },
  {
    q: "Can I do freelance or 1099 contract work on OPT?",
    a: "Yes, on regular OPT. SEVP calls it work for hire. The work must relate to your degree, and you should be able to show DHS the duration of each contract and the name and address of the contracting company.",
  },
  {
    q: "Can I work for my own startup on STEM OPT?",
    a: "Generally not as a self-employed founder. STEM OPT requires a bona fide employer-employee relationship with an E-Verify employer that signs your Form I-983, and DHS says the student may not provide the employer attestation. The USCIS Policy Manual lists sole proprietorships among arrangements that may not show a bona fide relationship. A start-up can be a STEM OPT employer if it meets every requirement, but someone other than you has to be your employer in substance. Get advice from an immigration attorney first.",
  },
  {
    q: "Can I sponsor myself for an H-1B?",
    a: "Not as an individual, but a US company you own can petition for you. Since January 17, 2025, the rules allow an H-1B even when you hold a controlling interest in the petitioner, meaning more than 50 percent ownership or majority voting rights. The initial approval and first extension are each limited to 18 months, and you must spend the majority of your time on specialty occupation duties.",
  },
  {
    q: "Does a founder-owned H-1B still go through the lottery?",
    a: "Yes, if the company is cap-subject. The beneficiary-owner rules change who can be the employer, not the cap. The proposed $103,265 fee on cap-subject petitions, if finalised, would apply to these petitions too.",
  },
  {
    q: "What documents should I keep if I am self-employed on OPT?",
    a: "Your business licences, evidence that the business is active and related to your degree (contracts, invoices, client work, a website), and a record of your weekly hours. Keep them for the whole OPT period: USCIS can ask for them in a later application, such as an H-1B or a green card.",
  },
];

export default function SelfEmploymentPage() {
  return (
    <OptGuidePage
      breadcrumbName="Self-employment on OPT, STEM OPT and H-1B"
      canonicalPath="/opt/self-employment"
      headline="Self-Employment on OPT, STEM OPT and H-1B: What Is Allowed"
      description={DESCRIPTION}
      h1="Self-employment on OPT, STEM OPT and H-1B"
      h1Accent="when you can work for yourself"
      intro="The same question has three different answers. On regular OPT you can run your own business. On STEM OPT you generally cannot be your own employer. On H-1B your company can sponsor you, under tighter limits."
      keyFacts={[
        { value: "Yes", label: "Self-employment on post-completion OPT" },
        { value: "Generally no", label: "Self-employment on STEM OPT" },
        { value: "Yes, limited", label: "H-1B through a company you own" },
        { value: "18 months", label: "Max H-1B approval for owners, initial and first extension" },
      ]}
      ctaTool="cold-outreach"
      bottomTitle="Building something? Find your first customers."
      bottomBody="Find contacts at target companies and write short outreach that gets replies. Free to start."
      faqs={FAQS}
      sources={[SRC.sevpGuidance, SRC.gatechEmployment, SRC.stemEligibility, SRC.policyManual, SRC.h1bModernizationRule, SRC.h1bModernizationRelease, SRC.h1bCapFee]}
      body={
        <>
          <h2>Side by side</h2>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="text-left text-slate-200">
                  <th className="pb-2 pr-4" />
                  <th className="pb-2 pr-4">Post-completion OPT</th>
                  <th className="pb-2 pr-4">STEM OPT</th>
                  <th className="pb-2">H-1B</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Own business", "Allowed", "Generally not", "Through your company, as petitioner"],
                  ["1099 contract work", "Allowed", "Generally not: needs a bona fide employee relationship", "No, needs an employer petition"],
                  ["Unpaid work", "Allowed, 20+ hrs a week", "Not allowed", "No"],
                  ["Who must be the employer", "Any employer, or your own business", "An E-Verify employer that signs the I-983", "A US employer that petitions for you"],
                ].map(([row, a, b, c]) => (
                  <tr key={row} className="border-t border-white/[0.06] align-top">
                    <td className="py-2 pr-4 text-slate-200">{row}</td>
                    <td className="py-2 pr-4">{a}</td>
                    <td className="py-2 pr-4">{b}</td>
                    <td className="py-2">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Self-employment on regular OPT</h2>
          <p>
            SEVP&apos;s OPT policy guidance is direct: a student on OPT may start a business and be self-employed. The
            conditions are that you have the proper business licences and are actively engaged in a business related to
            your degree program. On post-completion OPT, the general rule also applies: you must work at least 20 hours a
            week for it to count as employment, or the days count toward your 90-day unemployment limit.
          </p>
          <p>
            Report the business as your employer within 10 days, as you would any job, so SEVIS shows you as employed.
            Then keep evidence, because a later application can ask for it: licences and registrations, contracts and
            invoices, proof of client work, and a log of weekly hours. Freelance and 1099 contract work are a separate
            permitted category, called work for hire, with their own records to keep. See the{" "}
            <Link href="/opt/unemployment-calculator">full list of employment that stops the OPT clock</Link>.
          </p>

          <h2>Why STEM OPT generally rules out self-employment</h2>
          <p>The STEM extension adds employer requirements that a one-person business cannot usually meet:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The employer must be enrolled in E-Verify.</li>
            <li>You must be a bona fide employee of the employer that signs your Form I-983, and DHS says the student may not provide the employer attestation.</li>
            <li>The employer must guarantee at least 20 hours a week and provide formal training tied to your STEM degree.</li>
            <li>The USCIS Policy Manual lists sole proprietorships among arrangements that may not show a bona fide employer-employee relationship, and says you may not work on a volunteer basis.</li>
          </ul>
          <p>
            DHS does say a start-up can qualify if it meets every requirement. In practice that means a real company,
            enrolled in E-Verify, where someone other than you supervises your training and signs as the employer.
            Whether a company you founded can meet that depends on its ownership and governance, so talk to an
            immigration attorney before relying on it. More in the <Link href="/opt/stem-opt-extension">STEM OPT guide</Link>.
          </p>

          <h2>H-1B for founders: the beneficiary-owner rule</h2>
          <p>
            The H-1B modernization rule, effective January 17, 2025, codified that a company can be your H-1B employer
            even if you own it. The regulatory text sets the conditions:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Controlling interest</strong> means you own more than 50 percent of the petitioner or have majority
              voting rights.
            </li>
            <li>
              <strong>18-month limits:</strong> the initial approval is limited to up to 18 months, and so is the first
              extension (including an amended petition requesting an extension of stay).
            </li>
            <li>
              <strong>Majority of time:</strong> you can do work tied to owning and running the business, as long as you
              spend the majority of your time on the specialty occupation duties in the petition.
            </li>
            <li>The usual H-1B requirements, including a bona fide specialty occupation job and the labor condition application, still apply.</li>
          </ul>
          <p>
            A founder&apos;s company that is cap-subject still needs a lottery selection. And if DHS finalises its
            proposed $103,265 fee on cap-subject petitions, that would apply here too. The{" "}
            <Link href="/new-h1b-rules">H-1B rules tracker</Link> has the current status.
          </p>
        </>
      }
    />
  );
}
