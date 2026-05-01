import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        muted: "#667085",
        line: "#e6e8ee",
        brand: "#2563eb"
      }
    }
  },
  plugins: []
};

export default config;
