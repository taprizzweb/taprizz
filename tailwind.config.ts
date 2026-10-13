import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        panel: "#0d0d0d",
        line: "#242424",
        paper: "#fafcf3",
        lime: { 300: "#d6ff7d", 400: "#b6ff2e", 500: "#a2f01a", 600: "#7ec10f", dim: "#1e3a09" },
        gold: { 300: "#d6ff7d", 400: "#b6ff2e", 500: "#a2f01a", 600: "#7ec10f" },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        serif: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        aurora: { "0%,100%": { transform: "translate(0,0) scale(1)" }, "50%": { transform: "translate(40px,-30px) scale(1.15)" } },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        aurora: "aurora 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
