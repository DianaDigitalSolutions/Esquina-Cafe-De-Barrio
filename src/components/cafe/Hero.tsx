export function Hero() {
  return (
    <section id="inicio" className="grain relative text-chalk">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-24 pt-10 sm:px-6 lg:grid-cols-2 lg:pb-32 lg:pt-16">
        <div>
          <p className="font-hand text-2xl font-bold text-amber">Abierto desde 1987, en la misma esquina</p>
          <h1 className="mt-2 font-display text-[2.6rem] font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            El café de siempre, preparado como nunca
          </h1>
          <p className="mt-5 max-w-xl text-lg text-chalk/85">
            Tu parada obligatoria cada mañana en el barrio: tostadas con aceite, café recién molido y la charla de siempre.
          </p>
        </div>
        <Cup />
      </div>
      <svg className="absolute inset-x-0 bottom-0 h-12 w-full text-bg sm:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0 40 C 240 80 480 0 720 30 S 1200 70 1440 30 V80 H0Z" />
      </svg>
    </section>
  );
}

function Cup() {
  return (
    <svg viewBox="0 0 320 280" className="mx-auto w-full max-w-sm" role="img" aria-label="Taza de café humeante">
      {[0, 1, 2].map((i) => (
        <path key={i} className="steam" style={{ animationDelay: `${i}s` }}
          d={`M${130 + i * 30} 110 c -10 -14 10 -24 0 -40 c -8 -12 6 -20 0 -30`}
          fill="none" stroke="var(--chalk)" strokeWidth="5" strokeLinecap="round" />
      ))}
      <ellipse cx="160" cy="238" rx="120" ry="20" fill="var(--wood)" />
      <ellipse cx="160" cy="232" rx="96" ry="12" fill="#a8743f" />
      <path d="M80 120 h160 v40 c0 50 -36 76 -80 76 s-80 -26 -80 -76z" fill="var(--chalk)" />
      <path d="M240 140 c34 0 34 50 0 52" fill="none" stroke="var(--chalk)" strokeWidth="12" />
      <ellipse cx="160" cy="120" rx="80" ry="12" fill="var(--chalk)" />
      <ellipse cx="160" cy="122" rx="70" ry="8" fill="#3b2316" />
      {[[40, 200, -20], [272, 210, 30], [60, 250, 15]].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse rx="12" ry="8" fill="#5a3520" />
          <path d="M-9 0 q9 -4 18 0" stroke="#2b1b12" strokeWidth="2" fill="none" />
        </g>
      ))}
    </svg>
  );
}
