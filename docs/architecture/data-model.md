# Model Data (Data Model)

Dokumentasi skema data JSON yang digunakan dalam konfigurasi tarif marketplace dan penyimpanan produk tersimpan (*Saved SKU*).

---

## 1. Skema Tarif Marketplace (`TariffConfig`)

Disimpan di `src/data/tariffs/*.json`:

```typescript
interface TariffConfig {
  schemaVersion: string;         // '1.0.0'
  platform: 'shopee' | 'tiktok-shop' | 'tokopedia';
  platformName: string;         // 'Shopee' | 'TikTok Shop' | 'Tokopedia'
  version: string;              // '2026.1'
  effectiveFrom: string;        // '2026-01-01'
  lastVerified: string;         // '2026-11-21'
  sourceUrl: string;            // URL rujukan resmi pusat edukasi seller
  status: 'official' | 'assumption';
  notes: string;
  storeTypes: Array<{
    id: string;
    name: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
  }>;
  fees: Array<FeeRule>;
}

interface FeeRule {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  rate: number;                 // misal 0.065 untuk 6.5%
  amount: number;               // nominal tetap jika type='fixed'
  basis: 'seller_discounted_price' | 'original_price' | 'order_subtotal' | 'flat';
  unit: 'per_item' | 'per_order';
  cap: number | null;           // batas maksimal biaya (misal 10000)
  capScope: 'per_item' | 'per_order' | null;
  required: boolean;            // true jika biaya wajib, false jika opsional
  isAssumption: boolean;
  conditions: Array<{
    field: 'storeType' | 'category' | 'program';
    operator: 'eq' | 'neq' | 'in';
    value: string | string[];
  }>;
  effectiveFrom: string;
  effectiveTo: string | null;
  sourceUrl: string;
  notes: string;
}
```

---

## 2. Skema Produk Tersimpan (`SkuItem`)

Disimpan di `LocalStorage` dan berkas backup JSON:

```typescript
interface SkuStoragePayload {
  schemaVersion: '1.0.0';
  lastUpdated: string;          // ISO 8601 string
  items: SkuItem[];
}

interface SkuItem {
  id: string;                   // 'sku_<timestamp>_<random>'
  name: string;                 // Maksimal 100 karakter
  platform: 'shopee' | 'tiktok-shop' | 'tokopedia';
  price: number;                // Harga katalog (integer)
  sellerDiscount: number;       // Diskon promo seller (integer)
  hpp: number;                  // Modal produk HPP (integer)
  qty: number;                  // Jumlah kuantiti (minimal 1)
  storeType: string;            // 'non_star', 'star', dll.
  category: string;             // 'cat_a', 'cat_b', dll.
  selectedPrograms: string[];   // ['gratis_ongkir_xtra'] dll.
  operationalCost: number;      // Biaya packing & handling
  adsCost: number;              // Biaya iklan
  affiliateCost: number;        // Komisi affiliate
  netProfit: number;            // Untung bersih terhitung
  netMargin: number | null;     // Rasio untung bersih (misal 0.285)
  createdAt: string;            // ISO timestamp
  updatedAt: string;            // ISO timestamp
}
```
