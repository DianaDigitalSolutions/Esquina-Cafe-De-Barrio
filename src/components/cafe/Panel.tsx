import { useEffect, useRef, type ReactNode } from "react";

type Props = { title: string; onClose: () => void; children: ReactNode; maxW?: string; id: string };

export function Panel({ title, onClose, children, maxW = "max-w-5xl", id }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      className="panel-in fixed inset-0 z-[60] overflow-y-auto bg-surf pb-[env(safe-area-inset-bottom)]"
    >
      <div className="sticky top-0 z-10 border-b border-line bg-surf/95 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className={`mx-auto flex ${maxW} items-center justify-between gap-4 px-4 py-3 sm:px-6`}>
          <h2 id={`${id}-title`} className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            {title}
          </h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Cerrar"
            className="btn h-12 w-12 shrink-0 !p-0 bg-board text-2xl text-chalk"
          >
            ×
          </button>
        </div>
      </div>
      <div className={`mx-auto ${maxW} px-4 py-6 sm:px-6 sm:py-8`}>{children}</div>
    </div>
  );
}
