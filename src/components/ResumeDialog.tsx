import { certifications, cvProjectIds, education, experiences, profile, projects, siteUrl, skillGroups, ui, type Project } from "@/content/site";
import type { ReactNode } from "react";
import { PrintButton } from "./ResumeButton";
import { button, iconButton, textLink } from "./ui";

// Normal letter-spacing on headings: wide tracking can split words when ATS tools extract PDF text.
const heading = "border-b border-line pb-1 text-heading-16 text-fg";
const link = textLink;
// Contact-row links sit side by side, so each gets 2px of padding above and below: a 24px-tall
// target (WCAG 2.2) with no change to the line height or the printed length.
const contactLink = `${link} py-0.5`;
// External links open a new tab. The hint is in the accessible name only: hidden text would be
// picked up by ATS parsers reading the printed PDF.
const external = (href: string) => ({ href, target: "_blank", rel: "noopener noreferrer", "aria-label": `${bare(href)}${ui.newTab}` });
const company = (p: Project) => experiences.find((e) => e.id === p.experienceId)?.company;
const bare = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

// Contact items separated by "|". Every item carries its separator in a fixed 1.25rem slot on its
// left, and the row is pulled left by that slot and clipped there, so a separator that wraps to the
// start of a line is cut off instead of leading the line. The clip leaves 4px for focus outlines.
function ContactRow({ className = "", children }: { className?: string; children: ReactNode[] }) {
  return (
    <p className={`-ml-5 flex flex-wrap [clip-path:inset(-4px_-4px_-4px_1rem)] ${className}`}>
      {children.map((child, i) => (
        <span key={i} className="flex">
          <span aria-hidden="true" className="w-5 shrink-0 text-center">
            {i > 0 && "|"}
          </span>
          {child}
        </span>
      ))}
    </p>
  );
}

// Server-rendered CV. ResumeButton opens it with showModal(); the close button uses the
// native form method="dialog", so only opening and printing need JavaScript.
export function ResumeDialog() {
  const t = ui.resume;
  const cvProjects = cvProjectIds.flatMap((id) => projects.filter((p) => p.id === id));
  // CV keyword lines, plus the Data Analytics, Graphic Design, and Video Editing tools from the skills section.
  const extraGroups = ["Data Analytics", "Graphic Design", "Video Editing"];
  const skillLines = [
    ...t.coreSkillGroups,
    ...skillGroups
      .filter((g) => extraGroups.includes(g.name))
      .sort((a, b) => extraGroups.indexOf(a.name) - extraGroups.indexOf(b.name))
      .map((g) => ({ label: g.name, keywords: g.skills.map((s) => s.name).join(", ") })),
  ];
  return (
    <dialog
      id="resume-dialog"
      aria-labelledby="resume-modal-title"
      className="theme-light m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl flex-col overflow-hidden rounded-lg border border-line bg-card p-0 text-fg shadow-modal open:flex print:open:block"
    >
      <div className="print-hide flex shrink-0 items-center justify-between gap-3 border-b border-line bg-subtle px-6 py-2">
        <p className="font-mono text-label-12 text-fg-secondary">
          {t.title} <span className="hidden sm:inline">— {profile.name}</span>
        </p>
        <div className="flex items-center gap-2">
          <PrintButton className={button("secondary")}>
            {t.print}
          </PrintButton>
          <form method="dialog">
            <button aria-label={t.close} className={iconButton}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Single column, standard headings, and plain-text separators so ATS parsers read the printed PDF in order. */}
      {/* 14px on screen; print keeps 13px so the PDF stays the same length. */}
      {/* Only this part scrolls, so the scrollbar starts below the toolbar. */}
      <div className="min-h-0 space-y-7 overflow-y-auto overscroll-contain p-6 text-copy-14 text-fg-secondary sm:p-8 print:overflow-visible print:text-copy-13">
        <header className="space-y-1 border-b border-line pb-5">
          <h2 id="resume-modal-title" className="text-heading-32 text-fg">
            {profile.name}
          </h2>
          <p className="text-heading-16 text-fg">{t.headline}</p>
          <ContactRow className="pt-1">
            <a href={`mailto:${profile.email}`} className={contactLink}>
              {profile.email}
            </a>
            <a href={`tel:${t.phone.replace(/\s/g, "")}`} className={contactLink}>
              {t.phone}
            </a>
            <span>{profile.location}</span>
          </ContactRow>
          <ContactRow>
            {[siteUrl, profile.linkedin, profile.github, profile.behance].map((href) => (
              <a key={href} {...external(href)} className={contactLink}>
                {bare(href)}
              </a>
            ))}
          </ContactRow>
        </header>

        <section className="space-y-2">
          <h3 className={heading}>{t.summary}</h3>
          <p>{profile.longBio}</p>
        </section>

        <section className="break-inside-avoid space-y-2">
          <h3 className={heading}>{t.coreSkills}</h3>
          <ul className="space-y-1">
            {skillLines.map((g) => (
              <li key={g.label}>{`${g.label}: ${g.keywords}`}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className={heading}>{t.experience}</h3>
          {experiences.map((e) => (
            <div key={e.id} className="break-inside-avoid space-y-1.5">
              <h4 className="text-heading-14 text-fg">{e.role}</h4>
              <p className="font-medium text-fg">
                {e.company} | {e.location} | {e.period}
              </p>
              <p>{e.description}</p>
              <ul className="list-disc space-y-1 pl-5">
                {e.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <p>{`${t.skillsLabel} ${e.skills.join(", ")}`}</p>
            </div>
          ))}
        </section>

        <section className="space-y-3">
          <h3 className={heading}>{t.projects}</h3>
          {cvProjects.map((p) => {
            const href = p.liveUrl ?? p.githubUrl;
            return (
              <div key={p.id} className="break-inside-avoid space-y-1">
                {/* A product made for an employer names the company, on the same line. */}
                <h4 className="text-heading-14 text-fg">
                  {p.title}
                  {company(p) && ` | ${company(p)}`}
                </h4>
                <p>{p.tagline}</p>
                <p>{`${t.tools} ${p.techStack.join(", ")}`}</p>
                {href && (
                  <a {...external(href)} className={`${link} wrap-anywhere`}>
                    {bare(href)}
                  </a>
                )}
              </div>
            );
          })}
        </section>

        <section className="break-inside-avoid space-y-2">
          <h3 className={heading}>{t.education}</h3>
          {education.map((e) => (
            <div key={e.id}>
              <h4 className="text-heading-14 text-fg">{e.qualification}</h4>
              <p>
                {e.institution} | {e.location} | {e.period}
              </p>
            </div>
          ))}
        </section>

        <section className="break-inside-avoid space-y-2">
          <h3 className={heading}>{t.certifications}</h3>
          <ul className="list-disc space-y-1 pl-5">
            {certifications.map((c) => (
              <li key={c.id}>{`${c.name} | ${c.issuer} | ${c.year}`}</li>
            ))}
          </ul>
        </section>
      </div>
    </dialog>
  );
}
