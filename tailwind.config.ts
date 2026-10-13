import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#141517",
        ink: "#141517",
        panel: "#1a1b1e",
        line: "#2c2d31",
        paper: "#f3f3f1",
        lime: { 300: "#f1f1f2", 400: "#dcdddf", 500: "#c6c7ca", 600: "#a3a4a8", dim: "#26272b" },
        gold: { 300: "#f1f1f2", 400: "#dcdddf", 500: "#c6c7ca", 600: "#a3a4a8" },
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
