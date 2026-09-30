import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ResumeDialog } from "@/components/ResumeDialog";
import {
  ContactSection,
  ExperienceSection,
  ProjectsSection,
  TestimonialsSection,
} from "@/components/Sections";
import { SkillsSection } from "@/components/Skills";
import { button } from "@/components/ui";
import { ui } from "@/content/site";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className={`${button("primary")} sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50`}
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
