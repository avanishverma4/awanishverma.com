import { eyebrow } from "./ui";

export function SectionHeader({
  id,
  index,
  label,
  heading,
  emphasis,
}: {
  id: string;
  index: string;
  label: string;
  heading: string;
  emphasis: string;
}) {
  return (
    <div data-reveal className="mb-10 space-y-3">
      <p className={eyebrow}>
        <span className="text-fg">{index}</span> {label}
      </p>
      {/* The lead-in is muted; the key words (emphasis) carry the full-contrast colour. */}
      <h2 id={id} className="max-w-3xl text-balance text-heading-32 text-fg-secondary sm:text-heading-40">
        {heading}
        <span className="text-fg">{emphasis}.</span>
      </h2>
    </div>
  );
}
