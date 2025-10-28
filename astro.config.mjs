// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';

/// https://astro.build/config
export default defineConfig({
  // GitHub Pages configuration
  site: 'https://janpodmolik.github.io',
  base: '/zdravicko',
  
  integrations: [
    icon(),
    mdx()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});