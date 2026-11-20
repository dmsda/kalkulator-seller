import { describe, it, expect } from 'vitest';
import { calculateForward } from '../../src/engine/forwardPricing.js';
import shopeeConfig from '../../src/data/tariffs/shopee.json';

describe('Forward Pricing Engine (Phase 3)', () => {
  it('should calculate accurately when Price > HPP for single item', () => {
    // Katalog: Rp 100.000, Diskon: Rp 10.000 -> Efektif: Rp 90.000
    // HPP: Rp 50.000, Qty: 1
    // Shopee Non-star Cat A admin: 6.5% of Rp 90.000 = Rp 5.850
    // Biaya proses flat per order: Rp 1.000
    // Total Marketplace: Rp 6.850
    // Gross profit: 90.000 - 50.000 = Rp 40.000
    // Profit after marketplace: 40.000 - 6.850 = Rp 33.150
    const result = calculateForward({
      platformConfig: shopeeConfig,
      price: 100000,
      sellerDiscount: 10000,
      hpp: 50000,
      qty: 1,
      storeType: 'non_star',
      category: 'cat_a',
      operationalCosts: [{ id: 'packing', amount: 2000, unit: 'per_item' }],
      adsCost: 3000,
      affiliateCost: 0,
    });

    expect(result.ok).toBe(true);
    expect(result.totals.effectiveRevenue).toBe(90000);
    expect(result.totals.cogs).toBe(50000);
    expect(result.totals.marketplaceFees).toBe(6850);
    expect(result.totals.grossProfit).toBe(40000);
    expect(result.totals.profitAfterMarketplace).toBe(33150);
    // Ops: 2000 -> profitAfterOperations: 33150 - 2000 = 31150
    expect(result.totals.profitAfterOperations).toBe(31150);
    // Ads: 3000 -> netProfit: 31150 - 3000 = 28150
    expect(result.totals.netProfit).toBe(28150);

    // Margin: 28150 / 90000 = 0.31277...
    expect(result.ratios.netMargin).toBeCloseTo(28150 / 90000, 4);
    // ROI: netProfit / (cogs + directOps) = 28150 / (50000 + 2000) = 28150 / 52000
    expect(result.ratios.roi).toBeCloseTo(28150 / 52000, 4);
  });

  it('should correctly handle multi-quantity order with per_item vs per_order fees', () => {
    // Qty: 3
    // Price: Rp 100.000, Disc: 0 -> Efektif: Rp 100.000
    // Revenue: Rp 300.000
    // Fee per item (6.5%): Rp 6.500 * 3 = Rp 19.500
    // Fee per order (Biaya proses): Rp 1.000 (tetap Rp 1.000, BUKAN 3.000!)
    // Total Marketplace: Rp 20.500
    const result = calculateForward({
      platformConfig: shopeeConfig,
      price: 100000,
      sellerDiscount: 0,
      hpp: 60000,
      qty: 3,
      storeType: 'non_star',
      category: 'cat_a',
      operationalCosts: [{ id: 'packing', amount: 1500, unit: 'per_item' }],
    });

    expect(result.ok).toBe(true);
    expect(result.totals.effectiveRevenue).toBe(300000);
    expect(result.totals.cogs).toBe(180000);
    expect(result.totals.marketplaceFees).toBe(20500);

    // Per unit breakdown
    expect(result.perUnit.marketplaceFees).toBe(Math.round(20500 / 3));
  });

  it('should apply fee cap correctly (e.g. Gratis Ongkir XTRA cap Rp 10.000)', () => {
    // Price: Rp 500.000 -> 4.0% = Rp 20.000
    // Cap: Rp 10.000 per_item -> Fee must be capped at Rp 10.000
    const result = calculateForward({
      platformConfig: shopeeConfig,
      price: 500000,
      sellerDiscount: 0,
      hpp: 300000,
      qty: 1,
      storeType: 'non_star',
      category: 'cat_a',
      selectedPrograms: ['gratis_ongkir_xtra'],
    });

    expect(result.ok).toBe(true);
    expect(result.flags.cappedFees).toBe(true);
    const gratisOngkirFee = result.feeBreakdown.find((f) => f.id === 'shopee_gratis_ongkir_xtra');
    expect(gratisOngkirFee).toBeDefined();
    expect(gratisOngkirFee.isCapped).toBe(true);
    expect(gratisOngkirFee.totalFee).toBe(10000);
  });

  it('should reject discount greater than catalog price with ERR_DISCOUNT_EXCEEDS_PRICE', () => {
    const result = calculateForward({
      platformConfig: shopeeConfig,
      price: 50000,
      sellerDiscount: 60000, // Invalid!
      hpp: 30000,
      qty: 1,
    });

    expect(result.ok).toBe(false);
    expect(result.errors[0].code).toBe('ERR_DISCOUNT_EXCEEDS_PRICE');
  });

  it('should return null margins and ROI when revenue or capital is zero without NaN/Infinity', () => {
    const result = calculateForward({
      platformConfig: shopeeConfig,
      price: 0,
      sellerDiscount: 0,
      hpp: 0,
      qty: 1,
    });

    expect(result.ok).toBe(true);
    expect(result.ratios.grossMargin).toBeNull();
    expect(result.ratios.netMargin).toBeNull();
    expect(result.ratios.roi).toBeNull();
  });
});
