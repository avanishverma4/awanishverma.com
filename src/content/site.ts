// All site content. Components only read from this file.
//
// Structure:
//   facts          totalExperience, uiuxExperience (the only experience lengths the site may state)
//   data           profile, projects, experiences, education, certifications, skillGroups, testimonials
//   navigation     siteUrl, nav, socials
//   ui             UI copy grouped by section (header, hero, projects, caseStudy, …, meta)
//
// Data started as a verbatim copy of the original site (docs/live-site-data.json).

// Fixed facts supplied by Awanish. Updated by hand; never state any other experience length.
export const totalExperience = "11 years";
export const uiuxExperience = "8 years";

export type ProjectImage = { src: string; width: number; height: number; alt: string };

export type Project = {
  id: string;
  // URL of the case study page: /work/<slug>. The seven original slugs are the live site's.
  slug: string;
  // The role (an id in `experiences`) the product was made in, when it was made for an employer.
  // The case study shows that company, and the role lists the case study.
  experienceId?: string;
  title: string;
  tagline: string;
  category: string;
  cover: ProjectImage;
  gallery: ProjectImage[];
  // Heading for the images after the cover, when they are not app or web screens.
  galleryTitle?: string;
  // Only verifiable outcomes; unsupported metrics from the original site were removed.
  outcome?: string;
  team?: string;
  description: string;
  overview: string;
  // Optional case-study narrative. Each shows as its own section when filled in; nothing is
  // invented for projects that do not have it yet.
  problem?: string;
  role?: string;
  process?: string[];
  // What the work found (for analysis projects), shown as its own section.
  findings?: string[];
  // How the work was done, in a sentence (optional), and the methods used, as a list.
  approach?: string;
  methods: string[];
  keyFeatures: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  description: string;
  achievements: string[];
  skills: string[];
};

export type Skill = { name: string; detail?: string };
export type SkillGroup = { name: string; scope: string; skills: Skill[] };

export const profile = {
  "name": "Awanish Verma",
  "title": "UI/UX Designer",
  "longBio": `I design digital products people enjoy using, and I use data to show whether they work. ${totalExperience} across graphic design, UI/UX, and front-end development, including ${uiuxExperience} in UI/UX: print branding at Skanda Graphics, telemedicine products at i2i TeleSolutions, and today an eLearning and government-jobs platform at Acadlog. Skilled in user research, user flows, wireframes, prototypes, and design systems in Figma and Adobe XD; responsive, accessible builds with React, Next.js, and Tailwind CSS; and data analytics with SQL, Python, Power BI, and Excel, so design decisions start from evidence rather than opinion.`,
  "location": "Patna, India / Remote",
  // The one availability line, used in the hero, contact section, and footer.
  "availability": "Open to UI/UX, web, and data analyst roles, remote-friendly",
  "email": "avanishverma4@gmail.com",
  "github": "https://github.com/avanishverma4",
  "linkedin": "https://linkedin.com/in/awanish-verma",
  "behance": "https://behance.net/avanishverma4",
  "instagram": "https://www.instagram.com/avanishverma4"
};

// Order is the Work section order: DOCTO first as the featured bento tile, then the Food Delivery
// App. The CV lists the projects named in cvProjectIds, below the list.
export const projects: Project[] = [
  {
    "id": "project-4",
    "slug": "doctor-patient-management-app",
    "title": "DOCTO — Doctor-Patient Management App",
    "tagline": "Healthcare platform UI/UX connecting doctors and patients with streamlined appointment booking and EHR.",
    "category": "UI/UX & Product Design",
    "cover": {"src": "/images/projects/docto-cover.jpg", "width": 1260, "height": 750, "alt": "DOCTO cover: angled phone screens including the doctor home, login, patient information, and splash screens."},
    "gallery": [{"src": "/images/projects/docto-cover.jpg", "width": 1260, "height": 750, "alt": "DOCTO cover: angled phone screens including the doctor home, login, patient information, and splash screens."}, {"src": "/images/projects/docto-screens.jpg", "width": 1600, "height": 877, "alt": "Four DOCTO screens: Today's appointment, Patient information with appointments and prescriptions, Missed appointment, and search results."}, {"src": "/images/projects/docto-colors.jpg", "width": 1440, "height": 1509, "alt": "DOCTO design system colour page: primary blue, secondary red, grey, and alert colour scales with hex values."}],
    "description": "A comprehensive healthcare UI/UX case study featuring dual-role interfaces for medical professionals and patients, electronic health record (EHR) management, and telehealth consultations.",
    "overview": "Designed to bridge communication between healthcare providers and patients. Focused on high legibility, HIPAA-compliant design patterns, empathetic color palettes, and clear appointment scheduling workflows.",
    "methods": ["Healthcare UX Patterns", "Figma Wireframing", "Dual Persona Architecture", "Accessible Medical Dashboards"],
    "keyFeatures": [
      "Patient portal for friction-free specialist search and instant slot booking",
      "Doctor clinical dashboard with patient vitals, medical history, and a prescription generator",
      "Secure video consultation call interface with real-time note-taking",
      "Lab report viewer with intuitive chart visualizations of health parameters"
    ],
    "techStack": [
      "Healthcare UI/UX",
      "Figma",
      "Product Design",
      "Design Systems",
      "User Research"
    ],
    "liveUrl": "https://www.behance.net/gallery/221640093/Doctor-Patient-Management-App"
  },
  {
    "id": "project-11",
    "slug": "food-delivery-app",
    "title": "Food Delivery App",
    "tagline": "Mobile food ordering app UI: browse by category, open a dish, manage the cart, and reorder from order history.",
    "category": "Mobile & Web Apps",
    "cover": {"src": "/images/projects/food-cover.jpg", "width": 1600, "height": 1000, "alt": "Three Food Delivery App screens: the home screen with search, categories, and burger cards; the Vegetable Burger dish page with an Add to Cart button; and the cart with a total and a Checkout button."},
    "gallery": [{"src": "/images/projects/food-cover.jpg", "width": 1600, "height": 1000, "alt": "Three Food Delivery App screens: the home screen with search, categories, and burger cards; the Vegetable Burger dish page with an Add to Cart button; and the cart with a total and a Checkout button."}, {"src": "/images/projects/food-screens-1.jpg", "width": 1760, "height": 900, "alt": "Four Food Delivery App screens: onboarding with the headline \"Good Food For Good Mood\", the home screen, the Vegetable Burger dish page, and the cart."}, {"src": "/images/projects/food-screens-2.jpg", "width": 1760, "height": 900, "alt": "Three Food Delivery App screens: Saved dishes, Order History with Completed and Ongoing tabs, and Settings with the profile and account links."}],
    "team": "Published on Behance with multiple owners.",
    "description": "Three more screens cover what happens around an order: saved dishes, order history with completed and ongoing tabs, and account settings.",
    "overview": "A food delivery app designed as seven iPhone-size screens (375 × 812). The flow runs from an onboarding screen to a home screen with search, food categories, and a grid of burgers, then to a dish page, the cart, and checkout.",
    "approach": "Designed in Figma.",
    "methods": ["UI/UX", "App Design", "Mobile UI"],
    "keyFeatures": [
      "Home screen with search, a category row, and dish cards with a price, a save heart, and an add button",
      "Dish page with a large photo, a quantity stepper, delivery fee, delivery time, rating, and an Add to Cart button",
      "Cart with quantity controls on every item and a subtotal, shipping, and total summary above Checkout",
      "Order history with Completed and Ongoing tabs and an Order Again link on every past order"
    ],
    "techStack": [
      "Mobile UI/UX",
      "App Design",
      "Figma"
    ],
    "liveUrl": "https://www.behance.net/gallery/179559893/Food-Delivery-App"
  },
  {
    "id": "project-1",
    "slug": "xpertonline-chatbot",
    "experienceId": "exp-2",
    "title": "XpertOnline Chatbot",
    "tagline": "AI-powered conversational assistant UI/UX design with intuitive chat flow and smart intent architecture.",
    "category": "UI/UX & Product Design",
    "cover": {"src": "/images/projects/xpertonline-cover.jpg", "width": 1200, "height": 750, "alt": "Three XpertOnline chatbot screens in dark mode: the pre-consultation checklist before and after the usability test, and the bot explaining a lab result and offering other languages."},
    "gallery": [{"src": "/images/projects/xpertonline-qualitative-analysis.jpg", "width": 1600, "height": 900, "alt": "Qualitative analysis slide for use case 3, lab test reports: conversation steps and findings beside a dark-mode XpertOnline chatbot screen."}, {"src": "/images/projects/xpertonline-refined-wireframes.jpg", "width": 1600, "height": 900, "alt": "Refined wireframes slide: before and after chatbot screens for the pre-consultation checklist, with the justification for splitting one message into two."}],
    "team": "Designed with a team.",
    "description": "End-to-end UI/UX design case study for an intelligent conversational AI chatbot interface, optimizing response legibility, prompt quick-actions, and multi-turn dialogue UX.",
    "overview": "Designed and prototyped XpertOnline Chatbot to streamline automated support and AI assistance. Focused on reducing friction in complex workflows, designing visual state indicators for streaming responses, and creating intuitive follow-up prompts.",
    "methods": ["User Flow Mapping", "Figma Interactive Components", "Conversation UI Patterns", "Design Tokens", "Accessibility Contrast Validation"],
    "keyFeatures": [
      "Conversational UI with dynamic typing states and structured response cards",
      "Contextual quick-action prompts and intent-based suggestion pills",
      "Accessible dark and light themes optimized for prolonged screen reading",
      "Handoff architecture with comprehensive Figma component states"
    ],
    "techStack": [
      "UI/UX Design",
      "Figma",
      "Conversational UX",
      "User Research",
      "Interaction Design"
    ],
    "liveUrl": "https://www.behance.net/gallery/231083459/XpertOnline-Chatbot"
  },
  {
    "id": "project-12",
    "slug": "social-media-addiction-dashboard",
    "title": "Social Media Addiction Dashboard",
    "tagline": "Six-page interactive Power BI report on how 705 students in 110 countries scroll, sleep, and study.",
    "category": "Data Analytics",
    "cover": {"src": "/images/powerbi/overview.jpg", "width": 1601, "height": 901, "alt": "Executive Overview page of the Power BI report: cards for 705 students, 4.92 hours of daily usage, 64.3% affected academically, and 6.87 hours of sleep, above charts of addiction score by academic level, usage by age, the gender split, and a monthly usage trend."},
    "gallery": [{"src": "/images/powerbi/wellbeing.jpg", "width": 1601, "height": 901, "alt": "Mental Health & Lifestyle page: a gender slicer and three cards (average mental health score 6.23, sleep 6.87 hours, 199 addicted students) over a country by health band matrix, a scatter of addicted score against mental health score by country, and a line of sleep hours by age."}, {"src": "/images/powerbi/academics.jpg", "width": 1601, "height": 901, "alt": "Academic Impact page: an age range slider and two cards over a bar chart of daily usage by academic level and a column chart of academic impact by most-used platform, led by Instagram and TikTok."}, {"src": "/images/powerbi/relationships.jpg", "width": 1601, "height": 901, "alt": "Relationships & Conflicts page: country and academic level slicers over conflict level by relationship status, a relationship status pie (Single 384, In Relationship 289, Complicated 32), and a student table that drills through to a profile."}, {"src": "/images/powerbi/story.jpg", "width": 1601, "height": 901, "alt": "Interactive Story View page: Gender View and Academic Level View bookmark buttons above a bar chart of daily usage by gender and a donut of most-used platform by gender."}],
    "galleryTitle": "Report pages",
    "outcome": "Every task in the brief built: 6 pages, 82 visuals, 3 tables, and 11 measures.",
    "description": "The report has six pages: an executive overview, mental health and lifestyle, academic impact, relationships and conflicts, a bookmark-driven story view, and a drill-through profile for any one student.",
    "overview": "An interactive Power BI dashboard that analyses how students’ social media use relates to their sleep, academic performance, mental health, and relationship conflicts, built from one Excel workbook of 705 students.",
    "problem": "Four groups read the same data for different reasons: academic advisors want usage against academic level and platform, counsellors want sleep, mental health, and addiction scores, researchers want country and gender breakdowns, and a counsellor sitting with one student needs that student’s record at a glance.",
    "role": "Solo Power BI mini project. I built the data model, DAX, theme, and report, and wrote its 9-page documentation.",
    "process": [
      "Load: two Excel sheets read through Power Query, with explicit types, trimmed text, and blank and duplicate IDs removed, from one DatasetPath parameter.",
      "Model: Student_Details and Platform_Details joined one-to-one on Student_ID with cross-filtering both ways, plus a CALENDAR() date table marked as the model’s time table.",
      "DAX: Health Band and Conflict Level calculated columns, and 11 measures from Avg Usage Hours to a year-to-date Monthly Trend with DATESYTD.",
      "Report: six 1280 × 720 pages in a custom Social Pulse theme, with slicers, page navigation buttons, bookmarks, and a drill-through page."
    ],
    "approach": "The dark theme borrows its data colours from the platforms it studies: Instagram pink, TikTok cyan, Facebook blue, and WhatsApp green.",
    "methods": ["Power Query cleaning", "Star schema modelling", "DAX measures and calculated columns", "Time intelligence", "Bookmarks and drill-through", "Custom report theme"],
    "keyFeatures": [
      "Header navigation on every page, with the current page highlighted",
      "Slicers for gender, country, academic level, and a numeric age range",
      "A story page where two bookmark buttons swap the charts between a gender view and an academic level view",
      "Right-click any student in the table to drill through to their profile: platform, sleep, usage, addiction score, conflicts, and mental health rating"
    ],
    "findings": [
      "64.3% of students (453 of 705) say social media affects their academic performance",
      "Affected students average 5.54 hours a day against 3.80, and sleep 6.34 hours a night against 7.81",
      "94% of TikTok users and all 54 WhatsApp users report academic impact, against 30% of Facebook users",
      "High school students score highest on addiction (8.04 of 9), though they are only 27 students",
      "199 students (28%) score 8 or 9 on addiction, the report’s definition of an addicted student",
      "Addicted score and mental health score correlate at −0.95: strong for survey data, and not proof of cause"
    ],
    "techStack": [
      "Power BI",
      "DAX",
      "Power Query",
      "Data Modelling",
      "Data Visualization"
    ],
    "githubUrl": "https://github.com/avanishverma4/powerbi-mini_project"
  },
  {
    "id": "project-9",
    "slug": "retail-store-sql-analysis",
    "title": "Retail Store SQL Analysis",
    "tagline": "SQL analysis of a retail store database: a six-table MySQL schema, a re-runnable data load, and 42 documented business queries.",
    "category": "Data Analytics",
    "cover": {"src": "/images/sql/query-result.jpg", "width": 1485, "height": 928, "alt": "The verification query from the documentation: a UNION ALL statement that counts the rows of all six tables, with its result: customers 30, products 50, orders 400, order_items 1201, payments 400, product_reviews 50."},
    "gallery": [{"src": "/images/sql/cover.jpg", "width": 1485, "height": 930, "alt": "Title page of the documentation: \"Retail Store SQL Solution Documentation\", a complete technical walkthrough of the retail_store database and all 42 business queries across six levels."}, {"src": "/images/sql/verification-levels.jpg", "width": 1485, "height": 1965, "alt": "Documentation page: the UNION ALL verification query with its result (30 customers, 50 products, 400 orders, 1201 order items, 400 payments, 50 reviews), and a table of the six query levels with their question counts and core techniques."}, {"src": "/images/sql/dataset-profile.jpg", "width": 1485, "height": 1680, "alt": "Documentation page, Dataset Profile: 2,131 rows across six tables, with product categories, order statuses, payment methods, the trading window, and a note that four queries correctly return zero rows."}],
    "galleryTitle": "Documentation pages",
    "outcome": "All 42 questions answered, each with its expected result recorded.",
    "description": "The dataset has 2,131 rows across six tables: 30 customers, 50 products, 400 orders, 1,201 order items, 400 payments, and 50 product reviews, covering one year of trading.",
    "overview": "A retail business records every customer, product, order, line item, payment, and review in an operational database, but the raw tables answer nothing on their own. This project builds and documents a complete, verified SQL answer set for the store, from single-table retrieval to set operations.",
    "problem": "Marketing has no clean contact list, merchandising cannot see which categories perform, finance cannot break settlement down by payment method, and inventory cannot separate what sells from what sits. One question can span three tables, the data is stored per line item while questions are asked per order, customer, category, and day, and “never sold” or “never ordered” means reasoning about rows that are not there.",
    "role": "Solo SQL mini project from Data Analytics with GenAI. I wrote the script and its 45-page documentation.",
    "process": [
      "Schema: create the retail_store database and its six tables, with keys and constraints, using CREATE TABLE IF NOT EXISTS.",
      "Load: insert the supplied dataset with INSERT IGNORE, so the script can be re-run without duplicate-key errors.",
      "Verify: one UNION ALL query reports the row count of all six tables before any analysis begins.",
      "Query: answer the 42 questions in six levels, each with a plain-language explanation and its expected result."
    ],
    "approach": "Every query is written to be readable first: keywords on their own lines, short table aliases, and an explicit alias for every calculated column.",
    "methods": ["SELECT, WHERE, ORDER BY", "Aggregations and GROUP BY", "INNER, LEFT, and RIGHT JOIN", "Scalar and correlated subqueries", "EXISTS and NOT EXISTS", "UNION"],
    "keyFeatures": [
      "One script that builds the database, loads the data, verifies the load, and answers every question in order",
      "42 queries across six levels: basics, filtering and formatting, aggregations, joins, subqueries, and set operations",
      "An expected result for every query, including four that correctly return no rows",
      "INTERSECT, which the MySQL setup does not support, replaced with an INNER JOIN and DISTINCT"
    ],
    "findings": [
      "Revenue of ₹69,60,973.66 across 400 orders, an average order value of ₹17,402.43",
      "All 30 customers have ordered and all 50 products have sold: no dormant segment and no dead stock in this dataset",
      "Electronics leads on units sold (687), but Clothing has the highest average item price (₹3,473.17)",
      "Debit Card settles the largest value (₹19,30,577.88) and UPI the smallest (₹16,17,408.78); no single method dominates",
      "194 of 400 orders exceed the placing customer’s own average order value",
      "23 of 30 customers have both ordered and reviewed a product"
    ],
    "techStack": [
      "SQL",
      "MySQL 8",
      "MySQL Workbench",
      "Data Analysis"
    ],
    "githubUrl": "https://github.com/avanishverma4/data_analytics_SQL_1"
  },
  {
    "id": "project-5",
    "slug": "academy-of-dental-excellence",
    "experienceId": "exp-2",
    "title": "Academy of Dental Excellence",
    "tagline": "Dental education web platform with course enrollment, clinical masterclasses, and a student portal.",
    "category": "Mobile & Web Apps",
    "cover": {"src": "/images/projects/dental-home.jpg", "width": 1440, "height": 900, "alt": "Academy of Dental Excellence home page: navigation and a Diploma and Master’s programme hero."},
    "gallery": [{"src": "/images/projects/dental-home.jpg", "width": 1440, "height": 900, "alt": "Academy of Dental Excellence home page: navigation and a Diploma and Master’s programme hero."}, {"src": "/images/projects/dental-intro.jpg", "width": 1440, "height": 770, "alt": "Home page section: a 3D ADE logo beside the headline \"Transform your practice with ADE’s internationally recognised faculty and hands-on training\", a short paragraph, and a Discover our courses link."}, {"src": "/images/projects/dental-courses.jpg", "width": 1440, "height": 600, "alt": "Courses page: three course cards, two postgraduate diplomas leading to a master’s and one diploma, each with its faculty leads and a View details link."}],
    "outcome": "Live production website: 15% faster load times and 20% higher course completion.",
    "description": "A production web platform designed for dental practitioners offering advanced hands-on workshops, online certification courses, and clinical resource downloads.",
    "overview": "Designed and developed the digital presence for Academy of Dental Excellence. Created a high-trust visual style, responsive course catalogs, and a simple event registration flow.",
    "methods": ["Web Architecture", "UI/UX Design", "Responsive Layouts", "SEO Optimization", "Conversion Design"],
    "keyFeatures": [
      "Interactive course catalog with filtering by specialty (Endodontics, Implantology, Aesthetics)",
      "Workshop registration with secure payment checkout",
      "Video masterclass streaming interface with downloadable lecture notes",
      "Faculty and speaker showcase with clinical credentials and past workshop galleries"
    ],
    "techStack": [
      "UI/UX Design",
      "Web Development",
      "Product Design",
      "Tailwind CSS",
      "Responsive Design"
    ],
    "liveUrl": "https://dentalexcellence.academy/"
  },
  {
    "id": "project-10",
    "slug": "i2i-connect-landing-page",
    "experienceId": "exp-2",
    "title": "i2i CONNECT Landing Page",
    "tagline": "Landing page for i2i CONNECT, a cloud-based teleradiology reporting platform, built around one action: request a demo.",
    "category": "Mobile & Web Apps",
    "cover": {"src": "/images/projects/connect-home.jpg", "width": 1440, "height": 720, "alt": "i2i CONNECT landing page: a blue navigation bar, a hero photo of a brain scan with the headline \"Transforming Radiology Across Borders\" and a Subscribe now button, and the start of the About i2i CONNECT section."},
    "gallery": [{"src": "/images/projects/connect-home.jpg", "width": 1440, "height": 720, "alt": "i2i CONNECT landing page: a blue navigation bar, a hero photo of a brain scan with the headline \"Transforming Radiology Across Borders\" and a Subscribe now button, and the start of the About i2i CONNECT section."}, {"src": "/images/projects/connect-services.jpg", "width": 1440, "height": 500, "alt": "About section: a paragraph describing the platform above four service points with icons: Experienced Radiologists, Secure & Standards Compliant, Amazing Service Timelines, and On Call Emergency Reporting."}],
    "description": "The page runs in one scroll: a hero carousel with a Subscribe now button, a short explanation of the platform, four service points, and a three-field demo request form.",
    "overview": "A single-page landing page for i2i CONNECT, a cloud-based tele-diagnostics platform where screening centres and clinics upload medical images and a panel of specialists reports on them remotely.",
    "methods": ["Landing Page Design", "Single-Page Layout", "Lead Capture Form"],
    "keyFeatures": [
      "Hero carousel with one headline and a single call to action that jumps to the demo form",
      "About section that explains the platform in one paragraph",
      "Four service points with icons: radiologist expertise, compliance, service timelines, and on-call emergency reporting",
      "Request a demo form with three fields: name, email, and phone number"
    ],
    "techStack": [
      "Web Design",
      "UI Design",
      "HTML5",
      "CSS3",
      "Bootstrap"
    ],
    "liveUrl": "https://connect-henna-nine-32.vercel.app/"
  },
  {
    "id": "project-6",
    "slug": "password-generator",
    "title": "Password Generator",
    "tagline": "Sleek, customizable strong password generator tool with real-time entropy calculation and instant copy.",
    "category": "Interactive Prototypes",
    "cover": {"src": "/images/projects/password-generator.jpg", "width": 1440, "height": 900, "alt": "Password generator in dark mode: length slider, character options, strength meter, and Generate button."},
    "gallery": [{"src": "/images/projects/password-generator.jpg", "width": 1440, "height": 900, "alt": "Password generator in dark mode: length slider, character options, strength meter, and Generate button."}, {"src": "/images/projects/password-generator-strong.jpg", "width": 1440, "height": 900, "alt": "Password generator after generating an 18-character password: the strength meter reads Strong with all four bars filled, entropy of about 107 bits, and an estimated crack time of over 100 years."}],
    "description": "A modern web application utility designed for maximum privacy, live password strength analytics, custom character parameters, and copy-to-clipboard interactions.",
    "overview": "Built to demonstrate micro-interaction polish, accessible control elements, dark mode visual aesthetic, and client-side cryptographic security.",
    "methods": ["React", "TypeScript", "Web Crypto API", "Tailwind CSS", "Motion animations"],
    "keyFeatures": [
      "Configurable length sliders with real-time visual strength meter",
      "Toggle options for uppercase, lowercase, numbers, and special symbols",
      "Client-side cryptographic randomness using window.crypto.getRandomValues",
      "One-click copy feedback with smooth entry/exit toast notifications"
    ],
    "techStack": [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Web Crypto API",
      "UI Design"
    ],
    "liveUrl": "https://random-password-generator-eight-xi.vercel.app/"
  },
  {
    "id": "project-7",
    "slug": "jumblefix",
    "title": "Jumblefix",
    "tagline": "Fast, interactive web tool for solving and unjumbling word puzzles with clean, responsive UI.",
    "category": "Interactive Prototypes",
    "cover": {"src": "/images/projects/jumblefix-home.jpg", "width": 1425, "height": 900, "alt": "Jumblefix home page: letter tiles for TRAINED, an Unscramble button, and results grouped by word length."},
    "gallery": [{"src": "/images/projects/jumblefix-home.jpg", "width": 1425, "height": 900, "alt": "Jumblefix home page: letter tiles for TRAINED, an Unscramble button, and results grouped by word length."}, {"src": "/images/projects/jumblefix-results.jpg", "width": 1440, "height": 900, "alt": "Jumblefix results for TRAINED: 179 words from 7 letters, grouped by length with a score beside each word; the three 7-letter perfect anagrams are highlighted, with filters for starts with, ends with, and contains above."}],
    "description": "A lightweight, highly performant web application for solving anagrams, jumbled words, and word puzzles with a clean, minimal interface.",
    "overview": "Designed and built Jumblefix as a minimal, fast utility app. Features immediate keyboard focus, real-time query filtering, and smooth UI layout transitions.",
    "methods": ["Next.js", "TypeScript", "Trie / Anagram Algorithm", "Tailwind CSS", "Vercel"],
    "keyFeatures": [
      "Instant anagram solver with length-based result grouping",
      "Clean dark/light theme options with focused input ergonomics",
      "Filter solutions by word length, starting letter, or containing patterns",
      "Sub-second load time and fully mobile-responsive touch layout"
    ],
    "techStack": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Algorithms",
      "UI/UX"
    ],
    "liveUrl": "https://jumblefix.vercel.app/"
  }

];

// Projects shown in the CV, in this order: four design case studies and the SQL analysis.
export const cvProjectIds = ["project-4", "project-11", "project-1", "project-12", "project-9"];

export const experiences: Experience[] = [
  {
    "id": "exp-1",
    "role": "UI/UX Designer",
    "company": "Acadlog",
    "location": "Remote, India",
    "period": "Oct 2023 – Present",
    "current": true,
    "description": "Lead UX and UI for Acadlog India, an eLearning and government-jobs preparation platform, from first concept to live product.",
    "achievements": [
      "Redesigned the website on a modern grid layout with accessible (WCAG) colour and type, lifting user engagement by 25%.",
      "Designed a personalised dashboard with job alerts and dynamic filters, increasing user retention by 30%.",
      "Built mobile-first user flows, wireframes, and rapid low-fidelity prototypes in Figma, then refined them through usability testing and user feedback.",
      "Worked with developers on lazy-loading and Core Web Vitals so the responsive design performs well on every device."
    ],
    "skills": [
      "UI/UX Design",
      "User Interface Design",
      "Figma",
      "Mobile-First Design",
      "Usability Testing",
      "Accessibility (WCAG)",
      "Prototyping"
    ]
  },
  {
    "id": "exp-5",
    "role": "Video Editor & Motion Designer",
    "company": "Self-employed",
    "location": "Remote, India",
    "period": "Jun 2025 – Present",
    "current": true,
    "description": "Write, edit, and publish documentary-style videos for two YouTube channels I run: Perspective Point (geopolitics documentaries and explainers) and Anime Lore (anime lore Shorts and chapter explainers).",
    "achievements": [
      "Own the full pipeline: research and fact-checking, scriptwriting, voiceover, editing, motion graphics, colour grading, music and sound mixing, captions, and thumbnails.",
      "Edit in Premiere Pro and DaVinci Resolve, and build reusable, code-driven motion-graphics templates (HTML/JS, Python audio tooling) that speed up each new video.",
      "Design channel branding, end cards, and thumbnails, and optimise titles, tags, and hashtags for reach."
    ],
    "skills": [
      "Adobe Premiere Pro",
      "DaVinci Resolve",
      "Motion Graphics",
      "Colour Grading",
      "Scriptwriting"
    ]
  },
  {
    "id": "exp-2",
    "role": "UI & Graphic Designer",
    "company": "i2i TeleSolutions & Telemedicine",
    "location": "Bengaluru, India (Remote)",
    "period": "Apr 2018 – Oct 2023",
    "current": false,
    "description": "Owned UI and visual design for telemedicine and tele-diagnostics products, including i2i CONNECT, XpertClinic, and the Academy of Dental Excellence platform.",
    "achievements": [
      "Built a design system and UI kit that standardised components and cut turnaround on recurring design requests by 50%.",
      "XpertClinic: led end-to-end UX for a doctor-patient app in Figma and Adobe XD, and reworked the information architecture so information retrieval became 25% faster.",
      "Academy of Dental Excellence: redesigned the learning-platform UI in Adobe XD and optimised the HTML, CSS, and JavaScript, giving 15% faster load times and 20% higher course completion.",
      "Rebuilt the product's visual identity, lifting engagement on core patient-facing screens by 30%.",
      "Designed 500+ digital and print assets (patient apps, clinical dashboards, campaigns) with consistent branding.",
      "Ran user research and usability tests with clinicians, product managers, and developers to turn care workflows into accessible, high-legibility interfaces."
    ],
    "skills": [
      "UI Design",
      "Healthcare UX",
      "Design Systems",
      "Figma",
      "Adobe XD",
      "React.js",
      "Adobe Creative Suite"
    ]
  },
  {
    "id": "exp-3",
    "role": "Freelance UI & Graphic Designer",
    "company": "Self-employed",
    "location": "Bengaluru, India",
    "period": "Dec 2017 – Apr 2018",
    "current": false,
    "description": "Delivered UI/UX, web, and brand design for startup and SMB clients.",
    "achievements": [
      "Delivered 15+ projects spanning responsive websites (including a matrimonial site), mobile UI, and brand identity.",
      "Built interactive prototypes and ran user testing so clients could validate ideas before development.",
      "Designed logos, flyers, and social-media graphics; targeted visuals lifted audience engagement by 5% in 3 months.",
      "Retouched and improved product photography in Photoshop for consistent brand visuals."
    ],
    "skills": [
      "UI/UX Design",
      "Interactive Prototyping",
      "Web Design",
      "Brand Design",
      "Adobe Photoshop"
    ]
  },
  {
    "id": "exp-4",
    "role": "Graphic & Visual Designer",
    "company": "Skanda Graphics",
    "location": "Bengaluru, India",
    "period": "Sep 2015 – Dec 2017",
    "current": false,
    "description": "Branding and communication design for enterprise clients, from concept to print-ready and digital files.",
    "achievements": [
      "Delivered branding and communication campaigns for enterprise clients across 50+ projects.",
      "Built reusable templates and shared asset libraries that cut project turnaround by 10%.",
      "Produced print and digital collateral to pixel-accurate brand specifications, earning repeat enterprise engagements.",
      "Managed and mentored junior designers and kept branding consistent across client work."
    ],
    "skills": [
      "Visual Design",
      "Branding",
      "Logo Design",
      "Print & Digital Production",
      "Adobe Creative Suite"
    ]
  }
];

export const education = [
  {
    "id": "edu-3",
    "qualification": "Data Analytics Course with Gen AI",
    "institution": "Career 247",
    "location": "Online",
    "period": "Aug 2026 – Present"
  },
  {
    "id": "edu-1",
    "qualification": "Diploma in Graphics, Web & Animation",
    "institution": "MAAC India",
    "location": "Bengaluru, India",
    "period": "Aug 2014 – Aug 2015"
  },
  {
    "id": "edu-2",
    "qualification": "Bachelor of Engineering, Computer Science",
    "institution": "Visvesvaraya Technological University",
    "location": "Karnataka, India",
    "period": "Jun 2009 – Jun 2013"
  }
];

export const certifications = [
  {
    "id": "cert-1",
    "name": "Google UX Design Professional Certificate",
    "issuer": "Google",
    "year": "2025"
  },
  {
    "id": "cert-2",
    "name": "Introduction to Web Development with HTML5, CSS3, and JavaScript",
    "issuer": "edX",
    "year": "2025"
  },
  {
    "id": "cert-4",
    "name": "Build Responsive Real-World Websites with HTML and CSS",
    "issuer": "Udemy",
    "year": "2022"
  },
  {
    "id": "cert-3",
    "name": "Certified User Experience Specialist",
    "issuer": "Mobignosis",
    "year": "2020"
  }
];

// Skills grouped by what the tools are used for. No levels or years per tool, by design.
// Existing skills keep the live site's names and detail lines; new tools have no detail.
export const skillGroups: SkillGroup[] = [
  {
    name: "UI/UX Design",
    scope: "Research, interaction design, visual design, and design systems for digital products.",
    skills: [
      { name: "Figma & Design Systems", detail: "Auto-Layout, Variables, Component Libraries, Tokens" },
      { name: "User Research & Testing", detail: "User Journeys, Personas, Usability Audits, A/B Testing" },
      { name: "Interaction Design & Wireframes", detail: "Information Architecture, User Flow, Low/High-Fi Prototypes" },
      { name: "Visual Design & Typography", detail: "Fluid Scales, Grid Systems, Color Theory, Editorial Layouts" },
      { name: "Micro-Interactions & Motion", detail: "Framer, Motion Specs, Interactive States, Micro-animations" },
      { name: "Design Token Specification", detail: "W3C Token Standard, Figma Tokens, Multi-Brand Scaling" },
      { name: "Component Library Specs", detail: "Headless UI, Accessible Primitives, Storybook Specs" },
      { name: "Accessibility (WCAG 2.1 AA/AAA)", detail: "Color Contrast, Focus Management, Screen Reader Testing" },
      { name: "Design-to-Code Pipeline", detail: "Figma API, Automated Sync, Token Export, Style Dictionary" },
    ],
  },
  {
    name: "Frontend Development",
    scope: "Building and prototyping interfaces in code.",
    skills: [
      { name: "React 19 / Next.js 16", detail: "App Router, Interactive UI Components, Responsive Layouts" },
      { name: "Tailwind CSS v4 & Modern CSS", detail: "CSS Variables, Container Queries, 8pt Grid Systems" },
      { name: "TypeScript & UI State", detail: "Typed Component Props, Clean State Architecture" },
    ],
  },
  {
    name: "Video Editing",
    scope: "Editing footage, colour grading, and motion graphics.",
    skills: [{ name: "DaVinci Resolve" }, { name: "Adobe After Effects" }, { name: "Adobe Premiere Pro" }, { name: "Motion Graphics" }, { name: "Colour Grading" }],
  },
  {
    name: "Data Analytics",
    scope: "Cleaning, querying, analysing, and visualising data.",
    skills: [{ name: "Microsoft Excel" }, { name: "Power BI" }, { name: "DAX" }, { name: "Power Query" }, { name: "SQL" }, { name: "MySQL" }, { name: "PostgreSQL" }, { name: "Python" }],
  },
  {
    name: "Graphic Design",
    scope: "Brand identity, marketing and print collateral, iconography, and typography.",
    skills: [{ name: "Adobe Photoshop" }, { name: "Adobe Illustrator" }, { name: "CorelDRAW" }, { name: "Logo Design" }],
  },
];

export const testimonials = [
  {
    "id": "test-1",
    "quote": "Awanish is an exceptional UI/UX Designer who deeply understands user psychology and design systems. He transformed our complex enterprise platform into an intuitive, elegant product that our users love.",
    "author": "Sham Banerji",
    "role": "CEO",
    "company": "i2i TeleSolutions"
  },
  {
    "id": "test-2",
    "quote": "Working with Awanish elevated our entire product design standard. His Figma token system and pixel-perfect design specs made our design-to-development handoffs effortless.",
    "author": "Rick Singh",
    "role": "Cofounder",
    "company": "Vendorbay"
  }
];

export const siteUrl = "https://awanishverma.com";

// localStorage key for the saved theme (read by the pre-paint script, ThemeToggle, and global-error).
export const themeStorageKey = "av_portfolio_theme";

export const nav = [
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export const socials = [
  { label: "GitHub", href: profile.github, note: "Code and token pipelines" },
  { label: "LinkedIn", href: profile.linkedin, note: "Career and writing" },
  { label: "Behance", href: profile.behance, note: "Case studies" },
  { label: "Instagram", href: profile.instagram, note: "Interface shots" },
];

export const ui = {
  newTab: " (opens in a new tab)",
  skipLink: "Skip to main content",
  header: {
    monogram: "AV",
    tagline: profile.title,
    brandLabel: "Awanish Verma — back to top",
    homeLabel: "Awanish Verma — home page",
    navLabel: "Section navigation",
    mobileNavLabel: "Mobile section navigation",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    resume: "View CV",
    resumeShort: "CV",
    resumeMobile: "View CV",
    resumeTitle: "View CV",
    switchTo: "Switch to ",
  },
  hero: {
    status: profile.availability,
    role: profile.title,
    // Existing site headline, used as the one line on what he designs.
    summary: "Complex problems, shaped into clear, human-centered products.",
    facts: [
      { value: totalExperience, label: "Professional experience" },
      { value: uiuxExperience, label: "UI/UX design" },
    ],
    focusLabel: "Focus areas",
    focus: ["User research", "UI/UX design", "Web development", "Data analytics"],
    primaryCta: "View selected work",
    secondaryCta: "Open Behance profile",
    connect: "Connect",
    // Hero canvas: three sections of the Khan Academy home page redesign, cropped at section
    // boundaries from the 1600px-wide page on Awanish's Behance project and shown as frames on a canvas.
    // The first frame is the large lead frame; the badge shows each frame's pixel size.
    canvas: {
      page: "Khan Academy Website Redesign / Home page",
      frames: [
        { name: "Hero", src: "/images/khan/hero.jpg", width: 1600, height: 884, selected: true, alt: "Khan Academy home page hero: the headline \"For every student, every classroom, real results\", Learners, Teachers, and Parents buttons, a photo of a child in an online class with study-time and progress cards, and a row of key supporter logos." },
        { name: "Course categories", src: "/images/khan/courses.jpg", width: 1600, height: 822, alt: "\"Find your courses\" section: eleven course category chips with icons and video counts, with Arts & humanities highlighted." },
        { name: "Learners", src: "/images/khan/learners.jpg", width: 1600, height: 660, alt: "\"You can learn anything\" section for learners and students, with a Learners start here button beside a circular collage of student photos." },
      ],
      caption: "Khan Academy Website Redesign. Home page.",
      linkLabel: "View on Behance",
      // The frames and the caption link lead to the project on Behance; it has no case study page here.
      title: "Khan Academy Website Redesign",
      href: "https://www.behance.net/gallery/186483775/Khan-Academy-Website-Redesign",
    },
  },
  projects: {
    index: "01",
    eyebrow: "Selected work",
    heading: "Product, mobile, web, and data ",
    headingEmphasis: "case studies",
    openCaseStudy: "Open case study: ",
    viewCaseStudy: "View case study",
  },
  caseStudy: {
    label: "Case study",
    back: "All work",
    category: "Category",
    company: "Company",
    tools: "Skills and tools",
    team: "Team",
    outcome: "Outcome",
    overview: "Overview",
    problem: "Problem",
    role: "My role",
    process: "Process",
    methods: "Approach and methods",
    capabilities: "Key features",
    findings: "Key findings",
    gallery: "Screens",
    sourceCode: "View source code",
    viewBehance: "Open case study on Behance",
    viewLive: "Open live site",
    moreNavLabel: "More case studies",
    previous: "Previous",
    next: "Next",
  },
  experience: {
    index: "02",
    eyebrow: "Experience",
    heading: "Roles and ",
    headingEmphasis: "outcomes",
    current: "Current role.",
    // Shown in a role that has case studies (projects with its id as `experienceId`).
    caseStudies: "Case studies from this role:",
  },
  skills: {
    index: "03",
    eyebrow: "Skills",
    heading: "Design, frontend, video, and ",
    headingEmphasis: "data tools",
    intro: `${uiuxExperience} of UI/UX design, from user research to design systems, plus the tools I use for frontend, video, data, and graphic design work.`,
    otherHeading: "Other tools",
    otherScope: "Video, data, and graphic design tools I use alongside design work.",
    // Phone widths only: the button that unfolds each skill's detail line.
    showDetails: "Show details",
    hideDetails: "Hide details",
  },
  testimonials: {
    index: "04",
    eyebrow: "Testimonials",
    heading: "Feedback from company ",
    headingEmphasis: "leaders",
  },
  contact: {
    index: "05",
    eyebrow: "Contact",
    heading: "Email me about your ",
    headingEmphasis: "project",
    intro:
      "I take on work where design decisions still matter: early product vision, systems that need structure, and teams that need direction. Tell me what you’re building and where it’s stuck. A paragraph is enough to start.",
    emailTitle: "Email",
    emailNote: "No contact form",
    copyEmail: "Copy email",
    emailCopied: "Copied",
    emailCopiedToast: "Email copied to clipboard",
    replyLabel: "Reply time",
    replyValue: "Within 24 hours",
    locationLabel: "Location",
    services: [
      {
        title: "UI/UX design",
        body: "User research, user flows, wireframes, prototypes, and design systems in Figma, from first concept to live product.",
      },
      {
        title: "Web design and development",
        body: "Responsive, accessible sites built with React, Next.js, Tailwind CSS, or WordPress.",
      },
      {
        title: "Data analytics and dashboards",
        body: "SQL queries, Excel, and Power BI dashboards that show whether a design or product is working.",
      },
    ],
  },
  footer: {
    heading: "Site footer",
    tagline: profile.title,
    index: "Sections",
    elsewhere: "Profiles",
    copyright: "© 2026 Awanish Verma",
    top: "Back to top",
    topLabel: "Back to top",
  },
  resume: {
    title: "CV",
    // The CV's line under the name: the LinkedIn headline's two lead roles.
    headline: "UI/UX Designer & Data Analyst",
    print: "Print or save as PDF",
    close: "Close curriculum vitae",
    // Shown in the CV only, not in the contact section or footer.
    phone: "+91 7892234174",
    summary: "Summary",
    experience: "Experience",
    skillsLabel: "Skills:",
    projects: "Projects",
    tools: "Skills and tools:",
    coreSkills: "Skills",
    education: "Education",
    certifications: "Certifications",
    coreSkillGroups: [
      {
        label: "Product & Interaction Design",
        keywords:
          "UI/UX Design, Product Design, Interaction Design, Wireframing, Interactive Prototyping, Information Architecture, Visual Design, Responsive Design, Mobile App Design",
      },
      {
        label: "Design Systems",
        keywords:
          "Design Systems, UI Kits, Component Libraries, Figma (Auto Layout, Variables, Components), Adobe XD, Design-to-Code Handoff",
      },
      {
        label: "User Research",
        keywords:
          "User Research, User Interviews, Usability Testing, Personas, Journey Mapping, Empathy Mapping, A/B Testing, Competitive Analysis, Heuristic Evaluation",
      },
      {
        label: "Frontend & Tools",
        keywords:
          "React, Next.js, TypeScript, HTML5, CSS3, Tailwind CSS, WordPress, WCAG 2.1 AA Accessibility, Git",
      },
    ],
  },
  notFound: {
    code: "404",
    title: "Page not found",
    heading: "This page isn’t part of the portfolio.",
    body: "The link may be out of date, or the address may be mistyped. All content is on the home page.",
    home: "Go to home page",
    work: "View selected work",
  },
  error: {
    heading: "Something went wrong",
    body: "This page failed to load. Try again, or go to the home page.",
    retry: "Try again",
    home: "Go to home page",
  },
  globalError: {
    title: "Something went wrong — Awanish Verma",
    code: "500",
    heading: "Something went wrong",
    body: "The site failed to load.",
  },
  meta: {
    title: `${profile.title} — Awanish Verma`,
    description: `UI/UX designer and data analyst in Patna, India, open to remote work. ${totalExperience} of professional experience, ${uiuxExperience} in UI/UX design: product case studies, web development, and Power BI and SQL analysis.`,
    siteName: `Awanish Verma — ${profile.title}`,
    imageAlt: `Awanish Verma, ${profile.title}`,
    twitter: "@awanishverma",
    keywords: ["Awanish Verma", "Awanish Verma designer", "Awanish Verma portfolio", "Awanish Verma UI UX", "UI/UX designer", "UI UX designer", "UX designer", "UI designer", "product designer", "interaction designer", "UI UX designer Bengaluru", "UX designer Bangalore", "product designer Bengaluru", "UI UX designer India", "freelance UI UX designer India", "remote product designer", "design system consultant", "design tokens consultant", "design token architecture", "multi-brand design system", "Figma design system", "design system audit", "UX case study portfolio", "design engineer portfolio", "accessibility WCAG audit", "user research and usability testing"],
  },
};
