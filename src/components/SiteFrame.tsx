import type { ReactNode } from "react";
import { ui } from "@/content/site";
import { CardReveal } from "./CardReveal";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HoverMotion } from "./HoverMotion";
import { ResumeDialog } from "./ResumeDialog";
import { button } from "./ui";

// What every page shares: skip link, header, the main landmark, footer, the CV dialog, and card and hover motion.
// `home` is true on the home page, where section links are in-page anchors.
// `marked` is the section link the header shows as current on other pages: Work on a case study.
export function SiteFrame({ home = false, marked = "#projects", children }: { home?: boolean; marked?: string | null; children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className={`${button("primary")} sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50`}
      >
        {ui.skipLink}
      </a>
      <Header home={home} marked={marked} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer home={home} />
      <ResumeDialog />
      <HoverMotion />
      <CardReveal />
    </>
  );
}
