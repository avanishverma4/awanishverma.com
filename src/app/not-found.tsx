import Link from "next/link";
import { button, eyebrow } from "@/components/ui";
import { nav, profile, ui } from "@/content/site";

export default function NotFound() {
  const t = ui.notFound;
  return (
    <main id="main-content" className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-4 py-16 sm:px-6">
      <p className="text-label-14 text-fg-secondary">
        {profile.name} · {ui.footer.tagline}
      </p>
      <p className={`${eyebrow} mt-10`}>
        {t.code} {t.title}
      </p>
      <h1 className="mt-3 text-heading-32 sm:text-heading-40">{t.heading}</h1>
      <p className="mt-4 text-copy-16 text-fg-secondary">{t.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={button("primary")}>
          {t.home}
        </Link>
        <Link href="/#projects" className={button("secondary")}>
          {t.work}
        </Link>
      </div>
      <nav aria-label={ui.footer.index} className="mt-12">
        <ul className="flex flex-wrap gap-4">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={`/${item.href}`} className="inline-flex min-h-11 items-center text-label-14 text-fg-secondary hover:text-fg">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
