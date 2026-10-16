"use client";

import { useState } from "react";
import type { Skill } from "@/content/site";
import { subtleLink } from "./ui";

// A core group's skills. From sm every skill shows its detail line. Below sm the detail lines are
// folded away behind one button per group, so a phone shows the list of skills at a glance and the
// section is not several screens of keyword lines.
// Without JavaScript the button cannot work, so a <noscript> style shows the details and hides it.
export function SkillList({ id, group, skills, columns, showLabel, hideLabel }: { id: string; group: string; skills: Skill[]; columns: string; showLabel: string; hideLabel: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <noscript>
        <style>{".skill-detail{display:block !important}.skill-toggle{display:none !important}"}</style>
      </noscript>
      <ul id={id} className={`mt-3 grid gap-x-8 ${columns}`}>
        {skills.map((skill) => (
          <li key={skill.name} className="border-t border-line-subtle py-3">
            <p className="text-label-14 font-medium">{skill.name}</p>
            {skill.detail && <p className={`skill-detail mt-0.5 text-copy-13 text-fg-secondary ${open ? "" : "max-sm:hidden"}`}>{skill.detail}</p>}
          </li>
        ))}
      </ul>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`skill-toggle ${subtleLink} w-full gap-1 border-t border-line-subtle sm:hidden`}
      >
        {open ? hideLabel : showLabel}
        <span className="sr-only">: {group}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className={`ml-auto size-4 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </>
  );
}
