# Panduan Pengujian Otomatis (Testing Guide)

Panduan lengkap mengenai strategi, arsitektur, dan cara menjalankan seluruh suite automated testing pada **KalkulatorSeller**.

---

## 🧪 Piramida Pengujian
Suite pengujian KalkulatorSeller dibangun menggunakan **Vitest** dan dibagi menjadi 3 lapisan:
1. **Unit Testing (`tests/unit/`)**: Menguji kalkulasi forward, reverse, evaluasi skema tarif, responsivitas token, dan fungsi keamanan sanitasi CSV.
2. **Integration Testing (`tests/integration/`)**: Menguji kalkulasi terintegrasi 3 platform dan siklus hidup backup JSON.
3. **End-to-End Testing (`tests/e2e/`)**:
   - `calculationOracle.js`: Ground truth oracle independen (membandingkan rumus PRD tanpa bias mandiri).
   - `calculationEngineE2E.test.js`: Validasi paritas oracle, monotonisitas harga, fee caps, dan inversi harga jual ideal.
   - `userJourneys.test.js`: Menguji 8 skenario perjalanan pengguna dari hulu ke hilir.
   - `releaseGate.test.js`: Audit kriteria lolos rilis (Anti-Slop, A11y, Security, SEO).

---

## 🚀 Perintah Menjalankan Pengujian

```bash
# Menjalankan seluruh 57 test case sekali jalan
npm test

# Menjalankan test dalam mode watch interaktif
npm run test:watch

# Menjalankan hanya suite E2E
npx vitest run tests/e2e/

# Menjalankan pemeriksaan diagnostik Astro & TypeScript
npx astro check
```
