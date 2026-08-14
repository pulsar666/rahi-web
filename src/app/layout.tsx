import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = "https://drivewithrahi.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Rahi — Know how you drive",
    template: "%s · Rahi",
  },
  description:
    "Rahi turns your phone into a driving coach. Record a drive, get a skill score across six axes, and replay the exact moments that shaped it.",
  applicationName: "Rahi",
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Rahi",
    title: "Rahi — Know how you drive",
    description:
      "Record a drive. Get a skill score across six axes, coaching tied to real moments, and warnings for rough road ahead.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahi — Know how you drive",
    description:
      "Record a drive. Get a skill score, coaching tied to real moments, and warnings for rough road ahead.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Both themes are declared so mobile browser chrome matches the palette
  // the viewer actually resolves to.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#f8f8f6" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload only the two weights above the fold (700 for the headline,
            300 for body copy). Preloading all five would compete with the
            page's own CSS/JS for bandwidth on a slow connection and make the
            first paint LATER, not sooner. */}
        <link
          rel="preload"
          href="/fonts/sora-bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/sora-light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
