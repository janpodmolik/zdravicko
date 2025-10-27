export interface Service {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  icon: string;
  color: "blue" | "cyan" | "purple" | "pink";
  features: string[];
  duration?: string;
  price?: string;
  showOnHomepage?: boolean;
  isExternal?: boolean; // Pro odkazy mimo /sluzby/ (např. /kojeni)
  externalUrl?: string; // Custom URL pokud je isExternal true
}

export type ServiceColor = "blue" | "cyan" | "purple" | "pink";

/**
 * Vrátí služby zobrazené na homepage
 */
export function getHomepageServices(): Service[] {
  return services.filter(service => service.showOnHomepage === true);
}

export const services: Service[] = [
  {
    id: "1",
    title: "Preventivní prohlídky",
    slug: "preventivni-prohlidky",
    excerpt: "Pravidelné kontroly růstu a vývoje dítěte",
    description:
      "Preventivní prohlídky jsou základem péče o zdraví vašich dětí. Pravidelné kontroly nám umožňují včas odhalit případné vývojové odchylky a zajistit optimální růst a vývoj dítěte. Během prohlídky hodnotíme fyzický i psychomotorický vývoj, provádíme základní vyšetření a poskytujeme rodičům cenné rady.",
    icon: "mdi:stethoscope",
    color: "blue",
    showOnHomepage: true,
    features: [
      "Hodnocení růstu a vývoje",
      "Kontrola psychomotorického vývoje",
      "Měření a vážení",
      "Základní fyzikální vyšetření",
      "Poradenství pro rodiče",
      "Doporučení pro správnou výživu",
    ],
    duration: "30-45 minut",
    price: "Hrazeno pojišťovnou",
  },
  {
    id: "2",
    title: "Očkování",
    slug: "ockovani",
    excerpt: "Kompletní vakcinační program dle kalendáře",
    description:
      "Poskytujeme kompletní očkovací program podle aktuálního očkovacího kalendáře. Kromě povinných očkování nabízíme i doporučená a nadstandardní očkování. Před každým očkováním provedeme důkladnou kontrolu zdravotního stavu dítěte a zodpovíme všechny otázky rodičů.",
    icon: "mdi:needle",
    color: "cyan",
    showOnHomepage: true,
    features: [
      "Povinné očkování dle kalendáře",
      "Doporučené nadstandardní vakcíny",
      "Očkování před cestou do zahraničí",
      "Kontrola zdravotního stavu před očkováním",
      "Evidence v očkovacím průkazu",
      "Sledování nežádoucích účinků",
    ],
    duration: "15-20 minut",
    price: "Povinné očkování hrazeno pojišťovnou",
  },
  {
    id: "3",
    title: "Akutní péče",
    slug: "akutni-pece",
    excerpt: "Ošetření běžných dětských onemocnění",
    description:
      "Poskytujeme rychlou a odbornou péči o náhle vzniklé zdravotní potíže. Ošetřujeme běžná dětská onemocnění jako jsou infekce dýchacích cest, střevní potíže, kožní problémy a další akutní stavy. V případě potřeby vystavíme potvrzení pro školu nebo školku.",
    icon: "mdi:hospital-box",
    color: "purple",
    showOnHomepage: true,
    features: [
      "Ošetření horečnatých stavů",
      "Léčba infekcí dýchacích cest",
      "Péče o kožní problémy",
      "Ošetření drobných poranění",
      "Vystavení potvrzení pro školu",
      "Předpis léků a doporučení léčby",
    ],
    duration: "20-30 minut",
    price: "Hrazeno pojišťovnou",
  },
  {
    id: "4",
    title: "Konzultace a poradenství",
    slug: "konzultace-poradenstvi",
    excerpt: "Poradenství v oblasti výživy a vývoje",
    description:
      "Nabízíme komplexní poradenství v oblasti výživy, kojení, psychomotorického vývoje a výchovy dětí. Rádi zodpovíme všechny vaše otázky a poskytneme odborné rady. Konzultace je vhodná pro rodiče, kteří mají dotazy ohledně péče o své dítě nebo se chtějí poradit s konkrétním problémem.",
    icon: "mdi:clipboard-text",
    color: "pink",
    features: [
      "Poradenství v oblasti kojení",
      "Rady k výživě a příkrmům",
      "Konzultace výchovných problémů",
      "Poradenství k psychomotorickému vývoji",
      "Rady k péči o novorozence",
      "Individuální přístup ke každé rodině",
    ],
    duration: "30 minut",
    price: "500 Kč",
  },
  {
    id: "5",
    title: "Posudková činnost",
    slug: "posudkova-cinnost",
    excerpt: "Lékařské zprávy a posudky pro různé účely",
    description:
      "Vystavujeme lékařské zprávy a posudky potřebné pro různé účely - nástup do školy nebo školky, sportovní aktivity, tábory a další. Provedeme potřebné vyšetření a vystavíme požadovanou dokumentaci.",
    icon: "mdi:file-document-edit",
    color: "blue",
    features: [
      "Posudky pro školku a školu",
      "Potvrzení pro sportovní aktivity",
      "Zprávy pro tábory a výlety",
      "Lékařské zprávy pro úřady",
      "Posudky pro nadstandardní vyšetření",
      "Rychlé vystavení dokumentace",
    ],
    duration: "15-20 minut",
    price: "200-500 Kč dle rozsahu",
  },
  {
    id: "6",
    title: "Vyšetření alergií",
    slug: "vysetreni-alergii",
    excerpt: "Diagnostika a léčba alergických onemocnění",
    description:
      "Provádíme základní diagnostiku alergií u dětí včetně kožních testů. Pomůžeme identifikovat alergeny a navrhneme vhodnou léčbu. Poskytujeme také dlouhodobou péči o děti s alergickými onemocněními.",
    icon: "mdi:flower-pollen",
    color: "cyan",
    features: [
      "Kožní alergické testy",
      "Diagnostika potravinových alergií",
      "Léčba alergické rýmy",
      "Péče o atopický ekzém",
      "Doporučení dietních opatření",
      "Dlouhodobé sledování",
    ],
    duration: "45 minut",
    price: "Částečně hrazeno pojišťovnou",
  },
  {
    id: "7",
    title: "Laktační poradenství",
    slug: "laktacni-poradenstvi",
    excerpt: "Profesionální podpora a pomoc při kojení",
    description:
      "Nabízíme odbornou pomoc a poradenství matkám při kojení. Pomůžeme s nácvikem správné techniky kojení, řešíme problémy s nedostatkem nebo naopak přebytkem mléka, bolavými bradavkami a dalšími obtížemi. Podporujeme přirozené kojení a individuální přístup ke každé mámě a miminku.",
    icon: "mdi:mother-nurse",
    color: "pink",
    showOnHomepage: true,
    isExternal: true,
    externalUrl: "/kojeni",
    features: [
      "Nácvik správné techniky kojení",
      "Řešení problémů s kojením",
      "Podpora při navyšování mléka",
      "Pomoc při odstavování",
      "Poradenství k přikrmování",
      "Individuální konzultace",
    ],
    duration: "45-60 minut",
    price: "600 Kč",
  },
  {
    id: "8",
    title: "Vývojová pediatrie",
    slug: "vyvojova-pediatrie",
    excerpt: "Sledování psychomotorického vývoje dítěte",
    description:
      "Specializujeme se na komplexní hodnocení psychomotorického vývoje dětí. Včas odhalujeme vývojové opoždění nebo odchylky a doporučujeme vhodnou intervenci. Spolupracujeme s psychology, logopedy a fyzioterapeuty pro zajištění komplexní péče.",
    icon: "mdi:baby-face-outline",
    color: "blue",
    features: [
      "Hodnocení motorického vývoje",
      "Screening řečového vývoje",
      "Posouzení sociálních dovedností",
      "Detekce vývojových poruch",
      "Doporučení rehabilitace",
      "Koordinace odborné péče",
    ],
    duration: "60 minut",
    price: "800 Kč",
  },
  {
    id: "9",
    title: "Sportovní pediatrie",
    slug: "sportovni-pediatrie",
    excerpt: "Podpora dětí při sportovních aktivitách",
    description:
      "Poskytujeme komplexní péči pro děti aktivně se věnující sportu. Provádíme preventivní vyšetření před zahájením sportovní činnosti, sledujeme růst a vývoj mladých sportovců a řešíme sportovní úrazy. Doporučujeme vhodný režim a výživu pro optimální výkon.",
    icon: "mdi:run",
    color: "cyan",
    features: [
      "Sportovní preventivní prohlídky",
      "Vyšetření před závodem",
      "Poradenství k výživě sportovců",
      "Ošetření sportovních zranění",
      "Sledování růstu mladých sportovců",
      "EKG vyšetření",
    ],
    duration: "45 minut",
    price: "700 Kč",
  },
  {
    id: "10",
    title: "Nutriční poradenství",
    slug: "nutricni-poradenstvi",
    excerpt: "Odborné rady k výživě dětí všech věkových kategorií",
    description:
      "Nabízíme individuální nutriční poradenství zaměřené na zdravou výživu dětí. Řešíme problémy s nadváhou, podváhou, selektivním stravováním nebo potravinovými alergiemi. Vytváříme individuální jídelníčky a pomáhame s nastavením správných stravovacích návyků.",
    icon: "mdi:food-apple",
    color: "purple",
    features: [
      "Individuální jídelníčky",
      "Řešení nadváhy a obezity",
      "Podpora při podvýživě",
      "Dietní opatření při alergiích",
      "Poradenství k selektivitě v jídle",
      "Výživové vzdělávání rodičů",
    ],
    duration: "45 minut",
    price: "650 Kč",
  },
  {
    id: "11",
    title: "Cestovní medicína",
    slug: "cestovni-medicina",
    excerpt: "Příprava na cesty s dětmi do exotických destinací",
    description:
      "Pomůžeme vám připravit se na cestu do zahraničí s dětmi. Poskytujeme informace o nutném očkování, doporučujeme preventivní opatření proti nemocem v cílové destinaci a předepisujeme cestovní lékárničku. Vystavíme potřebné dokumenty pro cestu.",
    icon: "mdi:airplane",
    color: "pink",
    features: [
      "Očkování do zahraničí",
      "Prevence tropických nemocí",
      "Cestovní lékárnička",
      "Zdravotní doporučení k destinaci",
      "Vystavení anglických zpráv",
      "Poradenství k bezpečnosti",
    ],
    duration: "30 minut",
    price: "400 Kč + očkování dle druhu",
  },
  {
    id: "12",
    title: "Dermatologie dětského věku",
    slug: "dermatologie-detskeho-veku",
    excerpt: "Péče o kožní problémy u dětí",
    description:
      "Specializujeme se na diagnostiku a léčbu kožních onemocnění u dětí. Řešíme akné, bradavice, mateřská znaménka, atopický ekzém, lupénku a další kožní problémy. Provádíme dermatoskopii a odstranění drobných kožních výrůstků.",
    icon: "mdi:hand-heart",
    color: "blue",
    features: [
      "Léčba atopického ekzému",
      "Odstranění bradavic",
      "Dermatoskopie znamének",
      "Ošetření akné",
      "Léčba kožních infekcí",
      "Preventivní kontroly kůže",
    ],
    duration: "30 minut",
    price: "500 Kč",
  },
];
