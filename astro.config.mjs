// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

/// https://astro.build/config
export default defineConfig({
  // Production configuration
  site: "https://zdravicko.org",
  // No base path needed for custom domain

  integrations: [
    icon(),
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    define: {
      // Unikátní ID buildu - stejná hodnota se zapeče do klientského JS
      // i do /version.json (config se vyhodnocuje jednou pro celý build).
      // Slouží k detekci zastaralé cache na GitHub Pages (max-age=600).
      "import.meta.env.PUBLIC_BUILD_ID": JSON.stringify(String(Date.now())),
    },
  },
});
