import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Responsive Standards & Multi-Device Verification', () => {
  it('should verify design tokens contain mobile touch target standards (>= 44px)', () => {
    const tokensPath = path.resolve(process.cwd(), 'src/styles/tokens.css');
    const cssContent = fs.readFileSync(tokensPath, 'utf-8');

    expect(cssContent).toContain('min-height: 44px');
    expect(cssContent).toContain('touch-action: manipulation');
    expect(cssContent).toContain('-webkit-tap-highlight-color: transparent');
    expect(cssContent).toContain('tabular-nums');
  });

  it('should verify HTML contains viewport meta and zero desktop-only fixed widths', () => {
    const indexPath = path.resolve(process.cwd(), 'dist/index.html');
    expect(fs.existsSync(indexPath)).toBe(true);
    const html = fs.readFileSync(indexPath, 'utf-8');

    // 1. Viewport meta tag
    expect(html).toContain('name="viewport" content="width=device-width, initial-scale=1.0"');

    // 2. Mobile navigation button & drawer
    expect(html).toContain('id="mobile-menu-toggle-btn"');
    expect(html).toContain('id="mobile-nav-panel"');

    // 3. Mobile sticky bottom summary bar
    expect(html).toContain('id="mobile-sticky-summary"');
    expect(html).toContain('id="mobile-sticky-net-val"');
    expect(html).toContain('id="mobile-view-details-btn"');

    // 4. Saved SKU mobile cards container
    expect(html).toContain('id="saved-sku-cards"');

    // 5. Overflow safety
    expect(html).toContain('overflow-x-hidden');
  });

  it('should verify tariff table has mobile scroll hint and min-width preservation', () => {
    const tarifPath = path.resolve(process.cwd(), 'dist/tarif/index.html');
    expect(fs.existsSync(tarifPath)).toBe(true);
    const html = fs.readFileSync(tarifPath, 'utf-8');

    expect(html).toContain('Geser tabel ke samping');
    expect(html).toContain('min-w-[560px]');
  });
});
