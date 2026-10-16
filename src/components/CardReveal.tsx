"use client";

import { DURATION, EASE, MOTION_OK, ScrollTrigger, gsap, useGSAP } from "./motion";

// Card entrances: the children of a [data-card-reveal] list rise and fade in as they scroll into
// view, a row at a time with a short stagger. Only cards still below the fold when the page loads
// are hidden first, so nothing on screen blinks, and without JavaScript every card simply shows.
// Hidden cards keep opacity 0 only (not visibility), so they can still take keyboard focus.
const START = "top 90%";

export function CardReveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const fold = window.innerHeight * 0.9;
      const waiting = gsap.utils.toArray<HTMLElement>("[data-card-reveal] > *").filter((el) => el.getBoundingClientRect().top > fold);
      if (!waiting.length) return;
      gsap.set(waiting, { opacity: 0, y: 48, scale: 0.96 });
      ScrollTrigger.batch(waiting, {
        start: START,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: DURATION.slow, ease: EASE, stagger: 0.08, overwrite: true, clearProps: "transform" }),
      });
    });
    return () => mm.revert();
  });

  return null;
}
