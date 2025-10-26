# Decap CMS - Návod k použití

## 🚀 Spuštění pro lokální vývoj

Pro správnou funkci admin rozhraní musíte mít spuštěné **2 servery**:

### 1. Astro dev server (port 4321)
```bash
npm run dev
```

### 2. Decap proxy server (port 8081)
```bash
npm run cms:proxy
```

**Pak navštivte**: http://localhost:4321/admin

⚠️ **Důležité**: Bez proxy serveru neuvidíte existující obsah!

---

## Přístup do admin rozhraní

Navštivte: **http://localhost:4321/admin** (v produkci: `https://vasedomena.cz/admin`)

## Přehled kolekcí

### 📝 Blog články
- **Účel**: Dlouhé odborné články pro rodiče
- **Obsahuje**: Titulek, kategorii, úvodní text, obsah, autora
- **Čas čtení**: Automaticky se počítá
- **Obrázky**: Volitelné

### 📰 Aktuality  
- **Účel**: Krátké novinky a oznámení
- **Typy**: 
  - 🔵 `info` - Běžné informace
  - 🟠 `warning` - Upozornění
  - 🟢 `success` - Pozitivní zprávy
- **Obsahuje**: Titulek, typ, ikonu, obsah

### ⚠️ Důležitá oznámení
- **Účel**: Banner na homepage s kritickými informacemi
- **Obsahuje**: Zpráva, datum platnosti, upravené hodiny
- **Aktivní**: Zapnout/vypnout zobrazení

## Jak editovat existující obsah

1. V levém menu klikněte na **název kolekce** (např. "Blog články")
2. Zobrazí se seznam všech existujících položek
3. **Klikněte na položku**, kterou chcete editovat
4. Upravte obsah
5. Klikněte **Save** (v test-repo módu se uloží okamžitě)

## Jak vytvořit nový obsah

1. V levém menu klikněte na **název kolekce**
2. Klikněte na tlačítko **"New Blog článek"** (nebo jiná kolekce)
3. Vyplňte všechna pole
4. Klikněte **Save**
5. Nový soubor se vytvoří v `src/content/[kolekce]/`

## Markdown formátování

V poli "Obsah" můžete používat Markdown:

```markdown
## Nadpis
**Tučný text**
*Kurzíva*

- Odrážka 1
- Odrážka 2

1. Číslovaný seznam
2. Položka 2
```

## Tipy

- ✅ **Publikováno** - zaškrtněte, aby se obsah zobrazil na webu
- 📅 **Datum** - používejte formát YYYY-MM-DD
- 🖼️ **Obrázky** - uploadujte do `/public/uploads/`
- 💾 **Ukládání** - v test-repo se mění okamžitě, v produkci po schválení

## Aktuální mód: test-repo

⚠️ **Momentálně běží v testovacím režimu:**
- Změny se ukládají přímo do souborů
- Není potřeba autentizace
- Pro produkci je třeba změnit backend na GitHub/GitLab
