# Data Terstruktur Schema.org (Structured Data JSON-LD)

Dokumentasi mengenai implementasi Schema.org JSON-LD yang disematkan ke dalam `<head>` pada `BaseLayout.astro`.

---

## 🏛 Skema yang Diimplementasikan

### 1. `WebSite` & SearchAction
Disematkan di halaman beranda (`/`):
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "KalkulatorSeller",
  "url": "https://kalkulatorseller.pages.dev/",
  "description": "Kalkulator keuntungan dan biaya marketplace Shopee, TikTok Shop, dan Tokopedia.",
  "inLanguage": "id-ID"
}
```

### 2. `WebApplication`
Mendeskripsikan fungsionalitas software kalkulator:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "KalkulatorSeller",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "IDR"
  }
}
```

### 3. `FAQPage`
Disematkan pada halaman panduan dan kalkulator untuk memunculkan rich snippet tanya-jawab di hasil pencarian Google.

### 4. `BreadcrumbList`
Menyediakan hierarki navigasi remah roti (*breadcrumbs*) untuk mempermudah Google memahami struktur situs.
