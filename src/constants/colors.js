const NAV_THEME = {
  light: {
    background: '34 45% 96%',
    foreground: '24 30% 18%',
    card: '36 40% 98%',
    'card-foreground': '24 30% 18%',
    popover: '36 40% 98%',
    'popover-foreground': '24 30% 18%',
    primary: '22 58% 50%',
    'primary-foreground': '36 60% 97%',
    secondary: '30 30% 92%',
    'secondary-foreground': '24 35% 30%',
    muted: '32 25% 93%',
    'muted-foreground': '24 12% 48%',
    accent: '145 42% 49%',
    'accent-foreground': '145 60% 12%',
    destructive: '0 72% 55%',
    'destructive-foreground': '0 0% 100%',
    border: '30 20% 86%',
    input: '30 20% 86%',
    ring: '22 58% 50%',
    radius: '1.5rem',
    'shadow-light': '0 0% 100%',
    'shadow-dark': '39 25% 77%',
    'tag-work': '22 58% 50%',
    'tag-study': '210 60% 50%',
    'tag-health': '145 42% 49%',
    'tag-finance': '40 90% 50%',
  },
  dark: {
    background: '24 18% 12%',
    foreground: '34 30% 88%',
    card: '24 16% 16%',
    'card-foreground': '34 30% 88%',
    popover: '24 16% 16%',
    'popover-foreground': '34 30% 88%',
    primary: '22 60% 55%',
    'primary-foreground': '36 60% 97%',
    secondary: '24 15% 20%',
    'secondary-foreground': '34 20% 75%',
    muted: '24 15% 20%',
    'muted-foreground': '30 15% 55%',
    accent: '145 40% 45%',
    'accent-foreground': '145 60% 12%',
    destructive: '0 72% 55%',
    'destructive-foreground': '0 0% 100%',
    border: '24 15% 22%',
    input: '24 15% 22%',
    ring: '22 60% 55%',
    radius: '1.5rem',
    'shadow-light': '24 15% 24%',
    'shadow-dark': '24 40% 4%',
    'tag-work': '22 60% 55%',
    'tag-study': '210 50% 55%',
    'tag-health': '145 40% 45%',
    'tag-finance': '40 80% 50%',
  },
};

const mapToHsl = (theme) => {
  return Object.fromEntries(
    Object.entries(theme).map(([key, value]) => [
      key,
      key === 'radius' ? value : `hsl(${value})`,
    ]),
  );
};

const NAV_THEME_HSL = {
  light: mapToHsl(NAV_THEME.light),
  dark: mapToHsl(NAV_THEME.dark),
};

module.exports = {
  NAV_THEME,
  NAV_THEME_HSL,
};
