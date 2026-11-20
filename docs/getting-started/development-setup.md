# Konfigurasi Lingkungan Pengembangan (Development Setup)

Panduan untuk mengatur editor dan perintah pengembangan lokal di **KalkulatorSeller**.

---

## Rekomendasi Editor
Gunakan **Visual Studio Code**, **Cursor**, atau **Zed** dengan ekstensi berikut:
- **Astro**: Dukungan syntax highlighting dan diagnostik komponen `.astro`.
- **Tailwind CSS IntelliSense**: Autocomplete kelas utilitas Tailwind CSS v4.
- **Prettier**: Pemformatan kode otomatis saat berkas disimpan.

---

## Perintah NPM yang Tersedia

Seluruh perintah pengembangan terdaftar di `package.json`:

| Perintah | Fungsi | Kapan Digunakan |
|---|---|---|
| `npm run dev` | Menjalankan Astro dev server di `http://localhost:4321` | Saat proses koding dan simulasi antarmuka |
| `npm run build` | Mengompilasi seluruh rute statis ke direktori `dist/` | Sebelum rilis produksi atau uji build |
| `npm run preview` | Menjalankan preview lokal dari hasil build `dist/` | Menguji artefak produksi di lokal |
| `npm test` | Menjalankan test runner Vitest sekali jalan (*single run*) | Memverifikasi seluruh unit & E2E test |
| `npm run test:watch` | Menjalankan Vitest dalam mode interaktif *watch mode* | Saat melakukan debugging test |
| `npx astro check` | Menjalankan analisis diagnostik tipe TypeScript dan Astro | Memastikan 0 error diagnostik kode |

---

## Konfigurasi Lingkungan (.env)
Aplikasi ini 100% *Client-Side Static Site*. Anda tidak memerlukan konfigurasi kredensial basis data atau API keys. Variabel `.env` bersifat opsional dan hanya digunakan untuk menentukan URL situs saat build canonical:
```bash
cp .env.example .env
```
