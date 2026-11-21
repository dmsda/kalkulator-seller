# Laporan Pengujian Sistem Blog KalkulatorSeller (Test Report)

Dokumen ini mendokumentasikan hasil pengujian fungsional, integrasi, regresi, SEO, dan aksesibilitas untuk integrasi sistem blog pada **KalkulatorSeller**.

---

## 1. Ringkasan Eksekutif Hasil Uji

- **Tanggal Pengujian**: 21 November 2026
- **Lingkungan Uji**: Node.js v20+, Astro v5.4.2, Vitest v3.2.7
- **Total Test Files**: 12 file
- **Total Test Cases**: 67 test
- **Tingkat Kelulusan**: **100% PASS (67 Passed, 0 Failed, 0 Skipped)**
- **Waktu Eksekusi**: ~500ms
- **Status Regresi**: **ZERO REGRESSION** (Seluruh 58 pengujian kalkulator inti tetap lulus tanpa perubahan perilaku kalkulasi atau skema tarif).

---

## 2. Cakupan Uji Modul Blog (`tests/unit/blog.test.js`)

| Skenario Pengujian | Target Komponen | Hasil | Keterangan |
|---|---|:---:|---|
| Hitung waktu baca teks pendek (<200 kata) | `readingTime.js` | **PASS** | Mengembalikan 1 menit ("1 menit baca") |
| Hitung waktu baca teks panjang (~600 kata) | `readingTime.js` | **PASS** | Mengembalikan 3 menit ("3 menit baca") |
| Penanganan input kosong / null | `readingTime.js` | **PASS** | Mengembalikan fallback aman 1 menit |
| Validasi konfigurasi Pages CMS | `.pages.yml` | **PASS** | Media path & koleksi blog tervalidasi |
| Validasi Astro Content Collections | `src/content.config.ts` | **PASS** | Skema Zod & glob loader terverifikasi |
| Ketersediaan & integritas artikel contoh | `src/content/blog/*.md` | **PASS** | 3 artikel sampel valid dengan angka rupiah riil |
| Verifikasi output HTML direktori blog | `dist/blog/index.html` | **PASS** | Title, H1, pencarian, dan kartu artikel ada |
| Verifikasi halaman artikel detail | `dist/blog/[slug]/index.html`| **PASS** | Single H1, TOC, schema BlogPosting valid |
| Verifikasi perlindungan tag archive | `dist/blog/tag/[slug]/` | **PASS** | Meta robots `noindex, nofollow` terverifikasi |

---

## 3. Cakupan Uji Integrasi & SEO (`tests/unit/seo.test.js` & `tests/e2e/releaseGate.test.js`)

1. **Sitemap XML**:
   - URL `/blog/` masuk dalam daftar rute prioritas `0.8`.
   - Seluruh artikel blog non-draft terdaftar otomatis dengan prioritas `0.7` dan `lastmod` valid.
   - Kategori blog terdaftar dengan prioritas `0.6`.
   - Artikel draf dan arsip tag tidak dimasukkan dalam sitemap.
2. **Metadata Open Graph & Twitter Card**:
   - `og:type="article"` pada halaman posting artikel.
   - `og:image`, `og:title`, dan `og:description` sesuai dengan konten artikel.
3. **Data Terstruktur (JSON-LD)**:
   - Skema `BreadcrumbList` valid dan berhierarki: Beranda > Blog > Kategori > Judul Artikel.
   - Skema `BlogPosting` memuat headline, description, image, datePublished, dateModified, author, dan publisher dengan logo resmi.

---

## 4. Hasil Audit Diagnostik & Build

```
$ npx astro check
Getting diagnostics for Astro files in /Users/dimasaditya/project/kalkulator-seller...
Result (53 files): 
- 0 errors
- 0 warnings
- 0 hints

$ npm run build
output: "static"
29 page(s) built in 938ms
Complete!
```

---

## 5. Kesimpulan

Seluruh fungsionalitas sistem blog telah teruji secara komprehensif, memenuhi standar keandalan perangkat lunak, dan siap dirilis ke lingkungan produksi Cloudflare Pages.
