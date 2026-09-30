"use client";

import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "./motion";

// Eases [data-reveal] elements up as they scroll into view. Renders nothing.
// Only elements below the fold at load are prepared, so nothing already on screen flickers,
// and without JavaScript everything is simply visible. Opacity (not visibility) keeps the
// content in the accessibility tree while it waits.
export function ScrollReveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const items = gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .filter((el) => el.getBoundingClientRect().top > window.innerHeight);
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 24 });
      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.08, overwrite: true }),
      });
    });
  });
  return null;
}
