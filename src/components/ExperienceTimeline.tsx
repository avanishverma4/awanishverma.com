"use client";

import { useRef, type MouseEvent } from "react";
import { experiences, ui } from "@/content/site";
import { MOTION_OK, ScrollTrigger, gsap, reducedMotion, useGSAP } from "./motion";
import { badge } from "./ui";

const index = (i: number) => String(i + 1).padStart(2, "0");

// Career timeline. A rail runs down the left: its accent fill draws as the section scrolls
// through the viewport, and each role's dot fills once the reader reaches it. Roles are native
// <details> (work without JavaScript); GSAP only smooths opening and closing.
// Under reduced motion: static rail (no scrub), dots still mark progress, roles open and close instantly.
export function ExperienceTimeline() {
  const t = ui.experience;
  const root = useRef<HTMLOListElement>(null);

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
            scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: 0.4 },
          },
        );
      });

      return () => ScrollTrigger.removeEventListener("refresh", sync);
    },
    { scope: root },
  );

  // Opening: the browser opens the <details>; we expand its body from 0 and stagger the bullets.
  const onToggle = (details: HTMLDetailsElement) =>
    contextSafe(() => {
      if (!details.open || reducedMotion()) return;
      const body = details.querySelector<HTMLElement>(".role-body");
      if (!body) return;
      gsap.fromTo(body, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out", clearProps: "height,opacity" });
      gsap.fromTo(
        body.querySelectorAll(".role-achievement"),
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.06, delay: 0.1, ease: "power2.out", clearProps: "opacity,transform" },
      );
    })();

  // Closing: hold the native close, collapse the body, then close the <details>.
  const onSummaryClick = (e: MouseEvent<HTMLElement>) =>
    contextSafe(() => {
      const details = e.currentTarget.parentElement as HTMLDetailsElement;
      const body = details.querySelector<HTMLElement>(".role-body");
      if (!details.open || !body || reducedMotion()) return;
      e.preventDefault();
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          details.open = false;
          gsap.set(body, { clearProps: "height,opacity" });
        },
      });
    })();

  return (
    <ol ref={root} className="relative pl-10">
      {/* Rail: neutral line always visible; the accent fill is scrubbed by scroll. Decorative. */}
      <span aria-hidden="true" className="absolute bottom-2 left-2 top-2 -ml-px w-0.5 bg-line" />
      <span aria-hidden="true" className="timeline-progress absolute bottom-2 left-2 top-2 -ml-px w-0.5 origin-top scale-y-0 bg-accent" />
      {experiences.map((exp, i) => (
        <li key={exp.id} data-reveal className="relative">
          <span
            aria-hidden="true"
            className="timeline-dot absolute -left-10 top-7 size-4 rounded-full border-2 border-line bg-page transition-colors duration-300 motion-reduce:transition-none [&.is-reached]:border-accent [&.is-reached]:bg-accent"
          />
          <details
            id={`experience-panel-${exp.id}`}
            open={i === 0}
            onToggle={(e) => onToggle(e.currentTarget)}
            className="group border-b border-line py-5"
          >
            <summary
              onClick={onSummaryClick}
              className="flex min-h-11 cursor-pointer list-none flex-wrap items-baseline gap-x-4 gap-y-1 rounded-md [&::-webkit-details-marker]:hidden"
            >
              <h3 className="contents">
                <span className="font-mono text-label-12 text-fg-secondary">{index(i)}</span>
                <span className="text-heading-20">{exp.role}</span>
                <span className="text-label-14 text-fg-secondary">
                  {exp.company} · {exp.location}
                </span>
              </h3>
              <span className="ml-auto flex items-center gap-3 font-mono text-label-12 text-fg-secondary">
                {exp.current && <span className="sr-only">{t.current} </span>}
                {exp.period}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-4 self-center transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <div className="role-body overflow-hidden">
              <div className="mt-4 max-w-3xl space-y-3 text-copy-14 text-fg-secondary">
                <p>{exp.description}</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  {exp.achievements.map((a) => (
                    <li key={a} className="role-achievement">
                      {a}
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {exp.skills.map((s) => (
                    <li key={s} className={badge}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
