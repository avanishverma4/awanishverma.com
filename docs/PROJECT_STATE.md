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

---

### Chunk 6: skills (2026-09-30)

**Placement of every original skill** (names quoted from AUDIT §10)

| Original skill (live group) | New group |
|---|---|
| Figma & Design Systems (UI/UX & Product Design) | UI/UX Design |
| User Research & Testing (UI/UX & Product Design) | UI/UX Design |
| Interaction Design & Wireframes (UI/UX & Product Design) | UI/UX Design |
| Visual Design & Typography (UI/UX & Product Design) | UI/UX Design |
| Micro-Interactions & Motion (UI/UX & Product Design) | UI/UX Design |
| Design Token Specification (Design Systems & Token Architecture) | UI/UX Design |
| Component Library Specs (Design Systems & Token Architecture) | UI/UX Design |
| Accessibility (WCAG 2.1 AA/AAA) (Design Systems & Token Architecture) | UI/UX Design |
| Design-to-Code Pipeline (Design Systems & Token Architecture) | UI/UX Design |
| React 19 / Next.js 15 (Frontend Implementation) | Frontend Development (4th group) |
| Tailwind CSS v4 & Modern CSS (Frontend Implementation) | Frontend Development (4th group) |
| TypeScript & UI State (Frontend Implementation) | Frontend Development (4th group) |

New tools: Video Editing (DaVinci Resolve, Adobe After Effects, Adobe Premiere Pro) and Data Analytics (Microsoft Excel, Power BI, SQL, Python).

**Decisions**
- The three frontend skills fit none of the three required groups, so they went into a fourth group per the Rules ("add a fourth group… rather than forcing it into a wrong group"). It is named **"Frontend Development"** rather than the placeholder "Other tools", because the Copy rules require headings that state a section's purpose. Logged as a naming choice.
- Duplicates: none in the skills section. "Adobe Creative Suite (Photoshop, Illustrator, After Effects)" appears only in the CV's Core Skills keyword line (a separate list, unchanged), so no skill was merged.
- Each existing skill keeps its live name and its detail line (the live "highlight" text). New tools have no detail line, to avoid inventing claims.
- One-line scope per group describes what the tools are for, with no claims about projects or levels.
- **Removed** proficiency numbers (98, 94…) and per-tool years ("7 yrs"…), as the chunk rules require.
- **Removed** the stats row ("Disciplines 12", "Practice areas 3", "Years hands-on 7+"): the counts were wrong after regrouping, and "Years hands-on 7+" conflicted with the fixed facts.
- **Removed** the "{n} disciplines" labels and the group index numbers.
- Intro copy: "7+ years spanning…" became `${uiuxExperience} spanning…` ("8 years spanning…"). The sentence is about design work, so it uses the UI/UX constant.
- Data: `skillGroups` in `src/content/site.ts` (type `SkillGroup { name, scope, skills: { name, detail? }[] }`). The old `skillCategories` with level/years was deleted from the content file. The live values remain in `docs/live-site-data.json` for reference.
- Components: `src/components/Skills.tsx` has one shared `SkillItem`, one shared `SkillGroupCard`, and `SkillsSection`. It was removed from `Sections.tsx`.
- Layout: the first group spans three rows on `md+`, and the other three stack beside it (avoids a large gap). Single column on mobile.
- Anchors: the section keeps `#skills` and `#skills-heading` (h2). The group h3 IDs changed to `skills-ui-ux-design`, `skills-frontend-development`, `skills-video-editing`, and `skills-data-analytics`. Nothing linked to the old group IDs (AUDIT §4).

**Check results** (real output)
- `npm run build`: exit 0. `npx tsc --noEmit`: exit 0. `npx eslint .`: exit 0.
- `grep -rnE "yrs|\.level|experienceYears|disciplines" src`: no matches.
- Browser: four groups with 9/3/3/4 items. Page width 1425/1425 at 1440 and 375/375 at 375. Screenshot checked.

---

### Chunk 7: copy pass and error pages (2026-09-30)

**Part A: copy.** Every changed string is below (46 changes, all in `src/content/site.ts`). The "before" values come from the audit and live data.

| Where | Before | After |
|---|---|---|
| Header: CV button title | `resumeTitle: "View formatted curriculum vitae"` | `resumeTitle: "View CV"` |
| Header: CV button | `resume: "CV / Resume"` | `resume: "View CV"` |
| Header: mobile CV button | `resumeMobile: "View CV / Resume"` | `resumeMobile: "View CV"` |
| Projects: index | `index: "02", eyebrow: "Selected case studies"` | `index: "01", eyebrow: "Selected work"` |
| Projects: heading | `heading: "Crafted for user delight, accessibility, and ", headingEmphasis: "design clarity"` | `heading: "Product, mobile, and web ", headingEmphasis: "case studies"` |
| Case study: label | `label: "Case Study"` | `label: "Case study"` |
| Case study: outcome label | `outcome: "Key business / product outcome"` | `outcome: "Outcome"` |
| Case study: tab 1 | `overview: "Overview & Scope"` | `overview: "Overview"` |
| Case study: tab 2 | `architecture: "Architecture & Tech"` | `architecture: "Process and tools"` |
| Case study: tab 3 | `features: "Key Features"` | `features: "Features"` |
| Case study: tab 4 | `gallery: "Visual Gallery"` | `gallery: "Gallery"` |
| Case study: tools heading | `technologies: "Technologies & frameworks"` | `technologies: "Tools and methods"` |
| Case study: process heading | `process: "Process & system overview"` | `process: "Process"` |
| Case study: features heading | `capabilities: "Key capabilities"` | `capabilities: "Key features"` |
| Case study: source link | `sourceCode: "Source code"` | `sourceCode: "View source code"` |
| Case study: external link | `viewLive: "View live case study",` | `viewBehance: "Open case study on Behance", viewLive: "Open live site",` |
| Experience: index | `index: "03", eyebrow: "Career history"` | `index: "02", eyebrow: "Experience"` |
| Experience: heading | `heading: "Professional journey & ", headingEmphasis: "impact"` | `heading: "Roles and ", headingEmphasis: "outcomes"` |
| Skills: index (numbering only) | `index: "04", eyebrow: "Craft & capability"` | `index: "03", eyebrow: "Craft & capability"` |
| Testimonials: index and label | `index: "05", eyebrow: "Endorsements & peer reviews"` | `index: "04", eyebrow: "Testimonials"` |
| Testimonials: heading | `heading: "Trusted by founders & ", headingEmphasis: "engineering leaders"` | `heading: "Feedback from company ", headingEmphasis: "leaders"` |
| Contact: index and label | `index: "06", eyebrow: "Availability & contact"` | `index: "05", eyebrow: "Contact"` |
| Contact: heading | `heading: "Let's discuss your ", headingEmphasis: "next digital product"` | `heading: "Email me about your ", headingEmphasis: "project"` |
| Contact: intro | `"I take on work where design decisions still matter — early product vision, systems that need structure, teams that need direction. Tell me what you're building and where it's stuck; a paragraph is plenty to start."` | `"I take on work where design decisions still matter: early product vision, systems that need structure, and teams that need direction. Tell me what you're building and where it's stuck. A paragraph is enough to start."` |
| Contact: email title | `emailTitle: "Direct email"` | `emailTitle: "Email"` |
| Contact: email note | `emailNote: "No forms"` | `emailNote: "No contact form"` |
| Profile: availability (contact, footer) | `"availability": "Available for Product Design Contracts & UI/UX Design System Advisory"` | `"availability": "Available for product design contracts and design system advisory."` |
| Footer: nav heading | `index: "Index", elsewhere: "Elsewhere"` | `index: "Sections", elsewhere: "Profiles"` |
| Footer: back to top | `top: "Top", topLabel: "Scroll back to top of page"` | `top: "Back to top", topLabel: "Back to top"` |
| CV: dialog title | `title: "Curriculum Vitae"` | `title: "CV"` |
| CV: print button | `print: "Print / Save PDF"` | `print: "Print or save as PDF"` |
| CV: summary heading | `summary: "Professional Summary"` | `summary: "Summary"` |
| CV: experience heading | `experience: "Professional Experience"` | `experience: "Experience"` |
| CV: projects heading | `projects: "Selected Projects"` | `projects: "Selected projects"` |
| CV: skills heading | `coreSkills: "Core Skills"` | `coreSkills: "Core skills"` |
| 404: body | `"The link may be outdated, or the address slightly off. Everything — case studies, experience, skills — lives on a single page, one link away."` | `"The link may be out of date, or the address may be mistyped. All content is on the home page."` |
| 404: home link | `home: "Back to the portfolio", work: "Selected work"` | `home: "Go to home page", work: "View selected work"` |
| Error: body (new) and home link | `heading: "Something went wrong", retry: "Try again", home: "Reload the portfolio"` | `heading: "Something went wrong", body: "This page failed to load. Try again, or go to the home page.", retry: "Try again", home: "Go to home page"` |
| Global error: heading | `heading: "Application error"` | `heading: "Something went wrong"` |
| Project: Water app overview | `"Crafted to help users maintain healthy hydration habits through minimal interaction effort. Features fluid wave animations, customizable daily goals based on personal metrics, and seamless logging with one-tap shortcuts."` | `"Designed to help users keep healthy hydration habits with minimal effort. Features fluid wave animations, daily goals based on personal metrics, and one-tap logging shortcuts."` |
| Project: Dental tagline | `"Premier dental education web platform featuring course enrollment, clinical masterclasses, and student portal."` | `"Dental education web platform with course enrollment, clinical masterclasses, and a student portal."` |
| Project: Dental overview | `Created an elegant, high-trust visual aesthetic, responsive course catalogs, and seamless event registration.` | `Created a high-trust visual style, responsive course catalogs, and a simple event registration flow.` |
| Project: Dental feature | `"Seamless workshop registration and secure payment checkout integration"` | `"Workshop registration with secure payment checkout"` |
| Project: Jumblefix description | `with an ultra-clean user interface.` | `with a clean, minimal interface.` |
| Project: Jumblefix overview | `as a minimal, lightning-fast utility app.` | `as a minimal, fast utility app.` |
| Profile: long bio (CV summary) | `"longBio": "I am a Lead UI/UX Designer & Design Systems Architect passionate about transforming complex problem spaces into elegant, intuitive, and human-centered digital products. With over 7 years of experience spanning user research, interaction design, design token architectures, visual design systems, and frontend implementation, I craft end-to-end solutions that delight users and drive measurable business metrics."` | `"longBio": `I am a Lead UI/UX Designer and Design Systems Architect. I turn complex problems into clear, human-centered digital products. My ${totalExperience} of professional experience include ${uiuxExperience} in UI/UX design, spanning user research, interaction design, design token architecture, visual design systems, and frontend implementation.`` |

**Decisions (copy)**
- **Testimonial quotes unchanged.** They are attributed to real people, and rewording would misquote them. Note: they contain "elegant", "pixel-perfect", and "effortless".
- Experience descriptions and achievements unchanged: already specific. Rewriting metrics-heavy lines risks changing claims. "student learning journey" is kept as a UX domain term, as are "User Journeys" and "Journey Mapping".
- Removed unsupported or cliché phrases:
  - "drive measurable business metrics" (long bio), "Premier", "seamless", "elegant", "ultra-clean", "lightning-fast", "Crafted", and "passionate"
  - "engineering leaders" (neither testimonial author is described as an engineer)
- Fixed facts: the CV long bio now uses `totalExperience`/`uiuxExperience` ("My 11 years of professional experience include 8 years in UI/UX design…") instead of "over 7 years".
- Section numbering restarts at 01 (Work) because the hero no longer carries "01". This touched the skills index ("04" → "03") for numbering only; its wording is Chunk 6 territory and was not changed.
- The case-study external link now says what it opens: "Open case study on Behance" for behance.net URLs, "Open live site" otherwise (logic in `Projects.tsx`).
- New copy (neutral, no claims): the error page body "This page failed to load. Try again, or go to the home page."
- **Content gap:** the skills eyebrow "Craft & capability" (Chunk 6 scope, excluded from this pass) still uses "craft". Flagged for Awanish.
- **Content gap:** the case-study "Design foundations" and "Quality bar" boxes show the same boilerplate on every project, including Jumblefix and Password Generator. It is existing live copy, kept as is. Awanish should confirm it applies to all projects or drop it.

**Part B: error and loading pages** (docs read: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/error.md` and `not-found.md`)
- `src/app/not-found.tsx`: message, "Go to home page", "View selected work", section links. One h1. Returns HTTP 404.
- `src/app/error.tsx`: client component using the Next 16 `retry` prop. Message, "Try again", and a link home. Never renders `error.message` or the digest.
- `src/app/global-error.tsx`: renders its own `<html>`/`<body>`, imports `globals.css`, loads Geist and Geist Mono itself with `next/font`, and applies the saved or OS theme with `useSyncExternalStore` (the layout's theme script does not run there). It uses a React `<title>` because `metadata` is unsupported in global-error (per the docs).
- Fixed a Chunk 4 class conflict on all three pages: `container` (max-w-page) combined with `max-w-3xl` left the content off-centre. Replaced with a single `max-w-3xl` wrapper.
- `src/app/loading.tsx`: **not added**. The audit (§11) found the site fully static, with no data fetching, request data, or suspense. `/` is prerendered (`○ (Static)` in the build output), so no route can suspend.

**Testing** (production: `next build` then `next start -p 3100`)
- `/does-not-exist`: HTTP 404, custom page, h1 "This page isn't part of the portfolio.", no leak.
- `error.tsx`: a temporary client component threw when `?throw=page` was set, inside `page.tsx`. The boundary rendered "Something went wrong" with "Try again" (button) and "Go to home page" (`/`). The error text "TEMP test error" was not shown.
- `global-error.tsx`: the same helper threw from the root layout (`?throw=global`). It rendered "500 / Something went wrong / The site failed to load." with Geist fonts and the dark theme, with no leak.
- Temporary code removed: `src/components/TempThrow.tsx` deleted and the imports removed from `page.tsx` and `layout.tsx`. `grep -rnE "TempThrow|TEMP test|throw=" src` returns no matches. No test routes shipped.

**Check results** (real output, after removing the test code)
- `npm run build`: exit 0. `npx tsc --noEmit`: exit 0. `npx eslint .`: exit 0.

---

### Chunk 8: metadata, accessibility, documentation (2026-09-30)

**Metadata**
- `siteUrl` changed to `https://awanishverma.com` (was `https://www.awanishverma.com`, as on the live site) and used as `metadataBase`. Rendered tags now include canonical `https://awanishverma.com`, og:url, og:image, twitter:image, and sitemap/robots on the same host.
- Description (meta/OG/Twitter/manifest) is built from the constants: "UI/UX designer and design systems architect in Bengaluru, available worldwide. 11 years of professional experience, 8 years in UI/UX design: product case studies, design tokens, and interaction design." It replaces "7+ years…".
- **OG image replaced.** The live one existed (1200×630) but showed "7+ Years Experience", unverified stats, and old copy. The new `src/app/opengraph-image.tsx` (`next/og` ImageResponse, static at build) renders name, role, summary, and the two facts from the content file. It is also used for `twitter:image` (Next emits it automatically). Removed `opengraph-image.png`, `twitter-image.png`, and their `.alt.txt` files. Alt text: "Awanish Verma, UI/UX Designer & Design Systems Architect" (dropped "Senior Lead", which conflicts with the site's h1 role).
- The OG image uses literal colours (ImageResponse cannot read CSS variables) and the default ImageResponse font, because Geist's next/font files are woff2, which ImageResponse does not load. Logged as an exception to "no hardcoded colours".
- Favicon: kept the existing `icon.png` (512) and `apple-icon.png` (180), per the rules. Note: they use the old blue-on-black "AV" style.
- Manifest colours aligned to the dark token `#0a0a0a` (was `#050505`).
- `robots.ts` and `sitemap.ts` stay a few lines each.
- **Assumption / blocker:** canonical URLs point to `https://awanishverma.com`, which currently serves a parked page. The domain must be connected before production, or canonical and OG links will point at the parked page.

**Accessibility baseline check**

| Item | Status |
|---|---|
| `lang` on `<html>` | `lang="en"` in layout and global-error |
| Skip link | first focusable element, targets `main#main-content` (`tabIndex=-1`) |
| One `h1` per page | home (hero), 404, error, global-error: one each (verified in Chunks 5 and 7) |
| Landmarks | `header`, `nav` (labelled: section, mobile, footer), `main`, `footer` |
| Visible focus | global `:focus-visible` 2px accent outline, offset 2px |
| Keyboard | native `<details>` (menu, experience), native `<dialog>` (Escape, focus trap, focus return), tabs with arrow keys, `aria-pressed` filters |
| Contrast | text uses only gray-900/1000 and blue-900 (ratios in Chunk 3). Filter counts at 70% opacity are about 7:1 |
| Alt text | hero image descriptive. Project cover images `alt=""` inside a button labelled "Open case study: …". Gallery images descriptive |
| Touch targets | interactive controls `min-h-11`/`size-11` (44px) on mobile. Inline text links inside the CV body are exempt as inline links |
| Reduced motion | no animations. Smooth scrolling is off under `prefers-reduced-motion` |

No gaps found that needed a code change in this chunk. Chunk 9 covers the keyboard walkthrough in a real browser.

**Hydration:** `grep -rnE "new Date|Date\.now|Math\.random|window\.|document\." src` found DOM access only in event handlers (`ResumeButton`, `ThemeToggle` onClick), `useSyncExternalStore` snapshots (`ThemeToggle`, `global-error`), and the pre-paint inline script. Nothing runs during render. The copyright year is a static string.

**Documentation**
- README rewritten: setup, Node version, scripts, where content, tokens, and styles live, and theme behavior.
- Content file header now documents its structure.
- Comments reviewed: the remaining ones explain non-obvious behavior (theme script, hydration snapshot, dialog/lazy-load workaround, tabs keyboard pattern, global-error constraints, OG colours). None restate code.

**Dependencies and dead code**
- gsap and @gsap/react: never installed (Chunk 5 added no animation). Nothing to remove. To add motion later: `npm i gsap @gsap/react`.
- Removed dead content: `profile.shortBio`, `profile.stats` (24+/150+/14+, and the old 7+), and the project fields `slug` and `featured` (unused). **Reversible:** the original values are in `docs/live-site-data.json`.
- `npm prune` run. Six optional WebAssembly packages (`@emnapi/*`, `@img/sharp-wasm32`, `@napi-rs/wasm-runtime`, `@tybys/wasm-util`) still show as "extraneous" in `npm ls`. They are optional platform binaries left by the scaffold copy, not in package.json or the lockfile's root dependencies. A fresh `npm ci` will not install them. No action needed.

**Check results** (real output)
- `npm run build`: exit 0. Routes: `/`, `/_not-found`, `/apple-icon.png`, `/icon.png`, `/manifest.webmanifest`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`, all static.
- `npx tsc --noEmit`: exit 0. `npx eslint .`: exit 0.
- Rendered `<head>` checked with curl on `next start`: title, description, canonical, OG, Twitter, icon, and manifest tags present. OG image fetched (HTTP 200) and inspected visually.

---

### Chunk 9: verification and report (2026-09-30)

- Full results are in [FINAL_REPORT.md](./FINAL_REPORT.md) §8.
- **Checks:** build, tsc, and eslint exit 0 (before and after the fix). No console errors or hydration warnings at 375/768/1440. No horizontal scroll. axe: 0 violations in dark and light.
- **Keyboard:** skip link, dialogs (open, trap, Escape, focus return), tabs, disclosure, and focus rings all OK. Reduced motion OK.
- **Links:** all anchors OK. External links return 200, except the four Behance galleries, which return 403 to curl (bot-blocked; they open in a browser).
- **404 and error page** verified in production. Temporary throw removed; `grep -rnE "TempThrow|TEMP test|throw=" src` returns no matches.
- **Test-environment artifact (not a site defect):** the first light-mode axe run reported 40 contrast failures. The automated tab produced 0 animation frames, so colour transitions never finished. After `Page.bringToFront`, rAF ran at about 101 frames per second, the link colour settled on `#4d4d4d`, and axe reported 0 violations.
- **Fix:** the mobile menu stayed open after choosing a link. Added `src/components/MobileMenu.tsx` (client) wrapping the native `<details>`: it closes when a link or button in the panel is chosen, and on Escape (focus returns to the summary). Re-tested: closes after a link, on Escape, and when the CV opens. No overflow at 375. Build, tsc, and eslint exit 0.
- **Not run:** screen reader pass, Lighthouse, physical devices (see report §8).

---

### Follow-up after Chunk 9 (2026-09-30)

Awanish's instruction: "Stick to UI/UX Designer, and rest do as you see fit."

**Role**
- The single role title is `profile.title = "UI/UX Designer"`. It is used by the hero h1, header and footer taglines, CV, meta title, site name, and OG/icon alt.
- Removed "Senior Lead", "Lead", and "Design Systems Architect" from the profile, long bio, and metadata.
- Dropped the keywords "design systems architect", "lead product designer", and "senior UX designer".
- Job titles in the experience history (for example "Senior UI/UX Designer" at Acadlog) are unchanged, because they are employment history, not the site's role title.

**Decisions taken ("as you see fit")**
- **Project images:** all 14 Unsplash stock URLs were replaced with Awanish's own work, self-hosted in `public/images/projects/`:
  - Behance crops for XpertOnline, Water, Plant, and DOCTO (sources in HERO_IMAGE.md §2)
  - desktop screenshots (1440×900, taken 2026-09-30) of the three live sites
  - each gallery image has descriptive alt text
  - Unsplash `remotePatterns` removed from `next.config.ts`
  - Assumption: Awanish may publish his public Behance work, the same basis as the hero.
- **Unsupported metrics removed:** the project `impactMetric` values (+60%, 4.8★/+40%, 100% positive, 65%, sub-millisecond, sub-10ms) are gone. Academy of Dental Excellence keeps a verifiable outcome, "Live production website." (the site returns 200). The CV "Impact:" lines were removed. Cards now show the project tagline. Experience achievement percentages were kept: they are employment claims from Awanish's own CV and cannot be checked against Behance.
- **XpertOnline team credit:** the case study shows "Team: Group project with Jyotirmoy Goswami, Sphoorthy Gowda, and Mukesh Gupta." The names are from Behance slide 1.
- **Boilerplate removed:** the identical "Design foundations" and "Quality bar" boxes that appeared on every case study.
- **Skills copy:** eyebrow "Craft & capability" → "Skills". Heading "Design systems thinking, end to end." → "Design, frontend, video, and data tools." Intro → "8 years of UI/UX design, from user research to design systems, plus the tools I use for frontend, video, and data work."
- **Hero on mobile:** art direction with `<picture>` and `getImageProps` (per the docs "Art direction" example). Below 640px it shows the OTP and doctor-home screens (`docto-hi-fi-screens-mobile.jpg`, 858×826). Otherwise it shows all four. The `<source>` has width/height to avoid layout shift. It uses `fetchPriority="high"` instead of `preload`, so both variants aren't preloaded. The alt text now fits both crops.
- **Favicon:** `icon.png`/`apple-icon.png` replaced with generated `icon.tsx`/`apple-icon.tsx`: white "AV" on `#171717`, matching the header mark and the neutral palette. The manifest points to `/icon` and `/apple-icon`.
- **Developer fixes:**
  - `themeStorageKey` constant shared by the layout script, ThemeToggle, and global-error
  - `npm run typecheck` (`next typegen && tsc --noEmit`) works on a fresh clone
  - `.gitignore` rewritten without duplicates

**Content gap:** the live Academy of Dental Excellence site's mobile navigation overflows at 390px (seen while taking screenshots). It's a defect on that external site, not this portfolio.

**Check results** (real output)
- `npm run build`: exit 0 (routes include `/icon` and `/apple-icon`). `npm run typecheck`: exit 0. `npx eslint .`: exit 0.
- Browser (production):
  - hero uses the mobile crop at 375 and the desktop crop at 1440; h1 "Awanish Verma / UI/UX Designer"
  - no horizontal scroll at either width
  - all 7 cover images load
  - XpertOnline shows the team credit, and Dental shows its outcome
  - gallery images load with descriptive alt text
  - the CV shows no "Impact" lines and the title "UI/UX Designer"
- axe: 0 violations in dark and light.

- 2026-09-30: Awanish: leave the domain connection for now. `siteUrl` stays `https://awanishverma.com`; canonical/OG links point to the parked page until the domain is connected.

### Experience rewrite and ATS CV (2026-09-30)

Awanish's decisions: the Dental site's mobile menu stays as it is (he will fix it himself). The experience bullets are rewritten without percentages, and the CV is made ATS-friendly.

**Experience bullets** (`experiences[].achievements`, shown in both the Experience section and the CV)
- Removed every percentage: 45%, 28%, 35%, 100% of audit issues, 30%, 50%, 100% on-time, and 40%.
- Kept the counts that aren't percentages: 3 platforms, 60+ sessions, 500+ assets, 15+ projects, and 50+ projects.
- Each bullet starts with an action verb, keeps its original claim without the number, and adds no new claims.
- Keywords kept for ATS: Figma, design tokens, usability testing, prototyping, WCAG 2.1 AA, React, Tailwind CSS, UI kit, and so on.

**CV summary** (`profile.longBio`): "UI/UX Designer with 11 years of professional experience, including 8 years in UI/UX design…". It is followed by a keyword sentence listing skills already on the site.

**CV structure** (`ResumeDialog.tsx`)
- Single column, with standard headings in the conventional order: Summary, Skills, Experience, Projects, Education, Certifications.
- Plain `|` separators. Each role has a title line and a "Company | Location | Dates" line.
- Projects are listed in one column, not a two-column grid.
- Skills now also include Video Editing and Data Analytics, derived from `skillGroups` so the data isn't duplicated.
- Headings use normal letter-spacing, because wide tracking can split words when text is extracted.
- Label and value are one text node ("Skills: …", "Tools: …"), because PDF extraction dropped the space after a bold label ("Skills:UI/UX").

**Print fixes** (found by printing to PDF and extracting the text with macOS PDFKit)
1. **Clipped to one page.** A modal `<dialog>` sits in the top layer, which prints as a single absolutely positioned page: its top was cut off by vertical centring, and everything past page 1 was lost.
   - Fix: `PrintButton` listens for `beforeprint`/`afterprint`, so it covers both the button and Cmd/Ctrl+P. It reopens the CV as a non-modal dialog, which flows across pages, then restores the modal.
   - The print CSS sets it to `position: static` with a white page background.
   - Repeated print events can't lose the restore flag.
2. **Garbled words.** Geist in the PDF extracted as "SM B" and "M AAC". Print now uses Arial/Helvetica, and the 500 weight is mapped to 700 (Arial has no medium face).

**Check results** (real output)
- `npm run build`: exit 0. `npm run typecheck`: exit 0. `npx eslint .`: exit 0.
- PDF via `Page.printToPDF` (which fires the real print events): 3 pages, 92 extracted lines. They read in order from "Awanish Verma / UI/UX Designer / contact" through "Certifications…", with no garbled or missing text.
- After printing, the dialog is back in modal mode (`open=true`, `:modal=true`).
- Screen view checked in the dark theme.

### Hero redesign (2026-09-30)

Awanish asked for a redesign of the hero. `src/components/Hero.tsx` now uses a Geist-style grid: one 1px-bordered, rounded frame split into cells.

- **Intro cell** (8 of 12 columns from `lg`): "Open to work" status pill, h1 (name and "UI/UX Designer"), the summary (`text-pretty` to avoid an orphaned word), and both actions pinned to the bottom of the cell.
- **Side column** (4 of 12): the two fixed facts as large figures, the focus areas as chips, and the GitHub/LinkedIn links. Below `lg` the facts sit side by side and the cells stack.
- **Image cell** (full width): the DOCTO screens on the white media surface, with a caption bar and a new "View case study ↗" link to the DOCTO Behance project. The href is looked up from the project data, and the label is in the content file.
- **Content:** unchanged apart from the new link label.
- **Accessibility:** "Focus areas" and "Connect" are now plain labels, not h2s, to keep the heading outline clean. The list is labelled by its caption.
- **Image loading:** the image now loads eagerly (`loading: "eager"` with `fetchPriority: "high"`). `getImageProps` defaults to lazy, and the mobile crop didn't load in testing.

**Check results** (real output)
- `npm run build`: exit 0. `npm run typecheck`: exit 0. `npx eslint .`: exit 0.
- Browser: no horizontal scroll at 375/768/1440, one h1. The image loads at 375 (mobile crop, w=384) and 1440 (desktop crop, w=1200). Screenshots checked at all three widths.
- axe: 0 violations in dark and light.

### Hero image redesign: design canvas (2026-09-30)

Awanish asked for a more creative hero image. The flat screenshot strip is replaced by `ScreenCanvas` (in `src/components/Hero.tsx`), which presents the DOCTO screens the way a designer lays them out in a design file:

- **Canvas:** dot-grid background (`.design-canvas` in globals.css) with a page label ("DOCTO / High-fidelity screens"). It keeps the light theme in both modes (`.theme-light`), because the screens are light UI.
- **Frames:** four separate frames, each labelled with the screen's own name (Splash, Login, OTP validation, Doctor home) and staggered vertically, as if placed by hand.
- **Selection:** "Doctor home" is shown selected, with an accent selection box, corner handles, and a "Hi-fi" badge. The other frames show the same selection box on hover (CSS only, no JavaScript; transitions are off under reduced motion). The selection box is decorative (`aria-hidden`).
- **Mobile:** below 640px only OTP validation and Doctor home show, so they stay legible.
- **Images:** four phone crops cut from the existing DOCTO crop at measured bezel bounds (348×734 each, found by a pixel scan). Saved as `public/images/docto/{splash,login,otp,home}.jpg`. Corners are clipped with `.device-clip` (12% / 5.7% radius). Behance's largest version is 1720px wide, so 348px per phone is the maximum available; frames display at about 200px (roughly 1.7× density).
- **Alt text:** each frame has its own alt text describing that screen.
- **Tokens:** added `--color-on-accent` (white on blue-700, about 4.6:1).
- **Removed:** the old `docto-hi-fi-screens.jpg` and `-mobile.jpg` (no longer used). README updated.

**Check results** (real output)
- `npm run build`: exit 0. `npm run typecheck`: exit 0. `npx eslint .`: exit 0.
- Browser: no horizontal scroll at 1440/768/375. All visible frame images load (4 at 1440 and 768; 2 at 375, with the other 2 hidden). The hover selection was seen working in the 1440 capture.
- axe: 0 violations in dark and light.

### Hero canvas from the Figma source (2026-09-30)

Awanish shared the DOCTO Figma file (`I2TEEIduzi3JNLliGhMMwF`, in his Drafts). No Figma connector was available, so the file was opened in his signed-in Chrome, and frames were read and exported through the Figma plugin API exposed in the editor page (`figma.getNodeByIdAsync(...).exportAsync`). Nothing in the file was changed.

- **File structure:** pages Design System (1:285), Wireframe / App Design (1:883), and Case Study (1:2788). App screens are 360×800 frames. Text styles use Rubik (Headline, Title, Body, Label) and Roboto (Material theme). The colour styles' primary scale is indigo (`#3F51B5` family).
- **Exported at 2×** (720×1600 PNG): `splash` (1:1679), `Login with Mobile` (1:1695), `OTP Validation` (1:1736), and `Homescreen` (1:1085). Saved to `public/images/docto/{splash,login,otp,home}.png`, replacing the Behance-cropped phone JPEGs. The Figma version is newer than the Behance board: indigo palette, varied patient names, "Submit" on OTP.
- **Canvas now mirrors Figma:**
  - square frames, no device bezel (`.device-clip` removed)
  - exact Figma frame names as labels
  - the canvas label is the file and page name ("Doctor-Patient Management App / Wireframe / App Design")
  - a light grey page (`--gray-100`, close to the file's `#F5F5F5` page colour) with a faint dot grid
  - the selected Homescreen has an edge-aligned selection box and the real "360 × 800" size badge
  - frames display at about 208px, roughly 3.5× density from the 720px exports, so text is sharp on retina screens
- **Alt text** was rewritten to match the Figma exports: primary button on Login, "Submit" on OTP.
- **Not used:** a colour swatch panel from the file's styles. The primary style scale (indigo) doesn't exactly match every screen, and it would add decoration without a clear purpose.

**Check results** (real output)
- `npm run build`: exit 0. `npm run typecheck`: exit 0. `npx eslint .`: exit 0.
- Browser: at 1440, all 4 frames load (natural width 207); at 375, 2 frames load and 2 are hidden by design. No horizontal scroll. Screenshots checked.
- axe: 0 violations in dark and light.
- axe note: the first light-mode run reported 41 contrast results on the header links. That was the known test artifact: the tab was in the background, so colour transitions never finished. Re-run with the tab in front (101 frames/s): nav link colour `#4d4d4d`, light theme **0 violations**.

### Project images from Figma (2026-09-30)

Awanish said "Proceed" to replacing Behance-based case study images with Figma exports. The files were read through the Figma plugin API in his signed-in Chrome; nothing in the files was modified (only `loadAsync`, reads, and `exportAsync`).

**Figma files found** in his recents: "Doctor-Patient Management App" (design), "XpertOnline AI chatbot" (a Figma **Slides** deck), and "Water Tracker App | Water Drink Reminder App | UI Design" (design). No Plant App file was found, only an unrelated Community file ("Planty"), so Plant keeps its Behance images. Dental, Password Generator, and Jumblefix keep their live-site screenshots.

| Project | Cover | Gallery | Source nodes |
|---|---|---|---|
| DOCTO | `docto-cover.jpg` (1260×750, Figma "Behance cover" 1:4238) | cover; `docto-screens.jpg` (four 2× frames in a row: Todays appointment 1:1173, Patient information 1:1126, Missed appointment 1:1188, Search Results 1:1111); `docto-colors.jpg` (Design System "Colors" 1:642) | DOCTO file |
| Water Tracker | `water-cover.jpg` (1600×800, "Thumbnail" 1:3705) | cover; `water-screens.jpg` (2× frames 11 1:1548, 12 1:1688, 16 1:2147, 18 1:2328) | Water file |
| XpertOnline | `xpertonline-qualitative-analysis.jpg` (slide 17, 1:2068, 1600×900) | that slide; `xpertonline-refined-wireframes.jpg` (slide 27, 1:2663) | Slides deck (1920×1080 slides, sharper than the 1400px Behance versions) |

- The screen rows were composed locally: frames on `#f5f5f5` with 32px gaps and a Geist small shadow, captured at 2× and resized to 1600px wide. The layout is new; every screen is Awanish's own export.
- Removed `docto-design-system.jpg`. The files reused by name (`docto-screens`, `water-cover`, `water-screens`, `xpertonline-*`) now hold the Figma versions. All images in `public/images/projects/` are referenced (checked by search).
- Alt text was rewritten for every new image.
- **Test-server note:** the DOCTO card image failed to load at first. The image optimizer on the long-running local server had a stuck request for that URL: WebP requests hung, plain requests returned JPEG, and the server was at 0% CPU. After restarting with `.next/cache/images` cleared, every size returned WebP in under 40ms and the card loaded. This was a local server state issue, not a site defect.

**Check results** (real output)
- `npm run build`: exit 0. `npm run typecheck`: exit 0. `npx eslint .`: exit 0.
- Browser (fresh server): all 7 project cards load; the DOCTO (3), Water (2), and XpertOnline (2) gallery images load. Screenshot checked.

### Micro-interactions and animation with GSAP (2026-09-30)

Awanish asked for micro-interactions and animation where needed, using GSAP.

**Dependencies:** `gsap` 3.15.0 and `@gsap/react` 2.1.2, pinned exact. API usage was checked against the installed `@gsap/react` README and `gsap/types` (`matchMedia`, `quickTo`, `ScrollTrigger.batch`). The chunk that includes GSAP and ScrollTrigger is 145 KB raw, 54 KB gzipped (measured in `.next/static/chunks`). It is loaded by the client components that use it.

**Rules applied** (from the original prompt):
- `useGSAP` for component effects.
- Every animation is inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` or checks `reducedMotion()` first.
- Content stays visible without JavaScript: the server HTML contains no `opacity:0` or `visibility:hidden` inline styles (checked with curl, 0 matches).
- No layout shift: CLS measured at 0 after load and scroll.
- No opacity animation on the h1 or hero images.
- Reveals animate `opacity` (not `autoAlpha`), so waiting content stays in the accessibility tree.

| Where | Interaction | File |
|---|---|---|
| Sections | Scroll reveal: `[data-reveal]` elements (section headers, project cards, experience roles, skills intro and groups, testimonials, contact columns) ease up 24px as they enter. Only elements below the fold at load are prepared, so nothing on screen flickers. `ScrollTrigger.batch`, `once` | `ScrollReveal.tsx` (renders nothing, mounted once in `page.tsx`) |
| Hero canvas | One selection box and "360 × 800" badge glide to the hovered frame and back to Homescreen on leave; the frame label turns accent. Under reduced motion the box jumps instantly (it is feedback, not motion). Without JavaScript, the per-frame server boxes and CSS hover still work | `HeroCanvas.tsx` (new client component, split from `Hero.tsx`) |
| Hero canvas | Pointer parallax: the frame layer pans up to ±8/±6px with the cursor, like a design tool. Only for `(pointer: fine)` and no reduced motion; returns to rest on leave. `gsap.quickTo` | `HeroCanvas.tsx` |
| Case study and CV dialogs | Panel eases in (opacity, 12px, scale 0.98) after `showModal()`; `clearProps` afterwards | `motion.ts` `dialogIn`, `Projects.tsx`, `ResumeButton.tsx` |
| Case study tabs | Panel crossfades on tab change (not on first open) | `Projects.tsx` |
| Project filter | Cards re-stagger in after a filter change (not on first render) | `Projects.tsx` |
| Theme toggle | New icon rotates and scales in after each switch | `ThemeToggle.tsx` |
| Mobile menu | Panel eases down on open (the `<details>` toggle event) | `MobileMenu.tsx` |
| Project cards (CSS) | Cover image zooms to 105% on hover (`motion-safe:`) | `Projects.tsx` |
| Buttons (CSS) | Press feedback `motion-safe:active:scale-95` | `ui.ts` `button()` |

Shared setup is in `src/components/motion.ts`: plugin registration, `MOTION_OK`, `reducedMotion()`, `dialogIn()`. One-shot tweens triggered by clicks (`dialogIn`, the mobile-menu open) call `gsap` directly: they finish in under 0.3s and need no cleanup. Longer-lived work (ScrollTriggers, `quickTo`, and listeners) lives inside `useGSAP` contexts. HeroCanvas wraps hover tweens in `contextSafe` at event time (the react-hooks `refs` lint rule rejects wrapping during render).

**Check results** (real output)
- `npm run build`: exit 0. `npm run typecheck`: exit 0. `npx eslint .`: exit 0 (after moving the `contextSafe` call to event time).
- Browser, production server, tab in front (see note), 1440px:
  - The selection box starts on Homescreen (offset −1px, the border). On a real mouse hover over `splash` it moves exactly onto the frame and the label turns `#0064e2`. On leave it returns to Homescreen.
  - The parallax layer moved to `translate(-4.8px, -0.3px)` under the pointer and returned to identity on leave.
  - Scroll reveal: 25 targets, all at opacity 1 after scrolling. CLS 0.
  - Case-study dialog and tab panel end at opacity 1 with no transform. Filter (3 cards, then 7) ends at opacity 1. The theme icon ends at the identity transform. The mobile menu ends at opacity 1.
  - No console errors or warnings captured.
- Reduced motion (`prefers-reduced-motion: reduce` emulated): 0 targets hidden at load. The selection box jumps instantly. No parallax transform.
- axe: 0 violations in dark and light.
- **Test note:** CDP input events and GSAP's ticker both need the tab to render frames. The automated tab sometimes rendered 0 frames per second in the background: tool calls timed out and tweens looked frozen mid-way. Every result above was taken after `Page.bringToFront`, with a frame-rate probe (31–51 frames/s).

### Experience section animation (2026-09-30)

Awanish asked for animation in the Experience section. The role list moved from `Sections.tsx` into a new client component, `src/components/ExperienceTimeline.tsx`.

- **Career timeline rail:** a 2px neutral line runs down the left, with an accent fill (`.timeline-progress`) scrubbed by scroll (ScrollTrigger `scrub: 0.4`, from "top 70%" to "bottom 60%"). Only without a reduced-motion preference; the fill is decorative, so the server HTML starts it at `scale-y-0` and the neutral rail stays visible without JavaScript.
- **Role dots:** a dot per role fills with accent once it passes 70% of the viewport. The state is computed from real positions in one `sync()` (ScrollTrigger `onUpdate`/`onToggle`) and re-run on every ScrollTrigger `refresh`. Found while testing: per-dot `onEnter`/`onLeaveBack` callbacks fired with `scroll: 0` during a ScrollTrigger refresh (an instrumented build showed `leaveBack scroll:0` at max scroll), which cleared the dots. The position-based sync fixes it. Dots still mark progress under reduced motion (feedback, not motion; the colour transition is off there).
- **Accordion:** roles stay native `<details>`.
  - Opening: the body expands from height 0 with opacity, and the achievements stagger in from x −8px.
  - Closing: the summary click is held, the body collapses, then the `<details>` closes. Inline styles are cleared afterwards.
  - Under reduced motion, roles open and close instantly (native behaviour).
  - A chevron rotates with the open state (CSS `group-open:rotate-180`, off under reduced motion).

**Check results** (real output)
- `npm run build`: exit 0. `npm run typecheck`: exit 0. `npx eslint .`: exit 0.
- Browser, tab in front:
  - The rail fill goes 0 → 0.56 → 0.96 → 1.00 while scrolling through the section.
  - Dots fill progressively (for example `[1,0,0,0]` then `[1,1,1,1]`), stay filled at the bottom of the page and after a forced resize refresh, and clear when scrolling back above.
  - Opening a role animates its height (147 → 224px). Closing animates (302 → 98px), then `open=false` with styles cleared.
  - Keyboard Enter opens and closes. Under reduced motion, open and close are instant and there is no rail scrub transform.
- Rail widened from 1px to 2px after a screenshot showed the 1px fill barely visible.
- Test note: some earlier "stuck" results were the automated tab rendering 0 frames per second (GSAP's ticker needs frames); re-tested with a frame-rate probe.
