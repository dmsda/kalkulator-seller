# Panduan Penulis & Editor Konten (Pages CMS)

Buku panduan ini ditujukan untuk penulis, editor, dan pengelola konten blog **KalkulatorSeller** dalam membuat, mengedit, dan mempublikasikan artikel menggunakan **Pages CMS**.

---

## 1. Membuka Dashboard Pages CMS

1. Buka browser dan kunjungi: [https://app.pagescms.org](https://app.pagescms.org).
2. Klik tombol **Sign in with GitHub**.
3. Pilih repositori **dmsda/kalkulator-seller** dan branch **main**.
4. Pada menu samping kiri, klik **Artikel Blog**.

---

## 2. Membuat Artikel Baru

1. Klik tombol **New entry** di pojok kanan atas.
2. Isi formulir artikel:
   - **Judul Artikel (title)**: Tulis judul yang menarik, jelas, dan memuat solusi untuk seller (contoh: *Cara Menghitung Keuntungan Jualan Online*).
   - **Deskripsi Singkat (description)**: Tulis ringkasan artikel 2–3 kalimat untuk mesin pencari Google dan kartu pratinjau media sosial.
   - **Slug URL (slug)**: Opsional. Bila dikosongkan, slug akan dibuat otomatis dari judul. Gunakan huruf kecil dan tanda hubung strip (contoh: `cara-menghitung-untung-shopee`).
   - **Kategori**: Pilih salah satu dari dropdown yang tersedia (misal: *Tips Jualan Online*, *Shopee*, *Harga dan Profit*).
   - **Tanggal Publikasi (publishedAt)**: Pilih tanggal hari ini atau tanggal artikel dijadwalkan tayang.
   - **Gambar Utama (featuredImage)**: Unggah gambar banner beresolusi 1200 x 675 px.
   - **Teks Alternatif Gambar (imageAlt)**: Jelaskan isi gambar secara singkat untuk aksesibilitas tunanetra dan SEO.
   - **Artikel Pilihan (featured)**: Centang jika artikel ini ingin ditampilkan menonjol di bagian paling atas halaman blog.
   - **Tag Topik**: Masukkan kata kunci topik relevan (misal: `keuntungan-bersih`, `shopee`, `biaya-admin`).
   - **Konten Artikel (body)**: Tulis isi artikel dalam editor rich text atau markdown.
3. Klik tombol **Save** di pojok kanan atas untuk menyimpan dan melakukan commit ke GitHub.

---

## 3. Menyimpan Draf (Drafting)

Jika tulisan belum selesai dan Anda belum ingin artikel tersebut muncul di website publik:
- Aktifkan toggle **Simpan sebagai Draf (draft)**.
- Selama opsi ini bernilai `true`, artikel **TIDAK AKAN** tampil di daftar artikel, tidak dapat diakses publik, dan tidak didaftarkan di sitemap Google.
- Ketika artikel sudah siap terbit, cukup nonaktifkan toggle draf tersebut dan klik **Save**.

---

## 4. Tips Format Tulisan yang Menarik

1. **Gunakan Subjudul H2 dan H3**:
   - Subjudul H2 dan H3 akan otomatis ditarik menjadi menu **Daftar Isi Artikel** interaktif di atas tulisan.
2. **Gunakan Tabel untuk Perbandingan Angka**:
   - Contoh tabel rincian biaya admin atau margin keuntungan sangat disukai pembaca online.
3. **Sertakan Call to Action (CTA)**:
   - Komponen CTA kalkulator otomatis muncul di bagian bawah artikel menyesuaikan kategori yang Anda pilih (misal artikel berkategori *Shopee* otomatis mengajak pembaca mencoba kalkulator Shopee).

---

## 5. Pertanyaan Umum (FAQ)

- **Berapa lama setelah saya klik Save artikel tayang di website?**
  Proses build otomatis di Cloudflare Pages membutuhkan waktu sekitar 15–30 detik. Setelah itu halaman langsung tayang.
- **Bagaimana jika saya salah menulis atau ada typo?**
  Cukup buka kembali artikel tersebut di Pages CMS, lakukan perbaikan teks, lalu klik **Save**.
- **Apakah saya bisa menghapus artikel?**
  Ya, buka artikel yang bersangkutan, klik ikon opsi di pojok kanan atas, lalu pilih **Delete entry**.
