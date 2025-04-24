import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Base colors
        "base-enabled": "var(--background-base-enabled)",
        "base-enabled-default": "var(--background-base-enabled-default)",
        "base-hover": "var(--background-base-hover-default)",
        "base-focus": "var(--background-base-focus-default)",
        "base-active": "var(--background-base-active-default)",
        "base-disabled": "var(--background-base-disabled-default)",
        "base-selected": "var(--background-base-selected)",
        "base-enabled-2": "var(--background-base-enabled-2)",

        // Purple colors
        "purple-enabled": "var(--background-purple-enabled)",
        "purple-hover": "var(--background-purple-hover-default)",
        "purple-focus": "var(--background-purple-focus)",
        "purple-active": "var(--background-purple-active)",
        "purple-disabled": "var(--background-purple-disabled)",
        "purple-selected": "var(--background-purple-selected)",

        // Success colors
        "success-enabled": "var(--background-success-enabled-default)",
        "success-hover": "var(--background-success-hover-default)",
        "success-focus": "var(--background-success-focus-default)",
        "success-active": "var(--background-success-active-default)",
        "success-disabled": "var(--background-success-disabled-default)",

        // Warning colors
        "warning-enabled": "var(--background-warning-enabled-default)",
        "warning-enabled-2": "var(--background-warning-enabled-2)",
        "warning-hover": "var(--background-warning-hover-default)",
        "warning-focus": "var(--background-warning-focus-default)",
        "warning-active": "var(--background-warning-active-default)",
        "warning-disabled": "var(--background-warning-disabled-default)",

        // Danger colors
        "danger-enabled": "var(--background-danger-enabled-default)",
        "danger-hover": "var(--background-danger-hover-default)",
        "danger-focus": "var(--background-danger-focus-default)",
        "danger-active": "var(--background-danger-active-default)",
        "danger-disabled": "var(--background-danger-disabled-default)",

        // Neutral colors
        "neutral-primary": "var(--background-neutral-primary)",
        "neutral-secondary": "var(--background-neutral-secondary)",
        "neutral-tertiary": "var(--background-neutral-tertiary)",
        "neutral-quaternary": "var(--background-neutral-quaternary)",
        "neutral-enabled": "var(--background-neutral-enabled-default)",
        "neutral-hover": "var(--background-neutral-hover-default)",
        "neutral-focus": "var(--background-neutral-focus-default)",
        "neutral-active": "var(--background-neutral-active-default)",
        "neutral-disabled": "var(--background-neutral-disabled-default)",
        "neutral-selected": "var(--background-neutral-selected)",

        // Palette colors
        "palette-black": "var(--color-palette-black)",
        "palette-neutral-100": "var(--color-palette-neutral-100)",
        "palette-white": "var(--color-palette-white)",
        "palette-blue-50": "var(--color-palette-blue-50)",
        "palette-blue-100": "var(--color-palette-blue-100)",
        "palette-blue-200": "var(--color-palette-blue-200)",
        "palette-blue-300": "var(--color-palette-blue-300)",
        "palette-blue-400": "var(--color-palette-blue-400)",
        "palette-orange-100": "var(--color-palette-orange-100)",
        "palette-orange-200": "var(--color-palette-orange-200)",
        "palette-orange-300": "var(--color-palette-orange-300)",
        "palette-orange-400": "var(--color-palette-orange-400)",
        "palette-orange-500": "var(--color-palette-orange-500)",
        "palette-green-100": "var(--color-palette-green-100)",
        "palette-green-200": "var(--color-palette-green-200)",
        "palette-green-300": "var(--color-palette-green-300)",
        "palette-green-400": "var(--color-palette-green-400)",
        "palette-green-50": "var(--color-palette-green-50)",
        "palette-green-500": "var(--color-palette-green-500)",
        "palette-green-600": "var(--color-palette-green-600)",
        "palette-green-700": "var(--color-palette-green-700)",
        "palette-green-800": "var(--color-palette-green-800)",
        "palette-green-900": "var(--color-palette-green-900)",
        "palette-green-950": "var(--color-palette-green-950)",

        // Font colors
        "font-base": "var(--font-base-default)",
        "font-base-default-3": "var(--font-base-default-3)",
        "font-base-enabled-2": "var(--font-base-enabled-2)",
        "font-neutral-primary": "var(--font-neutral-primary)",
        "font-neutral-secondary": "var(--font-neutral-secondary)",
        "font-neutral-tertiary": "var(--font-neutral-tertiary)",
        "font-success": "var(--font-success-default)",
        "font-warning": "var(--font-warning-default)",
        "font-warning-enabled": "var(--font-warning-enabled)",
        "font-danger": "var(--font-danger-default)",
        "font-danger-enabled": "var(--font-danger-enabled)",
        "font-danger-disabled": "var(--font-danger-disabled)",
        "font-neutral-disabled": "var(--font-neutral-disabled)",
        "font-purple": "var(--font-purple-default)",
        "font-purple-enabled": "var(--font-purple-enabled)",
        "font-success-enabled": "var(--font-success-enabled)",
        "font-neutral-enabled": "var(--font-neutral-enabled)",

        // Icon colors
        "icon-base": "var(--icon-base)",
        "icon-success": "var(--icon-success)",
        "icon-warning": "var(--icon-warning)",
        "icon-danger": "var(--icon-danger)",
        "icon-neutral-primary": "var(--icon-neutral-primary)",
        "icon-neutral-secondary": "var(--icon-neutral-secondary)",
        "icon-neutral-tertiary": "var(--icon-neutral-tertiary)",
        "icon-neutral-disabled-outline": "var(--icon-neutral-disabled-outline)",
        "icon-white": "var(--icon-white)",

        // Border/stroke colors
        "stroke-base-enabled": "var(--stroke-base-enabled-plain)",
        "stroke-neutral": "var(--stroke-neutral)",
        "stroke-neutral-disabled-outline": "var(--stroke-neutral-disabled-outline)",
        "stroke-base": "var(--stroke-base)",
        "stroke-success": "var(--stroke-success)",
        "stroke-warning": "var(--stroke-warning)",
        "stroke-danger": "var(--stroke-danger)",
        "stroke-white": "var(--stroke-white)",

        // Effects colors
        "effects-neutral": "var(--effects-neutral)",
        "effects-base-focus": "var(--effects-base-focus)",
        "effects-base-selected": "var(--effects-base-selected)",
        "effects-danger": "var(--effects-danger)",
        "effects-white": "var(--effects-white)",
        "effects-opacity": "var(--effects-opacity)",
        "effects-opacity-2": "var(--effects-opacity-2)",

        // Background colors
        "success-default": "var(--background-success-default)",
        "neutral-enabled-default-2": "var(--background-neutral-enabled-default-2)",
      },

      fontSize: {
        "2xs": "var(--size-0-5)",
        xs: "var(--size-0-625)",
        sm: "var(--size-0-75)",
        md: "var(--size-0-875)",
        lg: "var(--size-1)",
        xl: "var(--size-1-125)",
        "2xl": "var(--size-1-25)",
        "3xl": "var(--size-1-5)",
        "4xl": "var(--size-1-75)",
        "5xl": "var(--size-2)",
        "6xl": "var(--size-2-5)",
        "7xl": "var(--size-3)",
      },

      // Font weights
      fontWeight: {
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
        italic: "var(--font-weight-italic)",
      },

      // Line heights
      lineHeight: {
        xs: "var(--line-height-xs)",
        sm: "var(--line-height-sm)",
        md: "var(--line-height-md)",
        lg: "var(--line-height-lg)",
        xl: "var(--line-height-xl)",
        "2xl": "var(--line-height-2xl)",
        "3xl": "var(--line-height-3xl)",
        "4xl": "var(--line-height-4xl)",
        "5xl": "var(--line-height-5xl)",
        "6xl": "var(--line-height-6xl)",
        "7xl": "var(--line-height-7xl)",
        "8xl": "var(--line-height-8xl)",
        "9xl": "var(--line-height-9xl)",
      },

      // Spacing
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
        "4xl": "var(--space-4xl)",
        "5xl": "var(--space-5xl)",
        "6xl": "var(--space-6xl)",
        "7xl": "var(--space-7xl)",
      },

      // Padding
      padding: {
        xs: "var(--padding-xs)",
        sm: "var(--padding-sm)",
        md: "var(--padding-md)",
        lg: "var(--padding-lg)",
        xl: "var(--padding-xl)",
        "2xl": "var(--padding-2xl)",
        "3xl": "var(--padding-3xl)",
        "4xl": "var(--padding-4xl)",
        "5xl": "var(--padding-5xl)",
        "6xl": "var(--padding-6xl)",
        "7xl": "var(--padding-7xl)",
        "8xl": "var(--padding-8xl)",
        "9xl": "var(--padding-9xl)",
        "10xl": "var(--padding-10xl)",
        "11xl": "var(--padding-11xl)",
        "12xl": "var(--padding-12xl)",
        "13xl": "var(--padding-13xl)",
        "14xl": "var(--padding-14xl)",
        "15xl": "var(--padding-15xl)",
        "16xl": "var(--padding-16xl)",
      },

      // Shadows
      boxShadow: {
        small: "var(--shadow-small)",
        medium: "var(--shadow-medium)",
        large: "var(--shadow-large)",
      },

      // Font families
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sans: "var(--font-family-sans)",
        mono: "var(--font-family-mono)",
      },

      // Transitions
      transitionProperty: {
        fast: "var(--transition-fast)",
        normal: "var(--transition-normal)",
        slow: "var(--transition-slow)",
      },

      borderRadius: {
        none: "var(--radius-none)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        "4xl": "var(--radius-4xl)",
        "5xl": "var(--radius-5xl)",
        "6xl": "var(--radius-6xl)",
        "7xl": "var(--radius-7xl)",
        circle: "var(--radius-circle)",
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
        "gradient-x": {
          "0%, 100%": { transform: "translateX(-50%)" },
          "50%": { transform: "translateX(0%)" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },

      animation: {
        "pulse-darker": "pulse-darker 2s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "gradient-x": "gradient-x 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

// eslint-disable-next-line no-restricted-syntax
export default config;
