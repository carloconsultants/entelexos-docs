import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [mdx(), sitemap(), tailwind()],
  site: process.env.ASTRO_SITE_URL || 'https://astronaut.github.io',
  base: process.env.ASTRO_BASE || 'entelexos-docs',
  redirects: {
    '/': '/introduction/welcome'
  }
}); 