# KalkulatorSeller

> Jualan ramai belum tentu untung. Hitung modal, potongan marketplace, dan margin profit sebelum pasang harga.

Aplikasi web statis mandiri (SSG) untuk seller marketplace Indonesia (Shopee, TikTok Shop, Tokopedia) guna menghitung estimasi potongan biaya admin, program gratis ongkir/cashback, biaya operasional packing, serta keuntungan bersih riil (4 tingkat profit).

---

## Fitur Utama

1. **Forward Pricing (Hitung Profit):** Menghitung 4 tingkat profit secara otomatis:
   - Level 1: Profit Kotor (Revenue Efektif - HPP)
   - Level 2: Profit Setelah Marketplace (setelah admin & biaya layanan)
   - Level 3: Profit Setelah Operasional (setelah packing & biaya kirim mandiri)
   - Level 4: Profit Bersih Akhir (setelah alokasi iklan & affiliate)
   - Margin Kotor, Margin Bersih, dan ROI
2. **Reverse Pricing (Cari Harga Jual):** Menghitung harga jual minimum yang diperlukan di etalase toko untuk mengantongi target profit bersih yang diinginkan (berbasis pencarian biner & verifikasi forward).
3. **Multi-Platform MVP:** Mendukung Shopee, TikTok Shop, dan Tokopedia dengan konfigurasi kategori dan status toko dinamis.
4. **Alokasi Pesanan Multi-Qty:** Membedakan biaya per item dan biaya per pesanan secara matematis.
5. **Saved SKU & Storage Lokal:** Menyimpan simulasi produk langsung di browser (`localStorage`) tanpa login atau database eksternal.
6. **Ekspor & Cadangan Aman:**
   - Ekspor CSV (dengan mitigasi formula injection & UTF-8 BOM).
   - Unduh & Pulihkan backup JSON tervalidasi.
7. **Transparansi Tarif & Provenance:** Halaman rujukan resmi untuk setiap komponen tarif, tanggal berlaku, dan status verifikasi.

---

## Arsitektur & Teknologi

- **Framework:** [Astro](https://astro.build/) (Static Site Generation / SSG)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **JavaScript:** Vanilla JavaScript (ES Modules), zero framework runtime (no React/Vue/Svelte)
- **Engine:** Pure deterministic JavaScript functions (teruji 100% via unit tests)
- **Testing:** [Vitest](https://vitest.dev/)
- **Typography:** System font stack first (zero external requests, no Google Fonts)
- **Hosting Target:** Cloudflare Pages

---

## Memulai Pengembangan

### Prasyarat

- Node.js `v20.x` atau lebih baru (direkomendasikan Node LTS `v24.x`)
- npm atau pnpm

### Instalasi & Menjalankan Server Lokal

```bash
# Instal dependency
npm install

# Jalankan server pengembangan
npm run dev

# Jalankan test suite
npm test

# Build static output untuk produksi
npm run build

# Preview hasil build produksi
npm run preview
```

---

## Struktur Folder

```text
kalkulatorseller/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── _headers              # Security headers Cloudflare
├── src/
│   ├── data/
│   │   └── tariffs/          # Konfigurasi JSON tarif marketplace
│   │       ├── shopee.json
│   │       ├── tiktok-shop.json
│   │       └── tokopedia.json
│   ├── engine/               # Pure calculation engine (no DOM)
│   │   ├── feeEvaluator.js
│   │   ├── forwardPricing.js
│   │   ├── reversePricing.js
│   │   ├── metrics.js
│   │   └── validators.js
│   ├── utils/                # Helper formatting & storage
│   │   ├── currency.js
│   │   ├── storage.js
│   │   ├── exportCsv.js
│   │   └── backup.js
│   ├── components/           # Astro UI components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Calculator.astro
│   │   └── SavedSkuList.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/                # Static routes
│   │   ├── index.astro       # Beranda & komparasi
│   │   ├── shopee.astro      # Kalkulator Shopee
│   │   ├── tiktok-shop.astro # Kalkulator TikTok Shop
│   │   ├── tokopedia.astro   # Kalkulator Tokopedia
│   │   ├── tarif.astro       # Transparansi tarif
│   │   ├── panduan.astro     # Panduan seller
│   │   ├── privacy-policy.astro
│   │   ├── terms.astro
│   │   └── 404.astro
│   └── styles/
│       └── tokens.css        # Design tokens & typography
├── tests/
│   ├── unit/                 # Unit tests (Engine, Schema, Security)
│   └── integration/          # Integration tests (Multi-platform & flow)
├── astro.config.mjs
├── package.json
├── PROJECT_AUDIT.md
├── DECISION_LOG.md
├── DESIGN.md
├── AGENTS.md
└── IMPLEMENTATION_PROGRESS.md
```

---

## Deployment ke Cloudflare Pages

1. **Build Output Directory:** `dist`
2. **Build Command:** `npm run build`
3. **Environment:** Node `20+`
4. File `public/_headers` akan otomatis diterapkan oleh Cloudflare Pages untuk mengamankan Content Security Policy (CSP), mencegah framing (clickjacking), dan melarang remote injection.
