import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [mdx(), sitemap(), tailwind()],
  redirects: {
    '/': '/introduction/welcome'
  },
  // Use different site URL based on environment
  site: process.env.NODE_ENV === 'production' 
    ? 'https://carloconsultants.github.io'
    : 'http://localhost:4321'
}); 