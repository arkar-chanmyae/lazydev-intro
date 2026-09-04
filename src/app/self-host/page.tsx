import type { Metadata } from "next";
import Link from "next/link";

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
      <div className="text-center">
        <span className="inline-flex items-center rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber">
          Free · MIT-licensed
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Self-host LazyDev</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Run the entire stack on your own server. You bring the GitHub App and
          LLM provider — everything else is in the Docker Compose file.
        </p>
      </div>

      {/* Prerequisites */}
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

      {/* Step 1: GitHub App */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">1. Install the LazyDev GitHub App</h2>
        <p className="mt-3 text-muted-foreground">
          You have two options: use the official app (easiest) or create your own
          for full control.
        </p>

        <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-semibold">Option A — Use the official app</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Open <a href="https://github.com/apps/lazydev-issue-resolver" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">github.com/apps/lazydev-issue-resolver</a></li>
            <li>Click <strong>Install</strong> and pick your account/org</li>
            <li>Choose <strong>Only select repositories</strong> and pick your repos</li>
            <li>Grab the App ID, generate a Private Key (.pem), and set a Webhook Secret</li>
          </ol>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-semibold">Option B — Create your own GitHub App</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>GitHub → Settings → Developer settings → <strong>New GitHub App</strong></li>
            <li>Set Homepage URL, Webhook URL to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">https://&lt;your-url&gt;/webhooks/github</code>, and a Webhook secret</li>
            <li>Grant permissions: Metadata (read), Contents (read+write), Pull requests (read+write), Issues (read+write)</li>
            <li>Subscribe to events: Issues, Issue comment, Check run</li>
            <li>Generate a private key and install the app on your repos</li>
          </ol>
        </div>
      </section>

      {/* Step 2: env */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">2. Environment setup</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card font-mono text-sm shadow-sm">
          <pre className="overflow-x-auto p-5 text-muted-foreground"><code>{`git clone https://github.com/FutureMindsDev/lazy-issue-resolver.git
cd lazy-issue-resolver
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

      {/* Step 3: LLM */}
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

      {/* Step 4: run */}
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

      {/* Step 5: webhook tunnel */}
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

      {/* CTA */}
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

      <p className="mt-8 text-center text-sm text-muted-foreground">
        For the complete guide, see the{" "}
        <a href="https://github.com/FutureMindsDev/lazy-issue-resolver/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">
          full README on GitHub
        </a>.
      </p>
    </div>
  );
}
