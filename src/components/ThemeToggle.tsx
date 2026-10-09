"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function readStoredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return (window.localStorage.getItem("theme") as "light" | "dark") || "dark";
}

const subscribeToNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ThemeToggle() {
  // False during SSR/hydration, true after — no effect + setState needed.
  const mounted = useSyncExternalStore(
    subscribeToNoop,
    getClientSnapshot,
    getServerSnapshot,
  );
  // Lazy init reads localStorage on first client render, so no
  // corrective setState inside an effect is needed.
  const [theme, setTheme] = useState<"light" | "dark">(readStoredTheme);

  // Sync the DOM class only — no setState here.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  // Avoid hydration mismatch: render a stable placeholder until mounted.
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
      >
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
    >
      {theme === "light" ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
    </button>
  );
}
