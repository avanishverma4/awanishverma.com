import { nav, profile, ui } from "@/content/site";
import { ResumeButton } from "./ResumeButton";
import { ThemeToggle } from "./ThemeToggle";
import { button, card, container, iconButton } from "./ui";

const navLink = "inline-flex min-h-11 items-center rounded-md px-3 text-label-14 text-fg-secondary transition-colors hover:text-fg";

export function Header() {
  return (
    <header id="main-header" className="sticky top-0 z-40 border-b border-line bg-nav backdrop-blur">
      <div className={`${container} flex items-center justify-between gap-4 py-2`}>
        <a href="#hero" aria-label={ui.header.brandLabel} className="flex min-h-11 items-center gap-3 rounded-md">
          <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-md bg-inverse font-mono text-label-12 font-semibold text-on-inverse">
            {ui.header.monogram}
          </span>
          <span className="flex flex-col">
            <span className="text-heading-14">
              {profile.name} <span className="font-normal text-fg-secondary">{ui.header.tagline}</span>
            </span>
            <span className="hidden text-label-12 text-fg-secondary sm:block">{ui.header.status}</span>
          </span>
        </a>

        <nav aria-label={ui.header.navLabel} className="flex items-center gap-1">
          <ul className="hidden items-center md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <ResumeButton title={ui.header.resumeTitle} className={button("primary")}>
            <span className="hidden lg:inline">{ui.header.resume}</span>
            <span className="lg:hidden">{ui.header.resumeShort}</span>
          </ResumeButton>

          {/* Mobile menu: native disclosure, works without JavaScript. */}
          <details className="relative md:hidden">
            <summary aria-label={ui.header.openMenu} className={`${iconButton} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <div id="mobile-navigation" className={`${card} absolute right-0 mt-2 w-56 p-2 shadow-menu`}>
              <ul aria-label={ui.header.mobileNavLabel}>
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={`${navLink} w-full hover:bg-card-hover`}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ResumeButton className={`${button("primary")} mt-2 w-full`}>{ui.header.resumeMobile}</ResumeButton>
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
