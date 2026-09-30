# Audit

Date: 2026-09-30. Chunk 1.

## Summary

There is no source repository. The working folder held only `PORTFOLIO_REDESIGN.md` and was not a git repository. The logged-in GitHub account (`itsankitv`) can access one repo, `multiply`, which is unrelated. A folder at `~/Desktop/astrojs portfolio` holds an Astro port of the site. Its README says "Migrated from Next.js 15 to Astro". It is not a git repository and was not used.

Everything below comes from the live site, https://ux-portfolio-self-nine.vercel.app/, fetched with `curl` on 2026-09-30. The page is prerendered (`x-nextjs-prerender: 1`), so the HTML contains all server-rendered copy. Modal and CV content comes from the site's own data module in the client bundle (`/_next/static/chunks/356-afd9e24fb66df89e.js`). I evaluated it with Node and saved it verbatim as `docs/live-site-data.json`.

Awanish chose to rebuild from the live site (Chunk 1R).

## 1. Framework and versions

| Item | Value | Source |
|---|---|---|
| Framework | Next.js | `x-nextjs-*` headers, `/_next/` assets |
| Router | App Router | `app/page`, `app/layout`, `app/error`, `app/global-error`, `app/not-found` chunks |
| `src` directory | unknown | no source |
| Package manager | unknown | no source |
| Node version | local: v25.9.0. Project `engines`/`.nvmrc`: unknown | `node -v` |
| next | 15.5.23 | `version:"15.5.23"` in chunk `255-*.js` |
| react / react-dom | 19.2.0-canary-0bdb9206-20250818 (the React build bundled by Next) | chunk string |
| typescript, @types/react, eslint, eslint-config-next | unknown | not visible in a production bundle |
| tailwindcss | used (Tailwind utility classes and `var(--…)` arbitrary values in markup). Version unknown | HTML classes |
| gsap, @gsap/react | not used | no `gsap` string in any chunk |
| Other runtime libraries seen | Motion/Framer Motion (`MotionConfig reducedMotion:"user"`, `layoutId`, `useScroll`, `useSpring`), Lenis smooth scroll (`lenis`, `data-lenis-prevent`), lucide-style icons, `next/image` | page chunk |
| Font | "googleSans" loaded through `next/font` (`__variable_3d51df`) | CSS |

## 2. Route and file tree

Source tree: unknown. Routes observed:

- `/`: the single page
- `/_not-found`: custom 404 page, returns HTTP 404
- `error` and `global-error` boundaries exist (chunks present)
- `/manifest.webmanifest`, `/robots.txt`, `/sitemap.xml`, `/icon` (512×512 PNG), `/apple-icon` (180×180 PNG), `/opengraph-image` (1200×630 PNG), `/twitter-image` (1200×630)

## 3. Page sections in order

| # | Section | Element / anchor ID | Heading ID |
|---|---|---|---|
| — | Skip link | `a[href="#main-content"]` | — |
| — | Scroll progress bar (decorative, `aria-hidden`) | — | — |
| — | Header | `header#main-header` | — |
| 01 | Hero, including the "Design System Generator" token sandbox card (`#token-sandbox-card`) | `section#hero` | `#hero-heading` (h1), `#token-sandbox-heading` (h2) |
| 02 | Selected case studies | `section#projects` | `#projects-heading` |
| 03 | Career history | `section#experience` | `#experience-heading` |
| 04 | Craft & capability (skills) | `section#skills` | `#skills-heading`, group h3s `#skills-ui-ux-product-design`, `#skills-design-systems-token-architecture`, `#skills-frontend-implementation-design-led-` |
| 05 | Endorsements & peer reviews | `section#testimonials` | `#testimonials-heading` |
| 06 | Availability & contact | `section#contact` | `#contact-heading` |
| — | Footer | `footer` | `#footer-heading` (sr-only) |
| — | CV modal (opened by the Resume buttons) | `role=dialog`, `aria-labelledby=resume-modal-title` | `#resume-modal-title` |
| — | Case study modal (opened by each project card) | `role=dialog`, tabs `#tab-overview`, `#tab-architecture`, … | — |

Main navigation (header, desktop and mobile menu `#mobile-navigation`) uses buttons that scroll to sections, not anchor links: Work → `#projects`, Experience → `#experience`, Skills → `#skills`, Contact → `#contact`. The brand link is `a[href="#hero"]`. The footer "Index" uses the same four buttons. Testimonials is not in the nav.

Component file names: unknown (no source).

## 4. Links

| Label | Target | Where |
|---|---|---|
| Skip to main content | `#main-content` | top |
| AV / Awanish Verma (brand) | `#hero` | header |
| GitHub | https://github.com/avanishverma4 | hero, contact, footer |
| LinkedIn | https://linkedin.com/in/awanish-verma | hero, contact, footer, CV |
| Behance | https://behance.net/avanishverma4 | hero, contact, footer, CV |
| Instagram | https://www.instagram.com/avanishverma4 | contact, footer |
| avanishverma4@gmail.com | `mailto:avanishverma4@gmail.com` | contact, CV |
| XpertOnline Chatbot | https://www.behance.net/gallery/231083459/XpertOnline-Chatbot | case study modal, CV |
| Water Drink Reminder App | https://www.behance.net/gallery/207598711/Water-Drink-Reminder-App | case study modal, CV |
| Plant App UX Design Process | https://www.behance.net/gallery/178415273/Plant-App-UX-Design-Process | case study modal, CV |
| Doctor-Patient Management App | https://www.behance.net/gallery/221640093/Doctor-Patient-Management-App | case study modal, CV |
| Academy of Dental Excellence | https://dentalexcellence.academy/ | case study modal |
| Password Generator | https://random-password-generator-eight-xi.vercel.app/ | case study modal |
| Jumblefix | https://jumblefix.vercel.app/ | case study modal |
| CV link list | `ek.url` (site URL), LinkedIn, GitHub, Behance | CV header |

External links open in a new tab with an sr-only "(opens in a new tab)". No project has a `githubUrl`, so the modal's "Source code" button never renders.

## 5. Copy

All data-driven copy (profile, projects, experiences, education, certifications, skill categories, testimonials) is quoted exactly in `docs/live-site-data.json`. The static UI strings below are quoted exactly from the HTML and the page bundle.

**Header:** "AV" · "Available for contract and senior roles" · "Awanish Verma" · "Design Systems" · nav "Work", "Experience", "Skills", "Contact" · theme button "Switch to light mode" / "Switch to dark mode" · "CV / Resume" (short "CV") · "Open navigation menu" / "Close navigation menu" · mobile "View CV / Resume".

**Hero (01):** eyebrow "Open to work". h1: sr-only "Awanish Verma — UI/UX Designer & Design Systems Architect, Bengaluru", visible "Complex problems, shaped into clear, human-centered products." Paragraph: "Crafting intuitive product experiences, pixel-perfect design systems, user-centric interfaces, and high-fidelity interactive prototypes." Tags: "User research • Token pipelines • Interaction architecture • Design systems". Buttons: "Explore selected work", "Resume" (title "View formatted curriculum vitae"). Stats: "7+ Years Experience", "24+ UI/UX & Systems Built", "150+ User Testing Studies", "14+ Design Token Systems". "Connect" GitHub / LinkedIn / Behance.

**Token sandbox card:** "Design System Generator", "Reset design system to defaults", "Accent", presets "Emerald Minimalist", "Cobalt Blue", "Sunset Amber", "Crimson Rose", "Pick accent colour", "Hex", "Enter a valid hex colour, e.g. #3b82f6", "Radius" 0/4/8/12/20px, "Type scale" (range, 16 px default), "Density" "Compact"/"Comfy"/"Spacious", "Live preview", "Site-wide sync", "Token Action", "Active Tag", "Toggle", "Sample text input using the current tokens", "Export" "CSS"/"Tailwind".

**Projects (02):** eyebrow "Selected case studies". h2 "Crafted for user delight, accessibility, and design clarity." Filters (group "Filter case studies by category"): "All work 7", "UI/UX & Product Design 3", "Mobile & Web Apps 2", "Interactive Prototypes 2". Live region "7 case studies shown." Empty state "No case studies in this category yet." / "Show all work". Card button label "Open case study: {title}". Cards show number, title, impactMetric, category.

**Case study modal:** "Case Study", "Close case study", "Key business / product outcome", tablist "Case study sections" with tabs "Overview & Scope", "Architecture & Tech", "Key Features", "Visual Gallery". Overview: overview, description, "Technologies & frameworks" + techStack. Architecture: "Process & system overview" + architecture, "Design foundations": "Token-driven theming, reusable component states, documented handoff specs.", "Quality bar": "WCAG AA contrast, keyboard-complete flows, responsive from 320px up." Features: "Key capabilities" + keyFeatures. Gallery: galleryImages, "Enlarge {title} image {n} of {total}", lightbox "Close enlarged image", "Show image {n}". Footer: "View live case study", "Close".

**Experience (03):** eyebrow "Career history". h2 "Professional journey & impact." Accordion per role: number, role, "company · location", period, "Current role." for exp-1, then description, achievements, and skill tags.

**Skills (04):** eyebrow "Craft & capability". h2 "Design systems thinking, end to end." Paragraph "7+ years spanning user research, Figma token variable systems, interaction wireframing, and the frontend implementation that ships them." Stats "Disciplines 12", "Practice areas 3", "Years hands-on 7+". Filters (group "Filter skills by category"): "All skills 12", "Product design 5", "Design systems 4", "Frontend 3". Search: label "Search skills", placeholder "Search skills — Figma, tokens…", "Clear skill search", "Reset filters", live region "12 skills matching the current filters." Group headings with "{n} disciplines". Each skill shows name, highlight, "{experienceYears} yrs", and level (number 0–100).

**Testimonials (05):** eyebrow "Endorsements & peer reviews". h2 "Trusted by founders & engineering leaders." Quote cards with initials, author, role, company (see data).

**Contact (06):** eyebrow "Availability & contact". h2 "Let's discuss your next digital product." Paragraph: "I take on work where design decisions still matter — early product vision, systems that need structure, teams that need direction. Tell me what you're building and where it's stuck; a paragraph is plenty to start." "Direct email" "No forms" (email link) · "Reply time" "Within 24 hours" · "Location" "Bengaluru, India / Remote Worldwide" · "Available for Product Design Contracts & UI/UX Design System Advisory". Services: "01 Product design leadership": "Owning a new product vision end to end — research, IA, interaction, and the shipped interface." · "02 Design system architecture": "Token pipelines, component libraries, and the governance that keeps them alive after launch." · "03 Design advisory & audits": "Short engagements: UX audits, accessibility reviews, and direction for in-house design teams." Social cards: "GitHub Code & token pipelines", "LinkedIn Career & writing", "Behance Case studies", "Instagram Interface shots".

**Footer:** "AV Awanish Verma UI/UX & Design Systems", availability line, "Index" (Work ↓, Experience ↓, Skills ↓, Contact ↓), "Elsewhere" (GitHub, LinkedIn, Behance, Instagram), "© 2026 Awanish Verma", "Top" / "Scroll back to top of page".

**CV modal:** "Curriculum Vitae — Awanish Verma", "Print / Save PDF", "Close curriculum vitae". Name, profile.title, email, location, links. Sections "Professional Summary" (longBio), "Professional Experience" (role, company, period, location, description, achievements, "Skills:"), "Selected Projects" (first 4 projects: title link, tagline, "Impact:" metric without emoji, "Tools:"), "Core Skills":
- "Product & Interaction Design: UI/UX Design, Product Design, Interaction Design, Wireframing, Interactive Prototyping, Information Architecture, Visual Design, Responsive Design, Mobile App Design"
- "Design Systems: Design Systems, Design Tokens, Component Libraries, Figma (Auto Layout, Variables, Components), Style Dictionary, Multi-Brand Theming, Design-to-Code Handoff"
- "User Research: User Research, User Interviews, Usability Testing, Personas, Journey Mapping, Empathy Mapping, A/B Testing, Competitive Analysis, Heuristic Evaluation"
- "Frontend & Tools: React, Next.js, TypeScript, HTML5, CSS3, Tailwind CSS, WCAG 2.1 AA Accessibility, Adobe Creative Suite (Photoshop, Illustrator, After Effects), Git"

Then "Education" and "Certifications" (see data).

**404 page:** "404" "Page not found" · "This page isn't part of the portfolio." · "The link may be outdated, or the address slightly off. Everything — case studies, experience, the token sandbox — lives on a single page, one link away." · "Back to the portfolio" · "Selected work" · "Index" (Work, Experience, Skills, Contact).

**Error page:** "Try again", "Reload the portfolio", "Reference" (renders an error reference/digest), plus other copy not fully recoverable from the bundle. **Global error:** "Something went wrong — Awanish Verma", "500", "Application error", "The site failed to load.", "Try again", "Reload the portfolio", "Reference".

**Metadata:** title "UI/UX Designer & Design Systems Architect — Awanish Verma". Description "UI/UX designer and design systems architect in Bengaluru, available worldwide. 7+ years of product design case studies, design tokens and interaction design." Canonical and author `https://www.awanishverma.com`. OG type `profile`, OG/Twitter image alt "Awanish Verma — Senior Lead UI/UX Designer & Design Systems Architect". Twitter `@awanishverma`. A long keywords list. Theme colors `#fafafa` (light) and `#050505` (dark).

### Experience counts that conflict with the fixed facts

Replace these in the chunk that owns them:

- Hero stat "7+ Years Experience" (Chunk 5)
- Skills paragraph "7+ years spanning…" and stat "Years hands-on 7+" (Chunk 6)
- `profile.longBio` "With over 7 years of experience…" in the CV (Chunk 7)
- Meta, OG, Twitter, and manifest descriptions "7+ years…" (Chunk 8)
- OG image text "7+ Years Experience" (Chunk 8)
- Per-skill "{n} yrs" values (Chunk 6: removed, since no per-tool years are allowed)

Note: the experience dates on the site run from Sep 2015 to present, which is consistent with "11 years".

### Other claims to flag

These are on the live site now, so later chunks may keep them. They are not verified.

- Hero stats "24+", "150+", "14+".
- Project impact metrics ("+60%", "4.8★", "100% positive", "65%").
- Achievement percentages in the experience entries.
- Two testimonials.
- `profile.title` says "Senior Lead UI/UX Designer & Design Systems Architect", while the h1 and meta say "UI/UX Designer & Design Systems Architect".

## 6. Assets

| Asset | Size | Used where |
|---|---|---|
| Project cover and gallery images | 1200 px wide (`w=1200`), height unknown | 14 Unsplash URLs, hotlinked via `next/image` with `referrerPolicy="no-referrer"`. See `live-site-data.json`. |
| `/icon` | 512×512 PNG | favicon: "AV" in blue on near-black, rounded square |
| `/apple-icon` | 180×180 PNG | Apple touch icon |
| `/opengraph-image`, `/twitter-image` | 1200×630 PNG | Generated. Shows name, title, bio, and the four stats including "7+". |

**The project images are Unsplash stock photos, not Awanish's work.** They do not show the designs they illustrate. Flag this for Chunk 2 and the final report.

No image of Awanish, no resume PDF (the CV is an HTML modal with `window.print()`), no local images.

## 7. Animations and interactions

| Feature | Driven by |
|---|---|
| Smooth scrolling | Lenis, disabled under `prefers-reduced-motion: reduce` |
| Scroll progress bar | Motion `useScroll` + `useSpring` |
| Modal enter/exit, tab underline | Motion (`AnimatePresence`, `layoutId`) under `MotionConfig reducedMotion="user"` |
| Section nav scroll + active section | JS scroll listener, `window.scrollY` |
| Theme toggle | React context + `localStorage` key `av_portfolio_theme`, follows `prefers-color-scheme` by default. SSR HTML has `class="dark"`. |
| Token sandbox | Live-edits CSS variables site-wide. Stored in `localStorage` (`av_portfolio_tokens`, `av_portfolio_accent_cache`). Exports CSS/Tailwind. |
| Project filter | client state, `aria-live` count |
| Case study modal | dialog with focus trap, Escape to close, arrow-key tabs, image lightbox |
| Experience accordion | buttons with `aria-controls` panels |
| Skill filter and search | client state, `aria-live` count |
| CV modal | dialog, `window.print()` with print stylesheet |
| Mobile menu | button with `aria-expanded`, `aria-controls="mobile-navigation"` |
| Back to top | button |

## 8. Unused dependencies

Not determinable. There is no `package.json`. Searches were not possible.

## 9. Theme behavior

Light and dark themes with a toggle. The default follows the system preference. The choice persists in `localStorage`.

## 10. Existing skills list (quoted exactly)

**UI/UX & Product Design**
- Figma & Design Systems: "Auto-Layout, Variables, Component Libraries, Tokens" (7 yrs, 98)
- User Research & Testing: "User Journeys, Personas, Usability Audits, A/B Testing" (6 yrs, 94)
- Interaction Design & Wireframes: "Information Architecture, User Flow, Low/High-Fi Prototypes" (7 yrs, 96)
- Visual Design & Typography: "Fluid Scales, Grid Systems, Color Theory, Editorial Layouts" (7 yrs, 98)
- Micro-Interactions & Motion: "Framer, Motion Specs, Interactive States, Micro-animations" (5 yrs, 92)

**Design Systems & Token Architecture**
- Design Token Specification: "W3C Token Standard, Figma Tokens, Multi-Brand Scaling" (6 yrs, 96)
- Component Library Specs: "Headless UI, Accessible Primitives, Storybook Specs" (6 yrs, 95)
- Accessibility (WCAG 2.1 AA/AAA): "Color Contrast, Focus Management, Screen Reader Testing" (6 yrs, 95)
- Design-to-Code Pipeline: "Figma API, Automated Sync, Token Export, Style Dictionary" (5 yrs, 94)

**Frontend Implementation (Design-Led)**
- React 19 / Next.js 15: "App Router, Interactive UI Components, Responsive Layouts" (6 yrs, 92)
- Tailwind CSS v4 & Modern CSS: "CSS Variables, Container Queries, 8pt Grid Systems" (5 yrs, 98)
- TypeScript & UI State: "Typed Component Props, Clean State Architecture" (5 yrs, 90)

The CV's "Core Skills" block (section 5) is a separate keyword list. It includes Adobe After Effects.

## 11. Static or dynamic

Fully static. The home page is prerendered (`x-nextjs-prerender: 1`, `x-vercel-cache: HIT`) and all data is a bundled constant. No fetches, no request data, no suspense boundaries observed. The only non-page route handlers are metadata images, the manifest, robots, and the sitemap.

## 12. Baseline checks

Not run: there is no source to build.

## 13. Repository vs live site

Not comparable: there is no repository. The Astro folder differs from the live site. It uses the Manrope font and a Cobalt/Paper palette, and its copy was not compared.

## 14. Could not read

- Source code, `package.json`, lockfile, and config: not available.
- Exact TypeScript, ESLint, and Tailwind versions.
- Full `error.tsx` copy (only strings visible in the bundle).
- Microsoft Clarity: the Astro README lists it, but the live Next.js bundle shows no analytics script ("clarity" appears only in the copy "design clarity").

## 15. Blockers for Awanish

- **No repository** (resolved: Awanish chose a rebuild, Chunk 1R).
- **Domain not live:** `https://awanishverma.com` currently serves a parked page that redirects to `/lander`, and `www` returns an empty 200. The live site's canonical is `https://www.awanishverma.com` (with `www`), while this redesign targets `https://awanishverma.com`.
- Node v25.9.0 is a current release, not LTS. Recorded for Chunk 3.
