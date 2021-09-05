module.exports = {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "light-bg": "#FFF",
        "light-text-primary": "#292929",
        "light-text-secondary": "#585858",
        "light-card-bg": "#F8F8F8",
        "light-card-border": "#D9D9D9",
        "light-separators": "#E5E5E5",
        "light-surface-bg": "#F8F8F8",
        "light-surface-border": "#D9D9D9",

        "dark-bg": "#18191A",
        "dark-text-primary": "#D1D1D1",
        "dark-text-secondary": "#9C9C9C",
        "dark-card-bg": "#242424",
        "dark-card-border": "#373737",
        "dark-separators": "#1F2121",
        "dark-surface-bg": "#363636",
        "dark-surface-border": "#434242",
      },
      animation: {
        "fade-in": "fadeIn 350ms ease-in",
        "slide-in":
          "250ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s 1 normal both running slideIn",
        "slide-out":
          "250ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s 1 normal both running slideOut",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
