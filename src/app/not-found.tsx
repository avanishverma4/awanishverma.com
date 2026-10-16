import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/SiteFrame";
import { button, container, eyebrow } from "@/components/ui";
import { profile, ui } from "@/content/site";

// Its own tab title, no canonical URL (the root layout's is the home page), and no "index" robots
// tag beside the "noindex" that Next.js adds to a 404.
export const metadata: Metadata = {
  title: `${ui.notFound.title} — ${profile.name}`,
  alternates: {},
  robots: { index: false, follow: true },
};

// Inside the site frame, so the header, footer, theme toggle and CV are all one press away.
export default function NotFound() {
  const t = ui.notFound;
  return (
    <SiteFrame marked={null}>
      <section aria-labelledby="not-found-heading" className={`${container} flex min-h-[60vh] flex-col justify-center py-16`}>
        <p className={eyebrow}>
          {t.code} {t.title}
        </p>
        <h1 id="not-found-heading" className="mt-3 text-heading-32 sm:text-heading-40">
          {t.heading}
        </h1>
        <p className="mt-4 max-w-2xl text-copy-16 text-fg-secondary">{t.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" data-hover="magnetic" className={button("primary")}>
            {t.home}
          </Link>
          <Link href="/#projects" data-hover="magnetic" className={button("secondary")}>
            {t.work}
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
