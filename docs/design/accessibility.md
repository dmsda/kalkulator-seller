# Panduan Aksesibilitas (Accessibility WCAG 2.2 AA)

Standar aksesibilitas digital yang diterapkan pada **KalkulatorSeller** untuk memastikan aplikasi dapat digunakan dengan nyaman oleh semua orang, termasuk penyandang disabilitas dan pengguna alat bantu navigasi (*screen readers*).

---

## ♿ Standar Kepatuhan WCAG 2.2 AA

1. **Ukuran Target Sentuh (Target Size - Success Criterion 2.5.8)**:
   - Seluruh tombol, link navigasi, dan input form memiliki area interaktif minimal **44x44 CSS pixel** (`min-h-[44px]`).
2. **Navigasi Keyboard Penuh (Keyboard Accessible - Success Criterion 2.1.1)**:
   - Seluruh fitur dapat dioperasikan tanpa mouse menggunakan tombol `Tab`, `Shift+Tab`, `Space`, dan `Enter`.
   - Dialog dan drawer navigasi mobile dapat ditutup menggunakan tombol `Escape`.
3. **Indikator Fokus Visual (Focus Visible - Success Criterion 2.4.7)**:
   - Seluruh elemen interaktif memiliki garis outline fokus yang kontras (`outline: 1.5px solid #14213D; outline-offset: 2px`).
4. **Kontras Warna Teks (Contrast Minimum - Success Criterion 1.4.3)**:
   - Teks utama (`#000000`) dan teks sekunder (`#525252`) memiliki rasio kontras $\ge 4.5:1$ terhadap latar belakang putih (`#FFFFFF`).
5. **Bahasa Halaman & Landmark (Language & Info - Success Criterion 3.1.1 & 1.3.1)**:
   - Tag root menyatakan bahasa Indonesia: `<html lang="id">`.
   - Menggunakan tag semantik HTML5: `<header>`, `<nav>`, `<main id="main-content">`, `<section>`, dan `<footer>`.
   - Komponen interaktif dilengkapi atribut ARIA yang tepat: `aria-expanded`, `aria-controls`, `aria-label`, dan `aria-current`.
