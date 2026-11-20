/**
 * Financial metrics calculation & formatting
 * Sesuai PRD Bagian 5, 5.1, 5.2, 8.1 dan DECISION_LOG (DEC-002, DEC-003)
 */

export function calculateGrossMargin(grossProfit, effectiveRevenue) {
  if (typeof effectiveRevenue !== 'number' || effectiveRevenue <= 0) {
    return null;
  }
  return grossProfit / effectiveRevenue;
}

export function calculateNetMargin(netProfit, effectiveRevenue) {
  if (typeof effectiveRevenue !== 'number' || effectiveRevenue <= 0) {
    return null;
  }
  return netProfit / effectiveRevenue;
}

export function calculateRoi(netProfit, directCapital) {
  if (typeof directCapital !== 'number' || directCapital <= 0) {
    return null;
  }
  return netProfit / directCapital;
}

export function formatRupiah(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '---';
  }
  const isNegative = amount < 0;
  const absAmount = Math.abs(Math.round(amount));
  const formatted = new Intl.NumberFormat('id-ID').format(absAmount);
  return `${isNegative ? '-Rp ' : 'Rp '}${formatted}`;
}

export function formatPercent(rate, decimals = 2) {
  if (rate === null || rate === undefined || isNaN(rate)) {
    return '---';
  }
  const pct = (rate * 100).toFixed(decimals);
  return `${pct}%`;
}
