export const prerender = false;
import rss from '@astrojs/rss';
import { getAllPosts } from '../lib/strapi';

export async function GET(context: { site: URL }) {
  const posts = await getAllPosts();
  const sorted = posts
    .filter((p) => p.data.slug && p.data.title)
    .sort((a, b) => {
      const da = a.data.date?.getTime() ?? 0;
      const db = b.data.date?.getTime() ?? 0;
      return db - da;
    });

  return rss({
    title: 'Blog UNAG — Universidad Nacional de Agricultura',
    description: 'Historias, investigación y el impacto de nuestra comunidad académica.',
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title ?? 'Sin título',
      description: post.data.description ?? '',
      pubDate: post.data.date ?? new Date(),
      link: `/blog/${post.data.slug}`,
    })),
    customData: `<language>es</language>`,
  });
}
