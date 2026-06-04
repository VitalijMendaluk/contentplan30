import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          500: "#FF0050",
          600: "#E6004A",
        },
        cyan: {
          400: "#00F0FF",
          500: "#00D9E8",
        },
        purple: {
          900: "#0D0A1A",
          800: "#130F25",
          700: "#1A1430",
          600: "#231B40",
          500: "#7C3AED",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
