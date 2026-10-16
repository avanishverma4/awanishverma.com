"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ui } from "@/content/site";
import { DURATION, EASE, MOTION_OK, gsap, reducedMotion, useGSAP } from "./motion";
import { subtleLink } from "./ui";

// The first frame leads. Below sm it is the only frame: at that width the other two would be too
// small to read. From sm it takes two of three columns with the others stacked beside it, slightly
// offset like hand-placed frames.
const frameLayout = ["col-span-2 sm:row-span-2", "max-sm:hidden sm:mt-6", "max-sm:hidden"];
const frameSizes = [
  "(min-width: 1024px) 672px, (min-width: 640px) 62vw, 88vw",
  "(min-width: 1024px) 320px, (min-width: 640px) 30vw, 42vw",
  "(min-width: 1024px) 320px, (min-width: 640px) 30vw, 42vw",
];
const handles = ["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"];

const size = (frame: { width: number; height: number }) => `${frame.width} × ${frame.height}`;

function SelectionBox({ badge }: { badge?: string }) {
  return (
    <>
      {handles.map((pos) => (
        <span key={pos} className={`absolute size-2 border border-fg bg-card ${pos}`} />
      ))}
      {badge && (
        <span className="selection-badge absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-sm bg-inverse px-1.5 py-0.5 font-mono text-label-12 text-on-inverse">
          {badge}
        </span>
      )}
    </>
  );
}

// Sections of the Khan Academy home page redesign, shown as frames on a design canvas.
// Server HTML draws a selection box per frame (works without JavaScript). Once hydrated, a single
// box glides to the hovered frame and back to the selected one, and on fine pointers the frame layer
// pans slightly with the cursor. On load the selection is dragged out over the lead frame, as if
// the frame had just been drawn (the frames themselves never animate). The canvas follows the page theme (a dark canvas in dark mode,
// as in a design tool); the frames themselves are always the light designs.
export function HeroCanvas() {
  const c = ui.hero.canvas;
  const selected = c.frames.findIndex((f) => f.selected);
  const [active, setActive] = useState(selected);
  const [enhanced, setEnhanced] = useState(false);
  const canvas = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const box = useRef<HTMLSpanElement>(null);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(selected);

  // Positions the moving box over frame i, measured relative to the frame list it lives in.
  const place = (i: number, animate: boolean) => {
    const frame = frames.current[i];
    if (!frame || !list.current || !box.current || !frame.offsetParent) return;
    const f = frame.getBoundingClientRect();
    const l = list.current.getBoundingClientRect();
    const vars = { x: f.left - l.left, y: f.top - l.top, width: f.width, height: f.height };
    // overwrite also stops the intro if it is still running, so opacity is finished here too.
    if (animate && !reducedMotion()) gsap.to(box.current, { ...vars, opacity: 1, duration: DURATION.base, ease: EASE, overwrite: true });
    else gsap.set(box.current, vars);
  };

  const { contextSafe } = useGSAP(
    () => {
      place(selected, false);
      setEnhanced(true);

      const resize = new ResizeObserver(() => place(activeRef.current, false));
      if (list.current) resize.observe(list.current);

      const mm = gsap.matchMedia();
      // Intro: the box grows from the frame's top-left corner to its full size, then the size badge
      // appears. It re-measures at the end in case the layout changed while it ran.
      mm.add(MOTION_OK, () => {
        const el = box.current;
        if (!el) return;
        gsap
          .timeline({ delay: 0.2, onComplete: () => place(activeRef.current, false) })
          .fromTo(
            el,
            { width: 0, height: 0, opacity: 0 },
            { width: gsap.getProperty(el, "width"), height: gsap.getProperty(el, "height"), opacity: 1, duration: DURATION.slow, ease: EASE },
          )
          .fromTo(el.querySelector(".selection-badge"), { opacity: 0 }, { opacity: 1, duration: DURATION.fast, ease: EASE });
      });
      mm.add(`${MOTION_OK} and (pointer: fine)`, () => {
        const el = canvas.current;
        if (!el || !list.current) return;
        const xTo = gsap.quickTo(list.current, "x", { duration: 0.8, ease: "power3" });
        const yTo = gsap.quickTo(list.current, "y", { duration: 0.8, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo(((e.clientX - r.left) / r.width - 0.5) * 16);
          yTo(((e.clientY - r.top) / r.height - 0.5) * 12);
        };
        const reset = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", reset);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", reset);
        };
      });

      return () => resize.disconnect();
    },
    { scope: canvas },
  );

  // Event-time only: wraps the tween in the useGSAP context so it is cleaned up on unmount.
  const focus = (i: number) =>
    contextSafe(() => {
      activeRef.current = i;
      setActive(i);
      place(i, true);
    })();

  // Frames and the caption link open the project on Behance in a new tab.
  const external = { href: c.href, target: "_blank", rel: "noopener noreferrer" };

  return (
    <figure className="order-2 border-t border-line lg:order-3 lg:col-span-12">
      <div ref={canvas} className="design-canvas overflow-hidden px-6 pb-12 pt-5 sm:px-10 sm:pb-16">
        <p className="font-mono text-label-12 text-fg-secondary">{c.page}</p>
        <ul
          ref={list}
          onPointerLeave={() => focus(selected)}
          // Below sm the row gap leaves room for the size badge under the lead frame.
          className="relative mx-auto mt-8 grid max-w-5xl grid-cols-2 items-start gap-x-6 gap-y-12 sm:grid-cols-3 sm:gap-8"
        >
          {c.frames.map((frame, i) => (
            <li key={frame.name} className={`group ${frameLayout[i]}`} onPointerEnter={() => focus(i)}>
              {/* Each frame opens the project for pointer users. The caption link below is the one
                  keyboard stop for it, so the frames stay out of the tab order and have a short name. */}
              <a {...external} tabIndex={-1} aria-label={`${c.linkLabel}: ${c.title} (${frame.name})${ui.newTab}`} className="block">
                <p
                  className={`mb-2 truncate text-label-12 transition-colors motion-reduce:transition-none ${
                    (enhanced ? active === i : frame.selected) ? "text-fg" : "text-fg-secondary group-hover:text-fg"
                  }`}
                >
                  {frame.name}
                </p>
                <div
                  ref={(el) => {
                    frames.current[i] = el;
                  }}
                  className="relative"
                >
                  <Image
                    src={frame.src}
                    width={frame.width}
                    height={frame.height}
                    alt={frame.alt}
                    sizes={frameSizes[i]}
                    // The side frames are hidden on phones; lazy keeps them from being downloaded there.
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : undefined}
                    // Dark theme: the white-backed frames are dimmed slightly so they do not glare.
                    className="h-auto w-full shadow-small dark:brightness-90"
                  />
                  {!enhanced && (
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -inset-px border border-fg ${
                        frame.selected ? "" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <SelectionBox badge={frame.selected ? size(frame) : undefined} />
                    </span>
                  )}
                </div>
              </a>
            </li>
          ))}
          {/* Single moving selection box, positioned by GSAP; hidden until measured. */}
          <span
            ref={box}
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-0 -m-px box-content border border-fg ${enhanced ? "" : "invisible"}`}
          >
            <SelectionBox badge={size(c.frames[active])} />
          </span>
        </ul>
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 border-t border-line px-6 py-2 sm:px-8">
        <span className="py-2 text-label-13 text-fg-secondary">{c.caption}</span>
        <a {...external} className={`${subtleLink} gap-1`}>
          {c.linkLabel} <span aria-hidden="true">→</span>
          <span className="sr-only">{ui.newTab}</span>
        </a>
      </figcaption>
    </figure>
  );
}
