# Dokumentasi Lengkap KalkulatorSeller

Selamat datang di portal dokumentasi resmi **KalkulatorSeller**. Dokumentasi ini disusun untuk membantu developer, kontributor, dan pengguna memahami seluruh aspek arsitektur, perhitungan matematis, sistem desain, pengujian, serta pengoperasian aplikasi.

---

## 🧭 Peta Dokumentasi

```text
docs/
├── README.md                          # Portal indeks dokumentasi
├── getting-started/                   # Panduan awal untuk developer
│   ├── installation.md                # Langkah instalasi lokal
│   ├── development-setup.md           # Konfigurasi lingkungan dev
│   ├── project-structure.md           # Penjelasan direktori proyek
│   └── troubleshooting.md             # Solusi kendala umum
│
├── architecture/                      # Desain arsitektur teknis
│   ├── overview.md                    # Gambaran arsitektur sistem (Mermaid)
│   ├── technology-stack.md            # Detail stack (Astro, Tailwind, JS)
│   ├── application-flow.md            # Siklus hidup & rendering reaktif
│   ├── calculation-engine.md          # Rumus matematis & 4 tingkat laba
│   ├── data-model.md                  # Skema data SKU & tarif JSON
│   └── storage-architecture.md        # Arsitektur LocalStorage
│
├── features/                          # Dokumentasi fitur produk
│   ├── forward-pricing.md             # Perhitungan untung maju
│   ├── reverse-pricing.md             # Pencarian biner harga jual ideal
│   ├── marketplace-comparison.md      # Komparasi 3 marketplace
│   ├── saved-products.md              # Riwayat SKU tersimpan
│   ├── csv-export.md                  # Ekspor CSV & mitigasi injeksi formula
│   ├── json-backup-restore.md         # Pencadangan & pemulihan JSON
│   └── marketplace-tariffs.md         # Rincian tarif Shopee, TikTok, Tokopedia
│
├── design/                            # Desain sistem & UX
│   ├── design-system.md               # Token warna, tipografi, dan komponen
│   ├── responsive-guidelines.md       # Arsitektur 5 breakpoint layar
│   ├── accessibility.md               # Standar aksesibilitas WCAG 2.2 AA
│   └── copywriting-guidelines.md      # Panduan bahasa ramah seller awam
│
├── seo/                               # Optimasi mesin pencari
│   ├── seo-architecture.md            # Arsitektur Technical SEO Astro SSG
│   ├── metadata-guidelines.md         # Canonical, Open Graph, meta robots
│   ├── sitemap-robots.md              # Endpoint sitemap dinamis & robots.txt
│   └── structured-data.md             # Schema.org JSON-LD
│
├── testing/                           # Pengujian & jaminan mutu
│   ├── testing-guide.md               # Panduan menjalankan test suite
│   ├── unit-testing.md                # Pengujian unit engine & skema
│   ├── integration-testing.md         # Pengujian integrasi multi-platform
│   ├── e2e-testing.md                 # Pengujian End-to-End Journeys 1–8
│   └── test-report.md                 # Laporan audit mutu & paritas oracle
│
├── deployment/                        # Rilis & infrastruktur
│   ├── cloudflare-pages.md            # Panduan hosting Cloudflare Pages
│   ├── build-and-deploy.md            # Alur build static site
│   └── environment-variables.md       # Variabel lingkungan
│
├── maintenance/                       # Pemeliharaan berkala
│   ├── updating-tariffs.md            # Cara memperbarui tarif marketplace
│   ├── release-process.md             # Prosedur rilis versi baru
│   └── backup-and-recovery.md         # Prosedur mitigasi data lokal
│
└── user-guide/                        # Panduan untuk pengguna awam
    └── panduan-seller.md              # Cara hitung untung & harga jual ideal
```
