// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  adapter: node({ mode: 'standalone' }),
  site: 'https://blog.unag.edu.hn',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});