# LazyDev — Marketing & docs site

The introduction and documentation website for **LazyDev**, an AI-native
autonomous CI engineering assistant that monitors GitHub issues, generates
validated code fixes, and opens pull requests.

This is a **separate project** from the main app repo
([`lazy-issue-resolver`](https://github.com/FutureMindsDev/lazy-issue-resolver)).
It is a static Next.js site that explains what LazyDev does and helps visitors
choose between two deployment options:

- **Self-host** — free, MIT-licensed, you run the full Docker stack.
- **Hosted** — we run it for you; you just install the GitHub App.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [Tailwind CSS](https://tailwindcss.com) v4
- TypeScript
- Light/dark theme toggle (persisted to `localStorage`, no flash on load)

## Pages

| Route            | Purpose                                                      |
| ---------------- | ------------------------------------------------------------ |
| `/`              | Landing — hero, what-is, pipeline overview, option chooser, features |
| `/how-it-works`  | Detailed five-stage pipeline walkthrough + MCP tools         |
| `/get-started`   | Side-by-side comparison of self-host vs hosted               |
| `/self-host`     | Condensed self-host guide (mirrors the main repo's README)   |
| `/hosted`        | Hosted info, what we run, limits, signup CTA                 |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Deploy

### Vercel

Import the repo at [vercel.com/new](https://vercel.com/new). The included
`vercel.json` sets the framework to `nextjs` — no other config needed.

### Netlify

Connect the repo in the Netlify dashboard. The included `netlify.toml` sets the
build command (`npm run build`), publish directory (`.next`), and the
`@netlify/plugin-nextjs` plugin.

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: Navbar + Footer + theme init
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Tailwind + theme tokens + dark mode variant
│   ├── how-it-works/page.tsx
│   ├── get-started/page.tsx
│   ├── self-host/page.tsx
│   └── hosted/page.tsx
└── components/
    ├── Navbar.tsx
    ├── Footer.tsx
    └── ThemeToggle.tsx     # Client component for light/dark toggle
```

## License

MIT — same as the main LazyDev project.
