/**
 * lib/optDates.ts
 *
 * Date math for the OPT calculators. Everything works on UTC midnight so a
 * visitor's time zone can never shift a deadline by a day, which matters when
 * the output is "the last day you can file".
 */

const DAY_MS = 24 * 60 * 60 * 1000;

/** "2026-10-13" -> UTC midnight, or null for empty or malformed input. */
export function parseDay(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCMonth() === m - 1 ? date : null;
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

/** Calendar months, clamped to the last day when the target month is shorter. */
export function addMonths(date: Date, months: number): Date {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + months;
  const lastDay = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m, Math.min(date.getUTCDate(), lastDay)));
}

/** Whole days from a to b (b minus a). */
export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / DAY_MS);
}

export function minDate(a: Date, b: Date): Date {
  return a.getTime() <= b.getTime() ? a : b;
}

const LONG = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDay(date: Date): string {
  return LONG.format(date);
}

/** Today as UTC midnight of the visitor's local calendar date. */
export function todayUtc(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

export function toInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}
