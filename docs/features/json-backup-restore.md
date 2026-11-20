# Fitur: Cadangkan & Pulihkan JSON (Backup & Restore)

Fitur untuk memindahkan riwayat produk antar komputer atau ponsel menggunakan berkas cadangan standar JSON.

---

## Format Berkas Cadangan
```json
{
  "app": "KalkulatorSeller",
  "schemaVersion": "1.0.0",
  "exportDate": "2026-11-21T06:00:00.000Z",
  "totalItems": 3,
  "items": [
    {
      "id": "sku_1732168800000_abcde",
      "name": "Kemeja Polos Katun",
      "platform": "shopee",
      "price": 120000,
      "hpp": 60000,
      "netProfit": 38200
    }
  ]
}
```

---

## Validasi Ketahanan (Resilience)
Fungsi `validateJsonBackup` di `src/utils/backup.js` memvalidasi:
1. Batas ukuran file maksimal 5MB untuk mencegah *Denial of Service* memori browser.
2. Integritas struktur JSON dan keberadaan array `items`.
3. Sanitasi nilai default untuk setiap field yang hilang atau tidak valid.
4. Memberikan pesan error dalam Bahasa Indonesia yang jelas jika berkas rusak.
