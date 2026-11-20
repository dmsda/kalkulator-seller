# Fitur: Hitung Keuntungan Maju (Forward Pricing)

Fitur utama untuk menghitung seluruh komponen biaya dan keuntungan bersih berdasarkan harga jual yang telah ditentukan seller.

---

## Masukan Pengguna (Inputs)
1. **Pilihan Marketplace**: Shopee, TikTok Shop, atau Tokopedia.
2. **Harga Katalog (Rp)**: Harga sebelum diskon toko.
3. **Diskon Promo Seller (Rp)**: Potongan voucher/diskon yang ditanggung sendiri oleh penjual.
4. **Modal Produk / HPP (Rp)**: Biaya bahan baku atau harga kulakan per unit barang.
5. **Jumlah Pesanan (Qty)**: Banyaknya barang yang dibeli pelanggan dalam 1 nomor pesanan.
6. **Tipe Toko**: Non-Star, Star, Star+, Mall, Power Merchant, dll.
7. **Kategori Produk**: Menentukan persentase biaya administrasi pokok.
8. **Program Promosi Opsional**: Keikutsertaan program Gratis Ongkir XTRA atau Cashback XTRA.
9. **Biaya Tambahan Pesanan**:
   - Biaya packing & lakban (per barang).
   - Biaya handling/print thermal (per pesanan).
   - Budget iklan berbayar (per pesanan).
   - Komisi affiliate (per pesanan).

---

## Luaran Perhitungan (Outputs)
- **Ringkasan Finansial**:
  - Total Pendapatan Efektif.
  - Total Potongan Marketplace.
  - Total Biaya Tambahan Toko.
  - **Untung Bersih Riil (Net Profit)**.
- **Rasio Bisnis**:
  - Margin Untung Bersih (%).
  - Return on Investment (ROI %).
- **Rincian Potongan Transparan**:
  - Biaya Administrasi Pokok.
  - Biaya Layanan Program Promosi (dengan status *cap* jika mencapai batas maksimal).
  - Biaya Pemrosesan / Penanganan Transaksi Flat.
