/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {},
      screens: {
        'xms': '480px',
      }
    },
  },
  plugins: [],
}

