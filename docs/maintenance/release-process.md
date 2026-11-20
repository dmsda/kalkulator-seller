# Prosedur Rilis Versi Baru (Release Process)

Panduan standar untuk merilis versi baru **KalkulatorSeller** ke produksi.

---

## 🚦 Rantai Pemeriksaan Sebelum Rilis (Pre-Release Checklist)
1. **Lulus Seluruh Test**: `npm test` menghasilkan 100% lulus.
2. **Diagnostik Bersih**: `npx astro check` menghasilkan 0 error, 0 warning, 0 hint.
3. **Build Sukses**: `npm run build` berhasil mengompilasi 9 halaman statis dan sitemap.
4. **Pembaruan Changelog**: Catat seluruh perubahan baru di bawah heading versi pada `CHANGELOG.md`.
5. **Pembaruan Versi**: Perbarui nomor versi di `package.json` mematuhi *Semantic Versioning*.

---

## 📦 Langkah Pembuatan Rilis di Git & GitHub
```bash
# 1. Pastikan working tree bersih
git status

# 2. Buat tag versi baru
git tag -a v1.0.0 -m "Release v1.0.0 - KalkulatorSeller Initial Release"

# 3. Dorong commit dan tag ke GitHub
git push origin main --tags
```
Setelah tag didorong, Cloudflare Pages akan otomatis memicu build produksi dan memperbarui situs publik dalam beberapa detik.
