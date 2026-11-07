import Link from "next/link";
import Image from "next/image";
import { FadeIn, Reveal, Stagger, StaggerItem } from "@/components/Animate";

const workflowSteps = [
  {
    step: "01",
    title: "Monitors & Triages",
    desc: "Listens for opened issues. Semantic code search and AST analysis pin down the exact files and symbols causing the bug.",
  },
  {
    step: "02",
    title: "Builds & Validates in Sandbox",
    desc: "Generates surgical fixes and tests them inside an isolated Docker container, automatically self-healing if tests or linter checks fail.",
  },
  {
    step: "03",
    title: "Opens a Ready PR",
    desc: "Opens a clean pull request with detailed rationale and test proofs. You review and merge — it never pushes directly to your main branch.",
  },
];

const highlights = [
  {
    icon: (
      <svg className="h-6 w-6 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Sandbox Validation",
    desc: "Fixes run through real builds and tests in an isolated Docker container before reaching your PR, preventing broken commits.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "AST-Grounded Fixes",
    desc: "Combines semantic RAG with Serena language-server intelligence to edit specific functions and types rather than blindly guessing.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Safety & Prompt Defense",
    desc: "Clef guards screen for prompt injections, while triage and validation gates quarantine risky operations for human approval.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Multi-LLM & MCP Control",
    desc: "Works with Claude, GPT-4o, Gemini, DeepSeek, or local Ollama. Steer fixes or run backlog tickets directly from MCP chat.",
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
            <FadeIn className="text-center lg:text-left">
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
                Monitors your repositories, produces tested bug fixes with a
                grounded multi-agent pipeline, and opens pull requests automatically.
                You review and approve — it never merges without you.
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
            </FadeIn>
            <FadeIn delay={0.15} className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-terracotta/25 via-amber/20 to-violet/25 blur-3xl" />
              <div className="overflow-hidden rounded-3xl border border-border bg-black shadow-2xl aspect-video">
                <iframe
                  src="https://drive.google.com/file/d/1ZWebXQWBErHg3q2fwIsPbrPDUSEVKG0z/preview"
                  title="LazyDev demo video"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="h-full w-full border-0"
                />
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                <a
                  href="https://drive.google.com/file/d/1ZWebXQWBErHg3q2fwIsPbrPDUSEVKG0z/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground hover:underline"
                >
                  Watch the demo on Google Drive →
                </a>
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From issue to pull request in three steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            LazyDev automates the tedious investigation and patch cycle, letting you focus on reviewing clean solutions.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Steps */}
          <div className="lg:col-span-6 space-y-4">
            {workflowSteps.map((s) => (
              <Reveal key={s.step} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-terracotta to-amber text-sm font-bold text-accent-foreground shadow-sm">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Terminal illustration */}
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-card p-6 font-mono text-sm shadow-md">
                <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-terracotta/70" />
                    <span className="h-3 w-3 rounded-full bg-amber/70" />
                    <span className="h-3 w-3 rounded-full bg-violet/70" />
                  </div>
                  <span className="text-xs text-muted-foreground">lazydev-pipeline.log</span>
                </div>
                <pre className="overflow-x-auto text-muted-foreground leading-relaxed"><code>{`# 1. New issue opened on GitHub
webhook received → issue #42 triaged

# 2. Multi-agent execution
Onboarding     → indexed AST & build configuration
Planner        → located root cause via semantic RAG
PatchGenerator → edited function in src/auth.ts
Validation     → sandbox tests passed ✓ (npm test)

# 3. Pull request ready
PR #43 opened  → "Fix: resolve session timeout #42"`}</code></pre>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Highlights / Why developers trust LazyDev */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Engineered for confidence
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Built with rigorous isolation, prompt protection, and AST precision so you can trust every patch.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <StaggerItem
                key={h.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/80">
                  {h.icon}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{h.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-10 text-center">
            <Link
              href="/why-lazydev"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:underline"
            >
              See why LazyDev is built differently →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Two ways to get started */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Two ways to use LazyDev
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Start in 2 minutes with our managed service, or run the open-source stack on your own servers.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Hosted */}
          <StaggerItem className="relative flex flex-col justify-between rounded-3xl border-2 border-violet/40 bg-card p-8 shadow-sm">
            <div className="absolute -top-3 left-8 inline-flex items-center rounded-full bg-gradient-to-r from-violet to-violet-soft px-3 py-1 text-xs font-semibold text-white shadow-sm">
              Fastest setup
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-violet/15 px-3 py-1 text-xs font-semibold text-violet">
                  Managed
                </span>
                <h3 className="text-2xl font-bold">Hosted</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Install the GitHub App and start resolving issues immediately. We provide the infrastructure, AI compute, and webhook routing.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Ready in 2 minutes — just install the GitHub App",
                  "AI compute included — no API keys required",
                  "Automated webhook endpoint & sandbox execution",
                  "Personal MCP bearer token for chat platforms",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-violet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/apps/lazydev-issue-resolver"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-violet to-violet-soft px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                Install GitHub App
              </a>
              <Link
                href="/hosted"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Hosted details
              </Link>
            </div>
          </StaggerItem>

          {/* Self-host */}
          <StaggerItem className="flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber">
                  100% Free
                </span>
                <h3 className="text-2xl font-bold">Self-Host</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Run the full Docker stack on your own server. Your code never leaves your infrastructure, and you have complete control over models and configs.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "MIT-licensed, completely free forever",
                  "Code and keys remain strictly on your private infrastructure",
                  "Bring any LLM provider or local Ollama models",
                  "Full access to customize agents, prompts, and gates",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/self-host"
                className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-terracotta to-amber px-5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
              >
                Self-host guide
              </Link>
              <Link
                href="/get-started"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Compare plans
              </Link>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-amber/15 via-terracotta/10 to-violet/15 p-8 text-center shadow-sm sm:p-14">
            <div className="mx-auto mb-8 max-w-xl overflow-hidden rounded-2xl border border-border shadow-md">
              <Image
                src="/lazydev-hero.jpeg"
                alt="A developer resting peacefully while automated pull requests are generated"
                width={2752}
                height={1536}
                sizes="(max-width: 768px) 100vw, 576px"
                className="h-auto w-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to stop babysitting your issue tracker?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Let LazyDev handle the triage, research, and sandbox testing. You just review and approve.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/get-started"
                className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-terracotta to-amber px-8 text-sm font-semibold text-accent-foreground shadow-md transition-transform hover:scale-[1.03]"
              >
                Get started free
              </Link>
              <Link
                href="/why-lazydev"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-8 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Learn how it works
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
