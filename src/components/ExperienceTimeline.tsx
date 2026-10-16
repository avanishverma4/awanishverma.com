"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { experiences, projects, ui } from "@/content/site";
import { DURATION, EASE, EASE_EXIT, MOTION_OK, ScrollTrigger, gsap, reducedMotion, useGSAP } from "./motion";
import { badge, textLink } from "./ui";

const index = (i: number) => String(i + 1).padStart(2, "0");
const panelId = (id: string) => `experience-panel-${id}`;

// Career timeline. A rail runs down the left: its solid fill draws as the section scrolls
// through the viewport, and each role's dot fills once the reader reaches it. Each role is a
// heading that contains a disclosure button for its panel; GSAP smooths opening and closing.
// Without JavaScript the buttons cannot work, so a <noscript> style shows every panel.
// Under reduced motion: static rail (no scrub), dots still mark progress, roles open and close instantly.
export function ExperienceTimeline() {
  const t = ui.experience;
  const root = useRef<HTMLOListElement>(null);

  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set([experiences[0].id]));
  // Flushed synchronously, so the panel is in the layout (or gone) before GSAP or ScrollTrigger measure.
  const setRole = (id: string, isOpen: boolean) =>
    flushSync(() =>
      setOpen((prev) => {
        const next = new Set(prev);
        if (isOpen) next.add(id);
        else next.delete(id);
        return next;
      }),
    );

  const { contextSafe } = useGSAP(
    () => {
      // A dot is "reached" once it is above 70% of the viewport. State is read from real positions
      // (not enter/leave callbacks), and re-synced after every ScrollTrigger refresh, because a refresh
      // measures at scroll 0 and would otherwise clear the dots.
      const dots = gsap.utils.toArray<HTMLElement>(".timeline-dot");
      const sync = () => {
        const line = window.innerHeight * 0.7;
        dots.forEach((dot) => dot.classList.toggle("is-reached", dot.getBoundingClientRect().top <= line));
      };
      ScrollTrigger.create({ trigger: root.current, start: "top bottom", end: "bottom top", onUpdate: sync, onToggle: sync });
      ScrollTrigger.addEventListener("refresh", sync);
      sync();

      // Scroll-scrubbed rail fill: motion, so only without reduced-motion preference.
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".timeline-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            // Same 70% line as the dots, so the fill's tip arrives at a dot as it fills.
            scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 70%", scrub: 0.4 },
          },
        );
      });

      const list = root.current;
      const onMatch = (e: Event) => {
        const id = (e.target as HTMLElement).id.replace(panelId(""), "");
        setRole(id, true);
        ScrollTrigger.refresh();
      };
      list?.addEventListener("beforematch", onMatch);

      return () => {
        ScrollTrigger.removeEventListener("refresh", sync);
        list?.removeEventListener("beforematch", onMatch);
      };
    },
    { scope: root },
  );

  // Closed panels are hidden="until-found": still hidden from everyone, but the browser's
  // find-in-page can match their text and then fires `beforematch`, which opens the role.
  // React only writes a plain `hidden`, so the value is upgraded here after each render.
  useLayoutEffect(() => {
    root.current?.querySelectorAll(".role-body[hidden]").forEach((panel) => panel.setAttribute("hidden", "until-found"));
  }, [open]);

  // Opening expands the panel from 0 and staggers the bullets; closing collapses it, then hides it.
  // Either way the page height changes, so ScrollTrigger re-measures once the height has settled;
  // otherwise the rail uses stale positions.
  const toggle = (id: string) =>
    contextSafe(() => {
      const body = document.getElementById(panelId(id));
      if (!body) return;
      if (reducedMotion()) {
        setRole(id, !open.has(id));
        return ScrollTrigger.refresh();
      }
      if (!open.has(id)) {
        setRole(id, true);
        gsap.fromTo(
          body,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: DURATION.base, ease: EASE, overwrite: true, clearProps: "height,opacity", onComplete: () => ScrollTrigger.refresh() },
        );
        gsap.fromTo(
          body.querySelectorAll(".role-achievement"),
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: DURATION.base, stagger: 0.06, delay: 0.1, ease: EASE, clearProps: "opacity,transform" },
        );
      } else {
        gsap.to(body, {
          height: 0,
          opacity: 0,
          duration: DURATION.base,
          ease: EASE_EXIT,
          overwrite: true,
          onComplete: () => {
            setRole(id, false);
            gsap.set(body, { clearProps: "height,opacity" });
            ScrollTrigger.refresh();
          },
        });
      }
    })();

  return (
    <>
      <noscript>
        {/* In the theme layer: for !important rules an earlier layer wins, and Tailwind's own
            [hidden] rule is an !important rule in the later base layer. */}
        <style>{"@layer theme{.role-body[hidden]{display:block !important;content-visibility:visible}}"}</style>
      </noscript>
      <ol ref={root} className="relative pl-10">
        {/* Rail: neutral line always visible; the solid fill is scrubbed by scroll. Decorative. */}
        <span aria-hidden="true" className="absolute bottom-2 left-2 top-2 -ml-px w-0.5 bg-line" />
        <span aria-hidden="true" className="timeline-progress absolute bottom-2 left-2 top-2 -ml-px w-0.5 origin-top scale-y-0 bg-fg" />
        {experiences.map((exp, i) => (
          <li key={exp.id} data-reveal className="relative">
            <span
              aria-hidden="true"
              className="timeline-dot absolute -left-10 top-7 size-4 rounded-full border-2 border-line bg-page transition-colors duration-300 motion-reduce:transition-none [&.is-reached]:border-fg [&.is-reached]:bg-fg"
            />
            <div className="border-b border-line py-5">
              {/* The heading wraps the button (not the other way round), so every role is in the
                  heading outline for screen reader navigation. */}
              <h3>
                <button
                  type="button"
                  id={`experience-role-${exp.id}`}
                  aria-expanded={open.has(exp.id)}
                  aria-controls={panelId(exp.id)}
                  onClick={() => toggle(exp.id)}
                  className="group flex min-h-11 w-full cursor-pointer flex-wrap items-baseline gap-x-4 gap-y-1 rounded-md text-left"
                >
                  <span className="font-mono text-label-12 text-fg-secondary">{index(i)}</span>
                  <span className="text-heading-20">{exp.role}</span>
                  <span className="text-label-14 text-fg-secondary">
                    {exp.company} · {exp.location}
                  </span>
                  <span className="ml-auto flex items-center gap-3 font-mono text-label-12 text-fg-secondary">
                    {exp.current && <span className="sr-only">{t.current} </span>}
                    {exp.period}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-4 self-center transition-transform duration-300 group-aria-expanded:rotate-180 motion-reduce:transition-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={panelId(exp.id)}
                role="region"
                aria-labelledby={`experience-role-${exp.id}`}
                hidden={!open.has(exp.id)}
                className="role-body overflow-hidden"
              >
                {/* From lg the skill badges sit in a column beside the text, so the row uses its full width. */}
                <div className="mt-4 space-y-3 text-copy-16 text-fg-secondary lg:grid lg:grid-cols-[minmax(0,65ch)_1fr] lg:gap-x-10 lg:space-y-0">
                  {/* 65 characters per line: a comfortable measure for body text. */}
                  <div className="max-w-prose space-y-3">
                    <p>{exp.description}</p>
                    <ul className="list-disc space-y-1.5 pl-5">
                      {exp.achievements.map((a) => (
                        <li key={a} className="role-achievement">
                          {a}
                        </li>
                      ))}
                    </ul>
                    {/* Products made in this role that have a case study. */}
                    {projects.some((p) => p.experienceId === exp.id) && (
                      <p>
                        {t.caseStudies}{" "}
                        {projects
                          .filter((p) => p.experienceId === exp.id)
                          .map((p, n) => (
                            <span key={p.id}>
                              {n > 0 && ", "}
                              <Link href={`/work/${p.slug}`} className={`${textLink} py-0.5`}>
                                {p.title}
                              </Link>
                            </span>
                          ))}
                      </p>
                    )}
                  </div>
                  <ul className="flex flex-wrap content-start gap-2 pt-1 lg:pt-0.5">
                    {exp.skills.map((s) => (
                      <li key={s} className={badge}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
