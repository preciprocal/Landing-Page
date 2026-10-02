/**
 * lib/analytics/types.ts
 *
 * The wire contract between the browser tracker (lib/analytics/client.ts) and
 * the collector (app/api/collect/route.ts). Both sides import from here, so a
 * change to an event shape cannot drift between them.
 *
 * Nothing in this file may carry personal data. The browser never sends an IP,
 * a name, an email, or anything typed into a form; the collector derives
 * country and the daily anonymous hash from request headers on the server and
 * discards the IP without writing it. See supabase/web_analytics.sql for the
 * identity model this implements.
 */

export type EventType =
  | "page_view"
  | "section_view"
  | "click"
  | "scroll_depth"
  | "session_end";

/** Where a click was heading. Drives the target_kind column and app CTR. */
export type TargetKind =
  | "internal" // another page on the marketing site
  | "app" // app.preciprocal.com, i.e. sign-up or sign-in
  | "external" // any other origin
  | "anchor" // same-page #fragment
  | "mailto"
  | "button"; // a button with data-track, no href

/** 'anonymous' = no decision yet, 'granted'/'declined' = banner answered. */
export type ConsentLabel = "anonymous" | "granted" | "declined";

export interface TrackedEvent {
  type: EventType;
  /** ms since epoch, taken when the event occurred rather than when it is sent. */
  ts: number;
  path: string;
  pageTitle?: string;

  // page_view
  referrerPath?: string | null;
  timeOnPageMs?: number;

  // section_view
  sectionId?: string;
  sectionName?: string;
  sectionIndex?: number;
  dwellMs?: number;
  maxVisiblePct?: number;

  // click
  targetKind?: TargetKind;
  targetHref?: string;
  targetPath?: string | null;
  targetLabel?: string;
  targetSection?: string | null;

  // scroll_depth
  scrollPct?: number;

  metadata?: Record<string, unknown>;
}

/**
 * Session-level context, sent with every batch rather than every event.
 *
 * `visitorId` is present only when the visitor accepted analytics cookies. For
 * everyone else it is omitted entirely and the collector falls back to the
 * daily-rotating anonymous hash, which cannot connect two days of traffic.
 */
export interface SessionContext {
  sessionId: string;
  visitorId?: string;
  consent: ConsentLabel;
  /** Set only on the batch that opens the session, so the collector can insert it once. */
  isNew?: boolean;

  entryPath?: string;
  referrer?: string;
  query?: string;

  viewportW?: number;
  viewportH?: number;
  screenW?: number;
  screenH?: number;
  language?: string;
  timezone?: string;
}

export interface CollectPayload {
  session: SessionContext;
  events: TrackedEvent[];
}

/** Rejected batches are dropped silently by the browser; this is for logs only. */
export interface CollectResponse {
  ok: boolean;
  accepted?: number;
  error?: string;
}

/** Caps, enforced on both sides so a malformed or hostile batch cannot land. */
export const LIMITS = {
  maxEventsPerBatch: 50,
  maxStringLength: 512,
  maxHrefLength: 1024,
  /** A section_view claiming more dwell than this is clock-skewed or forged. */
  maxDwellMs: 30 * 60 * 1000,
} as const;
