// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: 'https://davisweatherstation.com',
  integrations: [sitemap({ filter: (page) => !page.includes('/api/') && !page.includes('/admin/') })],

  build: {
    assetsPrefix: env.PUBLIC_ASSET_BASE || undefined,
    inlineStylesheets: 'always',
  },

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});