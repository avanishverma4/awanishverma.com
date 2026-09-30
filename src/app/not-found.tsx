import Link from "next/link";
import { nav, profile, ui } from "@/content/site";

export default function NotFound() {
  const t = ui.notFound;
  return (
    <main id="main-content" className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-16 sm:px-6">
      <p className="font-mono text-sm text-fg-muted">
        {profile.name} · {ui.footer.tagline}
      </p>
      <p className="mt-10 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-text">
        {t.code} {t.title}
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">{t.heading}</h1>
      <p className="mt-4 text-fg-secondary">{t.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="inline-flex min-h-11 items-center rounded-md bg-accent-solid px-5 text-sm font-medium text-accent-contrast">
          {t.home}
        </Link>
        <Link href="/#projects" className="inline-flex min-h-11 items-center rounded-md border border-line px-5 text-sm font-medium">
          {t.work}
        </Link>
      </div>
      <nav aria-label={ui.footer.index} className="mt-12">
        <ul className="flex flex-wrap gap-4">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={`/${item.href}`} className="inline-flex min-h-11 items-center text-sm text-fg-secondary hover:text-fg">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
