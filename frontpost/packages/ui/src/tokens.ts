export const frontpostTokens = {
  color: {
    paper: '#F7F7F5',
    surface: '#FFFFFF',
    ink: '#1F3238',
    inkSoft: '#264653',
    inkMuted: '#6B716F',
    brand: '#264653',
    accent: '#A8DDDC',
    proof: '#B75D46',
    moss: '#6F7B52',
    ochre: '#C99B3B',
    warmNote: '#FFF9E8',
  },
  radius: { sm: 8, md: 12, lg: 16, xl: 20, pill: 999 },
  space: { xs: 8, sm: 12, md: 16, lg: 20, xl: 24, xxl: 32 },
  breakpoint: { mobile: 480, tablet: 768, desktop: 1024, wide: 1280 },
} as const;

export type FrontpostTokens = typeof frontpostTokens;
