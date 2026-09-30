"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { projects, ui, type Project } from "@/content/site";
import { badge, button, card, iconButton, interactiveCard } from "./ui";

const categories = [...new Set(projects.map((p) => p.category))];
const tabKeys = ["overview", "architecture", "features", "gallery"] as const;
type TabKey = (typeof tabKeys)[number];

export function ProjectGrid() {
  const t = ui.projects;
  const [filter, setFilter] = useState<string | null>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const shown = filter ? projects.filter((p) => p.category === filter) : projects;

  const filters: [string | null, string, number][] = [
    [null, t.allWork, projects.length],
    ...categories.map((c): [string, string, number] => [c, c, projects.filter((p) => p.category === c).length]),
  ];

  return (
    <>
      <div role="group" aria-label={t.filterLabel} className="mb-4 flex flex-wrap gap-2">
        {filters.map(([value, label, count]) => (
          <button
            key={label}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
            className={`${button("secondary")} font-mono aria-pressed:border-inverse aria-pressed:bg-inverse aria-pressed:text-on-inverse`}
          >
            {label} <span className="opacity-70">{count}</span>
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mb-6 text-label-13 text-fg-secondary">
        {t.shown(shown.length)}
      </p>

      {shown.length === 0 ? (
        <div className="space-y-2 text-copy-14 text-fg-secondary">
          <p>{t.empty}</p>
          <button type="button" onClick={() => setFilter(null)} className={button("secondary")}>
            {t.showAll}
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                aria-label={`${t.openCaseStudy}${project.title}`}
                aria-haspopup="dialog"
                onClick={() => {
                  setOpen(project);
                  dialogRef.current?.showModal();
                }}
                className={`${interactiveCard} flex h-full w-full flex-col overflow-hidden text-left`}
              >
                <span className="relative block aspect-[16/10] w-full overflow-hidden border-b border-line">
                  <Image
                    src={project.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-1 flex-col gap-2 p-5">
                  <span className="font-mono text-label-12 text-fg-secondary">{String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
                  <span className="text-heading-20">{project.title}</span>
                  {project.impactMetric && <span className="text-copy-14 text-fg-secondary">{project.impactMetric}</span>}
                  <span className="mt-auto pt-2 font-mono text-label-12 text-fg-secondary">{project.category}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="case-study-title"
        onClose={() => setOpen(null)}
        className={`${card} m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl p-0 text-fg shadow-modal`}
      >
        {open && <CaseStudy key={open.id} project={open} onClose={() => dialogRef.current?.close()} />}
      </dialog>
    </>
  );
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const t = ui.caseStudy;
  const [tab, setTab] = useState<TabKey>("overview");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Arrow keys move between tabs, per the WAI-ARIA tabs pattern.
  const onKeyDown = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = tabKeys[(i + (e.key === "ArrowRight" ? 1 : -1) + tabKeys.length) % tabKeys.length];
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between gap-4 border-b border-line p-6">
        <div>
          <p className="font-mono text-label-12 uppercase tracking-widest text-fg-secondary">
            {t.label} · {project.category}
          </p>
          <h2 id="case-study-title" className="mt-2 text-heading-24">
            {project.title}
          </h2>
          <p className="mt-2 text-copy-14 text-fg-secondary">{project.tagline}</p>
        </div>
        <button type="button" onClick={onClose} aria-label={t.close} className={iconButton}>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="space-y-6 p-6">
        {project.impactMetric && (
          <div className="rounded-md border border-line-subtle bg-subtle p-4">
            <p className="font-mono text-label-12 uppercase tracking-widest text-fg-secondary">{t.outcome}</p>
            <p className="mt-1 text-label-14 font-medium">{project.impactMetric}</p>
          </div>
        )}

        <div role="tablist" aria-label={t.tabsLabel} className="flex flex-wrap gap-x-5 border-b border-line">
          {tabKeys.map((key, i) => (
            <button
              key={key}
              ref={(el) => {
                tabRefs.current[key] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${key}`}
              aria-selected={tab === key}
              aria-controls={`panel-${key}`}
              tabIndex={tab === key ? 0 : -1}
              onClick={() => setTab(key)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="-mb-px min-h-11 border-b-2 border-transparent text-label-14 text-fg-secondary transition-colors hover:text-fg aria-selected:border-fg aria-selected:text-fg"
            >
              {t.tabs[key]}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0} className="space-y-4 rounded-md text-copy-14 text-fg-secondary">
          {tab === "overview" && (
            <>
              <p>{project.overview}</p>
              <p>{project.description}</p>
              <h3 className="pt-2 text-heading-14 text-fg">{t.technologies}</h3>
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <li key={tech} className={badge}>
                    {tech}
                  </li>
                ))}
              </ul>
            </>
          )}
          {tab === "architecture" && (
            <>
              <div className="rounded-md border border-line-subtle bg-subtle p-4">
                <h3 className="text-heading-14 text-fg">{t.process}</h3>
                <p className="mt-2">{project.architecture}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [t.foundationsTitle, t.foundations],
                  [t.qualityTitle, t.quality],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-md border border-line p-3">
                    <p className="mb-1 text-heading-14 text-fg">{title}</p>
                    <p className="text-copy-13">{body}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          {tab === "features" && (
            <>
              <h3 className="text-heading-14 text-fg">{t.capabilities}</h3>
              <ul className="list-disc space-y-2 pl-5">
                {project.keyFeatures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </>
          )}
          {tab === "gallery" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {project.galleryImages.map((src, i) => (
                <div key={src} className="relative h-48 overflow-hidden rounded-md border border-line">
                  <Image
                    src={src}
                    alt={`${project.title} — ${project.category} case study visual ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    // Lazy loading never triggers inside the modal <dialog>; the tab only renders on demand anyway.
                    loading="eager"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-subtle px-6 py-4">
        <div className="flex flex-wrap gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={button("secondary")}>
              {t.sourceCode}
              <span className="sr-only">{ui.newTab}</span>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={button("primary")}>
              {t.viewLive}
              <span className="sr-only">{ui.newTab}</span>
            </a>
          )}
        </div>
        <button type="button" onClick={onClose} className={button("ghost")}>
          {t.closeFooter}
        </button>
      </div>
    </div>
  );
}
