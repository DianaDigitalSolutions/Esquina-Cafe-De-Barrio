# Esquina Cafe De Barrio

Crea una landing page en español, totalmente responsive y mobile-first, para una cafetería de barrio llamada "El Café de la Esquina". Stack: React + Vite + TypeScript + Tailwind CSS (puedes usar shadcn/ui solo si ayuda; el diseño final debe ser el descrito aquí). NO uses backend ni base de datos: todos los envíos de formulario se simulan en el front. No añadas secciones ni funcionalidades que no estén en este documento.

========================
1. IDENTIDAD VISUAL
========================
Estilo: cálido, nostálgico pero moderno, 100% de barrio, cercano y familiar. Nada de estética corporativa fría. Recuerda a una pizarra de tiza de cafetería.

Paleta (define variables CSS en :root y mapea los colores en tailwind.config):
- bg #EFE0C4 (crema tostado, fondo general)
- surf #F8EEDB (superficie de tarjetas y secciones alternas)
- ink #2B1B12 (texto principal, marrón café oscuro)
- soft #6B5340 (texto secundario)
- wood #8A5A33 (madera, títulos manuscritos)
- leaf #3F6B4A (verde botánico, botones de envío y acentos)
- onleaf #FFF8E8 (texto sobre verde)
- chalk #F3EBD8 (tiza, texto sobre pizarra)
- board #22302A (verde pizarra oscuro: hero, cabecera, footer)
- line #D5BF98 (bordes y separadores)
- acento ámbar #E8B77C (botón principal sobre pizarra, texto de #2B1B12)
Modo oscuro automático con prefers-color-scheme: bg #1D140E, surf #2A1D14, ink #F3E6CE, soft #C2AA8A, wood #D39A62, leaf #7FB38A, onleaf #14231A, line #453324.

Tipografías (Google Fonts):
- Títulos: Fraunces (600 y 800), serif con personalidad. Fallback Georgia.
- Textos manuscritos tipo tiza (subtítulos, precios decorativos, logo, notas): Caveat (600/700).
- Lectura: Nunito (400/600/700).

Textura: la pizarra (hero y footer) lleva un grano sutil con radial-gradient de puntos blancos al 5% de opacidad y tamaño 5px.

========================
2. UX Y MICRO-INTERACCIONES
========================
- Botones grandes, fáciles de pulsar con el pulgar: padding vertical mínimo py-3.5, esquinas totalmente redondeadas (rounded-full), texto text-lg font-extrabold. En móvil, los CTA ocupan todo el ancho.
- Hover: translateY(-2px) + sombra suave. Active: translateY(1px) scale(.98) sin sombra. Transición 180 ms.
- Inputs con foco verde (borde leaf + anillo de 4px al 25%). Focus-visible con outline de 3px en leaf.
- scroll-behavior smooth y scroll-padding-top para la cabecera sticky.
- Respeta prefers-reduced-motion (desactiva animaciones y transiciones).
- Móvil: viewport-fit=cover y respeta las áreas seguras (env(safe-area-inset-top/bottom)) en la cabecera sticky, en los paneles a pantalla completa y en el toast.
- Accesibilidad: labels asociados, aria-invalid y aria-describedby en errores, role="dialog" aria-modal en paneles, role="status" en el toast, foco gestionado y cierre con Escape.
- Texto con tipografía correcta: apóstrofos y comillas tipográficas (’ “ ”).

========================
3. CABECERA / NAVEGACIÓN
========================
Cabecera sticky sobre fondo board con texto chalk. A la izquierda el logo como texto en Caveat grande: "El Café de la Esquina" (enlaza al inicio).
- Escritorio (≥1024px): enlaces "Desayunos", "Horarios y mapa", "Escríbenos" (hover color #E8B77C) y dos botones: "La carta" (relleno ámbar, texto oscuro) y "Encargar tarta" (contorno ámbar de 2px, texto ámbar).
- Móvil/tablet (<1024px): botón hamburguesa redondo de 48x48 con borde chalk al 30%, cuyas 3 barras se animan a una X. Al abrirse, un panel se despliega con animación de altura (grid-rows 0fr a 1fr) con botones grandes: "La carta" (ámbar), "Encargar tarta" (contorno ámbar) y los enlaces de sección. Cada opción se cierra el menú al pulsarla.
- "La carta" y "Encargar tarta" NO hacen scroll: abren paneles a pantalla completa (ver secciones 6 y 7).

========================
4. HERO
========================
Fondo pizarra (board) con grano. Dos columnas en escritorio (texto + ilustración), apilado en móvil.
- Texto pequeño manuscrito en ámbar: "Abierto desde 1987, en la misma esquina"
- H1 (Fraunces extrabold, muy grande: ~2.6rem en móvil, 6xl en escritorio): "El café de siempre, preparado como nunca"
- Párrafo: "Tu parada obligatoria cada mañana en el barrio: tostadas con aceite, café recién molido y la charla de siempre."
- CTA principal ámbar: "Ver la Carta de Hoy" -> abre el panel de la carta.
- Ilustración: una taza de café humeante dibujada en SVG con color chalk, café oscuro dentro, platillo de madera, 3 granos de café a los lados y 3 hilos de vapor que se animan (sube, se ensancha y se desvanece, en bucle de 3,2 s con retrasos de 1 s entre ellos). No uses imágenes externas.
- Borde inferior del hero con una ola SVG del color de fondo (bg).

========================
5. DESAYUNOS DE BARRIO (página principal)
========================
Título: "Desayunos de barrio". Texto: "Cada mañana de 7:30 a 11:30, con el pan recién traído de la panadería de al lado."
Cuadrícula de 2 columnas (1 en móvil) con tarjetas surf, borde line, rounded-3xl. Cada una: nombre en Caveat grande color wood, descripción en color soft y una píldora verde con el precio a la derecha.
- El de siempre — Tostada con tomate y aceite, zumo natural y café con leche — 3,50 €
- El dulce — Croissant a la plancha y café con leche — 3,20 €
- El del barrio — Mini bocadillo de tortilla, zumo de naranja y café — 4,90 €
- El tranquilo — Infusión a elegir y tostada con mermelada casera — 3,00 €
Debajo, botón ancho (board con texto chalk): "Ver la carta completa" -> abre el panel de la carta.

========================
6. INFORMACIÓN Y DÓNDE ESTAMOS
========================
Título: "Pásate cuando quieras, aquí siempre hay sitio". Dos columnas en escritorio, apiladas en móvil.
Columna 1: tarjeta surf con título manuscrito "Horario del barrio" y lista con separadores:
- Lunes a viernes: 7:30–13:30 y 16:30–20:30
- Sábados: 8:30–14:00 y 17:00–21:00
- Domingos y festivos: 9:00–14:00
Debajo dos avisos: uno verde (leaf): "Desayunos de 7:30 a 11:30. Tostada, zumo natural y café con leche por 3,50 €." y otro oscuro (board): "Tardes de barrio. Merienda, partida de dominó y tertulia de 17:00 a 20:00."
Columna 2: título manuscrito "Dónde encontrarnos", dirección "Calle del Olmo, 12, Madrid" (en negrita) y referencia local: "Justo frente a la plaza principal, al lado de la panadería de Pepa."
Mapa interactivo simulado, dibujado en SVG (4:3, bordes redondeados, borde line): fondo beige, manzanas de edificios, una plaza central verde con una fuente y 4 árboles, calles blancas con línea discontinua, etiqueta "Plaza Mayor" en Caveat y "C/ del Olmo". Un pin verde con ☕ que rebota suavemente; al pulsarlo, muestra u oculta una ficha abajo con "El Café de la Esquina" y "Calle del Olmo, 12 · a 20 pasos de la plaza". La ficha empieza visible.

========================
7. PANEL "LA CARTA" (solo aparece al abrirlo desde el menú o desde un CTA)
========================
La carta NO está en la página principal. Se abre como panel a pantalla completa (fixed inset-0, fondo surf, scroll interno, animación de entrada deslizando 28px hacia arriba con fade en 350 ms). Bloquea el scroll del body mientras está abierto. Cabecera sticky con el título "La carta de hoy, como en casa" y un botón × redondo de 48px (board/chalk). Subtítulo: "Todo lo preparamos al momento y con cariño. Si no encuentras lo que te apetece, pídelo: aquí nadie se va con las ganas."
Cuadrícula de 6 tarjetas (2 columnas en escritorio, 1 en móvil), cada una con fondo bg, borde line y rounded-3xl; título manuscrito en wood con emoji. Cada producto: nombre en negrita + línea de puntos (border-dotted) + precio en negrita color wood con " €"; debajo, descripción pequeña en soft si existe.

☕ Cafés
- Café solo 1,30 — El de toda la vida, corto y con carácter.
- Cortado 1,50
- Café con leche 1,80 — Para acompañar la tostada.
- Capuchino 2,30 — Con espuma cremosa y cacao.
- Café de la casa 2,60 — Con canela y piel de naranja, nuestro favorito.

🍵 Tés e infusiones
- Té negro 1,80
- Té verde con menta 2,00 — Fresquito, con hierbabuena de nuestra maceta.
- Rooibos 2,00 — Suave y sin teína.
- Manzanilla con miel 1,80 — El remedio de la abuela para todo.
- Chai latte 2,90 — Especiado y con leche espumada.

🥤 Bebidas
- Agua mineral 1,20
- Refresco 2,00 — Cola, naranja o limón, bien fresquito.
- Zumo de naranja natural 2,50 — Exprimido al momento.
- Limonada casera 2,20 — Con hierbabuena y poco azúcar.
- Batido casero 2,80 — De fresa, chocolate o vainilla.
- Caña 1,80 — Para las tardes de barrio.

🥐 Bollería
- Croissant a la plancha 1,60 — Con mantequilla, calentito.
- Napolitana de chocolate 1,90
- Palmera de hojaldre 2,00 — Crujiente, hecha esta mañana.
- Magdalena casera 1,50 — Con ralladura de limón.
- Tarta de la abuela 3,20 — Galleta, crema y chocolate. Se acaba pronto.

🥖 Bocadillos
- Tortilla de patata 4,50 — Jugosa, con o sin cebolla.
- Jamón y tomate 4,80 — Pan tostado, aceite de oliva y tomate rallado.
- Pepito de lomo 5,20 — Con pimiento verde asado.
- Vegetal con huevo 4,50 — Lechuga, tomate, atún y huevo cocido.
- Calamares 5,50 — Los favoritos del domingo.

🎂 Tartas por encargo (esta tarjeta incluye un botón verde "Encargar mi tarta" que cierra la carta y abre el formulario de encargo)
- Tarta de queso 18,00 — 8 raciones, cremosa y al horno.
- Tarta de zanahoria 20,00 — 8 raciones, con crema de queso y nueces.
- Tarta a tu gusto desde 28,00 — Con el sabor y el diseño que nos cuentes.

Al final, nota manuscrita en verde y centrada: "Precios indicativos, IVA incluido. Y el segundo café, con una sonrisa." y un botón verde ancho "Volver a la página". El panel se cierra con ×, con ese botón y con Escape.

========================
8. PANEL "ENCARGAR UNA TARTA"
========================
Mismo estilo de panel a pantalla completa (ancho máximo ~672px), título "Encarga tu tarta" y × para cerrar. Texto introductorio: "Las hacemos en casa, con tiempo y mucho cariño. Cuéntanos qué te apetece y la preparamos a tu gusto. Tartas desde 18 €; el precio final te lo confirmamos por teléfono. Necesitamos 2 días de antelación."
Formulario controlado en React con noValidate y dos bloques con subtítulo manuscrito:
"Tus datos"
- Nombre y apellidos (texto, obligatorio)
- Teléfono (tel, obligatorio, formato: mínimo 9 dígitos/espacios/guiones, admite + inicial; placeholder "612 345 678")
- Correo electrónico (email, obligatorio, regex /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
"Tu tarta"
- Día de recogida (input date, obligatorio, mínimo hoy + 2 días)
- Franja de recogida (select, obligatorio): "Mañana (9:00–13:00)" / "Tarde (17:00–20:00)"
- Para cuántas personas (select, obligatorio): 6, 8, 10, 15, 20, "30 personas o más"
- ¿De qué quieres la tarta? (textarea de 3 filas, obligatorio; placeholder "Ej.: bizcocho de zanahoria con crema de queso y nueces")
- ¿Qué diseño quieres que tenga? (textarea de 4 filas, obligatorio; placeholder "Ej.: cumpleaños infantil con dinosaurios, colores verde y naranja, y el nombre “Lucas” en la parte de arriba")
- Alergias o intolerancias (texto, OPCIONAL, marcado "(opcional)")
Botones: "Enviar encargo" (verde, ancho completo, py-3.5; mientras "envía" muestra "Enviando…" y se deshabilita) y "Cancelar" (contorno).
Validación al enviar: mensajes de error cercanos bajo cada campo (rojo oscuro accesible), borde rojo en el campo y foco en el primer campo con error. El error de un campo desaparece al empezar a escribir en él. Mensajes tipo: "Dinos tu nombre y apellidos para apuntar el encargo.", "Escribe un teléfono válido para llamarte, por ejemplo 612 345 678.", "Este correo no parece válido. Revisa que tenga @ y un dominio.", "Necesitamos 2 días para prepararla. Elige una fecha posterior.", "Describe el diseño que imaginas, aunque sea una idea suelta."
Si todo es válido: simula el envío (800 ms), los campos se desvanecen con suavidad (350 ms) y se vacían, el panel se cierra y aparece el toast de éxito con título "¡Encargo recibido!" y texto "Gracias, vecino. Te llamaremos enseguida para confirmar tu tarta."

========================
9. SECCIÓN DE CONTACTO
========================
Fondo surf, contenido centrado (ancho máx. ~576px). Título: "¡Pásate a saludarnos o escríbenos!". Texto: "Reservas para cumpleaños, encargos de tartas o simplemente un “hola”. Leemos todo."
Formulario (noValidate) con campos obligatorios: Nombre, Correo electrónico y Mensaje (textarea de 5 filas). Inputs grandes (py-3.5, rounded-2xl, borde de 2px). Botón verde, ancho completo y destacado: "Enviar mensaje" (durante el envío: "Enviando…").
Al enviar: valida primero (campos vacíos y formato de email incorrecto, con mensajes bajo cada campo y foco en el primero con error). Si es válido, simula 700 ms, muestra el toast y, justo después, los campos se desvanecen suavemente y se vacían.

========================
10. TOAST DE ÉXITO (reutilizable para contacto y tarta)
========================
Notificación flotante arriba y centrada (ancho máx. 448px, respetando safe-area), fondo leaf con texto onleaf, rounded-3xl, sombra grande y anillo claro. Contiene: círculo con ☕, título en Fraunces bold, texto y un botón × para cerrarlo. Entra con animación de resorte (desde -24px y escala .94). Barra de progreso inferior de 4px que se consume en 6 s; se cierra sola a los 6 s. Role="status" y aria-live="polite".
Mensaje para el formulario de contacto: título "¡Mensaje recibido!" y texto "Gracias por escribirnos, vecino. Te responderemos volando."

========================
11. FOOTER
========================
Fondo board con grano, texto centrado en chalk: "El Café de la Esquina" en Caveat grande y debajo "Calle del Olmo, 12 · Hecho con cariño para el barrio".

========================
12. ORDEN DE LA PÁGINA Y CALIDAD
========================
Orden: Cabecera, Hero, Desayunos de barrio, Información y mapa, Contacto, Footer. Los paneles de Carta y Tarta se superponen sobre la página (z-index por encima de la cabecera) y el toast por encima de todo.
Código organizado en componentes (Header, Hero, Breakfasts, Info, MapSim, Menu panel, CakeOrder panel, ContactForm, Toast, Footer), datos de la carta y los desayunos en arrays tipados, sin dependencias innecesarias. Debe verse impecable en 360px, 768px y escritorio.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://esquina-cafe-de-barrio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ff12337c-a592-4aa0-ac93-d7eefd4c3439).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
