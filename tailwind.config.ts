import type { Config } from "tailwindcss";
import scrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#4DABFF', // Electric blue
          500: '#2E95FF', // Bright blue
          600: '#0066FF', // Deep blue
        },
        accent: {
          400: '#60BDFF', // Light electric blue
          500: '#3D9FFF', // Medium electric blue
          600: '#1E90FF', // Classic electric blue
        },
        dark: {
          100: '#1E1E1E',
          200: '#141414',
          300: '#111111',
          400: '#0A0A0A',
          500: '#050505',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.03)',
          dark: 'rgba(0, 0, 0, 0.6)',
        }
      },
      backgroundImage: {
        'mesh-pattern': 'linear-gradient(to bottom right, rgba(0,0,0,0.9), rgba(0,0,0,0.95))',
        'noise-pattern': "url('/noise.png')",
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      }
    },
  },
  plugins: [
    scrollbar({ nocompatible: true }),
  ],
};

export default config;
