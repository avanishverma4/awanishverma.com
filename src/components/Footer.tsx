import { nav, profile, socials, ui } from "@/content/site";
import { SectionLink } from "./SectionLink";
import { container, eyebrow } from "./ui";

const link = "inline-flex min-h-11 items-center text-label-14 text-fg-secondary transition-colors hover:text-fg";

export function Footer({ home }: { home: boolean }) {
  const t = ui.footer;
  return (
    <footer aria-labelledby="footer-heading" className="border-t border-line">
      <h2 id="footer-heading" className="sr-only">
        {t.heading}
      </h2>
      {/* Below md the two link lists sit side by side under the name. */}
      <div className={`${container} grid grid-cols-2 gap-10 py-12 md:grid-cols-3`}>
        <div className="max-md:col-span-2">
          <p className="text-heading-16">{profile.name}</p>
          <p className="text-label-14 text-fg-secondary">{t.tagline}</p>
          <p className="mt-3 text-copy-14 text-fg-secondary">{profile.availability}.</p>
        </div>
        <nav aria-label="Footer" className="contents">
          <div>
            <h3 className={`${eyebrow} mb-2`}>{t.index}</h3>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <SectionLink home={home} href={item.href} className={link}>
                    {item.label}
                  </SectionLink>
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
      {/* The rule sits on the inner row so it lines up with the content, not the container padding. */}
      <div className={container}>
        <div className="flex items-center justify-between border-t border-line-subtle py-4 text-label-13 text-fg-secondary">
          <p>{t.copyright}</p>
          {/* On a case study page the top of the page is its own main content. */}
          <a href={home ? "#hero" : "#main-content"} aria-label={t.topLabel} className="inline-flex min-h-11 items-center transition-colors hover:text-fg">
            {t.top} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
