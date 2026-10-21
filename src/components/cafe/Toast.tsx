import { useEffect } from "react";

export type ToastData = { id: number; title: string; text: string };

export function Toast({ toast, onClose }: { toast: ToastData | null; onClose: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-[calc(env(safe-area-inset-top)+1rem)]">
      {toast && (
        <div key={toast.id} className="toast-in pointer-events-auto relative w-full max-w-md overflow-hidden rounded-3xl bg-leaf text-onleaf shadow-2xl ring-2 ring-onleaf/30">
          <div className="flex items-start gap-3 p-4 pr-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-onleaf/20 text-2xl" aria-hidden="true">☕</span>
            <div className="flex-1">
              <p className="font-display text-lg font-bold">{toast.title}</p>
              <p className="text-onleaf/90">{toast.text}</p>
            </div>
            <button onClick={onClose} aria-label="Cerrar aviso" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl hover:bg-onleaf/15">×</button>
          </div>
          <div className="toast-progress h-1 bg-onleaf/70" />
        </div>
      )}
    </div>
  );
}
