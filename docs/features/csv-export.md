# Fitur: Ekspor CSV Terlindungi (CSV Export & Security)

Fitur untuk mengunduh seluruh daftar produk tersimpan ke dalam format CSV (*Comma-Separated Values*) yang siap dibuka di Microsoft Excel, Google Sheets, atau Apple Numbers.

---

## 🛡 Mitigasi CSV Formula Injection (CWE-1236)
Bila nama produk atau ID mengandung karakter formula kalkulasi seperti:
`=SUM(A1:A10)`, `+cmd|'/C calc'!A0`, `-1+1`, atau `@echo`

Aplikasi spreadsheet seperti Excel dapat mengeksekusinya secara tidak sengaja saat file dibuka. Untuk melindungi seller:
1. Fungsi `sanitizeForCsv` di `src/utils/exportCsv.js` mendeteksi karakter awal berbahaya: `=`, `+`, `-`, `@`, `\t`, dan `\r`.
2. Karakter tersebut secara otomatis diawali dengan tanda kutip tunggal (`'`).
3. Tanda kutip ganda (`"`) di dalam teks diescape menjadi `""`.
4. Berkas diawali dengan *Byte Order Mark (BOM)* UTF-8 (`\uFEFF`) agar aksara dan simbol mata uang Indonesia terbuka dengan benar.
