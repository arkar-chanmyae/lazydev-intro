import type { ReactNode } from "react";

/* ============================================================
   Steps — vertical numbered steps.
   - Each step number sits inside a box.
   - The step's card content sits on the right of its number.
   - Numbers are connected by a vertical line.
   Use for any multi-step sequence on the site.
   ============================================================ */

export interface StepItem {
  /** Card heading shown next to the number box. */
  title: string;
  /** Card body on the right of the number (text, lists, code...). */
  body: ReactNode;
  /** Gradient tone of the number box. */
  accent?: "amber" | "violet" | "terracotta";
}

const accentBox: Record<NonNullable<StepItem["accent"]>, string> = {
  amber: "from-amber to-terracotta",
  violet: "from-violet to-violet-soft",
  terracotta: "from-terracotta to-amber",
};

export function Steps({ steps }: { steps: StepItem[] }) {
  return (
    <ol className="space-y-5">
      {steps.map((step, i) => (
        <li key={step.title} className="flex gap-4">
          {/* Number column: boxed number + vertical connector line */}
          <div className="flex flex-col items-center" aria-hidden={false}>
            <span
              aria-hidden
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-base font-bold text-white shadow-md ${accentBox[step.accent ?? "terracotta"]}`}
            >
              {i + 1}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden className="mt-2 w-px flex-1 bg-border" />
            )}
          </div>
          {/* Card content on the right of the number */}
          <div className="flex-1 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="font-semibold">{step.title}</h3>
            <div className="mt-1 text-sm text-muted-foreground">{step.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
