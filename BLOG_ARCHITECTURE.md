# Arsitektur Blog & Sistem Konten KalkulatorSeller

Dokumen ini menjelaskan arsitektur teknis sistem blog statis pada **KalkulatorSeller** yang terintegrasi dengan **Pages CMS** dan **Astro 5 Content Collections**.

---

## 1. Filosofi & Prinsip Arsitektur

- **Static-First & Zero Backend Database**: Semua artikel disimpan sebagai file Markdown (`.md`) di dalam repositori Git. Tidak ada database SQL/NoSQL eksternal, mengurangi latensi, biaya server, dan risiko keamanan.
- **Git-as-Source-of-Truth**: Setiap publikasi atau revisi artikel adalah commit Git yang terlacak riwayatnya.
- **Content Layer Astro 5**: Menggunakan API Content Collections modern (`defineCollection` dengan `glob` loader dari `astro/loaders` dan validasi skema via `zod`).
- **Decoupled Headless CMS (Pages CMS)**: Antarmuka penulisan konten berbasis web tanpa server terpisah. Pages CMS berkomunikasi langsung ke GitHub API melalui OAuth2 pengguna.
- **Cloudflare Pages Edge Deployment**: Hasil build SSG didistribusikan secara instan ke ratusan edge nodes Cloudflare di seluruh dunia, termasuk Indonesia (Jakarta/Surabaya edge nodes).

---

## 2. Diagram Alur Data & Publikasi

```
+-------------------------------------------------------+
| Penulis / Editor Konten                              |
| Membuka pagescms.org -> Login via Akun GitHub        |
+---------------------------+---------------------------+
                            |
                            v (Menulis artikel, unggah gambar)
+-------------------------------------------------------+
| Pages CMS (.pages.yml)                                |
| Mengirim commit Git langsung ke repo GitHub           |
| File: src/content/blog/<slug>.md                      |
| Gambar: public/images/blog/<filename>                 |
+---------------------------+---------------------------+
                            |
                            v (Webhook push event)
+-------------------------------------------------------+
| Cloudflare Pages Build Pipeline                       |
| Menjalankan: npm run build (Astro 5 SSG)              |
| 1. Memvalidasi skema Zod di src/content.config.ts    |
| 2. Merender Markdown & Headings (render(post))        |
| 3. Menghasilkan rute statis HTML, CSS, JS             |
| 4. Memperbarui sitemap.xml secara dinamis             |
+---------------------------+---------------------------+
                            |
                            v (Deploy dalam hitungan detik)
+-------------------------------------------------------+
| Global Edge CDN (Cloudflare Pages)                    |
| /blog/                                                |
| /blog/<slug>/                                         |
| /blog/category/<slug>/                                |
| /blog/tag/<slug>/                                     |
| /sitemap.xml                                          |
+-------------------------------------------------------+
```

---

## 3. Struktur Folder & Modul Terkait

```
kalkulator-seller/
├── .pages.yml                   # Konfigurasi antarmuka & field Pages CMS
├── src/
│   ├── content.config.ts        # Deklarasi koleksi & validasi Zod schema (Astro 5)
│   ├── content/
│   │   └── blog/                # Direktori file Markdown konten artikel
│   │       ├── cara-menghitung-keuntungan-jualan-online.md
│   │       ├── cara-menentukan-harga-jual-produk.md
│   │       └── memahami-biaya-marketplace-sebelum-jualan.md
│   ├── components/
│   │   └── blog/                # Komponen modular blog
│   │       ├── BlogCard.astro          # Kartu artikel di grid
│   │       ├── FeaturedArticle.astro   # Banner artikel pilihan
│   │       ├── TableOfContents.astro   # Daftar isi otomatis (H2/H3)
│   │       ├── RelatedArticles.astro   # Rekomendasi artikel sejenis
│   │       ├── BlogCTA.astro           # Call-to-action dinamis ke kalkulator
│   │       ├── CategoryNavigation.astro# Filter kategori horizontal
│   │       ├── BlogSearch.astro        # Pencarian instan client-side
│   │       └── BlogPagination.astro    # Navigasi halaman ramah aksesibilitas
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro             # Halaman direktori blog (/blog/)
│   │   │   ├── [slug].astro            # Detail artikel (/blog/[slug]/)
│   │   │   ├── category/
│   │   │   │   └── [slug].astro        # Arsip kategori (/blog/category/[slug]/)
│   │   │   └── tag/
│   │   │       └── [slug].astro        # Arsip topik tag (/blog/tag/[slug]/)
│   │   └── sitemap.xml.js              # Endpoint sitemap dinamis
│   └── utils/
│       └── readingTime.js              # Utilitas hitung estimasi waktu baca (WPM Indo)
└── public/
    └── images/
        └── blog/                       # Folder penyimpanan gambar artikel dari CMS
```

---

## 4. Konfigurasi Skema Konten (`src/content.config.ts`)

Skema artikel divalidasi ketat saat kompilasi build menggunakan Zod:

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `title` | `string` | Ya | Judul artikel |
| `description` | `string` | Ya | Meta deskripsi / ringkasan artikel |
| `slug` | `string` | Tidak | Slug URL kustom (default: nama file) |
| `excerpt` | `string` | Tidak | Cuplikan teks singkat untuk kartu artikel |
| `featuredImage` | `string` | Tidak | Path gambar banner artikel |
| `imageAlt` | `string` | Tidak | Teks alternatif aksesibilitas gambar |
| `author` | `string` | Tidak | Penulis (default: "Tim KalkulatorSeller") |
| `publishedAt` | `date` | Ya | Tanggal rilis artikel |
| `updatedAt` | `date` | Tidak | Tanggal revisi artikel terakhir |
| `draft` | `boolean` | Ya (default: false) | Status draft (disembunyikan dari build & sitemap) |
| `featured` | `boolean` | Ya (default: false) | Tandai sebagai artikel utama di beranda blog |
| `category` | `enum` | Ya | Kategori resmi (7 kategori seller) |
| `tags` | `array(string)` | Tidak | Tag topik untuk navigasi silang |
| `seoTitle` | `string` | Tidak | Kustomisasi tag `<title>` SEO |
| `seoDescription` | `string` | Tidak | Kustomisasi meta deskripsi SEO |
| `ogImage` | `string` | Tidak | Kustomisasi gambar Open Graph preview |
| `canonicalUrl` | `string` | Tidak | Kustomisasi URL kanonikal |
| `noIndex` | `boolean` | Tidak | Opsi robots `noindex` |

---

## 5. Performa & Batasan Ukuran

1. **Zero Runtime Overhead**: Tidak ada pustaka JavaScript berat (React, Vue, lodash). Semua komponen blog dirender ke HTML statis saat build.
2. **Pencarian Client-Side Ringan**: Modul `BlogSearch` bekerja tanpa dependensi eksternal, memfilter metadata artikel yang telah disematkan pada elemen DOM secara instan.
3. **Kepatuhan Anti-Slop**: Tidak memuat web fonts eksternal (Google Fonts / Adobe Typekit) atau pustaka animasi berat. Seluruh tipografi mengandalkan native system font stack.
