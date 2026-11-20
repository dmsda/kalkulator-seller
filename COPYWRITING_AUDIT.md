# AUDIT COPYWRITING — KALKULATORSELLER

Dokumen audit ini mencatat hasil evaluasi teks di seluruh halaman dan komponen KalkulatorSeller, mengidentifikasi bahasa yang terlalu teknis, kaku, berbau AI-slop, atau membingungkan bagi penjual pemula / UMKM di Indonesia, serta usulan perbaikannya.

---

## 1. Komponen Navigasi & Tata Letak Global

### A. Header (`src/components/Header.astro`)
- **Teks saat ini:** Subtitle "Hitung margin & fee marketplace"
- **Masalah:** Menggunakan istilah bahasa Inggris (*margin & fee*) yang terasa kaku dan teknis.
- **Usulan perbaikan:** "Kalkulator Keuntungan Seller Online"
- **Alasan:** Langsung menjelaskan fungsi aplikasi dengan bahasa Indonesia yang akrab bagi seller.

### B. Footer (`src/components/Footer.astro`)
- **Teks saat ini:**
  - "Alat hitung mandiri untuk seller online Indonesia. Menghitung modal, potongan marketplace, dan margin profit bersih sebelum menentukan harga jual."
  - "Transparansi Skema Tarif"
  - "Kebijakan Privasi (Data Lokal)"
  - "Hasil kalkulasi adalah estimasi simulasi berdasarkan aturan tarif publik yang terverifikasi. Selalu periksa tagihan aktual di Seller Center resmi Anda."
- **Masalah:** Frasa "alat hitung mandiri", "estimasi simulasi", "margin profit bersih" terdengar seperti bahasa korporat / terjemahan mesin.
- **Usulan perbaikan:**
  - "Kalkulator praktis untuk penjual online di Shopee, TikTok Shop, dan Tokopedia. Hitung modal, biaya admin, dan keuntungan bersih sebelum pasang harga di toko."
  - Link: "Daftar Tarif Marketplace", "Kebijakan Privasi", "Panduan Hitung Untung".
  - Disclaimer: "Perhitungan ini merupakan perkiraan berdasarkan aturan resmi marketplace. Selalu cek rincian saldo dan tagihan di aplikasi Seller Center toko Anda."
- **Alasan:** Lebih bersahabat, jelas, dan tidak membuat cemas pengguna awam.

---

## 2. Kalkulator Utama (`src/components/Calculator.astro`)

### A. Tombol Mode Perhitungan
- **Teks saat ini:** "Hitung Profit (Forward)" dan "Cari Harga Jual (Reverse)"
- **Masalah:** Istilah *(Forward)* dan *(Reverse)* adalah terminologi software engineering / kalkulus algoritma. Seller awam tidak mengerti apa arti forward/reverse.
- **Usulan perbaikan:**
  - "Hitung Keuntungan" (dari harga jual yang sudah ada)
  - "Cari Harga Jual Ideal" (dari target untung yang diinginkan)
- **Alasan:** Menggunakan bahasa tujuan nyata yang dicari penjual.

### B. Bagian Profil Toko & Kategori
- **Teks saat ini:**
  - "1. Profil Toko & Kategori Produk"
  - "Program Promosi Marketplace"
  - "Status tarif: Estimasi aturan publik &bull; Sumber Resmi &rarr;"
- **Masalah:** Terlalu kaku seperti formulir perizinan instansi.
- **Usulan perbaikan:**
  - "1. Tipe Toko & Kategori Produk"
  - "Program Ekstra yang Diikuti (Opsional)"
  - "Tarif diperbarui dari aturan resmi marketplace &bull; Lihat sumber &rarr;"
- **Alasan:** Memberikan kenyamanan bahwa opsi program adalah pilihan opsional.

### C. Bagian Harga, Diskon & Modal
- **Teks saat ini:**
  - Label: "Harga Jual Katalog per Unit", keterangan: "Harga sebelum diskon yang Anda pasang di etalase."
  - Label: "Diskon Seller per Unit (Opsional)", keterangan: "Diskon atau voucher toko yang ditanggung seller."
  - Label: "HPP / Modal Produk per Unit", keterangan: "Biaya produksi atau harga beli produk dari supplier."
  - Label: "Jumlah Terjual (Quantity)", keterangan: "Default 1 pesanan. Biaya flat per-order dihitung 1 kali."
  - Label Target: "Target Profit Bersih", "Satuan Target Profit", "Per Unit Produk", "Per Total Pesanan (Seluruh Qty)"
- **Masalah:** Singkatan "HPP" dan kata "Quantity" / "per Unit" / "per Order" membingungkan seller rumahan.
- **Usulan perbaikan:**
  - Label: "Harga Jual Normal di Toko", keterangan: "Harga yang tertera di etalase produk Anda."
  - Label: "Diskon dari Toko (Opsional)", keterangan: "Voucher diskon atau potongan harga yang Anda tanggung sendiri."
  - Label: "Modal Produk (HPP) per Barang", keterangan: "Harga beli dari supplier atau total biaya produksi untuk satu barang."
  - Label: "Jumlah Barang dalam 1 Pesanan", keterangan: "Berapa banyak barang yang dibeli pelanggan dalam sekali checkout."
  - Mode Cari Harga:
    - "Target Keuntungan Bersih", keterangan: "Uang bersih yang ingin Anda kantongi."
    - Satuan: "Untung per Satu Barang" dan "Untung per Total Pesanan"
- **Alasan:** Mudah dicerna dalam sekali baca.

### D. Biaya Tambahan & Operasional
- **Teks saat ini:**
  - "3. Biaya Tambahan & Operasional"
  - Label: "Packing & Ops per Unit", keterangan: "Kardus, bubble wrap, lakban, label."
  - Label: "Alokasi Iklan per Order", keterangan: "Estimasi biaya ads per transaksi."
  - Label: "Komisi Affiliate / Kreator", keterangan: "Komisi kreator jika ada."
- **Masalah:** Singkatan seperti "Ops", "Ads", dan "per Order" kurang ramah.
- **Usulan perbaikan:**
  - "3. Biaya Tambahan (Packing & Iklan)"
  - Label: "Biaya Bungkus / Packing", keterangan: "Kardus, bubble wrap, lakban, plastik, atau stiker."
  - Label: "Biaya Iklan per Pesanan", keterangan: "Perkiraan biaya iklan untuk mendapatkan pesanan ini (isi Rp0 jika tidak beriklan)."
  - Label: "Komisi Affiliate / Kreator", keterangan: "Komisi untuk kreator jika produk terjual lewat live/video affiliate (isi Rp0 jika tidak ada)."
- **Alasan:** Menghilangkan kebingungan bagi seller yang tidak beriklan atau tidak memakai affiliate.

### E. Fitur Simpan Produk
- **Teks saat ini:**
  - "Simpan Simulasi ke Daftar SKU Anda"
  - Tombol: "Simpan SKU", "Reset"
  - Placeholder: "Contoh: Kemeja Linen Putih M"
  - Feedback: "Silakan isi nama produk terlebih dahulu.", "✓ Berhasil menyimpan "[nama]" ke browser Anda."
- **Masalah:** Kata "SKU" adalah istilah inventaris pergudangan (*Stock Keeping Unit*). Penjual pemula seringkali tidak tahu apa itu SKU.
- **Usulan perbaikan:**
  - "Simpan Hasil Perhitungan Produk"
  - Placeholder: "Contoh: Daster Rayon Motif M atau Sepatu Lari 42"
  - Tombol: "Simpan Produk", "Atur Ulang"
  - Feedback: "Tuliskan nama produk terlebih dahulu agar mudah diingat.", "✓ Produk \"[nama]\" berhasil disimpan di browser Anda."
- **Alasan:** Menghubungkan fungsi langsung dengan kebutuhan penjual.

### F. Hasil Perhitungan (Ringkasan Keuntungan)
- **Teks saat ini:**
  - "Ringkasan Keuntungan" &bull; "Total (1 Unit)"
  - "1. Profit Kotor (Revenue - HPP)" &bull; "Gross Margin: X%"
  - "2. Setelah Potongan Marketplace" &bull; "Biaya: -Rp X"
  - "3. Setelah Biaya Operasional / Packing" &bull; "Biaya Ops: -Rp X"
  - "4. Profit Bersih Akhir" &bull; "Margin Bersih: X% &bull; ROI: X%"
  - Rincian Bawah: "Pendapatan Efektif:", "Total Modal (HPP):", "Total Potongan Marketplace:", "Total Operasional, Iklan & Affiliate:"
- **Masalah:**
  - Penggunaan istilah asing campur aduk: "Revenue", "HPP", "Gross Margin", "ROI".
  - Pengguna tidak tahu apa arti persentase ROI dan Margin Bersih.
- **Usulan perbaikan:**
  - "1. Untung Kotor (Harga Jual - Modal)" &bull; Persentase: "Margin Kotor: X%"
  - "2. Sisa Setelah Potongan Marketplace" &bull; Subteks: "Total potongan admin: -Rp X"
  - "3. Sisa Setelah Biaya Packing" &bull; Subteks: "Biaya packing: -Rp X"
  - "4. Keuntungan Bersih yang Dibawa Pulang" &bull; Subteks: "Persentase Margin: X% &bull; Balik Modal (ROI): X%"
  - Penjelasan cepat: "Uang bersih yang masuk ke kantong Anda setelah seluruh modal dan biaya dipotong."
- **Alasan:** Seller langsung tahu di tahap mana uang mereka berkurang dan berapa rupiah riil yang mereka dapatkan.

### G. Tabel Rincian Potongan Marketplace
- **Teks saat ini:**
  - "Rincian Potongan Marketplace", "[X] Komponen"
  - Kolom: "Komponen Biaya", "Tarif", "Nominal"
  - Keterangan bawaan: "Catatan: Potongan dihitung otomatis sesuai kategori dan status toko Anda. Biaya per pesanan dikenakan 1 kali per transaksi terlepas dari jumlah item."
  - Badge: `[CAP]`
- **Masalah:** `[CAP]` terdengar teknis.
- **Usulan perbaikan:**
  - Tampilkan label `[Maks Rp X]` yang langsung terbaca.
  - Keterangan: "Catatan: Potongan dihitung otomatis berdasarkan kategori produk dan status toko Anda. Biaya per pesanan hanya dikenakan 1 kali untuk satu transaksi belanja."
- **Alasan:** Menghindari tanda tanya bagi pengguna.

---

## 3. Komponen Daftar Produk Tersimpan (`src/components/SavedSkuList.astro`)

- **Teks saat ini:**
  - Judul: "Daftar SKU Tersimpan"
  - Subjudul: "Data tersimpan secara lokal dan aman di browser Anda tanpa melalui server."
  - Tombol: "Ekspor CSV", "Unduh Backup", "Pulihkan Backup", "Hapus Semua"
  - Kolom tabel: "Nama Produk / SKU", "Platform", "Harga Jual", "Profit Bersih", "Margin", "Aksi"
  - Empty state: "Belum ada SKU yang disimpan. Lakukan simulasi di atas lalu klik \"Simpan SKU\"."
  - Alert dialogs: "Tidak ada SKU untuk diekspor", "Ditemukan X SKU dalam file backup...", "Hapus SKU [nama]?"
- **Masalah:** Seluruh terminologi berulang kali memakai kata "SKU", "Backup", "Restore".
- **Usulan perbaikan:**
  - Judul: "Daftar Produk yang Disimpan"
  - Subjudul: "Data tersimpan aman di browser perangkat Anda sendiri tanpa dikirim ke server manapun."
  - Tombol: "Unduh File Excel / CSV", "Simpan Cadangan", "Buka Cadangan", "Hapus Semua"
  - Empty state: "Belum ada produk yang disimpan. Coba hitung keuntungan produk Anda di atas, lalu klik **Simpan Produk** agar tidak perlu mengetik ulang nanti."
  - Dialog konfirmasi:
    - "Hapus produk \"[nama]\" dari daftar tersimpan?"
    - "Ditemukan [X] produk dalam file cadangan. Tambahkan ke daftar produk saat ini?"
    - "Yakin ingin menghapus seluruh ([X]) produk yang tersimpan di browser ini? Tindakan ini tidak bisa dibatalkan."
- **Alasan:** Menggunakan bahasa manusia yang menenangkan dan mudah dimengerti siapa saja.

---

## 4. Halaman Beranda (`src/pages/index.astro`)

- **Teks saat ini:**
  - H1: "Hitung Profit Jualan di Marketplace"
  - Paragraf: "Jualan ramai belum tentu untung. Masukkan modal (HPP), harga jual, dan biaya operasional untuk melihat estimasi potongan serta keuntungan bersih di Shopee, TikTok Shop, dan Tokopedia. Seluruh simulasi diproses secara lokal di browser Anda."
  - Shortcut: "Kalkulator Khusus:", "Skema Tarif &rarr;"
  - FAQ: Menggunakan istilah "4 tingkat profit", "Reverse Pricing", "HPP".
- **Masalah:** Terasa datar dan sedikit intimidatif dengan singkatan akuntansi.
- **Usulan perbaikan:**
  - H1: "Hitung Keuntungan Jualan Sebelum Menentukan Harga"
  - Paragraf: "Banyak seller kaget saat saldo pencairan toko lebih sedikit dari yang dibayangkan. Masukkan harga modal, harga jual, dan biaya packing untuk melihat rincian potongan marketplace serta sisa keuntungan bersih yang Anda bawa pulang. Gratis, tanpa perlu daftar, dan data Anda 100% aman di HP/laptop sendiri."
  - FAQ 1: "Mengapa keuntungan dibagi menjadi 4 tahap?" -> Dijelaskan dengan analogi dompet toko.
  - FAQ 2: "Bagaimana cara kerja fitur Cari Harga Jual Ideal?" -> Dijelaskan dengan gaya solusi praktis: *"Cukup tentukan mau untung berapa per barang, kami hitungkan harga jual yang harus dipasang di etalase."*
  - FAQ 3: "Apakah data modal dan keuntungan toko saya aman?" -> *"Sangat aman. Kami tidak punya server penyimpan data, jadi kami tidak bisa mengintip rahasia modal atau harga beli produk Anda."*

---

## 5. Halaman Platform: Shopee, TikTok Shop, Tokopedia

### A. Shopee (`src/pages/shopee.astro`)
- **Perbaikan:** Sederhanakan penjelasan Non-Star, Star, Mall, dan Gratis Ongkir XTRA dengan bahasa ringkas: "Perbedaan biaya admin toko biasa, Star Seller, dan Shopee Mall".

### B. TikTok Shop (`src/pages/tiktok-shop.astro`)
- **Perbaikan:** Jelaskan komisi kategori produk dan komisi affiliate sebagai: "Biaya bagi hasil untuk kreator yang bantu mempromosikan produk Anda lewat video atau live TikTok".

### C. Tokopedia (`src/pages/tokopedia.astro`)
- **Perbaikan:** Jelaskan pembagian grup kategori 1-4 secara gamblang: "Tokopedia membedakan persentase potongan berdasarkan jenis produk (misal pakaian, kosmetik, atau elektronik)".

---

## 6. Halaman Panduan (`src/pages/panduan.astro`)

- **Masalah saat ini:** Panduan terasa abstrak dan teoretis.
- **Usulan perbaikan:** Berikan contoh simulasi angka riil yang dialami seller sehari-hari:
  - *Contoh: Jual Kemeja harga Rp 100.000, modal beli Rp 50.000.*
  - *Potongan admin & gratis ongkir: Rp 10.000.*
  - *Biaya plastik & kardus packing: Rp 2.500.*
  - *Uang bersih yang masuk kantong: Rp 37.500 (Bukan Rp 50.000).*

---

## 7. Halaman Transparansi Tarif (`src/pages/tarif.astro`)

- **Masalah saat ini:** Menggunakan frasa "membaca aturan pemotongan dari konfigurasi terstruktur".
- **Usulan perbaikan:** "Daftar Aturan dan Potongan Resmi Marketplace. Kami merangkum persentase potongan biaya admin, gratis ongkir, dan biaya transaksi resmi dari Shopee, TikTok Shop, dan Tokopedia agar Anda tidak bingung menghitungnya secara manual."

---

## 8. Halaman Kebijakan Privasi & Ketentuan Penggunaan

- **Perbaikan:** Menambahkan ringkasan bahasa awam (*human summary*) di bagian paling atas setiap halaman agar pengguna tidak perlu pusing membaca teks hukum yang panjang.

---
*Status: Audit selesai. Lanjut ke penyusunan `COPYWRITING_GUIDELINE.md` dan eksekusi perbaikan kode.*
