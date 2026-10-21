export type Breakfast = { name: string; desc: string; price: string };
export type MenuItem = { name: string; price: string; desc?: string };
export type MenuSection = { title: string; emoji: string; items: MenuItem[]; cakeCta?: boolean };

export const cakeSizes = [8, 12, 18, 25] as const;
export const cakes = [
  { id: "cheese", name: "Tarta de queso", basePrice: 18, desc: "Cremosa y al horno." },
  { id: "carrot", name: "Tarta de zanahoria", basePrice: 20, desc: "Con crema de queso y nueces." },
  { id: "custom", name: "Tarta a tu gusto", basePrice: 28, desc: "Con el sabor y el diseño que nos cuentes." },
];
export const euros = (value: number) => `${value.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
export function cakeEstimate(id: string, people: number) {
  const cake = cakes.find((item) => item.id === id);
  if (!cake || !cakeSizes.some((size) => size === people)) return null;
  if (id === "custom") return { min: people * 3.5, max: people * 5 };
  const price = Math.round((cake.basePrice / 8) * people * 2) / 2;
  return { min: price, max: price };
}
export function cakeEstimateLabel(id: string, people: number) {
  const estimate = cakeEstimate(id, people);
  if (!estimate) return "Elige tarta y número de personas";
  return estimate.min === estimate.max ? euros(estimate.min) : `${euros(estimate.min)} – ${euros(estimate.max)}`;
}

export const breakfasts: Breakfast[] = [
  { name: "El de siempre", desc: "Tostada con tomate y aceite, zumo natural y café con leche", price: "3,50 €" },
  { name: "El dulce", desc: "Croissant a la plancha y café con leche", price: "3,20 €" },
  { name: "El del barrio", desc: "Mini bocadillo de tortilla, zumo de naranja y café", price: "4,90 €" },
  { name: "El tranquilo", desc: "Infusión a elegir y tostada con mermelada casera", price: "3,00 €" },
];

export const menu: MenuSection[] = [
  { title: "Cafés", emoji: "☕", items: [
    { name: "Café solo", price: "1,30", desc: "El de toda la vida, corto y con carácter." },
    { name: "Cortado", price: "1,50" },
    { name: "Café con leche", price: "1,80", desc: "Para acompañar la tostada." },
    { name: "Capuchino", price: "2,30", desc: "Con espuma cremosa y cacao." },
    { name: "Café de la casa", price: "2,60", desc: "Con canela y piel de naranja, nuestro favorito." },
  ]},
  { title: "Tés e infusiones", emoji: "🍵", items: [
    { name: "Té negro", price: "1,80" },
    { name: "Té verde con menta", price: "2,00", desc: "Fresquito, con hierbabuena de nuestra maceta." },
    { name: "Rooibos", price: "2,00", desc: "Suave y sin teína." },
    { name: "Manzanilla con miel", price: "1,80", desc: "El remedio de la abuela para todo." },
    { name: "Chai latte", price: "2,90", desc: "Especiado y con leche espumada." },
  ]},
  { title: "Bebidas", emoji: "🥤", items: [
    { name: "Agua mineral", price: "1,20" },
    { name: "Refresco", price: "2,00", desc: "Cola, naranja o limón, bien fresquito." },
    { name: "Zumo de naranja natural", price: "2,50", desc: "Exprimido al momento." },
    { name: "Limonada casera", price: "2,20", desc: "Con hierbabuena y poco azúcar." },
    { name: "Batido casero", price: "2,80", desc: "De fresa, chocolate o vainilla." },
    { name: "Caña", price: "1,80" },
    { name: "Zumo", price: "3,00" },
    { name: "Vino en copa", price: "3,50" },
    { name: "Vino en botella", price: "16,00" },
  ]},
  { title: "Bollería", emoji: "🥐", items: [
    { name: "Croissant a la plancha", price: "1,60", desc: "Con mantequilla, calentito." },
    { name: "Napolitana de chocolate", price: "1,90" },
    { name: "Palmera de hojaldre", price: "2,00", desc: "Crujiente, hecha esta mañana." },
    { name: "Magdalena casera", price: "1,50", desc: "Con ralladura de limón." },
  ]},
  { title: "Bocadillos", emoji: "🥖", items: [
    { name: "Tortilla de patata", price: "4,50", desc: "Jugosa, con o sin cebolla." },
    { name: "Jamón y tomate", price: "4,80", desc: "Pan tostado, aceite de oliva y tomate rallado." },
    { name: "Pepito de lomo", price: "5,20", desc: "Con pimiento verde asado." },
    { name: "Vegetal con huevo", price: "4,50", desc: "Lechuga, tomate, atún y huevo cocido." },
    { name: "Calamares", price: "5,50", desc: "Los favoritos del domingo." },
  ]},
  { title: "Tartas por encargo", emoji: "🎂", cakeCta: true, items: cakes.map((cake) => ({
    name: cake.name,
    price: `${cake.id === "custom" ? "desde " : ""}${cake.basePrice.toFixed(2).replace(".", ",")}`,
    desc: `8 personas · ${cake.desc}`,
  })) },
];

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^\+?[\d\s-]{9,}$/;
