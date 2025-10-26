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

export const collections = {
  blog: blogCollection,
  news: newsCollection,
  // Special notice používá JSON soubor v src/data/, ne content collection
};
