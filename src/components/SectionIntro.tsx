export function SectionIntro({
  id,
  index,
  eyebrow,
  heading,
  emphasis,
}: {
  id: string;
  index: string;
  eyebrow: string;
  heading: string;
  emphasis: string;
}) {
  return (
    <div className="mb-10 space-y-4">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-fg-muted">
        <span className="text-accent-text">{index}</span> {eyebrow}
      </p>
      <h2 id={id} className="max-w-3xl text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">
        {heading}
        <span className="text-accent-text">{emphasis}</span>.
      </h2>
    </div>
  );
}
