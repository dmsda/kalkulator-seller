# Kebijakan Keamanan (Security Policy)

Keamanan data pengguna dan integritas kalkulasi adalah prioritas utama kami di **KalkulatorSeller**.

---

## 🛡 Versi yang Didukung

Pembaruan keamanan aktif disediakan untuk versi rilis utama berikut:

| Versi | Didukung Secara Aktif |
|:---:|:---:|
| `1.0.x` | :white_check_mark: Ya |
| `< 1.0.0` | :x: Tidak |

---

## 🔒 Arsitektur Keamanan KalkulatorSeller

KalkulatorSeller dirancang dengan prinsip **Keamanan Sejak Desain (Security by Design)**:
1. **100% Client-Side Static Site**: Aplikasi tidak menggunakan server API backend, database terpusat, atau autentikasi berbasis sesi server. Data pengguna tidak pernah ditransmisikan keluar dari peramban.
2. **Mitigasi Serangan Formula Injection (CSV)**: Seluruh string teks pada nama produk dan ID SKU dinetralkan secara ketat sebelum diekspor ke format CSV. Karakter pemicu formula (`=`, `+`, `-`, `@`, `\t`, `\r`) secara otomatis diawali dengan tanda kutip tunggal (`'`).
3. **Pencegahan DOM-based XSS**: Komponen tampilan riwayat produk (`SavedSkuList.astro`) menggunakan manipulasi elemen DOM murni (`document.createElement`, `textContent`) dan menolak rendering langsung HTML tak terpercaya.
4. **Isolasi Memori Browser**: Data SKU disimpan di bawah namespace `kalkulatorseller_skus_v1` dengan validasi skema ketat.

---

## 🚨 Cara Melaporkan Kerentanan Keamanan

Jika Anda menemukan celah atau potensi kerentanan keamanan pada KalkulatorSeller:
1. **JANGAN membuka issue publik di GitHub** untuk masalah keamanan yang belum diperbaiki.
2. Laporkan secara privat melalui **GitHub Private Security Advisory** di repositori:
   `https://github.com/dmsda/kalkulator-seller/security/advisories/new`
3. Sertakan informasi berikut dalam laporan Anda:
   - Deskripsi lengkap potensi kerentanan.
   - Langkah-langkah detail untuk mereproduksi masalah (*proof of concept*).
   - Dampak potensial terhadap pengguna atau data lokal.
4. Tim kami akan meninjau dan merespons laporan dalam waktu maksimal 2 x 24 jam hari kerja.
