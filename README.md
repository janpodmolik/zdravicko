# Zdravíčko - Dětská ordinace

## 🏥 O projektu

Moderní webová prezentace dětské ordinace s CMS administrací pro snadnou správu obsahu.

## 🚀 Technologie

- **Astro 5.15** - Moderní web framework
- **Tailwind CSS** - Utility-first CSS  
- **Decap CMS** - Headless CMS pro správu obsahu
- **Content Collections** - Type-safe content management
- **TypeScript** - Typová bezpečnost

## 📦 Instalace a spuštění

```bash
# Instalace závislostí
npm install

# Lokální development
npm run dev

# Build pro produkci
npm run build

# Preview produkčního buildu
npm run preview
```

## 🎨 CMS Administrace

### Přístup k CMS

**Lokální vývoj:**
1. Spusť proxy server: `npm run cms:proxy`
2. V druhém terminálu spusť dev server: `npm run dev`
3. Otevři: `http://localhost:4321/admin`

**Produkce** (po nasazení):
- Otevři: `https://vase-domena.cz/admin`
- Přihlášení přes GitHub/Netlify Identity

### Správa obsahu

#### 📝 Blog články
- Vytváření článků s kategorií, autorem, obrázkem
- Markdown editor s live náhledem
- Možnost publikovat/skrýt článek
- Automatické stránkování (9 článků/stránka)

#### 📢 Aktuality  
- Krátká oznámení pro homepage carousel
- Barevné rozlišení podle typu (info/varování/důležité)
- Ikony z Material Design Icons
- Markdown obsah
- Automatické stránkování (10 aktualit/stránka)

#### ⚠️ Důležité oznámení

**Pouze jedno aktivní oznámení** - banner v horní části webu.

##### Jak přidat důležité oznámení:

1. V Decap CMS přejdi na **"Důležité oznámení"**
2. Nastav pole:
   - **Zobrazit oznámení**: ✅ zapnuto
   - **Zpráva**: Text oznámení (např. "Ordinace bude 24.12. zavřená")
   - **Upravené hodiny**: Volitelné (např. "8:00 - 12:00")
   - **Typ oznámení**: 
     - ⚠️ **Varování** (žlutá) - pro změny ordinačních hodin
     - ℹ️ **Informace** (modrá) - pro běžná oznámení
     - 🔴 **Důležité** (červená) - pro urgentní zprávy
   - **Platnost od/do**: Volitelné - automatické zobrazení v daném období

3. Uložit změny

##### Jak skrýt oznámení:

- Vypni přepínač **"Zobrazit oznámení"** → banner zmizí z webu

##### Technické detaily:

- Soubor: `src/data/special-notice.json`
- Komponenta: `src/components/sections/SpecialNotice.astro`
- Automatická kontrola platnosti podle dat
- Zobrazuje se pouze když je `active: true`

## 📁 Struktura projektu

```
/
├── public/
│   ├── admin/              # Decap CMS administrace
│   │   ├── config.yml      # CMS konfigurace
│   │   └── index.html      # CMS rozhraní + preview šablony
│   └── uploads/            # Nahrané obrázky
├── src/
│   ├── components/         # Astro komponenty
│   │   ├── sections/       # Sekce homepage
│   │   ├── carousel/       # Carousel karty
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── content/            # Content Collections
│   │   ├── blog/          # Blog články (MD)
│   │   └── news/          # Aktuality (MD)
│   ├── data/              # JSON data soubory
│   │   └── special-notice.json  # Důležité oznámení
│   ├── layouts/           # Layout šablony
│   ├── pages/             # Stránky (routing)
│   │   ├── index.astro         # Homepage
│   │   ├── blog/[...page].astro # Blog s pagination
│   │   ├── aktuality/[...page].astro # Aktuality s pagination
│   │   ├── sluzby/         # Služby
│   │   ├── o-nas.astro
│   │   └── kontakt.astro
│   ├── styles/            # Globální styly
│   └── utils/             # Pomocné funkce
└── package.json
```

## 🎯 Klíčové funkce

- ✅ **Responzivní design** - mobilní first přístup
- ✅ **SEO optimalizace** - meta tagy, strukturovaná data
- ✅ **Přístupnost** - ARIA labels, sémantické HTML
- ✅ **Rychlý výkon** - Astro static site generation
- ✅ **Type-safe** - TypeScript pro spolehlivost
- ✅ **CMS administrace** - Decap CMS pro snadnou správu
- ✅ **Markdown obsah** - Snadné psaní článků
- ✅ **Automatické stránkování** - Blog i aktuality
- ✅ **Scroll-to-anchor** - Přímé odkazy na aktuality
- ✅ **Custom preview** - WYSIWYG náhled v CMS
- ✅ **Důležité oznámení** - Banner pro urgentní zprávy

## 🔧 Konfigurace

### Decap CMS (`public/admin/config.yml`)

- Backend: Git Gateway (GitHub)
- Local backend: decap-server proxy
- Kolekce: Blog, Aktuality, Důležité oznámení (file)
- Media folder: `public/uploads`

### Content Collections (`src/content/config.ts`)

- Type-safe schémata pro blog a aktuality
- Automatická validace frontmatter
- TypeScript typy pro celý projekt

## 📝 Přidání obsahu

### Přes CMS (doporučeno):
1. Otevři `/admin`
2. Vyber kolekci (Blog/Aktuality/Oznámení)
3. Vytvoř nový záznam nebo edituj existující
4. Uložit → automaticky commit do Gitu

### Ručně (pro vývojáře):
1. Vytvoř `.md` soubor v `src/content/blog/` nebo `src/content/news/`
2. Přidej frontmatter podle schématu
3. Napiš obsah v Markdown
4. Commit & push

## 🌐 Deployment

### Netlify (doporučeno):
1. Propoj GitHub repo s Netlify
2. Build command: `npm run build`
3. Publish directory: `dist/`
4. Nastav Netlify Identity pro CMS autentizaci
5. Aktivuj Git Gateway

### Jiné platformy:
- Vercel, Cloudflare Pages, nebo jakýkoli static hosting
- Pro CMS je potřeba OAuth provider (GitHub App)

## 🎨 Customizace

### Barvy
- Upravit v `tailwind.config.mjs`
- Hlavní barva: `blue-500` (#3b82f6)
- Akcentová: `cyan-500`

### Písma
- Aktuálně: Inter (Google Fonts)
- Změna: `src/layouts/Layout.astro`

### Logo
- Nahradit v `public/logo.svg`
- Použití v `src/components/Header.astro`

## 📄 Licence

Tento projekt je vytvořen pro Zdravíčko - Dětská ordinace.

## 🤝 Podpora

Pro technickou podporu nebo dotazy kontaktujte vývojáře.
