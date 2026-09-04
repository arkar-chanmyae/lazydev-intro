# LazyDev — Lazy Issue Resolver

LazyDev is an AI-native autonomous CI engineering assistant that monitors your
GitHub issues, generates validated code fixes with a multi-agent AI pipeline,
and opens pull requests automatically — while you sleep.

When a GitHub issue is opened in a monitored repository, LazyDev clones the
repo, runs a five-stage LangGraph pipeline to understand and fix the problem,
validates the patch in an isolated Docker sandbox, and opens a pull request —
all without human intervention. You can also drive it manually from any
MCP-capable chat platform.

> This repo contains the **introduction & docs website** for LazyDev.
> The main application lives at
> [`FutureMindsDev/lazy-issue-resolver`](https://github.com/FutureMindsDev/lazy-issue-resolver).

---

## Two ways to use LazyDev

### Self-host — Free

Clone the repo, configure your GitHub App and LLM provider, and run the full
Docker stack on your own server. You keep total control and pay nothing but
your own compute.

- Full control over the entire stack
- Bring your own LLM — OpenAI, Gemini, Anthropic, DeepSeek, or local Ollama
- Your code never leaves your infrastructure
- MIT-licensed, free forever

→ [Self-host guide](https://github.com/FutureMindsDev/lazy-issue-resolver/blob/main/README.md)

### Hosted — We run it for you

Don't want to manage Docker, Postgres, Redis, or LLM API keys? Install our
GitHub App and we handle the infrastructure, the AI compute, and the public
webhook endpoint. You just review the PRs.

- No infrastructure to run or maintain
- We cover the AI compute — no API keys to manage
- Public HTTPS webhook endpoint included
- Personal MCP bearer token for chat integration

→ [Install the GitHub App](https://github.com/apps/lazydev-issue-resolver)

Not sure which to pick? See the
[comparison](https://github.com/arkar-chanmyae/lazydev-intro) on the website.

---

## How it works

A five-stage multi-agent LangGraph pipeline turns an open issue into a
reviewable pull request:

1. **Onboarding** — Reads your repo structure, conventions, and build setup so
   fixes match your codebase.
2. **Planner** — Researches the issue and produces a step-by-step fix plan
   using a tool loop.
3. **PatchGenerator** — Writes the actual code changes with read-before-edit
   gates for safety.
4. **Validation** — Runs `npm run build` inside an isolated Docker sandbox to
   verify the patch compiles. If it fails, the patch is sent back with
   validation feedback (self-healing loop).
5. **GitAgent** — Pushes a fix branch (`lazydev/fix-<n>-<slug>`) and opens a
   pull request with a traceable title.

### Drive it from chat (MCP)

LazyDev exposes an MCP server so any MCP-capable platform (Hermes, OpenClaw,
Claude Desktop) can drive the pipeline manually:

| Tool | Purpose |
|---|---|
| `trigger_issue_fix` | Fix an existing GitHub issue. `priority: "urgent"` jumps the queue. |
| `implement_new_feature` | Write net-new code from a prompt. Creates a tracking issue. |
| `get_pipeline_status` | Check whether a run is queued, running, failed, or succeeded. |
| `provide_human_feedback` | Send a correction; running tasks pick it up on the next retry. |

---

## Features

- **GitHub App authentication** — JWT + installation token auth with HMAC-signed
  webhooks and delivery-ID deduplication.
- **Asynchronous queue** — BullMQ + Redis with exponential backoff retries and
  distributed Redlock per repo/branch.
- **Multi-agent orchestration** — LangGraph pipeline across five specialized
  agents.
- **Per-agent model selection** — Each agent can use a different LLM provider
  and model via env overrides.
- **Sandbox validation** — Generated fixes are built inside an isolated sibling
  Docker container before merging.
- **Self-healing loop** — Automatically retries patch generation with validation
  feedback on failure.
- **MCP server** — Drive the pipeline from any MCP-capable chat platform.
- **Multi-LLM support** — OpenAI, Gemini, Anthropic, DeepSeek, OpenRouter, or
  local Ollama.

---

## The website

This repo is a [Next.js](https://nextjs.org) static site that presents all of
the above to visitors and helps them choose between self-hosting and the hosted
service.

### Website pages

| Route | Purpose |
|---|---|
| `/` | Landing — hero, what-is, pipeline overview, option chooser, features |
| `/how-it-works` | Detailed five-stage pipeline walkthrough + MCP tools |
| `/get-started` | Side-by-side comparison of self-host vs hosted |
| `/self-host` | Condensed self-host guide |
| `/hosted` | Hosted info, what we run, limits, signup CTA |

### Run the website locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Deploy

- **Vercel** — Import the repo at [vercel.com/new](https://vercel.com/new).
  The included `vercel.json` sets the framework to `nextjs`.
- **Netlify** — Connect the repo in the Netlify dashboard. The included
  `netlify.toml` configures the build and the Next.js plugin.

---

## License

MIT — see the main
[`lazy-issue-resolver`](https://github.com/FutureMindsDev/lazy-issue-resolver)
repo for the full license.
