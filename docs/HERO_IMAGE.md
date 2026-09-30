# Hero image options

Date: 2026-09-30. Chunk 2.

Behance returns HTTP 403 to plain fetches of project pages, so the pages were read in Chrome (browser-harness). Images were fetched to a scratch folder only to measure and view them. Nothing was added to the repo.

## 1. Behance projects the site links to

| Project | URL |
|---|---|
| XpertOnline Chatbot | https://www.behance.net/gallery/231083459/XpertOnline-Chatbot |
| Water Drink Reminder App | https://www.behance.net/gallery/207598711/Water-Drink-Reminder-App |
| Plant App UX Design Process | https://www.behance.net/gallery/178415273/Plant-App-UX-Design-Process |
| Doctor-Patient Management App | https://www.behance.net/gallery/221640093/Doctor-Patient-Management-App |

The site also links the profile (https://behance.net/avanishverma4). The other three live projects (Academy of Dental Excellence, Password Generator, Jumblefix) link to their own websites, not Behance, and were not reviewed.

## 2. Product UI images per project

**No project contains a desktop dashboard or web-app screenshot.** All interface work shown is mobile.

### XpertOnline Chatbot

31 slide images, each 1400×788. Base URL: `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/<id>.png`. A `max_3840_webp` variant is listed in the srcset.

It is a usability-test report deck. Most slides are text (test plan, personas, questionnaire, metrics tables, bar charts). Slides with interface content:

| Image id | Shows |
|---|---|
| `545f5a231083459.6882574ebea7d.png` and the following "Qualitative Analysis" slides (6 total) | Text boxes beside two small dark-mode Android chatbot screenshots ("XpertOnline") |
| Three "Refined wireframes" slides | Before/after pairs of small chatbot screens with a justification text block |

The phone screens take up roughly 15% of each slide and are not legible at hero size.

**Note:** slide 1 ("Executive Summary") names four people: Awanish Verma, Jyotirmoy Goswami, Sphoorthy Gowda, and Mukesh Gupta. It also describes the product as an "SMS Chatbot for Apollo Hospital". This is group and client-related work.

### Water Drink Reminder App

One composite image: `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/7b20ab207598711.66e064f18b5b2.jpg`, 1400×13989 (`max_3840_webp` variant listed).

It is a single long case-study board: cover banner with phone mockups ("Drops Water Tracker"), overview, personas, typography and colour specs, wireframes, a mockup grid of about 20 iPhone screens (light blue UI), and a "Thank You" footer with contact details.

### Plant App UX Design Process

One composite image: `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9f9347178415273.64e76d1ba9fe0.jpg`, 1400×8751 (`fs_webp` variant listed).

It shows a green plant-shop app: cover with two phones, style guide, splash screens, plant detail, cart and payment screens, and an app screen collage. **The body text on the boards is lorem ipsum** ("Lorem ipsum dolor sit amet…") and the UI uses placeholder copy ("Lorem ipsum" as a delivery location).

### Doctor-Patient Management App ("DOCTO")

One composite image: `https://mir-s3-cdn-cf.behance.net/project_modules/1400/6725dd221640093.67d84825d10d3.jpg`, 1400×26672. The largest variant is `.../project_modules/fs/6725dd221640093.67d84825d10d3.jpg` at 1720×32768.

It includes project overview, survey charts, empathy map, affinity diagrams, prioritisation matrix, paper sketches, wireframes, mood board, design system (colours, type, form elements), a "Hi Fidelity or Final UI Design" grid of 16 Android screens, a test phase, and "My Learning".

## 3. Recommendation

**Doctor-Patient Management App: the first row of the "Hi Fidelity or Final UI Design" grid.**

- **Source:** `https://mir-s3-cdn-cf.behance.net/project_modules/fs/6725dd221640093.67d84825d10d3.jpg` (1720×32768)
- **Proposed crop:**
  - on the 1400-wide variant: x 1, y 21720, width 1399, height 680 (verified by cropping)
  - on the fs variant: x 1, y ≈ 26685, width ≈ 1719, height ≈ 835 (scaled ×1.2286, to be confirmed in Chunk 5 before export)
  - result: about 2.06:1
- **Shows:** four Android phone screens on a white background. From left to right:
  - blue splash screen with the "DOCTO" wordmark and a doctor illustration
  - "Login" screen with a phone-number field, "Continue" button, and Google/Facebook/Twitter sign-in
  - "OTP Validation" screen
  - doctor home screen: "Good Morning, Rohit", "12/26 · 14 Pending appointments today", "Today's appointment" patient cards, a "Missed appointments" list, and a bottom tab bar

**Why:** it is the only wide, legible, final-fidelity interface image across the four projects. It shows real screens rather than process boards, and the healthcare dashboard screen is the closest thing to "dashboard UI" available. The other candidates fall short:

- XpertOnline's UI is too small and text-heavy.
- The Plant App contains lorem ipsum.
- The Water app's mockup grid is dense, and its cover banner is a marketing composition, not an interface.

Limitations: it is mobile, not desktop, and the cards repeat the same placeholder patient ("Shyam Kumar, 28 years").

**Awanish must confirm he may publish this image.** It is already public on Behance, but a hero placement is more prominent. Also confirm whether the project was personal, course, or client work. The screens show no client branding.

Runner-up: the Water Drink Reminder App mockup grid (four rows of iPhone screens, about y 10500–13000 on the 1400 variant). It is cleaner but less legible at hero size.

## 4. Other findings for later chunks

- The live site's impact metrics do not appear in the Behance projects reviewed (for example "+60% increase in user engagement" for XpertOnline, whose deck reports a six-user usability test). Log this for the final report's "content needing confirmation".
- All project images on the live site are Unsplash stock photos (see AUDIT §6), while real project images exist on Behance. Chunk 7 or a later task could swap them, with Awanish's permission.
