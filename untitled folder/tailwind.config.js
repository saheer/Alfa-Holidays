/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mulish', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      colors: {
        alfa: { deep: '#0a4fa8', sky: '#23aae2', cyan: '#12c6ff' },
      },
    },
  },
  plugins: [],
};
