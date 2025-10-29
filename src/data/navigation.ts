/**
 * Navigační data pro celý web
 */

export type PageId =
  | "home"
  | "cenik"
  | "blog"
  | "sluzby"
  | "o-nas"
  | "aktuality"
  | "ordinacni-hodiny"
  | "kontakt"
  | "kojeni";

export interface NavItem {
  href: string;
  label: string;
  page: PageId;
  color?: "orange" | "pink"; // Default orange if not specified
}

export const navItems: NavItem[] = [
  { href: "/", label: "Domů", page: "home" },
  { href: "/o-nas", label: "O nás", page: "o-nas" },
  { href: "/aktuality", label: "Aktuality", page: "aktuality" },
  { href: "/sluzby", label: "Služby", page: "sluzby" },
  { href: "/kojeni", label: "Kojení", page: "kojeni", color: "pink" },
  {
    href: "/ordinacni-hodiny",
    label: "Ordinační hodiny",
    page: "ordinacni-hodiny",
  },
  { href: "/cenik", label: "Ceník", page: "cenik" },
  { href: "/blog", label: "Blog", page: "blog" },
  { href: "/kontakt", label: "Kontakt", page: "kontakt" },
];
