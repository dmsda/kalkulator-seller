# Panduan Desain Responsif (Responsive Guidelines)

Dokumentasi arsitektur responsif multi-perangkat pada **KalkulatorSeller**.

---

## 📱 5 Breakpoint Perangkat yang Diuji
1. **Layar Sempit (320px - 374px)**: Ponsel kompak (seperti iPhone SE). Seluruh teks pas tanpa overflow (`overflow-x: hidden`).
2. **Ponsel Modern (375px - 639px)**: iPhone standar dan Android mainstream. Formulir 1 kolom dengan *Mobile Sticky Summary Bar*.
3. **Tablet (640px - 1023px)**: iPad & tablet Android. Formulir 2 kolom seimbang.
4. **Laptop / Komputer (1024px - 1439px)**: Tata letak berdampingan (*split column*): Formulir input di kiri, Kartu Hasil & Rincian Biaya di kanan.
5. **Desktop Lebar (1440px+)**: Lebar konten maksimal dibatasi pada `1160px` (`max-w-[1160px] mx-auto`) agar tidak melebar berlebihan dan menjaga kenyamanan membaca.

---

## 🛡 Fitur Khusus Mobile UX
- **Pencegahan iOS Auto-Zoom**: Seluruh elemen `<input>` dan `<select>` memiliki ukuran font minimal 16px (`text-base sm:text-sm`) pada viewport ponsel agar browser Safari iOS tidak melakukan *auto-zoom* otomatis yang mengganggu saat input difokuskan.
- **Mobile Sticky Summary Bar**: Panel ringkasan mengambang di bagian bawah layar ponsel yang menampilkan nominal untung bersih secara permanen dan tombol *"Lihat Rincian"* untuk scroll cepat ke tabel rincian biaya.
- **Hybrid View Riwayat SKU**: Otomatis berganti dari kartu vertikal (*Mobile Cards*) pada layar kecil menjadi tabel komparasi kolom (*Desktop Table*) pada layar $\ge$ 640px.
