/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        team: {
          mountx: {
            DEFAULT: '#00FF88',
            light: '#33FFB3',
            dark: '#00CC6A',
          },
          flux: {
            DEFAULT: '#FF6B35',
            light: '#FF8C42',
            dark: '#E55A2B',
          },
          frozen: {
            DEFAULT: '#F0F0F0',
            light: '#FFFFFF',
            dark: '#E0E0E0',
          },
          visionary: {
            DEFAULT: '#9D4EDD',
            light: '#B185DB',
            dark: '#7B2CBF',
          },
          mymetic: {
            DEFAULT: '#1C1C1C',
            light: '#2D2D2D',
            dark: '#0A0A0A',
          },
          team: {
            DEFAULT: '#FFD700',
            light: '#FFE55C',
            dark: '#FFC300',
          },
          legendary: {
            DEFAULT: '#4169E1',
            light: '#5B8DEE',
            dark: '#2952CC',
          },
        },
      },
      
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      
      boxShadow: {
        'neon-red': '0 0 20px rgba(220, 20, 60, 0.5), 0 0 40px rgba(220, 20, 60, 0.3)',
        'neon-red-lg': '0 0 30px rgba(220, 20, 60, 0.6), 0 0 60px rgba(220, 20, 60, 0.4)',
      },
    },
  },
  plugins: [],
}
