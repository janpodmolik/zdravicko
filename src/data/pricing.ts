/**
 * Data pro ceník služeb
 */

export interface PriceItem {
  title: string;
  description: string;
  price: string;
}

export interface PriceSection {
  id: string;
  title: string;
  icon: string;
  iconBg: string;
  sectionBg: string;
  borderColor: string;
  priceColor: string;
  items: PriceItem[];
}

export const priceSections: PriceSection[] = [
  {
    id: "insured",
    title: "Služby hrazené pojišťovnou",
    icon: "mdi:check-circle",
    iconBg: "bg-green-100",
    sectionBg: "bg-green-50",
    borderColor: "border-green-200",
    priceColor: "text-green-600",
    items: [
      {
        title: "Preventivní prohlídky",
        description:
          "Pravidelné kontroly vývoje dítěte dle doporučeného rozpisu",
        price: "Hrazeno",
      },
      {
        title: "Očkování (dle kalendáře)",
        description: "Povinné i doporučené vakcíny podle očkovacího kalendáře",
        price: "Hrazeno",
      },
      {
        title: "Akutní vyšetření",
        description: "Ošetření běžných dětských onemocnění a úrazů",
        price: "Hrazeno",
      },
      {
        title: "Dispenzární péče",
        description: "Dlouhodobá péče o děti s chronickými onemocněními",
        price: "Hrazeno",
      },
    ],
  },
  {
    id: "premium",
    title: "Nadstandardní služby",
    icon: "mdi:star",
    iconBg: "bg-blue-100",
    sectionBg: "bg-gray-50",
    borderColor: "border-gray-200",
    priceColor: "text-gray-900",
    items: [
      {
        title: "Nadstandardní vyšetření",
        description: "Speciální vyšetření mimo rámec pojištění",
        price: "Od 500 Kč",
      },
      {
        title: "Cestovní očkování",
        description: "Vakcíny pro cesty do exotických destinací",
        price: "Dle typu vakcíny",
      },
      {
        title: "Lékařské potvrzení",
        description: "Potvrzení pro školu, kroužky, tábory",
        price: "200 Kč",
      },
      {
        title: "Konzultace mimo ordinační hodiny",
        description: "Konzultace po domluvě mimo standardní hodiny",
        price: "800 Kč",
      },
      {
        title: "Online konzultace",
        description: "Telefonická nebo video konzultace (30 min)",
        price: "400 Kč",
      },
    ],
  },
];

export const priceInfoItems = [
  "Všechny ceny zahrnují DPH",
  "Platba je možná v hotovosti nebo kartou",
  "Pro nadstandardní služby je nutná předchozí objednávka",
  "Některé služby mohou být částečně hrazeny z připojištění",
];
