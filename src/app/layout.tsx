import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile, siteUrl, themeStorageKey, ui } from "@/content/site";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: ui.meta.title,
  description: ui.meta.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  keywords: ui.meta.keywords,
  category: "Design",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "profile",
    title: ui.meta.title,
    description: ui.meta.description,
    url: "/",
    siteName: ui.meta.siteName,
    locale: "en_US",
    firstName: "Awanish",
    lastName: "Verma",
    username: "awanishverma",
  },
  twitter: {
    card: "summary_large_image",
    site: ui.meta.twitter,
    creator: ui.meta.twitter,
    title: ui.meta.title,
    description: ui.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark light",
};

// Runs before first paint: saved choice wins, otherwise follow the OS setting.
const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(themeStorageKey)});var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
