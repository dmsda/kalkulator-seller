import { getCollection } from 'astro:content';
import { POSTS_PER_PAGE } from '../utils/blogConfig.js';

export async function GET() {
  const siteUrl = 'https://kalkulatorseller.pages.dev';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly', lastmod: currentDate },
    { url: '/shopee/', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { url: '/tiktok-shop/', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { url: '/tokopedia/', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { url: '/tarif/', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { url: '/panduan/', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
    { url: '/blog/', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { url: '/privacy-policy/', priority: '0.3', changefreq: 'yearly', lastmod: currentDate },
    { url: '/terms/', priority: '0.3', changefreq: 'yearly', lastmod: currentDate },
  ];

  // Ambil artikel blog yang dipublikasikan (bukan draft)
  let blogPages = [];
  try {
    const publishedPosts = await getCollection('blog', ({ data }) => !data.draft);

    // URL artikel
    const postUrls = publishedPosts.map((post) => {
      const slug = post.data.slug || post.id;
      const lastmodDate = post.data.updatedAt || post.data.publishedAt;
      const lastmod = lastmodDate ? new Date(lastmodDate).toISOString().split('T')[0] : currentDate;
      return {
        url: `/blog/${slug}/`,
        priority: '0.7',
        changefreq: 'monthly',
        lastmod,
      };
    });

    // Kategori artikel unik
    const categorySlugs = new Set();
    publishedPosts.forEach((post) => {
      const cat = post.data.category || 'Tips Jualan Online';
      categorySlugs.add(cat.toLowerCase().replace(/\s+/g, '-'));
    });

    const categoryUrls = Array.from(categorySlugs).map((slug) => ({
      url: `/blog/category/${slug}/`,
      priority: '0.6',
      changefreq: 'weekly',
      lastmod: currentDate,
    }));

    // Halaman pagination blog (/blog/page/2/, dst)
    const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE);
    const paginationUrls = [];
    for (let p = 2; p <= totalPages; p++) {
      paginationUrls.push({
        url: `/blog/page/${p}/`,
        priority: '0.6',
        changefreq: 'weekly',
        lastmod: currentDate,
      });
    }

    blogPages = [...postUrls, ...categoryUrls, ...paginationUrls];
  } catch (err) {
    console.error('Error fetching blog posts for sitemap:', err);
  }

  const allPages = [...staticPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
