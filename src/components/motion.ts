// Shared GSAP setup for client components. Every animation either runs inside
// gsap.matchMedia(MOTION_OK) or checks reducedMotion() first, so users who ask for
// reduced motion get the final state with no movement.
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Dialogs appear instantly (native showModal); this eases the panel in after it is already open.
export function dialogIn(el: Element | null) {
  if (!el || reducedMotion()) return;
  gsap.fromTo(
    el,
    { opacity: 0, y: 12, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power2.out", clearProps: "opacity,transform" },
  );
}
