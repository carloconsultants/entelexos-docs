import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), sitemap(), tailwind()],
  site: process.env.NODE_ENV === 'production' 
    ? 'https://carloconsultants.github.io'
    : 'http://localhost:4321'
}); 