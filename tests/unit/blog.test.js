import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { calculateReadingTime } from '../../src/utils/readingTime.js';

describe('Blog System Unit & Integration Suite', () => {
  const rootDir = process.cwd();
  const distDir = path.resolve(rootDir, 'dist');

  describe('Reading Time Calculator', () => {
    it('calculates 1 minute for short texts (< 200 words)', () => {
      const shortText = 'Ini adalah panduan singkat cara menghitung keuntungan penjualan online.';
      const result = calculateReadingTime(shortText);
      expect(result.minutes).toBe(1);
      expect(result.text).toBe('1 menit baca');
    });

    it('calculates realistic reading time for 600 words (~3 minutes)', () => {
      const words = Array.from({ length: 600 }, (_, i) => `kata${i}`).join(' ');
      const result = calculateReadingTime(words);
      expect(result.minutes).toBe(3);
      expect(result.text).toBe('3 menit baca');
    });

    it('handles empty or undefined input safely', () => {
      expect(calculateReadingTime('').minutes).toBe(1);
      expect(calculateReadingTime(null).minutes).toBe(1);
      expect(calculateReadingTime(undefined).minutes).toBe(1);
    });
  });

  describe('Pages CMS Configuration (.pages.yml)', () => {
    it('verifies .pages.yml exists and defines correct media and blog collection', () => {
      const pagesConfigPath = path.join(rootDir, '.pages.yml');
      expect(fs.existsSync(pagesConfigPath)).toBe(true);

      const content = fs.readFileSync(pagesConfigPath, 'utf-8');
      expect(content).toContain('media:');
      expect(content).toContain('input: public/images/blog');
      expect(content).toContain('output: /images/blog');
      expect(content).toContain('name: blog');
      expect(content).toContain('path: src/content/blog');
      expect(content).toContain('name: title');
      expect(content).toContain('name: description');
      expect(content).toContain('name: publishedAt');
      expect(content).toContain('name: draft');
      expect(content).toContain('name: category');
    });
  });

  describe('Astro Content Collections Schema & Sample Articles', () => {
    const blogContentDir = path.join(rootDir, 'src/content/blog');

    it('verifies src/content.config.ts exists and defines blog collection', () => {
      const configPath = path.join(rootDir, 'src/content.config.ts');
      expect(fs.existsSync(configPath)).toBe(true);

      const configContent = fs.readFileSync(configPath, 'utf-8');
      expect(configContent).toContain("defineCollection");
      expect(configContent).toContain("collections = { blog }");
    });

    it('verifies all sample blog articles exist with valid Indonesian content and frontmatter', () => {
      const expectedArticles = [
        'cara-menghitung-keuntungan-jualan-online.md',
        'cara-menentukan-harga-jual-produk.md',
        'memahami-biaya-marketplace-sebelum-jualan.md',
      ];

      for (const fileName of expectedArticles) {
        const filePath = path.join(blogContentDir, fileName);
        expect(fs.existsSync(filePath), `Article ${fileName} must exist`).toBe(true);

        const content = fs.readFileSync(filePath, 'utf-8');
        expect(content).toContain('title:');
        expect(content).toContain('description:');
        expect(content).toContain('publishedAt:');
        expect(content).toContain('category:');
        expect(content).toContain('draft: false');

        // Check for calculation accuracy references
        expect(content).toMatch(/Rp\s*[\d.]+/);
      }
    });
  });

  describe('Blog Generated HTML Verification', () => {
    it('verifies /blog/index.html is generated with correct title, search container, and articles', () => {
      const blogIndexPath = path.join(distDir, 'blog', 'index.html');
      expect(fs.existsSync(blogIndexPath)).toBe(true);

      const html = fs.readFileSync(blogIndexPath, 'utf-8');
      expect(html).toContain('<title>Blog Edukasi &amp; Tips Jualan Online — KalkulatorSeller</title>');
      expect(html).toContain('id="blog-search-container"');
      expect(html).toContain('blog-card-item');
      expect(html).toContain('Semua Artikel');
    });

    it('verifies article detail pages have single H1, TOC, and correct JSON-LD BlogPosting schema', () => {
      const articlePath = path.join(distDir, 'blog', 'cara-menghitung-keuntungan-jualan-online', 'index.html');
      expect(fs.existsSync(articlePath)).toBe(true);

      const html = fs.readFileSync(articlePath, 'utf-8');

      // Exactly ONE H1 tag
      const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi);
      expect(h1Matches).not.toBeNull();
      expect(h1Matches.length).toBe(1);

      // Open Graph Article Type
      expect(html).toContain('<meta property="og:type" content="article">');

      // JSON-LD Schemas: BreadcrumbList and BlogPosting
      expect(html).toContain('"@type":"BlogPosting"');
      expect(html).toContain('"@type":"BreadcrumbList"');
      expect(html).toContain('"publisher"');

      // Table of contents
      expect(html).toContain('aria-label="Daftar Isi Artikel"');

      // Calculator CTA
      expect(html).toContain('Alat Bantu Gratis untuk Seller');
    });

    it('verifies tag archive pages are generated with noindex tag to protect crawl budget', () => {
      const tagPath = path.join(distDir, 'blog', 'tag', 'shopee', 'index.html');
      expect(fs.existsSync(tagPath)).toBe(true);

      const html = fs.readFileSync(tagPath, 'utf-8');
      expect(html).toContain('<meta name="robots" content="noindex, nofollow"');
    });
  });

  describe('Blog Pagination Verification', () => {
    it('verifies /blog/index.html contains active page 1 and link to page 2', () => {
      const blogIndexPath = path.join(distDir, 'blog', 'index.html');
      const html = fs.readFileSync(blogIndexPath, 'utf-8');

      expect(html).toContain('id="blog-pagination-wrapper"');
      expect(html).toContain('aria-label="Navigasi Halaman Artikel"');
      expect(html).toContain('Halaman 1 dari 2');
      expect(html).toContain('href="/blog/page/2/"');
    });

    it('verifies /blog/page/2/index.html is statically generated with correct canonical, pagination, and articles', () => {
      const page2Path = path.join(distDir, 'blog', 'page', '2', 'index.html');
      expect(fs.existsSync(page2Path)).toBe(true);

      const html = fs.readFileSync(page2Path, 'utf-8');
      expect(html).toContain('<title>Blog Edukasi &amp; Tips Jualan Online — Halaman 2 — KalkulatorSeller</title>');
      expect(html).toContain('<link rel="canonical" href="https://kalkulatorseller.pages.dev/blog/page/2/">');
      expect(html).toContain('Halaman 2 dari 2');
      expect(html).toContain('href="/blog/"');
      expect(html).toContain('aria-label="Ke halaman sebelumnya"');
    });

    it('verifies sitemap.xml includes paginated blog route', () => {
      const sitemapPath = path.join(distDir, 'sitemap.xml');
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
      expect(sitemapContent).toContain('https://kalkulatorseller.pages.dev/blog/page/2/');
    });
  });
});
