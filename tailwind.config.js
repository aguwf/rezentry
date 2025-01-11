/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["Zentry Regular", "sans-serif"],
        general: ["General Sans", "sans-serif"],
        circular: ["Circular Std", "sans-serif"],
        robert: ["Robert Regular", "sans-serif"],
        "robert-medium": ["Robert Medium", "sans-serif"],
      },
      colors: {
        "primary": "#4433ff",
        "secondary": "#edff66",
        "zentry-blue": {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
        },
        "zentry-violet": {
          100: "#4433ff",
          300: "#5724ff",
        },
        "zentry-yellow": {
          100: "#8e983f",
          300: "#edff66",
        }
      }
    },
  },
  plugins: [],
};
