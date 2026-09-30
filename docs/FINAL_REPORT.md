# Final report: awanishverma.com redesign

Date: 2026-09-30. Branch `redesign/portfolio` (local commits only; nothing pushed or deployed).

## 1. Summary of changes

- **No source repository existed.** I audited the live site (ux-portfolio-self-nine.vercel.app, Next.js 15.5.23) and rebuilt it from scratch in Next.js 16, word for word (Chunks 1 and 1R).
- **Foundation:** pinned current versions, added Geist-based design tokens (colours, type scale, radius, shadows, focus) for light and dark themes, and switched to the Geist Sans and Geist Mono fonts.
- **Shared styles:** button, card, and badge helpers, a `SectionHeader` component, and a common page container.
- **New hero:** name, role, the two fixed facts ("11 years" and "8 years"), a one-line summary, two specific actions, and the self-hosted DOCTO high-fidelity screens as the main visual.
- **Skills:** four groups (UI/UX Design, Frontend Development, Video Editing, Data Analytics). Proficiency percentages and per-tool years are gone.
- **Copy pass:** 46 strings rewritten. Clichés and unsupported phrases removed, headings now say what each section is for, and the CV summary uses the fixed facts. Testimonial quotes are unchanged.
- **Error pages:** 404, error, and global error pages, all tested in a production build.
- **Metadata:** everything now uses `https://awanishverma.com`, with descriptions built from the constants. The share image is generated from the content file.
- **Removed:** the token sandbox and other dead content. A README was added.
- **Found during verification:** the mobile menu stayed open after choosing a link. Fixed.

## 2. Exact versions

| Package | Version |
|---|---|
| next | 16.3.7 |
| react / react-dom | 19.3.0 |
| typescript | 6.0.3 (7.0.2 is out, but the Next ESLint config's TypeScript plugin supports only `<6.1`) |
| tailwindcss / @tailwindcss/postcss | 4.3.3 |
| eslint | 9.39.5 (10.x is out, but eslint-plugin-react, -import, and -jsx-a11y don't support it) |
| eslint-config-next | 16.3.7 |
| @types/react / @types/react-dom | 19.3.0 |
| @types/node | 24.19.0 (matches Vercel's default Node 24) |
| gsap / @gsap/react | not installed (no animation used) |
| Node (local) | v25.9.0 |

## 3. Components

| Status | Component |
|---|---|
| Retained (rebuilt from live) | `Header`, `Footer`, `ThemeToggle`, `ResumeDialog` (CV), `ResumeButton`/`PrintButton`, `Projects` (filter and case-study dialog), experience, testimonials, and contact sections (`Sections.tsx`) |
| Modified | `SectionIntro` → `SectionHeader`. Every component restyled with tokens and the shared helpers. The CV now uses a `.theme-light` token scope instead of hardcoded zinc/emerald colours |
| Replaced | `Hero` (new content and image). Skills section moved to `Skills.tsx` with `SkillGroupCard` and `SkillItem`. OG image changed from a static PNG to `opengraph-image.tsx` |
| New | `ui.ts` (button, iconButton, card, interactiveCard, badge, eyebrow, container, textLink), `MobileMenu` (closes after choosing a link or on Escape) |
| Removed | Token sandbox ("Design System Generator"), Lenis smooth scroll, Motion animations, scroll progress bar, skill filter and search, image lightbox |

## 4. Skills

- **Added:** Video Editing (DaVinci Resolve, Adobe After Effects, Adobe Premiere Pro) and Data Analytics (Microsoft Excel, Power BI, SQL, Python).
- **Existing skills:** 9 went to UI/UX Design, including the four former "Design Systems & Token Architecture" skills.
- **Needed placement:** React 19 / Next.js 15, Tailwind CSS v4 & Modern CSS, and TypeScript & UI State fit none of the three required groups. They went into a fourth group, "Frontend Development". The full table is in PROJECT_STATE (Chunk 6).
- No duplicates. Nothing dropped.

## 5. Hero image

- **Chosen:** DOCTO (Doctor-Patient Management App), the first row of four high-fidelity Android screens: splash, login, OTP, and doctor home.
- **Source:** `https://mir-s3-cdn-cf.behance.net/project_modules/fs/6725dd221640093.67d84825d10d3.jpg` from Awanish's Behance project 221640093. Cropped to 1716×840 and self-hosted at `public/images/docto-hi-fi-screens.jpg`.
- **Why:** it was the only wide, legible, final-fidelity interface image in the four linked Behance projects. None of them contain a desktop dashboard. Awanish picked it on 2026-09-30.

## 6. Error and loading states

- `not-found.tsx`: custom message, links home and to work. Returns HTTP 404.
- `error.tsx`: friendly message, "Try again" (Next 16 `retry`), and a link home. Never shows the error message or digest.
- `global-error.tsx`: renders its own `<html>`/`<body>`, imports the global styles, loads its own fonts, and applies the saved or OS theme.
- `loading.tsx`: **not added.** The site is fully static (every route is prerendered), so nothing can suspend.

## 7. Architecture and dependency decisions

- **Single content file** (`src/content/site.ts`). Components only read from it, so copy changes don't touch markup.
- **Server components by default.** Client code is limited to the theme toggle, the CV open and print buttons, the project filter and case-study dialog, the mobile menu enhancement, and global-error.
- **Native `<dialog>` and `<details>`** instead of custom modals and accordions: built-in focus trap, Escape handling, and keyboard support, with less JavaScript.
- **Class-string helpers instead of wrapper components**, because the patterns sit on four to six different elements (KISS).
- **Two-layer tokens:** raw Geist scales per theme, then semantic Tailwind tokens. Text only uses the gray-900/1000 steps, to keep AA contrast.
- **No animation library.** gsap was never installed.
- **TypeScript 6 and ESLint 9** are pinned below the latest because of peer ranges (see §2).
- **Project images stay hotlinked from Unsplash**, as on the live site (`images.remotePatterns`). See §9.

## 8. Verification (real output, 2026-09-30, production build via `next start`)

| Check | Result |
|---|---|
| `npm run build` | exit 0. All 8 routes static |
| `npx tsc --noEmit` | exit 0 |
| `npm run lint` (eslint) | exit 0, no findings |
| Widths 375 / 768 / 1440 | no horizontal scroll (page width 375/375, 753/753, 1425/1425). One h1 |
| Console errors / hydration warnings | none captured at any width (console hook installed before load) |
| Images | hero loads at every width. Project images load when scrolled into view (lazy). The first scan flagged them only because they hadn't reached the viewport yet |
| axe-core 4.10.2 (WCAG 2.0/2.1/2.2 A and AA, best practice) | dark: 0 violations. Light: 0 violations |
| Keyboard | tab order: skip link, brand, nav, theme, CV, hero actions, filters…, with a visible 2px focus ring on each. Skip link moves focus to `main`. CV dialog: Enter opens, focus moves inside, Escape closes, focus returns. Case study: focus is trapped over 12 Tabs, arrow keys switch tabs, Escape closes and returns focus. Experience items open with Enter |
| `prefers-reduced-motion: reduce` | `scroll-behavior: auto`, 0 running animations (default is `smooth`) |
| Internal links / anchors | all 6 anchors exist. Icons and manifest return 200 |
| External links | 200: GitHub, LinkedIn, Behance profile, Instagram, dentalexcellence.academy, jumblefix.vercel.app, random-password-generator-eight-xi.vercel.app, awanishverma.com (a parked page). **403 from curl (bot-blocked, not broken):** the four Behance gallery links, which opened normally in Chrome during Chunk 2. mailto not fetched |
| 404 page | HTTP 404, custom page, links work |
| Error page (production) | temporary client throw, then the error boundary shows with no error text. Temporary code removed and confirmed by search |
| Global error (production) | tested in Chunk 7 (throw from root layout). Rendered styled with fonts and theme. Not re-run in Chunk 9 |

Two notes on the test setup:

- The first axe run reported 40 contrast failures in light mode. They came from the automated browser, not the site: its tab produced no animation frames, so colour transitions never finished. With the tab in front, the same page reports 0 violations and the text colour settles on `#4d4d4d`.
- **Not run:** a real screen reader pass (VoiceOver/NVDA), Lighthouse performance scores, and testing on physical mobile devices. The first two need manual or extra tooling I chose not to add. There are no devices available here.

**Defect found and fixed in Chunk 9:** on mobile, the menu stayed open after choosing a link and covered the section. The new `MobileMenu.tsx` closes it after a link or button is chosen and on Escape, then returns focus to the menu button. The `<details>` fallback still works without JavaScript. After the fix: build, tsc, and eslint exit 0, and the menu was re-tested (closes after a link, closes on Escape, closes when the CV opens, no overflow at 375).

## 9. Blockers before going live

1. **Domain:** `awanishverma.com` serves a parked page (redirects to `/lander`). The canonical, OG, sitemap, and robots URLs all point to it. Connect the domain before production.
2. **Project images are Unsplash stock photos**, not Awanish's work, as on the original site. Real images exist on Behance for four projects. Replace them, or remove the images.
3. **Unverified metrics:** the project impact metrics ("+60% increase in user engagement", "4.8★…", "100% positive…", "Reduced appointment booking time by 65%") and the experience achievement percentages come from the original site. They are not supported by the Behance material reviewed. The XpertOnline deck reports a six-user usability test.
4. **XpertOnline attribution:** the Behance deck lists four team members and "SMS Chatbot for Apollo Hospital". The site presents it without team credit.
5. **Image rights:** the DOCTO screens were chosen by Awanish (taken as permission to publish). He should confirm the project wasn't under client restrictions.

## 10. Assumptions and content to confirm

- **Removed from the hero and data:** the stats "24+ UI/UX & Systems Built", "150+ User Testing Studies", and "14+ Design Token Systems". They are recoverable from `docs/live-site-data.json`.
- **Removed:** the token sandbox (Awanish's decision) and the hero "Resume" button (the header CV button remains).
- **Role inconsistency:** the CV shows `profile.title` "Senior Lead UI/UX Designer & Design Systems Architect", while the hero and metadata say "UI/UX Designer & Design Systems Architect". Pick one.
- **Boilerplate:** the case-study "Design foundations" and "Quality bar" boxes show the same text on every project.
- **Copy outside this pass:** the skills eyebrow "Craft & capability" still uses "craft", and the heading "Design systems thinking, end to end" no longer describes the four groups (Video, Data).
- **Testimonial quotes** were kept verbatim, including "elegant", "pixel-perfect", and "effortless".
- **Favicon** keeps the original blue-on-black "AV" style, which doesn't match the new neutral palette.
- **Fixed facts** ("11 years", "8 years") are hand-maintained constants. Update them yearly.
- **Stray lockfile:** `/Users/awanishverma/package-lock.json` (outside the repo) triggers a Next.js warning on every build. Delete it if unused.

---

## Review as an employer (senior UI/UX role)

1. **Project cards show stock photos, not the work** (`src/content/site.ts` → `projects[].coverImage`, `galleryImages`). For a designer, this is the biggest credibility gap. The Visual Gallery tab of every case study shows unrelated Unsplash images.
2. **Metrics are not backed by the linked evidence** (project `impactMetric`, experience achievements). "+60% engagement" on a class-style usability study invites hard questions in an interview.
3. **Case studies are shallow and templated** (case-study dialog in `Projects.tsx`). Four tabs of short paragraphs, with identical "Design foundations / Quality bar" text on every project. There is no problem framing, process artefacts, or decisions on the site itself; everything defers to Behance.
4. **The hero image is small on mobile** (hero figure at 375px). Four phones in a 343px-wide frame make the UI text unreadable. Consider showing two screens on small viewports.
5. **The skills heading doesn't match its content** (Skills section): "Design systems thinking, end to end" sits above Video Editing and Data Analytics groups. It also dilutes the senior UI/UX positioning, with no explanation of how those skills relate to design work.
6. **Role title is inconsistent:** "Senior Lead" in the CV dialog vs "UI/UX Designer" in the hero h1.
7. **Team work reads as solo** (XpertOnline card and CV "Selected projects") despite the four-person team shown on Behance.
8. **Only two testimonials**, one from the CEO of a former employer (i2i TeleSolutions), both in marketing language.

## Review as a developer new to the repo

1. **`tsc --noEmit` fails on a fresh clone** until `next build` or `next typegen` has generated `LayoutProps`. It's documented in the README, but a `typecheck` script (`next typegen && tsc --noEmit`) would remove the trap (`package.json`).
2. **The content file mixes styles** (`src/content/site.ts`, about 700 lines). The generated data uses JSON-style quoted keys, while hand-written parts use TypeScript style. `profile`, `education`, `certifications`, and `testimonials` have no explicit types.
3. **Inconsistent file organisation:** `Sections.tsx` holds four sections, while `Hero`, `Skills`, and `Projects` have their own files.
4. **Class-helper conflicts are silent** (`src/components/ui.ts`). Helpers are joined with template strings, not tailwind-merge, so conflicting utilities are resolved by stylesheet order. This caused two bugs during the build (`hidden` vs `inline-flex` in the header, `max-w-page` vs `max-w-3xl` on the error pages).
5. **The theme key `av_portfolio_theme` is repeated** in three places (`layout.tsx` inline script, `ThemeToggle.tsx`, `global-error.tsx`). Changing it in one place breaks the others.
6. **OG image colours duplicate the tokens as literals** (`src/app/opengraph-image.tsx`) and will drift if the palette changes.
7. **No automated tests or CI.** Verification is manual. The pinned TypeScript 6 / ESLint 9 need a revisit when typescript-eslint supports TS 7 and the React/import/jsx-a11y plugins support ESLint 10.
8. **`.gitignore` has duplicated entries** (a hand-written block plus the create-next-app block), and `next.config.ts` keeps an Unsplash `remotePatterns` entry that exists only for the stock images.
