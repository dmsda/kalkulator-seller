# SEO IMPLEMENTATION GUIDELINE: KalkulatorSeller

Panduan standar teknik dan prosedur penulisan untuk memastikan setiap pembaruan, penambahan halaman baru, atau pengembangan konten di situs **KalkulatorSeller** tetap memenuhi kaidah Search Engine Optimization (SEO) modern dan prinsip Anti-Slop.

---

## 1. Standar Meta Title

- **Panjang Karakter**: 50 – 60 karakter (maksimal 580 pixel di SERP Google desktop).
- **Format Baku**:
  - `[Fokus Topik / Nama Tool Utama]: [Manfaat / Aksi Kunci] — KalkulatorSeller`
- **Aturan**:
  1. Letakkan keyword utama di bagian awal (front-loaded).
  2. Gunakan pemisah em-dash (`—`) sebelum nama brand.
  3. Hindari judul yang berulang atau dipenuhi rentetan kata kunci (*keyword stuffing*).
  4. Judul wajib merefleksikan fungsi aktual halaman tanpa *clickbait*.

*Contoh yang Benar:*
- `Kalkulator Shopee: Hitung Biaya Admin & Keuntungan Jualan — KalkulatorSeller`
- `Panduan Cara Menghitung Keuntungan Jualan Online & HPP — KalkulatorSeller`

---

## 2. Standar Meta Description

- **Panjang Karakter**: 120 – 155 karakter (maksimal 960 pixel di mobile).
- **Format Baku**:
  - `[Penjelasan ringkas fungsi tools / topik]. [Manfaat spesifik yang didapat pengguna]. [Reassurance / Keunggulan].`
- **Aturan**:
  1. Wajib unik untuk setiap halaman.
  2. Gunakan bahasa Indonesia natural yang ramah untuk seller awam (hindari jargon kaku).
  3. Sertakan kalimat ajakan bertindak yang halus (*soft call to action*).
  4. Jangan menjanjikan fitur yang belum didukung oleh aplikasi.

*Contoh yang Benar:*
- `Hitung potongan biaya admin Shopee Non-Star, Star, Mall, Gratis Ongkir XTRA, dan ketahui sisa keuntungan bersih jualan Anda secara akurat.`

---

## 3. Standar Struktur Heading (H1, H2, H3)

- **H1 (Heading 1)**:
  - Wajib tepat **satu** elemen `<h1>` per halaman.
  - Mengandung topik utama halaman secara utuh.
- **H2 (Heading 2)**:
  - Digunakan untuk membagi blok fungsi utama (misal: formulir kalkulator, panduan biaya, FAQ, daftar SKU).
- **H3 (Heading 3)**:
  - Digunakan sebagai subbagian dari H2 (misal: rincian contoh kasus, tips khusus, atau sub-komponen kalkulasi).
- **Aturan Tambahan**:
  1. Jangan melompati tingkatan (misal dari H1 langsung ke H3).
  2. Jangan menggunakan tag heading semata-mata untuk tujuan styling visual; gunakan kelas Tailwind CSS (`text-sm`, `font-bold`, dll) untuk kebutuhan estetika teks non-heading.

---

## 4. Standar URL & Trailing Slash

- **Domain Canonical**: `https://kalkulatorseller.pages.dev`
- **Konfigurasi Trailing Slash**: `trailingSlash: 'always'`
- **Aturan URL**:
  1. Seluruh URL canonical internal wajib berakhiran garis miring (trailing slash), contoh: `/shopee/`, `/panduan/`.
  2. Gunakan huruf kecil (*lowercase*) dan tanda hubung (*hyphen*) sebagai pemisah kata, bukan *underscore*.
  3. Hindari parameter URL (`?param=...`) untuk halaman yang diindeks.
  4. Jika ada perubahan URL rute, pastikan redirect 301 diatur pada file `public/_redirects`.

---

## 5. Standar Tautan Internal (*Internal Linking*) & Anchor Text

1. **Gunakan Canonical Target**: Selalu tautkan link internal langsung ke URL kanonis berakhiran slash (misal `<a href="/shopee/">`, bukan `<a href="/shopee">`).
2. **Anchor Text Relevan**: Gunakan frasa deskriptif yang menjelaskan tujuan halaman target.
3. **Deep Linking ke Bagian Tertentu**: Manfaatkan hash anchor untuk mengarahkan pengguna ke bagian spesifik dokumen referensi (contoh: `/tarif/#shopee`, `/tarif/#tiktok-shop`).
4. **Sentuhan Ramah Mobile**: Pastikan elemen tautan memiliki target sentuh minimal 44 × 44 CSS px atau padding yang memadai untuk kemudahan navigasi layar sentuh.

---

## 6. Standar Structured Data (Schema JSON-LD)

Gunakan tag `<script type="application/ld+json">` yang diinjeksikan secara bersih ke dalam `<head>` melalui properti `jsonLd` di `BaseLayout.astro`.

### Jenis Schema yang Diwajibkan:
1. **`WebSite`**: Khusus pada Beranda (`/`).
2. **`WebApplication`**: Pada seluruh halaman kalkulator (`/`, `/shopee/`, `/tiktok-shop/`, `/tokopedia/`).
   - Menyertakan properti `applicationCategory: "BusinessApplication"`, `operatingSystem: "All"`, dan `offers: { price: 0, priceCurrency: "IDR" }`.
3. **`BreadcrumbList`**: Pada seluruh halaman turunan (*inner pages*).
4. **`FAQPage`**: Pada halaman yang memiliki accordion pertanyaan umum yang ditampilkan di UI.
5. **`Article`**: Pada halaman artikel panduan (`/panduan/`).

> [!WARNING]
> Jangan pernah menambahkan schema ulasan/bintang fiktif (`AggregateRating`) atau harga palsu. Seluruh data schema wajib 100% mencerminkan konten yang kasat mata pada halaman.

---

## 7. Standar Image & Asset SEO

1. **Format File**: Utamakan format vektor SVG untuk icon, logo, atau diagram antarmuka, dan format modern WebP/AVIF untuk foto dokumentasi.
2. **Atribut Gambar**: Seluruh tag `<img>` wajib memiliki atribut `alt`, `width`, `height`, dan `loading="lazy"` (kecuali LCP hero).
3. **Gambar Dekoratif**: Jika elemen grafis hanya bersifat dekoratif, gunakan `aria-hidden="true"` atau `alt=""`.

---

## 8. Panduan Pencegahan Halaman Pintu (*Doorway Pages*)

Untuk setiap marketplace baru yang ditambahkan di masa depan:
- Jangan hanya menyalin template kalkulator lama lalu mengganti nama platform.
- Wajib menambahkan:
  1. Penjelasan struktur biaya resmi dan keunikan platform tersebut.
  2. Studi kasus atau simulasi harga yang relevan dengan ekosistemnya.
  3. FAQ spesifik yang sering menjadi kebingungan seller di platform tersebut.
  4. Rujukan resmi dan tanggal verifikasi pada halaman `/tarif/`.

---

## 9. Checklist Pra-Publikasi Halaman Baru

Sebelum melakukan commit atau rilis halaman baru ke produksi, verifikasi checklist berikut:

- [ ] Meta Title unik, mengandung primary keyword, diakhiri `— KalkulatorSeller`.
- [ ] Meta Description unik (120–155 karakter), persuasif dan informatif.
- [ ] Tepat satu tag `<h1>` yang mendeskripsikan konten halaman.
- [ ] Tag `<link rel="canonical">` mengarah ke URL absolut yang benar dengan trailing slash.
- [ ] Tag `<meta name="robots">` diset `index, follow` (atau `noindex, nofollow` jika halaman error/privat).
- [ ] OpenGraph (`og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale`) terisi lengkap.
- [ ] Structured Data JSON-LD valid dan dapat diparse tanpa error sintaks.
- [ ] Halaman baru didaftarkan ke `src/pages/sitemap.xml.js`.
- [ ] Seluruh internal link menggunakan anchor text informatif.
- [ ] Menjalankan `npm test` dan memastikan 100% test suite lulus tanpa regresi.
- [ ] Menjalankan `npm run build` dan memverifikasi tidak ada error routing statis.
