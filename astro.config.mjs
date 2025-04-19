import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const SERVER_PORT = 4321;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;

const LIVE_URL = 'https://carloconsultants.github.io';

const SCRIPT = process.env.npm_lifecycle_event || '';
const isBuild = SCRIPT.includes('astro build');
let BASE_URL = LOCALHOST_URL;

if (isBuild) {
  BASE_URL = LIVE_URL;
}

export default defineConfig({
  // server: { port: SERVER_PORT },
  site: BASE_URL,
  base: 'entelexos-docs',
  integrations: [mdx(), sitemap(), tailwind()],
  redirects: {
    '/': '/introduction/welcome'
  }
}); 