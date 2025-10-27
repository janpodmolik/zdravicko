/**
 * DEPRECATED: Tento soubor obsahuje pouze typy pro zpětnou kompatibilitu.
 * Služby jsou nyní spravovány přes CMS admin v src/content/services/
 *
 * Používá se pouze ServiceColor type pro zajištění type safety.
 */

export type ServiceColor =
  | "blue"
  | "cyan"
  | "purple"
  | "pink"
  | "green"
  | "orange"
  | "red"
  | "yellow"
  | "indigo"
  | "teal";

/**
 * Legacy interface - ponecháno pro kompatibilitu s existujícími komponenty
 * Nové služby by měly používat content collection schéma
 */
export interface Service {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  icon: string;
  color: ServiceColor;
  features: string[];
  duration?: string;
  price?: string;
  showOnHomepage?: boolean;
}
