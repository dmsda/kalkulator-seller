# END-TO-END TEST PLAN & STRATEGY: KALKULATORSELLER

**Dokumen Versi**: 1.0.0  
**Tanggal**: 21 November 2026  
**Peran QA**: Senior QA Engineer, Software Test Engineer, Automation Engineer, Security & Performance Tester  
**Target Rilis**: Cloudflare Pages (Production Ready)  
**Status**: APPROVED / EXECUTED

---

## 1. Ringkasan Eksekutif & Strategi Pengujian

Dokumen ini mendefinisikan strategi dan rencana pengujian menyeluruh (End-to-End Testing & Quality Assurance) untuk platform **KalkulatorSeller**. Pengujian dilakukan secara independen dari hulu ke hilir untuk memastikan seluruh fungsi bisnis, ketepatan matematis kalkulasi biaya marketplace, keandalan penyimpanan lokal, keamanan sisi klien, aksesibilitas, responsivitas multi-perangkat, dan kesiapan SEO teknis beroperasi dengan standar mutu tinggi tanpa cacat (*zero defects*).

### Prinsip Utama Pengujian:
1. **Independent Calculation Oracle**: Pengujian matematika tidak memanggil ulang fungsi engine kalkulator untuk mencocokkan hasil dengan dirinya sendiri (menghindari *self-referential test bias*). Pengujian diverifikasi silang terhadap modul *Ground Truth Oracle* independen yang mengimplementasikan rumus matematika PRD v1.0 secara mandiri.
2. **Real User Journey Simulation**: Menguji 8 skenario perjalanan pengguna nyata dari awal membuka website hingga mengekspor data dan mereset form.
3. **Zero Diagnostic Errors**: Memastikan repositori lolos audit kompilasi TypeScript dan Astro (`npx astro check`) dengan 0 errors, 0 warnings, dan 0 hints.
4. **Anti-Slop Quality Gate**: Memastikan tidak ada layout template generik AI, tidak ada external tracking scripts/fonts yang membocorkan data pengguna, border input bersih 1px, dan target sentuh minimal 44x44px.
5. **Client-Side Privacy & Security**: Verifikasi ketat terhadap sanitasi DOM XSS, mitigasi CSV Formula Injection, dan validasi skema JSON backup.

---

## 2. Ruang Lingkup Pengujian (Scope)

### A. Dalam Cakupan (In Scope)
1. **Pure Calculation Engine (Forward & Reverse)**:
   - 4 tingkat keuntungan: Profit Kotor, Profit Setelah Marketplace, Profit Setelah Operasional, Untung Bersih Akhir.
   - Evaluasi tarif biaya Shopee, TikTok Shop, dan Tokopedia (biaya persentase per-item, biaya tetap per-order, biaya layanan opsional, dan batas maksimal *cap* fee).
   - Skalabilitas pesanan multi-kuantiti (pemisahan biaya per-item vs per-order).
   - Monotonisitas matematis: Kenaikan harga jual harus secara konsisten menaikkan keuntungan bersih pada struktur biaya tetap.
   - Algoritma pencarian biner harga jual ideal (*Reverse Pricing*) dan verifikasi loop minimalitas harga.
2. **End-to-End User Journeys (Journeys 1 – 8)**:
   - Journey 1: Pengunjung baru (*first-time visitor onboarding & default state*).
   - Journey 2: Perhitungan keuntungan produk (*forward pricing detailed*).
   - Journey 3: Mencari harga jual ideal dari target keuntungan (*reverse pricing*).
   - Journey 4: Perbandingan struktur biaya antar platform (Shopee vs TikTok Shop vs Tokopedia).
   - Journey 5: Siklus hidup manajemen SKU (LocalStorage CRUD: Simpan, Baca, Ubah, Hapus).
   - Journey 6: Ekspor data produk ke CSV dengan proteksi formula injection.
   - Journey 7: Cadangkan dan pulihkan data JSON (*resilience* terhadap file korup).
   - Journey 8: Reset formulir dan isolasi data browser.
3. **Multi-device Responsive & Layout**:
   - 5 breakpoint: Layar sempit (320px), ponsel modern (375px–414px), tablet (768px), laptop (1024px), desktop (1440px+).
   - Tidak ada overflow horizontal (`overflow-x: hidden`).
   - Touch target minimal 44x44px untuk kontrol interaktif.
4. **Aksesibilitas & UX (WCAG 2.2 AA)**:
   - Navigasi keyboard penuh (`Tab`, `Shift+Tab`, `Enter`, `Space`).
   - Indikator fokus yang jelas dan kontras.
   - Atribut ARIA yang tepat (`aria-label`, `aria-expanded`, `aria-controls`).
   - Kontras warna teks memenuhi rasio 4.5:1.
5. **Keamanan & Integritas Data**:
   - Sanitasi input dan pencegahan DOM XSS.
   - Netralisasi karakter pemicu CSV injection (`=`, `+`, `-`, `@`, `\t`, `\r`).
   - Versioning skema penyimpanan lokal (`kalkulatorseller_skus_v1`, v1.0.0).
   - Nol ketergantungan script pelacak eksternal (100% privasi seller).
6. **Technical SEO**:
   - Canonical URL dengan sinkronisasi trailing slash konsisten.
   - Meta robots & Open Graph metadata.
   - Endpoint dinamis `sitemap.xml` dengan `<lastmod>` ISO date.
   - Validitas Schema.org JSON-LD (`WebSite`, `WebApplication`, `BreadcrumbList`, dll).

### B. Di Luar Cakupan (Out of Scope)
- Sinkronisasi server database (aplikasi didesain 100% client-side tanpa backend database sesuai PRD Bagian 4).
- Otomasi scraping API internal marketplace secara live (seluruh tarif didasarkan pada berkas konfigurasi resmi yang terverifikasi).

---

## 3. Lingkungan Pengujian (Test Environments)

| Komponen | Spesifikasi / Lingkungan |
|---|---|
| **OS Host** | macOS Darwin (x64/arm64) |
| **Node.js** | v20.x+ |
| **Framework Web** | Astro SSG v5.4.2 |
| **Styling Engine** | Tailwind CSS v4.0.9 |
| **Test Runner** | Vitest v3.2.7 |
| **Diagnostic Checker** | `@astrojs/check` v0.9.12 + TypeScript v5.9.3 |
| **Browser Compatibility** | Chrome/Chromium 120+, Safari 17+, Firefox 120+, Edge 120+ |
| **Target Deployment** | Cloudflare Pages Static Hosting |

---

## 4. Matriks & Skenario Pengujian

```
+---------------------------------------------------------------------------------+
|                               KALKULATORSELLER QA SUITE                         |
+---------------------------------------------------------------------------------+
                                         |
     +-----------------------------------+-----------------------------------+
     |                                   |                                   |
[Engine & Oracle]               [E2E User Journeys]                 [Release Gate Audit]
- Shopee Parity                 - J1: Onboarding Default            - Anti-Slop Tokens
- TikTok Parity                 - J2: Forward Calculation           - WCAG 2.2 AA
- Tokopedia Parity              - J3: Reverse Target Price          - Input 1px Borders
- 4 Levels of Profit            - J4: Platform Comparison           - Zero 3rd-Party Scripts
- Monotonicity Check            - J5: LocalStorage CRUD             - Canonical Trailing Slash
- Fee Caps (Rp 10.000)          - J6: CSV Injection Shield          - Dynamic sitemap.xml
- Binary Search Inversion       - J7: JSON Backup Resilience        - Astro Check (0 err)
- Extreme Values (Rp 50M)       - J8: Form Reset Isolation          - Static Build (9 routes)
```

---

## 5. Kriteria Lolos Rilis (Exit Criteria / Release Gate)

Aplikasi KalkulatorSeller dinyatakan **SIAP RILIS (PRODUCTION READY)** hanya jika memenuhi seluruh kriteria ketat berikut:
1. **100% Tests Passing**: Seluruh test case unit, integrasi, oracle independen, dan end-to-end user journeys lolos tanpa ada kegagalan (`0 failed`).
2. **0 Diagnostic Problems**: Eksekusi `npx astro check` menghasilkan `0 errors`, `0 warnings`, dan `0 hints` pada seluruh file proyek.
3. **Clean Static Build**: Perintah `npm run build` menyelesaikan kompilasi seluruh 9 static routes dan `sitemap.xml` tanpa peringatan.
4. **Mathematical Integrity**: Hasil perhitungan engine terbukti identik 100% dengan Independent Calculation Oracle.
5. **Security Certified**: Ekspor CSV memblokir eksekusi formula Excel, backup JSON menolak file korup dan ukuran > 5MB, serta tidak ada script analitik pihak ketiga yang disisipkan.
6. **Zero Slop**: Tampilan visual bebas dari template generik AI, border input seragam 1px tanpa double-outline aneh, dan elemen sentuh ramah seluler (≥ 44px).

---

## 6. Manajemen Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi yang Diterapkan |
|---|---|---|
| **Bias Pengujian Mandiri** | Kritis | Dibangun `calculationOracle.js` independen yang mengeksekusi rumus PRD tanpa memanggil kode engine kalkulator. |
| **Eksploitasi Formula Injection pada CSV** | Tinggi | Diterapkan fungsi `sanitizeForCsv()` yang otomatis menyisipkan tanda kutip tunggal (`'`) pada karakter `=`, `+`, `-`, `@`, `\t`, `\r`. |
| **Kerusakan Data akibat JSON Tidak Valid** | Sedang | Diterapkan validator `validateJsonBackup()` dengan pemeriksaan ukuran maksimal 5MB, pengecekan tipe skema, dan fallback nilai aman. |
| **Regresi Layout Responsif** | Tinggi | Pengujian CSS tokens secara otomatis memvalidasi ketersediaan batas sentuh 44px, border 1px, dan penanganan overflow. |
| **Inkonsistensi URL Canonical untuk SEO** | Sedang | Normalisasi trailing slash konsisten di `BaseLayout.astro` dan endpoint `sitemap.xml.js`. |
