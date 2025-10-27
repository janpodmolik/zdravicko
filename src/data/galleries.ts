/**
 * Konfigurace galerií pro prostory ordinace
 *
 * Pro přidání nové fotky:
 * 1. Nahrajte obrázek do příslušné složky v /public/images/
 * 2. Přidejte záznam do příslušného pole níže
 *
 * Doporučené formáty: JPG, PNG, WEBP
 * Doporučená velikost: max 1920x1080px pro rychlé načítání
 */

import type { Gallery, GalleryId } from "../types/gallery";

/**
 * Ordinace pro nemocné děti
 */
export const ordinaceNemocneGallery: Gallery = {
  id: "ordinace-nemocne",
  title: "Ordinace pro nemocné děti",
  description: "Specializovaná ordinace pro vyšetření akutně nemocných dětí",
  images: [
    // Příklad - nahraďte skutečnými obrázky:
    // {
    //   src: '/images/ordinace/nemocne/01.jpg',
    //   alt: 'Vyšetřovací místnost ordinace pro nemocné děti'
    // },
    // {
    //   src: '/images/ordinace/nemocne/02.jpg',
    //   alt: 'Vyšetřovací stůl a vybavení'
    // },
  ],
};

/**
 * Ordinace pro zdravé děti
 */
export const ordinaceZdraveGallery: Gallery = {
  id: "ordinace-zdrave",
  title: "Ordinace pro zdravé děti",
  description: "Prostředí určené pro preventivní prohlídky a očkování",
  images: [
    // Příklad:
    // {
    //   src: '/images/ordinace/zdrave/01.jpg',
    //   alt: 'Ordinace pro preventivní prohlídky'
    // },
  ],
};

/**
 * Čekárna pro nemocné
 */
export const cekarnaNenocneGallery: Gallery = {
  id: "cekarna-nemocne",
  title: "Čekárna pro nemocné",
  description: "Oddělená čekárna pro akutně nemocné děti",
  images: [
    // Příklad:
    // {
    //   src: '/images/cekarna/nemocne/01.jpg',
    //   alt: 'Čekárna pro nemocné děti'
    // },
  ],
};

/**
 * Čekárna pro zdravé
 */
export const cekarnaZdraveGallery: Gallery = {
  id: "cekarna-zdrave",
  title: "Čekárna pro zdravé",
  description: "Čekárna pro preventivní kontroly a očkování",
  images: [
    // Příklad:
    // {
    //   src: '/images/cekarna/zdrave/01.jpg',
    //   alt: 'Čekárna pro zdravé děti'
    // },
  ],
};

/**
 * Dětská herna
 */
export const hernaGallery: Gallery = {
  id: "herna",
  title: "Dětská herna",
  description: "Prostor plný hraček a knih pro zábavu dětí",
  images: [
    // Příklad:
    // {
    //   src: '/images/herna/01.jpg',
    //   alt: 'Dětská herna s hračkami'
    // },
  ],
};

/**
 * Mapa všech galerií pro snadný přístup
 */
const GALLERIES_MAP = {
  "ordinace-nemocne": ordinaceNemocneGallery,
  "ordinace-zdrave": ordinaceZdraveGallery,
  "cekarna-nemocne": cekarnaNenocneGallery,
  "cekarna-zdrave": cekarnaZdraveGallery,
  herna: hernaGallery,
} as const;

/**
 * Helper funkce pro získání galerie podle ID
 * @param id - ID galerie
 * @returns Gallery nebo undefined pokud neexistuje
 */
export function getGalleryById(id: GalleryId): Gallery | undefined {
  return GALLERIES_MAP[id];
}

/**
 * Vrátí všechny dostupné galerie
 * @returns Pole všech galerií
 */
export function getAllGalleries(): Gallery[] {
  return Object.values(GALLERIES_MAP);
}

/**
 * Zkontroluje, zda galerie obsahuje nějaké obrázky
 * @param id - ID galerie
 * @returns true pokud galerie má alespoň jeden obrázek
 */
export function hasGalleryImages(id: GalleryId): boolean {
  const gallery = getGalleryById(id);
  return gallery ? gallery.images.length > 0 : false;
}
