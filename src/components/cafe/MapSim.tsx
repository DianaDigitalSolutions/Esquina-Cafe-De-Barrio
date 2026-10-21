import { useState } from "react";

export function MapSim() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
        <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Mapa del barrio con la Plaza Mayor y la Calle del Olmo">
          <rect width="400" height="300" fill="#e9dcc0" />
          {[[10,10,120,90],[270,10,120,90],[10,200,120,90],[270,200,120,90],[160,10,80,50],[160,240,80,50]].map(([x,y,w,h],i)=>(
            <rect key={i} x={x} y={y} width={w} height={h} rx="8" fill="#d4c09a" stroke="#c2ab80" />
          ))}
          <rect x="0" y="125" width="400" height="50" fill="#fff" />
          <rect x="140" y="0" width="0" height="0" />
          <rect x="135" y="0" width="20" height="300" fill="#fff" />
          <rect x="245" y="0" width="20" height="300" fill="#fff" />
          <line x1="0" y1="150" x2="400" y2="150" stroke="#cbb48a" strokeWidth="2" strokeDasharray="10 8" />
          <line x1="145" y1="0" x2="145" y2="300" stroke="#cbb48a" strokeWidth="1.5" strokeDasharray="8 7" />
          <line x1="255" y1="0" x2="255" y2="300" stroke="#cbb48a" strokeWidth="1.5" strokeDasharray="8 7" />
          <rect x="165" y="70" width="70" height="50" rx="10" fill="#9cc29a" />
          <rect x="165" y="180" width="70" height="52" rx="10" fill="#9cc29a" />
          <circle cx="200" cy="95" r="10" fill="#bfe0e8" stroke="#7fa9b5" strokeWidth="2" />
          {[[175,78],[225,78],[175,112],[225,112]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="6" fill="#3f6b4a" />))}
          <text x="200" y="66" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="20" fontWeight="700" fill="#2b1b12">Plaza Mayor</text>
          <text x="60" y="145" fontFamily="Nunito, sans-serif" fontSize="12" fontWeight="700" fill="#6b5340">C/ del Olmo</text>
          <g role="button" tabIndex={0} aria-label="Mostrar u ocultar ficha del café" aria-expanded={show}
             onClick={() => setShow((s) => !s)}
             onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setShow((s) => !s))}
             className="cursor-pointer">
            <g className="pin">
              <path d="M300 160 c-16 0 -26 -12 -26 -26 a26 26 0 0 1 52 0 c0 14 -10 26 -26 26z" fill="#3f6b4a" transform="translate(0 -6)" />
              <path d="M300 172 l-8 -14 h16z" fill="#3f6b4a" />
              <text x="300" y="136" textAnchor="middle" fontSize="20">☕</text>
            </g>
          </g>
        </svg>
      </div>
      {show && (
        <div className="mt-3 rounded-2xl border border-line bg-surf p-4">
          <p className="font-display font-bold">El Café de la Esquina</p>
          <p className="text-soft">Calle del Olmo, 12 · a 20 pasos de la plaza</p>
        </div>
      )}
    </div>
  );
}
