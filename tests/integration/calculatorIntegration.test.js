import { describe, it, expect } from 'vitest';
import shopeeConfig from '../../src/data/tariffs/shopee.json';
import tiktokConfig from '../../src/data/tariffs/tiktok-shop.json';
import tokopediaConfig from '../../src/data/tariffs/tokopedia.json';
import { calculateForward } from '../../src/engine/forwardPricing.js';
import { calculateReverse } from '../../src/engine/reversePricing.js';
import { generateSkuCsv } from '../../src/utils/exportCsv.js';
import { generateJsonBackup, validateJsonBackup } from '../../src/utils/backup.js';

describe('Calculator Multi-Platform Integration Suite', () => {
  it('should calculate forward pricing correctly across all three MVP platforms', () => {
    const testCases = [
      { config: shopeeConfig, platform: 'shopee', storeType: 'star', cat: 'cat_a' },
      { config: tiktokConfig, platform: 'tiktok-shop', storeType: 'regular', cat: 'fashion' },
      { config: tokopediaConfig, platform: 'tokopedia', storeType: 'power_merchant', cat: 'grup_1' },
    ];

    testCases.forEach(({ config, platform, storeType, cat }) => {
      const res = calculateForward({
        platformConfig: config,
        price: 150000,
        sellerDiscount: 10000,
        hpp: 75000,
        qty: 2,
        storeType,
        category: cat,
        operationalCosts: [{ id: 'packing', amount: 2500, unit: 'per_item' }],
      });

      expect(res.ok).toBe(true);
      expect(res.totals.effectiveRevenue).toBe(280000); // (150000 - 10000) * 2
      expect(res.totals.cogs).toBe(150000); // 75000 * 2
      expect(res.totals.grossProfit).toBe(130000);
      expect(res.totals.marketplaceFees).toBeGreaterThan(0);
      expect(res.totals.profitAfterMarketplace).toBeLessThan(res.totals.grossProfit);
      expect(res.totals.netProfit).toBeLessThanOrEqual(res.totals.profitAfterOperations);
      expect(res.ratios.netMargin).toBeGreaterThan(0);
      expect(res.ratios.roi).toBeGreaterThan(0);
    });
  });

  it('should calculate reverse pricing and satisfy targets across all three platforms', () => {
    const configs = [shopeeConfig, tiktokConfig, tokopediaConfig];

    configs.forEach((config) => {
      const res = calculateReverse({
        platformConfig: config,
        targetProfit: 30000,
        targetType: 'per_unit',
        hpp: 60000,
        qty: 1,
        operationalCosts: [{ id: 'packing', amount: 3000, unit: 'per_item' }],
        roundingStep: 100,
      });

      expect(res.ok).toBe(true);
      expect(res.recommendedPrice).toBeGreaterThan(90000);
      expect(res.forwardResult.totals.netProfit).toBeGreaterThanOrEqual(30000);
    });
  });

  it('should end-to-end generate CSV and restore backup safely', () => {
    const sampleItems = [
      {
        id: 'sku_1',
        name: 'Baju Kaos Katun',
        platform: 'shopee',
        price: 85000,
        sellerDiscount: 5000,
        hpp: 40000,
        qty: 1,
        netProfit: 25000,
        netMargin: 0.3125,
      },
      {
        id: 'sku_2',
        name: 'Serum Wajah Glow',
        platform: 'tiktok-shop',
        price: 120000,
        sellerDiscount: 0,
        hpp: 50000,
        qty: 1,
        netProfit: 45000,
        netMargin: 0.375,
      },
    ];

    // CSV test
    const csv = generateSkuCsv(sampleItems);
    expect(csv).toContain('Baju Kaos Katun');
    expect(csv).toContain('Serum Wajah Glow');

    // JSON backup & restore test
    const backupJson = generateJsonBackup(sampleItems);
    const restored = validateJsonBackup(backupJson);
    expect(restored.ok).toBe(true);
    expect(restored.count).toBe(2);
    expect(restored.items[0].name).toBe('Baju Kaos Katun');
    expect(restored.items[1].name).toBe('Serum Wajah Glow');
  });
});
