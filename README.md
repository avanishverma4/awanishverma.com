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
- **Hero canvas:** `public/images/docto/` (four DOCTO screens cropped from the Behance case study), laid out by `ScreenCanvas` in `src/components/Hero.tsx`.
- **Project notes:** `docs/`: audit of the original site, decisions log (`PROJECT_STATE.md`), hero image research, final report.

## Theme

Light and dark, following the OS by default. The choice is saved in `localStorage` (`av_portfolio_theme`) and applied before first paint by an inline script in `src/app/layout.tsx`.
