"use client";

import { useRef, type ReactNode } from "react";

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
