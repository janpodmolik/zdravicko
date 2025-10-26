# Git Workflow s Decap CMS

## 📝 Lokální vývoj - Co se děje při editaci

### Krok za krokem:

#### 1. Upravíte článek v admin rozhraní
```
http://localhost:4321/admin
→ Vyberte článek
→ Upravte obsah
→ Klikněte "Save"
```

#### 2. Co se stane po kliknutí "Save"
```bash
Decap CMS
  ↓ HTTP POST request
Proxy Server (port 8081)
  ↓ fs.writeFile()
📝 Soubor PŘÍMO PŘEPSÁN na disku
  ↓
Astro dev server detekuje změnu
  ↓
🔥 Hot reload - web se aktualizuje
```

#### 3. Zkontrolujte změny v Git
```bash
git status
# Výstup:
# modified:   src/content/blog/jak-poznat-chripku-u-deti.md

git diff src/content/blog/jak-poznat-chripku-u-deti.md
# Uvidíte co se změnilo
```

#### 4. Commitněte změny MANUÁLNĚ
```bash
git add src/content/blog/jak-poznat-chripku-u-deti.md
git commit -m "feat: Aktualizace článku o chřipce"
git push
```

---

## 🌍 Produkce - Automatické commitování

V produkci (s Netlify) je to **ZCELA JINÉ**:

### Editorial Workflow (publish_mode: editorial_workflow)

#### 1. Lékař upraví článek v admin
```
https://vasedomena.cz/admin
→ Upraví článek
→ Klikne "Save" (DRAFT)
```

#### 2. Co se stane automaticky:
```
Decap CMS
  ↓ GitHub API
Vytvoří NOVOU VĚTEV: "cms/blog/clanek-xyz"
  ↓
Commitne změny do této větve
  ↓
Vytvoří PULL REQUEST
  ↓
Status: "Draft" - NENÍ ŽIVĚ NA WEBU!
```

#### 3. Schválení a publikování:
```
Admin vidí v CMS "Waiting for review"
  ↓ Klikne "Publish"
  ↓
Pull Request se MERGNE do main
  ↓
GitHub webhook → Netlify
  ↓
Build & Deploy (1-2 min)
  ↓
✅ Živě na webu!
```

---

## 🔄 Porovnání workflow

### Lokální vývoj (teď):
| Akce | Výsledek | Git |
|------|----------|-----|
| Save v CMS | Soubor přepsán | ❌ Žádný commit |
| Viditelné na webu | ✅ Okamžitě | - |
| Git commit | 🔧 Manuální | `git commit` |

### Produkce (Netlify):
| Akce | Výsledek | Git |
|------|----------|-----|
| Save v CMS | Draft větev | ✅ Auto commit do větve |
| Viditelné na webu | ❌ Ne (draft) | - |
| Publish | Pull Request merge | ✅ Auto merge do main |
| Deploy | Build 1-2 min | Webhook trigger |

---

## ⚙️ Nastavení Editorial Workflow

V `config.yml` máme:
```yaml
publish_mode: editorial_workflow
```

### Co to znamená:

**Draft → Ready → Published** workflow:

```
┌─────────────────────────────────────────┐
│ 1. DRAFT (Save)                          │
│    - Vytvoří větev cms/blog/xyz          │
│    - Commitne změny                      │
│    - Vytvoří PR                          │
│    - Status: "In Review"                 │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 2. READY (Set to Ready)                 │
│    - PR označen jako ready               │
│    - Připraveno k merge                  │
│    - Status: "Ready"                     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 3. PUBLISHED (Publish)                  │
│    - PR se mergne do main                │
│    - Trigger build                       │
│    - Deploy na web                       │
│    - Status: "Published"                 │
└─────────────────────────────────────────┘
```

---

## 🎯 Praktické tipy

### Lokální vývoj:
```bash
# Po editaci v CMS:
git status                    # Co se změnilo?
git diff [soubor]            # Jaké změny?
git add .                    # Přidat všechny změny
git commit -m "Zpráva"       # Commit
git push                     # Push do remote
```

### Workflow pro tým:
```bash
# Vývojář:
npm run dev          # Terminal 1
npm run cms:proxy    # Terminal 2
# Edituje v /admin, pak commitne

# Další vývojář:
git pull            # Získá změny
npm run dev         # Vidí aktuální obsah
```

---

## 🚨 Důležité poznámky

### V lokálním vývoji:
- ⚠️ **Vždy commitujte změny** po editaci v CMS!
- ⚠️ **Git nesleduje automaticky** - musíte commit sami
- ✅ **Výhoda**: Rychlé iterace bez čekání na build
- ✅ **Můžete rollback** kdykoliv (`git checkout`)

### V produkci:
- ✅ **Vše automatické** - žádné manuální commity
- ✅ **Pull Request workflow** - review před publikováním
- ✅ **Historie změn** - kdo, kdy, co změnil
- ⏱️ **Build trvá 1-2 minuty** - ne okamžité

---

## 📊 Příklad reálného workflow

### Scénář: Lékař chce aktualizovat článek

**Lokálně (vývojář):**
```bash
1. npm run cms:proxy
2. Otevře /admin
3. Upraví článek
4. Klikne Save
5. git add .
6. git commit -m "Aktualizace článku"
7. git push
```

**V produkci (lékař):**
```bash
1. Otevře vasedomena.cz/admin
2. Přihlásí se
3. Upraví článek
4. Klikne "Save" (draft)
5. Klikne "Publish now"
6. Počká 2 minuty
7. ✅ Živě na webu
```

---

## 🎓 Shrnutí

| Aspekt | Lokální | Produkce |
|--------|---------|----------|
| **Commit** | 🔧 Manuální (`git commit`) | ✅ Automatický (CMS) |
| **Rychlost** | ⚡ Okamžitá | ⏱️ 1-2 minuty |
| **Review** | ❌ Ne | ✅ Pull Request |
| **Rollback** | `git checkout` | Merge dalšího PR |
| **Víceuživatelské** | ❌ Konflikty | ✅ Separate branches |

**Doporučení:**
- Lokálně: Pro rychlý vývoj a testování
- Produkce: Pro bezpečné publikování s review workflow
