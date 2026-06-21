/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006948',
          dark: '#005237',
          container: '#00855C',
          fixed: '#81F9C2',
          'fixed-dim': '#63DCA7',
        },
        secondary: {
          DEFAULT: '#0D50D5',
          container: '#386BEF',
        },
        tertiary: {
          DEFAULT: '#9C3C3B',
          container: '#BC5452',
        },
        surface: {
          DEFAULT: '#F5FBF4',
          card: '#FFFFFF',
          low: '#EFF5EF',
          medium: '#E9F0E9',
          high: '#E3EAE3',
          highest: '#DEE4DE',
        },
        'on-surface': {
          DEFAULT: '#171D19',
          variant: '#3D4A42',
        },
        outline: {
          DEFAULT: '#6D7A72',
          variant: '#BCCAC0',
        },
        error: {
          DEFAULT: '#BA1A1A',
          container: '#FFDAD6',
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", 'sans-serif'],
        numbers: ["'DM Sans'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      borderRadius: {
        card: '10px',
        input: '6px',
        xl: '14px',
        '2xl': '20px',
        pill: '9999px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.06)',
        md: '0 4px 12px rgba(0,0,0,0.08)',
        lg: '0 8px 24px rgba(0,0,0,0.12)',
        up: '0 -4px 16px rgba(0,0,0,0.10)',
      },
      backgroundImage: {
        'velocity-gradient': 'linear-gradient(135deg, #006948 0%, #00855C 100%)',
        'dark-gradient': 'linear-gradient(135deg, #002114 0%, #006948 100%)',
        'hero-radial': 'radial-gradient(ellipse at center, rgba(129,249,194,0.15) 0%, transparent 70%)',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 105, 72, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 105, 72, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
