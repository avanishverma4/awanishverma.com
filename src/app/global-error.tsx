"use client";

import { button, container, eyebrow } from "@/components/ui";
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
        <main className={`${container} flex min-h-screen max-w-3xl flex-col justify-center py-16`}>
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
