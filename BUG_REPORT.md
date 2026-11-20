# BUG REPORT & REMEDIATION LOG: KALKULATORSELLER

**Dokumen Versi**: 1.0.0  
**Tanggal**: 21 November 2026  
**Status**: SELURUH BUG TELAH DIPERBAIKI (ALL RESOLVED & VERIFIED)  
**Total Bug Ditemukan**: 6  
**Total Bug Selesai**: 6 (Tingkat Penyelesaian: 100%)

---

## Ringkasan Matriks Masalah

| ID Bug | Judul Masalah | Kategori | Tingkat Keparahan | Komponen Terkait | Status |
|:---:|:---|:---:|:---:|:---|:---:|
| **BUG-001** | Segmented Control mode bertumpuk vertikal aneh di desktop | UI / Layout | Major | `Calculator.astro` | **RESOLVED** |
| **BUG-002** | Border input terlalu tebal dan double-ring focus outline | Visual / Anti-Slop | Minor | `tokens.css` | **RESOLVED** |
| **BUG-003** | Panah dropdown mepet dan menimpa teks opsi pada select input | UI / Usability | Minor | `Calculator.astro` | **RESOLVED** |
| **BUG-004** | Paket `@astrojs/check` dan `typescript` belum terkonfigurasi di devDependencies | Build / Tooling | Major | `package.json`, `tsconfig.json` | **RESOLVED** |
| **BUG-005** | Diagnostic type mismatch pada script Astro komponen (49 issues) | Code Quality / Type Safety | Minor | `Calculator.astro`, `Header.astro`, `SavedSkuList.astro` | **RESOLVED** |
| **BUG-006** | Formatting petik ganda CSV pada data formula injection | Security / Test Parity | Minor | `tests/e2e/userJourneys.test.js` | **RESOLVED** |

---

## Rincian Masalah & Solusi Perbaikan

### BUG-001: Segmented Control Mode Bertumpuk Vertikal di Desktop
- **Deskripsi**: Pada tampilan desktop, tombol pilihan mode perhitungan (*Hitung Untung* dan *Cari Harga Jual Ideal*) mengalami perilaku *flex-wrap* atau *grid* yang salah, sehingga tombol bertumpuk vertikal dengan blok hitam gelap yang tidak proporsional.
- **Langkah Reproduksi**:
  1. Buka halaman kalkulator pada resolusi desktop (> 1024px).
  2. Perhatikan komponen segmented button pemilih mode kalkulasi.
- **Hasil Aktual**: Tombol bertumpuk ke bawah secara vertikal, teks label terpotong atau tertimpa container.
- **Hasil yang Diharapkan**: Tombol berjejer rapi mendatar (*horizontal inline-flex*) dengan transisi halus dan tinggi minimal 44px.
- **Solusi yang Diterapkan**:
  - Merevisi container segmented control menjadi `inline-flex flex-row items-center p-1 bg-surface border border-border rounded-lg`.
  - Tombol mode diberi kelas `flex-1 sm:flex-none inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-sm font-medium rounded-md transition-all duration-150`.
  - Mengeliminasi kelas Tailwind yang memaksa *flex-col* pada breakpoint desktop.
- **Verifikasi**: Lolos uji visual di resolusi 320px, 768px, 1024px, dan 1440px.

---

### BUG-002: Border Input Terlalu Tebal dan Double-Ring Focus Outline
- **Deskripsi**: Elemen input formulir dan dropdown select memiliki garis tepi yang terasa tebal dan kasar, serta memunculkan double-outline berwarna gelap saat aktif.
- **Langkah Reproduksi**:
  1. Klik salah satu input harga atau select dropdown kategori produk.
  2. Amati outline di sekeliling input.
- **Hasil Aktual**: Muncul garis border luar tebal dengan ring bayangan ganda (*focus ring 2px*) yang bertabrakan dengan border alami form.
- **Hasil yang Diharapkan**: Garis border bersih 1px (*clean crisp 1px border*) dengan transisi perubahan warna halus saat fokus tanpa double outline.
- **Solusi yang Diterapkan**:
  - Mengupdate aturan CSS form di `src/styles/tokens.css`:
    ```css
    input, select, textarea {
      border-width: 1px !important;
      border-color: #D1D5DB;
      outline: none !important;
      box-shadow: none !important;
      transition: border-color 0.15s ease-in-out;
    }
    input:focus, input:focus-visible, select:focus, select:focus-visible {
      outline: none !important;
      border-color: var(--color-brand-primary) !important;
      box-shadow: none !important;
    }
    ```
  - Menghapus kelas `focus:ring-2` dan `focus:ring-[#14213D]` dari elemen form di `Calculator.astro`.
- **Verifikasi**: Input form kini tampil elegan dengan ketebalan border tepat 1px.

---

### BUG-003: Panah Dropdown Mepet dan Menimpa Teks Opsi pada Select Input
- **Deskripsi**: Tanda panah ke bawah (caret) pada input select kategori produk dan tipe toko berada terlalu dekat dengan batas kanan dan bertabrakan dengan teks opsi yang panjang.
- **Langkah Reproduksi**:
  1. Amati field dropdown *Kategori Produk* atau *Tipe Toko* pada layar mobile atau tablet.
- **Hasil Aktual**: Teks kategori panjang menabrak tanda panah dropdown sehingga sulit dibaca.
- **Hasil yang Diharapkan**: Tanda panah memiliki ruang bernapas yang cukup dan teks memiliki padding kanan yang lapang.
- **Solusi yang Diterapkan**:
  - Menambahkan styling `appearance-none` disertai SVG panah kustom dengan padding kanan ekstra `pr-10` atau `pr-8`.
  - Memberikan `text-ellipsis overflow-hidden whitespace-nowrap` pada opsi teks panjang agar tidak menembus batas caret.
- **Verifikasi**: Lolos inspeksi UI di seluruh platform browser mobile dan desktop.

---

### BUG-004: Paket `@astrojs/check` dan `typescript` Belum Ada di DevDependencies
- **Deskripsi**: Saat menjalankan pemeriksaan diagnostik kode sumber, sistem meminta instalasi interaktif dependensi `@astrojs/check` dan `typescript`.
- **Langkah Reproduksi**: Jalankan `npx astro check`.
- **Hasil Aktual**: Proses berhenti meminta konfirmasi instalasi paket.
- **Hasil yang Diharapkan**: Pemeriksaan diagnostik berjalan otomatis secara non-interaktif dalam pipeline CI/CD.
- **Solusi yang Diterapkan**:
  - Menginstal paket secara formal: `npm i -D @astrojs/check typescript`.
  - Membuat konfigurasi dasar `tsconfig.json` dengan extend `astro/tsconfigs/strict`.
- **Verifikasi**: Perintah `npx astro check` kini berjalan mulus tanpa prompt interaktif.

---

### BUG-005: Diagnostic Type Mismatch pada Script Astro Komponen (49 Issues)
- **Deskripsi**: Kompilasi Astro melaporkan 49 masalah tipe data (TypeScript diagnostics) pada `Calculator.astro`, `Header.astro`, dan `SavedSkuList.astro` akibat properti DOM generik (seperti `e.target.value`, `cb.checked`, `toggleBtn.contains(e.target)`).
- **Langkah Reproduksi**: Jalankan `npx astro check`.
- **Hasil Aktual**: 49 error diagnostik dilaporkan.
- **Hasil yang Diharapkan**: 0 error, 0 warning, 0 hint di seluruh berkas proyek.
- **Solusi yang Diterapkan**:
  - Menambahkan assertions tipe DOM yang tepat: `(e.target as HTMLInputElement).value`, `(cb as HTMLInputElement).checked`, `(e.target as Node)`.
  - Membersihkan import komponen yang tidak digunakan pada frontmatter.
- **Verifikasi**: `npx astro check` kini menghasilkan status bersih: **0 errors, 0 warnings, 0 hints across 39 files**.

---

### BUG-006: Formatting Petik Ganda CSV pada Data Formula Injection
- **Deskripsi**: Pada pengujian ekspor CSV, ekspektasi pengujian formula injection mengharapkan petik tunggal ganda (`''=CMD...`), padahal fungsi ekspor membungkus nilai yang mengandung tanda kutip dengan petik ganda CSV standar (`"'=CMD|""/C calc""!A0"`).
- **Langkah Reproduksi**: Jalankan pengujian ekspor CSV pada string yang mengandung kutip ganda.
- **Hasil Aktual**: Uji unit gagal karena perbedaan format pembungkus CSV.
- **Hasil yang Diharapkan**: Format CSV standar RFC 4180 dipatuhi dengan benar, dan formula injection ternetralisasi.
- **Solusi yang Diterapkan**:
  - Menyelaraskan *test assertion* pada `tests/e2e/userJourneys.test.js` dengan format RFC 4180: `"'=CMD|\"\"/C calc\"\"!A0\""`.
- **Verifikasi**: Seluruh 8 test case user journey lolos 100%.
