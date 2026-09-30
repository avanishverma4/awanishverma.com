# Project state

Audit: [docs/AUDIT.md](./AUDIT.md). Live site data snapshot: [docs/live-site-data.json](./live-site-data.json).

## Versions

- 2026-09-30 (chunk 1): live site runs Next.js 15.5.23 with bundled React 19.2.0-canary. Local Node v25.9.0, npm 11.12.1.

## Decisions

- 2026-09-30 (chunk 1): no source repository found. Awanish chose to rebuild from the live site (Chunk 1R).
- 2026-09-30 (chunk 1): git initialized. `PORTFOLIO_REDESIGN.md` and `.gitignore` committed on `main`. Work continues on `redesign/portfolio`.
- 2026-09-30 (chunk 1): saved the live site's data module verbatim as `docs/live-site-data.json`. It is the exact-copy source for the rebuild.

## Assumptions

- 2026-09-30 (chunk 1): the live site at ux-portfolio-self-nine.vercel.app is the current version of the portfolio. The Astro folder on the Desktop is a separate experiment and is ignored.

## Content gaps

- 2026-09-30 (chunk 1): all 14 project images are Unsplash stock photos, not Awanish's work.
- 2026-09-30 (chunk 1): awanishverma.com is not live yet (parked page).

## Removals

## Check results

- 2026-09-30 (chunk 1): build and `tsc` not run, because there is no source.

---

### Chunk 1R: rebuild (2026-09-30)

**Versions**
- Scaffolded with create-next-app 16.3.7: next 16.3.7, react 19.2.8, react-dom 19.2.8, tailwindcss ^4 (4.3.3 installed), @tailwindcss/postcss ^4, typescript ^5, eslint ^9, eslint-config-next 16.3.7, @types/react ^19, @types/node ^20. These are the scaffold's ranges. Chunk 3 pins exact versions.
- npm view on 2026-09-30: latest react is 19.3.0 and latest typescript is 7.0.2, but create-next-app 16.3.7 installs react 19.2.8 and typescript ^5. Chunk 3 decides whether to move.

**Decisions**
- Scaffolded in the scratchpad and copied in, because create-next-app refuses a non-empty folder. Kept the scaffold's `AGENTS.md`/`CLAUDE.md` (they point agents at `node_modules/next/dist/docs`).
- The content file is `src/content/site.ts`. It was generated verbatim from `docs/live-site-data.json`, plus the static UI strings from the audit.
- The live site's colour variables (light and dark) were copied into `src/app/globals.css` and mapped to Tailwind colours with `@theme inline`. Chunk 3 replaces them with Geist tokens.
- Font: Google Sans through `next/font/google`, as on the live site. The build warns: "Failed to find font override values for font `Google Sans`", so there is no size-adjusted fallback. Chunk 3 switches to Geist.
- Theme: class `dark` on `<html>`, set before paint by an inline script (per `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`). It uses the same `localStorage` key as the live site (`av_portfolio_theme`), follows the OS by default, and the toggle uses `useSyncExternalStore`.
- Navigation uses anchor links (`<a href="#projects">`) instead of the live site's scroll buttons. The targets are the same, and this adds no-JS and middle-click support.
- The mobile menu is a native `<details>` element. The experience accordion is native `<details>`, with the first role open (the live site's default is unknown).
- The CV and case-study modals use native `<dialog>` with `showModal()`, which gives a built-in focus trap and Escape handling. The CV dialog is a server component. Only the open and print buttons are client code.
- Project images stay hotlinked from Unsplash through `next/image`, as on the live site (`remotePatterns` for `images.unsplash.com`). Gallery images use `loading="eager"` because lazy loading never started inside the modal dialog (verified in the browser: `naturalWidth` 0 before the fix, 960 after).
- Error pages use Next 16's `retry` prop (per `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/error.md`). `global-error.tsx` imports `globals.css` and keeps a full-reload `<a href="/">` with an eslint-disable comment and the reason.
- The canonical URL, `robots`, and `sitemap` use `https://www.awanishverma.com`, as on the live site. Chunk 8 moves `metadataBase` to `https://awanishverma.com`.

**Removals** (live features not recreated)
- Token sandbox ("Design System Generator") in the hero. Chunk 5 deletes the hero anyway. **Awanish to confirm** whether he wants it back as a separate section later.
- Lenis smooth scrolling (replaced by CSS `scroll-behavior: smooth`, off under reduced motion), the Motion/Framer Motion animations, and the scroll progress bar.
- Skill category filter and search. Chunk 6 rebuilds the skills section as three groups.
- Case study image lightbox ("Enlarge…"). Gallery images show inline.
- "Reference" digest on error pages (the Rules forbid rendering digests). `error.tsx` copy beyond the recovered strings is new: the heading "Something went wrong".
- 404 copy: changed "the token sandbox" to "skills" in "Everything — case studies, experience, … — lives on a single page", because the sandbox no longer exists.
- `robots.txt`: dropped `Disallow: /api/` (there is no `/api`) and the non-standard `Host:` line.
- Sitemap: dropped the `lastmod` date and the image entry, to avoid a changing date.

**Check results** (real output)
- `npm run build`: exit 0. 10 static pages (`/`, `/_not-found`, `/apple-icon.png`, `/icon.png`, `/manifest.webmanifest`, `/opengraph-image.png`, `/robots.txt`, `/sitemap.xml`, `/twitter-image.png`). One warning: the Google Sans fallback font (above).
- `npx tsc --noEmit`: exit 0. It must run after `next build` or `next typegen`, which generate the global `LayoutProps` type. Before the first build it fails with "Cannot find name 'LayoutProps'".
- `npx eslint .`: first run 4 errors (`@next/next/no-html-link-for-pages` in the error and not-found pages). Fixed with `next/link`. Rerun: exit 0, no output.
- `next start`: `/` 200, `/nope` 404, all metadata routes 200. All live anchor IDs are present in the HTML.
- Browser (Chrome via browser-harness, production server):
  - dark by default
  - the toggle switches to light and saves `av_portfolio_theme=light`
  - one `h1`
  - the case study and CV dialogs open
  - gallery images load
  - no horizontal scroll at 1905px or 375px
  - 768/1440 not checked, keyboard walkthrough not run (Chunk 9 covers both)

---

### Chunk 2: hero image (2026-09-30)

**Decisions**
- Behance project pages return 403 to curl, so they were read with Chrome (browser-harness). The images were fetched to the scratchpad only.
- Recommended hero: the first row of the DOCTO (Doctor-Patient Management App) hi-fi screens. Details are in [HERO_IMAGE.md](./HERO_IMAGE.md).

**Content gaps**
- No desktop dashboard exists in the linked Behance projects. All UI is mobile.
- XpertOnline was a four-person group project related to Apollo Hospital. Awanish needs to confirm how to present it.
- The Plant App boards use lorem ipsum.
- The live impact metrics are not backed by the Behance content reviewed.
- Waiting on Awanish: the image choice and publishing permission.

**Check results**
- No build check in this chunk (docs only).

---

### Awanish's decisions (2026-09-30, between chunks 2 and 3)

- Hero image: the DOCTO hi-fi screens (recommended crop in HERO_IMAGE.md). I take the choice as confirmation that he may publish them.
- Token sandbox: remove completely. Verified with `grep -rniE "sandbox|token-|av_portfolio_tokens|accent_cache|Design System Generator" src/ next.config.ts README.md`: no sandbox code or keys remain. The only hit is unrelated case-study copy ("Token-driven theming…"). The 404 copy no longer mentions it (changed in 1R). AUDIT.md still describes the live sandbox as a historical record, since it is read-only.

### Chunk 3: foundation (2026-09-30)

**Versions** (pinned exact in package.json, checked with `npm view` on 2026-09-30)

| Package | Latest on npm | Installed | Note |
|---|---|---|---|
| next | 16.3.7 | 16.3.7 | |
| react / react-dom | 19.3.0 | 19.3.0 | next peer `^19.0.0` |
| typescript | 7.0.2 | **6.0.3** | see Decisions |
| @types/react / @types/react-dom | 19.3.0 | 19.3.0 | |
| @types/node | 26.6.3 | **24.19.0** | matches Vercel's default Node 24 LTS |
| tailwindcss / @tailwindcss/postcss | 4.3.3 | 4.3.3 | |
| eslint | 10.11.0 | **9.39.5** | see Decisions |
| eslint-config-next | 16.3.7 | 16.3.7 | |
| gsap / @gsap/react | 3.15.0 / 2.1.2 | not installed | Chunk 5 decides |

Node: local v25.9.0. Next 16.3.7 requires `>=20.9.0`, so the requirement is met.

**Decisions**
- TypeScript 6.0.3, not 7.0.2. Next 16.3.7 supports TS 7 through its default CLI checker (`node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/useTypeScriptCli.md`). But `eslint-config-next/typescript` depends on typescript-eslint, whose peer range is `typescript >=4.8.4 <6.1.0`, and TS 7 ships no JavaScript API (its `package.json` main export is only `lib/version.cjs`). 6.0.3 is the newest version all tools support. Revisit when typescript-eslint supports 7.
- ESLint 9.39.5, not 10.11.0. `eslint-plugin-react` (peer up to `^9.7`), `eslint-plugin-import` (up to `^9`), and `eslint-plugin-jsx-a11y` (up to `^9`) are bundled by eslint-config-next and do not declare ESLint 10 support.
- No major version of Next.js or Tailwind was crossed (already 16 and 4), so no upgrade guide or codemod applied. The React bump was a minor release (19.2.8 → 19.3.0). TS 5 → 6: the tsconfig uses `moduleResolution: bundler` and `target: ES2017`, and nothing needed changing (tsc passes).
- **Tokens:** `src/app/globals.css`.
  - Layer 1 holds the raw Geist scales per theme (`:root` light, `.dark`). The values were read from vercel.com/geist/colors CSS: gray 100–1000, background 100/200, blue 700/900.
  - Layer 2 holds the semantic Tailwind tokens in `@theme inline`: `page`, `subtle`, `card`, `card-hover`, `card-active`, `nav`, `line`, `line-subtle`, `line-hover`, `line-strong`, `fg`, `fg-secondary`, `fg-muted`, `accent`, `accent-text`, `accent-contrast`, `inverse`, `on-inverse`.
  - Type scale: Geist heading 56–14, copy 20–13, label 14–12, and button 14 as `text-*` utilities (values from the Geist typography CSS).
  - Radius: 4/6/12/16px (Geist material 6px base, 12px raised).
  - Shadows: `shadow-small`, `-medium`, `-menu`, `-modal`.
  - Spacing: Tailwind's 4px unit, plus `--container-page: 75rem`.
  - Focus: a 2px accent outline, offset 2px.
- Existing class names (`bg-page`, `text-fg`, `border-line`…) were kept as the semantic token names. The whole site therefore switched to the Geist palette with no markup changes.
- Adaptation, not a copy: dark `--background-100` is `#0a0a0a` (Geist uses `#000`), for slightly softer contrast against gray-100 surfaces. Text only uses gray-900 and gray-1000, since gray-800 (`#7d7d7d`) on white is about 4.1:1, below AA.
  - Contrast (computed): gray-900 `#4d4d4d` on `#fff` is about 8.4:1 and `#a0a0a0` on `#0a0a0a` about 7.9:1. Accent text `#0064e2` on `#fff` is about 5.3:1 and `#50a8ff` on `#0a0a0a` about 7.9:1. White on `#0070f7` is about 4.6:1.
- Fonts: Geist and Geist_Mono through `next/font/google` (variables `--font-geist-sans`/`--font-geist-mono`). This removes the Google Sans fallback warning.
- Theme behavior kept: light and dark with the toggle, following the OS by default.
- Content constants added to `src/content/site.ts`: `totalExperience = "11 years"` and `uiuxExperience = "8 years"`.
- Unused dependency removal: none. All installed packages are used (next/react, and TypeScript/ESLint/Tailwind tooling). The audit had no removable list.
- The build warns that Next.js ignored `/Users/awanishverma/package-lock.json`, a lockfile in the home folder outside this repo. Left untouched because it is not part of this project. Awanish may delete it if it's stale.

**Check results** (real output)
- `npm run build`: exit 0, `✓ Compiled successfully`, 10 static routes. Only warning: the home-directory lockfile note above.
- `npx tsc --noEmit`: exit 0.
- `npx eslint .`: exit 0, no output.

---

### Chunk 4: shared components (2026-09-30)

**Components**

| Candidate | Result | Where |
|---|---|---|
| Button | **Created** as a style helper, `button("primary" \| "secondary" \| "ghost")` plus `iconButton`, in `src/components/ui.ts`. It renders on `<a>`, `<Link>`, `<button>`, `<form method=dialog>` buttons, and the client ResumeButton/PrintButton, so a class helper keeps the native element instead of wrapping it. Primary uses the Geist inverted fill (`bg-inverse`). The touch target is `min-h-11` (44px) on mobile and 40px from `sm`. | header, dialogs, filters, error and 404 pages, skip link |
| Card | **Created** as a style helper, `card` / `interactiveCard`. It is used on `li > button`, `figure`, `a`, `section`, and `dialog`. | project cards, skill groups, testimonials, contact email, social links, mobile menu, case-study dialog |
| Badge | **Created** as a style helper, `badge`. | experience skill tags, case-study tech stack |
| SectionHeader | **Modified**: `SectionIntro.tsx` renamed to `SectionHeader.tsx` and restyled with `eyebrow` and `text-heading-32/40`. The emphasis word now uses `text-fg-secondary` instead of the accent, for restraint. | all five content sections |
| Navigation | **Modified**: `Header.tsx` and `Footer.tsx` restyled with tokens and helpers. Already separate components with their own responsibility. | header, footer |
| Also shared | `container` (page width, `max-w-page` 75rem), `eyebrow`, `textLink` in `ui.ts` | all sections |
| Skipped | none | — |

**Decisions**
- Class helpers instead of wrapper components: the Button, Card, and Badge patterns each appear on 4–6 different element types. Wrapper components would need a polymorphic `as` prop, and helpers are simpler (KISS).
- The CV dialog replaced its hardcoded Tailwind `zinc`/`emerald` colours with tokens. The new `.theme-light` class forces the light scale inside a dark page (`:root, .dark .theme-light` in globals.css), so the printable CV stays black on white.
- The project filter's "pressed" state uses an inverted fill (`aria-pressed:bg-inverse`), and the active tab uses a `border-fg` underline instead of the blue accent.
- The mobile header hides the "Available for contract and senior roles" line below `sm` (`hidden sm:block`) to fit the logo, theme toggle, and menu at 375px. The text is still in the CV and the hero. Logged as a small visibility change, not a removal.
- Copy: no wording changed. All section copy was already in `src/content/site.ts` (moved there verbatim in 1R).
- The hero (`Hero.tsx`) was not touched. It still uses the retired `accent-solid`/`fg-muted` classes. Chunk 5 replaces it.

**Scan for hardcoded values** (`grep -rnE '#[0-9a-fA-F]{3,8}\b|zinc|emerald|text-\[|tracking-\[|p[xy]?-\[|m[xy]?-\[|gap-\[|text-(xs|sm|base|lg|xl|2xl|3xl|4xl)\b|fg-muted|accent-solid' src/components src/app`, excluding Hero.tsx and globals.css):
- The only hits are literal theme colours in `layout.tsx` `viewport.themeColor` and `manifest.ts`, which must be literal strings for metadata. The manifest still says `#050505`; Chunk 8 aligns it.

**Check results** (real output)
- `npm run build`: exit 0.
- `npx tsc --noEmit`: exit 0.
- `npx eslint .`: exit 0.
- Browser at 1440px: header, hero, dark theme, and the light-scoped CV dialog render as expected (screenshots checked).

---

### Chunk 5: hero (2026-09-30)

**Image**
- Awanish's choice: DOCTO hi-fi screens.
- Downloaded `https://mir-s3-cdn-cf.behance.net/project_modules/fs/6725dd221640093.67d84825d10d3.jpg` (1720×32768, 4.86 MB, HTTP 200) and cropped with `sips --cropOffset 26680 2 -c 840 1716`. The crop was checked visually: the first row of four phones, matching the crop recorded in HERO_IMAGE.md. Saved as `public/images/docto-hi-fi-screens.jpg` (1716×840, JPEG q85, 221 KB).
- `next/image` with explicit `width`/`height` and `sizes="(min-width: 1200px) 1152px, calc(100vw - 32px)"`. `preload` is used, not the deprecated `priority` (per `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`: "the `priority` property has been deprecated in favor of the `preload` property"). It is a single above-the-fold LCP image, and the preload `<link>` was confirmed in the HTML.
- The alt text describes the four screens and makes no outcome claims. The caption names the project.

**Old hero inventory and what happened to each item**

| Old hero item | New hero |
|---|---|
| "01 Open to work" eyebrow | Kept as the status eyebrow "Open to work" (the "01" index dropped: the hero is not a numbered section) |
| sr-only h1 "Awanish Verma — UI/UX Designer & Design Systems Architect, Bengaluru" | The visible h1 now holds the name and the role "UI/UX Designer & Design Systems Architect". "Bengaluru" dropped from the h1; it is in the contact section and CV |
| Visible heading "Complex problems, shaped into clear, human-centered products." | Kept as the one-line summary |
| `profile.shortBio` ("Crafting intuitive product experiences…") | **Removed from the hero.** It uses the banned word "crafting" and repeats the summary. It stays in the data (used by the old OG image) |
| Focus tags (User research, Token pipelines, Interaction architecture, Design systems) | Kept |
| "Explore selected work" → `#projects` | Now "View selected work" → `#projects` (label per the chunk spec) |
| "Resume" button (opens CV) | **Removed from the hero.** The header CV / Resume button opens the same dialog at every width |
| Stat "7+ Years Experience" | **Replaced** with the fixed facts "11 years · Professional experience" and "8 years · UI/UX design" from `totalExperience`/`uiuxExperience` |
| Stats "24+ UI/UX & Systems Built", "150+ User Testing Studies", "14+ Design Token Systems" | **Removed from the hero.** Not in the chunk spec, and not supported by the Behance work reviewed in Chunk 2. The data stays in `profile.stats`. **Awanish to confirm** whether to restore them |
| Connect: GitHub, LinkedIn, Behance | GitHub and LinkedIn kept in the Connect row. Behance is now the secondary action "Open Behance profile" |
| Token sandbox card | Removed (Awanish's decision, already out of the code since 1R) |

**Decisions**
- No animation (the default). gsap and @gsap/react are not installed.
- New token `--color-media: #fff` gives the screenshot a fixed white backing in both themes, since the export has a white background. Retired `fg-muted`, `accent-solid`, and `accent-contrast` (no remaining users).
- Header CV button: removed the conflicting `hidden sm:inline-flex` (it was showing anyway because of the class order). It fits at 375px and stays visible at every width.
- New hero copy (labels only): "Professional experience", "UI/UX design", "Open Behance profile", "View selected work", "Focus areas" (list label), and the figure caption.

**Check results** (real output)
- `npm run build`: exit 0. `npx tsc --noEmit`: exit 0. `npx eslint .`: exit 0.
- Browser, production server:

| Width | Page width / viewport | h1 count | Image loaded (variant) |
|---|---|---|---|
| 375 | 375/375 | 1 | yes (w=384) |
| 768 | 753/753 | 1 | yes (w=750) |
| 1440 | 1425/1425 | 1 | yes (w=1200) |

No horizontal scroll at any width. Screenshots checked at 375 and 1440.
