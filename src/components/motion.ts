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

// One motion scale for the whole site (seconds): fast for small feedback (menus), base for
// panels and state changes, slow for scroll reveals. Things ease out as they enter and in as they leave.
// The CSS transitions use the matching durations (duration-200 / duration-300), as do the dialog
// enter and exit transitions in globals.css.
export const DURATION = { fast: 0.2, base: 0.3, slow: 0.6 };
export const EASE = "power2.out";
export const EASE_EXIT = "power2.in";
