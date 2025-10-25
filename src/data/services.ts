export interface Service {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  icon: string;
  color: 'blue' | 'cyan' | 'purple' | 'pink';
  features: string[];
  duration?: string;
  price?: string;
}

export const services: Service[] = [
  {
    id: '1',
    title: 'Preventivní prohlídky',
    slug: 'preventivni-prohlidky',
    excerpt: 'Pravidelné kontroly růstu a vývoje dítěte',
    description: 'Preventivní prohlídky jsou základem péče o zdraví vašich dětí. Pravidelné kontroly nám umožňují včas odhalit případné vývojové odchylky a zajistit optimální růst a vývoj dítěte. Během prohlídky hodnotíme fyzický i psychomotorický vývoj, provádíme základní vyšetření a poskytujeme rodičům cenné rady.',
    icon: 'mdi:stethoscope',
    color: 'blue',
    features: [
      'Hodnocení růstu a vývoje',
      'Kontrola psychomotorického vývoje',
      'Měření a vážení',
      'Základní fyzikální vyšetření',
      'Poradenství pro rodiče',
      'Doporučení pro správnou výživu'
    ],
    duration: '30-45 minut',
    price: 'Hrazeno pojišťovnou'
  },
  {
    id: '2',
    title: 'Očkování',
    slug: 'ockovani',
    excerpt: 'Kompletní vakcinační program dle kalendáře',
    description: 'Poskytujeme kompletní očkovací program podle aktuálního očkovacího kalendáře. Kromě povinných očkování nabízíme i doporučená a nadstandardní očkování. Před každým očkováním provedeme důkladnou kontrolu zdravotního stavu dítěte a zodpovíme všechny otázky rodičů.',
    icon: 'mdi:needle',
    color: 'cyan',
    features: [
      'Povinné očkování dle kalendáře',
      'Doporučené nadstandardní vakcíny',
      'Očkování před cestou do zahraničí',
      'Kontrola zdravotního stavu před očkováním',
      'Evidence v očkovacím průkazu',
      'Sledování nežádoucích účinků'
    ],
    duration: '15-20 minut',
    price: 'Povinné očkování hrazeno pojišťovnou'
  },
  {
    id: '3',
    title: 'Akutní péče',
    slug: 'akutni-pece',
    excerpt: 'Ošetření běžných dětských onemocnění',
    description: 'Poskytujeme rychlou a odbornou péči o náhle vzniklé zdravotní potíže. Ošetřujeme běžná dětská onemocnění jako jsou infekce dýchacích cest, střevní potíže, kožní problémy a další akutní stavy. V případě potřeby vystavíme potvrzení pro školu nebo školku.',
    icon: 'mdi:hospital-box',
    color: 'purple',
    features: [
      'Ošetření horečnatých stavů',
      'Léčba infekcí dýchacích cest',
      'Péče o kožní problémy',
      'Ošetření drobných poranění',
      'Vystavení potvrzení pro školu',
      'Předpis léků a doporučení léčby'
    ],
    duration: '20-30 minut',
    price: 'Hrazeno pojišťovnou'
  },
  {
    id: '4',
    title: 'Konzultace a poradenství',
    slug: 'konzultace-poradenstvi',
    excerpt: 'Poradenství v oblasti výživy a vývoje',
    description: 'Nabízíme komplexní poradenství v oblasti výživy, kojení, psychomotorického vývoje a výchovy dětí. Rádi zodpovíme všechny vaše otázky a poskytneme odborné rady. Konzultace je vhodná pro rodiče, kteří mají dotazy ohledně péče o své dítě nebo se chtějí poradit s konkrétním problémem.',
    icon: 'mdi:clipboard-text',
    color: 'pink',
    features: [
      'Poradenství v oblasti kojení',
      'Rady k výživě a příkrmům',
      'Konzultace výchovných problémů',
      'Poradenství k psychomotorickému vývoji',
      'Rady k péči o novorozence',
      'Individuální přístup ke každé rodině'
    ],
    duration: '30 minut',
    price: '500 Kč'
  },
  {
    id: '5',
    title: 'Posudková činnost',
    slug: 'posudkova-cinnost',
    excerpt: 'Lékařské zprávy a posudky pro různé účely',
    description: 'Vystavujeme lékařské zprávy a posudky potřebné pro různé účely - nástup do školy nebo školky, sportovní aktivity, tábory a další. Provedeme potřebné vyšetření a vystavíme požadovanou dokumentaci.',
    icon: 'mdi:file-document-edit',
    color: 'blue',
    features: [
      'Posudky pro školku a školu',
      'Potvrzení pro sportovní aktivity',
      'Zprávy pro tábory a výlety',
      'Lékařské zprávy pro úřady',
      'Posudky pro nadstandardní vyšetření',
      'Rychlé vystavení dokumentace'
    ],
    duration: '15-20 minut',
    price: '200-500 Kč dle rozsahu'
  },
  {
    id: '6',
    title: 'Vyšetření alergií',
    slug: 'vysetreni-alergii',
    excerpt: 'Diagnostika a léčba alergických onemocnění',
    description: 'Provádíme základní diagnostiku alergií u dětí včetně kožních testů. Pomůžeme identifikovat alergeny a navrhneme vhodnou léčbu. Poskytujeme také dlouhodobou péči o děti s alergickými onemocněními.',
    icon: 'mdi:flower-pollen',
    color: 'cyan',
    features: [
      'Kožní alergické testy',
      'Diagnostika potravinových alergií',
      'Léčba alergické rýmy',
      'Péče o atopický ekzém',
      'Doporučení dietních opatření',
      'Dlouhodobé sledování'
    ],
    duration: '45 minut',
    price: 'Částečně hrazeno pojišťovnou'
  }
];
