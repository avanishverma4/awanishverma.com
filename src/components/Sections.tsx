import { profile, socials, testimonials, ui } from "@/content/site";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { ProjectGrid } from "./Projects";
import { SectionHeader } from "./SectionHeader";
import { card, container, interactiveCard, textLink } from "./ui";

const section = `${container} py-20 sm:py-24`;
const index = (i: number) => String(i + 1).padStart(2, "0");

export function ProjectsSection() {
  const t = ui.projects;
  return (
    <section id="projects" aria-labelledby="projects-heading" className={section}>
      <SectionHeader id="projects-heading" index={t.index} label={t.eyebrow} heading={t.heading} emphasis={t.headingEmphasis} />
      <ProjectGrid />
    </section>
  );
}

export function ExperienceSection() {
  const t = ui.experience;
  return (
    <section id="experience" aria-labelledby="experience-heading" className={section}>
      <SectionHeader id="experience-heading" index={t.index} label={t.eyebrow} heading={t.heading} emphasis={t.headingEmphasis} />
      <ExperienceTimeline />
    </section>
  );
}

export function TestimonialsSection() {
  const t = ui.testimonials;
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className={section}>
      <SectionHeader id="testimonials-heading" index={t.index} label={t.eyebrow} heading={t.heading} emphasis={t.headingEmphasis} />
      <ul className="grid gap-4 md:grid-cols-2">
        {testimonials.map((item) => (
          <li key={item.id} data-reveal>
            <figure className={`${card} h-full p-6`}>
              <blockquote className="text-copy-16 text-fg">“{item.quote}”</blockquote>
              <figcaption className="mt-4 text-label-14">
                <span className="font-medium">{item.author}</span>
                <span className="text-fg-secondary">
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
    <section id="contact" aria-labelledby="contact-heading" className={section}>
      <SectionHeader id="contact-heading" index={t.index} label={t.eyebrow} heading={t.heading} emphasis={t.headingEmphasis} />
      <div className="grid gap-10 lg:grid-cols-2">
        <div data-reveal className="space-y-6">
          <p className="max-w-xl text-copy-16 text-fg-secondary">{t.intro}</p>
          <div className={`${card} p-5`}>
            <h3 className="text-heading-14">
              {t.emailTitle} <span className="font-normal text-fg-secondary">{t.emailNote}</span>
            </h3>
            <a href={`mailto:${profile.email}`} className={`${textLink} mt-1 inline-flex min-h-11 items-center text-heading-20`}>
              {profile.email}
            </a>
            <dl className="mt-3 grid grid-cols-2 gap-4 text-copy-14">
              <div>
                <dt className="text-label-13 text-fg-secondary">{t.replyLabel}</dt>
                <dd>{t.replyValue}</dd>
              </div>
              <div>
                <dt className="text-label-13 text-fg-secondary">{t.locationLabel}</dt>
                <dd>{profile.location}</dd>
              </div>
            </dl>
          </div>
          <p className="text-copy-14 text-fg-secondary">{profile.availability}</p>
        </div>
        <div data-reveal className="space-y-6">
          <ol className="space-y-4">
            {t.services.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="font-mono text-label-12 text-fg-secondary">{index(i)}</span>
                <div>
                  <h3 className="text-heading-14">{s.title}</h3>
                  <p className="text-copy-14 text-fg-secondary">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <ul className="grid grid-cols-2 gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${interactiveCard} flex min-h-11 flex-col p-4`}>
                  <span className="text-heading-14">{s.label}</span>
                  <span className="text-label-13 text-fg-secondary">{s.note}</span>
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
