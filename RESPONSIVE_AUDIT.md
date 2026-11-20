# AUDIT RESPONSIVE & MULTI-DEVICE — KALKULATORSELLER

Dokumen audit ini memetakan kondisi antarmuka KalkulatorSeller pada berbagai ukuran layar (mobile 320px–430px, tablet 768px–1024px, laptop 1280px, dan desktop 1440px–1920px), mengidentifikasi masalah tata letak, keterbacaan, touch target, dan aksesibilitas, serta menetapkan rencana perbaikan komprehensif.

---

## 1. Baseline Ukuran Viewport Pengujian

| Kategori Perangkat | Resolusi Uji | Karakteristik Penggunaan |
|---|---|---|
| **Smartphone Kecil** | 320 × 640 px | Layar sangat sempit, ruang horizontal sangat terbatas, risiko overflow tinggi |
| **Smartphone Standar** | 360 × 800 px, 375 × 812 px | Viewport mayoritas pengguna Android & iPhone SE/13 mini |
| **Smartphone Besar** | 390 × 844 px, 430 × 932 px | iPhone 14/15/16 Pro Max, layar modern dengan keyboard virtual besar |
| **Tablet Portrait** | 768 × 1024 px | iPad / Android tablet vertikal, sering terjebak layout 2-state yang melar |
| **Tablet Landscape** | 1024 × 768 px | iPad horizontal, batas transisi desktop grid |
| **Laptop Standar** | 1280 × 800 px, 1366 × 768 px | Layar laptop 13-14 inci |
| **Desktop / Monitor Besar** | 1440 × 900 px, 1920 × 1080 px | Layar lebar kerja |

---

## 2. Hasil Audit Temuan per Area & Prioritas

### A. Header & Navigasi Global (`src/components/Header.astro`)
- **Tingkat Prioritas:** CRITICAL / HIGH
- **Temuan Saat Ini:**
  - Baris header menampung Wordmark dan 5 tautan navigasi secara berdampingan dalam satu baris flex horizontal (`flex justify-between`).
  - Pada layar ponsel (< 640px, khususnya 320px – 400px), lebar total logo (~160px) ditambah 5 menu (~350px) melebihi lebar layar (510px > 360px), menyebabkan menu bertumpuk secara canggung atau memotong logo.
  - Tinggi tombol navigasi saat ini hanya `py-1.5` (~28px), di bawah standar minimum touch target manusia 44 × 44 px.
- **Rekomendasi Perbaikan:**
  - Terapkan pola responsive navigation:
    - **Desktop & Tablet (≥ 768px):** Tampilkan deretan navigasi horizontal lengkap dengan touch target nyaman.
    - **Mobile (< 768px):** Tampilkan tombol aksi "Menu" yang jelas dengan label teks dan ikon, yang dapat membuka laci navigasi (*mobile drawer/menu*) dengan tombol vertikal berukuran tinggi 48px yang mudah disentuh jempol.
    - Dilengkapi dukungan keyboard (ESC untuk menutup, ARIA attributes `aria-expanded`).

---

### B. Form Kalkulator (`src/components/Calculator.astro`)
- **Tingkat Prioritas:** CRITICAL (Inti Produk)
- **Temuan Saat Ini:**
  1. **Mode Selector (Segmented Control):**
     - Tombol "Hitung Keuntungan" dan "Cari Harga Jual Ideal" diletakkan berdampingan dalam `inline-flex` dengan `white-space: nowrap`.
     - Pada layar 320px, lebar total tombol melebihi lebar kontainer card yang tersisa (240px), berisiko terpotong.
  2. **Padding Card di Mobile:**
     - Menggunakan `p-6 sm:p-7`. Pada layar 320px, padding kiri-kanan memakan 48px sehingga area input hanya tersisa 240px.
  3. **Touch Targets Input:**
     - Input fields dan dropdowns menggunakan `py-2.5` (~38px height). Idealnya `min-h-[44px]` untuk touch target standar WCAG 2.2 AA.
     - Font size input `text-xs sm:text-sm` (< 16px di mobile) berisiko memicu auto-zoom browser iOS Safari saat fokus.
  4. **Visibilitas Hasil di Smartphone:**
     - Pada mobile, form kalkulator tersusun vertikal panjang. Pengguna yang mengisi harga modal di atas tidak bisa melihat perubahan angka keuntungan bersih di bawah tanpa harus scroll ke bawah.
- **Rekomendasi Perbaikan:**
  - Buat Segmented Control responsif: `flex-col xs:flex-row sm:inline-flex` dengan ukuran touch target minimum 44px.
  - Gunakan padding adaptif: `p-4 sm:p-6 lg:p-7`.
  - Terapkan `min-h-[44px]` dan `text-base sm:text-sm` pada seluruh kolom input agar tidak memicu auto-zoom di iOS dan nyaman diketik.
  - Implementasikan **Sticky Bottom Summary Bar** untuk mobile (`lg:hidden`):
    - Baris bawah mengambang yang ringkas, menampilkan ringkasan langsung: "Untung Bersih: Rp X &bull; Margin: X%" dengan tombol pintas "Lihat Rincian &darr;" yang menggeser layar (*smooth scroll*) langsung ke kartu hasil.
    - Memiliki safe-area padding iOS (`env(safe-area-inset-bottom)`).

---

### C. Hasil Perhitungan & Tabel Potongan (`src/components/Calculator.astro`)
- **Tingkat Prioritas:** HIGH
- **Temuan Saat Ini:**
  - Angka Rupiah panjang (misalnya Rp125.000.000) pada kartu keuntungan dapat mengalami *wrapping* canggung jika kolom terlalu sempit.
  - Kartu Level 4 (*Profit Bersih Akhir*) memerlukan padding proporsional pada mobile agar tidak mendominasi layar kecil secara berlebihan.
  - Tabel rincian potongan marketplace memiliki `overflow-x-auto` namun di mobile pengguna seringkali tidak menyadari tabel bisa digeser jika kolom terpotong rata.
- **Rekomendasi Perbaikan:**
  - Gunakan `break-words` atau ukuran font responsif fluid pada angka Rupiah (`text-base sm:text-lg lg:text-xl` dan `font-mono tabular-nums`).
  - Berikan scroll hint halus pada tabel biaya di layar kecil.

---

### D. Daftar Produk Tersimpan (`src/components/SavedSkuList.astro`)
- **Tingkat Prioritas:** HIGH
- **Temuan Saat Ini:**
  - Tabel produk tersimpan memiliki 6 kolom. Pada smartphone 320px - 400px, tabel dengan 6 kolom memaksa pengguna menggeser layar secara canggung untuk melihat untung bersih dan tombol aksi.
  - Tombol aksi penyimpanan (*Unduh Excel, Simpan Cadangan, Buka Cadangan, Hapus Semua*) bertumpuk dalam 3-4 baris tidak beraturan pada layar 320px.
- **Rekomendasi Perbaikan:**
  - Terapkan **Responsive Hybrid Pattern**:
    - **Mobile (< 640px):** Tampilkan daftar produk dalam bentuk kartu ringkas (*mobile card view*). Setiap kartu menampilkan Nama Produk, Marketplace, Harga Jual, Untung Bersih (hijau tebal), Margin, serta tombol "Buka" dan "Hapus" dengan target sentuh ≥ 44px.
    - **Tablet & Desktop (≥ 640px):** Tampilkan tabel data lengkap yang rapi dan terstruktur.
  - Tombol aksi atas dibuat menjadi grid / flex responsif yang rapi pada layar kecil.

---

### E. Halaman Informasi & Tabel Tarif (`src/pages/tarif.astro`)
- **Tingkat Prioritas:** MEDIUM
- **Temuan Saat Ini:**
  - Tabel tarif memiliki 7 kolom data teknis (Komponen, Jenis, Tarif, Basis, Unit, Cap, Status).
  - Pada layar sempit, tabel berada dalam `overflow-x-auto` tanpa petunjuk geser.
- **Rekomendasi Perbaikan:**
  - Tambahkan banner petunjuk geser visual untuk layar ponsel: *"Geser tabel ke samping untuk melihat batas maksimal & status &rarr;"*.
  - Atur lebar minimum kolom (`min-w-[120px]`) agar teks tidak terjepit menjadi satu huruf per baris.

---

### F. Tipografi & Spacing Sistemik (`src/styles/tokens.css`)
- **Tingkat Prioritas:** MEDIUM
- **Temuan Saat Ini:**
  - Beberapa kelas CSS tombol (`.mode-selector-btn`, `.platform-tab-btn`) memiliki fixed height di bawah 40px.
- **Rekomendasi Perbaikan:**
  - Tambahkan aturan touch target minimal 44 × 44 px, `touch-action: manipulation`, dan `-webkit-tap-highlight-color: transparent`.

---
*Status: Audit selesai. Lanjut ke penyusunan `RESPONSIVE_DESIGN_GUIDELINE.md` dan eksekusi perbaikan kode.*
