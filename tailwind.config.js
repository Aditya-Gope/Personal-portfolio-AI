/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#08090E',
          darker: '#040508',
          card: 'rgba(17, 24, 39, 0.7)',
          cardHover: 'rgba(30, 41, 59, 0.8)',
          light: '#F8FAFC',
          lightCard: 'rgba(255, 255, 255, 0.85)',
        },
        cyber: {
          blue: '#00F0FF',
          cyan: '#38BDF8',
          violet: '#8B5CF6',
          purple: '#A855F7',
          pink: '#EC4899',
          emerald: '#10B981',
          amber: '#F59E0B',
        },
        surface: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#080C14',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.35)',
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'glow-cyan-lg': '0 0 50px -10px rgba(0, 240, 255, 0.5)',
        'glow-violet-lg': '0 0 50px -10px rgba(139, 92, 246, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #00F0FF 0%, #8B5CF6 50%, #EC4899 100%)',
        'subtle-dark': 'radial-gradient(ellipse at 50% 0%, rgba(14, 165, 233, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 80%)',
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        spinSlow: 'spinSlow 20s linear infinite',
      },
    },
  },
  plugins: [],
}
