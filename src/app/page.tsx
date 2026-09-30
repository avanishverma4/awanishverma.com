import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ResumeDialog } from "@/components/ResumeDialog";
import {
  ContactSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  TestimonialsSection,
} from "@/components/Sections";
import { ui } from "@/content/site";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-accent-solid px-4 py-3 text-accent-contrast focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {ui.skipLink}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ResumeDialog />
    </>
  );
}
