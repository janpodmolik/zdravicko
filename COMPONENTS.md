# Components Structure

Tento projekt používá modulární architekturu pro lepší udržitelnost a čitelnost kódu.

## 📁 Struktura komponentů

### `/src/components/`
Sdílené komponenty použitelné napříč celým projektem:

- **`Header.astro`** - Hlavní navigační lišta s logem a menu
- **`MobileMenu.astro`** - Mobilní menu s slide animací
- **`Footer.astro`** - Patička stránky
- **`AktualitaCard.astro`** - Karta pro zobrazení jednotlivé aktuality
- **`BlogCard.astro`** - Karta pro zobrazení blog příspěvku

### `/src/components/sections/`
Komponenty pro jednotlivé sekce hlavní stránky:

- **`Hero.astro`** - Hero sekce s hlavním nadpisem a CTA tlačítky
- **`QuickInfo.astro`** - Tři informační bublinky (hodiny, telefon, adresa)
- **`SpecialNotice.astro`** - Speciální oznámení o změně ordinační doby
- **`About.astro`** - Sekce "O nás" s třemi ikonami
- **`Aktuality.astro`** - Seznam aktualit z ordinace
- **`Services.astro`** - Naše služby (4 karty)
- **`OpeningHours.astro`** - Tabulka ordinačních hodin
- **`Contact.astro`** - Kontaktní formulář a informace

## 📂 Data layer

### `/src/data/`
Centralizovaná data pro snadnou správu:

- **`aktuality.ts`** - Aktuality s TypeScript interfaces
  - Exportuje: `AktualitaItem`, `aktuality`, `getLatestAktuality()`, `getImportantAktuality()`, `getAktualityByCategory()`
  
- **`blogPosts.ts`** - Blog příspěvky
  - Exportuje: `BlogPost`, `blogPosts`

### `/src/utils/`
Helper funkce:

- **`openingHours.ts`** - Logika pro ordinační hodiny a speciální oznámení
  - Exportuje: `OpeningHoursInfo`, `SpecialNotice`, `getTodayOpeningHours()`, `getSpecialNotice()`
  
- **`dateFormat.ts`** - Formátování datumů
  - Exportuje: `formatDate()`, `formatDateShort()`

## 🎨 Styling

### `/src/styles/global.css`
Globální CSS s definovanými CSS proměnnými pro barevnou paletu.

## 📄 Pages

### `/src/pages/index.astro`
Hlavní stránka - nyní velmi čistá a čitelná, pouze importuje komponenty a předává data.

**Před refaktoringem:** ~460 řádků  
**Po refaktoringu:** ~70 řádků

## 🔄 Použití

### Příklad: Přidání nové aktuality

```typescript
// src/data/aktuality.ts
export const aktuality: AktualitaItem[] = [
  {
    id: '5',
    title: 'Nová aktualita',
    date: '2025-10-26',
    category: 'info',
    excerpt: 'Popis aktuality...',
    important: false
  },
  // ... existing items
];
```

### Příklad: Změna speciálního oznámení

```typescript
// src/utils/openingHours.ts
const specialNotice: SpecialNotice = {
  active: true,
  date: '2025-10-26',
  message: 'Dnes máme zkrácené hodiny',
  hours: '8:00 - 12:00'
};
```

## ✨ Výhody modulární struktury

1. **Čitelnost** - Každý komponent má jasně definovaný účel
2. **Znovupoužitelnost** - Komponenty lze použít na více místech
3. **Udržitelnost** - Snadné najít a upravit konkrétní část
4. **Testovatelnost** - Menší komponenty se lépe testují
5. **Týmová spolupráce** - Více lidí může pracovat paralelně bez konfliktů
6. **Type Safety** - TypeScript interfaces zajišťují správnou strukturu dat

## 🚀 Další kroky

- Použít stejný vzor pro `/cenik` a `/blog` stránky
- Vytvořit storybook pro dokumentaci komponentů
- Přidat unit testy pro utility funkce
