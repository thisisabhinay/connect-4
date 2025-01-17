import type { Config } from "tailwindcss";
import defaultConfig from "@repo/tailwind-config/default";

const config: Config = {
  ...defaultConfig,
  darkMode: ["class", "selector"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        sky: "url('../../../../packages/assets/images/sky.jpg')",
      },
      animation: {
        bg: "move-bg 10s linear infinite",
      },
      keyframes: {
        "move-bg": {
          "0%": { "background-position": "100% 0" },
          "100%": { "background-position": "0% 0" },
        },
      },
    },
  },
};

export default config;
