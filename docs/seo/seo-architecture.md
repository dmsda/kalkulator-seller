# Arsitektur SEO Teknis (Technical SEO Architecture)

Dokumentasi mengenai strategi dan implementasi Search Engine Optimization (SEO) teknis pada **KalkulatorSeller**.

---

## 🎯 Target Kata Kunci Utama
1. `kalkulator biaya marketplace`
2. `kalkulator shopee`
3. `kalkulator tiktok shop`
4. `kalkulator tokopedia`
5. `cara hitung keuntungan jualan online`
6. `cara menentukan harga jual ideal seller`

---

## 🏗 Fondasi SEO Astro SSG
1. **Pre-rendered Static HTML**: Seluruh konten halaman, judul, dan artikel panduan terkompilasi sebagai HTML statis di sisi server/build time. Robot Google/Bing dapat langsung mengindeks teks tanpa perlu menjalankan renderer JavaScript yang lambat.
2. **Canonical Trailing Slash Sync**: Seluruh URL kanonikal dinormalisasi dengan akhiran slash konsisten (`/shopee/`, `/tiktok-shop/`, `/tokopedia/`) untuk mencegah masalah konten duplikat (*duplicate content penalty*).
3. **Pencegahan Doorway Pages**: Halaman kalkulator spesifik platform (`/shopee`, `/tiktok-shop`, `/tokopedia`) tidak sekadar mengubah judul, melainkan dilengkapi dengan panduan biaya mendalam, tips mitigasi potongan, dan tabel tarif spesifik platform yang unik dan bernilai tambah bagi pengguna.
