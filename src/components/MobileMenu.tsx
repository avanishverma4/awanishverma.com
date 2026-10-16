"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { DURATION, EASE, gsap, reducedMotion } from "./motion";

// Native <details> disclosure (works without JavaScript), enhanced so it never covers the page
// after the reader has moved on: it closes when a link or button inside the panel is chosen,
// on Escape, on a press outside it, and when keyboard focus leaves it.
// The summary's label and icon follow the open state.
export function MobileMenu({
  openLabel,
  closeLabel,
  summaryClassName,
  children,
}: {
  openLabel: string;
  closeLabel: string;
  summaryClassName: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <details
      ref={ref}
      className="relative md:hidden"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest("summary") && target.closest("a, button")) close();
      }}
      onToggle={(e) => {
        setOpen(e.currentTarget.open);
        const panel = e.currentTarget.querySelector("summary + *");
        if (e.currentTarget.open && panel && !reducedMotion()) {
          gsap.fromTo(panel, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: DURATION.fast, ease: EASE, clearProps: "opacity,transform" });
        }
      }}
      // Only when focus moves to something outside: a press inside can blur with no new target
      // (Safari does not focus links on click), and closing then would swallow the click.
      onBlur={(e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && ref.current?.open) {
          close();
          ref.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary aria-label={open ? closeLabel : openLabel} className={summaryClassName}>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </summary>
      {children}
    </details>
  );
}
