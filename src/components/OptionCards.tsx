"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

/* ============================================================
   OptionCards + Modal — reusable "pick one of N options" UI.
   - Options render as cards with a hover lift effect.
   - Each card ends with explicit "Click to view more details" text.
   - Clicking opens a modal with the full details.
   Use anywhere a page offers more than one option.
   ============================================================ */

export type OptionAccent = "amber" | "violet" | "terracotta";

export interface OptionItem {
  id: string;
  /** Small pill above the title, e.g. "Recommended". */
  badge?: string;
  title: string;
  /** One-line pitch shown on the card. */
  tagline: string;
  /** Short bullet highlights shown on the card. */
  highlights: string[];
  /** Full details rendered inside the modal. */
  details: ReactNode;
  accent?: OptionAccent;
}

const accentDot: Record<OptionAccent, string> = {
  amber: "bg-amber",
  violet: "bg-violet",
  terracotta: "bg-terracotta",
};

const accentHover: Record<OptionAccent, string> = {
  amber: "hover:border-amber/60",
  violet: "hover:border-violet/60",
  terracotta: "hover:border-terracotta/60",
};

const accentText: Record<OptionAccent, string> = {
  amber: "text-amber",
  violet: "text-violet",
  terracotta: "text-terracotta",
};

function Modal({
  title,
  badge,
  onClose,
  children,
}: {
  title: string;
  badge?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto no-scrollbar rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            {badge && (
              <span className="inline-flex items-center rounded-full bg-amber/15 px-2.5 py-0.5 text-xs font-semibold text-amber">
                {badge}
              </span>
            )}
            <h3 id={titleId} className="mt-2 text-xl font-bold tracking-tight">
              {title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">{children}</div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold transition-colors hover:bg-muted"
        >
          Close
        </button>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

export function OptionCards({
  options,
  columns = 2,
}: {
  options: OptionItem[];
  columns?: 2 | 3;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const close = useCallback(() => setOpenId(null), []);
  const open = options.find((o) => o.id === openId) ?? null;

  const gridClass =
    columns === 3
      ? "grid gap-5 md:grid-cols-3"
      : "grid gap-5 md:grid-cols-2";

  return (
    <>
      <div className={gridClass}>
        {options.map((option) => {
          const accent = option.accent ?? "terracotta";
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setOpenId(option.id)}
              aria-haspopup="dialog"
              className={`group flex flex-col rounded-3xl border border-border bg-card p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${accentHover[accent]} cursor-pointer`}
            >
              {option.badge && (
                <span className="inline-flex w-fit items-center rounded-full bg-amber/15 px-2.5 py-0.5 text-xs font-semibold text-amber">
                  {option.badge}
                </span>
              )}
              <span className="mt-2 text-lg font-bold tracking-tight">
                {option.title}
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                {option.tagline}
              </span>
              <span className="mt-4 space-y-2">
                {option.highlights.map((h) => (
                  <span key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${accentDot[accent]}`} />
                    {h}
                  </span>
                ))}
              </span>
              <span className={`mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold ${accentText[accent]} transition-transform group-hover:translate-x-0.5`}>
                Click to view more details
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m9 18 6-6-6-6" /></svg>
              </span>
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {open && (
          <Modal title={open.title} badge={open.badge} onClose={close}>
            {open.details}
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
