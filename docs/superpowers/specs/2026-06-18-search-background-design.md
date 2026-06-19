# Especificación de Diseño: Fondo Sutil para Búsqueda (search.astro)

## 1. Contexto y Objetivos
La pantalla de búsqueda (`search.astro`) se ve muy vacía y con exceso de color blanco en el fondo en modo claro. Queremos añadir un fondo con textura sutil que mejore la estética visual y la jerarquía de los elementos (tarjetas de resultados), asegurando que se adapte perfectamente tanto al modo claro como al modo oscuro utilizando los colores institucionales definidos en `@theme` en `global.css`.

## 2. Enfoque de Diseño (Tailwind Únicamente)
Para cumplir con la directiva de usar únicamente Tailwind y los colores de `@theme`, implementaremos el fondo directamente en el elemento `<section>` de `search.astro` usando clases utilitarias de Tailwind (incluyendo gradientes y patrones radiales en CSS inline/arbitrario).

### Clases de Fondo Propuestas:
- **Modo Claro:**
  - Fondo base: `bg-slate-50/50` (un gris/verde muy suave y limpio).
  - Gradiente superior: Gradiente radial desde `var(--color-unag-overlay-green)` (verde claro suave) en el tope hasta transparente a los lados.
  - Patrón de puntos: Red de puntos finos usando `var(--color-unag-green)` con opacidad `0.06`.
- **Modo Oscuro:**
  - Fondo base: `dark:bg-neutral-950` o `dark:bg-black` (para total compatibilidad con pantallas OLED).
  - Gradiente superior: Gradiente radial desde `var(--color-unag-dark-green)` con opacidad `0.5` hasta transparente.
  - Patrón de puntos: Red de puntos finos usando `var(--color-unag-light-green)` con opacidad `0.08`.

### Implementación en HTML:
```html
<section class="p-10 min-h-screen bg-slate-50/50 dark:bg-black bg-[url('/img/hero-banner-blog.jpg'),radial-gradient(circle_at_50%_0%,var(--color-unag-overlay-green)_0%,transparent_60%),radial-gradient(var(--color-unag-green)/0.06_1.5px,transparent_1.5px)] dark:bg-[url('/img/hero-banner-blog.jpg'),radial-gradient(circle_at_50%_0%,var(--color-unag-dark-green)/0.5_0%,transparent_60%),radial-gradient(var(--color-unag-light-green)/0.08_1.5px,transparent_1.5px)] [background-size:auto,100%_100%,24px_24px] bg-no-repeat bg-bottom">
```

## 3. Criterios de Aceptación
1. **Contraste:** Las tarjetas de resultados (`.result-card`), que usan fondo blanco en modo claro, deben resaltar visualmente sobre el nuevo fondo de la página.
2. **Responsividad:** El fondo de puntos y el gradiente radial deben cubrir toda la pantalla independientemente del tamaño de la ventana (`min-height: 100vh`).
3. **Modo Oscuro:** Transición suave al cambiar de tema sin destellos de blanco.
