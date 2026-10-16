import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { experiences, projects, ui, type Project, type ProjectImage } from "@/content/site";
import { workIndex, workPath } from "./Projects";
import { badge, button, container, eyebrow, interactiveCard, subtleLink } from "./ui";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section data-reveal className="space-y-3">
      <h2 className="text-heading-24 text-fg">{title}</h2>
      {children}
    </section>
  );
}

function Screen({ img, eager = false }: { img: ProjectImage; eager?: boolean }) {
  return (
    <Image
      src={img.src}
      width={img.width}
      height={img.height}
      alt={img.alt}
      sizes="(min-width: 1248px) 1152px, calc(100vw - 2rem)"
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      // Dark theme: white-backed screens are dimmed slightly so they do not glare.
      className="h-auto w-full rounded-lg border border-line bg-media dark:brightness-90"
    />
  );
}

// A case study page: title and facts, the cover, the write-up in a reading column, the remaining
// screens, and links to the neighbouring case studies.
// Problem, role, process, and findings sections appear only for projects whose data has them.
export function CaseStudy({ project }: { project: Project }) {
  const t = ui.caseStudy;
  const screens = project.gallery.filter((img) => img.src !== project.cover.src);
  const position = projects.indexOf(project);
  const neighbours = [
    { label: t.previous, project: projects[(position - 1 + projects.length) % projects.length] },
    { label: t.next, project: projects[(position + 1) % projects.length] },
  ];
  const facts = [
    { label: t.category, value: project.category },
    { label: t.company, value: experiences.find((e) => e.id === project.experienceId)?.company },
    { label: t.tools, value: project.techStack.join(", ") },
    { label: t.team, value: project.team },
    { label: t.outcome, value: project.outcome },
  ].filter((fact) => fact.value);

  return (
    <article className={`${container} pb-10 pt-6 sm:pb-16 sm:pt-10`}>
      <Link href="/#projects" className={`${subtleLink} gap-1`}>
        <span aria-hidden="true">←</span> {t.back}
      </Link>

      <header className="mt-6 grid gap-x-10 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className={eyebrow}>
            <span className="text-fg">{workIndex(project)}</span> {t.label}
          </p>
          <h1 className="mt-3 text-balance text-heading-32 sm:text-heading-48">{project.title}</h1>
          <p className="mt-4 max-w-prose text-pretty text-copy-18 text-fg-secondary">{project.tagline}</p>
        </div>
        <div className="lg:col-span-4">
          <dl className="divide-y divide-line border-y border-line">
            {facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-3 gap-4 py-3">
                <dt className="text-label-13 text-fg-secondary">{fact.label}</dt>
                <dd className="col-span-2 text-label-14">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-hover="magnetic" className={button("primary")}>
                {project.liveUrl.includes("behance.net") ? t.viewBehance : t.viewLive}
                <span className="sr-only">{ui.newTab}</span>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-hover="magnetic" className={button(project.liveUrl ? "secondary" : "primary")}>
                {t.sourceCode}
                <span className="sr-only">{ui.newTab}</span>
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="mt-10">
        <Screen img={project.cover} eager />
      </div>

      {/* Reading column: 65 characters per line. */}
      <div className="mt-12 max-w-prose space-y-10 text-copy-16 text-fg-secondary">
        <Section title={t.overview}>
          <p>{project.overview}</p>
          <p>{project.description}</p>
        </Section>

        {project.problem && (
          <Section title={t.problem}>
            <p>{project.problem}</p>
          </Section>
        )}

        {project.role && (
          <Section title={t.role}>
            <p>{project.role}</p>
          </Section>
        )}

        {project.process && (
          <Section title={t.process}>
            <ol className="list-decimal space-y-2 pl-5">
              {project.process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Section>
        )}

        <Section title={t.methods}>
          {project.approach && <p>{project.approach}</p>}
          <ul className="flex flex-wrap gap-2">
            {project.methods.map((method) => (
              <li key={method} className={badge}>
                {method}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t.capabilities}>
          <ul className="list-disc space-y-2 pl-5">
            {project.keyFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Section>

        {project.findings && (
          <Section title={t.findings}>
            <ul className="list-disc space-y-2 pl-5">
              {project.findings.map((finding) => (
                <li key={finding}>{finding}</li>
              ))}
            </ul>
          </Section>
        )}
      </div>

      {screens.length > 0 && (
        <section className="mt-12 space-y-4">
          <h2 className="text-heading-24">{project.galleryTitle ?? t.gallery}</h2>
          {screens.map((img) => (
            <div key={img.src} data-reveal>
              <Screen img={img} />
            </div>
          ))}
        </section>
      )}

      <nav aria-label={t.moreNavLabel} className="mt-12 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {neighbours.map(({ label, project: other }) => (
          <Link key={label} href={workPath(other)} data-hover="card" className={`${interactiveCard} flex min-h-11 flex-col gap-1 p-5`}>
            <span className={eyebrow}>{label}</span>
            <span className="text-balance text-heading-20">{other.title}</span>
            <span className="font-mono text-label-12 text-fg-secondary">{other.category}</span>
          </Link>
        ))}
      </nav>
    </article>
  );
}
