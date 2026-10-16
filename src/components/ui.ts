// Shared styles for patterns that render on different elements (a, Link, button, li, figure).
// Class strings instead of wrapper components, so markup keeps its native element.

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-button-14 transition-[color,background-color,border-color,opacity,scale] motion-safe:active:scale-95 sm:min-h-10 disabled:pointer-events-none disabled:opacity-50";

const buttonVariants = {
  // The transparent border keeps the button's shape in forced-colors mode, where backgrounds are dropped.
  primary: "border border-transparent bg-inverse text-on-inverse hover:opacity-85",
  secondary: "border border-line-control bg-card text-fg hover:border-line-strong hover:bg-card-hover active:bg-card-active",
  ghost: "text-fg-secondary hover:bg-card-hover hover:text-fg",
};

export function button(variant: keyof typeof buttonVariants = "secondary") {
  return `${buttonBase} ${buttonVariants[variant]}`;
}

// Square icon-only button; 44px touch target.
export const iconButton =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-md text-fg-secondary transition-colors hover:bg-card-hover hover:text-fg";

export const card = "rounded-lg border border-line bg-card";
// A layer above the page (dialog, menu): same shape as a card, on the raised surface.
export const raisedCard = "rounded-lg border border-line bg-raised";
export const interactiveCard =
  "rounded-lg border border-line-control bg-card transition-colors hover:border-line-strong hover:bg-card-hover";

export const badge = "inline-flex items-center rounded-sm border border-line-subtle bg-subtle px-2 py-0.5 text-label-13 text-fg";

export const eyebrow = "font-mono text-label-12 uppercase tracking-widest text-fg-secondary";

export const container = "mx-auto w-full max-w-page px-4 sm:px-6";

// No accent colour: links in running text are marked by a permanent underline that darkens on hover.
export const textLink = "text-fg underline underline-offset-4 decoration-line-strong hover:decoration-fg";

// Quiet secondary link with a 44px touch target (hero links, captions).
export const subtleLink = "inline-flex min-h-11 items-center text-label-14 text-fg-secondary transition-colors hover:text-fg";
