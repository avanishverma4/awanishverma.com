"use client";

import type { ReactNode } from "react";

// Opens the single <dialog id="resume-dialog"> rendered by ResumeDialog.
export function ResumeButton({ className, title, children }: { className: string; title?: string; children: ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      aria-haspopup="dialog"
      onClick={() => (document.getElementById("resume-dialog") as HTMLDialogElement | null)?.showModal()}
      className={className}
    >
      {children}
    </button>
  );
}

export function PrintButton({ className, children }: { className: string; children: ReactNode }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      {children}
    </button>
  );
}
