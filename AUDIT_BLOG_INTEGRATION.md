# AUDIT BLOG INTEGRATION — KALKULATORSELLER
*Dokumen Hasil Audit Pra-Integrasi Sistem Blog + Pages CMS*
*Tanggal: 21 November 2026*

---

## 1. Kondisi Project Saat Ini

KalkulatorSeller saat ini beroperasi sebagai aplikasi web kalkulator statis (Static Site Generation - SSG) berbasis **Astro v5.4.2** dan **Tailwind CSS v4.0.9** yang di-deploy ke **Cloudflare Pages**. 
Aplikasi memiliki kalkulator keuntungan untuk tiga marketplace utama (Shopee, TikTok Shop, Tokopedia), sistem penyimpanan produk lokal (LocalStorage `kalkulatorseller_skus_v1`), dan halaman informasi publik (Tarif, Panduan, Kebijakan Privasi, Syarat & Ketentuan). Seluruh test suite (58 tes) lulus 100% dengan nol error diagnostik TypeScript.

---

## 2. Struktur Folder Aktual

```
kalkulator-seller/
├── .github/                      # Workflows CI/CD
├── dist/                         # Output build static SSG
├── docs/                         # Dokumentasi lengkap sistem
├── public/                       # Aset publik statis (logo, favicons, OG images, banners)
├── src/
│   ├── components/               # Komponen UI (Header, Footer, Calculator, SavedSkuList)
│   ├── data/tariffs/             # Konfigurasi tarif JSON resmi marketplace
│   ├── engine/                   # Mesin perhitungan tarif & validasi skema
│   ├── layouts/                  # BaseLayout.astro (SEO, Open Graph, Breadcrumb schema)
│   ├── pages/                    # Rute statis (index, shopee, tiktok-shop, tokopedia, tarif, panduan, privacy, terms, 404, sitemap.xml.js)
│   ├── styles/                   # tokens.css & styling Tailwind CSS v4
│   └── utils/                    # Penyimpanan lokal, format mata uang, ekspor CSV
├── tests/                        # Vitest unit, integrasi, dan E2E release gate suite
├── astro.config.mjs              # Konfigurasi Astro (site: https://kalkulatorseller.pages.dev, trailingSlash: always)
├── package.json                  # Dependensi runtime & dev
└── tsconfig.json                 # Konfigurasi TypeScript Astro
```

---

## 3. Teknologi dan Versi yang Digunakan

| Komponen | Spesifikasi / Versi | Catatan Kompatibilitas |
|---|---|---|
| **Node.js** | v24.15.0 | Sangat modern & stabil |
| **npm** | 11.12.1 | Paket manajer resmi |
| **Astro** | ^5.4.2 (Astro 5) | Mendukung Content Layer API (`src/content.config.ts`, `astro/loaders`, `render()`) |
| **Tailwind CSS** | ^4.0.9 (@tailwindcss/vite) | Menggunakan styling tokens modern di `src/styles/tokens.css` |
| **Testing** | Vitest v3.0.7 | 58 unit & E2E tests aktif |
| **TypeScript** | ^5.9.3 | Astro check aktif (0 errors/0 warnings) |
| **Hosting** | Cloudflare Pages | Output direktori `dist/`, build command `npm run build` |
| **CMS Target** | Pages CMS | Membaca `.pages.yml` di root repository |

---

## 4. Existing Components & Assets yang Dapat Digunakan Kembali

1. **`src/layouts/BaseLayout.astro`**:
   - Telah memiliki penanganan SEO lengkap: Canonical URL absolut, Open Graph tags (`og:title`, `og:description`, `og:image`, `og:image:width`, `og:image:height`, `og:image:alt`), Twitter Card `summary_large_image`, Robots meta tag (`index, follow` / `noindex, nofollow`), dan injeksi JSON-LD structured data.
   - Siap menerima prop `image`, `title`, `description`, `canonicalUrl`, `noindex`, dan array `jsonLd`.

2. **Design Tokens (`src/styles/tokens.css`)**:
   - Warna resmi: Prussian Blue `#14213D`, Accent Orange `#FCA311` / `#FA7904`, Alabaster Grey `#E5E5E5`, Success Green `#047857`, Dark Text `#000000` & `#525252`.
   - Menggunakan font sistem native (bebas external bloat/Google Fonts).

3. **`src/components/Header.astro` & `src/components/Footer.astro`**:
   - Header responsif dengan logo WebP/PNG, menu desktop, dan mobile drawer dropdown yang aksesibel.
   - Footer dengan navigasi kalkulator, legal, catatan transparansi, dan hak cipta.

4. **Sitemap Generator (`src/pages/sitemap.xml.js`)**:
   - Endpoint dinamis yang menghasilkan XML sitemap standar dengan format tanggal `lastmod`.

---

## 5. Potensi Konflik & Mitigasi

1. **Astro 5 Content Layer API vs Legacy `src/content/config.ts`**:
   - *Isu*: Astro 5 menggantikan `src/content/config.ts` lama dengan `src/content.config.ts` (menggunakan `loader: glob(...)` dari `astro/loaders`).
   - *Mitigasi*: Buat `src/content.config.ts` sesuai standar resmi Astro 5 Content Layer API.
2. **Trailing Slash Compatibility**:
   - *Isu*: `astro.config.mjs` menggunakan `trailingSlash: 'always'`. Rute blog harus konsisten menggunakan URL berakhiran slash (`/blog/`, `/blog/[slug]/`, `/blog/category/[slug]/`, `/blog/tag/[slug]/`).
   - *Mitigasi*: Seluruh canonical URL dan generator tautan blog wajib menggunakan trailing slash.
3. **Filtering Draft & Sitemap**:
   - *Isu*: Artikel berstatus `draft: true` tidak boleh tampil di halaman publik atau sitemap.
   - *Mitigasi*: Terapkan filter `(!data.draft)` di semua rute (`/blog/`, `/blog/[slug]/`, category, tag, search index) dan endpoint `sitemap.xml.js`.
4. **Regresi Kalkulator**:
   - *Isu*: Penambahan modul blog tidak boleh mengganggu kalkulator, fee evaluator, atau SKU storage.
   - *Mitigasi*: Jalankan full regression test suite (58 tes) setiap fase implementasi.

---

## 6. Risiko Integrasi & Dependency Check

- **Pages CMS Compatibility**: Pages CMS membaca file `.pages.yml` di root repository. Konfigurasi harus menggunakan nama field dan tipe yang didukung resmi (`string`, `text`, `rich-text`, `image`, `date`, `boolean`, `select`, `list`).
- **Media Upload**: Media diarahkan ke `public/images/blog/` dengan output `/images/blog/` agar Astro dapat mengakses gambar secara statis dan instan.
- **Dependency**: Seluruh fitur blog dapat diimplementasikan menggunakan modul bawaan Astro 5 (`astro:content`, `astro/loaders`), Vite, dan Tailwind CSS v4 tanpa perlu menginstal framework eksternal yang membebani bundle size.

---

## 7. Rencana Implementasi & File Mapping

### A. File Baru yang Akan Dibuat
1. `.pages.yml` — Konfigurasi resmi Pages CMS di root repository.
2. `src/content.config.ts` — Skema validasi Zod & collection loader Astro 5.
3. `src/content/blog/` (Direktori artikel markdown):
   - `cara-menghitung-keuntungan-jualan-online.md`
   - `cara-menentukan-harga-jual-produk.md`
   - `memahami-biaya-marketplace-sebelum-jualan.md`
4. `src/components/blog/`:
   - `BlogCard.astro` — Kartu artikel untuk feed & grid
   - `FeaturedArticle.astro` — Kartu artikel unggulan
   - `TableOfContents.astro` — Daftar isi otomatis dari heading
   - `RelatedArticles.astro` — Rekomendasi artikel sejenis
   - `BlogCTA.astro` — Banner kalkulator kontekstual di artikel
   - `BlogSearch.astro` — Pencarian client-side instan dan aksesibel
5. `src/pages/blog/`:
   - `index.astro` — Halaman index blog `/blog/`
   - `[slug].astro` — Halaman detail artikel `/blog/[slug]/`
   - `category/[slug].astro` — Halaman kategori `/blog/category/[slug]/`
   - `tag/[slug].astro` — Halaman tag `/blog/tag/[slug]/`
6. `src/utils/readingTime.js` — Utilitas kalkulasi estimasi waktu baca (WPM ~200 bahasa Indonesia).
7. `public/images/blog/` — Direktori penyimpanan gambar artikel dan featured image.
8. Dokumentasi Lengkap:
   - `BLOG_ARCHITECTURE.md`
   - `PAGES_CMS_SETUP.md`
   - `BLOG_CONTENT_GUIDELINE.md`
   - `BLOG_SEO_GUIDELINE.md`
   - `BLOG_EDITOR_GUIDE.md`
   - `BLOG_DEPLOYMENT_GUIDE.md`
   - `BLOG_TEST_REPORT.md`
   - `BLOG_IMPLEMENTATION_REPORT.md`

### B. File Existing yang Akan Diperbarui
1. `src/components/Header.astro` — Menambahkan link navigasi 'Blog'.
2. `src/components/Footer.astro` — Menambahkan link 'Blog KalkulatorSeller'.
3. `src/pages/sitemap.xml.js` — Memasukkan rute blog & artikel terbit ke XML sitemap.
4. `tests/` — Menambahkan unit & E2E integration tests untuk blog & draft filtering.

---

Audit selesai. Melanjutkan langsung ke implementasi bertahap dari Phase 1 hingga Phase 17.
