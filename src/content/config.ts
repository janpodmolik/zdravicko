import { defineCollection, z } from "astro:content";

/**
 * DŮLEŽITÉ: Flexibilní schéma pro Content Collections
 * ===================================================
 *
 * Všechna pole používají základní typy (string, date, boolean) místo striktních enum.
 *
 * VÝHODY:
 * ✅ Web funguje i když odeberete kategorii/autora/barvu z CMS
 * ✅ Publikované články nepřestanou fungovat při změnách v týmu
 * ✅ Můžete kdykoliv přidat nové kategorie bez úpravy tohoto souboru
 *
 * JAK TO FUNGUJE:
 * - Tento soubor (config.ts): Validace jen základních typů - web je odolný
 * - CMS config (public/admin/config.yml): Selecty s doporučenými hodnotami pro editory
 *
 * PŘÍKLAD:
 * Když odeberete kategorii "Výživa" z CMS:
 * - Nové články: Editor už neuvidí "Výživa" v selectu
 * - Staré články s "Výživa": Budou fungovat normálně, web nespadne
 */

// Blog kolekce
const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(), // Flexibilní string místo enum - web odolný vůči změnám kategorií
    excerpt: z.string(),
    image: z.string().optional(),
    author: z.string().optional(), // Flexibilní string - web odolný vůči změnám v týmu
    published: z.boolean().default(true),
  }),
});

// Aktuality kolekce
const newsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    color: z.string(), // Flexibilní string - můžete přidat nové barvy bez úpravy schématu
    icon: z.string().default("mdi:information"),
    date: z.coerce.date(),
    published: z.boolean().default(true),
  }),
});

// Služby kolekce - s modulárními bloky obsahu
const servicesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    icon: z.string(),
    color: z.string(), // blue, cyan, purple, pink, green, orange, red, yellow, indigo, teal
    showOnHomepage: z.boolean().default(false),
    order: z.number().default(999), // Pro řazení služeb
    published: z.boolean().default(true),
    // Modulární bloky obsahu - doktor může skládat stránku z různých komponent
    content_blocks: z
      .array(
        z.discriminatedUnion("type", [
          // Textový blok - standardní markdown text
          z.object({
            type: z.literal("text"),
            content: z.string(),
          }),
          // Seznam s ikonami - stejné jako původní features
          z.object({
            type: z.literal("features_list"),
            heading: z.string(),
            items: z.array(z.string()),
            singleColumn: z.boolean().optional(),
          }),
          // Tip box - zvýrazněný box s radou
          z.object({
            type: z.literal("tip_box"),
            heading: z.string().optional(),
            content: z.string(),
            icon: z.string().optional(),
          }),
          // Varování box - výstražný box
          z.object({
            type: z.literal("warning_box"),
            content: z.string(),
          }),
          // FAQ sekce - otázky a odpovědi
          z.object({
            type: z.literal("faq"),
            heading: z.string().optional(),
            items: z.array(
              z.object({
                question: z.string(),
                answer: z.string(),
              })
            ),
          }),
          // Kroky/návod - numerovaný seznam kroků
          z.object({
            type: z.literal("steps"),
            heading: z.string(),
            steps: z.array(
              z.object({
                title: z.string(),
                description: z.string(),
              })
            ),
          }),
          // Call to action box
          z.object({
            type: z.literal("cta_box"),
            heading: z.string(),
            description: z.string(),
            buttonText: z.string().optional(),
            buttonLink: z.string().optional(),
          }),
          // Obrázek s popiskem
          z.object({
            type: z.literal("image"),
            src: z.string(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        ])
      )
      .optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  news: newsCollection,
  services: servicesCollection,
  // Special notice používá JSON soubor v src/data/, ne content collection
};
