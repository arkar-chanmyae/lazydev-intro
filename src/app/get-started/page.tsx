import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Reveal, Stagger, StaggerItem } from "@/components/Animate";
import { OptionCards } from "@/components/OptionCards";

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
      <FadeIn className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Get started</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Two ways to use LazyDev. Pick the one that fits your team — both give
          you the same multi-agent pipeline and the same PR output.
        </p>
      </FadeIn>

      {/* Comparison table */}
      <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-3xl border border-border shadow-sm">
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
      </Reveal>

      {/* Decision cards */}
      <Reveal>
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold">How should your server connect to GitHub?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Self-hosting? Your repos reach your server one of two ways — the
            App is the long-term path, the Action is the quick trial.
            (Hosted needs no decision: just install the App.)
          </p>
        </div>
      </Reveal>
      <Reveal className="mt-6">
        <OptionCards
          options={[
            {
              id: "auth-app",
              badge: "Recommended",
              title: "GitHub App",
              tagline: "Install once — full events, fresh tokens, zero per-repo setup.",
              highlights: [
                "Issues + check-run events included",
                "Server mints fresh 1h tokens at use time",
                "Works with webhooks on self-host or hosted",
              ],
              accent: "violet",
              details: (
                <>
                  <p>
                    Self-host: create your own App (or use the official one) and
                    put <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">GITHUB_APP_ID</code>,{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">GITHUB_PRIVATE_KEY_PATH</code> and{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">GITHUB_WEBHOOK_SECRET</code> on
                    the server — full steps in the <Link href="/self-host" className="text-terracotta hover:underline">self-host guide</Link>.
                    Hosted: just install our App — see <Link href="/hosted" className="text-terracotta hover:underline">hosted</Link>.
                  </p>
                  <p className="mt-3">
                    How it logs in per job: the server mints a fresh 1-hour App installation token each time it needs GitHub (clone, PR). Events covered: issues opened/reopened plus CI check-runs.
                  </p>
                </>
              ),
            },
            {
              id: "auth-action",
              badge: "No App install",
              title: "GitHub Action thin trigger",
              tagline: "2 secrets + 1 file — trial LazyDev with no App and no tunnel.",
              highlights: [
                "Runs ~10s in CI, dispatches to your warm server",
                "HMAC-signed (x-lazydev-signature) + optional repo allowlist",
                "Trial-grade: token expires with the runner",
              ],
              accent: "amber",
              details: (
                <>
                  <ol className="list-decimal space-y-2 pl-5">
                    <li>
                      Make the shared password: run{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">openssl rand -hex 32</code>{" "}
                      in a terminal and copy the output. Your repos will use it
                      to prove they may call your server — keep it private.
                    </li>
                    <li>
                      Server: save it as{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ACTION_SHARED_SECRET</code>{" "}
                      in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code>{" "}
                      (optionally limit callers with{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ACTION_ALLOWED_REPOS=owner/repo,org/*</code>)
                      and redeploy.
                    </li>
                    <li>
                      User repo → Settings → Secrets and variables → Actions →
                      Secrets tab → Repository secrets (encrypted — do not use
                      Variables, those are visible):{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">LAZYDEV_SERVER_URL</code>{" "}
                      (your public server URL — the ngrok URL for local trials)
                      and{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">LAZYDEV_SHARED_SECRET</code>{" "}
                      (the same password as the server).
                    </li>
                    <li>
                      Copy the example workflow into your repo at{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.github/workflows/lazydev.yml</code>.
                    </li>
                  </ol>
                  <p className="mt-3">
                    On issue opened/reopened (or a /lazydev comment) the workflow
                    POSTs the event plus a short-lived GITHUB_TOKEN to{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">POST /api/dispatch/issue</code>;
                    the warm server queues the normal BullMQ pipeline. No
                    check_run events in v1.
                  </p>
                </>
              ),
            },
          ]}
        />
      </Reveal>

      {/* Decision cards */}
      <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Self-host */}
        <StaggerItem className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm">
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
        </StaggerItem>

        {/* Hosted */}
        <StaggerItem className="flex flex-col rounded-3xl border-2 border-violet/40 bg-card p-8 shadow-sm">
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
        </StaggerItem>
      </Stagger>

      {/* Still unsure */}
      <Reveal>
        <div className="mt-12 rounded-3xl border border-border bg-gradient-to-br from-amber/10 to-violet/10 p-8 text-center">
          <h2 className="text-xl font-bold">Still not sure?</h2>
          <p className="mt-2 text-muted-foreground">
            Start with the hosted version — you can always migrate to self-hosting
            later. The pipeline and PR output are identical either way.
          </p>
          <Link
            href="/why-lazydev"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold transition-colors hover:bg-muted"
          >
            Why LazyDev is for you
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
