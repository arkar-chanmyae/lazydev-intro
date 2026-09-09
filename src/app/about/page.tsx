import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, Reveal, Stagger, StaggerItem } from "@/components/Animate";

export const metadata: Metadata = {
  title: "About Us · FutureMindsDev",
  description:
    "Meet FutureMindsDev — an engineering lab founded by Arkar Chan Myae and Khin Me Me Latt, building smart, futuristic technology for developers and the public.",
};

const founders = [
  {
    name: "Arkar Chan Myae",
    username: "arkar-chanmyae",
    role: "Co-Founder & AI Systems Architect",
    githubUrl: "https://github.com/arkar-chanmyae",
    avatarSrc: "/arkar-avatar.png",
    localPlaceholderKey: "/public/arkar-avatar.png",
    bio: "Passionate about autonomous multi-agent systems, developer automation, and backend architectures. Designing self-governing pipelines like LazyDev that free developers from routine debugging.",
    highlights: [
      "Multi-agent LangGraph orchestrations",
      "Autonomous sandbox test runners",
      "Scalable backend systems & LLM toolkits",
    ],
  },
  {
    name: "Khin Me Me Latt",
    username: "KhinMeMeLatt",
    role: "Co-Founder & Software / Product Engineer",
    githubUrl: "https://github.com/KhinMeMeLatt",
    avatarSrc: "/khin-avatar.png",
    localPlaceholderKey: "/public/khin-avatar.png",
    bio: "Dedicated to human-centered design, multimodal AI applications, and creative software. Crafting products that solve tangible problems for everyday people and inspire new creative workflows.",
    highlights: [
      "Multimodal AI & visual models (fitAura)",
      "Intuitive UX & modern full-stack apps",
      "Human-centric problem solving & design",
    ],
  },
];

const projects = [
  {
    name: "LazyDev",
    tagline: "Autonomous CI Developer & Issue Resolver",
    category: "Developer Automation",
    description:
      "A 5-stage multi-agent LangGraph pipeline that monitors repository issues, reproduces bugs in isolated Docker sandboxes, formulates plans, writes code, and issues pull requests automatically.",
    tech: ["LangGraph", "NestJS", "Docker Sandboxes", "PostgreSQL", "Redis", "Qdrant"],
    links: [
      { label: "Server", url: "https://github.com/FutureMindsDev/lazydev-server" },
      { label: "Desktop Client", url: "https://github.com/FutureMindsDev/lazydev-client" },
      { label: "Intro Site", url: "/" },
    ],
    highlight: true,
  },
  {
    name: "fitAura",
    tagline: "AI-Powered Virtual Fitting Room",
    category: "Multimodal AI & Public Tech",
    description:
      "A virtual try-on system leveraging Google's Gemini 2.5 Flash Image model. Blends user portraits and outfit photos to create photorealistic fashion previews in seconds.",
    tech: ["Python", "Gemini 2.5 Flash Image", "Pillow", "Kaggle Challenge"],
    links: [
      { label: "Repository", url: "https://github.com/FutureMindsDev/fitAura" },
    ],
    highlight: false,
  },
  {
    name: "audio-transcriber",
    tagline: "100% Private Offline Speech-to-Text CLI",
    category: "Privacy & Productivity",
    description:
      "High-speed local speech-to-text using faster-whisper. Transcribes hours of voice recordings in minutes on-device without cloud dependencies or privacy leaks.",
    tech: ["Python", "faster-whisper", "CTranslate2", "CLI"],
    links: [
      { label: "Repository", url: "https://github.com/FutureMindsDev/audio-transcriber" },
    ],
    highlight: false,
  },
  {
    name: "TechSuggest",
    tagline: "AI Messenger Bot for Tech Recommendations",
    category: "Consumer AI Assistant",
    description:
      "An intelligent conversational Messenger assistant providing swift, tailored gadget comparisons and hardware purchase recommendations for everyday shoppers.",
    tech: ["Node.js", "Meta Messenger API", "LLM APIs"],
    links: [
      { label: "Repository", url: "https://github.com/FutureMindsDev/TechSuggest" },
    ],
    highlight: false,
  },
  {
    name: "aws-developer-questions",
    tagline: "Interactive AWS Certification Practice",
    category: "Education & Career",
    description:
      "Curated practice hub and flashcard interface designed to help developers master the AWS Certified Developer Associate examination topics with confidence.",
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    links: [
      { label: "Repository", url: "https://github.com/FutureMindsDev/aws-developer-questions" },
    ],
    highlight: false,
  },
];

const coreValues = [
  {
    title: "Technology for the Public Good",
    description:
      "We design tools that solve everyday problems—whether it's trying on clothes virtually with AI, protecting privacy with local transcription, or simplifying complex purchases.",
    icon: (
      <svg className="h-6 w-6 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "Liberating Developers",
    description:
      "Engineers should spend time dreaming and inventing, not wrestling with repetitive bug reproductions and routine maintenance. Autonomous agents like LazyDev make this future real.",
    icon: (
      <svg className="h-6 w-6 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Privacy & Local-First Freedom",
    description:
      "Whenever possible, compute should happen locally. Solutions like whisper-cli keep sensitive voice data strictly on users' devices with no cloud footprint.",
    icon: (
      <svg className="h-6 w-6 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Hero Header */}
      <FadeIn className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-semibold text-terracotta">
          <span className="h-2 w-2 rounded-full bg-terracotta animate-ping" />
          FutureMindsDev
        </div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Building smart, futuristic solutions for tomorrow
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          We are a collaborative duo driven by curiosity, purposeful design, and next-generation technology.
          Our work blends autonomous AI systems with accessible software to empower developers and serve the public.
        </p>

        {/* Organization Links */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="https://github.com/FutureMindsDev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.2.6.11.82-.25.82-.56v-2c-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.21.08 1.85 1.22 1.85 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.23-3.17-.12-.3-.53-1.51.12-3.15 0 0 1-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.28-1.53 3.29-1.21 3.29-1.21.65 1.64.24 2.85.12 3.15.77.83 1.23 1.88 1.23 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.08.81 2.18v3.23c0 .31.22.68.83.56A12.04 12.04 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
            </svg>
            GitHub Organization
          </a>
          <a
            href="mailto:arkarchanmyae.dev@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
          >
            Get in Touch
          </a>
        </div>
      </FadeIn>

      {/* ======================================================== */}
      {/* 🏢 ORGANIZATION PROFILE PICTURE / BANNER AREA             */}
      {/* Placeholder area ready for user's organization photo      */}
      {/* ======================================================== */}
      <Reveal className="mt-14">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/40 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            {/* Organization Photo */}
            <div className="group relative flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-terracotta/30 bg-card p-1 shadow-sm transition-all hover:border-terracotta hover:shadow-md">
              <Image
                src="/futuremindsdev-logo.png"
                alt="FutureMindsDev Organization Logo"
                width={112}
                height={112}
                className="h-full w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <h2 className="text-2xl font-bold">FutureMindsDev</h2>
                <span className="rounded-full bg-amber/15 px-2.5 py-0.5 text-xs font-semibold text-amber">
                  Open Source & AI R&amp;D
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Founded by <strong>Arkar Chan Myae</strong> and <strong>Khin Me Me Latt</strong>, FutureMindsDev is a laboratory for bold ideas.
                We believe that software can simultaneously elevate human productivity and delight everyday users through intelligent automation,
                frictionless interfaces, and thoughtful AI engineering.
              </p>
              <div className="mt-3 flex items-center justify-center md:justify-start gap-3 text-xs text-muted-foreground/80">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active R&amp;D
                </span>
                <span>•</span>
                <span>2 Active Creators</span>
                <span>•</span>
                <span>5 Public Projects</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ======================================================== */}
      {/* 👥 FOUNDERS & COLLABORATORS SECTION                       */}
      {/* Dedicated spaces and photo placeholders for each founder  */}
      {/* ======================================================== */}
      <Reveal className="mt-16">
        <div className="text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">The Creators</span>
          <h2 className="mt-1 text-3xl font-bold">Meet the Founders</h2>
          <p className="mt-2 text-muted-foreground">
            Two collaborators working in harmony to craft smart, future-facing applications.
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {founders.map((founder) => (
            <div
              key={founder.username}
              className="relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-sm transition-all hover:shadow-md"
            >
              <div>
                {/* Founder Header with Photo Container */}
                <div className="flex items-start gap-4">
                  {/* Founder Profile Photo */}
                  <div className="group relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-amber/40 bg-card p-1 shadow-sm transition-all hover:border-amber hover:shadow-md">
                    <Image
                      src={founder.avatarSrc}
                      alt={`${founder.name} profile photo`}
                      width={72}
                      height={72}
                      className="h-full w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Founder Identity */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h3 className="text-xl font-bold truncate">{founder.name}</h3>
                    </div>
                    <a
                      href={founder.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-terracotta hover:underline inline-flex items-center gap-1"
                    >
                      @{founder.username}
                    </a>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      {founder.role}
                    </p>
                  </div>
                </div>

                {/* Founder Bio */}
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                  {founder.bio}
                </p>

                {/* Key Focus Highlights */}
                <div className="mt-4">
                  <span className="text-xs font-semibold text-foreground/80">Key Focus Areas:</span>
                  <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                    {founder.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Founder Footer Link */}
              <div className="mt-6 border-t border-border pt-4">
                <a
                  href={founder.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-terracotta transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.2.6.11.82-.25.82-.56v-2c-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.21.08 1.85 1.22 1.85 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.23-3.17-.12-.3-.53-1.51.12-3.15 0 0 1-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.28-1.53 3.29-1.21 3.29-1.21.65 1.64.24 2.85.12 3.15.77.83 1.23 1.88 1.23 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.08.81 2.18v3.23c0 .31.22.68.83.56A12.04 12.04 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
                  </svg>
                  View GitHub Profile
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ======================================================== */}
      {/* 🚀 PROJECTS PORTFOLIO SHOWCASE                           */}
      {/* Projects worked on across FutureMindsDev                  */}
      {/* ======================================================== */}
      <Reveal className="mt-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Portfolio</span>
            <h2 className="mt-1 text-3xl font-bold">What We Build</h2>
            <p className="mt-2 text-muted-foreground">
              Projects spanning autonomous developer infrastructure, multimodal AI, privacy tools, and education.
            </p>
          </div>
          <a
            href="https://github.com/orgs/FutureMindsDev/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-terracotta hover:underline"
          >
            All repositories on GitHub
            <span>→</span>
          </a>
        </div>

        <Stagger className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((proj) => (
            <StaggerItem
              key={proj.name}
              className={`flex flex-col justify-between rounded-2xl border p-6 shadow-sm transition-all ${
                proj.highlight
                  ? "border-violet/40 bg-gradient-to-br from-card to-violet/5 md:col-span-2"
                  : "border-border bg-card hover:border-terracotta/40"
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {proj.category}
                  </span>
                  {proj.highlight && (
                    <span className="rounded-full bg-violet/15 px-2.5 py-0.5 text-xs font-semibold text-violet">
                      Flagship Project
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-xl font-bold">{proj.name}</h3>
                <p className="text-xs font-medium text-amber mt-0.5">{proj.tagline}</p>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border/80 bg-background/60 px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-4">
                {proj.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-terracotta transition-colors"
                  >
                    {link.label}
                    <span>↗</span>
                  </a>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>

      {/* ======================================================== */}
      {/* 💡 CORE PHILOSOPHIES                                     */}
      {/* ======================================================== */}
      <Reveal className="mt-20">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Values</span>
          <h2 className="mt-1 text-3xl font-bold">Guiding Principles</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            How we decide what to build and why our products put human benefit first.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {coreValues.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60">
                {v.icon}
              </div>
              <h3 className="mt-4 font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ======================================================== */}
      {/* 💬 CONNECT & COLLABORATE                                 */}
      {/* ======================================================== */}
      <Reveal className="mt-20">
        <div className="rounded-3xl border border-border bg-gradient-to-r from-terracotta/10 via-amber/10 to-violet/10 p-8 sm:p-10 text-center shadow-sm">
          <h2 className="text-3xl font-bold tracking-tight">Have an idea or want to collaborate?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            We are always enthusiastic about partnering on open-source initiatives, experimental AI systems, or creative software that makes a difference.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:arkarchanmyae.dev@gmail.com"
              className="inline-flex h-11 items-center justify-center rounded-full bg-terracotta px-6 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
            >
              Reach Out via Email
            </a>
            <a
              href="https://github.com/FutureMindsDev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Explore GitHub Org
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
