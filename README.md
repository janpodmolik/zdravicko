# Zdravíčko - Webové stránky dětské ordinace# Astro Starter Kit: Basics



Moderní webové stránky pro dětskou ordinaci postavené na Astro frameworku. Zaměřeno na přívětivý UX pro rodiče s důrazem na přehlednost a rychlost.```sh

npm create astro@latest -- --template basics

## 🎯 O projektu```



Web dětské ordinace s kompletními informacemi o službách, týmu, ceníku a blog s užitečnými články pro rodiče.> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!



### Hlavní funkce## 🚀 Project Structure

- ✅ **Blog s MDX** - Pokročilé psaní článků s interaktivními komponentami

- ✅ **ViewTransitions** - Hladké animace mezi stránkamiInside of your Astro project, you'll see the following folders and files:

- ✅ **Responzivní design** - Optimalizováno pro mobily a tablety

- ✅ **SEO optimalizace** - Meta tagy, Open Graph```text

- ✅ **Moderní komponenty** - Znovupoužitelné Astro komponenty/

- ✅ **TypeScript** - Typová bezpečnost├── public/

│   └── favicon.svg

## 🚀 Rychlý start├── src

│   ├── assets

```sh│   │   └── astro.svg

# Instalace závislostí│   ├── components

npm install│   │   └── Welcome.astro

│   ├── layouts

# Spuštění dev serveru│   │   └── Layout.astro

npm run dev│   └── pages

│       └── index.astro

# Build pro produkci└── package.json

npm run build```



# Preview builduTo learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

npm run preview

```## 🧞 Commands



## 📁 Struktura projektuAll commands are run from the root of the project, from a terminal:



```text| Command                   | Action                                           |

/| :------------------------ | :----------------------------------------------- |

├── public/              # Statické soubory (favicon, obrázky)| `npm install`             | Installs dependencies                            |

├── src/| `npm run dev`             | Starts local dev server at `localhost:4321`      |

│   ├── assets/         # Obrázky a media| `npm run build`           | Build your production site to `./dist/`          |

│   ├── components/     # Znovupoužitelné komponenty| `npm run preview`         | Preview your build locally, before deploying     |

│   │   ├── sections/   # Sekce hlavní stránky| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

│   │   ├── Header.astro| `npm run astro -- --help` | Get help using the Astro CLI                     |

│   │   ├── Footer.astro

│   │   ├── BlogCard.astro## 👀 Want to learn more?

│   │   └── ServiceCard.astro

│   ├── data/           # Data (blog posts, služby, aktuality)Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

│   │   ├── blogPosts.ts
│   │   ├── services.ts
│   │   └── aktuality.ts
│   ├── layouts/        # Layout šablony
│   │   └── Layout.astro
│   ├── pages/          # Stránky (auto-routing)
│   │   ├── index.astro
│   │   ├── blog.astro
│   │   ├── blog/[slug].astro
│   │   ├── sluzby.astro
│   │   ├── sluzby/[slug].astro
│   │   ├── cenik.astro
│   │   └── o-nas.astro
│   ├── styles/         # Globální styly
│   │   └── global.css
│   └── utils/          # Utility funkce
│       ├── colors.ts
│       ├── dateFormat.ts
│       └── openingHours.ts
└── package.json
```

## 🧞 Příkazy

| Příkaz                    | Akce                                             |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instalace závislostí                             |
| `npm run dev`             | Spustí dev server na `localhost:4321`            |
| `npm run build`           | Build produkční verze do `./dist/`               |
| `npm run preview`         | Preview buildu lokálně                           |
| `npm run astro ...`       | Spuštění Astro CLI příkazů                       |

## 🛠️ Technologie

### Aktuálně implementováno:
- **Astro 5.15.1** - Static Site Generator
- **TypeScript** - Typová bezpečnost
- **Tailwind CSS 4** - Utility-first CSS framework
- **@astrojs/mdx** - Pokročilé psaní Markdown s JSX komponentami
- **astro-icon** - Iconify ikony (Material Design Icons)
- **astro-seo** - SEO optimalizace a meta tagy
- **ViewTransitions** - Nativní Astro animace přechodů

### Fonty:
- **Inter** - Moderní sans-serif font

---

## 📦 Doporučené pluginy k budoucí implementaci

### 🎯 Priorita 1 - SEO & Výkon (DŮRAZNĚ DOPORUČENO)

#### 1. **@astrojs/sitemap**
Automaticky generuje `sitemap.xml` pro vyhledávače.

```sh
npm install @astrojs/sitemap
```

**Konfigurace:**
```js
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vase-domena.cz', // ← Vaše doména
  integrations: [
    sitemap()
  ]
});
```

**Proč:** Google a další vyhledávače lépe indexují váš web → více návštěvníků od maminek hledajících pediatra.

---

#### 2. **astro-compress**
Komprimuje HTML, CSS, JavaScript a obrázky.

```sh
npm install astro-compress
```

**Konfigurace:**
```js
import compress from 'astro-compress';

export default defineConfig({
  integrations: [
    compress()
  ]
});
```

**Proč:** Rychlejší načítání webu na mobilech → lepší UX pro rodiče.

---

#### 3. **@astrojs/partytown**
Přesouvá analytics do Web Worker, nezpomaluje hlavní vlákno.

```sh
npm install @astrojs/partytown
```

**Konfigurace:**
```js
import partytown from '@astrojs/partytown';

export default defineConfig({
  integrations: [
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    })
  ]
});
```

**Jak použít:**
```astro
<!-- Layout.astro -->
<script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script type="text/partytown">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Proč:** Google Analytics neovlivní rychlost webu.

---

### 🎯 Priorita 2 - UX vylepšení

#### 4. **astro-pagefind**
Přidává pokročilé vyhledávání do webu.

```sh
npm install astro-pagefind
```

**Proč:** Rodiče mohou rychle najít články o konkrétní nemoci, očkování nebo zdravotní péči.

---

#### 5. **@playform/compress**
Automatická optimalizace obrázků (WebP, AVIF).

```sh
npm install @playform/compress
```

**Proč:** Menší obrázky = rychlejší web na mobilech.

---

#### 6. **astro-robots-txt**
Automaticky generuje `robots.txt`.

```sh
npm install astro-robots-txt
```

**Konfigurace:**
```js
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://vase-domena.cz',
  integrations: [
    robotsTxt()
  ]
});
```

**Proč:** Kontrola nad tím, co mohou vyhledávače indexovat.

---

### 🎯 Priorita 3 - Nice to have

#### 7. **@astrojs/rss**
Vytváří RSS feed pro blog.

```sh
npm install @astrojs/rss
```

**Použití:**
```ts
// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { blogPosts } from '../data/blogPosts';

export function GET(context) {
  return rss({
    title: 'Zdravíčko Blog',
    description: 'Články o zdraví dětí',
    site: context.site,
    items: blogPosts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.date),
      description: post.excerpt,
      link: `/blog/${post.slug}/`,
    })),
  });
}
```

**Proč:** Rodiče mohou odebírat váš blog přes RSS čtečky.

---

## 💡 Další doporučené vylepšení

### Schema.org markup pro ordinaci
Přidání strukturovaných dat pro lepší SEO:

```astro
<!-- Layout.astro -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Zdravíčko",
  "description": "Dětská ordinace",
  "telephone": "+420731232333",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Svisle 2/785",
    "addressLocality": "Přerov",
    "addressCountry": "CZ"
  },
  "openingHours": "Mo-Fr 07:30-16:00"
}
</script>
```

### Zlepšené meta tagy pro sociální sítě
```astro
<meta property="og:image" content="/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="/og-image.jpg" />
```

### 404 stránka s roztomilým designem
Vytvořit `src/pages/404.astro` s přátelskou chybovou hláškou a navigací zpět.

### Loading states a skeleton screens
Přidat komponenty pro lepší UX při načítání (např. skeleton pro blog karty).

---

## 🎨 Jak psát blog s MDX

MDX umožňuje používat React/Astro komponenty přímo v Markdown souborech.

### Příklad: Vytvoření blog postu

Vytvořte soubor `src/content/blog/muj-clanek.mdx`:

```mdx
---
title: "Jak pečovat o nemocné dítě"
date: "2025-10-26"
category: "Zdraví"
excerpt: "Praktické rady pro rodiče"
---

import { Icon } from 'astro-icon/components';

# Jak pečovat o nemocné dítě

Základní pravidla péče:

<div class="bg-blue-50 p-6 rounded-lg my-4">
  <Icon name="mdi:alert-circle" class="w-6 h-6 text-blue-600 inline" />
  <strong>Důležité:</strong> Vždy konzultujte s lékařem!
</div>

## Teplota

- Měřte pravidelně
- Podávejte tekutiny
- Klidový režim
```

### Interaktivní komponenty v blogu

Můžete vytvořit vlastní komponenty:

```astro
<!-- src/components/TipBox.astro -->
---
interface Props {
  type?: 'info' | 'warning' | 'success';
  title: string;
}

const { type = 'info', title } = Astro.props;
---

<div class={`tip-box tip-${type}`}>
  <h4>{title}</h4>
  <slot />
</div>
```

A použít je v MDX:

```mdx
import TipBox from '../components/TipBox.astro';

<TipBox type="warning" title="Pozor!">
Vysoká teplota může být nebezpečná!
</TipBox>
```

---

## 📝 Poznámky

- Web je optimalizován pro **rodiče a maminky**
- Důraz na **přehlednost, rychlost a roztomilý design**
- Všechny komponenty jsou **znovupoužitelné a typované**
- Blog podporuje **MDX** pro interaktivní obsah

## 🤝 Kontakt

Pro technické dotazy nebo návrhy na vylepšení kontaktujte vývojáře.

---

**Vytvořeno s ❤️ pomocí Astro**
