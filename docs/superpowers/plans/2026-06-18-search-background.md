# Agregar Fondo Sutil a Búsqueda (search.astro) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar un fondo sutil con patrón de puntos y gradiente radial verde a la pantalla de búsqueda, compatible con modo claro y oscuro, usando únicamente clases de Tailwind.

**Architecture:** Modificar el elemento `<section>` de `src/pages/search.astro` para agregar las clases de Tailwind que implementan el fondo compuesto (imagen de banner + gradiente de luz verde + red de puntos).

**Tech Stack:** Astro, Tailwind CSS v4, HTML

## Global Constraints

- Utilizar únicamente clases y directivas de Tailwind.
- Utilizar los colores institucionales definidos en `@theme` en `global.css` (ej. `var(--color-unag-overlay-green)`, `var(--color-unag-dark-green)`).
- Garantizar total compatibilidad y correcta visualización tanto en modo claro como en modo oscuro.

---

### Task 1: Modificar el contenedor de búsqueda en `search.astro`

**Files:**
- Modify: `src/pages/search.astro:14-15`

**Interfaces:**
- Consumes: Clases utilitarias de Tailwind y variables CSS de `@theme` (`var(--color-unag-overlay-green)`, `var(--color-unag-green)`, `var(--color-unag-dark-green)`, `var(--color-unag-light-green)`).
- Produces: Contenedor principal con fondo texturizado y gradiente.

- [ ] **Step 1: Modificar el elemento `<section>` en `src/pages/search.astro`**

Reemplazar la línea 14:
```html
  <section class="p-10 dark:bg-black bg-[url('/img/hero-banner-blog.jpg')] bg-bottom bg-no-repeat">
```
Por:
```html
  <section class="p-10 min-h-screen bg-slate-50/50 dark:bg-black bg-[url('/img/hero-banner-blog.jpg'),radial-gradient(circle_at_50%_0%,var(--color-unag-overlay-green)_0%,transparent_60%),radial-gradient(var(--color-unag-green)/0.06_1.5px,transparent_1.5px)] dark:bg-[url('/img/hero-banner-blog.jpg'),radial-gradient(circle_at_50%_0%,var(--color-unag-dark-green)/0.5_0%,transparent_60%),radial-gradient(var(--color-unag-light-green)/0.08_1.5px,transparent_1.5px)] [background-size:auto,100%_100%,24px_24px] bg-no-repeat bg-bottom">
```

- [ ] **Step 2: Verificar la visualización en el navegador**

Run: `npm run dev` (si el servidor no está corriendo). Abrir el navegador en `http://localhost:4321/search` y validar:
1. En modo claro: Fondo gris/verde muy suave con textura de puntos y brillo verde arriba. Las tarjetas de resultados resaltan sobre este fondo.
2. En modo oscuro: Fondo oscuro/negro con puntos de tono verde claro y brillo verde oscuro arriba.

- [ ] **Step 3: Commitear los cambios**

```bash
git add src/pages/search.astro
git commit -m "style: add subtle dot grid background and radial green glow to search page using tailwind"
```
