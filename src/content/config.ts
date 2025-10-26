import { defineCollection, z } from 'astro:content';

// Blog kolekce
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Zdraví', 'Prevence', 'Výživa', 'Očkování', 'Tipy pro rodiče']),
    excerpt: z.string(),
    image: z.string().optional(),
    readTime: z.string().default('5 min'),
    author: z.enum(['MUDr. Jana Podmolik', 'MUDr. Petra Nováková']).optional(),
    published: z.boolean().default(true),
  }),
});

// Aktuality kolekce
const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['info', 'warning', 'success']),
    icon: z.string().default('mdi:information'),
    date: z.coerce.date(),
    published: z.boolean().default(true),
  }),
});

// Special Notice kolekce (důležitá oznámení)
const specialNoticeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    message: z.string(),
    date: z.coerce.date(),
    hours: z.string().optional(),
    active: z.boolean().default(true),
  }),
});

export const collections = {
  'blog': blogCollection,
  'news': newsCollection,
  'special_notice': specialNoticeCollection,
};
