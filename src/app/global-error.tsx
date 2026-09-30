"use client";

import { ui } from "@/content/site";
import "./globals.css";

// Replaces the root layout, so it renders its own <html> and <body> and imports styles itself.
// It follows the OS colour scheme because the theme script in layout.tsx does not run here.
export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const t = ui.globalError;
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <title>{t.title}</title>
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-16 sm:px-6">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-text">{t.code}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">{t.heading}</h1>
          <p className="mt-4 text-fg-secondary">{t.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => retry()} className="inline-flex min-h-11 items-center rounded-md bg-accent-solid px-5 text-sm font-medium text-accent-contrast">
              {ui.error.retry}
            </button>
            {/* Full reload on purpose: the root layout failed, so client navigation cannot recover. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="inline-flex min-h-11 items-center rounded-md border border-line px-5 text-sm font-medium">
              {ui.error.home}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
