# PANDUAN DESAIN RESPONSIF & MULTI-DEVICE
# KALKULATORSELLER

Panduan ini mengatur standar teknis antarmuka untuk memastikan KalkulatorSeller dapat digunakan secara sempurna pada semua perangkat, dari smartphone berlayar sempit (320px) hingga monitor desktop besar (1920px).

---

## 1. SISTEM BREAKPOINT & PENDEKATAN REFLOW

Kami menggunakan sistem breakpoint Tailwind CSS v4 dengan pendekatan adaptif 3-state (bukan sekadar 2-state mobile/desktop):

| Breakpoint | Rentang Layar | Target Perangkat | Pendekatan Tata Letak |
|---|---|---|---|
| **Base (< 640px)** | 320px – 639px | Smartphone kecil & standar | Single column stack, padding ringkas (16px), touch target ≥ 44px, sticky summary bar |
| **sm (≥ 640px)** | 640px – 767px | Smartphone besar & mini tablet | Grid 2-kolom pada form field berpasangan, tabel data terstruktur |
| **md (≥ 768px)** | 768px – 1023px | Tablet portrait & landscape | Navigasi horizontal penuh terbuka, form dan hasil dengan spacing seimbang |
| **lg (≥ 1024px)** | 1024px – 1279px | Laptop kecil & desktop standar | Grid 2-kolom utama (7 kolom form input + 5 kolom hasil kalkulasi) |
| **xl (≥ 1280px)** | ≥ 1280px | Monitor kerja besar | Max container width 1160px di tengah layar (centered) dengan margin luas |

---

## 2. STANDAR TOUCH TARGET & ERGONOMI JEMPOL

Sesuai WCAG 2.2 Success Criterion 2.5.8 (Target Size Minimum) dan Anti-Slop Layout Mobile:

1. **Ukuran Interaksi Minimal:**
   - Semua tombol utama, tab platform, dan opsi segmented control memiliki tinggi minimal **44 × 44 CSS px**.
   - Input teks dan dropdown memiliki tinggi minimal **44 px**.
2. **Jarak Antartombol (Spacing):**
   - Jarak antar tombol yang bersebelahan minimal **8 px** untuk mencegah salah sentuh (*accidental taps*).
3. **Pencegahan Zoom Otomatis iOS Safari:**
   - Kolom input diatur dengan ukuran teks `text-base sm:text-sm` (16px di mobile) agar browser iOS Safari tidak melakukan pembesaran otomatis (*auto-zoom*) saat pengguna mengetik.

---

## 3. POLA RESPONSIVE KOMPONEN UTAMA

### A. Navigasi Header
- **Desktop (≥ 768px):** Menu horizontal berada di kanan logo dengan padding sentuh yang nyaman.
- **Mobile (< 768px):**
  - Tombol menu dengan ikon dan label teks jelas (`aria-expanded`, `aria-label="Menu navigasi"`).
  - Panel menu vertikal terbuka ke bawah dengan daftar menu berukuran 48px per baris.
  - Mendukung penutupan dengan tombol Escape atau mengetuk tautan.

### B. Form Kalkulator
- **Card Padding:** `p-4 sm:p-6 lg:p-7` — 16px di mobile agar ruang ketik maksimal; 24-28px di desktop.
- **Mode Selector:** Mengalir vertikal atau membungkus rapi di mobile jika layar < 360px.
- **Mobile Sticky Bottom Bar:**
  - Muncul di layar mobile saat pengguna berada di form.
  - Menampilkan ringkasan ringkas: *Keuntungan Bersih: Rp X &bull; Margin: X%*.
  - Tombol aksi cepat *"Lihat Rincian &darr;"* yang menggulir layar langsung ke kartu hasil.
  - Menghormati safe area iOS (`env(safe-area-inset-bottom)`).

### C. Daftar Produk Tersimpan (Saved SKU)
- **Tampilan Mobile (< 640px):** Kartu ringkas (*card list*). Setiap produk ditampilkan sebagai kartu terpisah dengan tombol aksi berukuran jempol.
- **Tampilan Desktop (≥ 640px):** Tabel data lengkap yang mudah dipindai secara tabular.

### D. Tabel Data & Tarif
- Kontainer tabel dibungkus dengan `overflow-x-auto` dan dilengkapi petunjuk gulir visual (*scroll hint*) di layar mobile agar pengguna tahu tabel dapat digeser ke samping.
- Kolom tabel memiliki `min-width` yang terukur sehingga teks tidak terpotong menjadi 1 huruf per baris.

---

## 4. ATURAN BEBAS OVERFLOW HORIZONTAL (R-03 & R-35)

1. Tidak ada elemen induk maupun anak yang menggunakan lebar kaku (`width: 500px`).
2. Semua kontainer menggunakan unit fleksibel (`w-full`, `max-w-full`).
3. Seluruh viewport dari lebar 320px diuji dan dijamin memiliki `overflow-x: hidden` pada level root/body tanpa kebocoran scroll horizontal.
