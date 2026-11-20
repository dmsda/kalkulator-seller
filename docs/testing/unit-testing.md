# Pengujian Unit (Unit Testing)

Dokumentasi mengenai pengujian unit komponen dan logika terisolasi di `tests/unit/`.

---

## Berkas Pengujian Unit
1. **`tests/unit/forwardPricing.test.js`**:
   - Memvalidasi formula forward pricing saat Harga > HPP.
   - Menguji pemisahan per-item vs per-order fee pada multi-kuantiti.
   - Menguji penerapan batas maksimal fee (*fee cap*).
   - Menguji penolakan diskon melebihi harga katalog (`ERR_DISCOUNT_EXCEEDS_PRICE`).
2. **`tests/unit/reversePricing.test.js`**:
   - Memvalidasi algoritma pencarian biner harga jual ideal.
   - Menguji pembulatan ke kelipatan Rp 100 terdekat ke atas.
   - Memvalidasi bahwa forward pricing pada harga rekomendasi memenuhi target laba.
3. **`tests/unit/tariffSchema.test.js`**:
   - Memvalidasi integritas struktur JSON pada `shopee.json`, `tiktok-shop.json`, dan `tokopedia.json`.
4. **`tests/unit/security.test.js`**:
   - Memvalidasi netralisasi formula injection pada ekspor CSV.
   - Memvalidasi sanitasi berkas backup JSON dan penolakan berkas korup.
5. **`tests/unit/responsive.test.js`**:
   - Memvalidasi token CSS target sentuh $\ge 44\text{px}$.
   - Memvalidasi keberadaan komponen responsif di HTML (`#mobile-menu-toggle-btn`, `#mobile-sticky-summary`).
6. **`tests/unit/seo.test.js`**:
   - Memvalidasi URL kanonikal konsisten dengan trailing slash.
   - Memvalidasi tag robots noindex pada halaman 404.
