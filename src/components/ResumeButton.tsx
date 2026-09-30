"use client";

import { useEffect, type ReactNode } from "react";
import { dialogIn } from "./motion";

// Opens the single <dialog id="resume-dialog"> rendered by ResumeDialog.
export function ResumeButton({ className, title, children }: { className: string; title?: string; children: ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      aria-haspopup="dialog"
      onClick={() => {
        const dialog = document.getElementById("resume-dialog") as HTMLDialogElement | null;
        dialog?.showModal();
        dialogIn(dialog);
      }}
      className={className}
    >
      {children}
    </button>
  );
}

export function PrintButton({ className, children }: { className: string; children: ReactNode }) {
  // A modal dialog lives in the top layer, which prints as one clipped page. For printing (button or
  // Cmd/Ctrl+P), reopen the CV as a non-modal dialog so it flows across pages, then restore the modal.
  useEffect(() => {
    const dialog = document.getElementById("resume-dialog") as HTMLDialogElement | null;
    if (!dialog) return;
    // Only a modal-to-inline switch sets the flag, so repeated print events can't lose it.
    let restoreModal = false;
    const before = () => {
      if (dialog.matches(":modal")) {
        restoreModal = true;
        dialog.close();
        dialog.show();
      }
    };
    const after = () => {
      if (restoreModal) {
        restoreModal = false;
        dialog.close();
        dialog.showModal();
      }
    };
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);

  return (
    <button type="button" onClick={() => window.print()} className={className}>
      {children}
    </button>
  );
}
