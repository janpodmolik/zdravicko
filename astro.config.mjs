// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';

/// https://astro.build/config
export default defineConfig({
  // Custom domain configuration
  site: 'https://zdravicko.org',
  // No base path needed for custom domain
  // base: '/zdravicko',
  
  integrations: [
    icon(),
    mdx()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});