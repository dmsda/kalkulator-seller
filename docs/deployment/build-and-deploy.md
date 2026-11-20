# Alur Build & Kompilasi Produksi (Build and Deploy)

Dokumentasi mengenai proses kompilasi aset statis Astro SSG pada **KalkulatorSeller**.

---

## 🏗 Tahapan Kompilasi `npm run build`

1. **Sinkronisasi Konten**: Astro menyinkronkan konten rute dan definisi tipe data ke `.astro/types.d.ts`.
2. **Transformasi Vite**: Modul CSS Tailwind v4 dikompilasi ke CSS teroptimasi tunggal, dan JavaScript ES Modules di-bundle ke dalam chunk terpisah dengan kompresi gzip.
3. **Pembangkitan Rute Statis (SSG)**:
   - `/index.html` (Halaman utama)
   - `/shopee/index.html` (Kalkulator Shopee)
   - `/tiktok-shop/index.html` (Kalkulator TikTok Shop)
   - `/tokopedia/index.html` (Kalkulator Tokopedia)
   - `/tarif/index.html` (Tabel transparansi tarif)
   - `/panduan/index.html` (Panduan edukasi seller)
   - `/privacy-policy/index.html` (Kebijakan privasi)
   - `/terms/index.html` (Syarat & ketentuan)
   - `/404.html` (Halaman galat)
   - `/sitemap.xml` (Endpoint XML sitemap dinamis)
4. **Waktu Kompilasi**: Rata-rata kompilasi lokal selesai dalam waktu **~550 milidetik**.
