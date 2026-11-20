# Pemecahan Masalah (Troubleshooting)

Daftar solusi untuk kendala yang mungkin ditemui saat memasang, menjalankan, atau menguji **KalkulatorSeller**.

---

## 1. Galat saat Menjalankan `npm install`
- **Penyebab**: Versi Node.js terlalu lama atau konflik cache NPM.
- **Solusi**:
  1. Pastikan Node.js `>= 20.x`:
     ```bash
     node -v
     ```
  2. Bersihkan cache NPM dan hapus `node_modules`:
     ```bash
     rm -rf node_modules package-lock.json
     npm cache clean --force
     npm install
     ```

---

## 2. Port `4321` Sudah Digunakan
- **Penyebab**: Terdapat instance server Astro lain yang sedang berjalan di background.
- **Solusi**:
  Jalankan server di port lain:
  ```bash
  npm run dev -- --port 4322
  ```
  Atau hentikan proses yang menggunakan port 4321:
  ```bash
  lsof -ti :4321 | xargs kill -9
  ```

---

## 3. Diagnostik `npx astro check` Melaporkan Galat
- **Penyebab**: Terdapat deklarasi tipe data yang tidak cocok atau berkas tsconfig rusak.
- **Solusi**:
  Pastikan `@astrojs/check` dan `typescript` terpasang di `devDependencies`, dan `tsconfig.json` memperluas `astro/tsconfigs/strict`:
  ```json
  {
    "extends": "astro/tsconfigs/strict",
    "include": [".astro/types.d.ts", "**/*"],
    "exclude": ["dist"]
  }
  ```

---

## 4. Hasil Ekspor CSV Terbuka Berantakan di Excel
- **Penyebab**: Microsoft Excel di beberapa sistem Windows memerlukan *UTF-8 Byte Order Mark (BOM)* untuk mengenali pemisah koma dan karakter lokal secara benar.
- **Solusi**: Fungsi `generateSkuCsv` di `src/utils/exportCsv.js` telah secara otomatis menyertakan karakter BOM `\uFEFF` di awal berkas. Jika tetap terbuka dalam 1 kolom, gunakan fitur *Data > From Text/CSV* di Excel dengan delimiter koma.

---

## 5. Data SKU Tersimpan Hilang
- **Penyebab**: Data tersimpan di memori browser pengguna (`LocalStorage`). Menghapus riwayat penjelajahan (*Clear Browsing Data / Cache*) atau menggunakan *Incognito / Private Window* akan membersihkan memori lokal tersebut.
- **Solusi**: Gunakan tombol **Cadangkan Data (JSON)** secara berkala untuk menyimpan arsip data ke komputer atau ponsel Anda.
