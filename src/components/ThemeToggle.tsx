"use client";

import { useRef, useSyncExternalStore } from "react";
import { themeStorageKey, ui } from "@/content/site";
import { reducedMotion, gsap, useGSAP } from "./motion";
import { iconButton } from "./ui";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  // Server snapshot matches the SSR default (dark) so hydration never mismatches.
  const dark = useSyncExternalStore(subscribe, isDark, () => true);
  const next = dark ? "light" : "dark";
  const button = useRef<HTMLButtonElement>(null);
  const toggled = useRef(false);

  // Rotate the new icon in after each switch; not on first render or under reduced motion.
  useGSAP(
    () => {
      if (!toggled.current) {
        toggled.current = true;
        return;
      }
      const icon = button.current?.querySelector("svg");
      if (!icon || reducedMotion()) return;
      gsap.fromTo(icon, { rotate: -90, scale: 0.6 }, { rotate: 0, scale: 1, duration: 0.45, ease: "back.out(2)" });
    },
    { dependencies: [dark] },
  );

  return (
    <button
      ref={button}
      type="button"
      aria-label={`${ui.header.switchTo}${next} mode`}
      onClick={() => {
        document.documentElement.classList.toggle("dark", !dark);
        try {
          localStorage.setItem(themeStorageKey, next);
        } catch {}
      }}
      className={iconButton}
    >
      {dark ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
