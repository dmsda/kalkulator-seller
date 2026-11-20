# Rekomendasi Lisensi untuk Pemilik Proyek (License Options)

**Status Saat Ini**: *Hak Cipta Dilindungi (All Rights Reserved)* oleh pemilik proyek.
Pemilihan lisensi publik resmi ditunda hingga pemilik repositori (**@dmsda**) menentukan model distribusi yang diinginkan.

Berikut ringkasan opsi lisensi yang direkomendasikan beserta konsekuensi hukum dan bisnisnya:

---

## Opsi 1: MIT License (Permissive Open Source)
- **Ringkasan**: Lisensi open-source paling populer, singkat, dan sangat bebas.
- **Kelebihan**:
  - Memudahkan adopsi komunitas developer secara luas.
  - Siapa pun bebas menggunakan, menyalin, memodifikasi, dan mendistribusikan kode.
- **Konsekuensi**:
  - Pihak lain atau kompetitor dapat mengambil seluruh kode KalkulatorSeller dan membungkusnya ke dalam situs komersial mereka tanpa kewajiban membagikan perubahan kembali.
- **Cocok Jika**: Tujuannya murni kontribusi publik nirlaba (*pure public utility tool*).

---

## Opsi 2: GNU AGPLv3 (Strong Copyleft / SaaS Protection)
- **Ringkasan**: Lisensi copyleft kuat yang dirancang khusus untuk aplikasi berbasis web (SaaS/web tools).
- **Kelebihan**:
  - Mewajibkan siapa pun yang meng-host atau memodifikasi KalkulatorSeller di internet untuk membuka seluruh kode modifikasinya secara publik.
  - Melindungi jerih payah pengembang dari perusahaan yang ingin mengomersialkan alat ini secara tertutup di balik layanan mereka.
- **Konsekuensi**:
  - Lebih ketat bagi developer yang ingin mengintegrasikan modul ini ke dalam proyek tertutup milik mereka.
- **Cocok Jika**: Ingin tetap open-source tetapi ingin mencegah komersialisasi sepihak oleh pihak ketiga.

---

## Opsi 3: Proprietary / Source-Available (All Rights Reserved)
- **Ringkasan**: Kode sumber terbuka untuk dibaca, dipelajari, diaudit, dan dikontribusikan di GitHub, namun hak cipta komersial dan hak penggandaan penuh tetap berada di tangan pemilik proyek.
- **Kelebihan**:
  - Memberikan perlindungan penuh terhadap pembajakan produk, branding, dan monetisasi independen oleh pihak luar.
  - Memungkinkan pemilik proyek mengomersialkan atau mengganti model lisensi di masa depan.
- **Konsekuensi**:
  - Bukan open-source murni menurut standar OSI (*Open Source Initiative*), melainkan *Source-Available*.
- **Cocok Jika**: Ingin transparansi penuh bagi seller dan developer, namun ingin melindungi orisinalitas produk KalkulatorSeller.

---

## Langkah Selanjutnya untuk Pemilik
Setelah menentukan pilihan:
1. Buat berkas `LICENSE` di root direktori dengan teks lisensi yang dipilih.
2. Perbarui tautan lisensi pada `README.md`.
