"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ui } from "@/content/site";
import { MOTION_OK, gsap, reducedMotion, useGSAP } from "./motion";
import { subtleLink } from "./ui";

// Vertical stagger per frame, like frames placed by hand on a canvas. Only OTP and Homescreen show below sm.
const frameLayout = ["hidden sm:block", "hidden sm:block sm:mt-12", "sm:mt-4", "mt-10 sm:mt-16"];
const handles = ["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"];

function SelectionBox({ badge }: { badge?: string }) {
  return (
    <>
      {handles.map((pos) => (
        <span key={pos} className={`absolute size-2 border border-accent bg-card ${pos}`} />
      ))}
      {badge && (
        <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-sm bg-accent px-1.5 py-0.5 font-mono text-label-12 text-on-accent">
          {badge}
        </span>
      )}
    </>
  );
}

// Frames exported from the DOCTO Figma file, shown as on the Figma canvas.
// Server HTML draws a selection box per frame (works without JavaScript). Once hydrated, a single
// box glides to the hovered frame and back to the selected one, and on fine pointers the frame layer
// pans slightly with the cursor. Light theme in both modes (.theme-light).
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
    if (animate && !reducedMotion()) gsap.to(box.current, { ...vars, duration: 0.35, ease: "power3.out", overwrite: true });
    else gsap.set(box.current, vars);
  };

  const { contextSafe } = useGSAP(
    () => {
      place(selected, false);
      setEnhanced(true);

      const resize = new ResizeObserver(() => place(activeRef.current, false));
      if (list.current) resize.observe(list.current);

      const mm = gsap.matchMedia();
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

  return (
    <figure className="border-t border-line lg:col-span-12">
      <div ref={canvas} className="theme-light design-canvas overflow-hidden px-6 pb-12 pt-5 sm:px-10 sm:pb-16">
        <p className="font-mono text-label-12 text-fg-secondary">{c.page}</p>
        <ul
          ref={list}
          onPointerLeave={() => focus(selected)}
          className="relative mx-auto mt-8 grid max-w-4xl grid-cols-2 items-start gap-6 sm:grid-cols-4 sm:gap-8"
        >
          {c.frames.map((frame, i) => (
            <li key={frame.name} className={`group ${frameLayout[i]}`} onPointerEnter={() => focus(i)}>
              <p
                className={`mb-2 truncate text-label-12 transition-colors motion-reduce:transition-none ${
                  (enhanced ? active === i : frame.selected) ? "text-accent-text" : "text-fg-secondary group-hover:text-accent-text"
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
                  width={c.frameSize.width}
                  height={c.frameSize.height}
                  alt={frame.alt}
                  sizes="(min-width: 1024px) 208px, (min-width: 640px) 22vw, 42vw"
                  loading="eager"
                  className="h-auto w-full shadow-small"
                />
                {!enhanced && (
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -inset-px border border-accent ${
                      frame.selected ? "" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <SelectionBox badge={frame.selected ? c.selectedBadge : undefined} />
                  </span>
                )}
              </div>
            </li>
          ))}
          {/* Single moving selection box, positioned by GSAP; hidden until measured. */}
          <span
            ref={box}
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-0 -m-px box-content border border-accent ${enhanced ? "" : "invisible"}`}
          >
            <SelectionBox badge={c.selectedBadge} />
          </span>
        </ul>
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 border-t border-line px-6 py-2 sm:px-8">
        <span className="py-2 text-label-13 text-fg-secondary">{c.caption}</span>
        <a href={c.href} target="_blank" rel="noopener noreferrer" className={subtleLink}>
          {c.linkLabel} <span aria-hidden="true">↗</span>
          <span className="sr-only">{ui.newTab}</span>
        </a>
      </figcaption>
    </figure>
  );
}
