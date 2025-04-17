import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://[your-github-username].github.io/[your-repo-name]/',
  base: '/[your-repo-name]/',
  integrations: [mdx(), sitemap(), tailwind()],
}); 