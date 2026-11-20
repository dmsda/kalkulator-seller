# PROJECT AUDIT: KalkulatorSeller

**Tanggal Audit:** 21 November 2026  
**Auditor:** Senior Full-Stack Engineer & AI Agent  
**Status Repository:** Clean Init / Ready for Scaffold (Phase 0 Complete)

---

## 1. Kondisi Repository & Lingkungan Kerja

- **Path Workspace:** `/Users/dimasaditya/project/kalkulator-seller`
- **Node.js Version:** `v24.15.0` (LTS modern)
- **Package Manager:** `npm 11.12.1` & `pnpm 11.15.0`
- **Version Control:** Git `2.49.0` (diinisialisasi pada audit ini)
- **Status Awal:** 
  - Belum ada `package.json`, framework, atau runtime UI yang terpasang.
  - Tiga dokumen referensi master tersedia: `PRD_KalkulatorSeller_AgentAI_v1.0.md`, `UI_UX_Design_Spec_KalkulatorSeller_v1.0.md`, dan `PRD_KalkulatorSeller_AgentAI_v1.0.docx`.
  - Anti-slop plugin telah terpasang secara global di Antigravity (`~/.gemini/config/plugins/antislop`) dengan 6 skill aktif (`antislop`, `antislop-ui`, `antislop-human`, `antislop-layoutmobile`, `antislop-code`, `antislop-copywriting`).
  - Pointer `AGENTS.md` dan panduan visual `DESIGN.md` telah disiapkan di root workspace.

---

## 2. Analisis Kebutuhan Stack & Arsitektur

Berdasarkan PRD v1.0 dan UI/UX Spec v1.0:

| Komponen | Spesifikasi Ditetapkan | Justifikasi |
|---|---|---|
| **Framework** | Astro SSG (latest v5.x) | Static site generator tanpa JS framework runtime bawaan; menghasilkan HTML statis ultra-cepat |
| **Styling** | Tailwind CSS v4 | CSS engine modern berbasis Vite tanpa overhead konfigurasi kompleks; menggunakan CSS variables semantic |
| **JavaScript** | Vanilla JS (ES Modules) | Interaktivitas kalkulator reaktif tanpa beban runtime React/Vue/Svelte |
| **Calculation Engine** | Pure JavaScript | Terisolasi total dari DOM/storage/window, deterministic, dapat diuji 100% via unit tests |
| **Testing** | Vitest | Cepat, kompatibel native dengan Vite/ES Modules |
| **E2E Testing** | Playwright | Uji headless browser multi-device (mobile/desktop), keyboard navigation, dan accessibility |
| **Storage** | localStorage (JSON Schema) | Penyimpanan SKU privat di browser pengguna, tanpa server/login/database |
| **Target Hosting** | Cloudflare Pages | Edge hosting statis dengan security headers via `_headers` |

---

## 3. Masalah Teknis, Security, & Performance Concerns

### A. Technical & Business Logic Concerns
1. **Perhitungan Fee Cap & Unit:** Ada perbedaan fundamental antara biaya `per_item` vs `per_order`, serta scope fee cap (apakah cap berlaku per item atau per order). Formula engine harus memvalidasi ini secara eksplisit.
2. **Reverse Pricing Monotonicity:** Rumus profit tidak linier sederhana jika ada fee cap atau diskon bertingkat. Solusi: PRD menetapkan binary search dengan batas atas eksponensial dan verifikasi ulang forward engine (tidak mengasumsikan rumus 99% dari Blueprint).
3. **Status Data Tarif:** Tarif marketplace dinamis. PRD melarang mengarang tarif atau menampilkan data contoh Blueprint sebagai tarif resmi. Semua tarif tanpa verifikasi resmi ditandai `isAssumption: true` atau status `BLOCKED / unavailable`.

### B. Security Concerns
1. **XSS & DOM Injection:** Data SKU disimpan lokal dan diekspor. Wajib menggunakan `textContent` / DOM API yang aman, dilarang menyuntikkan user input via `innerHTML`.
2. **CSV Formula Injection:** Mitigasi karakter pemicu formula Excel (`=`, `+`, `-`, `@`, `\t`, `\r`) pada file ekspor SKU dengan menyematkan kutip tunggal aman dan UTF-8 BOM.
3. **localStorage Corruption:** Struktur JSON di localStorage harus memiliki schema versioning dan fail-safe recovery agar tidak menyebabkan white-screen jika data korup.
4. **Content Security Policy (CSP):** Header `_headers` harus melarang remote script injection dan remote fonts.

### C. Performance & Accessibility Concerns
1. **Zero External Font Requests:** Menolak Google Fonts / Adobe Typekit. Menggunakan default system sans-serif font stack.
2. **Zero Bloat / No Heavy Chart Libraries:** Tidak memasukkan Chart.js atau D3 untuk sekadar visualisasi bar; gunakan CSS stacked-bar murni.
3. **No Horizontal Overflow at 320px:** Seluruh form dan tabel harus reflow dengan rapi di viewport terkecil.
4. **Touch Target Size:** Minimal 44×44 CSS px untuk semua kontrol interaktif di mobile.

---

## 4. Evaluasi Kesesuaian Dokumen

- **Kesesuaian terhadap PRD v1.0:** PRD menjadi sumber kebenaran untuk logika bisnis, 4 tingkat profit (Profit Kotor, Profit Setelah Marketplace, Profit Setelah Operasional, Profit Bersih Akhir), metrik margin & ROI, skema tarif JSON, dan fitur Saved SKU.
- **Kesesuaian terhadap UI/UX Spec v1.0:** Menjadi sumber kebenaran visual, brand token (`#14213D`, `#FCA311`), layout 60/40 desktop, single-column mobile, dan Anti-slop Delivery Gate.

---

## 5. Rencana Eksekusi Bertahap

- [x] **PHASE 0:** Audit & Persiapan (PROJECT_AUDIT, DECISION_LOG, DESIGN.md, AGENTS.md, Git init)
- [ ] **PHASE 1:** Project Foundation (Astro, Tailwind CSS v4, Vitest, Folder Structure, Base Layout, Tokens)
- [ ] **PHASE 2:** Tariff Schema & Provenance (JSON schemas, verified/assumption tariffs for Shopee, TikTok Shop, Tokopedia)
- [ ] **PHASE 3:** Pure Calculation Engine (Forward pricing, Reverse pricing, 4 profit levels, Unit tests Vitest)
- [ ] **PHASE 4:** Single Platform UI (Shopee baseline calculator, reactive vanilla JS, accessible inputs)
- [ ] **PHASE 5:** Multi-Platform & Comparison Homepage (Shopee, TikTok Shop, Tokopedia comparison)
- [ ] **PHASE 6:** Local Storage, Saved SKU & CSV/JSON Export
- [ ] **PHASE 7:** Transparency Pages & SEO (/tarif, /panduan, legal, sitemap, meta)
- [ ] **PHASE 8:** QA, Accessibility, Security & Anti-slop Delivery Gate
- [ ] **PHASE 9:** Cloudflare Pages Deployment Readiness
