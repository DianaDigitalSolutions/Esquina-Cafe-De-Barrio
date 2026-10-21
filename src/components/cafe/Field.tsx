import type { ReactNode } from "react";

export function Field({ id, label, error, optional, children }: { id: string; label: string; error?: string; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-bold">
        {label} {optional && <span className="font-normal text-soft">(opcional)</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm font-semibold text-danger">{error}</p>}
    </div>
  );
}

export const aria = (id: string, error?: string) => ({
  id,
  name: id,
  "aria-invalid": error ? (true as const) : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});
