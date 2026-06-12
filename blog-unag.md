# Blog UNAG — Propuesta de diseño e implementación

## Objetivo
Crear un blog institucional para la Universidad Nacional de Agricultura (UNAG) que respete la misma línea gráfica del portal oficial y utilice la paleta de colores oficial ya presente en el proyecto.

El blog debe integrarse con el diseño actual del sitio, aprovechar el layout global y mantener coherencia visual con el header, footer y los componentes existentes.

---

## Paleta de colores oficiales del proyecto
Los colores ya definidos en `src/styles/global.css` son los siguientes:

- `--color-unag-green`: `#1ba333`
- `--color-unag-dark-green`: `#00371d`
- `--color-unag-light-green`: `#6cc836`
- `--color-unag-yellow`: `#ffcc00`
- `--color-unag-overlay-green`: `#e5ffd5`
- `--color-unag-gray`: `#303030`
- `--color-unag-light-gray`: `#efefef`

Estas variables deben ser la base del blog para botones, titulares, banners, acentos y estados hover.

---

## Tipografía y estilo general

- Fuente principal: `Montserrat` (importada en `src/layouts/main.astro`).
- Fuente de titular destacado: `Nothing You Could Do` para elementos de lema o destacados especiales.
- El layout principal usa `Header` y `Footer` compartidos, por lo cual el blog debe heredar la misma navegación y pie de página.
- El fondo principal claro debe ser blanco o `var(--color-unag-light-gray)` con detalles en verde y amarillo.
- El modo oscuro existe y se controla mediante la clase `dark` en el `<html>`.

---

## Componentes y patrones recomendados

### 1. Hero principal del blog

- Usar un banner con imagen de fondo y gradiente oscuro similar a `src/pages/comunicados/index.astro`.
- Título grande en blanco o `text-unag-dark-green` si el fondo es claro.
- Subtítulo con texto blanco/claro.

### 2. Tarjetas de noticias

- Tarjetas con bordes suaves, fondo blanco y sombra leve.
- Encabezado o badge de categoría con `bg-unag-green`, texto blanco y borde redondeado.
- Título en `text-unag-dark-green`.
- CTA "Leer más" en `text-unag-green` o botón `bg-unag-green text-white`.
- Hover con `shadow-xl` y ligero `-translate-y-2`.

### 3. Filtros y búsqueda

- Input de búsqueda con borde `border-gray-300` y enfoque en `ring-unag-green/20`.
- Select de categoría con fondo blanco y `focus:border-unag-green`.
- En modo oscuro, usar `dark:bg-unag-dark-green` y `dark:border-unag-green`.

### 4. Páginas de detalle

- Hero con imagen principal y superposición de gradiente, igual que `src/pages/comunicados/[slug].astro`.
- Tarjetas y secciones inline con `bg-unag-light-gray/50` y `border-l-4 border-unag-green`.
- Documentos adjuntos o recursos opcionales en un sidebar con fondo blanco y botones `bg-unag-green`.

---

## Estructura recomendada de archivos

### Contenido

- `src/content/blog/` para entradas de blog en Markdown.
- Cada archivo Markdown incluirá frontmatter con campos como:
  - `title`
  - `description`
  - `date`
  - `category`
  - `image` (opcional)
  - `featured` (booleano)
  - `author` (opcional)
  - `attachments` (opcional)

### Configuración de colección

- Agregar una colección `blog` en `src/content.config.ts` similar a `comunicados`.

### Páginas

- `src/pages/blog/index.astro` — listado de artículos, filtros y búsqueda.
- `src/pages/blog/[slug].astro` — detalle de cada entrada.

### Componentes reutilizables

- `src/components/react/BlogCards.tsx` o `NoticiasSection.tsx` adaptado para blog.
- `src/components/astro/BlogHero.astro` para el banner principal.
- `src/components/astro/BlogCard.astro` si se prefiere Astro para tarjetas.

---

## Referencias del proyecto actual

- `src/styles/global.css`: variables de color y temas.
- `src/layouts/main.astro`: layout general con header, footer, chat y accesibilidad.
- `src/components/astro/header.astro`: navegación superior con colores de UNAG.
- `src/components/astro/footer.astro`: pie de página totalmente alineado con la línea gráfica.
- `src/components/react/NoticiasSection.tsx`: ejemplo de sección de noticias con tarjeta y colores oficiales.
- `src/pages/comunicados/index.astro`: diseño de listado de comunicaciones similar a un blog.
- `src/pages/comunicados/[slug].astro`: layout de detalle con hero e información secundaria.

---

## Propuesta visual para el blog

- Header fijo con `bg-unag-dark-green` y elementos de navegación en blanco.
- Hero con título grande y botón CTA en `bg-unag-green` o `bg-unag-yellow`.
- Lista de artículos en grilla responsiva con cards blancas y acentos verdes.
- Fondo general limpio, con secciones delimitadas por `border-gray-100` y sombras suaves.
- Uso estratégico del amarillo `#ffcc00` para botones destacados, etiquetas y microinteracciones.

---

## Consideraciones adicionales

- Mantener los mismos colores y la misma sensación institucional.
- Evitar paletas nuevas fuera de la gama verde/amarillo/gris.
- Usar iconografía simple y botones redondeados como en el resto del portal.
- Reutilizar componentes existentes cuando sea posible para acelerar la implementación.

---

## Siguiente paso sugerido

1. Crear la colección `blog` en `src/content.config.ts`.
2. Añadir `src/pages/blog/index.astro` y `src/pages/blog/[slug].astro`.
3. Crear `src/content/blog/` con entradas de ejemplo.
4. Reutilizar `NoticiasSection.tsx` y la paleta de `global.css`.
5. Añadir `Noticias` o `Blog` al menú de navegación si se desea insertarlo en la barra principal.
