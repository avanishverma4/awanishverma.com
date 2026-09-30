import { certifications, education, experiences, profile, projects, siteUrl, ui } from "@/content/site";
import { PrintButton } from "./ResumeButton";
import { button, iconButton, textLink } from "./ui";

const heading = "border-b border-line pb-1 font-mono text-label-12 uppercase tracking-widest text-fg-secondary";
const link = `${textLink} underline`;
const bare = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

// Server-rendered CV. ResumeButton opens it with showModal(); the close button uses the
// native form method="dialog", so only opening and printing need JavaScript.
export function ResumeDialog() {
  const t = ui.resume;
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

      <div className="space-y-8 p-6 text-copy-13 text-fg-secondary sm:p-8">
        <div className="flex flex-col justify-between gap-2 border-b border-line pb-6 sm:flex-row sm:items-end">
          <div>
            <h2 id="resume-modal-title" className="text-heading-32 text-fg">
              {profile.name}
            </h2>
            <p className="pt-1 text-label-14 font-medium text-accent-text">{profile.title}</p>
          </div>
          <div className="space-y-1 font-mono text-label-12 text-fg-secondary sm:text-right">
            <a href={`mailto:${profile.email}`} className={link}>
              {profile.email}
            </a>
            <p>{profile.location}</p>
            <p className="flex flex-wrap gap-x-2 sm:justify-end">
              {[siteUrl, profile.linkedin, profile.github, profile.behance].map((href) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={link}>
                  {bare(href)}
                </a>
              ))}
            </p>
          </div>
        </div>

        <section className="space-y-2">
          <h3 className={heading}>{t.summary}</h3>
          <p>{profile.longBio}</p>
        </section>

        <section className="space-y-4">
          <h3 className={heading}>{t.experience}</h3>
          {experiences.map((e) => (
            <div key={e.id} className="break-inside-avoid space-y-2">
              <p className="flex flex-wrap justify-between gap-x-4">
                <span className="text-heading-14 text-fg">
                  {e.role}, {e.company}
                </span>
                <span className="font-mono text-label-12">{e.period}</span>
              </p>
              <p>{e.location}</p>
              <p>{e.description}</p>
              <ul className="list-disc space-y-1 pl-5">
                {e.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <p>
                <strong className="font-medium text-fg">{t.skillsLabel}</strong> {e.skills.join(", ")}
              </p>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h3 className={heading}>{t.projects}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.slice(0, 4).map((p) => {
              const href = p.liveUrl ?? p.githubUrl;
              return (
                <div key={p.id} className="break-inside-avoid space-y-1 rounded-md border border-line bg-subtle p-3 text-label-12">
                  <p className="text-heading-14 text-fg">
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </p>
                  <p>{p.tagline}</p>
                  <p>
                    <strong className="font-medium text-fg">{t.tools}</strong> {p.techStack.join(", ")}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="break-inside-avoid space-y-2">
          <h3 className={heading}>{t.coreSkills}</h3>
          <div className="space-y-1">
            {t.coreSkillGroups.map((g) => (
              <p key={g.label}>
                <strong className="font-medium text-fg">{g.label}:</strong> {g.keywords}
              </p>
            ))}
          </div>
        </section>

        <section className="break-inside-avoid space-y-2">
          <h3 className={heading}>{t.education}</h3>
          {education.map((e) => (
            <div key={e.id}>
              <p className="text-heading-14 text-fg">{e.qualification}</p>
              <p>
                {e.institution}, {e.location} | {e.period}
              </p>
            </div>
          ))}
        </section>

        <section className="break-inside-avoid space-y-2">
          <h3 className={heading}>{t.certifications}</h3>
          <ul className="list-disc space-y-1 pl-5">
            {certifications.map((c) => (
              <li key={c.id}>
                <span className="font-medium text-fg">{c.name}</span> — {c.issuer} | {c.year}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </dialog>
  );
}
