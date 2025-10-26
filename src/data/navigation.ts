/**
 * Centrální navigační struktura
 * Použití v Header.astro a MobileMenu.astro
 */

export interface NavItem {
  href: string;
  label: string;
  page?: 'home' | 'o-nas' | 'sluzby' | 'cenik' | 'blog';
}

export const navigationItems: NavItem[] = [
  { href: '/o-nas', label: 'O nás', page: 'o-nas' },
  { href: '/#aktuality', label: 'Aktuality' },
  { href: '/sluzby', label: 'Služby', page: 'sluzby' },
  { href: '/#ordinacni-hodiny', label: 'Ordinační hodiny' },
  { href: '/cenik', label: 'Ceník', page: 'cenik' },
  { href: '/blog', label: 'Blog', page: 'blog' },
  { href: '/#kontakt', label: 'Kontakt' }
] as const;

/**
 * Pomocná funkce pro získání href pro kontakt
 * Na homepage použije #kontakt, jinde /#kontakt
 */
export function getContactHref(currentPage?: string): string {
  return currentPage === 'home' ? '#kontakt' : '/#kontakt';
}
