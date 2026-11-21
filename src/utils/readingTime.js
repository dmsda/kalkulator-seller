/**
 * Menghitung estimasi waktu membaca dalam menit berdasarkan jumlah kata.
 * Menggunakan standar ~200 kata per menit (WPM) untuk teks Bahasa Indonesia.
 *
 * @param {string} text - Konten teks atau markdown artikel
 * @returns {{ minutes: number, text: string }}
 */
export function calculateReadingTime(text) {
  if (!text || typeof text !== 'string') {
    return { minutes: 1, text: '1 menit baca' };
  }

  // Bersihkan markdown syntax, tag HTML, spasi berlebih
  const cleanText = text
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/[#*`_~\[\]()!>+-]/g, ' ')
    .trim();

  const words = cleanText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return {
    minutes,
    text: `${minutes} menit baca`,
  };
}
