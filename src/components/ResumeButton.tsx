"use client";

import { useEffect, type ReactNode } from "react";

// Opens the single <dialog id="resume-dialog"> rendered by ResumeDialog.
export function ResumeButton({ className, title, children }: { className: string; title?: string; children: ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      aria-haspopup="dialog"
      onClick={() => {
        (document.getElementById("resume-dialog") as HTMLDialogElement | null)?.showModal();
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
    // A press on the backdrop closes the CV. The backdrop belongs to the dialog element, and the
    // dialog has no padding, so a press that starts and ends on the dialog itself is on the backdrop.
    // Checking where the press started keeps a text selection dragged out of the CV from closing it.
    let pressedBackdrop = false;
    const onPointerDown = (e: PointerEvent) => {
      pressedBackdrop = e.target === dialog;
    };
    const onClick = (e: MouseEvent) => {
      if (pressedBackdrop && e.target === dialog) dialog.close();
    };
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    dialog.addEventListener("pointerdown", onPointerDown);
    dialog.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
      dialog.removeEventListener("pointerdown", onPointerDown);
      dialog.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <button type="button" onClick={() => window.print()} className={className}>
      {children}
    </button>
  );
}
