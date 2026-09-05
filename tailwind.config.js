/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#06080d',
          card: 'rgba(13, 17, 26, 0.75)',
          border: 'rgba(56, 189, 248, 0.15)',
          blue: '#0c8ce9',
          cyan: '#00f2fe',
          glow: '#38bdf8',
          emerald: '#10b981',
          purple: '#8b5cf6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.3)',
        'glow-blue': '0 0 25px -5px rgba(12, 140, 233, 0.35)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.3)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
