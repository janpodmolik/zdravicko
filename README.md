# 🏥 Zdravíčko - Dětská ordinace

Moderní webová prezentace dětské pediatrické ordinace v Přerově s plnou CMS administrací.

## 🚀 Technologie

- **Astro 5.15.1** - Moderní static site generator
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Typová bezpečnost
- **Decap CMS** - Git-based headless CMS
- **Web3Forms** - Kontaktní formulář bez backendu
- **View Transitions** - Plynulé přechody mezi stránkami

## 📦 Instalace

```bash
# Naklonovat repository
git clone https://github.com/janpodmolik/zdravicko.git
cd zdravicko

# Instalovat závislosti
npm install

# Vytvořit .env soubor
echo "PUBLIC_WEB3FORMS_KEY=your_access_key" > .env
```

## 🏃 Spuštění

### Development

```bash
# Spustit dev server
npm run dev
# → http://localhost:4321

# Spustit CMS proxy (pro lokální CMS)
npm run cms:proxy
# V druhém terminálu: npm run dev
# → http://localhost:4321/admin
```

### Production

```bash
# Build
npm run build

# Preview buildu
npm run preview
```

## 📁 Struktura projektu

```
zdravicko/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/
│   ├── admin/
│   │   ├── config.yml         # Decap CMS konfigurace
│   │   └── index.html         # CMS admin rozhraní
│   ├── images/                # Statické obrázky
│   └── uploads/               # CMS nahrané soubory
├── src/
│   ├── components/
│   │   ├── blocks/           # Dynamické content bloky
│   │   ├── cards/            # Kartové komponenty
│   │   ├── common/           # Sdílené komponenty (Header, Footer...)
│   │   ├── decorations/      # Dekorativní elementy (vážky...)
│   │   ├── forms/            # Kontaktní formulář
│   │   ├── gallery/          # Galerie komponent
│   │   ├── home/             # Homepage sekce
│   │   └── layouts/          # Layout komponenty
│   ├── content/
│   │   ├── blog/             # Blog články (.md)
│   │   ├── news/             # Aktuality (.md)
│   │   ├── services/         # Služby (.md)
│   │   └── config.ts         # Content Collections schéma
│   ├── data/
│   │   ├── closureNotice.ts  # Zavírací oznámení
│   │   ├── contact.ts        # Kontaktní informace
│   │   ├── directions.ts     # Doprava
│   │   ├── galleries.ts      # Konfigurace galerií
│   │   ├── navigation.ts     # Navigace webu
│   │   ├── pricing.ts        # Ceník
│   │   ├── services.ts       # Přehled služeb
│   │   ├── siteConfig.ts     # Globální konfigurace
│   │   └── special-notice.json # Důležité oznámení (CMS)
│   ├── layouts/
│   │   └── Layout.astro      # Hlavní layout s global scriptem
│   ├── pages/                # Stránky (file-based routing)
│   │   ├── index.astro       # Homepage
│   │   ├── blog/             # Blog (s paginací)
│   │   ├── aktuality/        # Aktuality (s paginací)
│   │   ├── sluzby/           # Služby
│   │   ├── kontakt.astro     # Kontaktní stránka
│   │   ├── o-nas.astro       # O nás
│   │   ├── ordinacni-hodiny.astro
│   │   ├── cenik.astro
│   │   └── gdpr.astro
│   ├── scripts/
│   │   └── updateOpeningHours.ts # Client-side hodiny update
│   ├── styles/
│   │   └── global.css        # Globální styly
│   ├── types/
│   │   └── gallery.ts        # TypeScript typy
│   └── utils/                # Pomocné funkce
│       ├── colors.ts
│       ├── contentHelpers.ts
│       ├── dateFormat.ts
│       ├── newsColors.ts
│       ├── noticeColors.ts
│       └── openingHours.ts
├── docs/                     # Dokumentace
│   └── WEB3FORMS_SETUP.md   # Návod na Web3Forms
├── QUICK_START_FORMS.md     # Rychlý návod na formulář
├── .env                      # Environment variables (gitignored)
├── .gitignore
├── astro.config.mjs
├── netlify.toml              # Netlify konfigurace
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

## 🎨 CMS Administrace

### Přístup k CMS

**Lokálně:**

```bash
npm run cms:proxy  # Terminál 1
npm run dev        # Terminál 2
# → http://localhost:4321/admin
```

**Produkce:**

```
https://zdravicko.org/admin
```

- Přihlášení přes GitHub

### Správa obsahu

#### 📝 Blog

- Články s kategoriemi (prevence, očkování, tipy...)
- Markdown editor
- Featured image
- Publikovat/skrýt
- Automatická paginace (9 článků/stránka)

#### 📢 Aktuality

- Krátká oznámení pro carousel
- Typy: info, varování, důležité
- Ikony (Material Design)
- Automatická paginace (10 aktualit/stránka)

#### 💊 Služby

- Popis služeb ordinace
- Ikony a obrázky
- Dynamické bloky obsahu

#### ⚠️ Důležité oznámení

- Banner v horní části webu
- Typy: info (modrá), warning (žlutá), urgent (červená)
- Časové omezení (platnost od-do)
- Upravené ordinační hodiny

#### �️ Galerie

- Konfigurace v `src/data/galleries.ts`
- Kategorie: Čekárna, Herní koutek, Ordinace
- Zdravé/nemocné děti separace

## 📧 Kontaktní formulář

Formulář používá **Web3Forms** - externí free službu.

### Setup:

1. **Registrace**: https://web3forms.com
2. **Vytvoř formulář** a nastav emaily:
   - To: `doktorka.jana@zdravicko.org`
   - CC: `jan.podmolik@gmail.com` (test)
3. **Zkopíruj Access Key**
4. **Přidej do projektu**:
   - Lokálně: už v `.env`
   - GitHub: Settings → Secrets → `PUBLIC_WEB3FORMS_KEY`
5. **Deploy** - funguje automaticky

Více: `docs/WEB3FORMS_SETUP.md`

## ⏰ Opening Hours System

Dynamické zobrazování ordinačních hodin s client-side aktualizací.

### Architektura:

**Utils (modulární struktura):**

- `src/utils/date-utils.ts` - Práce s datumy, časové zóny, rozsahy (getLocalDate, isDateInRange, formatShortDate)
- `src/utils/time-formatting.ts` - Formátování časů a hodin (normalizeTimeValue, formatHoursRange, areHoursEqual)
- `src/utils/notice-resolver.ts` - Business logika pro special notices (isNoticeEarlyWarning, getSpecialNoticeForDate, resolveNoticeOutcome)
- `src/utils/openingHours.ts` - API vrstva a konstanty (getTodayActualHours, getTodayHoursWithNotice, getSpecialNoticeDisplay)

**Client-side:**

- **Global script**: `src/layouts/Layout.astro` - single event listener
- **Update funkce**: `src/scripts/updateOpeningHours.ts` - 70 řádků
- **Data atributy**:
  - `data-opening-title` - "Dnes otevřeno" / "Zítra otevřeno"
  - `data-opening-hours` - hodiny
  - `data-opening-date` - datum
  - `data-day-of-week` - číslo dne pro weekly schedule
  - `data-today-badge` - "Dnes" badge

### API Funkce:

**Hlavní API (openingHours.ts):**

- `getTodayActualHours()` - Dnešní hodiny **BEZ early warnings** (pro QuickInfo, TodayHoursCard)
- `getTodayHoursWithNotice()` - Dnešní hodiny **S early warnings** (pro stránky s upozorněními na budoucnost)
- `getSpecialNoticeDisplay()` - Předzpracovaná data pro bannery (SpecialNotice.astro)
- `getActiveSpecialNotice()` - Raw data z special-notice.json
- `getWeekScheduleWithNotices()` - Týdenní rozvrh s respektováním notices

**Pomocné funkce (internal use):**

- `getSpecialNoticeForDate(date, respectShowEarly)` - Notice pro konkrétní den
- `resolveNoticeOutcome(date, regularHours, respectShowEarly)` - Vypočítá výsledné hodiny s notices
- `isNoticeEarlyWarning(notice)` - Detekce early warning režimu

**Konstanty:**

- `DayOfWeek` - Enum dnů v týdnu
- `DAY_NAMES` - České názvy dnů
- `NOTICE_TYPE_CLASSES` - CSS třídy pro typy oznámení
- `HOURS_LABELS` - Textové labely (Zavřeno, Dnes otevřeno, atd.)

### Komponenty:

- `QuickInfo.astro` - homepage quick access
- `TodayHoursCard.astro` - detailní kartička
- `WeeklySchedule.astro` - týdenní přehled s highlightem
- `kontakt.astro` - kontaktní stránka

### Technické detaily:

- Client-side: aktuální datum vždy správné (ne build-time)
- Single global script: žádné duplikace
- Border fix: `border-2 border-transparent` → žádný layout shift

## 🎯 Klíčové funkce

### Design & UX

- ✅ Responzivní design (mobile-first)
- ✅ Animované vážky (dekorace)
- ✅ View Transitions (plynulé přechody)
- ✅ Blue gradient theme
- ✅ Accessibility (ARIA, sémantické HTML)

### Content

- ✅ Markdown blog s kategoriemi
- ✅ Aktuality carousel
- ✅ Dynamické služby s bloky
- ✅ Galerie s Lightbox
- ✅ Důležité oznámení (banner)

### Funkcionality

- ✅ Kontaktní formulář (Web3Forms)
- ✅ Client-side opening hours update
- ✅ Weekly schedule s "Dnes" highlightem
- ✅ Dual phone numbers (doktorka + sestřička)
- ✅ Paginace (blog, aktuality)
- ✅ SEO optimalizace

### Admin

- ✅ Decap CMS (Git-based)
- ✅ WYSIWYG editor
- ✅ Image upload
- ✅ Preview templates
- ✅ GitHub authentication

## 🌐 Deployment

### GitHub Pages (současný hosting)

**Automatický deployment přes GitHub Actions:**

1. Push do `main` branch
2. GitHub Actions spustí build
3. Deploy na GitHub Pages

**Environment variables:**

- GitHub: Settings → Secrets → Actions
- Secret: `PUBLIC_WEB3FORMS_KEY`

**Konfigurace:**

- `.github/workflows/deploy.yml`
- Build command: `npm run build`
- Output: `dist/`

### Alternativní hosting

#### Netlify

```bash
# Build settings
Build command: npm run build
Publish directory: dist

# Environment variables
PUBLIC_WEB3FORMS_KEY = your_access_key
```

#### Vercel

```bash
# Build settings
Framework Preset: Astro
Build Command: npm run build
Output Directory: dist

# Environment Variables
PUBLIC_WEB3FORMS_KEY = your_access_key
```

## 🔧 Konfigurace

### Kontaktní informace

`src/data/contact.ts`

```typescript
export const contactInfo = {
  phones: {
    doctor: "+420 731 232 333",
    nurse: "+420 603 290 939",
  },
  email: "doktorka.jana@zdravicko.org",
  address: "Svisle 2/785, 750 02 Přerov",
};
```

### Ordinační hodiny

`src/utils/openingHours.ts`

```typescript
// Úprava hodin podle dnů
export const getOpeningHours = (day: number): OpeningHours
```

### Navigace

`src/data/navigation.ts`

```typescript
// Hlavní menu, footer odkazy
```

### Barvy

`tailwind.config.mjs`

```javascript
colors: {
  primary: '#5085c6',
  secondary: '#6ba3e0'
}
```

## 🛠️ Vývoj

### Přidání nové stránky

1. Vytvoř `src/pages/nova-stranka.astro`
2. Přidej do navigace: `src/data/navigation.ts`
3. Build: `npm run build`

### Přidání komponenty

1. Vytvoř v `src/components/category/`
2. Import a použij v page/layout
3. TypeScript typy v `src/types/`

### Přidání content kolekce

1. Definuj schéma: `src/content/config.ts`
2. Přidej do CMS: `public/admin/config.yml`
3. Vytvoř page template: `src/pages/[collection]/`

### Přidání galerie

1. Nahraj obrázky do `public/images/category/`
2. Přidej konfiguraci: `src/data/galleries.ts`
3. Použij `<Lightbox />` komponentu

## 📊 Performance

- **Lighthouse Score**: 95+ (všechny kategorie)
- **Bundle size**: < 100KB (JS)
- **Static Generation**: Žádný JavaScript pro content
- **Image Optimization**: Astro Image
- **CSS**: Utility-first (Tailwind) - purged unused

## 🔒 Bezpečnost

- ✅ Environment variables (ne v kódu)
- ✅ `.env` v `.gitignore`
- ✅ GitHub Secrets pro CI/CD
- ✅ Honeypot spam ochrana (formulář)
- ✅ GDPR compliance
- ✅ HTTPS only

## 📚 Dokumentace

- [Web3Forms Setup](docs/WEB3FORMS_SETUP.md) - Detailní návod na formulář
- [Quick Start Forms](QUICK_START_FORMS.md) - 2min setup
- [Admin Guide](ADMIN_GUIDE.md) - CMS příručka
- [Content Management](CONTENT_MANAGEMENT.md) - Správa obsahu
- [Git Workflow](GIT_WORKFLOW.md) - Workflow pro práci s Gitem
- [Deployment](DEPLOYMENT.md) - Deployment na různé platformy

## � Známé issues & řešení

### Build-time vs Runtime

- **Problém**: Opening hours zmrazené při buildu
- **Řešení**: Client-side update v `Layout.astro`

### Layout shift při "Dnes" badge

- **Problém**: Border přidaný dynamicky → shift
- **Řešení**: `border-2 border-transparent` vždy

### Diakritika v emailech

- **Problém**: Web3Forms UTF-8 encoding
- **Řešení**: Používat text bez diakritiky v předmětu/from_name

## 📄 Licence

© 2024 Zdravíčko - Dětská ordinace. Všechna práva vyhrazena.

## 👨‍💻 Autor

Vytvořil: Jan Podmolík
Email: jan.podmolik@gmail.com
GitHub: [@janpodmolik](https://github.com/janpodmolik)

## 🤝 Kontakt & Podpora

Pro technickou podporu nebo dotazy:

- Email: jan.podmolik@gmail.com
- GitHub Issues: https://github.com/janpodmolik/zdravicko/issues

---

**Web**: https://zdravicko.org
**Admin**: https://zdravicko.org/admin
