/**
 * Informace o dopravě k ordinaci
 */

export interface Direction {
  icon: string;
  title: string;
  description: string;
}

export const directions: Direction[] = [
  {
    icon: "mdi:car",
    title: "Autem",
    description:
      "Parkování možné v okolních ulicích nebo na nedalekém parkovišti.",
  },
  {
    icon: "mdi:bus",
    title: "MHD",
    description: "Zastávka nejbližší MHD je 3 minuty chůze od ordinace.",
  },
  {
    icon: "mdi:wheelchair-accessibility",
    title: "Bezbariérový přístup",
    description: "Ordinace je plně přístupná pro handicapované osoby.",
  },
];
