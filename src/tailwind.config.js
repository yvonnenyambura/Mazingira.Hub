/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#16A34A", // emerald green
          light: "#22C55E",
        },
        secondary: {
          DEFAULT: "#2563EB", // deep blue
          light: "#38BDF8",
        },
        neutral: {
          DEFAULT: "#1F2937", // charcoal text
          light: "#6B7280",   // gray text
          bg: "#F9FAFB",      // background
          border: "#E5E7EB",  // border
        },
        accent: {
          DEFAULT: "#F59E0B", // amber
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // clean, modern font
      },
    },
  },
  plugins: [],
};
