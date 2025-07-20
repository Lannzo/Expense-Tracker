/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
theme: {
    extend: {
      colors: {
        'primary': '#4f46e5',      
        'primary-hover': '#4338ca',
        'secondary': '#10b981',
        'accent': '#f59e0b',
        'destructive': '#ef4444',
        'base-100': '#ffffff',
        'base-200': '#f3f4f6',
        'muted': '#6b7280',
        'text-default': '#1f2937',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}