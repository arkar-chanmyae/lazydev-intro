import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Reveal, Stagger, StaggerItem } from "@/components/Animate";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "The five-stage multi-agent LangGraph pipeline that turns an open GitHub issue into a merged pull request.",
};

const stages = [
  {
    n: "01",
    name: "Onboarding",
    title: "Learn your codebase",
    desc: "The OnboardingAgent reads your repository structure, conventions, and build configuration. This context is stored so every subsequent agent produces fixes that match your codebase rather than generic boilerplate.",
    points: [
      "Reads repo layout and key files",
      "Detects build system and test commands",
      "Builds a project memory used by later agents",
    ],
  },
  {
    n: "02",
    name: "Planner",
    title: "Research and plan the fix",
    desc: "The PlannerAgent researches the issue using a tool loop — reading files, searching the codebase, and reasoning about the root cause — then produces a concrete, step-by-step fix plan.",
    points: [
      "Research tool loop over your codebase",
      "Identifies root cause, not just symptoms",
      "Outputs an actionable fix plan",
    ],
  },
  {
    n: "03",
    name: "PatchGenerator",
    title: "Write the code",
    desc: "The PatchGeneratorAgent implements the plan with read-before-edit gates: it reads a file before modifying it, so edits are always grounded in the actual current content. Each agent can use a different LLM via env overrides.",
    points: [
      "Read-before-edit safety gates",
      "Per-agent model and provider overrides",
      "Full LLM response logging for observability",
    ],
  },
  {
    n: "04",
    name: "Validation",
    title: "Build it in a sandbox",
    desc: "The ValidationAgent runs `npm run build` inside an isolated sibling Docker container. If the build fails, the patch is sent back to the PatchGenerator with the validation feedback — a self-healing loop that retries until the patch compiles or the retry budget is exhausted.",
    points: [
      "Isolated Docker sandbox per run",
      "Cross-platform via named Docker volume",
      "Self-healing retries with validation feedback",
    ],
  },
  {
    n: "05",
    name: "GitAgent",
    title: "Open the pull request",
    desc: "The GitAgent pushes a fix branch (lazydev/fix-<n>-<slug>) and opens a pull request with a traceable title. You review, approve, and merge — LazyDev never merges on its own.",
    points: [
      "Branch: lazydev/fix-<n>-<slug>",
      "Commit: fix: resolve issue #<n>",
      "PR title: Fix: <issue title>",
    ],
  },
];

const mcpTools = [
  {
    name: "trigger_issue_fix",
    desc: "Fix an existing GitHub issue. Pass priority: \"urgent\" to jump the queue.",
  },
  {
    name: "implement_new_feature",
    desc: "Write net-new code from a prompt. Creates a tracking issue so the PR is traceable.",
  },
  {
    name: "get_pipeline_status",
    desc: "Check whether a run is queued, running, failed, or succeeded.",
  },
  {
    name: "provide_human_feedback",
    desc: "Send a correction. Running tasks pick it up on the next validation retry.",
  },
];

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">How it works</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A five-stage multi-agent LangGraph pipeline turns an open GitHub issue
          into a reviewable pull request.
        </p>
      </FadeIn>

      {/* Pipeline overview */}
      <Reveal delay={0.1} className="mt-12 rounded-3xl border border-border bg-card p-6 font-mono text-sm shadow-md">
        <pre className="overflow-x-auto text-muted-foreground"><code>{`GitHub issue opened
        │  webhook (HMAC-signed, deduped)
        ▼
  ┌──────────┐   ┌──────────┐   ┌───────────────┐   ┌────────────┐   ┌──────────┐
  │ Onboarding│→ │ Planner  │→ │ PatchGenerator │→ │ Validation │→ │ GitAgent │
  └──────────┘   └──────────┘   └───────────────┘   └────────────┘   └──────────┘
                       ▲               ▲                   │
                       └───────────────┘   build fails? ────┘
                          self-healing retry loop`}</code></pre>
      </Reveal>

      {/* Stages */}
      <Stagger className="mt-16 space-y-12">
        {stages.map((s) => (
          <StaggerItem key={s.n} className="grid gap-6 md:grid-cols-[auto_1fr]">
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-terracotta to-amber text-lg font-bold text-accent-foreground shadow-sm">
                {s.n}
              </div>
              {s.n !== "05" && (
                <div className="mt-2 hidden h-full w-px flex-1 bg-border md:block" />
              )}
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h2 className="text-xl font-bold">{s.name}</h2>
                <span className="text-sm text-muted-foreground">{s.title}</span>
              </div>
              <p className="mt-3 text-muted-foreground">{s.desc}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* MCP section */}
      <Reveal>
        <section className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight">Drive it from chat (MCP)</h2>
          <p className="mt-3 text-muted-foreground">
            LazyDev exposes itself as an MCP server, so any MCP-capable platform —
            Hermes, OpenClaw, Claude Desktop — can drive the pipeline manually.
            Tools are discovered automatically via the MCP handshake.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Tool</th>
                  <th className="px-4 py-3 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mcpTools.map((t) => (
                  <tr key={t.name}>
                    <td className="px-4 py-3 font-mono text-xs text-terracotta">{t.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Write tools return a <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">task_id</code> immediately — pipelines run asynchronously on the BullMQ queue. Work runs one job at a time in FIFO order.
          </p>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <div className="mt-16 rounded-3xl border border-border bg-gradient-to-br from-amber/10 to-violet/10 p-8 text-center">
        <h2 className="text-xl font-bold">Ready to pick your deployment?</h2>
        <p className="mt-2 text-muted-foreground">Self-host for free, or let us run it for you.</p>
        <Link
          href="/get-started"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-terracotta to-amber px-5 text-sm font-semibold text-accent-foreground shadow-md transition-transform hover:scale-[1.03]"
        >
          Compare both options
        </Link>
      </div>
      </Reveal>
    </div>
  );
}
