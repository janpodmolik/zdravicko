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
        "Specializace na preventivní péči a diagnostiku běžných dětských onemocnění. V oboru pracuje od roku 2015 a věnuje se komplexní péči o děti od narození až po dospělost.",
      yearEstablished: 2015,
      isPrimary: true,
    },
    {
      name: "MUDr. Johanka Podmolíková",
      specialization: "Praktický lékař pro děti a dorost",
      description:
        "Zaměřuje se na alergologii a imunologii u dětí. Přináší dlouholeté zkušenosti z nemocniční praxe a specializuje se na péči o děti s chronickými onemocněními.",
      isPrimary: false,
    },
  ] as Doctor[],

  nurses: [
    {
      name: "Jana Horáková",
      description:
        "Stará se o organizaci ordinace a přípravu pacientů na vyšetření. Má bohaté zkušenosti s ošetřovatelskou péčí a vytváří přátelskou atmosféru v ordinaci.",
    },
    {
      name: "Andrea Štukavcová",
      description:
        "Specializuje se na preventivní prohlídky a očkování. Vyniká v práci s dětmi a vytváří příjemné prostředí, kde se malí pacienti cítí v bezpečí.",
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
