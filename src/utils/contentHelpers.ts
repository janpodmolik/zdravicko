import { getCollection, type CollectionEntry } from "astro:content";
import { siteConfig } from "../data/siteConfig";

/**
 * Načte všechny publikované blog příspěvky seřazené podle data (nejnovější první)
 */
export async function getPublishedBlogPosts() {
  const posts = await getCollection(
    "blog",
    ({ data }: CollectionEntry<"blog">) => {
      return data.published !== false;
    }
  );

  return posts.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });
}

/**
 * Načte všechny publikované aktuality seřazené podle data (nejnovější první)
 */
export async function getPublishedNews() {
  const news = await getCollection(
    "news",
    ({ data }: CollectionEntry<"news">) => {
      return data.published !== false;
    }
  );

  return news.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });
}

/**
 * Transformuje CollectionEntry<'blog'> na BlogPost formát pro BlogCard
 */
export function blogEntryToCardData(
  entry: CollectionEntry<"blog">,
  id: number
) {
  return {
    id,
    slug: entry.slug,
    title: entry.data.title,
    excerpt: entry.data.excerpt,
    category: entry.data.category,
    date: entry.data.date.toISOString(),
    author: entry.data.author || siteConfig.primaryDoctor.name,
    image: entry.data.image || "",
    content: "",
  };
}
