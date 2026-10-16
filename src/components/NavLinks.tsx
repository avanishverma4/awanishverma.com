"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { SectionLink } from "./SectionLink";

// Section links that mark where the reader is (aria-current="location"), shown by the sticky header.
// On the home page a section is current while it crosses a line 40% down the viewport (in the hero,
// none is), and without JavaScript these are plain anchor links. On a case study page the links
// lead back to the home page and `marked` (Work) stays marked; the 404 page marks none.
export function NavLinks({ home, marked, label, className, linkClassName }: { home: boolean; marked: string | null; label?: string; className?: string; linkClassName: string }) {
  const [current, setCurrent] = useState<string | null>(home ? null : marked);

  useEffect(() => {
    if (!home) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) setCurrent(href);
          // Only clear if no other section has taken over in the same batch.
          else setCurrent((c) => (c === href ? null : c));
        }
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    for (const item of nav) {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [home]);

  return (
    <ul aria-label={label} className={className}>
      {nav.map((item) => (
        <li key={item.href}>
          <SectionLink home={home} href={item.href} aria-current={current === item.href ? "location" : undefined} className={linkClassName}>
            {item.label}
          </SectionLink>
        </li>
      ))}
    </ul>
  );
}
