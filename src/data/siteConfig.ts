/**
 * Centrální konfigurace webu
 * Použití: import { siteConfig } from '@/data/siteConfig'
 */

export const siteConfig = {
  name: "Zdravíčko",
  title: "Zdravíčko - Dětská ordinace",
  description:
    "Moderní dětská ordinace v Přerově. Kvalitní péče o vaše děti s individuálním přístupem.",
  url: "https://zdravicko.cz", // TODO: Update with actual domain

  doctor: {
    name: "MUDr. Jana Šlechtová",
    specialization: "Praktický lékař pro děti a dorost",
    yearEstablished: 2015,
  },

  social: {
    facebook: "", // TODO: Add if exists
    instagram: "", // TODO: Add if exists
  },

  // SEO defaults
  ogImage: "/og-image.jpg", // TODO: Create OG image
  twitterHandle: "", // TODO: Add if exists
} as const;
