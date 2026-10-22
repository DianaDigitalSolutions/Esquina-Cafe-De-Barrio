# El Café de la Esquina

Landing page en español, responsive y mobile-first para una cafetería de barrio: desayunos, carta, horarios, mapa y encargo de tartas.

- **Previsualización pública:** https://esquina-cafe-de-barrio.lovable.app
- **URL de borrador (preview):** https://id-preview--ff12337c-a592-4aa0-ac93-d7eefd4c3439.lovable.app

## Repositorio

- **GitHub:** [PENDIENTE] — el proyecto todavía no está enlazado a un repositorio de GitHub.

## Arranque

```sh
npm install
npm run dev      # http://localhost:8080
npm run build
npm run preview  # sirve la build de producción
```

Pruebas: `npm test`.

- **Node:** v22.22.0 (versión usada en el entorno de desarrollo; `package.json` no declara `engines`).
- El proyecto incluye `bun.lock`; con `npm install` también funciona.

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

## Qué usa datos reales

- **Envío de mensajes y de encargos:** petición HTTP real a FormSubmit (ver sección anterior); el éxito solo se muestra cuando el servicio lo confirma.
- **Mapa:** iframe real de Google Maps sobre la dirección indicada (Calle del Olmo, 12, Madrid), con el botón «Cómo llegar» que abre Google Maps en otra pestaña.
- **Precios de la carta y desayunos:** los valores reales publicados en `src/components/cafe/data.ts`; el menú y el formulario leen del mismo sitio, así que no pueden divergir.
- **Estimado de la tarta:** se calcula de verdad en el navegador a partir del precio base y del número de personas (`cakeEstimate`), y se actualiza mientras se rellena el formulario.
- **Horarios, disponibilidad de recogida y festivos:** reglas reales aplicadas al formulario — la fecha mínima es hoy + 2 días y las horas de recogida cambian según el día elegido (sábados, domingos y festivos).

## Qué está simulado o usa datos de ejemplo

- **No hay backend ni base de datos:** todo el contenido (desayunos, carta, tartas, horarios, dirección y textos) está escrito en el código, no se carga de ningún servidor.
- **Confirmación del encargo:** la llamada telefónica para confirmar el encargo es manual; la web no agenda ni reserva nada automáticamente.
- **Límite de 20 tartas al día:** es un aviso escrito, no un control informático.
- **Precio de «Tarta a tu gusto»:** orientativo; el importe final lo confirma el negocio por teléfono.
- **Dirección y referencias locales** («Calle del Olmo, 12», «frente a la plaza principal», «la panadería de Pepa») y el texto «Abierto desde 1987»: datos de ejemplo aportados para la demo, que conviene sustituir por los definitivos.
- **Nada se finge en el envío:** no hay retardo ni simulación de éxito; si el envío no llega, el formulario lo dice.

## Datos de ejemplo y cómo reiniciarlos

- **No se usa `localStorage`, `sessionStorage` ni IndexedDB:** la web no guarda nada en el dispositivo, así que no hay nada que reiniciar ni borrar.
- **Para volver al estado inicial basta con recargar la página:** los paneles abiertos, el texto escrito en los formularios y el toast desaparecen.
- **Para cambiar los datos de ejemplo**, edite el contenido del código: `src/components/cafe/data.ts` (desayunos, carta, tartas, tallas y precios), `src/components/cafe/Info.tsx` (horarios y dirección) y los textos de `Hero.tsx`, `Breakfasts.tsx` y `Footer.tsx`. Al guardar, el servidor de desarrollo recarga solo.

## Responsive

Diseño mobile-first, verificado a 360 px, 768 px y escritorio: menú hamburguesa en móvil, CTA a ancho completo, paneles de carta y encargo a pantalla completa, y respeto de las áreas seguras del dispositivo y de `prefers-reduced-motion`.
