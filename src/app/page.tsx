import { Hero } from "@/components/Hero";
import {
  ContactSection,
  ExperienceSection,
  ProjectsSection,
  TestimonialsSection,
} from "@/components/Sections";
import { SiteFrame } from "@/components/SiteFrame";
import { SkillsSection } from "@/components/Skills";

export default function Home() {
  return (
    <SiteFrame home>
      <Hero />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
    </SiteFrame>
  );
}
