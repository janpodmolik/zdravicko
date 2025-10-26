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
}

/**
 * Kompletní mapování barev na styly
 */
const newsColorsConfig: Record<string, NewsColorConfig> = {
  blue: {
    cardBg: "bg-blue-50",
    cardBorder: "border-blue-200",
    cardBorderHover: "hover:border-blue-300",
    iconBg: "bg-blue-500",
    textTitle: "text-blue-900",
    textBody: "text-blue-800",
  },
  orange: {
    cardBg: "bg-orange-50",
    cardBorder: "border-orange-200",
    cardBorderHover: "hover:border-orange-300",
    iconBg: "bg-orange-500",
    textTitle: "text-orange-900",
    textBody: "text-orange-800",
  },
  green: {
    cardBg: "bg-green-50",
    cardBorder: "border-green-200",
    cardBorderHover: "hover:border-green-300",
    iconBg: "bg-green-500",
    textTitle: "text-green-900",
    textBody: "text-green-800",
  },
  red: {
    cardBg: "bg-red-50",
    cardBorder: "border-red-200",
    cardBorderHover: "hover:border-red-300",
    iconBg: "bg-red-500",
    textTitle: "text-red-900",
    textBody: "text-red-800",
  },
  yellow: {
    cardBg: "bg-yellow-50",
    cardBorder: "border-yellow-200",
    cardBorderHover: "hover:border-yellow-300",
    iconBg: "bg-yellow-500",
    textTitle: "text-yellow-900",
    textBody: "text-yellow-800",
  },
  purple: {
    cardBg: "bg-purple-50",
    cardBorder: "border-purple-200",
    cardBorderHover: "hover:border-purple-300",
    iconBg: "bg-purple-500",
    textTitle: "text-purple-900",
    textBody: "text-purple-800",
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
