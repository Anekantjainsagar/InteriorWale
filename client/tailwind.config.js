/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        newOrange: "#ffad65",
        newGrey: "#F0F0F0",
      },
      fontFamily: {
        muller: ["Muller", "sans-serif"],
        "muller-narrow": ["Muller Narrow", "sans-serif"],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
        extrabold: 800,
      },
    },
  },
  plugins: [],
};
