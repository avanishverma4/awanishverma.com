import { skillGroups, ui, type Skill, type SkillGroup } from "@/content/site";
import { SectionHeader } from "./SectionHeader";
import { card, container } from "./ui";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <li className="py-3">
      <p className="text-label-14 font-medium">{skill.name}</p>
      {skill.detail && <p className="mt-0.5 text-copy-13 text-fg-secondary">{skill.detail}</p>}
    </li>
  );
}

function SkillGroupCard({ group, className = "" }: { group: SkillGroup; className?: string }) {
  const id = `skills-${slug(group.name)}`;
  return (
    <section aria-labelledby={id} className={`${card} p-5 ${className}`}>
      <h3 id={id} className="text-heading-16">
        {group.name}
      </h3>
      <p className="mt-1 text-copy-14 text-fg-secondary">{group.scope}</p>
      <ul className="mt-3 divide-y divide-line-subtle border-t border-line-subtle">
        {group.skills.map((skill) => (
          <SkillItem key={skill.name} skill={skill} />
        ))}
      </ul>
    </section>
  );
}

export function SkillsSection() {
  const t = ui.skills;
  return (
    <section id="skills" aria-labelledby="skills-heading" className={`${container} py-20 sm:py-24`}>
      <SectionHeader id="skills-heading" index={t.index} label={t.eyebrow} heading={t.heading} emphasis={t.headingEmphasis} />
      <p className="max-w-2xl text-copy-16 text-fg-secondary">{t.intro}</p>
      <div className="mt-10 grid items-start gap-4 md:grid-cols-2">
        {/* The first (largest) group spans the left column; the rest stack beside it. */}
        {skillGroups.map((group, i) => (
          <SkillGroupCard key={group.name} group={group} className={i === 0 ? "md:row-span-3" : ""} />
        ))}
      </div>
    </section>
  );
}
