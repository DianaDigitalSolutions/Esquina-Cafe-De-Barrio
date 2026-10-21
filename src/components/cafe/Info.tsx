import { MapSim } from "./MapSim";

const hours = [
  ["Lunes a viernes", "7:30–13:30 y 16:30–20:30"],
  ["Sábados", "8:30–14:00 y 17:00–21:00"],
  ["Domingos y festivos", "9:00–14:00"],
];

export function Info() {
  return (
    <section id="horarios" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
      <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Pásate cuando quieras, aquí siempre hay sitio</h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="rounded-3xl border border-line bg-surf p-6">
            <h3 className="font-hand text-3xl font-bold text-wood">Horario del barrio</h3>
            <ul className="mt-3 divide-y divide-line">
              {hours.map(([d, h]) => (
                <li key={d} className="flex flex-col py-3 sm:flex-row sm:justify-between sm:gap-4">
                  <span className="font-bold">{d}</span><span className="text-soft">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 rounded-2xl bg-leaf p-4 text-onleaf"><strong>Desayunos de 7:30 a 11:30.</strong> Tostada, zumo natural y café con leche por 3,50 €.</p>
          <p className="mt-3 rounded-2xl bg-board p-4 text-chalk"><strong>Tardes de barrio.</strong> Merienda, partida de dominó y tertulia de 17:00 a 20:00.</p>
        </div>
        <div>
          <h3 className="font-hand text-3xl font-bold text-wood">Dónde encontrarnos</h3>
          <p className="mt-1 text-lg font-bold">Calle del Olmo, 12, Madrid</p>
          <p className="mb-4 text-soft">Justo frente a la plaza principal, al lado de la panadería de Pepa.</p>
          <MapSim />
        </div>
      </div>
    </section>
  );
}
