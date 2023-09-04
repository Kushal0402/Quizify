import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Bricolage Grotesque", "sans-serif"],
      },
      colors: {
        "dark-blue": "#164B60",
        "semi-dark-blue": "#1B6B93",
        "lighter-blue": "#4FC0D0",
        "lighter-green": "#A2FF86",
      },
      screens: {
        "mid-sm": "325px",
      },
    },
  },
  plugins: [],
};
export default config;
