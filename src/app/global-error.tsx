"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useSyncExternalStore } from "react";
import { button, eyebrow } from "@/components/ui";
import { themeStorageKey, ui } from "@/content/site";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

// Same rule as the theme script in layout.tsx, which does not run here.
function prefersDark() {
  try {
    const saved = localStorage.getItem(themeStorageKey);
    return saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

// Replaces the root layout when it fails, so it renders its own <html> and <body>,
// imports the global stylesheet, and loads its own fonts.
export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const t = ui.globalError;
  const dark = useSyncExternalStore(() => () => {}, prefersDark, () => false);
  return (
    <html lang="en" className={`${dark ? "dark" : ""} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <title>{t.title}</title>
        <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-4 py-16 sm:px-6">
          <p className={eyebrow}>{t.code}</p>
          <h1 className="mt-3 text-heading-32 sm:text-heading-40">{t.heading}</h1>
          <p className="mt-4 text-copy-16 text-fg-secondary">{t.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => retry()} className={button("primary")}>
              {ui.error.retry}
            </button>
            {/* Full reload on purpose: the root layout failed, so client navigation cannot recover. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className={button("secondary")}>
              {ui.error.home}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
