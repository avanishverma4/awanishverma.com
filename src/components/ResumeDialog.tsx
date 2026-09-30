import { certifications, education, experiences, profile, projects, siteUrl, skillGroups, ui } from "@/content/site";
import { PrintButton } from "./ResumeButton";
import { button, iconButton, textLink } from "./ui";

// Normal letter-spacing on headings: wide tracking can split words when ATS tools extract PDF text.
const heading = "border-b border-line pb-1 text-heading-16 text-fg";
const link = `${textLink} underline`;
const bare = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

// Server-rendered CV. ResumeButton opens it with showModal(); the close button uses the
// native form method="dialog", so only opening and printing need JavaScript.
export function ResumeDialog() {
  const t = ui.resume;
  // CV keyword lines, plus the Video Editing and Data Analytics tools from the skills section.
  const skillLines = [
    ...t.coreSkillGroups,
    ...skillGroups
      .filter((g) => g.name === "Video Editing" || g.name === "Data Analytics")
      .map((g) => ({ label: g.name, keywords: g.skills.map((s) => s.name).join(", ") })),
  ];
  return (
    <dialog
      id="resume-dialog"
      aria-labelledby="resume-modal-title"
      className="theme-light m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-4xl rounded-lg border border-line bg-card p-0 text-fg shadow-modal"
    >
      <div className="print-hide sticky top-0 flex items-center justify-between gap-3 border-b border-line bg-subtle px-6 py-2">
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
      <div className="space-y-7 p-6 text-copy-13 text-fg-secondary sm:p-8">
        <header className="space-y-1 border-b border-line pb-5">
          <h2 id="resume-modal-title" className="text-heading-32 text-fg">
            {profile.name}
          </h2>
          <p className="text-heading-16 text-fg">{profile.title}</p>
          <p className="flex flex-wrap gap-x-2 pt-1">
            <a href={`mailto:${profile.email}`} className={link}>
              {profile.email}
            </a>
            <span aria-hidden="true">|</span>
            <span>{profile.location}</span>
          </p>
          <p className="flex flex-wrap gap-x-2">
            {[siteUrl, profile.linkedin, profile.github, profile.behance].map((href, i) => (
              <span key={href} className="flex gap-x-2">
                {i > 0 && <span aria-hidden="true">|</span>}
                <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
                  {bare(href)}
                </a>
              </span>
            ))}
          </p>
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
          {projects.slice(0, 4).map((p) => {
            const href = p.liveUrl ?? p.githubUrl;
            return (
              <div key={p.id} className="break-inside-avoid space-y-1">
                <h4 className="text-heading-14 text-fg">{p.title}</h4>
                <p>{p.tagline}</p>
                <p>{`${t.tools} ${p.techStack.join(", ")}`}</p>
                {href && (
                  <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
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
