
import type { Config } from "tailwindcss";

export default {
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
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#6EE224', // SGBIS GREEN
          foreground: '#F6EFEE', // SNOW
        },
        secondary: {
          DEFAULT: '#3A403D', // BLACK OLIVE
          foreground: '#F6EFEE', // SNOW
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: '#253519', // DARK GREEN
          foreground: '#F6EFEE', // SNOW
        },
        accent: {
          DEFAULT: '#6EE224', // SGBIS GREEN
          foreground: '#10080B', // SMOKY BLACK
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        riftx: {
          green: '#6EE224', // SGBIS GREEN
          black: '#10080B', // SMOKY BLACK
          olive: '#3A403D', // BLACK OLIVE
          darkgreen: '#253519', // DARK GREEN
          snow: '#F6EFEE', // SNOW
        },
        sidebar: {
          DEFAULT: '#10080B', // SMOKY BLACK
          foreground: '#F6EFEE', // SNOW
          primary: '#6EE224', // SGBIS GREEN
          'primary-foreground': '#10080B', // SMOKY BLACK
          accent: '#253519', // DARK GREEN
          'accent-foreground': '#F6EFEE', // SNOW
          border: '#3A403D', // BLACK OLIVE
          ring: '#6EE224', // SGBIS GREEN
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "pulse-glow": {
          "0%, 100%": { 
            opacity: "1",
            boxShadow: "0 0 5px rgba(110, 226, 36, 0.5), 0 0 10px rgba(110, 226, 36, 0.3)" 
          },
          "50%": { 
            opacity: "0.85",
            boxShadow: "0 0 15px rgba(110, 226, 36, 0.8), 0 0 20px rgba(110, 226, 36, 0.5)" 
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
