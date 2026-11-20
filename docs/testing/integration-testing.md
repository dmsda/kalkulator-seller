# Pengujian Integrasi (Integration Testing)

Dokumentasi mengenai pengujian integrasi antarmodul di `tests/integration/`.

---

## Cakupan Pengujian Integrasi
Pengujian di `tests/integration/calculatorIntegration.test.js` memverifikasi kolaborasi antar modul:
1. **Multi-Platform Consistency**:
   - Menjalankan skenario pesanan yang sama di Shopee, TikTok Shop, dan Tokopedia.
   - Memastikan hierarki `Revenue >= Gross >= Mkt >= Ops >= Net Profit` terpenuhi secara konsisten di seluruh platform.
2. **Reverse-Forward Roundtrip**:
   - Menjalankan pencarian harga ideal dari target keuntungan tertentu.
   - Mengambil harga hasil rekomendasi dan memasukkannya kembali ke fungsi forward pricing untuk memverifikasi bahwa target keuntungan tercapai di ketiga platform.
3. **Storage & Serialization Pipeline**:
   - Memverifikasi data SKU dapat diekspor ke CSV dan dicadangkan ke format JSON tanpa kehilangan data atau perubahan tipe numerik.
