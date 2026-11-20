# Sistem Desain (Design System)

Dokumentasi token desain visual, palet warna, tipografi, dan komponen antarmuka **KalkulatorSeller** sesuai `tokens.css` dan prinsip Anti-Slop.

---

## 🎨 Token Warna (Color Tokens)

```css
:root {
  /* Brand Tokens */
  --color-brand-primary: #14213D; /* Oxford Navy (Elegan, kredibel, kontras tinggi) */
  --color-brand-accent:  #FCA311; /* Golden Orange (Aksen tombol & highlight kunci) */
  --color-canvas:        #FFFFFF; /* Latar belakang kanvas putih bersih */
  --color-surface:       #F8F9FA; /* Surface abu-abu sangat muda untuk card & table header */
  --color-border:        #E5E5E5; /* Garis tepi netral 1px */
  --color-text:          #000000; /* Teks utama hitam kontras */
  --color-text-muted:    #525252; /* Teks sekunder abu-abu terbaca (WCAG AA) */
  --color-success:       #047857; /* Hijau status untung */
  --color-danger:        #DC2626; /* Merah status rugi */
  --color-warning:       #B45309; /* Oranye peringatan biaya */
}
```

---

## ✍️ Tipografi & Numeral Tabular
- **Font Stack**: Menggunakan *System Font Stack* murni:
  `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  *Alasan*: Memastikan rendering teks instan tanpa latensi download font eksternal.
- **Tabular Numerals**: Seluruh angka keuangan dan persentase menggunakan kelas `.tabular-nums` (`font-variant-numeric: tabular-nums`) agar angka tersusun sejajar lurus secara vertikal.

---

## 📐 Komponen Input & Form
- **Border**: Ketebalan border tepat 1px (`border-width: 1px !important`), tidak menggunakan double-ring atau bayangan tebal.
- **Fokus Keyboard**: `outline: 1.5px solid var(--color-brand-primary)` dengan `outline-offset: 2px`.
- **Target Sentuh**: Seluruh tombol interaktif memiliki `min-height: 44px` dan `touch-action: manipulation`.
