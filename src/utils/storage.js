/**
 * LocalStorage Manager for Saved SKU
 * Sesuai PRD Bagian 10.1, 11, dan UI/UX Spec Bagian 8
 */

const STORAGE_KEY = 'kalkulatorseller_skus_v1';
const SCHEMA_VERSION = '1.0.0';

export function getSavedSkus() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.items)) {
      return parsed.items;
    }
    return [];
  } catch (e) {
    console.error('Failed to parse saved SKUs from localStorage:', e);
    return [];
  }
}

export function saveSkuItem(skuData) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { ok: false, error: 'Storage tidak tersedia' };
  }

  try {
    const items = getSavedSkus();
    const now = new Date().toISOString();

    const newItem = {
      id: skuData.id || `sku_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: String(skuData.name || 'Produk Tanpa Nama').trim().substring(0, 100),
      platform: skuData.platform || 'shopee',
      price: Math.max(0, Math.round(Number(skuData.price) || 0)),
      sellerDiscount: Math.max(0, Math.round(Number(skuData.sellerDiscount) || 0)),
      hpp: Math.max(0, Math.round(Number(skuData.hpp) || 0)),
      qty: Math.max(1, Math.round(Number(skuData.qty) || 1)),
      storeType: skuData.storeType || 'non_star',
      category: skuData.category || 'cat_a',
      selectedPrograms: Array.isArray(skuData.selectedPrograms) ? skuData.selectedPrograms : [],
      operationalCost: Math.max(0, Math.round(Number(skuData.operationalCost) || 0)),
      adsCost: Math.max(0, Math.round(Number(skuData.adsCost) || 0)),
      affiliateCost: Math.max(0, Math.round(Number(skuData.affiliateCost) || 0)),
      netProfit: typeof skuData.netProfit === 'number' ? skuData.netProfit : 0,
      netMargin: typeof skuData.netMargin === 'number' ? skuData.netMargin : null,
      createdAt: skuData.createdAt || now,
      updatedAt: now,
    };

    const existingIndex = items.findIndex((i) => i.id === newItem.id);
    if (existingIndex >= 0) {
      items[existingIndex] = newItem;
    } else {
      items.unshift(newItem);
    }

    const payload = {
      schemaVersion: SCHEMA_VERSION,
      lastUpdated: now,
      items,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return { ok: true, item: newItem };
  } catch (e) {
    console.error('Failed to save SKU:', e);
    return { ok: false, error: 'Penyimpanan penuh atau gagal disimpan' };
  }
}

export function deleteSkuItem(id) {
  try {
    const items = getSavedSkus();
    const filtered = items.filter((i) => i.id !== id);
    const payload = {
      schemaVersion: SCHEMA_VERSION,
      lastUpdated: new Date().toISOString(),
      items: filtered,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return { ok: true };
  } catch (e) {
    return { ok: false, error: 'Gagal menghapus item' };
  }
}

export function clearAllSavedSkus() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: 'Gagal membersihkan data' };
  }
}
