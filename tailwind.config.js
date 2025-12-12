/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        piscina: {
          600: '#1E40AF',
          500: '#3B82F6',
        },
        limpa: '#10B981',
      },
    },
  },
  plugins: [],
}
