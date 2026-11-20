# Panduan Metadata & Open Graph (Metadata Guidelines)

Dokumentasi standarisasi tag meta, Open Graph, dan Twitter Cards pada `BaseLayout.astro`.

---

## 🏷 Standar Meta Tag

```html
<!-- Primary Meta -->
<title>{title} — KalkulatorSeller</title>
<meta name="description" content="{description}" />
<link rel="canonical" href="{resolvedCanonical}" />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

<!-- Open Graph (Facebook / WhatsApp / Telegram) -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="KalkulatorSeller" />
<meta property="og:locale" content="id_ID" />
<meta property="og:title" content="{title} — KalkulatorSeller" />
<meta property="og:description" content="{description}" />
<meta property="og:url" content="{resolvedCanonical}" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="{title} — KalkulatorSeller" />
<meta name="twitter:description" content="{description}" />
```

---

## 🚫 Penanganan Halaman 404
Halaman galat `src/pages/404.astro` secara eksplisit disuntik dengan:
```html
<meta name="robots" content="noindex, nofollow" />
```
Hal ini mencegah mesin pencari mengindeks halaman kesalahan dan menghemat *crawl budget*.
