import { certifications, education, experiences, profile, projects, siteUrl, ui } from "@/content/site";
import { PrintButton } from "./ResumeButton";

const heading = "border-b border-zinc-200 pb-1 font-mono text-xs font-bold uppercase tracking-wider text-zinc-700";
const link = "text-emerald-800 underline underline-offset-2 hover:text-emerald-900";
const bare = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
const noEmoji = (s: string) => s.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2190}-\u{21FF}]/gu, "").trim();

// Server-rendered CV. ResumeButton opens it with showModal(); the close button uses the
// native form method="dialog", so only opening and printing need JavaScript.
export function ResumeDialog() {
  const t = ui.resume;
  return (
    <dialog
      id="resume-dialog"
      aria-labelledby="resume-modal-title"
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-4xl rounded-xl border border-zinc-200 bg-white p-0 text-zinc-900"
    >
      <div className="print-hide sticky top-0 flex items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-6 py-3">
        <p className="font-mono text-xs font-bold text-zinc-600">
          {t.title} <span className="hidden sm:inline">— {profile.name}</span>
        </p>
        <div className="flex items-center gap-2">
          <PrintButton className="min-h-11 rounded border border-zinc-300 bg-white px-3 font-mono text-xs text-zinc-800 hover:bg-zinc-100">
            {t.print}
          </PrintButton>
          <form method="dialog">
            <button aria-label={t.close} className="inline-flex size-11 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-200">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-8 p-6 text-sm text-zinc-800 sm:p-8">
        <div className="flex flex-col justify-between gap-2 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <h2 id="resume-modal-title" className="text-3xl font-bold tracking-tight">
              {profile.name}
            </h2>
            <p className="pt-1 font-mono text-base font-medium text-emerald-700">{profile.title}</p>
          </div>
          <div className="space-y-1 font-mono text-xs text-zinc-600 sm:text-right">
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
          <p className="text-xs leading-relaxed text-zinc-700">{profile.longBio}</p>
        </section>

        <section className="space-y-4">
          <h3 className={heading}>{t.experience}</h3>
          {experiences.map((e) => (
            <div key={e.id} className="break-inside-avoid space-y-2 text-xs text-zinc-700">
              <p className="flex flex-wrap justify-between gap-x-4 text-sm">
                <span className="font-bold text-zinc-900">
                  {e.role}, {e.company}
                </span>
                <span className="font-mono text-xs">{e.period}</span>
              </p>
              <p className="text-zinc-600">{e.location}</p>
              <p>{e.description}</p>
              <ul className="list-disc space-y-1 pl-5">
                {e.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <p className="text-zinc-600">
                <strong className="text-zinc-800">{t.skillsLabel}</strong> {e.skills.join(", ")}
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
                <div key={p.id} className="break-inside-avoid space-y-1 rounded border border-zinc-200 bg-zinc-50 p-3 text-[11px] text-zinc-700">
                  <p className="text-xs font-bold text-zinc-900">
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
                    <strong className="text-zinc-800">{t.impact}</strong> {noEmoji(p.impactMetric)}
                  </p>
                  <p>
                    <strong className="text-zinc-800">{t.tools}</strong> {p.techStack.join(", ")}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="break-inside-avoid space-y-2">
          <h3 className={heading}>{t.coreSkills}</h3>
          <div className="space-y-1 text-xs text-zinc-700">
            {t.coreSkillGroups.map((g) => (
              <p key={g.label}>
                <strong className="text-zinc-800">{g.label}:</strong> {g.keywords}
              </p>
            ))}
          </div>
        </section>

        <section className="break-inside-avoid space-y-2">
          <h3 className={heading}>{t.education}</h3>
          {education.map((e) => (
            <div key={e.id} className="text-xs text-zinc-700">
              <p className="font-bold text-zinc-900">{e.qualification}</p>
              <p>
                {e.institution}, {e.location} | {e.period}
              </p>
            </div>
          ))}
        </section>

        <section className="break-inside-avoid space-y-2">
          <h3 className={heading}>{t.certifications}</h3>
          <ul className="list-disc space-y-1 pl-5 text-xs text-zinc-700">
            {certifications.map((c) => (
              <li key={c.id}>
                <span className="font-bold text-zinc-900">{c.name}</span> — {c.issuer} | {c.year}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </dialog>
  );
}
