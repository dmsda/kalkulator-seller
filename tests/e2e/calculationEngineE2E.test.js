import { describe, it, expect } from 'vitest';
import { calculateForward } from '../../src/engine/forwardPricing.js';
import { calculateReverse } from '../../src/engine/reversePricing.js';
import { oracleCalculateForward } from './calculationOracle.js';

import shopeeConfig from '../../src/data/tariffs/shopee.json';
import tiktokConfig from '../../src/data/tariffs/tiktok-shop.json';
import tokopediaConfig from '../../src/data/tariffs/tokopedia.json';

describe('E2E Deep Calculation Engine & Oracle Verification', () => {
  describe('Phase 1: Independent Calculation Oracle Parity', () => {
    it('should match Oracle exactly for Shopee (Non-Star, Cat A, Gratis Ongkir XTRA + Cashback XTRA)', () => {
      const input = {
        platform: 'shopee',
        price: 150000,
        sellerDiscount: 15000, // Effective: 135.000
        hpp: 75000,
        qty: 2,
        storeType: 'non_star',
        category: 'cat_a',
        programs: ['gratis_ongkir_xtra', 'cashback_xtra'],
        operationalCosts: [
          { id: 'packing', amount: 2500, unit: 'per_item', isDirect: true },
          { id: 'handling', amount: 1000, unit: 'per_order', isDirect: false },
        ],
        adsCost: 5000,
        affiliateCost: 2000,
      };

      const oracle = oracleCalculateForward(input);

      const engine = calculateForward({
        platformConfig: shopeeConfig,
        price: input.price,
        sellerDiscount: input.sellerDiscount,
        hpp: input.hpp,
        qty: input.qty,
        storeType: input.storeType,
        category: input.category,
        selectedPrograms: input.programs,
        operationalCosts: input.operationalCosts,
        adsCost: input.adsCost,
        affiliateCost: input.affiliateCost,
      });

      expect(engine.ok).toBe(true);
      expect(engine.totals.effectiveRevenue).toBe(oracle.effectiveRevenue);
      expect(engine.totals.cogs).toBe(oracle.cogs);
      expect(engine.totals.marketplaceFees).toBe(oracle.totalMarketplaceFees);
      expect(engine.totals.operationalCosts).toBe(oracle.totalOpsCost);
      expect(engine.totals.grossProfit).toBe(oracle.grossProfit);
      expect(engine.totals.profitAfterMarketplace).toBe(oracle.profitAfterMarketplace);
      expect(engine.totals.profitAfterOperations).toBe(oracle.profitAfterOperations);
      expect(engine.totals.netProfit).toBe(oracle.netProfit);

      expect(engine.ratios.grossMargin).toBeCloseTo(oracle.grossMargin, 5);
      expect(engine.ratios.netMargin).toBeCloseTo(oracle.netMargin, 5);
      expect(engine.ratios.roi).toBeCloseTo(oracle.roi, 5);
    });

    it('should match Oracle exactly for TikTok Shop (Fashion with Free Shipping)', () => {
      const input = {
        platform: 'tiktok-shop',
        price: 200000,
        sellerDiscount: 20000, // Effective: 180.000
        hpp: 90000,
        qty: 1,
        category: 'fashion',
        programs: ['gratis_ongkir'],
        operationalCosts: [{ id: 'packing', amount: 3000, unit: 'per_item', isDirect: true }],
        adsCost: 10000,
        affiliateCost: 5000,
      };

      const oracle = oracleCalculateForward(input);

      const engine = calculateForward({
        platformConfig: tiktokConfig,
        price: input.price,
        sellerDiscount: input.sellerDiscount,
        hpp: input.hpp,
        qty: input.qty,
        category: input.category,
        selectedPrograms: input.programs,
        operationalCosts: input.operationalCosts,
        adsCost: input.adsCost,
        affiliateCost: input.affiliateCost,
      });

      expect(engine.ok).toBe(true);
      expect(engine.totals.effectiveRevenue).toBe(oracle.effectiveRevenue);
      expect(engine.totals.marketplaceFees).toBe(oracle.totalMarketplaceFees);
      expect(engine.totals.netProfit).toBe(oracle.netProfit);
      expect(engine.ratios.netMargin).toBeCloseTo(oracle.netMargin, 5);
    });

    it('should match Oracle exactly for Tokopedia (Power Merchant, Grup 1, Bebas Ongkir)', () => {
      const input = {
        platform: 'tokopedia',
        price: 300000,
        sellerDiscount: 50000, // Effective: 250.000
        hpp: 120000,
        qty: 3,
        storeType: 'power_merchant',
        category: 'grup_1',
        programs: ['bebas_ongkir'],
        operationalCosts: [{ id: 'packing', amount: 2000, unit: 'per_item', isDirect: true }],
        adsCost: 15000,
        affiliateCost: 0,
      };

      const oracle = oracleCalculateForward(input);

      const engine = calculateForward({
        platformConfig: tokopediaConfig,
        price: input.price,
        sellerDiscount: input.sellerDiscount,
        hpp: input.hpp,
        qty: input.qty,
        storeType: input.storeType,
        category: input.category,
        selectedPrograms: input.programs,
        operationalCosts: input.operationalCosts,
        adsCost: input.adsCost,
        affiliateCost: input.affiliateCost,
      });

      expect(engine.ok).toBe(true);
      expect(engine.totals.effectiveRevenue).toBe(oracle.effectiveRevenue);
      expect(engine.totals.marketplaceFees).toBe(oracle.totalMarketplaceFees);
      expect(engine.totals.netProfit).toBe(oracle.netProfit);
      expect(engine.ratios.netMargin).toBeCloseTo(oracle.netMargin, 5);
    });
  });

  describe('Phase 2: 4 Levels of Profit Integrity & Monotonicity', () => {
    it('should strictly maintain profit hierarchy: Revenue >= Gross >= Mkt >= Ops >= Net', () => {
      const engine = calculateForward({
        platformConfig: shopeeConfig,
        price: 120000,
        sellerDiscount: 0,
        hpp: 50000,
        qty: 1,
        storeType: 'non_star',
        category: 'cat_a',
        operationalCosts: [{ id: 'packing', amount: 2000, unit: 'per_item' }],
        adsCost: 3000,
        affiliateCost: 1000,
      });

      const { totals } = engine;
      expect(totals.effectiveRevenue).toBeGreaterThanOrEqual(totals.grossProfit);
      expect(totals.grossProfit).toBeGreaterThan(totals.profitAfterMarketplace);
      expect(totals.profitAfterMarketplace).toBeGreaterThan(totals.profitAfterOperations);
      expect(totals.profitAfterOperations).toBeGreaterThan(totals.netProfit);
    });

    it('should exhibit strict mathematical monotonicity as Price increases', () => {
      // As price increases from 50k to 500k in steps of 50k, net profit must strictly increase
      let previousNetProfit = -Infinity;
      for (let testPrice = 50000; testPrice <= 500000; testPrice += 50000) {
        const result = calculateForward({
          platformConfig: shopeeConfig,
          price: testPrice,
          sellerDiscount: 0,
          hpp: 30000,
          qty: 1,
          storeType: 'non_star',
          category: 'cat_a',
          operationalCosts: [{ id: 'packing', amount: 2000, unit: 'per_item' }],
          adsCost: 2000,
        });

        expect(result.ok).toBe(true);
        expect(result.totals.netProfit).toBeGreaterThan(previousNetProfit);
        previousNetProfit = result.totals.netProfit;
      }
    });

    it('should correctly scale per_item fees vs per_order flat fees across quantities', () => {
      // 1 item vs 10 items
      const res1 = calculateForward({
        platformConfig: shopeeConfig,
        price: 100000,
        hpp: 50000,
        qty: 1,
        storeType: 'non_star',
        category: 'cat_a',
      });

      const res10 = calculateForward({
        platformConfig: shopeeConfig,
        price: 100000,
        hpp: 50000,
        qty: 10,
        storeType: 'non_star',
        category: 'cat_a',
      });

      // Admin fee (6.5% of 100k = 6500) scales exactly by 10
      const admin1 = res1.feeBreakdown.find((f) => f.id.includes('admin'));
      const admin10 = res10.feeBreakdown.find((f) => f.id.includes('admin'));
      expect(admin10.totalFee).toBe(admin1.totalFee * 10);

      // Order fee (Rp 1000 flat) MUST NOT scale with qty, must remain Rp 1000
      const orderFee1 = res1.feeBreakdown.find((f) => f.unit === 'per_order');
      const orderFee10 = res10.feeBreakdown.find((f) => f.unit === 'per_order');
      expect(orderFee1.totalFee).toBe(1000);
      expect(orderFee10.totalFee).toBe(1000);
    });
  });

  describe('Phase 3: Fee Caps and Boundary Conditions', () => {
    it('should enforce fee caps across platforms (Shopee, TikTok, Tokopedia Rp 10.000 max)', () => {
      const highPrice = 1000000; // 1 Million

      // Shopee Gratis Ongkir XTRA (4% of 1M = 40.000 -> capped at 10.000)
      const shopeeRes = calculateForward({
        platformConfig: shopeeConfig,
        price: highPrice,
        hpp: 500000,
        qty: 1,
        selectedPrograms: ['gratis_ongkir_xtra'],
      });
      const shopeeGo = shopeeRes.feeBreakdown.find((f) => f.id === 'shopee_gratis_ongkir_xtra');
      expect(shopeeGo.isCapped).toBe(true);
      expect(shopeeGo.totalFee).toBe(10000);

      // TikTok Free Shipping (3.5% of 1M = 35.000 -> capped at 10.000)
      const tiktokRes = calculateForward({
        platformConfig: tiktokConfig,
        price: highPrice,
        hpp: 500000,
        qty: 1,
        selectedPrograms: ['gratis_ongkir'],
      });
      const tiktokFs = tiktokRes.feeBreakdown.find((f) => f.id === 'tiktok_free_shipping_fee');
      expect(tiktokFs.isCapped).toBe(true);
      expect(tiktokFs.totalFee).toBe(10000);

      // Tokopedia Bebas Ongkir (4% of 1M = 40.000 -> capped at 10.000)
      const topedRes = calculateForward({
        platformConfig: tokopediaConfig,
        price: highPrice,
        hpp: 500000,
        qty: 1,
        storeType: 'power_merchant',
        category: 'grup_1',
        selectedPrograms: ['bebas_ongkir'],
      });
      const topedBo = topedRes.feeBreakdown.find((f) => f.id === 'toped_bebas_ongkir');
      expect(topedBo.isCapped).toBe(true);
      expect(topedBo.totalFee).toBe(10000);
    });

    it('should correctly handle zero HPP and high-value luxury prices', () => {
      // Zero HPP
      const zeroHpp = calculateForward({
        platformConfig: shopeeConfig,
        price: 50000,
        hpp: 0,
        qty: 1,
      });
      expect(zeroHpp.ok).toBe(true);
      expect(zeroHpp.totals.cogs).toBe(0);
      expect(zeroHpp.totals.grossProfit).toBe(50000);

      // High luxury nominal Rp 50.000.000
      const luxury = calculateForward({
        platformConfig: shopeeConfig,
        price: 50000000,
        hpp: 35000000,
        qty: 1,
        category: 'cat_c', // Electronics
      });
      expect(luxury.ok).toBe(true);
      expect(luxury.totals.grossProfit).toBe(15000000);
      expect(luxury.totals.netProfit).toBeGreaterThan(12000000);
    });

    it('should handle negative profit situations accurately (loss-making price)', () => {
      const lossResult = calculateForward({
        platformConfig: shopeeConfig,
        price: 30000,
        hpp: 40000, // HPP > Price
        qty: 1,
      });
      expect(lossResult.ok).toBe(true);
      expect(lossResult.totals.grossProfit).toBe(-10000);
      expect(lossResult.totals.netProfit).toBeLessThan(-10000);
      expect(lossResult.ratios.netMargin).toBeLessThan(0);
    });
  });

  describe('Phase 4: Reverse Pricing Mathematical Inversion Loop', () => {
    it('should guarantee that recommended price satisfies Net Profit >= Target Profit', () => {
      const targets = [5000, 25000, 100000, 500000];

      for (const target of targets) {
        const rev = calculateReverse({
          platformConfig: shopeeConfig,
          targetProfit: target,
          targetType: 'per_unit',
          hpp: 50000,
          qty: 1,
          storeType: 'non_star',
          category: 'cat_a',
          operationalCosts: [{ id: 'packing', amount: 2000, unit: 'per_item' }],
          adsCost: 3000,
          roundingStep: 100,
        });

        expect(rev.ok).toBe(true);
        const P_rec = rev.recommendedPrice;

        // Verify Forward(P_rec) >= Target
        const fwdRec = calculateForward({
          platformConfig: shopeeConfig,
          price: P_rec,
          hpp: 50000,
          qty: 1,
          storeType: 'non_star',
          category: 'cat_a',
          operationalCosts: [{ id: 'packing', amount: 2000, unit: 'per_item' }],
          adsCost: 3000,
        });
        expect(fwdRec.totals.netProfit).toBeGreaterThanOrEqual(target);

        // Verify Minimality: Forward(P_rec - 100) < Target
        const fwdLower = calculateForward({
          platformConfig: shopeeConfig,
          price: P_rec - 100,
          hpp: 50000,
          qty: 1,
          storeType: 'non_star',
          category: 'cat_a',
          operationalCosts: [{ id: 'packing', amount: 2000, unit: 'per_item' }],
          adsCost: 3000,
        });
        expect(fwdLower.totals.netProfit).toBeLessThan(target);
      }
    });

    it('should correctly calculate Reverse Pricing with multi-quantity order target', () => {
      const rev = calculateReverse({
        platformConfig: tokopediaConfig,
        targetProfit: 150000, // Total order target
        targetType: 'per_order',
        hpp: 40000,
        qty: 3,
        storeType: 'power_merchant',
        category: 'grup_1',
        roundingStep: 500,
      });

      expect(rev.ok).toBe(true);
      expect(rev.forwardResult.totals.netProfit).toBeGreaterThanOrEqual(150000);
      expect(rev.recommendedPrice % 500).toBe(0); // Multi-step rounded
    });
  });
});
