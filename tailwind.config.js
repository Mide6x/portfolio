/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A192F",
        secondary: "#64FFDA",
        textPrimary: "#CCD6F6",
        textSecondary: "#8892B0",
        navy: "#0a192f",
        lightNavy: "#112240",
        lightestNavy: "#233554",
      },
      fontFamily: {
        sans: ["Calibre", "Inter", "San Francisco", "SF Pro Text", "system-ui"],
        mono: ["SF Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};