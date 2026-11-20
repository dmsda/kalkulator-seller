# Panduan Instalasi (Installation)

Panduan ini memandu Anda mengunduh, memasang, dan menjalankan proyek **KalkulatorSeller** di komputer lokal.

---

## Prasyarat Sistem
Pastikan perangkat Anda telah terpasang:
- **Node.js**: Versi `>= 20.0.0` (LTS direkomendasikan). Cek dengan perintah `node -v`.
- **NPM**: Versi `>= 10.0.0`. Cek dengan perintah `npm -v`.
- **Git**: Untuk kloning repositori. Cek dengan perintah `git --version`.

---

## Langkah-langkah Instalasi

### 1. Kloning Repositori
Jalankan terminal dan kloning repositori dari GitHub:
```bash
git clone https://github.com/dmsda/kalkulator-seller.git
cd kalkulator-seller
```

### 2. Memasang Dependensi
Gunakan `npm install` (atau `npm ci` untuk instalasi bersih berbasis `package-lock.json`):
```bash
npm install
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Setelah server aktif, buka peramban Anda di:
`http://localhost:4321`

Aplikasi mendukung *Hot Module Replacement (HMR)*, sehingga setiap perubahan berkas akan otomatis dimuat ulang di peramban secara instan.
