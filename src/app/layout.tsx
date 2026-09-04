import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Outfit — soft, rounded, friendly geometric sans. Matches the cozy-core vibe.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lazy-issue-resolver-site.vercel.app"),
  title: {
    default: "LazyDev — AI-native autonomous issue resolver",
    template: "%s · LazyDev",
  },
  description:
    "LazyDev monitors your GitHub issues, generates validated code fixes with a multi-agent AI pipeline, and opens pull requests automatically. Self-host for free or use our hosted service.",
  keywords: [
    "AI issue resolver",
    "automated bug fixing",
    "GitHub bot",
    "CI assistant",
    "LangGraph",
    "multi-agent",
    "pull request automation",
  ],
  openGraph: {
    title: "LazyDev — AI-native autonomous issue resolver",
    description:
      "Monitors GitHub issues, generates validated fixes, and opens PRs. Self-host free or use our hosted service.",
    type: "website",
    url: "https://github.com/FutureMindsDev/lazy-issue-resolver",
    images: [
      {
        url: "/lazydev-hero.jpeg",
        width: 2752,
        height: 1536,
        alt: "A developer sleeping peacefully on a bed next to a laptop that is running code during the day.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LazyDev — AI-native autonomous issue resolver",
    description:
      "Monitors GitHub issues, generates validated fixes, and opens PRs. Self-host free or use our hosted service.",
    images: ["/lazydev-hero.jpeg"],
  },
};

// Inline script runs before paint to set the correct theme class, preventing FOUC.
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
