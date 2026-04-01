"use client";

import { useInView, useCounter } from "@/lib/hooks";

export default function Counter({ end, suffix = "", duration = 2000, isDecimal }: { end: number; suffix?: string; duration?: number; isDecimal?: boolean }) {
  const { ref, visible } = useInView(0.3);
  const value = useCounter(isDecimal ? Math.floor(end * 10) : end, duration, visible);

  return <span ref={ref}>{isDecimal ? (value / 10).toFixed(1) : value.toLocaleString()}{suffix}</span>;
}