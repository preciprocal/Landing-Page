/**
 * app/opt/fees/page.tsx
 *
 * Targets: "OPT fee", "OPT fee 70000", "STEM OPT fee", "OPT application fee",
 * "I-765 fee OPT", "OPT premium processing fee".
 *
 * Two different questions share these searches: what OPT costs today, and
 * what the October 2026 proposal would add. The page answers both and keeps
 * them visibly separate, because the most damaging error here would be
 * presenting a proposed fee as one students already owe.
 *
 * Current fees: USCIS G-1055 fee schedule, edition 10/07/26. The October 16,
 * 2026 inflation change on the USCIS I-765 page applies to asylum, parole and
 * TPS work permits, not to OPT. Proposal: DHS notice and press release.
 */

import type { Metadata } from "next";
import Link from "next/link";
import OptGuidePage from "@/components/OptGuidePage";
import FeeChecker from "@/components/opt/FeeChecker";
import { SRC } from "@/lib/optSources";

const DESCRIPTION =
  "What OPT and STEM OPT cost today ($470 online I-765, $1,780 premium processing) and what DHS has proposed: a $70,000 fee for a first OPT and $30,000 for STEM OPT, paid by schools. Not in effect. Checker included.";

export const metadata: Metadata = {
  title: "OPT and STEM OPT Fees: $70K Proposal Explained",
  description: DESCRIPTION,
  keywords: [
    "OPT fee",
    "OPT fee 70000",
    "STEM OPT fee",
    "OPT application fee",
    "I-765 fee OPT",
    "OPT premium processing fee",
    "STEM OPT fee 30000",
    "OPT fee proposal",
  ],
  alternates: { canonical: "https://preciprocal.com/opt/fees" },
  openGraph: {
    title: "OPT and STEM OPT Fees: What You Pay Today and the $70,000 Proposal",
    description: DESCRIPTION,
    url: "https://preciprocal.com/opt/fees",
    type: "article",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
};

const FAQS = [
  {
    q: "Has DHS decided on the $70,000 OPT fee?",
    a: "No. On October 8, 2026, DHS published a proposed rule. It is not a decision and it is not in effect. DHS is taking public comments until November 9, 2026, then must review them and publish a final rule, which could change the amounts or drop the fee. A final rule would take effect 60 days after it is published.",
  },
  {
    q: "How much does it cost to apply for OPT right now?",
    a: "The USCIS fee for Form I-765 is $470 if you file online or $520 on paper. Premium processing, which is optional, costs an extra $1,780. These are the amounts on the USCIS G-1055 fee schedule dated October 7, 2026.",
  },
  {
    q: "How much does STEM OPT cost right now?",
    a: "The same as initial OPT: $470 online or $520 on paper for Form I-765, plus $1,780 if you choose premium processing.",
  },
  {
    q: "Who would pay the proposed $70,000 OPT fee?",
    a: "Under the proposal, your SEVP-certified school pays it before your DSO can recommend you for OPT, and USCIS would not approve your EAD until it is paid. DHS's own text acknowledges that schools could pass the cost on to students or employers.",
  },
  {
    q: "Would STEM OPT cost $30,000?",
    a: "As proposed, yes. Any OPT recommendation after a student's first one, including the STEM OPT extension, would carry a $30,000 fee. A student whose first OPT and STEM extension were both recommended after the effective date would therefore cost their school $100,000 in total.",
  },
  {
    q: "I am already on OPT. Do I have to pay?",
    a: "Not for the OPT period you are in. The proposal does not charge for any OPT already recommended or approved before the effective date. A later recommendation, such as a STEM OPT extension recommended after the rule takes effect, would carry the $30,000 fee.",
  },
  {
    q: "Is premium processing worth it for OPT?",
    a: "It gets USCIS to act on your application faster for $1,780, which can matter if you have a fixed start date. It does not make approval more likely, and you cannot work until the EAD is approved and its start date arrives. Check the current USCIS processing time before deciding.",
  },
];

export default function OptFeesPage() {
  return (
    <OptGuidePage
      breadcrumbName="OPT and STEM OPT fees"
      canonicalPath="/opt/fees"
      headline="OPT and STEM OPT Fees: What You Pay Today and the $70,000 Proposal"
      description={DESCRIPTION}
      h1="OPT and STEM OPT fees"
      h1Accent="today, and what DHS has proposed"
      intro="Nothing has been decided. DHS has proposed charging schools $70,000 for a student's first OPT and $30,000 for each one after it, including STEM OPT. Until a final rule is published and takes effect, you pay what OPT has always cost: the USCIS filing fee."
      keyFacts={[
        { value: "$470", label: "I-765 filed online today ($520 on paper)" },
        { value: "$1,780", label: "Optional premium processing" },
        { value: "$70,000", label: "Proposed fee for a first OPT (not in effect)" },
        { value: "$30,000", label: "Proposed fee for STEM OPT (not in effect)" },
      ]}
      tool={<FeeChecker />}
      ctaTool="resume-tailoring"
      bottomTitle="Make the OPT you get count."
      bottomBody="Whatever happens to the fee, your unemployment days are fixed. Tailored resumes, a tracker for every application, and interview practice, free to start."
      faqs={FAQS}
      sources={[SRC.uscisFees, SRC.uscisI765, SRC.optFeeNotice, SRC.optFeePress, SRC.optFeeDuane, SRC.uscisOpt]}
      body={
        <>
          <h2>What OPT costs today</h2>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-200">
                  <th className="pb-2 pr-4">Fee</th>
                  <th className="pb-2 pr-4">Online</th>
                  <th className="pb-2">Paper</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Form I-765 (initial OPT or STEM OPT)", "$470", "$520"],
                  ["Premium processing (Form I-907), optional", "$1,780", "$1,780"],
                ].map(([fee, online, paper]) => (
                  <tr key={fee} className="border-t border-white/[0.06]">
                    <td className="py-2 pr-4">{fee}</td>
                    <td className="py-2 pr-4">{online}</td>
                    <td className="py-2">{paper}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[12px] text-slate-500 mt-3">
              Source: USCIS G-1055 fee schedule, edition dated October 7, 2026. USCIS also has inflation changes taking
              effect October 16, 2026, but those apply to asylum, parole and TPS work permits, not to OPT.
            </p>
          </div>
          <p>
            Your school may also charge its own administrative fee for processing an OPT recommendation. That varies by
            school and is separate from anything USCIS charges.
          </p>

          <h2>What DHS has proposed</h2>
          <p>
            On October 8, 2026, DHS published a proposed rule titled &quot;Optional Practical Training Fees&quot; (docket
            ICEB-2026-0100). DHS says the purpose is to combat fraud and abuse, strengthen the integrity of the
            immigration system, and protect US workers.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>$70,000</strong> for a student&apos;s first OPT recommendation. Law firm summaries read this as the
                first OPT of any type, which would include pre-completion OPT.
              </li>
              <li>
                <strong>$30,000</strong> for each later OPT recommendation, including the STEM OPT extension. No further
                fees after that.
              </li>
              <li>
                <strong>Paid by the school</strong> before the DSO recommends the student in SEVIS. USCIS would not grant
                the EAD until it is paid.
              </li>
              <li>
                <strong>Effective 60 days after a final rule</strong> is published. None has been.
              </li>
              <li>
                <strong>Not charged for OPT already recommended or approved</strong> before the effective date.
              </li>
            </ul>
          </div>

          <h2>What it would cost, by situation</h2>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-200">
                  <th className="pb-2 pr-4">Your situation</th>
                  <th className="pb-2">Proposed fee to your school</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["On OPT or STEM OPT now", "None for the current period"],
                  ["On OPT now, STEM OPT recommended after the effective date", "$30,000 for the STEM extension"],
                  ["First OPT recommended after the effective date", "$70,000"],
                  ["First OPT and STEM OPT both after the effective date", "$100,000 in total"],
                ].map(([situation, fee]) => (
                  <tr key={situation} className="border-t border-white/[0.06]">
                    <td className="py-2 pr-4">{situation}</td>
                    <td className="py-2">{fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>What to do now</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Graduating in the next year?</strong> Ask your international student office how they would respond
              if the fee is finalised, and plan to request your recommendation as early as your filing window allows. Our{" "}
              <Link href="/opt/how-to-apply">filing deadline calculator</Link> shows your window.
            </li>
            <li>
              <strong>On OPT and planning STEM OPT?</strong> The STEM recommendation date is what would matter. You can file
              up to 90 days before your current OPT ends.
            </li>
            <li>
              <strong>Want a say?</strong> Comment on regulations.gov under docket ICEB-2026-0100 by November 9, 2026, the
              date DHS gives. Specific facts about how the fee would affect you carry more weight than form letters.
              Comments, including names, are published.
            </li>
          </ul>
          <p>
            For every other rule change affecting students, including the blocked duration of status rule, see the{" "}
            <Link href="/new-opt-rules">OPT rules tracker</Link>.
          </p>
        </>
      }
    />
  );
}
