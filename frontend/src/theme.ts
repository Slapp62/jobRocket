// theme.ts - Rocket Theme Configuration
import { createTheme, MantineColorsTuple } from '@mantine/core';

// Custom Rocket Orange color palette
const rocketOrange: MantineColorsTuple = [
  '#FFF4E6', // 0 - Lightest (backgrounds, subtle highlights)
  '#FFE8CC', // 1 - Very light (hover backgrounds)
  '#FFD8A8', // 2 - Light (disabled states)
  '#FFC078', // 3 - Light-medium
  '#FFA94D', // 4 - Medium-light
  '#FF922B', // 5 - Medium (default shade)
  '#FF6B35', // 6 - Flame Orange (primary brand color)
  '#F77F00', // 7 - Burn Orange
  '#E8590C', // 8 - Dark orange
  '#D9480F', // 9 - Darkest (text on light backgrounds)
];

// Custom Rocket Red accent palette
const rocketRed: MantineColorsTuple = [
  '#FFE9EC', // 0 - Lightest
  '#FFD4D9', // 1 - Very light
  '#FFBFC6', // 2 - Light
  '#FFA8B3', // 3 - Light-medium
  '#FF8FA0', // 4 - Medium-light
  '#FF758D', // 5 - Medium
  '#E63946', // 6 - Rocket Red (accent color)
  '#D62839', // 7 - Dark red
  '#C6172C', // 8 - Darker red
  '#B6061F', // 9 - Darkest
];

export const theme = createTheme({
  primaryColor: 'rocketOrange',

  colors: {
    rocketOrange,
    rocketRed,
  },

  // Typography - Space-inspired, modern and bold
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  headings: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '700',
  },

  // Border radius - Sleek and modern
  defaultRadius: 'md',

  // Component defaults
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
      },
    },
    Badge: {
      defaultProps: {
        radius: 'sm',
      },
    },
    ThemeIcon: {
      defaultProps: {
        radius: 'md',
      },
    },
  },

  // Custom gradients for rocket theme
  other: {
    gradients: {
      fire: 'linear-gradient(135deg, #FF6B35 0%, #E63946 100%)',
      launch: 'linear-gradient(135deg, #E63946 0%, #FF6B35 50%, #F77F00 100%)',
      subtle: 'linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)',
    },
  },
});
