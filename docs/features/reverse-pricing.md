# Fitur: Cari Harga Jual Ideal (Reverse Pricing)

Fitur inovatif untuk menemukan harga jual katalog minimum yang wajib dipasang seller agar mencapai target keuntungan bersih tertentu.

---

## Masalah yang Diselesaikan
Banyak seller menghitung harga jual dengan cara manual sederhana:
> *"Modal saya Rp 50.000, saya ingin untung Rp 20.000, jadi saya jual Rp 70.000."*

Kenyataannya, saat barang laku Rp 70.000:
- Marketplace memotong biaya admin dan layanan (misal total 10.5% = Rp 7.350).
- Ada biaya penanganan transaksi flat Rp 1.000.
- Ada biaya packing Rp 2.000.
- Sisa uang bersih hanya: Rp 70.000 - Rp 50.000 - Rp 7.350 - Rp 1.000 - Rp 2.000 = **Rp 9.650** (jauh di bawah target Rp 20.000).

---

## Cara Kerja Reverse Pricing
Pengguna cukup memasukkan:
- **Target Untung Bersih (Rp)**: Berapa uang bersih yang ingin Anda kantongi per barang atau per order.
- Modal HPP, diskon toko, dan biaya operasional.

Algoritma pencarian biner (*binary search*) akan melakukan simulasi maju berulang kali hingga menemukan harga jual minimum yang menjamin bahwa setelah **seluruh potongan marketplace, packing, dan biaya transaksi dipotong**, keuntungan bersih riil Anda tetap $\ge$ target.

Harga hasil rekomendasi otomatis dibulatkan ke kelipatan Rp 100 terdekat ke atas agar harga jual tampak rapi dan mudah dipasang di katalog toko.
