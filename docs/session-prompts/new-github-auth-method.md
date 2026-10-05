# Session prompt — new GitHub auth method (Actions thin-trigger dispatch)

> Copy-paste this into a fresh session working on `lazydev-intro` (docs website)
> so it can update the site for the new auth method. Preserved 2026-10-05.
> Backend work is merged to `develop` in `lazy-issue-resolver` (8 commits);
> canonical spec: `docs/architecture/hybrid-actions-thin-trigger-mode.md` there.

```text
Context: LazyDev has a NEW GitHub auth method alongside the GitHub App.
Read this repo's README.md plus these website pages before changing
anything: src/app/page.tsx, src/app/get-started/page.tsx,
src/app/self-host/page.tsx, src/app/hosted/page.tsx.

Background (do NOT re-derive — this is merged backend behavior):

1. Existing method — GitHub App (long-term, recommended): the server
   authenticates with JWT + per-installation tokens, receives webhooks at
   POST /webhooks/github (HMAC + delivery-ID dedup). Full events
   (issues + check_run), fresh 1h tokens minted server-side at use time.

2. NEW method — Actions thin-trigger dispatch (trial-only): the user repo
   adds ONE workflow file (.github/workflows/lazydev.yml, template in the
   backend repo at .github/workflows/lazydev-dispatch.example.yml) plus
   TWO Repository secrets (Settings → Secrets and variables → Actions →
   Secrets tab, NOT Variables): LAZYDEV_SERVER_URL (public server URL;
   locally this is the ngrok URL, e.g. https://abc123.ngrok-free.app)
   and LAZYDEV_SHARED_SECRET (matches the server's ACTION_SHARED_SECRET).
   On issue opened/reopened or a /lazydev comment, the workflow runs
   ~10s and POSTs the issue JSON + short-lived GITHUB_TOKEN to the warm
   server at POST /api/dispatch/issue (HMAC x-lazydev-signature). The
   server verifies, checks ACTION_ALLOWED_REPOS, and queues the normal
   BullMQ pipeline. Auth fallback per job: forwarded token -> App
   installation -> clear error. No GitHub App install, no webhook tunnel
   on the user repo. Limits (v1): GITHUB_TOKEN expires with the runner
   (trial-grade reliability), no check_run events.

Task: update the website so visitors understand BOTH methods and which
to pick:
- /get-started: extend the self-host vs hosted comparison with a third
  row/option for "quick trial via GitHub Action" (2 secrets + 1 file,
  no App, no ngrok) vs "GitHub App" (recommended long-term).
- /self-host: add the 3-step Action setup (server secret, 2 repo
  secrets, copy workflow) next to the existing App guide; state the
  tradeoffs plainly, keep all terms (thin trigger, warm server,
  dispatch, HMAC, GITHUB_TOKEN, BullMQ, allowlist).
- /hosted: stays App-install only — no Action alternative there (removed
  by decision: hosted mode has no need for per-repo dispatch).
- Keep language beginner-friendly but do NOT drop the technical terms.
- Do not invent endpoints, env names, or permissions — only those above.

Verify with `npm run lint` and `npm run build`. Do not commit unless
asked.
```
