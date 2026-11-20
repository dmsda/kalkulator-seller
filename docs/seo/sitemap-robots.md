# Sitemap Dinamis & Robots.txt (Sitemap & Robots)

Dokumentasi mengenai konfigurasi perayapan mesin pencari di **KalkulatorSeller**.

---

## 🗺 1. Endpoint Dinamis `sitemap.xml`
Diimplementasikan melalui file endpoint Astro di `src/pages/sitemap.xml.js`.

Menyajikan peta situs dengan format standar XML:
- **Header**: `Content-Type: application/xml; charset=utf-8`
- **Daftar Rute**:
  1. `/` (Priority: 1.0, Changefreq: weekly)
  2. `/shopee/` (Priority: 0.9, Changefreq: weekly)
  3. `/tiktok-shop/` (Priority: 0.9, Changefreq: weekly)
  4. `/tokopedia/` (Priority: 0.9, Changefreq: weekly)
  5. `/tarif/` (Priority: 0.8, Changefreq: weekly)
  6. `/panduan/` (Priority: 0.8, Changefreq: monthly)
  7. `/privacy-policy/` (Priority: 0.3, Changefreq: yearly)
  8. `/terms/` (Priority: 0.3, Changefreq: yearly)
- **Tag `<lastmod>`**: Menggunakan tanggal ISO dinamis (`YYYY-MM-DD`) saat proses kompilasi rilis.

---

## 🤖 2. Berkas `public/robots.txt`
```text
User-agent: *
Allow: /

Sitemap: https://kalkulatorseller.pages.dev/sitemap.xml
```
Memperbolehkan seluruh mesin pencari mengindeks rute publik dan secara eksplisit menautkan lokasi sitemap resmi.
