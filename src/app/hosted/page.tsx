import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Reveal } from "@/components/Animate";
import { Steps } from "@/components/Steps";

export const metadata: Metadata = {
  title: "Hosted (we run it for you)",
  description:
    "Don't want to manage infrastructure? Install the LazyDev GitHub App and we run the entire stack for you — including the AI compute.",
};

const youDontNeed = [
  "Clone the repo or run docker compose up",
  "Create or manage a GitHub App — just install ours",
  "Provide an LLM API key — we cover AI compute",
  "Run Ollama, Qdrant, Postgres, Redis, or Serena",
  "Set up a webhook tunnel (ngrok / tailscale)",
  "Configure .env for infrastructure vars",
  "Manage the Docker socket or sandbox permissions",
];

const limits = [
  "One job at a time per repo (FIFO queue). priority: \"urgent\" jumps the queue but never interrupts a running job.",
  "Rate limits on MCP tool calls per account — contact us for your tier's limits.",
  "Repo size: very large monorepos may be declined or queued behind smaller ones.",
  "Fair use: for genuine issue resolution and feature work, not bulk automated code generation.",
];

export default function Hosted() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <FadeIn className="text-center">
        <span className="inline-flex items-center rounded-full bg-violet/15 px-3 py-1 text-xs font-semibold text-violet">
          Managed · we run it for you
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Use the hosted LazyDev</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          We run the entire stack on our infrastructure — the app, the database,
          the sandbox, and the AI compute. You just install the GitHub App and
          review the PRs.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://github.com/apps/lazydev-issue-resolver"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-violet to-violet-soft px-7 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.03]"
          >
            Install the GitHub App
          </a>
          <a
            href="mailto:arkarchanmyae.dev@gmail.com"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold transition-colors hover:bg-muted"
          >
            Contact us to sign up
          </a>
        </div>
      </FadeIn>

      {/* What we run */}
      <Reveal>
        <section className="mt-16">
          <h2 className="text-2xl font-bold">What we run for you</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" />The NestJS app + LangGraph pipeline</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" />Postgres, Redis, and Qdrant (vector DB)</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" />Serena MCP (project memory)</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" />The Docker sandbox that validates generated patches</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" />The LLM provider — we pay for the AI compute</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" />The public HTTPS webhook endpoint</li>
          </ul>
        </section>
      </Reveal>

      {/* What you don't need */}
      <Reveal>
        <section className="mt-12">
          <h2 className="text-2xl font-bold">What you don&apos;t need to do</h2>
          <p className="mt-3 text-muted-foreground">Compared to self-hosting, you do not need to:</p>
          <ul className="mt-4 space-y-2 text-sm">
            {youDontNeed.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                <span className="text-muted-foreground line-through decoration-muted-foreground/40">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* How to use */}
      <Reveal>
        <section className="mt-12">
          <h2 className="text-2xl font-bold">How to use it</h2>
          <div className="mt-4">
            <Steps
              steps={[
                {
                  title: "Install the GitHub App",
                  accent: "violet",
                  body: (
                    <>
                      <p>
                        Open{" "}
                        <a
                          href="https://github.com/apps/lazydev-issue-resolver"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet hover:underline"
                        >
                          github.com/apps/lazydev-issue-resolver
                        </a>
                        , click Install, and pick the repos LazyDev should
                        monitor. That is everything — new issues are
                        automatically queued for a fix.
                      </p>
                      <p className="mt-2 text-sm">
                        If we ever request additional permissions, GitHub emails
                        you an approval request. The app keeps its old
                        permissions until you accept.
                      </p>
                    </>
                  ),
                },
                {
                  title: "Open issues normally",
                  accent: "violet",
                  body: (
                    <p>
                      New issues (opened / reopened) are automatically queued for a fix (one job at a time, so fixes never overlap). LazyDev researches the codebase, validates the patch, and opens a PR — you review and approve.
                    </p>
                  ),
                },
                {
                  title: "(Optional) Connect a chat client",
                  accent: "violet",
                  body: (
                    <p>
                      We send you a personal MCP bearer token. Wire it into Hermes, OpenClaw, or Claude Desktop to trigger fixes manually, request features, and inject feedback.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </section>
      </Reveal>

      {/* Limits */}
      <Reveal>
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Limits &amp; fair use</h2>
          <p className="mt-3 text-muted-foreground">To keep the hosted service sustainable for everyone:</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {limits.map((l) => (
              <li key={l} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" /><span>{l}</span></li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <div className="mt-16 flex flex-col gap-3 rounded-3xl border border-border bg-gradient-to-br from-amber/10 to-terracotta/10 p-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <h2 className="text-xl font-bold">Want full control instead?</h2>
            <p className="mt-1 text-muted-foreground">Self-host the entire stack for free.</p>
          </div>
          <Link
            href="/self-host"
            className="inline-flex h-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-terracotta to-amber px-5 text-sm font-semibold text-accent-foreground shadow-md transition-transform hover:scale-[1.03]"
          >
            See the self-host guide
          </Link>
        </div>
      </Reveal>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        For the complete guide, see the{" "}
        <a href="https://github.com/FutureMindsDev/lazydev-server/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="text-violet hover:underline">
          documentation on GitHub
        </a>.
      </p>
    </div>
  );
}
