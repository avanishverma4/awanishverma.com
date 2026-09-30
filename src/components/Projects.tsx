"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { projects, ui, type Project } from "@/content/site";
import { MOTION_OK, dialogIn, gsap, reducedMotion, useGSAP } from "./motion";
import { badge, button, card, iconButton, interactiveCard } from "./ui";

const categories = [...new Set(projects.map((p) => p.category))];

type Variant = "feature" | "standard" | "wide" | "compact";

// Bento tiles for "All work" (lg: 6 columns). DOCTO leads as a 4×2 feature; XpertOnline and Water
// stack beside it; Plant and Dental form a wide row; the two small prototypes are compact tiles.
// At sm (2 columns) the feature spans both columns and the rest pair up.
const bentoLayout: Record<string, { tile: string; variant: Variant }> = {
  "project-4": { tile: "sm:col-span-2 lg:col-span-4 lg:row-span-2", variant: "feature" },
  "project-1": { tile: "lg:col-span-2", variant: "standard" },
  "project-2": { tile: "lg:col-span-2", variant: "standard" },
  "project-3": { tile: "lg:col-span-3", variant: "wide" },
  "project-5": { tile: "lg:col-span-3", variant: "wide" },
  "project-6": { tile: "lg:col-span-3", variant: "compact" },
  "project-7": { tile: "lg:col-span-3", variant: "compact" },
};

const imageFrame: Record<Variant, string> = {
  feature: "aspect-[16/10] lg:aspect-auto lg:min-h-80 lg:flex-1",
  standard: "aspect-[16/10]",
  wide: "aspect-[16/10] lg:aspect-[2/1]",
  compact: "aspect-[16/10] lg:aspect-auto lg:w-2/5 lg:shrink-0 lg:border-b-0 lg:border-r",
};

const imageSizes: Record<Variant, string> = {
  feature: "(min-width: 1024px) 760px, (min-width: 640px) 100vw, 100vw",
  standard: "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw",
  wide: "(min-width: 1024px) 570px, (min-width: 640px) 50vw, 100vw",
  compact: "(min-width: 1024px) 230px, (min-width: 640px) 50vw, 100vw",
};

function ProjectCard({ project, variant, onOpen }: { project: Project; variant: Variant; onOpen: () => void }) {
  const t = ui.projects;
  return (
    <button
      type="button"
      aria-label={`${t.openCaseStudy}${project.title}`}
      aria-haspopup="dialog"
      onClick={onOpen}
      className={`${interactiveCard} group flex h-full w-full flex-col overflow-hidden text-left ${variant === "compact" ? "lg:flex-row" : ""}`}
    >
      <span className={`relative block w-full overflow-hidden border-b border-line bg-media ${imageFrame[variant]}`}>
        <Image
          src={project.cover.src}
          alt=""
          fill
          sizes={imageSizes[variant]}
          className="object-cover object-top transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
        />
      </span>
      {/* In the feature tile only the image grows to fill the two rows; elsewhere the text block does. */}
      <span className={`flex flex-col gap-2 ${variant === "feature" ? "p-6" : "flex-1 p-5"}`}>
        <span className="font-mono text-label-12 text-fg-secondary">{String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
        <span className={variant === "feature" ? "text-heading-24" : "text-heading-20"}>{project.title}</span>
        <span className="text-copy-14 text-fg-secondary">{project.tagline}</span>
        {variant === "feature" && (
          <span className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech) => (
              <span key={tech} className={badge}>
                {tech}
              </span>
            ))}
          </span>
        )}
        <span className="mt-auto pt-2 font-mono text-label-12 text-fg-secondary">{project.category}</span>
      </span>
    </button>
  );
}
const tabKeys = ["overview", "architecture", "features", "gallery"] as const;
type TabKey = (typeof tabKeys)[number];

export function ProjectGrid() {
  const t = ui.projects;
  const [filter, setFilter] = useState<string | null>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const grid = useRef<HTMLUListElement>(null);
  const filtered = useRef(false);
  const shown = filter ? projects.filter((p) => p.category === filter) : projects;
  // Bento layout only for "All work"; a filtered subset uses the uniform grid so no gaps appear.
  const bento = filter === null;

  // After a filter change, stagger the visible cards in. Skipped on first render (ScrollReveal handles that).
  useGSAP(
    () => {
      if (!filtered.current) {
        filtered.current = true;
        return;
      }
      gsap.matchMedia().add(MOTION_OK, () => {
        if (!grid.current) return;
        gsap.fromTo(
          grid.current.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", overwrite: true },
        );
      });
    },
    { dependencies: [filter] },
  );

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
        <ul ref={grid} className={`grid gap-4 sm:grid-cols-2 ${bento ? "lg:grid-cols-6" : "lg:grid-cols-3"}`}>
          {shown.map((project) => {
            const variant = bento ? (bentoLayout[project.id]?.variant ?? "standard") : "standard";
            return (
              <li key={project.id} data-reveal className={bento ? bentoLayout[project.id]?.tile : ""}>
                <ProjectCard
                  project={project}
                  variant={variant}
                  onOpen={() => {
                    setOpen(project);
                    dialogRef.current?.showModal();
                    dialogIn(dialogRef.current);
                  }}
                />
              </li>
            );
          })}
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
  const panel = useRef<HTMLDivElement>(null);
  const switched = useRef(false);

  // Crossfade the panel when the tab changes (not on first open; the dialog itself animates then).
  useGSAP(
    () => {
      if (!switched.current) {
        switched.current = true;
        return;
      }
      if (reducedMotion() || !panel.current) return;
      gsap.fromTo(panel.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.22, ease: "power1.out", clearProps: "opacity,transform" });
    },
    { dependencies: [tab] },
  );

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
        {(project.outcome || project.team) && (
          <dl className="grid gap-4 rounded-md border border-line-subtle bg-subtle p-4 sm:grid-cols-2">
            {project.outcome && (
              <div>
                <dt className="font-mono text-label-12 uppercase tracking-widest text-fg-secondary">{t.outcome}</dt>
                <dd className="mt-1 text-label-14 font-medium">{project.outcome}</dd>
              </div>
            )}
            {project.team && (
              <div>
                <dt className="font-mono text-label-12 uppercase tracking-widest text-fg-secondary">{t.team}</dt>
                <dd className="mt-1 text-label-14 font-medium">{project.team}</dd>
              </div>
            )}
          </dl>
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

        <div ref={panel} role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0} className="space-y-4 rounded-md text-copy-14 text-fg-secondary">
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
              <h3 className="text-heading-14 text-fg">{t.process}</h3>
              <p>{project.architecture}</p>
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
            <div className="space-y-4">
              {project.gallery.map((img) => (
                <Image
                  key={img.src}
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  alt={img.alt}
                  sizes="(min-width: 800px) 720px, calc(100vw - 80px)"
                  // Lazy loading never triggers inside the modal <dialog>; the tab only renders on demand anyway.
                  loading="eager"
                  className="h-auto w-full rounded-md border border-line bg-media"
                />
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
              {project.liveUrl.includes("behance.net") ? t.viewBehance : t.viewLive}
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
