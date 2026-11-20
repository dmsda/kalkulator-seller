# Variabel Lingkungan (Environment Variables)

Dokumentasi variabel lingkungan yang didukung pada **KalkulatorSeller**.

---

## 🔐 Filosofi Keamanan Tanpa Rahasia (Zero Secret Architecture)
KalkulatorSeller adalah 100% *Client-Side Application*. Aplikasi tidak memiliki database backend, token API berbayar, atau kredensial rahasia. Dengan demikian, tidak ada secret yang perlu disimpan di GitHub Actions Secrets maupun Cloudflare Pages Environment Secrets.

---

## 📋 Daftar Variabel yang Didukung

| Nama Variabel | Wajib? | Nilai Bawaan | Deskripsi |
|---|:---:|---|---|
| `PUBLIC_SITE_URL` | Opsional | `https://kalkulatorseller.pages.dev` | URL publik resmi yang digunakan untuk membangkitkan link kanonikal, Open Graph, dan lokasi sitemap XML. |
| `NODE_VERSION` | Direkomendasikan di CI/CD | `20.18.0` | Versi runtime Node.js yang digunakan oleh platform build Cloudflare Pages. |
