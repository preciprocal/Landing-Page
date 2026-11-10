"use client";

/**
 * components/ui/DatePicker.tsx
 *
 * A themed replacement for <input type="date">. The browser's own picker
 * renders as a grey system popup that ignores the site's styling, so the OPT
 * calculators use this instead.
 *
 * Same contract as the native input: the value is "YYYY-MM-DD" or "" and
 * onChange receives the same. Dates are UTC midnight (lib/optDates), so a
 * visitor's time zone can never move a picked day.
 *
 * Keyboard: Enter, Space or ArrowDown opens it. In the grid, the arrow keys
 * move by day and week, PageUp and PageDown by month (with Shift, by year),
 * Home and End to the start and end of the week, Enter picks, Escape closes
 * and returns focus to the field. The month label switches to a month and
 * year view, which is the quick way back to an EAD start date a year ago.
 *
 * Do not wrap it in a <label>: a click anywhere inside a label re-clicks the
 * field and would close the calendar. Pass `labelledBy` (or `ariaLabel`).
 */

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, addMonths, parseDay, toInputValue, todayUtc } from "@/lib/optDates";

type Props = {
  value: string;
  onChange: (value: string) => void;
  labelledBy?: string;
  ariaLabel?: string;
  placeholder?: string;
  /** Classes for the field itself, so it matches the inputs around it. */
  className?: string;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const FIELD_FMT = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const MONTH_FMT = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const DAY_LABEL_FMT = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

const monthStart = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
const sameDay = (a: Date | null, b: Date | null) => !!a && !!b && a.getTime() === b.getTime();

/** Six full weeks starting on the Sunday on or before the 1st. */
function monthGrid(view: Date): Date[] {
  const first = monthStart(view);
  const start = addDays(first, -first.getUTCDay());
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

const PANEL_H = 372;

export default function DatePicker({ value, onChange, labelledBy, ariaLabel, placeholder = "Select a date", className = "" }: Props) {
  const selected = parseDay(value);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"days" | "months">("days");
  const [view, setView] = useState<Date>(() => monthStart(selected ?? todayUtc()));
  const [focusDay, setFocusDay] = useState<Date>(() => selected ?? todayUtc());
  const [above, setAbove] = useState(false);
  const [pos, setPos] = useState<{ left: number; top?: number; bottom?: number }>({ left: 0, top: 0 });
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState<Date | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const dialogId = useId();

  // "Today" is set after mount so the server render and the client agree.
  useEffect(() => {
    setToday(todayUtc());
    setMounted(true);
  }, []);

  /**
   * The panel is portalled to <body> with fixed positioning, because the
   * calculator cards clip overflow. This keeps it pinned to the field, and
   * opens it upward when there is no room below.
   */
  const place = useCallback(() => {
    const r = fieldRef.current?.getBoundingClientRect();
    if (!r) return;
    const up = window.innerHeight - r.bottom < PANEL_H + 16 && r.top > PANEL_H + 16;
    const width = Math.min(296, window.innerWidth - 32);
    setAbove(up);
    setPos({
      left: Math.max(16, Math.min(r.left, window.innerWidth - width - 16)),
      ...(up ? { bottom: window.innerHeight - r.top + 8 } : { top: r.bottom + 8 }),
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  const openPicker = useCallback(() => {
    const start = parseDay(value) ?? todayUtc();
    setView(monthStart(start));
    setFocusDay(start);
    setMode("days");
    place();
    setOpen(true);
  }, [value, place]);

  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) fieldRef.current?.focus();
  }, []);

  // Close on a click or focus outside.
  useEffect(() => {
    if (!open) return;
    const away = (e: Event) => {
      const t = e.target as Node;
      if (!rootRef.current?.contains(t) && !panelRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("mousedown", away);
    document.addEventListener("focusin", away);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("focusin", away);
    };
  }, [open]);

  // Keep keyboard focus on the active day as it moves.
  useLayoutEffect(() => {
    if (!open || mode !== "days") return;
    gridRef.current?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus({ preventScroll: true });
  }, [open, mode, focusDay]);

  const pick = (d: Date) => {
    onChange(toInputValue(d));
    close();
  };

  const moveFocus = (d: Date) => {
    setFocusDay(d);
    if (d.getUTCMonth() !== view.getUTCMonth() || d.getUTCFullYear() !== view.getUTCFullYear()) setView(monthStart(d));
  };

  const onGridKey = (e: KeyboardEvent) => {
    const k = e.key;
    let next: Date | null = null;
    if (k === "ArrowLeft") next = addDays(focusDay, -1);
    else if (k === "ArrowRight") next = addDays(focusDay, 1);
    else if (k === "ArrowUp") next = addDays(focusDay, -7);
    else if (k === "ArrowDown") next = addDays(focusDay, 7);
    else if (k === "PageUp") next = addMonths(focusDay, e.shiftKey ? -12 : -1);
    else if (k === "PageDown") next = addMonths(focusDay, e.shiftKey ? 12 : 1);
    else if (k === "Home") next = addDays(focusDay, -focusDay.getUTCDay());
    else if (k === "End") next = addDays(focusDay, 6 - focusDay.getUTCDay());
    if (next) {
      e.preventDefault();
      moveFocus(next);
    }
  };

  const onPanelKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      if (mode === "months") setMode("days");
      else close();
    }
  };

  const shiftView = (months: number) => {
    const v = addMonths(view, months);
    setView(v);
    setFocusDay(addMonths(focusDay, months));
  };

  const days = monthGrid(view);
  const navBtn =
    "flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={fieldRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        aria-labelledby={labelledBy ? `${labelledBy} ${dialogId}-value` : undefined}
        aria-label={labelledBy ? undefined : `${ariaLabel ?? "Date"}: ${selected ? FIELD_FMT.format(selected) : "not set"}`}
        onClick={() => (open ? close(false) : openPicker())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            openPicker();
          }
        }}
        className={`flex items-center justify-between gap-2 text-left ${className} ${open ? "border-accent/60 ring-2 ring-accent/25" : ""}`}
      >
        <span id={`${dialogId}-value`} className={`truncate ${selected ? "text-white" : "text-slate-500"}`}>
          {selected ? FIELD_FMT.format(selected) : placeholder}
        </span>
        <CalendarDays aria-hidden="true" className={`h-4 w-4 shrink-0 transition-colors ${open ? "text-accent-soft" : "text-slate-500"}`} />
      </button>

      {mounted &&
        createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={dialogId}
            role="dialog"
            aria-modal="false"
            aria-label="Choose a date"
            onKeyDown={onPanelKey}
            initial={reduce ? false : { opacity: 0, y: above ? 6 : -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: above ? 4 : -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            style={pos}
            className={`fixed z-[100] w-[296px] max-w-[calc(100vw-2rem)] rounded-2xl border border-white/[0.1] bg-[#0b1020]/95 p-3 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.75)] ring-1 ring-black/40 backdrop-blur-xl ${
              above ? "origin-bottom-left" : "origin-top-left"
            }`}
          >
            {/* Header */}
            <div className="mb-2 flex items-center justify-between gap-2 px-1">
              <button
                type="button"
                onClick={() => setMode((m) => (m === "days" ? "months" : "days"))}
                aria-label={mode === "days" ? `${MONTH_FMT.format(view)}, choose month and year` : "Back to days"}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-[14px] font-semibold text-white transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                {mode === "days" ? MONTH_FMT.format(view) : view.getUTCFullYear()}
                <ChevronRight aria-hidden="true" className={`h-3.5 w-3.5 text-slate-400 transition-transform ${mode === "months" ? "rotate-90" : ""}`} />
              </button>
              <div className="flex items-center gap-0.5">
                <button type="button" className={navBtn} aria-label={mode === "days" ? "Previous month" : "Previous year"} onClick={() => shiftView(mode === "days" ? -1 : -12)}>
                  <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                </button>
                <button type="button" className={navBtn} aria-label={mode === "days" ? "Next month" : "Next year"} onClick={() => shiftView(mode === "days" ? 1 : 12)}>
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>

            {mode === "days" ? (
              <div ref={gridRef} role="grid" aria-label={MONTH_FMT.format(view)} onKeyDown={onGridKey}>
                <div role="row" className="mb-1 grid grid-cols-7">
                  {WEEKDAYS.map((w) => (
                    <span key={w} role="columnheader" className="flex h-8 items-center justify-center text-[11px] font-medium uppercase tracking-wide text-slate-500">
                      {w}
                    </span>
                  ))}
                </div>
                {Array.from({ length: 6 }, (_, row) => (
                  <div key={row} role="row" className="grid grid-cols-7 gap-y-0.5">
                    {days.slice(row * 7, row * 7 + 7).map((d) => {
                      const inMonth = d.getUTCMonth() === view.getUTCMonth();
                      const isSel = sameDay(d, selected);
                      const isToday = sameDay(d, today);
                      const isFocus = sameDay(d, focusDay);
                      return (
                        <div key={d.getTime()} role="gridcell" aria-selected={isSel} className="flex justify-center">
                          <button
                            type="button"
                            tabIndex={isFocus ? 0 : -1}
                            aria-label={`${DAY_LABEL_FMT.format(d)}${isToday ? ", today" : ""}`}
                            aria-current={isToday ? "date" : undefined}
                            onClick={() => pick(d)}
                            className={`relative flex h-9 w-9 items-center justify-center rounded-lg text-[13px] tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 ${
                              isSel
                                ? "bg-gradient-to-br from-accent-deep to-accent-deep-2 font-semibold text-white shadow-[0_4px_14px_-4px_rgb(var(--accent-deep)/0.7)]"
                                : inMonth
                                  ? "text-slate-200 hover:bg-white/[0.07] hover:text-white"
                                  : "text-slate-600 hover:bg-white/[0.04] hover:text-slate-400"
                            } ${isToday && !isSel ? "font-semibold text-accent-soft shadow-[inset_0_0_0_1px_rgb(var(--accent)/0.45)]" : ""}`}
                          >
                            {d.getUTCDate()}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1.5 py-1">
                {MONTHS_SHORT.map((m, i) => {
                  const isView = i === view.getUTCMonth();
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        const v = new Date(Date.UTC(view.getUTCFullYear(), i, 1));
                        setView(v);
                        const lastDay = new Date(Date.UTC(view.getUTCFullYear(), i + 1, 0)).getUTCDate();
                        setFocusDay(new Date(Date.UTC(view.getUTCFullYear(), i, Math.min(focusDay.getUTCDate(), lastDay))));
                        setMode("days");
                      }}
                      className={`h-12 rounded-xl text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 ${
                        isView ? "bg-accent/15 text-white shadow-[inset_0_0_0_1px_rgb(var(--accent)/0.45)]" : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Footer */}
            <div className="mt-2 flex items-center justify-between border-t border-white/[0.06] px-1 pt-2.5">
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  close();
                }}
                className="rounded-md px-2 py-1 text-[12px] font-medium text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => pick(todayUtc())}
                className="rounded-md px-2 py-1 text-[12px] font-semibold text-accent-soft transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                Today
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
