"use client";

import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DURATION, EASE, EASE_EXIT, gsap, reducedMotion, useGSAP } from "./motion";

gsap.registerPlugin(ScrambleTextPlugin);

const DOTS = 10;
// How long the toast stays after it lands (seconds); hovering it pauses the countdown.
const HOLD = 2.4;

// Copies `text` to the clipboard. The visible label switches to `copiedLabel` for two seconds,
// and the same text is announced to screen readers through a polite live region.
// With `toast`, a confirmation also flies out of the button to the bottom of the screen: a burst
// of dots, a check that draws itself, the copied text unscrambling, and a countdown bar. It is
// decorative (aria-hidden; the live region does the announcing) and, under reduced motion,
// simply fades in and out. It is portalled to <body> because an animated ancestor (the scroll
// reveals) would otherwise become the containing block for its fixed position.
export function CopyButton({
  text,
  label,
  copiedLabel,
  className,
  toast,
}: {
  text: string;
  label: string;
  copiedLabel: string;
  className: string;
  toast?: string;
}) {
  const [copied, setCopied] = useState(false);
  // Counts copies; each one replays the toast. 0 until the first copy, so nothing renders on the server.
  const [burst, setBurst] = useState(0);
  const button = useRef<HTMLButtonElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  useGSAP(
    () => {
      const root = layer.current;
      const from = button.current;
      if (!burst || !root || !from) return;
      const card = root.querySelector<HTMLElement>("[data-toast]")!;
      const q = gsap.utils.selector(root);
      timeline.current?.kill();
      gsap.set(card, { clearProps: "transform,opacity,visibility" });

      const tl = gsap.timeline();
      timeline.current = tl;

      if (reducedMotion()) {
        tl.set(q("[data-toast-text]"), { textContent: text })
          .set(q("[data-toast-check]"), { strokeDashoffset: 0 })
          .fromTo(card, { autoAlpha: 0 }, { autoAlpha: 1, duration: DURATION.base })
          .to(card, { autoAlpha: 0, duration: DURATION.base }, `+=${HOLD}`);
        return;
      }

      // Start from the button: the offset between its centre and the toast's resting centre.
      const b = from.getBoundingClientRect();
      const t = card.getBoundingClientRect();
      const bx = b.left + b.width / 2;
      const by = b.top + b.height / 2;

      tl.set(card, { autoAlpha: 1 })
        // x and y on different eases, so the flight curves instead of travelling in a straight line.
        .fromTo(card, { x: bx - (t.left + t.width / 2) }, { x: 0, duration: 0.8, ease: "power3.out" }, 0)
        .fromTo(card, { y: by - (t.top + t.height / 2) }, { y: 0, duration: 0.8, ease: "back.out(1.2)" }, 0)
        .fromTo(card, { scale: 0.2, rotation: -10 }, { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.6)" }, 0)
        .fromTo(
          q("[data-toast-dot]"),
          { x: bx, y: by, scale: 1, opacity: 1 },
          {
            x: (i) => bx + Math.cos((i / DOTS) * Math.PI * 2) * gsap.utils.random(50, 110),
            y: (i) => by + Math.sin((i / DOTS) * Math.PI * 2) * gsap.utils.random(50, 110),
            scale: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0,
        )
        .fromTo(q("[data-toast-badge]"), { scale: 0 }, { scale: 1, duration: 0.45, ease: "back.out(2.5)" }, 0.45)
        .fromTo(q("[data-toast-check]"), { strokeDashoffset: 24 }, { strokeDashoffset: 0, duration: 0.35, ease: EASE }, 0.6)
        .fromTo(q("[data-toast-title]"), { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: EASE }, 0.5)
        .fromTo(
          q("[data-toast-text]"),
          { textContent: "" },
          { duration: 0.9, scrambleText: { text, chars: "lowerCase", speed: 0.6, revealDelay: 0.2 }, ease: "none" },
          0.55,
        )
        .fromTo(q("[data-toast-bar]"), { scaleX: 1 }, { scaleX: 0, duration: HOLD, ease: "none" }, 0.8)
        .to(card, { y: 24, scale: 0.92, autoAlpha: 0, duration: DURATION.base, ease: EASE_EXIT });
    },
    { dependencies: [burst] },
  );

  // Stop a running toast if the button goes away (navigating off the page).
  useEffect(() => () => void timeline.current?.kill(), []);

  return (
    <>
      <button
        ref={button}
        type="button"
        className={className}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            if (toast) setBurst((n) => n + 1);
          } catch {
            // Clipboard access denied or unavailable: the address is still on screen to select.
          }
        }}
      >
        {copied ? copiedLabel : label}
      </button>
      <span role="status" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
      {toast &&
        burst > 0 &&
        createPortal(
          <div ref={layer} aria-hidden="true" className="pointer-events-none fixed inset-0 z-50">
            {Array.from({ length: DOTS }, (_, i) => (
              <span
                key={i}
                data-toast-dot
                className={`absolute left-0 top-0 -ml-1.5 -mt-1.5 size-3 rounded-full opacity-0 ${i % 2 ? "bg-success" : "bg-fg"}`}
              />
            ))}
            <div className="absolute inset-x-4 bottom-6 flex justify-center">
              <div
                data-toast
                onPointerEnter={() => timeline.current?.pause()}
                onPointerLeave={() => timeline.current?.resume()}
                className="pointer-events-auto invisible relative flex max-w-full items-center gap-3 overflow-hidden rounded-full bg-inverse py-2.5 pl-2.5 pr-5 text-on-inverse shadow-2xl"
              >
                <span data-toast-badge className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success text-white">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path data-toast-check d="M5 12.5l4.5 4.5L19 7.5" strokeDasharray="24" strokeDashoffset="24" />
                  </svg>
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="overflow-hidden">
                    <span data-toast-title className="block text-label-14 font-medium">
                      {toast}
                    </span>
                  </span>
                  <span data-toast-text className="truncate font-mono text-label-12 text-on-inverse/70" />
                </span>
                <span data-toast-bar className="absolute inset-x-6 bottom-0 h-0.5 origin-left rounded-full bg-success" />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
