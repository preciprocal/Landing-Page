"use client";

/**
 * GoogleOneTap.tsx
 * Google's "Sign in as ..." prompt. Rendered from app/layout.tsx.
 *
 * Choosing an account signs the visitor in to the app directly: the ID token
 * Google returns is posted, as a normal form submit, to the app's
 * /auth/one-tap route, which creates the session on app.preciprocal.com and
 * opens the dashboard. Nothing is shown to Google until the visitor taps.
 *
 * Login forgery protection: a random nonce is stored in a cookie shared with
 * the app (domain .preciprocal.com) and its SHA-256 goes to Google, so the
 * token is bound to this browser. The app route checks both.
 *
 * Loads only when NEXT_PUBLIC_GOOGLE_CLIENT_ID is set, on preciprocal.com
 * (Google rejects other origins), and after the visitor has accepted cookies,
 * because the Google script is a request to a third party and the privacy
 * policy promises none happen before consent.
 */

import { useEffect } from "react";
import { APP_URL } from "@/lib/constants";
import { CONSENT_EVENT, hasAnalyticsConsent } from "@/lib/consent";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

type GoogleId = {
  initialize: (o: Record<string, unknown>) => void;
  prompt: () => void;
  cancel: () => void;
};
declare global {
  interface Window { google?: { accounts?: { id?: GoogleId } } }
}

async function sha256Hex(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function postToApp(credential: string, nonce: string) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = `${APP_URL}/auth/one-tap`;
  for (const [name, value] of Object.entries({ credential, nonce })) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

export default function GoogleOneTap() {
  useEffect(() => {
    if (!CLIENT_ID || !location.hostname.endsWith("preciprocal.com")) return;
    let started = false;

    const start = async () => {
      if (started || !hasAnalyticsConsent()) return;
      started = true;
      const raw = Array.from(crypto.getRandomValues(new Uint8Array(24))).map(b => b.toString(16).padStart(2, "0")).join("");
      document.cookie = `ot_nonce=${raw}; domain=.preciprocal.com; path=/; max-age=600; secure; samesite=lax`;
      const hashed = await sha256Hex(raw);

      const init = () => {
        const id = window.google?.accounts?.id;
        if (!id) return;
        id.initialize({
          client_id: CLIENT_ID,
          nonce: hashed,
          callback: (res: { credential?: string }) => { if (res.credential) postToApp(res.credential, raw); },
          auto_select: false,
          cancel_on_tap_outside: true,
          context: "signin",
          itp_support: true,
          use_fedcm_for_prompt: true,
        });
        id.prompt();
      };
      if (window.google?.accounts?.id) return init();
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.onload = init;
      document.head.appendChild(s);
    };

    start();
    window.addEventListener(CONSENT_EVENT, start);
    return () => {
      window.removeEventListener(CONSENT_EVENT, start);
      window.google?.accounts?.id?.cancel();
    };
  }, []);

  return null;
}
