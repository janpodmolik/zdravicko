/**
 * Centrální konfigurace webu
 * Použití: import { siteConfig } from '@/data/siteConfig'
 */

export interface Doctor {
  name: string;
  specialization: string;
  description: string;
  yearEstablished?: number;
  isPrimary: boolean;
}

export interface Nurse {
  name: string;
  description: string;
}

export const siteConfig = {
  name: "Zdravíčko",
  title: "Praktický lékař pro děti a dorost",
  description:
    "Moderní pediatrická ordinace v Přerově. Poskytujeme kvalitní a individuální péči pro vaše děti od narození až po dospělost.",
  url: "https://zdravicko.cz",

  // Team descriptions
  teamDescription: {
    doctors:
      "Jsme tým zkušených lékařů, kteří se specializují na péči o děti a dorost. Každému malému pacientovi věnujeme maximální pozornost a individuální přístup.",
    nurses:
      "Naše zdravotní sestry jsou odbornice s dlouholetou praxí v péči o děti. Vytvářejí příjemné a bezpečné prostředí pro každé vyšetření.",
  },

  doctors: [
    {
      name: "MUDr. Jana Šlechtová",
      specialization: "Praktický lékař pro děti a dorost",
      description:
        "Vedoucí Mraveniště. Ferda Mravenec i Brouk Pytlík v jednom. Léčebná i preventivní péče. Laktační poradenství do detailu s letitými praktickými zkušenostmi a úspěchy. Organizační chod ordinace. Koordinace. Stovky neviditelných hodin mimo ty ordinační, aby vše běželo hladce, dle Vašich představ. Empatie. Vzpomínky na budoucnost. Snaha vychovat následníka.",
      yearEstablished: 2015,
      isPrimary: true,
    },
    {
      name: "MUDr. Johana Podmolíková",
      specialization: "Dětská lékařka, rezidentka",
      description:
        "Vystudovala lékařskou fakultu Univerzity Palackého v Olomouci, absolvovala v roce 2023 a rozhodla se jít ve šlépějích maminky a věnovat se těm nejmenším pacientům. Aktuálně ji v ordinaci zastihnete pouze některé dny, stále se vzdělává v rámci atestačního programu. Potkat ji můžete třeba na dětském oddělení nebo Pohotovosti Nemocnice Přerov.",
      isPrimary: false,
    },
  ] as Doctor[],

  nurses: [
    {
      name: "Jana Horáková",
      description:
        "Usměvavá, léčivá svou vnitřní rovnováhou a klidem. Blondýnka. Maminka čtyř dětí. Má bohaté zkušenosti z domácí praxe 😊. Miluje přírodu a žije s ní v souladu, čerpá z ní moudrost i sílu. Na lidské tělo umí pohlédnout i očima zkušeného maséra. V ordinaci jen pro Vás!",
    },
    {
      name: "Andrea Štukavcová",
      description:
        "Temperamentní brunetka v neustálé akci. Jak by ne – sestřička z anesteziologicko – resuscitační minulostí. Akutní stavy, akutní situace jako z telenovely. Velká dávka empatie, snahy pomoci komukoli v tíživé situaci. Maminka tří dětí. V ordinaci jen pro Vás!",
    },
  ] as Nurse[],

  // Computed property to get primary doctor
  get primaryDoctor(): Doctor {
    const primary = this.doctors.find((d) => d.isPrimary);
    if (!primary) {
      throw new Error("No primary doctor found in configuration");
    }
    return primary;
  },

  // Legacy compatibility - redirect to primary doctor
  get doctor() {
    return this.primaryDoctor;
  },

  social: {
    facebook: "https://facebook.com/zdravicko",
    instagram: "https://instagram.com/zdravicko",
  },

  ogImage: "/og-image.jpg",
};
