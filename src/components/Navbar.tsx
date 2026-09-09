import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/get-started", label: "Get started" },
  { href: "/self-host", label: "Self-host" },
  { href: "/hosted", label: "Hosted" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Image
            src="/LazyDev-icon.jpeg"
            alt="LazyDev logo"
            width={128}
            height={128}
            sizes="36px"
            className="h-9 w-9 rounded-2xl border border-border object-cover shadow-sm"
          />
          <span>LazyDev</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-sm font-medium transition-all hover:bg-muted hover:border-foreground/20 hover:text-foreground shadow-xs"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            About Us
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
