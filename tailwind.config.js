/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0b4f43',
          2: '#0e7c66',
          soft: '#e3efec',
        },
        night: {
          DEFAULT: '#071f1b',
          2: '#0c2f29',
        },
        wa: '#25D366',
        highlight: '#ffd76e',
        ink: '#1c2b33',
        page: '#f2f5f7',
      },
      fontFamily: {
        sans: ['"Cairo Variable"', 'Cairo', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11, 79, 67, 0.05), 0 10px 30px rgba(11, 79, 67, 0.08)',
        bar: '0 -6px 24px rgba(11, 79, 67, 0.12)',
        glow: '0 24px 60px rgba(0, 0, 0, 0.45), 0 0 90px rgba(14, 124, 102, 0.28)',
      },
    },
  },
  plugins: [],
}
