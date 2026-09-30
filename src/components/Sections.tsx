import { experiences, profile, skillCategories, socials, testimonials, ui } from "@/content/site";
import { ProjectGrid } from "./Projects";
import { SectionIntro } from "./SectionIntro";

const container = "mx-auto max-w-7xl px-4 py-20 sm:px-6";
const chip = "rounded border border-line-subtle bg-subtle px-2 py-0.5 font-mono text-xs";

export function ProjectsSection() {
  const t = ui.projects;
  return (
    <section id="projects" aria-labelledby="projects-heading" className={container}>
      <SectionIntro id="projects-heading" index={t.index} eyebrow={t.eyebrow} heading={t.heading} emphasis={t.headingEmphasis} />
      <ProjectGrid />
    </section>
  );
}

export function ExperienceSection() {
  const t = ui.experience;
  return (
    <section id="experience" aria-labelledby="experience-heading" className={container}>
      <SectionIntro id="experience-heading" index={t.index} eyebrow={t.eyebrow} heading={t.heading} emphasis={t.headingEmphasis} />
      <ol className="divide-y divide-line border-y border-line">
        {experiences.map((exp, i) => (
          <li key={exp.id}>
            {/* Native disclosure replaces the live site's JS accordion; the first role starts open. */}
            <details id={`experience-panel-${exp.id}`} open={i === 0} className="group py-5">
              <summary className="flex min-h-11 cursor-pointer list-none flex-wrap items-baseline gap-x-4 gap-y-1 [&::-webkit-details-marker]:hidden">
                <h3 className="contents">
                  <span className="font-mono text-xs text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-bold">{exp.role}</span>
                  <span className="text-sm text-fg-secondary">
                    {exp.company} · {exp.location}
                  </span>
                </h3>
                <span className="ml-auto font-mono text-xs text-fg-muted">
                  {exp.current && <span className="sr-only">{t.current} </span>}
                  {exp.period}
                </span>
              </summary>
              <div className="mt-4 max-w-3xl space-y-3 text-sm text-fg-secondary">
                <p>{exp.description}</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  {exp.achievements.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {exp.skills.map((s) => (
                    <li key={s} className={chip}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function SkillsSection() {
  const t = ui.skills;
  return (
    <section id="skills" aria-labelledby="skills-heading" className={container}>
      <SectionIntro id="skills-heading" index={t.index} eyebrow={t.eyebrow} heading={t.heading} emphasis={t.headingEmphasis} />
      <p className="max-w-2xl text-fg-secondary">{t.intro}</p>
      <dl className="mt-6 flex flex-wrap gap-8">
        {t.stats.map((s) => (
          <div key={s.label}>
            <dt className="text-xs text-fg-muted">{s.label}</dt>
            <dd className="text-2xl font-bold">{s.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {skillCategories.map((cat, i) => {
          const id = `skills-${cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          return (
            <section key={cat.category} aria-labelledby={id} className="rounded-lg border border-line bg-card p-5">
              <p className="font-mono text-xs text-fg-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 id={id} className="mt-1 text-lg font-bold">
                {cat.category}
              </h3>
              <p className="text-xs text-fg-muted">{t.disciplines(cat.skills.length)}</p>
              <ul className="mt-4 space-y-4">
                {cat.skills.map((skill) => (
                  <li key={skill.name}>
                    <p className="flex justify-between gap-2 text-sm font-medium">
                      {skill.name}
                      <span className="font-mono text-xs text-fg-muted">
                        {t.years(skill.experienceYears)} · {skill.level}
                      </span>
                    </p>
                    <p className="text-xs text-fg-secondary">{skill.highlight}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const t = ui.testimonials;
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className={container}>
      <SectionIntro id="testimonials-heading" index={t.index} eyebrow={t.eyebrow} heading={t.heading} emphasis={t.headingEmphasis} />
      <ul className="grid gap-4 md:grid-cols-2">
        {testimonials.map((item) => (
          <li key={item.id}>
            <figure className="h-full rounded-lg border border-line bg-card p-6">
              <blockquote className="text-fg-secondary">“{item.quote}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-bold">{item.author}</span>
                <span className="text-fg-muted">
                  {" "}
                  {item.role}, {item.company}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ContactSection() {
  const t = ui.contact;
  return (
    <section id="contact" aria-labelledby="contact-heading" className={container}>
      <SectionIntro id="contact-heading" index={t.index} eyebrow={t.eyebrow} heading={t.heading} emphasis={t.headingEmphasis} />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="max-w-xl text-fg-secondary">{t.intro}</p>
          <div className="rounded-lg border border-line bg-card p-5">
            <h3 className="font-mono text-xs font-bold">
              {t.emailTitle} <span className="font-normal text-fg-muted">{t.emailNote}</span>
            </h3>
            <a href={`mailto:${profile.email}`} className="mt-2 inline-flex min-h-11 items-center text-lg font-medium text-accent-text underline-offset-4 hover:underline">
              {profile.email}
            </a>
            <dl className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs text-fg-muted">{t.replyLabel}</dt>
                <dd>{t.replyValue}</dd>
              </div>
              <div>
                <dt className="text-xs text-fg-muted">{t.locationLabel}</dt>
                <dd>{profile.location}</dd>
              </div>
            </dl>
          </div>
          <p className="text-sm text-fg-secondary">{profile.availability}</p>
        </div>
        <div className="space-y-6">
          <ol className="space-y-4">
            {t.services.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="font-mono text-xs text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-sm font-bold">{s.title}</h3>
                  <p className="text-sm text-fg-secondary">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <ul className="grid grid-cols-2 gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="flex min-h-11 flex-col rounded-lg border border-line bg-card p-4 hover:bg-card-hover">
                  <span className="text-sm font-bold">{s.label}</span>
                  <span className="text-xs text-fg-muted">{s.note}</span>
                  <span className="sr-only">{ui.newTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
