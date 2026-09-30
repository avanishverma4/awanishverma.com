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
    <div className="mb-10 space-y-3">
      <p className={eyebrow}>
        <span className="text-accent-text">{index}</span> {label}
      </p>
      <h2 id={id} className="max-w-3xl text-heading-32 sm:text-heading-40">
        {heading}
        <span className="text-fg-secondary">{emphasis}</span>.
      </h2>
    </div>
  );
}
