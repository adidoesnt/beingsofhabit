import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "light-brown": "#988a89",
        "dark-brown": "#262626",
        beige: "#f6f3ec",
        "dull-gray": "#d9d8d3",
        grey: "#bebeb8",
        olive: "#303a2f",
      },
    },
  },
  plugins: [],
};
export default config;
