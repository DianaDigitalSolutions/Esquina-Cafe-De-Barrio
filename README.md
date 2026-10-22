# El Café de la Esquina

Landing page en español, responsive y mobile-first para una cafetería de barrio: desayunos, carta, horarios, mapa y encargo de tartas.

- **Previsualización pública:** https://esquina-cafe-de-barrio.lovable.app
- **URL de borrador (preview):** https://id-preview--ff12337c-a592-4aa0-ac93-d7eefd4c3439.lovable.app

## Repositorio

- **GitHub:** [PENDIENTE] — el proyecto todavía no está enlazado a un repositorio de GitHub.

## Tecnología

Aplicación React con enrutado y render en servidor mediante TanStack Start (Vite como herramienta de build). Versiones reales de `package.json`:

| Paquete | Versión |
| --- | --- |
| React / React DOM | ^19.2.0 |
| Vite | 8.1.5 |
| TypeScript | ^5.8.3 |
| Tailwind CSS | ^4.2.1 (plugin `@tailwindcss/vite`) |
| TanStack Start / Router | 1.168.60 / 1.170.41 |
| Vitest | ^4.1.10 |

Tailwind v4 se configura por CSS (`src/styles.css`), sin `tailwind.config.js`. No hay backend ni base de datos propios.

## Arranque

```sh
npm install
npm run dev      # http://localhost:8080
npm run build
```

Pruebas: `npm test`.

- **Node:** v22.22.0 (versión usada en el entorno de desarrollo; `package.json` no declara `engines`).
- El proyecto incluye `bun.lock`; con `npm install` también funciona.

## Estructura

```
src/
  routes/        index.tsx (página principal), __root.tsx (cabecera HTML, fuentes, lang="es")
  components/cafe/  Header, Hero, Breakfasts, Info, MapSim, MenuPanel,
                    CakeOrderPanel, ContactForm, Toast, Footer, Panel, Field
  styles.css     tokens de color, tipografías, utilidades (btn, field, grain), animaciones
  test/          cake-pricing, form-submit, app-routing
public/          favicon.ico, robots.txt
```

- **Formularios:** `src/components/cafe/ContactForm.tsx` (contacto) y `src/components/cafe/CakeOrderPanel.tsx` (encargo de tarta).
- **Carta y precios:** `src/components/cafe/data.ts` (desayunos, secciones de la carta, tartas, tallas y cálculo de estimado). Es la única fuente: menú y formulario la comparten.
- **Estilos:** `src/styles.css`.

## Formularios

Ambos **envían de verdad**, sin backend propio: un `fetch` POST desde el navegador a **FormSubmit** (`https://formsubmit.co/ajax/...`), con los datos del formulario en el cuerpo JSON.

| Formulario | Archivo del fetch | Destino |
| --- | --- | --- |
| Contacto | `src/components/cafe/ContactForm.tsx` (línea 33) | dianasmf.2009@gmail.com |
| Encargo de tarta | `src/components/cafe/CakeOrderPanel.tsx` (línea 85) | dianasmf.2009@gmail.com |

Solo se muestra el toast de éxito si FormSubmit confirma la recepción; si falla, se conserva lo escrito y aparece «No se ha podido enviar, inténtalo de nuevo».

- **Activación pendiente:** hay que pulsar «Activate Form» en el correo que FormSubmit envió a dianasmf.2009@gmail.com. Sin ese paso, los envíos se rechazan.

## Datos

- **Precargado:** todo el contenido está en el código — desayunos, las 6 secciones de la carta con sus precios, las 3 tartas con tallas de 8/12/18/25 personas, horarios y dirección (`src/components/cafe/data.ts` y los propios componentes). El mapa es un iframe de Google Maps de Calle del Olmo, 12, Madrid.
- **localStorage:** no se usa (tampoco sessionStorage ni IndexedDB). No hay nada que reiniciar ni borrar.

## Responsive

Diseño mobile-first, verificado a 360 px, 768 px y escritorio: menú hamburguesa en móvil, CTA a ancho completo, paneles de carta y encargo a pantalla completa, y respeto de las áreas seguras del dispositivo y de `prefers-reduced-motion`.
