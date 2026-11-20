# KalkulatorSeller

> **"Jualan Ramai Belum Tentu Untung. Hitung Modal, Potongan Marketplace & Profit Bersih Sebelum Pasang Harga."**

Kalkulator biaya dan keuntungan marketplace Indonesia (Shopee, TikTok Shop, dan Tokopedia) yang 100% berjalan di peramban (*client-side*). Membantu seller pemula, UMKM, dan pedagang online menghitung harga jual ideal, memahami 4 tingkatan keuntungan, dan menghindari jebakan omzet tinggi tapi rekening boncos.

[![CI](https://github.com/dmsda/kalkulator-seller/actions/workflows/ci.yml/badge.svg)](https://github.com/dmsda/kalkulator-seller/actions/workflows/ci.yml)
[![Framework: Astro](https://img.shields.io/badge/Astro-v5.4.2-BC52EE.svg?style=flat&logo=astro)](https://astro.build/)
[![CSS: Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0.9-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Tests: Vitest](https://img.shields.io/badge/Tests-57%20Passed-22C55E.svg?style=flat&logo=vitest)](https://vitest.dev/)
[![Diagnostics: Astro Check](https://img.shields.io/badge/Astro_Check-0_Errors-brightgreen.svg)](https://astro.build/)
[![Hosting: Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Ready-F38020.svg?style=flat&logo=cloudflare)](https://pages.cloudflare.com/)

---

## 📌 Daftar Isi
- [Tentang KalkulatorSeller](#-tentang-kalkulatorseller)
- [Fitur Utama](#-fitur-utama)
- [Marketplace yang Didukung](#-marketplace-yang-didukung)
- [Tangkapan Layar](#-tangkapan-layar)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Panduan Instalasi & Pengembangan](#-panduan-instalasi--pengembangan)
- [Struktur Repositori](#-struktur-repositori)
- [Dokumentasi Lengkap](#-dokumentasi-lengkap)
- [Privasi & Keamanan Data](#-privasi--keamanan-data)
- [Panduan Kontribusi](#-panduan-kontribusi)
- [Lisensi](#-lisensi)
- [Penafian (Disclaimer)](#-penafian-disclaimer)

---

## 📖 Tentang KalkulatorSeller

Berjualan di marketplace saat ini tidak sesederhana *"Beli Rp 50.000, jual Rp 70.000, untung Rp 20.000"*. Ada potongan biaya administrasi per kategori produk, biaya layanan gratis ongkir dan cashback, biaya penanganan transaksi per pesanan, biaya operasional packing, hingga budget iklan berbayar dan komisi affiliate. Banyak penjual online pemula mengalami omzet puluhan juta namun modal habis karena tidak menghitung potongan biaya secara presisi.

**KalkulatorSeller** hadir sebagai solusi perhitungan transparan untuk:
1. **Seller Pemula**: Memahami seluruh potongan sebelum menentukan harga jual produk.
2. **Pedagang Rumahan & UMKM**: Menghitung untung bersih riil (*net cash in pocket*) setelah seluruh biaya keluar.
3. **Reseller & Dropshipper**: Menemukan harga jual ideal berdasarkan target untung bersih yang diinginkan per pesanan (*reverse pricing*).

---

## 🚀 Fitur Utama

- **Hitung Keuntungan Maju (Forward Pricing)**: Masukkan harga katalog, diskon promo toko, modal (HPP), jumlah pesanan, biaya packing, iklan, dan affiliate. Sistem langsung merinci 4 tingkatan laba secara otomatis.
- **Cari Harga Jual Ideal (Reverse Pricing)**: Masukkan target keuntungan bersih yang Anda inginkan (misal: ingin untung Rp 30.000 per barang), algoritma pencarian biner langsung merekomendasikan harga jual minimum yang aman dan tidak rugi.
- **Evaluasi 4 Tingkatan Keuntungan**:
  1. *Laba Kotor*: Pendapatan Efektif dikurangi Modal Produk (HPP).
  2. *Laba Setelah Marketplace*: Laba Kotor dikurangi Total Potongan Marketplace.
  3. *Laba Setelah Operasional*: Laba Marketplace dikurangi Biaya Packing & Handling.
  4. *Untung Bersih Akhir*: Uang bersih riil setelah dipotong Iklan & Komisi Affiliate.
- **Komparasi 3 Platform Sekaligus**: Bandingkan potongan biaya dan untung bersih produk identik di Shopee, TikTok Shop, dan Tokopedia dalam satu tampilan.
- **Simpan Produk (Saved SKU)**: Simpan produk langsung ke memori peramban (*LocalStorage*) tanpa memerlukan registrasi akun atau login.
- **Ekspor CSV Terlindungi**: Unduh rekap perhitungan ke format CSV yang kompatibel dengan Microsoft Excel dan aman dari serangan *CSV Formula Injection*.
- **Cadangkan & Pulihkan JSON**: Cadangkan seluruh daftar produk ke file JSON dan pulihkan kapan pun dibutuhkan di perangkat lain.
- **Transparansi Tarif Resmi**: Halaman `/tarif` merinci asal-usul persentase biaya admin, biaya layanan, dan batas maksimal potongan (*fee cap*) lengkap dengan tautan sumber resmi.

---

## 🏬 Marketplace yang Didukung

| Marketplace | Cakupan Skema Biaya | Status Konfigurasi |
|---|---|:---:|
| **Shopee** | Non-Star, Star, Star+, Shopee Mall, Gratis Ongkir XTRA, Cashback XTRA, Biaya Penanganan Transaksi Flat | [shopee.json](src/data/tariffs/shopee.json) |
| **TikTok Shop** | Regular Merchant, Mall, Komisi Kategori, Layanan Gratis Ongkir, Biaya Pemrosesan Pesanan Flat | [tiktok-shop.json](src/data/tariffs/tiktok-shop.json) |
| **Tokopedia** | Power Merchant, PRO, Official Store, Bebas Ongkir, Biaya Jasa Aplikasi Flat | [tokopedia.json](src/data/tariffs/tokopedia.json) |

*Catatan: Seluruh persentase potongan mengacu pada kebijakan resmi pusat edukasi seller per November 2026 dan dapat disesuaikan melalui berkas konfigurasi tanpa mengubah kode program.*

---

## 📸 Tangkapan Layar

Berikut tampilan antarmuka KalkulatorSeller pada tampilan desktop:

![Tampilan Antarmuka Desktop KalkulatorSeller](docs/assets/screenshots/homepage-calculator-desktop.jpg)

---

## 🛠 Teknologi yang Digunakan

KalkulatorSeller dibangun dengan pendekatan arsitektur *zero-backend* yang sangat cepat dan hemat sumber daya:
- **[Astro v5.4.2](https://astro.build/)**: Static Site Generator (SSG) modern yang menghasilkan HTML statis murni tanpa overhead JavaScript yang tidak perlu.
- **[Tailwind CSS v4.0.9](https://tailwindcss.com/)**: Engine utilitas CSS berbasis sistem token desain kustom (`tokens.css`) dengan system font stack.
- **Vanilla JavaScript ES Modules**: Logika perhitungan reaktif dijalankan langsung di browser pengguna tanpa framework reaktif yang berat.
- **[Vitest v3.2.7](https://vitest.dev/)**: Framework automated testing untuk validasi matematis *Independent Calculation Oracle*, pengujian integrasi, dan 8 alur *End-to-End User Journeys*.
- **[TypeScript](https://www.typescriptlang.org/) & [@astrojs/check](https://www.npmjs.com/package/@astrojs/check)**: Verifikasi tipe data statis ketat (0 errors).
- **Target Hosting: [Cloudflare Pages](https://pages.cloudflare.com/)**: Distribusi global instan melalui CDN edge Cloudflare.

---

## 💻 Panduan Instalasi & Pengembangan

### Prasyarat
- **Node.js**: Versi `20.x` atau lebih baru
- **NPM**: Versi `10.x` atau lebih baru

### 1. Kloning Repositori
```bash
git clone https://github.com/dmsda/kalkulator-seller.git
cd kalkulator-seller
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan Lokal
```bash
npm run dev
```
Aplikasi akan aktif di alamat `http://localhost:4321`.

### 4. Menjalankan Pengujian Otomatis
```bash
npm test
```
Menjalankan 57 test case di Vitest (unit testing, E2E journeys, oracle paritas, SEO, keamanan).

### 5. Memeriksa Diagnostik Kode
```bash
npx astro check
```
Memastikan 0 error, 0 warning, dan 0 hint pada seluruh file Astro dan TypeScript.

### 6. Membangun Berkas Produksi
```bash
npm run build
```
Menghasilkan 9 halaman statis teroptimasi dan endpoint XML sitemap di dalam folder `dist/`.

---

## 📂 Struktur Repositori

```text
kalkulator-seller/
├── .github/                  # Konfigurasi CI/CD, issue templates, PR template
│   ├── workflows/ci.yml      # GitHub Actions CI pipeline
│   ├── ISSUE_TEMPLATE/       # Template laporan bug & request fitur
│   └── dependabot.yml        # Otomasi audit dependensi berkala
├── docs/                     # Dokumentasi teknis dan panduan lengkap
│   ├── architecture/         # Arsitektur sistem & alur kalkulasi
│   ├── features/             # Dokumentasi fitur per modul
│   ├── design/               # Sistem desain & panduan aksesibilitas
│   ├── seo/                  # Arsitektur SEO & struktur Schema JSON-LD
│   ├── testing/              # Rencana pengujian & laporan mutu E2E
│   └── user-guide/           # Panduan penggunaan untuk seller awam
├── public/                   # Aset publik statis (robots.txt, _headers, favicon)
├── src/
│   ├── components/           # Komponen antarmuka (Header, Footer, Calculator, SavedSkuList)
│   ├── data/tariffs/         # Berkas konfigurasi tarif marketplace (JSON)
│   ├── engine/               # Pure calculation engine (forward, reverse, feeEvaluator)
│   ├── layouts/              # Layout dasar (BaseLayout.astro dengan SEO metadata)
│   ├── pages/                # Rute halaman statis Astro
│   ├── styles/               # Design tokens & styling Tailwind CSS v4
│   └── utils/                # Utilitas (LocalStorage, CSV Sanitizer, JSON Backup)
├── tests/
│   ├── unit/                 # Pengujian unit engine, schema, dan keamanan
│   ├── integration/          # Pengujian integrasi multi-platform
│   └── e2e/                  # Pengujian E2E journeys & Independent Calculation Oracle
├── astro.config.mjs          # Konfigurasi Astro SSG
├── package.json              # Dependensi proyek & npm scripts
└── vitest.config.js          # Konfigurasi test runner Vitest
```

---

## 📚 Dokumentasi Lengkap

Dokumentasi terperinci tersedia di folder [`docs/`](docs/):
- **Memulai**: [Panduan Instalasi](docs/getting-started/installation.md) • [Struktur Proyek](docs/getting-started/project-structure.md) • [Pemecahan Masalah](docs/getting-started/troubleshooting.md)
- **Arsitektur Teknis**: [Gambaran Umum Arsitektur](docs/architecture/overview.md) • [Calculation Engine](docs/architecture/calculation-engine.md) • [Model Data](docs/architecture/data-model.md)
- **Fitur**: [Forward Pricing](docs/features/forward-pricing.md) • [Reverse Pricing](docs/features/reverse-pricing.md) • [Ekspor CSV Terlindungi](docs/features/csv-export.md) • [Tarif Marketplace](docs/features/marketplace-tariffs.md)
- **Desain & Aksesibilitas**: [Design System](docs/design/design-system.md) • [Panduan Responsif](docs/design/responsive-guidelines.md) • [Aksesibilitas WCAG](docs/design/accessibility.md) • [Copywriting Ramah Seller](docs/design/copywriting-guidelines.md)
- **Pengujian Mutu**: [Rencana Uji E2E](docs/testing/e2e-testing.md) • [Laporan Hasil Pengujian](docs/testing/test-report.md)
- **Panduan Pengguna**: [Panduan Lengkap Seller](docs/user-guide/panduan-seller.md)

---

## 🔒 Privasi & Keamanan Data

- **100% Client-Side**: Seluruh angka modal (HPP), harga jual, target keuntungan, dan catatan produk Anda diolah langsung di peramban. Tidak ada data yang dikirimkan ke server pengembang.
- **Zero Third-Party Trackers**: Situs ini bebas dari Google Analytics, Facebook Pixel, Hotjar, maupun skrip pelacak pihak ketiga lainnya.
- **Mitigasi Serangan CSV**: Data ekspor dibersihkan dari karakter berbahaya (`=`, `+`, `-`, `@`, `\t`, `\r`) untuk mencegah serangan *CSV Command / Formula Injection* di aplikasi spreadsheet.
- **Isolasi Penyimpanan**: Penyimpanan lokal menggunakan skema berversi (`kalkulatorseller_skus_v1`) yang terlindung dari manipulasi data antar domain.

---

## 🤝 Panduan Kontribusi

Kami menyambut kontribusi perbaikan bug, penyesuaian tarif terbaru marketplace, dan penyempurnaan dokumentasi. Silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan alur kerja Git, konvensi commit (*Conventional Commits*), dan tata cara pengajuan *Pull Request*.

---

## 📄 Lisensi

Status lisensi saat ini berada di bawah hak cipta pemilik repositori (**Hak Cipta Dilindungi / All Rights Reserved**). Keputusan pemilihan lisensi open-source (seperti MIT atau AGPLv3) menunggu konfirmasi resmi dari pemilik proyek. Silakan tinjau opsi lisensi pada [LICENSE_RECOMMENDATIONS.md](LICENSE_RECOMMENDATIONS.md).

---

## ⚠️ Penafian (Disclaimer)

KalkulatorSeller adalah alat bantu simulasi independen dan tidak berafiliasi secara resmi dengan Shopee, TikTok Shop, Tokopedia, maupun anak perusahaannya. Seluruh perhitungan merupakan estimasi matematis yang didasarkan pada skema tarif publik yang berlaku saat verifikasi. Marketplace dapat memperbarui tarif sewaktu-waktu. Penjual disarankan selalu memeriksa pengumuman resmi di Pusat Edukasi Seller masing-masing platform sebelum menetapkan harga jual final.
