/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
        extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#f97316',
        background: '#f8fafc',
        text: '#0f172a',
        'light-gray': '#e5e7eb',
      },
    },
  },
  plugins: [],
}

