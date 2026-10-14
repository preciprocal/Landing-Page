/**
 * lib/optSources.ts
 *
 * Every source cited on the /opt guides. Each URL here was opened and the
 * specific claims the pages rely on were read on the page itself (not taken
 * from a search snippet) on the "opt-guides" check date in
 * lib/contentFreshness.ts. Do not add a source without doing the same.
 */

export const SRC = {
  uscisOpt: {
    label: "USCIS: Optional Practical Training (OPT) for F-1 Students",
    href: "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students",
  },
  uscisI765: { label: "USCIS: Form I-765, filing categories and timing", href: "https://www.uscis.gov/i-765" },
  uscisFees: {
    label: "USCIS Form G-1055 Fee Schedule (edition 10/07/26)",
    href: "https://www.uscis.gov/sites/default/files/document/forms/g-1055.pdf",
  },
  policyManual: {
    label: "USCIS Policy Manual, Volume 2, Part F, Chapter 5: Practical Training",
    href: "https://www.uscis.gov/policy-manual/volume-2-part-f-chapter-5",
  },
  sevpGuidance: {
    label: "SEVP Policy Guidance 1004-03: Update to Optional Practical Training (ICE)",
    href: "https://www.ice.gov/doclib/sevis/pdf/opt_policy_guidance_042010.pdf",
  },
  stemEligibility: {
    label: "Study in the States (DHS): Determining STEM OPT extension eligibility",
    href: "https://studyinthestates.dhs.gov/stem-opt-hub/for-students/students-determining-stem-opt-extension-eligibility",
  },
  stemOverview: {
    label: "Study in the States (DHS): STEM OPT extension overview",
    href: "https://studyinthestates.dhs.gov/stem-opt-hub/additional-resources/stem-opt-extension-overview",
  },
  stemFaq: {
    label: "Study in the States (DHS): STEM OPT frequently asked questions",
    href: "https://studyinthestates.dhs.gov/stem-opt-hub/additional-resources/stem-opt-frequently-asked-questions",
  },
  capGap: {
    label: "Study in the States (DHS): Recent H-1B rule extends F-1 cap-gap extension",
    href: "https://studyinthestates.dhs.gov/2025/04/recent-h-1b-rule-extends-f-1-cap-gap-extension",
  },
  h1bModernizationRule: {
    label: "Federal Register: H-1B modernization final rule, 89 FR 103054 (December 18, 2024)",
    href: "https://public-inspection.federalregister.gov/2024-29354.pdf",
  },
  h1bModernizationRelease: {
    label: "USCIS: DHS strengthens H-1B program (effective January 17, 2025)",
    href: "https://www.uscis.gov/newsroom/news-releases/dhs-strengthens-h-1b-program-allowing-us-employers-to-more-quickly-fill-critical-jobs",
  },
  optFeeNotice: {
    label: "Study in the States (DHS): Proposed rule establishing fees for OPT",
    href: "https://studyinthestates.dhs.gov/2026/10/dhs-publishes-proposed-rule-establishing-fees-for-optional-practical-training",
  },
  optFeePress: {
    label: "DHS press release: proposed OPT fees (October 2026)",
    href: "https://www.dhs.gov/news/2026/10/07/dhs-proposes-fees-foreign-student-work-program-protect-american-jobs",
  },
  optFeeDuane: {
    label: "Duane Morris: details of the proposed $70,000 and $30,000 OPT fees",
    href: "https://blogs.duanemorris.com/immigrationlaw/2026/10/07/dhs-proposes-70000-and-30000-fees-for-f-1-optional-practical-training/",
  },
  h1bCapFee: {
    label: "USCIS: DHS proposes additional H-1B fee ($103,265)",
    href: "https://www.uscis.gov/newsroom/news-releases/dhs-proposes-additional-h-1b-fee",
  },
  h1bCapFeeScope: {
    label: "Fragomen: scope of the proposed $103,265 H-1B fee",
    href: "https://www.fragomen.com/insights/united-states-uscis-proposes-new-fee-of-over-dollar100000-for-h-1b-cap-subject-petitions.html",
  },
  gatechEmployment: {
    label: "Georgia Tech OIE: types of employment on pre- and post-completion OPT",
    href: "https://isss.oie.gatech.edu/node/3541",
  },
  templeUnemployment: {
    label: "Temple University ISSS: OPT unemployment",
    href: "https://global.temple.edu/isss/student-resources/current-students/f-1-student/f-1-employment-options/optional-practical-training-opt/post-completion-opt/opt-unemployment",
  },
} as const;
