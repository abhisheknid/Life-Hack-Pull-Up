import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16161a",
        paper: "#fafaf8",
        accent: "#4f46e5",
      },
    },
  },
  plugins: [],
};
export default config;
