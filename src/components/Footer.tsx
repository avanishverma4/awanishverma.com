import { nav, profile, socials, ui } from "@/content/site";
import { container, eyebrow } from "./ui";

const link = "inline-flex min-h-11 items-center text-label-14 text-fg-secondary transition-colors hover:text-fg";

export function Footer() {
  const t = ui.footer;
  return (
    <footer aria-labelledby="footer-heading" className="border-t border-line">
      <h2 id="footer-heading" className="sr-only">
        {t.heading}
      </h2>
      <div className={`${container} grid gap-10 py-12 md:grid-cols-3`}>
        <div>
          <p className="text-heading-16">{profile.name}</p>
          <p className="text-label-14 text-fg-secondary">{t.tagline}</p>
          <p className="mt-3 text-copy-14 text-fg-secondary">{profile.availability}</p>
        </div>
        <nav aria-label="Footer" className="contents">
          <div>
            <h3 className={`${eyebrow} mb-2`}>{t.index}</h3>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={`${eyebrow} mb-2`}>{t.elsewhere}</h3>
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
      <div className={`${container} flex items-center justify-between border-t border-line-subtle py-4 text-label-13 text-fg-secondary`}>
        <p>{t.copyright}</p>
        <a href="#hero" aria-label={t.topLabel} className="inline-flex min-h-11 items-center transition-colors hover:text-fg">
          {t.top} ↑
        </a>
      </div>
    </footer>
  );
}
