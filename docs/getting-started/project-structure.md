# Struktur Direktori Proyek (Project Structure)

Penjelasan lengkap mengenai tata letak folder dan tanggung jawab arsitektural setiap bagian pada **KalkulatorSeller**.

---

```text
kalkulator-seller/
├── .github/                       # Konfigurasi GitHub Actions, template issue, dan PR
│   ├── workflows/ci.yml           # Pipeline CI untuk tes dan build
│   └── dependabot.yml             # Audit dependensi berkala
│
├── docs/                          # Dokumentasi teknis, fitur, panduan, dan pengujian
│   ├── architecture/              # Detail arsitektur sistem dan data model
│   ├── features/                  # Penjelasan logika tiap fitur aplikasi
│   ├── design/                    # Sistem desain dan panduan UX
│   ├── seo/                       # Panduan SEO teknis dan Schema JSON-LD
│   ├── testing/                   # Test plan dan laporan hasil QA
│   └── user-guide/                # Panduan praktis untuk seller awam
│
├── public/                        # Berkas statis yang disajikan langsung oleh web server
│   ├── _headers                   # Konfigurasi security headers Cloudflare Pages
│   ├── favicon.svg                # Favicon logo kalkulator
│   └── robots.txt                 # Aturan perayapan mesin pencari (crawlers)
│
├── src/                           # Kode sumber utama aplikasi
│   ├── components/                # Komponen antarmuka Astro yang dapat digunakan ulang
│   │   ├── Calculator.astro       # Komponen utama formulir & perhitungan reaktif
│   │   ├── Header.astro           # Header navigasi desktop & drawer mobile
│   │   ├── Footer.astro           # Footer navigasi dan penafian hak cipta
│   │   └── SavedSkuList.astro     # Tabel & kartu riwayat produk tersimpan
│   │
│   ├── data/                      # Sumber data statis
│   │   └── tariffs/               # Berkas JSON konfigurasi tarif per marketplace
│   │       ├── shopee.json        # Tarif admin, layanan, dan promo Shopee
│   │       ├── tiktok-shop.json   # Komisi kategori dan promo TikTok Shop
│   │       └── tokopedia.json     # Biaya Power Merchant & Bebas Ongkir Tokopedia
│   │
│   ├── engine/                    # Pure Calculation Engine (bebas manipulasi DOM)
│   │   ├── forwardPricing.js      # Perhitungan laba maju & 4 level laba
│   │   ├── reversePricing.js      # Pencarian biner harga jual ideal
│   │   ├── feeEvaluator.js        # Evaluasi biaya per-item vs per-order & fee cap
│   │   ├── metrics.js             # Perhitungan persentase margin & ROI
│   │   └── validators.js          # Validator skema berkas tarif JSON
│   │
│   ├── layouts/                   # Layout halaman utama
│   │   └── BaseLayout.astro       # Wrapper HTML root dengan SEO metadata & JSON-LD
│   │
│   ├── pages/                     # Sistem perutean halaman statis Astro
│   │   ├── index.astro            # Halaman utama kalkulator & komparasi
│   │   ├── shopee.astro           # Kalkulator khusus Shopee
│   │   ├── tiktok-shop.astro      # Kalkulator khusus TikTok Shop
│   │   ├── tokopedia.astro        # Kalkulator khusus Tokopedia
│   │   ├── tarif.astro            # Halaman transparansi tarif marketplace
│   │   ├── panduan.astro          # Panduan dan edukasi strategi penetapan harga
│   │   ├── sitemap.xml.js         # Endpoint dinamis pembuat sitemap XML
│   │   ├── privacy-policy.astro   # Kebijakan privasi sisi klien
│   │   ├── terms.astro            # Syarat dan ketentuan penggunaan
│   │   └── 404.astro              # Halaman galat 404 dengan proteksi noindex
│   │
│   ├── styles/                    # Gaya visual aplikasi
│   │   └── tokens.css             # Desain token Tailwind CSS v4 & form styling
│   │
│   └── utils/                     # Fungsi pembantu (helpers)
│       ├── backup.js              # Pembuat dan validator file cadangan JSON
│       ├── currency.js            # Pemformat mata uang Rupiah
│       ├── exportCsv.js           # Pembuat file CSV aman dari formula injection
│       └── storage.js             # Pengelola penyimpanan LocalStorage
│
├── tests/                         # Automated testing suite (Vitest)
│   ├── unit/                      # Pengujian unit engine, skema, responsif, dan SEO
│   ├── integration/               # Pengujian integrasi multi-platform
│   └── e2e/                       # Pengujian E2E journeys & Independent Oracle
│
├── astro.config.mjs               # Konfigurasi Astro (SSG output, trailing slash)
├── package.json                   # Dependensi paket Node.js & npm scripts
├── tsconfig.json                  # Konfigurasi TypeScript ketat
└── vitest.config.js               # Konfigurasi test runner Vitest
```
