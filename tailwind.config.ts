import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "#673FC0",
        "primary-lighter": "#B4BCD0",
        "primary-light": "#A3A4AC",
        "primary-dark": "#444B5C",
        "primary-darker": "#71727B",
        "primary-darken": "#000212",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
} satisfies Config;
