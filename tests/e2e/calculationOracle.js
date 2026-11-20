/**
 * Independent Calculation Oracle for KalkulatorSeller
 * Ground Truth Mathematical Specification (PRD v1.0 Section 5 & Section 8)
 *
 * NOTE: This module deliberately implements calculation logic from raw arithmetic
 * without importing or calling any src/engine modules. It serves as an independent
 * verification oracle to guard against self-referential test bias.
 */

export function oracleCalculateForward({
  platform, // 'shopee' | 'tiktok-shop' | 'tokopedia'
  price,
  sellerDiscount = 0,
  hpp = 0,
  qty = 1,
  storeType = 'non_star',
  category = 'cat_a',
  programs = [], // ['gratis_ongkir_xtra', 'cashback_xtra'] etc.
  operationalCosts = [], // [{ amount: number, unit: 'per_item' | 'per_order', isDirect: boolean }]
  adsCost = 0,
  affiliateCost = 0,
}) {
  // 1. Effective Pricing
  const effectivePrice = Math.max(0, price - sellerDiscount);
  const effectiveRevenue = effectivePrice * qty;
  const cogs = hpp * qty;

  // 2. Marketplace Fees (Independent arithmetic rules)
  let totalMarketplaceFees = 0;
  let breakdown = [];

  if (platform === 'shopee') {
    // Admin fee rate
    let adminRate = 0;
    if (storeType === 'non_star') {
      if (category === 'cat_a') adminRate = 0.065;
      else if (category === 'cat_b') adminRate = 0.055;
      else if (category === 'cat_c') adminRate = 0.040;
      else if (category === 'cat_d') adminRate = 0.045;
    } else if (storeType === 'star') {
      if (category === 'cat_a') adminRate = 0.075;
      else if (category === 'cat_b') adminRate = 0.065;
      else if (category === 'cat_c') adminRate = 0.0475;
      else if (category === 'cat_d') adminRate = 0.055;
    } else if (storeType === 'mall') {
      if (category === 'cat_a') adminRate = 0.095;
      else if (category === 'cat_c') adminRate = 0.065;
    }

    const adminFeePerItem = Math.round(effectivePrice * adminRate);
    const totalAdminFee = adminFeePerItem * qty;
    totalMarketplaceFees += totalAdminFee;
    breakdown.push({ name: 'Biaya Admin', perItem: adminFeePerItem, total: totalAdminFee });

    // Optional programs
    if (programs.includes('gratis_ongkir_xtra')) {
      const rawGratis = effectivePrice * 0.04;
      const cappedGratis = Math.min(rawGratis, 10000);
      const gratisFeePerItem = Math.round(cappedGratis);
      const totalGratis = gratisFeePerItem * qty;
      totalMarketplaceFees += totalGratis;
      breakdown.push({ name: 'Gratis Ongkir XTRA', perItem: gratisFeePerItem, total: totalGratis });
    }

    if (programs.includes('cashback_xtra')) {
      const rawCashback = effectivePrice * 0.014;
      const cappedCashback = Math.min(rawCashback, 10000);
      const cashbackFeePerItem = Math.round(cappedCashback);
      const totalCashback = cashbackFeePerItem * qty;
      totalMarketplaceFees += totalCashback;
      breakdown.push({ name: 'Cashback XTRA', perItem: cashbackFeePerItem, total: totalCashback });
    }

    // Biaya proses flat per order
    const biayaProses = 1000;
    totalMarketplaceFees += biayaProses;
    breakdown.push({ name: 'Biaya Proses', perOrder: biayaProses, total: biayaProses });
  } else if (platform === 'tiktok-shop') {
    let commRate = 0;
    if (category === 'fashion') commRate = 0.060;
    else if (category === 'beauty') commRate = 0.050;
    else if (category === 'electronics') commRate = 0.035;
    else if (category === 'fmcg') commRate = 0.045;

    const commFeePerItem = Math.round(effectivePrice * commRate);
    const totalCommFee = commFeePerItem * qty;
    totalMarketplaceFees += totalCommFee;
    breakdown.push({ name: 'Komisi TikTok', perItem: commFeePerItem, total: totalCommFee });

    if (programs.includes('gratis_ongkir')) {
      const rawGratis = effectivePrice * 0.035;
      const cappedGratis = Math.min(rawGratis, 10000);
      const gratisFeePerItem = Math.round(cappedGratis);
      const totalGratis = gratisFeePerItem * qty;
      totalMarketplaceFees += totalGratis;
      breakdown.push({ name: 'Gratis Ongkir TikTok', perItem: gratisFeePerItem, total: totalGratis });
    }

    const orderFee = 1000;
    totalMarketplaceFees += orderFee;
    breakdown.push({ name: 'Biaya Pemrosesan', perOrder: orderFee, total: orderFee });
  } else if (platform === 'tokopedia') {
    let rate = 0;
    if (category === 'grup_1') rate = 0.065;
    else if (category === 'grup_2') rate = 0.055;
    else if (category === 'grup_3') rate = 0.035;
    else if (category === 'grup_4') rate = 0.045;

    const pmFeePerItem = Math.round(effectivePrice * rate);
    const totalPmFee = pmFeePerItem * qty;
    totalMarketplaceFees += totalPmFee;
    breakdown.push({ name: 'Biaya Power Merchant', perItem: pmFeePerItem, total: totalPmFee });

    if (programs.includes('bebas_ongkir')) {
      const rawBo = effectivePrice * 0.04;
      const cappedBo = Math.min(rawBo, 10000);
      const boPerItem = Math.round(cappedBo);
      const totalBo = boPerItem * qty;
      totalMarketplaceFees += totalBo;
      breakdown.push({ name: 'Bebas Ongkir', perItem: boPerItem, total: totalBo });
    }

    const appFee = 1000;
    totalMarketplaceFees += appFee;
    breakdown.push({ name: 'Biaya Jasa Aplikasi', perOrder: appFee, total: appFee });
  }

  // 3. Operational Costs
  let totalOpsCost = 0;
  let directPackingCost = 0;
  for (const cost of operationalCosts) {
    const amt = Math.round(cost.amount || 0);
    if (cost.unit === 'per_order') {
      totalOpsCost += amt;
    } else {
      totalOpsCost += amt * qty;
      if (cost.id === 'packing' || cost.isDirect) {
        directPackingCost += amt * qty;
      }
    }
  }

  // 4. Marketing Costs
  const cleanAds = Math.max(0, Math.round(adsCost || 0));
  const cleanAffiliate = Math.max(0, Math.round(affiliateCost || 0));

  // 5. Four Levels of Profit
  const grossProfit = effectiveRevenue - cogs;
  const profitAfterMarketplace = grossProfit - totalMarketplaceFees;
  const profitAfterOperations = profitAfterMarketplace - totalOpsCost;
  const netProfit = profitAfterOperations - cleanAds - cleanAffiliate;

  // 6. Ratios
  const grossMargin = effectiveRevenue > 0 ? grossProfit / effectiveRevenue : null;
  const netMargin = effectiveRevenue > 0 ? netProfit / effectiveRevenue : null;
  const directCapital = cogs + directPackingCost;
  const roi = directCapital > 0 ? netProfit / directCapital : null;

  return {
    effectiveRevenue,
    cogs,
    totalMarketplaceFees,
    totalOpsCost,
    cleanAds,
    cleanAffiliate,
    grossProfit,
    profitAfterMarketplace,
    profitAfterOperations,
    netProfit,
    grossMargin,
    netMargin,
    roi,
    breakdown,
  };
}
