import { nav, profile, ui } from "@/content/site";
import { ResumeButton } from "./ResumeButton";
import { ThemeToggle } from "./ThemeToggle";

const navLink = "inline-flex min-h-11 items-center px-3 text-sm text-fg-secondary hover:text-fg";

export function Header() {
  return (
    <header id="main-header" className="sticky top-0 z-40 border-b border-line bg-nav backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#hero" aria-label={ui.header.brandLabel} className="flex min-h-11 items-center gap-3">
          <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-md border border-accent font-mono text-xs font-bold text-accent-text">
            {ui.header.monogram}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] text-fg-muted">{ui.header.status}</span>
            <span className="text-sm font-bold">
              {profile.name} <span className="font-normal text-fg-muted">{ui.header.tagline}</span>
            </span>
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
          <ResumeButton
            title={ui.header.resumeTitle}
            className="hidden min-h-11 items-center rounded-md bg-accent-solid px-4 font-mono text-xs font-medium text-accent-contrast hover:opacity-90 sm:inline-flex"
          >
            <span className="hidden lg:inline">{ui.header.resume}</span>
            <span className="lg:hidden">{ui.header.resumeShort}</span>
          </ResumeButton>

          {/* Mobile menu: native disclosure, works without JavaScript. */}
          <details className="relative md:hidden">
            <summary
              aria-label={ui.header.openMenu}
              className="flex size-11 cursor-pointer list-none items-center justify-center rounded-md border border-line [&::-webkit-details-marker]:hidden"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <div id="mobile-navigation" className="absolute right-0 mt-2 w-56 rounded-lg border border-line bg-card p-2 shadow-lg">
              <ul aria-label={ui.header.mobileNavLabel}>
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={`${navLink} w-full rounded-md hover:bg-card-hover`}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ResumeButton className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-accent-solid font-mono text-xs font-medium text-accent-contrast">
                {ui.header.resumeMobile}
              </ResumeButton>
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
