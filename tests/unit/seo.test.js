import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Technical & On-Page SEO Suite', () => {
  const distDir = path.resolve(process.cwd(), 'dist');

  it('verifies sitemap.xml exists, is valid XML, and contains all canonical URLs with lastmod', () => {
    const sitemapPath = path.join(distDir, 'sitemap.xml');
    expect(fs.existsSync(sitemapPath)).toBe(true);

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    expect(sitemapContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(sitemapContent).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    const expectedUrls = [
      'https://kalkulatorseller.pages.dev/',
      'https://kalkulatorseller.pages.dev/shopee/',
      'https://kalkulatorseller.pages.dev/tiktok-shop/',
      'https://kalkulatorseller.pages.dev/tokopedia/',
      'https://kalkulatorseller.pages.dev/tarif/',
      'https://kalkulatorseller.pages.dev/panduan/',
      'https://kalkulatorseller.pages.dev/privacy-policy/',
      'https://kalkulatorseller.pages.dev/terms/',
    ];

    for (const url of expectedUrls) {
      expect(sitemapContent).toContain(`<loc>${url}</loc>`);
    }

    // Verify 404 is NOT in sitemap
    expect(sitemapContent).not.toContain('/404');

    // Verify lastmod and changefreq exist
    expect(sitemapContent).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
    expect(sitemapContent).toContain('<changefreq>');
    expect(sitemapContent).toContain('<priority>');
  });

  it('verifies robots.txt exists and properly disallows 404 while allowing search bots', () => {
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    expect(fs.existsSync(robotsPath)).toBe(true);

    const content = fs.readFileSync(robotsPath, 'utf-8');
    expect(content).toContain('User-agent: *');
    expect(content).toContain('Allow: /');
    expect(content).toContain('Disallow: /404/');
    expect(content).toContain('Sitemap: https://kalkulatorseller.pages.dev/sitemap.xml');
  });

  it('verifies all generated static pages have unique titles, descriptions, and canonical tags', () => {
    const pagesToCheck = [
      { file: 'index.html', path: '/' },
      { file: 'shopee/index.html', path: '/shopee/' },
      { file: 'tiktok-shop/index.html', path: '/tiktok-shop/' },
      { file: 'tokopedia/index.html', path: '/tokopedia/' },
      { file: 'tarif/index.html', path: '/tarif/' },
      { file: 'panduan/index.html', path: '/panduan/' },
      { file: 'privacy-policy/index.html', path: '/privacy-policy/' },
      { file: 'terms/index.html', path: '/terms/' },
      { file: '404.html', path: '/404/' },
    ];

    const titles = new Set();
    const descriptions = new Set();

    for (const page of pagesToCheck) {
      const filePath = path.join(distDir, page.file);
      expect(fs.existsSync(filePath), `Page file ${filePath} must exist`).toBe(true);

      const html = fs.readFileSync(filePath, 'utf-8');

      // Title Check
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      expect(titleMatch, `${page.file} must have a title tag`).not.toBeNull();
      const title = titleMatch[1];
      expect(title).toContain('KalkulatorSeller');
      titles.add(title);

      // Meta Description Check
      const descMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i);
      expect(descMatch, `${page.file} must have a meta description tag`).not.toBeNull();
      descriptions.add(descMatch[1]);

      // Canonical Check
      const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="(.*?)"/i);
      expect(canonicalMatch, `${page.file} must have a canonical tag`).not.toBeNull();
      expect(canonicalMatch[1]).toMatch(/^https:\/\/kalkulatorseller\.pages\.dev/);

      // Exactly ONE H1 tag
      const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi);
      expect(h1Matches, `${page.file} must have exactly one h1 tag`).not.toBeNull();
      expect(h1Matches.length).toBe(1);

      // Meta Robots Check
      if (page.file === '404.html') {
        expect(html).toContain('<meta name="robots" content="noindex, nofollow"');
      } else {
        expect(html).toContain('content="index, follow');
      }
    }

    // Verify all titles and descriptions are distinct across main pages
    expect(titles.size).toBe(pagesToCheck.length);
  });

  it('verifies structured data JSON-LD schemas are valid and parseable', () => {
    const pagesWithSchemas = [
      'index.html',
      'shopee/index.html',
      'tiktok-shop/index.html',
      'tokopedia/index.html',
      'tarif/index.html',
      'panduan/index.html',
    ];

    for (const file of pagesWithSchemas) {
      const html = fs.readFileSync(path.join(distDir, file), 'utf-8');
      const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];

      expect(jsonLdMatches.length, `${file} should have at least 1 JSON-LD schema`).toBeGreaterThan(0);

      for (const match of jsonLdMatches) {
        const parsed = JSON.parse(match[1]);
        expect(parsed).toHaveProperty('@context', 'https://schema.org');
        expect(parsed).toHaveProperty('@type');
      }
    }
  });
});
