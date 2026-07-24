import { marked } from 'marked';

const BASE = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337';
const TOKEN = import.meta.env.VITE_STRAPI_TOKEN ?? ((globalThis as any).process?.env?.STRAPI_TOKEN ?? '');

// Log whether token is available in the current process (do NOT print the token itself)
// This helps verify Vite/Node env loading during development.
try {
  // eslint-disable-next-line no-console
  console.debug('[strapi] STRAPI_TOKEN present:', !!TOKEN);
} catch (e) {}

function buildUrl(path: string) {
  return `${BASE}${path}`;
}

function mediaUrl(media: any): string | string[] | null {
  if (!media) return null;
  if (Array.isArray(media)) {
    return media.map((m: any) => mediaUrl(m)).filter(Boolean) as string[];
  }

  const item = media?.data ?? media;
  const url = item?.attributes?.url || item?.url || item?.data?.attributes?.url;
  const formatUrl = item?.formats?.small?.url || item?.formats?.thumbnail?.url;
  const resolvedUrl = url || formatUrl;
  if (!resolvedUrl) return null;
  return resolvedUrl.startsWith('http') ? resolvedUrl : buildUrl(resolvedUrl);
}

function mapItem(item: any) {
  const id = item.id;
  const a = item.attributes ?? item;

  const categoryData = a.category?.data ?? a.category;
  const categoryName = categoryData?.attributes?.name || categoryData?.name || null;
  const categoryId = categoryData?.id || null;

  const authorData = a.author?.data ?? a.author;
  const authorName = authorData?.attributes?.name || authorData?.name || (typeof a.author === 'string' ? a.author : null);

  const image = a.image ? mediaUrl(a.image) : null;
  const gallery = Array.isArray(a.gallery?.data)
    ? a.gallery.data.map((g: any) => mediaUrl({ data: g }))
    : mediaUrl(a.gallery) || [];

  return {
    id,
    data: {
      title: a.title || null,
      description: a.description || null,
      content: a.content ? marked.parse(a.content) : '',
      date: a.date ? new Date(a.date) : null,
      category: categoryName,
      categoryId,
      image,
      gallery,
      featured: !!a.featured,
      author: authorName,
      slug: a.slug || null,
    },
    raw: item,
  };
}

async function fetchJson(path: string) {
  const url = `${BASE}${path}`;
  let res;
  const headers: Record<string, string> = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};
  try {
    res = await fetch(url, { headers });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Network error when fetching ${url}: ${message}`);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    if (res.status === 403) {
      throw new Error(
        `Strapi ${res.status} Forbidden when fetching ${url}: ${text} — ensure STRAPI_TOKEN is set in environment or that public permissions allow read access.`
      );
    }
    throw new Error(`Strapi ${res.status} ${res.statusText} when fetching ${url}: ${text}`);
  }

  return res.json();
}

export async function getAllPosts() {
  const json = await fetchJson('/api/posts?populate=*&pagination[limit]=100&sort=date:desc');
  const data = json.data || [];
  return data.map(mapItem);
}

export async function getPostBySlug(slug: string) {
  if (!slug) return null;
  const json = await fetchJson(`/api/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
  const item = (json.data && json.data[0]) || null;
  return item ? mapItem(item) : null;
}

export async function getAllCategories() {
  const json = await fetchJson('/api/categories?populate=none&pagination[limit]=100');
  return (json.data || []).map((c: any) => ({ id: c.id, name: c.attributes.name, slug: c.attributes.slug }));
}

export default { getAllPosts, getPostBySlug, getAllCategories };
