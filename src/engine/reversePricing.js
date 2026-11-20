/**
 * Reverse Pricing Engine
 * Sesuai PRD Bagian 8.4:
 * Mencari harga jual minimum yang menghasilkan target profit (per unit atau per order).
 * Menggunakan Binary Search berbasis forward engine, validasi feasibility,
 * exponential upper bound search, dan verifikasi ulang forward + minimum-step check.
 */

import { calculateForward } from './forwardPricing.js';

export function calculateReverse({
  platformConfig,
  targetProfit,
  targetType = 'per_unit', // 'per_unit' | 'per_order'
  hpp,
  sellerDiscount = 0,
  qty = 1,
  operationalCosts = [],
  adsCost = 0,
  affiliateCost = 0,
  storeType = 'non_star',
  category = 'cat_a',
  selectedPrograms = [],
  overrides = {},
  roundingStep = 100, // Pembulatan harga ke kelipatan Rp 100
  maxSafetyPrice = 1_000_000_000, // Rp 1 Miliar guardrail
}) {
  const errors = [];

  // 1. Validation
  if (typeof targetProfit !== 'number' || isNaN(targetProfit) || targetProfit < 0 || !Number.isInteger(targetProfit)) {
    errors.push({ code: 'ERR_INVALID_INPUT', field: 'targetProfit', message: 'Target profit harus berupa bilangan bulat non-negatif.' });
  }

  if (typeof hpp !== 'number' || isNaN(hpp) || hpp < 0 || !Number.isInteger(hpp)) {
    errors.push({ code: 'ERR_INVALID_INPUT', field: 'hpp', message: 'HPP harus berupa bilangan bulat non-negatif.' });
  }

  if (typeof qty !== 'number' || !Number.isInteger(qty) || qty < 1) {
    errors.push({ code: 'ERR_INVALID_INPUT', field: 'qty', message: 'Quantity harus minimal 1.' });
  }

  if (!platformConfig) {
    errors.push({ code: 'ERR_INVALID_TARIFF_CONFIG', message: 'Konfigurasi tarif platform tidak valid.' });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  // Target profit total order
  const targetProfitTotal = targetType === 'per_unit' ? targetProfit * qty : targetProfit;

  // Helper forward call
  function runForward(testPrice) {
    return calculateForward({
      platformConfig,
      price: testPrice,
      sellerDiscount,
      hpp,
      qty,
      operationalCosts,
      adsCost,
      affiliateCost,
      storeType,
      category,
      selectedPrograms,
      overrides,
    });
  }

  // 2. Lower Bound: Starting candidate price
  let low = Math.max(1, hpp + sellerDiscount);
  const lowResult = runForward(low);

  if (!lowResult.ok) {
    return { ok: false, errors: lowResult.errors };
  }

  // If even at lowest price target is met
  if (lowResult.totals.netProfit >= targetProfitTotal) {
    const recommendedPrice = Math.ceil(low / roundingStep) * roundingStep;
    return {
      ok: true,
      recommendedPrice,
      targetProfitTotal,
      forwardResult: runForward(recommendedPrice),
    };
  }

  // 3. Exponential Search to find Upper Bound
  let high = low * 2;
  let iterations = 0;
  let highResult = runForward(high);

  while (highResult.ok && highResult.totals.netProfit < targetProfitTotal) {
    iterations++;
    high *= 2;
    if (high > maxSafetyPrice || iterations > 40) {
      return {
        ok: false,
        errors: [
          {
            code: 'ERR_NO_FEASIBLE_SOLUTION',
            message: 'Target profit tidak dapat dicapai dalam batas harga simulasi (biaya marketplace melebihi atau mendekati pendapatan).',
          },
        ],
      };
    }
    highResult = runForward(high);
  }

  if (!highResult.ok) {
    return { ok: false, errors: highResult.errors };
  }

  // 4. Binary Search for minimal exact price in integers
  let exactMinPrice = high;
  let bSearchIterations = 0;

  while (low <= high && bSearchIterations < 60) {
    bSearchIterations++;
    const mid = Math.floor((low + high) / 2);
    const midResult = runForward(mid);

    if (midResult.ok && midResult.totals.netProfit >= targetProfitTotal) {
      exactMinPrice = mid;
      high = mid - 1; // Try lower to find absolute minimum
    } else {
      low = mid + 1;
    }
  }

  // 5. Rounding Step (Round UP to next multiple of roundingStep)
  const recommendedPrice = Math.ceil(exactMinPrice / roundingStep) * roundingStep;

  // 6. Forward Verification
  const verifiedResult = runForward(recommendedPrice);
  if (!verifiedResult.ok || verifiedResult.totals.netProfit < targetProfitTotal) {
    return {
      ok: false,
      errors: [
        {
          code: 'ERR_TARGET_NOT_MET',
          message: 'Harga rekomendasi gagal memenuhi target profit saat diverifikasi ulang.',
        },
      ],
    };
  }

  // 7. Minimum Price Verification
  // Verify that recommendedPrice - roundingStep does NOT meet the target (proving minimality)
  const belowPrice = recommendedPrice - roundingStep;
  const isMinimal = belowPrice < exactMinPrice;

  return {
    ok: true,
    recommendedPrice,
    exactMinPrice,
    targetProfitTotal,
    isMinimal,
    forwardResult: verifiedResult,
  };
}
