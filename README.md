# awanishverma.com

Portfolio of Awanish Verma, UI/UX designer. Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and TypeScript. The site is fully static.

## Setup

Requires Node.js 20.9 or later (Node 24 LTS recommended).

```bash
npm ci
npm run dev    # http://localhost:3000
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build, including type checking |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check. Run after a build or `npx next typegen`, which generates route types such as `LayoutProps` |

## Where things live

- **Content:** `src/content/site.ts`. Every visible string, the projects, experience, skills, and metadata copy. Edit text here, not in components. The experience facts (`totalExperience`, `uiuxExperience`) are updated by hand.
- **Design tokens:** `src/app/globals.css`. Geist-based colour scales per theme, then semantic Tailwind tokens (`bg-page`, `text-fg`, `border-line`, `text-heading-32` …).
- **Shared styles:** `src/components/ui.ts` (button, card, badge, container).
- **Case study pages:** `/work/<slug>`, one static page per project in `src/content/site.ts` (`src/app/work/[slug]/page.tsx`, rendered by `src/components/CaseStudy.tsx`). Optional `problem`, `role`, and `process` fields on a project add their sections.
- **SQL case study images:** `public/images/sql/` (pages cropped from the documentation PDF in the `data_analytics_SQL_1` GitHub repository).
- **Hero canvas:** `public/images/khan/` (three sections of the Khan Academy home page redesign, cropped from the Behance case study; `home.jpg`, the full page, is no longer used), laid out by `HeroCanvas` in `src/components/HeroCanvas.tsx`.
- **Project notes:** `docs/`: audit of the original site, decisions log (`PROJECT_STATE.md`), hero image research, final report.

## Theme

Light and dark, following the OS by default. The choice is saved in `localStorage` (`av_portfolio_theme`) and applied before first paint by an inline script in `src/app/layout.tsx`.
