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
        bubble: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
        },
        quest: {
          primary: '#6366f1',
          spark: '#f59e0b',
          magic: '#8b5cf6',
          mint: '#10b981',
          rose: '#f43f5e',
          sun: '#fbbf24',
          sky: '#38bdf8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Fredoka', 'Quicksand', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-subtle': 'bounceSubtle 2.8s infinite ease-in-out',
        'float-slow': 'floatSlow 4s infinite ease-in-out',
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'wiggle': 'wiggle 0.6s ease-in-out',
        'pop-in': 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'sparkle': 'sparkle 1.8s infinite ease-in-out',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-4deg)' },
          '75%': { transform: 'rotate(4deg)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.2) rotate(180deg)' },
        }
      }
    },
  },
  plugins: [],
}

