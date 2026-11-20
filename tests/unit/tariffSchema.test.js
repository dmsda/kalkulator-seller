import { describe, it, expect } from 'vitest';
import { validateTariffConfig } from '../../src/engine/validators.js';
import shopeeConfig from '../../src/data/tariffs/shopee.json';
import tiktokConfig from '../../src/data/tariffs/tiktok-shop.json';
import tokopediaConfig from '../../src/data/tariffs/tokopedia.json';

describe('Tariff Schema Validation (Phase 2)', () => {
  it('should successfully validate Shopee tariff configuration', () => {
    const result = validateTariffConfig(shopeeConfig);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(shopeeConfig.platform).toBe('shopee');
    expect(shopeeConfig.fees.length).toBeGreaterThan(0);
  });

  it('should successfully validate TikTok Shop tariff configuration', () => {
    const result = validateTariffConfig(tiktokConfig);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(tiktokConfig.platform).toBe('tiktok-shop');
  });

  it('should successfully validate Tokopedia tariff configuration', () => {
    const result = validateTariffConfig(tokopediaConfig);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(tokopediaConfig.platform).toBe('tokopedia');
  });

  it('should reject invalid tariff configuration with detailed errors', () => {
    const invalidConfig = {
      platform: 'shopee',
      // missing schemaVersion, version, effectiveFrom, etc.
      fees: [
        {
          id: 'bad_fee',
          name: 'Bad Fee',
          type: 'invalid_type',
          rate: 1.5, // > 1
          basis: 'invalid_basis',
          unit: 'invalid_unit',
          required: 'not_a_boolean',
          isAssumption: true,
          conditions: [],
        },
      ],
    };

    const result = validateTariffConfig(invalidConfig);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
