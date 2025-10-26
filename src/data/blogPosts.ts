export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "jak-poznat-chripku-u-deti",
    title: "Jak poznat chřipku u dětí a kdy k lékaři",
    excerpt:
      "Chřipka je časté virové onemocnění, které postihuje děti zejména v zimních měsících. Naučte se rozpoznat příznaky a zjistěte, kdy je nutné vyhledat lékařskou pomoc.",
    content: `
      <h2>Co je chřipka?</h2>
      <p>Chřipka je akutní infekční onemocnění způsobené virem chřipky (influenza). Na rozdíl od běžného nachlazení má chřipka obvykle rychlejší nástup a závažnější průběh. U dětí může být onemocnění obzvláště náročné.</p>

      <h2>Hlavní příznaky chřipky u dětí</h2>
      <ul>
        <li><strong>Vysoká horečka</strong> - obvykle nad 38,5°C, často až 40°C</li>
        <li><strong>Náhlý začátek</strong> - dítě je během několika hodin výrazně nemocné</li>
        <li><strong>Bolesti svalů a kloubů</strong> - dítě si může stěžovat na bolesti v těle</li>
        <li><strong>Únava a vyčerpání</strong> - výrazná slabost a malátnost</li>
        <li><strong>Bolest hlavy</strong> - často doprovázená světloplachostí</li>
        <li><strong>Kašel</strong> - suchý, dráždivý kašel</li>
        <li><strong>Rýma</strong> - ucpaný nos, vodnatý výtok</li>
      </ul>

      <h2>Kdy k lékaři?</h2>
      <p>Vyhledejte lékařskou pomoc, pokud vaše dítě:</p>
      <ul>
        <li>Má horečku vyšší než 39°C nebo horečka trvá déle než 3 dny</li>
        <li>Má potíže s dýcháním nebo zrychlené dýchání</li>
        <li>Je nápadně ospale nebo nereaguje normálně</li>
        <li>Má bolesti na hrudi nebo břiše</li>
        <li>Je dehydratované (suché rty, málo močí)</li>
        <li>Má modré rty nebo nehty</li>
        <li>Je mladší než 3 měsíce</li>
      </ul>

      <h2>Jak chřipku léčit?</h2>
      <p><strong>Domácí péče:</strong></p>
      <ul>
        <li>Dostatek odpočinku a spánku</li>
        <li>Hodně tekutin (voda, čaj, řídké polévky)</li>
        <li>Léky proti horečce (paracetamol, ibuprofen) dle dávkování</li>
        <li>Vlhký vzduch v místnosti</li>
        <li>Izolace od ostatních členů rodiny</li>
      </ul>

      <p><strong>Kdy antibiotika?</strong> Chřipka je virové onemocnění, antibiotika na ni nepůsobí. Použijí se pouze při bakteriálních komplikacích.</p>

      <h2>Prevence</h2>
      <p>Nejúčinnější prevencí je každoroční očkování proti chřipce. Doporučuje se pro všechny děti od 6 měsíců věku, zejména pro:</p>
      <ul>
        <li>Děti s chronickými onemocněními</li>
        <li>Děti navštěvující kolektivní zařízení</li>
        <li>Děti v rizikových skupinách</li>
      </ul>

      <p>Další preventivní opatření zahrnují časté mytí rukou, vyhýbání se nemocným osobám a posilování imunity zdravou výživou a dostatkem pohybu.</p>
    `,
    image: "/blog/chripka.jpg",
    category: "Zdraví",
    date: "2025-10-20",
    author: "MUDr. Jana Nováková",
  },
  {
    id: 2,
    slug: "ockovani-deti-co-potrebujete-vedet",
    title: "Očkování dětí: Co potřebujete vědět",
    excerpt:
      "Kompletní průvodce očkováním dětí. Vysvětlujeme, proč je očkování důležité, jaké vakcíny jsou povinné a jak připravit dítě na očkování.",
    content: `
      <h2>Proč očkovat?</h2>
      <p>Očkování je jedním z nejúčinnějších způsobů, jak ochránit děti před závažnými infekčními nemocemi. Díky očkování se v České republice prakticky nevyskytují nemoci, které dříve způsobovaly úmrtí nebo trvalé následky u tisíců dětí.</p>

      <h2>Očkovací kalendář v ČR</h2>
      <p>V České republice je stanovený očkovací kalendář, který určuje, proti kterým nemocem a v jakém věku se děti očkují:</p>

      <h3>První rok života:</h3>
      <ul>
        <li><strong>Při narození:</strong> Hepatitida B (1. dávka)</li>
        <li><strong>6 týdnů:</strong> Hexavakcína (záškrt, tetanus, černý kašel, dětská obrna, Haemophilus, hepatitida B)</li>
        <li><strong>3-4 měsíce:</strong> Hexavakcína (2. dávka)</li>
        <li><strong>9-10 měsíců:</strong> Hexavakcína (3. dávka)</li>
      </ul>

      <h3>Druhý rok života:</h3>
      <ul>
        <li><strong>13-18 měsíců:</strong> MMR (spalničky, příušnice, zarděnky)</li>
        <li><strong>13-18 měsíců:</strong> Pneumokoky</li>
      </ul>

      <h2>Vedlejší účinky</h2>
      <p>Většina dětí očkování snáší bez potíží. Mezi běžné reakce patří:</p>
      <ul>
        <li>Mírná horečka (do 38°C)</li>
        <li>Bolest v místě vpichu</li>
        <li>Ospalost nebo naopak podrážděnost</li>
        <li>Snížená chuť k jídlu</li>
      </ul>

      <p>Tyto reakce jsou normální a obvykle odezní do 2-3 dnů.</p>

      <h2>Jak připravit dítě na očkování?</h2>
      <ul>
        <li>Děti by měly být zdravé (bez horečky a akutního onemocnění)</li>
        <li>Kojte před i po očkování - má uklidňující účinek</li>
        <li>Vezměte si oblíbenou hračku nebo knížku na rozptýlení</li>
        <li>Buďte klidní - děti vnímají vaše emoce</li>
        <li>Po očkování můžete dát preventivně paracetamol</li>
      </ul>

      <h2>Časté mýty o očkování</h2>
      <p><strong>Mýtus:</strong> Očkování oslabuje imunitu.<br>
      <strong>Realita:</strong> Očkování naopak trénuje imunitní systém a učí ho rozpoznávat patogeny.</p>

      <p><strong>Mýtus:</strong> Očkování způsobuje autismus.<br>
      <strong>Realita:</strong> Tento mýtus byl založen na podvodné studii. Žádný vědecký výzkum neprokázal souvislost mezi očkováním a autismem.</p>
    `,
    image: "/blog/ockovani.jpg",
    category: "Prevence",
    date: "2025-10-15",
    author: "MUDr. Jana Nováková",
  },
  {
    id: 3,
    slug: "zdrava-vyziva-pro-predkolni-deti",
    title: "Zdravá výživa pro předškolní děti",
    excerpt:
      "Tipy a rady jak zajistit vyvážené stravování vašeho dítěte. Co by mělo být součástí jídelníčku a čemu se vyhnout.",
    content: `
      <h2>Základy zdravé výživy</h2>
      <p>Správná výživa v předškolním věku je klíčová pro růst, vývoj a celkové zdraví dítěte. V tomto období se formují stravovací návyky, které mohou ovlivnit zdraví po celý život.</p>

      <h2>Co by mělo být na talíři?</h2>

      <h3>1. Ovoce a zelenina</h3>
      <p>Základ každého jídla. Doporučuje se 5 porcí denně v různých barvách:</p>
      <ul>
        <li>Čerstvé ovoce jako svačina</li>
        <li>Zelenina ke každému hlavnímu jídlu</li>
        <li>Smoothies nebo ovocné šťávy (100%)</li>
      </ul>

      <h3>2. Cereálie a obiloviny</h3>
      <ul>
        <li>Celozrnné pečivo</li>
        <li>Vločky, müsli</li>
        <li>Rýže, těstoviny (nejlépe celozrnné)</li>
      </ul>

      <h3>3. Bílkoviny</h3>
      <ul>
        <li>Maso (kuřecí, krůtí) - 2-3x týdně</li>
        <li>Ryby - minimálně 1x týdně</li>
        <li>Vejce - 2-3x týdně</li>
        <li>Luštěniny - fazole, čočka, cizrna</li>
      </ul>

      <h3>4. Mléčné výrobky</h3>
      <ul>
        <li>Mléko - 300-500 ml denně</li>
        <li>Jogurt, kefír</li>
        <li>Sýr - jako zdroj vápníku</li>
      </ul>

      <h2>Čemu se vyhnout?</h2>
      <ul>
        <li><strong>Cukr:</strong> Sladkosti, sladké nápoje, slazené jogurty</li>
        <li><strong>Sůl:</strong> Solené chipsy, instantní polévky</li>
        <li><strong>Průmyslově zpracované potraviny:</strong> Fast food, klobásy, paštiky</li>
        <li><strong>Sladké nápoje:</strong> Limonády, slazené džusy</li>
      </ul>

      <h2>Pitný režim</h2>
      <p>Děti by měly pít:</p>
      <ul>
        <li>Vodu - jako hlavní nápoj</li>
        <li>Neslazenou čaj</li>
        <li>Ředěné 100% ovocné šťávy (max. 1x denně)</li>
        <li>Mléko</li>
      </ul>

      <h2>Praktické tipy</h2>
      <ul>
        <li>Jděte příkladem - jezte zdravě i vy</li>
        <li>Nenuťte dítě dojíst celý talíř</li>
        <li>Nabízejte nové potraviny opakovaně</li>
        <li>Zapojte děti do přípravy jídel</li>
        <li>Vytvořte pravidelný jídelní režim</li>
        <li>Jedzte společně u stolu bez rozptýlení (TV, tablet)</li>
      </ul>
    `,
    image: "/blog/vyziva.jpg",
    category: "Výživa",
    date: "2025-10-10",
    author: "MUDr. Jana Nováková",
  },
  {
    id: 4,
    slug: "alergicke-reakce-u-deti",
    title: "Alergické reakce u dětí: Prevence a léčba",
    excerpt:
      "Jak rozpoznat alergii u dítěte, nejčastější alergeny a co dělat v případě alergické reakce. Praktický návod pro rodiče.",
    content: `<h2>Co je alergie?</h2><p>Podrobný obsah článku o alergiích...</p>`,
    image: "/blog/alergie.jpg",
    category: "Alergie",
    date: "2025-10-05",
    author: "MUDr. Jana Nováková",
  },
  {
    id: 5,
    slug: "spanek-a-jeho-vliv-na-vyvoj-ditete",
    title: "Spánek a jeho vliv na vývoj dítěte",
    excerpt:
      "Proč je kvalitní spánek pro děti tak důležitý? Kolik hodin spánku vaše dítě potřebuje a jak vytvořit zdravé spánkové návyky.",
    content: `<h2>Význam spánku</h2><p>Podrobný obsah článku o spánku...</p>`,
    image: "/blog/spanek.jpg",
    category: "Vývoj",
    date: "2025-09-28",
    author: "MUDr. Jana Nováková",
  },
  {
    id: 6,
    slug: "detske-nemoci-v-zimnim-obdobi",
    title: "Dětské nemoci v zimním období",
    excerpt:
      "Přehled nejčastějších onemocnění, která postihují děti v zimě. Jak jim předcházet a kdy vyhledat lékařskou pomoc.",
    content: `<h2>Časté zimní nemoci</h2><p>Podrobný obsah článku o zimních nemocech...</p>`,
    image: "/blog/zima.jpg",
    category: "Zdraví",
    date: "2025-09-20",
    author: "MUDr. Jana Nováková",
  },
];
