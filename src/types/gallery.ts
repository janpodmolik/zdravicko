/**
 * TypeScript typy pro galerie
 */

export interface GalleryImage {
  src: string;
  alt: string;
  thumbnail?: string;
}

export interface Gallery {
  id: string;
  title: string;
  description?: string;
  images: GalleryImage[];
}

export type GalleryId =
  | "ordinace-nemocne"
  | "ordinace-zdrave"
  | "cekarna-nemocne"
  | "cekarna-zdrave"
  | "herna";
