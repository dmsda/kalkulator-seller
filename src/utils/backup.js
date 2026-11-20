/**
 * JSON Backup & Restore Validator
 * Sesuai PRD Bagian 6 (FR-10), 11, dan UI/UX Spec 8.4
 */

export function generateJsonBackup(skuItems) {
  const backupData = {
    app: 'KalkulatorSeller',
    schemaVersion: '1.0.0',
    exportDate: new Date().toISOString(),
    totalItems: skuItems.length,
    items: skuItems,
  };
  return JSON.stringify(backupData, null, 2);
}

export function validateJsonBackup(jsonString) {
  try {
    if (!jsonString || typeof jsonString !== 'string') {
      return { ok: false, error: 'File cadangan kosong atau bukan format teks.' };
    }

    if (jsonString.length > 5 * 1024 * 1024) {
      return { ok: false, error: 'Ukuran file cadangan terlalu besar (melebihi batas 5MB).' };
    }

    const data = JSON.parse(jsonString);

    if (!data || typeof data !== 'object') {
      return { ok: false, error: 'Format file tidak sesuai standar JSON.' };
    }

    if (!Array.isArray(data.items)) {
      return { ok: false, error: 'File cadangan tidak memuat daftar produk yang sesuai.' };
    }

    // Validate items
    const validItems = [];
    for (const item of data.items) {
      if (item && typeof item === 'object') {
        const cleanName = String(item.name || 'Produk Pulihan').trim().substring(0, 100);
        validItems.push({
          id: item.id || `sku_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          name: cleanName,
          platform: ['shopee', 'tiktok-shop', 'tokopedia'].includes(item.platform) ? item.platform : 'shopee',
          price: Math.max(0, Math.round(Number(item.price) || 0)),
          sellerDiscount: Math.max(0, Math.round(Number(item.sellerDiscount) || 0)),
          hpp: Math.max(0, Math.round(Number(item.hpp) || 0)),
          qty: Math.max(1, Math.round(Number(item.qty) || 1)),
          storeType: String(item.storeType || 'non_star'),
          category: String(item.category || 'cat_a'),
          selectedPrograms: Array.isArray(item.selectedPrograms) ? item.selectedPrograms : [],
          operationalCost: Math.max(0, Math.round(Number(item.operationalCost) || 0)),
          adsCost: Math.max(0, Math.round(Number(item.adsCost) || 0)),
          affiliateCost: Math.max(0, Math.round(Number(item.affiliateCost) || 0)),
          netProfit: Number(item.netProfit) || 0,
          netMargin: typeof item.netMargin === 'number' ? item.netMargin : null,
          createdAt: item.createdAt || new Date().toISOString(),
          updatedAt: item.updatedAt || new Date().toISOString(),
        });
      }
    }

    return {
      ok: true,
      items: validItems,
      count: validItems.length,
    };
  } catch (e) {
    return { ok: false, error: `File JSON rusak: ${e.message}` };
  }
}
