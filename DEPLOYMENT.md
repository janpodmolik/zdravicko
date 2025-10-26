# Decap CMS - Lokální vývoj vs Produkce

## 🏠 Lokální vývoj (development)

### Co potřebujete spustit:
```bash
# Terminál 1: Astro dev server
npm run dev

# Terminál 2: Decap proxy server
npm run cms:proxy
```

### Jak to funguje:
```
┌─────────────────────────────────────────┐
│ 1. Otevřete /admin v prohlížeči         │
│    ↓                                    │
│ 2. Decap CMS UI (React app)             │
│    ↓ HTTP request na localhost:8081    │
│ 3. Decap Proxy Server                   │
│    ↓ přímý přístup k file systému       │
│ 4. Soubory v src/content/               │
│    ↓                                    │
│ 5. Změny OKAMŽITĚ viditelné na webu     │
└─────────────────────────────────────────┘
```

**Výhody:**
- ✅ Žádná autentizace
- ✅ Okamžité změny
- ✅ Funguje offline
- ✅ Žádný Git commit při každé úpravě

**Nevýhody:**
- ❌ Musíte spouštět 2 servery
- ❌ Nefunguje na mobilních zařízeních
- ❌ Pouze pro 1 vývojáře

---

## 🌍 Produkce (production)

### Co potřebujete nastavit (JEDNORÁZOVĚ):

1. **Netlify/Vercel účet** - pro hosting
2. **Netlify Identity** - pro autentizaci uživatelů
3. **Git Gateway** - pro přístup k repozitáři

### Jak to funguje:
```
┌─────────────────────────────────────────┐
│ 1. Lékař otevře vasedomena.cz/admin     │
│    ↓                                    │
│ 2. Přihlášení přes Netlify Identity     │
│    ↓                                    │
│ 3. Decap CMS UI                         │
│    ↓ GitHub API (přes Git Gateway)     │
│ 4. Git commit do repozitáře             │
│    ↓ webhook trigger                    │
│ 5. Netlify automatický build            │
│    ↓                                    │
│ 6. Deploy nové verze webu (1-2 min)     │
└─────────────────────────────────────────┘
```

**Výhody:**
- ✅ **Žádný proxy server** - nic navíc nespouštíte
- ✅ Funguje odkudkoliv (mobil, tablet)
- ✅ Více uživatelů současně
- ✅ Vše verzované v Git
- ✅ Automatické backupy

**"Nevýhody":**
- ⏱️ Build trvá 1-2 minuty (změny nejsou okamžité)
- 🔐 Potřebuje přihlášení

---

## 🔄 Proč proxy server v lokálním vývoji?

**Problém:**
```javascript
// Prohlížeč NEMŮŽE toto udělat (bezpečnostní omezení):
fs.writeFile('src/content/blog/novy-clanek.md', content)
```

**Řešení:**
```
Prohlížeč → HTTP request → Proxy server → File system
```

**V produkci:**
```
Prohlížeč → GitHub API → Git commit (žádný proxy!)
```

---

## 📋 Kroky pro nasazení do produkce

### 1. Push do GitHub
```bash
git push origin main
```

### 2. Připojit Netlify
1. Přihlásit se na netlify.com
2. "Add new site" → Import from Git
3. Vybrat repozitář `janpodmolik/zdravicko`
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### 3. Povolit Netlify Identity
1. V Netlify: Site settings → Identity → Enable Identity
2. Registration: Invite only (bezpečnější)
3. External providers: Volitelně (Google, GitHub login)

### 4. Povolit Git Gateway
1. V Netlify: Site settings → Identity → Services
2. Enable Git Gateway

### 5. Pozvat uživatele
1. Identity → Invite users
2. Email lékaře → obdrží pozvánku
3. Nastaví si heslo
4. Může editovat obsah na `/admin`

### 6. Hotovo! 🎉

**Lékaři pak:**
1. Otevřou `https://zdravicko.netlify.app/admin`
2. Přihlásí se
3. Editují obsah
4. Kliknou Save
5. Za 1-2 minuty je změna živě na webu

**Žádný proxy server, žádné starosti!**

---

## 🎯 Shrnutí

| Aspekt | Lokální vývoj | Produkce |
|--------|---------------|----------|
| **Proxy server** | ✅ Potřeba (`npm run cms:proxy`) | ❌ Není potřeba |
| **Autentizace** | ❌ Žádná | ✅ Netlify Identity |
| **Rychlost změn** | ⚡ Okamžitá | ⏱️ 1-2 minuty (build) |
| **Git commits** | 🔧 Manuální | ✅ Automatické |
| **Víceuživatelské** | ❌ Ne | ✅ Ano |
| **Funguje offline** | ✅ Ano | ❌ Ne |
| **Přístup odkudkoliv** | ❌ Jen localhost | ✅ Ano |

**Závěr:** Proxy server je **pouze pro vývoj**. V produkci je vše jednodušší - žádný proxy server, pouze GitHub API! 🚀
