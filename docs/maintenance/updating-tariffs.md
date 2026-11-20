# Panduan Memperbarui Tarif Marketplace (Updating Tariffs)

Panduan bagi maintainer dan kontributor untuk memperbarui persentase biaya administrasi marketplace saat ada pengumuman kebijakan baru.

---

## 📍 Lokasi Berkas Konfigurasi
Seluruh aturan biaya disimpan di:
- Shopee: `src/data/tariffs/shopee.json`
- TikTok Shop: `src/data/tariffs/tiktok-shop.json`
- Tokopedia: `src/data/tariffs/tokopedia.json`

---

## 🛠 Langkah Pembaruan Tarif Tanpa Merusak Engine

1. **Buka Berkas JSON yang Bersangkutan**:
   Cari objek aturan biaya dalam array `fees` berdasarkan `id` (misal `shopee_admin_non_star_cat_a`).
2. **Sesuaikan Properti**:
   - `rate`: Masukkan persentase desimal baru (misal `0.065` untuk 6.5%).
   - `cap`: Sesuaikan batas maksimal nominal (atau `null` jika tidak ada cap).
   - `effectiveFrom`: Tanggal mulai berlakunya kebijakan baru (format `YYYY-MM-DD`).
   - `lastVerified`: Tanggal Anda melakukan verifikasi ke sumber resmi.
   - `sourceUrl`: Tautan pengumuman resmi di Pusat Edukasi Seller.
3. **Uji Validitas Skema & Komputasi**:
   Jalankan test suite otomatis:
   ```bash
   npm test
   ```
   Test `tariffSchema.test.js` akan secara otomatis memverifikasi bahwa berkas JSON mematuhi skema dan tidak merusak fungsi kalkulasi.
4. **Commit & Pull Request**:
   Buat commit dengan pesan:
   `tariff: update shopee category a admin fee to 6.5%`
