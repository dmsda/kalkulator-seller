# Panduan Kontribusi (Contributing Guidelines)

Terima kasih atas ketertarikan Anda untuk berkontribusi pada pengembangan **KalkulatorSeller**! Proyek ini dibangun untuk membantu jutaan pelaku UMKM dan seller online di Indonesia menghitung keuntungan usaha mereka secara akurat.

---

## 📋 Daftar Isi
1. [Standar Etika Komunitas](#standar-etika-komunitas)
2. [Prasyarat Lingkungan Kerja](#prasyarat-lingkungan-kerja)
3. [Alur Pengembangan (Workflow)](#alur-pengembangan-workflow)
4. [Konvensi Pesan Commit (Conventional Commits)](#konvensi-pesan-commit-conventional-commits)
5. [Standar Kualitas Kode (Code Standards)](#standar-kualitas-kode-code-standards)
6. [Pengujian Otomatis (Testing)](#pengujian-otomatis-testing)
7. [Pengajuan Pull Request (PR)](#pengajuan-pull-request-pr)

---

## Standar Etika Komunitas
Seluruh kontributor diharapkan mematuhi panduan [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) untuk menjaga lingkungan diskusi yang ramah, inklusif, dan profesional.

---

## Prasyarat Lingkungan Kerja
- **Node.js**: v20.x atau lebih baru.
- **NPM**: v10.x atau lebih baru.
- **Git**: Terpasang di komputer lokal.

---

## Alur Pengembangan (Workflow)

1. **Fork & Kloning**:
   ```bash
   git clone https://github.com/dmsda/kalkulator-seller.git
   cd kalkulator-seller
   npm install
   ```

2. **Buat Branch Fitur / Perbaikan**:
   Gunakan penamaan branch yang deskriptif:
   - Fitur baru: `feat/nama-fitur`
   - Perbaikan bug: `fix/deskripsi-bug`
   - Dokumentasi: `docs/nama-dokumen`
   - Pembaruan tarif: `tariff/nama-marketplace-tahun`

   ```bash
   git checkout -b fix/perbaikan-tarif-shopee
   ```

3. **Jalankan Server Lokal**:
   ```bash
   npm run dev
   ```

---

## Konvensi Pesan Commit (Conventional Commits)

Kami menerapkan standar [Conventional Commits](https://www.conventionalcommits.org/) dalam Bahasa Inggris ringkas:

| Tipe | Kapan Digunakan | Contoh |
|---|---|---|
| `feat` | Penambahan fitur baru pengguna | `feat: add Tokopedia TikTok Shop unified comparison` |
| `fix` | Perbaikan bug kalkulasi atau tampilan | `fix: correct reverse pricing fee cap calculation` |
| `docs` | Perubahan atau penambahan dokumentasi | `docs: add tariff update guide for contributors` |
| `style` | Formatting tampilan/CSS tanpa mengubah logika | `style: improve dropdown arrow spacing on mobile` |
| `refactor` | Perapihan struktur kode internal | `refactor: extract currency formatting helper` |
| `test` | Penambahan atau perbaikan automated tests | `test: add fee cap boundary tests for luxury goods` |
| `chore` | Pemeliharaan dependensi atau build tool | `chore: update tailwindcss to v4.0.9` |

---

## Standar Kualitas Kode (Code Standards)

1. **Anti-Slop Compliance**:
   - Dilarang menambahkan template AI generik, efek kaca blur berlebihan (*glassmorphism*), atau gradien warna yang tidak relevan dengan identitas produk.
   - Pertahankan palet warna utama: Brand Primary `#14213D` dan Accent `#FCA311`.
   - Gunakan border 1px yang bersih (*crisp 1px border*).
   - Pastikan seluruh elemen sentuh memiliki tinggi minimal 44px (`min-h-[44px]`).
2. **Type Safety & Zero Diagnostics**:
   - Seluruh perubahan berkas Astro/TypeScript wajib menghasilkan status **0 error, 0 warning, dan 0 hint** saat diverifikasi via `npx astro check`.
3. **Privasi & Keamanan**:
   - Dilarang menyisipkan skrip analitik eksternal atau pelacak pihak ketiga.
   - Seluruh kalkulasi wajib dijalankan di sisi klien (*client-side*).

---

## Pengujian Otomatis (Testing)

Sebelum mengajukan Pull Request, pastikan seluruh rantai verifikasi berikut berhasil tanpa kegagalan:

```bash
# 1. Menjalankan seluruh test case
npm test

# 2. Memeriksa tipe data dan diagnostik Astro
npx astro check

# 3. Memastikan kompilasi static build berhasil
npm run build
```

---

## Pengajuan Pull Request (PR)

1. Dorong (*push*) branch Anda ke repositori GitHub.
2. Buka Pull Request menuju branch `main`.
3. Isi seluruh checklist pada template PR yang disediakan.
4. Pastikan pipeline GitHub Actions CI berstatus hijau (lulus).
5. Tim maintainer akan meninjau perubahan Anda secara terbuka.
