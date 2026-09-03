"use client";

/**
 * components/ConsentedAnalytics.tsx
 *
 * Loads every analytics script, and only after consent is given.
 *
 * WHY EVERYTHING IS GATED HERE
 * Google Analytics and Microsoft Clarity both used to load unconditionally from
 * the root layout's <head>, which contradicted the privacy policy's statement
 * that analytics cookies can be declined. Microsoft Clarity is the more
 * sensitive of the two because it records session replays.
 *
 * The first fix attempted Google Consent Mode v2, with an inline
 * consent-default block in the head ahead of gtag.js. That does not work in
 * this app: Next.js hoists external `<script async src>` tags to the top of the
 * document, so gtag.js ended up above the consent block and could run before
 * consent was configured. Verified in the built HTML, gtag.js at offset 820
 * against the consent block at 4095.
 *
 * Loading both scripts from here instead removes the ordering problem entirely.
 * Before consent, no analytics requests are made at all, which is both simpler
 * to reason about and easier to demonstrate if anyone asks.
 */

import { useEffect } from "react";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY, hasAnalyticsConsent } from "@/lib/consent";

const GA_MEASUREMENT_ID = "G-XJVD3DYG25";
const CLARITY_PROJECT_ID = "wojqnrrn0s";

declare global {
  interface Window {
    dataLayer?: unknown[];
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
    gtag?: (...args: unknown[]) => void;
  }
}

/** Injects Google Analytics. Safe to call repeatedly. */
function loadGoogleAnalytics() {
  if (document.getElementById("ga-tag")) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer!.push(args);
    };

  const script = document.createElement("script");
  script.id = "ga-tag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Declared explicitly even though the script is only loaded post-consent, so
  // the signal is correct if Google's tooling inspects it.
  window.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: window.location.pathname });
}

/** Injects Microsoft Clarity. Safe to call repeatedly. */
function loadClarity() {
  if (document.getElementById("clarity-tag")) return;

  window.clarity =
    window.clarity ||
    function (...args: unknown[]) {
      (window.clarity!.q = window.clarity!.q || []).push(args);
    };

  const script = document.createElement("script");
  script.id = "clarity-tag";
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  document.head.appendChild(script);
}

export default function ConsentedAnalytics() {
  useEffect(() => {
    const apply = () => {
      if (!hasAnalyticsConsent()) return;
      loadGoogleAnalytics();
      loadClarity();
    };

    apply();

    // Fires when the banner records a decision in this tab.
    window.addEventListener(CONSENT_EVENT, apply);
    // Fires when the decision is made in another tab.
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) apply();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(CONSENT_EVENT, apply);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}
