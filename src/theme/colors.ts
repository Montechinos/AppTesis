export const colorSchemes = {
  light: {
  background: '#f2fbf6',
  surface: '#ffffff',
  surfaceMuted: '#e6f6ef',
  primary: '#0f9d6f',
  secondary: '#118ab2',
  accent: '#2dd4bf',
  text: '#12332a',
  textMuted: '#5f7c73',
  success: '#159947',
  warning: '#f59e0b',
  danger: '#e05555',
  border: '#cde8dc',
  shadow: 'rgba(17, 56, 46, 0.08)',
  tabInactive: '#86a89b',
  },
  dark: {
    background: '#071612',
    surface: '#10231d',
    surfaceMuted: '#17342b',
    primary: '#6ee7b7',
    secondary: '#7dd3fc',
    accent: '#5eead4',
    text: '#edf7f2',
    textMuted: '#a7c3ba',
    success: '#74d99f',
    warning: '#f8c76b',
    danger: '#ff8b8b',
    border: '#2c5147',
    shadow: 'rgba(0, 0, 0, 0.28)',
    tabInactive: '#719087',
  },
} as const;

export type ThemeColors = (typeof colorSchemes)[keyof typeof colorSchemes];

export const colors = colorSchemes.light;

export const gradients = {
  hero: ['#0d8f66', '#0f7495'],
  panel: ['#ffffff', '#f4fffa'],
  alert: ['#fff7df', '#ffffff'],
} as const;
