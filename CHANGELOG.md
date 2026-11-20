# Changelog

Semua perubahan penting pada proyek **KalkulatorSeller** akan didokumentasikan dalam berkas ini.
Format penulisan mengacu pada [Keep a Changelog](https://keepachangelog.com/id/1.0.0/) dan mematuhi [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Persiapan dokumentasi lengkap arsitektur sistem di folder `docs/`.
- Pengujian paritas matematis *Independent Calculation Oracle*.
- Konfigurasi otomatisasi GitHub Actions CI (`ci.yml`).

---

## [1.0.0] - 2026-11-21

### Added
- **Core Calculation Engine**:
  - Mesin *Forward Pricing* dengan perhitungan 4 tingkatan laba (Laba Kotor, Laba Setelah Marketplace, Laba Setelah Operasional, Untung Bersih Akhir).
  - Mesin *Reverse Pricing* berbasis pencarian biner (*binary search*) untuk mencari harga jual ideal minimum berdasarkan target laba bersih.
  - Perhitungan rasio keuangan terverifikasi: Gross Margin, Net Margin, dan ROI berdasarkan modal riil.
  - Evaluasi biaya multi-kuantiti dengan pemisahan biaya per-item versus biaya tetap flat per-order.
  - Penegakan batas atas biaya (*fee cap* Rp 10.000) pada program promosi ongkos kirim dan cashback.
- **Dukungan 3 Marketplace Terbesar di Indonesia**:
  - Shopee: Skema tarif Non-Star, Star, Star+, Shopee Mall, Gratis Ongkir XTRA, Cashback XTRA, dan Biaya Penanganan Transaksi.
  - TikTok Shop: Skema komisi kategori produk, biaya layanan gratis ongkir, dan biaya transaksi flat.
  - Tokopedia: Skema Power Merchant, PRO, Official Store, program Bebas Ongkir, dan biaya jasa aplikasi.
  - Halaman transparansi asal-usul tarif di `/tarif` dengan URL sumber resmi.
- **Antarmuka & Pengalaman Pengguna (UI/UX)**:
  - Dibangun dengan Astro SSG dan Tailwind CSS v4 tanpa dependensi pihak ketiga berat.
  - Antarmuka reaktif tanpa *page reload* menggunakan Vanilla JavaScript ES Modules murni.
  - Tampilan responsif di 5 breakpoint layar (320px, 375px–414px, 768px, 1024px, 1440px+).
  - Mobile Sticky Summary Bar untuk kemudahan melihat untung bersih saat menggulir layar ponsel.
  - Menu navigasi mobile minimalis dengan target sentuh ramah jari (min 44px).
- **Penyimpanan Lokal & Ekspor Data**:
  - Fitur *Saved SKU* berbasis `LocalStorage` dengan isolasi skema `kalkulatorseller_skus_v1`.
  - Ekspor CSV terlindungi dari serangan *CSV Formula Injection* disertai awalan UTF-8 BOM untuk Microsoft Excel.
  - Pencadangan dan pemulihan data dalam format JSON terverifikasi.
- **SEO & Performa**:
  - 9 halaman statis terkompilasi penuh dengan URL canonical konsisten (`trailingSlash: 'always'`).
  - Endpoint dinamis `sitemap.xml.js` dengan metadata `<lastmod>` tanggal terkini.
  - Struktur data terstruktur Schema.org JSON-LD (`WebSite`, `WebApplication`, `BreadcrumbList`, `FAQPage`, `Article`).
  - Nol skrip pelacak pihak ketiga (*zero third-party trackers*) dan nol font eksternal untuk kecepatan maksimal.
- **Quality Assurance**:
  - 57 kasus uji otomatis di Vitest dengan tingkat kelulusan 100%.
  - 0 error, 0 warning, dan 0 hint pada pemeriksaan diagnostik `npx astro check`.
