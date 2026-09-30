# Portfolio redesign: master prompt

Single source of truth for redesigning awanishverma.com. Keep this file in the repo root. Point the agent at it, then run one chunk at a time.

## How to use

### Before Chunk 1: get the code

The agent must run inside a git clone of the portfolio repository. If this folder is not that clone yet, bring the code in without deleting this file (`git clone` refuses a non-empty folder):

```
git init
git remote add origin <repo-url>
git fetch origin
git checkout -t origin/<default-branch>
```

Then add `PORTFOLIO_REDESIGN.md` to `.gitignore`, or commit it on the default branch before Chunk 1. Either way, the agent never edits it.

### Running a chunk

Start each chunk with one message:

> Read PORTFOLIO_REDESIGN.md. Follow the Rules section. Do Chunk N only. Then stop.

Replace N with the chunk number. Read the agent's summary and check the git diff before you start the next chunk.

Order: 1, (decision), 2, (decision), 3, 4, 5, 6, 7, 8, 9.

### Your decisions between chunks

- **After Chunk 1:** read the Blockers section of `docs/AUDIT.md`. Decide on each blocker before you run Chunk 2:
  - Missing repository or not a Next.js app: decide whether to rebuild from the live site. If yes, run Chunk 1R, then continue from Chunk 2.
  - Pages Router: decide whether Chunk 3 should migrate to the App Router. Chunks 5, 7, and 8 assume the App Router. Put the decision in the Chunk 3 message.
  - Baseline build fails: decide whether Chunk 3 should fix it first.
- **After Chunk 2:** choose one of these and put it in the Chunk 5 message:
  - an image from `docs/HERO_IMAGE.md`, after confirming you are allowed to publish it,
  - your own file, placed in the repo, with its path,
  - an Unsplash stand-in. This is for local development only. It must be replaced before the site goes live, because a stock dashboard as the main visual of a design portfolio implies it is your work.

If the agent drifts, send: "Reread the Rules section. Undo your last step with a new commit if it was committed, then redo it."

### Paths

Paths below are relative to the repo root. If the audit shows the project uses a `src` directory, `app/` means `src/app/` and the content file defaults to `src/content/site.ts`. `public/` always stays at the repo root, because Next.js does not serve `src/public/`.

---

## Rules

These apply to every chunk.

### Role

You are a senior product designer and frontend engineer working on the portfolio of Awanish Verma, a UI/UX designer. The site will live at awanishverma.com.

### Git

- Work on branch `redesign/portfolio`. In Chunk 1, create it from the default branch if it does not exist. In every later chunk, check that it is the current branch.
- At the start of every chunk, run `git status`. If the working tree has uncommitted changes, stop and report them. Do not stash, reset, or discard anything.
- Before the first commit, check that `.gitignore` covers `node_modules`, `.next`, and `.env*`. Never commit env files, secrets, or build output.

### Sources

- Current site: https://ux-portfolio-self-nine.vercel.app/
- Behance: https://www.behance.net/avanishverma4 (Awanish's own work)
- Design reference: Vercel Geist, https://vercel.com/geist/introduction

If a source is unreachable, say so and follow the fallback in the chunk. Never guess what a source contains. Behance and many portfolio sites render with JavaScript, so a plain fetch may return almost nothing. Use a browser tool if one is available. If none is, write "unknown" for anything you could not see.

### Evidence

- State only what you saw in a file, a command output, or a fetched page. If you did not see it, write "unknown".
- Do not recall library APIs, prop names, or file conventions from memory. They change between versions. Examples: the `next/image` prop that marks the LCP image, the `next lint` command, and Tailwind configuration. Read the docs for the installed version, first the package's docs or types in `node_modules`, then the official docs for that version. If neither is reachable, say so and choose the most conservative usage.
- Do not invent employers, clients, awards, metrics, titles, dates, testimonials, or outcomes.
- Facts stated in this file are supplied by Awanish and count as verified. That covers the fixed facts below and the skills listed in Chunk 6.
- Fixed facts: "11 years" of total professional experience and "8 years" in UI/UX design. Use these exact strings, always read from the content file constants once they exist (Chunk 3). Do not state any other length of experience, career start date, or per-tool experience. This rule covers durations only. It does not cover calendar dates such as a copyright year or dates already on the site.
- If existing copy states a conflicting experience count, record it in the audit. Replace it in the chunk that owns that copy: Chunk 5 for the hero, Chunk 7 for other sections, Chunk 8 for metadata. Log each replacement.
- Never write "passed" or "works" for a check you did not run. Write "not run" and the reason.

### Precedence when instructions conflict

1. Never invent claims.
2. The explicit task in the current chunk. A chunk that explicitly replaces or rewrites something overrides rule 3 for that thing only.
3. Preserve existing sections, content, links, and anchor IDs.
4. Visual polish.
5. Simplicity.

### Scope

- Do only the current chunk. Do not start the next one.
- If an earlier chunk left a defect that blocks this chunk, make the smallest fix and log it under Decisions.
- Do not edit `PORTFOLIO_REDESIGN.md`.
- Do not push to any remote, deploy, merge, open a pull request, or change domain, DNS, or Vercel project settings. Local commits on `redesign/portfolio` are required, see Handoff.
- Do not add a contact form, blog, CMS, auth, database, API, analytics, or theme toggle unless the current site already has one.
- Do not add a dependency without a stated reason under Decisions in `docs/PROJECT_STATE.md`.
- If something is unclear and not listed as a stop condition, pick the simplest option, keep going, and log it under Assumptions.

### Architecture

DRY, KISS, YAGNI. Extract a component only when the pattern repeats or has a separate responsibility. Do not wrap simple markup. Server components by default. Use `"use client"` only for interaction or animation, and keep each such component small.

### Design system

Adapt Vercel Geist. Do not copy the site. Restrained and professional. Avoid heavy gradients, glassmorphism, decoration without purpose, template-style card grids, and oversized headings. If a Geist page is unreachable, apply its principles: a neutral palette, 1px borders, small radius, minimal shadow, strong type hierarchy.

### Copy

Standard UX writing practice: concise, specific, scannable, consistent terms, headings that state a section's purpose, and button and link labels that describe the action. Keep the current site's voice, whether first or third person. Avoid filler, clichés, and words like leverage, seamless, passionate, crafting, and journey.

### Accessibility baseline

`lang` on `html`, a skip link, one `h1` per page (error pages included), landmarks, visible focus, full keyboard access, WCAG 2.2 AA contrast (4.5:1 for body text, 3:1 for large text and UI boundaries), alt text on every meaningful image and empty alt on decorative ones, touch targets of at least 44×44px on mobile, and motion that respects `prefers-reduced-motion`.

### Handoff

- `docs/PROJECT_STATE.md` is the memory between chunks. Read it first. Append to it last.
- If it does not exist, create it with these headings: Versions, Decisions, Assumptions, Content gaps, Removals, Check results.
- Append only. Never delete earlier entries. If an earlier entry turns out wrong, append a dated correction that names it.
- `docs/AUDIT.md` comes from Chunk 1 and is read-only afterward. If it proves wrong, log the correction in `docs/PROJECT_STATE.md`.
- From Chunk 3 on, site content and skill data live in the content file: `src/content/site.ts`, or the existing content location if the audit found one. Never hardcode them in markup you write or rewrite. Chunk 4 moves existing copy there.
- Build check: chunks 1 and 2 have none, so commit them when their files exist. From Chunk 3 on, the build check means the production build and `tsc --noEmit` both pass. If either fails, do not commit. Leave the changes uncommitted, record the output, and stop.
- Commit on `redesign/portfolio` with the message `chunk N: <short description>`. Stage files explicitly or check `git status` first. Do not blindly add everything.
- Print a chat summary of at most 10 lines, then stop and wait. Tables and reports that a chunk explicitly requires are exempt from the limit. Write them to `docs/PROJECT_STATE.md` as well as printing them.

---

## Chunk 1: audit

Read-only for the site. Edit only files under `docs/`, plus creating the branch.

Stop conditions: if the folder is not a git repository, or the repository is not a Next.js app, write what you found to `docs/AUDIT.md` if possible, say so, stop, and wait.

You may install dependencies with the lockfile's frozen or clean-install command (for example `npm ci`) so that you can read installed versions and run a baseline build. If that changes any tracked file, revert that file and log it.

Write `docs/AUDIT.md` with these sections:

1. Framework, router type (App Router or Pages Router), `src` directory or not, package manager, Node version (local and any `engines` or `.nvmrc` value), and exact installed versions of next, react, react-dom, typescript, @types/react, tailwindcss, eslint, eslint-config-next, gsap, and @gsap/react. Write "not installed" for any that are absent.
2. Route and file tree.
3. Page sections in order, with anchor IDs and the component file for each. Note which navigation links point to which anchors.
4. Every link, internal and external, and where it points.
5. All copy, quoted exactly, grouped by section, with the file each string lives in. Flag any stated experience count.
6. Assets: file paths, dimensions, and where each is used. Include the favicon and any Open Graph image.
7. Animations and interactions, and what drives each.
8. Dependencies that appear unused. For each, show the search you ran over source and config files to confirm it is not imported or referenced.
9. Theme behavior: light only, dark only, system, or toggle.
10. The existing skills list, quoted exactly.
11. Static or dynamic: whether any route fetches data, reads request data, or suspends. Chunk 7 depends on this.
12. Baseline checks: run the production build and `tsc --noEmit` and record the real output. Do not fix anything.
13. Differences between the repository and the live site.
14. Anything you could not read, and why.
15. Blockers for Awanish: a non-Next.js app, the Pages Router, a failing baseline build, or a Node version below what current Next.js requires. Write "none" if there are none.

Done when `docs/AUDIT.md` exists and `docs/PROJECT_STATE.md` links to it. Commit. Stop.

---

## Chunk 1R: rebuild from the live site (only if Awanish asks for it)

Use this only if Chunk 1 found no usable repository and Awanish chose a rebuild.

1. Scaffold a new Next.js app with the App Router, TypeScript, Tailwind, and ESLint, using the official non-interactive create command for the latest stable version. Initialize git if needed, and create `redesign/portfolio`.
2. Recreate the live site's sections, anchor IDs, links, and copy, quoted exactly from the live site and logged in `docs/AUDIT.md` under a new dated "Rebuild" section. Do not restyle yet. Do not recreate images you cannot download. List them as content gaps.
3. Run the build and `tsc --noEmit`. Record the output. Commit if both passed. Stop.

Chunk 3's upgrade step then only confirms versions.

---

## Chunk 2: hero image

Read-only for the site. Edit only files under `docs/`. Read `docs/AUDIT.md` first.

1. List each Behance project the current site links to, with its URL. If the site links to none, list the projects on the Behance profile instead and say so.
2. For each project, list the dashboard or product UI images you can see. Give each image's URL, its largest available variant, its pixel dimensions, and a one-line description of what it shows. You may fetch an image to read its dimensions. Do not save it in the repo.
3. Recommend one hero image and give the reason. Prefer a wide screenshot of a real interface with legible content. If the best candidate is a tall case-study composite, state the crop you propose. Flag that Awanish must confirm he may publish it, because client work may be under NDA even when it is already on Behance.
4. If no image is usable, write "no usable image" and stop. Do not search Unsplash. Awanish decides.
5. If Behance is unreachable or renders nothing you can read, say so and stop.
6. Write the result to `docs/HERO_IMAGE.md`.

Done when `docs/HERO_IMAGE.md` exists. Commit. Stop and wait for Awanish's choice.

---

## Chunk 3: foundation

Read `docs/PROJECT_STATE.md` and `docs/AUDIT.md` first. If Awanish's message includes decisions about Chunk 1 blockers (App Router migration, baseline fixes), apply them here and log them.

1. Look up the latest stable versions on npm of each of these that is installed: next, react, react-dom, typescript, @types/react, @types/react-dom, tailwindcss (plus its PostCSS plugin), eslint, and eslint-config-next. Do not install gsap or @gsap/react here. Chunk 5 adds them if it uses them. Check that the local Node version meets every package's requirement. If it does not, stop and report.
2. Read the official upgrade guides for each major version you cross, for Next.js and Tailwind, before upgrading. Use the official codemods and upgrade tools where the guides recommend them. Pin exact versions. Record old and new versions under Versions.
3. Fix breakage caused by the upgrade only. Compare against the baseline in the audit so you do not fix pre-existing failures unless Awanish asked you to. Do not redesign anything.
4. Define design tokens once, based on Geist: neutral color scale, spacing scale, type scale, 1px borders, small radius, minimal shadows, and interactive states (hover, active, focus, disabled). With Tailwind v4 or later, use CSS-first configuration (`@theme` in the global stylesheet). Do not create `tailwind.config` unless the installed version requires it. Define the tokens only. Do not restyle sections. Chunk 4 applies them.
5. Load Geist Sans and Geist Mono through `next/font` and apply them globally. Use `next/font/google` if the installed version offers Geist. Otherwise use the `geist` package and log why.
6. Keep the current theme behavior from the audit. If there is none, ship one light theme. If there is a dark theme, define both token sets.
7. Create the content file with two named constants: `"11 years"` for total professional experience and `"8 years"` for UI/UX experience. Add a one-line comment that these are updated by hand.
8. Remove a dependency listed as unused in the audit only after re-running the search that confirmed it, and only after the upgraded build passes without it. Do not remove gsap or @gsap/react. Chunk 8 decides on those. Log each removal under Removals.
9. Run the production build and `tsc --noEmit`. Record the real output under Check results.

Do not touch the hero, skills, or section markup, except for fixes that the upgrade forces.

Done when the build check passes, or its failures are recorded. Record the token and font locations in `docs/PROJECT_STATE.md`. Commit if the build check passed. Stop.

---

## Chunk 4: shared components and content extraction

Read `docs/PROJECT_STATE.md` and `docs/AUDIT.md` first.

1. Extract shared components only where a pattern repeats in the current site or has a clearly separate responsibility. Candidates: Button, Card, SectionHeader, Badge, navigation. Navigation qualifies as a separate responsibility even though it is used once. Do not create any other component that is used once. If the audit shows no qualifying pattern for a candidate, skip it and say so.
2. Style with the Chunk 3 tokens. Do not use hex values, arbitrary Tailwind values, or inline styles for color or spacing.
3. Visible focus states. Touch targets of at least 44×44px on mobile.
4. Apply the components to existing sections for consistency. Do not remove, reorder, or change the purpose of any section. Keep anchor IDs and links.
5. Move the existing copy of every section except the hero and skills into the content file, verbatim. Chunks 5 and 6 own the hero and skills.
6. Comment only where usage is not self-evident.

Do not touch the hero or skills. Do not change the wording of any copy.

Done when the build check has run with real output recorded. List components created, modified, and skipped, with a reason for each skip. Commit if the build check passed. Stop.

---

## Chunk 5: hero

Read `docs/PROJECT_STATE.md`, `docs/AUDIT.md`, and `docs/HERO_IMAGE.md` first.

Image choice: Awanish states it in the message that starts this chunk. If he did not, stop and ask.

1. Before deleting anything, list every link, piece of content, and asset in the current hero. Carry each link and each piece of real content (not decoration) into the new hero, or log why it was dropped under Removals.
2. Delete the current hero component and its styles and assets. Delete a style or asset only after a search shows nothing else uses it. Keep the hero's anchor ID on the new hero so navigation links still work.
3. Build the new hero with:
   - his name,
   - his role, taken from existing site copy, or "UI/UX Designer" if the site states none,
   - the two fixed facts, read from the content file constants,
   - one line on what he designs, taken from existing site copy. If no existing line says this, write neutral copy limited to his role and log the gap,
   - a primary action and a secondary action with specific labels that point to targets that exist (for example "View selected work" linking to the work section's anchor, and "Open Behance profile"),
   - one dashboard or product UI image as the main visual.
   
   Store all hero copy in the content file.
4. Self-host the image under `public/`. Do not hotlink. If the download fails or the source blocks it, stop and report. Do not substitute another image. Apply only the crop recorded in `docs/HERO_IMAGE.md` or stated by Awanish. Use `next/image` with explicit `width` and `height`, a correct `sizes`, and whichever prop the installed version's docs say marks the LCP image. Alt text describes what the screenshot shows and makes no claims about outcomes.
5. If Awanish chose an Unsplash stand-in, pick a real dashboard or product UI photo. Record its URL, photographer, and the license text you checked. Do not caption it or present it as Awanish's work. Log it under Content gaps as temporary and a blocker for going live.
6. No illustrations, blobs, abstract graphics, or placeholder art.
7. Animation is optional. The default is none. If you add GSAP, install `gsap` and `@gsap/react`, log why, and:
   - use `useGSAP` from `@gsap/react`, following the installed version's docs for setup,
   - wrap all animation in `gsap.matchMedia` and skip motion under `prefers-reduced-motion: reduce`,
   - keep all content visible without JavaScript and do not hide content with CSS while waiting for GSAP,
   - do not animate the opacity or visibility of the `h1` or the hero image. With server-rendered HTML this causes a visible flash on hydration and can delay LCP. Limit motion to secondary elements, or to small transforms that start from the rendered state,
   - no layout shift,
   - document the logic in a short comment.
8. Layout holds at 375, 768, and 1440 px with no horizontal scroll. Check this in a browser if one is available. Otherwise record it as "not run" with the reason.

Do not touch other sections.

Done when the build check has run with real output recorded. Commit if the build check passed. Stop.

---

## Chunk 6: skills

Read `docs/PROJECT_STATE.md` and `docs/AUDIT.md` first, especially the existing skills list.

Build the skills section with one shared item component and one shared group layout. Store all skill data in the content file.

Groups:

- **UI/UX Design:** every existing skill that is a design skill or design tool.
- **Video Editing:** DaVinci Resolve, Adobe After Effects, Adobe Premiere Pro.
- **Data Analytics:** Microsoft Excel, Power BI, SQL, Python.

Give each group a one-line description of what that category of tools is for (for example "Tools for editing footage and motion graphics"). Do not describe what Awanish did with them. Do not claim projects, clients, or expertise levels.

Rules:

- Place every existing skill in exactly one group. If a skill clearly fits none of the three (for example a front-end language), add a fourth group, "Other tools", rather than forcing it into a wrong group. Log each such placement.
- If an existing skill duplicates one of the new tools, keep one entry, use the existing site's wording, and log it.
- Never drop a skill silently.
- No proficiency bars, percentages, star ratings, levels, or years per tool.
- Keep the section's existing anchor ID and heading level.

Do not touch other sections.

Done when the build check has run with real output recorded. Print a table of each original skill, quoted from the audit, and the group it landed in. Commit if the build check passed. Stop.

---

## Chunk 7: copy pass and error pages

Read `docs/PROJECT_STATE.md` and `docs/AUDIT.md` first.

### Part A: copy

Rewrite the copy in the content file for every section except the hero and skills, following the Copy rules. Replace any conflicting experience count with the constants. Do not add claims, metrics, or details that are not in `docs/AUDIT.md`. Do not change link targets or anchor IDs. Where content is missing, write neutral copy and log the gap under Content gaps. Print a before and after table for every changed string, with the before column quoted from the audit.

### Part B: error and loading pages

Read the docs for the installed Next.js version for these file conventions before writing them. The requirements below describe intent. Where the docs differ, follow the docs and log the difference.

- `app/not-found.tsx`: a clear message and a link home.
- `app/error.tsx`: a client component with a friendly message, a retry action using the reset or retry mechanism the installed version documents, and a link home.
- `app/global-error.tsx`: it replaces the root layout, so it renders its own `html` and `body`, imports the global stylesheet, and loads any fonts it needs itself. It must not depend on layout-provided fonts or providers.
- `app/loading.tsx`: add it only if the audit shows a route that can actually suspend. Otherwise skip it and say why. Do not add fake delays.

Never render `error.message`, stack traces, or digests. Each page has one `h1` and uses the tokens and shared components. Responsive and accessible.

Testing:

- Test `not-found` by opening an unknown route.
- Test `error.tsx` with a temporary throw in a page component, and `global-error.tsx` with a temporary throw in the root layout, each in a production build (build, then start), because the dev overlay masks them.
- Remove all temporary test code, confirm its removal with a search, then run the final build check on the clean code. Ship no test routes.

Done when the final build check has run with real output recorded and the temporary test code is confirmed removed by search. Commit if the build check passed. Stop.

---

## Chunk 8: metadata, accessibility, documentation

Read `docs/PROJECT_STATE.md` and `docs/AUDIT.md` first.

1. Metadata: set `metadataBase` to `https://awanishverma.com`, from a single constant in the content file. Give each page a title, description, canonical URL, and Open Graph basics. Any experience counts in metadata come from the content file constants. Log under Assumptions that canonical URLs point to a domain that must be live before this goes to production.
2. Favicon: keep the existing one if there is one. If there is none, add a minimal text monogram of his initials using the tokens, and log it for Awanish's approval.
3. Add `app/sitemap.ts` and `app/robots.ts` only if each stays a few lines. Use only text and images that exist. Do not add an Open Graph image unless one already exists.
4. Accessibility: check every item in the Accessibility baseline, on every page including the error pages, and fix the gaps.
5. Hydration: no `Date`, random values, or `window` access during render.
6. Documentation: comment only non-obvious architecture, accessibility or responsive behavior, GSAP logic, and the content file's structure. Add a short README section covering setup, the required Node version, scripts, and where content lives. Remove comments that restate code.
7. Dependencies: if `gsap` or `@gsap/react` is installed but unused, remove it and log the decision so Awanish can reverse it. Remove other dead code and unused dependencies, confirming each by search. Log each removal.

Do not redesign anything.

Done when the build check has run with real output recorded. Commit if the build check passed. Stop.

---

## Chunk 9: verification and report

Verify, do not build.

1. Run and record the real output of the production build, `tsc --noEmit`, and ESLint. Use the lint script in `package.json`, or ESLint directly if the installed Next.js has no lint command. If the project has no ESLint config, record "not run: no ESLint config". Do not add one.
2. If a browser is available, check the following. Use `npx` for one-off tools and add no dependencies.
   - widths of 375, 768, and 1440 px with no horizontal scroll
   - keyboard-only navigation, including the skip link and focus order
   - `prefers-reduced-motion` on
   - console errors and hydration warnings
   - broken internal links and images
   - external links. If a site answers automated requests with 403 or 429 (Behance often does), record that separately and do not call the link broken.
   - the 404 page
   - the error page, in a production build
3. Any check you cannot run gets "not run" and the reason.
4. Fix only defects you found. Log each fix. Add no features. After any fix, rerun the build check and recheck what the fix touched. Any temporary test code follows the Chunk 7 rule: remove it and confirm by search.

Final report, saved to `docs/FINAL_REPORT.md` and printed:

1. Summary of changes
2. Exact versions used
3. Components retained, modified, replaced, and new
4. Skills added, plus existing skills that needed placement
5. Hero image chosen, its source, its license or permission status, and why
6. Error and loading states, including whether `loading.tsx` exists and why
7. Architecture and dependency decisions, each with its reason
8. Verification results, with real output or "not run"
9. Blockers before going live: a temporary image, unconfirmed image rights, the domain not yet live, and copy gaps
10. Assumptions and content that Awanish needs to confirm

Then review the result twice: once as an employer judging a senior UI/UX designer, and once as a developer new to the repo. List concrete problems, each with a file or screen reference. Do not write general praise.

Commit if the build check passed. Stop.
