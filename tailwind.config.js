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
        adobe: {
          dark: '#1e1e1e',
          darker: '#141414',
          panel: '#252525',
          border: '#333333',
          borderLight: '#444444',
          accent: '#3b82f6', // Adobe blue
          accentHover: '#2563eb',
          purple: '#8b5cf6',
          coral: '#f43f5e',
          text: '#ffffff',
          subtext: '#9ca3af',
          muted: '#6b7280',
          hover: '#2f2f2f',
          active: '#3a3a3a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

