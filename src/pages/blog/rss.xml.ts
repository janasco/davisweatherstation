export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { blogDateISO } from '../../utils/blog';

const cfEnv = env as unknown as { DB: D1Database };
const site = 'https://davisweatherstation.com';

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char] || char);

export const GET: APIRoute = async () => {
  let posts: { slug: string; title: string; excerpt: string; category: string; published_at: string; updated_at: string }[] = [];
  try {
    const rows = await cfEnv.DB.prepare(
      `SELECT slug, title, excerpt, category, published_at, updated_at
       FROM blog_posts
       WHERE status IN ('scheduled', 'published') AND published_at <= datetime('now')
       ORDER BY published_at DESC LIMIT 50`
    ).all<typeof posts[number]>();
    posts = rows.results || [];
  } catch {
    posts = [];
  }

  const items = posts
    .map((post) => {
      const url = `${site}/blog/${post.slug}/`;
      const pubDate = new Date(blogDateISO(post.published_at)).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Weather Notes | Davis Weather Station</title>
    <link>${site}/blog/</link>
    <description>Practical weather station guides, installation advice, and field notes.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
    },
  });
};
