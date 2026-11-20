# Pengujian End-to-End (E2E Testing & User Journeys)

Dokumentasi mengenai pengujian alur pengguna nyata (*Real User Journeys*) dan verifikasi paritas *Ground Truth Oracle* independen di `tests/e2e/`.

---

## 1. Independent Calculation Oracle (`calculationOracle.js`)
- Mengimplementasikan seluruh rumus matematika PRD Section 5 dari aritmatika murni tanpa mengimpor berkas engine aplikasi.
- Membandingkan hasil `calculateForward()` dengan perhitungan independen hingga 5 digit desimal tanpa bias mandiri (*zero self-referential bias*).

---

## 2. Delapan Perjalanan Pengguna Nyata (Journeys 1 – 8)
1. **Journey 1: Onboarding Pengunjung Baru**: Memuat nilai default awal aman dan kalkulasi langsung tampil tanpa interaksi pengguna.
2. **Journey 2: Perhitungan Forward Lengkap**: Pesanan produk fashion dengan diskon promo, kuantiti jamak, biaya packing, iklan, dan affiliate.
3. **Journey 3: Cari Harga Jual Ideal**: Pengguna memasukkan target untung bersih Rp 40.000, sistem menghasilkan harga rekomendasi yang terbukti mencapai target dengan minimalitas kelipatan Rp 100.
4. **Journey 4: Komparasi 3 Marketplace**: Membandingkan produk identik di Shopee, TikTok Shop, dan Tokopedia untuk melihat margin untung bersih per platform.
5. **Journey 5: Manajemen Riwayat SKU LocalStorage**: Siklus hidup lengkap Create, Read, Update, Delete, dan Clear All.
6. **Journey 6: Ekspor CSV & Formula Injection Shield**: Verifikasi netralisasi karakter berbahaya (`=`, `+`, `-`, `@`, `\t`, `\r`) dengan tanda kutip tunggal (`'`).
7. **Journey 7: Cadangkan & Pulihkan JSON**: Memvalidasi pencadangan data, pemulihan data valid, serta penanganan berkas korup/terlalu besar (> 5MB).
8. **Journey 8: Reset Formulir & Isolasi Memori**: Memastikan pembersihan memori total tanpa meninggalkan session zombie.
