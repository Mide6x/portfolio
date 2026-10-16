/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        wixLight: '#f6f0e5',
        wixWhite: '#fbf7ef',
        wixText: '#332c22',
        wixTextSecondary: '#6e675c',
        wixAccent: '#596b38',
        
        wixDark: '#0f1011',
        wixDarkCard: '#1a1b1d',
        wixDarkText: '#f3f4f6',
        wixDarkTextSecondary: '#9ca3af',
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
        serif: ["'Source Serif 4'", "Georgia", "serif"],
        mono: ["SF Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        'soft': '0 4px 20px 0 rgba(0, 0, 0, 0.03)',
        'soft-dark': '0 4px 20px 0 rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
};
