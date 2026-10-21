import { Panel } from "./Panel";
import { menu } from "./data";

export function MenuPanel({ onClose, onCake }: { onClose: () => void; onCake: () => void }) {
  return (
    <Panel id="carta" title="La carta de hoy, como en casa" onClose={onClose}>
      <p className="max-w-2xl text-lg text-soft">
        Todo lo preparamos al momento y con cariño. Si no encuentras lo que te apetece, pídelo: aquí nadie se va con las ganas.
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {menu.map((s) => (
          <section key={s.title} className="rounded-3xl border border-line bg-bg p-5 sm:p-6">
            <h3 className="font-hand text-3xl font-bold text-wood">{s.emoji} {s.title}</h3>
            <ul className="mt-3 space-y-3">
              {s.items.map((it) => (
                <li key={it.name}>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold">{it.name}</span>
                    <span className="flex-1 border-b-2 border-dotted border-line" aria-hidden="true" />
                    <span className="whitespace-nowrap font-bold text-wood">{it.price} €</span>
                  </div>
                  {it.desc && <p className="text-sm text-soft">{it.desc}</p>}
                </li>
              ))}
            </ul>
            {s.cakeCta && (
              <button onClick={onCake} className="btn mt-5 w-full bg-leaf text-onleaf">Encargar mi tarta</button>
            )}
          </section>
        ))}
      </div>
      <p className="mt-8 text-center font-hand text-2xl font-bold text-leaf">
        Precios indicativos, IVA incluido. Y el segundo café, con una sonrisa.
      </p>
      <button onClick={onClose} className="btn mt-6 w-full bg-leaf text-onleaf">Volver a la página</button>
    </Panel>
  );
}
