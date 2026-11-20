# Mitigasi & Pemulihan Data Klien (Backup and Recovery)

Panduan mengenai penanganan data lokal pengguna pada **KalkulatorSeller**.

---

## 💾 Mengapa Data Tersimpan di Browser?
KalkulatorSeller tidak menyimpan data produk di server pusat pengembang demi menjamin 100% privasi bisnis para seller. Data disimpan di `LocalStorage` browser perangkat yang sedang digunakan.

---

## 🔄 Prosedur Pencadangan Rutin
Seller yang mengelola puluhan hingga ratusan produk disarankan melakukan pencadangan mingguan:
1. Gulir ke bagian **Riwayat Produk Tersimpan**.
2. Klik tombol **"Cadangkan Data (JSON)"**.
3. Simpan file berkas cadangan (misal: `kalkulatorseller-backup-2026-11-21.json`) ke Google Drive, flashdisk, atau folder komputer yang aman.

---

## 📥 Prosedur Pemulihan Data di Perangkat Baru
Jika Anda berganti laptop atau membersihkan peramban:
1. Buka situs KalkulatorSeller di peramban baru.
2. Klik tombol **"Pulihkan Data (JSON)"**.
3. Pilih file cadangan JSON Anda. Sistem akan memvalidasi keaslian format dan langsung menampilkan seluruh daftar produk Anda kembali seketika.
