module.exports = {
  content: ["./src/**/*.{html,js}"],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      main: "var(--main-color)",
      base: "var(--base-color)",
      hint: "var(--hint-color)",
      baseDarker: "var(--base-darker-color)",
    },
    extend: {},
  },
  important: true,
  variants: {
    extend: {},
  },
  plugins: [],
}
