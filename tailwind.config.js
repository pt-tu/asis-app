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
      const theme = require('./src/constants/nav-theme.js');
      if (theme && theme.NAV_THEME) {
        addBase({
          ':root': {
            '--background': theme.NAV_THEME.light.background,
            '--foreground': theme.NAV_THEME.light.foreground,
            '--card': theme.NAV_THEME.light.card,
            '--card-foreground': theme.NAV_THEME.light['card-foreground'],
            '--popover': theme.NAV_THEME.light.popover,
            '--popover-foreground': theme.NAV_THEME.light['popover-foreground'],
            '--primary': theme.NAV_THEME.light.primary,
            '--primary-foreground': theme.NAV_THEME.light['primary-foreground'],
            '--secondary': theme.NAV_THEME.light.secondary,
            '--secondary-foreground':
              theme.NAV_THEME.light['secondary-foreground'],
            '--muted': theme.NAV_THEME.light.muted,
            '--muted-foreground': theme.NAV_THEME.light['muted-foreground'],
            '--accent': theme.NAV_THEME.light.accent,
            '--accent-foreground': theme.NAV_THEME.light['accent-foreground'],
            '--destructive': theme.NAV_THEME.light.destructive,
            '--destructive-foreground':
              theme.NAV_THEME.light['destructive-foreground'],
            '--border': theme.NAV_THEME.light.border,
            '--input': theme.NAV_THEME.light.input,
            '--ring': theme.NAV_THEME.light.ring,
            '--radius': theme.NAV_THEME.light.radius,
            '--shadow-light': theme.NAV_THEME.light['shadow-light'],
            '--shadow-dark': theme.NAV_THEME.light['shadow-dark'],
            '--tag-work': theme.NAV_THEME.light['tag-work'],
            '--tag-study': theme.NAV_THEME.light['tag-study'],
            '--tag-health': theme.NAV_THEME.light['tag-health'],
            '--tag-finance': theme.NAV_THEME.light['tag-finance'],
          },
          '.dark': {
            '--background': theme.NAV_THEME.dark.background,
            '--foreground': theme.NAV_THEME.dark.foreground,
            '--card': theme.NAV_THEME.dark.card,
            '--card-foreground': theme.NAV_THEME.dark['card-foreground'],
            '--popover': theme.NAV_THEME.dark.popover,
            '--popover-foreground': theme.NAV_THEME.dark['popover-foreground'],
            '--primary': theme.NAV_THEME.dark.primary,
            '--primary-foreground': theme.NAV_THEME.dark['primary-foreground'],
            '--secondary': theme.NAV_THEME.dark.secondary,
            '--secondary-foreground':
              theme.NAV_THEME.dark['secondary-foreground'],
            '--muted': theme.NAV_THEME.dark.muted,
            '--muted-foreground': theme.NAV_THEME.dark['muted-foreground'],
            '--accent': theme.NAV_THEME.dark.accent,
            '--accent-foreground': theme.NAV_THEME.dark['accent-foreground'],
            '--destructive': theme.NAV_THEME.dark.destructive,
            '--destructive-foreground':
              theme.NAV_THEME.dark['destructive-foreground'],
            '--border': theme.NAV_THEME.dark.border,
            '--input': theme.NAV_THEME.dark.input,
            '--ring': theme.NAV_THEME.dark.ring,
            '--radius': theme.NAV_THEME.dark.radius,
            '--shadow-light': theme.NAV_THEME.dark['shadow-light'],
            '--shadow-dark': theme.NAV_THEME.dark['shadow-dark'],
            '--tag-work': theme.NAV_THEME.dark['tag-work'],
            '--tag-study': theme.NAV_THEME.dark['tag-study'],
            '--tag-health': theme.NAV_THEME.dark['tag-health'],
            '--tag-finance': theme.NAV_THEME.dark['tag-finance'],
          },
        });
      }
    }),
  ],
};
