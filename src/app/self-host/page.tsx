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
          Self-hosting runs on your own infrastructure, so create your own GitHub App for webhooks and fix branches.
        </p>

        <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <ol className="mt-2 list-decimal space-y-2.5 pl-5 text-sm text-muted-foreground">
            <li>In GitHub, go to <strong>Settings</strong> → <strong>Developer settings</strong> → <strong>GitHub Apps</strong> → <strong>New GitHub App</strong></li>
            <li>Set <strong>Homepage URL</strong> to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">https://github.com/&lt;your-username&gt;/&lt;name-for-your-app&gt;</code>. This becomes the public link to your GitHub App — you will return to this page anytime you need to change the app&apos;s settings, permissions, keys, or webhook.</li>
            <li>Before filling in the <strong>Webhook URL</strong> below, note the ordering: if you run ngrok as a Docker container (recommended), ngrok only gives you its random public address <strong>after</strong> you clone the server repo and start Docker in Steps 2–4. So enter a temporary placeholder here, finish creating the app, then come back and update it with the real URL in Step 5.</li>
            <li>Set <strong>Webhook URL</strong> to the temporary placeholder <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">https://placeholder.ngrok-free.app/webhooks/github</code> for now. This is the address GitHub posts events to — every time an issue is opened, GitHub sends the event payload to this URL and your LazyDev server listens there. You will replace it with the real <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">https://&lt;your-ngrok-url&gt;/webhooks/github</code> in Step 5. Then set a <strong>Webhook secret</strong> (a strong random string you also paste into the server <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code> in Step 2).</li>
            <li>Grant repository permissions:
              <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                <li><strong>Metadata:</strong> Read-only (mandatory for all apps)</li>
                <li><strong>Contents:</strong> Read &amp; write (clone code and push fix branches)</li>
                <li><strong>Pull requests:</strong> Read &amp; write (open and update PRs)</li>
                <li><strong>Issues:</strong> Read &amp; write (read issues and create feature tracking issues)</li>
              </ul>
            </li>
            <li>Subscribe to events: <strong>Issues</strong> and <strong>Issue comment</strong></li>
            <li>Click <strong>Create GitHub App</strong>. On the next page you will see a message with a link to <strong>generate a private key</strong> — click it, download the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.pem</code> file, and save the App ID shown at the top of the page.</li>
            <li>Install the app: go to your GitHub account <strong>Settings</strong> → <strong>Developer settings</strong> → <strong>GitHub Apps</strong> → click your app → <strong>Install App</strong> in the sidebar → <strong>Install</strong> on your account → choose the repositories you want LazyDev to monitor.</li>
          </ol>
          <p className="mt-3 rounded-xl bg-amber/10 p-3 text-xs text-muted-foreground">
            After changing permissions GitHub emails the installation owner for approval. Until you accept,
            the app keeps its old permissions and feature requests that need issue-write will fail with an explicit message.
          </p>
        </div>
      </section>
      </Reveal>

      {/* Step 2: env */}
      <Reveal>
        <section className="mt-12">
        <h2 className="text-2xl font-bold">2. Environment setup</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Self-host uses two public repos: <strong>lazydev-server</strong> (backend — all GitHub App, LLM, Docker/infra settings live here)
          and <strong>lazydev-client</strong> (frontend — only needs the server API URL). Do not clone
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">lazy-issue-resolver</code> — that is our private hosted deployment that serves hosted users from our server.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card font-mono text-sm shadow-sm">
          <pre className="overflow-x-auto p-5 text-muted-foreground"><code>{`# Backend (server) — holds ALL backend env
git clone https://github.com/FutureMindsDev/lazydev-server.git
cd lazydev-server
cp .env.example .env

# Frontend (client) — in a separate terminal, only API URL
git clone https://github.com/FutureMindsDev/lazydev-client.git
cd lazydev-client
cp .env.example .env`}</code></pre>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Edit the <strong>server</strong> <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code>. The minimum you must fill in:
        </p>
        <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card font-mono text-sm shadow-sm">
          <pre className="overflow-x-auto p-5 text-muted-foreground"><code>{`# GitHub App (server .env)
GITHUB_APP_ID=
GITHUB_WEBHOOK_SECRET=
GITHUB_PRIVATE_KEY_PATH=github-private-key.pem

# Tunnel — paste your ngrok authtoken here (Step 5).
# The Docker ngrok container needs this to come online.
NGROK_AUTHTOKEN=

# LLM provider — RECOMMENDED: set LLM_CONFIG_ENCRYPTION_KEY
# and add your key in dashboard → Settings → LLM provider (§2a).
# Headless / no dashboard? Fill §2b instead:
# OPENAI_API_KEY=
# LLM_MODEL=gpt-4o-mini`}</code></pre>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Start with <strong>§2a dashboard BYOK</strong>. Only fill <strong>§2b .env keys</strong> for headless servers or CI.
          Everything else has sensible Docker defaults — DB, Redis, Qdrant, and worktree paths are already set in Compose.
          Only fill the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">[DEV] localhost</code> overrides when running the app locally with <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">npm run start:dev</code>.
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
        <p className="mt-3 text-sm text-muted-foreground">
          Run this inside the <strong>server</strong> repo you cloned in Step 2. For the recommended ngrok-in-Docker path,
          include the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">tunnel</code> profile so ngrok starts together with the app:
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card font-mono text-sm shadow-sm">
          <pre className="overflow-x-auto p-5 text-muted-foreground"><code>{`# Recommended: app + ngrok tunnel together
docker compose --profile tunnel up -d --build

# Only if you run ngrok on your local machine instead (Step 5, Option 2):
# docker compose up -d --build`}</code></pre>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">--build</code> the first time and whenever you change source code. For config-only changes, restart without rebuilding.
          After this, continue to Step 5 to read your ngrok URL and update the GitHub App webhook.
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
        <h2 className="text-2xl font-bold">5. Get your public webhook URL with ngrok</h2>
        <p className="mt-3 text-muted-foreground">
          The app runs on <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">3200</code> (<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">POST /webhooks/github</code>),
          so the tunnel target is always <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">3200</code> on the host
          and <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">app:3200</code> inside Docker.
          GitHub can only reach a public URL, so sign up for ngrok, start it, then go back and replace the temporary
          Webhook URL from Step 1 with the real <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">https://&lt;your-ngrok-url&gt;/webhooks/github</code>.
          Pick <strong>one</strong> of these three options, do not run more than one tunnel at a time:
        </p>
        <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-semibold">First — sign up and get your authtoken (all options)</p>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Sign up at <strong>https://dashboard.ngrok.com/signup</strong> and log in.</li>
            <li>Open <strong>Your Authtoken</strong> (<strong>https://dashboard.ngrok.com/get-started/your-authtoken</strong>) and copy the authtoken shown.</li>
            <li>Keep this tab open — you will paste the token into the server <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code> (Option 1) or into your terminal (Options 2–3).</li>
          </ol>
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-semibold">Option 1 — In-Docker ngrok (recommended)</p>
          <p className="mt-2 text-sm text-muted-foreground">
            No host install needed. The server repo already ships an <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ngrok:</code> block in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">docker-compose.yml</code> that forwards to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">app:3200</code>.
            ngrok assigns a <strong>random</strong> address every time it starts,
            so the Webhook URL does not exist until after you have cloned the server repo and started Docker:
          </p>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>In the server <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code>, set <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NGROK_AUTHTOKEN=&lt;from https://dashboard.ngrok.com/get-started/your-authtoken&gt;</code>. Optionally set <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NGROK_DOMAIN=&lt;reserved-domain&gt;</code> (paid, for a stable URL).</li>
            <li>Uncomment the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ngrok:</code> block in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">docker-compose.yml</code> — it ships commented out.</li>
            <li>Start <strong>with</strong> the profile (plain <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">up -d</code> skips it, so ngrok will never come online): <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">docker compose --profile tunnel up -d</code>.</li>
            <li>Get the URL: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">docker compose logs ngrok | grep Forwarding</code> — look for <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">url=https://&lt;random&gt;.ngrok-free.app</code>.</li>
            <li>Your webhook URL is <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">https://&lt;random&gt;.ngrok-free.app/webhooks/github</code>. Go back to your GitHub App → <strong>Settings</strong> → <strong>Webhook URL</strong>, replace the temporary placeholder with this real URL, and save.</li>
            <li>Verify: open a test issue in a monitored repo and check the app logs (<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">docker compose logs -f app</code>) for the incoming webhook. You can also use the GitHub App&apos;s <strong>Recent Deliveries</strong> → <strong>Redeliver</strong> to re-send an event.</li>
          </ol>
          <p className="mt-3 rounded-xl bg-amber/10 p-3 text-xs text-muted-foreground">
            Free tier gives a random URL on every restart — each restart means repeating step 5 above (update the GitHub App webhook again).
            Reserve a fixed domain (paid plan) and set <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NGROK_DOMAIN</code> for a stable URL you only set once.
          </p>
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-semibold">Option 2 — Host ngrok CLI (for local dev)</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Use when the backend runs on the host via <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">npm run start:dev</code>, not in Docker:
          </p>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Install ngrok: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">brew install ngrok</code> (macOS) or download from <strong>https://ngrok.com/download</strong>.</li>
            <li>Register the token once: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ngrok config add-authtoken &lt;your-authtoken&gt;</code>.</li>
            <li>Leave <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NGROK_AUTHTOKEN</code> blank in the server <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code> and start Docker <strong>without</strong> the tunnel profile: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">docker compose up -d</code>.</li>
            <li>Forward to the app on <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">3200</code>: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ngrok http 3200</code> (or explicitly <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ngrok http http://localhost:3200</code>) — the URL is shown in the terminal under <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Forwarding</code>.</li>
            <li>Your webhook URL is <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">https://&lt;forwarding-url&gt;/webhooks/github</code> — paste it into the GitHub App settings from Step 1.</li>
          </ol>
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-semibold">Option 3 — Host ngrok with a stable domain</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Avoid updating the GitHub App on every restart: reserve a domain once in the ngrok dashboard, then pin it:
          </p>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ngrok http --domain=your-reserved-domain.ngrok-free.app 3200</code></li>
            <li>In Docker instead, set <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NGROK_DOMAIN=your-reserved-domain.ngrok-free.app</code> in the server <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code>.</li>
          </ol>
          <p className="mt-3 rounded-xl bg-amber/10 p-3 text-xs text-muted-foreground">
            Free tier = random URL each restart. Paid = reserve once in the ngrok dashboard, set <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NGROK_DOMAIN</code> (Docker) or <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">--domain</code> (host).
          </p>
        </div>
        <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm">
          <p className="font-semibold">What LazyDev will NOT do</p>
          <p className="mt-1 text-muted-foreground">
            It never merges code and never touches protected branches. Fixes run one job at a time so they cannot overlap — every change arrives as a branch + PR for you to review and approve.
          </p>
        </div>
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
