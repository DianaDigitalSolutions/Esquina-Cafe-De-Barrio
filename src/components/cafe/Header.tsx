import { useState } from "react";

type Props = { onMenu: () => void; onCake: () => void };
const links = [
  { href: "#desayunos", label: "Desayunos" },
  { href: "#horarios", label: "Horarios y mapa" },
  { href: "#contacto", label: "Escríbenos" },
];

export function Header({ onMenu, onCake }: Props) {
  const [open, setOpen] = useState(false);
  const act = (fn?: () => void) => () => { setOpen(false); fn?.(); };

  return (
    <header className="grain sticky top-0 z-50 pt-[env(safe-area-inset-top)] text-chalk shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#inicio" className="font-hand text-3xl font-bold leading-none sm:text-4xl">El Café de la Esquina</a>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-bold transition-colors hover:text-amber">{l.label}</a>
          ))}
          <button onClick={onMenu} className="btn !py-2.5 bg-amber text-amberink">La carta</button>
          <a href="#tarta" onClick={(e) => { e.preventDefault(); onCake(); }} className="btn !py-2.5 bg-amber text-amberink">Encargar tarta</a>
        </nav>
        <button
          className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border border-chalk/30 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`h-0.5 w-6 rounded bg-chalk transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 rounded bg-chalk transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 rounded bg-chalk transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>
      <div id="menu-movil" className={`grid transition-[grid-template-rows] duration-300 lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden" inert={!open}>
          <div className="flex flex-col gap-3 px-4 pb-5 pt-1 sm:px-6">
            <button onClick={act(onMenu)} className="btn w-full bg-amber text-amberink">La carta</button>
            <a href="#tarta" onClick={(e) => { e.preventDefault(); act(onCake)(); }} className="btn w-full bg-amber text-amberink">Encargar tarta</a>
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={act()} className="btn w-full border border-chalk/30 text-chalk">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
