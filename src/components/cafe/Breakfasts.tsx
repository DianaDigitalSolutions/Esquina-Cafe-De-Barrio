import { breakfasts } from "./data";

export function Breakfasts({ onMenu }: { onMenu: () => void }) {
  return (
    <section id="desayunos" className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Desayunos de barrio</h2>
      <p className="mt-3 text-lg text-soft">Cada mañana de 7:30 a 11:30, con el pan recién traído de la panadería de al lado.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {breakfasts.map((b) => (
          <article key={b.name} className="flex items-start justify-between gap-4 rounded-3xl border border-line bg-surf p-5 sm:p-6">
            <div>
              <h3 className="font-hand text-3xl font-bold text-wood">{b.name}</h3>
              <p className="mt-1 text-soft">{b.desc}</p>
            </div>
            <span className="shrink-0 rounded-full bg-leaf px-3 py-1.5 font-extrabold text-onleaf">{b.price}</span>
          </article>
        ))}
      </div>
      <button onClick={onMenu} className="btn mt-8 w-full bg-board text-chalk">Ver la carta completa</button>
    </section>
  );
}
