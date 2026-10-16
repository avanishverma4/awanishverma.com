import { skillGroups, ui, type SkillGroup } from "@/content/site";
import { SectionHeader } from "./SectionHeader";
import { SkillList } from "./SkillList";
import { badge, card, container, eyebrow } from "./ui";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// A core group: heading, scope, and its skills with detail lines. `columns` lays the skills out in a grid.
function SkillGroupCard({ group, columns = "", className = "" }: { group: SkillGroup; columns?: string; className?: string }) {
  const id = `skills-${slug(group.name)}`;
  return (
    <section data-reveal aria-labelledby={id} className={`${card} p-5 max-sm:pb-1 ${className}`}>
      <h3 id={id} className="text-heading-16">
        {group.name}
      </h3>
      <p className="mt-1 text-copy-14 text-fg-secondary">{group.scope}</p>
      <SkillList id={`${id}-list`} group={group.name} skills={group.skills} columns={columns} showLabel={ui.skills.showDetails} hideLabel={ui.skills.hideDetails} />
    </section>
  );
}

// Supporting groups share one card and show their tools as chips, so they read as secondary to the design skills.
function OtherToolsCard({ groups }: { groups: SkillGroup[] }) {
  const t = ui.skills;
  return (
    <section data-reveal aria-labelledby="skills-other" className={`${card} p-5`}>
      <h3 id="skills-other" className="text-heading-16">
        {t.otherHeading}
      </h3>
      <p className="mt-1 text-copy-14 text-fg-secondary">{t.otherScope}</p>
      <div className="mt-3 divide-y divide-line-subtle border-t border-line-subtle">
        {groups.map((group) => {
          const id = `skills-${slug(group.name)}`;
          return (
            <div key={group.name} className="py-4 last:pb-0">
              <h4 id={id} className={eyebrow}>
                {group.name}
              </h4>
              <ul aria-labelledby={id} className="mt-2 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill.name} className={badge}>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function SkillsSection() {
  const t = ui.skills;
  // Order in site.ts: UI/UX Design, Frontend Development, then the supporting groups.
  const [design, frontend, ...other] = skillGroups;
  return (
    <section id="skills" aria-labelledby="skills-heading" className={`${container} py-10 sm:py-16`}>
      <SectionHeader id="skills-heading" index={t.index} label={t.eyebrow} heading={t.heading} emphasis={t.headingEmphasis} />
      <p data-reveal className="max-w-2xl text-copy-16 text-fg-secondary">{t.intro}</p>
      {/* The design group leads at full width; frontend and the supporting tools share the row below at equal height. */}
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <SkillGroupCard group={design} columns="sm:grid-cols-2 lg:grid-cols-3" className="md:col-span-2" />
        <SkillGroupCard group={frontend} />
        <OtherToolsCard groups={other} />
      </div>
    </section>
  );
}
