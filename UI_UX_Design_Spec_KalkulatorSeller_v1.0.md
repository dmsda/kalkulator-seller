# UI/UX Design Specification
# KalkulatorSeller

**Dokumen:** UI/UX Design Specification  
**Versi:** 1.0  
**Tanggal:** 21 November 2026  
**Status:** Draft implementasi untuk Product Owner dan Agent AI  
**Dokumen induk:** PRD KalkulatorSeller Agent AI v1.0  
**Produk:** KalkulatorSeller  
**Platform MVP:** Shopee, TikTok Shop, Tokopedia  
**Bahasa antarmuka:** Bahasa Indonesia  
**Target perangkat:** Mobile, tablet, desktop  
**Stack yang ditetapkan PRD:** Astro SSG, Vanilla JavaScript ES Modules, Tailwind CSS v4, Cloudflare Pages

---

## 0. Tujuan dan aturan penggunaan dokumen

Dokumen ini menerjemahkan kebutuhan produk di PRD menjadi arahan UI, UX, visual, interaksi, responsivitas, aksesibilitas, dan performa yang dapat langsung dikerjakan Agent AI.

Dokumen ini **tidak menggantikan PRD**. Jika terdapat konflik:
1. PRD menjadi sumber kebenaran untuk aturan bisnis, formula, fitur, scope, dan acceptance criteria.
2. Dokumen ini menjadi sumber kebenaran untuk presentasi visual, struktur halaman, pola interaksi, dan perilaku antarmuka.
3. Keputusan Product Owner (PO) mengikat keduanya jika ada keputusan yang secara eksplisit disetujui.
4. Agent AI tidak boleh mengarang keputusan bisnis atau tarif yang belum disetujui.

### 0.1 Prinsip prioritas

Urutan prioritas desain:

1. Ketepatan input dan hasil kalkulasi.
2. Kejelasan informasi biaya dan profit.
3. Kecepatan pengguna menyelesaikan simulasi.
4. Keterbacaan pada layar kecil.
5. Aksesibilitas dan keyboard usability.
6. Kecepatan loading dan respons interaksi.
7. Estetika yang sederhana, khas, dan konsisten.

Jangan mengorbankan keterbacaan atau kejelasan demi tampilan yang terlihat lebih dekoratif.

### 0.2 Definisi status requirement

- **MUST:** wajib diterapkan pada MVP.
- **SHOULD:** direkomendasikan; penundaan harus dicatat.
- **COULD:** dapat dikerjakan setelah MVP stabil.
- **BLOCKED:** menunggu keputusan PO atau sumber data valid.

---

# 1. Product experience direction

## 1.1 Karakter produk

KalkulatorSeller adalah alat bantu kerja, bukan landing page promosi, social media dashboard, atau SaaS enterprise dashboard.

Antarmuka harus terasa seperti kalkulator kerja yang matang: langsung, tenang, informatif, dan dapat dipercaya. Pengguna datang untuk memasukkan angka, memahami potongan, dan mengambil keputusan harga. Jangan menghalangi tugas tersebut dengan dekorasi atau konten promosi.

Karakter yang dituju:

- **Practical:** fungsi utama terlihat tanpa harus scroll jauh.
- **Clear:** label, satuan, basis fee, dan hasil tidak ambigu.
- **Trustworthy:** sumber tarif dan asumsi dapat diperiksa.
- **Quiet:** warna dan elemen visual tidak bersaing dengan angka hasil.
- **Responsive:** nyaman dipakai dengan satu tangan di ponsel.
- **Fast:** halaman tetap berguna tanpa animasi, font eksternal, chart library, atau JavaScript framework runtime.

## 1.2 Design statement

> KalkulatorSeller menyajikan kalkulasi harga dan profit seller dengan antarmuka yang ringkas, terstruktur, dan transparan. Setiap elemen visual harus membantu pengguna memasukkan data, membaca hasil, atau memahami biaya.

## 1.3 Pengalaman yang harus dihindari

Jangan membuat produk terlihat seperti template AI atau template dashboard generik.

Hindari:

- Hero besar dengan gradient mencolok yang mendorong kalkulator ke bawah.
- Bento grid yang hanya digunakan sebagai dekorasi.
- Card berlapis-lapis untuk setiap field.
- Border radius besar pada semua elemen.
- Gradient background, glow, glassmorphism, blur, dan shadow berlebihan.
- Heading promosi seperti “Unlock your potential”, “Revolutionize your business”, atau padanan terjemahannya.
- Angka statistik palsu, testimonial rekaan, logo klien fiktif, dan badge tanpa makna.
- Emoji sebagai ikon antarmuka utama.
- Grafik pie/donut yang tidak menambah pemahaman.
- Skeleton shimmer, animasi angka berlebihan, atau transisi yang memperlambat interaksi.
- Floating assistant/chat widget yang menutupi kalkulator.
- Tombol CTA berulang dengan fungsi sama.
- Font eksternal hanya demi tampilan.
- Placeholder sebagai pengganti label input.
- Teks abu-abu terlalu pucat untuk informasi penting.

---

# 2. Target pengguna dan konteks penggunaan

Mengacu pada persona PRD:

| Persona | Kebutuhan UI/UX | Hambatan yang harus diatasi |
|---|---|---|
| Seller pemula / Non-Star | Memahami HPP, fee, dan profit tanpa istilah rumit | Tidak mengetahui basis dan jenis potongan |
| Seller skala menengah | Menyimpan SKU dan membandingkan channel | Pengisian berulang dan perbedaan aturan platform |
| Brand owner / Mall / high-ticket | Memeriksa cap, multi-qty, dan struktur biaya | Salah memahami fee per item vs per order |

## 2.1 Kondisi penggunaan

Desain harus mengakomodasi:

- Pengguna membuka kalkulator dari Google di ponsel.
- Pengguna memasukkan data sambil membuka Seller Center di aplikasi lain.
- Pengguna melakukan beberapa simulasi secara berurutan.
- Pengguna tidak memiliki pengetahuan akuntansi.
- Pengguna memiliki koneksi internet lambat.
- Pengguna menggunakan keyboard fisik atau layar sentuh.
- Pengguna memakai browser dengan zoom 200%.
- Pengguna mengubah satu nilai berkali-kali untuk melihat dampaknya.

## 2.2 Jobs to be done

1. Saat hendak memasang harga, saya ingin mengetahui estimasi profit setelah potongan.
2. Saat menentukan harga promo, saya ingin memahami pengaruh diskon terhadap profit.
3. Saat mengejar target profit, saya ingin menemukan harga jual minimum yang benar-benar memenuhi target.
4. Saat berjualan di beberapa marketplace, saya ingin membandingkan hasil dengan input yang setara.
5. Saat mengelola banyak produk, saya ingin menyimpan simulasi dan membukanya kembali.
6. Saat melihat potongan yang tidak saya pahami, saya ingin mengetahui sumber, basis, dan status tarifnya.

---

# 3. Information architecture dan navigasi

## 3.1 Sitemap MVP

| URL | Tujuan | Struktur utama |
|---|---|---|
| `/` | Kalkulator komparasi | Header, intro singkat, kalkulator komparasi, hasil, penjelasan, FAQ |
| `/shopee` | Kalkulator Shopee | Pemilih mode, form, hasil, rincian fee, status tarif, panduan |
| `/tiktok-shop` | Kalkulator TikTok Shop | Pemilih mode, form, hasil, rincian fee, status tarif, panduan |
| `/tokopedia` | Kalkulator Tokopedia | Pemilih mode, form, hasil, rincian fee, status tarif, panduan |
| `/tarif` | Transparansi tarif | Tabel tarif, filter platform, sumber, tanggal, changelog |
| `/panduan` | Pusat panduan | Artikel edukasi dan tautan ke kalkulator |
| `/privacy-policy` | Privasi | Local storage, analytics, pihak ketiga |
| `/terms` | Ketentuan | Disclaimer dan batas penggunaan |
| `/404` | Halaman tidak ditemukan | Pesan singkat dan tautan kembali |

## 3.2 Navigasi utama

Desktop:
- Logo/wordmark KalkulatorSeller.
- Kalkulator (menu utama).
- Tarif.
- Panduan.
- Tautan Saved SKU jika fitur tersedia.
- Tidak perlu navbar tinggi atau mega menu.

Mobile:
- Wordmark dan tombol menu sederhana.
- Navigasi utama dapat berupa menu ringkas.
- Jangan membuat bottom navigation permanen jika tidak ada kebutuhan nyata.
- Jangan menutupi ruang vertikal kalkulator dengan header besar.

## 3.3 Header

Ketentuan:
- Tinggi desktop sekitar 56–64 px.
- Tinggi mobile sekitar 52–60 px.
- Wordmark berupa teks atau aset logo ringan.
- Tidak perlu ilustrasi besar.
- Navigasi menunjukkan halaman aktif dengan indikator sederhana.
- Header boleh sticky hanya jika hasil uji menunjukkan manfaat; default tidak sticky.

## 3.4 Footer

Footer berisi:
- Nama produk dan deskripsi singkat.
- Tautan Kalkulator, Tarif, Panduan, Privasi, Ketentuan.
- Catatan bahwa hasil adalah estimasi.
- Tahun copyright dinamis.
- Tidak menampilkan daftar logo marketplace seolah-olah ada kemitraan resmi.

---

# 4. Layout system

## 4.1 Grid dan lebar konten

| Properti | Rekomendasi |
|---|---|
| Max content width | 1.160 px |
| Reading width artikel | 720–760 px |
| Desktop gutter | 24–32 px |
| Tablet gutter | 20–24 px |
| Mobile gutter | 16 px |
| Form/result desktop | 60% / 40% |
| Kolom mobile | 1 kolom |
| Spacing base | Kelipatan 4 px |

Gunakan layout yang sederhana. Jangan memaksakan tiga kolom jika konten tidak membutuhkannya.

## 4.2 Layout kalkulator desktop

Struktur utama:

```text
┌────────────────────────────────────────────────────────────────┐
│ Header                                                         │
├────────────────────────────────────────────────────────────────┤
│ Breadcrumb (jika halaman detail platform)                      │
│ H1 + deskripsi singkat + status tarif                           │
├────────────────────────────────────────────────────────────────┤
│ Platform selector / mode selector                              │
├────────────────────────────────────┬───────────────────────────┤
│ INPUT                               │ HASIL                     │
│                                    │                           │
│ Harga jual                         │ Profit bersih / status    │
│ HPP                                │                           │
│ Diskon seller                      │ Ringkasan profit          │
│ Qty                                │ Margin / ROI              │
│ Biaya operasional                  │                           │
│ Pengaturan marketplace             │ Rincian biaya             │
│                                    │                           │
│                                    │ Disclaimer                │
├────────────────────────────────────┴───────────────────────────┤
│ Detail penjelasan / FAQ / panduan                              │
├────────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└────────────────────────────────────────────────────────────────┘
```

Aturan:
- Area input lebih lebar daripada area hasil.
- Hasil berada dekat form, bukan jauh di bawah halaman.
- Sticky result hanya boleh digunakan pada desktop jika tidak menutupi konten dan tidak mengganggu keyboard navigation.
- Sticky panel harus berhenti sebelum footer dan tidak boleh menutupi elemen fokus.
- Tidak perlu membungkus setiap kelompok input dalam card terpisah. Gunakan heading section dan divider.

## 4.3 Layout mobile

Urutan:
1. Header.
2. Judul halaman dan deskripsi satu baris/dua baris.
3. Status tarif.
4. Platform selector.
5. Mode selector.
6. Input inti.
7. Ringkasan hasil yang mudah ditemukan.
8. Rincian fee.
9. Biaya tambahan dan pengaturan lanjutan.
10. Saved SKU dan export.
11. Disclaimer.
12. Panduan/FAQ.

Aturan:
- Satu kolom.
- Tidak ada horizontal scroll pada viewport 320 CSS px.
- Hasil ringkas dapat muncul setelah input inti; jangan memaksa pengguna scroll ke bagian paling bawah.
- Jika menggunakan sticky bottom result bar, tampilkan satu angka ringkasan dan tombol/tautan menuju rincian. Jangan menutupi tombol, field, atau virtual keyboard.
- Perhitungkan `env(safe-area-inset-bottom)`.
- Ketika keyboard virtual terbuka, sticky bar harus disembunyikan atau berpindah agar tidak menutupi field aktif.
- Hindari fixed panel yang mengambil terlalu banyak tinggi layar.

## 4.4 Breakpoint

Gunakan breakpoint Tailwind atau CSS yang konsisten:

| Rentang | Perilaku |
|---|---|
| < 640 px | Mobile satu kolom |
| 640–767 px | Mobile lebar / small tablet |
| 768–1023 px | Tablet; layout adaptif |
| 1024–1279 px | Desktop |
| ≥ 1280 px | Desktop lebar dengan max-width |

Jangan mengubah layout hanya karena breakpoint framework. Perubahan harus mengikuti kebutuhan konten.

---

# 5. Visual design direction

## 5.1 Brand token

Gunakan token yang sudah ditetapkan PRD. Jangan membuat palet baru tanpa persetujuan PO.

| Token | Nilai | Fungsi |
|---|---|---|
| Brand primary | `#14213D` | Identitas utama, heading tertentu, elemen navigasi |
| Brand accent | `#FCA311` | Aksen dan CTA terpilih; teks di atasnya harus gelap |
| Canvas | `#FFFFFF` | Latar utama |
| Surface | `#F8F9FA` | Latar section/area sekunder |
| Border | `#E5E5E5` | Pembatas |
| Text primary | `#000000` | Teks utama |
| Success | `#047857` | Status positif |
| Danger | `#DC2626` | Error atau kerugian |
| Warning | `#FCA311` | Peringatan |

Catatan:
- Warna status wajib disertai teks/ikon.
- Jangan menggunakan accent untuk seluruh tombol dan seluruh highlight.
- Uji kontras pada kombinasi aktual. Jangan menganggap warna brand otomatis lolos WCAG.
- Hindari gradient dan warna tambahan dekoratif.
- Dark mode berstatus COULD menurut PRD; token boleh disiapkan, tetapi jangan mengerjakannya sebelum scope disetujui.

## 5.2 Typography: system font first

**MUST:** gunakan font bawaan sistem sebagai pilihan default. Jangan memuat Google Fonts, Adobe Fonts, font CDN, atau file font lokal pada MVP hanya demi estetika.

System font stack:

```css
:root {
  --font-sans:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  --font-mono:
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    monospace;
}

html {
  font-family: var(--font-sans);
}
```

Jika pengguna memilih font browser/OS atau menerapkan user stylesheet, jangan memaksa font custom melalui selector yang sulit dioverride. Hindari `!important` pada font-family.

Skala tipografi awal:

| Peran | Ukuran | Weight | Catatan |
|---|---:|---:|---|
| H1 | 28–36 px | 650–700 | Hindari hero heading terlalu besar |
| H2 | 20–24 px | 600–650 | Judul section |
| H3 | 16–18 px | 600 | Judul kelompok |
| Body | 14–16 px | 400 | Default 16 px untuk kenyamanan |
| Label | 13–14 px | 500–600 | Jangan terlalu kecil |
| Helper | 12–13 px | 400 | Tetap kontras |
| Angka hasil utama | 28–36 px | 650–700 | Gunakan tabular numbers |
| Angka tabel | 13–14 px | 500 | Rata kanan |

Gunakan `font-variant-numeric: tabular-nums` untuk angka uang, persentase, qty, dan tabel agar posisi angka stabil.

## 5.3 Spacing

Gunakan skala konsisten berbasis 4 px:

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64`

Jangan menambahkan margin acak untuk memperbaiki layout yang struktur dasarnya keliru.

## 5.4 Border, radius, shadow

- Border tipis untuk memisahkan area.
- Radius kecil hingga sedang; tidak semua elemen harus pill.
- Input dan tombol boleh memiliki radius konsisten.
- Shadow hanya digunakan jika membantu hierarki layer.
- Jangan memberi shadow pada setiap card.
- Hindari panel putih bertumpuk di atas background abu-abu dengan radius besar secara berulang.

## 5.5 Ikon

- Gunakan ikon hanya jika mempercepat pemahaman.
- Utamakan ikon SVG kecil yang inline atau icon set yang sudah tersedia dalam dependency proyek.
- Jangan memasang library ikon besar jika hanya membutuhkan beberapa ikon.
- Jangan memakai emoji sebagai pengganti ikon status, navigasi, atau tindakan.
- Ikon dekoratif harus `aria-hidden="true"`.

---

# 6. Page specification

## 6.1 Homepage `/`

Tujuan: pengguna dapat langsung memulai simulasi atau memilih platform.

Urutan konten:
1. Header.
2. H1: “Hitung Profit Jualan di Marketplace”.
3. Deskripsi pendek yang menjelaskan HPP, potongan, dan profit.
4. Status pembaruan tarif.
5. Platform selector: Shopee, TikTok Shop, Tokopedia.
6. Kalkulator komparasi atau akses cepat ke kalkulator platform.
7. Hasil komparasi.
8. Catatan sumber tarif dan asumsi.
9. Link ke halaman tarif dan panduan.
10. FAQ yang benar-benar menjawab pertanyaan pengguna.
11. Footer.

Copy contoh:
- H1: **Hitung Profit Jualan di Marketplace**
- Deskripsi: “Masukkan harga jual dan modal untuk melihat estimasi potongan serta keuntungan di setiap marketplace.”
- CTA: **Mulai hitung**
- Link sekunder: **Lihat rincian tarif**

Jangan menggunakan headline promosi yang tidak menjelaskan fungsi.

### Homepage acceptance

- Pengguna dapat memahami fungsi dalam beberapa detik.
- Kalkulator/selector terlihat tanpa harus melewati hero dekoratif.
- Tidak ada klaim tarif terbaru tanpa verifikasi.
- Tidak ada statistik atau testimonial palsu.
- Seluruh fungsi inti dapat digunakan tanpa login.

## 6.2 Halaman platform `/shopee`, `/tiktok-shop`, `/tokopedia`

Struktur:
- Breadcrumb.
- H1 unik dan spesifik platform.
- Deskripsi singkat.
- Status tarif: status, tanggal verifikasi, sumber.
- Platform selector.
- Mode selector.
- Form input.
- Ringkasan hasil.
- Breakdown fee.
- Panel asumsi/override.
- Saved SKU.
- Disclaimer.
- FAQ spesifik platform.

Konten platform tidak boleh sekadar menukar nama platform dari template yang sama. Field dan kondisi hanya ditampilkan jika benar-benar berlaku untuk konfigurasi platform tersebut.

## 6.3 Halaman tarif `/tarif`

Tujuan: transparansi, bukan halaman pemasaran.

Komponen:
- Judul dan penjelasan bahwa tarif dapat berubah.
- Filter platform.
- Filter status/verifikasi.
- Tabel tarif.
- Informasi kategori/toko/program.
- Basis, unit, cap, kondisi.
- Tanggal berlaku.
- Tanggal verifikasi.
- Sumber resmi yang dapat dibuka.
- Changelog.

Mobile:
- Hindari tabel dengan kolom terlalu banyak yang memaksa horizontal scroll tanpa kontrol.
- Pertimbangkan tampilan daftar per tarif dengan label-value.
- Jika tabel tetap digunakan, sediakan scroll container yang jelas dan tidak mengganggu seluruh halaman.

Tarif yang belum diverifikasi harus ditandai jelas. Jangan menggunakan warna hijau atau kata “resmi” untuk tarif yang masih berupa asumsi.

## 6.4 Halaman panduan `/panduan`

- Fokus pada kebutuhan praktis seller.
- Artikel memiliki struktur heading yang jelas.
- Tautan kontekstual menuju kalkulator.
- Tidak menampilkan blok promosi besar di tengah penjelasan.
- Ilustrasi hanya digunakan jika menjelaskan konsep.
- Gambar harus memiliki dimensi eksplisit dan format modern.

## 6.5 Halaman legal

Privacy policy dan terms harus mudah dibaca, dengan lebar konten terbatas. Jangan memasang sidebar dekoratif atau layout dashboard pada halaman legal.

---

# 7. Calculator interaction specification

## 7.1 Prinsip umum

- Perhitungan berjalan otomatis saat input valid berubah.
- Jangan membutuhkan tombol “Hitung” untuk setiap perubahan.
- Jangan menghitung menggunakan string tampilan yang sudah diformat.
- State uang disimpan sebagai integer Rupiah.
- Input kosong berbeda dengan nol.
- Field memiliki label permanen.
- Hasil harus menyatakan apakah angka merupakan estimasi, menggunakan asumsi, atau memakai tarif terverifikasi.
- Formula dan aturan bisnis mengikuti PRD.

## 7.2 Platform selector

Pilihan:
- Shopee
- TikTok Shop
- Tokopedia

Perilaku:
- Pilihan aktif terlihat dengan indikator non-warna juga (misalnya border/underline dan state semantik).
- Pergantian platform mempertahankan input umum seperti harga, HPP, diskon, dan qty.
- Field khusus platform menyesuaikan konfigurasi.
- Jika tarif platform belum tersedia/valid, tampilkan status dan jangan menampilkan angka seolah-olah valid.

## 7.3 Mode selector

Dua mode:
- **Hitung Profit**
- **Cari Harga Jual**

Gunakan segmented control atau tab sederhana.

Pergantian mode:
- Pertahankan data input yang relevan.
- Jangan menghapus nilai diam-diam.
- Beri label target profit dengan satuan yang eksplisit: per unit atau per pesanan.
- Mode aktif dapat dikenali oleh screen reader.

## 7.4 Input uang Rupiah

Field:
- Harga jual per unit.
- HPP per unit.
- Diskon seller per unit.
- Biaya operasional.
- Biaya iklan.
- Biaya affiliate/kreator.
- Komponen lain yang ditentukan PRD.

Perilaku:
- Format ribuan saat blur atau dengan strategi input yang tidak mengganggu caret.
- Menerima paste angka dengan separator umum.
- Tidak mengubah nilai menjadi `NaN`.
- Input kosong tetap kosong.
- Nilai negatif ditolak kecuali komponen secara eksplisit mendukung nilai negatif.
- Tampilkan prefix `Rp` secara visual tanpa menjadikan prefix bagian dari nilai numerik.
- Saat fokus, pengguna dapat mengedit bagian tengah angka.
- Pesan validasi dekat field terkait.
- Jangan hanya menggunakan placeholder sebagai contoh.

Contoh label:
- `Harga jual per unit`
- `HPP per unit`
- `Diskon seller per unit`

Helper:
- “Harga sebelum diskon yang ditanggung seller.”
- “Biaya modal produk untuk satu unit.”

## 7.5 Quantity

- Default 1.
- Integer positif.
- Tidak menerima desimal atau nilai negatif.
- Jelaskan bahwa beberapa fee dihitung per pesanan, bukan per item.
- Tampilkan total pesanan dan rata-rata per unit secara terpisah jika relevan.

## 7.6 Biaya tambahan

Kelompok biaya tambahan dapat dilipat/expand, tetapi jangan menyembunyikan biaya yang wajib untuk menghasilkan angka berlabel “profit bersih”.

Setiap biaya harus menjelaskan:
- Nama.
- Nilai.
- Unit (per item/per order/persentase).
- Basis persentase jika berlaku.
- Status wajib/opsional.
- Dampaknya terhadap level profit.

Jika biaya tidak diketahui:
- Sediakan pilihan untuk mengisi atau menandai belum diketahui.
- Jangan diam-diam menganggap biaya yang wajib diketahui bernilai nol.
- Jangan menampilkan profit bersih final jika komponen yang dibutuhkan belum dimasukkan.

## 7.7 Marketplace fee controls

Tampilkan:
- Nama biaya.
- Nilai tarif.
- Basis perhitungan.
- Unit.
- Cap jika ada.
- Kondisi aktif.
- Status sumber.
- Tautan sumber.
- Kontrol override jika diizinkan.

Override:
- Bedakan preset resmi, override pengguna, dan asumsi.
- Sediakan aksi reset.
- Jelaskan bahwa override hanya berlaku pada simulasi/SKU sesuai aturan PRD.
- Jangan membuat pengguna mengira override mengubah tarif marketplace sebenarnya.

## 7.8 Hasil kalkulasi

Urutan hasil:
1. Profit bersih akhir, jika seluruh komponen yang diperlukan tersedia.
2. Profit setelah operasional.
3. Profit setelah marketplace.
4. Profit kotor.
5. Margin dan ROI dengan denominator/definisi yang telah disetujui.
6. Rincian biaya.

Jika definisi metrik masih belum disetujui PO, jangan mengarang label atau formula. Tandai bagian terkait sebagai BLOCKED.

Angka utama:
- Menggunakan format Rupiah.
- Memakai tabular numerals.
- Status untung/rugi ditampilkan dalam teks.
- Jangan hanya mengandalkan warna.
- Angka negatif harus memiliki tanda minus yang jelas.
- Nilai nol harus dibedakan dari data yang belum tersedia.

## 7.9 Breakdown biaya

Gunakan daftar atau tabel sederhana.

| Komponen | Nilai | Keterangan |
|---|---:|---|
| Pendapatan efektif | Rp… | Setelah diskon seller |
| HPP | Rp… | Total sesuai qty |
| Fee marketplace | Rp… | Rincian dapat dibuka |
| Biaya operasional | Rp… | Jika dimasukkan |
| Iklan | Rp… | Jika dimasukkan |
| Affiliate | Rp… | Jika dimasukkan |
| Profit | Rp… | Level profit yang dipilih |

- Detail basis dapat dibuka per fee.
- Fee cap aktif harus diberi keterangan.
- Fee override harus diberi label.
- Tarif asumsi harus dibedakan dari tarif terverifikasi.
- Hindari grafik jika tabel sudah cukup menjelaskan.

## 7.10 Stacked bar

PRD mencantumkan stacked bar sebagai komponen. Implementasikan hanya jika memberi pemahaman tambahan.

Ketentuan:
- Memiliki legenda tekstual.
- Memiliki nilai numerik yang sama dengan breakdown.
- Tidak menjadi satu-satunya cara membaca data.
- Dapat dipahami tanpa warna.
- Jika nilai negatif atau rentang data membuat grafik menyesatkan, jangan render grafik; gunakan breakdown tabel.
- Jangan memasang chart library besar hanya untuk satu visualisasi sederhana.

## 7.11 Reverse pricing

Form harus menjelaskan:
- HPP per unit.
- Target profit.
- Target per unit/per pesanan.
- Qty.
- Diskon dan fee terkait.
- Aturan pembulatan harga jual.

Hasil:
- Harga jual minimum yang memenuhi target.
- Target profit yang diminta.
- Profit aktual setelah diverifikasi forward engine.
- Harga satu langkah di bawah hasil yang tidak memenuhi target, jika dibutuhkan untuk membuktikan minimum.
- Catatan domain/guardrail jika pencarian tidak dapat dilakukan.

Jangan menampilkan harga rekomendasi sebelum verifikasi forward engine sukses. Penanganan algoritma mengikuti PRD.

## 7.12 Live update dan feedback

- Debounce hanya jika diperlukan untuk mencegah pekerjaan berat; kalkulasi lokal sederhana sebaiknya langsung.
- Jangan menampilkan spinner untuk operasi yang selesai seketika.
- Jika kalkulasi gagal, pertahankan input pengguna.
- Tampilkan error yang spesifik dan dapat ditindaklanjuti.
- Jangan menghapus hasil terakhir tanpa penjelasan ketika input menjadi invalid.
- Gunakan `aria-live="polite"` untuk ringkasan hasil, bukan setiap perubahan karakter.

---

# 8. Saved SKU, export, dan restore

## 8.1 Saved SKU

Aksi:
- Simpan SKU.
- Lihat daftar.
- Buka simulasi.
- Edit.
- Duplikasi jika disetujui.
- Hapus satu item.
- Hapus semua dengan konfirmasi.
- Export CSV.
- Backup JSON.
- Restore JSON.

Form simpan SKU:
- Nama produk.
- Platform.
- Data input.
- Override.
- Versi tarif/snapshot sesuai PRD.
- Ringkasan hasil jika snapshot disimpan.

UX:
- Nama produk wajib jika memang menjadi identitas daftar.
- Jangan meminta informasi yang tidak digunakan.
- Simpan tanpa login.
- Tampilkan penjelasan bahwa data tersimpan di browser/perangkat ini.
- Beri feedback sukses yang singkat.
- Jika storage penuh atau gagal, jelaskan bahwa data belum tersimpan.

## 8.2 Daftar SKU

Desktop:
- Tabel ringkas dengan nama SKU, platform, harga jual, profit, tanggal update, aksi.
- Aksi tidak boleh hanya berupa ikon tanpa accessible name.

Mobile:
- Daftar ringkas per item.
- Informasi terpenting di baris pertama.
- Aksi sekunder melalui menu yang mudah diakses.

## 8.3 CSV export

- Tombol jelas: `Ekspor CSV`.
- Beri informasi data yang diekspor.
- Mitigasi formula injection mengikuti PRD.
- File tidak boleh memuat data tersembunyi yang tidak diminta.
- Tampilkan feedback setelah file disiapkan.

## 8.4 JSON backup/restore

- Tombol terpisah untuk `Unduh backup` dan `Pulihkan backup`.
- Validasi file sebelum mengubah data.
- Tampilkan jumlah SKU yang akan di-merge/replace.
- Minta konfirmasi sebelum mengganti data lama.
- Jika file tidak valid, tampilkan alasan dan pertahankan data lama.

---

# 9. Component specification

| Komponen | Ketentuan visual | Perilaku |
|---|---|---|
| Header | Ringkas, wordmark dan navigasi | Link jelas, active state |
| Breadcrumb | Tipis, tidak dominan | Navigasi hierarkis |
| Platform selector | Tab/segmented control | Mempertahankan input umum |
| Mode selector | Dua opsi sederhana | State aktif jelas |
| Currency input | Label di atas field, prefix Rp | Parsing aman, caret stabil |
| Number input | Label dan helper | Validasi integer/range |
| Select | Native select jika memadai | Keyboard dan mobile friendly |
| Checkbox/toggle | Label eksplisit | Status dapat dibaca |
| Fee row | Nama, basis, unit, status | Expand detail bila perlu |
| Result summary | Angka utama dan label | Live update |
| Profit breakdown | Tabel/list | Nilai rata kanan |
| Status badge | Warna + teks | Status sumber/asumsi |
| Tooltip | Hanya untuk penjelasan ringkas | Bisa keyboard/touch |
| Accordion | Heading informatif | Native disclosure jika memungkinkan |
| Toast | Ringkas dan tidak menghalangi | Auto-dismiss hanya untuk info non-kritis |
| Dialog | Hanya untuk konfirmasi penting | Focus trap, Escape, return focus |
| Empty state | Kalimat langsung + satu aksi | Tidak berupa ilustrasi besar |
| Error state | Pesan spesifik | Cara memperbaiki |
| Footer | Link legal dan navigasi | Tidak terlalu tinggi |

## 9.1 Button hierarchy

- Primary: satu aksi utama per konteks.
- Secondary: aksi pendukung.
- Tertiary/link: navigasi atau aksi minor.
- Destructive: hapus, dengan konfirmasi sesuai dampak.

Jangan menjadikan semua tombol warna accent. Jangan memakai tombol besar untuk setiap aksi kecil.

## 9.2 Input states

Setiap field memiliki:
- Default.
- Hover (desktop).
- Focus-visible.
- Filled.
- Disabled (jika memang diperlukan).
- Invalid.
- Read-only (jika memang diperlukan).

State harus konsisten dan tidak hanya dibedakan melalui warna.

## 9.3 Empty states

Contoh:
- “Belum ada SKU tersimpan.”
- “Simpan simulasi produk agar mudah dibuka kembali.”
- CTA: “Simpan SKU pertama”.

Hindari ilustrasi kosong generik yang tidak memberi informasi.

## 9.4 Error states

Contoh:
- “Masukkan harga jual yang valid.”
- “Diskon seller tidak boleh melebihi harga jual.”
- “Tarif untuk kondisi ini belum tersedia.”
- “File backup tidak dapat dibaca. Data yang tersimpan tidak diubah.”

Jangan menampilkan error teknis mentah seperti stack trace kepada pengguna.

---

# 10. Responsive behavior

## 10.1 Mobile-first rules

- Field full-width.
- Label tidak terpotong.
- Tombol memiliki target sentuh minimal 44 × 44 CSS px sebagai target desain.
- Teks tidak terlalu kecil.
- Tidak ada hover-only interaction.
- Menu dapat digunakan dengan keyboard dan touch.
- Hasil tidak memerlukan pinch zoom.
- Tabel panjang memiliki strategi mobile yang jelas.
- Sticky elements tidak menutupi konten.
- Modal tidak melebihi viewport.
- Tidak ada horizontal overflow pada 320 px.

## 10.2 Tablet

- Hindari form terlalu melebar.
- Bisa menggunakan dua kolom jika setiap kolom tetap memiliki lebar yang nyaman.
- Hasil tetap dekat dengan form.
- Jangan memakai desktop layout miniatur yang mengecilkan semua elemen.

## 10.3 Desktop

- Gunakan ruang horizontal untuk input dan hasil.
- Batasi panjang baris teks.
- Angka hasil dan tabel tetap mudah dipindai.
- Jangan menambah sidebar hanya untuk mengisi ruang kosong.

## 10.4 Zoom dan reflow

Uji:
- 200% browser zoom.
- 320 CSS px viewport.
- Text-only zoom jika browser mendukung.
- Keyboard navigation.
- Virtual keyboard mobile.

Konten harus tetap dapat diakses tanpa kehilangan fungsi inti.

---

# 11. Accessibility

Target minimal: WCAG 2.2 AA sebagai standar desain dan pengujian.

## 11.1 Semantic HTML

- Gunakan `header`, `nav`, `main`, `section`, `form`, `label`, `button`, `table`, dan `footer` sesuai fungsi.
- Satu H1 utama per halaman.
- Heading berurutan.
- Jangan memakai `div` sebagai tombol.
- Gunakan button untuk aksi dan anchor untuk navigasi.

## 11.2 Keyboard

- Semua kontrol dapat dicapai dengan Tab.
- Urutan fokus mengikuti urutan visual dan logika.
- Focus indicator jelas.
- Tidak ada keyboard trap kecuali dialog yang mengelola fokus dengan benar.
- Escape menutup dialog yang dapat ditutup.
- Setelah dialog ditutup, fokus kembali ke pemicu.

## 11.3 Screen reader

- Label setiap input permanen.
- Error terhubung ke field dengan `aria-describedby`.
- State toggle dapat dibaca.
- Hasil kalkulasi menggunakan live region secara terkendali.
- Ikon dekoratif disembunyikan dari assistive technology.
- Tabel memiliki header yang benar.

## 11.4 Contrast dan warna

- Uji teks normal dan teks besar pada background aktual.
- Jangan memakai warna sebagai satu-satunya pembeda.
- Link dapat dikenali tanpa hanya mengandalkan warna.
- Error, warning, success selalu punya label teks.

## 11.5 Motion

- Default tanpa animasi dekoratif.
- Hormati `prefers-reduced-motion`.
- Jangan animasikan angka hasil secara berulang.
- Hindari parallax, scroll reveal, dan transisi yang tidak membantu.

---

# 12. Content design dan microcopy

## 12.1 Tone of voice

- Bahasa Indonesia sederhana.
- Langsung ke inti.
- Tidak terlalu formal.
- Tidak menggurui.
- Tidak menjanjikan profit.
- Gunakan istilah yang konsisten dengan PRD.
- Istilah teknis diberi penjelasan singkat saat pertama kali muncul.

## 12.2 Label yang disarankan

| Hindari | Gunakan |
|---|---|
| Revenue | Pendapatan |
| COGS | HPP |
| Net Income | Profit bersih akhir |
| Calculate Now! | Hitung profit |
| Optimize Your Pricing | Cari harga jual |
| Fee Configuration | Pengaturan biaya |
| Save Item | Simpan SKU |
| Reset All | Kembalikan tarif awal |
| Profitability Overview | Ringkasan profit |

Jangan menerjemahkan istilah platform secara tidak konsisten. Ikuti kamus istilah PRD.

## 12.3 Microcopy untuk status

- Tarif terverifikasi: “Sumber dan tanggal verifikasi tersedia.”
- Tarif belum terverifikasi: “Tarif ini belum diverifikasi. Hasil hanya simulasi.”
- Override: “Menggunakan tarif yang diubah sendiri.”
- Asumsi: “Sebagian biaya menggunakan asumsi.”
- Data belum lengkap: “Lengkapi biaya yang diperlukan untuk melihat profit bersih akhir.”
- Storage lokal: “SKU tersimpan di browser ini.”

## 12.4 Disclaimer

Letakkan dekat hasil, bukan hanya di footer.

Contoh draft:
> Hasil kalkulasi merupakan estimasi berdasarkan input dan konfigurasi tarif yang ditampilkan. Biaya aktual dapat berbeda sesuai kategori, program, status toko, kebijakan, dan transaksi di marketplace. Periksa rincian biaya pada Seller Center sebelum menetapkan harga.

Copy final perlu ditinjau PO/legal.

---

# 13. Performance specification

KalkulatorSeller harus ringan secara default. Jangan menambahkan dependency hanya untuk menyelesaikan masalah yang bisa diselesaikan dengan HTML, CSS, atau JavaScript native.

## 13.1 Performance targets

Mengikuti PRD:

| Metrik | Target |
|---|---:|
| LCP | ≤ 2,5 detik |
| INP | ≤ 200 ms |
| CLS | ≤ 0,1 |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |

Target harus diuji pada production build dengan kondisi mobile throttling yang dicatat.

## 13.2 Font policy

**MUST:**
- System font stack sebagai default.
- Tidak ada request font eksternal.
- Tidak ada Google Fonts import.
- Tidak ada file WOFF/WOFF2 kecuali PO secara eksplisit menyetujui kebutuhan dan dampaknya.
- Hormati preferensi font user/browser.
- Gunakan fallback yang wajar.

## 13.3 JavaScript policy

- Astro SSG untuk halaman statis.
- Vanilla JavaScript ES Modules untuk kalkulator.
- Jangan menambahkan React/Vue/Svelte runtime untuk MVP.
- Hindari hydration jika tidak diperlukan.
- Pisahkan calculation engine dari DOM.
- Lazy-load modul non-kritis.
- Jangan menjalankan script pihak ketiga sebelum diperlukan.
- Hindari global event listeners yang tidak dibersihkan.
- Hindari polling.

## 13.4 CSS policy

- Tailwind CSS v4 sesuai PRD.
- Hapus CSS yang tidak digunakan melalui build.
- Hindari runtime CSS-in-JS.
- Hindari animasi berat.
- Jangan memakai background image besar untuk menghias halaman kalkulator.
- Jangan mengimpor reset atau utility framework kedua.

## 13.5 Image policy

- Kalkulator tidak membutuhkan hero image.
- Logo sebaiknya SVG ringan atau wordmark teks.
- Gambar artikel harus memiliki ukuran eksplisit, format WebP/AVIF jika sesuai.
- Gunakan lazy loading untuk gambar non-kritis.
- Hindari gambar stock hanya untuk dekorasi.

## 13.6 Third-party policy

- Tidak ada chat widget.
- Tidak ada heatmap/session replay pada MVP.
- Analytics hanya jika disetujui PO dan privacy policy diperbarui.
- Jangan kirim nama SKU atau nilai input ke analytics.
- Tidak ada embed eksternal pada area kalkulator.

## 13.7 Budget awal

Target budget awal untuk direview setelah baseline build pertama:

| Area | Budget awal |
|---|---:|
| Font eksternal | 0 KB |
| Hero image homepage | 0 KB |
| Icon package besar | 0 KB |
| Framework UI runtime | 0 KB tambahan |
| Third-party widget | 0 |
| JS kalkulator + UI | Dijaga sekecil mungkin; ukur gzip/brotli dari build |
| CSS produksi | Hanya CSS yang dipakai |

Jangan mengklaim ukuran bundle tertentu sebelum hasil build diukur. Agent harus melaporkan ukuran aktual.

---

# 14. Technical implementation guidance

## 14.1 Separation of concerns

Pisahkan:
- Data tarif/configuration.
- Calculation engine.
- Input parsing/formatting.
- UI state.
- Rendering.
- Storage.
- Export/import.
- Analytics (jika disetujui).

Calculation engine tidak boleh bergantung pada DOM, `window`, `localStorage`, atau framework.

## 14.2 Suggested component structure

Nama berikut merupakan rekomendasi struktur, bukan kewajiban jika repository sudah memiliki pola yang lebih baik.

```text
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── PlatformSelector.astro
│   ├── ModeSelector.astro
│   ├── CurrencyInput.astro
│   ├── QuantityInput.astro
│   ├── FeeBreakdown.astro
│   ├── ResultSummary.astro
│   ├── SavedSkuList.astro
│   └── Disclaimer.astro
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── shopee.astro
│   ├── tiktok-shop.astro
│   ├── tokopedia.astro
│   ├── tarif.astro
│   ├── panduan/
│   ├── privacy-policy.astro
│   └── terms.astro
├── scripts/
│   ├── calculator-controller.js
│   ├── currency-input.js
│   ├── result-renderer.js
│   ├── saved-sku.js
│   └── form-validation.js
├── styles/
│   └── global.css
└── lib/
    ├── calculation/
    ├── tariffs/
    ├── storage/
    └── export/
```

## 14.3 Design tokens

Simpan token dalam satu sumber agar tidak muncul nilai warna, spacing, radius, atau font yang berbeda-beda di setiap komponen.

Contoh awal:

```css
:root {
  color-scheme: light;

  --color-primary: #14213d;
  --color-accent: #fca311;
  --color-canvas: #ffffff;
  --color-surface: #f8f9fa;
  --color-border: #e5e5e5;
  --color-text: #000000;
  --color-success: #047857;
  --color-danger: #dc2626;

  --font-sans:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  --radius-control: 6px;
  --radius-panel: 8px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;

  --content-width: 1160px;
}
```

Nilai radius dan token lain dapat disesuaikan melalui review visual, tetapi harus konsisten dan punya alasan.

## 14.4 No arbitrary UI dependencies

Sebelum memasang package:
1. Jelaskan masalah yang ingin diselesaikan.
2. Periksa apakah HTML/CSS/JS native cukup.
3. Ukur ukuran bundle dan dampak runtime.
4. Periksa maintenance, lisensi, dan keamanan.
5. Minta persetujuan jika dependency menambah beban signifikan.

---

# 15. Anti-slop integration

## 15.1 Tujuan

Repository `miqdadbadjuber/anti-slop` digunakan sebagai filter kualitas untuk Agent AI. Tool ini bukan design system, bukan component library, dan bukan jaminan otomatis bahwa desain akan bagus.

Anti-slop harus dipakai bersama dokumen visual direction ini dan `DESIGN.md`.

Repository:
- https://github.com/miqdadbadjuber/anti-slop
- Guide: https://github.com/miqdadbadjuber/anti-slop/blob/main/GUIDE.md

## 15.2 Recommended installation

Pilih satu metode instalasi sesuai Agent AI yang digunakan. Jangan memasang beberapa jalur sekaligus jika hasilnya membuat skill/rules duplikat.

### Opsi A — Installer interaktif (direkomendasikan)

Jalankan dari root repository KalkulatorSeller:

```bash
npx antislop-ai
```

Saat wizard muncul:
1. Pilih instalasi untuk project ini, bukan global, agar aturan ikut repository.
2. Pilih Agent AI yang benar-benar digunakan.
3. Pilih core `antislop`.
4. Pilih `antislop-ui`.
5. Pilih `antislop-human`.
6. Pilih `antislop-layoutmobile`.
7. Pilih `antislop-code` jika agent juga diminta membersihkan komentar kode.
8. Pilih mode **during** untuk membimbing implementasi sejak awal.
9. Selesaikan wizard dan periksa file yang dibuat.

Jika tersedia, gunakan mode during:

```bash
npx antislop-ai --mode during
```

### Opsi B — Jika menggunakan Antigravity

```bash
agy plugin install https://github.com/miqdadbadjuber/anti-slop
```

Setelah instalasi:
- Restart/reload sesi Agent AI.
- Pastikan plugin aktif.
- Periksa bahwa rule dan skill UI, human, dan mobile terbaca.
- Jika plugin manager tidak tersedia atau perintah gagal, gunakan installer interaktif.

### Opsi C — Jika menggunakan Codex

```bash
codex plugin marketplace add miqdadbadjuber/anti-slop
codex plugin add antislop@anti-slop
```

### Opsi D — Skills directory

```bash
npx skills add miqdadbadjuber/anti-slop
```

Catatan: menurut dokumentasi repository, metode skills directory menyalin skill, tetapi tidak otomatis membuat pointer sesi untuk setiap agent. Pastikan agent memang memuat folder skill tersebut. Installer interaktif lebih disarankan untuk project setup.

## 15.3 Skill yang dipilih

| Skill | Status | Alasan |
|---|---|---|
| `antislop` | MUST | Aturan inti dan Delivery Gate |
| `antislop-ui` | MUST | Layout, warna, komponen, dekorasi, motion, struktur |
| `antislop-human` | MUST | Kontras, keyboard, focus, interaction states |
| `antislop-layoutmobile` | MUST | Responsive, breakpoint, overflow, tap targets |
| `antislop-code` | SHOULD | Audit komentar kode |
| `antislop-copywriting` | SHOULD | Microcopy dan menghindari copy generik |

## 15.4 Project pointer

Agent AI harus memeriksa pointer/rule file yang dibuat installer. Jangan menimpa `AGENTS.md`, `CLAUDE.md`, atau file instruksi proyek yang sudah ada tanpa menggabungkan isinya secara aman.

Instruksi project minimum:

```md
## Anti-slop requirements

- Read and follow the installed antislop core rules every session.
- Load antislop-ui for all interface and visual work.
- Load antislop-human for accessibility and interaction work.
- Load antislop-layoutmobile for responsive implementation.
- Treat UI_UX_Design_Spec_KalkulatorSeller_v1.0.md and DESIGN.md as
  the product-specific visual direction.
- Do not invent visual patterns without a product reason.
- Run the antislop Delivery Gate before marking UI work complete.
- Report PASS/FAIL with concrete evidence. Do not claim PASS without
  inspecting the implemented page and testing it.
```

## 15.5 Required `DESIGN.md`

Buat file `DESIGN.md` pada root repository. Isinya harus menyatakan arah visual KalkulatorSeller, bukan mengulang seluruh anti-slop rules.

Isi minimum:

```md
# KalkulatorSeller Design Direction

## Product character
A practical, quiet, trustworthy marketplace seller calculator.
The interface is a work tool, not a promotional SaaS landing page.

## Visual principles
- Functional before decorative.
- Compact but readable.
- Clear hierarchy for input, result, and fee explanation.
- White canvas, restrained surfaces, thin borders.
- Use the approved PRD color tokens only.
- Avoid gradients, glows, glassmorphism, ornamental bento grids,
  oversized hero sections, and decorative charting.
- Do not use stock imagery on calculator screens.

## Typography
- Use the operating system's default sans-serif stack.
- Do not load remote fonts.
- Respect browser/user font preferences.
- Use tabular numerals for money and percentages.

## Layout
- Desktop: calculator input and result in a balanced two-column layout.
- Mobile: one column, with result kept close to primary inputs.
- Keep content within the approved max-width.
- No horizontal overflow at 320 CSS px.

## Interaction
- Live local calculation.
- Persistent labels.
- Clear validation and source status.
- Keyboard-accessible controls.
- No decorative animation.
- Respect reduced motion.

## Performance
- Astro SSG + Vanilla JS.
- No unnecessary UI framework runtime.
- No third-party widget in the calculator.
- No external font requests.
- Measure production bundle and Lighthouse.

## Product-specific constraints
- Never fabricate marketplace tariffs or source links.
- Never label estimates as official.
- Never hide missing inputs behind a zero value.
- Do not display final net profit if required cost inputs are unknown.
- Follow the PRD for formulas, rounding, reverse pricing, and storage.
```

## 15.6 Anti-slop working mode

Untuk setiap pekerjaan UI:

1. Agent membaca PRD, dokumen UI/UX, `DESIGN.md`, dan aturan anti-slop.
2. Agent memeriksa implementasi yang sudah ada sebelum mengubah file.
3. Agent mengidentifikasi tujuan halaman dan tugas pengguna.
4. Agent membuat perubahan minimum yang menyelesaikan kebutuhan.
5. Agent memeriksa visual pada mobile dan desktop.
6. Agent menjalankan accessibility checks.
7. Agent menjalankan test fungsional.
8. Agent menjalankan Delivery Gate anti-slop.
9. Agent melaporkan PASS/FAIL beserta bukti.

Anti-slop tidak boleh dijadikan alasan untuk mengubah brand token atau mengabaikan PRD.

## 15.7 Delivery Gate

Sebelum UI dianggap selesai, Agent AI wajib melaporkan:

| Area | PASS jika | FAIL jika |
|---|---|---|
| Visual direction | Sesuai `DESIGN.md` dan kebutuhan halaman | Terlihat seperti template generik tanpa alasan |
| UI quality | Hierarki dan komponen konsisten | Dekorasi mengganggu tugas utama |
| Accessibility | Keyboard, focus, label, kontras, state diuji | Kontrol tidak dapat diakses |
| Mobile | Tidak overflow dan alur tetap jelas | Layout rusak/tertutup |
| Performance | Tidak ada dependency/request tak perlu | Font/widget/script menambah beban tanpa alasan |
| Product accuracy | Label, tarif, dan status sesuai PRD | Klaim atau angka dikarang |
| Functional | Semua aksi yang terlihat bekerja | Tombol/tautan palsu atau inert |

Agent harus menyertakan:
- File yang berubah.
- Screenshot/preview desktop dan mobile jika tersedia.
- Hasil test yang dijalankan.
- Hasil Lighthouse.
- Hasil keyboard/accessibility check.
- Delivery Gate PASS/FAIL.
- Known issues yang belum selesai.

---

# 16. Security and privacy in UI

- Jangan memasukkan data pengguna melalui `innerHTML`.
- Gunakan text nodes atau API DOM yang aman.
- Jangan menampilkan data SKU pada URL.
- Jangan mengirim nilai input atau nama SKU ke analytics.
- Jangan menyatakan data sepenuhnya lokal jika ada data yang dikirim ke layanan pihak ketiga.
- Jelaskan penyimpanan localStorage.
- Restore JSON harus divalidasi.
- Error tidak boleh membocorkan stack trace atau informasi internal.
- Link eksternal sumber tarif harus aman dan jelas.
- Gunakan rel yang sesuai untuk external links jika dibuka pada tab baru.

---

# 17. SEO and content UI

Mengikuti PRD:
- Satu H1 utama per halaman.
- Title dan meta description unik.
- Breadcrumb bila membantu.
- Heading semantik.
- Internal link yang kontekstual.
- FAQ berdasarkan pertanyaan nyata.
- Structured data hanya sesuai konten aktual.
- Tidak menampilkan fake review atau rating.
- Tidak mengulang keyword secara tidak natural.
- Kalkulator tetap menjadi fokus utama halaman.

SEO tidak boleh membuat halaman kalkulator dipenuhi paragraf yang mengganggu penggunaan.

---

# 18. QA checklist

## 18.1 Visual QA

- [ ] Tampilan mengikuti token PRD.
- [ ] System font digunakan; tidak ada request font eksternal.
- [ ] Tidak ada gradient/glow/dekorasi tanpa tujuan.
- [ ] Heading dan body hierarchy jelas.
- [ ] Spacing konsisten.
- [ ] Input dan hasil terlihat sebagai fokus utama.
- [ ] Angka uang mudah dipindai.
- [ ] Tidak ada teks terpotong.
- [ ] Tidak ada elemen dekoratif yang menggeser kalkulator ke bawah.

## 18.2 Functional UX QA

- [ ] Platform selector bekerja.
- [ ] Mode selector bekerja.
- [ ] Input uang menerima paste.
- [ ] Caret tidak melompat saat edit angka.
- [ ] Empty value berbeda dari zero.
- [ ] Validasi muncul pada field yang benar.
- [ ] Hasil update otomatis.
- [ ] Breakdown sama dengan total kalkulasi.
- [ ] Status tarif jelas.
- [ ] Override dan reset bekerja.
- [ ] Saved SKU bekerja.
- [ ] CSV export aman.
- [ ] JSON restore memvalidasi data.
- [ ] Semua tombol dan tautan bekerja.

## 18.3 Responsive QA

- [ ] 320 px.
- [ ] 360 px.
- [ ] 390 px.
- [ ] 430 px.
- [ ] 768 px.
- [ ] 1024 px.
- [ ] 1280 px.
- [ ] 1440 px.
- [ ] Zoom 200%.
- [ ] Virtual keyboard tidak menutupi field.
- [ ] Sticky bar tidak menutupi konten.
- [ ] Tabel memiliki strategi mobile.

## 18.4 Accessibility QA

- [ ] Keyboard-only navigation.
- [ ] Focus indicator.
- [ ] Label input.
- [ ] Error association.
- [ ] Contrast.
- [ ] Screen reader labels.
- [ ] Live region tidak terlalu cerewet.
- [ ] Dialog focus management.
- [ ] Reduced motion.
- [ ] Semantic headings and landmarks.

## 18.5 Performance QA

- [ ] Production build diuji.
- [ ] Tidak ada external font request.
- [ ] Tidak ada UI framework runtime tambahan.
- [ ] Tidak ada dependency tidak perlu.
- [ ] JS/CSS bundle size dilaporkan.
- [ ] LCP, INP, CLS diperiksa.
- [ ] Lighthouse mobile dan desktop dilaporkan.
- [ ] Tidak ada layout shift ketika hasil muncul.
- [ ] Tidak ada third-party script tanpa persetujuan.

---

# 19. Acceptance criteria UI/UX

| ID | Kriteria | Cara verifikasi |
|---|---|---|
| UX-01 | Pengguna memahami fungsi utama dari halaman pertama | Usability review |
| UX-02 | Kalkulator dapat digunakan tanpa login | Functional test |
| UX-03 | Label input selalu terlihat | Visual/accessibility test |
| UX-04 | Hasil kalkulasi dekat dengan form | Desktop/mobile review |
| UX-05 | Status tarif dan sumber dapat ditemukan | Functional test |
| UX-06 | Tarif asumsi tidak disajikan sebagai tarif resmi | Content review |
| UX-07 | Layout berfungsi pada 320 CSS px | Responsive test |
| UX-08 | Semua aksi dapat dilakukan dengan keyboard | Keyboard test |
| UX-09 | Font eksternal tidak dimuat | Network inspection |
| UX-10 | UI tidak membutuhkan framework runtime tambahan | Bundle inspection |
| UX-11 | Tidak ada elemen dekoratif yang mengganggu tugas | Anti-slop review |
| UX-12 | Saved SKU menjelaskan bahwa data disimpan lokal | Content review |
| UX-13 | Error menjelaskan cara memperbaiki | Functional test |
| UX-14 | Hasil tidak mengklaim profit bersih saat biaya wajib belum diketahui | Business rule test |
| UX-15 | Delivery Gate anti-slop dilaporkan | Agent report |

---

# 20. Open decisions for Product Owner

Keputusan berikut harus diselesaikan sebelum implementasi final pada bagian terkait.

| ID | Pertanyaan | Dampak UI |
|---|---|---|
| UI-OD-01 | Apakah homepage langsung menampilkan kalkulator komparasi atau platform selector terlebih dahulu? | Struktur homepage |
| UI-OD-02 | Apakah hasil komparasi tiga marketplace ditampilkan berdampingan di desktop? | Layout result |
| UI-OD-03 | Apakah hasil mobile memakai sticky bottom summary? | Mobile layout |
| UI-OD-04 | Apakah dark mode masuk MVP? PRD saat ini menandainya COULD. | Theme implementation |
| UI-OD-05 | Apakah stacked bar benar-benar membantu pengguna atau cukup breakdown tabel? | Visualisasi |
| UI-OD-06 | Apakah Saved SKU memiliki halaman sendiri atau panel/modal? | Navigation |
| UI-OD-07 | Apakah pengguna boleh mengubah seluruh fee preset atau hanya fee tertentu? | Fee controls |
| UI-OD-08 | Definisi final margin dan ROI apa yang disetujui? | Result labels |
| UI-OD-09 | Komponen biaya apa yang wajib diisi sebelum profit bersih dapat ditampilkan? | Form and result state |
| UI-OD-10 | Apakah ada analytics? Jika ya, provider dan data event apa yang disetujui? | Privacy/performance |

Agent AI boleh membuat prototype untuk mengevaluasi keputusan UI, tetapi tidak boleh menganggap prototype sebagai keputusan final PO.

---

# 21. Implementation sequence

Kerjakan secara bertahap. Jangan membangun seluruh halaman sekaligus tanpa validasi.

### Phase 0 — Repository and design setup
- Audit repository.
- Baca PRD dan dokumen ini.
- Instal anti-slop pada project/agent.
- Buat atau perbarui `DESIGN.md`.
- Periksa existing rules agar tidak terjadi duplikasi.
- Konfirmasi open decisions yang menjadi blocker.

### Phase 1 — Foundation
- Base layout Astro.
- Header dan footer.
- Design tokens.
- System font.
- Button, input, select, status, divider.
- Responsive container.
- Accessibility baseline.

### Phase 2 — Single platform calculator
- Bangun satu halaman platform sebagai pola utama.
- Hubungkan form dengan calculation engine.
- Implementasikan result summary.
- Implementasikan breakdown dan status tarif.
- Uji semua input states.

### Phase 3 — Platform variations
- Tambahkan variasi Shopee, TikTok Shop, Tokopedia berdasarkan konfigurasi.
- Hindari copy-paste logic.
- Tampilkan field sesuai rule platform.

### Phase 4 — Comparison
- Implementasikan homepage komparasi.
- Pastikan input setara dan status setiap platform terlihat.
- Tampilkan unavailable state dengan jelas.

### Phase 5 — Saved SKU and export
- Saved SKU.
- CSV export.
- JSON backup/restore.
- Empty, error, confirmation, and success states.

### Phase 6 — Content and legal pages
- Tarif.
- Changelog.
- Panduan.
- Privacy policy.
- Terms.
- 404.

### Phase 7 — Quality and release
- Functional tests.
- Responsive tests.
- Accessibility tests.
- Performance tests.
- Security review.
- Anti-slop Delivery Gate.
- Human review untuk rumus, tarif, dan hasil kritis.

---

# 22. Master instruction for Agent AI

Gunakan instruksi berikut saat mulai mengerjakan frontend KalkulatorSeller.

```text
You are implementing the KalkulatorSeller frontend.

Before coding:
1. Inspect the existing repository and report its current structure.
2. Read the PRD and UI/UX Design Specification completely.
3. Read DESIGN.md.
4. Load the installed anti-slop core and the relevant UI, human,
   and layoutmobile skills.
5. Identify unresolved Product Owner decisions that block implementation.
6. Do not overwrite existing project conventions without explaining why.

Product direction:
- Build a practical, clean, quiet, trustworthy calculator interface.
- The calculator is a work tool, not a promotional SaaS landing page.
- Prioritize input clarity, result readability, fee transparency,
  mobile usability, and speed.
- Use the approved PRD color tokens.
- Use the operating system's default font stack.
- Do not load Google Fonts, remote fonts, or custom font files.
- Respect user/browser font preferences.
- Avoid gradients, glows, glassmorphism, decorative bento grids,
  excessive cards, giant hero sections, stock imagery, fake statistics,
  fake testimonials, and decorative charts.
- Do not use emojis as primary UI icons.
- Do not add unnecessary dependencies or a frontend framework runtime.

Technical direction:
- Astro SSG.
- Vanilla JavaScript ES Modules.
- Tailwind CSS v4.
- Cloudflare Pages.
- Keep calculation logic separate from DOM and UI state.
- Use semantic HTML.
- Keep the app usable without login.
- Keep user SKU data local according to the PRD.
- Do not send user inputs or SKU names to analytics.

Product correctness:
- PRD is the source of truth for formulas and functional requirements.
- Never invent marketplace tariffs, official sources, or effective dates.
- Never label assumptions as verified tariffs.
- Never show a final net profit if required cost components are unknown.
- Follow the PRD for rounding, fee bases, caps, reverse pricing,
  storage, CSV safety, and backup validation.
- If a decision is missing, record a blocker instead of guessing.

Workflow:
1. Implement one coherent phase at a time.
2. Keep changes small and reviewable.
3. Run tests after each phase.
4. Test mobile and desktop.
5. Test keyboard navigation and accessibility.
6. Measure production bundle and Lighthouse.
7. Run the anti-slop Delivery Gate before marking UI work complete.
8. Report exact files changed, tests executed, measured results,
   PASS/FAIL status, and known issues.

Do not claim that something is complete unless it has been implemented
and verified in the repository.
```

---

# 23. Definition of Done

UI/UX implementation dapat dinyatakan selesai jika:

- [ ] Seluruh halaman MVP memiliki struktur dan navigasi yang benar.
- [ ] Kalkulator mudah ditemukan dan digunakan.
- [ ] Input, hasil, dan breakdown konsisten dengan PRD.
- [ ] Tidak ada klaim tarif yang tidak didukung sumber.
- [ ] System font digunakan dan tidak ada external font request.
- [ ] Tidak ada dependency visual yang tidak diperlukan.
- [ ] Tampilan mobile, tablet, dan desktop diuji.
- [ ] Tidak ada horizontal overflow pada 320 CSS px.
- [ ] Keyboard dan screen reader dasar diuji.
- [ ] Focus, validation, empty, error, loading, dan success states ditangani.
- [ ] Saved SKU dan export/restore memiliki feedback yang jelas.
- [ ] Target performance diuji pada production build.
- [ ] Anti-slop Delivery Gate diselesaikan dan dilaporkan.
- [ ] Semua blocker dan keputusan PO dicatat.
- [ ] Human reviewer menyetujui bagian kritis.

**Catatan akhir:** Dokumen ini adalah spesifikasi implementasi, bukan bukti bahwa UI telah dibangun atau bahwa anti-slop telah terpasang pada repository. Instalasi anti-slop harus dijalankan pada root project oleh Agent AI/developer yang memiliki akses ke repository dan environment pengembangan.
