/**
 * CSV Exporter with Formula Injection Mitigation
 * Sesuai PRD Bagian 6 (FR-09), 11, dan UI/UX Spec 8.3
 */

function sanitizeForCsv(value) {
  if (value === null || value === undefined) return '';
  let str = String(value);

  // Mitigation for Formula Injection in Excel/Calc:
  // Prepend single quote if first character is =, +, -, @, \t, or \r
  const unsafeFirstChars = ['=', '+', '-', '@', '\t', '\r'];
  if (unsafeFirstChars.includes(str.charAt(0))) {
    str = `'${str}`;
  }

  // Escape double quotes
  str = str.replace(/"/g, '""');

  // Wrap in quotes if contains comma, quote, or newline
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str}"`;
  }
  return str;
}

export function generateSkuCsv(skuItems) {
  const headers = [
    'ID SKU',
    'Nama Produk',
    'Platform',
    'Harga Katalog (Rp)',
    'Diskon Seller (Rp)',
    'Harga Efektif (Rp)',
    'HPP (Rp)',
    'Qty',
    'Tipe Toko',
    'Kategori',
    'Biaya Ops/Packing (Rp)',
    'Biaya Iklan (Rp)',
    'Komisi Affiliate (Rp)',
    'Profit Bersih (Rp)',
    'Margin Bersih (%)',
    'Tanggal Update',
  ];

  const rows = skuItems.map((item) => {
    const effectivePrice = Math.max(0, (item.price || 0) - (item.sellerDiscount || 0));
    const marginStr = item.netMargin !== null && item.netMargin !== undefined
      ? `${(item.netMargin * 100).toFixed(2)}%`
      : '---';

    return [
      sanitizeForCsv(item.id),
      sanitizeForCsv(item.name),
      sanitizeForCsv(item.platform),
      item.price || 0,
      item.sellerDiscount || 0,
      effectivePrice,
      item.hpp || 0,
      item.qty || 1,
      sanitizeForCsv(item.storeType),
      sanitizeForCsv(item.category),
      item.operationalCost || 0,
      item.adsCost || 0,
      item.affiliateCost || 0,
      item.netProfit || 0,
      sanitizeForCsv(marginStr),
      sanitizeForCsv(item.updatedAt ? item.updatedAt.split('T')[0] : ''),
    ].join(',');
  });

  // UTF-8 BOM (\uFEFF) ensures Excel opens Indonesian characters correctly
  return '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
}

export function downloadCsv(filename, csvContent) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
