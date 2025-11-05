import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ✅ enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

export default config;
