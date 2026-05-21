/** @type {import('tailwindcss').Config} */
// Tailwind CSS configuration for Ematech (loaded by Tailwind v4
// via the `@config` directive in src/index.css for backwards-
// compatible JS theme extension).
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem'
      },
      screens: {
        '2xl': '1280px'
      }
    },
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        arabic: ['"Cairo"', '"Noto Kufi Arabic"', 'Tahoma', 'sans-serif']
      },
      colors: {
        gold: {
          50: '#fdf9ef',
          100: '#faf0d4',
          200: '#f4e0a4',
          300: '#ecc96a',
          400: '#e3b13d',
          500: '#d4af37',
          600: '#b87a22',
          700: '#955d20',
          800: '#7a4a22',
          900: '#653e21'
        }
      },
      boxShadow: {
        gold: '0 10px 40px -10px rgba(212, 175, 55, 0.45)',
        'gold-soft': '0 8px 24px -12px rgba(212, 175, 55, 0.25)'
      },
      backgroundImage: {
        'gold-gradient':
          'linear-gradient(135deg, #fcd980 0%, #d4af37 50%, #a07a1f 100%)',
        'dark-radial':
          'radial-gradient(circle at 20% 0%, rgba(212,175,55,0.18), transparent 50%), radial-gradient(circle at 80% 100%, rgba(212,175,55,0.08), transparent 50%)'
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        'fade-in': 'fade-in 0.4s ease-out both',
        shimmer: 'shimmer 2.5s linear infinite',
        'soft-pulse': 'soft-pulse 2.4s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
