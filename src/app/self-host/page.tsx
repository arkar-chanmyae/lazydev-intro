import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Reveal, Stagger, StaggerItem } from "@/components/Animate";

export const metadata: Metadata = {
  title: "Self-host (free)",
  description:
    "Run the full LazyDev stack yourself for free. Clone the repo, configure your GitHub App and LLM provider, and start the Docker stack.",
};

const providers = [
  { name: "OpenAI", url: "(leave blank)", model: "gpt-4o-mini", client: "ChatOpenAI" },
  { name: "Google Gemini", url: "https://generativelanguage.googleapis.com", model: "gemini-3.7-flash", client: "ChatGoogleGenerativeAI" },
  { name: "OpenRouter", url: "https://openrouter.ai/api/v1", model: "anthropic/claude-5-sonnet", client: "ChatOpenAI" },
  { name: "DeepSeek", url: "https://api.deepseek.com", model: "deepseek-chat", client: "ChatDeepSeek" },
  { name: "Anthropic", url: "https://api.anthropic.com", model: "claude-sonnet-4-5", client: "ChatAnthropic" },
  { name: "Ollama (local, free)", url: "(leave key blank)", model: "llama3", client: "ChatOpenAI" },
];

export default function SelfHost() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <FadeIn className="text-center">
        <span className="inline-flex items-center rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber">
          Free · MIT-licensed
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Self-host LazyDev</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Run the entire stack on your own server. You bring the GitHub App and
          LLM provider — everything else is in the Docker Compose file.
        </p>
      </FadeIn>

      {/* Prerequisites */}
      <Reveal>
        <section className="mt-12">
        <h2 className="text-2xl font-bold">Prerequisites</h2>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />Linux (Ubuntu/Debian) server, or macOS/Linux for local dev</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />Node.js v20+ (local dev only; Docker image bundles Node)</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />Docker &amp; Docker Compose</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />GitHub App credentials (App ID, Private Key, Webhook Secret)</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />An LLM API key — or a local Ollama instance (free fallback)</li>
        </ul>
      </section>
      </Reveal>

      {/* Step 1: GitHub App */}
      <Reveal>
        <section className="mt-12">
        <h2 className="text-2xl font-bold">1. Create &amp; configure your GitHub App</h2>
        <p className="mt-3 text-muted-foreground">
          Self-hosting requires your own GitHub App so your instance can securely listen to repository webhooks and push fixes.
        </p>

        <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <ol className="list-decimal space-y-2.5 pl-5 text-sm text-muted-foreground">
            <li>In GitHub, go to <strong>Settings</strong> → <strong>Developer settings</strong> → <strong>GitHub Apps</strong> → <strong>New GitHub App</strong></li>
            <li>Set <strong>Homepage URL</strong> to your deployment, <strong>Webhook URL</strong> to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">https://&lt;your-public-url&gt;/webhooks/github</code>, and set a <strong>Webhook secret</strong></li>
            <li>Grant repository permissions:
              <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                <li><strong>Metadata:</strong> Read</li>
                <li><strong>Contents:</strong> Read &amp; write (clone code and push fix branches)</li>
                <li><strong>Pull requests:</strong> Read &amp; write (open and update PRs)</li>
                <li><strong>Issues:</strong> Read &amp; write (read issues and create feature tracking issues)</li>
              </ul>
            </li>
            <li>Subscribe to events: <strong>Issues</strong>, <strong>Issue comment</strong>, <strong>Check run</strong></li>
            <li>Generate a private key (<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.pem</code>), download it, and save the App ID</li>
            <li>Click <strong>Install App</strong> and install it on the repositories you want monitored</li>
          </ol>
        </div>
      </section>
      </Reveal>

      {/* Step 2: env */}
      <Reveal>
        <section className="mt-12">
        <h2 className="text-2xl font-bold">2. Environment setup</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card font-mono text-sm shadow-sm">
          <pre className="overflow-x-auto p-5 text-muted-foreground"><code>{`# Backend (server)
git clone https://github.com/FutureMindsDev/lazydev-server.git
cd lazydev-server
cp .env.example .env

# Frontend (client) — in a separate terminal
git clone https://github.com/FutureMindsDev/lazydev-client.git
cd lazydev-client
cp .env.example .env`}</code></pre>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Edit <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code>. The minimum you must fill in:
        </p>
        <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card font-mono text-sm shadow-sm">
          <pre className="overflow-x-auto p-5 text-muted-foreground"><code>{`# GitHub App
GITHUB_APP_ID=
GITHUB_WEBHOOK_SECRET=
GITHUB_PRIVATE_KEY_PATH=github-private-key.pem

# LLM provider (pick one)
OPENAI_API_KEY=
LLM_MODEL=gpt-4o-mini`}</code></pre>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Everything else has sensible defaults for a Docker deployment.
        </p>
      </section>
      </Reveal>

      {/* Step 3: LLM */}
      <Reveal>
        <section className="mt-12">
        <h2 className="text-2xl font-bold">3. Pick your LLM provider</h2>
        <p className="mt-3 text-muted-foreground">
          LazyDev auto-detects the provider from <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">OPENAI_BASE_URL</code>. Set <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">OPENAI_API_KEY</code> + <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">OPENAI_BASE_URL</code> + <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">LLM_MODEL</code>:
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Provider</th>
                <th className="px-4 py-3 font-semibold">Base URL</th>
                <th className="px-4 py-3 font-semibold">Example model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {providers.map((p) => (
                <tr key={p.name}>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.url}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Each agent can also use a different provider and model via <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">&lt;AGENT&gt;_MODEL</code>, <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">&lt;AGENT&gt;_API_KEY</code>, and <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">&lt;AGENT&gt;_BASE_URL</code> overrides.
        </p>
      </section>
      </Reveal>

      {/* Step 4: run */}
      <Reveal>
        <section className="mt-12">
        <h2 className="text-2xl font-bold">4. Run the full stack</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card font-mono text-sm shadow-sm">
          <pre className="overflow-x-auto p-5 text-muted-foreground"><code>{`docker compose up -d --build`}</code></pre>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">--build</code> the first time and whenever you change source code. For config-only changes, restart without rebuilding.
        </p>
        <div className="mt-4 rounded-2xl border border-amber/30 bg-amber/5 p-4 text-sm">
          <p className="font-semibold text-amber">Note: Docker socket access</p>
          <p className="mt-1 text-muted-foreground">
            The app container needs <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">/var/run/docker.sock</code> so the SandboxAgent can spin up sibling containers for validation. Ensure your host is secured.
          </p>
        </div>
      </section>
      </Reveal>

      {/* Step 5: webhook tunnel */}
      <Reveal>
        <section className="mt-12">
        <h2 className="text-2xl font-bold">5. Expose your webhook endpoint</h2>
        <p className="mt-3 text-muted-foreground">
          GitHub needs a public URL to deliver webhooks. The Compose file ships
          optional ngrok and Tailscale Funnel tunnels behind a <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">tunnel</code> profile:
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" /><span><strong>ngrok</strong> — easiest. Add <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NGROK_AUTHTOKEN</code> and run <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">docker compose --profile tunnel up -d</code></span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" /><span><strong>Tailscale Funnel</strong> — no third-party endpoint. Add <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">TAILSCALE_AUTH_KEY</code> and uncomment the tailscale block</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" /><span><strong>Reverse proxy</strong> — Caddy/nginx/Traefik for a real domain in production</span></li>
        </ul>
      </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <div className="mt-16 flex flex-col gap-3 rounded-3xl border border-border bg-gradient-to-br from-amber/10 to-violet/10 p-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <h2 className="text-xl font-bold">Prefer not to manage infrastructure?</h2>
            <p className="mt-1 text-muted-foreground">Let us host it for you — just install the GitHub App.</p>
          </div>
          <Link
            href="/hosted"
            className="inline-flex h-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet to-violet-soft px-5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.03]"
          >
            See the hosted option
          </Link>
        </div>
      </Reveal>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        For the complete guide, see the{" "}
        <a href="https://github.com/FutureMindsDev/lazydev-server/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">
          server README
        </a>{" "}
        and the{" "}
        <a href="https://github.com/FutureMindsDev/lazydev-client/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">
          client README
        </a>{" "}
        on GitHub.
      </p>
    </div>
  );
}
