# Panduan SEO Teknis & On-Page Blog KalkulatorSeller

Dokumen ini menjabarkan arsitektur dan standar SEO untuk memaksimalkan peringkat organik konten blog di mesin pencari (Google).

---

## 1. Arsitektur URL & Struktur Kanonikal

- **Trailing Slash Konsisten**: Seluruh URL artikel, direktori, kategori, dan tag wajib diakhiri garis miring (`/`) sesuai aturan `trailingSlash: 'always'` di `astro.config.mjs`.
  - Beranda blog: `https://kalkulatorseller.pages.dev/blog/`
  - Artikel: `https://kalkulatorseller.pages.dev/blog/<slug>/`
  - Kategori: `https://kalkulatorseller.pages.dev/blog/category/<slug>/`
  - Tag: `https://kalkulatorseller.pages.dev/blog/tag/<slug>/`
- **Kanonikal Otomatis**: Setiap halaman merender tag `<link rel="canonical" href="..." />` yang absolut dan valid.

---

## 2. Kontrol Pengindeksan & Crawl Budget

1. **Halaman yang Diindeks (`index, follow`)**:
   - `/blog/` (Direktori utama)
   - `/blog/<slug>/` (Semua artikel yang `draft: false`)
   - `/blog/category/<slug>/` (Halaman arsip kategori utama)
2. **Halaman yang Dikecualikan (`noindex, nofollow`)**:
   - `/blog/tag/<slug>/`: Diberi atribut `noindex` secara sengaja untuk mencegah kanibalisasi kata kunci dan konten tipis (*thin content*).
   - Artikel dengan `draft: true`: Otomatis tidak dibuild ke folder produksi dan tidak dimasukkan ke sitemap.

---

## 3. Data Terstruktur (JSON-LD Schema)

Setiap artikel blog menyematkan dua skema JSON-LD terverifikasi Schema.org:

### A. BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://kalkulatorseller.pages.dev/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://kalkulatorseller.pages.dev/blog/" },
    { "@type": "ListItem", "position": 3, "name": "Harga dan Profit", "item": "https://kalkulatorseller.pages.dev/blog/category/harga-dan-profit/" },
    { "@type": "ListItem", "position": 4, "name": "Judul Artikel", "item": "https://kalkulatorseller.pages.dev/blog/slug/" }
  ]
}
```

### B. BlogPosting
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Judul Artikel",
  "description": "Deskripsi artikel yang ramah SEO",
  "image": ["https://kalkulatorseller.pages.dev/images/blog/featured/...png"],
  "datePublished": "2026-11-20T00:00:00.000Z",
  "dateModified": "2026-11-20T00:00:00.000Z",
  "author": {
    "@type": "Person",
    "name": "Tim KalkulatorSeller"
  },
  "publisher": {
    "@type": "Organization",
    "name": "KalkulatorSeller",
    "url": "https://kalkulatorseller.pages.dev",
    "logo": {
      "@type": "ImageObject",
      "url": "https://kalkulatorseller.pages.dev/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://kalkulatorseller.pages.dev/blog/slug/"
  }
}
```

---

## 4. Standar On-Page SEO Artikel

| Elemen | Rekomendasi Panjang / Aturan |
|---|---|
| Tag `<title>` | 50 – 60 karakter, diakhiri ` — KalkulatorSeller` |
| Meta `description` | 130 – 155 karakter, memuat kata kunci utama & ajakan membaca |
| Heading `<h1>` | Tepat satu tag H1 per halaman |
| Subheading `<h2>` & `<h3>` | Menggunakan kata kunci turunan alami |
| Gambar Utama | Wajib menyertakan atribut `alt` deskriptif |
| Internal Linking | Minimal 2 tautan balik ke alat kalkulator terkait (`/shopee/`, `/tiktok-shop/`, `/tokopedia/`, atau `/tarif/`) |

---

## 5. Integrasi XML Sitemap Otomatis

Endpoint dinamis di `src/pages/sitemap.xml.js` mengumpulkan semua artikel blog non-draft saat proses kompilasi:
- `/blog/` -> `priority: 0.8`, `changefreq: weekly`
- `/blog/[slug]/` -> `priority: 0.7`, `changefreq: monthly`, `lastmod: YYYY-MM-DD`
- `/blog/category/[slug]/` -> `priority: 0.6`, `changefreq: weekly`
- Draf dan tag otomatis dikecualikan.
