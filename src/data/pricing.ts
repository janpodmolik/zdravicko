/**
 * Data pro ceník služeb
 */

export interface PriceItem {
  title: string;
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
  note?: string;
}

export const priceSections: PriceSection[] = [
  {
    id: "paid-services",
    title: "Ceník služeb a úkonů nehrazených z veřejného zdravotního pojištění",
    icon: "mdi:cash-multiple",
    iconBg: "bg-blue-100",
    sectionBg: "bg-blue-50",
    borderColor: "border-blue-100",
    priceColor: "text-blue-900",
    items: [
      {
        title: "Výpis ze zdravotní dokumentace",
        price: "300,- Kč",
      },
      {
        title:
          "Nepovinné očkování - vyšetření, aplikace, objednání, skladování, administrativa",
        price: "350,- Kč",
      },
      {
        title: "Vyšetření k řidičskému průkazu",
        price: "400,- Kč",
      },
      {
        title: "Potvrzení pro sportovní činnost",
        price: "300,- Kč",
      },
      {
        title:
          "Potvrzení o způsobilosti na letní tábor, školu v přírodě, lyžařský a plavecký kurz",
        price: "300,- Kč",
      },
      {
        title: "Potvrzení způsobilosti ke studiu",
        price: "300,- Kč",
      },
      {
        title: "Potvrzení před příjetím do mateřské školky a jeslí",
        price: "200,- Kč",
      },
      {
        title: "Potvrzení na odklad školní docházky",
        price: "200,- Kč",
      },
      {
        title: "Nastřelení náušnic",
        price: "700,- Kč",
      },
      {
        title: "Potvrzení o zdravotním stavu na vlastní žádost",
        price: "200,- Kč",
      },
      {
        title: "Vypsání úrazové pojistky nebo bolestné za úraz",
        price: "300,- Kč",
      },
      {
        title: "Vyšetření ke zbrojnímu průkazu",
        price: "400,- Kč",
      },
      {
        title: "Potvrzení pro svářečský průkaz",
        price: "200,- Kč",
      },
      {
        title: "Duplikát očkovacího průkazu",
        price: "300,- Kč",
      },
      {
        title:
          "Předoperační vyšetření na vlastní žádost (plastické op., interupce apod.)",
        price: "400,- Kč",
      },
      {
        title: "Potvrzení o způsobilosti k práci",
        price: "300,- Kč",
      },
      {
        title: "Vstupní prohlídka do zaměstnání",
        price: "400,- Kč",
      },
      {
        title: "CRP vyšetření provedené na vlastní žádost ve Zdravíčku",
        price: "300,- Kč",
      },
    ],
    note: "K poskytnutí žádné ze zdravotních služeb nebude po dni 1.4.2012 vyžadován informovaný souhlas pacienta písemnou formou, s výjimkou případů, které stanoví zákon.",
  },
];

export const priceInfoItems = [
  "Aktualizováno: únor 2024",
  "Všechny ceny jsou uvedeny včetně DPH",
];

export const paymentWarningItems = [
  "Zatím nepřijímáme platbu kartou - prosíme, mějte s sebou hotovost",
];
