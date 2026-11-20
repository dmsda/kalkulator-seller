# Alur Kerja Aplikasi (Application Flow)

Dokumen ini menjelaskan alur siklus hidup inisialisasi, input pengguna, evaluasi perhitungan reaktif, dan pembaruan antarmuka pada **KalkulatorSeller**.

---

## 🔁 Siklus Hidup Reaktivitas di Browser

```mermaid
sequenceDiagram
    autonumber
    actor User as Seller (Pengguna)
    participant DOM as Calculator.astro (DOM)
    participant Engine as Calculation Engine
    participant Tariffs as Tariff Config (JSON)
    participant Storage as LocalStorage

    User->>DOM: Buka halaman kalkulator (/shopee, /tiktok-shop, dll)
    DOM->>Tariffs: Muat konfigurasi tarif awal
    DOM->>Engine: Jalankan forward pricing dengan nilai default
    Engine-->>DOM: Kembalikan hasil kalkulasi (Totals, PerUnit, Breakdown)
    DOM-->>User: Tampilkan kartu hasil kalkulasi & metrik awal

    User->>DOM: Ubah input (Harga, HPP, Diskon, Program Opsional)
    DOM->>DOM: Format visual input (Pemisah ribuan Rupiah)
    DOM->>Engine: Evaluasi calculateForward() atau calculateReverse()
    Engine->>Engine: Hitung 4 tingkat laba & evaluasi batas atas biaya (fee cap)
    Engine-->>DOM: Kembalikan payload hasil
    DOM->>DOM: Perbarui angka di Kartu Hasil, Tabel Biaya & Sticky Bar (Mobile)

    User->>DOM: Klik tombol "Simpan Produk Ini"
    DOM->>Storage: Simpan SKU ke LocalStorage (kalkulatorseller_skus_v1)
    Storage-->>DOM: Konfirmasi penyimpanan berhasil
    DOM-->>User: Tambahkan baris baru di Riwayat Produk Tersimpan
```

---

## ⚡ Detail Tahapan

### 1. Inisialisasi Halaman
- Astro menyajikan HTML statis yang sudah terisi konten dasar (*pre-rendered HTML*).
- Script klien membaca konfigurasi platform dari atribut data elemen formulir (`data-platform="shopee"`).
- Script langsung mengeksekusi perhitungan forward perdana agar pengguna langsung melihat simulasi angka realistis tanpa harus mengetik terlebih dahulu.

### 2. Penanganan Input Real-time
- Input harga mendengarkan event `input` dan secara otomatis memformat visual angka dengan pemisah ribuan titik (`Rp 100.000`), sementara nilai numerik integer murni (`100000`) dikirimkan ke mesin perhitungan.
- Perubahan dropdown kategori atau checkbox program promosi (seperti *Gratis Ongkir XTRA*) memicu evaluasi ulang seketika (*instant re-calculation*) tanpa kedipan layar (*no flicker*).

### 3. Pembaruan DOM Selektif
- Hanya elemen angka hasil (`#res-net-profit`, `#res-gross-profit`, `#res-admin-fee`, dll.) yang diperbarui teksnya menggunakan `textContent`.
- Format mata uang Rupiah diproses melalui modul `src/utils/currency.js` menggunakan `Intl.NumberFormat('id-ID')`.
