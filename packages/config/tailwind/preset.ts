// Handyman Services Design System — Tailwind Preset
// Colors inspired by trust/reliability (blue-teal) for a trades platform

export const meistaiPreset = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EEF6FF",
          100: "#D9EBFF",
          200: "#BCDBFF",
          300: "#8EC4FF",
          400: "#59A3FF",
          500: "#2563EB", // Main brand blue
          600: "#1D4FD8",
          700: "#1A3FAF",
          800: "#1B348D",
          900: "#1C2F6E",
          950: "#141E42",
        },
        accent: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E", // Success/verified green
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },
        warning: {
          500: "#F59E0B",
          600: "#D97706",
        },
        error: {
          500: "#EF4444",
          600: "#DC2626",
        },
        star: "#FFB800",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
};
