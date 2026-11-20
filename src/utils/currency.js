/**
 * Currency and Number Input Utilities
 * Sesuai PRD Bagian 8.1 dan UI/UX Spec Bagian 7.4
 */

export function parseRupiah(value) {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return Math.max(0, Math.round(value));

  // Remove all non-digits
  const cleanStr = String(value).replace(/[^0-9]/g, '');
  if (!cleanStr) return 0;

  const num = parseInt(cleanStr, 10);
  return isNaN(num) ? 0 : Math.max(0, num);
}

export function formatRupiahInput(value) {
  const num = parseRupiah(value);
  if (num === 0) return '';
  return new Intl.NumberFormat('id-ID').format(num);
}

export function formatRupiahDisplay(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '---';
  }
  const isNegative = amount < 0;
  const absAmount = Math.abs(Math.round(amount));
  const formatted = new Intl.NumberFormat('id-ID').format(absAmount);
  return `${isNegative ? '-Rp ' : 'Rp '}${formatted}`;
}
