import Image from "next/image";
import Link from "next/link";
import { projects, ui, type Project } from "@/content/site";
import { badge, interactiveCard } from "./ui";

export const workPath = (project: Project) => `/work/${project.slug}`;
export const workIndex = (project: Project) => String(projects.indexOf(project) + 1).padStart(2, "0");

type Variant = "feature" | "banner" | "standard";

// Bento tiles (lg: 6 columns). DOCTO leads as a 4×2 feature; the Food Delivery App and XpertOnline
// stack beside it; the other six form two rows of three.
// Below lg there are 2 columns: the feature and the two banners (the Food Delivery App and
// i2i CONNECT) span both, and the other six pair up.
// Below sm those six are small tiles (cover, number, title, category), so nine full cards do not
// make the section several screens long; the tagline is on the case study page.
const bentoLayout: Record<string, { tile: string; variant: Variant }> = {
  "project-4": { tile: "col-span-2 lg:col-span-4 lg:row-span-2", variant: "feature" },
  "project-11": { tile: "col-span-2", variant: "banner" },
  "project-1": { tile: "lg:col-span-2", variant: "standard" },
  "project-12": { tile: "lg:col-span-2", variant: "standard" },
  "project-9": { tile: "lg:col-span-2", variant: "standard" },
  "project-5": { tile: "lg:col-span-2", variant: "standard" },
  "project-10": { tile: "col-span-2", variant: "banner" },
  "project-6": { tile: "lg:col-span-2", variant: "standard" },
  "project-7": { tile: "lg:col-span-2", variant: "standard" },
};

const imageFrame: Record<Variant, string> = {
  feature: "aspect-[16/10] lg:aspect-auto lg:min-h-80 lg:flex-1",
  banner: "aspect-[16/10] sm:max-lg:aspect-[2/1]",
  standard: "aspect-[16/10]",
};

const imageSizes: Record<Variant, string> = {
  feature: "(min-width: 1024px) 760px, (min-width: 640px) 100vw, 100vw",
  banner: "(min-width: 1024px) 380px, (min-width: 640px) 100vw, 100vw",
  standard: "(min-width: 1024px) 380px, 50vw",
};

// The whole card is one link to the project's case study page.
function ProjectCard({ project, variant }: { project: Project; variant: Variant }) {
  const t = ui.projects;
  // The six tiles that pair up below lg; below sm they are small.
  const small = variant === "standard";
  return (
    <Link
      href={workPath(project)}
      data-hover="card"
      aria-label={`${t.openCaseStudy}${project.title}`}
      className={`${interactiveCard} group flex h-full w-full flex-col overflow-hidden text-left`}
    >
      <span className={`relative block w-full overflow-hidden border-b border-line bg-media ${imageFrame[variant]}`}>
        <Image
          src={project.cover.src}
          alt=""
          fill
          sizes={imageSizes[variant]}
          data-hover-media
          // Dark theme: white-backed covers are dimmed slightly so they do not glare; full brightness on hover.
          // The zoom on hover is GSAP (HoverMotion).
          className="object-cover object-top transition-[filter] duration-300 ease-out dark:brightness-90 dark:group-hover:brightness-100"
        />
      </span>
      {/* In the feature tile only the image grows to fill the two rows; elsewhere the text block does. */}
      <span className={`flex flex-col gap-2 ${variant === "feature" ? "p-6" : "flex-1 p-5"} ${small ? "max-sm:gap-1 max-sm:p-3" : ""}`}>
        <span className="font-mono text-label-12 text-fg-secondary">{workIndex(project)}</span>
        <span className={`text-balance ${variant === "feature" ? "text-heading-24" : "text-heading-20"} ${small ? "max-sm:text-heading-16" : ""}`}>{project.title}</span>
        {/* A small tile has no room for the tagline; the case study opens with it. */}
        <span className={`text-copy-14 text-fg-secondary ${small ? "max-sm:hidden" : ""}`}>{project.tagline}</span>
        {variant === "feature" && (
          <span className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech) => (
              <span key={tech} className={badge}>
                {tech}
              </span>
            ))}
          </span>
        )}
        {/* On a small tile the category may wrap; the arrow stays beside it, at the bottom right. */}
        <span className={`mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-2 ${small ? "max-sm:flex-nowrap max-sm:items-end max-sm:gap-x-2" : ""}`}>
          <span className="font-mono text-label-12 text-fg-secondary">{project.category}</span>
          {/* Visible cue that the card leads to a case study; hover effects alone do not exist on touch. */}
          <span className="inline-flex items-center gap-1 text-label-13 font-medium text-fg">
            {/* A small tile keeps the arrow only. */}
            <span className={small ? "max-sm:hidden" : ""}>{t.viewCaseStudy}</span>
            <span aria-hidden="true" data-hover-arrow className="inline-block">→</span>
          </span>
        </span>
      </span>
    </Link>
  );
}

export function ProjectGrid() {
  return (
    <ul data-card-reveal className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
      {projects.map((project) => (
        <li key={project.id} className={bentoLayout[project.id]?.tile}>
          <ProjectCard project={project} variant={bentoLayout[project.id]?.variant ?? "standard"} />
        </li>
      ))}
    </ul>
  );
}
