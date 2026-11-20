# Panduan Deployment Cloudflare Pages

Panduan menghubungkan repositori GitHub ke **Cloudflare Pages** untuk deployment otomatis setiap kali ada commit baru di branch `main`.

---

## 🚀 Langkah Integrasi Dashboard Cloudflare Pages

1. **Masuk ke Dashboard Cloudflare**:
   Buka [dash.cloudflare.com](https://dash.cloudflare.com/) dan pilih menu **Workers & Pages > Overview > Create Application > Pages > Connect to Git**.
2. **Pilih Repositori**:
   Hubungkan akun GitHub Anda dan pilih repositori `dmsda/kalkulator-seller`.
3. **Konfigurasi Build**:
   - **Framework Preset**: `Astro`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Root Directory**: `/` (kosongkan atau isi `/`)
   - **Node.js Version**: Tambahkan Environment Variable:
     - Variable name: `NODE_VERSION`
     - Value: `20.18.0`
4. **Deploy**:
   Klik **Save and Deploy**. Cloudflare akan mengompilasi situs dan menyajikannya di subdomain `kalkulatorseller.pages.dev` (atau domain kustom Anda).

---

## 🛡 Security Headers (`public/_headers`)
Berkas `public/_headers` secara otomatis diterapkan oleh Cloudflare Pages:
```text
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```
Header ini melindungi pengguna dari serangan *clickjacking*, *MIME sniffing*, dan akses perangkat keras ilegal.
