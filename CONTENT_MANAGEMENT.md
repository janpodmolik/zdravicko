# Správa obsahu - Návod pro údržbu

## 🎯 Filozofie: Odolný web

Tento web je navržen tak, aby **nikdy nespadl** kvůli změnám v týmu nebo kategorií. Používáme flexibilní schéma, které přijímá jakékoliv hodnoty.

## 📝 Jak upravit kategorie, autory, barvy atd.

### ✏️ Kde upravovat možnosti pro editory

**Soubor:** `public/admin/config.yml`

Toto je konfigurace Decap CMS - zde definujete, co uvidí editori v rychlém výběru.

### 📚 Příklad: Přidání nové kategorie

```yaml
# V souboru public/admin/config.yml najděte:
- label: "Kategorie"
  name: "category"
  widget: "select"
  options:
    - "Zdraví"
    - "Prevence"
    - "Výživa"
    # ... další kategorie
    - "Nová kategorie" # ← Přidejte sem
```

**Důležité:** Po úpravě `config.yml` musíte:

1. Restartovat dev server (`npm run dev`)
2. V prohlížeči otevřít `/admin/` nanovo

### 👨‍⚕️ Přidání/odebrání doktora

```yaml
- label: "Autor"
  name: "author"
  widget: "select"
  options:
    - "MUDr. Jana Šlechtová"
    - "MUDr. Johana Podmolíková"
    # Prostě přidejte nebo smažte řádek
```

**Co se stane se starými články?**

- ✅ Nic! Staré články budou fungovat normálně
- ✅ Jen se nový doktor přestane nabízet v selectu

### 🎨 Přidání nové barvy pro aktuality

```yaml
- label: "Barva"
  name: "color"
  widget: "select"
  options:
    - { label: "🔵 Modrá (Informace)", value: "blue" }
    - { label: "🟠 Oranžová (Upozornění)", value: "orange" }
    - { label: "🟤 Hnědá (Nová)", value: "brown" } # ← Přidáte
```

**Pozor:** Pokud přidáte novou barvu, musíte zajistit, aby existoval CSS styl!

Podívejte se do `src/utils/newsColors.ts` nebo kde máte definované barvy.

## 🔧 Co upravovat kde

| Co chci změnit               | Kde upravit                     | Důsledky                   |
| ---------------------------- | ------------------------------- | -------------------------- |
| **Přidat/odebrat kategorii** | `public/admin/config.yml`       | Ovlivní jen editor, ne web |
| **Přidat/odebrat autora**    | `public/admin/config.yml`       | Ovlivní jen editor, ne web |
| **Přidat/odebrat barvu**     | `public/admin/config.yml` + CSS | Potřeba i CSS styly        |
| **Přidat/odebrat ikonu**     | `public/admin/config.yml`       | Ovlivní jen editor         |
| **Změnit validaci polí**     | `src/content/config.ts`         | ⚠️ Může rozbít build!      |

## ⚠️ Co NEUPRAVOVAT

**Soubor:** `src/content/config.ts`

Tento soubor obsahuje Astro schéma. Měňte ho pouze pokud:

- Přidáváte úplně nové pole (např. `tags: z.array(z.string())`)
- Měníte typ pole (např. z `string` na `number`)

**NIKDY** nepřidávejte zpět `enum` hodnoty! To by udělalo web křehký.

## ✅ Doporučený workflow

### Když odchází doktor:

1. ✅ Otevřete `public/admin/config.yml`
2. ✅ Smažte jméno z `options` u pole `author`
3. ✅ Restartujte dev server
4. ✅ Hotovo! Staré články fungují, nové články už toho doktora nenabízejí

### Když přidáváte novou kategorii:

1. ✅ Otevřete `public/admin/config.yml`
2. ✅ Přidejte kategorii do `options` u pole `category`
3. ✅ Restartujte dev server
4. ✅ Můžete psát články s novou kategorií

### Když měníte ikony:

1. ✅ Najděte ikonu na [Iconify](https://icon-sets.iconify.design/mdi/)
2. ✅ Přidejte do `options` v `config.yml` (formát: `mdi:icon-name`)
3. ✅ Restartujte dev server

## 🚀 Proč je to takhle navržené?

**Problém s enumy:**

```typescript
// ❌ ŠPATNĚ - křehké
category: z.enum(["Zdraví", "Výživa", "Prevence"]);
// Pokud smažete "Výživa", všechny články s touto kategorií přestanou fungovat!
```

**Řešení s string:**

```typescript
// ✅ DOBŘE - odolné
category: z.string();
// Jakákoliv kategorie projde, web nikdy nespadne
```

**Výhoda:**

- CMS stále nabízí rychlý výběr (v `config.yml`)
- Web přijme jakoukoliv hodnotu (v `config.ts`)
- Změny v týmu/kategoriích nerozb ví publikované články

## 🎓 Pro pokročilé

Pokud chcete mít stále validaci, ale mírnější, můžete použít:

```typescript
// Přijme jakýkoliv string, ale upozorní v dev módu
category: z.string().refine((val) => kategorieList.includes(val), {
  message: "Doporučujeme použít standardní kategorii",
});
```

Ale obecně není potřeba - flexibilní string je nejbezpečnější volba.

## 📞 Potřebujete pomoct?

Změny v `config.yml` jsou bezpečné - experimentujte!
Změny v `config.ts` by měly být promyšlené - konzultujte vývojáře.
