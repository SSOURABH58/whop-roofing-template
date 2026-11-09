import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Contractor Navy
        navy: {
          950: '#070F1C',
          900: '#0A192F', // Contractor Navy (Deep midnight)
          850: '#0B192C', // Mastercraft Navy (Brand primary)
          800: '#0F2744',
          700: '#1E3A8A', // Blueprint / Navy Accent
          DEFAULT: '#0B192C',
        },
        // Architectural Slate
        slate: {
          950: '#070A0F', // Slate Obsidian canvas
          900: '#0E1420', // Elevated Shingle card
          850: '#0F172A', // Slate dark surface
          800: '#1E293B', // Slate border subtle
          700: '#334155',
          DEFAULT: '#0F172A',
        },
        // Industrial Amber / Gold
        amber: {
          400: '#FBBF24', // Highlight Gold
          500: '#F59E0B', // Industrial Amber
          600: '#D97706', // Deep Gold / Accent hover
          DEFAULT: '#F59E0B',
        },
        gold: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          DEFAULT: '#F59E0B',
        },
        // Clean Canvas
        canvas: {
          DEFAULT: '#F8FAFC',
          light: '#FFFFFF',
          pure: '#FFFFFF',
          slate: '#F8FAFC',
        },
        // Emerald
        emerald: {
          500: '#10B981',
          DEFAULT: '#10B981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(7, 10, 15, 0.4), 0 2px 6px -1px rgba(7, 10, 15, 0.2)',
        'card-hover': '0 10px 25px -3px rgba(7, 10, 15, 0.6), 0 4px 10px -2px rgba(245, 158, 11, 0.1)',
        glow: '0 0 25px -5px rgba(245, 158, 11, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
