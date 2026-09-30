import { getImageProps } from "next/image";
import { profile, ui } from "@/content/site";
import { button, container, eyebrow } from "./ui";

export function Hero() {
  const t = ui.hero;
  const common = { alt: t.image.alt, sizes: "(min-width: 1200px) 1152px, calc(100vw - 32px)" };
  const { props: desktop } = getImageProps({ ...common, ...t.image.desktop });
  const {
    props: { srcSet: mobileSrcSet, ...img },
  } = getImageProps({ ...common, ...t.image.mobile, fetchPriority: "high" });
  return (
    <section id="hero" aria-labelledby="hero-heading" className={`${container} pb-20 pt-16 sm:pb-24 sm:pt-24`}>
      <div className="max-w-3xl">
        <p className={`${eyebrow} flex items-center gap-2`}>
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          {t.status}
        </p>
        <h1 id="hero-heading" className="mt-5">
          <span className="block text-heading-40 sm:text-heading-56">{profile.name}</span>
          <span className="mt-2 block text-heading-20 text-fg-secondary sm:text-heading-24">{t.role}</span>
        </h1>
        <p className="mt-6 text-copy-18 sm:text-copy-20">{t.summary}</p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {t.facts.map((fact) => (
            <div key={fact.label} className="flex flex-col-reverse">
              <dt className="text-label-13 text-fg-secondary">{fact.label}</dt>
              <dd className="text-heading-24">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <ul aria-label={t.focusLabel} className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-label-12 text-fg-secondary">
          {t.focus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className={button("primary")}>
            {t.primaryCta}
          </a>
          <a href={profile.behance} target="_blank" rel="noopener noreferrer" className={button("secondary")}>
            {t.secondaryCta}
            <span className="sr-only">{ui.newTab}</span>
          </a>
        </div>

        <p className="mt-6 flex flex-wrap items-center gap-x-4 text-label-14">
          <span className={eyebrow}>{t.connect}</span>
          {[
            ["GitHub", profile.github],
            ["LinkedIn", profile.linkedin],
          ].map(([label, href]) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-fg-secondary transition-colors hover:text-fg">
              {label}
              <span className="sr-only">{ui.newTab}</span>
            </a>
          ))}
        </p>
      </div>

      <figure className="mt-12 sm:mt-16">
        <div className="overflow-hidden rounded-lg border border-line bg-media">
          <picture>
            <source media="(min-width: 640px)" srcSet={desktop.srcSet} sizes={desktop.sizes} width={desktop.width} height={desktop.height} />
            {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
            <img {...img} srcSet={mobileSrcSet} className="h-auto w-full" />
          </picture>
        </div>
        <figcaption className="mt-3 text-label-13 text-fg-secondary">{t.image.caption}</figcaption>
      </figure>
    </section>
  );
}
