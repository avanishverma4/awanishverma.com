import { nav, profile, socials, ui } from "@/content/site";

const link = "inline-flex min-h-11 items-center text-sm text-fg-secondary hover:text-fg";

export function Footer() {
  const t = ui.footer;
  return (
    <footer aria-labelledby="footer-heading" className="border-t border-line">
      <h2 id="footer-heading" className="sr-only">
        {t.heading}
      </h2>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-bold">
            <span aria-hidden="true" className="mr-2 font-mono text-accent-text">
              {ui.header.monogram}
            </span>
            {profile.name}
          </p>
          <p className="text-sm text-fg-muted">{t.tagline}</p>
          <p className="mt-3 text-sm text-fg-secondary">{profile.availability}</p>
        </div>
        <nav aria-label="Footer" className="contents">
          <div>
            <h3 className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-fg-muted">{t.index}</h3>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={link}>
                    {item.label} <span aria-hidden="true">↓</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-fg-muted">{t.elsewhere}</h3>
            <ul>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {s.label}
                    <span className="sr-only">{ui.newTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pb-8 text-xs text-fg-muted sm:px-6">
        <p>{t.copyright}</p>
        <a href="#hero" aria-label={t.topLabel} className="inline-flex min-h-11 items-center hover:text-fg">
          {t.top} ↑
        </a>
      </div>
    </footer>
  );
}
