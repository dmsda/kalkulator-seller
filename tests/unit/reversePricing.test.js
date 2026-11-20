import { describe, it, expect } from 'vitest';
import { calculateReverse } from '../../src/engine/reversePricing.js';
import shopeeConfig from '../../src/data/tariffs/shopee.json';

describe('Reverse Pricing Engine (Phase 3)', () => {
  it('should find recommended price meeting target net profit per unit', () => {
    // HPP: Rp 50.000
    // Target net profit per unit: Rp 25.000
    // Qty: 1
    // Packing: Rp 2.000
    const result = calculateReverse({
      platformConfig: shopeeConfig,
      targetProfit: 25000,
      targetType: 'per_unit',
      hpp: 50000,
      qty: 1,
      storeType: 'non_star',
      category: 'cat_a',
      operationalCosts: [{ id: 'packing', amount: 2000, unit: 'per_item' }],
      roundingStep: 100,
    });

    expect(result.ok).toBe(true);
    expect(result.recommendedPrice).toBeGreaterThan(50000);
    expect(result.recommendedPrice % 100).toBe(0);

    // Forward verification
    expect(result.forwardResult.ok).toBe(true);
    expect(result.forwardResult.totals.netProfit).toBeGreaterThanOrEqual(25000);
  });

  it('should correctly solve reverse pricing for multi-qty orders with per_order target', () => {
    // Qty: 2
    // Target profit for entire order: Rp 50.000
    // HPP: Rp 40.000
    const result = calculateReverse({
      platformConfig: shopeeConfig,
      targetProfit: 50000,
      targetType: 'per_order',
      hpp: 40000,
      qty: 2,
      storeType: 'non_star',
      category: 'cat_a',
      roundingStep: 500,
    });

    expect(result.ok).toBe(true);
    expect(result.recommendedPrice % 500).toBe(0);
    expect(result.forwardResult.totals.netProfit).toBeGreaterThanOrEqual(50000);
  });

  it('should reject invalid inputs', () => {
    const result = calculateReverse({
      platformConfig: shopeeConfig,
      targetProfit: -5000, // Negative!
      hpp: 50000,
      qty: 1,
    });

    expect(result.ok).toBe(false);
    expect(result.errors[0].code).toBe('ERR_INVALID_INPUT');
  });
});
