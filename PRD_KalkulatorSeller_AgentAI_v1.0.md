# Product Requirements Document (PRD)

# KalkulatorSeller

> PRD v1.0 --- diturunkan dari Blueprint KalkulatorSeller V3.0 Tanggal:
> 21 November 2026\
> Status: Draft implementasi untuk Agent AI; memerlukan persetujuan
> Product Owner

------------------------------------------------------------------------

PRODUCT REQUIREMENTS DOCUMENT

KalkulatorSeller

Jualan ramai belum tentu untung. Hitung modal, potongan marketplace, dan
profit sebelum pasang harga.

  -----------------------------------------------------------------------
  Dokumen                             Nilai
  ----------------------------------- -----------------------------------
  Versi                               PRD v1.0 --- diturunkan dari
                                      Blueprint V3.0

  Tanggal                             21 November 2026

  Status                              Draft implementasi untuk Agent AI;
                                      perlu persetujuan Product Owner

  Platform MVP                        Shopee, TikTok Shop, Tokopedia

  Arsitektur                          Astro SSG + Vanilla JavaScript ES
                                      Modules + Tailwind CSS v4

  Hosting                             Cloudflare Pages

  Bahasa produk                       Bahasa Indonesia
  -----------------------------------------------------------------------

Dokumen ini adalah instruksi produk dan engineering. Agent AI harus
menggunakannya sebagai sumber keputusan implementasi, tetapi tidak boleh
mengarang tarif marketplace, sumber kebijakan, atau hasil pengujian.

# Cara menggunakan PRD ini

PRD ini dibuat agar Agent AI dapat memahami tujuan produk, batasan,
aturan bisnis, perilaku UI, arsitektur, data, pengujian, dan kriteria
selesai tanpa menebak keputusan penting.

-   Product Owner (PO) bertanggung jawab menyetujui keputusan bisnis,
    tarif, istilah profit, dan prioritas.
-   Agent AI bertanggung jawab memeriksa repository, mengimplementasikan
    requirement secara bertahap, menjalankan test, dan melaporkan bukti.
-   Developer/reviewer manusia bertanggung jawab meninjau perubahan
    kritis, terutama rumus, tarif, security, dan deployment.
-   Jika informasi tidak tersedia atau saling bertentangan, Agent AI
    wajib membuat daftar BLOCKER/OPEN QUESTION dan berhenti pada bagian
    terkait. Jangan mengisi kekosongan dengan asumsi. \## Aturan sumber
    kebenaran

  -----------------------------------------------------------------------
  Jenis informasi         Sumber kebenaran        Aturan Agent AI
  ----------------------- ----------------------- -----------------------
  Tujuan, fitur, UX, dan  PRD ini                 Ikuti requirement dan
  scope                                           acceptance criteria.

  Identitas visual        Blueprint               Jangan mengganti brand
                          KalkulatorSeller V3.0   tanpa persetujuan.
                          dan token dalam PRD     

  Tarif marketplace       Sumber resmi            Jangan gunakan angka
                          marketplace yang        contoh/berita sebagai
                          spesifik dan dapat      tarif aktif.
                          diakses                 

  Rumus dan definisi      Bab Calculation &       Implementasikan pure
  metrik                  Business Rules PRD      function dan test.

  Status implementasi     Repository dan hasil    Jangan mengklaim fitur
                          test aktual             selesai tanpa bukti.
  -----------------------------------------------------------------------

## Label keputusan

-   MUST: wajib ada pada MVP dan menjadi syarat acceptance.
-   SHOULD: sangat dianjurkan; jika ditunda, catat alasan dan dampaknya.
-   COULD: dapat masuk fase berikutnya.
-   BLOCKED: tidak boleh diimplementasikan sebelum ada keputusan atau
    sumber valid. \# 1. Ringkasan produk

KalkulatorSeller adalah web utility untuk membantu seller Indonesia
mensimulasikan harga jual, biaya marketplace, dan keuntungan produk
sebelum memasang atau mengubah harga katalog. Aplikasi harus dapat
digunakan tanpa login dan tanpa mengirim data SKU atau simulasi ke
backend.

## 1.1 Masalah pengguna

-   Seller sering melihat omzet atau harga jual, tetapi tidak memahami
    total potongan marketplace dan biaya lain yang mengurangi
    keuntungan.
-   Biaya dapat memiliki basis berbeda, misalnya harga produk awal atau
    harga setelah diskon seller.
-   Sebagian biaya dikenakan per item, sebagian per pesanan, dan
    sebagian memiliki batas maksimal (cap).
-   Seller multi-channel membutuhkan cara membandingkan hasil simulasi
    antar marketplace dengan input yang konsisten. \## 1.2 Proposisi
    nilai

Hitung perkiraan profit dan harga jual yang dibutuhkan secara
transparan, dengan rincian biaya, sumber tarif, tanggal verifikasi, dan
asumsi yang dapat diedit.

## 1.3 Tujuan MVP

  -----------------------------------------------------------------------
  ID                      Tujuan                  Indikator keberhasilan
  ----------------------- ----------------------- -----------------------
  OBJ-01                  Pengguna dapat          Forward calculation
                          menghitung profit dari  menghasilkan rincian
                          harga jual dan HPP.     biaya dan profit tanpa
                                                  error.

  OBJ-02                  Pengguna dapat mencari  Reverse calculation
                          harga jual untuk target mengembalikan harga
                          profit.                 yang lolos verifikasi
                                                  forward engine.

  OBJ-03                  Pengguna dapat          Ketiga hasil memakai
                          membandingkan tiga      input bisnis yang
                          marketplace.            setara dan menampilkan
                                                  perbedaan konfigurasi.

  OBJ-04                  Pengguna dapat          Saved SKU, CSV, dan
                          menyimpan dan membawa   backup/restore JSON
                          data SKU.               berjalan.

  OBJ-05                  Pengguna dapat menilai  Tarif menampilkan
                          keandalan tarif.        status, tanggal
                                                  berlaku, tanggal
                                                  verifikasi, dan sumber.
  -----------------------------------------------------------------------

## 1.4 Bukan tujuan MVP

-   Tidak memproses transaksi marketplace atau mengakses Seller Center
    pengguna.
-   Tidak melakukan sinkronisasi otomatis dengan akun seller.
-   Tidak memberikan nasihat pajak, akuntansi, atau keuangan
    profesional.
-   Tidak menjamin saldo pencairan marketplace identik dengan simulasi.
-   Tidak menyediakan login, akun cloud, sinkronisasi lintas perangkat,
    atau backend database.
-   ShopeeFood ditunda sampai tiga platform MVP stabil. \# 2. Pengguna,
    persona, dan kebutuhan

  -----------------------------------------------------------------------
  Persona                 Kebutuhan utama         Skenario penggunaan
  ----------------------- ----------------------- -----------------------
  Seller pemula /         Memahami potongan dan   Masukkan HPP, harga
  Non-Star                harga minimum agar      jual, kategori, status
                          tidak rugi.             toko; baca rincian.

  Seller skala menengah   Menghitung banyak SKU   Simpan beberapa SKU,
                          dan membandingkan       ubah asumsi, ekspor
                          channel.                CSV.

  Brand owner / Mall /    Memastikan fee cap,     Simulasikan produk
  high-ticket             diskon, dan multi-qty   bernilai tinggi dan
                          dihitung benar.         pesanan dengan beberapa
                                                  qty.
  -----------------------------------------------------------------------

## 2.1 Prinsip pengalaman

-   Zero-friction: kalkulator terlihat sedini mungkin; pengguna tidak
    diwajibkan membaca artikel atau mendaftar.
-   Transparent by default: biaya, basis, unit, status resmi/asumsi, dan
    sumber dapat ditelusuri.
-   No false certainty: gunakan kata estimasi jika tarif atau biaya
    bergantung kondisi.
-   Mobile-first: input, hasil, rincian, dan aksi tetap mudah digunakan
    pada layar kecil.
-   User control: tarif preset dapat di-override sementara dan dapat
    di-reset. \# 3. Ruang lingkup dan prioritas

  -----------------------------------------------------------------------
  Fitur                   Prioritas               MVP
  ----------------------- ----------------------- -----------------------
  Forward pricing         MUST                    Ya

  Reverse pricing         MUST                    Ya

  Shopee, TikTok Shop,    MUST                    Ya
  Tokopedia                                       

  Komparasi tiga platform MUST                    Ya

  Kategori dan status     MUST                    Ya; berdasarkan
  toko                                            konfigurasi
                                                  terverifikasi

  Fee cap dan unit        MUST                    Ya
  per_item/per_order                              

  Editable fee override   MUST                    Ya
  dan reset                                       

  Saved SKU localStorage  MUST                    Ya

  Export CSV dan          MUST                    Ya
  backup/restore JSON                             

  Halaman tarif dan       MUST                    Ya
  changelog                                       

  Panduan, privacy        MUST                    Ya
  policy, terms,                                  
  disclaimer                                      

  Affiliate               SHOULD                  Setelah kalkulator
                                                  stabil

  Produk digital          COULD                   Setelah kebutuhan
                                                  tervalidasi

  AdSense                 COULD                   Setelah traffic organik
                                                  konsisten

  ShopeeFood              COULD                   Fase ekspansi

  Dark mode               COULD                   Token disiapkan;
                                                  implementasi dapat
                                                  ditunda
  -----------------------------------------------------------------------

# 4. User journey dan informasi arsitektur

## 4.1 User journey utama

1.  Pengguna tiba dari hasil pencarian ke homepage atau halaman
    platform.
2.  Pengguna melihat status dan tanggal verifikasi tarif.
3.  Pengguna memilih Hitung Profit atau Cari Harga Jual.
4.  Pengguna mengisi HPP, harga jual/target profit, diskon, qty, dan
    biaya tambahan yang relevan.
5.  Hasil diperbarui secara instan dan rincian dapat dibuka.
6.  Pengguna mengubah fee jika kondisi tokonya berbeda, atau
    mengembalikan preset.
7.  Pengguna menyimpan SKU, membandingkan platform, atau mengekspor
    hasil. \## 4.2 Sitemap MVP

  -----------------------------------------------------------------------
  Path                    Tujuan                  Konten utama
  ----------------------- ----------------------- -----------------------
  /                       Komparasi tiga          Ringkasan tool, form
                          marketplace             komparasi, tautan
                                                  platform, pembaruan
                                                  tarif.

  /shopee                 Kalkulator Shopee       Form Shopee,
                                                  kategori/status,
                                                  rincian fee, FAQ dan
                                                  contoh.

  /tiktok-shop            Kalkulator TikTok Shop  Form TikTok Shop,
                                                  kategori/status, fee
                                                  dinamis/cap, contoh.

  /tokopedia              Kalkulator Tokopedia    Form Tokopedia, fee
                                                  khusus Tokopedia,
                                                  contoh.

  /tarif                  Pusat transparansi      Tabel fee, sumber,
                          tarif                   tanggal
                                                  efektif/verifikasi,
                                                  changelog.

  /panduan                Edukasi seller          HPP, margin, ROAS,
                                                  bundling, diskon,
                                                  biaya.

  /privacy-policy         Privasi                 Local storage,
                                                  analytics, affiliate,
                                                  third-party.

  /terms                  Ketentuan               Batas penggunaan dan
                                                  disclaimer.

  /404                    Halaman tidak ditemukan Navigasi kembali dan
                                                  pencarian halaman.
  -----------------------------------------------------------------------

# 5. Definisi domain dan kamus metrik

Bagian ini wajib disepakati sebelum calculation engine dibuat. Jangan
menampilkan istilah profit bersih jika komponen biaya yang relevan belum
dimasukkan atau belum diketahui.

  -----------------------------------------------------------------------
  Istilah                 Definisi PRD            Formula konseptual
  ----------------------- ----------------------- -----------------------
  Harga jual awal (P)     Harga katalog sebelum   Input pengguna.
                          diskon seller.          

  Diskon seller (D)       Diskon nominal yang     Input pengguna; 0 ≤ D ≤
                          ditanggung seller untuk P.
                          unit/produk.            

  Harga efektif (E)       Harga produk setelah    E = max(0, P − D).
                          diskon seller.          

  HPP per unit (C)        Biaya perolehan produk  Input pengguna.
                          per unit.               

  Qty (Q)                 Jumlah unit dalam satu  Integer positif;
                          pesanan.                default 1.

  Pendapatan produk       Nilai efektif produk    E × Q.
                          untuk seluruh qty.      

  Profit kotor            Pendapatan produk       (E − C) × Q.
                          dikurangi HPP produk.   

  Profit setelah          Profit kotor dikurangi  Profit kotor − total
  marketplace             seluruh fee marketplace fee marketplace.
                          yang berlaku.           

  Profit setelah          Profit setelah          Profit marketplace −
  operasional             marketplace dikurangi   biaya operasional.
                          packing dan biaya       
                          operasional.            

  Profit bersih akhir     Profit setelah          Profit operasional −
                          operasional dikurangi   biaya iklan − komisi
                          iklan dan               affiliate.
                          affiliate/kreator.      

  Margin                  Profit pada level yang  Nilai profit /
                          dipilih dibagi basis    pendapatan efektif;
                          pendapatan yang         jika pendapatan 0,
                          ditetapkan.             null.

  ROI                     Profit pada level yang  Definisi denominator
                          dipilih dibanding total wajib dikunci PO;
                          modal yang ditetapkan.  default rekomendasi:
                                                  HPP total + biaya
                                                  operasional langsung.
  -----------------------------------------------------------------------

## 5.1 Keputusan yang wajib dikunci PO

-   Apakah margin utama memakai Profit Bersih Akhir / Pendapatan
    Efektif? Rekomendasi: ya, dan label harus menyebut margin bersih.

-   Apakah ROI dihitung terhadap total HPP atau total modal termasuk
    packing/biaya langsung? Rekomendasi: gunakan total biaya modal
    langsung yang terdefinisi dan tampilkan denominator.

-   Jika biaya iklan tidak diketahui, tampilkan Profit Setelah
    Operasional sebagai angka yang tersedia dan tandai Profit Bersih
    Akhir sebagai belum memasukkan iklan; jangan menyamarkan sebagai
    final.

-   Tentukan apakah komisi affiliate dihitung dari harga efektif, nilai
    setelah voucher, atau basis lain sesuai sumber/program. Jangan
    mengasumsikan.

-   Untuk pesanan multi-qty, tampilkan total pesanan dan nilai rata-rata
    per unit secara terpisah. \## 5.2 Konvensi tanda dan nilai kosong

-   Diskon, HPP, fee, dan biaya tidak boleh negatif kecuali suatu
    komponen secara eksplisit merepresentasikan subsidi/pengembalian.

-   Nilai input kosong berbeda dari angka nol. Field kosong tidak boleh
    otomatis diperlakukan sebagai nol tanpa UX yang jelas.

-   Jika denominator nol, rasio dikembalikan null dan UI menampilkan
    '---', bukan NaN atau Infinity.

-   Semua nilai uang internal disimpan sebagai integer Rupiah;
    persentase disimpan sebagai decimal rate dengan validasi rentang.
    \# 6. Functional requirements

  -----------------------------------------------------------------------------------
  ID             Fitur            Prioritas      Deskripsi       Acceptance summary
  -------------- ---------------- -------------- --------------- --------------------
  FR-01          Mode Forward     MUST           Pengguna        Hasil dan rincian
                 Pricing                         memasukkan      diperbarui saat
                                                 harga jual,     input valid berubah;
                                                 HPP, diskon,    tidak perlu tombol
                                                 qty, dan biaya  submit.
                                                 opsional; hasil 
                                                 dihitung        
                                                 otomatis.       

  FR-02          Mode Reverse     MUST           Pengguna        Engine mengembalikan
                 Pricing                         memasukkan HPP, harga jual minimum
                                                 target profit   yang lolos
                                                 bersih per unit verifikasi forward
                                                 atau per order  engine.
                                                 (pilihan harus  
                                                 eksplisit),     
                                                 qty, dan fee.   

  FR-03          Platform dan     MUST           Pengguna        Hanya opsi yang
                 kategori                        memilih         memiliki aturan
                                                 marketplace,    tarif valid yang
                                                 tipe toko,      ditampilkan.
                                                 kategori, dan   
                                                 kondisi khusus  
                                                 yang tersedia   
                                                 di konfigurasi. 

  FR-04          Fee breakdown    MUST           Setiap fee      Jumlah rincian sama
                                                 menampilkan     dengan total fee
                                                 nama,           engine.
                                                 rate/nominal,   
                                                 basis, unit,    
                                                 cap, dan status 
                                                 asumsi/resmi.   

  FR-05          Multi-quantity   MUST           Pengguna        Fee per_item
                                                 memasukkan qty  dikalikan qty; fee
                                                 per pesanan.    per_order dikenakan
                                                                 satu kali per order
                                                                 sesuai rule.

  FR-06          Fee override     MUST           Pengguna dapat  Override memengaruhi
                                                 mengubah        hasil saat itu,
                                                 rate/amount     diberi label
                                                 sementara.      'Penyesuaian Anda',
                                                                 dan reset
                                                                 mengembalikan
                                                                 preset.

  FR-07          Perbandingan     MUST           Satu set input  Hasil menggunakan
                                                 bisnis dipakai  basis bisnis sama;
                                                 untuk           konfigurasi platform
                                                 membandingkan   yang tidak tersedia
                                                 tiga platform.  ditandai, bukan
                                                                 ditebak.

  FR-08          Saved SKU        MUST           Pengguna        Data dapat dilihat,
                                                 menyimpan       diperbarui, dan
                                                 simulasi ke     dihapus; data tidak
                                                 localStorage.   dikirim ke server.

  FR-09          CSV export       MUST           Pengguna        CSV valid UTF-8 BOM,
                                                 mengekspor      kolom konsisten,
                                                 daftar SKU.     aman dari formula
                                                                 injection.

  FR-10          JSON             MUST           Pengguna        Restore divalidasi
                 backup/restore                  mengunduh dan   schema, versi,
                                                 memulihkan data ukuran, dan tipe
                                                 SKU.            data sebelum
                                                                 mengganti/menambah
                                                                 data.

  FR-11          Tariff           MUST           Halaman /tarif  Data halaman dibaca
                 transparency                    menampilkan     dari satu sumber
                                                 fee, sumber,    konfigurasi yang
                                                 status, tanggal sama dengan
                                                 efektif,        kalkulator.
                                                 verifikasi,     
                                                 changelog.      

  FR-12          Disclaimer       MUST           Disclaimer      Tidak menyatakan
                                                 estimasi tampil hasil sebagai
                                                 dekat hasil dan tagihan/potongan
                                                 halaman terms.  aktual yang dijamin.

  FR-13          Input formatting MUST           Input Rupiah    State angka murni;
                                                 mendukung       cursor tidak
                                                 ketik, edit     meloncat secara
                                                 tengah, paste,  mengganggu.
                                                 kosong, dan     
                                                 nol.            

  FR-14          Responsive &     MUST           Semua fitur     Tidak ada sticky bar
                 accessibility                   utama dapat     menutupi input;
                                                 dipakai di      label, focus,
                                                 mobile dan      status, dan live
                                                 keyboard.       region tersedia.

  FR-15          Analytics events SHOULD         Mengukur event  Tidak mengirim nama
                                                 penggunaan      produk, HPP, harga,
                                                 secara minim    atau rincian SKU ke
                                                 data.           analytics.
  -----------------------------------------------------------------------------------

# 7. Aturan biaya dan skema tarif

## 7.1 Prinsip konfigurasi tarif

-   Tarif bukan hardcode di UI atau calculation engine. Semua rule
    dibaca dari konfigurasi terpisah.
-   Tarif resmi dan asumsi simulasi harus dibedakan secara eksplisit.
-   Setiap konfigurasi wajib mempunyai schemaVersion, platform, version,
    effectiveFrom, lastVerified, sourceUrl, status, dan fee rules.
-   Status 'verified' hanya boleh dipakai setelah manusia/PO memeriksa
    sumber yang dirujuk dan memastikan cakupan aturan.
-   Jangan mengisi angka tarif yang tidak didukung sumber. Jika belum
    ada data valid, tandai BLOCKED atau unavailable.
-   Konfigurasi harus mendukung histori/changelog dan tanggal berlaku.
    \## 7.2 Skema fee rule minimum

``` text
{
  "id": "fee_unique_id",
  "name": "Nama biaya",
  "type": "percentage | fixed",
  "rate": 0.0,
  "amount": 0,
  "basis": "original_price | seller_discounted_price | order_subtotal | flat",
  "unit": "per_item | per_order",
  "cap": null,
  "capScope": "per_item | per_order",
  "required": false,
  "isAssumption": false,
  "conditions": [],
  "effectiveFrom": "YYYY-MM-DD",
  "effectiveTo": null,
  "sourceUrl": "URL sumber spesifik",
  "notes": "Catatan cakupan dan pengecualian"
}
```

Field di atas adalah kontrak konseptual. Implementasi boleh menambah
field, tetapi tidak boleh mengubah arti basis/unit/cap tanpa versi
schema baru.

## 7.3 Evaluasi biaya

  -----------------------------------------------------------------------
  Konsep                              Aturan
  ----------------------------------- -----------------------------------
  Basis original_price                Gunakan harga jual awal P.

  Basis seller_discounted_price       Gunakan harga efektif E = max(0, P
                                      − D).

  Basis order_subtotal                Gunakan subtotal order sesuai
                                      definisi platform dan konfigurasi;
                                      tidak boleh disamakan otomatis
                                      dengan E × Q jika ada aturan lain.

  Unit per_item                       Hitung fee per unit, terapkan cap
                                      pada scope yang dinyatakan, lalu
                                      kalikan qty.

  Unit per_order                      Hitung satu kali per pesanan; untuk
                                      tampilan per unit, alokasikan total
                                      fee order / qty.

  Cap                                 Harus memiliki capScope yang
                                      eksplisit. Jangan menebak apakah
                                      cap berlaku per item atau per
                                      order.

  Fixed fee                           Amount harus integer Rupiah; basis
                                      flat atau basis lain yang
                                      didefinisikan.

  Conditions                          Aturan hanya aktif jika semua
                                      kondisi yang relevan terpenuhi.
  -----------------------------------------------------------------------

## 7.4 Tarif yang belum terverifikasi

Dokumen V3.0 memuat contoh angka dan placeholder sumber. Angka tersebut
tidak boleh otomatis menjadi tarif produksi. Sebelum rilis, PO harus
menyetujui matriks tarif per marketplace, kategori, tipe toko, program,
pengecualian, unit, basis, cap, tanggal berlaku, dan URL sumber
spesifik.

## 7.5 Tarif override pengguna

-   Override hanya berlaku pada sesi/simulasi atau tersimpan bersama SKU
    jika pengguna memilih menyimpan konfigurasi.
-   UI harus membedakan tarif preset, tarif override, dan asumsi.
-   Reset mengembalikan nilai dari konfigurasi aktif, bukan nilai yang
    ditulis ulang di komponen.
-   Override tidak boleh mengubah file tarif global atau memengaruhi
    pengguna lain. \# 8. Calculation engine

Engine harus berupa pure JavaScript functions tanpa DOM, window,
localStorage, atau framework. Input dan output harus tervalidasi serta
deterministik.

## 8.1 Kontrak forward engine

``` text
calculateForward({
  platformConfig,
  price,             // integer Rupiah per unit
  sellerDiscount,    // integer Rupiah per unit
  hpp,               // integer Rupiah per unit
  qty,               // positive integer
  operationalCosts,  // explicit cost items + unit
  adsCost,           // explicit fixed amount or validated rate
  affiliateCost,     // explicit amount/rate and calculation basis
  overrides
}) -> {
  ok,
  totals: {
    effectiveRevenue,
    cogs,
    marketplaceFees,
    operationalCosts,
    adsCost,
    affiliateCost,
    grossProfit,
    profitAfterMarketplace,
    profitAfterOperations,
    netProfit
  },
  perUnit: {...},
  ratios: { grossMargin, netMargin, roi },
  feeBreakdown: [...],
  flags: { assumptionsUsed, cappedFees, overriddenFees },
  errors: []
}
```

## 8.2 Aturan kalkulasi

1.  Validasi semua input dan konfigurasi sebelum menghitung.
2.  Hitung harga efektif per unit E = max(0, P − D). Tolak diskon yang
    melebihi harga jual kecuali PO menetapkan perlakuan khusus.
3.  Hitung pendapatan efektif total = E × Q.
4.  Hitung HPP total = HPP per unit × Q.
5.  Evaluasi setiap marketplace fee dengan basis, unit, kondisi, cap,
    dan rounding policy masing-masing.
6.  Hitung profit kotor, profit setelah marketplace, profit setelah
    operasional, dan profit bersih akhir.
7.  Hitung rasio hanya jika denominator valid; jika tidak, hasil null.
8.  Kembalikan rincian dan flags agar UI dapat menjelaskan asumsi, cap
    aktif, serta override. \## 8.3 Rounding policy

PO harus menetapkan kebijakan pembulatan yang merepresentasikan aturan
pembebanan aktual marketplace. Sampai keputusan final tersedia, engine
harus mendukung konfigurasi rounding per fee: nearest, floor, atau ceil,
dan tidak boleh menyembunyikan pilihan default. Semua hasil uang final
berupa integer Rupiah. Test harus membuktikan apakah pembulatan
dilakukan per item, per fee, atau pada total.

## 8.4 Reverse pricing

-   Reverse pricing mencari harga jual minimum yang menghasilkan target
    profit sesuai definisi target (per unit atau per order). UI wajib
    meminta/menjelaskan satuan target.
-   Gunakan fungsi profit forward yang sama agar tidak ada dua
    implementasi rumus berbeda.
-   Periksa validitas input, domain harga, dan monotonicity fungsi
    profit sebelum binary search.
-   Jangan menggunakan threshold 99% sebagai bukti matematis tunggal
    bahwa solusi mustahil. Threshold boleh menjadi guardrail produk yang
    dapat dikonfigurasi, tetapi error message harus menyebut bahwa itu
    batas simulasi/guardrail.
-   Tentukan lower bound yang valid. Jangan mengasumsikan HPP selalu
    merupakan lower bound yang menghasilkan profit di bawah target.
-   Temukan upper bound secara bertahap dengan exponential search dan
    batas maksimum yang eksplisit serta dapat dikonfigurasi.
-   Binary search harus memiliki termination condition dan batas iterasi
    defensif.
-   Setelah pembulatan ke atas (misalnya kelipatan Rp100 jika disetujui
    PO), jalankan forward engine ulang dan pastikan target tercapai.
-   Jika klaimnya harga minimum, uji harga satu rupiah atau satu unit
    rounding step di bawah hasil untuk memastikan target tidak tercapai.
-   Jika fungsi tidak monoton akibat rule tertentu, jangan jalankan
    binary search tanpa strategi yang valid; kembalikan error
    unsupported rule atau gunakan metode pencarian yang disetujui. \##
    8.5 Error code

  -----------------------------------------------------------------------------
  Kode                          Kondisi                 Perilaku UI
  ----------------------------- ----------------------- -----------------------
  ERR_INVALID_INPUT             Nilai negatif, qty      Tampilkan pesan pada
                                tidak valid, format     field terkait.
                                tidak sah.              

  ERR_DISCOUNT_EXCEEDS_PRICE    Diskon melebihi harga   Minta pengguna
                                jual.                   memperbaiki input.

  ERR_INVALID_TARIFF_CONFIG     Rule tarif rusak/tidak  Nonaktifkan kalkulasi
                                lengkap.                platform tersebut dan
                                                        tampilkan status.

  ERR_MISSING_VERIFIED_TARIFF   Tarif yang dibutuhkan   Tampilkan
                                belum terverifikasi.    unavailable/estimasi;
                                                        jangan menyatakan hasil
                                                        resmi.

  ERR_UNSUPPORTED_RULE          Basis, kondisi, atau    Jangan menghitung
                                cap belum didukung      diam-diam; tampilkan
                                engine.                 pesan.

  ERR_NO_FEASIBLE_SOLUTION      Tidak ditemukan solusi  Jelaskan batas
                                dalam domain yang       simulasi.
                                disetujui.              

  ERR_TARGET_NOT_MET            Hasil reverse gagal     Jangan tampilkan harga
                                memenuhi target setelah sebagai rekomendasi.
                                verifikasi.             

  ERR_STORAGE_CORRUPT           Data localStorage tidak Pulihkan aman dan beri
                                valid.                  notifikasi.
  -----------------------------------------------------------------------------

# 9. UI/UX dan design system

## 9.1 Brand tokens

  -----------------------------------------------------------------------
  Token                   Nilai                   Penggunaan
  ----------------------- ----------------------- -----------------------
  Brand primary           #14213D                 Header, result card,
                                                  tabel, tombol sekunder.

  Brand accent            #FCA311                 CTA, tab aktif, angka
                                                  sorotan; teks di
                                                  atasnya hitam.

  Canvas                  #FFFFFF                 Latar utama.

  Surface                 #F8F9FA                 Permukaan sekunder.

  Border                  #E5E5E5                 Border/divider.

  Text primary            #000000                 Teks utama.

  Success                 #047857                 Status profit aman
                                                  dengan teks kontras.

  Danger                  #DC2626                 Status rugi/error;
                                                  jangan mengandalkan
                                                  warna saja.

  Warning                 #FCA311                 Margin tipis; sertakan
                                                  label/ikon.
  -----------------------------------------------------------------------

## 9.2 Layout

-   Desktop: area input sekitar 60%, result card sekitar 40%; sticky
    result tidak boleh mengganggu scroll.
-   Mobile: satu kolom; bottom result bar menghormati
    env(safe-area-inset-bottom), padding bawah halaman, dan perilaku
    virtual keyboard.
-   Hasil ringkas harus mudah ditemukan; breakdown lengkap dapat
    dibuka/ditutup.
-   Tidak boleh ada iklan di antara field input, dalam result card, atau
    menutupi tombol/sticky bar. \## 9.3 Komponen wajib

  -----------------------------------------------------------------------
  Komponen                            Perilaku
  ----------------------------------- -----------------------------------
  Header                              Wordmark, navigasi, status
                                      pembaruan tarif.

  Platform selector                   Shopee, TikTok Shop, Tokopedia;
                                      hanya opsi yang aktif.

  Mode selector                       Hitung Profit / Cari Harga Jual;
                                      pergantian mode mempertahankan
                                      input relevan.

  Input Rupiah                        Label permanen; state integer;
                                      format ribuan; paste; edit tengah;
                                      kosong dan nol.

  Qty input                           Integer positif; default 1; helper
                                      menjelaskan biaya per order.

  Fee controls                        Toggle kondisi, fee breakdown,
                                      override, reset.

  Result card                         Empat level profit, margin/ROI,
                                      status asumsi/cap.

  Stacked bar                         Proporsi pendapatan, HPP, fee,
                                      operasional, profit; aksesibel
                                      dengan ringkasan teks.

  Saved SKU                           List/table, edit, delete, export,
                                      backup, restore.

  Disclaimer                          Terlihat dekat hasil kalkulasi.
  -----------------------------------------------------------------------

## 9.4 Accessibility

-   Gunakan semantic HTML dan label permanen untuk setiap input.
-   Seluruh interaksi dapat dilakukan dengan keyboard.
-   Focus indicator terlihat dan tidak hanya mengandalkan warna.
-   Target sentuh mengikuti minimal 44×44 CSS px sebagai target desain.
-   Status profit/boncos disampaikan dengan ikon dan teks, bukan warna
    saja.
-   Perubahan hasil diumumkan secara wajar menggunakan
    aria-live='polite'; hindari mengumumkan setiap digit saat pengguna
    mengetik terlalu cepat.
-   Kontras warna harus diuji pada teks aktual, ukuran, dan state
    aktual. Jangan mengandalkan rasio yang hanya dihitung untuk satu
    kombinasi.
-   Hormati prefers-reduced-motion dan zoom browser. \# 10. Saved SKU,
    local storage, CSV, dan backup

## 10.1 Model data SKU

``` text
{
  "schemaVersion": 1,
  "updatedAt": "ISO-8601",
  "items": [{
    "id": "uuid",
    "name": "Nama produk",
    "platform": "shopee",
    "categoryId": "category_id",
    "sellerType": "seller_type",
    "inputs": {},
    "overrides": {},
    "tariffVersion": "2026-11",
    "calculationSnapshot": {},
    "createdAt": "ISO-8601",
    "updatedAt": "ISO-8601"
  }]
}
```

-   Validasi struktur data setiap kali membaca localStorage.

-   Sediakan migrasi berdasarkan schemaVersion; data versi tak dikenal
    tidak boleh dipaksakan.

-   Jika korup, lakukan fallback aman, jangan membuat halaman crash, dan
    jelaskan bahwa data lokal mungkin tidak dapat dipulihkan.

-   Sediakan tombol hapus satu item dan hapus semua dengan konfirmasi.

-   Jangan menyimpan data SKU ke analytics atau mengirimkannya ke
    server. \## 10.2 CSV

-   Gunakan UTF-8 BOM untuk kompatibilitas spreadsheet yang ditargetkan.

-   Escape delimiter, quote, newline, dan tanda kutip sesuai aturan CSV.

-   Lakukan mitigasi formula injection untuk nilai yang diawali karakter
    formula atau whitespace/control character yang dapat memicu formula.

-   Uji file ekspor dengan nama produk berbahaya dan karakter Indonesia.
    \## 10.3 JSON backup/restore

-   Backup menyertakan schemaVersion dan exportedAt.

-   Restore memvalidasi ukuran file, tipe, versi, jumlah item, panjang
    string, tipe numerik, dan batas nilai.

-   Tawarkan pilihan replace atau merge; jangan mengganti data lama
    tanpa konfirmasi.

-   Jangan menerima HTML/script sebagai format backup. \# 11. Security,
    privacy, dan legal

-   Jangan gunakan innerHTML untuk data pengguna. Gunakan
    textContent/createElement atau template yang ter-escape.

-   Pasang CSP sesuai origin dan layanan pihak ketiga yang benar-benar
    digunakan.

-   Pasang X-Content-Type-Options: nosniff, Referrer-Policy,
    Permissions-Policy, dan HSTS setelah domain/HTTPS siap.

-   Review seluruh dependency dan minimalkan third-party scripts.

-   Privacy policy menjelaskan localStorage, analytics, affiliate, dan
    pihak ketiga.

-   Terms dan disclaimer menyatakan bahwa hasil merupakan simulasi dan
    pengguna harus memeriksa rincian transaksi di Seller Center.

-   Jangan menyatakan 'data tidak pernah keluar dari perangkat' jika
    analytics atau layanan pihak ketiga menerima data input. Analytics
    hanya boleh menerima event agregat tanpa data bisnis pengguna.

-   Jika suatu layanan pihak ketiga digunakan, dokumentasikan data apa
    yang dikirim, tujuan, dan kontrol pengguna. \# 12. SEO dan konten

-   Setiap halaman memiliki title, meta description, canonical, H1 unik,
    Open Graph, dan internal link.

-   Konten platform harus spesifik terhadap struktur fee dan skenario
    platform; dilarang mengganti nama marketplace pada template identik.

-   Halaman /tarif menjadi sumber transparansi dan menampilkan tanggal
    berlaku, verifikasi, sumber, serta changelog.

-   Halaman /panduan menjawab kebutuhan praktis: HPP, margin, ROAS,
    bundling, diskon, dan simulasi harga.

-   Gunakan WebApplication, Organization, BreadcrumbList, dan Article
    sesuai konten nyata. Jangan menambahkan structured data yang tidak
    sesuai.

-   FAQPage tidak menjamin rich result; implementasikan hanya jika
    konten dan kebijakan mendukung.

-   Buat sitemap XML, robots.txt, 404, gambar WebP/AVIF dengan dimensi
    eksplisit.

-   Jangan membuat klaim tarif 'terbaru' jika sumber belum diverifikasi.
    \# 13. Performance dan observability

  ------------------------------------------------------------------------
  Metrik                  Target                  Cara validasi
  ----------------------- ----------------------- ------------------------
  LCP                     ≤ 2,5 detik             Lighthouse
                                                  mobile/desktop dan field
                                                  data jika tersedia.

  INP                     ≤ 200 ms                Uji interaksi dan field
                                                  data jika tersedia.

  CLS                     ≤ 0,1                   Lighthouse; reserve
                                                  space untuk hasil dan
                                                  slot.

  Lighthouse Performance  ≥ 90                    Build production,
                                                  throttling mobile.

  Accessibility           ≥ 95                    Lighthouse ditambah
                                                  audit keyboard/screen
                                                  reader.

  SEO                     ≥ 95                    Lighthouse dan
                                                  pemeriksaan
                                                  metadata/indexability.

  Best Practices          ≥ 95                    Lighthouse dan security
                                                  review.
  ------------------------------------------------------------------------

-   Jangan menyatakan target tercapai berdasarkan environment
    development saja.
-   Catat build ID, commit, hasil test, dan hasil Lighthouse pada
    laporan release.
-   Analytics event yang diizinkan: page_view, calculation_completed,
    reverse_mode_used, sku_saved, export_clicked, tariff_source_clicked.
    Jangan mengirim nilai input atau nama SKU. \# 14. Acceptance
    criteria dan test plan

Setiap requirement MUST harus memiliki test yang dapat diulang. Test
harus memakai fixture tarif yang jelas statusnya (fixture test tidak
boleh disalahartikan sebagai tarif aktif produksi).

  -----------------------------------------------------------------------
  ID                      Skenario                Kriteria lulus
  ----------------------- ----------------------- -----------------------
  AT-01                   Forward normal          Hasil empat tingkat
                                                  profit sesuai expected
                                                  values numerik.

  AT-02                   Harga jual = HPP        Profit kotor nol; fee
                                                  tetap/marketplace tetap
                                                  tercermin sehingga
                                                  hasil akhir dapat
                                                  negatif.

  AT-03                   Harga jual \< HPP       Profit negatif
                                                  dihitung; tidak ada
                                                  NaN/Infinity.

  AT-04                   Cap belum tercapai      Fee = basis × rate;
                                                  isCapped=false.

  AT-05                   Cap tercapai            Fee sesuai cap pada
                                                  scope yang
                                                  dikonfigurasi; flag
                                                  true.

  AT-06                   Qty multi-item          Fee per_item dikali
                                                  qty; fee per_order
                                                  hanya sekali.

  AT-07                   Diskon seller           Basis discounted price
                                                  menggunakan P−D;
                                                  original price
                                                  menggunakan P.

  AT-08                   HPP nol                 ROI null/---; metrik
                                                  lain tetap valid.

  AT-09                   Reverse target nol      Harga BEP diverifikasi
                                                  forward engine.

  AT-10                   Reverse target tinggi   Search berhenti aman;
                                                  solusi atau error
                                                  domain yang jelas.

  AT-11                   Reverse lower bound     Jika lower bound sudah
                                                  memenuhi target, engine
                                                  tetap menemukan minimum
                                                  yang benar.

  AT-12                   Reverse minimum proof   Harga rekomendasi
                                                  memenuhi target; harga
                                                  satu step di bawah
                                                  tidak memenuhi jika
                                                  klaim minimum.

  AT-13                   Uncapped fee tinggi     Guardrail berlaku
                                                  sebagai kebijakan;
                                                  tidak diklaim sebagai
                                                  bukti matematis tanpa
                                                  analisis fungsi.

  AT-14                   Override                Hasil berubah sesuai
                                                  override; reset kembali
                                                  ke preset.

  AT-15                   Komparasi               Input sama, konfigurasi
                                                  berbeda; pemenang
                                                  sesuai net profit
                                                  dengan penjelasan
                                                  asumsi.

  AT-16                   Input Rupiah            Ketik, paste, hapus di
                                                  tengah, kosong, nol,
                                                  dan cursor behavior
                                                  bekerja.

  AT-17                   CSV formula injection   Nilai formula tidak
                                                  dieksekusi; CSV tetap
                                                  terbaca.

  AT-18                   XSS                     Nama SKU tidak
                                                  dieksekusi sebagai
                                                  HTML/script.

  AT-19                   Storage corrupt         Aplikasi pulih aman
                                                  dengan notifikasi.

  AT-20                   Backup restore          File valid dipulihkan;
                                                  file invalid ditolak
                                                  tanpa merusak data.

  AT-21                   Responsive              Sticky bar tidak
                                                  menutupi input atau CTA
                                                  pada viewport target.

  AT-22                   Accessibility           Keyboard, label, focus,
                                                  live region, kontras,
                                                  zoom diuji.

  AT-23                   Tariff provenance       Tarif produksi memiliki
                                                  URL sumber spesifik,
                                                  effective date,
                                                  verified date, status.

  AT-24                   Unknown rule            Engine menolak rule
                                                  yang tidak didukung,
                                                  bukan mengabaikannya.
  -----------------------------------------------------------------------

## 14.1 Test layers

-   Unit: pure functions fee evaluator, forward engine, reverse engine,
    rounding, validators.
-   Integration: config → engine → result model; storage → UI; export
    serializer.
-   E2E: user journey per marketplace, compare, save, export, restore,
    mobile layout.
-   Security: XSS payload, CSV injection payload, malformed JSON,
    invalid restore.
-   Manual review: akurasi terhadap sumber kebijakan resmi dan
    pemeriksaan UI/accessibility. \# 15. Definition of Ready dan
    Definition of Done

## 15.1 Definition of Ready

-   Requirement punya ID, prioritas, perilaku, input/output, dan
    acceptance criteria.

-   Tarif yang dibutuhkan tersedia dengan sumber resmi spesifik atau
    ditandai BLOCKED.

-   PO menyetujui definisi profit, margin, ROI, unit fee, basis, cap,
    dan rounding.

-   Desain/state UI cukup jelas untuk implementasi. \## 15.2 Definition
    of Done

-   Kode mengikuti arsitektur dan tidak menambah dependency tanpa
    persetujuan.

-   Seluruh test terkait lulus dan laporan hasil tersedia.

-   Tidak ada error console yang diketahui pada alur yang diuji.

-   Tidak ada data bisnis pengguna dikirim ke analytics.

-   Accessibility, responsive, security, dan SEO checklist telah
    diperiksa.

-   Dokumentasi dan changelog diperbarui.

-   PO/reviewer menyetujui tarif dan hasil numerik sebelum release. \##
    15.3 Release gate

  -----------------------------------------------------------------------
  Gate                                Syarat
  ----------------------------------- -----------------------------------
  G0 --- Scope                        MUST requirement dan definisi
                                      metrik disetujui.

  G1 --- Tariff                       Sumber, tanggal efektif,
                                      pengecualian, basis, unit, cap, dan
                                      status diverifikasi.

  G2 --- Engine                       Unit tests lulus; reverse pricing
                                      diverifikasi; expected values
                                      disetujui.

  G3 --- Product UI                   E2E, responsive, accessibility,
                                      storage, export lulus.

  G4 --- Production                   SEO, legal, headers, performance,
                                      deployment, dan monitoring
                                      diperiksa.
  -----------------------------------------------------------------------

# 16. Arsitektur dan struktur repository

``` text
kalkulatorseller/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── _headers
├── src/
│   ├── data/
│   │   └── tariffs/
│   │       ├── shopee.json
│   │       ├── tiktok-shop.json
│   │       └── tokopedia.json
│   ├── engine/
│   │   ├── feeEvaluator.js
│   │   ├── forwardPricing.js
│   │   ├── reversePricing.js
│   │   ├── metrics.js
│   │   └── validators.js
│   ├── utils/
│   │   ├── currency.js
│   │   ├── storage.js
│   │   ├── exportCsv.js
│   │   └── backup.js
│   ├── components/
│   │   ├── CalculatorForm.astro
│   │   ├── ResultSummary.astro
│   │   ├── FeeBreakdown.astro
│   │   ├── PlatformComparison.astro
│   │   └── SavedSku.astro
│   ├── layouts/
│   ├── pages/
│   └── styles/
│       └── tokens.css
├── tests/
│   ├── fixtures/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── astro.config.mjs
├── package.json
└── README.md
```

Struktur boleh berkembang selama pemisahan data, engine, UI, dan storage
tetap dijaga. Hindari membuat satu file besar yang memuat semua rumus
dan event UI.

# 17. Roadmap implementasi Agent AI

  ------------------------------------------------------------------------
  Stage             Fokus             Output wajib      Exit criteria
  ----------------- ----------------- ----------------- ------------------
  0\. Discovery     Audit repository  Repo assessment,  Tidak ada asumsi
                    dan konfirmasi    open questions,   tersembunyi;
                    keputusan         implementation    blocker tercatat.
                    terbuka.          plan.             

  1\. Scaffold      Astro, Tailwind   Build statis,     Build bersih;
                    v4, tokens,       schema validator, schema valid;
                    tariff schema,    README.           tarif belum
                    headers.                            verified tetap
                                                        ditandai.

  2\. Engine        Fee evaluator,    Pure functions    Semua engine test
                    forward, reverse, dan fixture       lulus; PO
                    metrics, unit     tests.            menyetujui
                    tests.                              expected values.

  3\. UI            Form, hasil,      UI responsive dan User journey utama
                    platform pages,   E2E dasar.        lulus.
                    comparison,                         
                    accessibility.                      

  4\. Local data    Saved SKU,        Storage/export    Security/storage
                    localStorage      tools dan tests.  test lulus.
                    migration, CSV,                     
                    JSON backup.                        

  5\. Content & SEO Tarif, panduan,   Halaman publik    Konten akurat;
                    legal, schema,    dan metadata.     sumber tarif
                    sitemap.                            ditampilkan.

  6\. QA & release  Performance,      Release report    Semua release gate
                    security, E2E,    dan checklist.    lulus dan PO
                    deployment.                         approve.
  ------------------------------------------------------------------------

## 17.1 Aturan Agent AI per stage

1.  Mulai dengan membaca repository, package.json, konfigurasi, dan file
    terkait sebelum mengubah apa pun.
2.  Jangan menghapus atau menimpa pekerjaan yang sudah ada tanpa
    menjelaskan alasannya.
3.  Implementasikan hanya stage yang sedang disetujui.
4.  Setelah perubahan, jalankan test/build yang relevan dan tampilkan
    perintah serta hasil aktual.
5.  Jika test gagal, perbaiki sebelum melanjutkan. Jangan menonaktifkan
    atau menghapus test untuk membuat pipeline hijau.
6.  Jika tarif atau kebijakan tidak tersedia, gunakan fixture yang jelas
    berlabel TEST ONLY; jangan memasukkannya ke data produksi.
7.  Jangan mengarang URL sumber, tarif, tanggal berlaku, atau status
    verified.
8.  Setiap perubahan rumus harus menyertakan alasan, contoh numerik, dan
    test regresi.
9.  Laporkan file yang berubah, keputusan yang diambil, blocker, risiko,
    dan langkah berikutnya. \# 18. Master instruction untuk Agent AI

Salin instruksi berikut sebagai system/project instruction pada Agent AI
yang mengerjakan repository KalkulatorSeller.

``` text
PERAN
Anda adalah Senior Product Engineer dan AI Coding Agent untuk KalkulatorSeller. Anda bekerja berdasarkan PRD ini sebagai spesifikasi utama.

MISI
Bangun aplikasi KalkulatorSeller sesuai requirement, dengan prioritas mutlak pada akurasi perhitungan, transparansi tarif, keamanan data lokal, aksesibilitas, dan maintainability.

ATURAN KERAS
1. Baca repository sebelum mengubah file.
2. Jangan mengarang tarif marketplace, source URL, effective date, verified date, atau aturan pengecualian.
3. Tarif yang belum diverifikasi harus berstatus unverified/blocked dan tidak boleh dipresentasikan sebagai tarif resmi.
4. Pisahkan tariff configuration, calculation engine, UI, dan storage.
5. Calculation engine harus pure functions dan diuji dengan Vitest.
6. Gunakan satu forward engine sebagai sumber perhitungan bagi forward dan reverse pricing.
7. Reverse pricing wajib memverifikasi hasil melalui forward engine dan membuktikan minimum sesuai resolusi harga.
8. Jangan mengabaikan rule yang belum didukung; kembalikan error yang jelas.
9. Jangan menggunakan innerHTML untuk data pengguna.
10. Lindungi CSV dari formula injection dan lakukan escaping CSV dengan benar.
11. Jangan mengirim nama SKU, HPP, harga jual, atau data simulasi ke analytics.
12. Jangan menambah framework/dependency tanpa alasan dan persetujuan.
13. Jangan menyatakan pekerjaan selesai tanpa bukti test/build aktual.
14. Jangan menghapus test atau menurunkan acceptance criteria untuk membuat test lulus.
15. Jika PRD belum menentukan keputusan penting, catat OPEN QUESTION dan minta persetujuan PO.

WORKFLOW
A. Audit repository dan rangkum kondisi awal.
B. Identifikasi requirement yang siap, blocked, dan perlu keputusan.
C. Implementasikan satu stage pada satu waktu.
D. Jalankan unit, integration, E2E, build, dan pemeriksaan yang relevan.
E. Sajikan laporan: perubahan file, hasil test, risiko, blocker, dan rekomendasi.
F. Tunggu persetujuan sebelum pindah ke stage berikutnya jika stage menyentuh tarif, rumus, security, atau scope produk.

DEFINITION OF DONE
Fitur dianggap selesai hanya jika acceptance criteria terpenuhi, test relevan lulus, tidak ada error yang diketahui, dokumentasi diperbarui, dan tidak ada data/tarif yang direkayasa.
```

# 19. Open questions yang wajib dijawab sebelum release

  -----------------------------------------------------------------------
  ID                Pertanyaan        Pemilik keputusan Dampak jika belum
                                                        dijawab
  ----------------- ----------------- ----------------- -----------------
  OQ-01             Definisi          PO                Metrik bisa
                    denominator                         menyesatkan.
                    margin dan ROI                      
                    yang final?                         

  OQ-02             Target reverse    PO                Harga rekomendasi
                    pricing berlaku                     berbeda.
                    per unit atau per                   
                    order?                              

  OQ-03             Rounding fee      PO + verifikasi   Hasil bisa
                    dilakukan per     kebijakan         berbeda beberapa
                    item, per fee,                      Rupiah.
                    atau total?                         

  OQ-04             Cap tiap fee      Tariff owner      Total fee bisa
                    berlaku per item,                   salah.
                    per transaksi,                      
                    atau per order?                     

  OQ-05             Basis dan kondisi Tariff owner      Tarif tidak dapat
                    setiap tarif                        diverifikasi.
                    resmi yang aktif?                   

  OQ-06             Bagaimana         PO + sumber resmi Harga efektif dan
                    memperlakukan                       basis komisi bisa
                    voucher yang                        salah.
                    ditanggung                          
                    platform vs                         
                    seller?                             

  OQ-07             Bagaimana         PO                Scope kalkulator
                    perlakuan refund,                   transaksi belum
                    pembatalan, dan                     lengkap.
                    partial                             
                    cancellation?                       

  OQ-08             Apakah biaya      PO                Risiko salah
                    logistik dihitung                   klaim tarif.
                    sebagai asumsi                      
                    user input atau                     
                    rule platform?                      

  OQ-09             Apakah SKU        PO                Hasil historis
                    menyimpan                           dapat berubah
                    snapshot tarif                      saat tarif
                    dan hasil saat                      diperbarui.
                    disimpan?                           

  OQ-10             Apakah analytics  PO/Privacy owner  CSP dan privacy
                    pihak ketiga                        policy belum
                    dipakai pada MVP?                   final.
  -----------------------------------------------------------------------

# 20. Risiko produk

  ------------------------------------------------------------------------
  Risiko                  Dampak                   Mitigasi
  ----------------------- ------------------------ -----------------------
  Tarif kedaluwarsa/salah Harga jual dan profit    Sumber resmi, verified
                          salah.                   date, changelog, status
                                                   unverified.

  Basis fee salah         Seluruh breakdown        Rule-based basis dan
                          meleset.                 test per fee.

  Per-item/per-order      Hasil multi-qty salah.   Unit eksplisit dan test
  tertukar                                         quantity.

  Reverse search tidak    Rekomendasi harga tidak  Feasibility,
  valid                   mencapai target.         monotonicity, forward
                                                   verification.

  Data lokal hilang       Pengguna kehilangan      Backup JSON,
                          daftar SKU.              versioning, migration,
                                                   recovery.

  CSV formula injection   Spreadsheet menjalankan  Sanitasi formula dan
                          formula tak diinginkan.  CSV escaping.

  Iklan mengganggu tool   Penurunan kepercayaan    Monetisasi bertahap dan
                          dan penggunaan.          slot terlarang.

  Klaim privasi           Risiko                   Dokumentasikan semua
  berlebihan              kepercayaan/kepatuhan.   third-party data flow.
  ------------------------------------------------------------------------

# 21. Catatan keputusan dan batasan dokumen

PRD ini mengubah Blueprint V3.0 menjadi spesifikasi implementasi yang
lebih operasional. PRD mempertahankan keputusan inti V3.0: Astro SSG,
Vanilla JS, Tailwind CSS v4, Cloudflare Pages, tiga marketplace MVP,
empat tingkat profit, rule-based tariff schema, localStorage, CSV/JSON
export, SEO, dan pengembangan bertahap.

PRD ini tidak mengesahkan tarif marketplace yang tercantum sebagai angka
contoh dalam blueprint. Tarif produksi harus diperiksa ulang dari sumber
resmi yang spesifik, termasuk basis, unit, cap, kondisi, pengecualian,
tanggal berlaku, dan tanggal verifikasi.

Beberapa keputusan bisnis sengaja dibiarkan sebagai Open Questions
karena dokumen sumber belum menetapkan jawabannya secara memadai. Agent
AI tidak boleh menebak keputusan tersebut.

Status dokumen: siap digunakan sebagai dasar discovery dan implementasi
bertahap setelah PO mengunci OQ yang relevan. Bukan bukti bahwa aplikasi
sudah selesai, tarif sudah terverifikasi, atau production readiness
telah tercapai.
