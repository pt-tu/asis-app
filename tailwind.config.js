/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        shadow: {
          light: 'hsl(var(--shadow-light))',
          dark: 'hsl(var(--shadow-dark))',
        },
        tag: {
          work: 'hsl(var(--tag-work))',
          study: 'hsl(var(--tag-study))',
          health: 'hsl(var(--tag-health))',
          finance: 'hsl(var(--tag-finance))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(function ({ addBase }) {
      /**
       * Convert our NAV_THEME object into exact CSS variables that NativeWind
       * can compute natively inside React Native.
       */
      const { NAV_THEME } = require('./src/constants/colors.js');

      addBase({
        ':root': {
          '--background': NAV_THEME.light.background,
          '--foreground': NAV_THEME.light.foreground,
          '--card': NAV_THEME.light.card,
          '--card-foreground': NAV_THEME.light['card-foreground'],
          '--popover': NAV_THEME.light.popover,
          '--popover-foreground': NAV_THEME.light['popover-foreground'],
          '--primary': NAV_THEME.light.primary,
          '--primary-foreground': NAV_THEME.light['primary-foreground'],
          '--secondary': NAV_THEME.light.secondary,
          '--secondary-foreground': NAV_THEME.light['secondary-foreground'],
          '--muted': NAV_THEME.light.muted,
          '--muted-foreground': NAV_THEME.light['muted-foreground'],
          '--accent': NAV_THEME.light.accent,
          '--accent-foreground': NAV_THEME.light['accent-foreground'],
          '--destructive': NAV_THEME.light.destructive,
          '--destructive-foreground': NAV_THEME.light['destructive-foreground'],
          '--border': NAV_THEME.light.border,
          '--input': NAV_THEME.light.input,
          '--ring': NAV_THEME.light.ring,
          '--radius': NAV_THEME.light.radius,
          '--shadow-light': NAV_THEME.light['shadow-light'],
          '--shadow-dark': NAV_THEME.light['shadow-dark'],
          '--tag-work': NAV_THEME.light['tag-work'],
          '--tag-study': NAV_THEME.light['tag-study'],
          '--tag-health': NAV_THEME.light['tag-health'],
          '--tag-finance': NAV_THEME.light['tag-finance'],
        },
        '.dark': {
          '--background': NAV_THEME.dark.background,
          '--foreground': NAV_THEME.dark.foreground,
          '--card': NAV_THEME.dark.card,
          '--card-foreground': NAV_THEME.dark['card-foreground'],
          '--popover': NAV_THEME.dark.popover,
          '--popover-foreground': NAV_THEME.dark['popover-foreground'],
          '--primary': NAV_THEME.dark.primary,
          '--primary-foreground': NAV_THEME.dark['primary-foreground'],
          '--secondary': NAV_THEME.dark.secondary,
          '--secondary-foreground': NAV_THEME.dark['secondary-foreground'],
          '--muted': NAV_THEME.dark.muted,
          '--muted-foreground': NAV_THEME.dark['muted-foreground'],
          '--accent': NAV_THEME.dark.accent,
          '--accent-foreground': NAV_THEME.dark['accent-foreground'],
          '--destructive': NAV_THEME.dark.destructive,
          '--destructive-foreground': NAV_THEME.dark['destructive-foreground'],
          '--border': NAV_THEME.dark.border,
          '--input': NAV_THEME.dark.input,
          '--ring': NAV_THEME.dark.ring,
          '--radius': NAV_THEME.dark.radius,
          '--shadow-light': NAV_THEME.dark['shadow-light'],
          '--shadow-dark': NAV_THEME.dark['shadow-dark'],
          '--tag-work': NAV_THEME.dark['tag-work'],
          '--tag-study': NAV_THEME.dark['tag-study'],
          '--tag-health': NAV_THEME.dark['tag-health'],
          '--tag-finance': NAV_THEME.dark['tag-finance'],
        },
      });
    }),
  ],
};
