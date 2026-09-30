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
  title: string;
  tagline: string;
  category: string;
  cover: ProjectImage;
  gallery: ProjectImage[];
  // Only verifiable outcomes; unsupported metrics from the original site were removed.
  outcome?: string;
  team?: string;
  description: string;
  overview: string;
  architecture: string;
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
  "longBio": `UI/UX Designer with ${totalExperience} of professional experience, including ${uiuxExperience} in UI/UX design. I turn complex problems into clear, human-centered digital products. Skilled in user research, usability testing, interaction design, information architecture, wireframing, prototyping, design systems and design tokens in Figma, accessibility (WCAG 2.1 AA), and frontend implementation with React and Tailwind CSS.`,
  "location": "Bengaluru, India / Remote Worldwide",
  "availability": "Available for product design contracts and design system advisory.",
  "email": "avanishverma4@gmail.com",
  "github": "https://github.com/avanishverma4",
  "linkedin": "https://linkedin.com/in/awanish-verma",
  "behance": "https://behance.net/avanishverma4",
  "instagram": "https://www.instagram.com/avanishverma4"
};

export const projects: Project[] = [
  {
    "id": "project-1",
    "title": "XpertOnline Chatbot",
    "tagline": "AI-powered conversational assistant UI/UX design with intuitive chat flow and smart intent architecture.",
    "category": "UI/UX & Product Design",
    "cover": {"src": "/images/projects/xpertonline-qualitative-analysis.jpg", "width": 1400, "height": 788, "alt": "Usability report slide pairing test findings with two dark-mode chatbot screens."},
    "gallery": [{"src": "/images/projects/xpertonline-qualitative-analysis.jpg", "width": 1400, "height": 788, "alt": "Qualitative analysis slide: conversation steps and findings beside two XpertOnline chatbot screens."}, {"src": "/images/projects/xpertonline-refined-wireframes.jpg", "width": 1400, "height": 788, "alt": "Refined wireframes slide: before and after chatbot screens with the justification for each change."}],
    "team": "Group project with Jyotirmoy Goswami, Sphoorthy Gowda, and Mukesh Gupta.",
    "description": "End-to-end UI/UX design case study for an intelligent conversational AI chatbot interface, optimizing response legibility, prompt quick-actions, and multi-turn dialogue UX.",
    "overview": "Designed and prototyped XpertOnline Chatbot to streamline automated support and AI assistance. Focused on reducing friction in complex workflows, designing visual state indicators for streaming responses, and creating intuitive follow-up prompts.",
    "architecture": "User Flow Mapping, Figma Interactive Components, Conversation UI Patterns, Design Tokens, Accessibility Contrast Validation.",
    "keyFeatures": [
      "Conversational UI with dynamic typing states and structured response cards",
      "Contextual quick-action prompts and intent-based suggestion pills",
      "Accessible dark & light themes optimized for prolonged screen reading",
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
    "id": "project-2",
    "title": "Water Drink Reminder App",
    "tagline": "Intuitive hydration tracking mobile UI/UX with habit-forming visual micro-interactions and smart goals.",
    "category": "Mobile & Web Apps",
    "cover": {"src": "/images/projects/water-cover.jpg", "width": 1398, "height": 860, "alt": "Drops Water Tracker cover: home screen with daily water goal and progress gauge, plus analysis and profile screens."},
    "gallery": [{"src": "/images/projects/water-cover.jpg", "width": 1398, "height": 860, "alt": "Drops Water Tracker cover: home screen with daily water goal and progress gauge, plus analysis and profile screens."}, {"src": "/images/projects/water-screens.jpg", "width": 1398, "height": 640, "alt": "Four app screens: home, daily stats for water, walk, calories, sleep and heart, goal setup, and glass tracker."}],
    "description": "A user-centric mobile app design focused on daily hydration tracking, subtle gamification, liquid progress animations, and timely notification ergonomics.",
    "overview": "Designed to help users keep healthy hydration habits with minimal effort. Features fluid wave animations, daily goals based on personal metrics, and one-tap logging shortcuts.",
    "architecture": "Mobile First UX, Figma Smart Animate, Habit Loop Psychology, Custom Iconography & Liquid Wave UI Animations.",
    "keyFeatures": [
      "One-tap quick intake logging with custom vessel volume presets",
      "Fluid visual hydration gauge with real-time wave animation feedback",
      "Smart adaptive reminder notifications based on daily user activity routines",
      "Weekly and monthly habit analytics charts with goal progress milestones"
    ],
    "techStack": [
      "Mobile UI/UX",
      "Figma",
      "Habit Design",
      "Prototyping",
      "Micro-interactions"
    ],
    "liveUrl": "https://www.behance.net/gallery/207598711/Water-Drink-Reminder-App"
  },
  {
    "id": "project-3",
    "title": "Plant App UX Design Process",
    "tagline": "Comprehensive end-to-end UX research, wireframing, and UI design process for plant care & identification.",
    "category": "UI/UX & Product Design",
    "cover": {"src": "/images/projects/plant-cover.jpg", "width": 1398, "height": 740, "alt": "Gecare plant shop app cover: plant list and plant detail screens."},
    "gallery": [{"src": "/images/projects/plant-cover.jpg", "width": 1398, "height": 740, "alt": "Gecare plant shop app cover: plant list and plant detail screens."}, {"src": "/images/projects/plant-checkout.jpg", "width": 760, "height": 660, "alt": "Order details screen with cart, delivery, payment and totals, and an order accepted confirmation."}],
    "description": "A deep-dive product design case study detailing user interviews, competitive analysis, persona creation, wireframing, and visual UI design for plant enthusiasts.",
    "overview": "Documented the complete UX design lifecycle for a plant care assistant app. From discovering user pain points around over-watering to building plant diagnosis visual flows and tailored sunlight schedules.",
    "architecture": "User Research, Empathy Maps, Persona Mapping, Low-Fi & High-Fi Wireframes, Figma Interactive Prototypes, Design System.",
    "keyFeatures": [
      "AI photo-scan camera interface for instant botanical identification",
      "Custom watering & sunlight schedule reminders tailored to plant species",
      "Step-by-step diagnostic flows for troubleshooting plant health & yellowing leaves",
      "Community botanical marketplace & care tip sharing feed"
    ],
    "techStack": [
      "UX Research",
      "User Testing",
      "Figma",
      "Wireframing",
      "Information Architecture"
    ],
    "liveUrl": "https://www.behance.net/gallery/178415273/Plant-App-UX-Design-Process"
  },
  {
    "id": "project-4",
    "title": "Doctor-Patient Management App",
    "tagline": "Healthcare platform UI/UX connecting doctors and patients with streamlined appointment booking & EHR.",
    "category": "UI/UX & Product Design",
    "cover": {"src": "/images/projects/docto-screens.jpg", "width": 1398, "height": 620, "alt": "DOCTO doctor screens: missed and today's appointments, edit patient form, and a cancel appointment dialog."},
    "gallery": [{"src": "/images/projects/docto-screens.jpg", "width": 1398, "height": 620, "alt": "DOCTO doctor screens: missed and today's appointments, edit patient form, and a cancel appointment dialog."}, {"src": "/images/projects/docto-design-system.jpg", "width": 1398, "height": 820, "alt": "DOCTO design system page: primary blue, secondary red, grey, and alert colour scales with hex values."}],
    "description": "A comprehensive healthcare UI/UX case study featuring dual-role interfaces for medical professionals and patients, electronic health record (EHR) management, and telehealth consultations.",
    "overview": "Designed to bridge communication between healthcare providers and patients. Focused on high legibility, HIPAA-compliant design patterns, empathetic color palettes, and clear appointment scheduling workflows.",
    "architecture": "Healthcare UX Patterns, Figma Wireframing, Dual Persona Architecture, Accessible Medical Dashboards.",
    "keyFeatures": [
      "Patient portal for friction-free specialist search and instant slot booking",
      "Doctor clinical dashboard with patient vitals, medical history & prescription generator",
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
    "id": "project-5",
    "title": "Academy of Dental Excellence",
    "tagline": "Dental education web platform with course enrollment, clinical masterclasses, and a student portal.",
    "category": "Mobile & Web Apps",
    "cover": {"src": "/images/projects/dental-home.jpg", "width": 1440, "height": 900, "alt": "Academy of Dental Excellence home page: navigation and a Diploma and Master's programme hero."},
    "gallery": [{"src": "/images/projects/dental-home.jpg", "width": 1440, "height": 900, "alt": "Academy of Dental Excellence home page: navigation and a Diploma and Master's programme hero."}],
    "outcome": "Live production website.",
    "description": "A production web platform designed for dental practitioners offering advanced hands-on workshops, online certification courses, and clinical resource downloads.",
    "overview": "Designed and developed the digital presence for Academy of Dental Excellence. Created a high-trust visual style, responsive course catalogs, and a simple event registration flow.",
    "architecture": "Web Architecture, UI/UX Design, Responsive Layouts, SEO Optimization, Conversion Design.",
    "keyFeatures": [
      "Interactive course catalog with filtering by specialty (Endodontics, Implantology, Aesthetics)",
      "Workshop registration with secure payment checkout",
      "Video masterclass streaming interface with downloadable lecture notes",
      "Faculty & speaker showcase with clinical credentials and past workshop galleries"
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
    "id": "project-6",
    "title": "Password Generator",
    "tagline": "Sleek, customizable strong password generator tool with real-time entropy calculation and instant copy.",
    "category": "Interactive Prototypes",
    "cover": {"src": "/images/projects/password-generator.jpg", "width": 1440, "height": 900, "alt": "Password generator in dark mode: length slider, character options, strength meter, and Generate button."},
    "gallery": [{"src": "/images/projects/password-generator.jpg", "width": 1440, "height": 900, "alt": "Password generator in dark mode: length slider, character options, strength meter, and Generate button."}],
    "description": "A modern web application utility designed for maximum privacy, live password strength analytics, custom character parameters, and copy-to-clipboard interactions.",
    "overview": "Built to demonstrate micro-interaction polish, accessible control elements, dark mode visual aesthetic, and client-side cryptographic security.",
    "architecture": "React, TypeScript, Web Crypto API, Tailwind CSS, Motion animations.",
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
    "title": "Jumblefix",
    "tagline": "Fast, interactive web tool for solving and unjumbling word puzzles with clean, responsive UI.",
    "category": "Interactive Prototypes",
    "cover": {"src": "/images/projects/jumblefix-home.jpg", "width": 1425, "height": 900, "alt": "Jumblefix home page: letter tiles for TRAINED, an Unscramble button, and results grouped by word length."},
    "gallery": [{"src": "/images/projects/jumblefix-home.jpg", "width": 1425, "height": 900, "alt": "Jumblefix home page: letter tiles for TRAINED, an Unscramble button, and results grouped by word length."}],
    "description": "A lightweight, highly performant web application for solving anagrams, jumbled words, and word puzzles with a clean, minimal interface.",
    "overview": "Designed and built Jumblefix as a minimal, fast utility app. Features immediate keyboard focus, real-time query filtering, and smooth UI layout transitions.",
    "architecture": "Next.js, TypeScript, Trie / Anagram Algorithm, Tailwind CSS, Vercel.",
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

export const experiences: Experience[] = [
  {
    "id": "exp-1",
    "role": "Senior UI/UX Designer",
    "company": "Acadlog",
    "location": "Patna, India",
    "period": "Oct 2023 – Present",
    "current": true,
    "description": "Lead product design across a portfolio of EdTech learning platforms, owning UX research, information architecture, design systems, and design-to-code handoff for web and mobile.",
    "achievements": [
      "Built a multi-brand design token system in Figma used across 3 education platforms, reducing new-screen design time and handoff inconsistencies between design and engineering.",
      "Led end-to-end UX for the student learning experience, from discovery research and user flows to high-fidelity interactive prototypes, to improve course completion.",
      "Ran 60+ moderated usability testing sessions and turned the findings into interface changes that reduced onboarding drop-off.",
      "Delivered a WCAG 2.1 AA accessible component library with engineering in React and Tailwind CSS, resolving critical accessibility audit issues before launch."
    ],
    "skills": [
      "UI/UX Design",
      "Design Strategy",
      "Design Systems",
      "Figma",
      "User Research",
      "Accessibility (WCAG 2.1 AA)",
      "Prototyping"
    ]
  },
  {
    "id": "exp-2",
    "role": "Graphic Designer",
    "company": "i2i TeleSolutions & Telemedicine",
    "location": "India",
    "period": "Apr 2018 – Oct 2023",
    "current": false,
    "description": "Owned visual design and UI production for telemedicine and healthtech products, spanning brand identity, patient-facing interfaces, clinical dashboards, and marketing systems.",
    "achievements": [
      "Designed 500+ digital and print assets for patient apps, clinical dashboards, and marketing campaigns, keeping the brand consistent across products.",
      "Rebuilt the product visual identity and UI kit, improving engagement on core patient-facing screens.",
      "Standardized reusable UI components and layout templates, speeding up design turnaround on recurring requests.",
      "Worked with clinicians and product managers to turn care workflows into legible, accessible healthcare interfaces."
    ],
    "skills": [
      "Visual Design",
      "Healthcare UI",
      "Brand Identity",
      "UI Production",
      "Figma",
      "Adobe Creative Suite"
    ]
  },
  {
    "id": "exp-3",
    "role": "Freelance Designer",
    "company": "Self-employed",
    "location": "Bangalore, India",
    "period": "Dec 2017 – Apr 2018",
    "current": false,
    "description": "Delivered end-to-end UI/UX and brand design engagements for startup and SMB clients across web and mobile products.",
    "achievements": [
      "Delivered 15+ UI/UX and brand identity projects for startup and SMB clients across web and mobile.",
      "Built high-fidelity interactive prototypes so clients could validate concepts before development, shortening build cycles.",
      "Delivered projects on schedule and earned repeat clients through rapid iteration and structured design reviews."
    ],
    "skills": [
      "UI/UX Design",
      "Interactive Prototyping",
      "Wireframing",
      "Brand Design",
      "Client Collaboration"
    ]
  },
  {
    "id": "exp-4",
    "role": "Visual Designer",
    "company": "Skanda Graphics",
    "location": "India",
    "period": "Sep 2015 – Dec 2017",
    "current": false,
    "description": "Executed branding and communication design for enterprise clients, from concept development through print-ready and digital production.",
    "achievements": [
      "Designed branding and communication campaigns for enterprise clients across 50+ projects, from concept to print-ready and digital production.",
      "Streamlined creative workflows with reusable templates and shared asset libraries, reducing project turnaround time.",
      "Produced print and digital collateral to precise brand specifications, earning repeat enterprise engagements."
    ],
    "skills": [
      "Visual Design",
      "Branding",
      "Communication Design",
      "Print & Digital Production",
      "Adobe Creative Suite"
    ]
  }
];

export const education = [
  {
    "id": "edu-1",
    "qualification": "Diploma in Graphics, Web & Animation",
    "institution": "MAAC India",
    "location": "Bengaluru, India",
    "period": "Aug 2014 – Aug 2015"
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
      { name: "React 19 / Next.js 15", detail: "App Router, Interactive UI Components, Responsive Layouts" },
      { name: "Tailwind CSS v4 & Modern CSS", detail: "CSS Variables, Container Queries, 8pt Grid Systems" },
      { name: "TypeScript & UI State", detail: "Typed Component Props, Clean State Architecture" },
    ],
  },
  {
    name: "Video Editing",
    scope: "Editing footage, colour grading, and motion graphics.",
    skills: [{ name: "DaVinci Resolve" }, { name: "Adobe After Effects" }, { name: "Adobe Premiere Pro" }],
  },
  {
    name: "Data Analytics",
    scope: "Cleaning, querying, analysing, and visualising data.",
    skills: [{ name: "Microsoft Excel" }, { name: "Power BI" }, { name: "SQL" }, { name: "Python" }],
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
  { href: "#contact", label: "Contact" },
];

export const socials = [
  { label: "GitHub", href: profile.github, note: "Code & token pipelines" },
  { label: "LinkedIn", href: profile.linkedin, note: "Career & writing" },
  { label: "Behance", href: profile.behance, note: "Case studies" },
  { label: "Instagram", href: profile.instagram, note: "Interface shots" },
];

export const ui = {
  newTab: " (opens in a new tab)",
  skipLink: "Skip to main content",
  header: {
    monogram: "AV",
    status: "Available for contract and senior roles",
    tagline: profile.title,
    brandLabel: "Awanish Verma — back to top",
    navLabel: "Section navigation",
    mobileNavLabel: "Mobile section navigation",
    openMenu: "Open navigation menu",
    resume: "View CV",
    resumeShort: "CV",
    resumeMobile: "View CV",
    resumeTitle: "View CV",
    switchTo: "Switch to ",
  },
  hero: {
    status: "Open to work",
    role: profile.title,
    // Existing site headline, used as the one line on what he designs.
    summary: "Complex problems, shaped into clear, human-centered products.",
    facts: [
      { value: totalExperience, label: "Professional experience" },
      { value: uiuxExperience, label: "UI/UX design" },
    ],
    focusLabel: "Focus areas",
    focus: ["User research", "Token pipelines", "Interaction architecture", "Design systems"],
    primaryCta: "View selected work",
    secondaryCta: "Open Behance profile",
    connect: "Connect",
    // Art direction: four screens from 640px up, two larger screens below it.
    image: {
      desktop: { src: "/images/docto-hi-fi-screens.jpg", width: 1716, height: 840 },
      mobile: { src: "/images/docto-hi-fi-screens-mobile.jpg", width: 858, height: 826 },
      alt: "Screens from the DOCTO doctor appointment app, including OTP validation and a doctor home screen listing today's and missed appointments.",
      caption: "DOCTO, Doctor-Patient Management App: high-fidelity screens.",
      linkLabel: "View case study",
      href: projects.find((p) => p.id === "project-4")?.liveUrl ?? profile.behance,
    },
  },
  projects: {
    index: "01",
    eyebrow: "Selected work",
    heading: "Product, mobile, and web ",
    headingEmphasis: "case studies",
    filterLabel: "Filter case studies by category",
    allWork: "All work",
    shown: (n: number) => `${n} case studies shown.`,
    empty: "No case studies in this category yet.",
    showAll: "Show all work",
    openCaseStudy: "Open case study: ",
  },
  caseStudy: {
    label: "Case study",
    close: "Close case study",
    outcome: "Outcome",
    tabsLabel: "Case study sections",
    tabs: {
      overview: "Overview",
      architecture: "Process and tools",
      features: "Features",
      gallery: "Gallery",
    },
    technologies: "Tools and methods",
    process: "Process",
    team: "Team",
    capabilities: "Key features",
    sourceCode: "View source code",
    viewBehance: "Open case study on Behance",
    viewLive: "Open live site",
    closeFooter: "Close",
  },
  experience: {
    index: "02",
    eyebrow: "Experience",
    heading: "Roles and ",
    headingEmphasis: "outcomes",
    current: "Current role.",
  },
  skills: {
    index: "03",
    eyebrow: "Skills",
    heading: "Design, frontend, video, and ",
    headingEmphasis: "data tools",
    intro: `${uiuxExperience} of UI/UX design, from user research to design systems, plus the tools I use for frontend, video, and data work.`,
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
      "I take on work where design decisions still matter: early product vision, systems that need structure, and teams that need direction. Tell me what you're building and where it's stuck. A paragraph is enough to start.",
    emailTitle: "Email",
    emailNote: "No contact form",
    replyLabel: "Reply time",
    replyValue: "Within 24 hours",
    locationLabel: "Location",
    services: [
      {
        title: "Product design leadership",
        body: "Owning a new product vision end to end — research, IA, interaction, and the shipped interface.",
      },
      {
        title: "Design system architecture",
        body: "Token pipelines, component libraries, and the governance that keeps them alive after launch.",
      },
      {
        title: "Design advisory & audits",
        body: "Short engagements: UX audits, accessibility reviews, and direction for in-house design teams.",
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
    print: "Print or save as PDF",
    close: "Close curriculum vitae",
    summary: "Summary",
    experience: "Experience",
    skillsLabel: "Skills:",
    projects: "Projects",
    tools: "Tools:",
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
          "Design Systems, Design Tokens, Component Libraries, Figma (Auto Layout, Variables, Components), Style Dictionary, Multi-Brand Theming, Design-to-Code Handoff",
      },
      {
        label: "User Research",
        keywords:
          "User Research, User Interviews, Usability Testing, Personas, Journey Mapping, Empathy Mapping, A/B Testing, Competitive Analysis, Heuristic Evaluation",
      },
      {
        label: "Frontend & Tools",
        keywords:
          "React, Next.js, TypeScript, HTML5, CSS3, Tailwind CSS, WCAG 2.1 AA Accessibility, Adobe Creative Suite (Photoshop, Illustrator, After Effects), Git",
      },
    ],
  },
  notFound: {
    code: "404",
    title: "Page not found",
    heading: "This page isn't part of the portfolio.",
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
    description: `UI/UX designer in Bengaluru, available worldwide. ${totalExperience} of professional experience, ${uiuxExperience} in UI/UX design: product case studies, design tokens, and interaction design.`,
    siteName: `Awanish Verma — ${profile.title}`,
    imageAlt: `Awanish Verma, ${profile.title}`,
    twitter: "@awanishverma",
    keywords: ["Awanish Verma", "Awanish Verma designer", "Awanish Verma portfolio", "Awanish Verma UI UX", "UI/UX designer", "UI UX designer", "UX designer", "UI designer", "product designer", "interaction designer", "UI UX designer Bengaluru", "UX designer Bangalore", "product designer Bengaluru", "UI UX designer India", "freelance UI UX designer India", "remote product designer", "design system consultant", "design tokens consultant", "design token architecture", "multi-brand design system", "Figma design system", "design system audit", "UX case study portfolio", "design engineer portfolio", "accessibility WCAG audit", "user research and usability testing"],
  },
};
