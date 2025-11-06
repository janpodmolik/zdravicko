/**
 * Konfigurace barev pro aktuality
 *
 * Obsahuje mapování barev na Tailwind třídy pro jednotný vzhled napříč komponentami.
 */

export type NewsColor =
  | "blue"
  | "orange"
  | "green"
  | "red"
  | "yellow"
  | "purple";

/**
 * Konfigurace stylů pro jednotlivé barvy aktualit
 */
interface NewsColorConfig {
  /** Barva pozadí karty */
  cardBg: string;
  /** Barva borderu karty */
  cardBorder: string;
  /** Barva borderu při hover */
  cardBorderHover: string;
  /** Barva pozadí ikony */
  iconBg: string;
  /** Barva textu nadpisu */
  textTitle: string;
  /** Barva běžného textu */
  textBody: string;
  /** Barva CTA textu */
  ctaText: string;
  /** Hover barva CTA textu */
  ctaHover: string;
}

/**
 * Kompletní mapování barev na styly
 */
const newsColorsConfig: Record<string, NewsColorConfig> = {
  blue: {
    cardBg: "",
    cardBorder: "border-[rgba(80,133,198,0.35)]",
    cardBorderHover: "hover:border-[rgba(80,133,198,0.55)]",
    iconBg: "bg-[#5085c6]",
    textTitle: "text-gray-900",
    textBody: "text-gray-800",
    ctaText: "text-[#4070b0]",
    ctaHover: "group-hover:text-[#274564]",
  },
  orange: {
    cardBg: "",
    cardBorder: "border-[rgba(249,115,22,0.35)]",
    cardBorderHover: "hover:border-[rgba(249,115,22,0.55)]",
    iconBg: "bg-orange-500",
    textTitle: "text-orange-900",
    textBody: "text-orange-800",
    ctaText: "text-[#c2410c]",
    ctaHover: "group-hover:text-[#9a3412]",
  },
  green: {
    cardBg: "",
    cardBorder: "border-[rgba(34,197,94,0.35)]",
    cardBorderHover: "hover:border-[rgba(34,197,94,0.55)]",
    iconBg: "bg-green-500",
    textTitle: "text-green-900",
    textBody: "text-green-800",
    ctaText: "text-[#15803d]",
    ctaHover: "group-hover:text-[#166534]",
  },
  red: {
    cardBg: "",
    cardBorder: "border-[rgba(239,68,68,0.35)]",
    cardBorderHover: "hover:border-[rgba(239,68,68,0.55)]",
    iconBg: "bg-red-500",
    textTitle: "text-red-900",
    textBody: "text-red-800",
    ctaText: "text-[#b91c1c]",
    ctaHover: "group-hover:text-[#991b1b]",
  },
  yellow: {
    cardBg: "",
    cardBorder: "border-[rgba(234,179,8,0.35)]",
    cardBorderHover: "hover:border-[rgba(234,179,8,0.55)]",
    iconBg: "bg-yellow-500",
    textTitle: "text-yellow-900",
    textBody: "text-yellow-800",
    ctaText: "text-[#a16207]",
    ctaHover: "group-hover:text-[#854d0e]",
  },
  purple: {
    cardBg: "",
    cardBorder: "border-[rgba(168,85,247,0.35)]",
    cardBorderHover: "hover:border-[rgba(168,85,247,0.55)]",
    iconBg: "bg-purple-500",
    textTitle: "text-purple-900",
    textBody: "text-purple-800",
    ctaText: "text-[#7e22ce]",
    ctaHover: "group-hover:text-[#6b21a8]",
  },
};

/**
 * Vrátí konfiguraci barev pro danou barvu aktuality.
 * Pokud barva neexistuje, vrátí modrou jako fallback.
 *
 * @param color - Název barvy
 * @returns Konfigurace barev pro kartu
 */
export function getNewsColorConfig(color: string): NewsColorConfig {
  return newsColorsConfig[color] ?? newsColorsConfig.blue;
}

/**
 * Získá pouze třídy pro kartu (pozadí a border)
 */
export function getNewsCardClasses(color: string): string {
  const config = getNewsColorConfig(color);
  return `${config.cardBg} ${config.cardBorder} ${config.cardBorderHover}`;
}

/**
 * Získá třídu pro pozadí ikony
 */
export function getNewsIconBg(color: string): string {
  return getNewsColorConfig(color).iconBg;
}

/**
 * Získá třídy pro CTA text a hover efekt
 */
export function getNewsCtaClasses(color: string): string {
  const config = getNewsColorConfig(color);
  return `${config.ctaText} ${config.ctaHover}`;
}
