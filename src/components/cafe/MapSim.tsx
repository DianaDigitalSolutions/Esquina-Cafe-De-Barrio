export function MapSim() {
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
        <iframe
          title="Ubicación: Calle del Olmo, 12, Madrid"
          src="https://maps.google.com/maps?q=Calle+del+Olmo+12+Madrid&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
          allowFullScreen
        />
      </div>
      <a className="btn mt-4 w-full bg-leaf text-onleaf" href="https://www.google.com/maps/search/?api=1&query=Calle+del+Olmo+12+Madrid" target="_blank" rel="noopener noreferrer">Cómo llegar</a>
    </div>
  );
}
