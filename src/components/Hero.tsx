import Image from "next/image";
import { profile, ui } from "@/content/site";
import { button, container, eyebrow } from "./ui";

const socialLink = "inline-flex min-h-11 items-center text-label-14 text-fg-secondary transition-colors hover:text-fg";

// Geist-style grid: one 1px-bordered frame split into cells.
// Mobile stacks the cells; from lg the intro takes 8 of 12 columns and the facts column the rest.
export function Hero() {
  const t = ui.hero;

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

        <ScreenCanvas />
      </div>
    </section>
  );
}

// Vertical stagger per frame, like frames placed by hand on a canvas. Only OTP and Doctor home show below sm.
const frameLayout = ["hidden sm:block", "hidden sm:block sm:mt-12", "sm:mt-4", "mt-10 sm:mt-16"];

// Frames exported from the DOCTO Figma file, shown as on the Figma canvas: frame name above,
// selection box and size badge on the selected frame. Light theme in both modes (.theme-light).
function ScreenCanvas() {
  const c = ui.hero.canvas;
  return (
    <figure className="border-t border-line lg:col-span-12">
      <div className="theme-light design-canvas overflow-hidden px-6 pb-12 pt-5 sm:px-10 sm:pb-16">
        <p className="font-mono text-label-12 text-fg-secondary">{c.page}</p>
        <ul className="mx-auto mt-8 grid max-w-4xl grid-cols-2 items-start gap-6 sm:grid-cols-4 sm:gap-8">
          {c.frames.map((frame, i) => (
            <li key={frame.name} className={`group ${frameLayout[i]}`}>
              <p
                className={`mb-2 truncate text-label-12 transition-colors motion-reduce:transition-none ${
                  frame.selected ? "text-accent-text" : "text-fg-secondary group-hover:text-accent-text"
                }`}
              >
                {frame.name}
              </p>
              <div className="relative">
                <Image
                  src={frame.src}
                  width={c.frameSize.width}
                  height={c.frameSize.height}
                  alt={frame.alt}
                  sizes="(min-width: 1024px) 208px, (min-width: 640px) 22vw, 42vw"
                  loading="eager"
                  className="h-auto w-full shadow-small"
                />
                {/* Selection box with corner handles, as in a design tool. Decorative. */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -inset-px border border-accent transition-opacity motion-reduce:transition-none ${
                    frame.selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((pos) => (
                    <span key={pos} className={`absolute size-2 border border-accent bg-card ${pos}`} />
                  ))}
                </span>
              </div>
              {frame.selected && (
                <p className="mt-3 flex justify-center">
                  <span className="rounded-sm bg-accent px-1.5 py-0.5 font-mono text-label-12 text-on-accent">{c.selectedBadge}</span>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 border-t border-line px-6 py-2 sm:px-8">
        <span className="py-2 text-label-13 text-fg-secondary">{c.caption}</span>
        <a href={c.href} target="_blank" rel="noopener noreferrer" className={socialLink}>
          {c.linkLabel} <span aria-hidden="true">↗</span>
          <span className="sr-only">{ui.newTab}</span>
        </a>
      </figcaption>
    </figure>
  );
}
