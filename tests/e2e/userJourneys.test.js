import { describe, it, expect, beforeEach } from 'vitest';
import { calculateForward } from '../../src/engine/forwardPricing.js';
import { calculateReverse } from '../../src/engine/reversePricing.js';
import { getSavedSkus, saveSkuItem, deleteSkuItem, clearAllSavedSkus } from '../../src/utils/storage.js';
import { generateSkuCsv } from '../../src/utils/exportCsv.js';
import { generateJsonBackup, validateJsonBackup } from '../../src/utils/backup.js';

import shopeeConfig from '../../src/data/tariffs/shopee.json';
import tiktokConfig from '../../src/data/tariffs/tiktok-shop.json';
import tokopediaConfig from '../../src/data/tariffs/tokopedia.json';

// In-memory mock for localStorage in Node test runner
let mockLocalStorage = {};
beforeEach(() => {
  mockLocalStorage = {};
  global.window = {
    localStorage: {
      getItem: (key) => mockLocalStorage[key] || null,
      setItem: (key, val) => {
        mockLocalStorage[key] = String(val);
      },
      removeItem: (key) => {
        delete mockLocalStorage[key];
      },
      clear: () => {
        mockLocalStorage = {};
      },
    },
  };
  global.localStorage = global.window.localStorage;
});

describe('E2E User Journeys (Journeys 1 - 8)', () => {
  describe('Journey 1: New Visitor Onboarding & Default Initial State', () => {
    it('should initialize with valid default parameters and calculate immediate baseline profit', () => {
      // Default parameters as defined in UI spec
      const defaultState = {
        platformConfig: shopeeConfig,
        price: 100000,
        sellerDiscount: 0,
        hpp: 60000,
        qty: 1,
        storeType: 'non_star',
        category: 'cat_a',
        operationalCosts: [{ id: 'packing', amount: 2000, unit: 'per_item' }],
        adsCost: 0,
        affiliateCost: 0,
      };

      const result = calculateForward(defaultState);

      expect(result.ok).toBe(true);
      expect(result.totals.effectiveRevenue).toBe(100000);
      expect(result.totals.cogs).toBe(60000);
      expect(result.totals.grossProfit).toBe(40000);
      // Fee: Admin 6.5% = 6.500, Biaya proses flat = 1.000 -> 7.500
      expect(result.totals.marketplaceFees).toBe(7500);
      expect(result.totals.profitAfterMarketplace).toBe(32500);
      // Ops: 2000 -> 30.500
      expect(result.totals.netProfit).toBe(30500);
      expect(result.ratios.netMargin).toBeCloseTo(0.305, 3);
      expect(result.ratios.roi).toBeCloseTo(30500 / 62000, 3);
    });
  });

  describe('Journey 2: Product Profit Calculation (Forward Pricing Detailed)', () => {
    it('should compute full 4-tier profit and unit economics for apparel order with discount and promos', () => {
      // Scenario: Fashion item on Shopee
      // Katalog: Rp 150.000, Diskon: Rp 15.000 -> Efektif: Rp 135.000
      // Qty: 2 -> Total Revenue: Rp 270.000
      // HPP: Rp 70.000 -> Total COGS: Rp 140.000
      // Store: Star Seller (Cat A admin = 7.5% -> 0.075 * 135.000 = 10.125 * 2 = Rp 20.250)
      // Programs: Gratis Ongkir XTRA (4% -> 5.400 * 2 = Rp 10.800)
      // Flat order fee: Rp 1.000
      // Total marketplace fees: 20.250 + 10.800 + 1.000 = Rp 32.050
      // Ops: Rp 2.500/item (Rp 5.000 total)
      // Ads: Rp 5.000 total order
      // Affiliate: Rp 2.000 total order
      const result = calculateForward({
        platformConfig: shopeeConfig,
        price: 150000,
        sellerDiscount: 15000,
        hpp: 70000,
        qty: 2,
        storeType: 'star',
        category: 'cat_a',
        selectedPrograms: ['gratis_ongkir_xtra'],
        operationalCosts: [{ id: 'packing', amount: 2500, unit: 'per_item', isDirect: true }],
        adsCost: 5000,
        affiliateCost: 2000,
      });

      expect(result.ok).toBe(true);
      expect(result.totals.effectiveRevenue).toBe(270000);
      expect(result.totals.cogs).toBe(140000);
      expect(result.totals.grossProfit).toBe(130000);
      expect(result.totals.marketplaceFees).toBe(32050);
      expect(result.totals.profitAfterMarketplace).toBe(97950);
      expect(result.totals.operationalCosts).toBe(5000);
      expect(result.totals.profitAfterOperations).toBe(92950);
      // Net Profit: 92.950 - 5.000 - 2.000 = Rp 85.950
      expect(result.totals.netProfit).toBe(85950);

      // Per unit inspection
      expect(result.perUnit.effectivePrice).toBe(135000);
      expect(result.perUnit.netProfit).toBe(Math.round(85950 / 2));
    });
  });

  describe('Journey 3: Reverse Target Pricing (Target Net Profit to Selling Price)', () => {
    it('should calculate minimum viable selling price to hit target profit of Rp 40.000', () => {
      const targetProfit = 40000;
      const reverseResult = calculateReverse({
        platformConfig: shopeeConfig,
        targetProfit,
        targetType: 'per_unit',
        hpp: 60000,
        qty: 1,
        storeType: 'non_star',
        category: 'cat_a',
        operationalCosts: [{ id: 'packing', amount: 2000, unit: 'per_item' }],
        adsCost: 3000,
        roundingStep: 100,
      });

      expect(reverseResult.ok).toBe(true);
      const recommendedPrice = reverseResult.recommendedPrice;

      // Verify that this price achieves target profit
      const fwd = calculateForward({
        platformConfig: shopeeConfig,
        price: recommendedPrice,
        hpp: 60000,
        qty: 1,
        storeType: 'non_star',
        category: 'cat_a',
        operationalCosts: [{ id: 'packing', amount: 2000, unit: 'per_item' }],
        adsCost: 3000,
      });

      expect(fwd.totals.netProfit).toBeGreaterThanOrEqual(targetProfit);

      // Verify that a price Rp 100 lower falls below target profit (exact minimality)
      const fwdLower = calculateForward({
        platformConfig: shopeeConfig,
        price: recommendedPrice - 100,
        hpp: 60000,
        qty: 1,
        storeType: 'non_star',
        category: 'cat_a',
        operationalCosts: [{ id: 'packing', amount: 2000, unit: 'per_item' }],
        adsCost: 3000,
      });

      expect(fwdLower.totals.netProfit).toBeLessThan(targetProfit);
    });
  });

  describe('Journey 4: Cross-Marketplace Comparison', () => {
    it('should compare fee structures and net margins across Shopee, TikTok Shop, and Tokopedia', () => {
      const baseParams = {
        price: 120000,
        sellerDiscount: 0,
        hpp: 60000,
        qty: 1,
        operationalCosts: [{ id: 'packing', amount: 2000, unit: 'per_item' }],
      };

      // 1. Shopee (Non-Star, Cat A: Fashion 6.5% + 1.000 flat = 8.800)
      const shopee = calculateForward({
        ...baseParams,
        platformConfig: shopeeConfig,
        storeType: 'non_star',
        category: 'cat_a',
      });

      // 2. TikTok Shop (Fashion: Komisi 6.0% + 1.000 flat = 8.200)
      const tiktok = calculateForward({
        ...baseParams,
        platformConfig: tiktokConfig,
        category: 'fashion',
      });

      // 3. Tokopedia (Power Merchant, Grup 1: Fashion 6.5% + 1.000 flat = 8.800)
      const tokopedia = calculateForward({
        ...baseParams,
        platformConfig: tokopediaConfig,
        storeType: 'power_merchant',
        category: 'grup_1',
      });

      expect(shopee.totals.marketplaceFees).toBe(8800);
      expect(tiktok.totals.marketplaceFees).toBe(8200);
      expect(tokopedia.totals.marketplaceFees).toBe(8800);

      // TikTok commission (6.0%) is lower than Shopee/Tokopedia (6.5%), yielding higher net profit
      expect(tiktok.totals.netProfit).toBeGreaterThan(shopee.totals.netProfit);
      expect(tiktok.totals.netProfit).toBeGreaterThan(tokopedia.totals.netProfit);
      expect(shopee.totals.netProfit).toBe(tokopedia.totals.netProfit);
    });
  });

  describe('Journey 5: LocalStorage SKU Management CRUD Lifecycle', () => {
    it('should execute full create, read, update, delete, and clear operations reliably', () => {
      expect(getSavedSkus()).toEqual([]);

      // 1. Create SKU 1
      const sku1Data = {
        id: 'sku_001',
        name: 'Kemeja Katun Polos Premium',
        platform: 'shopee',
        price: 150000,
        sellerDiscount: 10000,
        hpp: 75000,
        qty: 1,
        netProfit: 45000,
        netMargin: 0.3214,
      };
      const saveRes1 = saveSkuItem(sku1Data);
      expect(saveRes1.ok).toBe(true);

      // 2. Read list
      let list = getSavedSkus();
      expect(list.length).toBe(1);
      expect(list[0].id).toBe('sku_001');
      expect(list[0].name).toBe('Kemeja Katun Polos Premium');

      // 3. Update SKU 1
      const updatedSku1 = { ...sku1Data, price: 160000, netProfit: 52000 };
      saveSkuItem(updatedSku1);
      list = getSavedSkus();
      expect(list.length).toBe(1);
      expect(list[0].price).toBe(160000);
      expect(list[0].netProfit).toBe(52000);

      // 4. Create SKU 2
      const sku2Data = {
        id: 'sku_002',
        name: 'Sepatu Sneaker Kasual',
        platform: 'tokopedia',
        price: 250000,
        hpp: 130000,
        qty: 1,
        netProfit: 80000,
      };
      saveSkuItem(sku2Data);
      list = getSavedSkus();
      expect(list.length).toBe(2);

      // 5. Delete SKU 1
      const delRes = deleteSkuItem('sku_001');
      expect(delRes.ok).toBe(true);
      list = getSavedSkus();
      expect(list.length).toBe(1);
      expect(list[0].id).toBe('sku_002');

      // 6. Clear all
      const clearRes = clearAllSavedSkus();
      expect(clearRes.ok).toBe(true);
      expect(getSavedSkus()).toEqual([]);
    });
  });

  describe('Journey 6: CSV Export with Security Formula Injection Defense', () => {
    it('should generate valid UTF-8 CSV and neutralize all malicious formula injection prefixes', () => {
      const testSkus = [
        {
          id: '1',
          name: '=CMD|"/C calc"!A0', // Excel command injection
          platform: 'shopee',
          price: 100000,
          hpp: 50000,
          netProfit: 35000,
          netMargin: 0.35,
        },
        {
          id: '2',
          name: '+1234567890', // Plus prefix
          platform: 'tiktok-shop',
          price: 120000,
          hpp: 60000,
          netProfit: 40000,
          netMargin: 0.33,
        },
        {
          id: '3',
          name: '-SUM(A1:A5)', // Minus formula prefix
          platform: 'tokopedia',
          price: 90000,
          hpp: 45000,
          netProfit: 28000,
          netMargin: 0.31,
        },
        {
          id: '4',
          name: '@SUM(B1:B10)', // At-sign prefix
          platform: 'shopee',
          price: 80000,
          hpp: 40000,
          netProfit: 25000,
          netMargin: 0.31,
        },
      ];

      const csvContent = generateSkuCsv(testSkus);

      // Verify UTF-8 BOM
      expect(csvContent.charCodeAt(0)).toBe(0xFEFF);

      // Verify Headers
      expect(csvContent).toContain('ID SKU,Nama Produk,Platform,Harga Katalog (Rp)');

      // Verify Formula Injection Defense: Each dangerous prefix is neutralized with single quote prefix
      expect(csvContent).toContain("\"'=CMD|\"\"/C calc\"\"!A0\""); // wrapped in quotes with prepended single quote
      expect(csvContent).toContain("'+1234567890");
      expect(csvContent).toContain("'-SUM(A1:A5)");
      expect(csvContent).toContain("'@SUM(B1:B10)");
    });
  });

  describe('Journey 7: JSON Backup, Restore & Resilience', () => {
    it('should backup and restore clean JSON and reject corrupt or dangerous payloads', () => {
      const originalSkus = [
        {
          id: 'item_1',
          name: 'Produk Asli',
          platform: 'shopee',
          price: 100000,
          hpp: 50000,
          qty: 1,
          netProfit: 35000,
        },
      ];

      // 1. Generate Backup
      const backupJson = generateJsonBackup(originalSkus);
      expect(typeof backupJson).toBe('string');

      // 2. Validate Valid Backup
      const validation = validateJsonBackup(backupJson);
      expect(validation.ok).toBe(true);
      expect(validation.items.length).toBe(1);
      expect(validation.items[0].name).toBe('Produk Asli');

      // 3. Resilience against Corrupted Syntax
      const corruptJson = '{ "app": "KalkulatorSeller", "items": [ unclosed syntax ';
      const corruptRes = validateJsonBackup(corruptJson);
      expect(corruptRes.ok).toBe(false);
      expect(corruptRes.error).toContain('File JSON rusak');

      // 4. Resilience against Non-Object Payloads
      const nullRes = validateJsonBackup(null);
      expect(nullRes.ok).toBe(false);

      // 5. Resilience against Malformed items array
      const noItemsJson = JSON.stringify({ app: 'KalkulatorSeller', schemaVersion: '1.0.0' });
      const noItemsRes = validateJsonBackup(noItemsJson);
      expect(noItemsRes.ok).toBe(false);
      expect(noItemsRes.error).toContain('tidak memuat daftar produk');

      // 6. Resilience against Oversized Payload (> 5MB)
      const oversizedString = 'x'.repeat(5 * 1024 * 1024 + 10);
      const oversizedRes = validateJsonBackup(oversizedString);
      expect(oversizedRes.ok).toBe(false);
      expect(oversizedRes.error).toContain('melebihi batas 5MB');
    });
  });

  describe('Journey 8: Form Reset and Storage Cleanliness', () => {
    it('should maintain strict storage isolation with zero state contamination', () => {
      // Save item
      saveSkuItem({ name: 'Temp Item', price: 50000, hpp: 20000 });
      expect(getSavedSkus().length).toBe(1);

      // Perform clean wipe
      clearAllSavedSkus();
      expect(getSavedSkus().length).toBe(0);

      // Re-read storage
      const freshList = getSavedSkus();
      expect(freshList).toEqual([]);
    });
  });
});
