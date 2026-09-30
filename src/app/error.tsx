"use client";

import Link from "next/link";
import { button, container } from "@/components/ui";
import { ui } from "@/content/site";

// Deliberately shows no error message or digest.
export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const t = ui.error;
  return (
    <main id="main-content" className={`${container} flex min-h-screen max-w-3xl flex-col justify-center py-16`}>
      <h1 className="text-heading-32 sm:text-heading-40">{t.heading}</h1>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={() => retry()} className={button("primary")}>
          {t.retry}
        </button>
        <Link href="/" className={button("secondary")}>
          {t.home}
        </Link>
      </div>
    </main>
  );
}
