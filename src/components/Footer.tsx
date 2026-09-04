import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 font-semibold">
              <Image
                src="/LazyDev-icon.jpeg"
                alt="LazyDev logo"
                width={128}
                height={128}
                sizes="32px"
                className="h-8 w-8 rounded-2xl border border-border object-cover shadow-sm"
              />
              LazyDev
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              AI-native autonomous CI engineering assistant that monitors GitHub
              issues, generates validated fixes, and opens PRs.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Pages</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li><Link href="/how-it-works" className="hover:text-foreground">How it works</Link></li>
              <li><Link href="/get-started" className="hover:text-foreground">Get started</Link></li>
              <li><Link href="/self-host" className="hover:text-foreground">Self-host</Link></li>
              <li><Link href="/hosted" className="hover:text-foreground">Hosted</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://github.com/FutureMindsDev/lazy-issue-resolver" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  GitHub repository
                </a>
              </li>
              <li>
                <a href="https://github.com/apps/lazydev-issue-resolver" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  Install GitHub App
                </a>
              </li>
              <li>
                <a href="https://github.com/FutureMindsDev/lazy-issue-resolver/issues" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  Report an issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>LazyDev is MIT-licensed. The hosted service is operated by the LazyDev team under separate terms.</p>
        </div>
      </div>
    </footer>
  );
}
