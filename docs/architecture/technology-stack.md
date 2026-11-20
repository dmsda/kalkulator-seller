# Pilihan Teknologi (Technology Stack)

Penjelasan mengenai alasan pemilihan teknologi pada proyek **KalkulatorSeller**.

---

## 🛠 Stack Utama

### 1. Astro v5 (Static Site Generator)
- **Alasan Pemilihan**: Astro mengompilasi template langsung menjadi HTML dan CSS statis murni tanpa runtime JavaScript yang membengkak (*Zero JS by default*).
- **Keunggulan untuk KalkulatorSeller**:
  - Halaman dimuat seketika (*instant initial load*), ideal bagi pengguna mobile dengan jaringan 4G/3G di Indonesia.
  - Skor SEO Lighthouse optimal (100 pada Performance, Accessibility, Best Practices, SEO).
  - Skema perutean berbasis file (`src/pages/`) yang rapi dan mudah dirawat.

### 2. Tailwind CSS v4
- **Alasan Pemilihan**: Versi terbaru Tailwind CSS v4 menawarkan engine performa tinggi berbasis compiler Vite modern tanpa file `tailwind.config.js` yang rumit.
- **Implementasi**:
  - Dikustomisasi melalui token desain terpusat di `src/styles/tokens.css`.
  - Menggunakan *System Font Stack* murni tanpa memanggil CDN font eksternal (Google Fonts, Adobe Fonts) untuk memastikan kecepatan dan perlindungan privasi pengguna.
  - Memastikan seluruh target sentuh minimal 44x44px (`min-h-[44px]`) untuk kepatuhan aksesibilitas mobile WCAG 2.2 AA.

### 3. Vanilla JavaScript ES Modules
- **Alasan Pemilihan**: Tidak menggunakan React, Vue, atau Angular untuk formulir kalkulator.
- **Keunggulan**:
  - Menghilangkan *bundle size* puluhan hingga ratusan kilobyte.
  - Logika perhitungan dapat dijalankan secara instan (*event listener input*) dengan latensi render di bawah 5 milidetik.
  - Kompatibel dengan semua browser modern tanpa proses transpilasi rumit.

### 4. Vitest v3
- **Alasan Pemilihan**: Test runner modern yang sangat cepat dan kompatibel penuh dengan format modul ES (ESM).
- **Cakupan Pengujian**: 57 kasus uji otomatis yang mencakup verifikasi paritas matematika independen (*Oracle*), pengujian integrasi multi-platform, dan simulasi 8 perjalanan pengguna (*E2E journeys*).

### 5. Cloudflare Pages
- **Alasan Pemilihan**: Platform hosting static edge terdepan di dunia dengan integrasi Git otomatis.
- **Keunggulan**:
  - Jaringan CDN Cloudflare dengan latency rendah di Indonesia (titik server di Jakarta).
  - Dukungan kustomisasi security headers via `public/_headers` (CSP, X-Frame-Options, HSTS).
  - Biaya operasional nol (*free tier*) dengan batas bandwidth yang sangat besar.
