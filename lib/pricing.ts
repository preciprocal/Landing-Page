/**
 * lib/pricing.ts
 *
 * Single source of truth for every price, quota and pack the marketing site
 * quotes. Before this existed the tier list was duplicated in three places
 * (components/Pricing.tsx, app/pricing/page.tsx, and a dead PLANS export in
 * lib/constants.ts) plus two separate schema.org blocks, which is how the old
 * Premium price ended up stated in seven files at once.
 *
 * Rules for anyone editing pricing:
 *   • Change the number here. Never in a component, meta description or JSON-LD.
 *   • Card bullets are derived from `quotas` by `tierFeatureLines`, so a quota
 *     change updates the homepage and /pricing together.
 *   • Schema.org offers read `priceUsd` directly, so structured data cannot
 *     drift from the visible price.
 *
 * NOTE ON "pull from an API": this repo is a static marketing site with no
 * backend, so a config module is the closest available thing to a shared
 * source. `getPacks()` is deliberately the only way packs are read, so pointing
 * it at a real endpoint later is a one-function change and no component needs
 * to be touched. See the TODO on PACKS.
 */

export type TierId = "free" | "pro" | "premium";

/** `null` means unlimited. */
export type Quota = number | null;

export type TierQuotas = {
  resumeAnalyses: Quota;
  coverLetters: Quota;
  mockInterviews: Quota;
  /**
   * Minutes per mock interview session. Tier-specific rather than one global
   * constant: the session cap is part of what a higher plan buys you.
   */
  mockInterviewMinutes: number;
  /**
   * Throughput cap, not a monthly allowance: how many resume or cover letter
   * generations can run in a single hour. Rendered separately from the monthly
   * meters so the two are not confused.
   */
  resumeCoverLetterPerHour: number;
  studyPlans: Quota;
  /** Debriefs of real interviews the user sat, captured in the journal. */
  interviewDebriefs: Quota;
  /** AI analyses run over those debriefs. */
  interviewAnalyses: Quota;
  linkedinOptimizations: Quota;
  outreachMessages: Quota;
  contactSearches: Quota;
  trackedJobs: Quota;
};

export type Tier = {
  id: TierId;
  name: string;
  /** Monthly price in USD. 0 for Free. */
  priceUsd: number;
  tagline: string;
  quotas: TierQuotas;
  /** Non-quota benefits, listed after the derived quota lines. */
  perks: readonly string[];
  cta: string;
  mostPopular: boolean;
};

export const TIERS: readonly Tier[] = [
  {
    id: "free",
    name: "Free",
    priceUsd: 0,
    tagline: "Get started and feel the value.",
    quotas: {
      resumeAnalyses: 3,
      coverLetters: 5,
      mockInterviews: 1,
      mockInterviewMinutes: 8,
      resumeCoverLetterPerHour: 5,
      studyPlans: 2,
      interviewDebriefs: 2,
      interviewAnalyses: 1,
      linkedinOptimizations: 2,
      outreachMessages: 3,
      contactSearches: 3,
      trackedJobs: 10,
    },
    perks: [],
    cta: "Get started free",
    mostPopular: false,
  },
  {
    id: "pro",
    name: "Pro",
    priceUsd: 9.99,
    tagline: "Everything an active job seeker needs.",
    quotas: {
      resumeAnalyses: 20,
      coverLetters: 30,
      mockInterviews: 3,
      mockInterviewMinutes: 10,
      resumeCoverLetterPerHour: 10,
      studyPlans: 10,
      interviewDebriefs: 5,
      interviewAnalyses: 4,
      linkedinOptimizations: 5,
      outreachMessages: 20,
      contactSearches: 15,
      trackedJobs: null,
    },
    perks: ["Priority AI response speed"],
    cta: "Start Pro",
    mostPopular: true,
  },
  {
    id: "premium",
    name: "Premium",
    priceUsd: 24.99,
    tagline: "Maximum power for serious candidates.",
    quotas: {
      resumeAnalyses: 50,
      coverLetters: 80,
      mockInterviews: 5,
      mockInterviewMinutes: 12,
      resumeCoverLetterPerHour: 15,
      studyPlans: 25,
      interviewDebriefs: 10,
      interviewAnalyses: 12,
      linkedinOptimizations: 15,
      outreachMessages: 60,
      contactSearches: 50,
      trackedJobs: null,
    },
    perks: [
      "Priority AI response speed",
      "Priority support (24hr SLA)",
      "Early access to new features",
    ],
    cta: "Go Premium",
    mostPopular: false,
  },
];

export type Pack = {
  id: string;
  name: string;
  priceUsd: number;
  /** One line per grant, already written the way it should render. */
  items: readonly string[];
};

/**
 * One-time purchases, not subscription tiers.
 *
 * Revised September 2026: the Starter Pack is new, the Final Round pack was
 * retired, Networking and Interview Boost were repriced, and Application Boost
 * no longer grants tracked jobs (Pro and Premium are unlimited, and the Free
 * tracker cap is not something a pack tops up).
 *
 * When a real pricing endpoint exists, change `getPacks()` to fetch it and
 * delete this constant; no component reads PACKS directly.
 */
const PACKS: readonly Pack[] = [
  {
    id: "starter-pack",
    name: "Starter Pack",
    priceUsd: 4.99,
    items: [
      "+1 mock interview",
      "+5 resume analyses",
      "+15 cover letters",
      "+2 contact searches",
      "+2 LinkedIn optimisations",
      "+2 outreach messages",
      "+2 logged interviews",
    ],
  },
  {
    id: "application-boost",
    name: "Application Boost",
    priceUsd: 4.99,
    items: ["+10 resume analyses", "+15 cover letters"],
  },
  {
    id: "networking-pack",
    name: "Networking Pack",
    priceUsd: 4.99,
    items: [
      "+15 contact searches",
      "+3 LinkedIn optimisations",
      "+15 outreach messages",
    ],
  },
  {
    id: "interview-boost",
    name: "Interview Boost",
    priceUsd: 6.49,
    items: ["+2 mock interviews", "+3 logged interviews"],
  },
];

/**
 * The only supported way to read packs. Synchronous today because the data is
 * local; swap the body for a fetch when the backend exposes pack pricing.
 */
export function getPacks(): readonly Pack[] {
  return PACKS;
}

/**
 * Packs follow a different and simpler rule than subscriptions, so it is stated
 * next to the packs themselves rather than left to the FAQ. A reader who only
 * sees the subscription refund copy would reasonably assume it applies here too.
 */
export const PACK_REFUND_LINE =
  "Changed your mind? A pack is refundable in full within 7 days, as long as you have not used any of it. Once you use part of a pack it is no longer refundable.";

// ─── Refund policy ───────────────────────────────────────────────────────────

/**
 * Refund copy lives here because the retired "land an interview within 30 days
 * or get a full refund, no hoops, no fine print" claim was restated in eleven
 * files including the Terms, so it went inaccurate in all of them at once.
 *
 * Two independent routes, and neither is a satisfaction guarantee. Both carry a
 * real eligibility condition, so do not reintroduce "no hoops", "no fine print"
 * or "no questions asked" phrasing on any surface.
 */
export const REFUND_POLICY = {
  /**
   * The hook. It names the reader's real grievance with subscriptions, that a
   * month is billed as time rather than as value, at a moment when they are
   * paying precisely because they have no income. Everything after it is proof.
   */
  hook: "Only pay for what you actually use.",
  /**
   * Route one, the usage refund.
   *
   * "Monthly allowance" rather than "mock interviews": the refund covers the
   * whole allowance, resume analyses, cover letters, debriefs, LinkedIn
   * optimisations and contact searches included. An earlier draft named only
   * mock interviews and made the offer look far narrower than it is.
   *
   * The half-way threshold is stated here rather than hidden in the Terms
   * because the gate excludes light users: someone who used a tenth of their
   * allowance gets nothing back. An unqualified "whatever you do not use is
   * refundable" would be untrue for exactly the people most likely to believe
   * it, which is how the claim this replaced went wrong.
   */
  usageLine:
    "Use more than half your monthly allowance and the value of the rest comes back.",
  /**
   * Route two, the Success Refund, and the payoff, so it closes.
   *
   * "Share your story" is load-bearing, not decoration. The Success Refund
   * requires an offer letter, a public LinkedIn post and a testimonial, so
   * "land the job and that month is free" on its own would read as automatic
   * and would be the same over-promise as the claim this replaced. The phrase
   * signals the condition in the reader's language and the Terms carry the
   * specifics. Do not drop it.
   */
  successLine:
    "Land the job while subscribed, share your story, and the month's subscription is on us.",
  /**
   * Remaining conditions (the processing-fee deduction, the three required items,
   * the one-billing-period scope) are stated in full in the Terms, which is what
   * the notice links to.
   *
   * Do not add urgency, scarcity or outcome guarantees to any line above. The
   * claim these replaced ("land an interview in 30 days or a full refund, no
   * hoops, no fine print") had to be retired from eleven surfaces because it
   * promised an outcome we do not control.
   */
} as const;

// ─── Display helpers ─────────────────────────────────────────────────────────

/** "$9.99", "$24.99", "$0". Trims the cents pair only when both are zero. */
export function formatUsd(amount: number): string {
  return amount % 1 === 0 ? `$${amount}` : `$${amount.toFixed(2)}`;
}

/** Price as shown on a plan card: "Free" for $0, otherwise "$9.99". */
export function tierPriceLabel(tier: Tier): string {
  return tier.priceUsd === 0 ? "Free" : formatUsd(tier.priceUsd);
}

/** "/mo", or "" for Free so the card does not render a dangling suffix. */
export function tierPeriodLabel(tier: Tier): string {
  return tier.priceUsd === 0 ? "" : "/mo";
}

function pluralise(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

/**
 * Card bullets derived from a tier's quotas, in one canonical order shared by
 * all three tiers so the columns line up and can be read across. Perks follow.
 */
export function tierFeatureLines(tier: Tier): string[] {
  const q = tier.quotas;
  const lines: string[] = [
    `${pluralise(q.resumeAnalyses ?? 0, "resume analysis", "resume analyses")} / month`,
    `${pluralise(q.coverLetters ?? 0, "cover letter", "cover letters")} / month`,
    mockInterviewLine(q.mockInterviews ?? 0, q.mockInterviewMinutes),
    `${pluralise(q.studyPlans ?? 0, "study plan", "study plans")} / month`,
    `${pluralise(q.interviewDebriefs ?? 0, "interview debrief", "interview debriefs")} / month`,
    `${pluralise(q.interviewAnalyses ?? 0, "AI interview analysis", "AI interview analyses")} / month`,
    `${pluralise(q.linkedinOptimizations ?? 0, "LinkedIn optimisation", "LinkedIn optimisations")} / month`,
    `${pluralise(q.outreachMessages ?? 0, "outreach message", "outreach messages")} / month`,
    `${pluralise(q.contactSearches ?? 0, "recruiter contact search", "recruiter contact searches")} / month`,
    q.trackedJobs === null ? "Unlimited job tracker" : `Job tracker (${q.trackedJobs} jobs)`,
    // Hourly throughput, stated last so it is not read as another monthly meter.
    `${q.resumeCoverLetterPerHour} resume or cover letter runs / hour`,
  ];

  return [...lines, ...tier.perks];
}

function mockInterviewLine(count: number, minutes: number): string {
  const suffix = count === 1 ? `(${minutes} min)` : `(${minutes} min each)`;
  return `${pluralise(count, "mock interview", "mock interviews")} / month ${suffix}`;
}

export function getTier(id: TierId): Tier {
  const tier = TIERS.find((t) => t.id === id);
  if (!tier) throw new Error(`Unknown tier: ${id}`);
  return tier;
}

/** Price string for prose and meta descriptions, e.g. "$24.99/mo". */
export function tierPriceWithPeriod(id: TierId): string {
  const tier = getTier(id);
  return tier.priceUsd === 0 ? "Free" : `${formatUsd(tier.priceUsd)}/mo`;
}

/** Bare decimal for schema.org `price`, which must not carry a currency symbol. */
export function tierSchemaPrice(id: TierId): string {
  return getTier(id).priceUsd.toFixed(2);
}
