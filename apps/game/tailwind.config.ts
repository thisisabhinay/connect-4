import type { Config } from "tailwindcss";
import defaultConfig from "@repo/tailwind-config/default";

const config: Config = {
  ...defaultConfig,
  darkMode: ["class", "selector"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
};

export default config;
