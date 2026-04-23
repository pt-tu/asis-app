import { TaskTag } from '../types';

export const TAG_COLORS: Record<
  TaskTag,
  { bg: string; border: string; text: string }
> = {
  Work: {
    bg: 'bg-orange-100/50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-800 dark:text-orange-400',
  },
  Study: {
    bg: 'bg-sky-100/50 dark:bg-sky-950/30',
    border: 'border-sky-200 dark:border-sky-800',
    text: 'text-sky-800 dark:text-sky-400',
  },
  Health: {
    bg: 'bg-emerald-100/50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-800 dark:text-emerald-400',
  },
  Finance: {
    bg: 'bg-amber-100/50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-800 dark:text-amber-400',
  },
};

const colors = require('./colors');

export const NAV_THEME = colors.NAV_THEME;
export const NAV_THEME_HSL = colors.NAV_THEME_HSL as {
  light: Record<keyof typeof colors.NAV_THEME.light, string>;
  dark: Record<keyof typeof colors.NAV_THEME.dark, string>;
};
