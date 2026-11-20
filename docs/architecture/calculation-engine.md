# Spesifikasi Mesin Perhitungan (Calculation Engine)

Dokumen ini mendokumentasikan spesifikasi matematis, formula aritmatika, dan penanganan kondisi batas (*edge cases*) pada **Pure Calculation Engine** KalkulatorSeller sesuai PRD Bagian 5 dan Bagian 8.

---

## 🧮 1. Formula Empat Tingkat Keuntungan (Four Profit Tiers)

Untuk memberikan gambaran finansial yang transparan bagi seller, keuntungan dipecah menjadi 4 tingkat hierarkis:

### Tingkat 1: Laba Kotor (Gross Profit)
Mengukur margin kotor murni antara harga jual efektif dan modal langsung produk:
$$\text{Harga Efektif } (P_e) = \max(0, P - D)$$
$$\text{Pendapatan Efektif } (R_e) = P_e \times Q$$
$$\text{Total HPP } (C) = \text{HPP} \times Q$$
$$\Pi_{\text{kotor}} = R_e - C$$
*Keterangan: $P$ = Harga Katalog, $D$ = Diskon Seller, $Q$ = Kuantiti.*

---

### Tingkat 2: Laba Setelah Marketplace (Profit After Marketplace)
Laba kotor setelah dikurangi seluruh potongan platform marketplace:
$$\Pi_{\text{marketplace}} = \Pi_{\text{kotor}} - \text{Total Biaya Marketplace}$$

Komponen Biaya Marketplace terdiri dari:
1. **Biaya Administrasi Pokok**: $\text{Rate}_{\text{admin}} \times P_e \times Q$ (mengacu pada kategori produk dan tipe toko seller).
2. **Biaya Layanan Program Promosi (Opsional)**: Misalnya Gratis Ongkir XTRA atau Cashback XTRA:
   $$\text{Biaya Program} = \min(\text{Rate}_{\text{prog}} \times P_e, \text{Cap}_{\text{prog}}) \times Q$$
3. **Biaya Penanganan / Pemrosesan Transaksi**: Biaya flat tetap per pesanan (misal Rp 1.000 flat per checkout pesanan, tidak dikalikan kuantiti).

---

### Tingkat 3: Laba Setelah Operasional (Profit After Operations)
Laba yang tersisa setelah menutup pengeluaran operasional toko:
$$\Pi_{\text{operasional}} = \Pi_{\text{marketplace}} - \text{Total Biaya Operasional}$$
Biaya operasional dibedakan menjadi:
- **Biaya per-item**: Seperti kardus, bubble wrap, stiker fragile ($\text{Amount} \times Q$).
- **Biaya per-order**: Seperti biaya cetak thermal resi, jasa antar kurir ($\text{Amount}$ flat per checkout).

---

### Tingkat 4: Untung Bersih Akhir (Final Net Profit)
Uang riil yang benar-benar masuk ke kas seller (*net cash in pocket*):
$$\Pi_{\text{bersih}} = \Pi_{\text{operasional}} - \text{Biaya Iklan} - \text{Komisi Affiliate}$$

---

## 📈 2. Perhitungan Rasio Finansial (Metrics)

1. **Margin Bersih (Net Margin)**:
   $$\text{Net Margin} = \frac{\Pi_{\text{bersih}}}{R_e}$$
2. **Gross Margin**:
   $$\text{Gross Margin} = \frac{\Pi_{\text{kotor}}}{R_e}$$
3. **Return on Investment (ROI)**:
   Berdasarkan modal langsung yang dikeluarkan seller (Modal HPP + Modal Packing Langsung):
   $$\text{ROI} = \frac{\Pi_{\text{bersih}}}{C + \text{Biaya Packing Langsung}}$$

---

## 🔍 3. Algoritma Reverse Pricing (Pencarian Biner)

Fitur *Cari Harga Jual Ideal* menyelesaikan permasalahan optimasi inversi:
> *"Berapa harga jual katalog minimum ($P^*$) yang menghasilkan untung bersih per unit $\ge T$?"*

### Tahapan Algoritma:
1. **Batas Bawah (Lower Bound)**: Inisialisasi awal $P_{\text{low}} = \max(1, \text{HPP} + D)$.
2. **Pencarian Eksponensial (Exponential Upper Bound Search)**: Mengalikan harga dua kali lipat ($P_{\text{high}} = P_{\text{low}} \times 2$) secara iteratif hingga menghasilkan $\Pi_{\text{bersih}} \ge T$, dengan batas pengaman maksimal Rp 1.000.000.000 (1 Miliar) dan maksimal 40 iterasi.
3. **Pencarian Biner (Binary Search)**: Mencari harga bilangan bulat minimal di antara rentang $[P_{\text{low}}, P_{\text{high}}]$ dalam maksimal 60 iterasi.
4. **Pembulatan Step (Rounding Step)**: Membulatkan harga minimum ke kelipatan terdekat ke atas (misal kelipatan Rp 100):
   $$P^* = \lceil \frac{P_{\text{min}}}{100} \rceil \times 100$$
5. **Verifikasi Maju (Forward Verification Loop)**: Menjalankan ulang fungsi forward pricing pada $P^*$ untuk membuktikan bahwa untung bersih riil memenuhi target, serta membuktikan bahwa $P^* - 100$ berada di bawah target untung.

---

## 🛡 4. Penanganan Kasus Ekstrem (Edge Cases)

| Kondisi Masukan | Perilaku Engine | Penjelasan |
|---|---|---|
| Diskon Seller > Harga Katalog | Mengembalikan galat `ERR_DISCOUNT_EXCEEDS_PRICE` | Diskon tidak boleh melebihi harga barang. |
| Modal HPP = 0 | Perhitungan tetap valid, Laba Kotor = Pendapatan | Berlaku untuk produk digital atau jasa. |
| Harga < Modal HPP | Mengembalikan untung bersih negatif (rugi) | Memberikan peringatan dini agar seller tahu nominal kerugian. |
| Harga Mewah (Rp 50 Juta+) | Fee cap diterapkan secara benar | Biaya program promosi berhenti pada batas maksimal Rp 10.000. |
| Kuantiti Banyak (Qty 10+) | Biaya flat per order tetap Rp 1.000 | Biaya penanganan transaksi tidak terkalikan secara keliru. |
