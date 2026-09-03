/**
 * lib/consent.ts
 *
 * Shared cookie-consent state, used by CookieBanner (which records the
 * decision), ConsentedAnalytics (which acts on it) and the footer's cookie
 * preferences link (which lets a user change their mind).
 *
 * GDPR requires withdrawing consent to be as easy as giving it, which is why
 * resetConsent exists and is surfaced in the footer rather than only being
 * available on first visit.
 *
 * The storage key is also read inline in app/layout.tsx, before gtag.js loads,
 * so a returning visitor's prior opt-in is applied without a flash of denied
 * consent. Keep the two in sync if you rename it.
 */

export const CONSENT_STORAGE_KEY = "preciprocal_cookie_consent";

/** Dispatched on window when the user records or clears a decision. */
export const CONSENT_EVENT = "preciprocal:consent-change";

export type ConsentState = "accepted" | "declined" | null;

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    // Private browsing or blocked storage. Treat as undecided, which keeps
    // analytics denied.
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return getConsent() === "accepted";
}

export function setConsent(state: Exclude<ConsentState, null>) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, state);
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }
}

/**
 * Clears the stored decision so the banner reappears.
 *
 * Note: this cannot retroactively delete cookies already set by a third party
 * under a previous opt-in. Declining stops further collection; to remove
 * existing analytics cookies the user also needs to clear them in the browser,
 * which the privacy policy states.
 */
export function resetConsent() {
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }
}
