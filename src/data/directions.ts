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
    icon: "mdi:home-heart",
    title: "Přátelské prostředí",
    description:
      "Klidná, barevná ordinace speciálně upravená pro děti a jejich rodiče.",
  },
];
