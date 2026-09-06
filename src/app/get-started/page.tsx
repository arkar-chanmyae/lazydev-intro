import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get started",
  description:
    "Compare self-hosting (free) vs the hosted LazyDev service and pick the option that fits your team.",
};

const comparison = [
  {
    feature: "Price",
    selfHost: "Free (MIT-licensed)",
    hosted: "Managed service",
  },
  {
    feature: "Infrastructure",
    selfHost: "You run Docker, Postgres, Redis, Qdrant",
    hosted: "We run everything",
  },
  {
    feature: "AI compute",
    selfHost: "Bring your own LLM API key (or local Ollama)",
    hosted: "We cover the AI compute",
  },
  {
    feature: "GitHub App",
    selfHost: "Use ours or create your own",
    hosted: "Just install ours",
  },
  {
    feature: "Webhook endpoint",
    selfHost: "Set up ngrok / Tailscale / reverse proxy",
    hosted: "Public HTTPS endpoint included",
  },
  {
    feature: "Code privacy",
    selfHost: "Your code never leaves your infra",
    hosted: "Cloned into our sandbox for validation",
  },
  {
    feature: "Control",
    selfHost: "Full control over every component",
    hosted: "We handle ops; you review PRs",
  },
  {
    feature: "MCP access",
    selfHost: "Configure Mode A or B yourself",
    hosted: "Personal bearer token provided",
  },
  {
    feature: "Setup time",
    selfHost: "~30 min (Docker + env + tunnel)",
    hosted: "~2 min (install the App)",
  },
];

export default function GetStarted() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Get started</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Two ways to use LazyDev. Pick the one that fits your team — both give
          you the same multi-agent pipeline and the same PR output.
        </p>
      </div>

      {/* Comparison table */}
      <div className="mt-12 overflow-hidden rounded-3xl border border-border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-4 font-semibold">Feature</th>
              <th className="px-4 py-4 font-semibold">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-amber/15 px-2 py-0.5 text-xs font-semibold text-amber">Free</span>
                  Self-host
                </div>
              </th>
              <th className="px-4 py-4 font-semibold">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-violet/15 px-2 py-0.5 text-xs font-semibold text-violet">Managed</span>
                  Hosted
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {comparison.map((row) => (
              <tr key={row.feature}>
                <td className="px-4 py-3 font-medium">{row.feature}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.selfHost}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.hosted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decision cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Self-host */}
        <div className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-xl font-bold">Choose self-host if…</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />You want it free and have a server to spare</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />Your code must never leave your infrastructure</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />You want to use a local LLM (Ollama) for zero cost</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />You want full control over every component</li>
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/self-host"
              className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-terracotta to-amber px-5 text-sm font-semibold text-accent-foreground shadow-md transition-transform hover:scale-[1.03]"
            >
              Self-host guide
            </Link>
            <a
              href="https://github.com/FutureMindsDev/lazydev-server"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              View the repos
            </a>
          </div>
        </div>

        {/* Hosted */}
        <div className="flex flex-col rounded-3xl border-2 border-violet/40 bg-card p-8 shadow-sm">
          <h2 className="text-xl font-bold">Choose hosted if…</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" />You don&apos;t want to manage Docker or databases</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" />You don&apos;t want to pay for LLM API keys separately</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" />You want to be set up in under 5 minutes</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" />You&apos;re fine with us running the sandbox</li>
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="https://github.com/apps/lazydev-issue-resolver"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-violet to-violet-soft px-5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.03]"
            >
              Install the GitHub App
            </a>
            <Link
              href="/hosted"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Hosted info &amp; signup
            </Link>
          </div>
        </div>
      </div>

      {/* Still unsure */}
      <div className="mt-12 rounded-3xl border border-border bg-gradient-to-br from-amber/10 to-violet/10 p-8 text-center">
        <h2 className="text-xl font-bold">Still not sure?</h2>
        <p className="mt-2 text-muted-foreground">
          Start with the hosted version — you can always migrate to self-hosting
          later. The pipeline and PR output are identical either way.
        </p>
        <Link
          href="/how-it-works"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold transition-colors hover:bg-muted"
        >
          Learn how the pipeline works
        </Link>
      </div>
    </div>
  );
}
