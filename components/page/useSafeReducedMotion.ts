"use client";

/**
 * components/page/useSafeReducedMotion.ts
 *
 * framer-motion's useReducedMotion, but false until the component has
 * mounted. The server cannot know the visitor's motion setting and renders
 * the animated version; reading the setting during the first client render
 * produced a different tree (a finished demo step, an element left out),
 * which React reports as a hydration error (#418). Use this wherever the
 * setting changes what is rendered, not only how it moves.
 */

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useSafeReducedMotion(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduce;
}
