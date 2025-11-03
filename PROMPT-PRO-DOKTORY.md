# 🤖 AI Prompt pro vytváření služeb

## Pro Jana (správce webu)

Když doktor pošle text služby, použijte tento prompt v ChatGPT nebo Claude:

---

## 📋 PROMPT (zkopírujte do AI)

````
Jsi expert na převod textu od pediatrů do strukturovaného formátu pro Astro web.

ÚKOL: Převeď následující text do Markdown souboru s frontmatter a content_blocks.

FRONTMATTER STRUKTURA:
---
title: [název služby z textu]
excerpt: [stručný popis 1-2 věty, max 150 znaků]
icon: [vyber z: mdi:stethoscope, mdi:baby-face, mdi:heart-pulse, mdi:hospital-box, mdi:medical-bag, mdi:needle, mdi:thermometer, mdi:clipboard-text]
color: [vyber z: blue, cyan, purple, pink, green, orange, red, yellow, indigo, teal]
showOnHomepage: [true pokud je důležitá služba, jinak false]
order: [číslo pro řazení, 1-10 pro důležité, 11-999 pro ostatní]
published: true
content_blocks:
---

TYPY BLOKŮ (content_blocks):

1. **text** - běžný text nebo markdown
   ```yaml
   - type: text
     content: |-
       Text může obsahovat **bold**, *italic*, seznamy atd.

       ## Nadpisy
       - odrážky
````

2. **features_list** - seznam s ikonami (zaškrtávátka)

   ```yaml
   - type: features_list
     heading: Nadpis seznamu
     items:
       - První položka
       - Druhá položka
       - Třetí položka
   ```

3. **tip_box** - zvýrazněný box s tipem (barevný podle služby)

   ```yaml
   - type: tip_box
     heading: Tip pro rodiče (volitelné)
     content: Text tipu s **formátováním**
     icon: mdi:lightbulb (volitelné)
   ```

4. **warning_box** - varování (červený box)

   ```yaml
   - type: warning_box
     content: Důležité upozornění
   ```

5. **steps** - postupné kroky (číslované)

   ```yaml
   - type: steps
     heading: Jak probíhá vyšetření
     steps:
       - title: První krok
         description: Popis prvního kroku
       - title: Druhý krok
         description: Popis druhého kroku
   ```

6. **faq** - otázky a odpovědi

   ```yaml
   - type: faq
     heading: Často kladené otázky
     items:
       - question: Jak dlouho trvá vyšetření?
         answer: <p>Odpověď s HTML formátováním</p>
       - question: Musím se objednávat?
         answer: <p>Další odpověď</p>
   ```

7. **cta_box** - výzva k akci s tlačítkem

   ```yaml
   - type: cta_box
     heading: Máte dotazy?
     description: Krátký text
     buttonText: Kontaktujte nás
     buttonLink: /kontakt
   ```

8. **image** - obrázek s popiskem
   ```yaml
   - type: image
     src: /images/ordinace.jpg
     alt: Fotografie ordinace
     caption: Naše nově zrekonstruovaná ordinace (volitelné)
   ```

PRAVIDLA:

- Rozděluj text logicky do bloků
- Používej **features_list** pro výčty výhod/co zahrnuje
- Používej **steps** pro postupy krok za krokem
- Používej **tip_box** pro rady a tipy
- Používej **faq** pro často kladené otázky
- Na konci dej **cta_box** s kontaktem
- Zachovej všechny informace z originálu
- V content používej |- pro multiline text
- V FAQ a HTML používej <p> tagy

VÝSTUP: Celý .md soubor připravený ke zkopírování

TEXT OD DOKTORA:
[sem vložte text]

````

---

## 🎯 Jak to použít (krok za krokem)

### 1. Zkopírujte prompt výše
Celý text od "Jsi expert..." až po "[sem vložte text]"

### 2. Otevřete ChatGPT nebo Claude
- ChatGPT: https://chat.openai.com
- Claude: https://claude.ai

### 3. Vložte prompt + text od doktora
Na konec promptu přidejte skutečný text od doktora

### 4. AI vám vrátí hotový soubor
Zkopírujte výstup

### 5. Vytvořte nový soubor
```bash
# V projektu vytvořte nový soubor
code src/content/services/nazev-sluzby.md

# Vložte obsah z AI
# Uložte (Cmd+S)
````

### 6. Zkontrolujte na webu

```bash
# Spusťte dev server (pokud už neběží)
npm run dev

# Otevřete: http://localhost:4321/sluzby/nazev-sluzby
```

---

## 📖 Příklad převodu

### Text od doktora:

```
Preventivní prohlídky

Preventivní prohlídky jsou důležité pro sledování vývoje dítěte.

Co zahrnují:
- Měření výšky a váhy
- Kontrola zraku
- Očkování

Probíhá to tak:
1. Nejdřív se vás zeptáme na zdraví
2. Pak provedeme vyšetření
3. Na závěr vše vyhodnotíme

Tip: Přineste s sebou očkovací průkaz!

Otázky:
- Jak dlouho to trvá? Asi 30 minut.
- Musím se objednávat? Ano, telefonicky.
```

### AI vrátí:

```markdown
---
title: Preventivní prohlídky
excerpt: Pravidelné kontroly zdravotního stavu a vývoje dítěte
icon: mdi:stethoscope
color: blue
showOnHomepage: true
order: 1
published: true
content_blocks:
  - type: text
    content: |-
      Preventivní prohlídky jsou důležité pro sledování vývoje dítěte.

  - type: features_list
    heading: Co zahrnují
    items:
      - Měření výšky a váhy
      - Kontrola zraku
      - Očkování

  - type: steps
    heading: Jak to probíhá
    steps:
      - title: Anamnéza
        description: Nejdřív se vás zeptáme na zdraví
      - title: Vyšetření
        description: Pak provedeme vyšetření
      - title: Vyhodnocení
        description: Na závěr vše vyhodnotíme

  - type: tip_box
    heading: Tip pro rodiče
    content: Přineste s sebou očkovací průkaz!
    icon: mdi:lightbulb

  - type: faq
    heading: Často kladené otázky
    items:
      - question: Jak dlouho to trvá?
        answer: <p>Asi 30 minut.</p>
      - question: Musím se objednávat?
        answer: <p>Ano, telefonicky.</p>

  - type: cta_box
    heading: Máte dotazy?
    description: Rádi vám zodpovíme všechny vaše otázky
    buttonText: Kontaktujte nás
    buttonLink: /kontakt
---
```

---

## 🎨 Testovací stránka

Pro testování komponent otevřete:
**https://test.zdravicko.org/sluzby/sluzby-ukazka**

Zde uvidíte všechny dostupné bloky a jejich vzhled.

---

## 🆘 Časté problémy

### YAML syntax error

- Zkontrolujte odsazení (vždy 2 mezery)
- Zkontrolujte, že `content: |-` je na samostatném řádku
- Text pod `|-` musí být odsazen o 2 mezery více

### Služba se nezobrazuje

- Zkontrolujte `published: true`
- Zkontrolujte, že soubor je v `src/content/services/`
- Zkontrolujte, že má příponu `.md`

### Barvy se nezobrazují správně

- Povolené barvy: `blue, cyan, purple, pink, green, orange, red, yellow, indigo, teal`
- Vždy lowercase (malá písmena)

---

## 💡 Tipy pro rychlejší práci

1. **Uložte si prompt** - zkopírujte do souboru, abyste ho měli vždy po ruce
2. **Vytvořte si zkratku** - v Raycast nebo Alfred pro otevření ChatGPT
3. **Používejte template** - pro rychlé služby zkopírujte existující a upravte
4. **Testujte lokálně** - vždy nejdřív na `localhost`, pak deploy

---

Vytvořeno: 3. listopadu 2025
