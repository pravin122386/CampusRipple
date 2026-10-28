/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FDFDFB',
          100: '#F9F8F3',
          200: '#F3F0E6',
          300: '#E8E5D8',
          800: '#2A2A28',
          900: '#141413',
        },
        editorial: {
          bg: '#0F1115',
          card: '#161920',
          elevated: '#1D222D',
          border: 'rgba(255, 255, 255, 0.08)',
          subtle: 'rgba(255, 255, 255, 0.45)',
          muted: 'rgba(255, 255, 255, 0.65)',
          text: '#F5F5F7',
          accent: '#E63946',
          crimson: '#D9383A',
          amber: '#F59E0B',
          emerald: '#10B981',
          slate: '#3B82F6',
          gold: '#C59B27',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      fontSize: {
        '10xl': ['8rem', { lineHeight: '1' }],
        '11xl': ['10rem', { lineHeight: '0.9' }],
      },
      animation: {
        'ripple-pulse': 'ripplePulse 3s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'subtle-pulse': 'subtlePulse 2s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        ripplePulse: {
          '0%': { transform: 'scale(0.8)', opacity: '0.9' },
          '50%': { transform: 'scale(1.8)', opacity: '0.3' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
