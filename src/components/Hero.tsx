import { getImageProps } from "next/image";
import { profile, ui } from "@/content/site";
import { button, container, eyebrow } from "./ui";

const socialLink = "inline-flex min-h-11 items-center text-label-14 text-fg-secondary transition-colors hover:text-fg";

// Geist-style grid: one 1px-bordered frame split into cells.
// Mobile stacks the cells; from lg the intro takes 8 of 12 columns and the facts column the rest.
export function Hero() {
  const t = ui.hero;
  const common = { alt: t.image.alt, sizes: "(min-width: 1200px) 1150px, calc(100vw - 34px)" };
  const { props: desktop } = getImageProps({ ...common, ...t.image.desktop });
  const {
    props: { srcSet: mobileSrcSet, ...img },
  } = getImageProps({ ...common, ...t.image.mobile, loading: "eager", fetchPriority: "high" });

  return (
    <section id="hero" aria-labelledby="hero-heading" className={`${container} pb-20 pt-10 sm:pb-24 sm:pt-16`}>
      <div className="grid overflow-hidden rounded-lg border border-line lg:grid-cols-12">
        <div className="flex flex-col p-6 sm:p-10 lg:col-span-8 lg:border-r lg:border-line lg:p-12">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-3 py-1 text-label-13 text-fg-secondary">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            {t.status}
          </p>
          <h1 id="hero-heading" className="mt-8">
            <span className="block text-heading-40 sm:text-heading-56">{profile.name}</span>
            <span className="mt-2 block text-heading-20 text-fg-secondary sm:text-heading-24">{t.role}</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-copy-18 sm:text-copy-20">{t.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-10">
            <a href="#projects" className={button("primary")}>
              {t.primaryCta}
            </a>
            <a href={profile.behance} target="_blank" rel="noopener noreferrer" className={button("secondary")}>
              {t.secondaryCta}
              <span className="sr-only">{ui.newTab}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col border-t border-line lg:col-span-4 lg:border-t-0">
          <dl className="grid grid-cols-2 divide-x divide-line border-b border-line lg:grid-cols-1 lg:divide-x-0 lg:divide-y">
            {t.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse p-6 sm:px-8">
                <dt className="mt-1 text-label-13 text-fg-secondary">{fact.label}</dt>
                <dd className="text-heading-32 sm:text-heading-40">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="border-b border-line p-6 sm:px-8">
            <p id="hero-focus" className={eyebrow}>
              {t.focusLabel}
            </p>
            <ul aria-labelledby="hero-focus" className="mt-3 flex flex-wrap gap-2">
              {t.focus.map((item) => (
                <li key={item} className="rounded-sm border border-line-subtle bg-subtle px-2 py-1 text-label-13">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-x-5 px-6 py-3 sm:px-8">
            <p className={eyebrow}>{t.connect}</p>
            {[
              ["GitHub", profile.github],
              ["LinkedIn", profile.linkedin],
            ].map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={socialLink}>
                {label}
                <span className="sr-only">{ui.newTab}</span>
              </a>
            ))}
          </div>
        </div>

        <figure className="border-t border-line lg:col-span-12">
          <div className="bg-media">
            <picture>
              <source media="(min-width: 640px)" srcSet={desktop.srcSet} sizes={desktop.sizes} width={desktop.width} height={desktop.height} />
              {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
              <img {...img} srcSet={mobileSrcSet} className="h-auto w-full" />
            </picture>
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-x-4 border-t border-line px-6 py-2 sm:px-8">
            <span className="py-2 text-label-13 text-fg-secondary">{t.image.caption}</span>
            <a href={t.image.href} target="_blank" rel="noopener noreferrer" className={socialLink}>
              {t.image.linkLabel} <span aria-hidden="true">↗</span>
              <span className="sr-only">{ui.newTab}</span>
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
