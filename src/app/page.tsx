import Link from "next/link";
import Image from "next/image";

const pipeline = [
  {
    step: "1",
    name: "Onboarding",
    desc: "Reads your repo structure, conventions, and build setup so fixes match your codebase.",
  },
  {
    step: "2",
    name: "Planner",
    desc: "Researches the issue and produces a step-by-step fix plan using a tool loop.",
  },
  {
    step: "3",
    name: "PatchGenerator",
    desc: "Writes the actual code changes with read-before-edit gates for safety.",
  },
  {
    step: "4",
    name: "Validation",
    desc: "Runs `npm run build` inside an isolated Docker sandbox to verify the patch compiles.",
  },
  {
    step: "5",
    name: "GitAgent",
    desc: "Pushes a fix branch and opens a pull request with a traceable title.",
  },
];

const features = [
  {
    title: "GitHub App authentication",
    desc: "JWT + installation token auth with HMAC-signed webhooks and delivery-ID deduplication.",
  },
  {
    title: "Asynchronous queue",
    desc: "BullMQ + Redis with exponential backoff retries and distributed Redlock per repo/branch.",
  },
  {
    title: "Multi-agent orchestration",
    desc: "LangGraph pipeline — Onboarding → Planner → PatchGenerator → Validation → Git.",
  },
  {
    title: "Per-agent model selection",
    desc: "Each agent can use a different LLM provider and model via env overrides.",
  },
  {
    title: "Sandbox validation",
    desc: "Generated fixes are built inside an isolated sibling Docker container before merging.",
  },
  {
    title: "Self-healing loop",
    desc: "Automatically retries patch generation with validation feedback on failure.",
  },
  {
    title: "MCP server",
    desc: "Drive the pipeline from any MCP-capable chat platform — Hermes, OpenClaw, Claude Desktop.",
  },
  {
    title: "Multi-LLM support",
    desc: "OpenAI, Gemini, Anthropic, DeepSeek, OpenRouter, or local Ollama — your choice.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber/15 via-terracotta/5 to-background" />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
                AI-native autonomous CI engineering assistant
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                LazyDev resolves your GitHub issues{" "}
                <span className="bg-gradient-to-r from-terracotta via-amber to-violet bg-clip-text text-transparent">
                  while you sleep
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground lg:mx-0">
                It monitors your repositories, generates validated code fixes with a
                multi-agent AI pipeline, and opens pull requests automatically. No
                babysitting required.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="/get-started"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-terracotta to-amber px-7 text-sm font-semibold text-accent-foreground shadow-md transition-transform hover:scale-[1.03]"
                >
                  Get started
                </Link>
                <a
                  href="https://github.com/FutureMindsDev/lazydev-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  View on GitHub
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-terracotta/25 via-amber/20 to-violet/25 blur-3xl" />
              <Image
                src="/lazydev-hero.jpeg"
                alt="A developer sleeping peacefully on a bed next to a laptop that is running code during the day, with pull requests being opened automatically."
                width={2752}
                height={1536}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full rounded-3xl border border-border shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is it */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What is LazyDev?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              LazyDev is an AI-native autonomous CI engineering assistant. When a
              GitHub issue is opened in a monitored repository, LazyDev clones the
              repo, runs a multi-agent LangGraph pipeline to understand and fix the
              problem, validates the patch in an isolated sandbox, and opens a pull
              request — all without human intervention.
            </p>
            <p className="mt-4 text-muted-foreground">
              You can also drive it manually from any MCP-capable chat platform:
              trigger a fix on a backlog issue, request a brand-new feature, poll
              status, or inject human feedback to correct the agent mid-run.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 font-mono text-sm shadow-md">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-terracotta/70" />
              <span className="h-3 w-3 rounded-full bg-amber/70" />
              <span className="h-3 w-3 rounded-full bg-violet/70" />
            </div>
            <pre className="overflow-x-auto text-muted-foreground"><code>{`# A new issue is opened on GitHub
issue #42 opened → webhook delivered

Onboarding    → reads repo + build setup
Planner       → researches + plans the fix
PatchGenerator → writes the code (read-before-edit)
Validation    → npm run build in sandbox ✓
GitAgent      → pushes branch, opens PR

PR #43: "Fix: resolve issue #42"`}</code></pre>
          </div>
        </div>
      </section>

      {/* How it works (pipeline) */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A five-stage multi-agent pipeline turns an open issue into a merged
              pull request.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {pipeline.map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-terracotta to-amber text-sm font-bold text-accent-foreground shadow-sm">
                  {s.step}
                </div>
                <h3 className="mt-4 font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/how-it-works"
              className="text-sm font-semibold text-terracotta hover:underline"
            >
              See the full pipeline walkthrough →
            </Link>
          </div>
        </div>
      </section>

      {/* Two-option chooser */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Two ways to use LazyDev
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Run the entire stack yourself for free, or let us host it for you and
            just install the GitHub App. Pick what fits your team.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Self-host */}
          <div className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber">
                Free
              </span>
              <h3 className="text-2xl font-bold">Self-host</h3>
            </div>
            <p className="mt-4 text-muted-foreground">
              Clone the repo, configure your GitHub App and LLM provider, and run
              the full Docker stack on your own server. You keep total control and
              pay nothing but your own compute.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Full control over the entire stack",
                "Bring your own LLM — OpenAI, Gemini, Anthropic, DeepSeek, or local Ollama",
                "Your code never leaves your infrastructure",
                "MIT-licensed, free forever",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/self-host"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Self-host guide
              </Link>
              <Link
                href="/get-started"
                className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-terracotta to-amber px-5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
              >
                Choose this option
              </Link>
            </div>
          </div>

          {/* Hosted */}
          <div className="relative flex flex-col rounded-3xl border-2 border-violet/40 bg-card p-8 shadow-sm">
            <div className="absolute -top-3 left-8 inline-flex items-center rounded-full bg-gradient-to-r from-violet to-violet-soft px-3 py-1 text-xs font-semibold text-white shadow-sm">
              We run it for you
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-violet/15 px-3 py-1 text-xs font-semibold text-violet">
                Managed
              </span>
              <h3 className="text-2xl font-bold">Hosted</h3>
            </div>
            <p className="mt-4 text-muted-foreground">
              Don&apos;t want to manage Docker, Postgres, Redis, or LLM API keys?
              Install our GitHub App and we handle the infrastructure, the AI
              compute, and the public webhook endpoint. You just review the PRs.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "No infrastructure to run or maintain",
                "We cover the AI compute — no API keys to manage",
                "Public HTTPS webhook endpoint included",
                "Personal MCP bearer token for chat integration",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-violet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/hosted"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Hosted info
              </Link>
              <a
                href="https://github.com/apps/lazydev-issue-resolver"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-violet to-violet-soft px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                Install the GitHub App
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Features
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Built for production from day one — security, observability, and
              reliability baked in.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-amber/15 via-terracotta/10 to-violet/15 p-10 text-center shadow-sm sm:p-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to stop babysitting your issue tracker?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Pick the option that fits your team and get started in minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/get-started"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-terracotta to-amber px-7 text-sm font-semibold text-accent-foreground shadow-md transition-transform hover:scale-[1.03]"
            >
              Compare both options
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Learn how it works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
