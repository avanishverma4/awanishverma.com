"use client";

import Link from "next/link";
import { ui } from "@/content/site";

// Deliberately shows no error message or digest.
export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const t = ui.error;
  return (
    <main id="main-content" className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t.heading}</h1>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={() => retry()} className="inline-flex min-h-11 items-center rounded-md bg-accent-solid px-5 text-sm font-medium text-accent-contrast">
          {t.retry}
        </button>
        <Link href="/" className="inline-flex min-h-11 items-center rounded-md border border-line px-5 text-sm font-medium">
          {t.home}
        </Link>
      </div>
    </main>
  );
}
