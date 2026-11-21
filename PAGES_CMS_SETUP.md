# Panduan Konfigurasi & Integrasi Pages CMS

Dokumen ini adalah panduan lengkap menyambungkan repositori GitHub **KalkulatorSeller** dengan **Pages CMS** (antarmuka CMS open-source berbasis web untuk static site generator).

---

## 1. Apa itu Pages CMS?

Pages CMS ([https://pagescms.org](https://pagescms.org)) adalah Content Management System modern dan ramah pengguna yang membaca dan menulis langsung ke repositori GitHub tanpa memerlukan server backend atau database mandiri.

Keunggulan:
- **Gratis & Open Source**.
- **Terhubung via GitHub OAuth**: Setiap pengeditan tercatat sebagai commit Git resmi atas nama pengguna.
- **WYSIWYG & Markdown Editor**: Nyaman bagi tim konten yang tidak paham Git atau Markdown mentah.
- **Media Upload Langsung**: Gambar yang diunggah langsung disimpan di folder `public/images/blog/` pada branch repositori.

---

## 2. File Konfigurasi `.pages.yml`

File `.pages.yml` diletakkan di root repositori KalkulatorSeller. File ini memberi instruksi kepada Pages CMS mengenai lokasi konten, folder media, dan field frontmatter artikel:

```yaml
media:
  input: public/images/blog
  output: /images/blog

content:
  - name: blog
    label: Artikel Blog
    type: collection
    path: src/content/blog
    format: frontmatter
    view:
      fields: [title, publishedAt, category, draft]
      primary: title
    fields:
      - name: title
        label: Judul Artikel
        type: string
        required: true
      - name: description
        label: Ringkasan / Deskripsi Singkat
        type: string
        required: true
      - name: slug
        label: Slug URL
        type: string
        required: false
      - name: category
        label: Kategori Artikel
        type: select
        required: true
        options:
          - Tips Jualan Online
          - Shopee
          - TikTok Shop
          - Tokopedia
          - Harga dan Profit
          - Bisnis Online
          - Edukasi Seller
      - name: publishedAt
        label: Tanggal Publikasi
        type: date
        required: true
      - name: draft
        label: Simpan sebagai Draf (Jangan Terbitkan)
        type: boolean
        default: false
      - name: featured
        label: Artikel Pilihan (Featured)
        type: boolean
        default: false
      - name: featuredImage
        label: Gambar Utama Artikel
        type: image
      - name: imageAlt
        label: Teks Alternatif Gambar (Alt Text)
        type: string
      - name: tags
        label: Tag Topik (Pisahkan per baris)
        type: list
      - name: body
        label: Konten Artikel (Markdown)
        type: rich-text
        required: true
```

---

## 3. Langkah-Langkah Menghubungkan Repositori

1. **Buka Pages CMS**: Kunjungi [https://app.pagescms.org](https://app.pagescms.org).
2. **Login dengan Akun GitHub**: Klik tombol **Continue with GitHub** dan setujui izin akses ke akun Anda.
3. **Pilih Repositori**:
   - Cari repositori: `dmsda/kalkulator-seller`.
   - Pilih branch utama: `main`.
4. **Verifikasi Pengenalan Konfigurasi**:
   - Pages CMS akan membaca `.pages.yml` secara otomatis.
   - Di sidebar kiri akan muncul menu **Artikel Blog**.
5. **Mulai Mengelola Konten**:
   - Klik salah satu artikel untuk menyunting.
   - Klik **New entry** untuk membuat artikel baru.

---

## 4. Alur Kerja Unggah Media & Gambar

- Format gambar yang disarankan: `.webp` atau `.png` terkompresi.
- Resolusi ideal gambar utama: **1200 x 675 piksel** (aspek rasio 16:9).
- Ukuran file maksimal yang direkomendasikan: **< 150 KB** per gambar agar pemuatan halaman kilat di jaringan seluler.
- Saat gambar diunggah di Pages CMS, file akan disimpan di `public/images/blog/` dan path otomatis tertulis sebagai `/images/blog/nama-gambar.webp`.

---

## 5. Hak Akses & Keamanan

- Hanya anggota atau kontributor dengan izin *write* pada repositori GitHub `dmsda/kalkulator-seller` yang dapat melakukan commit melalui Pages CMS.
- Semua aksi penulisan tercatat rapi di Git log dengan nama akun GitHub yang bersangkutan.
- Tidak ada token rahasia atau password database yang disimpan di server Pages CMS.
