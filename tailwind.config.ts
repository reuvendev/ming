import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom Border Radius for that "Squircle" look
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '3.5rem',
        '8xl': '4rem',
      },
      // Custom Shadows for the floating card effect
      boxShadow: {
        'premium': '0 32px 64px -12px rgba(0, 0, 0, 0.05)',
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.02)',
      },
      // Ensuring the Plus Jakarta Sans font maps correctly
      fontFamily: {
        sans: ['var(--font-jakarta)', 'ui-sans-serif', 'system-ui'],
      },
      // Custom Blue Tones for Ming's branding
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;