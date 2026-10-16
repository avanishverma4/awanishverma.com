import { profile, ui } from "@/content/site";
import { MobileMenu } from "./MobileMenu";
import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { ResumeButton } from "./ResumeButton";
import { ThemeToggle } from "./ThemeToggle";
import { button, container, iconButton, raisedCard } from "./ui";

const navLink =
  "inline-flex min-h-11 items-center rounded-md px-3 text-label-14 text-fg-secondary transition-colors hover:text-fg aria-[current=location]:text-fg";
// Desktop: the current section also gets an underline that draws in from the left.
const navLinkDesktop = `${navLink} relative after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-fg after:transition-transform after:duration-300 motion-reduce:after:transition-none aria-[current=location]:after:scale-x-100`;

// `home`: on the home page the brand and section links are in-page anchors and the nav tracks the
// section being read; on a case study page they lead back to the home page and Work is marked.
// `marked` is the section link shown as current on a page other than the home page.
export function Header({ home, marked }: { home: boolean; marked: string | null }) {
  const brandClass = "flex min-h-11 items-center gap-3 rounded-md";
  const brand = (
    <>
      <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-md bg-inverse font-mono text-label-12 font-semibold text-on-inverse">
        {ui.header.monogram}
      </span>
      {/* The role shows from lg only, so the name stays on one line beside the nav and buttons. */}
      <span className="whitespace-nowrap text-heading-14">
        {profile.name} <span className="font-normal text-fg-secondary max-lg:hidden">{ui.header.tagline}</span>
      </span>
    </>
  );
  return (
    <header id="main-header" className="sticky top-0 z-40 border-b border-line bg-nav backdrop-blur">
      {/* gap-2 below sm: at 320px the brand, theme toggle, CV button and menu only just fit. */}
      <div className={`${container} flex items-center justify-between gap-2 py-2 sm:gap-4`}>
        {home ? (
          <a href="#hero" aria-label={ui.header.brandLabel} className={brandClass}>
            {brand}
          </a>
        ) : (
          <Link href="/" aria-label={ui.header.homeLabel} className={brandClass}>
            {brand}
          </Link>
        )}

        <nav aria-label={ui.header.navLabel} className="flex items-center gap-1">
          <NavLinks home={home} marked={marked} className="hidden items-center md:flex" linkClassName={navLinkDesktop} />
          <ThemeToggle />
          {/* Secondary: the hero's "View selected work" is the one primary action in the first viewport. */}
          <ResumeButton title={ui.header.resumeTitle} className={button("secondary")}>
            <span className="hidden lg:inline">{ui.header.resume}</span>
            <span className="lg:hidden">{ui.header.resumeShort}</span>
          </ResumeButton>

          <MobileMenu
            openLabel={ui.header.openMenu}
            closeLabel={ui.header.closeMenu}
            summaryClassName={`${iconButton} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
          >
            <div id="mobile-navigation" className={`${raisedCard} absolute right-0 mt-2 w-56 p-2 shadow-menu`}>
              <NavLinks
                home={home}
                marked={marked}
                label={ui.header.mobileNavLabel}
                linkClassName={`${navLink} w-full hover:bg-card-hover aria-[current=location]:bg-card-hover`}
              />
              <ResumeButton className={`${button("secondary")} mt-2 w-full`}>{ui.header.resumeMobile}</ResumeButton>
            </div>
          </MobileMenu>
        </nav>
      </div>
    </header>
  );
}
