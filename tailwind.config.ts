import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Design system colors
        brand: {
          50: "#F0FDFF",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#00D9FF", // Primary brand
          600: "#00B8E6",
          700: "#0099CC",
          800: "#007A99",
          900: "#005C73",
        },
        surface: {
          primary: "#1A1A1A",
          secondary: "#242424",
          tertiary: "#2E2E2E",
          interactive: "#383838",
          hover: "#404040",
          active: "#4A4A4A",
        },
        status: {
          success: {
            50: "#0F1F15",
            500: "#10B981",
            600: "#059669",
          },
          warning: {
            50: "#1F1A0C",
            500: "#F59E0B",
            600: "#FBBF24",
          },
          error: {
            50: "#1F0F0F",
            500: "#DC2626",
            600: "#EF4444",
          },
          info: {
            50: "#0C1419",
            500: "#0EA5E9",
            600: "#0284C7",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0, 217, 255, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(0, 217, 255, 0.5)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 2s ease-in-out infinite",
      },
      boxShadow: {
        soft: "0 2px 8px 0 rgba(0, 0, 0, 0.6)",
        medium: "0 4px 16px 0 rgba(0, 0, 0, 0.7)",
        strong: "0 8px 32px 0 rgba(0, 0, 0, 0.8)",
        glow: "0 0 20px rgba(0, 217, 255, 0.25)",
        "glow-subtle": "0 0 10px rgba(0, 217, 255, 0.15)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
