"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { projects, ui, type Project } from "@/content/site";

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
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-3 font-mono text-xs aria-pressed:border-accent aria-pressed:text-accent-text"
          >
            {label} <span className="text-fg-muted">{count}</span>
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mb-6 text-xs text-fg-muted">
        {t.shown(shown.length)}
      </p>

      {shown.length === 0 ? (
        <div className="text-sm text-fg-secondary">
          <p>{t.empty}</p>
          <button type="button" onClick={() => setFilter(null)} className="min-h-11 underline">
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
                className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-line bg-card text-left hover:bg-card-hover"
              >
                <span className="relative block aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-1 flex-col gap-2 p-5">
                  <span className="font-mono text-xs text-fg-muted">{String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-bold">{project.title}</span>
                  {project.impactMetric && <span className="text-sm text-fg-secondary">{project.impactMetric}</span>}
                  <span className="mt-auto pt-2 font-mono text-xs text-accent-text">{project.category}</span>
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
        className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl rounded-xl border border-line bg-card p-0 text-fg"
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
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
            {t.label} · {project.category}
          </p>
          <h2 id="case-study-title" className="mt-2 text-2xl font-bold">
            {project.title}
          </h2>
          <p className="mt-2 text-sm text-fg-secondary">{project.tagline}</p>
        </div>
        <button type="button" onClick={onClose} aria-label={t.close} className="inline-flex size-11 shrink-0 items-center justify-center rounded-md hover:bg-card-hover">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="space-y-6 p-6">
        {project.impactMetric && (
          <div className="rounded-lg border border-line-subtle bg-subtle p-4">
            <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">{t.outcome}</p>
            <p className="mt-1 text-sm font-medium">{project.impactMetric}</p>
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
              className="-mb-px min-h-11 border-b-2 border-transparent font-mono text-sm text-fg-secondary aria-selected:border-accent aria-selected:font-bold aria-selected:text-fg"
            >
              {t.tabs[key]}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0} className="space-y-4 text-sm leading-relaxed text-fg-secondary">
          {tab === "overview" && (
            <>
              <p>{project.overview}</p>
              <p>{project.description}</p>
              <h3 className="pt-2 font-mono text-xs font-bold uppercase tracking-wider text-fg">{t.technologies}</h3>
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <li key={tech} className="rounded border border-line-subtle bg-subtle px-2.5 py-1 font-mono text-xs text-fg">
                    {tech}
                  </li>
                ))}
              </ul>
            </>
          )}
          {tab === "architecture" && (
            <>
              <div className="rounded-lg border border-line-subtle bg-subtle p-4">
                <h3 className="font-mono text-xs font-bold text-fg">{t.process}</h3>
                <p className="mt-2">{project.architecture}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [t.foundationsTitle, t.foundations],
                  [t.qualityTitle, t.quality],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-md border border-line bg-card p-3">
                    <p className="mb-1 text-xs font-bold text-fg">{title}</p>
                    <p className="text-xs">{body}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          {tab === "features" && (
            <>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-fg">{t.capabilities}</h3>
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
                <div key={src} className="relative h-48 overflow-hidden rounded-lg border border-line">
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

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-subtle p-6">
        <div className="flex flex-wrap gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-md border border-line bg-card px-4 font-mono text-xs hover:bg-card-hover">
              {t.sourceCode}
              <span className="sr-only">{ui.newTab}</span>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-md bg-accent-solid px-4 font-mono text-xs text-accent-contrast hover:opacity-90">
              {t.viewLive}
              <span className="sr-only">{ui.newTab}</span>
            </a>
          )}
        </div>
        <button type="button" onClick={onClose} className="min-h-11 px-4 font-mono text-xs text-fg-secondary hover:text-fg">
          {t.closeFooter}
        </button>
      </div>
    </div>
  );
}
