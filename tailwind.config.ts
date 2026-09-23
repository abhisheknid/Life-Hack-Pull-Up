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
        cream: "#fdfcf6",
        accent: "#e8694f",
        lavender: { DEFAULT: "#cec2fb", soft: "#e4dcfd" },
        mintfrom: "#eef7c8",
        mintto: "#c9ecd6",
        skytint: { DEFAULT: "#c9eefb", soft: "#e3f7fd" },
        peach: { DEFAULT: "#ffd9b0", soft: "#ffe9d1" },
        // Ashika Mehta brand page: peach primary, deep teal secondary, coral accent.
        ash: {
          cream: "#fff8f2",
          blush: "#ffeadb",
          peach: "#ffd3b6",
          apricot: "#ffb088",
          coral: "#ee6a50",
          teal: "#0f4f58",
          deep: "#0a3a41",
          mist: "#d8ecea",
          ink: "#2b1c18",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
