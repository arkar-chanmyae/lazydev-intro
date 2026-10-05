import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Reveal } from "@/components/Animate";
import { OptionCards } from "@/components/OptionCards";
import { Steps } from "@/components/Steps";

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
        <section className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold">Prerequisites</h2>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />Linux (Ubuntu/Debian) server, or macOS/Linux for local dev</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />Node.js v20+ (local dev only; Docker image bundles Node)</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />Docker &amp; Docker Compose</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />GitHub App credentials (App ID, Private Key, Webhook Secret) — or just a shared secret if you trial with the GitHub Action instead</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />An LLM API key — or a local Ollama instance (free fallback)</li>
        </ul>
      </section>
      </Reveal>

      {/* Setup steps */}
      <Reveal>
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Setup steps</h2>
          <p className="mt-2 text-muted-foreground">
            Follow these in order — each step builds on the previous one.
          </p>
          <div className="mt-6">
            <Steps
              steps={[
                {
                  title: "Connect GitHub: App or Action",
                  accent: "terracotta",
                  body: (
                    <>
                      <p>
                        Pick <strong>one</strong> of these two ways for LazyDev to hear about your issues. The App is the long-term path; the Action is the quick trial with no App and no webhook tunnel:
                      </p>
                      <div className="mt-3">
                        <OptionCards
                          options={[
                            {
                              id: "connect-app",
                              badge: "Recommended",
                              title: "Option A — GitHub App",
                              tagline: "Full events, fresh tokens, best for the long term.",
                              highlights: [
                                "Issues + check-run events included",
                                "Server mints fresh tokens at use time",
                                "Needs a webhook URL (Step 5)",
                              ],
                              accent: "terracotta",
                              details: (
                                <>
                                  <p>
                                    Self-hosting runs on your own server, so you need your own GitHub App. GitHub sends issue events to this app, and the app gives LazyDev permission to push fix branches.
                                  </p>
                                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
                                    <li>In GitHub, go to <strong>Settings</strong> → <strong>Developer settings</strong> → <strong>GitHub Apps</strong> → <strong>New GitHub App</strong></li>
                                    <li>Set <strong>Homepage URL</strong> to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">https://github.com/&lt;your-username&gt;/&lt;name-for-your-app&gt;</code>. This is just the public link to your app&apos;s settings page — you will come back here whenever you need to change permissions, keys, or the webhook.</li>
                                    <li>For <strong>Webhook URL</strong>, enter a temporary placeholder for now. Why: if you run ngrok in Docker (recommended), ngrok only shows its public address <strong>after</strong> you start Docker in Steps 2–4. So finish creating the app first, then replace the placeholder with the real URL in Step 5.</li>
                                    <li>Set <strong>Webhook URL</strong> to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">https://placeholder.ngrok-free.app/webhooks/github</code> for now. This is the address GitHub posts events to — each time someone opens an issue, GitHub sends the details there and your LazyDev server picks them up. Then set a <strong>Webhook secret</strong> (any strong random string — you will paste the same value into the server <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code> in Step 2).</li>
                                    <li>Grant repository permissions (this is what lets LazyDev read code and open PRs):
                                      <ul className="mt-1 list-disc space-y-1 pl-5 text-xs">
                                        <li><strong>Metadata:</strong> Read-only (GitHub requires this for every app)</li>
                                        <li><strong>Contents:</strong> Read &amp; write (clone the code and push fix branches)</li>
                                        <li><strong>Pull requests:</strong> Read &amp; write (open and update PRs)</li>
                                        <li><strong>Issues:</strong> Read &amp; write (read issues and create tracking issues for new features)</li>
                                      </ul>
                                    </li>
                                    <li>Subscribe to events: <strong>Issues</strong> and <strong>Issue comment</strong> (this tells GitHub which events to send you).</li>
                                    <li>Click <strong>Create GitHub App</strong>. On the next page, click the link to <strong>generate a private key</strong> — download the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.pem</code> file, and copy the App ID shown at the top of the page. You will need both in Step 2.</li>
                                    <li>Install the app on your repos: go to <strong>Settings</strong> → <strong>Developer settings</strong> → <strong>GitHub Apps</strong> → your app → <strong>Install App</strong> → <strong>Install</strong> → choose which repositories LazyDev may work on.</li>
                                  </ol>
                                  <p className="mt-3 rounded-xl bg-amber/10 p-3 text-xs">
                                    If you change permissions later, GitHub emails the installation owner to approve. Until they accept, the app keeps its old permissions — so new features that need the new permission will fail with a clear message, not silently.
                                  </p>
                                </>
                              ),
                            },
                            {
                              id: "connect-action",
                              badge: "No App install",
                              title: "Option B — GitHub Action dispatch",
                              tagline: "Trial in minutes — no App, no webhook tunnel.",
                              highlights: [
                                "2 repo secrets + 1 workflow file",
                                "Warm server does all heavy work",
                                "Trial-grade: use the App long-term",
                              ],
                              accent: "amber",
                              details: (
                                <>
                                  <p>
                                    No App, no tunnel. Your repos send each new issue straight to your
                                    already-running server: a ~10s workflow file posts the issue to{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">POST /api/dispatch/issue</code>{" "}
                                    with an HMAC signature plus a short-lived GITHUB_TOKEN. The warm server checks the signature and runs the normal pipeline.
                                  </p>
                                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
                                    <li>Make the shared password: run <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">openssl rand -hex 32</code> in a terminal and copy the output. This is the secret password your repos will use to prove they are allowed to call your server — keep it private.</li>
                                    <li>On the server: put it in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code> as <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ACTION_SHARED_SECRET=&lt;paste-it-here&gt;</code>. Optionally limit which repos may call you with <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ACTION_ALLOWED_REPOS=owner/repo,org/*</code>. Then redeploy the server.</li>
                                    <li>In each user repo, go to Settings → Secrets and variables → Actions → Secrets tab → Repository secrets (not Variables — secrets are encrypted, variables are visible). Add <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">LAZYDEV_SERVER_URL</code> (your server address — the ngrok URL for local trials) and <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">LAZYDEV_SHARED_SECRET</code> (the same password as the server).</li>
                                    <li>Copy the example workflow from the server repo into your repo at <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.github/workflows/lazydev.yml</code>.</li>
                                  </ol>
                                  <p className="mt-3 text-xs">
                                    Trial-grade: the token dies when the workflow run ends, and CI check_run events are not supported in v1 — switch to Option A for the long term.
                                  </p>
                                </>
                              ),
                            },
                          ]}
                        />
                      </div>
                    </>
                  ),
                },
                {
                  title: "Environment setup",
                  accent: "terracotta",
                  body: (
                    <>
                      <p className="text-sm">
                        Self-host uses two public repos. <strong>lazydev-server</strong> is the backend — every setting (GitHub App, LLM keys, database, Docker) lives in its <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code> file.{" "}
                        <strong>lazydev-client</strong> is the frontend website — it only needs to know the server&apos;s address. Do not clone{" "}
                        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">lazy-issue-resolver</code>: that is our private copy that powers the hosted service.
                      </p>
                      <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-background font-mono text-sm">
                        <pre className="overflow-x-auto p-5"><code>{`# Backend (server) — holds ALL backend env
git clone https://github.com/FutureMindsDev/lazydev-server.git
cd lazydev-server
cp .env.example .env

# Frontend (client) — in a separate terminal, only API URL
git clone https://github.com/FutureMindsDev/lazydev-client.git
cd lazydev-client
cp .env.example .env`}</code></pre>
                      </div>
                      <p className="mt-3 text-sm">
                        Edit the <strong>server</strong> <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code>. Fill in at least the block below.
                      </p>
                      <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-background font-mono text-sm">
                        <pre className="overflow-x-auto p-5"><code>{`# GitHub App (server .env)
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
                      <p className="mt-3 text-sm">
                        Two ways to set your AI key. <strong>§2a (recommended):</strong> put <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">LLM_CONFIG_ENCRYPTION_KEY</code> in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code>, start the app, then add your key in the dashboard under Settings → LLM provider (it is stored encrypted). <strong>§2b:</strong> only for headless servers with no dashboard — paste the key directly into <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code> instead.
                        Everything else already has working Docker defaults (database, Redis, Qdrant, folders). Touch the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">[DEV] localhost</code> lines only when running the app on your machine with <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">npm run start:dev</code>.
                        Trialing with Option B (Action dispatch) instead of an App? Skip the App keys above and set only <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ACTION_SHARED_SECRET</code> (plus the LLM keys) — details in Step 1.
                      </p>
                    </>
                  ),
                },
                {
                  title: "Pick your LLM provider",
                  accent: "terracotta",
                  body: (
                    <>
                      <p className="text-sm">
                        LazyDev figures out which AI company you mean from <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">OPENAI_BASE_URL</code> — you just give it three values: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">OPENAI_API_KEY</code> (your key), <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">OPENAI_BASE_URL</code> (the company&apos;s address) and <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">LLM_MODEL</code> (which model). Pick a row:
                      </p>
                      <div className="mt-3 overflow-hidden rounded-2xl border border-border">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-3 font-semibold">Provider</th>
                              <th className="px-4 py-3 font-semibold">Base URL</th>
                              <th className="px-4 py-3 font-semibold">Example model</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border bg-card">
                            {providers.map((p) => (
                              <tr key={p.name}>
                                <td className="px-4 py-3 font-medium">{p.name}</td>
                                <td className="px-4 py-3 font-mono text-xs">{p.url}</td>
                                <td className="px-4 py-3 font-mono text-xs">{p.model}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-3 text-sm">
                        Want one part of the pipeline (say, the code writer) on a stronger or cheaper model than the rest? Give that agent its own trio: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">&lt;AGENT&gt;_MODEL</code>, <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">&lt;AGENT&gt;_API_KEY</code>, <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">&lt;AGENT&gt;_BASE_URL</code>.
                      </p>
                    </>
                  ),
                },
                {
                  title: "Run the full stack",
                  accent: "terracotta",
                  body: (
                    <>
                      <p className="text-sm">
                        Run this inside the <strong>server</strong> folder from Step 2. To start ngrok together with the app (recommended), add the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">tunnel</code> profile:
                      </p>
                      <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-background font-mono text-sm">
                        <pre className="overflow-x-auto p-5"><code>{`# Recommended: app + ngrok tunnel together
docker compose --profile tunnel up -d --build

# Only if you run ngrok on your local machine instead (Step 5, Option 2):
# docker compose up -d --build`}</code></pre>
                      </div>
                      <p className="mt-3 text-sm">
                        Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">--build</code> the first time and whenever you edit code. If you only changed settings (<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code>), restart without it.
                        Next: Step 5 shows you how to read your ngrok address and paste it into the GitHub App.
                      </p>
                      <div className="mt-3 rounded-2xl border border-amber/30 bg-amber/5 p-4 text-sm">
                        <p className="font-semibold text-amber">Note: Docker socket access</p>
                        <p className="mt-1">
                          The app container needs <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">/var/run/docker.sock</code> — that is how the sandbox spins up throwaway containers to test each fix. Anyone with access to that socket controls Docker on your machine, so keep the host secured.
                        </p>
                      </div>
                    </>
                  ),
                },
                {
                  title: "Get your public webhook URL with ngrok",
                  accent: "terracotta",
                  body: (
                    <>
                      <p className="text-sm">
                        Your app listens on port <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">3200</code> on your own machine — but GitHub lives on the internet and cannot reach it. A tunnel gives you a public address that forwards to your app. Sign up for ngrok, start a tunnel, then replace the placeholder Webhook URL from Step 1 with your real{" "}
                        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">https://&lt;your-address&gt;/webhooks/github</code>.
                        Only needed for Option A (GitHub App) — Option B (Action dispatch) needs no tunnel at all.
                        Pick <strong>one</strong> of these three options, do not run more than one tunnel at a time:
                      </p>
                      <div className="mt-3 rounded-2xl border border-border bg-background p-4">
                        <p className="text-sm font-semibold">First — sign up and get your authtoken (all tunnel options)</p>
                        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm">
                          <li>Sign up at <strong>https://dashboard.ngrok.com/signup</strong> and log in.</li>
                          <li>Open <strong>Your Authtoken</strong> (<strong>https://dashboard.ngrok.com/get-started/your-authtoken</strong>) and copy the authtoken shown.</li>
                        </ol>
                      </div>
                      <div className="mt-3">
                        <OptionCards
                          columns={3}
                          options={[
                            {
                              id: "tunnel-docker",
                              badge: "Recommended",
                              title: "Option 1 — In-Docker ngrok",
                              tagline: "No host install; tunnel ships in Compose.",
                              highlights: [
                                "Forwards to app:3200 automatically",
                                "Random URL each restart (free tier)",
                                "Start with the tunnel profile",
                              ],
                              accent: "amber",
                              details: (
                                <>
                                  <p>
                                    Nothing to install on your machine. The server repo already ships a ready-made{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ngrok:</code> section in{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">docker-compose.yml</code> that forwards internet traffic to your app.
                                  </p>
                                  <ol className="mt-3 list-decimal space-y-2 pl-5">
                                    <li>In the server <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code>, set <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NGROK_AUTHTOKEN=&lt;your-authtoken&gt;</code>. Want the same address every time? That needs a paid ngrok plan — then also set <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NGROK_DOMAIN=&lt;your-reserved-domain&gt;</code>.</li>
                                    <li>Uncomment the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ngrok:</code> section in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">docker-compose.yml</code> (it ships commented out).</li>
                                    <li>Start <strong>with</strong> the tunnel profile: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">docker compose --profile tunnel up -d</code>. Plain <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">up -d</code> skips ngrok, so it would never come online.</li>
                                    <li>Read your address: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">docker compose logs ngrok | grep Forwarding</code> — look for <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">url=https://&lt;random&gt;.ngrok-free.app</code>.</li>
                                    <li>Your webhook URL is that address plus <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">/webhooks/github</code> at the end — paste it over the placeholder in your GitHub App settings (Step 1).</li>
                                  </ol>
                                  <p className="mt-3 rounded-xl bg-amber/10 p-3 text-xs">
                                    Free ngrok = a new random address on every restart, so you must update the GitHub App webhook each time. A reserved domain (paid) stays the same forever.
                                  </p>
                                </>
                              ),
                            },
                            {
                              id: "tunnel-host",
                              title: "Option 2 — Host ngrok CLI",
                              tagline: "For local dev with the app on your machine.",
                              highlights: [
                                "Use with npm run start:dev (not Docker)",
                                "Forward to localhost:3200",
                                "Same random-URL caveat on free tier",
                              ],
                              accent: "terracotta",
                              details: (
                                <ol className="list-decimal space-y-2 pl-5">
                                  <li>Install ngrok on your machine: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">brew install ngrok</code> (macOS) or download it from https://ngrok.com/download. Use this option when the app itself runs on your machine (<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">npm run start:dev</code>), not in Docker.</li>
                                  <li>Save your token once: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ngrok config add-authtoken &lt;your-authtoken&gt;</code>.</li>
                                  <li>In the server <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code>, leave <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NGROK_AUTHTOKEN</code> empty and start Docker <strong>without</strong> the tunnel profile: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">docker compose up -d</code> (otherwise you would run two tunnels).</li>
                                  <li>Start forwarding to your app: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ngrok http 3200</code> — your public address shows in the terminal under <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Forwarding</code>.</li>
                                  <li>Your webhook URL is that address plus <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">/webhooks/github</code> — paste it into the GitHub App settings from Step 1.</li>
                                </ol>
                              ),
                            },
                            {
                              id: "tunnel-domain",
                              title: "Option 3 — Stable ngrok domain",
                              tagline: "Stop updating the webhook on every restart.",
                              highlights: [
                                "Reserve once in the ngrok dashboard",
                                "Pin with --domain or NGROK_DOMAIN",
                                "Requires a paid ngrok plan",
                              ],
                              accent: "violet",
                              details: (
                                <>
                                  <p>
                                    Tired of pasting a new address into GitHub after every restart? Reserve one fixed address in the ngrok dashboard (paid plan), then pin your tunnel to it:
                                  </p>
                                  <ol className="mt-3 list-decimal space-y-2 pl-5">
                                    <li>On your machine: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ngrok http --domain=your-reserved-domain.ngrok-free.app 3200</code></li>
                                    <li>In Docker instead: put <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NGROK_DOMAIN=your-reserved-domain.ngrok-free.app</code> in the server <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code>.</li>
                                  </ol>
                                  <p className="mt-3 rounded-xl bg-amber/10 p-3 text-xs">
                                    Free = new random address every restart. Reserved domain = set the GitHub App webhook once, never touch it again.
                                  </p>
                                </>
                              ),
                            },
                          ]}
                        />
                      </div>
                      <div className="mt-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm">
                        <p className="font-semibold">What LazyDev will NOT do</p>
                        <p className="mt-1">
                          It never merges code and never touches protected branches. Fixes run one job at a time so they cannot overlap — every change arrives as a branch + PR for you to review and approve.
                        </p>
                      </div>
                    </>
                  ),
                },
              ]}
            />
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
