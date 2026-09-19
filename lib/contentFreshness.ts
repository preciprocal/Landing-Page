/**
 * Competitor pricing and feature claims go stale fast, and a stale claim on a
 * comparison page is a legal problem as much as an SEO one. Rather than wiring up
 * an external monitoring service, every dated comparison snapshot on the site is
 * registered here with a machine-readable check date. Anything older than
 * FRESHNESS_WINDOW_DAYS warns in development until someone re-verifies the claims
 * against the competitor's live pricing page and bumps `checkedAt`.
 *
 * Adding a new dated comparison? Register it here so it gets picked up too.
 */

/** How long a pricing snapshot is trusted before it needs re-verification. */
export const FRESHNESS_WINDOW_DAYS = 90;

export type ContentSnapshot = {
  /** ISO date (YYYY-MM-DD) the claims were last verified against live pricing pages. */
  checkedAt: string;
  /** Where the snapshot renders, so a re-check has an obvious starting point. */
  surface: string;
};

/**
 * TODO(2026-12-18): re-verify every snapshot below against the competitors' live
 * pricing pages, then bump `checkedAt`. The dev warning from `reportStaleContent`
 * fires until this is done.
 */
export const CONTENT_SNAPSHOTS = {
  "comparison-table": {
    checkedAt: "2026-09-19",
    surface: "components/ComparisonTable.tsx, homepage competitor grid",
  },
  "alternatives-pages": {
    checkedAt: "2026-09-19",
    surface: "app/alternatives/*/page.tsx, `pricingChecked` prop",
  },
  "alternatives-legacy": {
    checkedAt: "2026-09-19",
    surface:
      "app/alternatives/{final-round-ai,jobscan,resumeworded}-alternative/page.tsx, inline footnotes",
  },
} as const satisfies Record<string, ContentSnapshot>;

export type SnapshotId = keyof typeof CONTENT_SNAPSHOTS;

export type Freshness = {
  /** ISO date the snapshot was last verified. */
  checkedAt: string;
  /** "April 2026", derived from `checkedAt` so displayed copy cannot drift from it. */
  label: string;
  daysSinceChecked: number;
  isStale: boolean;
  /** ISO date the snapshot falls (or fell) out of the freshness window. */
  dueDate: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;

const MONTH_YEAR = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Human-readable month and year for a snapshot, e.g. "April 2026".
 *
 * Deliberately derived from `checkedAt` rather than stored alongside it: the old
 * footnotes hardcoded the month as a string, so the rendered date could drift away
 * from the date anyone was actually tracking. Formatted in UTC with a fixed locale
 * so server and client render identically.
 */
export function formatCheckedAt(id: SnapshotId): string {
  return MONTH_YEAR.format(new Date(`${CONTENT_SNAPSHOTS[id].checkedAt}T00:00:00Z`));
}

/**
 * Freshness of a single snapshot. `now` is injectable for tests, and callers should
 * only read the time-dependent fields (`daysSinceChecked`, `isStale`) after mount
 * (see ComparisonTable) so SSR and client markup stay in agreement.
 */
export function getFreshness(id: SnapshotId, now: Date = new Date()): Freshness {
  const { checkedAt } = CONTENT_SNAPSHOTS[id];
  const checked = new Date(`${checkedAt}T00:00:00Z`);
  const daysSinceChecked = Math.floor((now.getTime() - checked.getTime()) / DAY_MS);
  const due = new Date(checked.getTime() + FRESHNESS_WINDOW_DAYS * DAY_MS);

  return {
    checkedAt,
    label: formatCheckedAt(id),
    daysSinceChecked,
    isStale: daysSinceChecked > FRESHNESS_WINDOW_DAYS,
    dueDate: due.toISOString().slice(0, 10),
  };
}

/** Every registered snapshot that is past the freshness window. */
export function getStaleSnapshots(now: Date = new Date()) {
  return (Object.keys(CONTENT_SNAPSHOTS) as SnapshotId[])
    .map((id) => ({ id, ...getFreshness(id, now) }))
    .filter((snapshot) => snapshot.isStale)
    .sort((a, b) => b.daysSinceChecked - a.daysSinceChecked);
}

/**
 * Logs stale snapshots during development. No-ops in production so visitors never
 * see this and the check costs nothing in the shipped bundle path that matters.
 */
export function reportStaleContent(now: Date = new Date()): void {
  if (process.env.NODE_ENV === "production") return;

  const stale = getStaleSnapshots(now);
  if (stale.length === 0) return;

  console.warn(
    `[content-freshness] ${stale.length} pricing snapshot(s) past ${FRESHNESS_WINDOW_DAYS} days:\n` +
      stale
        .map(
          (s) =>
            `  • ${s.id}: checked ${s.label} (${s.daysSinceChecked} days ago, due ${s.dueDate})\n    ${CONTENT_SNAPSHOTS[s.id].surface}`
        )
        .join("\n") +
      `\nRe-verify against each competitor's live pricing page, then bump checkedAt in lib/contentFreshness.ts.`
  );
}
