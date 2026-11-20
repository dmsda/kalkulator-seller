import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Release Gate Verification (Anti-Slop, Accessibility, Security, SEO)', () => {
  const rootDir = process.cwd();

  describe('Gate 1: Anti-Slop Visual Direction & Design Tokens', () => {
    it('should use system font stack and zero third-party font tracking calls', () => {
      const tokensCss = fs.readFileSync(path.join(rootDir, 'src/styles/tokens.css'), 'utf-8');
      const baseLayout = fs.readFileSync(path.join(rootDir, 'src/layouts/BaseLayout.astro'), 'utf-8');

      // Verify system font stack
      expect(tokensCss).toContain('--font-sans: ui-sans-serif, system-ui');
      expect(tokensCss).toContain('--font-mono: ui-monospace');

      // Zero third-party font calls (e.g. fonts.googleapis.com, typekit, cdnfonts)
      expect(tokensCss).not.toContain('fonts.googleapis.com');
      expect(baseLayout).not.toContain('fonts.googleapis.com');
      expect(baseLayout).not.toContain('fonts.gstatic.com');
      expect(baseLayout).not.toContain('use.typekit.net');
    });

    it('should respect brand color palette without generic AI gradients or glassmorphism', () => {
      const tokensCss = fs.readFileSync(path.join(rootDir, 'src/styles/tokens.css'), 'utf-8');

      expect(tokensCss).toContain('--color-brand-primary: #14213D');
      expect(tokensCss).toContain('--color-brand-accent: #FCA311');
      expect(tokensCss).toContain('--color-canvas: #FFFFFF');

      // No AI slop glassmorphism
      expect(tokensCss).not.toContain('backdrop-blur-xl');
      expect(tokensCss).not.toContain('backdrop-filter: blur');
    });

    it('should maintain clean 1px borders on inputs and eliminate thick double rings', () => {
      const tokensCss = fs.readFileSync(path.join(rootDir, 'src/styles/tokens.css'), 'utf-8');

      expect(tokensCss).toContain('border-width: 1px !important;');
      expect(tokensCss).toContain('outline: none !important;');
      expect(tokensCss).toContain('box-shadow: none !important;');
    });

    it('should enforce touch targets of at least 44px for touch action elements', () => {
      const tokensCss = fs.readFileSync(path.join(rootDir, 'src/styles/tokens.css'), 'utf-8');
      expect(tokensCss).toContain('min-height: 44px;');
      expect(tokensCss).toContain('touch-action: manipulation;');
    });
  });

  describe('Gate 2: Accessibility & Usability (WCAG 2.2 AA)', () => {
    it('should declare language as Indonesian ("id") and main landmark in BaseLayout', () => {
      const baseLayout = fs.readFileSync(path.join(rootDir, 'src/layouts/BaseLayout.astro'), 'utf-8');

      expect(baseLayout).toContain('<html lang="id">');
      expect(baseLayout).toContain('<main id="main-content"');
    });

    it('should provide visible focus styling in CSS tokens', () => {
      const tokensCss = fs.readFileSync(path.join(rootDir, 'src/styles/tokens.css'), 'utf-8');

      expect(tokensCss).toContain('a:focus-visible');
      expect(tokensCss).toContain('button:focus-visible');
      expect(tokensCss).toContain('outline: 1.5px solid var(--color-brand-primary)');
    });

    it('should include ARIA attributes in Calculator and Header components', () => {
      const calculator = fs.readFileSync(path.join(rootDir, 'src/components/Calculator.astro'), 'utf-8');
      const header = fs.readFileSync(path.join(rootDir, 'src/components/Header.astro'), 'utf-8');

      expect(header).toContain('aria-label');
      expect(calculator).toContain('aria-label');
    });
  });

  describe('Gate 3: Security & Privacy Compliance', () => {
    it('should contain zero third-party tracking scripts or external telemetry', () => {
      const baseLayout = fs.readFileSync(path.join(rootDir, 'src/layouts/BaseLayout.astro'), 'utf-8');

      const forbiddenTrackers = [
        'google-analytics.com',
        'googletagmanager.com',
        'connect.facebook.net',
        'hotjar.com',
        'mixpanel.com',
        'amplitude.com',
        'clarity.ms',
      ];

      for (const tracker of forbiddenTrackers) {
        expect(baseLayout).not.toContain(tracker);
      }
    });

    it('should enforce safe LocalStorage schema versioning', () => {
      const storageJs = fs.readFileSync(path.join(rootDir, 'src/utils/storage.js'), 'utf-8');

      expect(storageJs).toContain("STORAGE_KEY = 'kalkulatorseller_skus_v1'");
      expect(storageJs).toContain("SCHEMA_VERSION = '1.0.0'");
    });
  });

  describe('Gate 4: Technical SEO Compliance', () => {
    it('should contain canonical URL, meta robots, and OpenGraph tags in BaseLayout', () => {
      const baseLayout = fs.readFileSync(path.join(rootDir, 'src/layouts/BaseLayout.astro'), 'utf-8');

      expect(baseLayout).toContain('<link rel="canonical"');
      expect(baseLayout).toContain('<meta name="robots"');
      expect(baseLayout).toContain('<meta property="og:type" content="website" />');
      expect(baseLayout).toContain('<meta property="og:site_name" content="KalkulatorSeller" />');
      expect(baseLayout).toContain('<meta property="og:locale" content="id_ID" />');
    });

    it('should provide dynamic sitemap.xml with trailing slashes across all primary routes', () => {
      const sitemap = fs.readFileSync(path.join(rootDir, 'src/pages/sitemap.xml.js'), 'utf-8');

      expect(sitemap).toContain("url: '/'");
      expect(sitemap).toContain("url: '/shopee/'");
      expect(sitemap).toContain("url: '/tiktok-shop/'");
      expect(sitemap).toContain("url: '/tokopedia/'");
      expect(sitemap).toContain("url: '/tarif/'");
      expect(sitemap).toContain("url: '/panduan/'");
      expect(sitemap).toContain("url: '/privacy-policy/'");
      expect(sitemap).toContain("url: '/terms/'");
    });
  });
});
