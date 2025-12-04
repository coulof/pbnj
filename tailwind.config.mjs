import { getTheme, defaultTheme } from './src/lib/themes.ts';
import userConfig from './pbnj.config.js';

// Get theme from user config
const themeName = userConfig.theme || defaultTheme;
const theme = getTheme(themeName);
const colors = theme.colors;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: {
          bg: colors.bg,
          bg2: colors.bg2,
          text: colors.text,
          muted: colors.muted,
          faint: colors.faint,
          border: colors.border,
          'border-hover': colors.borderHover,
          'border-active': colors.borderActive,
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        paper: '0 1px 3px rgba(0, 0, 0, 0.06)',
        'paper-hover': '0 4px 6px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
