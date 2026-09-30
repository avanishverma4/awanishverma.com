"use client";

import { useRef, type ReactNode } from "react";
import { gsap, reducedMotion } from "./motion";

// Native <details> disclosure (works without JavaScript), enhanced to close after a link
// or button inside the panel is chosen, and on Escape, so it never covers the target section.
export function MobileMenu({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  return (
    <details
      ref={ref}
      className="relative md:hidden"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest("summary") && target.closest("a, button")) close();
      }}
      onToggle={(e) => {
        const panel = e.currentTarget.querySelector("summary + *");
        if (e.currentTarget.open && panel && !reducedMotion()) {
          gsap.fromTo(panel, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out", clearProps: "opacity,transform" });
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && ref.current?.open) {
          close();
          ref.current.querySelector("summary")?.focus();
        }
      }}
    >
      {summary}
      {children}
    </details>
  );
}
