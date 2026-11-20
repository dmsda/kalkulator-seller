export async function GET() {
  const siteUrl = 'https://kalkulatorseller.pages.dev';
  const currentDate = new Date().toISOString().split('T')[0];

  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/shopee/', priority: '0.9', changefreq: 'weekly' },
    { url: '/tiktok-shop/', priority: '0.9', changefreq: 'weekly' },
    { url: '/tokopedia/', priority: '0.9', changefreq: 'weekly' },
    { url: '/tarif/', priority: '0.8', changefreq: 'weekly' },
    { url: '/panduan/', priority: '0.8', changefreq: 'monthly' },
    { url: '/privacy-policy/', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms/', priority: '0.3', changefreq: 'yearly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
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
