/** @type {import('tailwindcss').Config} */
// Renk sistemi: iştah açıcı sıcak palet. Varsayılan Tailwind renkleri
// (mavi, soğuk gri vb.) bilinçli olarak tamamen kaldırıldı.
module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      // Ana renk – Biber Kırmızısı (Sipariş Ver, Sepete Ekle)
      pepper: {
        50: '#FDEEEE',
        100: '#FBD9D9',
        200: '#F6B1B2',
        DEFAULT: '#E5383B',
        600: '#CF2D30',
        700: '#AD2427',
        800: '#8A1D20',
      },
      // İkincil – Gün Batımı Turuncusu (kategori, menü vurguları, filtreler)
      sunset: {
        50: '#FEF3EC',
        100: '#FDE2D1',
        200: '#FAC3A2',
        DEFAULT: '#F3722C',
        600: '#DC5F1B',
        700: '#B44C14',
      },
      // Vurgu – Sıcak Sarı (rozetler, indirim, bildirim)
      honey: {
        50: '#FEF9EA',
        100: '#FDF0C7',
        200: '#FBE39A',
        DEFAULT: '#F9C74F',
        600: '#E5AC2B',
        700: '#B9861A',
      },
      // Arka plan – Sıcak Krem
      cream: {
        DEFAULT: '#FFFDF9',
        100: '#FFF8EF',
        200: '#FCEFDF',
        300: '#F6E2C9',
        400: '#EBCFAE',
      },
      // Metin – Koyu Yanık Kahve
      cocoa: {
        DEFAULT: '#2B1E1A',
        800: '#3A2A24',
        700: '#4D3A32',
        600: '#655046',
        500: '#7A6157',
        400: '#9A8076',
        300: '#C2ADA2',
        200: '#E3D4C9',
      },
      // Tazelik / sağlık etiketleri – Yaprak Yeşili
      leaf: {
        50: '#EEF5F0',
        100: '#D7E8DC',
        DEFAULT: '#4A7C59',
        700: '#3A6347',
      },
    },
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 10px 30px -12px rgba(122, 52, 20, 0.28)',
        'warm-lg': '0 24px 60px -20px rgba(122, 52, 20, 0.35)',
        'warm-sm': '0 4px 14px -6px rgba(122, 52, 20, 0.25)',
        cta: '0 12px 24px -10px rgba(229, 56, 59, 0.55)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .5s ease-out both',
        pop: 'pop .35s ease-out',
      },
    },
  },
  plugins: [],
};
