# Panduan Deployment & Operasional Blog di Cloudflare Pages

Dokumen ini memuat prosedur deployment, konfigurasi build Cloudflare Pages, pengujian lingkungan, dan strategi rollback untuk sistem blog **KalkulatorSeller**.

---

## 1. Ringkasan Infrastruktur

- **Hosting Platform**: Cloudflare Pages.
- **Metode Build**: Astro Static Site Generation (SSG).
- **Triggers**: Otomatis terpicu pada setiap push commit ke branch `main`.
- **Node.js Runtime**: Node.js 18.x atau 20.x (direkomendasikan Node 20).
- **Custom Domain**: `https://kalkulatorseller.pages.dev` (atau domain kustom tersambung).

---

## 2. Pengaturan Proyek Cloudflare Pages

Di dashboard Cloudflare -> **Workers & Pages** -> **kalkulator-seller** -> **Settings** -> **Builds & deployments**:

| Konfigurasi | Nilai |
|---|---|
| **Framework preset** | Astro |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` |
| **Node.js Version** | `20.18.0` (ditetapkan via env `NODE_VERSION: 20`) |

---

## 3. Alur Verifikasi Otomatis Pre-Deployment

Sebelum commit didorong ke remote repositori, jalankan rangkaian uji kualitas lokal:

```bash
# 1. Jalankan unit test & integration test
npm test

# 2. Periksa tipe data Astro & Content Collections
npx astro check

# 3. Validasi kompilasi build produksi SSG
npm run build
```

Semua 3 perintah di atas wajib keluar dengan kode exit `0` tanpa pesan kesalahan (*zero errors, zero warnings*).

---

## 4. Siklus Hidup Artikel Baru (Push to Live)

1. Penulis menyimpan artikel di Pages CMS atau developer push commit file `.md` ke branch `main`.
2. Cloudflare Pages mendeteksi commit baru via Webhook GitHub.
3. Pipeline build menjalankan `npm run build`.
4. Astro Content Layer memproses koleksi blog dari `src/content/blog/*.md`:
   - Validasi frontmatter via Zod schema (`src/content.config.ts`).
   - Kompilasi markdown ke HTML statis di `dist/blog/*/index.html`.
   - Pembaruan dinamis `dist/sitemap.xml` menyertakan slug artikel baru.
5. Aset statis disebarkan ke lebih dari 300 data center Cloudflare di seluruh dunia.
6. Waktu proses keseluruhan rata-rata: **18 - 25 detik**.

---

## 5. Prosedur Rollback Cepat

Jika artikel yang dipublikasikan memiliki kesalahan fatal dan perlu segera ditarik dari publik:

1. **Metode Instan Cloudflare (Tanpa Git)**:
   - Buka Cloudflare Dashboard -> **Deployments**.
   - Cari deployment sukses sebelumnya.
   - Klik menu titik tiga (...) -> **Rollback to this deployment**.
   - Versi sebelumnya langsung aktif kembali dalam 1 detik.
2. **Metode Git / Pages CMS**:
   - Buka artikel di Pages CMS -> centang toggle **Simpan sebagai Draf (draft)** -> Klik **Save**.
   - Atau via Git: Ubah `draft: true` di frontmatter artikel lalu commit & push ke `main`.
