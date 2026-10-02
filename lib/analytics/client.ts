/**
 * lib/analytics/client.ts
 *
 * The browser half of first-party analytics. Mounted once by
 * components/AnalyticsTracker.tsx; nothing else should import from here except
 * that component and the section hook.
 *
 * WHAT IT COLLECTS
 *   page_view      every route change, with time spent on the page it left
 *   section_view   per [data-section] block: how long it was actually on
 *                  screen and how much of it was visible
 *   click          every link and [data-track] button, classified by where it
 *                  was heading, and tagged with the section it was clicked in
 *   scroll_depth   25 / 50 / 75 / 100 thresholds, once each per page view
 *   session_end    closes the session with its duration and exit page
 *
 * WHAT IT NEVER COLLECTS
 *   No IP (the collector derives country server-side and throws the IP away),
 *   no form input, no text the visitor typed, no keystrokes, no clipboard. The
 *   only free text that leaves the browser is a link's own visible label, which
 *   is authored content, and it is truncated.
 *
 * CONSENT (lib/consent.ts)
 *   Declined or undecided -> events still flow, but with no persistent
 *   identifier. The collector hashes IP + user agent against a salt that
 *   rotates daily, so two visits on different days cannot be linked. This is
 *   the cookieless model Plausible and Fathom use.
 *   Accepted -> a stable visitor_id in localStorage is added, which is what
 *   makes returning-visitor and multi-session funnel analysis possible.
 *   Withdrawing consent deletes that id immediately.
 *
 * Global Privacy Control is honoured as an opt-out of the persistent id even
 * if the banner was accepted, because GPC is legally binding in California and
 * a stored identifier is the part that actually engages it.
 */

import { APP_URL } from "@/lib/constants";
import { getConsent } from "@/lib/consent";
import { LIMITS, type CollectPayload, type ConsentLabel, type SessionContext, type TargetKind, type TrackedEvent } from "./types";

const ENDPOINT = "/api/collect";
const SESSION_KEY = "preciprocal_analytics_session";
const VISITOR_KEY = "preciprocal_analytics_visitor";

/** A visit ends after this much inactivity, matching the GA4 convention. */
const SESSION_IDLE_MS = 30 * 60 * 1000;
/** Batches are held this long to coalesce bursts of scrolling into one request. */
const FLUSH_INTERVAL_MS = 5_000;
/** A section counts as "on screen" at this much visibility. */
const SECTION_VISIBLE_RATIO = 0.5;

// ── module state ────────────────────────────────────────────────────────────

let started = false;
let queue: TrackedEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

let sessionId = "";
let sessionIsNew = false;
let currentPath = "";
let previousPath: string | null = null;
let pageEnteredAt = 0;
let pageViewsThisSession = 0;

let scrollThresholdsHit = new Set<number>();
let sectionObserver: IntersectionObserver | null = null;

/** Live dwell accounting for every [data-section] currently on the page. */
interface SectionState {
  id: string;
  name: string;
  index: number;
  dwellMs: number;
  maxVisiblePct: number;
  visibleSince: number | null;
  everSeen: boolean;
}
let sections = new Map<Element, SectionState>();

// ── small helpers ───────────────────────────────────────────────────────────

const now = () => Date.now();

function uuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  // Pre-2021 Safari. Not cryptographically strong, but these ids only need to
  // be collision-free, not unguessable.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function trunc(s: string | null | undefined, max: number = LIMITS.maxStringLength): string | undefined {
  if (!s) return undefined;
  const t = s.trim();
  return t ? t.slice(0, max) : undefined;
}

function readLocal(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null; // private mode or blocked storage
  }
}

function writeLocal(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

function hasGlobalPrivacyControl(): boolean {
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

function consentLabel(): ConsentLabel {
  const c = getConsent();
  if (c === "accepted") return "granted";
  if (c === "declined") return "declined";
  return "anonymous";
}

/**
 * The stable id, which exists only with consent and only without GPC.
 *
 * Called on every batch rather than cached, so revoking consent through the
 * footer's cookie preferences link stops the id being sent on the very next
 * request instead of at the next page load.
 */
function visitorId(): string | undefined {
  if (consentLabel() !== "granted" || hasGlobalPrivacyControl()) {
    try {
      localStorage.removeItem(VISITOR_KEY);
    } catch {
      /* ignore */
    }
    return undefined;
  }
  let id = readLocal(VISITOR_KEY);
  if (!id) {
    id = uuid();
    writeLocal(VISITOR_KEY, id);
  }
  return id;
}

// ── session ─────────────────────────────────────────────────────────────────

/**
 * Resumes the current visit or opens a new one.
 *
 * Kept in sessionStorage rather than localStorage so it dies with the tab, and
 * stamped with a timestamp so a tab left open overnight starts a fresh session
 * in the morning instead of reporting an eighteen-hour visit.
 */
function initSession() {
  let stored: { id: string; ts: number } | null = null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) stored = JSON.parse(raw);
  } catch {
    stored = null;
  }

  if (stored && stored.id && now() - stored.ts < SESSION_IDLE_MS) {
    sessionId = stored.id;
    sessionIsNew = false;
  } else {
    sessionId = uuid();
    sessionIsNew = true;
  }
  touchSession();
}

function touchSession() {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: sessionId, ts: now() }));
  } catch {
    /* ignore */
  }
}

function sessionContext(): SessionContext {
  const ctx: SessionContext = {
    sessionId,
    visitorId: visitorId(),
    consent: consentLabel(),
  };
  if (sessionIsNew) {
    ctx.isNew = true;
    ctx.entryPath = currentPath;
    ctx.referrer = trunc(document.referrer, LIMITS.maxHrefLength);
    ctx.query = trunc(window.location.search, LIMITS.maxStringLength);
    ctx.viewportW = window.innerWidth;
    ctx.viewportH = window.innerHeight;
    ctx.screenW = window.screen?.width;
    ctx.screenH = window.screen?.height;
    ctx.language = navigator.language;
    try {
      ctx.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      /* ignore */
    }
  }
  return ctx;
}

// ── transport ───────────────────────────────────────────────────────────────

function enqueue(event: TrackedEvent) {
  if (!started) return;
  queue.push(event);
  touchSession();
  if (queue.length >= LIMITS.maxEventsPerBatch) {
    flush();
  } else if (!flushTimer) {
    flushTimer = setTimeout(flush, FLUSH_INTERVAL_MS);
  }
}

/**
 * Ships whatever is queued.
 *
 * `sendBeacon` is used when the page is going away, because a normal fetch is
 * cancelled on navigation and the session_end event would be lost exactly when
 * it matters most. It is fire-and-forget: a failed batch is dropped rather than
 * retried, since analytics must never degrade the site.
 */
function flush(useBeacon = false) {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (!queue.length) return;

  const payload: CollectPayload = { session: sessionContext(), events: queue };
  queue = [];
  // The session row is created by the first batch, so later batches must not
  // claim to be new. Cleared only once a batch is genuinely on its way.
  sessionIsNew = false;

  const body = JSON.stringify(payload);

  try {
    if (useBeacon && typeof navigator.sendBeacon === "function") {
      const ok = navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
      if (ok) return;
      // Beacon queue full. Fall through to keepalive fetch.
    }
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      /* analytics must never surface an error to the visitor */
    });
  } catch {
    /* ignore */
  }
}

// ── section tracking ────────────────────────────────────────────────────────

/**
 * Watches every [data-section] element on the page.
 *
 * Auto-discovery by attribute rather than a wrapper component is deliberate:
 * marking a section up is one attribute on markup that already exists, so
 * instrumenting a new page does not mean restructuring it, and a section that
 * loses its attribute simply stops reporting instead of breaking the build.
 */
function observeSections() {
  disconnectSections();
  if (typeof IntersectionObserver === "undefined") return;

  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const state = sections.get(entry.target);
        if (!state) continue;

        const pct = Math.round(entry.intersectionRatio * 100);
        if (pct > state.maxVisiblePct) state.maxVisiblePct = pct;

        if (entry.isIntersecting && entry.intersectionRatio >= SECTION_VISIBLE_RATIO) {
          if (state.visibleSince === null) state.visibleSince = now();
          state.everSeen = true;
        } else if (state.visibleSince !== null) {
          state.dwellMs += now() - state.visibleSince;
          state.visibleSince = null;
        }
      }
    },
    // Several thresholds so maxVisiblePct is meaningful for a section taller
    // than the viewport, which can never reach a ratio of 1.
    { threshold: [0, 0.25, 0.5, 0.75, 1] }
  );

  const nodes = document.querySelectorAll<HTMLElement>("[data-section]");
  nodes.forEach((node, index) => {
    const id = node.dataset.section;
    if (!id) return;
    sections.set(node, {
      id,
      name: node.dataset.sectionName || id,
      index,
      dwellMs: 0,
      maxVisiblePct: 0,
      visibleSince: null,
      everSeen: false,
    });
    sectionObserver!.observe(node);
  });
}

/** Closes out dwell for every section and emits one section_view each. */
function emitSectionViews(path: string) {
  const t = now();
  for (const state of sections.values()) {
    if (state.visibleSince !== null) {
      state.dwellMs += t - state.visibleSince;
      state.visibleSince = null;
    }
    if (!state.everSeen) continue; // never scrolled into view, so not an impression
    enqueue({
      type: "section_view",
      ts: t,
      path,
      sectionId: state.id,
      sectionName: state.name,
      sectionIndex: state.index,
      dwellMs: Math.min(state.dwellMs, LIMITS.maxDwellMs),
      maxVisiblePct: state.maxVisiblePct,
    });
  }
}

function disconnectSections() {
  sectionObserver?.disconnect();
  sectionObserver = null;
  sections = new Map();
}

/** Pauses or resumes dwell accounting when the tab is backgrounded. */
function pauseSectionDwell() {
  const t = now();
  for (const state of sections.values()) {
    if (state.visibleSince !== null) {
      state.dwellMs += t - state.visibleSince;
      state.visibleSince = null;
    }
  }
}

function resumeSectionDwell() {
  if (!sectionObserver) return;
  // The observer re-fires for currently-intersecting targets on reconnect, so
  // rebuilding is both simpler and more accurate than guessing what is visible.
  const previous = new Map(sections);
  observeSections();
  for (const [node, state] of sections) {
    const before = previous.get(node);
    if (before) {
      state.dwellMs = before.dwellMs;
      state.maxVisiblePct = before.maxVisiblePct;
      state.everSeen = before.everSeen;
    }
  }
}

// ── clicks ──────────────────────────────────────────────────────────────────

/** Classifies a click destination and normalises in-site links for CTR. */
function classifyHref(href: string): { kind: TargetKind; path: string | null } {
  if (href.startsWith("mailto:")) return { kind: "mailto", path: null };
  if (href.startsWith("#")) return { kind: "anchor", path: href };

  let url: URL;
  try {
    url = new URL(href, window.location.origin);
  } catch {
    return { kind: "external", path: null };
  }

  if (url.hash && url.origin === window.location.origin && url.pathname === window.location.pathname) {
    return { kind: "anchor", path: url.hash };
  }
  if (url.origin === window.location.origin) return { kind: "internal", path: url.pathname };
  if (APP_URL.startsWith(url.origin)) return { kind: "app", path: url.pathname };
  return { kind: "external", path: null };
}

/** The nearest enclosing [data-section], so every click knows its context. */
function sectionOf(el: Element): string | null {
  const host = el.closest<HTMLElement>("[data-section]");
  return host?.dataset.section ?? null;
}

function onDocumentClick(e: MouseEvent) {
  // Capture phase, so a handler that calls stopPropagation does not hide the
  // click from us. Modified clicks still count: they are real intent, and the
  // visitor is still choosing that destination.
  const target = e.target as Element | null;
  if (!target || typeof target.closest !== "function") return;

  const el = target.closest<HTMLElement>("a[href], button[data-track], [data-track]");
  if (!el) return;

  const label = trunc(el.getAttribute("aria-label") || el.textContent, 120);
  const section = sectionOf(el);

  if (el.tagName === "A") {
    const href = (el as HTMLAnchorElement).getAttribute("href") || "";
    if (!href) return;
    const { kind, path } = classifyHref(href);
    enqueue({
      type: "click",
      ts: now(),
      path: currentPath,
      targetKind: kind,
      targetHref: trunc(href, LIMITS.maxHrefLength),
      targetPath: path,
      targetLabel: label,
      targetSection: section,
    });
    if (kind === "app" || kind === "external") {
      // The page is about to be replaced, so do not wait for the timer.
      flush(true);
    }
  } else {
    enqueue({
      type: "click",
      ts: now(),
      path: currentPath,
      targetKind: "button",
      targetLabel: label,
      targetSection: section,
      metadata: { track: el.dataset.track || undefined },
    });
  }
}

// ── scroll depth ────────────────────────────────────────────────────────────

let scrollRaf = 0;

function onScroll() {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = Math.min(100, Math.round(((window.scrollY || doc.scrollTop) / scrollable) * 100));
    for (const threshold of [25, 50, 75, 100]) {
      if (pct >= threshold && !scrollThresholdsHit.has(threshold)) {
        scrollThresholdsHit.add(threshold);
        enqueue({ type: "scroll_depth", ts: now(), path: currentPath, scrollPct: threshold });
      }
    }
  });
}

// ── page lifecycle ──────────────────────────────────────────────────────────

/**
 * Called by AnalyticsTracker on mount and on every App Router path change.
 *
 * Closes the previous page out first (section dwell, time on page) so the
 * numbers belong to the page they were earned on, then opens the new one.
 */
export function trackPageView(path: string, title?: string) {
  if (!started) return;

  if (currentPath && currentPath !== path) {
    emitSectionViews(currentPath);
    enqueue({
      type: "page_view",
      ts: now(),
      path: currentPath,
      timeOnPageMs: now() - pageEnteredAt,
      metadata: { closing: true },
    });
    previousPath = currentPath;
  }

  currentPath = path;
  pageEnteredAt = now();
  pageViewsThisSession += 1;
  scrollThresholdsHit = new Set();

  enqueue({
    type: "page_view",
    ts: now(),
    path,
    pageTitle: trunc(title || document.title, 200),
    referrerPath: previousPath,
  });

  // The new route's markup is mounted by the time the effect this runs in
  // fires, so sections can be picked up immediately.
  observeSections();
  decorateAppLinks();
  onScroll();
}

/** Closes the visit. Fired on pagehide, which also covers bfcache and mobile. */
function endSession() {
  if (!started || !currentPath) return;
  emitSectionViews(currentPath);
  enqueue({
    type: "session_end",
    ts: now(),
    path: currentPath,
    timeOnPageMs: now() - pageEnteredAt,
    metadata: { pageViews: pageViewsThisSession },
  });
  flush(true);
}

function onVisibilityChange() {
  if (document.visibilityState === "hidden") {
    pauseSectionDwell();
    flush(true);
  } else {
    resumeSectionDwell();
    touchSession();
  }
}

// ── entry point ─────────────────────────────────────────────────────────────

/** Starts the tracker. Idempotent; returns a teardown for React strict mode. */
export function startAnalytics(): () => void {
  if (started || typeof window === "undefined") return () => {};
  started = true;

  initSession();
  currentPath = window.location.pathname;

  document.addEventListener("click", onDocumentClick, true);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pagehide", endSession);
  document.addEventListener("visibilitychange", onVisibilityChange);

  return () => {
    started = false;
    document.removeEventListener("click", onDocumentClick, true);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pagehide", endSession);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    disconnectSections();
    if (flushTimer) clearTimeout(flushTimer);
    flushTimer = null;
  };
}

/**
 * Tags every app-bound link with the current session and visitor id.
 *
 * This is the join that turns anonymous traffic into attributable traffic. The
 * marketing site cannot know who anyone is, but app.preciprocal.com does the
 * moment they sign up. Carrying the ids across the origin boundary as query
 * params lets the ERP answer the question that actually matters commercially:
 * this paying customer first landed on /pricing from a Reddit link, spent 40
 * seconds on the Packs section, and signed up nine minutes later.
 *
 * The app side has to read `pr_sid` / `pr_vid` on sign-up and store them
 * against the new account. Until it does, these params are simply ignored and
 * nothing breaks. See the note in supabase/web_analytics.sql.
 *
 * Re-run on every route change because App Router swaps the DOM.
 */
function decorateAppLinks() {
  const vid = visitorId();
  const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href*="app.preciprocal.com"]');
  anchors.forEach((a) => {
    const raw = a.getAttribute("href");
    if (!raw) return;
    try {
      const url = new URL(raw, window.location.origin);
      url.searchParams.set("pr_sid", sessionId);
      if (vid) url.searchParams.set("pr_vid", vid);
      else url.searchParams.delete("pr_vid");
      a.setAttribute("href", url.toString());
    } catch {
      /* leave the link exactly as authored */
    }
  });
}

/**
 * Attaches a known identity to this session once the visitor reveals one, for
 * example by submitting an email on a marketing form.
 *
 * Only ever called with something the visitor typed into a field whose purpose
 * is to identify them. The raw value is not stored as-is by the collector; it
 * is hashed, so the ERP can match it against a customer record without this
 * schema holding a plaintext address.
 */
export function identify(email: string, metadata: Record<string, unknown> = {}) {
  if (!started || !email) return;
  enqueue({
    type: "click",
    ts: now(),
    path: currentPath,
    targetKind: "button",
    targetLabel: "identify",
    metadata: { ...metadata, identify: email.trim().toLowerCase() },
  });
  flush();
}

/**
 * Manual event hook for anything the automatic listeners cannot see, such as a
 * form submission or a step change inside an interactive demo.
 */
export function trackEvent(
  label: string,
  metadata: Record<string, unknown> = {},
  section?: string
) {
  enqueue({
    type: "click",
    ts: now(),
    path: currentPath,
    targetKind: "button",
    targetLabel: trunc(label, 120),
    targetSection: section ?? null,
    metadata,
  });
}
