# Arsitektur Penyimpanan Klien (Storage Architecture)

Dokumentasi mengenai tata kelola penyimpanan data di browser pada **KalkulatorSeller**.

---

## 🔒 1. Isolasi & Kunci Penyimpanan
Penyimpanan lokal menggunakan Web Storage API (`window.localStorage`) dengan spesifikasi:
- **Kunci Penyimpanan (Key)**: `kalkulatorseller_skus_v1`
- **Versi Skema (Schema Version)**: `1.0.0`
- **Tujuan Versi Kunci**: Memungkinkan migrasi skema di masa depan tanpa merusak data lama pengguna yang tersimpan di browser.

---

## 📦 2. Manajemen Kapasitas & Kuota
- Mayoritas browser membatasi kuota `LocalStorage` sebesar 5MB per domain.
- Setiap objek produk SKU membutuhkan rata-rata ~350 byte teks JSON.
- Dengan kapasitas 5MB, pengguna dapat menyimpan lebih dari 10.000 SKU tanpa kendala kuota.
- Untuk menjaga performa render DOM, antarmuka `SavedSkuList.astro` dioptimalkan untuk menyajikan puluhan hingga ratusan produk tersimpan secara instan.

---

## 🛡 3. Perlindungan Keamanan & Sanitasi
1. **Pencegahan DOM-based XSS**:
   - Saat merender nama produk dari `LocalStorage`, kode program menggunakan `document.createElement('td')` dan menetapkan nilainya melalui properti `textContent`.
   - String HTML jahat seperti `<script>alert(1)</script>` atau `<img src=x onerror=...>` tidak akan pernah dieksekusi sebagai HTML.
2. **Pembersihan Bersih (Clean Wipe)**:
   - Fitur *Hapus Semua Produk* menjalankan `localStorage.removeItem(STORAGE_KEY)`, membersihkan seluruh data tanpa meninggalkan jejak atau *cache* zombie.
