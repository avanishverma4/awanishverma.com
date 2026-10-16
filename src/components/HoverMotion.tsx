"use client";

import { DURATION, EASE, MOTION_OK, gsap, useGSAP } from "./motion";

// Hover motion for the whole page, wired once by event delegation so server components opt in
// with data attributes and stay server components:
//   data-hover="card"      lifts slightly and tilts a few degrees toward the pointer, with a soft
//                          spotlight that follows it (--spot-x / --spot-y, drawn in globals.css);
//                          a [data-hover-media] child zooms in and a [data-hover-arrow] child
//                          slides right. Keyboard focus gets the lift too.
//   data-hover="magnetic"  leans a few pixels toward the pointer and settles back on leave.
// Fine pointers only (touch has no hover), and nothing under reduced motion: the colour and border
// changes in CSS still mark the hover state.
const FINE_POINTER = `${MOTION_OK} and (hover: hover) and (pointer: fine)`;
const MAGNET_PULL = 0.2;
const MAGNET_MAX = 6;
// Degrees at the card's edge; small, so a large tile does not swing.
const TILT = 3;

const clamp = gsap.utils.clamp(-MAGNET_MAX, MAGNET_MAX);

const cardOf = (node: EventTarget | null) => (node instanceof Element ? node.closest<HTMLElement>('[data-hover="card"]') : null);
const magnetOf = (node: EventTarget | null) => (node instanceof Element ? node.closest<HTMLElement>('[data-hover="magnetic"]') : null);

function animateCard(card: HTMLElement, on: boolean) {
  const vars = { duration: DURATION.base, ease: EASE, overwrite: "auto" as const };
  gsap.to(card, { y: on ? -4 : 0, ...vars });
  gsap.to(card.querySelectorAll("[data-hover-media]"), { scale: on ? 1.05 : 1, ...vars, duration: DURATION.slow });
  gsap.to(card.querySelectorAll("[data-hover-arrow]"), { x: on ? 4 : 0, ...vars });
}

export function HoverMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(FINE_POINTER, () => {
      const magnets = new WeakMap<HTMLElement, { x: gsap.QuickToFunc; y: gsap.QuickToFunc }>();
      const tilts = new WeakMap<HTMLElement, { x: gsap.QuickToFunc; y: gsap.QuickToFunc }>();
      const touched = new Set<HTMLElement>();

      const magnet = (el: HTMLElement) => {
        let m = magnets.get(el);
        if (!m) {
          const vars = { duration: DURATION.base, ease: "power3.out" };
          m = { x: gsap.quickTo(el, "x", vars), y: gsap.quickTo(el, "y", vars) };
          magnets.set(el, m);
          touched.add(el);
        }
        return m;
      };

      const tilt = (card: HTMLElement) => {
        let t = tilts.get(card);
        if (!t) {
          gsap.set(card, { transformPerspective: 900 });
          const vars = { duration: DURATION.slow, ease: "power3.out" };
          t = { x: gsap.quickTo(card, "rotationX", vars), y: gsap.quickTo(card, "rotationY", vars) };
          tilts.set(card, t);
          touched.add(card);
        }
        return t;
      };

      const over = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        const card = cardOf(e.target);
        if (card && !card.contains(e.relatedTarget as Node | null)) {
          touched.add(card);
          animateCard(card, true);
        }
      };

      const out = (e: PointerEvent) => {
        const card = cardOf(e.target);
        // A card that still has keyboard focus stays raised.
        if (card && !card.contains(e.relatedTarget as Node | null)) {
          const t = tilt(card);
          t.x(0);
          t.y(0);
          if (!card.matches(":focus-visible")) animateCard(card, false);
        }
        const el = magnetOf(e.target);
        if (el && !el.contains(e.relatedTarget as Node | null)) {
          const m = magnet(el);
          m.x(0);
          m.y(0);
        }
      };

      const move = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        const card = cardOf(e.target);
        if (card) {
          const box = card.getBoundingClientRect();
          const px = (e.clientX - box.left) / box.width;
          const py = (e.clientY - box.top) / box.height;
          const t = tilt(card);
          t.x((0.5 - py) * 2 * TILT);
          t.y((px - 0.5) * 2 * TILT);
          card.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
          card.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
        }
        const el = magnetOf(e.target);
        if (!el) return;
        const m = magnet(el);
        // Measure from where the element sits at rest, not where it has already leaned to.
        const box = el.getBoundingClientRect();
        const cx = box.left + box.width / 2 - Number(gsap.getProperty(el, "x"));
        const cy = box.top + box.height / 2 - Number(gsap.getProperty(el, "y"));
        m.x(clamp((e.clientX - cx) * MAGNET_PULL));
        m.y(clamp((e.clientY - cy) * MAGNET_PULL));
      };

      const focusIn = (e: FocusEvent) => {
        const card = cardOf(e.target);
        if (card && card.matches(":focus-visible")) {
          touched.add(card);
          animateCard(card, true);
        }
      };

      const focusOut = (e: FocusEvent) => {
        const card = cardOf(e.target);
        if (card && !card.matches(":hover")) animateCard(card, false);
      };

      document.addEventListener("pointerover", over);
      document.addEventListener("pointerout", out);
      document.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("focusin", focusIn);
      document.addEventListener("focusout", focusOut);
      return () => {
        document.removeEventListener("pointerover", over);
        document.removeEventListener("pointerout", out);
        document.removeEventListener("pointermove", move);
        document.removeEventListener("focusin", focusIn);
        document.removeEventListener("focusout", focusOut);
        // Leaving the media query (reduced motion switched on): drop every offset at once.
        touched.forEach((el) => {
          const parts = [el, ...el.querySelectorAll<HTMLElement>("[data-hover-media], [data-hover-arrow]")];
          gsap.killTweensOf(parts);
          gsap.set(parts, { clearProps: "transform" });
        });
      };
    });
    return () => mm.revert();
  });

  return null;
}
