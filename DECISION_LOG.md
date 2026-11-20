# DECISION LOG: KalkulatorSeller

Dokumen ini mencatat keputusan arsitektur, perbedaan referensi (Blueprint vs PRD vs UI/UX Spec), dan status persetujuan Product Owner (PO).

---

## Index Keputusan

| ID | Topik | Status | Keputusan / Tindakan |
|---|---|---|---|
| **DEC-001** | Font Stack (Blueprint vs UI/UX Spec) | RESOLVED | Mengikuti UI/UX Spec v1.0: Gunakan OS System Font Stack (`ui-sans-serif, system-ui, ...`). Dilarang memuat Google Fonts (Plus Jakarta Sans/Inter) demi performa dan zero external request. |
| **DEC-002** | Metrik Margin Utama | RESOLVED (PRD Default) | Mengikuti PRD 5.1: Margin utama dihitung dari `Profit Bersih Akhir / Pendapatan Efektif (E * Q)`. Label UI wajib eksplisit menyebut "Margin Bersih". Jika pendapatan 0, kembalikan `null` (UI tampilkan `---`). |
| **DEC-003** | Denominator ROI | RESOLVED (PRD Default) | Mengikuti PRD 5.1: Denominator ROI menggunakan total modal langsung yang terdefinisi: `HPP Total + Biaya Operasional Langsung (packing)`. Jika denominator 0, kembalikan `null`. |
| **DEC-004** | Status Biaya Iklan Tidak Diketahui | RESOLVED (PRD Default) | Mengikuti PRD 5.1: Jika biaya iklan tidak diisi pengguna, angka profit yang ditampilkan sebagai angka final adalah `Profit Setelah Operasional`, dengan catatan `Profit Bersih Akhir` belum memperhitungkan iklan. Dilarang mengklaim sebagai final. |
| **DEC-005** | Reverse Pricing Guardrail | RESOLVED | Mengikuti PRD 8.4: Tidak menggunakan batas matematis kaku 99% Blueprint. Gunakan binary search berbasis forward engine, validasi domain harga, exponential upper bound, dan verifikasi forward + minimum step check. Batas 99% hanya sebagai guardrail peringatan produk. |
| **DEC-006** | Status Tarif Marketplace Produksi | RESOLVED | Angka contoh di Blueprint V3.0 tidak boleh dipakai sebagai tarif resmi. Semua tarif di `src/data/tariffs/` wajib memiliki sumber URL resmi, tanggal berlaku, dan status. Jika belum diverifikasi PO, wajib diberi flag `isAssumption: true` dan label UI estimasi. |
| **DEC-007** | Scope Platform MVP | RESOLVED | Platform MVP dikunci ke 3 marketplace: **Shopee**, **TikTok Shop**, dan **Tokopedia**. ShopeeFood dan marketplace lain di luar scope MVP. |
| **DEC-008** | Client Architecture | RESOLVED | Pure Vanilla JavaScript ES Modules terintegrasi dengan Astro SSG components. Dilarang memasukkan runtime React, Vue, Svelte, atau UI library berat. |
| **DEC-009** | Pembulatan Rupiah (Rounding Policy) | RESOLVED (Configurable) | Engine mendukung `nearest`, `floor`, atau `ceil` per fee rule. Default: pembulatan integer standar (`Math.round`), hasil akhir selalu integer Rupiah. |
