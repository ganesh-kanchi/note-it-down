/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00B0FF",
        dimPrimary: "#316AB5",
        textPrimary: "black",
        light: "#f5f5f5",
        grey: "#cbcbcb",
        lightGrey: "#e2e2e292",
        darkGrey: "#5a5a5a",
        dark: "#001527",
        darkSecondary: "#001e39",
        danger: "#ff2c2c",
      },
    },
  },
  plugins: [],
}
