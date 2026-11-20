/**
 * Forward Pricing Calculation Engine
 * Sesuai PRD Bagian 5, 8.1, 8.2, 8.3
 */

import { evaluateFees } from './feeEvaluator.js';
import { calculateGrossMargin, calculateNetMargin, calculateRoi } from './metrics.js';

export function calculateForward({
  platformConfig,
  price,
  sellerDiscount = 0,
  hpp = 0,
  qty = 1,
  operationalCosts = [],
  adsCost = 0,
  affiliateCost = 0,
  storeType = 'non_star',
  category = 'cat_a',
  selectedPrograms = [],
  overrides = {},
  roundingPolicy = 'nearest',
}) {
  const errors = [];

  // 1. Input Validation
  if (typeof price !== 'number' || isNaN(price) || price < 0 || !Number.isInteger(price)) {
    errors.push({ code: 'ERR_INVALID_INPUT', field: 'price', message: 'Harga jual harus berupa bilangan bulat non-negatif.' });
  }

  if (typeof sellerDiscount !== 'number' || isNaN(sellerDiscount) || sellerDiscount < 0 || !Number.isInteger(sellerDiscount)) {
    errors.push({ code: 'ERR_INVALID_INPUT', field: 'sellerDiscount', message: 'Diskon seller harus berupa bilangan bulat non-negatif.' });
  }

  if (typeof hpp !== 'number' || isNaN(hpp) || hpp < 0 || !Number.isInteger(hpp)) {
    errors.push({ code: 'ERR_INVALID_INPUT', field: 'hpp', message: 'HPP harus berupa bilangan bulat non-negatif.' });
  }

  if (typeof qty !== 'number' || !Number.isInteger(qty) || qty < 1) {
    errors.push({ code: 'ERR_INVALID_INPUT', field: 'qty', message: 'Quantity harus berupa bilangan bulat minimal 1.' });
  }

  if (sellerDiscount > price) {
    errors.push({ code: 'ERR_DISCOUNT_EXCEEDS_PRICE', field: 'sellerDiscount', message: 'Diskon seller tidak boleh melebihi harga jual katalog.' });
  }

  if (!platformConfig || typeof platformConfig !== 'object') {
    errors.push({ code: 'ERR_INVALID_TARIFF_CONFIG', message: 'Konfigurasi tarif platform tidak valid.' });
  }

  if (errors.length > 0) {
    return {
      ok: false,
      errors,
      totals: null,
      perUnit: null,
      ratios: null,
      feeBreakdown: [],
      flags: null,
    };
  }

  // 2. Pricing and Base Calculations
  const effectivePrice = Math.max(0, price - sellerDiscount);
  const effectiveRevenue = effectivePrice * qty;
  const cogs = hpp * qty;

  // 3. Evaluate Marketplace Fees
  const { feeBreakdown, totalMarketplaceFees, totalPerUnitFee, flags } = evaluateFees({
    tariffConfig: platformConfig,
    price,
    effectivePrice,
    qty,
    storeType,
    category,
    selectedPrograms,
    overrides,
    roundingPolicy,
  });

  // 4. Calculate Operational Costs
  let totalOpsCost = 0;
  let totalPerUnitOps = 0;
  let directPackingCost = 0;

  if (Array.isArray(operationalCosts)) {
    for (const cost of operationalCosts) {
      const amt = typeof cost.amount === 'number' ? Math.round(cost.amount) : 0;
      if (cost.unit === 'per_order') {
        totalOpsCost += amt;
        totalPerUnitOps += qty > 0 ? Math.round(amt / qty) : amt;
      } else {
        // per_item
        totalOpsCost += amt * qty;
        totalPerUnitOps += amt;
        if (cost.id === 'packing' || cost.isDirect) {
          directPackingCost += amt * qty;
        }
      }
    }
  } else if (typeof operationalCosts === 'number') {
    // treat as per-item operational cost
    totalOpsCost = Math.round(operationalCosts) * qty;
    totalPerUnitOps = Math.round(operationalCosts);
    directPackingCost = totalOpsCost;
  }

  // 5. Calculate Ads & Affiliate Costs
  const cleanAdsCost = typeof adsCost === 'number' && !isNaN(adsCost) ? Math.max(0, Math.round(adsCost)) : 0;
  const cleanAffiliateCost = typeof affiliateCost === 'number' && !isNaN(affiliateCost) ? Math.max(0, Math.round(affiliateCost)) : 0;

  // 6. Calculate 4 Levels of Profit (PRD Section 5)
  // Level 1: Profit Kotor = Pendapatan Efektif - HPP
  const grossProfit = effectiveRevenue - cogs;

  // Level 2: Profit Setelah Marketplace = Profit Kotor - Total Marketplace Fees
  const profitAfterMarketplace = grossProfit - totalMarketplaceFees;

  // Level 3: Profit Setelah Operasional = Profit Setelah Marketplace - Total Biaya Operasional
  const profitAfterOperations = profitAfterMarketplace - totalOpsCost;

  // Level 4: Profit Bersih Akhir = Profit Setelah Operasional - Iklan - Komisi Affiliate
  const netProfit = profitAfterOperations - cleanAdsCost - cleanAffiliateCost;

  // 7. Per Unit Calculations
  const perUnit = {
    price,
    sellerDiscount,
    effectivePrice,
    hpp,
    grossProfit: qty > 0 ? Math.round(grossProfit / qty) : grossProfit,
    marketplaceFees: totalPerUnitFee,
    profitAfterMarketplace: qty > 0 ? Math.round(profitAfterMarketplace / qty) : profitAfterMarketplace,
    operationalCosts: totalPerUnitOps,
    profitAfterOperations: qty > 0 ? Math.round(profitAfterOperations / qty) : profitAfterOperations,
    adsCost: qty > 0 ? Math.round(cleanAdsCost / qty) : cleanAdsCost,
    affiliateCost: qty > 0 ? Math.round(cleanAffiliateCost / qty) : cleanAffiliateCost,
    netProfit: qty > 0 ? Math.round(netProfit / qty) : netProfit,
  };

  // 8. Ratios: Gross Margin, Net Margin, ROI (DEC-002, DEC-003)
  const grossMargin = calculateGrossMargin(grossProfit, effectiveRevenue);
  const netMargin = calculateNetMargin(netProfit, effectiveRevenue);
  const directCapital = cogs + directPackingCost;
  const roi = calculateRoi(netProfit, directCapital);

  return {
    ok: true,
    totals: {
      priceTotal: price * qty,
      discountTotal: sellerDiscount * qty,
      effectiveRevenue,
      cogs,
      marketplaceFees: totalMarketplaceFees,
      operationalCosts: totalOpsCost,
      adsCost: cleanAdsCost,
      affiliateCost: cleanAffiliateCost,
      grossProfit,
      profitAfterMarketplace,
      profitAfterOperations,
      netProfit,
    },
    perUnit,
    ratios: {
      grossMargin,
      netMargin,
      roi,
    },
    feeBreakdown,
    flags,
    errors: [],
  };
}
