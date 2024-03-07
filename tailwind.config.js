/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.ts", "./src/**/*.astro", "./src/**/*.tsx"],
  theme: {
    container: {
      center: true,
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      md: ["0.938rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.75rem" }],
      "5xl": ["3rem", { lineHeight: "1.125" }],
      "6xl": ["3.75rem", { lineHeight: "1.125" }],
      "7xl": ["4.5rem", { lineHeight: "1.125" }],
      "8xl": ["6rem", { lineHeight: "1.125" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    extend: {
      colors: {
        // Mastodon colors
        violet: {
          300: "#858AFA",
          950: "#17063B",
          900: "#2F0C7A",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
