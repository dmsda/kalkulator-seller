# PANDUAN COPYWRITING (TONE OF VOICE & KAMUS ISTILAH)
# KALKULATORSELLER

Panduan ini menjadi standar penulisan konten dan komunikasi antarmuka (UI copy) untuk produk **KalkulatorSeller**. Seluruh teks di website harus mematuhi panduan ini agar terasa manusiawi, hangat, mudah dipahami penjual pemula, dan bebas dari bahasa teknis atau AI-slop.

---

## 1. TONE OF VOICE (KARAKTER SUARA)

1. **Bersahabat dan Menenangkan**
   - Penjual online sering merasa cemas dengan potongan admin marketplace yang terus naik atau takut salah menentukan harga jual.
   - Bahasa kita harus menenangkan, meyakinkan, dan memberi kejelasan angka secara transparan tanpa nada menggurui.

2. **Sederhana dan Praktis (Bahasa Manusia Sehari-hari)**
   - Gunakan kata-kata yang biasa dipakai saat pedagang mengobrol di pasar, toko, atau grup WhatsApp komunitas seller.
   - Jangan gunakan istilah perbankan, akuntansi formal, atau istilah coding/algoritma jika ada padanan bahasa sehari-hari.

3. **Jujur, Tanpa Janji Muluk (No AI Slop & No Hype)**
   - Hindari kata-kata bombastis seperti: *"Solusi mutakhir", "Revolusioner", "Maksimalkan omzet tanpa batas", "Game changer"*.
   - Nyatakan fungsi apa adanya: alat hitung untuk mengetahui modal, biaya admin, dan keuntungan bersih.

4. **Satu Kalimat, Satu Pesan**
   - Buat kalimat pendek dan langsung ke intinya. Hindari anak kalimat yang bertumpuk.

---

## 2. KAMUS ISTILAH: HINDARI VS GUNAKAN

| Istilah Kaku / Teknis / Asing | Istilah yang Digunakan (Bahasa Seller) | Penjelasan untuk Pengguna |
|---|---|---|
| **HPP (Harga Pokok Penjualan)** | **Modal Produk (HPP)** | Modal awal atau harga beli produk dari supplier sebelum dijual. |
| **Gross Profit** | **Keuntungan Kotor** | Selisih antara harga jual dan modal produk. |
| **Net Profit** | **Keuntungan Bersih** | Uang bersih yang benar-benar Anda kantongi setelah semua potongan dikurangi. |
| **Gross Margin / Net Margin** | **Margin Keuntungan (%)** | Persentase keuntungan dibandingkan dengan harga jual produk. |
| **ROI (Return on Investment)** | **Balik Modal (ROI)** | Perbandingan keuntungan bersih dengan modal yang Anda keluarkan. |
| **Forward Calculation** | **Hitung Keuntungan** | Menghitung berapa sisa untung dari harga jual yang sudah Anda pasang. |
| **Reverse Pricing** | **Cari Harga Jual Ideal** | Menghitung mundur berapa harga jual yang harus dipasang agar target untung tercapai. |
| **Operational Expenses / Ops** | **Biaya Packing & Operasional** | Biaya kardus, bubble wrap, lakban, plastik, atau stiker per pesanan. |
| **Advertising Cost / Ads** | **Biaya Iklan** | Uang yang dialokasikan untuk iklan berbayar (isi Rp0 jika tidak beriklan). |
| **Affiliate Commission** | **Komisi Affiliate** | Uang bagi hasil untuk kreator/affiliate yang mempromosikan produk Anda. |
| **Quantity / Qty** | **Jumlah Barang** | Jumlah produk yang dibeli pembeli dalam satu kali pesanan. |
| **SKU (Stock Keeping Unit)** | **Nama Produk / Barang** | Nama atau varian produk yang Anda simpan. |
| **Backup / Restore** | **Simpan Cadangan / Buka Cadangan** | Mengunduh atau memulihkan data produk ke perangkat Anda. |
| **Export CSV** | **Unduh Excel / CSV** | Menyimpan daftar produk ke file tabel yang bisa dibuka di Excel. |
| **Reset** | **Atur Ulang** | Mengembalikan angka ke pengaturan awal. |
| **CAP** | **Batas Maksimal Potongan** | Nilai potongan maksimal yang ditetapkan oleh marketplace. |
| **Effective Revenue** | **Pendapatan Bersih Penjualan** | Total uang yang diterima setelah diskon toko dipotong. |

---

## 3. STANDAR LABEL INPUT & PLACEHOLDER

### Input Form
- **Harga Normal Produk:** Label: `Harga Jual Normal di Toko`. Placeholder: `Contoh: 100.000`
- **Diskon Seller:** Label: `Diskon dari Toko (Opsional)`. Placeholder: `0`
- **Modal Produk:** Label: `Modal Produk (HPP) per Barang`. Placeholder: `Contoh: 50.000`
- **Target Keuntungan:** Label: `Target Keuntungan Bersih`. Placeholder: `Contoh: 25.000`
- **Jumlah Pesanan:** Label: `Jumlah Barang dalam 1 Pesanan`. Value default: `1`
- **Biaya Packing:** Label: `Biaya Packing & Bungkus`. Placeholder: `Contoh: 2.000`
- **Biaya Iklan:** Label: `Alokasi Biaya Iklan`. Placeholder: `0`
- **Komisi Affiliate:** Label: `Komisi Affiliate / Kreator`. Placeholder: `0`
- **Nama Produk Simpan:** Label: `Simpan Hasil Perhitungan Produk`. Placeholder: `Contoh: Daster Rayon Motif M atau Sepatu Lari 42`

---

## 4. STANDAR TOMBOL (CTA)

Tombol harus menggunakan kata kerja aktif yang jelas tujuannya:
- `Hitung Keuntungan` (bukan "Submit" atau "Process")
- `Cari Harga Jual Ideal` (bukan "Reverse Pricing")
- `Simpan Produk` (bukan "Save SKU" atau "Persist")
- `Atur Ulang` (bukan "Reset State")
- `Unduh Excel / CSV` (bukan "Export Data")
- `Simpan Cadangan` (bukan "Download JSON Backup")
- `Buka Cadangan` (bukan "Restore File")
- `Hapus Semua` (bukan "Clear DB")
- `Buka` (bukan "Load Item")
- `Hapus` (bukan "Delete")

---

## 5. STANDAR PESAN KESALAHAN (ERROR MESSAGE)

Pesan error harus membantu pengguna memahami apa yang kurang dan apa yang harus dilakukan selanjutnya:
- **Kurang baik:** `"Input invalid"`
- **Lebih baik:** `"Silakan masukkan harga jual lebih dari Rp0."`
- **Kurang baik:** `"Name is required"`
- **Lebih baik:** `"Tuliskan nama produk terlebih dahulu agar mudah ditemukan nanti."`
- **Kurang baik:** `"JSON corrupted or syntax error"`
- **Lebih baik:** `"File cadangan tidak sesuai atau rusak. Pastikan Anda memilih file backup dari KalkulatorSeller."`
- **Kurang baik:** `"Data empty"`
- **Lebih baik:** `"Belum ada produk yang tersimpan untuk diunduh."`

---

## 6. STANDAR PESAN SUKSES & KONFIRMASI

- **Simpan Produk:** `"✓ Produk \"[nama]\" berhasil disimpan di browser Anda."`
- **Hapus Satu Produk:** `"Hapus produk \"[nama]\" dari daftar tersimpan?"` -> Notifikasi: `"Produk berhasil dihapus."`
- **Hapus Semua:** `"Yakin ingin menghapus seluruh [X] produk yang tersimpan di browser ini? Tindakan ini tidak bisa dibatalkan."` -> Notifikasi: `"Semua data produk telah dihapus."`
- **Pulihkan Cadangan:** `"Ditemukan [X] produk dalam file cadangan. Tambahkan ke daftar produk saat ini?"` -> Notifikasi: `"✓ Berhasil memulihkan [X] produk."`
- **Unduh File:** `"File berhasil diunduh ke perangkat Anda."`

---

## 7. FORMAT PENULISAN RUPIAH & ANGKA

- Gunakan awalan `Rp` tanpa spasi atau dengan spasi tipis konsisten pada teks narasi: `Rp50.000` atau `Rp 50.000`.
- Pada kotak input (input box), letakkan `Rp` di sisi kiri input secara terpisah (*fixed prefix*) agar pengguna hanya mengetikkan nominal angka murni.
- Gunakan titik sebagai pemisah ribuan: `Rp100.000` (bukan `100,000`).
- Gunakan koma untuk desimal persentase: `4,5%` atau `5,75%`.
