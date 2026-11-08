export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { blogCategorySlug, blogDateISO } from '../utils/blog';

const cfEnv = env as unknown as { DB: D1Database };
const site = 'https://davisweatherstation.com';
const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char] || char);

export const GET: APIRoute = async () => {
  let posts: { slug: string; updated_at: string }[] = [];
  let categories: { category: string }[] = [];
  try {
    const [postRows, categoryRows] = await Promise.all([
      cfEnv.DB.prepare(
        `SELECT slug, updated_at FROM blog_posts
         WHERE status IN ('scheduled', 'published') AND published_at <= datetime('now')
         ORDER BY published_at DESC`
      ).all<{ slug: string; updated_at: string }>(),
      cfEnv.DB.prepare(
        `SELECT DISTINCT category FROM blog_posts
         WHERE status IN ('scheduled', 'published') AND published_at <= datetime('now')`
      ).all<{ category: string }>(),
    ]);
    posts = postRows.results || [];
    categories = categoryRows.results || [];
  } catch {
    posts = [];
    categories = [];
  }

  const urls = [
    { loc: `${site}/blog/`, lastmod: new Date().toISOString() },
    ...categories.map((item) => ({
      loc: `${site}/blog/category/${blogCategorySlug(item.category)}/`,
      lastmod: new Date().toISOString(),
    })),
    ...posts.map((post) => ({
      loc: `${site}/blog/${post.slug}/`,
      lastmod: blogDateISO(post.updated_at),
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <lastmod>${item.lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
    },
  });
};
