import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Institutional dark palette
        background: {
          DEFAULT: "#0A0B0D",
          elevated: "#101216",
          panel: "#14171C",
        },
        foreground: {
          DEFAULT: "#E8EAED",
          muted: "#9AA0A6",
          subtle: "#5F6368",
        },
        border: {
          DEFAULT: "#1E2228",
          strong: "#2A2F37",
        },
        accent: {
          silver: "#C0C7D1",
          steel: "#7B8794",
          signal: "#3B6FB2",   // restrained muted blue
          alert: "#A23E3E",    // restrained muted red
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        institutional: "0.18em",
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 6vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 4rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        container: "1280px",
        prose: "68ch",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "signal-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "signal-pulse": "signal-pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
