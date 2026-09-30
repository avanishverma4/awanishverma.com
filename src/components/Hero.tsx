import { profile, ui } from "@/content/site";
import { ResumeButton } from "./ResumeButton";

export function Hero() {
  const t = ui.hero;
  return (
    <section id="hero" aria-labelledby="hero-heading" className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      <p className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-fg-muted">
        <span className="text-accent-text">{t.index}</span> {t.eyebrow}
      </p>
      <h1 id="hero-heading" className="max-w-4xl text-[2.6rem] font-bold leading-[0.98] tracking-tight sm:text-6xl">
        <span className="sr-only">{t.srHeading} </span>
        <span aria-hidden="true">
          {t.headingLead}
          <br />
          {t.headingBefore}
          <span className="text-accent-text">{t.headingEmphasis}</span>
          {t.headingAfter}
        </span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-fg-secondary">{profile.shortBio}</p>
      <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-fg-muted">
        {t.tags.map((tag, i) => (
          <li key={tag}>
            {i > 0 && <span aria-hidden="true">• </span>}
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="inline-flex min-h-11 items-center rounded-md bg-accent-solid px-5 text-sm font-medium text-accent-contrast hover:opacity-90"
        >
          {t.primaryCta}
        </a>
        <ResumeButton
          title={ui.header.resumeTitle}
          className="inline-flex min-h-11 items-center rounded-md border border-line bg-card px-5 text-sm font-medium hover:bg-card-hover"
        >
          {t.secondaryCta}
        </ResumeButton>
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {profile.stats.map((stat) => (
          <div key={stat.label} className="border-t border-line pt-3.5">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="text-3xl font-bold tracking-tight">{stat.value}</dd>
            <dd aria-hidden="true" className="mt-1 text-xs text-fg-muted">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">{t.connect}</span>
        {[
          ["GitHub", profile.github],
          ["LinkedIn", profile.linkedin],
          ["Behance", profile.behance],
        ].map(([label, href], i) => (
          <span key={href}>
            {i > 0 && <span aria-hidden="true" className="text-fg-muted">/ </span>}
            <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-fg-secondary underline-offset-4 hover:text-fg hover:underline">
              {label}
              <span className="sr-only">{ui.newTab}</span>
            </a>
          </span>
        ))}
      </p>
    </section>
  );
}
