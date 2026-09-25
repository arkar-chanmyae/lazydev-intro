import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Reveal, Stagger, StaggerItem } from "@/components/Animate";

export const metadata: Metadata = {
  title: "Why LazyDev is for you",
  description:
    "LazyDev runs itself from issue to pull request with a safe queue, uses Serena MCP + RAG for grounded fixes with less hallucination, and gets smarter over time with project memories.",
};

const reasons = [
  {
    n: "01",
    name: "Let it run itself",
    title: "From issue to PR while you review",
    desc: "Install the GitHub App on the repos you want monitored. When an issue is opened or reopened, LazyDev picks it up automatically — identifies the problem, researches the codebase, writes the fix, validates it in an isolated sandbox, and opens a pull request. You review and approve. It never merges on its own.",
    points: [
      "Automatic: opened / reopened issues are queued, no manual trigger needed",
      "Queue system: one job at a time in FIFO order so fixes never overlap or corrupt each other",
      "Urgent issues can jump the queue but never interrupt a running job",
      "Retries with backoff on transient failures; duplicates are deduped",
      "You stay in control: every change arrives as a traceable branch + PR",
    ],
  },
  {
    n: "02",
    name: "Grounded fixes, less hallucination",
    title: "Serena MCP + RAG + best harness",
    desc: "Instead of guessing from raw file dumps, LazyDev combines semantic code retrieval (RAG over Qdrant) with precise symbol-level understanding (Serena MCP over LSP). RAG answers “where should I look?” — even when names differ. Serena answers “what exactly is there?” — signatures, callers, types — and edits exactly one symbol at a time.",
    points: [
      "RAG finds semantically related files + similar past fixes, not just keyword matches",
      "Serena reads symbol trees and caller maps instead of whole 500-line files (~96% fewer tokens)",
      "Symbol-level edits (modify / create / delete / rename) with read-before-edit guards",
      "Sandbox validation in an isolated Docker container with self-healing retries",
      "Full LLM logging per agent so you can see why it chose an approach",
    ],
  },
  {
    n: "03",
    name: "Gets smarter the longer you use it",
    title: "Serena memories compound",
    desc: "LazyDev keeps two long-lived project memories: the central repository structure and conventions, and the issues faced plus approaches tried — what worked and what did not. Each run reads them, each successful run updates them, and they are versioned alongside your code so future issues get better decisions.",
    points: [
      "global_repo_structure: layout, conventions, build setup for your repo",
      "historical_issues_and_lessons: past bugs, approaches tried, what worked",
      "Memories persist across jobs in long-term storage, not the temporary worktree",
      "Recent lessons are folded into every new fix plan automatically",
      "Versioned in .lazydev/memory/ inside the fix PR so the whole team can see them",
    ],
  },
];

export default function WhyLazyDev() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Why LazyDev is for you</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Three reasons teams keep it installed: it runs itself safely, its
          fixes are grounded instead of guessed, and it learns your repo over
          time.
        </p>
      </FadeIn>

      {/* Reasons */}
      <Stagger className="mt-16 space-y-12">
        {reasons.map((s) => (
          <StaggerItem key={s.n} className="grid gap-6 md:grid-cols-[auto_1fr]">
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-terracotta to-amber text-lg font-bold text-accent-foreground shadow-sm">
                {s.n}
              </div>
              {s.n !== "03" && (
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

      {/* Technical footnote */}
      <Reveal>
        <section className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight">Want the technical detail?</h2>
          <p className="mt-3 text-muted-foreground">
            Under the hood it is a multi-agent pipeline (Onboarding → Planner →
            PatchGenerator → Validation → Git) with BullMQ + Redis queue,
            Redlock per repo/branch, Qdrant RAG, Serena MCP sidecar, and Docker
            sandbox validation. You can also drive it manually from chat with
            MCP tools like <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">trigger_issue_fix</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">implement_new_feature</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">get_pipeline_status</code>, and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">provide_human_feedback</code>.
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
