/**
 * Konstanty pro galerie
 */

/**
 * Cesty k obrázkům galerií
 */
export const GALLERY_PATHS = {
  ORDINACE_NEMOCNE: "/images/ordinace/nemocne",
  ORDINACE_ZDRAVE: "/images/ordinace/zdrave",
  CEKARNA_NEMOCNE: "/images/cekarna/nemocne",
  CEKARNA_ZDRAVE: "/images/cekarna/zdrave",
  HERNA: "/images/herna",
} as const;

/**
 * Doporučené nastavení pro obrázky
 */
export const GALLERY_IMAGE_SETTINGS = {
  MAX_WIDTH: 1920,
  MAX_HEIGHT: 1080,
  RECOMMENDED_FORMATS: ["jpg", "jpeg", "png", "webp"] as const,
  THUMBNAIL_MAX_WIDTH: 400,
  THUMBNAIL_MAX_HEIGHT: 300,
} as const;

/**
 * Z-index pro lightbox (musí být vyšší než ostatní komponenty)
 */
export const LIGHTBOX_Z_INDEX = 50;
